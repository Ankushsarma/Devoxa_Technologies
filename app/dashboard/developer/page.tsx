"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { Chat } from "@/components/chat"
import Image from "next/image"
import { Folder, Clock, CheckCircle2, ClipboardList, MessageSquare, X, Rss } from "lucide-react"
import { NoticeBoard } from "@/components/notice-board"

export default function DeveloperDashboard() {
    const { user, role, loading } = useAuth()
    const router = useRouter()
    const [assignments, setAssignments] = useState<any[]>([])
    const [tasks, setTasks] = useState<any[]>([])
    const [selectedLead, setSelectedLead] = useState<any | null>(null)
    const [activeTab, setActiveTab] = useState<"projects" | "notice-board" | "global-notice">("projects")
    const [updating, setUpdating] = useState(false)
    const [activeChatModal, setActiveChatModal] = useState<{ chatId: string, clientName: string } | null>(null)

    useEffect(() => {
        if (!loading && role !== "developer" && role !== "admin") {
            router.push("/login")
        }
    }, [loading, role, router])

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const [res, taskRes] = await Promise.all([
                    fetch("/api/leads/assigned"),
                    fetch(`/api/tasks?t=${Date.now()}`)
                ])
                const [data, taskData] = await Promise.all([
                    res.json(),
                    taskRes.json()
                ])
                if (data.leads) setAssignments(data.leads)
                if (taskData.tasks) setTasks(taskData.tasks)
            } catch (err) {
                console.error("Fetch data error:", err)
            }
        }
        if (role === "developer") fetchAssignments()
    }, [role])

    if (loading || (role !== "developer" && role !== "admin")) return <div className="p-20 text-center">Loading Dev Studio...</div>

    return (
        <div className="min-h-screen bg-background p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-12">
                    <div className="flex items-center gap-4">
                        <Image src="/logo.png" alt="Logo" width={48} height={48} className="rounded-lg" />
                        <div>
                            <h1 className="text-2xl font-bold">Dev Studio</h1>
                            <p className="text-secondary text-sm">Your Assigned Projects</p>
                        </div>
                    </div>
                    <button onClick={() => router.push("/")} className="text-sm font-semibold opacity-60 hover:opacity-100">
                        ← Site Home
                    </button>
                </header>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-4">
                    <button
                        onClick={() => setActiveTab("projects")}
                        className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === "projects" ? "bg-studio-black text-[#FFFFFF] shadow-md" : "text-secondary hover:bg-neutral-100 hover:text-foreground"}`}
                    >
                        Assigned Projects <span className="ml-1 opacity-70">({assignments.length})</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("notice-board")}
                        className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === "notice-board" ? "bg-studio-black text-[#FFFFFF] shadow-md" : "text-secondary hover:bg-neutral-100 hover:text-foreground"}`}
                    >
                        Task Board <span className="ml-1 opacity-70">({tasks.length})</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("global-notice")}
                        className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === "global-notice" ? "bg-studio-black text-[#FFFFFF] shadow-md" : "text-secondary hover:bg-neutral-100 hover:text-foreground"}`}
                    >
                        <span className="flex items-center gap-2"><Rss className="w-3.5 h-3.5" />Global Notice</span>
                    </button>
                </div>

                {activeTab === "global-notice" ? (
                    <NoticeBoard />
                ) : activeTab === "projects" ? (
                    <div className="grid lg:grid-cols-4 gap-8">
                        {/* Assignment List */}
                        <div className="lg:col-span-1 space-y-4">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-secondary mb-4">
                                Assigned Projects ({assignments.length})
                            </h2>
                            <div className="space-y-2">
                                {assignments.map(lead => (
                                    <button
                                        key={lead._id}
                                        onClick={() => setSelectedLead(lead)}
                                        className={`w-full p-4 rounded-xl text-left transition-all border ${selectedLead?._id === lead._id ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:bg-surface-container-low"}`}
                                    >
                                        <p className="font-bold text-sm">{lead.name}</p>
                                        <p className={`text-xs ${selectedLead?._id === lead._id ? "opacity-70" : "text-secondary"}`}>{lead.subject}</p>
                                        <span className={`mt-1 inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${lead.status === 'assigned' ? 'bg-blue-500/10 text-blue-500' : 'bg-green-500/10 text-green-500'}`}>
                                            {lead.status}
                                        </span>
                                    </button>
                                ))}
                                {assignments.length === 0 && (
                                    <p className="text-sm text-secondary italic">No projects assigned yet.</p>
                                )}
                            </div>
                        </div>

                        {/* Project Detail + Chat */}
                        <div className="lg:col-span-3 space-y-6">
                            {selectedLead ? (
                                <>
                                    {/* Lead Info Card */}
                                    <div className="glass-card rounded-2xl border border-border p-6 space-y-3">
                                        <h3 className="font-bold text-lg">{selectedLead.name}</h3>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div><span className="text-secondary">Email:</span> <span className="font-medium">{selectedLead.email}</span></div>
                                            <div><span className="text-secondary">Service:</span> <span className="font-medium">{selectedLead.subject}</span></div>
                                            <div><span className="text-secondary">Assigned:</span> <span className="font-medium">{selectedLead.assignedAt ? new Date(selectedLead.assignedAt).toLocaleDateString() : "N/A"}</span></div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-secondary">Status:</span>
                                                <select
                                                    disabled={updating}
                                                    value={selectedLead.status}
                                                    onChange={async (e) => {
                                                        const newStatus = e.target.value
                                                        setUpdating(true)
                                                        try {
                                                            const res = await fetch(`/api/leads/${selectedLead._id}`, {
                                                                method: "PATCH",
                                                                body: JSON.stringify({ status: newStatus }),
                                                                headers: { "Content-Type": "application/json" }
                                                            })
                                                            const data = await res.json()
                                                            console.log(data);
                                                            if (res.ok) {
                                                                setSelectedLead(data.lead)
                                                                setAssignments(prev => prev.map(l => l._id === data.lead._id ? data.lead : l))
                                                            }
                                                        } finally { setUpdating(false) }
                                                    }}
                                                    className="text-xs font-semibold uppercase bg-background border border-border rounded px-2 py-1 cursor-pointer"
                                                >
                                                    <option value="assigned">Assigned</option>
                                                    <option value="pending">Pending</option>
                                                    <option value="working">Working</option>
                                                    <option value="done">Done ✅</option>
                                                </select>
                                            </div>
                                        </div>
                                        {selectedLead.message && (
                                            <div className="bg-muted rounded-lg p-4 text-sm">
                                                <span className="text-secondary text-xs uppercase font-bold">Client Message</span>
                                                <p className="mt-1">{selectedLead.message}</p>
                                            </div>
                                        )}

                                        {/* Task List Notice Board */}
                                        <div className="mt-6 border-t border-border pt-6">
                                            <h4 className="text-sm font-bold uppercase tracking-wider text-secondary mb-4 flex items-center gap-2">
                                                <ClipboardList className="w-4 h-4" /> Project Tasks
                                            </h4>
                                            {tasks.filter(t => (t.leadId?._id || t.leadId) === selectedLead._id).length === 0 ? (
                                                <div className="bg-surface-container-low rounded-xl p-6 text-center border border-dashed border-border">
                                                    <p className="text-sm text-secondary italic">No tasks assigned for this project yet.</p>
                                                </div>
                                            ) : (
                                                <div className="space-y-3">
                                                    {tasks.filter(t => (t.leadId?._id || t.leadId) === selectedLead._id).map(task => (
                                                        <div key={task._id} className="group relative flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-border p-4 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 overflow-hidden">
                                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-studio-black/10 group-hover:bg-studio-black transition-colors"></div>
                                                            <div className="pl-2 mb-3 sm:mb-0">
                                                                <h5 className="font-bold text-sm text-foreground">{task.title}</h5>
                                                                {task.description && <p className="text-xs text-secondary mt-1 max-w-md line-clamp-2">{task.description}</p>}
                                                            </div>
                                                            <select
                                                                value={task.status}
                                                                onChange={async (e) => {
                                                                    const newStatus = e.target.value
                                                                    const res = await fetch(`/api/tasks/${task._id}`, {
                                                                        method: "PATCH",
                                                                        body: JSON.stringify({ status: newStatus }),
                                                                        headers: { "Content-Type": "application/json" }
                                                                    })
                                                                    const data = await res.json()
                                                                    if (res.ok) {
                                                                        setTasks(prev => prev.map(t => t._id === task._id ? data.task : t))
                                                                    }
                                                                }}
                                                                className={`text-xs font-bold uppercase border rounded-lg px-3 py-2 cursor-pointer outline-none transition-all shadow-sm focus:ring-2 focus:ring-offset-1 focus:ring-studio-black/20 ${task.status === 'done' ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' :
                                                                        task.status === 'in-progress' ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' :
                                                                            task.status === 'review' ? 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100' :
                                                                                'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100'
                                                                    }`}
                                                            >
                                                                <option value="todo">To Do</option>
                                                                <option value="in-progress">In Progress</option>
                                                                <option value="review">Review</option>
                                                                <option value="done">Done ✅</option>
                                                            </select>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {/* Chat  */}
                                    <Chat chatId={selectedLead.chatId} />
                                </>
                            ) : (
                                <div className="h-[500px] glass-card rounded-2xl border border-border flex items-center justify-center text-center p-10">
                                    <div>
                                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                            <span className="material-symbols-outlined text-secondary text-3xl">work</span>
                                        </div>
                                        <h3 className="text-lg font-bold">Select a Project</h3>
                                        <p className="text-secondary text-sm max-w-xs mx-auto">Pick an assigned project from the left to view details and chat.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="min-h-[500px]">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight text-neutral-900">Task Board</h2>
                                <p className="text-sm text-secondary mt-1">Manage your active development tasks across all projects.</p>
                            </div>
                        </div>
                        {tasks.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-[400px] text-center border-2 border-dashed border-border rounded-3xl bg-surface-container-low/50">
                                <div className="w-16 h-16 bg-white shadow-sm border border-border rounded-full flex items-center justify-center mb-4">
                                    <CheckCircle2 className="w-8 h-8 text-neutral-300" />
                                </div>
                                <h3 className="text-lg font-bold text-neutral-700">All caught up!</h3>
                                <p className="text-sm text-secondary mt-1 max-w-sm">You don't have any active tasks assigned to you right now. Take a break!</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {tasks.map(task => (
                                    <div key={task._id} className="group relative bg-white border border-border rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-black/[0.03] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden">
                                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-studio-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                        <div>
                                            <div className="flex justify-between items-start mb-4">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-50 border border-neutral-100 text-neutral-700 text-[10px] font-bold uppercase tracking-wider">
                                                    <Folder className="w-3 h-3 text-neutral-400" />
                                                    {task.leadId?.name || "Unknown"}
                                                </span>
                                            </div>
                                            <h3 className="font-bold text-lg text-neutral-900 leading-tight mb-2 group-hover:text-studio-black transition-colors">{task.title}</h3>
                                            {task.description && <p className="text-sm text-secondary line-clamp-3 leading-relaxed mb-4">{task.description}</p>}

                                            {task.leadId?.chatId && (
                                                <button
                                                    onClick={() => setActiveChatModal({ chatId: task.leadId.chatId, clientName: task.leadId.name })}
                                                    className="flex items-center gap-2 text-xs font-bold text-studio-black bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded-lg transition-colors"
                                                >
                                                    <MessageSquare className="w-3.5 h-3.5" />
                                                    Chat with Client
                                                </button>
                                            )}
                                        </div>

                                        <div className="mt-6 pt-5 border-t border-border/50 flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-xs font-semibold text-secondary">
                                                <Clock className="w-3.5 h-3.5" />
                                                Update Status
                                            </div>
                                            <select
                                                value={task.status}
                                                onChange={async (e) => {
                                                    const newStatus = e.target.value
                                                    const res = await fetch(`/api/tasks/${task._id}`, {
                                                        method: "PATCH",
                                                        body: JSON.stringify({ status: newStatus }),
                                                        headers: { "Content-Type": "application/json" }
                                                    })
                                                    const data = await res.json()
                                                    if (res.ok) {
                                                        setTasks(prev => prev.map(t => t._id === task._id ? data.task : t))
                                                    }
                                                }}
                                                className={`text-xs font-bold uppercase border rounded-lg px-3 py-2 cursor-pointer outline-none transition-all shadow-sm focus:ring-2 focus:ring-offset-1 focus:ring-studio-black/20 ${task.status === 'done' ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' :
                                                        task.status === 'in-progress' ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' :
                                                            task.status === 'review' ? 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100' :
                                                                'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100'
                                                    }`}
                                            >
                                                <option value="todo">To Do</option>
                                                <option value="in-progress">In Progress</option>
                                                <option value="review">Review</option>
                                                <option value="done">Done ✅</option>
                                            </select>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Global Chat Modal for Task Board */}
            {activeChatModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border border-border flex flex-col h-[80vh] min-h-[400px] max-h-[700px]">
                        <div className="p-4 border-b border-border flex justify-between items-center bg-neutral-50 shrink-0">
                            <div>
                                <h3 className="font-bold text-studio-black">Client Chat</h3>
                                <p className="text-xs text-secondary">Messaging {activeChatModal.clientName}</p>
                            </div>
                            <button onClick={() => setActiveChatModal(null)} className="p-2 hover:bg-neutral-200 rounded-full transition-colors">
                                <X className="w-5 h-5 text-neutral-500" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-hidden bg-white">
                            <Chat chatId={activeChatModal.chatId} className="h-full border-none shadow-none rounded-none" />
                        </div>
                    </div>
                </div>
            )}

            <link
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                rel="stylesheet"
            />
        </div>
    )
}
