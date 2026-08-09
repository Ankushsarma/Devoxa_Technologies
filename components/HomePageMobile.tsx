"use client"

import { useEffect, useState, useRef, useLayoutEffect } from "react"
import { useAuth } from "@/context/auth-context"
import { toast } from "sonner"
import Image from "next/image"
import WebGLVisibilityWrapper from '@/components/WebGLVisibilityWrapper';
import Link from "next/link"
import { Users, Layout, Shield, Search, ArrowRight, ArrowLeft, Activity, Menu, Code2, Zap, Layers, BarChart3, Database, CheckCircle, X, Youtube, Twitter, Instagram, Linkedin, Phone, Building2, ChevronDown, ChevronUp } from "lucide-react"
import FAQAccordion from '@/components/FAQAccordion';
import ShinyText from '@/components/ShinyText';
import TextType from '@/components/TextType';


import LineWaves from "@/components/LineWaves"
import ConsultationModal from "@/components/ConsultationModal"
import SciFiServiceModal, { ServiceDetails } from "@/components/SciFiServiceModal"
import AgencySection from "@/components/AgencySection"
import LightPillar from "@/components/LightPillar"
import MagicRings from "@/components/MagicRings"
import CircularGallery from "@/components/CircularGallery"
import LiquidEther from "@/components/LiquidEther"
import SpecularButton from "@/components/SpecularButton"
import LightRays from "@/components/LightRays"
import BorderGlow from "@/components/BorderGlow"
import DarkVeil from "@/components/DarkVeil"
import Particles from "@/components/Particles"

