import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import { rateLimit } from '@/lib/rate-limit'
import User from '@/models/User'

export async function POST(req: Request) {
    try {
        const rateLimitResult = rateLimit(req, { limit: 5, windowMs: 60000 * 5 }) // 5 requests per 5 minutes
        if (!rateLimitResult.success) {
            return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
        }

        const { token, newPassword } = await req.json()

        if (!token || !newPassword) {
            return NextResponse.json({ error: 'Token and new password are required' }, { status: 400 })
        }

        await connectToDatabase()

        // Find user by token and ensure token is not expired
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() }
        })

        if (!user) {
            return NextResponse.json({ error: 'Invalid or expired reset token' }, { status: 400 })
        }

        // Update password (pre-save hook will hash it)
        user.password = newPassword

        // Clear reset token fields
        user.resetToken = undefined
        user.resetTokenExpiry = undefined

        await user.save()

        return NextResponse.json({ message: 'Password reset successfully' })
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
