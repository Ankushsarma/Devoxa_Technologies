import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import Lead from '@/models/Lead'
import { requireClient, AuthError } from '@/lib/auth'

export async function GET() {
    try {
        const user = await requireClient()
        await connectToDatabase()

        let lead = await Lead.findOne({ email: user.email, status: { $nin: ['new', 'rejected'] } })
            .sort({ createdAt: -1 })
            .populate('assignedTo', 'name email')

        if (!lead) {
            lead = await Lead.findOne({ email: user.email })
                .sort({ createdAt: -1 })
                .populate('assignedTo', 'name email')
        }

        // Fetch ALL moms for this email to handle cases where admin added MOM to an older duplicate lead
        const allLeadsForEmail = await Lead.find({ email: user.email }).lean()
        const allMoms = allLeadsForEmail.reduce((acc: any[], l) => [...acc, ...(l.moms || [])], [])
        allMoms.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

        const leadObj: any = lead ? lead.toObject() : null
        if (leadObj) {
            leadObj.moms = allMoms
        }

        return NextResponse.json({ lead: leadObj })
    } catch (err: any) {
        if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status })
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
