import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import Project from '@/models/Project'
import { requireAuth, requireAdmin, AuthError } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// Public: get all projects
export async function GET() {
    try {
        await connectToDatabase()
        const projects = await Project.find({}).sort({ order: 1, createdAt: -1 }).lean()
        return NextResponse.json({ projects })
    } catch (err: any) {
        if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status })
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}

// Admin only: create a new project
export async function POST(req: Request) {
    try {
        await requireAdmin()
        const data = await req.json()
        await connectToDatabase()
        const project = await Project.create(data)
        return NextResponse.json({ project }, { status: 201 })
    } catch (err: any) {
        if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status })
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
