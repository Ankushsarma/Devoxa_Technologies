"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Sparkles,
  ChevronRight,
  Phone,
  Building2,
  Menu,
  X,
  Mail,
  MapPin,
  MessageSquare,
  Briefcase,
  LifeBuoy,
  BookOpen
} from "lucide-react";
import Particles from "@/components/Particles";
import ShinyText from "@/components/ShinyText";
import ConsultationModal from "@/components/ConsultationModal";

export default function ContactUs() {
  const [activeSection, setActiveSection] = useState("section-1");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "section-1",
        "section-2",
        "section-3",
        "section-4"
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
    { id: "section-1", title: "1. General Inquiries", icon: MessageSquare },
    { id: "section-2", title: "2. Office Locations", icon: MapPin },
    { id: "section-3", title: "3. Business Partnerships", icon: Briefcase },
    { id: "section-4", title: "4. Customer Support", icon: LifeBuoy },
  ];

  return (
    <div className="min-h-screen bg-transparent text-[#f1eef1] selection:bg-[#523056] selection:text-[#f1eef1] font-sans relative overflow-x-hidden">
      
      {/* Responsive Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent border-none outline-none">
        
        {/* Desktop Header Navigation (lg:flex) */}
        <nav className="hidden lg:flex py-6 px-12 lg:px-16 justify-between items-center w-full bg-transparent border-none outline-none">
          {/* Logo & Company Name */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <img src="/logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-serif text-xl font-bold tracking-tight text-[#f1eef1] leading-tight">Devoxa Technologies</span>
                <span className="text-[10px] font-mono font-semibold tracking-wider text-[#705474] uppercase">Corporate Information</span>
              </div>
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-5">
            <Link 
              href="/#footer" 
              className="px-4.5 py-2 rounded-full bg-[#26082a] border border-theme-600/30 shadow-[0_0_10px_rgba(112,84,116,0.15)] text-xs font-semibold text-theme-400 hover:bg-[#330b38] hover:border-theme-600/60 hover:shadow-[0_0_20px_rgba(112,84,116,0.3)] hover:text-theme-50 active:scale-95 transition-all flex items-center gap-2"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#705474]" />
              <span>Return to Home</span>
            </Link>
            <Link href="/login" className="px-4.5 py-2 rounded-full bg-[#26082a] border border-theme-600/30 shadow-[0_0_10px_rgba(112,84,116,0.15)] text-xs font-mono font-semibold uppercase tracking-widest text-theme-400 hover:bg-[#330b38] hover:border-theme-600/60 hover:shadow-[0_0_20px_rgba(112,84,116,0.3)] hover:text-theme-50 transition-all flex items-center">
              Login
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="border border-theme-600/50 px-5 py-2.5 rounded-full bg-theme-700 text-xs font-mono uppercase tracking-widest text-theme-50 hover:from-violet-500 hover:to-fuchsia-500 transition-all shadow-[0_0_20px_rgba(112,84,116,0.4)] hover:shadow-[0_0_30px_rgba(112,84,116,0.6)] flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#705474]" />
              <span>Book a call —</span>
            </button>
          </div>
        </nav>

        {/* Mobile Header Navigation (lg:hidden) */}
        <nav className="flex lg:hidden py-4 px-6 justify-between items-center w-full bg-transparent border-none outline-none">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-8 h-8 rounded-xl bg-[#523056] p-[1.5px] shadow-[0_0_40px_rgba(139,47,209,0.15)] shrink-0">
                <div className="w-full h-full bg-transparent rounded-[10px] flex items-center justify-center p-0.5 overflow-hidden">
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-contain transform group-hover:scale-110 transition-transform" />
                </div>
              </div>
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-[16px] font-extrabold tracking-tight text-[#f1eef1] leading-tight">Devoxa</span>
              </div>
              <span className="text-[9px] font-mono font-semibold tracking-wider text-[#f1eef1]/60 uppercase">Technologies</span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.history.back()}
              className="w-9 h-9 rounded-full bg-transparent border border-[#705474]/30 flex items-center justify-center text-[#f1eef1] hover:bg-[#523056]/30 active:scale-90 active:bg-[#523056]/60 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 rounded-full bg-transparent border border-[#705474]/30 flex items-center justify-center text-[#f1eef1]"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </nav>

      </header>

      {/* Safari-compatible Mobile Menu Popover */}
      {mobileMenuOpen && (
        <div className="fixed top-[76px] left-4 right-4 bg-[#0A0714] border border-[#705474]/50 rounded-3xl p-4 shadow-[0_8px_40px_rgba(0,0,0,0.8)] z-[99999] flex flex-col gap-2">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2.5 rounded-2xl bg-transparent text-xs font-semibold text-[#f1eef1] hover:text-[#f1eef1] flex items-center justify-between">
            <span>Home</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#705474]" />
          </Link>
          <Link href="/#solutions" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2.5 rounded-2xl bg-transparent text-xs font-semibold text-[#f1eef1] hover:text-[#f1eef1] flex items-center justify-between">
            <span>Solutions</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#705474]" />
          </Link>
          <Link href="/#pricing" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2.5 rounded-2xl bg-transparent text-xs font-semibold text-[#f1eef1] hover:text-[#f1eef1] flex items-center justify-between">
            <span>Pricing</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#705474]" />
          </Link>
          <Link href="/#faq" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2.5 rounded-2xl bg-transparent text-xs font-semibold text-[#f1eef1] hover:text-[#f1eef1] flex items-center justify-between">
            <span>FAQ</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#705474]" />
          </Link>
          <button
            onClick={() => { setMobileMenuOpen(false); setIsModalOpen(true); }}
            className="mt-2 w-full py-3 rounded-full bg-[#523056] text-[#f1eef1] font-bold text-xs uppercase tracking-wider text-center"
          >
            Book a Free Call
          </button>
        </div>
      )}

      {/* Hero Header Section */}
      <section className="relative pt-36 md:pt-44 pb-16 px-6 md:px-12 lg:px-16 overflow-hidden bg-[#0A0710]">
        {/* Background Particles & Glows */}
        <div className="absolute inset-0 z-0 opacity-70">
          <Particles particleCount={120} particleColors={["#f1eef1", "#705474", "#523056"]} />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#523056]/20 rounded-full blur-[120px] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto relative z-10 text-center flex flex-col items-center">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-4.5 py-1.5 rounded-full bg-transparent border border-[#705474]/30 text-[#705474] font-mono text-[11px] uppercase tracking-[0.2em] font-bold shadow-[0_0_40px_rgba(139,47,209,0.15)] mb-6">
            <Mail className="w-3.5 h-3.5 text-[#705474]" />
            <span>LET'S CONNECT</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6">
            <ShinyText text="Get in Touch" color="#f1eef1" shineColor="#705474" speed={3} />
          </h1>

          <p className="text-[#f1eef1]/70 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light mb-8">
            We're here to help you scale your business. Reach out to our team for project inquiries, partnerships, or dedicated support.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 md:py-20 px-6 md:px-12 lg:px-16 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Sticky Sidebar Navigation (Desktop) */}
          <div className="hidden lg:block lg:col-span-4 relative">
            <div className="sticky top-28 space-y-6">
              <div className="bg-transparent border border-[#705474]/20 rounded-3xl p-6 backdrop-blur-xl shadow-[0_0_40px_rgba(139,47,209,0.15)]">
                <h3 className="text-xs font-mono font-bold tracking-widest text-[#705474] uppercase mb-4 pb-3 border-b border-[#705474]/15 flex items-center justify-between">
                  <span>DIRECTORY</span>
                  <BookOpen className="w-4 h-4 text-[#705474]" />
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
                            ? "bg-[#523056] text-[#f1eef1] border border-[#705474]/40 shadow-[0_0_40px_rgba(139,47,209,0.15)]" 
                            : "text-[#f1eef1]/60 hover:text-[#f1eef1] hover:bg-transparent border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <IconComp className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-[#705474]" : "text-[#f1eef1]/50 group-hover:text-[#705474]"}`} />
                          <span className="truncate">{item.title}</span>
                        </div>
                        <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${isActive ? "text-[#705474] translate-x-0.5" : "text-theme-300 group-hover:text-[#705474]"}`} />
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>

          {/* Contact Content (Right Column) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Introduction Callout Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#2B0F45] border border-[#705474]/30 text-[#f1eef1] text-sm sm:text-base leading-relaxed backdrop-blur-xl shadow-lg">
              <p className="font-light">
                Whether you have a groundbreaking idea for a new mobile app, need robust enterprise software, or require ongoing technical support, the team at <strong className="text-[#f1eef1] font-semibold">Devoxa Technologies</strong> is ready to collaborate. Let's start the conversation.
              </p>
            </div>

            {/* Section 1 Card */}
            <div id="section-1" className="scroll-mt-32 p-6 sm:p-8 rounded-3xl bg-transparent border border-[#705474]/20 backdrop-blur-xl shadow-[0_0_40px_rgba(139,47,209,0.15)] hover:border-[#705474]/40 transition-all duration-300 space-y-4">
              <div className="flex items-center gap-3 border-b border-[#705474]/15 pb-4">
                <div className="w-9 h-9 rounded-2xl bg-[#523056] border border-[#705474]/30 flex items-center justify-center text-[#705474] shrink-0 shadow-inner">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <h2 className="text-[15px] sm:text-xl font-extrabold text-[#f1eef1] tracking-tight uppercase leading-tight">
                  1. General Inquiries
                </h2>
              </div>
              <p className="text-[#f1eef1]/70 text-xs sm:text-sm leading-relaxed font-light">
                For sales, press, or general information regarding Devoxa Technologies, our central contact channels are the quickest way to reach us.
              </p>
              
              <div className="p-5 rounded-2xl bg-[#2B0F45] border border-[#705474]/40 space-y-3.5 mt-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#705474] shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#f1eef1]/60 uppercase font-mono font-bold block">EMAIL ADDRESS</span>
                    <a href="mailto:support@devoxatechnologies.com" className="text-xs sm:text-sm font-bold text-[#f1eef1] hover:text-[#705474] transition-colors">
                      support@devoxatechnologies.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2.5 border-t border-[#705474]/15">
                  <Phone className="w-4 h-4 text-[#705474] shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#f1eef1]/60 uppercase font-mono font-bold block">PHONE CONTACT</span>
                    <a href="tel:8544005858" className="text-xs sm:text-sm font-bold text-[#f1eef1] hover:text-[#705474] transition-colors">
                      +91 8544005858
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2 Card */}
            <div id="section-2" className="scroll-mt-32 p-6 sm:p-8 rounded-3xl bg-transparent border border-[#705474]/20 backdrop-blur-xl shadow-[0_0_40px_rgba(139,47,209,0.15)] hover:border-[#705474]/40 transition-all duration-300 space-y-4">
              <div className="flex items-center gap-3 border-b border-[#705474]/15 pb-4">
                <div className="w-9 h-9 rounded-2xl bg-[#523056] border border-[#705474]/30 flex items-center justify-center text-[#705474] shrink-0 shadow-inner">
                  <MapPin className="w-4 h-4" />
                </div>
                <h2 className="text-[15px] sm:text-xl font-extrabold text-[#f1eef1] tracking-tight uppercase leading-tight">
                  2. Office Locations
                </h2>
              </div>
              <p className="text-[#f1eef1]/70 text-xs sm:text-sm leading-relaxed font-light">
                Devoxa operates out of our central hub in India. While our team is distributed and capable of handling global operations seamlessly, our headquarters remain our foundation.
              </p>
              
              <div className="p-5 rounded-2xl bg-[#2B0F45]/50 border border-[#705474]/20 mt-4">
                <h3 className="font-bold text-[#f1eef1] mb-2 text-sm uppercase tracking-wider flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#705474]" /> Headquarters (India)
                </h3>
                <p className="text-[#f1eef1]/70 text-xs sm:text-sm leading-relaxed font-light">
                  Bihar, India<br />
                  Devoxa Technologies Pvt. Ltd.<br />
                  (Visits by appointment only)
                </p>
              </div>
            </div>

            {/* Section 3 Card */}
            <div id="section-3" className="scroll-mt-32 p-6 sm:p-8 rounded-3xl bg-transparent border border-[#705474]/20 backdrop-blur-xl shadow-[0_0_40px_rgba(139,47,209,0.15)] hover:border-[#705474]/40 transition-all duration-300 space-y-4">
              <div className="flex items-center gap-3 border-b border-[#705474]/15 pb-4">
                <div className="w-9 h-9 rounded-2xl bg-[#523056] border border-[#705474]/30 flex items-center justify-center text-[#705474] shrink-0 shadow-inner">
                  <Briefcase className="w-4 h-4" />
                </div>
                <h2 className="text-[15px] sm:text-xl font-extrabold text-[#f1eef1] tracking-tight uppercase leading-tight">
                  3. Business Partnerships
                </h2>
              </div>
              <p className="text-[#f1eef1]/70 text-xs sm:text-sm leading-relaxed font-light">
                We regularly partner with specialized agencies, infrastructure providers, and enterprise ecosystems. If you are interested in a strategic partnership, API integrations, or joint ventures, please contact our business development unit directly.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 border border-[#705474]/50 px-5 py-2.5 rounded-full bg-[#2B0F45] text-xs font-mono uppercase tracking-widest text-[#f1eef1] hover:bg-[#523056] transition-all shadow-[0_0_20px_rgba(112,84,116,0.4)] flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#f1eef1]" />
                <span>Discuss Partnership —</span>
              </button>
            </div>

            {/* Section 4 Card */}
            <div id="section-4" className="scroll-mt-32 p-6 sm:p-8 rounded-3xl bg-transparent border border-[#705474]/20 backdrop-blur-xl shadow-[0_0_40px_rgba(139,47,209,0.15)] hover:border-[#705474]/40 transition-all duration-300 space-y-4">
              <div className="flex items-center gap-3 border-b border-[#705474]/15 pb-4">
                <div className="w-9 h-9 rounded-2xl bg-[#523056] border border-[#705474]/30 flex items-center justify-center text-[#705474] shrink-0 shadow-inner">
                  <LifeBuoy className="w-4 h-4" />
                </div>
                <h2 className="text-[15px] sm:text-xl font-extrabold text-[#f1eef1] tracking-tight uppercase leading-tight">
                  4. Customer Support
                </h2>
              </div>
              <p className="text-[#f1eef1]/70 text-xs sm:text-sm leading-relaxed font-light">
                Existing clients benefit from our 24/7 priority support infrastructure. Depending on your SLA, you can reach out via your dedicated client portal or the specialized support email provided during onboarding.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Consultation Modal */}
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </div>
  );
}
