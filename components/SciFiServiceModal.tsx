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

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  // Calculate dynamic position based on activeCardRect
  useLayoutEffect(() => {
    if (isOpen && activeCardRect) {
      const spaceLeft = activeCardRect.left
      const spaceRight = window.innerWidth - activeCardRect.right
      const modalWidth = Math.min(420, window.innerWidth - 40) // Fallback for very small screens
      const modalHeight = 320 

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
    const iconCenterY = 40 // Estimated distance from top of the card to the center of the icon
    const cardCenterY = activeCardRect.height / 2
    const yOffset = iconCenterY - cardCenterY 
    
    const svgOriginY = 40 // The Y coordinate in the SVG that corresponds to the vertical middle of the modal
    const targetY = svgOriginY + yOffset 
    
    // distance X is gap(60) + half card width
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
        className: "absolute right-full top-1/2 -translate-y-1/2 pointer-events-none overflow-visible hidden sm:block"
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
        className: "absolute left-full top-1/2 -translate-y-1/2 pointer-events-none overflow-visible hidden sm:block"
      }
    }
  }

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
            <text x={ptr.textX} y="25" fill="#00F0FF" fontSize="10" fontFamily="monospace" textAnchor={ptr.textAnchor} className="uppercase tracking-widest">{service.title}</text>
            <path d={ptr.thickPath} stroke="#00F0FF" strokeWidth="4" />
            <path d={ptr.thickCutout} fill="#00F0FF" />
            <path d={ptr.thinPath} fill="none" stroke="#00F0FF" strokeWidth="1.5" />
            <circle cx={ptr.targetX} cy={ptr.targetY} r="4" fill="none" stroke="#00F0FF" strokeWidth="1.5" />
            <circle cx={ptr.targetX} cy={ptr.targetY} r="1.5" fill="#00F0FF" />
          </svg>
        )}

        {/* The Actual Panel */}
        <div 
          className="absolute inset-0 border border-[#00F0FF]/30 bg-[#07101B]/95 backdrop-blur-xl shadow-[0_0_40px_rgba(0,240,255,0.15)] overflow-hidden"
          style={{
            // Cut top-left and bottom-right corners
            clipPath: "polygon(8% 0, 100% 0, 100% 85%, 92% 100%, 0 100%, 0 15%)"
          }}
        >
          {/* Background Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(rgba(0, 240, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.5) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
              backgroundPosition: "center center"
            }}
          />

          {/* Decorative Corner: Top Left Stripes */}
          <div className="absolute top-0 left-0 w-24 h-5 bg-transparent flex gap-[2px] transform -skew-x-[45deg] origin-top-left ml-2 mt-0 pointer-events-none">
            {[1,2,3,4,5,6].map((i) => (
              <div key={i} className="h-full w-2 bg-white/70" />
            ))}
          </div>

          {/* Decorative Corner: Bottom Right Block with Card Name */}
          <div className="absolute bottom-0 right-0 w-48 h-12 bg-transparent pointer-events-none flex items-end justify-end p-1">
            <div 
              className="w-full h-full border-t-2 border-l-2 border-white/20 bg-white/5 flex items-center justify-center pl-4 pt-2"
              style={{ clipPath: "polygon(0 100%, 15% 0, 100% 0, 100% 100%)" }}
            >
              <span className="text-[10px] sm:text-xs font-mono text-[#00F0FF] uppercase tracking-widest opacity-90 drop-shadow-[0_0_5px_rgba(0,240,255,0.5)]">
                {service.title}
              </span>
            </div>
          </div>

          {/* Glowing edges at top and bottom */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-[#00F0FF] shadow-[0_0_15px_3px_#00F0FF]" />
          <div className="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-[#00F0FF] shadow-[0_0_15px_3px_#00F0FF]" />

          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 z-50 text-white/50 hover:text-white hover:bg-[#00F0FF]/10 p-1.5 rounded-full transition-colors"
          >
            <X size={18} />
          </button>

          {/* Content Area */}
          <div className="relative z-20 w-full h-full p-6 sm:p-8 flex flex-col justify-center gap-3 text-white">
            <motion.h3 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00F0FF] drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]"
            >
              {service.title}
            </motion.h3>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xs sm:text-sm text-gray-300 max-w-sm leading-relaxed border-l-2 border-[#00F0FF]/50 pl-3"
            >
              {service.description}
            </motion.p>

            <div className="mt-2 flex flex-col gap-2">
              {service.features.map((feature, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + (idx * 0.1) }}
                  key={idx} 
                  className="flex items-center gap-2 text-xs sm:text-sm text-cyan-50"
                >
                  <div className="w-4 h-4 flex items-center justify-center rounded-sm bg-[#00F0FF]/10 border border-[#00F0FF]/40 shrink-0">
                    <Check size={12} className="text-[#00F0FF]" />
                  </div>
                  {feature}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
