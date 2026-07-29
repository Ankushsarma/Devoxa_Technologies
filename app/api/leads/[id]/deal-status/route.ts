import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import Lead from '@/models/Lead'
import { requireManager, AuthError } from '@/lib/auth'

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const user = await requireManager()
        const { id } = await params
        await connectToDatabase()

        const lead = await Lead.findById(id)
        if (!lead) return NextResponse.json({ error: 'Lead not found' }, { status: 404 })

        if (user.role === 'manager' && lead.managerId?.toString() !== user.id) {
            return NextResponse.json({ error: 'Forbidden: You are not assigned to manage this lead.' }, { status: 403 })
        }

        const body = await req.json()
        const { dealStatus, message } = body

        if (!['pending', 'won', 'lost'].includes(dealStatus)) {
            return NextResponse.json({ error: 'Invalid dealStatus' }, { status: 400 })
        }

        lead.dealStatus = dealStatus

        if (dealStatus === 'won') {
            lead.status = 'pending_development'
            lead.dealLostAt = null // Clear any previous lost track

            // Email client
            const { sendEmail } = await import('@/lib/email')
            await sendEmail({
                to: lead.email,
                subject: 'Project Update — Deal Finalized!',
                html: `<p>Hi ${lead.name},</p><p>We are thrilled to let you know that your deal is finalized!</p><p>We are now moving your project into the development phase. Your developer will reach out shortly.</p>`
            }).catch(e => console.error("Deal Won email failure:", e))

        } else if (dealStatus === 'lost') {
            lead.status = 'lost'
            lead.dealLostAt = new Date()

            // Email client custom rejection note
            const { sendEmail } = await import('@/lib/email')
            await sendEmail({
                to: lead.email,
                subject: 'Important Update Regarding Your Inquiry',
                html: `<p>Hi ${lead.name},</p><p>Thank you for considering Devoxa Technologies. Unfortunately, we will not be moving forward with your project at this time.</p><p><strong>Manager's Note:</strong><br/>${message || "No specific reason was provided."}</p>`
            }).catch(e => console.error("Deal Lost email failure:", e))

        } else {
            // Restore back to discovery if they revert to pending
            lead.status = 'discovery'
            lead.dealLostAt = null
        }

        await lead.save()

        return NextResponse.json({ message: 'Deal status updated', lead })
    } catch (err: any) {
        if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status })
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
