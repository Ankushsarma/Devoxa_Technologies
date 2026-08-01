"use client"

import React, { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"

export default function AgencySection({ onOpenModal }: { onOpenModal: () => void }) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const circles = [
    { type: "image", src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=300&q=80", color: "#5227FF", objPos: "center" },
    { type: "image", src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=300&q=80", color: "#FF9FFC", objPos: "center" },
    { type: "image", src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=300&q=80", color: "#5227FF", objPos: "center" },
    { type: "image", src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=300&q=80", color: "#5227FF", objPos: "center" },
    
    { type: "image", src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=300&q=80", color: "#5227FF", objPos: "center" },
    { type: "image", src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=300&q=80", color: "#FF9FFC", objPos: "center" },
    { type: "image", src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=300&q=80", color: "#5227FF", objPos: "center" },
    { type: "image", src: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=300&q=80", color: "#5227FF", objPos: "center" },
    
    { type: "image", src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=300&q=80", color: "#FF9FFC", objPos: "center" },
    { type: "image", src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=300&q=80", color: "#5227FF", objPos: "center" },
    { type: "image", src: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=300&q=80", color: "#5227FF", objPos: "center" },
    { type: "image", src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=300&q=80", color: "#FF9FFC", objPos: "center" },
  ]

  return (
    <section className="vx-float agency-section-wrapper" style={{ padding: "clamp(80px, 12vh, 160px) 0" }}>
      <div className="wrap" style={{ position: "relative", zIndex: 1, maxWidth: "1300px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "60px" }}>
          
          {/* Left Text Column */}
          <div style={{ flex: "1 1 400px", maxWidth: "clamp(480px, 45vw, 680px)", paddingLeft: "clamp(20px, 5vw, 80px)", marginTop: "clamp(-60px, -5vh, -20px)" }}>
            
            {/* Eyebrow */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "clamp(16px, 2.5vh, 24px)", position: "relative" }}>
              <div style={{ position: "absolute", left: "-10px", top: "-5px", width: "40px", height: "30px", backgroundColor: "#523056", zIndex: -1 }}></div>
              <span style={{ fontFamily: "monospace", fontSize: "clamp(10px, 0.9vw, 12px)", fontWeight: 700, letterSpacing: "2px", color: "#fff", textTransform: "uppercase" }}>
                ABOUT US
              </span>
            </div>

            {/* Headline */}
            <h2 style={{ 
              fontSize: "clamp(24px, 3.5vw, 46px)", 
              color: "#fff", 
              lineHeight: 1.3, 
              letterSpacing: "clamp(1px, 0.2vw, 4px)", 
              marginBottom: "clamp(32px, 5vh, 48px)"
            }}>
              <span style={{ whiteSpace: "nowrap" }}>We are more</span><br />
              <span style={{ whiteSpace: "nowrap" }}>than <span className="font-stencilia uppercase text-[#8f7992]">an agency.</span></span>
            </h2>
            
            {/* Subtext */}
            <div style={{ 
              borderLeft: "2px solid rgba(255,255,255,0.4)", 
              paddingLeft: "clamp(16px, 1.5vw, 24px)", 
              marginBottom: "clamp(48px, 7vh, 72px)"
            }}>
              <p style={{ 
                fontSize: "clamp(13px, 1.1vw, 15px)", 
                color: "#ad9daf", 
                lineHeight: 1.8, 
                maxWidth: "clamp(400px, 40vw, 550px)",
                fontWeight: 400
              }}>
                At <span style={{ color: "#fff", fontWeight: 600 }}>Devoxa Technologies</span>, we specialize in delivering high-quality <span style={{ color: "#fff", fontWeight: 600 }}>software, scalable websites, CRM solutions, dynamic mobile applications, and cutting-edge AI automation.</span>
                <br/><br/>
                We partner with forward-thinking businesses to streamline operations and create stunning digital experiences that drive growth. Experience a clear, consistent, and powerful digital journey from concept to deployment.
              </p>
            </div>
            
            {/* Buttons */}
            <div style={{ display: "flex", gap: "clamp(12px, 1vw, 16px)", flexWrap: "wrap" }}>
              <button 
                onClick={onOpenModal}
                style={{ 
                  background: "linear-gradient(135deg, #523056, #705474)", 
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
                  boxShadow: "0 8px 24px rgba(139,47,209,0.35)"
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(139,47,209,0.5)"; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(139,47,209,0.35)"; }}
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
              @keyframes fade-to-color {
                0%, 35% { opacity: 1; transform: scale(1); }
                45%, 85% { opacity: 0; transform: scale(1.05); }
                95%, 100% { opacity: 1; transform: scale(1); }
              }
              @keyframes circle-breathe {
                0%, 100% { transform: translateY(0) scale(1); }
                50% { transform: translateY(-10px) scale(1.03); }
              }
              .circle-image {
                opacity: 1;
                transition: transform 0.4s ease;
                transform: scale(1);
              }
              .agency-circle-item:hover .circle-image {
                transform: scale(1.1);
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
                        animation: mounted ? `fade-to-color ${6 + (index % 5)}s infinite ease-in-out ${(index * 0.6)}s` : 'none'
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
