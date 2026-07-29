import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import Lead from '@/models/Lead'
import { requireManager, AuthError } from '@/lib/auth'

export async function GET() {
    try {
        const user = await requireManager()
        await connectToDatabase()

        let query: any = {}
        if (user.role === 'manager') query.managerId = user.id

        const leads = await Lead.find(query).sort({ createdAt: -1 }).lean()
        return NextResponse.json({ leads })
    } catch (err: any) {
        if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status })
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
