import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import Task from '@/models/Task'
import ActivityLog from '@/models/ActivityLog'
import { requireAuth, requireAdmin, AuthError } from '@/lib/auth'

export async function GET(req: Request) {
    try {
        const user = await requireAuth();
        await connectToDatabase()

        let query = {}
        if (user.role === 'developer') {
            query = { assignedTo: user.id }
        } else if (user.role === 'client') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        const tasks = await Task.find(query).populate('leadId', 'name subject chatId').populate('assignedTo', 'name email').sort({ createdAt: -1 }).lean()
        return NextResponse.json({ tasks })
    } catch (err: any) {
        if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status })
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const user = await requireAdmin();

        await connectToDatabase()
        const body = await req.json()
        const { leadId, title, description, assignedTo } = body

        if (!leadId || !title || !assignedTo) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const task = await Task.create({ leadId, title, description, assignedTo })
        const populatedTask = await Task.findById(task._id).populate('leadId', 'name subject chatId').populate('assignedTo', 'name email')

        ActivityLog.create({
            userId: user.id,
            action: 'Created Task',
            target: title
        }).catch(e => console.error("Log error:", e))

        return NextResponse.json({ task: populatedTask }, { status: 201 })
    } catch (err: any) {
        if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status })
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
