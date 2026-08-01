import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import Lead from '@/models/Lead'
import User from '@/models/User'
import bcrypt from 'bcryptjs'
import { sendEmail } from '@/lib/email'
import { requireAdmin, AuthError } from '@/lib/auth'

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await requireAdmin()
        const { id } = await params
        await connectToDatabase()

        // 1. Find a manager to assign
        const manager = await User.findOne({ role: 'manager' })
        // We'll proceed even if no manager exists, but we'll assign it if found.

        // 1. Find Lead
        const lead = await Lead.findById(id)
        if (!lead) return NextResponse.json({ error: 'Lead not found' }, { status: 404 })

        if (lead.status === 'assigned' || lead.status === 'working' || lead.status === 'done') {
            return NextResponse.json({ error: 'Lead is already assigned or beyond acceptance phase.' }, { status: 400 })
        }

        // 2. Check if User account already exists
        let user = await User.findOne({ email: lead.email })
        const password = Math.random().toString(36).slice(-8)

        // Generate isolated chatId for this engagement
        const generatedChatId = crypto.randomUUID()

        if (!user) {
            user = await User.create({
                name: lead.name,
                email: lead.email,
                password: password, // Mongoose pre-save hook handles hashing
                chatId: generatedChatId,
                role: 'client'
            })
        } else {
            // Overwrite password if account exists (fixes double hashing bug from previous accept)
            user.password = password
            user.chatId = user.chatId || generatedChatId
            await user.save()
        }

        // 3. Send Credentials Email
        const emailContent = `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f1eef1; padding: 40px 20px; color: #111111;">
                <div style="text-align: center; margin-bottom: 40px;">
                    <h1 style="font-family: Georgia, serif; font-size: 28px; font-weight: normal; margin: 0; font-style: italic;">Devoxa Technologies</h1>
                </div>
                
                <h2 style="font-size: 20px; font-weight: 600; margin-top: 0; margin-bottom: 24px;">Welcome to the Studio!</h2>
                
                <p style="font-size: 15px; line-height: 1.6; color: #444444; margin-bottom: 16px;">Hi ${lead.name},</p>
                
                <p style="font-size: 15px; line-height: 1.6; color: #444444; margin-bottom: 24px;">
                    Your project request has been accepted. We have set up a private client portal for you to track our progress, view assets, and chat directly with your assigned developer.
                </p>
                
                <div style="background-color: #f9f9f9; border-radius: 8px; padding: 24px; margin-bottom: 32px; border: 1px solid #eeeeee;">
                    <p style="font-size: 13px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; color: #888888; margin-top: 0; margin-bottom: 16px;">Your Login Credentials</p>
                    
                    <p style="font-size: 15px; margin: 0 0 12px 0;">
                        <strong style="color: #111111; display: inline-block; width: 90px;">Portal URL:</strong> 
                        <a href="https://beyondyourimagination.shop/login" style="color: #000000; text-decoration: underline;">https://beyondyourimagination.shop/login</a>
                    </p>
                    <p style="font-size: 15px; margin: 0 0 12px 0;">
                        <strong style="color: #111111; display: inline-block; width: 90px;">Email:</strong> 
                        <span style="color: #444444;">${lead.email}</span>
                    </p>
                    <p style="font-size: 15px; margin: 0;">
                        <strong style="color: #111111; display: inline-block; width: 90px;">Password:</strong> 
                        <span style="font-family: monospace; background: #eeeeee; padding: 2px 6px; border-radius: 4px; font-size: 14px;">${password}</span>
                    </p>
                </div>
                
                <div style="text-align: center; margin-bottom: 40px;">
                    <a href="https://beyondyourimagination.shop/login" style="display: inline-block; background-color: #111111; color: #f1eef1; text-decoration: none; font-size: 14px; font-weight: 600; padding: 14px 32px; border-radius: 6px;">Access Client Portal</a>
                </div>
                
                <p style="font-size: 15px; line-height: 1.6; color: #444444; margin-bottom: 32px;">
                    We look forward to building the quiet future of your digital product.
                </p>
                
                <div style="border-top: 1px solid #eeeeee; padding-top: 32px;">
                    <p style="font-size: 14px; color: #888888; margin: 0;">
                        Regards,<br/>
                        <strong style="color: #111111;">The Devoxa Team</strong>
                    </p>
                </div>
            </div>
        `

        let emailWarning = null;
        try {
            await sendEmail({
                to: lead.email,
                subject: 'Project Accepted — Your Portal Login Credentials',
                html: emailContent
            })
        } catch (emailError: any) {
            console.error("Failed to send credentials email:", emailError)
            emailWarning = `Email failed to send: ${emailError.message}. However, the lead was accepted.`
        }

        // 4. Update Lead Status and link Chat ID
        lead.status = 'discovery'
        lead.chatId = user.chatId
        if (manager) {
            lead.managerId = manager._id
        }
        await lead.save()

        if (emailWarning) {
            return NextResponse.json({ message: 'Client accepted and account created, BUT email delivery failed.', warning: emailWarning, lead, temporaryPassword: password })
        }

        return NextResponse.json({ message: 'Client accepted, account created, and credentials emailed.', lead })
    } catch (err: any) {
        if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status })
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
