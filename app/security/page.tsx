"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  FileText, 
  Lock, 
  Eye, Server, Shield, Code, CheckSquare, AlertTriangle, Bug, 
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
export default function SecurityPolicy() {
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
    { id: "section-1", title: "1. Infrastructure Security", icon: Server },
    { id: "section-2", title: "2. Data Protection", icon: Shield },
    { id: "section-3", title: "3. Application Security", icon: Code },
    { id: "section-4", title: "4. Compliance & Audits", icon: CheckSquare },
    { id: "section-5", title: "5. Incident Response", icon: AlertTriangle },
    { id: "section-6", title: "6. Vulnerability Disclosure", icon: Bug },
    { id: "section-7", title: "7. Contact Security Team", icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-transparent text-[#FFFFFF] selection:bg-[#5B1FA0] selection:text-[#FFFFFF] font-sans relative overflow-x-hidden">
      
      {/* Responsive Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent border-none outline-none">
        
        {/* Desktop Header Navigation (lg:flex) */}
        <nav className="hidden lg:flex py-6 px-12 lg:px-16 justify-between items-center w-full bg-transparent border-none outline-none">
          {/* Logo & Company Name */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#5B1FA0] via-[#5B1FA0] to-[#5B1FA0] p-[1.5px] shadow-[0_0_40px_rgba(139,47,209,0.15)] shrink-0">
                <div className="w-full h-full bg-[#0B0819] rounded-[10px] flex items-center justify-center p-1.5 overflow-hidden">
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-contain transform group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-serif text-xl font-bold tracking-tight text-[#FFFFFF] leading-tight">Devoxa Technologies</span>
                <span className="text-[10px] font-mono font-semibold tracking-wider text-[#8B2FD1] uppercase">Legal Documentation</span>
              </div>
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-5">
            <Link 
              href="/#footer" 
              className="px-4.5 py-2 rounded-full bg-[#0c0817] border border-purple-500/30 shadow-[0_0_10px_rgba(139,92,246,0.15)] text-xs font-semibold text-purple-100 hover:bg-[#140c27] hover:border-purple-500/60 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:text-white active:scale-95 transition-all flex items-center gap-2"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#8B2FD1]" />
              <span>Return to Home</span>
            </Link>
            <Link href="/login" className="px-4.5 py-2 rounded-full bg-[#0c0817] border border-purple-500/30 shadow-[0_0_10px_rgba(139,92,246,0.15)] text-xs font-mono font-semibold uppercase tracking-widest text-purple-100 hover:bg-[#140c27] hover:border-purple-500/60 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:text-white transition-all flex items-center">
              Login
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="border border-purple-400/50 px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-xs font-mono uppercase tracking-widest text-white hover:from-violet-500 hover:to-fuchsia-500 transition-all shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#8B2FD1]" />
              <span>Book a call —</span>
            </button>
          </div>
        </nav>

        {/* Mobile Header Navigation (lg:hidden) */}
        <nav className="flex lg:hidden py-4 px-6 justify-between items-center w-full bg-transparent border-none outline-none">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#5B1FA0] to-[#5B1FA0] p-[1.5px] shrink-0">
              <div className="w-full h-full bg-[#0B0819] rounded-[10px] flex items-center justify-center p-1 overflow-hidden">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
            </div>
            <span className="font-serif text-lg font-bold tracking-tight text-[#FFFFFF]">Devoxa</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 rounded-full bg-transparent border border-[#8B2FD1]/30 flex items-center justify-center text-[#FFFFFF]"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="absolute top-16 left-4 right-4 bg-[#0A0714]/95 border border-[#8B2FD1]/30 rounded-3xl p-4 shadow-2xl backdrop-blur-2xl flex flex-col gap-2">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2.5 rounded-2xl bg-transparent text-xs font-semibold text-[#FFFFFF] hover:text-[#FFFFFF] flex items-center justify-between">
                <span>Home</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#8B2FD1]" />
              </Link>
              <Link href="/#solutions" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2.5 rounded-2xl bg-transparent text-xs font-semibold text-[#FFFFFF] hover:text-[#FFFFFF] flex items-center justify-between">
                <span>Solutions</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#8B2FD1]" />
              </Link>
              <Link href="/#pricing" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2.5 rounded-2xl bg-transparent text-xs font-semibold text-[#FFFFFF] hover:text-[#FFFFFF] flex items-center justify-between">
                <span>Pricing</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#8B2FD1]" />
              </Link>
              <Link href="/#faq" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2.5 rounded-2xl bg-transparent text-xs font-semibold text-[#FFFFFF] hover:text-[#FFFFFF] flex items-center justify-between">
                <span>FAQ</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#8B2FD1]" />
              </Link>
              <button
                onClick={() => { setMobileMenuOpen(false); setIsModalOpen(true); }}
                className="mt-2 w-full py-3 rounded-full bg-gradient-to-r from-[#5B1FA0] to-[#5B1FA0] text-[#FFFFFF] font-bold text-xs uppercase tracking-wider text-center"
              >
                Book a Free Call
              </button>
            </div>
          )}
        </nav>

      </header>

      {/* Hero Header Section */}
      <section className="relative pt-36 md:pt-44 pb-16 px-6 md:px-12 lg:px-16 overflow-hidden bg-gradient-to-b from-[#0A0710] via-[#2B0F45] to-[#0A0710]">
        {/* Background Particles & Glows */}
        <div className="absolute inset-0 z-0 opacity-70">
          <Particles particleCount={120} particleColors={["#ffffff", "#8B2FD1", "#5B1FA0"]} />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-[#5B1FA0]/20 via-[#5B1FA0]/20 to-[#5B1FA0]/20 rounded-full blur-[120px] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto relative z-10 text-center flex flex-col items-center">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-4.5 py-1.5 rounded-full bg-transparent border border-[#8B2FD1]/30 text-[#8B2FD1] font-mono text-[11px] uppercase tracking-[0.2em] font-bold shadow-[0_0_40px_rgba(139,47,209,0.15)] mb-6">
            <ShieldCheck className="w-3.5 h-3.5 text-[#8B2FD1]" />
            <span>LEGAL & COMPLIANCE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6">
            <ShinyText text="Security & Trust" color="#ffffff" shineColor="#8B2FD1" speed={3} />
          </h1>

          <p className="text-[#FFFFFF]/70 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light mb-8">
            Security is our top priority. Discover the robust measures and protocols Devoxa Technologies implements to protect your data and infrastructure.
          </p>

          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[#FFFFFF]/60">
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-transparent border border-[#8B2FD1]/15">
              <Calendar className="w-3.5 h-3.5 text-[#8B2FD1]" />
              <span>Effective Date: May 12, 2026</span>
            </div>
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-transparent border border-[#8B2FD1]/15">
              <Building2 className="w-3.5 h-3.5 text-[#8B2FD1]" />
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
              <div className="bg-transparent border border-[#8B2FD1]/20 rounded-3xl p-6 backdrop-blur-xl shadow-[0_0_40px_rgba(139,47,209,0.15)]">
                <h3 className="text-xs font-mono font-bold tracking-widest text-[#8B2FD1] uppercase mb-4 pb-3 border-b border-[#8B2FD1]/15 flex items-center justify-between">
                  <span>TABLE OF CONTENTS</span>
                  <Code className="w-4 h-4 text-[#8B2FD1]" />
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
                            ? "bg-[#5B1FA0] text-[#FFFFFF] border border-[#8B2FD1]/40 shadow-[0_0_40px_rgba(139,47,209,0.15)]" 
                            : "text-[#FFFFFF]/60 hover:text-[#FFFFFF] hover:bg-transparent border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <IconComp className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-[#8B2FD1]" : "text-[#FFFFFF]/50 group-hover:text-[#8B2FD1]"}`} />
                          <span className="truncate">{item.title}</span>
                        </div>
                        <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${isActive ? "text-[#8B2FD1] translate-x-0.5" : "text-gray-600 group-hover:text-[#8B2FD1]"}`} />
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Need Help Card */}
              <div className="bg-gradient-to-br from-[#2B0F45] to-[#2B0F45] border border-[#8B2FD1]/30 rounded-3xl p-6 backdrop-blur-xl">
                <div className="w-10 h-10 rounded-2xl bg-[#5B1FA0] border border-[#8B2FD1]/30 flex items-center justify-center text-[#8B2FD1] mb-3">
                  <Mail className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-[#FFFFFF] mb-1">Have Legal Questions?</h4>
                <p className="text-xs text-[#FFFFFF]/60 leading-relaxed mb-4">
                  Our privacy and data protection officer is ready to assist you.
                </p>
                <a 
                  href="mailto:support@devoxatechnologies.com" 
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#8B2FD1] hover:text-[#FFFFFF] transition-colors"
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
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#2B0F45] via-[#0c0817] to-[#2B0F45] border border-[#8B2FD1]/30 text-[#FFFFFF] text-sm sm:text-base leading-relaxed backdrop-blur-xl shadow-lg">
              <p className="font-light">
                At <strong className="text-[#FFFFFF] font-semibold">Devoxa Technologies Pvt. Ltd.</strong>, accessible from <Link href="/" className="text-[#8B2FD1] hover:underline">devoxatechnologies.com</Link>, one of our main priorities is the privacy of our visitors and clients. This Security & Trust document outlines the types of information that is collected and recorded by Devoxa Technologies and how we utilize it.
              </p>
            </div>

            {/* Section 1 Card */}
            <div id="section-1" className="scroll-mt-32 p-6 sm:p-8 rounded-3xl bg-transparent border border-[#8B2FD1]/20 backdrop-blur-xl shadow-[0_0_40px_rgba(139,47,209,0.15)] hover:border-[#8B2FD1]/40 transition-all duration-300 space-y-4">
              <div className="flex items-center gap-3 border-b border-[#8B2FD1]/15 pb-4">
                <div className="w-9 h-9 rounded-2xl bg-[#5B1FA0] border border-[#8B2FD1]/30 flex items-center justify-center text-[#8B2FD1] shrink-0 shadow-inner">
                  <Server className="w-4 h-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#FFFFFF] tracking-tight">
                  1. Infrastructure Security
                </h2>
              </div>
              <p className="text-[#FFFFFF]/70 text-xs sm:text-sm leading-relaxed font-light">
                Our services are built on secure, scalable cloud infrastructure. We implement defense-in-depth strategies to protect against physical and logical threats.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="p-4 rounded-2xl bg-transparent border border-[#8B2FD1]/15 space-y-1 hover:border-[#8B2FD1]/30 transition-colors">
                  <span className="text-[11px] font-mono font-bold text-[#8B2FD1] uppercase tracking-wider">PERSONAL IDENTIFIERS</span>
                  <p className="text-xs text-[#FFFFFF]/70 leading-normal font-light">Full name, official email address, telephone numbers, and corporate company details.</p>
                </div>
                <div className="p-4 rounded-2xl bg-transparent border border-[#8B2FD1]/15 space-y-1 hover:border-[#8B2FD1]/30 transition-colors">
                  <span className="text-[11px] font-mono font-bold text-[#8B2FD1] uppercase tracking-wider">PROJECT METADATA</span>
                  <p className="text-xs text-[#FFFFFF]/70 leading-normal font-light">Project specifications, budget parameters, tech stack requirements, and timeline goals.</p>
                </div>
                <div className="p-4 rounded-2xl bg-transparent border border-[#8B2FD1]/15 space-y-1 hover:border-[#8B2FD1]/30 transition-colors">
                  <span className="text-[11px] font-mono font-bold text-[#8B2FD1] uppercase tracking-wider">AUTOMATED LOG DATA</span>
                  <p className="text-xs text-[#FFFFFF]/70 leading-normal font-light">IP addresses, browser configurations, ISP logs, operating system versions, and page visit duration.</p>
                </div>
                <div className="p-4 rounded-2xl bg-transparent border border-[#8B2FD1]/15 space-y-1 hover:border-[#8B2FD1]/30 transition-colors">
                  <span className="text-[11px] font-mono font-bold text-[#8B2FD1] uppercase tracking-wider">COMMUNICATION RECORDS</span>
                  <p className="text-xs text-[#FFFFFF]/70 leading-normal font-light">Consultation call transcripts, email correspondence, and support ticket submissions.</p>
                </div>
              </div>
            </div>

            {/* Section 2 Card */}
            <div id="section-2" className="scroll-mt-32 p-6 sm:p-8 rounded-3xl bg-transparent border border-[#8B2FD1]/20 backdrop-blur-xl shadow-[0_0_40px_rgba(139,47,209,0.15)] hover:border-[#8B2FD1]/40 transition-all duration-300 space-y-4">
              <div className="flex items-center gap-3 border-b border-[#8B2FD1]/15 pb-4">
                <div className="w-9 h-9 rounded-2xl bg-[#5B1FA0] border border-[#8B2FD1]/30 flex items-center justify-center text-[#8B2FD1] shrink-0 shadow-inner">
                  <Shield className="w-4 h-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#FFFFFF] tracking-tight">
                  2. How We Use Your Information
                </h2>
              </div>
              <p className="text-[#FFFFFF]/70 text-xs sm:text-sm leading-relaxed font-light">
                We apply rigorous data protection standards across all our platforms to ensure confidentiality, integrity, and availability:
              </p>
              <ul className="space-y-2.5 pt-1">
                {[
                  "Deliver, operate, and maintain custom software engineering solutions.",
                  "Process service consultations, project estimations, and client onboardings.",
                  "Send essential administrative updates, service alerts, and technical invoices.",
                  "Prevent illegal activities, fraud attempt detections, and unauthorized access.",
                  "Optimize website performance and refine interactive UI design experiences."
                ].map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#FFFFFF]/70">
                    <CheckCircle2 className="w-4 h-4 text-[#8B2FD1] shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 3 Card */}
            <div id="section-3" className="scroll-mt-32 p-6 sm:p-8 rounded-3xl bg-transparent border border-[#8B2FD1]/20 backdrop-blur-xl shadow-[0_0_40px_rgba(139,47,209,0.15)] hover:border-[#8B2FD1]/40 transition-all duration-300 space-y-4">
              <div className="flex items-center gap-3 border-b border-[#8B2FD1]/15 pb-4">
                <div className="w-9 h-9 rounded-2xl bg-[#5B1FA0] border border-[#8B2FD1]/30 flex items-center justify-center text-[#8B2FD1] shrink-0 shadow-inner">
                  <Code className="w-4 h-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#FFFFFF] tracking-tight">
                  3. Application Security Technologies
                </h2>
              </div>
              <p className="text-[#FFFFFF]/70 text-xs sm:text-sm leading-relaxed font-light">
                We use essential cookies and telemetry beacons to store visitor preferences, optimize session states, and evaluate web performance. You may disable cookies in your browser settings, though certain interactive features may experience diminished functionality.
              </p>
            </div>

            {/* Section 4 Card */}
            <div id="section-4" className="scroll-mt-32 p-6 sm:p-8 rounded-3xl bg-transparent border border-[#8B2FD1]/20 backdrop-blur-xl shadow-[0_0_40px_rgba(139,47,209,0.15)] hover:border-[#8B2FD1]/40 transition-all duration-300 space-y-4">
              <div className="flex items-center gap-3 border-b border-[#8B2FD1]/15 pb-4">
                <div className="w-9 h-9 rounded-2xl bg-[#5B1FA0] border border-[#8B2FD1]/30 flex items-center justify-center text-[#8B2FD1] shrink-0 shadow-inner">
                  <CheckSquare className="w-4 h-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#FFFFFF] tracking-tight">
                  4. Third-Party Data Sharing
                </h2>
              </div>
              <p className="text-[#FFFFFF]/70 text-xs sm:text-sm leading-relaxed font-light">
                <strong className="text-[#FFFFFF] font-semibold">We never sell your personal data.</strong> Information is shared strictly with trusted infrastructure vendors (such as AWS cloud hosting, Vercel deployments, and transactional email processors) under non-disclosure obligations.
              </p>
            </div>

            {/* Section 5 Card */}
            <div id="section-5" className="scroll-mt-32 p-6 sm:p-8 rounded-3xl bg-transparent border border-[#8B2FD1]/20 backdrop-blur-xl shadow-[0_0_40px_rgba(139,47,209,0.15)] hover:border-[#8B2FD1]/40 transition-all duration-300 space-y-4">
              <div className="flex items-center gap-3 border-b border-[#8B2FD1]/15 pb-4">
                <div className="w-9 h-9 rounded-2xl bg-[#5B1FA0] border border-[#8B2FD1]/30 flex items-center justify-center text-[#8B2FD1] shrink-0 shadow-inner">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#FFFFFF] tracking-tight">
                  5. Incident Response
                </h2>
              </div>
              <p className="text-[#FFFFFF]/70 text-xs sm:text-sm leading-relaxed font-light">
                We employ enterprise-grade AES-256 encryption at rest and TLS 1.3 encryption in transit to safeguard your information against unauthorized disclosure, alteration, or destruction.
              </p>
            </div>

            {/* Section 6 Card */}
            <div id="section-6" className="scroll-mt-32 p-6 sm:p-8 rounded-3xl bg-transparent border border-[#8B2FD1]/20 backdrop-blur-xl shadow-[0_0_40px_rgba(139,47,209,0.15)] hover:border-[#8B2FD1]/40 transition-all duration-300 space-y-4">
              <div className="flex items-center gap-3 border-b border-[#8B2FD1]/15 pb-4">
                <div className="w-9 h-9 rounded-2xl bg-[#5B1FA0] border border-[#8B2FD1]/30 flex items-center justify-center text-[#8B2FD1] shrink-0 shadow-inner">
                  <Bug className="w-4 h-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#FFFFFF] tracking-tight">
                  6. Vulnerability Disclosure
                </h2>
              </div>
              <p className="text-[#FFFFFF]/70 text-xs sm:text-sm leading-relaxed font-light">
                Depending on your jurisdiction (including GDPR & CCPA rights), you have the right to request access to, correction of, or complete deletion of your personal records stored in our databases.
              </p>
            </div>

            {/* Section 7 Card */}
            <div id="section-7" className="scroll-mt-32 p-6 sm:p-8 rounded-3xl bg-transparent border border-[#8B2FD1]/20 backdrop-blur-xl shadow-[0_0_40px_rgba(139,47,209,0.15)] hover:border-[#8B2FD1]/40 transition-all duration-300 space-y-5">
              <div className="flex items-center gap-3 border-b border-[#8B2FD1]/15 pb-4">
                <div className="w-9 h-9 rounded-2xl bg-[#5B1FA0] border border-[#8B2FD1]/30 flex items-center justify-center text-[#8B2FD1] shrink-0 shadow-inner">
                  <Mail className="w-4 h-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#FFFFFF] tracking-tight">
                  7. Contact Our Legal Team
                </h2>
              </div>
              <p className="text-[#FFFFFF]/70 text-xs sm:text-sm leading-relaxed font-light">
                If you have questions regarding this Security & Trust or wish to exercise your data privacy rights, please get in touch:
              </p>

              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#2B0F45] to-[#2B0F45] border border-[#8B2FD1]/40 space-y-3.5">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#8B2FD1] shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#FFFFFF]/60 uppercase font-mono font-bold block">EMAIL ADDRESS</span>
                    <a href="mailto:support@devoxatechnologies.com" className="text-xs sm:text-sm font-bold text-[#FFFFFF] hover:text-[#8B2FD1] transition-colors">
                      support@devoxatechnologies.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2.5 border-t border-[#8B2FD1]/15">
                  <Phone className="w-4 h-4 text-[#8B2FD1] shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#FFFFFF]/60 uppercase font-mono font-bold block">PHONE CONTACT</span>
                    <a href="tel:8544005858" className="text-xs sm:text-sm font-bold text-[#FFFFFF] hover:text-[#8B2FD1] transition-colors">
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

      {/* Desktop Footer */}
      <div className="hidden lg:block w-full mt-20">
        <Footer style={{ paddingTop: '0px' }} middleSectionStyle={{ paddingTop: '50px', paddingBottom: '30px' }} />
      </div>

      {/* Mobile Footer */}
      <div className="block lg:hidden w-full mt-10">
        <FooterMobile />
      </div>

    </div>
  );
}
