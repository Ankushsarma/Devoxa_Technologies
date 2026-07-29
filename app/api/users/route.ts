import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import User from '@/models/User'
import { requireAdmin, AuthError } from '@/lib/auth'

export async function GET(req: Request) {
    try {
        await requireAdmin()

        const { searchParams } = new URL(req.url)
        const roleParam = searchParams.get('role')

        await connectToDatabase()
        const query = roleParam ? { role: roleParam } : {}
        const users = await User.find(query).select('-password').sort({ createdAt: -1 }).lean()
        return NextResponse.json({ users })
    } catch (err: any) {
        if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status })
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
}
