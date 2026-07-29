import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import ActivityLog from '@/models/ActivityLog'
import User from '@/models/User' // Need to import User so populate works
import { requireAdmin, AuthError } from '@/lib/auth'

export async function GET() {
    try {
        await requireAdmin()
        await connectToDatabase()

        // Fetch the 50 most recent logs, populate the user details
        const logs = await ActivityLog.find().sort({ createdAt: -1 }).lean()
            .sort({ createdAt: -1 })
            .limit(50)
            .populate({ path: 'userId', select: 'name role email' })

        return NextResponse.json({ logs }, { status: 200 })
    } catch (err: any) {
        if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status })
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
