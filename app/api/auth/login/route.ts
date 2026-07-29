import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import { rateLimit } from '@/lib/rate-limit'
import User from '@/models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'
import ActivityLog from '@/models/ActivityLog'

import { getJwtSecret } from '@/lib/auth'

export async function POST(req: Request) {
    try {
        const rateLimitResult = rateLimit(req, { limit: 5, windowMs: 60000 })
        if (!rateLimitResult.success) {
            return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
        }

        const { email, password, loginType } = await req.json()
        await connectToDatabase()

        const user = await User.findOne({ email }).lean()
        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
        }

        if (loginType) {
            if (loginType === 'client' && user.role !== 'client') {
                return NextResponse.json({ error: 'Please use the Staff/Admin login option for this account.' }, { status: 403 })
            }
            if (loginType === 'staff' && user.role === 'client') {
                return NextResponse.json({ error: 'Please use the Client login option for this account.' }, { status: 403 })
            }
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            getJwtSecret(),
            { expiresIn: '7d' }
        )

        const cookie = serialize('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
        })

        // Fire-and-forget activity logging to speed up response time
        ActivityLog.create({
            userId: user._id,
            action: 'Logged in',
            target: 'System'
        }).catch(err => console.error("Activity logging error:", err))

        const response = NextResponse.json({
            message: 'Logged in successfully',
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        })

        response.headers.set('Set-Cookie', cookie)
        return response
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
