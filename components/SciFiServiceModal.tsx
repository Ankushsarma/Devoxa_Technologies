"use client"

import React, { useEffect, useState, useLayoutEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check } from 'lucide-react'

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

export default function SciFiServiceModal({ isOpen, onClose, service, activeCardRect }: SciFiServiceModalProps) {
  const [modalStyle, setModalStyle] = useState<React.CSSProperties>({})
  const [pointerDirection, setPointerDirection] = useState<'left' | 'right' | 'center'>('center')

  // (Removed prevent scrolling to avoid layout shift and allow the popover to just hover)

  // Calculate dynamic position based on activeCardRect
  useLayoutEffect(() => {
    if (isOpen && activeCardRect) {
      const spaceLeft = activeCardRect.left
      const spaceRight = window.innerWidth - activeCardRect.right
      const modalWidth = Math.min(460, window.innerWidth - 40) // Scaled down width
      const modalHeight = 320 // Scaled down height

      let left = 0
      let top = activeCardRect.top + activeCardRect.height / 2 - modalHeight / 2 
      let dir: 'left' | 'right' | 'center' = 'center'

      if (spaceRight >= modalWidth + 80 || spaceRight > spaceLeft + 50) {
        // Place on the right
        left = activeCardRect.right + 60
        dir = 'left' // pointer points left back to the card
      } else if (spaceLeft >= modalWidth + 80) {
        // Place on the left
        left = activeCardRect.left - modalWidth - 60
        dir = 'right' // pointer points right back to the card
      } else {
        // Center fallback (e.g., mobile)
        left = (window.innerWidth - modalWidth) / 2
        top = activeCardRect.bottom + 20
        dir = 'center'
      }

      // Clamp coordinates to screen bounds
      if (top < 80) top = 80 // Leave space for nav
      if (top + modalHeight > window.innerHeight - 20) top = window.innerHeight - modalHeight - 20
      if (left < 10) left = 10
      if (left + modalWidth > window.innerWidth - 10) left = window.innerWidth - modalWidth - 10

      setModalStyle({
        position: 'fixed',
        left: `${left}px`,
        top: `${top}px`,
        width: `${modalWidth}px`,
        height: `${modalHeight}px`,
        zIndex: 9999
      })
      setPointerDirection(dir)
    } else if (isOpen && !activeCardRect) {
      // Fallback if rect is missing (should not happen normally)
      setModalStyle({
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: '420px',
        height: '320px',
        zIndex: 9999
      })
      setPointerDirection('center')
    }
  }, [isOpen, activeCardRect])

  // Calculate dynamic pointer SVG props
  let ptr = null
  if (activeCardRect && (pointerDirection === 'left' || pointerDirection === 'right')) {
    const iconCenterY = 40 
    const cardCenterY = activeCardRect.height / 2
    const yOffset = iconCenterY - cardCenterY 
    
    const svgOriginY = 40 
    const targetY = svgOriginY + yOffset 
    
    const distanceX = 60 + activeCardRect.width / 2
    const svgWidth = distanceX + 20

    if (pointerDirection === 'left') {
      const targetX = 10
      ptr = {
        width: svgWidth,
        textX: svgWidth - 10,
        textAnchor: 'end' as const,
        thickPath: `M ${svgWidth - 60} 30 L ${svgWidth} 30`,
        thickCutout: `M ${svgWidth - 70} 30 L ${svgWidth - 60} 30 L ${svgWidth - 55} 26 L ${svgWidth - 70} 26 Z`,
        thinPath: `M ${svgWidth} 34 L ${svgWidth - 65} 34 L ${targetX + 20} ${targetY} L ${targetX} ${targetY}`,
        targetX, targetY,
        className: "absolute right-full top-1/2 -translate-y-1/2 pointer-events-none overflow-visible hidden sm:block z-50"
      }
    } else {
      const targetX = svgWidth - 10
      ptr = {
        width: svgWidth,
        textX: 10,
        textAnchor: 'start' as const,
        thickPath: `M 0 30 L 60 30`,
        thickCutout: `M 60 30 L 70 30 L 65 26 L 55 26 Z`,
        thinPath: `M 0 34 L 65 34 L ${targetX - 20} ${targetY} L ${targetX} ${targetY}`,
        targetX, targetY,
        className: "absolute left-full top-1/2 -translate-y-1/2 pointer-events-none overflow-visible hidden sm:block z-50"
      }
    }
  }

  // Dimensions for SVG drawing
  const w = parseInt(modalStyle.width as string) || 520;
  const h = parseInt(modalStyle.height as string) || 360;

  // Exact coordinates matching the uploaded image's complex cut corners
  const mainPolyPoints = `0,20 0,70 30,40 110,40 140,0 ${w-20},0 ${w},20 ${w},${h-80} ${w-180},${h-80} ${w-240},${h} 20,${h} 0,${h-20}`;
  const clipPolygon = `polygon(0% 20px, 0% 70px, 30px 40px, 110px 40px, 140px 0%, calc(100% - 20px) 0%, 100% 20px, 100% calc(100% - 80px), calc(100% - 180px) calc(100% - 80px), calc(100% - 240px) 100%, 20px 100%, 0% calc(100% - 20px))`;
  
  // Inner panel for the card name at the bottom right cutout
  const innerPolyPoints = `${w-170},${h-70} ${w},${h-70} ${w},${h} ${w-222.5},${h}`;
  const innerClipPolygon = `polygon(calc(100% - 222.5px) 100%, calc(100% - 170px) 0, 100% 0, 100% 100%)`;

  if (!isOpen || !service) return null

  return (
    <AnimatePresence>
      {/* Invisible backdrop to capture outside clicks */}
      <div 
        key="scifi-modal-backdrop"
        className="fixed inset-0 z-[9998] cursor-pointer"
        onClick={onClose}
      />

      {/* Dynamic Popover Modal */}
      <motion.div
        key="scifi-modal-popover"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 120 }}
        style={modalStyle}
      >
        {/* Pointer pointing to the card's top center icon */}
        {ptr && (
          <svg width={ptr.width} height="80" className={ptr.className}>
            <path d={ptr.thickPath} stroke="#00F0FF" strokeWidth="4" />
            <path d={ptr.thickCutout} fill="#00F0FF" />
            <path d={ptr.thinPath} fill="none" stroke="#00F0FF" strokeWidth="1.5" />
            <circle cx={ptr.targetX} cy={ptr.targetY} r="4" fill="none" stroke="#00F0FF" strokeWidth="1.5" />
            <circle cx={ptr.targetX} cy={ptr.targetY} r="1.5" fill="#00F0FF" />
          </svg>
        )}

        {/* Exact Vector Borders & Backgrounds */}
        <svg className="absolute inset-0 pointer-events-none z-0 overflow-visible" width="100%" height="100%">
          {/* Main Background */}
          <polygon points={mainPolyPoints} fill="rgba(7, 16, 27, 0.95)" stroke="rgba(139, 92, 246, 0.6)" strokeWidth="1.5" />
          {/* Main Glows */}
          <line x1="140" y1="0" x2={w-20} y2="0" stroke="#ffffff" strokeWidth="2" filter="drop-shadow(0 0 8px rgba(255,255,255,0.8))" />
          <line x1="20" y1={h} x2={w-240} y2={h} stroke="#ffffff" strokeWidth="2" filter="drop-shadow(0 0 8px rgba(255,255,255,0.8))" />
          
          {/* Inner Panel Background */}
          <polygon points={innerPolyPoints} fill="rgba(139, 92, 246, 0.05)" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="1" />
        </svg>

        {/* Decorative Corner: Top Left Stripes */}
        <div className="absolute top-[25px] left-[30px] w-20 h-[10px] bg-transparent flex gap-[3px] transform -skew-x-[45deg] origin-top-left pointer-events-none z-10">
          {[1,2,3,4,5,6,7].map((i) => (
            <div key={i} className="h-full w-2 bg-[#8b5cf6]/80 shadow-[0_0_5px_#8b5cf6]" />
          ))}
        </div>

        {/* Decorative Corner: Bottom Right Card Name */}
        <div 
          className="absolute bottom-0 right-0 w-[170px] h-[70px] pointer-events-none flex items-center justify-center p-2 z-10"
        >
          <span className="text-[10px] sm:text-[11px] font-mono text-[#00F0FF] uppercase tracking-widest drop-shadow-[0_0_5px_rgba(0,240,255,0.5)]">
            {service.title}
          </span>
        </div>

        {/* The HTML Content Area properly clipped to not overflow the SVG borders */}
        <div 
          className="absolute inset-0 z-20 pointer-events-none"
          style={{ clipPath: clipPolygon }}
        >
          {/* Background Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
              backgroundPosition: "center center"
            }}
          />

          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-50 text-white/50 hover:text-white hover:bg-[#8b5cf6]/20 p-1.5 rounded-full transition-colors pointer-events-auto"
          >
            <X size={20} />
          </button>

          {/* Content Area */}
          <div 
            className="absolute inset-0 flex flex-col justify-center gap-2 text-white overflow-hidden"
            style={{ paddingTop: '50px', paddingBottom: '80px', paddingLeft: '80px', paddingRight: '40px' }}
          >
            <motion.h3 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg sm:text-xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-[#8b5cf6] drop-shadow-[0_0_10px_rgba(139,92,246,0.6)]"
            >
              {service.title}
            </motion.h3>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xs sm:text-sm text-gray-300 max-w-[95%] leading-relaxed mt-1"
            >
              {service.description}
            </motion.p>

            <div className="mt-3 flex flex-col gap-2.5">
              {service.features.map((feature, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + (idx * 0.1) }}
                  key={idx} 
                  className="flex items-start gap-3 text-[11px] sm:text-xs text-purple-50"
                >
                  <div className="w-1.5 h-1.5 bg-[#00F0FF] shadow-[0_0_8px_#00F0FF] shrink-0 rotate-45 mt-[6px]"></div>
                  <span className="leading-relaxed">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
