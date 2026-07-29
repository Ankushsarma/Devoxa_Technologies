"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ClientMomListPage() {
    const { user, loading } = useAuth()
    const router = useRouter()

    const [lead, setLead] = useState<any>(null)
    const [fetching, setFetching] = useState(true)

    useEffect(() => {
        if (!loading && !user) router.push("/login")

        const fetchLead = async () => {
            if (user) {
                try {
                    const res = await fetch(`/api/leads/client?t=${Date.now()}`)
                    if (res.ok) {
                        const data = await res.json()
                        if (data.lead) {
                            setLead(data.lead)
                        }
                    }
                } catch (error) {
                    console.error("Failed to fetch lead", error)
                } finally {
                    setFetching(false)
                }
            }
        }

        if (user) fetchLead()
    }, [user, loading, router])

    if (loading || fetching) return <div className="p-20 text-center font-mono text-sm uppercase tracking-widest text-neutral-400">Loading Meeting Notes...</div>
    if (!lead || !lead.moms || lead.moms.length === 0) return (
        <div className="min-h-screen flex items-center justify-center flex-col gap-4 bg-white text-neutral-900 font-sans">
            <p className="font-serif italic text-lg text-neutral-500">No meeting notes available yet.</p>
            <Link href="/dashboard/client" className="text-[10px] font-bold tracking-wider text-neutral-700 border border-neutral-200 px-4 py-2.5 rounded-lg hover:bg-neutral-50 transition-colors uppercase">
                Return to Workspace
            </Link>
        </div>
    )

    return (
        <div className="min-h-screen bg-white text-neutral-900 font-sans pb-4 md:pb-6 pt-4 md:pt-6 px-4 md:px-8">
            <div className="w-full mx-auto">
                {/* Header */}
                <div className="p-6 md:p-8 border-b border-neutral-100 flex items-center justify-between mb-8">
                    <Link href="/dashboard/client" className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-neutral-500 hover:text-neutral-900 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Workspace
                    </Link>
                    <h1 className="font-serif text-2xl text-neutral-900">All Meeting Notes</h1>
                </div>

                <div className="space-y-6">
                    {lead.moms.map((mom: any, index: number) => {
                        const momDate = new Date(mom.createdAt)
                        return (
                            <div key={index} className="border border-neutral-200 rounded-2xl bg-white shadow-sm flex flex-col md:flex-row overflow-hidden group">
                                {/* Date Sidebar */}
                                <div className="bg-[#FAF8F5] md:w-36 p-6 border-b md:border-b-0 md:border-r border-neutral-200 flex flex-col items-center justify-center shrink-0">
                                    <p className="text-[10px] font-bold tracking-widest uppercase text-neutral-800">{momDate.toLocaleString('default', { weekday: 'long' })}</p>
                                    <p className="text-[10px] font-bold tracking-widest uppercase text-neutral-500 mt-2">{momDate.toLocaleString('default', { month: 'long' })}</p>
                                    <p className="font-serif text-4xl text-neutral-900 leading-none mt-1">{momDate.getDate()}</p>
                                    <p className="text-[10px] font-bold tracking-widest uppercase text-neutral-500 mt-2">{momDate.getFullYear()}</p>
                                </div>
                                {/* Content */}
                                <div className="p-6 md:p-8 flex-1">
                                    <h3 className="font-serif text-xl font-medium text-neutral-900 mb-2">{mom.title || 'Minutes of Meeting (MoM)'}</h3>
                                    <p className="text-sm font-medium text-[#C5A880] mb-4">Date: {momDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                    <div className="text-sm text-neutral-600 leading-relaxed line-clamp-3">
                                        {mom.content || mom.title}
                                    </div>
                                    <Link 
                                        href={`/dashboard/client/mom/${index}`}
                                        className="mt-6 text-[10px] font-bold tracking-wider uppercase text-[#C5A880] hover:text-[#B0926A] transition-colors inline-flex items-center gap-1 w-max"
                                    >
                                        Read More <span className="text-lg leading-none">→</span>
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
