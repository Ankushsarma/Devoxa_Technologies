import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import Lead from '@/models/Lead'
import Message from '@/models/Message'
import { requireAdmin, AuthError } from '@/lib/auth'

export async function GET(req: Request) {
    try {
        const authHeader = req.headers.get('authorization')
        // Allow either CRON_SECRET or Admin user
        if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            // fallback to admin verification if no valid cron secret is passed
            await requireAdmin()
        }

        await connectToDatabase()

        // 24 hours ago
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)

        const lostLeads = await Lead.find({
            status: 'lost',
            dealLostAt: { $lte: oneDayAgo },
            chatId: { $ne: null }
        })

        let deletedChatsCount = 0

        for (const lead of lostLeads) {
            // Delete messages
            await Message.deleteMany({ chatId: lead.chatId })

            // Wipe the chatId from the lead so it doesn't try again
            lead.chatId = null
            await lead.save()
            deletedChatsCount++
        }

        return NextResponse.json({ message: `Cleanup complete. Deleted chats for ${deletedChatsCount} lost leads.` })
    } catch (err: any) {
        if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status })
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
