import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import Task from '@/models/Task'
import ActivityLog from '@/models/ActivityLog'
import { requireAuth, requireAdmin, AuthError } from '@/lib/auth'

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const user = await requireAuth();
        await connectToDatabase()

        const task = await Task.findById(id)
        if (!task) return NextResponse.json({ error: 'Task not found' }, { status: 404 })

        if (user.role === 'developer' && task.assignedTo.toString() !== user.id) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }
        if (user.role === 'client') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        const body = await req.json()
        if (body.status) task.status = body.status
        await task.save()

        const updatedTask = await Task.findById(task._id).populate('leadId', 'name subject').populate('assignedTo', 'name email')

        if (body.status) {
            ActivityLog.create({
                userId: user.id,
                action: 'update_task',
                details: `Updated task status: ${task.title} to ${body.status}`,
                ipAddress: req.headers.get('x-forwarded-for') || 'unknown'
            }).catch(e => console.error("Log error:", e))
        }

        return NextResponse.json({ task: updatedTask })
    } catch (err: any) {
        if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status })
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        await requireAdmin();

        await connectToDatabase()
        await Task.findByIdAndDelete(id)

        return NextResponse.json({ message: 'Task deleted successfully' })
    } catch (err: any) {
        if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status })
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
