import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import Lead from '@/models/Lead'
import ActivityLog from '@/models/ActivityLog'
import { requireAdmin, AuthError } from '@/lib/auth'

// PATCH /api/leads/[id] — assign developer or update status
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const user = await requireAdmin()
        const { id } = await params
        const { assignedTo, status } = await req.json()

        await connectToDatabase()

        const update: any = {}
        if (assignedTo !== undefined) {
            update.assignedTo = assignedTo || null
            update.assignedAt = assignedTo ? new Date() : null
            update.status = assignedTo ? 'assigned' : 'new'
        }
        if (status) update.status = status

        const lead = await Lead.findByIdAndUpdate(
            id,
            { $set: update },
            { returnDocument: 'after' }
        ).populate('assignedTo', 'name email')

        if (!lead) return NextResponse.json({ error: 'Lead not found' }, { status: 404 })

        if (assignedTo !== undefined) {
            ActivityLog.create({
                userId: user.id,
                action: assignedTo ? 'Assigned Developer to Lead' : 'Removed Developer from Lead',
                target: lead.name
            }).catch(e => console.error("Log error:", e))
        } else if (status) {
            ActivityLog.create({
                userId: user.id,
                action: `Updated Lead Status to ${status}`,
                target: lead.name
            }).catch(e => console.error("Log error:", e))
        }

        return NextResponse.json({ message: 'Lead updated', lead })
    } catch (err: any) {
        if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status })
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
