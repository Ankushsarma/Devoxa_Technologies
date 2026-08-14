import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import { rateLimit } from '@/lib/rate-limit'
import Message from '@/models/Message'
import Lead from '@/models/Lead'
import { requireAuth, AuthError } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
    try {
        const user = await requireAuth()
        const { searchParams } = new URL(req.url)
        const chatId = searchParams.get('chatId')

        if (!chatId) {
            return NextResponse.json({ error: 'chatId is required' }, { status: 400 })
        }

        await connectToDatabase()

        // Restrict Access
        if (user.role === 'client' && user.chatId !== chatId) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        } else if (user.role === 'developer') {
            const lead = await Lead.findOne({ chatId, assignedTo: user.id })
            if (!lead) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        } else if (user.role === 'manager') {
            const lead = await Lead.findOne({ chatId, managerId: user.id })
            if (!lead) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }
        const messages = await Message.find({ chatId }).sort({ createdAt: 1 })
        return NextResponse.json({ messages })
    } catch (err: any) {
        if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status })
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const user = await requireAuth()
        const rateLimitResult = rateLimit(req, { limit: 30, windowMs: 60000 }) // 30 messages per minute
        if (!rateLimitResult.success) {
            return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
        }

        const { chatId, text, receiverId } = await req.json()
        if (!chatId || !text || text.trim() === '' || text.length > 2000) {
            return NextResponse.json({ error: 'Invalid message payload' }, { status: 400 })
        }

        await connectToDatabase()

        // Restrict Access
        if (user.role === 'client' && user.chatId !== chatId) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        } else if (user.role === 'developer') {
            const lead = await Lead.findOne({ chatId, assignedTo: user.id })
            if (!lead) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        } else if (user.role === 'manager') {
            const lead = await Lead.findOne({ chatId, managerId: user.id })
            if (!lead) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        const newMessage = new Message({
            chatId,
            text,
            receiverId,
            senderId: user.id,
            senderName: user.name
        })
        await newMessage.save()

        // Distribute notification if a Manager shares a document link
        if (user.role === 'manager' && (text.includes('http://') || text.includes('https://') || text.includes('www.'))) {
            const clientLead = await Lead.findOne({ chatId })
            if (clientLead && clientLead.email) {
                const { sendEmail } = await import('@/lib/email')
                await sendEmail({
                    to: clientLead.email,
                    subject: 'New Document Shared in Your Portal',
                    html: `<p>Hi ${clientLead.name},</p><p>Your manager has just shared a new file or document in your secure chat portal!</p><p><strong>Message preview:</strong><br/>${text}</p><p>Please log in to your dashboard to review it: <a href="https://www.devoxatechnologies.com/login">https://www.devoxatechnologies.com/login</a></p>`
                }).catch(e => console.error("File share email failure:", e))
            }
        }

        return NextResponse.json({ message: 'Message sent', data: newMessage })
    } catch (err: any) {
        if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status })
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
