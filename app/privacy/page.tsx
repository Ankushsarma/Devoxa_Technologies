"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  FileText, 
  Lock, 
  Eye, 
  Share2, 
  UserCheck, 
  Mail, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles,
  ChevronRight,
  Phone,
  Building2,
  Calendar,
  Layers,
  Menu,
  X
} from "lucide-react";
import Particles from "@/components/Particles";
import ShinyText from "@/components/ShinyText";
import ConsultationModal from "@/components/ConsultationModal";
import { Footer } from "@/components/ui/footer-section";
import { FooterMobile } from "@/components/ui/footer-section-mobile";
import FloatingScrollButton from "@/components/FloatingScrollButton";

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState("section-1");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "section-1",
        "section-2",
        "section-3",
        "section-4",
        "section-5",
        "section-6",
        "section-7"
      ];

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "section-1", title: "1. Information We Collect", icon: Eye },
    { id: "section-2", title: "2. How We Use Information", icon: Layers },
    { id: "section-3", title: "3. Cookies & Tracking", icon: FileText },
    { id: "section-4", title: "4. Third-Party Sharing", icon: Share2 },
    { id: "section-5", title: "5. Data Security & Storage", icon: Lock },
    { id: "section-6", title: "6. Your Privacy Rights", icon: UserCheck },
    { id: "section-7", title: "7. Contact Legal Team", icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-[#050506] text-white selection:bg-purple-500 selection:text-white font-sans relative overflow-x-hidden">
      
      {/* Responsive Header Navigation (Transparent) */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent border-none outline-none">
        
        {/* Desktop Header Navigation (lg:flex) */}
        <nav className="hidden lg:flex py-6 px-12 lg:px-16 justify-between items-center w-full bg-transparent border-none outline-none">
          {/* Logo & Company Name */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-purple-600 to-fuchsia-600 p-[1.5px] shadow-[0_0_20px_rgba(139,92,246,0.5)] shrink-0">
                <div className="w-full h-full bg-[#0B0819] rounded-[10px] flex items-center justify-center p-1.5 overflow-hidden">
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-contain transform group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-serif text-xl font-bold tracking-tight text-white leading-tight">Devoxa Technologies</span>
                <span className="text-[10px] font-mono font-semibold tracking-wider text-purple-300 uppercase">Legal Documentation</span>
              </div>
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-5">
            <Link 
              href="/#footer" 
              className="px-4.5 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all flex items-center gap-2"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-purple-400" />
              <span>Return to Home</span>
            </Link>
            <Link href="/login" className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-300 hover:text-white transition-colors">
              Login
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="border border-purple-400/40 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600/30 to-indigo-600/30 text-xs font-mono uppercase tracking-widest text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)] flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-300" />
              <span>Book a call —</span>
            </button>
          </div>
        </nav>

        {/* Mobile Header Navigation (lg:hidden) */}
        <nav className="flex lg:hidden py-4 px-6 justify-between items-center w-full bg-transparent border-none outline-none">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-fuchsia-600 p-[1.5px] shrink-0">
              <div className="w-full h-full bg-[#0B0819] rounded-[10px] flex items-center justify-center p-1 overflow-hidden">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
            </div>
            <span className="font-serif text-lg font-bold tracking-tight text-white">Devoxa</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 rounded-full bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-white"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="absolute top-16 left-4 right-4 bg-[#0A0714]/95 border border-purple-500/30 rounded-3xl p-4 shadow-2xl backdrop-blur-2xl flex flex-col gap-2">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2.5 rounded-2xl bg-white/5 text-xs font-semibold text-gray-200 hover:text-white flex items-center justify-between">
                <span>Home</span>
                <ChevronRight className="w-3.5 h-3.5 text-purple-400" />
              </Link>
              <Link href="/#solutions" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2.5 rounded-2xl bg-white/5 text-xs font-semibold text-gray-200 hover:text-white flex items-center justify-between">
                <span>Solutions</span>
                <ChevronRight className="w-3.5 h-3.5 text-purple-400" />
              </Link>
              <Link href="/#pricing" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2.5 rounded-2xl bg-white/5 text-xs font-semibold text-gray-200 hover:text-white flex items-center justify-between">
                <span>Pricing</span>
                <ChevronRight className="w-3.5 h-3.5 text-purple-400" />
              </Link>
              <Link href="/#faq" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2.5 rounded-2xl bg-white/5 text-xs font-semibold text-gray-200 hover:text-white flex items-center justify-between">
                <span>FAQ</span>
                <ChevronRight className="w-3.5 h-3.5 text-purple-400" />
              </Link>
              <button
                onClick={() => { setMobileMenuOpen(false); setIsModalOpen(true); }}
                className="mt-2 w-full py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider text-center"
              >
                Book a Free Call
              </button>
            </div>
          )}
        </nav>

      </header>

      {/* Hero Header Section */}
      <section className="relative pt-36 md:pt-44 pb-16 px-6 md:px-12 lg:px-16 overflow-hidden bg-gradient-to-b from-[#0e0a1f] via-[#080514] to-[#050506]">
        {/* Background Particles & Glows */}
        <div className="absolute inset-0 z-0 opacity-70">
          <Particles particleCount={120} particleColors={['#ffffff', '#8b5cf6', '#c084fc']} />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-fuchsia-600/20 rounded-full blur-[120px] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto relative z-10 text-center flex flex-col items-center">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-4.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 font-mono text-[11px] uppercase tracking-[0.2em] font-bold shadow-[0_0_15px_rgba(167,139,250,0.25)] mb-6">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>LEGAL & COMPLIANCE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6">
            <ShinyText text="Privacy Policy" color="#ffffff" shineColor="#8b5cf6" speed={3} />
          </h1>

          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light mb-8">
            Your trust is fundamental to us. Learn how Devoxa Technologies collects, protects, and handles your personal information across our platforms.
          </p>

          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-gray-400">
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white/5 border border-white/10">
              <Calendar className="w-3.5 h-3.5 text-purple-400" />
              <span>Effective Date: May 12, 2026</span>
            </div>
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white/5 border border-white/10">
              <Building2 className="w-3.5 h-3.5 text-purple-400" />
              <span>Devoxa Technologies Pvt. Ltd.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 md:py-20 px-6 md:px-12 lg:px-16 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Sticky Sidebar Navigation (Desktop) */}
          <div className="hidden lg:block lg:col-span-4 relative">
            <div className="sticky top-28 space-y-6">
              <div className="bg-[#0c0817]/90 border border-purple-500/20 rounded-3xl p-6 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
                <h3 className="text-xs font-mono font-bold tracking-widest text-purple-300 uppercase mb-4 pb-3 border-b border-white/10 flex items-center justify-between">
                  <span>TABLE OF CONTENTS</span>
                  <FileText className="w-4 h-4 text-purple-400" />
                </h3>
                <nav className="space-y-1.5">
                  {navItems.map((item) => {
                    const IconComp = item.icon;
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-semibold transition-all flex items-center justify-between group ${
                          isActive 
                            ? "bg-purple-600/30 text-white border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.3)]" 
                            : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <IconComp className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-purple-300" : "text-gray-500 group-hover:text-purple-400"}`} />
                          <span className="truncate">{item.title}</span>
                        </div>
                        <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${isActive ? "text-purple-300 translate-x-0.5" : "text-gray-600 group-hover:text-purple-400"}`} />
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Need Help Card */}
              <div className="bg-gradient-to-br from-purple-950/60 to-indigo-950/40 border border-purple-500/30 rounded-3xl p-6 backdrop-blur-xl">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 mb-3">
                  <Mail className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Have Legal Questions?</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">
                  Our privacy and data protection officer is ready to assist you.
                </p>
                <a 
                  href="mailto:support@devoxatechnologies.com" 
                  className="inline-flex items-center gap-2 text-xs font-bold text-purple-300 hover:text-white transition-colors"
                >
                  <span>support@devoxatechnologies.com</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Privacy Content (Right Column - Modular Curvy Section Cards) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Introduction Callout Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950/50 via-[#0c0817] to-indigo-950/50 border border-purple-500/30 text-gray-200 text-sm sm:text-base leading-relaxed backdrop-blur-xl shadow-lg">
              <p className="font-light">
                At <strong className="text-white font-semibold">Devoxa Technologies Pvt. Ltd.</strong>, accessible from <Link href="/" className="text-purple-300 hover:underline">devoxatechnologies.com</Link>, one of our main priorities is the privacy of our visitors and clients. This Privacy Policy document outlines the types of information that is collected and recorded by Devoxa Technologies and how we utilize it.
              </p>
            </div>

            {/* Section 1 Card */}
            <div id="section-1" className="scroll-mt-32 p-6 sm:p-8 rounded-3xl bg-[#0c0817]/80 border border-purple-500/20 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-purple-500/40 transition-all duration-300 space-y-4">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="w-9 h-9 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 shrink-0 shadow-inner">
                  <Eye className="w-4 h-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  1. Information We Collect
                </h2>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
                We collect personal information that you voluntarily provide to us when expressing an interest in our IT services, custom software development, website design, or mobile applications.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1 hover:border-purple-500/30 transition-colors">
                  <span className="text-[11px] font-mono font-bold text-purple-300 uppercase tracking-wider">PERSONAL IDENTIFIERS</span>
                  <p className="text-xs text-gray-300 leading-normal font-light">Full name, official email address, telephone numbers, and corporate company details.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1 hover:border-purple-500/30 transition-colors">
                  <span className="text-[11px] font-mono font-bold text-purple-300 uppercase tracking-wider">PROJECT METADATA</span>
                  <p className="text-xs text-gray-300 leading-normal font-light">Project specifications, budget parameters, tech stack requirements, and timeline goals.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1 hover:border-purple-500/30 transition-colors">
                  <span className="text-[11px] font-mono font-bold text-purple-300 uppercase tracking-wider">AUTOMATED LOG DATA</span>
                  <p className="text-xs text-gray-300 leading-normal font-light">IP addresses, browser configurations, ISP logs, operating system versions, and page visit duration.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1 hover:border-purple-500/30 transition-colors">
                  <span className="text-[11px] font-mono font-bold text-purple-300 uppercase tracking-wider">COMMUNICATION RECORDS</span>
                  <p className="text-xs text-gray-300 leading-normal font-light">Consultation call transcripts, email correspondence, and support ticket submissions.</p>
                </div>
              </div>
            </div>

            {/* Section 2 Card */}
            <div id="section-2" className="scroll-mt-32 p-6 sm:p-8 rounded-3xl bg-[#0c0817]/80 border border-purple-500/20 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-purple-500/40 transition-all duration-300 space-y-4">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="w-9 h-9 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 shrink-0 shadow-inner">
                  <Layers className="w-4 h-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  2. How We Use Your Information
                </h2>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
                Devoxa Technologies processes collected data strictly for legitimate operational and contractual fulfillment purposes:
              </p>
              <ul className="space-y-2.5 pt-1">
                {[
                  "Deliver, operate, and maintain custom software engineering solutions.",
                  "Process service consultations, project estimations, and client onboardings.",
                  "Send essential administrative updates, service alerts, and technical invoices.",
                  "Prevent illegal activities, fraud attempt detections, and unauthorized access.",
                  "Optimize website performance and refine interactive UI design experiences."
                ].map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 3 Card */}
            <div id="section-3" className="scroll-mt-32 p-6 sm:p-8 rounded-3xl bg-[#0c0817]/80 border border-purple-500/20 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-purple-500/40 transition-all duration-300 space-y-4">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="w-9 h-9 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 shrink-0 shadow-inner">
                  <FileText className="w-4 h-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  3. Cookies & Tracking Technologies
                </h2>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
                We use essential cookies and telemetry beacons to store visitor preferences, optimize session states, and evaluate web performance. You may disable cookies in your browser settings, though certain interactive features may experience diminished functionality.
              </p>
            </div>

            {/* Section 4 Card */}
            <div id="section-4" className="scroll-mt-32 p-6 sm:p-8 rounded-3xl bg-[#0c0817]/80 border border-purple-500/20 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-purple-500/40 transition-all duration-300 space-y-4">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="w-9 h-9 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 shrink-0 shadow-inner">
                  <Share2 className="w-4 h-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  4. Third-Party Data Sharing
                </h2>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
                <strong className="text-white font-semibold">We never sell your personal data.</strong> Information is shared strictly with trusted infrastructure vendors (such as AWS cloud hosting, Vercel deployments, and transactional email processors) under non-disclosure obligations.
              </p>
            </div>

            {/* Section 5 Card */}
            <div id="section-5" className="scroll-mt-32 p-6 sm:p-8 rounded-3xl bg-[#0c0817]/80 border border-purple-500/20 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-purple-500/40 transition-all duration-300 space-y-4">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="w-9 h-9 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 shrink-0 shadow-inner">
                  <Lock className="w-4 h-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  5. Data Security & Storage
                </h2>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
                We employ enterprise-grade AES-256 encryption at rest and TLS 1.3 encryption in transit to safeguard your information against unauthorized disclosure, alteration, or destruction.
              </p>
            </div>

            {/* Section 6 Card */}
            <div id="section-6" className="scroll-mt-32 p-6 sm:p-8 rounded-3xl bg-[#0c0817]/80 border border-purple-500/20 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-purple-500/40 transition-all duration-300 space-y-4">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="w-9 h-9 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 shrink-0 shadow-inner">
                  <UserCheck className="w-4 h-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  6. Your Privacy Rights
                </h2>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
                Depending on your jurisdiction (including GDPR & CCPA rights), you have the right to request access to, correction of, or complete deletion of your personal records stored in our databases.
              </p>
            </div>

            {/* Section 7 Card */}
            <div id="section-7" className="scroll-mt-32 p-6 sm:p-8 rounded-3xl bg-[#0c0817]/80 border border-purple-500/20 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-purple-500/40 transition-all duration-300 space-y-5">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="w-9 h-9 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 shrink-0 shadow-inner">
                  <Mail className="w-4 h-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  7. Contact Our Legal Team
                </h2>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
                If you have questions regarding this Privacy Policy or wish to exercise your data privacy rights, please get in touch:
              </p>

              <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/60 to-indigo-950/60 border border-purple-500/40 space-y-3.5">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-purple-300 shrink-0" />
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-mono font-bold block">EMAIL ADDRESS</span>
                    <a href="mailto:support@devoxatechnologies.com" className="text-xs sm:text-sm font-bold text-white hover:text-purple-300 transition-colors">
                      support@devoxatechnologies.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2.5 border-t border-white/10">
                  <Phone className="w-4 h-4 text-purple-300 shrink-0" />
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-mono font-bold block">PHONE CONTACT</span>
                    <a href="tel:8544005858" className="text-xs sm:text-sm font-bold text-white hover:text-purple-300 transition-colors">
                      +91 8544005858
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Consultation Modal */}
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Global Shared Footer */}
      <div className="hidden lg:block">
        <Footer />
      </div>
      <div className="block lg:hidden">
        <FooterMobile />
      </div>
      <FloatingScrollButton />
    </div>
  );
}
