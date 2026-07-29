"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  FileText, 
  Scale, 
  CheckCircle2, 
  ShieldAlert, 
  Clock, 
  CreditCard, 
  Code2, 
  Mail, 
  ArrowLeft, 
  Sparkles,
  ChevronRight,
  Phone,
  Building2,
  Calendar,
  Menu,
  X
} from "lucide-react";
import Particles from "@/components/Particles";
import ShinyText from "@/components/ShinyText";
import { Footer } from "@/components/ui/footer-section";
import ConsultationModal from "@/components/ConsultationModal";

export default function TermsOfService() {
  const [activeSection, setActiveSection] = useState("terms-1");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "terms-1",
        "terms-2",
        "terms-3",
        "terms-4",
        "terms-5",
        "terms-6",
        "terms-7"
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
    { id: "terms-1", title: "1. Acceptance of Terms", icon: Scale },
    { id: "terms-2", title: "2. Scope of Services", icon: Code2 },
    { id: "terms-3", title: "3. Intellectual Property", icon: FileText },
    { id: "terms-4", title: "4. Payments & Billing", icon: CreditCard },
    { id: "terms-5", title: "5. Project Timelines & Delivery", icon: Clock },
    { id: "terms-6", title: "6. Limitation of Liability", icon: ShieldAlert },
    { id: "terms-7", title: "7. Contact & Governing Law", icon: Mail },
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
              href="/" 
              className="px-4.5 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2"
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
            <Scale className="w-3.5 h-3.5 text-purple-400" />
            <span>LEGAL AGREEMENT</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6">
            <ShinyText text="Terms of Service" color="#ffffff" shineColor="#8b5cf6" speed={3} />
          </h1>

          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light mb-8">
            Please read these Terms of Service carefully before utilizing our custom engineering solutions, website applications, or consulting services.
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
          
          {/* Sticky Sidebar Navigation */}
          <div className="hidden lg:block lg:col-span-4 relative">
            <div className="sticky top-28 space-y-6">
              <div className="bg-[#0c0817]/90 border border-purple-500/20 rounded-3xl p-6 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
                <h3 className="text-xs font-mono font-bold tracking-widest text-purple-300 uppercase mb-4 pb-3 border-b border-white/10 flex items-center justify-between">
                  <span>AGREEMENT SECTIONS</span>
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

              {/* Legal Support Card */}
              <div className="bg-gradient-to-br from-purple-950/60 to-indigo-950/40 border border-purple-500/30 rounded-3xl p-6 backdrop-blur-xl">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 mb-3">
                  <Mail className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Contract Enquiries?</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">
                  For formal contract reviews or enterprise agreement inquiries, reach out to legal support.
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

          {/* Content (Right Column - Modular Curvy Cards) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Introduction Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950/50 via-[#0c0817] to-indigo-950/50 border border-purple-500/30 text-gray-200 text-sm sm:text-base leading-relaxed backdrop-blur-xl shadow-lg">
              <p className="font-light">
                These Terms of Service govern your access to and use of digital products, website design, mobile applications, and software development services provided by <strong className="text-white font-semibold">Devoxa Technologies Pvt. Ltd.</strong> By retaining our services or utilizing our platforms, you agree to be bound by these terms.
              </p>
            </div>

            {/* Section 1 Card */}
            <div id="terms-1" className="scroll-mt-32 p-6 sm:p-8 rounded-3xl bg-[#0c0817]/80 border border-purple-500/20 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-purple-500/40 transition-all duration-300 space-y-4">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="w-9 h-9 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 shrink-0 shadow-inner">
                  <Scale className="w-4 h-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  1. Acceptance of Terms
                </h2>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
                By accessing devoxatechnologies.com or commissioning software development services with Devoxa Technologies, you confirm that you have read, understood, and agreed to these Terms of Service. If you are entering into this agreement on behalf of a corporate entity, you warrant that you possess full legal authority to bind that organization.
              </p>
            </div>

            {/* Section 2 Card */}
            <div id="terms-2" className="scroll-mt-32 p-6 sm:p-8 rounded-3xl bg-[#0c0817]/80 border border-purple-500/20 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-purple-500/40 transition-all duration-300 space-y-4">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="w-9 h-9 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 shrink-0 shadow-inner">
                  <Code2 className="w-4 h-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  2. Scope of IT & Engineering Services
                </h2>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
                Devoxa Technologies provides custom digital agency services including but not limited to:
              </p>
              <ul className="space-y-2.5 pt-1">
                {[
                  "Custom full-stack web application development and responsive UI design.",
                  "Mobile application engineering for iOS and Android operating systems.",
                  "Enterprise CRM, ERP systems, and cloud infrastructure setup.",
                  "API design, third-party platform integrations, and database architecture.",
                  "AI workflow automation, performance tuning, and technical maintenance."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 3 Card */}
            <div id="terms-3" className="scroll-mt-32 p-6 sm:p-8 rounded-3xl bg-[#0c0817]/80 border border-purple-500/20 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-purple-500/40 transition-all duration-300 space-y-4">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="w-9 h-9 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 shrink-0 shadow-inner">
                  <FileText className="w-4 h-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  3. Intellectual Property Rights
                </h2>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
                Upon final payment of all agreed invoices, Devoxa Technologies transfers full ownership of custom client deliverables, codebase, and graphic assets to the client. Devoxa retains rights to proprietary pre-existing libraries, framework boilerplates, and developer tooling utilized during production.
              </p>
            </div>

            {/* Section 4 Card */}
            <div id="terms-4" className="scroll-mt-32 p-6 sm:p-8 rounded-3xl bg-[#0c0817]/80 border border-purple-500/20 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-purple-500/40 transition-all duration-300 space-y-4">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="w-9 h-9 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 shrink-0 shadow-inner">
                  <CreditCard className="w-4 h-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  4. Payments, Billing & Retainers
                </h2>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
                Service milestones, deposit retainers, and invoice schedules are defined in individual Statement of Work (SOW) documents. Payments are due within 14 calendar days from invoice issuance unless specified otherwise.
              </p>
            </div>

            {/* Section 5 Card */}
            <div id="terms-5" className="scroll-mt-32 p-6 sm:p-8 rounded-3xl bg-[#0c0817]/80 border border-purple-500/20 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-purple-500/40 transition-all duration-300 space-y-4">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="w-9 h-9 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 shrink-0 shadow-inner">
                  <Clock className="w-4 h-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  5. Project Timelines & Delivery
                </h2>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
                Project schedules are dependent on prompt feedback, content provision, and approvals from the client. Delays in client feedback or asset handovers may adjust agreed delivery dates accordingly.
              </p>
            </div>

            {/* Section 6 Card */}
            <div id="terms-6" className="scroll-mt-32 p-6 sm:p-8 rounded-3xl bg-[#0c0817]/80 border border-purple-500/20 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-purple-500/40 transition-all duration-300 space-y-4">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="w-9 h-9 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 shrink-0 shadow-inner">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  6. Limitation of Liability
                </h2>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
                To the maximum extent permitted by law, Devoxa Technologies shall not be liable for indirect, incidental, or consequential damages, server downtime caused by third-party hosting providers, or losses resulting from unauthorized client credential sharing.
              </p>
            </div>

            {/* Section 7 Card */}
            <div id="terms-7" className="scroll-mt-32 p-6 sm:p-8 rounded-3xl bg-[#0c0817]/80 border border-purple-500/20 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-purple-500/40 transition-all duration-300 space-y-5">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="w-9 h-9 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 shrink-0 shadow-inner">
                  <Mail className="w-4 h-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  7. Contact & Governing Law
                </h2>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
                These terms are governed by and construed in accordance with the laws of India. For any legal inquiries or formal contract notifications:
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

      {/* Shared Reusable Desktop Footer Component */}
      <Footer />

      {/* Consultation Modal */}
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
