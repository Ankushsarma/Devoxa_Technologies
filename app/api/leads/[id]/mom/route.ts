import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import Lead from '@/models/Lead'
import { sendEmail } from '@/lib/email'
import { requireAdmin, AuthError } from '@/lib/auth'

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await requireAdmin()

    await connectToDatabase()

    const { title, content, sendEmail: shouldSendEmail } = await req.json()

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
    }

    const mom = { title, content, createdAt: new Date() }

    // Use findByIdAndUpdate to use $push which guarantees the array mutation is saved to DB
    const lead = await Lead.findByIdAndUpdate(
      id,
      { $push: { moms: mom } },
      { new: true }
    )

    if (!lead) return NextResponse.json({ error: 'Lead not found' }, { status: 404 })

    // Send email to client
    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px 20px; color: #111111;">
          <div style="text-align: center; margin-bottom: 40px;">
              <h1 style="font-family: Georgia, serif; font-size: 28px; font-weight: normal; margin: 0; font-style: italic;">Devoxa Technologies</h1>
          </div>
          
          <h2 style="font-size: 20px; font-weight: 600; margin-top: 0; margin-bottom: 24px;">Minutes of Meeting: ${title}</h2>
          
          <div style="background-color: #f9f9f9; padding: 24px; border-radius: 8px; margin-bottom: 32px; font-size: 15px; line-height: 1.6; color: #444444; white-space: pre-wrap;">${content}</div>
          
          <p style="font-size: 15px; line-height: 1.6; color: #444444; margin-bottom: 32px;">
              This meeting summary has also been saved to your Client Workspace. You can access it anytime from your dashboard.
          </p>
          
          <div style="border-top: 1px solid #eeeeee; padding-top: 32px;">
              <p style="font-size: 14px; color: #888888; margin: 0;">
                  Regards,<br/>
                  <strong style="color: #111111;">The Devoxa Team</strong>
              </p>
          </div>
      </div>
    `

    if (shouldSendEmail) {
      // Fire and forget email
      sendEmail({
        to: lead.email,
        subject: `Minutes of Meeting: ${title}`,
        html: emailHtml
      }).catch(err => console.error("Failed to send MOM email:", err))
    }

    return NextResponse.json({ message: 'MOM added successfully', mom })
  } catch (err: any) {
    console.error("MOM error:", err)
    if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status })
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
