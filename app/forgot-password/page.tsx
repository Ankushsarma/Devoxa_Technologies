"use client"

import { useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import Image from "next/image"
import { ArrowRight, ChevronRight } from "lucide-react"

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)

    const handleForgot = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                body: JSON.stringify({ email }),
                headers: { "Content-Type": "application/json" },
            })

            let data;
            try {
                data = await res.json()
            } catch (e) {
                throw new Error(res.status === 504 ? "Connection timed out. Please try again." : (res.statusText || "Server Error"))
            }
            if (!res.ok) throw new Error(data?.error || "Failed to process request")

            setSent(true)
            toast.success("Recovery link sent!")
        } catch (error: any) {
            toast.error(error.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 lg:p-8 login-page-bg" style={{ background: "linear-gradient(135deg, #3A3C59, #23243F)", position: "relative", overflow: "hidden" }}>
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
            
            {/* Background Particles */}
            <div style={{ position: "absolute", top: "15%", left: "10%", width: "6px", height: "6px", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "50%" }}></div>
            <div style={{ position: "absolute", top: "25%", left: "85%", width: "8px", height: "8px", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "50%" }}></div>
            <div style={{ position: "absolute", top: "85%", left: "20%", width: "4px", height: "4px", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "50%" }}></div>
            
            {/* Main Inner Window */}
            <div 
                className="w-full max-w-[1000px] rounded-xl relative overflow-hidden flex flex-col items-center justify-center"
                style={{ 
                    height: "700px", 
                    backgroundColor: "#161525", 
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                    position: "relative"
                }}
            >
                {/* Abstract Background Shapes inside the window */}
                <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "70%", height: "40%", background: "#1C1C2D", borderRadius: "999px", transform: "rotate(-35deg)" }}></div>
                <div style={{ position: "absolute", top: "40%", right: "-10%", width: "60%", height: "25%", background: "#1C1C2D", borderRadius: "999px", transform: "rotate(-35deg)" }}></div>
                <div style={{ position: "absolute", bottom: "-20%", left: "20%", width: "50%", height: "25%", background: "#1C1C2D", borderRadius: "999px", transform: "rotate(-35deg)" }}></div>
                <div style={{ position: "absolute", top: "50%", left: "10%", width: "120px", height: "120px", background: "#1C1C2D", borderRadius: "50%" }}></div>
                
                {/* Logo Area */}
                <div className="relative z-10 mb-8 flex items-center justify-center gap-3">
                    <Image src="/logo.png" alt="Devoxa Logo" width={36} height={36} className="rounded-md bg-theme-50 p-1" />
                    <span style={{ fontSize: "32px", fontWeight: 700, color: "#fff", letterSpacing: "-1px" }}>Devoxa.</span>
                </div>

                {/* Form Container */}
                <div 
                    className="relative z-10 rounded-lg p-8 w-full max-w-[420px]"
                    style={{ 
                        backgroundColor: "#262638", 
                        boxShadow: "0 20px 40px rgba(0,0,0,0.4)" 
                    }}
                >
                    <div className="text-center mb-6 mt-2">
                        <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#fff", letterSpacing: "-0.5px" }}>Recover Password</h2>
                        <p style={{ fontSize: "12px", color: "#7B7D98", fontWeight: 500, marginTop: "8px" }}>
                            {sent ? "Check your email for the reset link" : "Enter your email to receive a reset link"}
                        </p>
                    </div>

                    {!sent ? (
                        <form onSubmit={handleForgot} className="space-y-4">
                            <div 
                                style={{ 
                                    backgroundColor: "#35364E", 
                                    borderRadius: "6px", 
                                    padding: "8px 16px",
                                    border: "1px solid transparent",
                                    transition: "border 0.2s"
                                }}
                                className="focus-within:border-[#7C5CFC]"
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
                                    {loading ? "SENDING..." : "SEND LINK"}
                                    {!loading && (
                                        <div style={{ backgroundColor: "#3AB0FF", borderRadius: "50%", padding: "2px" }}>
                                            <ChevronRight size={12} color="#fff" strokeWidth={4} />
                                        </div>
                                    )}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div style={{ backgroundColor: "#1C1C2D", padding: "16px", borderRadius: "8px", border: "1px solid #35364E", textAlign: "center", marginBottom: "16px" }}>
                            <p style={{ fontWeight: 700, color: "#3AB0FF", fontSize: "14px", marginBottom: "4px" }}>Link Sent!</p>
                            <p style={{ fontSize: "12px", color: "#7B7D98", lineHeight: 1.6 }}>
                                We have sent a secure password reset link to <strong style={{ color: "#fff" }}>{email}</strong>. Please check your inbox and spam folder.
                            </p>
                        </div>
                    )}
                </div>

                {/* Back to Login Link */}
                <div className="relative z-10 mt-6 text-center">
                    <Link 
                        href="/login" 
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
                        &larr; Back to Login
                    </Link>
                </div>
            </div>
            
            {/* Back to Home floating link */}
            <Link 
                href="/" 
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
