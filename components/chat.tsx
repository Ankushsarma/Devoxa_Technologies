"use client"

import { useState, useEffect, useRef } from "react"
import { useAuth } from "@/context/auth-context"
import { Send, Loader2 } from "lucide-react"

interface Message {
    _id: string
    chatId: string
    text: string
    senderId: string
    senderName: string
    receiverId?: string
    createdAt: string
}

interface ChatProps {
    chatId: string | null | undefined
    className?: string
    title?: string
    subtitle?: string
}

export function Chat({ chatId, className = "", title = "Team Chat", subtitle = "Secure Line" }: ChatProps) {
    const { user } = useAuth()
    const [messages, setMessages] = useState<Message[]>([])
    const [newMessage, setNewMessage] = useState("")
    const [loading, setLoading] = useState(true)
    const [sending, setSending] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [shouldAutoScroll, setShouldAutoScroll] = useState(true)

    // Scroll to bottom helper
    const scrollToBottom = () => {
        if (shouldAutoScroll) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
        }
    }

    // Detect if user has scrolled up manually to disable auto-scroll
    const handleScroll = () => {
        if (!scrollContainerRef.current) return
        const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current
        const isAtBottom = scrollHeight - scrollTop - clientHeight < 50
        setShouldAutoScroll(isAtBottom)
    }

    // Fetch messages
    const fetchMessages = async () => {
        if (!chatId) {
            setLoading(false)
            return
        }
        try {
            const res = await fetch(`/api/chat?chatId=${chatId}`)
            if (res.ok) {
                const data = await res.json()
                setMessages(data.messages)
            }
        } catch (error) {
            console.error("Failed to fetch messages", error)
        } finally {
            setLoading(false)
        }
    }

    // Initial fetch and polling
    useEffect(() => {
        setLoading(true)
        fetchMessages()
        
        const interval = setInterval(() => {
            fetchMessages()
        }, 3000)

        return () => clearInterval(interval)
    }, [chatId])

    // Auto-scroll when messages change
    useEffect(() => {
        scrollToBottom()
    }, [messages])

    // Listen for custom event to pre-fill chat
    useEffect(() => {
        const handleSetMessage = (e: Event) => {
            const customEvent = e as CustomEvent
            if (customEvent.detail && typeof customEvent.detail === 'string') {
                setNewMessage(customEvent.detail)
            }
        }
        
        window.addEventListener('set-chat-message', handleSetMessage)
        return () => window.removeEventListener('set-chat-message', handleSetMessage)
    }, [])

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newMessage.trim() || !chatId || sending) return

        const messageText = newMessage
        setNewMessage("")
        setSending(true)

        // Optimistic UI update
        const optimisticMsg: Message = {
            _id: Date.now().toString(),
            chatId,
            text: messageText,
            senderId: user?.id || "",
            senderName: user?.name || "Me",
            createdAt: new Date().toISOString()
        }
        setMessages(prev => [...prev, optimisticMsg])
        setShouldAutoScroll(true)
        setTimeout(scrollToBottom, 100)

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ chatId, text: messageText })
            })
            if (!res.ok) {
                console.error("Failed to send message")
                // Remove optimistic message on failure
                setMessages(prev => prev.filter(m => m._id !== optimisticMsg._id))
            } else {
                fetchMessages()
            }
        } catch (error) {
            console.error("Error sending message", error)
            setMessages(prev => prev.filter(m => m._id !== optimisticMsg._id))
        } finally {
            setSending(false)
        }
    }

    if (!chatId) {
        return (
            <div className={`flex flex-col items-center justify-center bg-white border border-neutral-200 rounded-2xl p-6 ${className}`}>
                <p className="text-neutral-500 text-sm">No active chat available.</p>
            </div>
        )
    }

    return (
        <div className={`flex flex-col bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm ${className}`}>
            {/* Header */}
            <div className="p-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
                <div>
                    <h3 className="text-sm font-bold text-neutral-800">{title}</h3>
                    <p className="text-xs text-neutral-500 font-medium">{subtitle}</p>
                </div>
                {loading && messages.length === 0 && (
                    <Loader2 className="w-4 h-4 text-neutral-400 animate-spin" />
                )}
            </div>

            {/* Messages Area */}
            <div 
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex-1 p-4 overflow-y-auto bg-[#fafafa] flex flex-col gap-4"
                style={{ minHeight: "300px" }}
            >
                {messages.length === 0 && !loading ? (
                    <div className="flex-1 flex items-center justify-center text-center">
                        <p className="text-xs text-neutral-400 uppercase tracking-widest font-semibold">Start the conversation</p>
                    </div>
                ) : (
                    messages.map((msg, idx) => {
                        const isMe = msg.senderId === user?.id
                        const showName = idx === 0 || messages[idx - 1].senderId !== msg.senderId
                        
                        return (
                            <div key={msg._id} className={`flex flex-col max-w-[85%] ${isMe ? 'self-end items-end' : 'self-start items-start'}`}>
                                {showName && !isMe && (
                                    <span className="text-[10px] font-bold text-neutral-400 mb-1 ml-1 tracking-wide uppercase">
                                        {msg.senderName}
                                    </span>
                                )}
                                <div 
                                    className={`px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                                        isMe 
                                            ? 'bg-[#1A1A1A] text-white rounded-tr-sm' 
                                            : 'bg-white text-neutral-700 border border-neutral-200 rounded-tl-sm'
                                    }`}
                                >
                                    {msg.text.split('\\n').map((line, i) => (
                                        <span key={i}>
                                            {line}
                                            <br />
                                        </span>
                                    ))}
                                </div>
                                <span className="text-[9px] text-neutral-400 mt-1 mx-1 font-medium">
                                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        )
                    })
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-neutral-100">
                <form onSubmit={handleSendMessage} className="relative flex items-center">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="w-full bg-neutral-100 border-none rounded-full py-3 pl-4 pr-12 text-[13px] font-medium text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-300 transition-all"
                        disabled={sending}
                    />
                    <button
                        type="submit"
                        disabled={!newMessage.trim() || sending}
                        className="absolute right-1 w-9 h-9 flex items-center justify-center bg-[#1A1A1A] text-white rounded-full transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                    >
                        {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    </button>
                </form>
            </div>
        </div>
    )
}
