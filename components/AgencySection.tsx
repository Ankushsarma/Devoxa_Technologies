"use client"

import React, { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"

export default function AgencySection({ onOpenModal }: { onOpenModal: () => void }) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const circles = [
    { type: "image", src: "/tpl-saas-software.jpg", color: "#7c3aed", objPos: "left center" },
    { type: "image", src: "/dashboard_mockup_1.png", color: "#a78bfa", objPos: "center" },
    { type: "image", src: "/tpl-automation-saas.jpg", color: "#8b5cf6", objPos: "left center" },
    { type: "image", src: "/task_app_mockup.png", color: "#7c3aed", objPos: "center" },
    
    { type: "image", src: "/ai_platform_mockup.png", color: "#8b5cf6", objPos: "center" },
    { type: "image", src: "/tpl-task-management.jpg", color: "#a78bfa", objPos: "center" },
    { type: "color", color: "#7c3aed" },
    { type: "image", src: "/tpl-fintech-saas.jpg", color: "#8b5cf6", objPos: "left center" },
    
    { type: "image", src: "/tpl-automation-saas.jpg", color: "#a78bfa", objPos: "left center" },
    { type: "color", color: "#8b5cf6" },
    { type: "image", src: "/tpl-saas-software.jpg", color: "#7c3aed", objPos: "left center" },
    { type: "color", color: "#a78bfa" },
  ]

  return (
    <section className="vx-float agency-section-wrapper" style={{ padding: "clamp(80px, 12vh, 160px) 0" }}>
      <div className="wrap" style={{ position: "relative", zIndex: 1, maxWidth: "1300px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "60px" }}>
          
          {/* Left Text Column */}
          <div style={{ flex: "1 1 400px", maxWidth: "clamp(480px, 45vw, 680px)", paddingLeft: "clamp(20px, 5vw, 80px)", marginTop: "clamp(-60px, -5vh, -20px)" }}>
            
            {/* Eyebrow */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "clamp(16px, 2.5vh, 24px)", position: "relative" }}>
              <div style={{ position: "absolute", left: "-10px", top: "-5px", width: "40px", height: "30px", backgroundColor: "#7c3aed", zIndex: -1 }}></div>
              <span style={{ fontFamily: "monospace", fontSize: "clamp(10px, 0.9vw, 12px)", fontWeight: 700, letterSpacing: "2px", color: "#fff", textTransform: "uppercase" }}>
                ABOUT US
              </span>
            </div>

            {/* Headline */}
            <h2 style={{ 
              fontFamily: "var(--font-mono, monospace)", 
              fontSize: "clamp(24px, 3.5vw, 46px)", 
              fontWeight: 700, 
              color: "#fff", 
              lineHeight: 1.3, 
              letterSpacing: "clamp(1px, 0.2vw, 4px)", 
              marginBottom: "clamp(32px, 5vh, 48px)",
              textTransform: "uppercase"
            }}>
              <span style={{ whiteSpace: "nowrap" }}>We are more</span><br />
              <span style={{ whiteSpace: "nowrap" }}>than an agency.</span>
            </h2>
            
            {/* Subtext */}
            <div style={{ 
              borderLeft: "2px solid rgba(255,255,255,0.4)", 
              paddingLeft: "clamp(16px, 1.5vw, 24px)", 
              marginBottom: "clamp(48px, 7vh, 72px)"
            }}>
              <p style={{ 
                fontSize: "clamp(13px, 1.1vw, 15px)", 
                color: "#8981A6", 
                lineHeight: 2.1, 
                maxWidth: "clamp(350px, 32vw, 440px)",
                fontWeight: 400
              }}>
                We are dedicated to providing the <span style={{ color: "#a78bfa", fontWeight: 600 }}>best solutions</span> at the <span style={{ color: "#a78bfa", fontWeight: 600 }}>best price</span>. Experience a clear, consistent, and streamlined digital journey from start to finish.
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
                Let's chat <ArrowRight size={16} />
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
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}
              >
                Our services <ArrowRight size={16} />
              </a>
            </div>
          </div>
          
          {/* Right Circles Grid */}
          <div style={{ flex: "1 1 500px" }}>
            <style dangerouslySetInnerHTML={{__html: `
              @media (max-width: 768px) {
                .agency-section-wrapper {
                  padding: 80px 0 20px 0 !important;
                }
                .agency-circles-grid {
                  grid-template-columns: repeat(3, 1fr) !important;
                  max-width: 320px !important;
                  margin: 0 auto !important;
                  gap: 24px 12px !important;
                }
                .agency-circle-item:nth-child(n+7) {
                  display: none;
                }
              }
              @keyframes pulse-fade {
                0%, 100% { opacity: 0.4; }
                50% { opacity: 1; }
              }
              @keyframes circle-breathe {
                0%, 100% { transform: translateY(0) scale(1); }
                50% { transform: translateY(-10px) scale(1.03); }
              }
              .circle-image {
                opacity: 0;
                transition: opacity 0.4s ease-in-out, transform 0.4s ease;
                transform: scale(1);
              }
              .agency-circle-item:hover .circle-image {
                opacity: 1 !important;
                transform: scale(1.05);
              }
            `}} />
            <div 
              style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(4, 1fr)", 
                gap: "16px",
              }}
              className="agency-circles-grid"
            >
              {circles.map((circle, index) => (
                <div 
                  key={index} 
                  className="agency-circle-item group"
                  style={{ 
                    aspectRatio: "1/1", 
                    borderRadius: "50%", 
                    backgroundColor: circle.color,
                    position: "relative",
                    overflow: "hidden",
                    cursor: circle.type === "image" ? "pointer" : "default",
                    animation: mounted ? `circle-breathe ${4 + (index % 3)}s ease-in-out infinite ${(index * 0.2)}s` : 'none',
                    boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)"
                  }}
                >
                  {circle.type === "image" && (
                    <img 
                      src={circle.src} 
                      alt="" 
                      className="circle-image"
                      style={{ 
                        width: "100%", 
                        height: "100%", 
                        objectFit: "cover",
                        objectPosition: circle.objPos || "center",
                        position: "absolute",
                        inset: 0,
                        animation: mounted ? `pulse-fade ${4 + (index % 3)}s infinite alternate ease-in-out ${(index * 0.5)}s` : 'none'
                      }} 
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
