"use client"

import { useEffect, useState, useRef, useLayoutEffect } from "react"
import { useAuth } from "@/context/auth-context"
import { toast } from "sonner"
import Image from "next/image"
import WebGLVisibilityWrapper from '@/components/WebGLVisibilityWrapper';
import Link from "next/link"
import { Search, BarChart3, Layers, Code2, Zap, ArrowRight, ArrowLeft, Quote, CheckCircle, X, Youtube, Twitter, Instagram, Linkedin, Phone, Building2, ChevronDown, ChevronUp } from "lucide-react"
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
import { FooterMobile } from "@/components/ui/footer-section-mobile"
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
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { icon: <Search className="w-5 h-5 text-purple-300" />, title: "Discovery", desc: "Analyze your business needs and competitive landscape with deep technical research." },
    { icon: <BarChart3 className="w-5 h-5 text-fuchsia-300" />, title: "Strategy", desc: "Build a data-driven, scalable technology roadmap tailored to your growth." },
    { icon: <Layers className="w-5 h-5 text-indigo-300" />, title: "Design", desc: "Craft intuitive UI/UX and secure, cloud-native system architectures." },
    { icon: <Code2 className="w-5 h-5 text-violet-300" />, title: "Development", desc: "High-speed agile sprints with continuous feedback and rigorous quality assurance." },
    { icon: <Zap className="w-5 h-5 text-amber-300" />, title: "Launch & Support", desc: "Seamless deployment, 24/7 proactive monitoring, and constant optimization." }
  ];

  return (
    <div className="relative w-full max-w-lg mx-auto py-4">
      {/* Glowing Connecting Timeline Line */}
      <div className="absolute left-[38px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-purple-500 via-fuchsia-500 to-indigo-500 opacity-40 pointer-events-none z-0" />
      
      <div className="flex flex-col gap-6 relative z-10">
        {steps.map((step, idx) => {
          const isActive = activeStep === idx;
          return (
            <div
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`relative flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl cursor-pointer transition-all duration-500 border ${
                isActive
                  ? "bg-gradient-to-r from-purple-950/80 via-slate-900/90 to-purple-950/60 border-purple-500/70 shadow-[0_0_30px_rgba(139,92,246,0.35)] scale-[1.02]"
                  : "bg-[#0d0d11]/80 border-white/10 hover:border-purple-500/30 hover:bg-white/[0.04]"
              } backdrop-blur-xl overflow-hidden`}
            >
              {/* Active Ambient Glow */}
              {isActive && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/15 rounded-full filter blur-2xl pointer-events-none" />
              )}

              {/* Step Icon Circle */}
              <div className="relative shrink-0 z-10">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-500 ${
                    isActive
                      ? "bg-gradient-to-br from-purple-600 to-indigo-600 shadow-[0_0_15px_rgba(168,85,247,0.5)] scale-105"
                      : "bg-[#170f2e] border border-white/10"
                  }`}
                >
                  {step.icon}
                </div>
                {isActive && (
                  <span className="absolute -inset-1 rounded-xl bg-purple-500/30 animate-ping pointer-events-none" />
                )}
              </div>

              {/* Step Content */}
              <div className="flex flex-col flex-1 min-w-0 pr-1">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h4 className={`text-[15px] sm:text-base font-bold transition-colors truncate ${isActive ? "text-white" : "text-gray-200"}`}>
                    {step.title}
                  </h4>
                  <span className={`text-[10px] sm:text-xs font-mono font-bold px-1.5 py-0.5 rounded-md shrink-0 ${
                    isActive 
                      ? "bg-purple-500/20 text-purple-300 border border-purple-500/40" 
                      : "bg-white/5 text-gray-400 border border-white/5"
                  }`}>
                    0{idx + 1}
                  </span>
                </div>
                <p className="text-[11.5px] sm:text-sm text-gray-300 font-light leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MobileProjectCarousel = ({ projects }: { projects: any[] }) => {
  const defaultItems = [
    { title: "Lionscott", category: "Fitness & Wellness", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800" },
    { title: "AG Home", category: "Real Estate & Living", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80" },
    { title: "Cab Partner", category: "Mobility & Transport", image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80" },
    { title: "Smart Rent", category: "SaaS Platform", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80" },
    { title: "Fintech SaaS", category: "Financial Tech", image: "/tpl-fintech-saas.jpg" },
    { title: "Automation SaaS", category: "AI & Workflow", image: "/tpl-automation-saas.jpg" }
  ];

  const items = projects && projects.length > 0
    ? projects.map((p: any) => {
        let img = p.imageUrl || "/tpl-saas-software.jpg";
        const t = (p.title || "").toLowerCase();
        if (t.includes('ag home')) img = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80';
        else if (t.includes('cab partner')) img = 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80';
        else if (t.includes('smart rent')) img = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80';
        else if (t.includes('lionscott')) img = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800';
        return { title: p.title, category: p.category || "Digital Experience", image: img };
      })
    : defaultItems;

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [items.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  return (
    <div className="relative w-full max-w-sm mx-auto px-2 flex flex-col items-center">
      {/* Cards Showcase Window */}
      <div className="relative w-full h-[340px] flex items-center justify-center overflow-hidden">
        {items.map((item, idx) => {
          const isActive = idx === currentIndex;
          const isPrev = idx === (currentIndex - 1 + items.length) % items.length;

          return (
            <div
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center transition-all duration-700 ease-out cursor-pointer ${
                isActive
                  ? "opacity-100 z-20 scale-100 translate-x-0"
                  : isPrev
                  ? "opacity-0 -translate-x-full pointer-events-none scale-90"
                  : "opacity-0 translate-x-full pointer-events-none scale-90"
              }`}
            >
              {/* Card Container with Full Image & Glowing Border */}
              <div className="relative w-[290px] h-[300px] rounded-3xl p-1.5 bg-gradient-to-br from-purple-900/80 via-slate-950/90 to-purple-950/80 border border-purple-500/50 shadow-[0_0_35px_rgba(139,92,246,0.4)] backdrop-blur-xl overflow-hidden">
                {/* Full-Size Image Container */}
                <div className="relative w-full h-full rounded-[20px] overflow-hidden border border-white/10">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  {/* Bottom Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  
                  {/* Category Badge Top-Left */}
                  <span className="absolute top-3 left-3 px-3 py-1 text-[11px] font-bold text-purple-200 bg-black/70 backdrop-blur-md rounded-full border border-purple-500/40 shadow-md">
                    {item.category}
                  </span>

                  {/* Centered Company/Project Name Overlay */}
                  <div className="absolute bottom-3 left-0 right-0 px-4 flex flex-col items-center justify-center text-center">
                    <h3 className="text-xl font-bold text-white tracking-wider font-mono lowercase drop-shadow-md">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination & Controls */}
      <div className="flex items-center justify-between w-full max-w-[280px] mt-2 px-2 z-30">
        <button
          onClick={handlePrev}
          className="w-10 h-10 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white hover:bg-purple-500/20 transition-all active:scale-95"
          aria-label="Previous Project"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {/* Indicators */}
        <div className="flex items-center gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === i
                  ? "w-6 bg-gradient-to-r from-purple-500 to-fuchsia-500 shadow-[0_0_10px_rgba(168,85,247,0.6)]"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-10 h-10 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white hover:bg-purple-500/20 transition-all active:scale-95"
          aria-label="Next Project"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const MobileTestimonialSingleCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
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
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleSelect = (idx: number) => {
    setCurrentIndex(idx);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="w-full flex flex-col items-center justify-center px-6 pt-6">
      {/* Centered Sliding Cards Container */}
      <div className="relative w-full max-w-[340px] sm:max-w-[378px] mx-auto overflow-hidden" style={{ height: "320px", padding: "10px 0" }}>
        <div className="relative w-full h-[300px] flex items-center justify-center">
        {testimonials.map((t, idx) => {
          const isActive = idx === currentIndex;
          const isPrev = idx === (currentIndex - 1 + testimonials.length) % testimonials.length;

          return (
            <div
              key={idx}
              className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center transition-all duration-700 ease-out ${
                isActive
                  ? "opacity-100 z-20 scale-100 translate-x-0"
                  : isPrev
                  ? "opacity-0 -translate-x-full pointer-events-none scale-90"
                  : "opacity-0 translate-x-full pointer-events-none scale-90"
              }`}
            >
        <SpotlightCard className="group relative w-[90%] sm:w-[92%] max-w-[300px] sm:max-w-[340px] mx-auto h-[300px] rounded-[24px] bg-[#0A0A0B] border border-[rgba(255,255,255,0.08)] shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex flex-col transition-all duration-300 overflow-visible" spotlightColor="rgba(79, 70, 229, 0.15)">
          
          {/* Left Ribbon Banner with Triangular Fold */}
          <div 
            className="absolute top-4 -left-5 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] rounded-r-[15px] rounded-tl-[15px] rounded-bl-none px-4 sm:px-5 z-20 shadow-lg min-w-[190px] max-w-[210px] flex flex-col justify-center items-center text-center" 
            style={{ paddingTop: '0.85rem', paddingBottom: '0.85rem' }}
          >
            <div className="absolute top-full left-0 w-0 h-0" style={{ borderTop: '18px solid #1E1B4B', borderLeft: '18px solid transparent' }}></div>
            <h3 className="text-white font-semibold text-[14.5px] leading-tight mb-0.5 whitespace-nowrap relative z-10">{t.name}</h3>
            <p className="text-white/90 text-[12px] font-medium whitespace-nowrap relative z-10">{t.title}</p>
          </div>

          {/* Profile Circle Avatar Top Right */}
          <div className="absolute -top-4 -right-2 w-[76px] h-[76px] rounded-full border-[3px] border-[#0A0A0B] shadow-[0_4px_12px_rgba(0,0,0,0.5)] overflow-hidden z-20 bg-[#0A0A0B]">
            <div className="w-full h-full bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center">
              <span className="text-white font-bold text-[22px] tracking-tight">{t.initials}</span>
            </div>
          </div>

          {/* Content Body */}
          <div className="flex flex-col h-full relative z-0 justify-start gap-2" style={{ padding: '20px 24px 20px 24px', paddingTop: '110px' }}>
            <div className="flex gap-1 mb-1" style={{ paddingLeft: '28px' }}>
              {[1, 2, 3, 4, 5].map(starI => (
                <svg key={starI} className="w-4 h-4 text-[#FBBF24]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            
            <div className="relative flex items-center" style={{ height: "120px", overflow: "hidden" }}>
              <div className="absolute left-0 top-1 bottom-1 w-[3px] bg-gradient-to-b from-[#4F46E5] to-[#7C3AED] rounded-full shadow-[0_0_8px_rgba(79,70,229,0.3)]"></div>
              <p 
                className="text-[#8981A6] text-[14px] sm:text-[15px] leading-[1.65] font-sans w-full" 
                style={{ paddingLeft: '28px' }}
              >
                "{t.content}"
              </p>
            </div>
          </div>

        </SpotlightCard>
            </div>
          );
        })}
        </div>
      </div>

      {/* Navigation Controls & Dot Indicators below Centered Card */}
      <div 
        className="flex items-center justify-between w-full max-w-[280px] px-2 z-30"
        style={{ marginTop: "36px", marginBottom: "16px", position: "relative" }}
      >
        <button
          onClick={handlePrev}
          className="w-9 h-9 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white hover:bg-purple-500/20 transition-all active:scale-95 shrink-0"
          aria-label="Previous Testimonial"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>

        {/* Indicators */}
        <div className="flex items-center gap-1.5">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === i
                  ? "w-6 bg-gradient-to-r from-purple-500 to-fuchsia-500 shadow-[0_0_10px_rgba(168,85,247,0.6)]"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-9 h-9 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white hover:bg-purple-500/20 transition-all active:scale-95 shrink-0"
          aria-label="Next Testimonial"
        >
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};



const MobileServicePackages = ({ onOpenModal }: { onOpenModal?: () => void }) => {
  const [activeTab, setActiveTab] = useState<"enterprise" | "custom_app" | "digital_presence">("enterprise");

  const packages = {
    enterprise: {
      id: "enterprise",
      label: "ENTERPRISE",
      title: "Enterprise Solutions",
      btnText: "CONTACT SALES",
      features: [
        "Custom UX/UI Design",
        "Full-Stack Web Development",
        "Responsive Mobile Optimization",
        "API & 3rd-Party Integrations",
        "Native Mobile App Development",
        "Advanced Performance Tuning",
        "Dedicated Project Manager",
        "Ongoing Post-Launch Maintenance"
      ]
    },
    custom_app: {
      id: "custom_app",
      label: "CUSTOM APP",
      title: "Custom Application",
      btnText: "GET STARTED",
      features: [
        "Custom UX/UI Design",
        "Full-Stack Web Development",
        "Responsive Mobile Optimization",
        "API & 3rd-Party Integrations",
        "Native Mobile App Development",
        "Advanced Performance Tuning"
      ]
    },
    digital_presence: {
      id: "digital_presence",
      label: "DIGITAL PRESENCE",
      title: "Digital Presence",
      btnText: "GET STARTED",
      features: [
        "Custom UX/UI Design",
        "Full-Stack Web Development",
        "Responsive Mobile Optimization",
        "Basic SEO & Analytics Setup"
      ]
    }
  };

  const currentPkg = packages[activeTab];

  return (
    <div className="w-full flex flex-col items-start text-left">
      {/* Equal 3-Column Toggle Row (100% Fit within Mobile Window) */}
      <div 
        className="grid grid-cols-3 gap-1.5 sm:gap-2.5 w-full"
        style={{ marginBottom: "24px", width: "100%" }}
      >
        {(Object.keys(packages) as Array<keyof typeof packages>).map((key) => {
          const pkg = packages[key];
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              style={{
                width: "100%",
                backgroundColor: isActive ? "#8b5cf6" : "rgba(18, 12, 34, 0.8)",
                color: isActive ? "#ffffff" : "#94a3b8",
                border: isActive ? "1px solid #a855f7" : "1px solid rgba(168, 85, 247, 0.25)",
                boxShadow: isActive ? "0 4px 18px rgba(139, 92, 246, 0.5)" : "none",
                borderRadius: "9999px",
                padding: "8px 1px",
                fontSize: "clamp(7.5px, 2.1vw, 9px)",
                fontWeight: 800,
                letterSpacing: "0.4px",
                textTransform: "uppercase",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
                cursor: "pointer"
              }}
            >
              <span className="truncate">{pkg.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Single Package Box */}
      <div 
        style={{
          width: "100%",
          borderRadius: "28px",
          backgroundColor: "#0c0817",
          border: "1.5px solid rgba(168, 85, 247, 0.35)",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.7)",
          padding: "28px 22px",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Card Title */}
        <h3 
          style={{
            fontSize: "22px",
            fontWeight: 800,
            color: "#ffffff",
            marginBottom: "24px",
            letterSpacing: "-0.3px",
            fontFamily: "sans-serif"
          }}
        >
          {currentPkg.title}
        </h3>

        {/* Feature List */}
        <div style={{ display: "flex", flexDirection: "column", marginBottom: "24px" }}>
          {currentPkg.features.map((feat, idx) => (
            <div 
              key={idx} 
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 0",
                borderBottom: idx === currentPkg.features.length - 1 ? "none" : "1px solid rgba(255, 255, 255, 0.07)"
              }}
            >
              <span style={{ fontSize: "14px", fontWeight: 600, color: "#ffffff", fontFamily: "sans-serif" }}>
                {feat}
              </span>
              <span style={{ color: "#a855f7", fontSize: "16px", fontWeight: 700, paddingLeft: "8px" }}>
                ✓
              </span>
            </div>
          ))}
        </div>

        {/* Full-Width Solid Violet Button */}
        <button
          onClick={() => onOpenModal ? onOpenModal() : window.location.href = '#contact'}
          style={{
            width: "100%",
            padding: "15px 0",
            borderRadius: "9999px",
            backgroundColor: "#8b5cf6",
            color: "#ffffff",
            fontWeight: 800,
            fontSize: "13.5px",
            letterSpacing: "1px",
            textTransform: "uppercase",
            textAlign: "center",
            boxShadow: "0 6px 20px rgba(139, 92, 246, 0.45)",
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s ease"
          }}
        >
          {currentPkg.btnText}
        </button>
      </div>
    </div>
  );
};

const GlowingCard = ({ children, active, delay, className }: { children: React.ReactNode, active?: boolean, delay: number, className?: string }) => {
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
      className={`hero-card flex flex-col h-full ${active ? 'active' : ''} ${className || ''}`}
      style={{
        animationDelay: `${delay}s`,
        minWidth: 0
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 rounded-[12px]"
        style={{
          opacity,
          background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, rgba(139, 92, 246, 0.15), transparent 40%)`,
        }}
      />
      <div className="relative z-10 flex max-[374px]:flex-row min-[375px]:flex-col items-center max-[374px]:text-left min-[375px]:text-center max-[374px]:justify-start min-[375px]:justify-center gap-4 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default function HomePageMobile() {
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

    const savedScroll = sessionStorage.getItem("homeMobileScroll")
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
      sessionStorage.setItem("homeMobileScroll", window.scrollY.toString())
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
          el.scrollIntoView({ behavior: 'smooth' })
        }

        // Only strip search params if from=login was present
        if (window.location.search.includes('from=login')) {
          const newUrl = window.location.pathname + window.location.hash;
          window.history.replaceState({}, '', newUrl);
        }
      }, 500) // generous timeout to wait for layout shift
    }
  }, [])

