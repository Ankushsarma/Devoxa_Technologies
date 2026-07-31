"use client"

import { useEffect, useState, useRef, useLayoutEffect } from "react"
import { useAuth } from "@/context/auth-context"
import { toast } from "sonner"
import Image from "next/image"
import WebGLVisibilityWrapper from '@/components/WebGLVisibilityWrapper';
import Link from "next/link"
import { Search, BarChart3, Layers, Code2, Zap, ArrowRight, ArrowLeft, Quote, CheckCircle, X, Youtube, Twitter, Instagram, Linkedin, Phone } from "lucide-react"
import FAQAccordion from '@/components/FAQAccordion';
import ShinyText from '@/components/ShinyText';
import TextType from '@/components/TextType';

import LineWaves from "@/components/LineWaves"
import ConsultationModal from "@/components/ConsultationModal"
import AgencySection from "@/components/AgencySection"
import LightPillar from "@/components/LightPillar"
import MagicRings from "@/components/MagicRings"
import CircularGallery from "@/components/CircularGallery"
import LiquidEther from "@/components/LiquidEther"
import SpecularButton from "@/components/SpecularButton"
import LightRays from "@/components/LightRays"
import BorderGlow from "@/components/BorderGlow"
import SideRays from "@/components/SideRays"
import SpotlightCard from "@/components/SpotlightCard"
import Particles from "@/components/Particles"
import PillNav from "@/components/PillNav"
import { Footer } from "@/components/ui/footer-section"
const AnimatedCounter = ({ end, duration = 2000, suffix = "", decimals = 0 }: { end: number, duration?: number, suffix?: string, decimals?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTimestamp: number | null = null;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(easeOut * end);
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(end);
            }
          };
          window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <div ref={ref} className="fs-num">
      {Math.round(count) === count || decimals === 0 ? Math.round(count) : count.toFixed(decimals)}{suffix}
    </div>
  );
};

