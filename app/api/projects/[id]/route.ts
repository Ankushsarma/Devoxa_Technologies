import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import Project from '@/models/Project'
import { requireAdmin, AuthError } from '@/lib/auth'

// Admin only: delete a project
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await requireAdmin()

        const { id } = await params
        await connectToDatabase()
        await Project.findByIdAndDelete(id)
        return NextResponse.json({ message: 'Project deleted' })
    } catch (err: any) {
        if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status })
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
