"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/auth-context"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar } from "lucide-react"

export default function ClientMomPage() {
    const { user, loading } = useAuth()
    const router = useRouter()
    const params = useParams()
    const momId = params.id

    const [mom, setMom] = useState<any>(null)
    const [fetching, setFetching] = useState(true)

    useEffect(() => {
        if (!loading && !user) router.push("/login")

        const fetchLead = async () => {
            if (user?.email) {
                try {
                    const res = await fetch(`/api/leads/client?t=${Date.now()}`)
                    if (res.ok) {
                        const data = await res.json()
                        const lead = data.lead
                        const index = parseInt(momId as string)
                        
                        let foundMom = null;
                        if (lead) {
                            if (!isNaN(index) && lead.moms && lead.moms[index]) {
                                foundMom = lead.moms[index]
                            } else if (lead.moms) {
                                foundMom = lead.moms.find((m: any) => m._id === momId)
                            }
                        }

                        if (foundMom) {
                            setMom(foundMom)
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
    }, [user, loading, router, momId])

    if (loading || fetching) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
    if (!mom) return (
        <div className="min-h-screen flex items-center justify-center flex-col gap-4">
            <p className="font-serif italic text-lg text-neutral-500">Meeting notes not found.</p>
            <p className="text-sm text-neutral-400">ID: {momId}</p>
            <Link href="/dashboard/client" className="text-[10px] font-bold tracking-wider text-neutral-700 border border-neutral-200 bg-white px-4 py-2.5 rounded-lg hover:bg-neutral-50 transition-colors uppercase">
                Return to Workspace
            </Link>
        </div>
    )

    const momDate = new Date(mom.createdAt)

    return (
        <div className="min-h-screen bg-white text-neutral-900 font-sans pb-4 md:pb-6 pt-4 md:pt-6 px-4 md:px-8">
            <div className="w-full mx-auto">
                <div className="p-6 md:p-8 border-b border-neutral-100 flex items-center justify-between">
                    <Link href="/dashboard/client" className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-neutral-500 hover:text-neutral-900 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Workspace
                    </Link>
                </div>
                <div className="p-8 md:p-12">
                    <div className="flex items-center gap-3 mb-6 text-[#C5A880]">
                        <Calendar className="w-5 h-5" />
                        <span className="text-[10px] font-bold tracking-widest uppercase">{momDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                    <h1 className="font-serif text-3xl md:text-4xl text-neutral-900 mb-8">{mom.title || "Minutes of Meeting"}</h1>
                    <div className="text-sm text-neutral-600 leading-relaxed whitespace-pre-wrap">
                        {mom.content}
                    </div>
                </div>
            </div>
        </div>
    )
}
