"use client"

import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"
import Image from "next/image"
import { ArrowRight, ChevronRight, User, Shield } from "lucide-react"
import Lightfall from "@/components/Lightfall"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [loginType, setLoginType] = useState<"client" | "staff">("client")
    const { login } = useAuth()
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                body: JSON.stringify({ email, password, loginType }),
                headers: { "Content-Type": "application/json" },
            })

            let data;
            try {
                data = await res.json()
            } catch (e) {
                const text = await res.text()
                throw new Error(res.status === 504 ? "Connection timed out. Please try again." : (res.statusText || "Server Error"))
            }
            if (!res.ok) throw new Error(data?.error || "Login failed")

            login(data.user)

            toast.success("Welcome back!")
            router.push(`/dashboard/${data.user.role}`)
        } catch (error: any) {
            toast.error(error.message || "Invalid email or password")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 lg:p-8 login-page-bg" style={{ background: "linear-gradient(to right, #08060E 0%, #08060E 25%, #0B0A26 50%, #110E3D 75%, #181152 100%)", position: "relative", overflow: "hidden" }}>
            <style dangerouslySetInnerHTML={{__html: `
                .login-input:-webkit-autofill,
                .login-input:-webkit-autofill:hover, 
                .login-input:-webkit-autofill:focus, 
                .login-input:-webkit-autofill:active {
                    -webkit-box-shadow: 0 0 0 30px #35364E inset !important;
                    -webkit-text-fill-color: white !important;
                    transition: background-color 5000s ease-in-out 0s;
                }
                .login-input:focus {
                    background-color: transparent !important;
                }
            `}} />
            
            {/* Lightfall Background */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                <Lightfall
                    colors={['#5B1FA0', '#8B2FD1', '#EAD9F7']}
                    backgroundColor="#0A081D"
                    speed={0.8}
                    streakCount={6}
                    streakWidth={1.2}
                    streakLength={1.5}
                    glow={1}
                    density={1}
                    twinkle={1.2}
                    zoom={2.5}
                    backgroundGlow={0.6}
                    opacity={1}
                    mouseInteraction={true}
                    mouseStrength={1.5}
                    mouseRadius={0.8}
                />
            </div>
            
            {/* Main Inner Window */}
            <div 
                className="w-full max-w-[1000px] rounded-2xl relative overflow-hidden flex flex-col items-center justify-center"
                style={{ 
                    height: "700px", 
                    background: "rgba(255,255,255,0.02)",
                    backdropFilter: "blur(40px)",
                    border: "1px solid rgba(139,47,209,0.15)",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 60px rgba(139,47,209,0.1)",
                    position: "relative"
                }}
            >
                {/* Abstract Background Shapes inside the window */}
                <div style={{ position: "absolute", top: "-20%", left: "-10%", width: "50%", height: "50%", background: "#5B1FA0", filter: "blur(100px)", opacity: 0.3, borderRadius: "50%" }}></div>
                <div style={{ position: "absolute", bottom: "-20%", right: "-10%", width: "40%", height: "40%", background: "#8B2FD1", filter: "blur(100px)", opacity: 0.2, borderRadius: "50%" }}></div>
                
                {/* Logo Area */}
                <div className="relative z-10 mb-8 flex items-center justify-center gap-3">
                    <Image src="/logo.png" alt="Devoxa Logo" width={36} height={36} className="rounded-md bg-white p-1" />
                    <span style={{ fontSize: "32px", fontWeight: 700, color: "#fff", letterSpacing: "-1px" }}>Devoxa.</span>
                </div>

                {/* Form Container */}
                <div 
                    className="relative z-10 rounded-2xl p-8 w-full max-w-[420px]"
                    style={{ 
                        backgroundColor: "rgba(0,0,0,0.3)", 
                        border: "1px solid rgba(255,255,255,0.08)",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.6)" 
                    }}
                >
                    <div className="flex bg-[rgba(255,255,255,0.05)] p-1 rounded-lg mb-8 border border-white/5">
                        <button 
                            type="button"
                            onClick={() => setLoginType("client")}
                            className={`flex-1 py-1.5 flex items-center justify-center gap-2 text-[11px] font-semibold rounded transition-all uppercase tracking-wider ${
                                loginType === "client" 
                                    ? "bg-gradient-to-r from-[#5B1FA0] to-[#8B2FD1] text-[#FFFFFF] shadow-sm" 
                                    : "text-[#7B7D98] hover:text-[#FFFFFF]"
                            }`}
                        >
                            Client
                        </button>
                        <button 
                            type="button"
                            onClick={() => setLoginType("staff")}
                            className={`flex-1 py-1.5 flex items-center justify-center gap-2 text-[11px] font-semibold rounded transition-all uppercase tracking-wider ${
                                loginType === "staff" 
                                    ? "bg-gradient-to-r from-[#5B1FA0] to-[#8B2FD1] text-[#FFFFFF] shadow-sm" 
                                    : "text-[#7B7D98] hover:text-[#FFFFFF]"
                            }`}
                        >
                            Staff
                        </button>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div 
                            style={{ 
                                backgroundColor: "rgba(0,0,0,0.2)", 
                                borderRadius: "8px", 
                                padding: "10px 16px",
                                border: "1px solid rgba(255,255,255,0.1)",
                                transition: "border 0.2s"
                            }}
                            className="focus-within:border-[#8B2FD1]"
                        >
                            <label style={{ display: "block", fontSize: "10px", fontWeight: 700, color: "#7B7D98", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="login-input"
                                style={{ 
                                    width: "100%", 
                                    background: "transparent", 
                                    border: "none", 
                                    outline: "none", 
                                    color: "#fff", 
                                    fontSize: "14px",
                                    fontWeight: 500
                                }}
                                placeholder="hello@devoxa.tech"
                            />
                        </div>

                        <div 
                            style={{ 
                                backgroundColor: "rgba(0,0,0,0.2)", 
                                borderRadius: "8px", 
                                padding: "10px 16px",
                                border: "1px solid rgba(255,255,255,0.1)",
                                transition: "border 0.2s"
                            }}
                            className="focus-within:border-[#8B2FD1]"
                        >
                            <label style={{ display: "block", fontSize: "10px", fontWeight: 700, color: "#7B7D98", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="login-input"
                                style={{ 
                                    width: "100%", 
                                    background: "transparent", 
                                    border: "none", 
                                    outline: "none", 
                                    color: "#fff", 
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    letterSpacing: password ? "2px" : "normal"
                                }}
                                placeholder="Enter your password"
                            />
                        </div>

                        <div className="pt-6 flex justify-center">
                            <button
                                type="submit"
                                disabled={loading}
                                style={{ 
                                    backgroundColor: "#fff", 
                                    color: "#161525", 
                                    fontWeight: 700, 
                                    fontSize: "12px",
                                    padding: "12px 32px", 
                                    borderRadius: "999px",
                                    border: "none",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    textTransform: "uppercase",
                                    letterSpacing: "1px",
                                    transition: "transform 0.2s ease, opacity 0.2s ease",
                                    opacity: loading ? 0.7 : 1
                                }}
                                onMouseOver={(e) => { if(!loading) e.currentTarget.style.transform = "scale(1.02)" }}
                                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                            >
                                {loading ? "LOGGING IN..." : "LOG IN"}
                                {!loading && (
                                    <div style={{ backgroundColor: "#3AB0FF", borderRadius: "50%", padding: "2px" }}>
                                        <ChevronRight size={12} color="#fff" strokeWidth={4} />
                                    </div>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Forgot Password Link */}
                <div className="relative z-10 mt-6 text-center">
                    <Link 
                        href="/forgot-password" 
                        style={{ 
                            color: "#7B7D98", 
                            fontSize: "11px", 
                            fontWeight: 700, 
                            textTransform: "uppercase", 
                            letterSpacing: "1px",
                            textDecoration: "underline",
                            textUnderlineOffset: "4px",
                            transition: "color 0.2s ease"
                        }}
                        onMouseOver={(e) => e.currentTarget.style.color = "#fff"}
                        onMouseOut={(e) => e.currentTarget.style.color = "#7B7D98"}
                    >
                        Forgot your password?
                    </Link>
                </div>
            </div>
            
            {/* Back to Home floating link */}
            <Link 
                href="/" 
                className="relative z-10"
                style={{ 
                    position: "absolute", 
                    top: "32px", 
                    left: "32px",
                    color: "rgba(255,255,255,0.5)", 
                    fontSize: "13px", 
                    fontWeight: 500,
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "color 0.2s"
                }}
                onMouseOver={(e) => e.currentTarget.style.color = "#fff"}
                onMouseOut={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
            >
                <ArrowRight size={14} style={{ transform: "rotate(180deg)" }} /> Back to Website
            </Link>
        </div>
    )
}
