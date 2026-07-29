import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import Task from '@/models/Task'
import Lead from '@/models/Lead'
import { requireAuth, AuthError } from '@/lib/auth'

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const user = await requireAuth()
        const { id } = await params
        await connectToDatabase()

        // Strict authorization: Clients can only view tasks for their own lead
        if (user.role === 'client') {
            const clientLead = await Lead.findById(id)
            if (!clientLead || clientLead.email !== user.email) {
                return NextResponse.json({ error: 'Forbidden. You can only view your own project tasks.' }, { status: 403 })
            }
        } else if (user.role === 'developer') {
            const devLead = await Lead.findOne({ _id: id, assignedTo: user.id })
            if (!devLead) {
                return NextResponse.json({ error: 'Forbidden. You are not assigned to this lead.' }, { status: 403 })
            }
        }

        const tasks = await Task.find({ leadId: id }).lean()
            .populate('assignedTo', 'name')
            .sort({ createdAt: -1 })

        return NextResponse.json({ tasks })
    } catch (err: any) {
        if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status })
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
