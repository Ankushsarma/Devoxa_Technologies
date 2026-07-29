import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'
import { rateLimit } from '@/lib/rate-limit'
import connectToDatabase from '@/lib/mongodb'
import Asset from '@/models/Asset'

export async function POST(req: Request) {
  try {
    try {
      const rateLimitResult = rateLimit(req, { limit: 3, windowMs: 60000 * 15 }) // 3 decks per 15 mins
      if (!rateLimitResult.success) {
        return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
      }

      const { name, email, subject, message } = await req.json()

      if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 })
      }

      const emailPayload: any = {
        to: [email],
        subject: `Thanks for reaching out, ${name}! Here's your Devoxa Pitch Deck`,
        html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px 20px; color: #111111;">
                <div style="text-align: center; margin-bottom: 40px;">
                    <h1 style="font-family: Georgia, serif; font-size: 28px; font-weight: normal; margin: 0; font-style: italic;">Devoxa Technologies</h1>
                </div>
                
                <h2 style="font-size: 20px; font-weight: 600; margin-top: 0; margin-bottom: 24px;">Hi ${name} 👋</h2>
                
                <p style="font-size: 15px; line-height: 1.6; color: #444444; margin-bottom: 16px;">
                    Thank you for reaching out regarding <strong>${subject}</strong>.
                </p>
                
                ${message ? `
                <div style="background-color: #f9f9f9; border-left: 3px solid #111111; padding: 16px; margin-bottom: 24px; font-style: italic; color: #666666; font-size: 14px;">
                    "${message}"
                </div>
                ` : ''}
                
                <p style="font-size: 15px; line-height: 1.6; color: #444444; margin-bottom: 32px;">
                    We've attached our pitch deck for your review. Our team will be in touch shortly to discuss your project in detail.
                </p>
                
                <div style="border-top: 1px solid #eeeeee; padding-top: 32px;">
                    <p style="font-size: 14px; color: #888888; margin: 0;">
                        Regards,<br/>
                        <strong style="color: #111111;">The Devoxa Team</strong>
                    </p>
                </div>
            </div>
      `,
      }

      // Attach PDF if found in public directory
      const fs = require('fs')
      const path = require('path')
      const filePath = path.join(process.cwd(), 'public', 'BYI-Pitch-Deck.pdf')

      if (fs.existsSync(filePath)) {
        emailPayload.attachments = [
          {
            filename: 'BYI-Pitch-Deck.pdf',
            content: fs.readFileSync(filePath),
          }
        ]
      }

      await sendEmail(emailPayload)

      return NextResponse.json({ message: 'Email sent successfully' })
    } catch (err: any) {
      console.error('Send-deck route error:', err)
      return NextResponse.json({ error: err.message }, { status: 500 })
    }
  } catch (fatalErr: any) {
    console.error('Fatal send-deck error:', fatalErr)
    return NextResponse.json({ error: fatalErr.message || 'Fatal Server Error' }, { status: 500 })
  }
}
