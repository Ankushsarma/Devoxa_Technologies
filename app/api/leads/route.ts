import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import { rateLimit } from '@/lib/rate-limit'
import Lead from '@/models/Lead'
import { requireAdmin, AuthError } from '@/lib/auth'

export async function POST(req: Request) {
    try {
        const rateLimitResult = rateLimit(req, { limit: 3, windowMs: 60000 * 15 }) // 3 requests per 15 minutes
        if (!rateLimitResult.success) {
            return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
        }

        const { name, email, subject, message } = await req.json()
        if (!name || !email) {
            return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 })
        }

        // Construct clean payload restricting system fields
        const data = { name, email, subject, message }

        await connectToDatabase()

        // Check for existing email to prevent duplicates of active work
        const existingLead = await Lead.findOne({ email: data.email }).sort({ createdAt: -1 })
        if (existingLead) {
            const activeStates = ['new', 'reviewed', 'discovery', 'contacted', 'assigned', 'pending', 'working', 'pending_development']
            if (activeStates.includes(existingLead.status)) {
                // Determine if they already have an accepted portal account
                if (existingLead.chatId) {
                    const User = (await import('@/models/User')).default;
                    const user = await User.findOne({ email: data.email })
                    if (user) {
                        const newPassword = Math.random().toString(36).slice(-8)
                        user.password = newPassword
                        await user.save()

                        const { sendEmail } = await import('@/lib/email')
                        await sendEmail({
                            to: existingLead.email,
                            subject: 'Devoxa Technologies — Portal Access Recovery',
                            html: `<p>Hi ${existingLead.name},</p><p>You recently submitted another inquiry, but you already have an active project portal with us!</p><p>We have safely reset your login credentials so you can securely access your dashboard and message your manager directly:</p><p><strong>URL:</strong> https://beyondyourimagination.shop/login</p><p><strong>Email:</strong> ${existingLead.email}</p><p><strong>New Password:</strong> ${newPassword}</p>`
                        }).catch(e => console.error("Resend creds fail:", e))
                    }
                    return NextResponse.json({ error: 'You already have an active project. We have emailed you a new password to access your secure portal.' }, { status: 409 })
                } else {
                    const { sendEmail } = await import('@/lib/email')
                    await sendEmail({
                        to: existingLead.email,
                        subject: 'Devoxa Technologies — Inquiry Status',
                        html: `<p>Hi ${existingLead.name},</p><p>You recently submitted another inquiry, but our team is already actively reviewing your previous request!</p><p>We will reach out to you shortly. Thank you for your patience.</p>`
                    }).catch(e => console.error("Pending alert fail:", e))
                    return NextResponse.json({ error: 'Your request is currently being reviewed. We have sent an email update.' }, { status: 409 })
                }
            }
            // If they are lost, done, or rejected, let it fall through and create a NEW Lead engagement!
        }

        const newLead = new Lead(data)
        await newLead.save()

        return NextResponse.json({ message: 'Lead saved successfully', lead: newLead })
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}

export async function GET() {
    try {
        await requireAdmin()
        await connectToDatabase()
        const leads = await Lead.find({}).sort({ createdAt: -1 }).lean()
        return NextResponse.json({ leads })
    } catch (err: any) {
        if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status })
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