function FloatingScrollButton() {
  const [isScrolledDown, setIsScrolledDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsScrolledDown(true);
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
      const mobileWrapper = document.querySelector('.block.lg\\:hidden');
      const footerEl = mobileWrapper ? (mobileWrapper.querySelector("footer") || mobileWrapper.querySelector("#footer")) : document.querySelector("footer");
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
      className="fixed bottom-6 right-5 z-40 w-11 h-11 rounded-full bg-gradient-to-tr from-violet-600 via-purple-600 to-fuchsia-600 p-[1.5px] shadow-[0_0_25px_rgba(147,51,234,0.65)] hover:shadow-[0_0_35px_rgba(168,85,247,0.85)] active:scale-90 transition-all duration-300 flex items-center justify-center cursor-pointer"
    >
      <div className="w-full h-full rounded-full bg-[#080514] flex items-center justify-center transition-colors hover:bg-purple-950/60">
        {isScrolledDown ? (
          <ChevronUp className="w-5 h-5 text-white animate-bounce" />
        ) : (
          <ChevronDown className="w-5 h-5 text-white animate-bounce" />
        )}
      </div>
    </button>
  );
}

  const props = { user, role, loading, logout, scrolled }

  return (
    <main className="bg-background text-foreground font-sans selection:bg-black selection:text-white overflow-x-hidden">
      <div>
        <MobileNav {...props} />
      </div>

      <div className="vx">
        <MainContent projects={projects} onOpenModal={() => setIsModalOpen(true)} />
      </div>

      <FloatingScrollButton />

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
          onMobileMenuClick={() => {}}
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
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  const navLinks = [
    { label: 'Solutions', href: '#solutions', icon: Zap },
    { label: 'Process', href: '#how-it-works', icon: Layers },
    { label: 'Work', href: '#recent-projects', icon: BarChart3 },
    { label: 'Pricing', href: '#pricing', icon: Code2 },
    { label: 'FAQ', href: '#faq', icon: CheckCircle }
  ];

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (href && href.startsWith('#')) {
      const targetId = href.substring(1);
      setTimeout(() => {
        // Query target element specifically within the visible mobile page wrapper
        const mobileWrapper = document.querySelector('.block.lg\\:hidden');
        let el: Element | null = mobileWrapper ? mobileWrapper.querySelector(`#${targetId}`) : null;
        if (!el) {
          const allEls = document.querySelectorAll(`#${targetId}`);
          el = allEls[allEls.length - 1] || document.getElementById(targetId);
        }

        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className={`w-full transition-all duration-300 ${
        scrolled || isOpen 
          ? 'bg-[#06040d]/95 backdrop-blur-2xl border-b border-purple-500/30 shadow-[0_4px_30px_rgba(0,0,0,0.85)]' 
          : 'bg-[#06040d]/80 backdrop-blur-xl border-b border-white/10 shadow-md'
      } px-5 py-3 flex justify-between items-center relative`}>
        
        {/* Brand Logo with Live Status Dot */}
        <Link href="#" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-fuchsia-600 p-[1.5px] shadow-[0_0_15px_rgba(168,85,247,0.5)] shrink-0">
              <div className="w-full h-full bg-[#080514] rounded-[10px] flex items-center justify-center p-1.5 overflow-hidden">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain transform group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#06040d] shadow-[0_0_8px_#34d399]"></span>
          </div>
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-[16px] font-extrabold tracking-tight text-white leading-tight">Devoxa</span>
            </div>
            <span className="text-[9px] font-mono font-semibold tracking-wider text-gray-400 uppercase">Technologies</span>
          </div>
        </Link>

        {/* Circular Cyber Trigger Button */}
        <div className="relative flex items-center gap-2" ref={menuRef}>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu" 
            className="w-9 h-9 rounded-full bg-gradient-to-tr from-violet-600 via-purple-600 to-fuchsia-600 p-[1.5px] shadow-[0_0_18px_rgba(168,85,247,0.5)] active:scale-90 transition-all flex items-center justify-center"
          >
            <div className="w-full h-full rounded-full bg-[#080514] flex items-center justify-center transition-colors hover:bg-purple-950/60">
              {isOpen ? (
                <X className="w-4 h-4 text-white" />
              ) : (
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-purple-300 animate-pulse"></div>
                  <div className="w-1 h-1 rounded-full bg-white"></div>
                  <div className="w-1 h-1 rounded-full bg-purple-300 animate-pulse"></div>
                </div>
              )}
            </div>
          </button>

          {/* Sleek Sheet Popover Menu */}
          {isOpen && (
            <div className="absolute top-12 right-0 w-64 bg-[#080514]/95 border border-purple-500/35 rounded-2xl p-4 shadow-[0_20px_60px_rgba(0,0,0,0.95)] backdrop-blur-3xl z-50 flex flex-col gap-1.5 text-left animate-in fade-in zoom-in-95 duration-200">
              <div className="px-2 py-1 flex items-center justify-between text-[10px] font-mono font-bold tracking-widest text-purple-300 uppercase border-b border-white/10 mb-1 pb-2">
                <span>NAVIGATION // CATALOGUE</span>
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping"></span>
              </div>

              {navLinks.map((link, idx) => {
                const IconComponent = link.icon;
                return (
                  <button
                    key={link.href}
                    type="button"
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold text-gray-200 hover:text-white bg-white/5 hover:bg-gradient-to-r hover:from-purple-600/40 hover:to-fuchsia-600/30 active:scale-[0.98] transition-all flex items-center justify-between cursor-pointer border border-white/5 hover:border-purple-500/40 group text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-purple-400/80 font-bold">0{idx + 1}</span>
                      <div className="w-6 h-6 rounded-lg bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 group-hover:text-white transition-colors">
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                      <span>{link.label}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-purple-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                );
              })}

              <div className="h-px bg-white/10 my-1" />

              {!loading && user ? (
                <>
                  <Link
                    href={`/dashboard/${role}`}
                    onClick={() => setIsOpen(false)}
                    className="px-3.5 py-2.5 rounded-xl text-xs font-semibold text-purple-300 hover:bg-purple-600/30 transition-all flex items-center justify-between bg-purple-950/40 border border-purple-500/30"
                  >
                    <span>Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => { logout(); setIsOpen(false); }}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/20 transition-all border border-red-500/20"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="px-3.5 py-2.5 rounded-xl text-xs font-extrabold tracking-wider uppercase text-white bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 shadow-[0_0_20px_rgba(147,51,234,0.55)] hover:shadow-[0_0_30px_rgba(168,85,247,0.75)] transition-all text-center border border-purple-400/40 mt-1 flex items-center justify-center gap-2"
                >
                  <span>Schedule Consultation / Login</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

function MainContent({ projects, onOpenModal }: { projects: any[], onOpenModal: () => void }) {
  return (
    <>
      <section id="hero" className="nx vx-float pt-24 md:pt-32" style={{ height: "auto", minHeight: "100vh" }}>
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
        <div className="nx-inner" style={{ minHeight: "100vh", alignItems: "flex-start", display: "flex", flexDirection: "column", justifyContent: "flex-start", padding: "140px 24px 80px 24px" }}>
          <div style={{ flexShrink: 0, width: "100%", maxWidth: "100%", textAlign: "left", position: "relative", zIndex: 10 }}>
            
            {/* Eyebrow */}
            <div style={{ display: "inline-flex", marginBottom: "24px" }}>
              <span style={{ backgroundColor: "#7c3aed", color: "#fff", padding: "6px 12px", fontFamily: "monospace", fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>DIGITAL</span>
              <span style={{ backgroundColor: "#4c1d95", color: "#fff", padding: "6px 12px", fontFamily: "monospace", fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>FIRST</span>
            </div>

            {/* Headline */}
            <h1 style={{ 
              fontFamily: "var(--font-mono, monospace)", 
              fontSize: "36px", 
              fontWeight: 700, 
              color: "#fff", 
              lineHeight: 1.1, 
              letterSpacing: "2px", 
              marginBottom: "24px",
              textTransform: "uppercase"
            }}>
              <span style={{ 
                display: "block", 
                marginBottom: "8px",
                color: "#B3B3B3"
              }}>BUILD THE</span>
              <img 
                src="/untitled-logotype.png" 
                alt="FUTURE" 
                style={{ 
                  width: "100%", 
                  maxWidth: "320px", 
                  height: "auto", 
                  display: "block"
                }} 
              />
            </h1>

            {/* Subtext */}
            <div style={{ 
              borderLeft: "2px solid #7c3aed", 
              paddingLeft: "16px", 
              marginBottom: "40px"
            }}>
              <p style={{ 
                fontSize: "15px", 
                color: "#8981A6", 
                lineHeight: 1.6, 
                maxWidth: "100%",
                fontWeight: 400
              }}>
                Custom software, AI automation, and digital solutions designed to help businesses grow faster, smarter, and without enterprise-level costs.
              </p>
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", maxWidth: "320px" }}>
              <button 
                onClick={onOpenModal}
                style={{ 
                  background: "linear-gradient(90deg, #7c3aed, #9333ea)", 
                  color: "#fff", 
                  padding: "16px 24px", 
                  fontSize: "12px", 
                  fontWeight: 600, 
                  letterSpacing: "1px", 
                  textTransform: "uppercase",
                  cursor: "pointer",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  border: "none",
                  width: "100%"
                }}
              >
                START PROJECT <ArrowRight size={16} />
              </button>
              <a 
                href="#solutions"
                style={{ 
                  backgroundColor: "transparent", 
                  color: "#fff", 
                  border: "1px solid rgba(255,255,255,0.2)", 
                  padding: "16px 24px", 
                  fontSize: "12px", 
                  fontWeight: 600, 
                  letterSpacing: "1px", 
                  textTransform: "uppercase",
                  cursor: "pointer",
                  borderRadius: "8px",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  width: "100%"
                }}
              >
                VIEW SERVICES <ArrowRight size={16} />
              </a>
            </div>
            
            
          </div>
          
          <div className="grid grid-cols-1 min-[375px]:grid-cols-2 gap-4 mb-16 mx-auto w-full relative z-20" style={{ flexShrink: 0, marginTop: "80px" }}>
            <GlowingCard delay={0.1}>
              <div className="hc-icon shrink-0"><Code2 size={28} strokeWidth={1.5} /></div>
              <div className="flex flex-col gap-1">
                <h4 className="hc-title !m-0">Web App Dev</h4>
                <p className="hc-desc !m-0">Custom-built, scalable web applications</p>
              </div>
            </GlowingCard>
            <GlowingCard delay={0.2}>
              <div className="hc-icon shrink-0"><Zap size={28} strokeWidth={1.5} /></div>
              <div className="flex flex-col gap-1">
                <h4 className="hc-title !m-0">Automation</h4>
                <p className="hc-desc !m-0">Streamline workflows and cut manual work</p>
              </div>
            </GlowingCard>
            <GlowingCard active delay={0.3} className="min-[375px]:col-span-2">
              <div className="hc-icon shrink-0"><Layers size={28} strokeWidth={1.5} /></div>
              <div className="flex flex-col gap-1">
                <h4 className="hc-title !m-0">IT Consultation</h4>
                <p className="hc-desc !m-0">Strategic guidance for your tech stack</p>
              </div>
            </GlowingCard>
            <GlowingCard delay={0.4}>
              <div className="hc-icon shrink-0"><BarChart3 size={28} strokeWidth={1.5} /></div>
              <div className="flex flex-col gap-1">
                <h4 className="hc-title !m-0">CRM CMS</h4>
                <p className="hc-desc !m-0">Manage customers and content in one place</p>
              </div>
            </GlowingCard>
            <GlowingCard delay={0.5}>
              <div className="hc-icon shrink-0"><Search size={28} strokeWidth={1.5} /></div>
              <div className="flex flex-col gap-1">
                <h4 className="hc-title !m-0">UI UX Branding</h4>
                <p className="hc-desc !m-0">Interfaces that look sharp and convert</p>
              </div>
            </GlowingCard>
          </div>
        </div>
      </section>

      <div style={{ position: "relative", backgroundColor: "#0d0d11", overflow: "hidden" }}>
        {/* Shared Light Pillar Background */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.35, pointerEvents: 'none' }}>
          <WebGLVisibilityWrapper isAbsolute={false}>
            <LightPillar
            topColor="#5227FF"
            bottomColor="#FF9FFC"
            intensity={0.6}
            rotationSpeed={0.3}
            glowAmount={0.001}
            pillarWidth={2.5}
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
      <section id="solutions" className="scroll-mt-32 light-sec vx-float" style={{ padding: "0 0 36px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "-10%", width: "40%", height: "60%", background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, rgba(0,0,0,0) 70%)", filter: "blur(60px)", pointerEvents: "none" }}></div>
        <div className="wrap px-4 md:px-8">
          <div className="sol-split reveal in flex flex-col items-center gap-4">
            <div className="sol-text-modern w-full max-w-full">
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px", background: "rgba(139, 92, 246, 0.1)", borderRadius: "999px", border: "1px solid rgba(139, 92, 246, 0.2)", marginBottom: "16px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#a78bfa", boxShadow: "0 0 8px #a78bfa" }}></div>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#a78bfa", letterSpacing: "1px", textTransform: "uppercase" }}>Why Choose Us</span>
              </div>
              <h2 style={{ fontSize: "clamp(28px, 8vw, 38px)", fontWeight: 800, lineHeight: 1.15, color: "#fff", marginBottom: "16px", letterSpacing: "-0.5px" }}>
                Powerful IT Solutions for <span style={{ background: "linear-gradient(90deg, #7c3aed, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Modern Businesses</span>
              </h2>
              <p style={{ fontSize: "clamp(15px, 4vw, 17px)", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, marginBottom: "24px" }}>
                We combine cutting-edge technology with affordable pricing to deliver enterprise-grade solutions that scale with your ambitions. No hidden fees, no jargon — just results.
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: "12px", listStyle: "none", padding: 0, marginBottom: "16px" }}>
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
            <div className="sol-img-modern w-full" style={{ marginTop: "24px" }}>
              {/* Outer Layered Glow Ring */}
              <div 
                style={{
                  position: "relative",
                  borderRadius: "34px",
                  padding: "6px",
                  border: "1px solid rgba(168, 85, 247, 0.35)",
                  background: "rgba(124, 58, 237, 0.08)",
                  boxShadow: "0 0 45px rgba(124, 58, 237, 0.35), 0 0 80px rgba(168, 85, 247, 0.2)"
                }}
              >
                {/* Thick Main Neon Purple Frame */}
                <div 
                  style={{
                    position: "relative",
                    borderRadius: "28px",
                    background: "linear-gradient(135deg, #7C3AED, #6B21A8)",
                    padding: "14px",
                    border: "1.5px solid #A855F7",
                    boxShadow: "0 0 30px rgba(124, 58, 237, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.25)",
                    transition: "all 0.3s ease"
                  }}
                >
                  {/* Background Glow Accents */}
                  <div style={{ position: "absolute", top: "-20px", left: "-20px", width: "140px", height: "140px", background: "#7C3AED", filter: "blur(45px)", opacity: 0.7, zIndex: 0 }}></div>
                  <div style={{ position: "absolute", bottom: "-20px", right: "-20px", width: "160px", height: "160px", background: "#A855F7", filter: "blur(55px)", opacity: 0.5, zIndex: 0 }}></div>
                  
                  {/* Inner Dark Screen Mockup */}
                  <div 
                    style={{
                      position: "relative",
                      zIndex: 1,
                      borderRadius: "18px",
                      border: "1.5px solid rgba(255, 255, 255, 0.15)",
                      backgroundColor: "#0D0B1A",
                      boxShadow: "0 15px 35px rgba(0, 0, 0, 0.85)",
                      overflow: "hidden"
                    }}
                  >
                    <img 
                      src="/tpl-saas-software.jpg" 
                      alt="IT Solutions Dashboard Showcase" 
                      style={{ 
                        width: "100%", 
                        height: "auto",
                        display: "block", 
                        borderRadius: "16px" 
                      }} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-32 vx-float" style={{ background: "var(--bg-deep)", padding: "60px 0 40px", position: "relative", overflow: "hidden" }}>
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
        
        <div className="wrap px-4 md:px-8" style={{ position: "relative", zIndex: 1 }}>
          <div className="section-head reveal in flex flex-col items-center" style={{ margin: "0 auto 40px", textAlign: "center" }}>
            <span className="eyebrow" style={{ margin: "0 0 16px 0" }}>Our Process</span>
            <h2 style={{ textAlign: "center", fontSize: "clamp(26px, 7vw, 36px)", lineHeight: 1.2, marginBottom: "16px" }}>How Professional IT Services<br />Can Drive <span style={{ background: "linear-gradient(90deg,#7c3aed,#a78bfa)", WebkitBackgroundClip: "text", color: "transparent" }}>Success</span></h2>
            <p style={{ margin: "0 auto", maxWidth: "600px", fontSize: "clamp(15px, 4vw, 17px)" }}>From initial consultation to ongoing optimization, our streamlined process ensures every project delivers measurable business value.</p>
          </div>

          <AnimatedProcessWorkflow />
        </div>
      </section>

      {/* Recent Projects */}
      <section id="recent-projects" className="scroll-mt-32 vx-float" style={{ padding: "40px 0 30px", position: "relative", zIndex: 10 }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, background: 'var(--bg-void)' }}>
          <WebGLVisibilityWrapper isAbsolute={false}>
            <LiquidEther
            colors={[ '#5227FF', '#FF9FFC', '#B497CF' ]}
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
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "24px", position: "relative" }}>
            {/* Subtle glow behind the text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[100px] bg-purple-600/30 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="section-head reveal in" style={{ margin: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden mb-4 transition-all duration-300 hover:bg-white/10 hover:border-purple-500/30">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Layers className="w-4 h-4 text-purple-400 group-hover:text-purple-300 transition-colors" />
                <span className="text-xs font-bold text-white tracking-[0.15em] uppercase">Our Portfolio</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight leading-[1.15]">
                Crafting Digital <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-purple-400 animate-gradient bg-300%">Masterpieces</span>
              </h2>
              
              <p className="text-[#8981A6] text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-light">
                Explore our curated collection of next-generation digital experiences built for growth.
              </p>
            </div>
          </div>

          <div className="reveal in w-full">
            <MobileProjectCarousel projects={projects} />
          </div>
        </div>
      </section>

      {/* Pricing / Service Packages */}
      <section 
        id="pricing" 
        className="scroll-mt-32 light-sec vx-float" 
        style={{ 
          padding: "60px 0", 
          position: "relative", 
          overflow: "hidden",
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
          backgroundSize: "16px 16px"
        }}
      >
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
        <div className="wrap" style={{ position: "relative", zIndex: 1, padding: "0 32px" }}>
          <div className="section-head reveal in flex flex-col items-start text-left" style={{ marginBottom: "24px" }}>
            <div 
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 16px",
                borderRadius: "9999px",
                backgroundColor: "rgba(26, 15, 52, 0.6)",
                border: "1px solid rgba(168, 85, 247, 0.35)",
                color: "#c084fc",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                marginBottom: "16px"
              }}
            >
              <span style={{ color: "#a855f7", fontSize: "10px" }}>◆</span> PARTNERSHIP MODELS
            </div>
            <h2 style={{ fontSize: "clamp(22px, 6.5vw, 28px)", fontWeight: 900, color: "#ffffff", marginBottom: "8px", letterSpacing: "-0.5px", whiteSpace: "nowrap" }}>
              SERVICE <span style={{ color: "#a855f7", fontWeight: 900 }}>PACKAGES</span>
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: "1.6", fontWeight: 400, maxWidth: "440px", margin: 0 }}>
              Flexible engagement models designed to scale with your business needs and digital ambitions.
            </p>
          </div>

          <div className="reveal in w-full">
            <MobileServicePackages />
          </div>
        </div>
      </section>

      {/* Industries */}
      <section id="industries" className="scroll-mt-32 light-sec vx-float" style={{ padding: "60px 0 30px 0", position: "relative", overflow: "hidden" }}>
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
          <div className="section-head reveal in flex flex-col items-center text-center mb-8">
            <div className="group relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden mb-4 transition-all duration-300 hover:bg-white/10 hover:border-purple-500/30 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Building2 className="w-4 h-4 text-purple-400 group-hover:text-purple-300 transition-colors" />
              <span className="text-xs font-bold text-white tracking-[0.15em] uppercase">Industries</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight leading-[1.15] text-center">
              Industries We <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-indigo-400">Serve</span>
            </h2>

            <p className="text-[#8981A6] text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-light text-center">
              Our custom IT solutions empower forward-thinking organizations to <span className="text-white font-medium">innovate</span>, <span className="text-purple-300 font-medium">scale seamlessly</span>, and dominate in today's rapidly evolving digital landscape.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 px-2 sm:px-4 w-full mt-6">
            <BorderGlow className="ind-card reveal in" borderRadius={20} animated={false} colors={['#c084fc', '#f472b6', '#38bdf8']}>
              <div className="ind-img-wrap !aspect-video"><img src="/tech-saas-cover.png" alt="Technology & SaaS" /></div>
              <div className="ind-label !text-xs sm:!text-sm">Technology & SaaS</div>
              <div className="ind-desc !text-[10px] sm:!text-xs !leading-tight">Scalable platforms built for rapid growth</div>
              <div className="ind-meta">
                <span className="text-[10px] sm:text-sm font-semibold text-[#a78bfa] tracking-wide hover:text-white transition-colors duration-300" style={{ cursor: 'pointer' }}>Explore <ArrowRight size={12} className="inline-block ml-0.5 sm:ml-1" /></span>
              </div>
            </BorderGlow>
            <BorderGlow className="ind-card reveal in delay-[100ms]" borderRadius={20} animated={false} colors={['#c084fc', '#f472b6', '#38bdf8']}>
              <div className="ind-img-wrap !aspect-video"><img src="/finance-banking-cover.png" alt="Finance & Banking" /></div>
              <div className="ind-label !text-xs sm:!text-sm">Finance & Banking</div>
              <div className="ind-desc !text-[10px] sm:!text-xs !leading-tight">Secure systems for regulated industries</div>
              <div className="ind-meta">
                <span className="text-[10px] sm:text-sm font-semibold text-[#a78bfa] tracking-wide hover:text-white transition-colors duration-300" style={{ cursor: 'pointer' }}>Explore <ArrowRight size={12} className="inline-block ml-0.5 sm:ml-1" /></span>
              </div>
            </BorderGlow>
            <BorderGlow className="ind-card reveal in delay-[200ms]" borderRadius={20} animated={false} colors={['#c084fc', '#f472b6', '#38bdf8']}>
              <div className="ind-img-wrap !aspect-video"><img src="/healthcare-cover.png" alt="Healthcare" /></div>
              <div className="ind-label !text-xs sm:!text-sm">Healthcare</div>
              <div className="ind-desc !text-[10px] sm:!text-xs !leading-tight">Compliant, patient-first digital tools</div>
              <div className="ind-meta">
                <span className="text-[10px] sm:text-sm font-semibold text-[#a78bfa] tracking-wide hover:text-white transition-colors duration-300" style={{ cursor: 'pointer' }}>Explore <ArrowRight size={12} className="inline-block ml-0.5 sm:ml-1" /></span>
              </div>
            </BorderGlow>
            <BorderGlow className="ind-card reveal in" borderRadius={20} animated={false} colors={['#c084fc', '#f472b6', '#38bdf8']}>
              <div className="ind-img-wrap !aspect-video"><img src="/shopix-ecommerce.png" alt="Retail & E-commerce Dashboard" /></div>
              <div className="ind-label !text-xs sm:!text-sm">Retail & E-commerce</div>
              <div className="ind-desc !text-[10px] sm:!text-xs !leading-tight">Storefronts that convert and scale</div>
              <div className="ind-meta">
                <span className="text-[10px] sm:text-sm font-semibold text-[#a78bfa] tracking-wide hover:text-white transition-colors duration-300" style={{ cursor: 'pointer' }}>Explore <ArrowRight size={12} className="inline-block ml-0.5 sm:ml-1" /></span>
              </div>
            </BorderGlow>
            <BorderGlow className="ind-card reveal in delay-[100ms]" borderRadius={20} animated={false} colors={['#c084fc', '#f472b6', '#38bdf8']}>
              <div className="ind-img-wrap !aspect-video"><img src="/education-cover.png" alt="Education" /></div>
              <div className="ind-label !text-xs sm:!text-sm">Education</div>
              <div className="ind-desc !text-[10px] sm:!text-xs !leading-tight">Learning platforms built to engage</div>
              <div className="ind-meta">
                <span className="text-[10px] sm:text-sm font-semibold text-[#a78bfa] tracking-wide hover:text-white transition-colors duration-300" style={{ cursor: 'pointer' }}>Explore <ArrowRight size={12} className="inline-block ml-0.5 sm:ml-1" /></span>
              </div>
            </BorderGlow>
            <BorderGlow className="ind-card reveal in delay-[200ms]" borderRadius={20} animated={false} colors={['#c084fc', '#f472b6', '#38bdf8']}>
              <div className="ind-img-wrap !aspect-video"><img src="/manufacturing-cover.png" alt="Manufacturing" /></div>
              <div className="ind-label !text-xs sm:!text-sm">Manufacturing</div>
              <div className="ind-desc !text-[10px] sm:!text-xs !leading-tight">Automation for modern production lines</div>
              <div className="ind-meta">
                <span className="text-[10px] sm:text-sm font-semibold text-[#a78bfa] tracking-wide hover:text-white transition-colors duration-300" style={{ cursor: 'pointer' }}>Explore <ArrowRight size={12} className="inline-block ml-0.5 sm:ml-1" /></span>
              </div>
            </BorderGlow>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="scroll-mt-32 testimonials-section vx-float relative z-10 py-24 overflow-hidden" style={{ background: "var(--bg-void)" }}>
        {/* Animated glowing orb in background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-600/20 blur-[120px] rounded-[100%] pointer-events-none mix-blend-screen" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="section-head reveal in relative z-10 mb-10 flex flex-col items-center text-center w-full">
            <span className="eyebrow" style={{ margin: '0 auto 16px', display: 'inline-block' }}>What Our Clients Say</span>
            <h2 style={{ margin: '0 auto 16px', textAlign: 'center', fontSize: 'clamp(26px, 6vw, 36px)', lineHeight: 1.15 }}>Trusted by businesses across India</h2>
            <p style={{ margin: '0 auto', textAlign: 'center', maxWidth: '500px', fontSize: '13px', color: '#94a3b8' }}>
              Delivering high-quality software, websites, CRM solutions, mobile applications, and AI automation.
            </p>
          </div>

          <div className="reveal in w-full flex justify-center">
            <MobileTestimonialSingleCard />
          </div>
        </div>
      </section>

      {/* FAQ styled with new theme */}
      <section id="faq" className="scroll-mt-32 vx-float" style={{ background: "var(--bg-void)", paddingTop: "16px", paddingBottom: "60px" }}>
        <div className="wrap px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-5 relative mb-2 lg:mb-0">
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
              <div className="relative lg:sticky top-4 lg:top-32 z-10">
                <span className="eyebrow inline-block mb-3" style={{ margin: "0 0 12px 0" }}>Questions</span>
                <h2 className="text-3xl sm:text-4xl lg:text-7xl font-bold tracking-tighter leading-[1.1] drop-shadow-lg mb-3">
                  <ShinyText text="Common" color="#ffffff" shineColor="#8b5cf6" speed={3} />{" "}
                  <ShinyText text="Questions" color="#ffffff" shineColor="#8b5cf6" speed={3} />
                </h2>
                <p className="text-[#8981A6] font-light max-w-sm text-xs sm:text-base leading-relaxed mb-6">
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
      <section id="cta-banner" className="scroll-mt-32 relative py-14 sm:py-20 overflow-hidden border-y border-[rgba(255,255,255,0.05)] bg-[#050506] px-4 md:px-8 min-h-[340px]">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <Particles className="" particleCount={100} particleColors={['#ffffff', '#8b5cf6']} />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] md:w-[800px] h-[120vw] md:h-[600px] bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-full blur-[90px] pointer-events-none z-0"></div>

        <div className="wrap relative z-10 w-full">
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center w-full gap-4">
            <span className="text-[#a78bfa] font-mono text-xs uppercase tracking-[0.2em] font-semibold drop-shadow-[0_0_8px_rgba(167,139,250,0.5)]">Ready to start?</span>
            
            {/* Fixed Height Wrapper to Prevent Layout Fluctuation */}
            <div className="min-h-[72px] sm:min-h-[90px] flex items-center justify-center w-full">
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-[1.2]">
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
                  onSentenceComplete={() => {}}
                />
              </h2>
            </div>
            
            <p className="text-gray-300 text-xs sm:text-base max-w-lg mx-auto leading-relaxed font-light">
              Join hundreds of forward-thinking companies that have accelerated their growth with our professional IT services. Let's build something extraordinary together.
            </p>
            
            <button className="nx-cta w-full sm:w-auto mt-2 text-center flex items-center justify-center" onClick={onOpenModal}>
              Schedule a Free Consultation
            </button>
          </div>
        </div>
      </section>

      <FooterMobile />
    </>
  )
}
