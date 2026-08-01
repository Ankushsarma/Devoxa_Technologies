"use client"

import { useState, useEffect, useRef } from "react"
import { useAuth } from "@/context/auth-context"
import { Headphones, Paperclip, Send, MessageCircle } from "lucide-react"

interface Message {
    _id: string
    text: string
    senderId: string
    senderName: string
    createdAt: string
}

export function Chat({ chatId, receiverId, className, title, subtitle }: { chatId: string, receiverId?: string, className?: string, title?: string, subtitle?: string }) {
    const { user } = useAuth()
    const [messages, setMessages] = useState<Message[]>([])
    const [newMessage, setNewMessage] = useState("")
    const scrollRef = useRef<HTMLDivElement>(null)
    const chatContainerRef = useRef<HTMLDivElement>(null)

    const fetchMessages = async () => {
        if (!chatId) return
        try {
            const res = await fetch(`/api/chat?chatId=${chatId}`, { cache: 'no-store' })
            const data = await res.json()
            if (data.messages) {
                setMessages(data.messages)
            }
        } catch (err) {
            console.error("Chat fetch error:", err)
        }
    }

    useEffect(() => {
        fetchMessages()
        const interval = setInterval(fetchMessages, 3000) // Poll every 3 seconds
        return () => clearInterval(interval)
    }, [chatId])

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
        }
    }, [messages])

    useEffect(() => {
        const handleSetMessage = (e: any) => {
            setNewMessage(e.detail)
            setTimeout(() => document.getElementById('chat-input')?.focus(), 100)
        }
        window.addEventListener('set-chat-message', handleSetMessage)
        return () => window.removeEventListener('set-chat-message', handleSetMessage)
    }, [])

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newMessage.trim() || !user) return

        const tempMessage = newMessage
        setNewMessage("")

        try {
            await fetch("/api/chat", {
                method: "POST",
                body: JSON.stringify({
                    chatId,
                    text: tempMessage,
                    senderId: user.id,
                    senderName: user.name || "Client",
                    receiverId: receiverId || null
                }),
                headers: { "Content-Type": "application/json" },
            })
            fetchMessages()
        } catch (error) {
            console.error("Chat send error:", error)
        }
    }

    return (
        <div className={`flex flex-col w-full overflow-hidden bg-white rounded-2xl border border-neutral-200 shadow-sm relative ${className || 'h-[600px]'}`}>
            
            {/* Header */}
            <div className="p-5 border-b border-neutral-200 bg-white font-sans flex justify-between items-start shrink-0">
                <div className="flex items-start gap-4">
                    <div className="text-[#C5A880] mt-0.5 shrink-0">
                        <Headphones className="w-5 h-5" strokeWidth={2} />
                    </div>
                    <div>
                        <p className="text-[13px] font-bold text-neutral-900 tracking-wide">{title || "Devoxa Developer Chat"}</p>
                        <p className="text-[11px] text-neutral-500 mt-1">{subtitle || "We typically reply within a few minutes"}</p>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500">Live</span>
                </div>
            </div>

            {/* Empty State / Messages Area */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-5 space-y-4 relative bg-white">
                {messages.length === 0 ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-white">
                        <div className="relative mb-6">
                            <MessageCircle className="w-14 h-14 text-neutral-300 stroke-1" />
                            <MessageCircle className="w-10 h-10 text-neutral-300 stroke-1 absolute -bottom-2 -right-4" />
                        </div>
                        <h3 className="font-serif text-xl font-medium text-neutral-900 mb-2">Start a conversation</h3>
                        <p className="text-sm text-neutral-500 max-w-[200px]">Our team is here to help you with any questions.</p>
                    </div>
                ) : (
                    <>
                        {messages.map((msg) => {
                            const isMe = msg.senderId === user?.id
                            return (
                                <div key={msg._id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-[85%] px-4 py-2.5 text-sm font-sans rounded-2xl shadow-sm ${isMe ? "bg-[#1A1A1A] text-[#FFFFFF] rounded-tr-sm" : "bg-neutral-50 text-neutral-900 border border-neutral-100 rounded-tl-sm"}`}>
                                        {!isMe && (
                                            <p className="text-[10px] font-bold text-[#C5A880] mb-1 tracking-wide uppercase">{msg.senderName || 'Developer'}</p>
                                        )}
                                        <p className="leading-relaxed">{msg.text}</p>
                                        <p className={`text-[10px] mt-1 text-right ${isMe ? "text-neutral-400" : "text-neutral-400"}`}>
                                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                        <div ref={scrollRef} />
                    </>
                )}
            </div>

            {/* Input Form */}
            <form onSubmit={sendMessage} className="p-4 border-t border-neutral-200 bg-white shrink-0">
                <div className="relative flex items-center">
                    <input
                        id="chat-input"
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="w-full h-12 bg-white border border-neutral-200 focus:border-[#C5A880] outline-none text-sm font-sans placeholder-neutral-400 rounded-xl pl-4 pr-24 transition-colors"
                    />
                    <div className="absolute right-2 flex items-center gap-2">
                        <button type="button" className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors">
                            <Paperclip className="w-4 h-4" />
                        </button>
                        <button
                            type="submit"
                            disabled={!newMessage.trim()}
                            className="w-8 h-8 flex items-center justify-center bg-[#C5A880] hover:bg-[#B0926A] text-[#FFFFFF] rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-[#C5A880]"
                        >
                            <Send className="w-3.5 h-3.5 ml-0.5" />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
