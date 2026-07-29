import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import Lead from '@/models/Lead'
import { requireAuth, AuthError } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const user = await requireAuth()
        if (user.role === 'client') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

        await connectToDatabase()

        const activeStates = ['reviewed', 'discovery', 'contacted', 'assigned', 'pending', 'working', 'pending_development']

        // Populate standard user references for UI rendering
        const ongoingDeals = await Lead.find({ status: { $in: activeStates } }).sort({ createdAt: -1 }).lean()
            .populate('assignedTo', 'name email')
            .populate('managerId', 'name email')
            .sort({ createdAt: -1 })

        // Fetch Leads that have a scheduled call but aren't totally closed
        const pendingCalls = await Lead.find({
            'managerChecklist.callScheduled': { $ne: null },
            status: { $nin: ['done', 'lost', 'rejected'] }
        }).sort({ createdAt: -1 }).lean()
            .populate('assignedTo', 'name email')
            .populate('managerId', 'name email')
            .sort({ 'managerChecklist.callScheduled': 1 })

        return NextResponse.json({ ongoingDeals, pendingCalls })
    } catch (err: any) {
        if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status })
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
