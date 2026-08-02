"use client"

import { useEffect, useState, useRef, useLayoutEffect } from "react"
import { useAuth } from "@/context/auth-context"
import { toast } from "sonner"
import Image from "next/image"
import Link from "next/link"
import { Search, BarChart3, Layers, Code2, Zap, ArrowRight, ArrowLeft, Quote, CheckCircle, X, Youtube, Twitter, Instagram, Linkedin, Phone, ChevronUp, ChevronDown } from "lucide-react"
import FAQAccordion from '@/components/FAQAccordion';
import ShinyText from '@/components/ShinyText';
import LiquidEther from '@/components/LiquidEther';
import LightPillar from '@/components/LightPillar';
import WebGLVisibilityWrapper from '@/components/WebGLVisibilityWrapper';
import MagicRings from '@/components/MagicRings';
import DarkVeil from '@/components/DarkVeil';
import LightRays from '@/components/LightRays';
import Particles from '@/components/Particles';

import LineWaves from "@/components/LineWaves"
import ConsultationModal from "@/components/ConsultationModal"
import SciFiServiceModal, { ServiceDetails } from "@/components/SciFiServiceModal"
import AgencySection from "@/components/AgencySection"
import CircularGallery from "@/components/CircularGallery"
import SpotlightCard from "@/components/SpotlightCard"
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

const GlowingCard = ({ children, active, delay, onClick }: { children: React.ReactNode, active?: boolean, delay: number, onClick?: (e: React.MouseEvent<HTMLDivElement>) => void }) => {
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
      onClick={onClick}
      className={`hero-card ${active ? 'active' : ''} ${onClick ? 'cursor-pointer' : ''}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 rounded-[12px]"
        style={{
          opacity,
          background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, rgba(139,47,209,0.15), transparent 40%)`,
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-[clamp(10px,1.5vw,15px)] w-full h-full">
        {children}
      </div>
    </div>
  );
};

const servicesData: Record<string, ServiceDetails> = {
  "Web App Dev": {
    id: "web-app-dev",
    title: "Web App Dev",
    description: "Custom-built, highly scalable web applications designed to meet your specific business requirements and handle high traffic volumes.",
    features: [
      "Next.js & React Frontend Architecture",
      "Scalable Node.js / Go Backend",
      "Cloud-native deployment (AWS/GCP)",
      "High Performance & SEO\nOptimized"
    ]
  },
  "Automation": {
    id: "automation",
    title: "Automation",
    description: "Streamline your workflows and eliminate repetitive manual tasks with custom automation scripts and AI-driven processes.",
    features: [
      "Custom Workflow Scripts",
      "API Integration & Webhooks",
      "AI-driven Task Automation",
      "Data Syncing & Reporting"
    ]
  },
  "IT Consultation": {
    id: "it-consultation",
    title: "IT Consultation",
    description: "Expert strategic guidance to modernize your technology stack, improve security, and reduce operational costs.",
    features: [
      "Tech Stack Auditing & Modernization",
      "Cloud Migration Strategy",
      "Security & Compliance Reviews",
      "Cost Optimization"
    ]
  },
  "CRM CMS": {
    id: "crm-cms",
    title: "CRM CMS",
    description: "Manage all your customer data, marketing pipelines, and content seamlessly in one unified platform.",
    features: [
      "Custom CRM Development",
      "Headless CMS Integration",
      "Lead Tracking & Pipelines",
      "Automated Marketing Flows"
    ]
  },
  "UI UX Branding": {
    id: "ui-ux-branding",
    title: "UI UX Branding",
    description: "Crafting beautiful, intuitive interfaces that enhance user experience, build brand trust, and drive conversions.",
    features: [
      "User Research & Wireframing",
      "High-Fidelity Prototyping",
      "Brand Identity & Guidelines",
      "Conversion Rate Optimization"
    ]

  }
};

