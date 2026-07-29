"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { Chat } from "@/components/chat"
import Image from "next/image"
import { Folder, CheckCircle2, ClipboardList, Rss } from "lucide-react"
import { NoticeBoard } from "@/components/notice-board"

export default function ManagerDashboard() {
    const { user, role, loading } = useAuth()
    const router = useRouter()
    const [assignments, setAssignments] = useState<any[]>([])
    const [selectedLead, setSelectedLead] = useState<any | null>(null)
    const [updating, setUpdating] = useState(false)
    const [activeTab, setActiveTab] = useState<"pipeline" | "global-notice">("pipeline")

    useEffect(() => {
        if (!loading && role !== "manager" && role !== "admin") {
            router.push("/login")
        }
    }, [loading, role, router])

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const res = await fetch("/api/leads/manager")
                const data = await res.json()
                if (data.leads) setAssignments(data.leads)
            } catch (err) {
                console.error("Fetch data error:", err)
            }
        }
        if (role === "manager" || role === "admin") fetchAssignments()
    }, [role])

    if (loading || (role !== "manager" && role !== "admin")) return <div className="p-20 text-center">Loading Manager HQ...</div>

    const handleChecklistUpdate = async (checklistKey: string, newValue: any) => {
        if (!selectedLead) return
        setUpdating(true)
        try {
            const res = await fetch(`/api/leads/${selectedLead._id}/manager-checklist`, {
                method: "PATCH",
                body: JSON.stringify({ [checklistKey]: newValue }),
                headers: { "Content-Type": "application/json" }
            })
            const data = await res.json()
            if (res.ok) {
                setSelectedLead(data.lead)
                setAssignments(prev => prev.map(l => l._id === data.lead._id ? data.lead : l))
            }
        } finally { setUpdating(false) }
    }

    const handleDealStatusUpdate = async (status: string) => {
        if (!selectedLead) return

        let message = undefined
        if (status === 'lost') {
            const result = prompt("Please provide a custom rejection message for this client:")
            if (result === null) return // Canceled
            message = result
        }

        setUpdating(true)
        try {
            const res = await fetch(`/api/leads/${selectedLead._id}/deal-status`, {
                method: "PATCH",
                body: JSON.stringify({ dealStatus: status, message }),
                headers: { "Content-Type": "application/json" }
            })
            const data = await res.json()
            if (res.ok) {
                setSelectedLead(data.lead)
                setAssignments(prev => prev.map(l => l._id === data.lead._id ? data.lead : l))
            }
        } finally { setUpdating(false) }
    }

    return (
        <div className="min-h-screen bg-background p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-12 border-b border-border pb-6">
                    <div className="flex items-center gap-4">
                        <Image src="/logo.png" alt="Logo" width={48} height={48} className="rounded-lg" />
                        <div>
                            <h1 className="text-2xl font-bold">Manager HQ</h1>
                            <p className="text-secondary text-sm">Lead Pipeline & Pre-Deal Briefing</p>
                        </div>
                    </div>
                    <button onClick={() => router.push("/")} className="text-sm font-semibold opacity-60 hover:opacity-100 uppercase tracking-widest font-mono">
                        ← Site Home
                    </button>
                </header>

                {/* Tab Nav */}
                <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-4">
                    <button
                        onClick={() => setActiveTab("pipeline")}
                        className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === "pipeline" ? "bg-studio-black text-white shadow-md" : "text-secondary hover:bg-neutral-100 hover:text-foreground"}`}
                    >
                        Pipeline <span className="ml-1 opacity-70">({assignments.length})</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("global-notice")}
                        className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === "global-notice" ? "bg-studio-black text-white shadow-md" : "text-secondary hover:bg-neutral-100 hover:text-foreground"}`}
                    >
                        <span className="flex items-center gap-2"><Rss className="w-3.5 h-3.5" />Global Notice</span>
                    </button>
                </div>

                {activeTab === "global-notice" ? (
                    <NoticeBoard />
                ) : (
                    <div className="grid lg:grid-cols-4 gap-8">
                        {/* Assignment List */}
                        <div className="lg:col-span-1 space-y-4">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-secondary mb-4">
                                Pipeline ({assignments.length})
                            </h2>
                            <div className="space-y-2">
                                {assignments.map(lead => (
                                    <button
                                        key={lead._id}
                                        onClick={() => setSelectedLead(lead)}
                                        className={`w-full p-4 rounded-xl text-left transition-all border ${selectedLead?._id === lead._id ? "bg-studio-black text-white border-studio-black shadow-lg" : "bg-card border-border hover:bg-surface-container-low"}`}
                                    >
                                        <p className="font-bold text-sm tracking-tight">{lead.name}</p>
                                        <p className={`text-xs mt-0.5 ${selectedLead?._id === lead._id ? "text-neutral-300" : "text-secondary"}`}>{lead.subject}</p>
                                        <span className={`mt-2 inline-block text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm border ${lead.dealStatus === 'won' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                            lead.dealStatus === 'lost' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                                selectedLead?._id === lead._id ? 'bg-white/10 text-white border-white/20' : 'bg-neutral-100 text-neutral-500 border-border'
                                            }`}>
                                            Deal: {lead.dealStatus}
                                        </span>
                                    </button>
                                ))}
                                {assignments.length === 0 && (
                                    <p className="text-sm text-secondary italic">No active leads in pipeline.</p>
                                )}
                            </div>
                        </div>

                        {/* Dashboard Tools */}
                        <div className="lg:col-span-3 space-y-6">
                            {selectedLead ? (
                                <>
                                    {/* Briefing Controls */}
                                    <div className="glass-card rounded-2xl border border-border p-6 md:p-8 space-y-8 bg-white shadow-sm">
                                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                                            <div>
                                                <h3 className="font-bold text-2xl tracking-tight">{selectedLead.name}</h3>
                                                <p className="text-neutral-500 text-sm mt-1">{selectedLead.email}</p>
                                            </div>

                                            <div className="flex bg-neutral-100 rounded-lg p-1 border border-neutral-200">
                                                <button
                                                    disabled={updating}
                                                    onClick={() => handleDealStatusUpdate('pending')}
                                                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${selectedLead.dealStatus === 'pending' ? 'bg-white text-black shadow-sm' : 'text-neutral-500 hover:text-black'}`}
                                                >Pending</button>
                                                <button
                                                    disabled={updating}
                                                    onClick={() => handleDealStatusUpdate('lost')}
                                                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${selectedLead.dealStatus === 'lost' ? 'bg-red-500 text-white shadow-sm' : 'text-neutral-500 hover:text-red-500'}`}
                                                >Lost</button>
                                                <button
                                                    disabled={updating}
                                                    onClick={() => handleDealStatusUpdate('won')}
                                                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${selectedLead.dealStatus === 'won' ? 'bg-green-500 text-white shadow-sm' : 'text-neutral-500 hover:text-green-500'}`}
                                                >Won</button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-border pt-8">
                                            <div className="flex flex-col gap-2 p-4 rounded-xl border border-border bg-neutral-50/50 hover:bg-neutral-50 transition-colors">
                                                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-1">Discovery Call</label>
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="date"
                                                        disabled={updating}
                                                        value={selectedLead.managerChecklist?.callScheduled ? new Date(selectedLead.managerChecklist.callScheduled).toISOString().split('T')[0] : ''}
                                                        onChange={(e) => handleChecklistUpdate('callScheduled', e.target.value)}
                                                        className="w-full text-sm bg-white border border-border rounded-lg px-3 py-2 outline-none focus:border-black"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-2 p-4 rounded-xl border border-border bg-neutral-50/50 hover:bg-neutral-50 transition-colors">
                                                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-1">Client Briefed?</label>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <button
                                                        disabled={updating}
                                                        onClick={() => handleChecklistUpdate('clientBrief', !selectedLead.managerChecklist?.clientBrief)}
                                                        className={`relative flex items-center justify-center w-6 h-6 rounded-md border transition-all ${selectedLead.managerChecklist?.clientBrief ? 'bg-studio-black border-studio-black text-white' : 'bg-white border-neutral-300 text-transparent'}`}
                                                    >
                                                        <CheckCircle2 className="w-4 h-4" />
                                                    </button>
                                                    <span className="text-sm font-medium">{selectedLead.managerChecklist?.clientBrief ? "Brief Verified" : "Pending Brief"}</span>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-2 p-4 rounded-xl border border-border bg-neutral-50/50 hover:bg-neutral-50 transition-colors">
                                                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-1">Proposal Delivery</label>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <button
                                                        disabled={updating}
                                                        onClick={() => handleChecklistUpdate('proposalSent', !selectedLead.managerChecklist?.proposalSent)}
                                                        className={`relative flex items-center justify-center w-6 h-6 rounded-md border transition-all ${selectedLead.managerChecklist?.proposalSent ? 'bg-studio-black border-studio-black text-white' : 'bg-white border-neutral-300 text-transparent'}`}
                                                    >
                                                        <CheckCircle2 className="w-4 h-4" />
                                                    </button>
                                                    <span className="text-sm font-medium">{selectedLead.managerChecklist?.proposalSent ? "Proposal Sent" : "No Proposal"}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {selectedLead.dealStatus === 'lost' && (
                                            <div className="bg-red-50 text-red-600 border border-red-100 rounded-lg p-4 text-xs font-medium">
                                                Note: This deal is flagged as lost. In 24 hours, the chat history and sensitive data directly accessible here will be securely scrubbed from the active pipeline.
                                            </div>
                                        )}
                                    </div>

                                    {/* Chat Interface Layer */}
                                    <div className="rounded-2xl overflow-hidden border border-border shadow-sm">
                                        <div className="bg-studio-black text-white px-6 py-4 flex items-center justify-between">
                                            <h4 className="font-bold tracking-tight">Direct Client Comms</h4>
                                            <span className="text-[10px] font-mono uppercase text-neutral-400">Encrypted Chat</span>
                                        </div>
                                        <Chat chatId={selectedLead.chatId} />
                                    </div>
                                </>
                            ) : (
                                <div className="h-[500px] glass-card rounded-3xl border border-dashed border-border flex items-center justify-center text-center p-10 bg-neutral-50/50">
                                    <div>
                                        <div className="w-16 h-16 bg-white shadow-sm border border-neutral-200 rounded-full flex items-center justify-center mx-auto mb-5">
                                            <ClipboardList className="text-neutral-400 w-8 h-8" />
                                        </div>
                                        <h3 className="text-xl font-bold tracking-tight">Manager Pipeline</h3>
                                        <p className="text-secondary text-sm max-w-sm mx-auto mt-2 leading-relaxed">Select a lead from the pipeline array to manage their briefing documents and establish direct chat comms.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
