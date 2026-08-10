"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FolderOpen, Type, AlignLeft, UserPlus, ClipboardList, Folder, FileText, Rss } from "lucide-react"
import { ChevronDown, User, Mail, Lock, Shield } from "lucide-react"
import { NoticeBoard } from "@/components/notice-board"

export default function AdminDashboard() {
    const { user, role, loading } = useAuth()
    const router = useRouter()
    const [users, setUsers] = useState<any[]>([])
    const [leads, setLeads] = useState<any[]>([])
    const [tasks, setTasks] = useState<any[]>([])
    const [logs, setLogs] = useState<any[]>([])
    const [activeTab, setActiveTab] = useState<"users" | "leads" | "assets" | "projects" | "notice-board" | "logs" | "global-notice">("leads")
    const [uploading, setUploading] = useState(false)
    const [developers, setDevelopers] = useState<any[]>([])
    const [assigning, setAssigning] = useState<string | null>(null)
    const [accepting, setAccepting] = useState<string | null>(null)
    const [rejecting, setRejecting] = useState<string | null>(null)
    const [newUserForm, setNewUserForm] = useState({ name: "", email: "", password: "", role: "developer" })
    const [creatingUser, setCreatingUser] = useState(false)
    const [newTaskForm, setNewTaskForm] = useState({ leadId: "", title: "", description: "", assignedTo: "" })
    const [creatingTask, setCreatingTask] = useState(false)
    const [projects, setProjects] = useState<any[]>([])
    const [projectForm, setProjectForm] = useState({ title: "", description: "", imageUrl: "", visitUrl: "" })
    const [savingProject, setSavingProject] = useState(false)
    const [momForm, setMomForm] = useState<{ leadId: string, title: string, content: string } | null>(null)
    const [sendingMom, setSendingMom] = useState(false)

    useEffect(() => {
        if (!loading && role !== "admin") {
            router.push("/login")
        }
    }, [loading, role, router])

    // Restore active tab from local storage
    useEffect(() => {
        const savedTab = localStorage.getItem("adminActiveTab") as any
        if (savedTab) setActiveTab(savedTab)
    }, [])

    // Save active tab to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem("adminActiveTab", activeTab)
    }, [activeTab])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [leadsRes, usersRes, tasksRes, logsRes] = await Promise.all([
                    fetch("/api/leads"),
                    fetch("/api/users"),
                    fetch("/api/tasks"),
                    fetch("/api/logs")
                ])

                const [leadsData, usersData, tasksData, logsData] = await Promise.all([
                    leadsRes.json(),
                    usersRes.json(),
                    tasksRes.json(),
                    logsRes.json()
                ])

                if (leadsData.leads) setLeads(leadsData.leads)
                if (usersData.users) {
                    setUsers(usersData.users)
                    setDevelopers(usersData.users.filter((u: any) => u.role === 'developer'))
                }
                if (tasksData.tasks) setTasks(tasksData.tasks)
                if (logsData.logs) setLogs(logsData.logs)
            } catch (err) {
                console.error("Fetch error:", err)
            }
        }

        if (role === "admin") {
            fetchData()
            // Fetch Projects
            fetch("/api/projects").then(r => r.json()).then(d => { if (d.projects) setProjects(d.projects) })

            const interval = setInterval(() => {
                fetchData()
                fetch("/api/projects").then(r => r.json()).then(d => { if (d.projects) setProjects(d.projects) })
            }, 5000)

            return () => clearInterval(interval)
        }
    }, [role])

    if (loading || role !== "admin") return <div className="p-20 text-center">Loading Admin Panel...</div>

    return (
        <div className="min-h-screen bg-background p-6 pt-4 md:p-12 md:pt-6">
            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12 border-b border-[#705474]/20 pb-8">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-[#523056] p-[2px] shadow-[0_0_40px_rgba(139,47,209,0.25)] shrink-0 group">
                            <div className="w-full h-full bg-[#0B0819] rounded-[14px] flex items-center justify-center p-2 overflow-hidden">
                                <Image src="/logo.png" alt="Logo" width={56} height={56} className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500" />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#f1eef1]">
                                Admin <span className="text-[#705474]">Panel.</span>
                            </h1>
                            <p className="text-[#f1eef1]/60 text-sm md:text-base mt-1 font-mono tracking-wide">System Overview & Management</p>
                        </div>
                    </div>
                    <button
                        onClick={() => router.push("/")}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent border border-[#705474]/30 text-xs font-mono font-bold uppercase tracking-widest text-[#705474] hover:text-[#f1eef1] hover:bg-[#150B1E] hover:border-[#705474]/60 hover:shadow-[0_0_20px_rgba(139,47,209,0.2)] transition-all active:scale-95"
                    >
                        <span className="text-lg leading-none">&larr;</span> Back to Site
                    </button>
                </header>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-4">
                    <button
                        onClick={() => setActiveTab("leads")}
                        className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === "leads" ? "bg-[#523056] text-white shadow-[0_0_15px_rgba(139,47,209,0.3)]" : "text-secondary hover:bg-[#523056]/50 hover:text-foreground"}`}
                    >
                        Project Leads <span className="ml-1 opacity-70">({leads.length})</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("users")}
                        className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === "users" ? "bg-[#523056] text-white shadow-[0_0_15px_rgba(139,47,209,0.3)]" : "text-secondary hover:bg-[#523056]/50 hover:text-foreground"}`}
                    >
                        All Profiles <span className="ml-1 opacity-70">({users.length})</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("notice-board")}
                        className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === "notice-board" ? "bg-[#523056] text-white shadow-[0_0_15px_rgba(139,47,209,0.3)]" : "text-secondary hover:bg-[#523056]/50 hover:text-foreground"}`}
                    >
                        Task Board <span className="ml-1 opacity-70">({tasks.length})</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("assets")}
                        className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === "assets" ? "bg-[#523056] text-white shadow-[0_0_15px_rgba(139,47,209,0.3)]" : "text-secondary hover:bg-[#523056]/50 hover:text-foreground"}`}
                    >
                        Assets
                    </button>
                    <button
                        onClick={() => setActiveTab("logs")}
                        className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === "logs" ? "bg-[#523056] text-white shadow-[0_0_15px_rgba(139,47,209,0.3)]" : "text-secondary hover:bg-[#523056]/50 hover:text-foreground"}`}
                    >
                        Visitor Log
                    </button>
                    <button
                        onClick={() => setActiveTab("projects")}
                        className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all active:scale-95 ${activeTab === "projects" ? "bg-[#523056] text-white shadow-[0_0_15px_rgba(139,47,209,0.3)]" : "text-secondary hover:bg-[#523056]/50 hover:text-foreground"}`}
                    >
                        Portfolio <span className="ml-1 opacity-70\">({projects.length})</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("global-notice")}
                        className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === "global-notice" ? "bg-[#523056] text-white shadow-[0_0_15px_rgba(139,47,209,0.3)]" : "text-secondary hover:bg-[#523056]/50 hover:text-foreground"}`}
                    >
                        <span className="flex items-center gap-2"><Rss className="w-3.5 h-3.5" />Global Notice</span>
                    </button>
                </div>

                {/* Content */}
                <div className={activeTab === "assets" || activeTab === "global-notice" ? "space-y-6" : "bg-[#0A0710] rounded-2xl border border-[#705474]/30 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden"}>
                    {activeTab === "global-notice" ? (
                        <NoticeBoard />
                    ) : activeTab === "leads" ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-[#150B1E]/80 border-b border-[#705474]/30">
                                    <tr>
                                        <th className="px-4 py-4 text-xs font-mono uppercase tracking-widest text-[#f1eef1]/70 font-medium">Name</th>
                                        <th className="px-4 py-4 text-xs font-mono uppercase tracking-widest text-[#f1eef1]/70 font-medium">Email</th>
                                        <th className="px-4 py-4 text-xs font-mono uppercase tracking-widest text-[#f1eef1]/70 font-medium">Subject</th>
                                        <th className="px-4 py-4 text-xs font-mono uppercase tracking-widest text-[#f1eef1]/70 font-medium">Date</th>
                                        <th className="px-4 py-4 text-xs font-mono uppercase tracking-widest text-[#f1eef1]/70 font-medium">Status</th>
                                        <th className="px-4 py-4 text-xs font-mono uppercase tracking-widest text-[#f1eef1]/70 font-medium">Action</th>
                                        <th className="px-4 py-4 text-xs font-mono uppercase tracking-widest text-[#f1eef1]/70 font-medium">Assign Developer</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#705474]/20">
                                    {leads.map((lead) => (
                                        <tr key={lead._id || lead.id} className="hover:bg-[#150B1E]/50 transition-colors group">
                                            <td className="px-4 py-5 font-serif text-lg text-white max-w-[120px] truncate" title={lead.name}>{lead.name}</td>
                                            <td className="px-4 py-5 text-sm text-[#f1eef1]/70 max-w-[180px] truncate" title={lead.email}>{lead.email}</td>
                                            <td className="px-4 py-5">
                                                <span className="px-3 py-1.5 rounded-md bg-[#523056]/50 text-[#f1eef1]/90 text-xs font-medium font-mono whitespace-nowrap">{lead.subject}</span>
                                            </td>
                                            <td className="px-4 py-5 text-xs text-[#f1eef1]/50 font-mono whitespace-nowrap">{lead.createdAt ? new Date(lead.createdAt).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' }) : "N/A"}</td>
                                            <td className="px-4 py-5">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border whitespace-nowrap ${lead.status === 'new' ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'}`}>
                                                    {lead.status || "new"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-5">
                                                {lead.status === 'new' && (
                                                    <div className="flex flex-col gap-2">
                                                        <button
                                                            disabled={accepting === lead._id || rejecting === lead._id}
                                                            onClick={async () => {
                                                                setAccepting(lead._id)
                                                                try {
                                                                    const res = await fetch(`/api/leads/${lead._id}/accept`, { method: "POST" })
                                                                    const data = await res.json()
                                                                    if (res.ok) {
                                                                        alert("Client accepted! Credentials have been sent to their email.")
                                                                        setLeads((prev: any[]) => prev.map(l => l._id === lead._id ? data.lead : l))
                                                                    } else {
                                                                        alert(`Error: ${data.error}`)
                                                                    }
                                                                } finally {
                                                                    setAccepting(null)
                                                                }
                                                            }}
                                                            className="w-full whitespace-nowrap bg-theme-900 text-[#f1eef1] text-xs font-medium px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md hover:bg-neutral-800 hover:-translate-y-0.5 active:scale-95 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:hover:translate-y-0 disabled:active:scale-100"
                                                        >
                                                            {accepting === lead._id ? "Accepting..." : "Accept Client"}
                                                        </button>
                                                        <button
                                                            disabled={accepting === lead._id || rejecting === lead._id}
                                                            onClick={async () => {
                                                                if (!confirm("Are you sure you want to reject this lead?")) return
                                                                setRejecting(lead._id)
                                                                try {
                                                                    const res = await fetch(`/api/leads/${lead._id}`, {
                                                                        method: "PATCH",
                                                                        body: JSON.stringify({ status: 'rejected' }),
                                                                        headers: { "Content-Type": "application/json" }
                                                                    })
                                                                    const data = await res.json()
                                                                    if (res.ok) {
                                                                        setLeads((prev: any[]) => prev.map(l => l._id === lead._id ? data.lead : l))
                                                                    } else {
                                                                        alert(`Error: ${data.error}`)
                                                                    }
                                                                } finally {
                                                                    setRejecting(null)
                                                                }
                                                            }}
                                                            className="w-full whitespace-nowrap text-red-500 border border-transparent text-xs font-medium px-4 py-2.5 rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all duration-200 disabled:opacity-50"
                                                        >
                                                            {rejecting === lead._id ? "Rejecting..." : "Reject Lead"}
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-4 py-5">
                                                <DropdownMenu modal={false}>
                                                    <DropdownMenuTrigger
                                                        disabled={assigning === lead._id || lead.status === 'new'}
                                                        className="flex items-center justify-between w-full max-w-[160px] bg-[#0A0710] border border-[#705474]/30 rounded-lg px-3 py-2.5 text-sm shadow-sm hover:border-black transition-colors focus:ring-2 focus:ring-black/5 focus:border-[#705474] data-[state=open]:border-black disabled:opacity-40 disabled:bg-[#150B1E] disabled:cursor-not-allowed outline-none font-medium text-[#f1eef1]/90"
                                                    >
                                                        <span className="truncate">
                                                            {lead.assignedTo ? developers.find(d => d._id === (lead.assignedTo?._id || lead.assignedTo))?.name || "— Unassigned —" : "— Unassigned —"}
                                                        </span>
                                                        <ChevronDown className="h-4 w-4 opacity-50 shrink-0" />
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent className="w-[160px] bg-background text-foreground shadow-md rounded-md border p-1" align="start">
                                                        <DropdownMenuItem
                                                            className="cursor-pointer focus:bg-[#523056]/50 py-2 text-secondary font-medium"
                                                            onClick={async () => {
                                                                setAssigning(lead._id)
                                                                try {
                                                                    const res = await fetch(`/api/leads/${lead._id}`, {
                                                                        method: "PATCH",
                                                                        body: JSON.stringify({ assignedTo: null }),
                                                                        headers: { "Content-Type": "application/json" }
                                                                    })
                                                                    const data = await res.json()
                                                                    if (res.ok) {
                                                                        setLeads((prev: any[]) => prev.map(l =>
                                                                            l._id === lead._id ? data.lead : l
                                                                        ))
                                                                    }
                                                                } finally { setAssigning(null) }
                                                            }}
                                                        >
                                                            — Unassigned —
                                                        </DropdownMenuItem>
                                                        {developers.map((dev: any) => (
                                                            <DropdownMenuItem
                                                                key={dev._id}
                                                                className="cursor-pointer focus:bg-[#523056]/50 py-2 font-medium"
                                                                onClick={async () => {
                                                                    setAssigning(lead._id)
                                                                    try {
                                                                        const res = await fetch(`/api/leads/${lead._id}`, {
                                                                            method: "PATCH",
                                                                            body: JSON.stringify({ assignedTo: dev._id }),
                                                                            headers: { "Content-Type": "application/json" }
                                                                        })
                                                                        const data = await res.json()
                                                                        if (res.ok) {
                                                                            setLeads((prev: any[]) => prev.map(l =>
                                                                                l._id === lead._id ? data.lead : l
                                                                            ))
                                                                        }
                                                                    } finally { setAssigning(null) }
                                                                }}
                                                            >
                                                                {dev.name}
                                                            </DropdownMenuItem>
                                                        ))}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : activeTab === "users" ? (
                        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 pt-2">
                            {/* Left Side: Users List */}
                            <div className="flex-1 min-h-[500px]">
                                <div className="flex flex-col gap-4">
                                    {/* Header Row */}
                                    <div className="hidden md:grid grid-cols-12 gap-4 px-6 pb-2 border-b border-[#705474]/30 text-[10px] font-mono uppercase tracking-widest text-[#f1eef1]/50">
                                        <div className="col-span-6">Profile Details</div>
                                        <div className="col-span-3">System Role</div>
                                        <div className="col-span-3">Date Joined</div>
                                    </div>

                                    {/* User Cards */}
                                    {users.map((u) => (
                                        <div key={u._id || u.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-4 items-center p-5 md:p-6 bg-[#0A0710] border border-[#705474]/30 hover:border-[#705474] transition-all rounded-2xl shadow-sm group">
                                            <div className="col-span-6 flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-[#523056]/50 flex items-center justify-center font-bold text-lg text-white group-hover:bg-studio-black group-hover:text-[#f1eef1] transition-colors shrink-0">
                                                    {u.name?.[0]?.toUpperCase()}
                                                </div>
                                                <div className="truncate">
                                                    <div className="font-bold text-base text-white truncate">{u.name}</div>
                                                    <div className="text-sm font-medium text-[#f1eef1]/70 truncate">{u.email}</div>
                                                </div>
                                            </div>
                                            <div className="col-span-3">
                                                <span className={`inline-flex px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest ${u.role === 'admin' ? 'bg-orange-50 text-orange-600 border border-orange-100' : u.role === 'developer' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                                                    {u.role}
                                                </span>
                                            </div>
                                            <div className="col-span-3 text-[13px] font-medium text-[#f1eef1]/50 font-mono">
                                                {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "N/A"}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Side: Create Account Form */}
                            <div className="w-full lg:w-[400px] shrink-0">
                                <div className="sticky top-8 bg-[#150B1E]/50 border border-[#705474]/30 rounded-2xl p-8">
                                    <div className="mb-8">
                                        <h3 className="font-serif text-3xl tracking-tight text-white mb-2 italic">New Staff.</h3>
                                        <p className="text-[#f1eef1]/70 text-sm leading-relaxed">Provision internal dashboard access for a new team member.</p>
                                    </div>
                                    <form onSubmit={async (e) => {
                                        e.preventDefault()
                                        setCreatingUser(true)
                                        try {
                                            const res = await fetch("/api/admin/users", {
                                                method: "POST",
                                                body: JSON.stringify(newUserForm),
                                                headers: { "Content-Type": "application/json" }
                                            })
                                            const data = await res.json()
                                            if (res.ok) {
                                                alert("Staff account created!")
                                                setNewUserForm({ name: "", email: "", password: "", role: "developer" })
                                                const usersRes = await fetch("/api/users")
                                                const usersData = await usersRes.json()
                                                if (usersData.users) {
                                                    setUsers(usersData.users)
                                                    setDevelopers(usersData.users.filter((u: any) => u.role === 'developer'))
                                                }
                                            } else {
                                                alert(`Error: ${data.error}`)
                                            }
                                        } finally {
                                            setCreatingUser(false)
                                        }
                                    }} className="space-y-5">
                                        <div>
                                            <label className="block font-mono text-[10px] uppercase tracking-widest text-[#f1eef1]/50 mb-2">Full Name</label>
                                            <input type="text" placeholder="John Doe" required value={newUserForm.name} onChange={e => setNewUserForm({ ...newUserForm, name: e.target.value })} className="w-full text-sm border border-[#705474]/30 rounded-xl px-4 py-3.5 bg-[#0A0710] focus:border-[#705474] focus:ring-1 focus:ring-studio-black outline-none transition-all placeholder:text-[#f1eef1]/30" />
                                        </div>
                                        <div>
                                            <label className="block font-mono text-[10px] uppercase tracking-widest text-[#f1eef1]/50 mb-2">Email Address</label>
                                            <input type="email" placeholder="john@devoxa.tech" required value={newUserForm.email} onChange={e => setNewUserForm({ ...newUserForm, email: e.target.value })} className="w-full text-sm border border-[#705474]/30 rounded-xl px-4 py-3.5 bg-[#0A0710] focus:border-[#705474] focus:ring-1 focus:ring-studio-black outline-none transition-all placeholder:text-[#f1eef1]/30" />
                                        </div>
                                        <div>
                                            <label className="block font-mono text-[10px] uppercase tracking-widest text-[#f1eef1]/50 mb-2">Password</label>
                                            <input type="password" placeholder="••••••••" required value={newUserForm.password} onChange={e => setNewUserForm({ ...newUserForm, password: e.target.value })} className="w-full text-sm border border-[#705474]/30 rounded-xl px-4 py-3.5 bg-[#0A0710] focus:border-[#705474] focus:ring-1 focus:ring-studio-black outline-none transition-all placeholder:text-[#f1eef1]/30" />
                                        </div>
                                        <div>
                                            <label className="block font-mono text-[10px] uppercase tracking-widest text-[#f1eef1]/50 mb-2">Role Level</label>
                                            <Select required value={newUserForm.role} onValueChange={val => setNewUserForm({ ...newUserForm, role: val })}>
                                                <SelectTrigger className="w-full text-sm border border-[#705474]/30 rounded-xl px-4 py-3.5 bg-[#0A0710] focus:border-[#705474] focus:ring-1 focus:ring-studio-black transition-all shadow-none outline-none h-auto">
                                                    <SelectValue placeholder="Select Role" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-[#0A0710] border-[#705474]/30 shadow-xl rounded-xl">
                                                    <SelectItem value="developer" className="cursor-pointer focus:bg-[#523056]/50 py-2.5 rounded-lg">Developer</SelectItem>
                                                    <SelectItem value="admin" className="cursor-pointer focus:bg-[#523056]/50 py-2.5 rounded-lg">Admin</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <button disabled={creatingUser} className="w-full bg-studio-black text-[#f1eef1] text-xs font-mono uppercase tracking-widest py-4 rounded-xl hover:bg-neutral-800 hover:-translate-y-0.5 active:scale-95 transition-all disabled:opacity-50 mt-4 border border-[#705474] shadow-sm">
                                            {creatingUser ? "Creating..." : "Create Account"}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    ) : activeTab === "notice-board" ? (
                        <div className="flex flex-col xl:flex-row">
                            {/* Left Side: Tasks Grid */}
                            <div className="flex-1 p-6 lg:p-8 bg-[#150B1E]/30 min-h-[500px]">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-bold tracking-tight text-white">Active Tasks</h2>
                                </div>
                                {tasks.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-64 text-center border-2 border-dashed border-[#705474]/30 rounded-2xl bg-[#0A0710]">
                                        <div className="w-12 h-12 bg-[#523056]/50 rounded-full flex items-center justify-center mb-3">
                                            <ClipboardList className="w-6 h-6 text-[#f1eef1]/50" />
                                        </div>
                                        <h3 className="font-bold text-[#f1eef1]/90">No active tasks</h3>
                                        <p className="text-sm text-[#f1eef1]/70 mt-1">Assign a task to a developer to get started.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {tasks.map((task) => (
                                            <div key={task._id || task.id} className="bg-[#0A0710] border border-[#705474]/30 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between">
                                                <div>
                                                    <div className="flex justify-between items-start mb-3">
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#523056]/50 text-[#f1eef1]/80 text-[10px] font-bold uppercase tracking-wider">
                                                            <Folder className="w-3 h-3" />
                                                            {task.leadId?.name || "Unknown"}
                                                        </span>
                                                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${task.status === 'todo' ? 'bg-orange-50 text-orange-600 border border-orange-100' : task.status === 'in-progress' ? 'bg-blue-50 text-blue-600 border border-blue-100' : task.status === 'review' ? 'bg-purple-50 text-theme-500 border border-theme-600' : 'bg-green-50 text-green-600 border border-green-100'}`}>
                                                            {(task.status || 'todo').replace('-', ' ')}
                                                        </span>
                                                    </div>
                                                    <h3 className="font-bold text-white leading-tight mb-1">{task.title}</h3>
                                                    {task.description && <p className="text-xs text-[#f1eef1]/70 line-clamp-2 mt-1.5">{task.description}</p>}
                                                </div>
                                                <div className="mt-5 pt-4 border-t border-[#705474]/10 flex items-center gap-2.5">
                                                    <div className="w-6 h-6 rounded-full bg-studio-black text-[#f1eef1] flex items-center justify-center text-[10px] font-bold">
                                                        {task.assignedTo?.name?.[0]?.toUpperCase() || "?"}
                                                    </div>
                                                    <span className="text-xs font-semibold text-[#f1eef1]/90">{task.assignedTo?.name || "Unassigned"}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Right Side: Create Task Form */}
                            <div className="w-full xl:w-[420px] bg-[#0A0710] p-6 lg:p-8 border-l border-border relative z-10 shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.05)]">
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold tracking-tight text-white mb-1">Create Task</h3>
                                    <p className="text-[#f1eef1]/70 text-sm">Break down projects and assign tasks.</p>
                                </div>
                                <form onSubmit={async (e) => {
                                    e.preventDefault()
                                    setCreatingTask(true)
                                    try {
                                        const res = await fetch("/api/tasks", {
                                            method: "POST",
                                            body: JSON.stringify(newTaskForm),
                                            headers: { "Content-Type": "application/json" }
                                        })
                                        const data = await res.json()
                                        if (res.ok) {
                                            setTasks([data.task, ...tasks])
                                            setNewTaskForm({ leadId: "", title: "", description: "", assignedTo: "" })
                                        } else {
                                            alert(`Error: ${data.error}`)
                                        }
                                    } finally {
                                        setCreatingTask(false)
                                    }
                                }} className="space-y-4">
                                    <div>
                                        <label className="block text-[11px] font-bold mb-1.5 uppercase tracking-wider text-[#f1eef1]/70">Project / Lead</label>
                                        <div className="relative">
                                            <FolderOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#f1eef1]/50 z-10" />
                                            <Select required value={newTaskForm.leadId} onValueChange={val => setNewTaskForm({ ...newTaskForm, leadId: val })}>
                                                <SelectTrigger className="w-full pl-10 text-sm border-[#705474]/30 rounded-xl bg-[#150B1E]/50 hover:bg-[#150B1E] focus:bg-[#0A0710] focus:ring-2 focus:ring-studio-black/5 focus:border-neutral-400 transition-all shadow-none">
                                                    <SelectValue placeholder="Select Project" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-[#0A0710] border-[#705474]/30 shadow-xl rounded-xl">
                                                    {leads.filter(l => l.status !== 'new' && l.status !== 'rejected').map(l => (
                                                        <SelectItem key={l._id} value={l._id} className="cursor-pointer focus:bg-[#523056]/50 rounded-lg">{l.name} - {l.subject}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold mb-1.5 uppercase tracking-wider text-[#f1eef1]/70">Task Title</label>
                                        <div className="relative">
                                            <Type className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#f1eef1]/50" />
                                            <input type="text" placeholder="e.g. Build Homepage" required value={newTaskForm.title} onChange={e => setNewTaskForm({ ...newTaskForm, title: e.target.value })} className="w-full text-sm border border-[#705474]/30 rounded-xl pl-10 pr-4 py-2.5 bg-[#150B1E]/50 hover:bg-[#150B1E] focus:bg-[#0A0710] focus:ring-2 focus:ring-studio-black/5 focus:border-neutral-400 outline-none transition-all" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold mb-1.5 uppercase tracking-wider text-[#f1eef1]/70">Description</label>
                                        <div className="relative">
                                            <AlignLeft className="absolute left-3.5 top-3.5 w-[18px] h-[18px] text-[#f1eef1]/50" />
                                            <textarea placeholder="Task details..." value={newTaskForm.description} onChange={e => setNewTaskForm({ ...newTaskForm, description: e.target.value })} className="w-full text-sm border border-[#705474]/30 rounded-xl pl-10 pr-4 py-2.5 bg-[#150B1E]/50 hover:bg-[#150B1E] focus:bg-[#0A0710] focus:ring-2 focus:ring-studio-black/5 focus:border-neutral-400 outline-none transition-all resize-none h-24" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold mb-1.5 uppercase tracking-wider text-[#f1eef1]/70">Assign To</label>
                                        <div className="relative">
                                            <UserPlus className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#f1eef1]/50 z-10" />
                                            <Select required value={newTaskForm.assignedTo} onValueChange={val => setNewTaskForm({ ...newTaskForm, assignedTo: val })}>
                                                <SelectTrigger className="w-full pl-10 text-sm border-[#705474]/30 rounded-xl bg-[#150B1E]/50 hover:bg-[#150B1E] focus:bg-[#0A0710] focus:ring-2 focus:ring-studio-black/5 focus:border-neutral-400 transition-all shadow-none">
                                                    <SelectValue placeholder="Select Developer" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-[#0A0710] border-[#705474]/30 shadow-xl rounded-xl">
                                                    {developers.map(dev => (
                                                        <SelectItem key={dev._id} value={dev._id} className="cursor-pointer focus:bg-[#523056]/50 rounded-lg">{dev.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <button disabled={creatingTask} className="w-full bg-studio-black text-[#f1eef1] text-sm font-bold p-3 rounded-xl hover:bg-neutral-800 hover:-translate-y-0.5 active:scale-95 transition-all shadow-lg shadow-black/10 disabled:opacity-50 mt-4">
                                        {creatingTask ? "Assigning..." : "Assign Task"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    ) : activeTab === "assets" ? (
                        <>
                            <div className="bg-[#0A0710] p-8 md:p-16 relative overflow-hidden group rounded-2xl border border-[#705474]/30 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                                <div className="absolute top-0 left-0 w-full h-1 bg-studio-black transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                                <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-12">
                                    <div className="flex-1 text-center md:text-left">
                                        <div className="flex items-center justify-center md:justify-start gap-5 mb-5">
                                            <div className="w-12 h-12 bg-[#523056]/50 rounded-xl flex items-center justify-center transition-transform group-hover:-translate-y-1 duration-500">
                                                <FileText className="text-white w-5 h-5" />
                                            </div>
                                            <h3 className="font-serif text-4xl md:text-5xl tracking-tight text-white font-medium">Pitch Deck.</h3>
                                        </div>
                                        <div className="text-[#f1eef1]/70 text-sm md:text-base leading-relaxed max-w-xl mx-auto md:mx-0 space-y-4">
                                            <p>
                                                Upload the latest Devoxa Technologies pitch deck. This PDF is automatically attached to emails sent via Resend API to new inquiries.
                                            </p>
                                            <p>
                                                Make sure your document highlights our core services, recent portfolio updates, and the unique value proposition of our agency.
                                            </p>
                                            <p className="text-xs md:text-sm text-[#f1eef1]/50">
                                                Tip: Keep the file size under 5MB to ensure optimal deliverability and fast loading times for our prospective clients.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="w-full md:w-[400px] flex flex-col space-y-4 pt-4 md:pt-14">
                                        <input
                                            type="file"
                                            id="pitch-deck-upload"
                                            accept=".pdf"
                                            className="hidden"
                                            onChange={async (e) => {
                                                const file = e.target.files?.[0]
                                                if (!file) return

                                                setUploading(true)
                                                try {
                                                    const reader = new FileReader()
                                                    reader.onload = async () => {
                                                        const base64 = (reader.result as string).split(',')[1]
                                                        const res = await fetch("/api/assets/pitch-deck", {
                                                            method: "POST",
                                                            body: JSON.stringify({
                                                                data: base64,
                                                                name: file.name,
                                                                contentType: file.type || 'application/pdf'
                                                            }),
                                                            headers: { "Content-Type": "application/json" }
                                                        })
                                                        if (res.ok) alert("Pitch Deck uploaded successfully!")
                                                        else alert("Upload failed")
                                                        setUploading(false)
                                                    }
                                                    reader.readAsDataURL(file)
                                                } catch (err) {
                                                    console.error(err)
                                                    setUploading(false)
                                                }
                                            }}
                                        />
                                        <label
                                            htmlFor="pitch-deck-upload"
                                            className={`flex items-center justify-center w-full py-4 rounded-xl font-medium text-sm transition-all cursor-pointer border ${uploading ? 'bg-[#523056]/50 text-[#f1eef1]/50 border-[#705474]/30' : 'bg-studio-black text-[#f1eef1] border-[#705474] hover:bg-neutral-800 hover:scale-[1.02] active:scale-95 shadow-md'}`}
                                        >
                                            {uploading ? "Uploading..." : "Upload New PDF"}
                                        </label>

                                        <a
                                            href="/api/assets/pitch-deck"
                                            target="_blank"
                                            className="flex items-center justify-center w-full py-4 rounded-xl font-medium text-sm border border-[#705474]/30 text-[#f1eef1]/80 hover:border-[#705474] hover:text-white hover:bg-[#150B1E] transition-all active:scale-95"
                                        >
                                            View Current Deck
                                        </a>
                                    </div>
                                </div>

                            </div>

                            {/* Minutes of Meeting */}
                            <div className="bg-[#0A0710] p-8 md:p-16 relative overflow-hidden group/mom rounded-2xl border border-[#705474]/30 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                                <div className="absolute top-0 left-0 w-full h-1 bg-studio-black transform origin-left scale-x-0 group-hover/mom:scale-x-100 transition-transform duration-500"></div>
                                <div className="flex flex-col gap-10">
                                    <div className="text-center md:text-left">
                                        <div className="flex items-center justify-center md:justify-start gap-5 mb-5">
                                            <div className="w-12 h-12 bg-[#523056]/50 rounded-xl flex items-center justify-center transition-transform group-hover:-translate-y-1 duration-500">
                                                <ClipboardList className="text-white w-5 h-5" />
                                            </div>
                                            <h3 className="font-serif text-4xl md:text-5xl tracking-tight text-white font-medium">Meeting Notes.</h3>
                                        </div>
                                        <div className="text-[#f1eef1]/70 text-sm md:text-base leading-relaxed max-w-2xl mx-auto md:mx-0 space-y-4">
                                            <p>
                                                Compose and assign Minutes of Meeting directly to an active client's workspace.
                                            </p>
                                            <p>
                                                You can save these notes silently to their portal for reference, or instantly dispatch a beautifully branded email copy to their inbox.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="w-full bg-[#150B1E] p-6 md:p-8 rounded-2xl border border-[#705474]/30 shadow-sm relative overflow-hidden group/form">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-studio-black transform origin-left scale-x-0 group-hover/form:scale-x-100 transition-transform duration-500"></div>
                                        <h4 className="font-serif text-2xl mb-6">Compose MOM</h4>
                                        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="label-mono mb-2 block text-[#f1eef1]/70">Client</label>
                                                    <Select value={momForm?.leadId || ""} onValueChange={(val) => setMomForm(prev => ({ ...(prev || { title: "", content: "" }), leadId: val }))}>
                                                        <SelectTrigger className="w-full bg-[#0A0710] border border-[#705474]/30 h-12 rounded-xl focus:ring-black">
                                                            <SelectValue placeholder="Select an active client..." />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {leads.filter(l => l.status !== 'new' && l.status !== 'rejected').map(lead => (
                                                                <SelectItem key={lead._id} value={lead._id}>{lead.name} ({lead.email})</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div>
                                                    <label className="label-mono mb-2 block text-[#f1eef1]/70">Meeting Title</label>
                                                    <input value={momForm?.title || ""} onChange={e => setMomForm(prev => ({ ...(prev || { leadId: "", content: "" }), title: e.target.value }))} className="w-full bg-[#0A0710] border border-[#705474]/30 p-3 h-12 rounded-xl focus:outline-none focus:border-[#705474] font-serif text-lg transition-colors" placeholder="e.g., Project Kickoff" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="label-mono mb-2 block text-[#f1eef1]/70">Minutes</label>
                                                <textarea rows={5} value={momForm?.content || ""} onChange={e => setMomForm(prev => ({ ...(prev || { leadId: "", title: "" }), content: e.target.value }))} className="w-full bg-[#0A0710] border border-[#705474]/30 p-3 rounded-xl focus:outline-none focus:border-[#705474] font-serif text-base resize-none transition-colors" placeholder="Discussion points..."></textarea>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3 pt-2">
                                                <button
                                                    disabled={sendingMom || !momForm?.leadId || !momForm?.title || !momForm?.content}
                                                    onClick={async () => {
                                                        if (!momForm) return;
                                                        setSendingMom(true)
                                                        try {
                                                            const res = await fetch(`/api/leads/${momForm.leadId}/mom`, {
                                                                method: "POST",
                                                                body: JSON.stringify({ title: momForm.title, content: momForm.content, sendEmail: false }),
                                                                headers: { "Content-Type": "application/json" }
                                                            })
                                                            if (res.ok) {
                                                                alert("Saved to Workspace!")
                                                                setMomForm(null)
                                                            } else alert("Error saving MOM")
                                                        } finally { setSendingMom(false) }
                                                    }}
                                                    className="w-full py-3.5 rounded-xl font-medium text-xs font-mono uppercase tracking-widest transition-all border border-[#705474]/30 text-[#f1eef1]/80 hover:border-black hover:text-theme-900 hover:bg-[#523056]/50 disabled:opacity-40 disabled:cursor-not-allowed"
                                                >
                                                    Save Only
                                                </button>
                                                <button
                                                    disabled={sendingMom || !momForm?.leadId || !momForm?.title || !momForm?.content}
                                                    onClick={async () => {
                                                        if (!momForm) return;
                                                        setSendingMom(true)
                                                        try {
                                                            const res = await fetch(`/api/leads/${momForm.leadId}/mom`, {
                                                                method: "POST",
                                                                body: JSON.stringify({ title: momForm.title, content: momForm.content, sendEmail: true }),
                                                                headers: { "Content-Type": "application/json" }
                                                            })
                                                            if (res.ok) {
                                                                alert("Saved and Emailed!")
                                                                setMomForm(null)
                                                            } else alert("Error saving MOM")
                                                        } finally { setSendingMom(false) }
                                                    }}
                                                    className="w-full py-3.5 rounded-xl font-medium text-xs font-mono uppercase tracking-widest transition-all bg-theme-900 text-[#f1eef1] hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                                                >
                                                    {sendingMom ? "Sending..." : "Send on Mail"}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : activeTab === "projects" ? (
                        <div className="bg-[#0A0710] rounded-2xl border border-[#705474]/30 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col lg:flex-row">
                            {/* Project List */}
                            <div className="flex-1 divide-y divide-[#705474]/20 min-h-[400px]">
                                {projects.length === 0 ? (
                                    <div className="p-12 text-center flex flex-col items-center justify-center h-full">
                                        <p className="text-[#f1eef1]/50 font-serif text-lg italic mb-2">No projects yet</p>
                                        <p className="text-[#f1eef1]/50 text-sm">Add your first portfolio piece using the form.</p>
                                    </div>
                                ) : projects.map((p, idx) => (
                                    <div key={p._id} className={`flex items-start gap-6 p-6 transition-colors hover:bg-[#523056]/30 ${idx % 2 !== 0 ? 'bg-[#150B1E]/50' : 'bg-[#0A0710]'}`}>
                                        <div className="w-28 h-20 rounded-xl overflow-hidden border border-[#705474]/30 shadow-sm shrink-0 bg-[#523056]/50">
                                            <Image src={p.imageUrl} alt={p.title} width={64} height={64} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0 pt-1">
                                            <h4 className="font-serif text-xl font-medium text-white mb-1.5 truncate">{p.title}</h4>
                                            <p className="text-[#f1eef1]/70 text-sm leading-relaxed line-clamp-2">{p.description}</p>
                                            {p.visitUrl && (
                                                <a href={p.visitUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs text-[#f1eef1]/50 hover:text-theme-900 mt-3 transition-colors font-mono uppercase tracking-wider">
                                                    Visit Site <span className="text-[10px]">↗</span>
                                                </a>
                                            )}
                                        </div>
                                        <button
                                            onClick={async () => {
                                                if (!confirm('Delete this project?')) return
                                                const res = await fetch(`/api/projects/${p._id}`, { method: 'DELETE' })
                                                if (res.ok) setProjects(prev => prev.filter(x => x._id !== p._id))
                                            }}
                                            className="text-red-400 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg shrink-0 text-xs font-bold uppercase tracking-widest transition-all mt-1"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                            {/* Add Project Form */}
                            <div className="w-full lg:w-[400px] bg-[#150B1E]/50 border-t lg:border-t-0 lg:border-l border-[#705474]/30 p-8">
                                <div className="mb-8">
                                    <h3 className="font-serif text-2xl mb-2 text-white">Add Project</h3>
                                    <p className="text-[#f1eef1]/70 text-sm leading-relaxed">Published immediately to the homepage Work section.</p>
                                </div>
                                <form onSubmit={async (e) => {
                                    e.preventDefault()
                                    setSavingProject(true)
                                    try {
                                        const res = await fetch('/api/projects', {
                                            method: 'POST',
                                            body: JSON.stringify(projectForm),
                                            headers: { 'Content-Type': 'application/json' }
                                        })
                                        const data = await res.json()
                                        if (res.ok) {
                                            setProjects(prev => [data.project, ...prev])
                                            setProjectForm({ title: '', description: '', imageUrl: '', visitUrl: '' })
                                        } else {
                                            alert(`Error: ${data.error}`)
                                        }
                                    } finally {
                                        setSavingProject(false)
                                    }
                                }} className="space-y-5">
                                    <div>
                                        <label className="label-mono block text-[#f1eef1]/70 mb-2">Title *</label>
                                        <input required type="text" value={projectForm.title} onChange={e => setProjectForm({ ...projectForm, title: e.target.value })} className="w-full bg-[#0A0710] border border-[#705474]/30 h-12 rounded-xl focus:outline-none focus:border-[#705474] px-4 font-serif text-lg transition-colors" placeholder="Nova Dashboard" />
                                    </div>
                                    <div>
                                        <label className="label-mono block text-[#f1eef1]/70 mb-2">Description *</label>
                                        <textarea required rows={4} value={projectForm.description} onChange={e => setProjectForm({ ...projectForm, description: e.target.value })} className="w-full bg-[#0A0710] border border-[#705474]/30 rounded-xl focus:outline-none focus:border-[#705474] p-4 font-serif text-base resize-none transition-colors" placeholder="A bold web platform for..." />
                                    </div>
                                    <div>
                                        <label className="label-mono block text-[#f1eef1]/70 mb-2">Image URL *</label>
                                        <input required type="url" value={projectForm.imageUrl} onChange={e => setProjectForm({ ...projectForm, imageUrl: e.target.value })} className="w-full bg-[#0A0710] border border-[#705474]/30 h-12 rounded-xl focus:outline-none focus:border-[#705474] px-4 font-serif text-sm transition-colors" placeholder="https://..." />
                                    </div>
                                    <div>
                                        <label className="label-mono block text-[#f1eef1]/70 mb-2">Visit URL <span className="normal-case opacity-50 ml-1 font-sans">(optional)</span></label>
                                        <input type="url" value={projectForm.visitUrl} onChange={e => setProjectForm({ ...projectForm, visitUrl: e.target.value })} className="w-full bg-[#0A0710] border border-[#705474]/30 h-12 rounded-xl focus:outline-none focus:border-[#705474] px-4 font-serif text-sm transition-colors" placeholder="https://..." />
                                    </div>
                                    <button disabled={savingProject} className="w-full py-4 rounded-xl font-medium text-xs font-mono uppercase tracking-widest transition-all bg-theme-900 text-[#f1eef1] hover:bg-neutral-800 disabled:opacity-40 shadow-md mt-4">
                                        {savingProject ? 'Publishing...' : 'Publish to Homepage'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    ) : activeTab === "logs" ? (
                        <div className="bg-[#0A0710] rounded-2xl border border-[#705474]/30 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[800px]">
                                    <thead className="bg-[#150B1E]/80 border-b border-[#705474]/30">
                                        <tr>
                                            <th className="p-5 text-xs font-mono uppercase tracking-widest text-[#f1eef1]/70 font-medium">Time</th>
                                            <th className="p-5 text-xs font-mono uppercase tracking-widest text-[#f1eef1]/70 font-medium">User</th>
                                            <th className="p-5 text-xs font-mono uppercase tracking-widest text-[#f1eef1]/70 font-medium">Role</th>
                                            <th className="p-5 text-xs font-mono uppercase tracking-widest text-[#f1eef1]/70 font-medium">Action</th>
                                            <th className="p-5 text-xs font-mono uppercase tracking-widest text-[#f1eef1]/70 font-medium">Details</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#705474]/20">
                                        {logs.map((log, idx) => (
                                            <tr key={log._id} className={`transition-colors hover:bg-[#523056]/30 ${idx % 2 !== 0 ? 'bg-[#150B1E]/50' : 'bg-[#0A0710]'}`}>
                                                <td className="p-5 text-sm font-mono text-[#f1eef1]/70 whitespace-nowrap">
                                                    {new Date(log.createdAt).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })}
                                                </td>
                                                <td className="p-5 font-serif font-medium text-white text-lg">
                                                    {log.userId?.name || 'Unknown'}
                                                </td>
                                                <td className="p-5">
                                                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${log.userId?.role === 'admin' ? 'bg-orange-50 text-orange-600 border border-orange-100' : log.userId?.role === 'developer' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                                                        {log.userId?.role || 'user'}
                                                    </span>
                                                </td>
                                                <td className="p-5 font-medium text-[#f1eef1]/90 text-sm">
                                                    {log.action}
                                                </td>
                                                <td className="p-5 text-[#f1eef1]/70 text-sm">
                                                    {log.target}
                                                </td>
                                            </tr>
                                        ))}
                                        {logs.length === 0 && (
                                            <tr>
                                                <td colSpan={5} className="p-16 text-center">
                                                    <p className="text-[#f1eef1]/50 font-serif text-lg italic">No activity logs recorded yet.</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>


        </div>
    )
}
