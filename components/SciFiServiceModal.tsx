"use client"

import React, { useEffect, useState, useLayoutEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check } from 'lucide-react'
import TextType from './TextType'

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

  // Prevent scrolling when modal is open WITHOUT layout shift (by blocking scroll events instead of hiding scrollbar)
  useEffect(() => {
    if (!isOpen) return

    const preventScroll = (e: Event) => {
      e.preventDefault()
    }

    // Add non-passive event listeners to block scrolling
    window.addEventListener('wheel', preventScroll, { passive: false })
    window.addEventListener('touchmove', preventScroll, { passive: false })
    // Block keyboard scrolling (arrow keys, page up/down, space)
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

  // Center modal dialog box with dark frosted backdrop
  useLayoutEffect(() => {
    if (isOpen) {
      const modalWidth = Math.min(520, window.innerWidth - 32)
      const modalHeight = 340

      setModalStyle({
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: `${modalWidth}px`,
        height: `${modalHeight}px`,
        zIndex: 9999
      })
      setPointerDirection('center')
    }
  }, [isOpen])

  // Dimensions for SVG drawing
  const w = parseInt(modalStyle.width as string) || 520;
  const h = parseInt(modalStyle.height as string) || 340;

  // Exact coordinates matching the uploaded image's complex cut corners
  const mainPolyPoints = `0,20 0,70 30,40 110,40 140,0 ${w-20},0 ${w},20 ${w},${h-80} ${w-180},${h-80} ${w-240},${h} 20,${h} 0,${h-20}`;
  const clipPolygon = `polygon(0% 20px, 0% 70px, 30px 40px, 110px 40px, 140px 0%, calc(100% - 20px) 0%, 100% 20px, 100% calc(100% - 80px), calc(100% - 180px) calc(100% - 80px), calc(100% - 240px) 100%, 20px 100%, 0% calc(100% - 20px))`;
  
  // Inner panel for the card name at the bottom right cutout
  const innerPolyPoints = `${w-170},${h-70} ${w},${h-70} ${w},${h} ${w-222.5},${h}`;
  const innerClipPolygon = `polygon(calc(100% - 222.5px) 100%, calc(100% - 170px) 0, 100% 0, 100% 100%)`;

  if (!isOpen || !service) return null

  return (
    <AnimatePresence>
      {/* Dark Frosted Backdrop to isolate content */}
      <motion.div 
        key="scifi-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9998] bg-black/75 backdrop-blur-md cursor-pointer"
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

          {/* Top Center Heading */}
          <motion.h3 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="absolute top-5 left-0 w-full text-center text-lg sm:text-xl font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-[#8b5cf6] drop-shadow-[0_0_10px_rgba(139,92,246,0.6)] z-30"
          >
            {service.title}
          </motion.h3>

          {/* Content Area */}
          <div 
            className="absolute inset-0 flex flex-col justify-center gap-1 text-white overflow-hidden"
            style={{ paddingTop: '80px', paddingBottom: '80px', paddingLeft: '80px', paddingRight: '40px' }}
          >
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-1 max-w-[95%]"
            >
              {/* @ts-ignore - TextType JSX component has missing default props */}
              <TextType 
                text={service.description}
                typingSpeed={30}
                showCursor={true}
                cursorCharacter="_"
                loop={false}
                className="text-xs sm:text-[13px] text-gray-300 font-light leading-relaxed"
              />
            </motion.div>

            <div className="mt-6 flex flex-col gap-2.5">
              {service.features.map((feature, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + (idx * 0.1) }}
                  key={idx} 
                  className="flex items-start gap-3 text-xs sm:text-[13px] text-gray-300 font-light"
                >
                  <div className="shrink-0 text-[#00F0FF] drop-shadow-[0_0_8px_#00F0FF]" style={{ marginTop: '8px' }}>
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
    </AnimatePresence>
  )
}