const AnimatedProcessWorkflow = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { icon: <Search />, title: "Discovery", desc: "Analyze your business needs and competitive landscape" },
    { icon: <BarChart3 />, title: "Strategy", desc: "Build a data-driven technology roadmap" },
    { icon: <Layers />, title: "Design", desc: "Craft scalable, secure system architectures" },
    { icon: <Code2 />, title: "Development", desc: "Agile sprints with continuous feedback loops" },
    { icon: <Zap />, title: "Launch & Support", desc: "Deploy, monitor, and continuously optimize" }
  ];

  return (
    <div className="process-workflow reveal in">
      <div className="process-line"></div>
      {steps.map((step, idx) => (
        <div key={idx} className={`process-step ${activeStep === idx ? 'active' : ''}`} style={idx === 4 ? { marginBottom: 0 } : {}}>
          <div className="step-circle">{step.icon}</div>
          <div className="step-content">
            <div className="step-num">0{idx + 1}</div>
            <h4>{step.title}</h4>
            <p>{step.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const GlowingCard = ({ children, active, delay }: { children: React.ReactNode, active?: boolean, delay: number }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`hero-card ${active ? 'active' : ''}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 rounded-[12px]"
        style={{
          opacity,
          background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, rgba(139, 92, 246, 0.15), transparent 40%)`,
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-[clamp(10px,1.5vw,15px)] w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default function HomePageDesktop() {
  const { user, role, loading, logout } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [projects, setProjects] = useState<any[]>([])

  // Fetch projects for the Work section
  useEffect(() => {
    fetch("/api/projects").then(r => r.json()).then(d => { if (d.projects) setProjects(d.projects) }).catch(() => { })
  }, [])

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Scroll listener for nav blur
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Custom scroll restoration logic (Synchronous to prevent flash + handles layout shifts)
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const savedScroll = sessionStorage.getItem("homeScroll")
    if (savedScroll) {
      const target = parseInt(savedScroll, 10);
      window.scrollTo({ top: target, behavior: "instant" })

      // Re-apply after layout shifts to ensure it doesn't get stuck at the top
      setTimeout(() => window.scrollTo({ top: target, behavior: "instant" }), 50)
      setTimeout(() => window.scrollTo({ top: target, behavior: "instant" }), 150)

      // Reveal page with a smooth fade
      setTimeout(() => {
        document.documentElement.classList.remove("scroll-restoring");
        document.documentElement.classList.add("scroll-restoring-done");
      }, 160);
    } else {
      document.documentElement.classList.remove("scroll-restoring");
    }

    const handleBeforeUnload = () => {
      sessionStorage.setItem("homeScroll", window.scrollY.toString())
    }
    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [])

  // Fix hash routing after layout shifts
  useEffect(() => {
    if (window.location.hash) {
      const isReload = window.performance && window.performance.navigation && window.performance.navigation.type === 1;
      if (isReload && !window.location.search.includes('from=login')) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
        return;
      }

      setTimeout(() => {
        let id = window.location.hash.substring(1)

        let el = document.getElementById(id)
        if (window.innerWidth < 768) {
          const mobileEl = document.getElementById(id + '-mobile')
          if (mobileEl) el = mobileEl
        }

        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }

        // Only strip search params if from=login was present
        if (window.location.search.includes('from=login')) {
          const newUrl = window.location.pathname + window.location.hash;
          window.history.replaceState({}, '', newUrl);
        }
      }, 500) // generous timeout to wait for layout shift
    }
  }, [])

  const props = { user, role, loading, logout, scrolled }

  return (
    <main className="bg-background text-foreground font-sans selection:bg-black selection:text-white overflow-x-hidden">
      <div className="hidden md:block">
        <DesktopNav {...props} />
      </div>
      <div className="block md:hidden">
        <MobileNav {...props} />
      </div>

      <div className="vx">
        <MainContent projects={projects} onOpenModal={() => setIsModalOpen(true)} />
      </div>

      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  )
}

function DesktopNav({ user, role, loading, logout, scrolled }: any) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = ['hero', 'solutions', 'how-it-works', 'recent-projects', 'pricing', 'faq'];

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    }, {
      rootMargin: '-20% 0px -40% 0px',
      threshold: 0
    });

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-transparent py-4' : 'bg-transparent py-6'} px-8 md:px-16 flex justify-between items-center`}>
      {/* 1st Part: Logo */}
      <div className="font-serif text-2xl font-medium tracking-tight italic flex items-center gap-4 text-white flex-1">
        <div style={{ width: '36px', height: '36px', backgroundColor: '#ffffff', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
          <img src="/logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(1.2)' }} />
        </div>
        <Link href="#">Devoxa Technologies</Link>
      </div>

      {/* 2nd Part: Capsule Navigation */}
      <div className="hidden md:flex items-center rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] backdrop-blur-md shadow-lg">
        <PillNav
          logo={null}
          showLogo={false}
          onMobileMenuClick={() => { }}
          items={[
            { label: 'Solutions', href: '#solutions' },
            { label: 'Process', href: '#how-it-works' },
            { label: 'Work', href: '#recent-projects' },
            { label: 'Pricing', href: '#pricing' },
            { label: 'FAQ', href: '#faq' }
          ]}
          activeHref={activeSection}
          ease="power2.easeOut"
          baseColor="rgba(255,255,255,0.1)"
          pillColor="transparent"
          hoveredPillTextColor="#ffffff"
          pillTextColor="#9ca3af"
          initialLoadAnimation={false}
        />
      </div>

      {/* 3rd Part: Auth & CTA */}
      <div className="flex flex-col md:flex-row items-center justify-end gap-6 flex-1">
        {!loading && user ? (
          <>
            <Link href={`/dashboard/${role}`} className="label-mono uppercase tracking-widest text-neutral-300 hover:text-white transition-colors">
              Dashboard
            </Link>
            <button onClick={logout} className="label-mono text-neutral-500 hover:text-white transition-colors">
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="label-mono text-neutral-300 hover:text-white transition-colors">
            Login
          </Link>
        )}
        <a className="border border-white/30 px-6 py-2 text-[10px] font-mono uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all hidden md:block" href="#cta-banner">
          Book a call —
        </a>
      </div>
    </nav>
  )
}

function MobileNav({ user, role, loading, logout, scrolled }: any) {
  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0A0714]/90 backdrop-blur-md border-b border-white/10 shadow-sm' : 'bg-transparent backdrop-blur-sm border-b border-white/10'} px-6 py-4 flex justify-between items-center`}>
      <div className="font-serif text-xl font-medium tracking-tight italic flex items-center gap-3 text-white">
        <div style={{ width: '32px', height: '32px', backgroundColor: '#ffffff', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
          <img src="/logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(1.2)' }} />
        </div>
        <Link href="#">Devoxa</Link>
      </div>
      <div className="flex items-center gap-5">
        {!loading && user ? (
          <Link href={`/dashboard/${role}`} className="label-mono uppercase tracking-widest text-neutral-300 hover:text-white transition-colors text-[10px]">
            Portal
          </Link>
        ) : (
          <Link href="/login" className="label-mono text-neutral-300 hover:text-white transition-colors text-[10px]">
            Login
          </Link>
        )}
        <a className="border border-white/30 px-3 py-1.5 text-[9px] font-mono uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all" href="#cta-banner">
          Book a call
        </a>
      </div>
    </nav>
  )
}

function MainContent({ projects, onOpenModal }: { projects: any[], onOpenModal: () => void }) {
  return (
    <>
      <section id="hero" className="nx vx-float pt-24 md:pt-32">
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}>
          <WebGLVisibilityWrapper isAbsolute={false}>
            <Particles
              className=""
              particleColors={["#ffffff", "#a78bfa", "#c084fc"]}
              particleCount={950}
              particleSpread={25}
              speed={0.1}
              particleBaseSize={150}
              moveParticlesOnHover={true}
              alphaParticles={false}
              disableRotation={false}
            />
          </WebGLVisibilityWrapper>
        </div>
        <div className="nx-overlay" style={{ zIndex: 1, position: "absolute", inset: 0, background: "rgba(5, 5, 6, 0.4)" }} />
        <div className="nx-noise" style={{ zIndex: 2, position: "absolute", inset: 0 }} />
        <div className="nx-inner" style={{ minHeight: "max(100vh, 750px)", alignItems: "flex-start", display: "flex", flexDirection: "column", justifyContent: "flex-start", paddingLeft: "clamp(50px, 12vw, 150px)", paddingTop: "clamp(160px, 20vh, 220px)", paddingBottom: "100px" }}>
          <div style={{ width: "100%", maxWidth: "clamp(480px, 45vw, 680px)", textAlign: "left", position: "relative", zIndex: 10, marginBottom: "auto" }}>

            {/* Eyebrow */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "clamp(12px, 1.5vh, 16px)", position: "relative" }}>
              <div style={{ position: "absolute", left: "-10px", top: "-5px", width: "40px", height: "30px", backgroundColor: "#7c3aed", zIndex: -1 }}></div>
              <span style={{ fontFamily: "monospace", fontSize: "clamp(10px, 0.9vw, 12px)", fontWeight: 700, letterSpacing: "2px", color: "#fff", textTransform: "uppercase" }}>
                DIGITAL FIRST
              </span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "clamp(32px, 4.5vw, 60px)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.1,
              letterSpacing: "clamp(2px, 0.3vw, 6px)",
              marginBottom: "clamp(20px, 3vh, 32px)",
              textTransform: "uppercase"
            }}>
              <span className="animate-shine" style={{
                display: "block",
                marginBottom: "clamp(4px, 1vh, 8px)",
                backgroundImage: "linear-gradient(120deg, rgba(255, 255, 255, 0.7) 40%, #fff 50%, rgba(255, 255, 255, 0.7) 60%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                color: "transparent",
                backgroundClip: "text"
              }}>BUILD THE</span>
              <img
                src="/untitled-logotype.png"
                alt="FUTURE"
                style={{
                  width: "100%",
                  maxWidth: "clamp(320px, 35vw, 500px)",
                  height: "auto",
                  display: "block"
                }}
              />
            </h1>

            {/* Subtext */}
            <div style={{
              borderLeft: "2px solid rgba(255,255,255,0.4)",
              paddingLeft: "clamp(16px, 1.5vw, 24px)",
              marginBottom: "clamp(32px, 4vh, 48px)"
            }}>
              <p style={{
                fontSize: "clamp(13px, 1.1vw, 15px)",
                color: "#8981A6",
                lineHeight: 1.8,
                maxWidth: "clamp(350px, 32vw, 440px)",
                fontWeight: 400
              }}>
                Custom software, AI automation, and digital solutions designed to help businesses grow faster, smarter, and without enterprise-level costs.
              </p>
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "clamp(12px, 1vw, 16px)", flexWrap: "wrap" }}>
              <button
                onClick={onOpenModal}
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                  color: "#fff",
                  padding: "clamp(10px, 1vw, 12px) clamp(20px, 2vw, 28px)",
                  fontSize: "clamp(10px, 0.8vw, 12px)",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  border: "none",
                  boxShadow: "0 8px 24px rgba(139,92,246,0.35)"
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(139,92,246,0.5)"; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(139,92,246,0.35)"; }}
              >
                START PROJECT <ArrowRight size={16} />
              </button>
              <a
                href="#solutions"
                style={{
                  backgroundColor: "transparent",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.15)",
                  padding: "clamp(10px, 1vw, 12px) clamp(20px, 2vw, 28px)",
                  fontSize: "clamp(10px, 0.8vw, 12px)",
                  fontWeight: 600,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  borderRadius: "4px",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)" }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)" }}
              >
                View Services <ArrowRight size={16} />
              </a>
            </div>

          </div>
        </div>
      </section>

      <div className="hero-cards-wrapper">
        <GlowingCard delay={0.1}>
          <div className="hc-icon"><Code2 size={28} strokeWidth={1.5} /></div>
          <h4 className="hc-title">Web App Dev</h4>
          <p className="hc-desc">Custom-built, scalable web applications</p>
        </GlowingCard>
        <GlowingCard delay={0.2}>
          <div className="hc-icon"><Zap size={28} strokeWidth={1.5} /></div>
          <h4 className="hc-title">Automation</h4>
          <p className="hc-desc">Streamline workflows and cut manual work</p>
        </GlowingCard>
        <GlowingCard active delay={0.3}>
          <div className="hc-icon"><Layers size={28} strokeWidth={1.5} /></div>
          <h4 className="hc-title">IT Consultation</h4>
          <p className="hc-desc">Strategic guidance for your tech stack</p>
        </GlowingCard>
        <GlowingCard delay={0.4}>
          <div className="hc-icon"><BarChart3 size={28} strokeWidth={1.5} /></div>
          <h4 className="hc-title">CRM CMS</h4>
          <p className="hc-desc">Manage customers and content in one place</p>
        </GlowingCard>
        <GlowingCard delay={0.5}>
          <div className="hc-icon"><Search size={28} strokeWidth={1.5} /></div>
          <h4 className="hc-title">UI UX Branding</h4>
          <p className="hc-desc">Interfaces that look sharp and convert</p>
        </GlowingCard>
      </div>

      <div style={{ position: "relative", backgroundColor: "#0d0d11", overflow: "hidden" }}>
        {/* Shared Light Pillar Background */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.8, pointerEvents: 'none' }}>
          <WebGLVisibilityWrapper isAbsolute={false}>
            <LightPillar
              topColor="#5227FF"
              bottomColor="#FF9FFC"
              intensity={1}
              rotationSpeed={0.3}
              glowAmount={0.002}
              pillarWidth={3}
              pillarHeight={0.4}
              noiseIntensity={0.5}
              pillarRotation={25}
              interactive={false}
              mixBlendMode="screen"
              quality="high"
            />
          </WebGLVisibilityWrapper>
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <AgencySection onOpenModal={onOpenModal} />

          {/* Feature Icon Bar */}
          <section className="feat-bar vx-float">
            <div className="wrap">
              <div className="feat-bar-grid">
                <div className="feat-stat reveal in">
                  <AnimatedCounter end={50} suffix="+" />
                  <div className="fs-label">Projects Delivered</div>
                </div>
                <div className="feat-stat reveal in">
                  <AnimatedCounter end={50} suffix="+" />
                  <div className="fs-label">Happy Clients</div>
                </div>
                <div className="feat-stat reveal in">
                  <AnimatedCounter end={99.9} decimals={1} suffix="%" />
                  <div className="fs-label">Uptime Guaranteed</div>
                </div>
                <div className="feat-stat reveal in">
                  <AnimatedCounter end={24} suffix="/7" />
                  <div className="fs-label">Support Available</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Solutions */}
      <section id="solutions" className="scroll-mt-32 light-sec vx-float" style={{ paddingBottom: "clamp(40px, 6vh, 80px)", paddingTop: "0px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "-10%", width: "40%", height: "60%", background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, rgba(0,0,0,0) 70%)", filter: "blur(60px)", pointerEvents: "none" }}></div>
        <div className="wrap">
          <div className="sol-split reveal in" style={{ display: "flex", alignItems: "center", gap: "clamp(40px, 5vw, 60px)", flexWrap: "wrap" }}>
            <div className="sol-text-modern" style={{ flex: "1 1 400px", maxWidth: "520px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px", background: "rgba(139, 92, 246, 0.1)", borderRadius: "999px", border: "1px solid rgba(139, 92, 246, 0.2)", marginBottom: "16px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#a78bfa", boxShadow: "0 0 8px #a78bfa" }}></div>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#a78bfa", letterSpacing: "1px", textTransform: "uppercase" }}>Why Choose Us</span>
              </div>
              <h2 style={{ fontSize: "clamp(26px, 3.2vw, 38px)", fontWeight: 800, lineHeight: 1.15, color: "#fff", marginBottom: "16px", letterSpacing: "-0.5px" }}>
                Powerful IT Solutions for <span style={{ background: "linear-gradient(90deg, #7c3aed, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Modern Businesses</span>
              </h2>
              <p style={{ fontSize: "15.5px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, marginBottom: "24px" }}>
                We combine cutting-edge technology with affordable pricing to deliver enterprise-grade solutions that scale with your ambitions. No hidden fees, no jargon — just results.
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: "12px", listStyle: "none", padding: 0 }}>
                {[
                  "Custom software tailored to your workflow",
                  "Scalable cloud infrastructure",
                  "End-to-end automation & integration",
                  "Transparent, budget-friendly pricing"
                ].map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "14.5px", color: "#fff", fontWeight: 500 }}>
                    <div style={{ width: "26px", height: "26px", borderRadius: "8px", background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(139, 92, 246, 0.05))", border: "1px solid rgba(139, 92, 246, 0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#a78bfa", boxShadow: "0 4px 12px rgba(139, 92, 246, 0.1)", flexShrink: 0 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="sol-img-modern" style={{ flex: "1 1 450px", perspective: "1200px" }}>
              <div
                style={{
                  position: "relative",
                  borderRadius: "24px",
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(0, 0, 0, 0))",
                  padding: "16px",
                  border: "1px solid rgba(139, 92, 246, 0.3)",
                  boxShadow: "0 30px 60px rgba(0,0,0,0.5), 0 0 40px rgba(139, 92, 246, 0.15)",
                  transform: "rotateY(-8deg) rotateX(4deg)",
                  transition: "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  cursor: "pointer",
                  backdropFilter: "blur(10px)"
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = "rotateY(0deg) rotateX(0deg) scale(1.02)"; e.currentTarget.style.boxShadow = "0 40px 80px rgba(0,0,0,0.6), 0 0 80px rgba(139, 92, 246, 0.3)"; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = "rotateY(-8deg) rotateX(4deg)"; e.currentTarget.style.boxShadow = "0 30px 60px rgba(0,0,0,0.5), 0 0 40px rgba(139, 92, 246, 0.15)"; }}
              >
                <div style={{ position: "absolute", top: "-30px", left: "-30px", width: "150px", height: "150px", background: "#8b5cf6", filter: "blur(60px)", opacity: 0.5, zIndex: -1 }}></div>
                <div style={{ position: "absolute", bottom: "-30px", right: "-30px", width: "200px", height: "200px", background: "#a78bfa", filter: "blur(80px)", opacity: 0.3, zIndex: -1 }}></div>
                <img src="/tpl-saas-software.jpg" alt="IT Solutions" style={{ width: "100%", display: "block", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-32 vx-float" style={{ background: "var(--bg-deep)", padding: "100px 0", position: "relative", overflow: "hidden" }}>
        {/* Magic Rings Background */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "100vw", height: "100vw", minWidth: "1000px", minHeight: "1000px", opacity: 0.4 }}>
            <WebGLVisibilityWrapper isAbsolute={false}>
              <MagicRings
                color="#A855F7"
                colorTwo="#6366F1"
                ringCount={6}
                speed={1}
                attenuation={10}
                lineThickness={2}
                baseRadius={0.35}
                radiusStep={0.1}
                scaleRate={0.1}
                opacity={1}
                blur={0}
                noiseAmount={0.1}
                rotation={0}
                ringGap={1.5}
                fadeIn={0.7}
                fadeOut={0.5}
                followMouse={false}
                mouseInfluence={0.2}
                hoverScale={1.2}
                parallax={0.05}
                clickBurst={false}
              />
            </WebGLVisibilityWrapper>
          </div>
        </div>

        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <div className="section-head reveal in" style={{ margin: "0 auto 80px", textAlign: "center" }}>
            <span className="eyebrow" style={{ margin: "0 0 16px 0" }}>Our Process</span>
            <h2 style={{ textAlign: "center" }}>How Professional IT Services<br />Can Drive <span style={{ background: "linear-gradient(90deg,#7c3aed,#a78bfa)", WebkitBackgroundClip: "text", color: "transparent" }}>Success</span></h2>
            <p style={{ margin: "0 auto", maxWidth: "600px" }}>From initial consultation to ongoing optimization, our streamlined process ensures every project delivers measurable business value.</p>
          </div>

          <AnimatedProcessWorkflow />
        </div>
      </section>

      {/* Recent Projects */}
      <section id="recent-projects" className="scroll-mt-32 vx-float" style={{ padding: "80px 0 60px", position: "relative", zIndex: 10 }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, background: 'var(--bg-void)' }}>
          <WebGLVisibilityWrapper isAbsolute={false}>
            <LiquidEther
              colors={['#5227FF', '#FF9FFC', '#B497CF']}
              mouseForce={20}
              cursorSize={100}
              isViscous
              viscous={10}
              iterationsViscous={4}
              iterationsPoisson={4}
              resolution={0.25}
              isBounce={false}
              autoDemo
              autoSpeed={0.5}
              autoIntensity={2.2}
              takeoverDuration={0.25}
              autoResumeDelay={3000}
              autoRampDuration={0.6}
            />
          </WebGLVisibilityWrapper>
        </div>
        <div className="wrap" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "80px", position: "relative" }}>
            {/* Subtle glow behind the text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[100px] bg-purple-600/30 blur-[80px] rounded-full pointer-events-none" />

            <div className="section-head reveal in" style={{ margin: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden mb-8 transition-all duration-300 hover:bg-white/10 hover:border-purple-500/30">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Layers className="w-4 h-4 text-purple-400 group-hover:text-purple-300 transition-colors" />
                <span className="text-xs font-bold text-white tracking-[0.15em] uppercase">Our Portfolio</span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight leading-[1.15]">
                Crafting Digital <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-purple-400 animate-gradient bg-300%">Masterpieces</span>
              </h2>

              <p className="text-[#8981A6] text-base md:text-lg max-w-2xl mx-auto leading-loose font-light mt-2">
                Explore our curated collection of next-generation digital experiences. We blend cutting-edge technology with world-class design to build scalable solutions that dominate the market.
              </p>
            </div>
          </div>

          <div style={{ height: '600px', position: 'relative' }} className="reveal in">
            <CircularGallery
              items={projects.length > 0 ? projects.map((p: any) => {
                let img = p.imageUrl || "/tpl-saas-software.jpg";
                const t = p.title.toLowerCase();
                if (t.includes('ag home')) img = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=90';
                else if (t.includes('cab partner')) img = 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1600&q=90';
                else if (t.includes('smart rent')) img = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=90';
                else if (t.includes('lionscott')) img = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=90';
                return { image: img, text: p.title };
              }) : undefined}
              bend={0.6}
              textColor="#ffffff"
              borderRadius={0.05}
              scrollEase={0.02}
              fontUrl="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap"
              font="bold 30px Orbitron"
              scrollSpeed={1}
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="scroll-mt-32 light-sec vx-float" style={{ padding: "100px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, opacity: 1 }}>
          <WebGLVisibilityWrapper isAbsolute={false}>
            <LightRays
              raysOrigin="top-center"
              raysColor="#8b5cf6"
              raysSpeed={1.5}
              lightSpread={1.2}
              rayLength={3.5}
              followMouse={true}
              mouseInfluence={0.15}
              noiseAmount={0.03}
              distortion={0}
              pulsating={true}
              fadeDistance={1}
              saturation={1}
            />
          </WebGLVisibilityWrapper>
        </div>
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <div className="section-head reveal in">
            <span className="eyebrow">Partnership Models</span>
            <h2>Service Packages</h2>
            <p>Flexible engagement models designed to scale with your business needs and digital ambitions.</p>
          </div>
          <div className="scroll-shell">
            <div className="cmp-scroll reveal in">
              <table className="cmp-table">
                <thead>
                  <tr>
                    <th><span className="cmp-cat">Services & Features</span></th>
                    <th>Digital Presence</th>
                    <th>Custom Application</th>
                    <th>Enterprise Solutions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Custom UI/UX Design", ent: true, pro: true, basic: true },
                    { label: "Full-Stack Web Development", ent: true, pro: true, basic: true },
                    { label: "Responsive Mobile Optimization", ent: true, pro: true, basic: true },
                    { label: "API & Third-Party Integrations", ent: true, pro: true, basic: false },
                    { label: "Native Mobile App Development", ent: true, pro: true, basic: false },
                    { label: "Advanced Performance Tuning", ent: true, pro: false, basic: false },
                    { label: "Dedicated Project Manager", ent: true, pro: false, basic: false },
                    { label: "Ongoing Post-Launch Maintenance", ent: true, pro: false, basic: false },
                  ].map((row, i) => (
                    <tr key={i}>
                      <th scope="row">{row.label}</th>
                      <td>{row.basic ? <span className="cmp-check"><CheckCircle size={19} /></span> : <span className="cmp-x"><X size={18} /></span>}</td>
                      <td>{row.pro ? <span className="cmp-check"><CheckCircle size={19} /></span> : <span className="cmp-x"><X size={18} /></span>}</td>
                      <td>{row.ent ? <span className="cmp-check"><CheckCircle size={19} /></span> : <span className="cmp-x"><X size={18} /></span>}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td></td>
                    <td style={{ padding: "20px 10px", textAlign: "center" }}>
                      <WebGLVisibilityWrapper isAbsolute={false}>
                        <SpecularButton size="sm" radius={10} tint="#ffffff" tintOpacity={0} blur={0} textColor="#f5f5f5" lineColor="#8b5cf6" baseColor="#201a30" intensity={1} shineSize={10} shineFade={40} thickness={1.5} speed={0.35} followMouse proximity={250} onClick={onOpenModal}>
                          Get Started
                        </SpecularButton>
                      </WebGLVisibilityWrapper>
                    </td>
                    <td style={{ padding: "20px 10px", textAlign: "center" }}>
                      <WebGLVisibilityWrapper isAbsolute={false}>
                        <SpecularButton size="sm" radius={10} tint="#ffffff" tintOpacity={0} blur={0} textColor="#f5f5f5" lineColor="#8b5cf6" baseColor="#3b2b5c" intensity={1} shineSize={10} shineFade={40} thickness={1.5} speed={0.35} followMouse proximity={250} onClick={onOpenModal}>
                          Get Started
                        </SpecularButton>
                      </WebGLVisibilityWrapper>
                    </td>
                    <td style={{ padding: "20px 10px", textAlign: "center" }}>
                      <WebGLVisibilityWrapper isAbsolute={false}>
                        <SpecularButton size="sm" radius={10} tint="#ffffff" tintOpacity={0} blur={0} textColor="#f5f5f5" lineColor="#8b5cf6" baseColor="#3b2b5c" intensity={1} shineSize={10} shineFade={40} thickness={1.5} speed={0.35} followMouse proximity={250} onClick={onOpenModal}>
                          Contact Sales
                        </SpecularButton>
                      </WebGLVisibilityWrapper>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section id="industries" className="scroll-mt-32 light-sec vx-float" style={{ padding: "100px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, opacity: 0.5 }}>
          <WebGLVisibilityWrapper isAbsolute={false}>
            <SideRays
              speed={2}
              rayColor1="#a78bfa"
              rayColor2="#7c3aed"
              intensity={1.2}
              spread={2}
              origin="top-right"
              tilt={-10}
              saturation={1.5}
              blend={0.75}
              falloff={1.6}
              opacity={1}
            />
          </WebGLVisibilityWrapper>
        </div>
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <div className="section-head reveal in">
            <span className="eyebrow">Industries</span>
            <h2>Industries We Serve</h2>
            <p>Our custom IT solutions empower forward-thinking organizations to <span className="text-white font-medium">innovate</span>, <span className="text-purple-300 font-medium">scale seamlessly</span>, and dominate in today's rapidly evolving digital landscape.</p>
          </div>
          <div className="ind-grid">
            <BorderGlow className="ind-card reveal in" borderRadius={20} animated={false} colors={['#c084fc', '#f472b6', '#38bdf8']}>
              <div className="ind-img-wrap"><img src="/tech-saas-cover.png" alt="Technology & SaaS" /></div>
              <div className="ind-label">Technology & SaaS</div>
              <div className="ind-desc">Scalable platforms built for rapid growth</div>
              <div className="ind-meta">
                <span className="text-sm font-semibold text-[#a78bfa] tracking-wide hover:text-white transition-colors duration-300" style={{ cursor: 'pointer' }}>Explore Solutions <ArrowRight size={14} className="inline-block ml-1" /></span>
              </div>
            </BorderGlow>
            <BorderGlow className="ind-card reveal in delay-[100ms]" borderRadius={20} animated={false} colors={['#c084fc', '#f472b6', '#38bdf8']}>
              <div className="ind-img-wrap"><img src="/finance-banking-cover.png" alt="Finance & Banking" /></div>
              <div className="ind-label">Finance & Banking</div>
              <div className="ind-desc">Secure systems for regulated industries</div>
              <div className="ind-meta">
                <span className="text-sm font-semibold text-[#a78bfa] tracking-wide hover:text-white transition-colors duration-300" style={{ cursor: 'pointer' }}>Explore Solutions <ArrowRight size={14} className="inline-block ml-1" /></span>
              </div>
            </BorderGlow>
            <BorderGlow className="ind-card reveal in delay-[200ms]" borderRadius={20} animated={false} colors={['#c084fc', '#f472b6', '#38bdf8']}>
              <div className="ind-img-wrap"><img src="/healthcare-cover.png" alt="Healthcare" /></div>
              <div className="ind-label">Healthcare</div>
              <div className="ind-desc">Compliant, patient-first digital tools</div>
              <div className="ind-meta">
                <span className="text-sm font-semibold text-[#a78bfa] tracking-wide hover:text-white transition-colors duration-300" style={{ cursor: 'pointer' }}>Explore Solutions <ArrowRight size={14} className="inline-block ml-1" /></span>
              </div>
            </BorderGlow>
            <BorderGlow className="ind-card reveal in" borderRadius={20} animated={false} colors={['#c084fc', '#f472b6', '#38bdf8']}>
              <div className="ind-img-wrap"><img src="/shopix-ecommerce.png" alt="Retail & E-commerce Dashboard" /></div>
              <div className="ind-label">Retail & E-commerce</div>
              <div className="ind-desc">Storefronts that convert and scale</div>
              <div className="ind-meta">
                <span className="text-sm font-semibold text-[#a78bfa] tracking-wide hover:text-white transition-colors duration-300" style={{ cursor: 'pointer' }}>Explore Solutions <ArrowRight size={14} className="inline-block ml-1" /></span>
              </div>
            </BorderGlow>
            <BorderGlow className="ind-card reveal in delay-[100ms]" borderRadius={20} animated={false} colors={['#c084fc', '#f472b6', '#38bdf8']}>
              <div className="ind-img-wrap"><img src="/education-cover.png" alt="Education" /></div>
              <div className="ind-label">Education</div>
              <div className="ind-desc">Learning platforms built to engage</div>
              <div className="ind-meta">
                <span className="text-sm font-semibold text-[#a78bfa] tracking-wide hover:text-white transition-colors duration-300" style={{ cursor: 'pointer' }}>Explore Solutions <ArrowRight size={14} className="inline-block ml-1" /></span>
              </div>
            </BorderGlow>
            <BorderGlow className="ind-card reveal in delay-[200ms]" borderRadius={20} animated={false} colors={['#c084fc', '#f472b6', '#38bdf8']}>
              <div className="ind-img-wrap"><img src="/manufacturing-cover.png" alt="Manufacturing" /></div>
              <div className="ind-label">Manufacturing</div>
              <div className="ind-desc">Automation for modern production lines</div>
              <div className="ind-meta">
                <span className="text-sm font-semibold text-[#a78bfa] tracking-wide hover:text-white transition-colors duration-300" style={{ cursor: 'pointer' }}>Explore Solutions <ArrowRight size={14} className="inline-block ml-1" /></span>
              </div>
            </BorderGlow>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="scroll-mt-32 testimonials-section vx-float relative z-10 py-24 overflow-hidden" style={{ background: "var(--bg-void)" }}>
        {/* Animated glowing orb in background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-600/20 blur-[120px] rounded-[100%] pointer-events-none mix-blend-screen" />

        <div className="wrap relative w-full z-10 mx-auto px-4 md:px-6 lg:px-8">
          <div className="section-head reveal in relative z-10 mb-20 flex flex-col items-center text-center w-full mx-auto">
            <span className="eyebrow" style={{ margin: '0 auto 16px', display: 'inline-block' }}>What Our Clients Say</span>
            <h2 style={{ margin: '0 auto 20px', textAlign: 'center' }}>Trusted by businesses across India</h2>
            <p style={{ margin: '0 auto', textAlign: 'center', maxWidth: '600px' }}>
              Delivering high-quality software, websites, CRM solutions, mobile applications, and AI automation.
            </p>
          </div>
          <div className="testimonials-marquee-container" style={{ padding: '1rem 0' }}>
            <div className="testimonials-marquee-track hover:pause flex w-max gap-16">
              {[...Array(2)].map((_, trackIndex) => (
                <div key={trackIndex} className="flex gap-16">
                  {[
                    {
                      name: "Ms. Ananya Gupta",
                      title: "CTO, Zenith Solutions",
                      initials: "AG",
                      content: "Devoxa Technologies rebuilt our entire cloud infrastructure in weeks, not months. Our uptime hasn't dropped once since launch."
                    },
                    {
                      name: "Mr. Pramesh Kumar",
                      title: "Founder, AG Homes India",
                      initials: "PK",
                      content: "Devoxa Technologies gave our outdated website a stunning modern redesign packed with powerful new features."
                    },
                    {
                      name: "Mr. Rajesh Sharma",
                      title: "Operations Head, TechVeda",
                      initials: "RS",
                      content: "Transparent pricing, clear communication, and a team that actually understood our industry. Highly recommend."
                    },
                    {
                      name: "Ms. Kavita Desai",
                      title: "Marketing Director, NovaReach",
                      initials: "KD",
                      content: "Their expertise in custom CRM solutions revolutionized how we manage client relationships. The dashboard is intuitive and incredibly fast."
                    },
                    {
                      name: "Mr. Suresh Patel",
                      title: "CEO, BuildCore Infra",
                      initials: "SP",
                      content: "From concept to deployment, the team delivered beyond our expectations. The new mobile app has boosted our customer engagement by 40%."
                    }
                  ].map((t, i) => (
                    <div key={i} className="w-[85vw] md:w-[378px] shrink-0">
                      <SpotlightCard className="group relative w-full h-full rounded-[24px] bg-[#0A0A0B] border border-[rgba(255,255,255,0.08)] shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_30px_rgba(79,70,229,0.2)] hover:-translate-y-1.5 transition-all duration-300 ease-out flex flex-col" spotlightColor="rgba(79, 70, 229, 0.15)">

                        <div className="absolute top-4 -left-6 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] rounded-r-[16px] rounded-tl-[16px] rounded-bl-none px-8 z-20 shadow-lg min-w-[260px] flex flex-col justify-center items-center text-center" style={{ paddingTop: '1.25rem', paddingBottom: '1.25rem' }}>
                          <div className="absolute top-full left-0 w-0 h-0" style={{ borderTop: '24px solid #1E1B4B', borderLeft: '24px solid transparent' }}></div>
                          <h3 className="text-white font-semibold text-[17px] leading-tight mb-0.5 whitespace-nowrap relative z-10">{t.name}</h3>
                          <p className="text-white/90 text-[14px] font-medium whitespace-nowrap relative z-10">{t.title}</p>
                        </div>

                        <div className="absolute -top-5 -right-3 w-[104px] h-[104px] rounded-full border-[3px] border-[#0A0A0B] shadow-[0_4px_12px_rgba(0,0,0,0.5)] overflow-hidden z-20 bg-[#0A0A0B] group-hover:scale-105 transition-transform duration-300">
                          <div className="w-full h-full bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center">
                            <span className="text-white font-bold text-3xl tracking-tight">{t.initials}</span>
                          </div>
                        </div>

                        <div className="flex flex-col h-full relative z-0" style={{ padding: '32px', paddingTop: '110px' }}>
                          <div className="flex gap-1 mb-5" style={{ paddingLeft: '32px' }}>
                            {[1, 2, 3, 4, 5].map(starI => (
                              <svg key={starI} className="w-4 h-4 text-[#FBBF24]" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>

                          <div className="relative">
                            <div className="absolute left-0 top-1 bottom-1 w-[3px] bg-gradient-to-b from-[#4F46E5] to-[#7C3AED] rounded-full shadow-[0_0_8px_rgba(79,70,229,0.3)]"></div>
                            <p className="text-[#8981A6] text-[16px] leading-[1.8] font-sans" style={{ paddingLeft: '32px' }}>
                              "{t.content}"
                            </p>
                          </div>
                        </div>

                      </SpotlightCard>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ styled with new theme */}
      <section id="faq" className="scroll-mt-32 vx-float" style={{ background: "var(--bg-void)", paddingTop: "40px", paddingBottom: "100px" }}>
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5 relative">
              {/* Dot Image Watermark Effect */}
              <div
                className="absolute -top-12 -left-12 w-[350px] h-[350px] pointer-events-none opacity-80 z-0"
                style={{
                  backgroundImage: 'radial-gradient(rgba(139, 92, 246, 0.6) 2px, transparent 2px)',
                  backgroundSize: '24px 24px',
                  maskImage: 'radial-gradient(circle at 20% 20%, black, transparent 60%)',
                  WebkitMaskImage: 'radial-gradient(circle at 20% 20%, black, transparent 60%)'
                }}
              />
              <div className="sticky top-32 relative z-10 pl-2">
                <span className="eyebrow inline-block" style={{ margin: "0 0 24px 0" }}>Questions</span>
                <h2 className="text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.05] drop-shadow-lg">
                  <ShinyText text="Common" color="#ffffff" shineColor="#8b5cf6" speed={3} /> <br />
                  <ShinyText text="Questions" color="#ffffff" shineColor="#8b5cf6" speed={3} />
                </h2>
                <p className="mt-6 text-[#8981A6] font-light max-w-xs text-lg leading-relaxed">
                  Everything you need to know about our approach, timelines, and how we deliver exceptional results.
                </p>
              </div>
            </div>
            <div className="lg:col-span-7">
              <FAQAccordion />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section id="cta-banner" className="scroll-mt-32 relative py-32 overflow-hidden border-y border-[rgba(255,255,255,0.05)] bg-[#050506]">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <Particles className="" particleCount={100} particleColors={['#ffffff', '#8b5cf6']} />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-full blur-[120px] pointer-events-none z-0"></div>

        <div className="wrap relative z-10">
          <div className="max-w-5xl mx-auto flex flex-col items-center text-center" style={{ gap: '2.5rem' }}>
            <span className="text-[#a78bfa] font-mono text-sm md:text-base uppercase tracking-[0.25em] block font-semibold drop-shadow-[0_0_8px_rgba(167,139,250,0.5)]" style={{ margin: 0 }}>Ready to start?</span>

            <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tighter text-white leading-[1.1]" style={{ margin: 0 }}>
              <TextType
                text={[
                  "Ready to Transform Your Business?",
                  "Ready to Scale Your Startup?",
                  "Ready to Elevate Your Brand?"
                ]}
                typingSpeed={50}
                pauseDuration={3000}
                deletingSpeed={30}
                showCursor
                cursorCharacter="_"
                className="inline-block"
                variableSpeed={false}
                onSentenceComplete={() => { }}
              />
            </h2>

            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light" style={{ margin: 0 }}>
              Join hundreds of forward-thinking companies that have accelerated their growth with our professional IT services. Let's build something extraordinary together.
            </p>

            <button className="nx-cta" onClick={onOpenModal} style={{ margin: 0 }}>
              Schedule a Free Consultation
            </button>
          </div>
        </div>
      </section>

      <Footer style={{ paddingTop: '0px' }} middleSectionStyle={{ paddingTop: '50px', paddingBottom: '30px' }} />
    </>
  )
}
