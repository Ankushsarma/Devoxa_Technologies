"use client"

import { useEffect, useState } from "react"
import { CalendarClock, Zap, Activity } from "lucide-react"

export function NoticeBoard() {
    const [ongoingDeals, setOngoingDeals] = useState<any[]>([])
    const [pendingCalls, setPendingCalls] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBoard = async () => {
            try {
                const res = await fetch("/api/leads/notice-board")
                const data = await res.json()
                if (data.ongoingDeals) setOngoingDeals(data.ongoingDeals)
                if (data.pendingCalls) setPendingCalls(data.pendingCalls)
            } catch (err) {
                console.error("Notice Board Fetch Error:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchBoard()
        const interval = setInterval(fetchBoard, 15000)
        return () => clearInterval(interval)
    }, [])

    if (loading) return <div className="p-12 text-center text-sm font-mono uppercase tracking-widest text-neutral-400">Loading Notice Board...</div>

    return (
        <div className="grid lg:grid-cols-2 gap-8 min-h-[500px]">
            {/* Pending Calls List */}
            <div className="bg-white border border-border rounded-2xl p-6 shadow-sm overflow-hidden flex flex-col">
                <div className="flex items-center gap-3 mb-6 border-b border-border pb-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                        <CalendarClock className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg tracking-tight text-neutral-900">Pending Calls</h3>
                        <p className="text-secondary text-xs uppercase font-bold tracking-wider">Scheduled Briefings ({pendingCalls.length})</p>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                    {pendingCalls.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-48 text-center bg-neutral-50/50 rounded-xl border border-dashed border-border">
                            <p className="text-sm text-secondary italic">No calls scheduled actively.</p>
                        </div>
                    ) : pendingCalls.map((lead) => (
                        <div key={lead._id} className="p-4 rounded-xl border border-border hover:border-orange-200 hover:bg-orange-50/30 transition-colors bg-white shadow-sm flex items-start gap-4">
                            <div className="shrink-0 flex items-center flex-col justify-center w-14 h-14 bg-neutral-100 rounded-lg text-studio-black border border-neutral-200">
                                <span className="text-xs font-bold font-mono tracking-tighter">
                                    {new Date(lead.managerChecklist.callScheduled).toLocaleDateString('en-US', { month: 'short' })}
                                </span>
                                <span className="text-lg font-bold font-mono tracking-tighter leading-none mt-0.5">
                                    {new Date(lead.managerChecklist.callScheduled).getDate()}
                                </span>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm tracking-tight text-neutral-900 leading-tight">{lead.name}</h4>
                                <p className="text-xs text-secondary mt-0.5 max-w-[200px] truncate">{lead.subject}</p>
                                <div className="mt-2 text-[10px] uppercase font-bold tracking-widest text-orange-600 flex items-center gap-1">
                                    Manager: {lead.managerId?.name || "Unassigned"}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Ongoing Deals Tracker */}
            <div className="bg-white border border-border rounded-2xl p-6 shadow-sm overflow-hidden flex flex-col">
                <div className="flex items-center gap-3 mb-6 border-b border-border pb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                        <Activity className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg tracking-tight text-neutral-900">Ongoing Deals</h3>
                        <p className="text-secondary text-xs uppercase font-bold tracking-wider">Active Pipeline ({ongoingDeals.length})</p>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                    {ongoingDeals.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-48 text-center bg-neutral-50/50 rounded-xl border border-dashed border-border">
                            <p className="text-sm text-secondary italic">No ongoing deals in pipeline.</p>
                        </div>
                    ) : ongoingDeals.map((deal) => (
                        <div key={deal._id} className="group p-4 rounded-xl border border-border hover:border-black transition-colors bg-white shadow-sm flex items-center justify-between">
                            <div>
                                <h4 className="font-bold text-sm tracking-tight text-neutral-900 leading-tight group-hover:text-black transition-colors">{deal.name}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[10px] uppercase font-bold border border-border px-1.5 py-0.5 rounded tracking-widest text-neutral-500">
                                        {deal.status.replace("_", " ")}
                                    </span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 mb-0.5">Assigned Developer</div>
                                <div className="text-xs font-semibold text-studio-black flex items-center justify-end gap-1.5">
                                    <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
                                    {deal.assignedTo?.name || "Pending..."}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