function FloatingScrollButtonDesktop() {
  const [isScrolledDown, setIsScrolledDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector("#hero");
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        if (rect.bottom < window.innerHeight / 2) {
          setIsScrolledDown(true);
        } else {
          setIsScrolledDown(false);
        }
      } else {
        setIsScrolledDown(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    if (isScrolledDown) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const footerEl = document.querySelector("#footer");
      if (footerEl) {
        footerEl.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isScrolledDown ? "Scroll to top" : "Scroll to footer"}
      className="fixed bottom-10 right-8 z-40 w-12 h-12 rounded-full bg-theme-700 p-[1.5px] shadow-[0_0_25px_rgba(147,51,234,0.65)] hover:shadow-[0_0_35px_rgba(168,85,247,0.85)] active:scale-90 transition-all duration-300 flex items-center justify-center cursor-pointer"
    >
      <div className="w-full h-full rounded-full bg-[#080514] flex items-center justify-center transition-colors hover:bg-purple-950/60">
        {isScrolledDown ? (
          <ChevronUp className="w-5 h-5 text-theme-50 animate-bounce" />
        ) : (
          <ChevronDown className="w-5 h-5 text-theme-50 animate-bounce" />
        )}
      </div>
    </button>
  );
}

export default function HomePageDesktop() {
  const { user, role, loading, logout } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [showWhatsApp, setShowWhatsApp] = useState(false)
  const [projects, setProjects] = useState<any[]>([])

  // Fetch projects for the Work section
  useEffect(() => {
    fetch("/api/projects")
      .then(r => r.json())
      .then(d => {
        if (d.projects) {
          setProjects(d.projects);
          setTimeout(() => {
            const savedScroll = sessionStorage.getItem("homeScroll");
            if (savedScroll) {
              window.scrollTo({ top: parseInt(savedScroll, 10), behavior: "instant" });
            }
          }, 100);
        }
      })
      .catch(() => { })
  }, [])

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false)



  // Scroll listener for nav blur and WhatsApp button
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      // Show WhatsApp button when scrolled past 60% of viewport height (past hero section)
      setShowWhatsApp(window.scrollY > window.innerHeight * 0.6)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    // Check initial state in case page is reloaded scrolled down
    onScroll()
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

    // Capture-phase click listener to save scroll before Next.js client-side routing
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link && link.href) {
        try {
          const url = new URL(link.href);
          if (url.origin === window.location.origin && url.pathname !== window.location.pathname) {
            sessionStorage.setItem("homeScroll", window.scrollY.toString());
          }
        } catch (err) { }
      }
    };
    document.addEventListener("click", handleGlobalClick, true);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
      document.removeEventListener("click", handleGlobalClick, true);
    }
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
    <main className="bg-transparent text-foreground font-sans selection:bg-theme-900 selection:text-[#f1eef1] overflow-x-hidden">
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

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes floatingWA {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-12px) scale(1.05); }
        }
        .whatsapp-float-btn {
          animation: floatingWA 3s ease-in-out infinite;
        }
        .whatsapp-float-btn:hover {
          animation: none;
          transform: scale(1.1);
        }
      `}} />

      {/* WhatsApp Floating Button - Desktop Only */}
      <a
        href="https://wa.me/918544005858?text=Hello!%20I%20want%20to%20inquire%20about%20your%20services."
        target="_blank"
        rel="noopener noreferrer"
        className={`hidden md:flex fixed bottom-6 left-6 z-50 bg-[#25D366] hover:bg-[#1ebd57] text-theme-50 p-3 rounded-full shadow-lg shadow-[#25d366]/40 transition-all duration-700 ease-in-out items-center justify-center cursor-pointer whatsapp-float-btn ${showWhatsApp ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-12 invisible'
          }`}
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>
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
      <div className="font-serif text-2xl font-medium tracking-tight italic flex items-center gap-4 text-[#f1eef1] flex-1">
        <Link href="#">
          <div style={{ width: '36px', height: '36px', backgroundcolor: "#f1eef1", borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
            <img src="/logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(1.2)' }} />
          </div>
        </Link>
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
          hoveredPilltextColor="#f1eef1"
          pillTextColor="#9ca3af"
          initialLoadAnimation={false}
        />
      </div>

      {/* 3rd Part: Auth & CTA */}
      <div className="flex flex-col md:flex-row items-center justify-end gap-6 flex-1">
        {!loading && user ? (
          <>
            <Link href={`/dashboard/${role}`} className="label-mono uppercase tracking-widest text-neutral-300 hover:text-[#f1eef1] transition-colors">
              Dashboard
            </Link>
            <button onClick={logout} className="label-mono text-neutral-500 hover:text-[#f1eef1] transition-colors">
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="label-mono text-neutral-300 hover:text-[#f1eef1] transition-colors">
            Login
          </Link>
        )}
        <a className="border border-theme-50/30 px-6 py-2 text-[10px] font-mono uppercase tracking-widest text-[#f1eef1] hover:bg-theme-50 hover:text-theme-900 transition-all hidden md:block" href="#cta-banner">
          Book a call —
        </a>
      </div>
    </nav>
  )
}

function MobileNav({ user, role, loading, logout, scrolled }: any) {
  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0A0714]/90 backdrop-blur-md border-b border-[#705474]/15 shadow-sm' : 'bg-transparent backdrop-blur-sm border-b border-[#705474]/15'} px-6 py-4 flex justify-between items-center`}>
      <div className="font-serif text-xl font-medium tracking-tight italic flex items-center gap-3 text-[#f1eef1]">
        <div style={{ width: '32px', height: '32px', backgroundcolor: "#f1eef1", borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
          <img src="/logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(1.2)' }} />
        </div>
        <Link href="#">Devoxa</Link>
      </div>
      <div className="flex items-center gap-5">
        {!loading && user ? (
          <Link href={`/dashboard/${role}`} className="label-mono uppercase tracking-widest text-neutral-300 hover:text-[#f1eef1] transition-colors text-[10px]">
            Portal
          </Link>
        ) : (
          <Link href="/login" className="label-mono text-neutral-300 hover:text-[#f1eef1] transition-colors text-[10px]">
            Login
          </Link>
        )}
        <a className="border border-theme-50/30 px-3 py-1.5 text-[9px] font-mono uppercase tracking-widest text-[#f1eef1] hover:bg-theme-50 hover:text-theme-900 transition-all" href="#cta-banner">
          Book a call
        </a>
      </div>
    </nav>
  )
}

