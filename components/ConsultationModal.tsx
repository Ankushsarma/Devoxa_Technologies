"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      // Prevent body scrolling
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.name) {
      toast.error("Please fill in your name and email");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        body: JSON.stringify({
          ...formState,
          subject: formState.company ? "Consultation for " + formState.company : "General Consultation",
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        let errorData;
        try {
          errorData = await res.json();
        } catch (err) {
          throw new Error(res.status === 504 ? "Connection timed out" : "Server Error");
        }
        throw new Error(errorData.error || "Failed to submit request");
      }

      // 2. Send email with pitch deck via Resend API (Fire and forget so UI is fast)
      fetch("/api/send-deck", {
        method: "POST",
        body: JSON.stringify({
          ...formState,
          subject: formState.company ? "Consultation for " + formState.company : "General Consultation",
        }),
        headers: { "Content-Type": "application/json" },
      }).then(async (emailRes) => {
        if (!emailRes.ok) {
          console.error("Failed to send email in background", await emailRes.text());
        }
      }).catch(err => {
        console.error("Email fetch error", err);
      });

      toast.success("Consultation request sent! We will be in touch soon.");
      setFormState({ name: "", email: "", phone: "", company: "", message: "" });
      onClose();
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 sm:p-6"
      onClick={handleBackdropClick}
    >
      <div 
        className="relative w-full max-w-[850px] max-h-[92vh] overflow-y-auto rounded-[1.5rem] sm:rounded-[2rem] shadow-2xl flex flex-col md:flex-row"
        style={{ background: "#141415", border: "1px solid rgba(255,255,255,0.08)" }}
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full p-2 text-white/50 hover:bg-white/10 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Left Branding Panel */}
        <div className="md:w-2/5 p-6 md:p-8 relative overflow-hidden flex flex-col justify-center"
             style={{ background: "linear-gradient(135deg, #2D1B69 0%, #170B3B 100%)", flexShrink: 0 }}>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-[#7C5CFC] blur-[80px] opacity-30 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-[#E879F9] blur-[80px] opacity-20 pointer-events-none"></div>
          
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-3 font-serif leading-tight">
              Ready to build <br/>something <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#f472b6]">extraordinary?</span>
            </h3>
            <p className="text-sm text-purple-200/70 leading-relaxed mb-6">
              Fill out the form and our team of experts will review your request and get back to you within 24 hours.
            </p>

            <div className="space-y-6 hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <svg className="w-5 h-5 text-[#a78bfa]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white text-sm font-medium">Quick Response</h4>
                  <p className="text-purple-200/50 text-xs">Usually within 24 hours</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <svg className="w-5 h-5 text-[#a78bfa]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white text-sm font-medium">Strictly Confidential</h4>
                  <p className="text-purple-200/50 text-xs">Your ideas are safe with us</p>
                </div>
              </div>
            </div>
          </div>

          {/* Elegant Curved Divider */}
          <svg
            className="absolute right-0 top-0 h-full w-16 text-[#141415] hidden md:block translate-x-[1px]"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M100 0 L100 100 L0 100 C 60 70, 60 30, 0 0 Z" />
          </svg>
        </div>

        {/* Right Form Panel */}
        <div className="md:w-3/5 p-6 md:p-8 relative bg-[#141415] bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)]" style={{ flexShrink: 0 }}>
          <div className="bg-white/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur z-0" />
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-[#8981A6] mb-1.5 tracking-wider">NAME <span className="text-red-400">*</span></label>
                <input
                  required
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/20 focus:border-[#a78bfa] focus:bg-white/10 focus:outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#8981A6] mb-1.5 tracking-wider">EMAIL <span className="text-red-400">*</span></label>
                <input
                  required
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/20 focus:border-[#a78bfa] focus:bg-white/10 focus:outline-none transition-all"
                  placeholder="john@devoxa.tech"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#8981A6] mb-1.5 tracking-wider">PHONE</label>
                <input
                  type="tel"
                  value={formState.phone}
                  onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/20 focus:border-[#a78bfa] focus:bg-white/10 focus:outline-none transition-all"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#8981A6] mb-1.5 tracking-wider">COMPANY</label>
                <input
                  type="text"
                  value={formState.company}
                  onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/20 focus:border-[#a78bfa] focus:bg-white/10 focus:outline-none transition-all"
                  placeholder="Devoxa"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#8981A6] mb-1.5 tracking-wider">PROJECT DETAILS</label>
              <textarea
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/20 focus:border-[#a78bfa] focus:bg-white/10 focus:outline-none transition-all resize-none h-24"
                placeholder="Tell us about your goals, timeline, and what you're looking to achieve..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 rounded-xl py-3.5 text-sm font-bold text-white shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #7C5CFC, #E879F9)",
                boxShadow: "0 8px 24px rgba(124,92,252,0.25)"
              }}
            >
              {isSubmitting ? "Sending Request..." : "Submit Request"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
