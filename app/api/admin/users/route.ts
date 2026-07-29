import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import User from '@/models/User'
import { requireAdmin, AuthError } from '@/lib/auth'

export async function POST(req: Request) {
    try {
        await requireAdmin()

        const { name, email, password, role } = await req.json()
        await connectToDatabase()

        if (!['developer', 'admin'].includes(role)) {
            return NextResponse.json({ error: 'Invalid role for staff account.' }, { status: 400 })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 })
        }

        const newUser = new User({ name, email, password, role })
        await newUser.save()

        return NextResponse.json({ message: 'Staff account created successfully', user: { name: newUser.name, email: newUser.email, role: newUser.role } }, { status: 201 })
    } catch (err: any) {
        console.error("CREATE_STAFF_ERROR:", err)
        if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status })
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