function MainContent({ projects, onOpenModal }: { projects: any[], onOpenModal: () => void }) {
  const [activeService, setActiveService] = useState<ServiceDetails | null>(null)
  const [activeCardRect, setActiveCardRect] = useState<DOMRect | null>(null)

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>, serviceKey: string) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    // Check if card is comfortably visible in the viewport (with 120px margin for headers/footers)
    const isVisible = rect.top >= 120 && rect.bottom <= (window.innerHeight - 120);

    if (!isVisible) {
      // Scroll smoothly so the card is centered
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Wait for the smooth scroll to finish before opening modal to ensure line coordinates are correct
      setTimeout(() => {
        setActiveCardRect(card.getBoundingClientRect());
        setActiveService(servicesData[serviceKey]);
      }, 450);
    } else {
      setActiveCardRect(rect);
      setActiveService(servicesData[serviceKey]);
    }
  };

  return (
    <>      <section id="hero" className="nx vx-float pt-24 md:pt-32">
      <div className="absolute inset-0 z-0 bg-black/[0.65]" />
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, opacity: 1, pointerEvents: 'none' }}>
        <WebGLVisibilityWrapper isAbsolute={false}>
          <Particles
            particleColors={["#ffffff", "#c6bbc7", "#523056"]}
            particleCount={400}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={150}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        </WebGLVisibilityWrapper>
      </div>
      <div className="nx-inner" style={{ minHeight: "max(100vh, 750px)", alignItems: "flex-start", display: "flex", flexDirection: "column", justifyContent: "flex-start", paddingLeft: "clamp(50px, 12vw, 150px)", paddingTop: "clamp(160px, 20vh, 220px)", paddingBottom: "100px" }}>
        <div style={{ width: "100%", maxWidth: "clamp(480px, 45vw, 680px)", textAlign: "left", position: "relative", zIndex: 10, marginBottom: "auto" }}>

          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: "clamp(12px, 1.5vh, 16px)", position: "relative" }}>
            <div style={{ position: "absolute", left: "-10px", top: "-5px", width: "40px", height: "30px", backgroundColor: "#523056", zIndex: -1 }}></div>
            <span style={{ fontFamily: "monospace", fontSize: "clamp(10px, 0.9vw, 12px)", fontWeight: 700, letterSpacing: "2px", color: "#f1eef1", textTransform: "uppercase" }}>
              DIGITAL FIRST
            </span>
          </div>

          {/* Headline — pure white, bold, tight */}
          <h1 style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "clamp(32px, 4.5vw, 60px)",
            fontWeight: 700,
            color: "#f1eef1",
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

          {/* Subtext — muted gray #ad9daf */}
          <div style={{
            borderLeft: "2px solid rgba(255,255,255,0.25)",
            paddingLeft: "clamp(16px, 1.5vw, 24px)",
            marginBottom: "clamp(32px, 4vh, 48px)"
          }}>
            <p style={{
              fontSize: "clamp(13px, 1.1vw, 15px)",
              color: "#ad9daf",
              lineHeight: 1.8,
              maxWidth: "clamp(350px, 32vw, 440px)",
              fontWeight: 400
            }}>
              Custom software, AI automation, and digital solutions designed to help businesses grow faster, smarter, and without enterprise-level costs.
            </p>
          </div>

          {/* Buttons: Flat white pill (primary CTA) + ghost secondary */}
          <div style={{ display: "flex", gap: "clamp(12px, 1vw, 16px)", flexWrap: "wrap" }}>
            {/* PRIMARY CTA: flat white pill with black text */}
            <button
              onClick={onOpenModal}
              style={{
                background: "#f1eef1",
                color: "#0D0D0D",
                padding: "clamp(12px, 1.1vw, 14px) clamp(24px, 2.2vw, 32px)",
                fontSize: "clamp(11px, 0.85vw, 13px)",
                fontWeight: 800,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.25s ease",
                borderRadius: "999px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                border: "none",
                boxShadow: "0 8px 32px rgba(139,47,209,0.35), 0 2px 8px rgba(0,0,0,0.25)"
              }}
              onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px) scale(1.02)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(139,47,209,0.5), 0 4px 16px rgba(0,0,0,0.3)"; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(139,47,209,0.35), 0 2px 8px rgba(0,0,0,0.25)"; }}
            >
              START PROJECT <ArrowRight size={16} />
            </button>
            {/* SECONDARY: transparent with subtle border */}
            <a
              href="#solutions"
              style={{
                backgroundColor: "transparent",
                color: "#f1eef1",
                border: "1px solid rgba(255,255,255,0.25)",
                padding: "clamp(12px, 1.1vw, 14px) clamp(24px, 2.2vw, 32px)",
                fontSize: "clamp(11px, 0.85vw, 13px)",
                fontWeight: 600,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.25s ease",
                borderRadius: "999px",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "rgba(139,47,209,0.15)"; e.currentTarget.style.borderColor = "rgba(139,47,209,0.6)"; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; }}
            >
              View Services <ArrowRight size={16} />
            </a>
          </div>

        </div>
      </div>
    </section>


      <div className="hero-cards-wrapper">
        <GlowingCard delay={0.1} onClick={(e) => handleCardClick(e, "Web App Dev")}>
          <div className="hc-icon"><Code2 size={28} strokeWidth={1.5} /></div>
          <h4 className="hc-title">Web App Dev</h4>
          <p className="hc-desc">Custom-built, scalable web applications</p>
        </GlowingCard>
        <GlowingCard delay={0.2} onClick={(e) => handleCardClick(e, "Automation")}>
          <div className="hc-icon"><Zap size={28} strokeWidth={1.5} /></div>
          <h4 className="hc-title">Automation</h4>
          <p className="hc-desc">Streamline workflows and cut manual work</p>
        </GlowingCard>
        <GlowingCard active delay={0.3} onClick={(e) => handleCardClick(e, "IT Consultation")}>
          <div className="hc-icon"><Layers size={28} strokeWidth={1.5} /></div>
          <h4 className="hc-title">IT Consultation</h4>
          <p className="hc-desc">Strategic guidance for your tech stack</p>
        </GlowingCard>
        <GlowingCard delay={0.4} onClick={(e) => handleCardClick(e, "CRM CMS")}>
          <div className="hc-icon"><BarChart3 size={28} strokeWidth={1.5} /></div>
          <h4 className="hc-title">CRM CMS</h4>
          <p className="hc-desc">Manage customers and content in one place</p>
        </GlowingCard>
        <GlowingCard delay={0.5} onClick={(e) => handleCardClick(e, "UI UX Branding")}>
          <div className="hc-icon"><Search size={28} strokeWidth={1.5} /></div>
          <h4 className="hc-title">UI UX Branding</h4>
          <p className="hc-desc">Interfaces that look sharp and convert</p>
        </GlowingCard>
      </div>

      <div className="agency-pillar-wrapper" style={{ marginBottom: "40px", position: "relative", backgroundColor: "transparent", overflow: "hidden" }}>
        {/* Shared Light Pillar Background */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 1, pointerEvents: 'none' }}>
          <WebGLVisibilityWrapper isAbsolute={false}>
            <LightPillar
              topColor="#26082a"
              bottomColor="#FF9FFC"
              intensity={0.8}
              rotationSpeed={0.5}
              glowAmount={0.002}
              pillarWidth={3.0}
              pillarHeight={0.4}
              noiseIntensity={0.1}
              pillarRotation={30}
              interactive={false}
              mixBlendMode="normal"
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
      <section id="solutions" className="scroll-mt-32 light-sec vx-float transparent-bg" style={{ paddingBottom: "clamp(40px, 6vh, 80px)", paddingTop: "0px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "-10%", width: "40%", height: "60%", background: "radial-gradient(circle, rgba(112,84,116,0.08) 0%, rgba(0,0,0,0) 70%)", filter: "blur(60px)", pointerEvents: "none" }}></div>
        <div className="wrap">
          <div className="sol-split reveal in" style={{ display: "flex", alignItems: "center", gap: "clamp(40px, 5vw, 60px)", flexWrap: "wrap" }}>
            <div className="sol-text-modern" style={{ flex: "1 1 400px", maxWidth: "520px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px", background: "rgba(112,84,116,0.1)", borderRadius: "999px", border: "1px solid rgba(112,84,116,0.2)", marginBottom: "16px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#8f7992", boxShadow: "0 0 8px #8f7992" }}></div>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#8f7992", letterSpacing: "1px", textTransform: "uppercase" }}>Why Choose Us</span>
              </div>
              <h2 style={{ fontSize: "clamp(26px, 3.2vw, 38px)", fontWeight: 800, lineHeight: 1.15, color: "#fff", marginBottom: "16px", letterSpacing: "-0.5px" }}>
                Powerful IT Solutions for <span className="font-stencilia uppercase" style={{ background: "linear-gradient(90deg, #523056, #8f7992)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Modern Businesses</span>
              </h2>

              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, marginBottom: "16px" }}>
                We combine cutting-edge technology with affordable pricing to deliver enterprise-grade solutions that scale with your ambitions. No hidden fees, no jargon — just results.
              </p>

              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, marginBottom: "32px" }}>
                From the first discovery call to post-launch support, our team stays hands-on. We write clean, maintainable code and build systems that grow with you instead of holding you back.
              </p>

              {/* Stats Row */}
              <div className="flex items-center gap-8 mb-10 py-6 border-y border-theme-50/10" style={{ marginBottom: "30px", marginTop: "10px" }}>
                <div>
                  <div className="text-3xl font-bold text-theme-50 mb-1">120+</div>
                  <div className="text-xs text-theme-50/50 uppercase tracking-widest font-semibold">Projects</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-theme-50 mb-1">98%</div>
                  <div className="text-xs text-theme-50/50 uppercase tracking-widest font-semibold">Retention</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-theme-50 mb-1">24/7</div>
                  <div className="text-xs text-theme-50/50 uppercase tracking-widest font-semibold">Support</div>
                </div>
              </div>

              {/* Bullet Points */}
              <ul style={{ display: "flex", flexDirection: "column", gap: "16px", listStyle: "none", padding: 0 }}>
                {[
                  "Custom software for your workflow",
                  "Scalable cloud infrastructure",
                  "End-to-end automation",
                  "Transparent pricing"
                ].map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "15px", color: "#fff", fontWeight: 500 }}>
                    <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "linear-gradient(135deg, #523056, #705474)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0, boxShadow: "0 4px 12px rgba(139,47,209,0.3)" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: Collage UI */}
            <div className="sol-img-modern" style={{ flex: "1 1 500px" }}>
              <div className="relative w-full h-[500px] md:h-[650px] flex items-center justify-center group">

                {/* Top Left Image - Code */}
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80"
                  alt="Code"
                  className="absolute top-0 left-0 w-[55%] h-[45%] object-cover rounded-[32px] shadow-2xl z-10 transition-transform duration-700 hover:scale-105 hover:z-40"
                />

                {/* Bottom Left Image - AI/Tech */}
                <img
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80"
                  alt="AI Tech"
                  className="absolute bottom-0 left-0 w-[55%] h-[48%] object-cover rounded-[32px] shadow-2xl z-10 transition-transform duration-700 hover:scale-105 hover:z-40"
                />

                {/* Right Image - Design Desk */}
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
                  alt="Design Process"
                  className="absolute top-[8%] right-0 w-[48%] h-[84%] object-cover rounded-[32px] shadow-2xl z-20 transition-transform duration-700 hover:scale-105 hover:z-40"
                />

                {/* Center Spinning Badge */}
                <div className="absolute z-30 flex items-center justify-center w-[160px] h-[160px] rounded-full bg-theme-50 shadow-[0_20px_40px_rgba(0,0,0,0.4)] left-[48%] top-[50%] -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 hover:scale-110">
                  <svg viewBox="0 0 100 100" className="absolute w-[140px] h-[140px] animate-[spin_15s_linear_infinite]">
                    <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                    <text className="text-[9.5px] font-bold uppercase fill-black tracking-[3px]">
                      <textPath href="#circlePath" startOffset="0%" textLength="220" lengthAdjust="spacing">
                        Devoxa Technologies — Digital Experiences
                      </textPath>
                    </text>
                  </svg>
                  {/* Center Black Circle */}
                  <div className="absolute w-[44px] h-[44px] bg-[#111] rounded-full flex items-center justify-center shadow-inner">
                    <span className="text-theme-50 font-bold text-xl tracking-tighter">D</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-32 vx-float" style={{ padding: "100px 0", position: "relative", overflow: "hidden" }}>

        <div className="absolute inset-0 z-0 bg-black/50" />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 1, pointerEvents: 'none' }}>
          <WebGLVisibilityWrapper isAbsolute={false}>
            <MagicRings
              color="#523056"
              colorTwo="#c6bbc7"
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

        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <div className="section-head reveal in" style={{ margin: "0 auto 80px", textAlign: "center" }}>
            <span className="eyebrow" style={{ margin: "0 0 16px 0" }}>Our Process</span>
            <h2 style={{ textAlign: "center" }}>How Professional IT Services<br />Can Drive <span className="font-stencilia uppercase" style={{ background: "linear-gradient(90deg,#523056,#8f7992)", WebkitBackgroundClip: "text", color: "transparent" }}>Success</span></h2>
            <p style={{ margin: "0 auto", maxWidth: "600px" }}>From initial consultation to ongoing optimization, our streamlined process ensures every project delivers measurable business value.</p>
          </div>

          <AnimatedProcessWorkflow />
        </div>
      </section>

      {/* Recent Projects */}
      <section id="recent-projects" className="scroll-mt-32 vx-float" style={{ padding: "80px 0 60px", position: "relative", zIndex: 10 }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.5, pointerEvents: 'none' }}>
          <LiquidEther
            colors={['#523056', '#705474', '#ad9daf']}
            mouseForce={20}
            cursorSize={100}
            isViscous={false}
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.5}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
          />
        </div>
        <div className="wrap" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "80px", position: "relative" }}>
            <div className="section-head reveal in" style={{ margin: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-transparent border border-[#705474]/15 backdrop-blur-md overflow-hidden mb-8 transition-all duration-300 hover:bg-theme-50/10 hover:border-[#705474]/30">
                <div className="absolute inset-0 bg-[#523056]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Layers className="w-4 h-4 text-[#705474] group-hover:text-[#705474] transition-colors" />
                <span className="text-xs font-bold text-[#f1eef1] tracking-[0.15em] uppercase">Our Portfolio</span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#f1eef1] mb-8 tracking-tight leading-[1.15]">
                Crafting Digital <br className="hidden md:block" />
                <span className="font-stencilia uppercase text-theme-400 animate-gradient bg-300%">Masterpieces</span>
              </h2>

              <p className="text-[#ad9daf] text-base md:text-lg max-w-2xl mx-auto leading-loose font-light mt-2">
                Explore our curated collection of next-generation digital experiences. We blend cutting-edge technology with world-class design to build scalable solutions that dominate the market.
              </p>
            </div>
          </div>

          <div style={{ height: '600px', position: 'relative' }} className="reveal in">
            <CircularGallery
              items={projects.length > 0 ? projects.map((p: any) => {
                let img = p.imageUrl || "/tpl-saas-software.jpg";
                const t = p.title.toLowerCase();
                if (t.includes('ag home')) img = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=90';
                else if (t.includes('cab partner')) img = 'https://images.unsplash.com/photo-1494976388531-d1058404c2b8?auto=format&fit=crop&w=1600&q=90';
                else if (t.includes('smart rent')) img = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=90';
                else if (t.includes('lionscott')) img = 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=90';
                return { image: img, text: p.title };
              }) : undefined}
              bend={0.6}
              textColor="#f1eef1"
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
      <section id="pricing" className="scroll-mt-32 light-sec transparent-bg vx-float" style={{ padding: "100px 0", position: "relative", overflow: "hidden" }}>

        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.8, pointerEvents: 'none' }}>
          <WebGLVisibilityWrapper isAbsolute={false}>
            <LightRays
              raysOrigin="top-center"
              raysColor="#c6bbc7"
              raysSpeed={1.5}
              lightSpread={0.8}
              rayLength={1.2}
              followMouse={true}
              mouseInfluence={0.1}
              noiseAmount={0.1}
              distortion={0.05}
            />
          </WebGLVisibilityWrapper>
        </div>

        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <div className="section-head reveal in">
            <span className="eyebrow">Partnership Models</span>
            <h2>Service <span className="font-stencilia uppercase">Packages</span></h2>
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
                      <button style={{ padding: "10px 24px", borderRadius: "8px", background: "#523056", color: "#fff", border: "none", cursor: "pointer", fontWeight: "bold" }} onClick={onOpenModal}>Get Started</button>
                    </td>
                    <td style={{ padding: "20px 10px", textAlign: "center" }}>
                      <button style={{ padding: "10px 24px", borderRadius: "8px", background: "#523056", color: "#fff", border: "none", cursor: "pointer", fontWeight: "bold" }} onClick={onOpenModal}>Get Started</button>
                    </td>
                    <td style={{ padding: "20px 10px", textAlign: "center" }}>
                      <button style={{ padding: "10px 24px", borderRadius: "8px", background: "#523056", color: "#fff", border: "none", cursor: "pointer", fontWeight: "bold" }} onClick={onOpenModal}>Contact Sales</button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section id="industries" className="scroll-mt-32 light-sec vx-float transparent-bg" style={{ padding: "100px 0", position: "relative", overflow: "hidden" }}>

        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <div className="section-head reveal in">
            <span className="eyebrow">Industries</span>
            <h2>Industries We <span className="font-stencilia uppercase">Serve</span></h2>
            <p>Our custom IT solutions empower forward-thinking organizations to <span className="text-theme-50 font-medium">innovate</span>, <span className="text-theme-400 font-medium">scale seamlessly</span>, and dominate in today's rapidly evolving digital landscape.</p>
          </div>
          <div className="ind-grid">
            {/* Card 1 */}
            <div className="card">
              <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=600&q=80" alt="Technology & SaaS" />
              <div className="overlay">
                <div className="title">Technology & SaaS</div>
                <div className="desc">Scalable platforms built for rapid growth and enterprise performance.</div>
                <div className="tags">
                  <span className="tag"><span className="icon">★</span>4.9</span>
                  <span className="tag">Cloud & SaaS</span>
                </div>
                <button className="reserve-btn">Explore Solutions</button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="card">
              <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80" alt="Finance & Banking" />
              <div className="overlay">
                <div className="title">Finance & Banking</div>
                <div className="desc">Secure systems for regulated industries and modern fintech.</div>
                <div className="tags">
                  <span className="tag"><span className="icon">★</span>4.8</span>
                  <span className="tag">Fintech</span>
                </div>
                <button className="reserve-btn">Explore Solutions</button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="card">
              <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80" alt="Healthcare" />
              <div className="overlay">
                <div className="title">Healthcare</div>
                <div className="desc">Compliant, patient-first digital tools and data management.</div>
                <div className="tags">
                  <span className="tag"><span className="icon">★</span>5.0</span>
                  <span className="tag">HIPAA</span>
                </div>
                <button className="reserve-btn">Explore Solutions</button>
              </div>
            </div>

            {/* Card 4 */}
            <div className="card">
              <img src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=600&q=80" alt="Retail & E-commerce" />
              <div className="overlay">
                <div className="title">Retail & E-commerce</div>
                <div className="desc">High-performance storefronts that convert and scale globally.</div>
                <div className="tags">
                  <span className="tag"><span className="icon">★</span>4.7</span>
                  <span className="tag">B2B/B2C</span>
                </div>
                <button className="reserve-btn">Explore Solutions</button>
              </div>
            </div>

            {/* Card 5 */}
            <div className="card">
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80" alt="Education" />
              <div className="overlay">
                <div className="title">Education</div>
                <div className="desc">Interactive learning platforms built to engage and educate.</div>
                <div className="tags">
                  <span className="tag"><span className="icon">★</span>4.8</span>
                  <span className="tag">EdTech</span>
                </div>
                <button className="reserve-btn">Explore Solutions</button>
              </div>
            </div>

            {/* Card 6 */}
            <div className="card">
              <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80" alt="Manufacturing" />
              <div className="overlay">
                <div className="title">Manufacturing</div>
                <div className="desc">Automation and data insights for modern production lines.</div>
                <div className="tags">
                  <span className="tag"><span className="icon">★</span>4.9</span>
                  <span className="tag">Industry 4.0</span>
                </div>
                <button className="reserve-btn">Explore Solutions</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="scroll-mt-32 testimonials-section vx-float relative z-10 py-24 overflow-hidden" style={{ background: "transparent" }}>
        <div className="wrap relative w-full z-10 mx-auto px-4 md:px-6 lg:px-8">
          <div className="section-head reveal in relative z-10 mb-20 flex flex-col items-center text-center w-full mx-auto">
            <span className="eyebrow" style={{ margin: '0 auto 16px', display: 'inline-block' }}>What Our Clients Say</span>
            <h2 style={{ margin: '0 auto 20px', textAlign: 'center' }}>Trusted by businesses across <span className="font-stencilia uppercase">India</span></h2>
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
                      <SpotlightCard className="group relative w-full h-full rounded-[24px] bg-transparent border border-[rgba(255,255,255,0.08)] shadow-[0_0_40px_rgba(139,47,209,0.15)] hover:shadow-[0_0_40px_rgba(139,47,209,0.15)] hover:-translate-y-1.5 transition-all duration-300 ease-out flex flex-col" spotlightColor="rgba(139, 47, 209, 0.15)">

                        <div className="absolute top-4 -left-6 bg-[#523056] rounded-r-[16px] rounded-tl-[16px] rounded-bl-none px-8 z-20 shadow-lg min-w-[260px] flex flex-col justify-center items-center text-center" style={{ paddingTop: '1.25rem', paddingBottom: '1.25rem' }}>
                          <div className="absolute top-full left-0 w-0 h-0" style={{ borderTop: '24px solid #1E1B4B', borderLeft: '24px solid transparent' }}></div>
                          <h3 className="text-[#f1eef1] font-semibold text-[17px] leading-tight mb-0.5 whitespace-nowrap relative z-10">{t.name}</h3>
                          <p className="text-[#f1eef1]/90 text-[14px] font-medium whitespace-nowrap relative z-10">{t.title}</p>
                        </div>

                        <div className="absolute -top-5 -right-3 w-[104px] h-[104px] rounded-full border-[3px] border-[#2B0F45] shadow-[0_0_40px_rgba(139,47,209,0.15)] overflow-hidden z-20 bg-transparent group-hover:scale-105 transition-transform duration-300">
                          <div className="w-full h-full bg-[#523056] flex items-center justify-center">
                            <span className="text-[#f1eef1] font-bold text-3xl tracking-tight">{t.initials}</span>
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
                            <div className="absolute left-0 top-1 bottom-1 w-[3px] bg-[#523056] rounded-full shadow-[0_0_40px_rgba(139,47,209,0.15)]"></div>
                            <p className="text-[#ad9daf] text-[16px] leading-[1.8] font-sans" style={{ paddingLeft: '32px' }}>
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
      <section id="faq" className="scroll-mt-32 vx-float relative" style={{ background: "transparent", paddingTop: "40px", paddingBottom: "100px", overflow: "hidden" }}>

        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 1, pointerEvents: 'none' }}>
          <WebGLVisibilityWrapper isAbsolute={false}>
            <DarkVeil
              hueShift={-45}
              noiseIntensity={0.05}
              scanlineIntensity={0.15}
              speed={0.3}
              scanlineFrequency={0.8}
              warpAmount={0.02}
              resolutionScale={1}
            />
          </WebGLVisibilityWrapper>
        </div>

        <div className="wrap relative z-10">
          <div className="flex flex-col items-center justify-center text-center mb-32">
            <span className="eyebrow inline-block mb-4">Questions</span>
            <h2 className="text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.05] drop-shadow-lg mb-4">
              <ShinyText text="Common" color="#f1eef1" shineColor="#705474" speed={3} />{' '}
              <span className="font-stencilia uppercase">
                <ShinyText text="Questions" color="#f1eef1" shineColor="#705474" speed={3} />
              </span>
            </h2>
            <p className="text-[#ad9daf] font-light max-w-lg text-lg leading-relaxed">
              Everything you need to know about our approach, timelines, and how we deliver exceptional results.
            </p>
          </div>
          <div className="flex justify-center w-full px-4 md:px-0">
            <div className="max-w-4xl w-full">
              <FAQAccordion />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section id="cta-banner" className="scroll-mt-32 relative py-32 overflow-hidden border-y border-[rgba(255,255,255,0.05)] bg-transparent flex flex-col items-center justify-center min-h-[400px]">

        <div className="absolute inset-0 z-0 bg-black/50" />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 1, pointerEvents: 'none' }}>
          <WebGLVisibilityWrapper isAbsolute={false}>
            <Particles
              particleColors={["#ffffff", "#c6bbc7", "#523056"]}
              particleCount={200}
              particleSpread={10}
              speed={0.1}
              particleBaseSize={100}
              moveParticlesOnHover={true}
              alphaParticles={false}
              disableRotation={false}
            />
          </WebGLVisibilityWrapper>
        </div>

        <div className="wrap relative z-10 w-full flex flex-col items-center justify-center h-full">
          <div className="max-w-5xl w-full mx-auto flex flex-col items-center justify-center text-center" style={{ gap: '2.5rem' }}>
            <span className="text-[#705474] font-mono text-sm md:text-base uppercase tracking-[0.25em] block font-semibold drop-shadow-[0_0_40px_rgba(139,47,209,0.15)]" style={{ margin: 0 }}>Ready to start?</span>

            <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tighter text-[#f1eef1] leading-[1.1]" style={{ margin: 0 }}>
              Ready to Transform Your Business?
            </h2>

            <p className="text-[#f1eef1]/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light" style={{ margin: 0 }}>
              Join hundreds of forward-thinking companies that have accelerated their growth with our professional IT services. Let's build something extraordinary together.
            </p>

            <button className="nx-cta" onClick={onOpenModal} style={{ margin: 0 }}>
              Schedule a Free Consultation
            </button>
          </div>
        </div>
      </section>

      <Footer style={{ paddingTop: '5px' }} middleSectionStyle={{ paddingTop: '50px', paddingBottom: '30px' }} />

      <FloatingScrollButtonDesktop />

      <SciFiServiceModal
        isOpen={!!activeService}
        service={activeService}
        activeCardRect={activeCardRect}
        onClose={() => {
          setActiveService(null)
          setActiveCardRect(null)
        }}
      />
    </>
  )
}
