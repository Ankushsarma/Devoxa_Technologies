import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import User from '@/models/User'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

import { getJwtSecret } from '@/lib/auth'

export async function GET() {
    try {
        const cookieStore = cookies()
        const token = (await cookieStore).get('auth_token')?.value

        if (!token) {
            return NextResponse.json({ user: null })
        }

        const decoded: any = jwt.verify(token, getJwtSecret())
        await connectToDatabase()

        const user = await User.findById(decoded.id).select('-password')
        if (!user) {
            return NextResponse.json({ user: null })
        }

        return NextResponse.json({ user })
    } catch (err) {
        return NextResponse.json({ user: null })
    }
}
