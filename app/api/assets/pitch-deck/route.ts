import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { requireAuth, requireAdmin, AuthError } from '@/lib/auth'

export async function GET() {
    try {
        await requireAuth()
        const filePath = path.join(process.cwd(), 'public', 'Devoxa-Pitch-Deck.pdf')

        if (!fs.existsSync(filePath)) {
            return NextResponse.json({ error: 'Pitch deck file is missing' }, { status: 404 })
        }

        const buffer = fs.readFileSync(filePath)

        return new NextResponse(buffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="Devoxa-Pitch-Deck.pdf"`,
            },
        })
    } catch (err: any) {
        if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status })
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}

// For Admin to upload/update
export async function POST(req: Request) {
    try {
        await requireAdmin()
        const { name, data, contentType } = await req.json()

        const buffer = Buffer.from(data, 'base64')
        const filePath = path.join(process.cwd(), 'public', 'Devoxa-Pitch-Deck.pdf')

        fs.writeFileSync(filePath, buffer)

        return NextResponse.json({ message: 'Asset updated successfully' })
    } catch (err: any) {
        if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status })
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
