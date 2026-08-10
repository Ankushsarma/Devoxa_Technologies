"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ShieldCheck, Zap, Headphones, Lock, ArrowRight } from "lucide-react"

function ResetPasswordForm() {
    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!token) {
            toast.error("Invalid or missing reset token.")
            return
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!")
            return
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters.")
            return
        }

        setLoading(true)

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                body: JSON.stringify({ token, newPassword: password }),
                headers: { "Content-Type": "application/json" },
            })

            let data;
            try {
                data = await res.json()
            } catch (e) {
                throw new Error(res.status === 504 ? "Connection timed out. Please try again." : (res.statusText || "Server Error"))
            }
            if (!res.ok) throw new Error(data?.error || "Failed to reset password")

            toast.success("Password reset successfully! Please login.")
            router.push("/login")
        } catch (error: any) {
            toast.error(error.message || "Invalid or expired token")
        } finally {
            setLoading(false)
        }
    }

    if (!token) {
        return (
            <div className="text-center p-6 bg-red-50 rounded-xl border border-red-100 mb-4">
                <p className="text-sm font-bold text-red-600 mb-2">No reset token found in URL.</p>
                <button onClick={() => router.push("/forgot-password")} className="text-xs text-red-500 hover:text-red-700 hover:underline font-semibold transition-colors">
                    Request a new link
                </button>
            </div>
        )
    }

    return (
        <form onSubmit={handleReset} className="space-y-4">
            <div>
                <label className="block text-xs font-bold text-slate-900 mb-1">New Password</label>
                <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-theme-50 border border-slate-200 focus:border-neutral-800 focus:ring-2 focus:ring-neutral-800/10 outline-none transition-all placeholder:text-slate-400 font-medium tracking-widest text-sm"
                        placeholder="••••••••"
                    />
                </div>
            </div>
            
            <div>
                <label className="block text-xs font-bold text-slate-900 mb-1">Confirm Password</label>
                <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-theme-50 border border-slate-200 focus:border-neutral-800 focus:ring-2 focus:ring-neutral-800/10 outline-none transition-all placeholder:text-slate-400 font-medium tracking-widest text-sm"
                        placeholder="••••••••"
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 mt-2 bg-studio-black hover:bg-neutral-800 text-[#f1eef1] font-bold rounded-lg active:scale-[0.98] transition-all disabled:opacity-70 disabled:hover:bg-studio-black shadow-md shadow-neutral-800/25 flex items-center justify-center gap-2 text-sm"
            >
                {loading ? "Resetting..." : "Set New Password"} 
                {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
        </form>
    )
}

export default function ResetPasswordPage() {
    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 lg:p-8">
            <div className="w-full max-w-[70rem] bg-theme-50 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 flex flex-col md:flex-row overflow-hidden md:h-[88vh] md:max-h-[750px]">
                {/* Left Column - Marketing / Info */}
                <div className="hidden md:flex flex-col w-1/2 bg-[#F3F2EE] p-6 lg:p-10 relative overflow-hidden border-r border-slate-200/60">
                    <Link href="/" className="relative z-20 inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-4 w-max">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Website
                    </Link>
                    
                    <div className="relative z-20 max-w-md">
                        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mb-2">
                            Set New Password 🔐
                        </h1>
                        <p className="text-slate-500 text-base leading-relaxed mb-6">
                            Create a strong, secure password to protect your Devoxa Technologies dashboard account.
                        </p>
                        
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-blue-100/50 flex items-center justify-center shrink-0">
                                    <ShieldCheck className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">Secure & Private</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed mt-1">Your data is protected with enterprise grade security.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-emerald-100/50 flex items-center justify-center shrink-0">
                                    <Zap className="w-6 h-6 text-emerald-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">Real-time Updates</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed mt-1">Track project progress and get instant notifications.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-orange-100/50 flex items-center justify-center shrink-0">
                                    <Headphones className="w-6 h-6 text-orange-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">Dedicated Support</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed mt-1">Our team is always here to help you succeed.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Mockup image floating at the bottom right */}
                    <div className="absolute bottom-0 right-0 w-[120%] lg:w-[100%] z-0 pointer-events-none transform translate-y-[45%] translate-x-0 -rotate-3">
                        <Image 
                            src="/dashboard_mockup.png" 
                            alt="Dashboard Mockup" 
                            width={800} 
                            height={600} 
                            className="w-full h-auto object-contain"
                            unoptimized
                        />
                    </div>
                </div>
                
                {/* Right Column - Form */}
                <div className="w-full md:w-1/2 bg-theme-50 flex flex-col justify-center px-6 py-4 lg:px-12 relative">
                    <div className="max-w-md w-full mx-auto py-2 relative z-10">
                        {/* Mobile Back Button */}
                        <Link href="/" className="md:hidden inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-6">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Website
                        </Link>

                        <div className="text-center mb-6 mt-2">
                            <div className="w-12 h-12 bg-studio-black rounded-xl mx-auto flex items-center justify-center shadow-lg shadow-neutral-800/20 mb-3">
                                <Image src="/logo.png" alt="Devoxa Logo" width={28} height={28} className="object-contain" />
                            </div>
                            <h2 className="text-slate-800 text-lg font-bold">Set New Password</h2>
                            <p className="text-slate-500 text-sm font-medium mt-1">
                                Enter your new secure password below
                            </p>
                        </div>
                        
                        <Suspense fallback={<div className="text-center text-sm text-slate-500 font-medium py-4">Authenticating token...</div>}>
                            <ResetPasswordForm />
                        </Suspense>
                        
                        <div className="mt-6 text-center">
                            <Link href="/login" className="text-xs font-bold text-slate-500 hover:text-theme-900 hover:underline transition-colors">
                                &larr; Back to Login
                            </Link>
                        </div>
                        
                        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                            <ShieldCheck className="w-4 h-4" />
                            Secured with enterprise-grade encryption
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