import SideRays from "@/components/SideRays"
import SpotlightCard from "@/components/SpotlightCard"
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
    { icon: <Search className="w-5 h-5 text-[#705474]" />, title: "Discovery", desc: "Analyze your business needs and competitive landscape with deep technical research." },
    { icon: <BarChart3 className="w-5 h-5 text-[#705474]" />, title: "Strategy", desc: "Build a data-driven, scalable technology roadmap tailored to your growth." },
    { icon: <Layers className="w-5 h-5 text-[#705474]" />, title: "Design", desc: "Craft intuitive UI/UX and secure, cloud-native system architectures." },
    { icon: <Code2 className="w-5 h-5 text-[#705474]" />, title: "Development", desc: "High-speed agile sprints with continuous feedback and rigorous quality assurance." },
    { icon: <Zap className="w-5 h-5 text-amber-300" />, title: "Launch & Support", desc: "Seamless deployment, 24/7 proactive monitoring, and constant optimization." }
  ];

  return (
    <div className="w-full flex justify-center">
      <div className="relative w-full max-w-lg md:max-w-2xl mx-auto py-4">
      {/* Glowing Connecting Timeline Line */}
 <div className="absolute left-[38px] top-8 bottom-8 w-[2px] bg-[#523056] opacity-40 pointer-events-none z-0" />
      
      <div className="flex flex-col gap-6 relative z-10">
        {steps.map((step, idx) => {
          const isActive = activeStep === idx;
          return (
            <div
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`relative flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl cursor-pointer transition-all duration-500 border ${
                isActive
 ? "bg-[#2B0F45] border-[#705474]/70 shadow-[0_0_40px_rgba(139,47,209,0.15)] scale-[1.02]"
                  : "bg-transparent border-[#705474]/15 hover:border-[#705474]/30 hover:bg-theme-50/[0.04]"
              } backdrop-blur-xl overflow-hidden`}
            >
              {/* Active Ambient Glow */}
              {isActive && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#523056] rounded-full filter blur-2xl pointer-events-none" />
              )}

              {/* Step Icon Circle */}
              <div className="relative shrink-0 z-10">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-500 ${
                    isActive
 ? "bg-[#523056] shadow-[0_0_40px_rgba(139,47,209,0.15)] scale-105"
                      : "bg-transparent border border-[#705474]/15"
                  }`}
                >
                  {step.icon}
                </div>
                {isActive && (
                  <span className="absolute -inset-1 rounded-xl bg-[#523056] animate-ping pointer-events-none" />
                )}
              </div>

              {/* Step Content */}
              <div className="flex flex-col flex-1 min-w-0 pr-1">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h4 className={`text-[15px] sm:text-base font-bold transition-colors truncate ${isActive ? "text-[#f1eef1]" : "text-[#f1eef1]"}`}>
                    {step.title}
                  </h4>
                  <span className={`text-[10px] sm:text-xs font-mono font-bold px-1.5 py-0.5 rounded-md shrink-0 ${
                    isActive 
                      ? "bg-[#523056] text-[#705474] border border-[#705474]/40" 
                      : "bg-transparent text-[#f1eef1]/60 border border-theme-50/5"
                  }`}>
                    0{idx + 1}
                  </span>
                </div>
                <p className="text-[11.5px] sm:text-sm text-[#f1eef1]/70 font-light leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
};

const MobileProjectCarousel = ({ projects }: { projects: any[] }) => {
  const defaultItems = [
    { title: "Lionscott", category: "Fitness & Wellness", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800" },
    { title: "AG Homes India", category: "Real Estate & Living", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80" },
    { title: "Cab Partner", category: "Mobility & Transport", image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80" },
    { title: "Smart Rent", category: "SaaS Platform", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80" }
  ];

  const items = projects && projects.length > 0
    ? projects.map((p: any) => {
        let img = p.imageUrl || "/tpl-saas-software.jpg";
        const t = (p.title || "").toLowerCase();
        let finalTitle = p.title;
        if (t.includes('ag home')) {
          img = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=60';
          finalTitle = "AG Homes India";
        }
        else if (t.includes('cab partner')) img = 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=400&q=60';
        else if (t.includes('smart rent')) img = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&q=60';
        else if (t.includes('lionscott')) img = 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=400&q=60';
        return { title: finalTitle, category: p.category || "Digital Experience", image: img };
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
 <div className="relative w-[290px] h-[300px] rounded-3xl p-1.5 bg-[#2B0F45]/80 border border-[#705474]/50 shadow-[0_0_40px_rgba(139,47,209,0.15)] backdrop-blur-xl overflow-hidden">
                {/* Full-Size Image Container */}
                <div className="relative w-full h-full rounded-[20px] overflow-hidden border border-[#705474]/15">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  {/* Bottom Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08060e] via-[#08060e]/50 to-transparent pointer-events-none opacity-90" />
                  
                  {/* Category Badge Top-Left */}
                  <span className="absolute top-3 left-3 px-3 py-1 text-[11px] font-bold text-[#705474] bg-theme-900/70 bg-[#0A0714] rounded-full border border-[#705474]/40 shadow-md">
                    {item.category}
                  </span>

                  {/* Centered Company/Project Name Overlay */}
                  <div className="absolute bottom-3 left-0 right-0 px-4 flex flex-col items-center justify-center text-center">
                    <h3 className="text-xl font-bold text-[#f1eef1] tracking-wider font-mono drop-shadow-md">
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
          className="w-10 h-10 rounded-full bg-transparent border border-[#705474]/15 flex items-center justify-center text-[#f1eef1] hover:bg-[#523056] transition-all active:scale-95"
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
 ? "w-6 bg-[#523056] shadow-[0_0_40px_rgba(139,47,209,0.15)]"
                  : "w-2 bg-theme-50/20 hover:bg-theme-50/40"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-10 h-10 rounded-full bg-transparent border border-[#705474]/15 flex items-center justify-center text-[#f1eef1] hover:bg-[#523056] transition-all active:scale-95"
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
        <SpotlightCard className="group relative w-[90%] sm:w-[92%] max-w-[300px] sm:max-w-[340px] mx-auto h-[300px] rounded-[24px] bg-transparent border border-[rgba(255,255,255,0.08)] shadow-[0_0_40px_rgba(139,47,209,0.15)] flex flex-col transition-all duration-300 overflow-visible" spotlightColor="rgba(139, 47, 209, 0.15)">
          
          {/* Left Ribbon Banner with Triangular Fold */}
          <div 
 className="absolute top-4 -left-5 bg-[#523056] rounded-r-[15px] rounded-tl-[15px] rounded-bl-none px-4 sm:px-5 z-20 shadow-lg min-w-[190px] max-w-[210px] flex flex-col justify-center items-center text-center" 
            style={{ paddingTop: '0.85rem', paddingBottom: '0.85rem' }}
          >
            <div className="absolute top-full left-0 w-0 h-0" style={{ borderTop: '18px solid #1E1B4B', borderLeft: '18px solid transparent' }}></div>
            <h3 className="text-[#f1eef1] font-semibold text-[14.5px] leading-tight mb-0.5 whitespace-nowrap relative z-10">{t.name}</h3>
            <p className="text-[#f1eef1]/90 text-[12px] font-medium whitespace-nowrap relative z-10">{t.title}</p>
          </div>

          {/* Profile Circle Avatar Top Right */}
          <div className="absolute -top-3 -right-1 w-[92px] h-[92px] rounded-full border-[3px] border-[#2B0F45] shadow-[0_0_40px_rgba(139,47,209,0.15)] overflow-hidden z-20 bg-transparent">
 <div className="w-full h-full bg-[#523056] flex items-center justify-center">
              <span className="text-[#f1eef1] font-bold text-[26px] tracking-tight">{t.initials}</span>
            </div>
          </div>

          {/* Content Body */}
          <div className="flex flex-col h-full relative z-0 justify-start gap-2" style={{ padding: '20px 24px 20px 24px', paddingTop: '116px' }}>
            <div className="flex gap-1 mb-1" style={{ paddingLeft: '28px' }}>
              {[1, 2, 3, 4, 5].map(starI => (
                <svg key={starI} className="w-4 h-4 text-[#FBBF24]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            
            <div className="relative flex items-center" style={{ height: "120px", overflow: "hidden" }}>
 <div className="absolute left-0 top-1 bottom-1 w-[3px] bg-[#523056] rounded-full shadow-[0_0_40px_rgba(139,47,209,0.15)]"></div>
              <p 
                className="text-[#ad9daf] text-[14px] sm:text-[15px] leading-[1.65] font-sans w-full" 
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
          className="w-9 h-9 rounded-full bg-transparent border border-[#705474]/15 flex items-center justify-center text-[#f1eef1] hover:bg-[#523056] transition-all active:scale-95 shrink-0"
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
 ? "w-6 bg-[#523056] shadow-[0_0_40px_rgba(139,47,209,0.15)]"
                  : "w-2 bg-theme-50/20 hover:bg-theme-50/40"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-9 h-9 rounded-full bg-transparent border border-[#705474]/15 flex items-center justify-center text-[#f1eef1] hover:bg-[#523056] transition-all active:scale-95 shrink-0"
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
                backgroundColor: isActive ? "#523056" : "rgba(18, 12, 34, 0.8)",
                color: isActive ? "#f1eef1" : "#94a3b8",
                border: isActive ? "1px solid #705474" : "1px solid rgba(139,47,209,0.25)",
                boxShadow: isActive ? "0 4px 18px rgba(139,47,209,0.5)" : "none",
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
          backgroundColor: "#26082a",
          border: "1.5px solid rgba(139,47,209,0.35)",
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
            color: "#f1eef1",
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
              <span style={{ fontSize: "14px", fontWeight: 600, color: "#f1eef1", fontFamily: "sans-serif" }}>
                {feat}
              </span>
              <span style={{ color: "#705474", fontSize: "16px", fontWeight: 700, paddingLeft: "8px" }}>
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
            backgroundColor: "#523056",
            color: "#f1eef1",
            fontWeight: 800,
            fontSize: "13.5px",
            letterSpacing: "1px",
            textTransform: "uppercase",
            textAlign: "center",
            boxShadow: "0 6px 20px rgba(139,47,209,0.45)",
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

const GlowingCard = ({ children, active, delay, className, onClick }: { children: React.ReactNode, active?: boolean, delay: number, className?: string, onClick?: (e: React.MouseEvent<HTMLDivElement>) => void }) => {
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
      className={`hero-card flex flex-col h-full ${active ? 'active' : ''} ${className || ''} ${onClick ? 'cursor-pointer' : ''}`}
      style={{
        animationDelay: `${delay}s`,
        minWidth: 0
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 rounded-[12px]"
        style={{
          opacity,
          background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, rgba(139,47,209,0.15), transparent 40%)`,
        }}
      />
      <div className="relative z-10 flex max-[374px]:flex-row min-[375px]:flex-col items-center max-[374px]:text-left min-[375px]:text-center max-[374px]:justify-start min-[375px]:justify-center gap-4 w-full h-full">
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

export default function HomePageMobile() {
  const { user, role, loading, logout } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [projects, setProjects] = useState<any[]>([])

  // Fetch projects for the Work section
  useEffect(() => {
    fetch("/api/projects")
      .then(r => r.json())
      .then(d => { 
        if (d.projects) {
          setProjects(d.projects);
          setTimeout(() => {
            const savedScroll = sessionStorage.getItem("homeMobileScroll");
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

  // Scroll listener for nav blur
  useEffect(() => {
    const heroSection = document.querySelector("#hero");
    if (!heroSection) return;

    const navObserver = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      { rootMargin: "-50px 0px 0px 0px", threshold: 1.0 }
    );
    
    navObserver.observe(heroSection);
    return () => navObserver.disconnect();
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
    
    // Capture-phase click listener to save scroll before Next.js client-side routing
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link && link.href) {
        try {
          const url = new URL(link.href);
          if (url.origin === window.location.origin && url.pathname !== window.location.pathname) {
            sessionStorage.setItem("homeMobileScroll", window.scrollY.toString());
          }
        } catch (err) {}
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
    const heroSection = document.querySelector("#hero");
    if (!heroSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setIsScrolledDown(!entries[0].isIntersecting);
      },
      {
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    observer.observe(heroSection);
    return () => observer.disconnect();
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
 className="fixed bottom-6 right-5 z-40 w-11 h-11 rounded-full bg-[#523056] p-[1.5px] shadow-[0_0_40px_rgba(139,47,209,0.15)] hover:shadow-[0_0_40px_rgba(139,47,209,0.15)] active:scale-90 transition-all duration-300 flex items-center justify-center cursor-pointer"
    >
      <div className="w-full h-full rounded-full bg-transparent flex items-center justify-center transition-colors hover:bg-transparent">
        {isScrolledDown ? (
          <ChevronUp className="w-5 h-5 text-[#f1eef1] animate-bounce" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[#f1eef1] animate-bounce" />
        )}
      </div>
    </button>
  );
}

  const props = { user, role, loading, logout, scrolled }

  return (
    <main className="bg-transparent text-foreground font-sans selection:bg-theme-900 selection:text-[#f1eef1] overflow-x-hidden">
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
      <div className="font-serif text-2xl font-medium tracking-tight italic flex items-center gap-4 text-[#f1eef1] flex-1">
        <div style={{ width: '36px', height: '36px', backgroundcolor: "#f1eef1", borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
          <img src="/logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(1.2)' }} />
        </div>
        <Link href="#">Devoxa Technologies</Link>
      </div>
      
      {/* 2nd Part: Capsule Navigation */}
      <div className="hidden md:flex items-center rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] bg-[#0A0714] shadow-lg">
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
          hoveredPilltextColor="#f1eef1"
          pillTextColor="#9ca3af"
          initialLoadAnimation={false}
        />
      </div>

      {/* 3rd Part: Auth & CTA */}
      <div className="flex flex-col md:flex-row items-center justify-end gap-5 flex-1">
        {!loading && user ? (
          <>
            <Link href={`/dashboard/${role}`} className="text-[10px] font-mono uppercase tracking-widest text-neutral-300 hover:text-[#f1eef1] transition-colors">
              Dashboard
            </Link>
            <button onClick={logout} className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 hover:text-[#f1eef1] transition-colors">
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="text-[10px] font-mono uppercase tracking-widest text-neutral-300 hover:text-[#f1eef1] transition-colors">
            Login
          </Link>
        )}
        <a className="border border-theme-50/30 px-5 py-2.5 text-[10px] font-mono uppercase tracking-widest text-[#f1eef1] hover:bg-theme-50 hover:text-theme-900 transition-all hidden md:block" href="#cta-banner">
          Book a call —
        </a>
      </div>
    </nav>
  )
}

function MobileNav({ user, role, loading, logout, scrolled }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (
        menuRef.current && !menuRef.current.contains(target) &&
        popoverRef.current && !popoverRef.current.contains(target)
      ) {
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
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
      <nav className={`w-full transition-all duration-300 ${
        scrolled || isOpen 
          ? 'bg-[#06040d]/95 backdrop-blur-2xl border-b border-[#705474]/30 shadow-[0_0_40px_rgba(139,47,209,0.15)]' 
          : 'bg-[#06040d]/80 backdrop-blur-xl border-b border-[#705474]/15 shadow-md'
      } px-5 py-3 flex justify-between items-center relative`}>
        
        {/* Brand Logo with Live Status Dot */}
        <Link href="#" className="flex items-center gap-3 group">
          <div className="relative">
 <div className="w-8 h-8 rounded-xl bg-[#523056] p-[1.5px] shadow-[0_0_40px_rgba(139,47,209,0.15)] shrink-0">
              <div className="w-full h-full bg-transparent rounded-[10px] flex items-center justify-center p-1.5 overflow-hidden">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain transform group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#06040d] shadow-[0_0_8px_#34d399]"></span>
          </div>
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-[16px] font-extrabold tracking-tight text-[#f1eef1] leading-tight">Devoxa</span>
            </div>
            <span className="text-[9px] font-mono font-semibold tracking-wider text-[#f1eef1]/60 uppercase">Technologies</span>
          </div>
        </Link>

        {/* Circular Cyber Trigger Button */}
        <div className="relative flex items-center gap-2" ref={menuRef}>
          <button 
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu" 
 className="w-11 h-11 rounded-full bg-[#523056] p-[1.5px] shadow-[0_0_40px_rgba(139,47,209,0.15)] transition-all flex items-center justify-center cursor-pointer relative"
          >
            <span className="absolute -inset-2"></span>
            <div className="w-full h-full rounded-full bg-transparent flex items-center justify-center transition-colors hover:bg-transparent relative z-10">
              {isOpen ? (
                <X className="w-5 h-5 text-[#f1eef1]" />
              ) : (
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-[#705474] animate-pulse"></div>
                  <div className="w-1 h-1 rounded-full bg-theme-50"></div>
                  <div className="w-1 h-1 rounded-full bg-[#705474] animate-pulse"></div>
                </div>
              )}
            </div>
          </button>

        </div>
      </nav>
    </header>
    
    {/* Sleek Sheet Popover Menu - MOVED OUTSIDE HEADER FOR SAFARI COMPATIBILITY */}
    {isOpen && (
      <div ref={popoverRef} className="fixed top-[76px] right-4 w-64 bg-[#0A0714] border border-[#705474]/50 rounded-2xl p-4 shadow-[0_8px_40px_rgba(0,0,0,0.8)] z-[99999] flex flex-col gap-1.5 text-left opacity-100 visible">
        <div className="px-2 py-1 flex items-center justify-between text-[10px] font-mono font-bold tracking-widest text-[#705474] uppercase border-b border-[#705474]/15 mb-1 pb-2">
          <span>NAVIGATION // CATALOGUE</span>
          <span className="w-2 h-2 rounded-full bg-[#523056] animate-ping"></span>
        </div>

        {navLinks.map((link, idx) => {
          const IconComponent = link.icon;
          return (
            <button
              key={link.href}
              type="button"
              onClick={(e) => handleLinkClick(e, link.href)}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#f1eef1] hover:text-[#f1eef1] bg-transparent hover:bg-[#523056]/40 active:scale-[0.98] transition-all flex items-center justify-between cursor-pointer border border-theme-50/5 hover:border-[#705474]/40 group text-left"
            >
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-[#705474]/80 font-bold">0{idx + 1}</span>
                <div className="w-6 h-6 rounded-lg bg-[#523056] border border-[#705474]/30 flex items-center justify-center text-[#705474] group-hover:text-[#f1eef1] transition-colors">
                  <IconComponent className="w-3.5 h-3.5" />
                </div>
                <span>{link.label}</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#705474] group-hover:translate-x-1 transition-transform" />
            </button>
          );
        })}

        <div className="h-px bg-theme-50/10 my-1" />

        {!loading && user ? (
          <>
            <Link
              href={`/dashboard/${role}`}
              onClick={() => setIsOpen(false)}
              className="px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#705474] hover:bg-[#523056] transition-all flex items-center justify-between bg-transparent border border-[#705474]/30"
            >
              <span>Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#705474]" />
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
            className="px-3.5 py-2.5 rounded-xl text-xs font-extrabold tracking-wider uppercase text-[#f1eef1] bg-[#523056] shadow-[0_0_40px_rgba(139,47,209,0.15)] hover:shadow-[0_0_40px_rgba(139,47,209,0.15)] transition-all text-center border border-[#705474]/40 mt-1 flex items-center justify-center gap-2"
          >
            <span>Schedule Consultation / Login</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    )}
    </>
  )
}

function MainContent({ projects, onOpenModal }: { projects: any[], onOpenModal: () => void }) {
  const [activeService, setActiveService] = useState<ServiceDetails | null>(null)
  const [activeCardRect, setActiveCardRect] = useState<DOMRect | null>(null)

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>, serviceKey: string) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    
    // Check if card is comfortably visible in the viewport
    const isVisible = rect.top >= 100 && rect.bottom <= (window.innerHeight - 100);
    
    if (!isVisible) {
      // Scroll smoothly so the card is centered
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Wait for the smooth scroll to finish before opening modal
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
    <>
      <section id="hero" className="nx vx-float pt-24 md:pt-32 relative" style={{ height: "auto", minHeight: "auto" }}>
        <div className="absolute inset-0 z-0 bg-black/[0.65]" />
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, opacity: 1, pointerEvents: 'none', background: 'radial-gradient(circle at center, rgba(82, 48, 86, 0.4) 0%, transparent 70%)' }}>
        </div>
        <div className="nx-inner" style={{ minHeight: "auto", alignItems: "flex-start", display: "flex", flexDirection: "column", justifyContent: "flex-start", padding: "140px 24px 40px 24px" }}>
          <div style={{ flexShrink: 0, width: "100%", maxWidth: "100%", textAlign: "left", position: "relative", zIndex: 10 }}>
            
            {/* Eyebrow */}
            <div style={{ display: "inline-flex", marginBottom: "24px" }}>
              <span style={{ backgroundColor: "#523056", color: "#fff", padding: "6px 12px", fontFamily: "monospace", fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>DIGITAL</span>
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
              borderLeft: "2px solid #523056", 
              paddingLeft: "16px", 
              marginBottom: "40px"
            }}>
              <p style={{ 
                fontSize: "15px", 
                color: "#ad9daf", 
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
                  background: "linear-gradient(90deg, #523056, #9333ea)", 
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
          
        </div>
      </section>

      <div style={{ position: "relative", background: "transparent", backgroundColor: undefined, overflow: "visible" }}>
        {/* Shared Light Pillar Background replaced with CSS for performance */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.15, pointerEvents: 'none', background: 'radial-gradient(ellipse at center top, rgba(255, 159, 252, 0.5) 0%, transparent 70%)' }}>
        </div>

        <div className="flex justify-center w-full relative z-20 mb-16" style={{ marginTop: "10px", zIndex: 10, padding: "0 24px" }}>
          <div className="grid grid-cols-1 min-[375px]:grid-cols-2 gap-3 sm:gap-4 w-full max-w-[400px] sm:max-w-md">
            <GlowingCard delay={0.1} onClick={(e) => handleCardClick(e, "Web App Dev")}>
              <div className="hc-icon shrink-0"><Code2 size={28} strokeWidth={1.5} /></div>
              <div className="flex flex-col gap-1">
                <h4 className="hc-title !m-0">Web App Dev</h4>
                <p className="hc-desc !m-0">Custom-built, scalable web applications</p>
              </div>
            </GlowingCard>
            <GlowingCard delay={0.2} onClick={(e) => handleCardClick(e, "Automation")}>
              <div className="hc-icon shrink-0"><Zap size={28} strokeWidth={1.5} /></div>
              <div className="flex flex-col gap-1">
                <h4 className="hc-title !m-0">Automation</h4>
                <p className="hc-desc !m-0">Streamline workflows and cut manual work</p>
              </div>
            </GlowingCard>
            <GlowingCard active delay={0.3} className="min-[375px]:col-span-2" onClick={(e) => handleCardClick(e, "IT Consultation")}>
              <div className="hc-icon shrink-0"><Layers size={28} strokeWidth={1.5} /></div>
              <div className="flex flex-col gap-1">
                <h4 className="hc-title !m-0">IT Consultation</h4>
                <p className="hc-desc !m-0">Strategic guidance for your tech stack</p>
              </div>
            </GlowingCard>
            <GlowingCard delay={0.4} onClick={(e) => handleCardClick(e, "CRM CMS")}>
              <div className="hc-icon shrink-0"><BarChart3 size={28} strokeWidth={1.5} /></div>
              <div className="flex flex-col gap-1">
                <h4 className="hc-title !m-0">CRM CMS</h4>
                <p className="hc-desc !m-0">Manage customers and content in one place</p>
              </div>
            </GlowingCard>
            <GlowingCard delay={0.5} onClick={(e) => handleCardClick(e, "UI UX Branding")}>
              <div className="hc-icon shrink-0"><Search size={28} strokeWidth={1.5} /></div>
              <div className="flex flex-col gap-1">
                <h4 className="hc-title !m-0">UI UX Branding</h4>
                <p className="hc-desc !m-0">Interfaces that look sharp and convert</p>
              </div>
            </GlowingCard>
          </div>
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
      <section id="solutions" className="scroll-mt-32 light-sec transparent-bg vx-float" style={{ padding: "0 0 36px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "-10%", width: "40%", height: "60%", background: "radial-gradient(circle, rgba(139,47,209,0.08) 0%, rgba(0,0,0,0) 70%)", filter: "blur(60px)", pointerEvents: "none" }}></div>
        <div className="wrap px-4 md:px-8" style={{ padding: "0 32px", boxSizing: "border-box" }}>
          <div className="sol-split reveal in flex flex-col items-center gap-4">
            <div className="sol-text-modern w-full max-w-full">
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px", background: "rgba(139,47,209,0.1)", borderRadius: "999px", border: "1px solid rgba(139,47,209,0.2)", marginBottom: "16px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#705474", boxShadow: "0 0 8px #705474" }}></div>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#705474", letterSpacing: "1px", textTransform: "uppercase" }}>Why Choose Us</span>
              </div>
              <h2 style={{ fontSize: "clamp(28px, 8vw, 38px)", fontWeight: 800, lineHeight: 1.15, color: "#fff", marginBottom: "16px", letterSpacing: "-0.5px" }}>
                Powerful IT Solutions for <span style={{ background: "linear-gradient(90deg, #523056, #705474)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Modern Businesses</span>
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
                    <div style={{ width: "26px", height: "26px", borderRadius: "8px", background: "linear-gradient(135deg, rgba(139,47,209,0.2), rgba(139,47,209,0.05))", border: "1px solid rgba(139,47,209,0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#705474", boxShadow: "0 4px 12px rgba(139,47,209,0.1)", flexShrink: 0 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="sol-img-modern w-full" style={{ marginTop: "24px" }}>
              <div className="relative w-[90%] mx-auto h-[380px] flex items-center justify-center group overflow-visible pb-4">
                {/* Images */}
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80"
                  alt="Code"
                  className="absolute top-0 left-0 w-[48%] h-[48%] object-cover shadow-2xl z-10"
                  style={{ borderRadius: "24px" }}
                />
                <img
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80"
                  alt="AI Tech"
                  className="absolute bottom-0 left-0 w-[48%] h-[48%] object-cover shadow-2xl z-10"
                  style={{ borderRadius: "24px" }}
                />
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
                  alt="Design Process"
                  className="absolute top-[5%] right-0 w-[48%] h-[90%] object-cover shadow-2xl z-20"
                  style={{ borderRadius: "24px" }}
                />

                {/* Center Spinning Badge */}
                <div className="absolute z-30 flex items-center justify-center w-[160px] h-[160px] rounded-full bg-[#f1eef1] shadow-[0_20px_40px_rgba(0,0,0,0.4)] left-[48%] top-[50%]" style={{ transform: "translate(-50%, -50%) scale(0.65)" }}>
                  <svg viewBox="0 0 100 100" className="absolute w-[140px] h-[140px] animate-[spin_15s_linear_infinite]">
                    <path id="circlePathMobileSolutions" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                    <text className="text-[9.5px] font-bold uppercase fill-black tracking-[3px]">
                      <textPath href="#circlePathMobileSolutions" startOffset="0%" textLength="220" lengthAdjust="spacing">
                        Devoxa Technologies — Digital Experiences
                      </textPath>
                    </text>
                  </svg>
                  <div className="absolute w-[44px] h-[44px] bg-[#111] rounded-full flex items-center justify-center shadow-inner">
                    <span className="text-[#f1eef1] font-bold text-xl tracking-tighter">D</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-32 vx-float" style={{ background: "transparent", padding: "60px 0 40px", position: "relative", overflow: "hidden" }}>
        
        <div className="absolute inset-0 z-0 bg-black/50" />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.05, pointerEvents: 'none', background: 'radial-gradient(circle at center, #523056 0%, transparent 60%)' }}>
        </div>

        <div className="wrap px-4 md:px-8" style={{ padding: "0 32px", boxSizing: "border-box", position: "relative", zIndex: 1 }}>
          <div className="section-head reveal in flex flex-col items-center" style={{ margin: "0 auto 40px", textAlign: "center" }}>
            <span className="eyebrow" style={{ margin: "0 0 16px 0" }}>Our Process</span>
            <h2 style={{ textAlign: "center", fontSize: "clamp(26px, 7vw, 36px)", lineHeight: 1.2, marginBottom: "16px" }}>How Professional IT Services<br />Can Drive <span className="font-stencilia uppercase" style={{ background: "linear-gradient(90deg,#523056,#8f7992)", WebkitBackgroundClip: "text", color: "transparent" }}>Success</span></h2>
            <p style={{ margin: "0 auto", maxWidth: "600px", fontSize: "clamp(15px, 4vw, 17px)" }}>From initial consultation to ongoing optimization, our streamlined process ensures every project delivers measurable business value.</p>
          </div>

          <AnimatedProcessWorkflow />
        </div>
      </section>

      {/* Recent Projects */}
      <section id="recent-projects" className="scroll-mt-32 transparent-bg vx-float" style={{ padding: "40px 0 30px", position: "relative", zIndex: 10 }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.15, pointerEvents: 'none', background: 'radial-gradient(circle at 50% 50%, #523056 0%, transparent 70%)' }}>
        </div>
        <div className="wrap" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "24px", position: "relative" }}>
            <div className="section-head reveal in" style={{ margin: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-transparent border border-[#705474]/15 bg-[#0A0714] overflow-hidden mb-4 transition-all duration-300 hover:bg-theme-50/10 hover:border-[#705474]/30">
 <div className="absolute inset-0 bg-[#523056]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Layers className="w-4 h-4 text-[#705474] group-hover:text-[#705474] transition-colors" />
                <span className="text-xs font-bold text-[#f1eef1] tracking-[0.15em] uppercase">Our Portfolio</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-bold text-[#f1eef1] mb-3 tracking-tight leading-[1.15]">
                Crafting Digital <br className="hidden md:block" />
 <span className="font-stencilia uppercase text-theme-400 animate-gradient bg-300%">Masterpieces</span>
              </h2>
              
              <p className="text-[#ad9daf] text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-light">
                Explore our curated collection of next-generation digital experiences built for growth.
              </p>
            </div>
          </div>

          <div className="reveal in w-full flex justify-center">
            <MobileProjectCarousel projects={projects} />
          </div>
        </div>
      </section>

      {/* Pricing / Service Packages */}
      <section 
        id="pricing" 
        className="scroll-mt-32 light-sec transparent-bg vx-float" 
        style={{ 
          padding: "60px 0", 
          position: "relative", 
          overflow: "hidden"
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.2, pointerEvents: 'none', background: 'radial-gradient(circle at top center, rgba(198, 187, 199, 0.6) 0%, transparent 60%)' }}>
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
                border: "1px solid rgba(139,47,209,0.35)",
                color: "#705474",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                marginBottom: "16px"
              }}
            >
              <span style={{ color: "#705474", fontSize: "10px" }}>◆</span> PARTNERSHIP MODELS
            </div>
            <h2 style={{ fontSize: "clamp(22px, 6.5vw, 28px)", fontWeight: 900, color: "#f1eef1", marginBottom: "8px", letterSpacing: "-0.5px", whiteSpace: "nowrap" }}>
              SERVICE <span className="font-stencilia uppercase">PACKAGES</span>
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: "1.6", fontWeight: 400, maxWidth: "440px", margin: 0 }}>
              Flexible engagement models designed to scale with your business needs and digital ambitions.
            </p>
          </div>

          <div className="reveal in w-full">
            <MobileServicePackages onOpenModal={onOpenModal} />
          </div>
        </div>
      </section>

      {/* Industries */}
      <section id="industries" className="scroll-mt-32 light-sec transparent-bg vx-float" style={{ padding: "60px 0 30px 0", position: "relative", overflow: "hidden" }}>
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <div className="section-head reveal in flex flex-col items-center text-center mb-8">
            <div className="group relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-transparent border border-[#705474]/15 bg-[#0A0714] overflow-hidden mb-4 transition-all duration-300 hover:bg-theme-50/10 hover:border-[#705474]/30 shadow-[0_0_40px_rgba(139,47,209,0.15)]">
 <div className="absolute inset-0 bg-[#523056]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Building2 className="w-4 h-4 text-[#705474] group-hover:text-[#705474] transition-colors" />
              <span className="text-xs font-bold text-[#f1eef1] tracking-[0.15em] uppercase">Industries</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-theme-50 mb-3 tracking-tight leading-[1.15] text-center">
 Industries We <span className="font-stencilia uppercase text-theme-400">Serve</span>
            </h2>

            <p className="text-[#ad9daf] text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-light text-center">
              Our custom IT solutions empower forward-thinking organizations to <span className="text-[#f1eef1] font-medium">innovate</span>, <span className="text-[#705474] font-medium">scale seamlessly</span>, and dominate in today's rapidly evolving digital landscape.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 px-2 sm:px-4 w-full mt-6">
            
            {/* Card 1 */}
            <div className="relative w-full aspect-[4/5] rounded-[16px] overflow-hidden shadow-lg group border border-[#705474]/15">
              <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=600&q=80" alt="Technology & SaaS" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0714] via-[#0A0714]/60 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 p-3 flex flex-col justify-end">
                <div className="text-white text-[11px] sm:text-xs font-bold mb-1 leading-tight">Technology & SaaS</div>
                <div className="text-white/80 text-[9px] leading-tight mb-2 line-clamp-2">Scalable platforms built for rapid growth and enterprise performance.</div>
                <div className="flex flex-wrap gap-1 mb-2">
                  <span className="inline-flex items-center gap-0.5 bg-white/10 border border-white/20 text-white text-[7px] font-medium px-1.5 py-0.5 rounded-full"><span className="text-[7px] text-[#FBBF24]">★</span>4.9</span>
                  <span className="inline-flex items-center bg-white/10 border border-white/20 text-white text-[7px] font-medium px-1.5 py-0.5 rounded-full">Cloud & SaaS</span>
                </div>
                <button className="w-full bg-white text-[#111] text-[9px] font-bold py-1.5 rounded-[8px] transition-colors hover:bg-gray-200">Explore Solutions</button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative w-full aspect-[4/5] rounded-[16px] overflow-hidden shadow-lg group border border-[#705474]/15">
              <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80" alt="Finance & Banking" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0714] via-[#0A0714]/60 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 p-3 flex flex-col justify-end">
                <div className="text-white text-[11px] sm:text-xs font-bold mb-1 leading-tight">Finance & Banking</div>
                <div className="text-white/80 text-[9px] leading-tight mb-2 line-clamp-2">Secure systems for regulated industries and modern fintech.</div>
                <div className="flex flex-wrap gap-1 mb-2">
                  <span className="inline-flex items-center gap-0.5 bg-white/10 border border-white/20 text-white text-[7px] font-medium px-1.5 py-0.5 rounded-full"><span className="text-[7px] text-[#FBBF24]">★</span>4.8</span>
                  <span className="inline-flex items-center bg-white/10 border border-white/20 text-white text-[7px] font-medium px-1.5 py-0.5 rounded-full">Fintech</span>
                </div>
                <button className="w-full bg-white text-[#111] text-[9px] font-bold py-1.5 rounded-[8px] transition-colors hover:bg-gray-200">Explore Solutions</button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative w-full aspect-[4/5] rounded-[16px] overflow-hidden shadow-lg group border border-[#705474]/15">
              <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80" alt="Healthcare" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0714] via-[#0A0714]/60 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 p-3 flex flex-col justify-end">
                <div className="text-white text-[11px] sm:text-xs font-bold mb-1 leading-tight">Healthcare</div>
                <div className="text-white/80 text-[9px] leading-tight mb-2 line-clamp-2">Compliant, patient-first digital tools and data management.</div>
                <div className="flex flex-wrap gap-1 mb-2">
                  <span className="inline-flex items-center gap-0.5 bg-white/10 border border-white/20 text-white text-[7px] font-medium px-1.5 py-0.5 rounded-full"><span className="text-[7px] text-[#FBBF24]">★</span>5.0</span>
                  <span className="inline-flex items-center bg-white/10 border border-white/20 text-white text-[7px] font-medium px-1.5 py-0.5 rounded-full">HIPAA</span>
                </div>
                <button className="w-full bg-white text-[#111] text-[9px] font-bold py-1.5 rounded-[8px] transition-colors hover:bg-gray-200">Explore Solutions</button>
              </div>
            </div>

            {/* Card 4 */}
            <div className="relative w-full aspect-[4/5] rounded-[16px] overflow-hidden shadow-lg group border border-[#705474]/15">
              <img src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=600&q=80" alt="Retail & E-commerce" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0714] via-[#0A0714]/60 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 p-3 flex flex-col justify-end">
                <div className="text-white text-[11px] sm:text-xs font-bold mb-1 leading-tight">Retail & E-commerce</div>
                <div className="text-white/80 text-[9px] leading-tight mb-2 line-clamp-2">High-performance storefronts that convert and scale globally.</div>
                <div className="flex flex-wrap gap-1 mb-2">
                  <span className="inline-flex items-center gap-0.5 bg-white/10 border border-white/20 text-white text-[7px] font-medium px-1.5 py-0.5 rounded-full"><span className="text-[7px] text-[#FBBF24]">★</span>4.7</span>
                  <span className="inline-flex items-center bg-white/10 border border-white/20 text-white text-[7px] font-medium px-1.5 py-0.5 rounded-full">B2B/B2C</span>
                </div>
                <button className="w-full bg-white text-[#111] text-[9px] font-bold py-1.5 rounded-[8px] transition-colors hover:bg-gray-200">Explore Solutions</button>
              </div>
            </div>

            {/* Card 5 */}
            <div className="relative w-full aspect-[4/5] rounded-[16px] overflow-hidden shadow-lg group border border-[#705474]/15">
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80" alt="Education" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0714] via-[#0A0714]/60 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 p-3 flex flex-col justify-end">
                <div className="text-white text-[11px] sm:text-xs font-bold mb-1 leading-tight">Education</div>
                <div className="text-white/80 text-[9px] leading-tight mb-2 line-clamp-2">Interactive learning platforms built to engage and educate.</div>
                <div className="flex flex-wrap gap-1 mb-2">
                  <span className="inline-flex items-center gap-0.5 bg-white/10 border border-white/20 text-white text-[7px] font-medium px-1.5 py-0.5 rounded-full"><span className="text-[7px] text-[#FBBF24]">★</span>4.8</span>
                  <span className="inline-flex items-center bg-white/10 border border-white/20 text-white text-[7px] font-medium px-1.5 py-0.5 rounded-full">EdTech</span>
                </div>
                <button className="w-full bg-white text-[#111] text-[9px] font-bold py-1.5 rounded-[8px] transition-colors hover:bg-gray-200">Explore Solutions</button>
              </div>
            </div>

            {/* Card 6 */}
            <div className="relative w-full aspect-[4/5] rounded-[16px] overflow-hidden shadow-lg group border border-[#705474]/15">
              <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80" alt="Manufacturing" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0714] via-[#0A0714]/60 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 p-3 flex flex-col justify-end">
                <div className="text-white text-[11px] sm:text-xs font-bold mb-1 leading-tight">Manufacturing</div>
                <div className="text-white/80 text-[9px] leading-tight mb-2 line-clamp-2">Automation and data insights for modern production lines.</div>
                <div className="flex flex-wrap gap-1 mb-2">
                  <span className="inline-flex items-center gap-0.5 bg-white/10 border border-white/20 text-white text-[7px] font-medium px-1.5 py-0.5 rounded-full"><span className="text-[7px] text-[#FBBF24]">★</span>4.9</span>
                  <span className="inline-flex items-center bg-white/10 border border-white/20 text-white text-[7px] font-medium px-1.5 py-0.5 rounded-full">Industry 4.0</span>
                </div>
                <button className="w-full bg-white text-[#111] text-[9px] font-bold py-1.5 rounded-[8px] transition-colors hover:bg-gray-200">Explore Solutions</button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="scroll-mt-32 testimonials-section vx-float relative z-10 py-24 overflow-hidden" style={{ background: "transparent" }}>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="section-head reveal in relative z-10 mb-10 flex flex-col items-center text-center w-full">
            <span className="eyebrow" style={{ margin: '0 auto 16px', display: 'inline-block' }}>What Our Clients Say</span>
            <h2 style={{ margin: '0 auto 16px', textAlign: 'center', fontSize: 'clamp(26px, 6vw, 36px)', lineHeight: 1.15 }}>Trusted by businesses across <span className="font-stencilia uppercase">India</span></h2>
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
      <section id="faq" className="scroll-mt-32 vx-float relative" style={{ background: "transparent", paddingTop: "16px", paddingBottom: "60px", overflow: "hidden" }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.1, pointerEvents: 'none', background: 'linear-gradient(to bottom, rgba(139,47,209,0.1) 0%, transparent 100%)' }}>
        </div>
        <div className="wrap px-4 relative z-10">
          <div className="flex flex-col items-center justify-center text-center mb-16">
            <span className="eyebrow inline-block mb-3" style={{ margin: "0 0 12px 0" }}>Questions</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter leading-[1.1] drop-shadow-lg mb-3">
              <ShinyText text="Common" color="#f1eef1" shineColor="#705474" speed={3} />{' '}
              <span className="font-stencilia uppercase"><ShinyText text="Questions" color="#f1eef1" shineColor="#705474" speed={3} /></span>
            </h2>
            <p className="text-[#ad9daf] font-light max-w-md mx-auto text-xs sm:text-base leading-relaxed">
              Everything you need to know about our approach, timelines, and how we deliver exceptional results.
            </p>
          </div>
          <div className="flex justify-center w-full">
            <div className="max-w-4xl w-full">
              <FAQAccordion />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section id="cta-banner" className="scroll-mt-32 relative py-14 sm:py-20 overflow-hidden border-y border-[rgba(255,255,255,0.05)] bg-transparent px-4 md:px-8 min-h-[340px]">
        
        <div className="absolute inset-0 z-0 bg-black/50" />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.2, pointerEvents: 'none', background: 'radial-gradient(circle at center, rgba(139, 47, 209, 0.4) 0%, transparent 80%)' }}>
        </div>
        <div className="wrap relative z-10 w-full">
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center w-full gap-4">
            <span className="text-[#705474] font-mono text-xs uppercase tracking-[0.2em] font-semibold drop-shadow-[0_0_40px_rgba(139,47,209,0.15)]">Ready to start?</span>
            
            {/* Fixed Height Wrapper to Prevent Layout Fluctuation */}
            <div className="min-h-[72px] sm:min-h-[90px] flex items-center justify-center w-full">
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#f1eef1] leading-[1.2]">
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
            
            <p className="text-[#f1eef1]/70 text-xs sm:text-base max-w-lg mx-auto leading-relaxed font-light">
              Join hundreds of forward-thinking companies that have accelerated their growth with our professional IT services. Let's build something extraordinary together.
            </p>
            
            <button className="nx-cta w-full sm:w-auto mt-2 text-center flex items-center justify-center" onClick={onOpenModal}>
              Schedule a Free Consultation
            </button>
          </div>
        </div>
      </section>

      <FooterMobile />

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
