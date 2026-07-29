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
        const { callScheduled, clientBrief, proposalSent } = body

        if (callScheduled !== undefined) lead.managerChecklist.callScheduled = callScheduled
        if (clientBrief !== undefined) lead.managerChecklist.clientBrief = clientBrief
        if (proposalSent !== undefined) lead.managerChecklist.proposalSent = proposalSent

        await lead.save()

        return NextResponse.json({ message: 'Checklist updated', lead })
    } catch (err: any) {
        if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status })
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
