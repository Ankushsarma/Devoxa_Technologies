"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Eye, 
  Layers,
  FileText, 
  Share2, 
  Lock, 
  UserCheck, 
  Mail, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles,
  ChevronRight,
  Phone,
  Building2,
  Calendar,
  Menu,
  X,
  BookOpen,
  Target,
  Heart,
  Users,
  Award
} from "lucide-react";
import Particles from "@/components/Particles";
import ShinyText from "@/components/ShinyText";
import ConsultationModal from "@/components/ConsultationModal";

export default function AboutUs() {
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
        "section-5"
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
    { id: "section-1", title: "1. Our Story", icon: BookOpen },
    { id: "section-2", title: "2. Mission & Vision", icon: Target },
    { id: "section-3", title: "3. Core Values", icon: Heart },
    { id: "section-4", title: "4. Leadership Team", icon: Users },
    { id: "section-5", title: "5. Why Choose Us", icon: Award },
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
            <Building2 className="w-3.5 h-3.5 text-[#705474]" />
            <span>WHO WE ARE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6">
            <ShinyText text="About Devoxa" color="#f1eef1" shineColor="#705474" speed={3} />
          </h1>

          <p className="text-[#f1eef1]/70 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light mb-8">
            Discover our story, our mission, and the brilliant minds driving digital transformation globally from the heart of Bihar, India.
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
                  <span>TABLE OF CONTENTS</span>
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

              {/* Work With Us Card */}
              <div className="bg-[#2B0F45] border border-[#705474]/30 rounded-3xl p-6 backdrop-blur-xl">
                <div className="w-10 h-10 rounded-2xl bg-[#523056] border border-[#705474]/30 flex items-center justify-center text-[#705474] mb-3">
                  <Mail className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-[#f1eef1] mb-1">Want to work together?</h4>
                <p className="text-xs text-[#f1eef1]/60 leading-relaxed mb-4">
                  We are always looking for exciting new projects and partnerships.
                </p>
                <a 
                  href="mailto:support@devoxatechnologies.com" 
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#705474] hover:text-[#f1eef1] transition-colors"
                >
                  <span>support@devoxatechnologies.com</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* About Content (Right Column) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Introduction Callout Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#2B0F45] border border-[#705474]/30 text-[#f1eef1] text-sm sm:text-base leading-relaxed backdrop-blur-xl shadow-lg">
              <p className="font-light">
                <strong className="text-[#f1eef1] font-semibold">Devoxa Technologies Pvt. Ltd.</strong> is a premier digital agency that specializes in crafting bespoke software, compelling web experiences, and scalable enterprise solutions. We believe that elegant code and sophisticated design can transform how businesses interact with the world.
              </p>
            </div>

            {/* Section 1 Card */}
            <div id="section-1" className="scroll-mt-32 p-6 sm:p-8 rounded-3xl bg-transparent border border-[#705474]/20 backdrop-blur-xl shadow-[0_0_40px_rgba(139,47,209,0.15)] hover:border-[#705474]/40 transition-all duration-300 space-y-4">
              <div className="flex items-center gap-3 border-b border-[#705474]/15 pb-4">
                <div className="w-9 h-9 rounded-2xl bg-[#523056] border border-[#705474]/30 flex items-center justify-center text-[#705474] shrink-0 shadow-inner">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h2 className="text-[15px] sm:text-xl font-extrabold text-[#f1eef1] tracking-tight uppercase leading-tight">
                  1. Our Story
                </h2>
              </div>
              <p className="text-[#f1eef1]/70 text-xs sm:text-sm leading-relaxed font-light">
                Founded by Ankush Kumar and Nikhil Kumar, Devoxa Technologies started with a simple vision: to bring world-class digital innovation to businesses across the globe, right from our roots in Bihar, India. What began as a passionate endeavor quickly evolved into a full-scale digital agency, fueled by a relentless pursuit of technical excellence and creative design.
              </p>
            </div>

            {/* Section 2 Card */}
            <div id="section-2" className="scroll-mt-32 p-6 sm:p-8 rounded-3xl bg-transparent border border-[#705474]/20 backdrop-blur-xl shadow-[0_0_40px_rgba(139,47,209,0.15)] hover:border-[#705474]/40 transition-all duration-300 space-y-4">
              <div className="flex items-center gap-3 border-b border-[#705474]/15 pb-4">
                <div className="w-9 h-9 rounded-2xl bg-[#523056] border border-[#705474]/30 flex items-center justify-center text-[#705474] shrink-0 shadow-inner">
                  <Target className="w-4 h-4" />
                </div>
                <h2 className="text-[15px] sm:text-xl font-extrabold text-[#f1eef1] tracking-tight uppercase leading-tight">
                  2. Mission & Vision
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#2B0F45] border border-[#705474]/20">
                  <h3 className="font-bold text-[#f1eef1] mb-2 text-sm uppercase tracking-wider">Our Mission</h3>
                  <p className="text-[#f1eef1]/70 text-xs sm:text-sm leading-relaxed font-light">
                    To empower forward-thinking brands by building robust, scalable, and visually striking software solutions that solve complex problems and drive measurable growth.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-[#2B0F45] border border-[#705474]/20">
                  <h3 className="font-bold text-[#f1eef1] mb-2 text-sm uppercase tracking-wider">Our Vision</h3>
                  <p className="text-[#f1eef1]/70 text-xs sm:text-sm leading-relaxed font-light">
                    To become the global benchmark for technical innovation and design brilliance, proving that exceptional talent and transformative ideas know no geographical boundaries.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3 Card */}
            <div id="section-3" className="scroll-mt-32 p-6 sm:p-8 rounded-3xl bg-transparent border border-[#705474]/20 backdrop-blur-xl shadow-[0_0_40px_rgba(139,47,209,0.15)] hover:border-[#705474]/40 transition-all duration-300 space-y-4">
              <div className="flex items-center gap-3 border-b border-[#705474]/15 pb-4">
                <div className="w-9 h-9 rounded-2xl bg-[#523056] border border-[#705474]/30 flex items-center justify-center text-[#705474] shrink-0 shadow-inner">
                  <Heart className="w-4 h-4" />
                </div>
                <h2 className="text-[15px] sm:text-xl font-extrabold text-[#f1eef1] tracking-tight uppercase leading-tight">
                  3. Core Values
                </h2>
              </div>
              <ul className="space-y-2.5 pt-1">
                {[
                  "Innovation First: We constantly explore emerging technologies to keep our clients ahead of the curve.",
                  "Design Excellence: Every pixel matters. We believe great software must be both powerful and beautiful.",
                  "Client Success: We view our clients as partners. Their growth is the true measure of our success.",
                  "Uncompromising Quality: From architecture to deployment, we adhere to the highest engineering standards.",
                  "Transparency: Open communication, honest feedback, and clear processes at every stage."
                ].map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#f1eef1]/70">
                    <CheckCircle2 className="w-4 h-4 text-[#705474] shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 4 Card */}
            <div id="section-4" className="scroll-mt-32 p-6 sm:p-8 rounded-3xl bg-transparent border border-[#705474]/20 backdrop-blur-xl shadow-[0_0_40px_rgba(139,47,209,0.15)] hover:border-[#705474]/40 transition-all duration-300 space-y-4">
              <div className="flex items-center gap-3 border-b border-[#705474]/15 pb-4">
                <div className="w-9 h-9 rounded-2xl bg-[#523056] border border-[#705474]/30 flex items-center justify-center text-[#705474] shrink-0 shadow-inner">
                  <Users className="w-4 h-4" />
                </div>
                <h2 className="text-[15px] sm:text-xl font-extrabold text-[#f1eef1] tracking-tight uppercase leading-tight">
                  4. Leadership Team
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="relative group overflow-hidden rounded-[40px] aspect-[4/5] bg-[#2B0F45]/50 border border-[#705474]/30 shadow-lg">
                  <img 
                    src="/ankush.jpg" 
                    alt="Ankush Kumar" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0710]/95 via-[#0A0710]/40 to-transparent pointer-events-none"></div>
                  <div className="absolute inset-0 p-8 flex flex-col justify-end text-center items-center">
                    <h3 className="font-bold text-[#f1eef1] text-2xl sm:text-3xl mb-1.5 tracking-tight">Ankush Kumar</h3>
                    <p className="text-[#f1eef1]/80 font-medium text-base sm:text-lg">Co-Founder & Director</p>
                  </div>
                </div>
                <div className="relative group overflow-hidden rounded-[40px] aspect-[4/5] bg-[#2B0F45]/50 border border-[#705474]/30 shadow-lg">
                  <img 
                    src="/nikhil.jpeg" 
                    alt="Nikhil Kumar" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0710]/95 via-[#0A0710]/40 to-transparent pointer-events-none"></div>
                  <div className="absolute inset-0 p-8 flex flex-col justify-end text-center items-center">
                    <h3 className="font-bold text-[#f1eef1] text-2xl sm:text-3xl mb-1.5 tracking-tight">Nikhil Kumar</h3>
                    <p className="text-[#f1eef1]/80 font-medium text-base sm:text-lg">Co-Founder & Director</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5 Card */}
            <div id="section-5" className="scroll-mt-32 p-6 sm:p-8 rounded-3xl bg-transparent border border-[#705474]/20 backdrop-blur-xl shadow-[0_0_40px_rgba(139,47,209,0.15)] hover:border-[#705474]/40 transition-all duration-300 space-y-4">
              <div className="flex items-center gap-3 border-b border-[#705474]/15 pb-4">
                <div className="w-9 h-9 rounded-2xl bg-[#523056] border border-[#705474]/30 flex items-center justify-center text-[#705474] shrink-0 shadow-inner">
                  <Award className="w-4 h-4" />
                </div>
                <h2 className="text-[15px] sm:text-xl font-extrabold text-[#f1eef1] tracking-tight uppercase leading-tight">
                  5. Why Choose Us
                </h2>
              </div>
              <p className="text-[#f1eef1]/70 text-xs sm:text-sm leading-relaxed font-light">
                We do not just write code; we architect solutions. Devoxa Technologies brings together a unique blend of deep technical expertise and premium design aesthetics. When you partner with us, you gain a dedicated team committed to accelerating your digital journey from concept to deployment.
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
