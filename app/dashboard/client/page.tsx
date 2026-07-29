"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { Chat } from "@/components/chat"
import Image from "next/image"
import Link from "next/link"
import { ClipboardCheck, User, ListTodo, FileText, Link as LinkIcon, ExternalLink, Calendar as CalendarIcon, ShieldCheck, Shield, Clock, Headphones } from "lucide-react"

export default function ClientDashboard() {
    const { user, role, loading } = useAuth()
    const router = useRouter()
    const [lead, setLead] = useState<any>(null)
    const [tasks, setTasks] = useState<any[]>([])

    // UI Interactive States
    const [showAllTasks, setShowAllTasks] = useState(false)

    useEffect(() => {
        if (!loading && !user) router.push("/login")

        const fetchProject = async () => {
            if (user) {
                const res = await fetch(`/api/leads/client?t=${Date.now()}`)
                const data = await res.json()
                if (data.lead) {
                    setLead(data.lead)
                    const taskRes = await fetch(`/api/leads/${data.lead._id}/tasks?t=${Date.now()}`)
                    const taskData = await taskRes.json()
                    if (taskData.tasks) setTasks(taskData.tasks)
                }
            }
        }
        
        fetchProject()
        const interval = setInterval(fetchProject, 10000)
        return () => clearInterval(interval)
    }, [loading, user, router])

    if (loading || !user) return <div className="p-20 text-center font-mono text-sm uppercase tracking-widest text-neutral-400">Loading Workspace...</div>

    const getTaskProgress = (status: string) => {
        switch (status) {
            case 'done': return 100;
            case 'review': return 75;
            case 'in-progress': return 35;
            default: return 0;
        }
    }
    const totalProgressSum = tasks.reduce((acc, task) => acc + getTaskProgress(task.status), 0);
    const totalTasks = tasks.length
    const progress = totalTasks > 0 ? Math.round(totalProgressSum / totalTasks) : 0

    return (
        <div className="min-h-screen bg-white text-neutral-900 font-sans pb-4 md:pb-6 pt-4 md:pt-6 px-4 md:px-8">
            <div className="w-full mx-auto">
                
                {/* Header */}
                <header className="border-b border-neutral-200 px-8 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white">
                    <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-gradient-to-br from-neutral-200 to-neutral-300 rounded flex items-center justify-center border border-neutral-200 shadow-inner overflow-hidden relative">
                            {/* Fallback to text if logo fails or looks different, using Image for now */}
                            <Image src="/logo.png" alt="Devoxa" fill className="object-cover grayscale" />
                            <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
                        </div>
                        <div>
                            <h1 className="font-serif text-3xl md:text-[34px] tracking-tight leading-none text-neutral-900">Client Workspace</h1>
                            <p className="text-[11px] font-bold tracking-[0.2em] text-neutral-400 uppercase mt-2">
                                Welcome back, {user.name || user.email}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => router.push("/")}
                        className="flex items-center gap-2 text-xs font-bold tracking-wider text-neutral-600 border border-neutral-200 px-4 py-2.5 rounded-lg hover:bg-neutral-50 transition-colors uppercase"
                    >
                        <span>←</span> Site Home
                    </button>
                </header>

                <div className="p-8 md:p-12">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
                        
                        {/* Main Content Column */}
                        <div className="lg:col-span-8 space-y-10">
                            
                            {/* Project Status */}
                            <section>
                                <h2 className="text-xs font-bold tracking-widest uppercase text-neutral-500 mb-4">Project Status</h2>
                                <div className="border border-neutral-200 rounded-2xl p-6 md:p-8 bg-white shadow-sm flex flex-col md:flex-row gap-8 md:items-center">
                                    
                                    <div className="flex items-start gap-4 flex-1">
                                        <div className="w-12 h-12 rounded-xl bg-[#FDF8F3] text-[#C5A880] flex items-center justify-center shrink-0 border border-[#F2E8DA]">
                                            <ClipboardCheck className="w-6 h-6" strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase mb-1">Status</p>
                                            <p className="font-serif text-2xl text-neutral-900 leading-tight capitalize">{lead ? lead.status : "Loading..."}</p>
                                            <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]"></span>
                                                Current Status
                                            </p>
                                        </div>
                                    </div>

                                    <div className="hidden md:block w-px h-16 bg-neutral-200"></div>

                                    <div className="flex items-start gap-4 flex-1">
                                        <div className="w-12 h-12 rounded-xl bg-[#FDF8F3] text-[#C5A880] flex items-center justify-center shrink-0 border border-[#F2E8DA]">
                                            <User className="w-6 h-6" strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase mb-1">Developer</p>
                                            <p className="font-serif text-2xl text-neutral-900 leading-tight">{lead?.assignedTo?.name || "Pending"}</p>
                                            <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]"></span>
                                                Current Stage
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex-1 w-full mt-4 md:mt-0">
                                        <div className="flex justify-between items-end mb-3">
                                            <p className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase">Progress</p>
                                            <p className="font-bold text-lg leading-none">{progress}%</p>
                                        </div>
                                        <div className="w-full bg-neutral-100 h-2.5 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-neutral-300 transition-all duration-1000 ease-out rounded-full" 
                                                style={{ width: `${progress}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-[11px] text-neutral-400 mt-3">Project completion</p>
                                    </div>
                                    
                                </div>
                            </section>

                            {/* Development Tasks */}
                            <section>
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xs font-bold tracking-widest uppercase text-neutral-500">Development Tasks</h2>
                                </div>
                                <div className="border border-neutral-200 rounded-2xl bg-white shadow-sm overflow-hidden">
                                    {tasks.length === 0 ? (
                                        <div className="p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-[#FDF8F3] text-[#C5A880] flex items-center justify-center shrink-0 border border-[#F2E8DA]">
                                                    <ListTodo className="w-6 h-6" strokeWidth={1.5} />
                                                </div>
                                                <p className="font-serif italic text-lg text-neutral-600">No tasks have been assigned yet.</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="divide-y divide-neutral-100">
                                                {(showAllTasks ? tasks : tasks.slice(0, 3)).map(task => (
                                                    <div key={task._id} className="p-6 flex flex-col md:flex-row md:items-start justify-between hover:bg-neutral-50 transition-colors">
                                                        <div className="flex-1 pr-4">
                                                            <p className="font-serif text-lg">{task.title}</p>
                                                            {task.description && <p className="text-sm text-neutral-500 mt-1 mb-4">{task.description}</p>}
                                                            
                                                            {/* Task Progress Bar */}
                                                            <div className="w-full max-w-sm bg-neutral-100 h-1.5 rounded-full overflow-hidden mt-3">
                                                                <div 
                                                                    className={`h-full rounded-full transition-all duration-500 ease-in-out ${
                                                                        task.status === 'done' ? 'bg-green-500 w-full' :
                                                                        task.status === 'in-progress' ? 'bg-blue-500 w-1/2' :
                                                                        task.status === 'in-review' ? 'bg-orange-500 w-3/4' :
                                                                        'bg-neutral-300 w-[5%]'
                                                                    }`} 
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="mt-6 md:mt-0 flex flex-row items-center gap-4 shrink-0">
                                                            <button 
                                                                onClick={() => {
                                                                    document.getElementById('client-chat')?.scrollIntoView({ behavior: 'smooth' });
                                                                    window.dispatchEvent(new CustomEvent('set-chat-message', { detail: `Regarding Task [${task.title}]: ` }));
                                                                }}
                                                                className="text-[10px] uppercase tracking-widest font-bold text-neutral-500 hover:text-[#C5A880] flex items-center gap-1.5 transition-colors"
                                                            >
                                                                <Headphones className="w-3.5 h-3.5" />
                                                                Chat Developer
                                                            </button>
                                                            <span className={`px-4 py-2 rounded-lg text-xs font-bold tracking-widest uppercase border ${
                                                                task.status === 'done' ? 'bg-green-50 text-green-700 border-green-200' : 
                                                                task.status === 'in-progress' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                                                                task.status === 'in-review' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                                                                'bg-neutral-50 text-neutral-600 border-neutral-200'
                                                            }`}>
                                                                {(task.status || 'todo').replace('-', ' ')}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            {tasks.length > 3 && (
                                                <div className="p-4 border-t border-neutral-100 flex justify-center bg-neutral-50/50">
                                                    <button 
                                                        onClick={() => setShowAllTasks(!showAllTasks)}
                                                        className="flex items-center gap-2 text-[10px] font-bold tracking-wider text-neutral-700 border border-neutral-200 bg-white px-4 py-2.5 rounded-lg hover:bg-neutral-50 transition-colors uppercase shrink-0"
                                                    >
                                                        <ListTodo className="w-3.5 h-3.5" /> {showAllTasks ? 'View Less' : `View All ${tasks.length} Tasks`}
                                                    </button>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </section>

                            {/* Resources */}
                            <section>
                                <h2 className="text-xs font-bold tracking-widest uppercase text-neutral-500 mb-4">Resources</h2>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {/* Resource Card 1 */}
                                    <div className="border border-neutral-200 rounded-2xl p-6 bg-white shadow-sm flex flex-col justify-between items-start gap-6 hover:shadow-md transition-shadow">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-[#FDF8F3] text-[#C5A880] flex items-center justify-center shrink-0 border border-[#F2E8DA]">
                                                <FileText className="w-6 h-6" strokeWidth={1.5} />
                                            </div>
                                            <div>
                                                <p className="font-serif text-lg font-medium">Project Scope</p>
                                                <p className="text-[10px] font-bold tracking-widest uppercase text-neutral-500 mt-1">PDF Document</p>
                                            </div>
                                        </div>
                                        <a 
                                            href={lead?.projectScope || '#'} 
                                            target={lead?.projectScope ? "_blank" : "_self"}
                                            className={`flex items-center gap-2 text-[10px] font-bold tracking-wider text-neutral-700 border border-neutral-200 px-4 py-2 rounded-lg hover:bg-neutral-50 transition-colors uppercase ${!lead?.projectScope && 'opacity-50 cursor-not-allowed pointer-events-none'}`}
                                        >
                                            {lead?.projectScope ? 'View Document' : 'Unavailable'} <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                    
                                    {/* Resource Card 2 */}
                                    <div className="border border-neutral-200 rounded-2xl p-6 bg-white shadow-sm flex flex-col justify-between items-start gap-6 hover:shadow-md transition-shadow">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-[#FDF8F3] text-[#C5A880] flex items-center justify-center shrink-0 border border-[#F2E8DA]">
                                                <LinkIcon className="w-6 h-6" strokeWidth={1.5} />
                                            </div>
                                            <div>
                                                <p className="font-serif text-lg font-medium">Figma Workspace</p>
                                                <p className="text-[10px] font-bold tracking-widest uppercase text-neutral-500 mt-1">External Link</p>
                                            </div>
                                        </div>
                                        <a 
                                            href={lead?.figmaLink || '#'}
                                            target={lead?.figmaLink ? "_blank" : "_self"}
                                            className={`flex items-center gap-2 text-[10px] font-bold tracking-wider text-neutral-700 border border-neutral-200 px-4 py-2 rounded-lg hover:bg-neutral-50 transition-colors uppercase ${!lead?.figmaLink && 'opacity-50 cursor-not-allowed pointer-events-none'}`}
                                        >
                                            {lead?.figmaLink ? 'Open Link' : 'Unavailable'} <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                </div>
                            </section>

                            {/* Minutes of Meeting (MOM) */}
                            <section>
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xs font-bold tracking-widest uppercase text-neutral-500">Meeting Notes</h2>
                                    {lead?.moms && lead.moms.length > 0 && (
                                        <Link 
                                            href="/dashboard/client/mom"
                                            className="flex items-center gap-2 text-[10px] font-bold tracking-wider text-neutral-700 border border-neutral-200 px-4 py-2.5 rounded-lg hover:bg-neutral-50 transition-colors uppercase"
                                        >
                                            <ListTodo className="w-3.5 h-3.5" /> View All Notes
                                        </Link>
                                    )}
                                </div>
                                
                                {lead?.moms && lead.moms.length > 0 ? (
                                    <div className="space-y-6">
                                        {lead.moms.slice(0, 2).map((mom: any, index: number) => {
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
                                ) : (
                                    <div className="border border-neutral-200 rounded-2xl p-8 bg-white shadow-sm text-center">
                                        <p className="font-serif italic text-lg text-neutral-500">No meeting notes available yet.</p>
                                    </div>
                                )}
                            </section>

                        </div>

                        {/* Chat Column */}
                        <div id="client-chat" className="lg:col-span-4 flex flex-col h-full scroll-mt-24">
                            <h2 className="text-xs font-bold tracking-widest uppercase text-neutral-500 mb-4 shrink-0">Direct Line</h2>
                            <Chat 
                                chatId={(user as any).chatId} 
                                className="flex-1 h-auto" 
                                title={`Secure Line: ${lead?.assignedTo?.name || 'Developer'}`}
                                subtitle="Encrypted Direct Channel"
                            />
                        </div>

                    </div>
                </div>

                {/* Footer Strip */}
                <div className="border-t border-neutral-200 bg-white">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-6 md:py-8 px-8 md:px-12">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <div className="text-neutral-400 shrink-0">
                                <ShieldCheck className="w-7 h-7" strokeWidth={1.5} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-neutral-900">Transparent Process</p>
                                <p className="text-[11px] text-neutral-500 mt-0.5">Track every step of your project</p>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <div className="text-neutral-400 shrink-0">
                                <Shield className="w-7 h-7" strokeWidth={1.5} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-neutral-900">Secure & Confidential</p>
                                <p className="text-[11px] text-neutral-500 mt-0.5">Your data is 100% protected</p>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <div className="text-neutral-400 shrink-0">
                                <CalendarIcon className="w-7 h-7" strokeWidth={1.5} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-neutral-900">Timely Updates</p>
                                <p className="text-[11px] text-neutral-500 mt-0.5">We keep you in the loop</p>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <div className="text-neutral-400 shrink-0">
                                <Headphones className="w-7 h-7" strokeWidth={1.5} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-neutral-900">Dedicated Support</p>
                                <p className="text-[11px] text-neutral-500 mt-0.5">We're here when you need us</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
