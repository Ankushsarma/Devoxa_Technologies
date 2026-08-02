import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import { rateLimit } from '@/lib/rate-limit'
import User from '@/models/User'
import crypto from 'crypto'
import { sendEmail } from '@/lib/email'

export async function POST(req: Request) {
    try {
        const rateLimitResult = rateLimit(req, { limit: 3, windowMs: 60000 * 5 }) // 3 requests per 5 minutes
        if (!rateLimitResult.success) {
            return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
        }

        const { email } = await req.json()

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 })
        }

        await connectToDatabase()

        const user = await User.findOne({ email })
        if (!user) {
            // Return success even if not found to prevent email enumeration
            return NextResponse.json({ message: 'If that email address is in our database, we will send you an email to reset your password.' })
        }

        // Generate token
        const resetToken = crypto.randomBytes(32).toString('hex')
        const resetTokenExpiry = Date.now() + 600000 // 10 minutes from now

        user.resetToken = resetToken
        user.resetTokenExpiry = resetTokenExpiry
        await user.save()

        // Dynamically build the link based on where the request came from (e.g., localhost vs production domain)
        const host = process.env.APP_URL || req.headers.get('origin') || 'http://localhost:3000'
        const resetLink = `${host}/reset-password?token=${resetToken}`

        // Send Email
        const emailContent = `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f1eef1; padding: 40px 20px; color: #111111;">
                <div style="text-align: center; margin-bottom: 40px;">
                    <h1 style="font-family: Georgia, serif; font-size: 28px; font-weight: normal; margin: 0; font-style: italic; color: #2563eb;">Devoxa Technologies</h1>
                </div>
                
                <h2 style="font-size: 24px; font-weight: 700; margin-top: 0; margin-bottom: 24px; text-align: center;">Reset Your Password</h2>
                
                <p style="font-size: 16px; line-height: 1.6; color: #444444; margin-bottom: 16px;">Hi ${user.name},</p>
                
                <p style="font-size: 16px; line-height: 1.6; color: #444444; margin-bottom: 32px;">
                    We received a request to reset the password for your Devoxa Technologies dashboard account. If you made this request, please click the button below to securely set a new password.
                </p>
                
                <div style="text-align: center; margin-bottom: 32px;">
                    <a href="${resetLink}" style="display: inline-block; background-color: #2563eb; color: #f1eef1; text-decoration: none; font-size: 15px; font-weight: 600; padding: 14px 32px; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);">Reset Password</a>
                </div>
                
                <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; margin-bottom: 32px; border: 1px solid #e2e8f0;">
                    <p style="font-size: 14px; color: #64748b; margin: 0; line-height: 1.5;">
                        <strong style="color: #475569;">Security Notice:</strong> This secure link will expire in 10 minutes. If you did not request a password reset, please ignore this email. Your account remains completely secure.
                    </p>
                </div>
                
                <div style="border-top: 1px solid #e2e8f0; padding-top: 32px;">
                    <p style="font-size: 14px; color: #64748b; margin: 0;">
                        Best regards,<br/>
                        <strong style="color: #0f172a;">The Devoxa Team</strong>
                    </p>
                </div>
            </div>
        `

        try {
            await sendEmail({
                to: user.email,
                subject: 'Password Reset Request',
                html: emailContent
            })
        } catch (emailErr: any) {
            // Log the delivery failure server-side but do NOT expose it to the client.
            // The reset token has already been saved; the user can retry later.
            console.error('[forgot-password] Email delivery failed:', emailErr.message)
        }

        return NextResponse.json({ message: 'If that email address is in our database, we will send you an email to reset your password.' })
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
