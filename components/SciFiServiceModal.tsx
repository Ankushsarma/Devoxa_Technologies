"use client"

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export interface ServiceDetails {
  id: string
  title: string
  description: string
  features: string[]
}

interface SciFiServiceModalProps {
  isOpen: boolean
  onClose: () => void
  service: ServiceDetails | null
  activeCardRect?: DOMRect | null
}

export default function SciFiServiceModal({ isOpen, onClose, service }: SciFiServiceModalProps) {
  // Prevent scrolling when modal is open WITHOUT layout shift
  useEffect(() => {
    if (!isOpen) return

    const preventScroll = (e: Event) => {
      e.preventDefault()
    }

    window.addEventListener('wheel', preventScroll, { passive: false })
    window.addEventListener('touchmove', preventScroll, { passive: false })
    const preventKeyScroll = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'Space', 'PageUp', 'PageDown'].includes(e.code)) {
        e.preventDefault()
      }
    }
    window.addEventListener('keydown', preventKeyScroll, { passive: false })

    return () => {
      window.removeEventListener('wheel', preventScroll)
      window.removeEventListener('touchmove', preventScroll)
      window.removeEventListener('keydown', preventKeyScroll)
    }
  }, [isOpen])

  const w = 540;
  const h = 360;

  // Exact coordinates matching complex sci-fi cut corners
  const mainPolyPoints = `0,20 0,70 30,40 110,40 140,0 ${w-20},0 ${w},20 ${w},${h-80} ${w-180},${h-80} ${w-240},${h} 20,${h} 0,${h-20}`;
  const clipPolygon = `polygon(0% 20px, 0% 70px, 30px 40px, 110px 40px, 140px 0%, calc(100% - 20px) 0%, 100% 20px, 100% calc(100% - 80px), calc(100% - 180px) calc(100% - 80px), calc(100% - 240px) 100%, 20px 100%, 0% calc(100% - 20px))`;
  
  // Inner panel for the card name at the bottom right cutout
  const innerPolyPoints = `${w-170},${h-70} ${w},${h-70} ${w},${h} ${w-222.5},${h}`;

  return (
    <AnimatePresence>
      {isOpen && service && (
        <div key="scifi-modal-wrapper" className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Dark Frosted Backdrop */}
          <motion.div 
            key="scifi-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            onClick={onClose}
          />

          {/* Dynamic Popover Sci-Fi Dialog Box */}
          <motion.div
            key="scifi-modal-popover"
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="relative z-10 w-full max-w-[540px] h-[360px] shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
          >
            {/* Vector Borders & Backgrounds */}
            <svg className="absolute inset-0 pointer-events-none z-0 overflow-visible" width="100%" height="100%">
              {/* Main Background */}
              <polygon points={mainPolyPoints} fill="rgba(9, 14, 26, 0.98)" stroke="rgba(139, 92, 246, 0.7)" strokeWidth="1.5" />
              {/* Main Glow Lines */}
              <line x1="140" y1="0" x2={w-20} y2="0" stroke="#ffffff" strokeWidth="2.5" filter="drop-shadow(0 0 10px rgba(255,255,255,0.9))" />
              <line x1="20" y1={h} x2={w-240} y2={h} stroke="#ffffff" strokeWidth="2.5" filter="drop-shadow(0 0 10px rgba(255,255,255,0.9))" />
              
              {/* Inner Cutout Accent Panel */}
              <polygon points={innerPolyPoints} fill="rgba(139, 92, 246, 0.08)" stroke="rgba(139, 92, 246, 0.5)" strokeWidth="1" />
            </svg>

            {/* Top Left Stripes */}
            <div className="absolute top-[25px] left-[30px] w-20 h-[10px] bg-transparent flex gap-[3px] transform -skew-x-[45deg] origin-top-left pointer-events-none z-10">
              {[1,2,3,4,5,6,7].map((i) => (
                <div key={i} className="h-full w-2 bg-[#8b5cf6] shadow-[0_0_8px_#8b5cf6]" />
              ))}
            </div>

            {/* Bottom Right Card Name Accent */}
            <div className="absolute bottom-0 right-0 w-[170px] h-[70px] pointer-events-none flex items-center justify-center p-2 z-10">
              <span className="text-[10px] sm:text-[11px] font-mono text-[#00F0FF] uppercase tracking-widest font-bold drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]">
                {service.title}
              </span>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-[14px] right-[20px] z-50 text-gray-300 hover:text-white transition-all bg-white/10 hover:bg-white/20 p-2 rounded-full border border-white/20 cursor-pointer pointer-events-auto shadow-md"
            >
              <X size={18} />
            </button>

            {/* Dialog Box Body Content */}
            <div 
              className="relative z-20 w-full h-full p-6 sm:p-8 flex flex-col justify-between"
              style={{
                clipPath: clipPolygon
              }}
            >
              {/* Header */}
              <div className="pt-2">
                <div className="inline-block px-3 py-1 rounded-full bg-purple-950/90 border border-purple-400/40 text-purple-300 font-mono text-[10px] uppercase tracking-widest font-bold mb-2 shadow-[0_0_12px_rgba(139,92,246,0.3)]">
                  SERVICE DETAILS // {service.id}
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
                  {service.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light my-2">
                {service.description}
              </p>

              {/* Capabilities List */}
              <div className="space-y-2 pb-2">
                <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest block font-bold">
                  KEY CAPABILITIES:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {service.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + idx * 0.04 }}
                      className="flex items-start gap-2.5 text-xs sm:text-[13px] text-gray-200 font-light"
                    >
                      <div className="shrink-0 text-[#00F0FF] drop-shadow-[0_0_8px_#00F0FF]" style={{ marginTop: '4px' }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                        </svg>
                      </div>
                      <span className="leading-relaxed whitespace-pre-line">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
