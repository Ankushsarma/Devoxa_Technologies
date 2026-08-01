"use client"

import React, { useEffect } from 'react'
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
}

export default function SciFiServiceModal({ isOpen, onClose, service }: SciFiServiceModalProps) {
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

  if (!isOpen || !service) return null

  return (
    <AnimatePresence>
      <motion.div
        key="scifi-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-4 sm:p-6"
      >
        {/* Deep dark backdrop with heavy blur */}
        <div 
          className="absolute inset-0 bg-black/70 backdrop-blur-md cursor-pointer"
          onClick={onClose}
        />

        {/* Modal Container */}
        <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
          
          {/* Main Holographic Panel */}
          <motion.div
            initial={{ y: 50, scale: 0.8, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 50, scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="relative w-full aspect-[4/3] sm:aspect-[16/9] mb-4"
          >
            {/* Top-Right HUD Floating Element */}
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute -top-12 right-0 flex flex-col items-end gap-1 pointer-events-none"
            >
              <span className="text-[#00F0FF] text-[10px] font-mono tracking-widest drop-shadow-[0_0_5px_#00F0FF]">
                380/BC002
              </span>
              <div className="w-24 h-0.5 bg-[#00F0FF] shadow-[0_0_5px_#00F0FF]" />
              <div className="w-16 h-0.5 bg-[#00F0FF] shadow-[0_0_5px_#00F0FF] mr-4" />
              <div className="w-8 h-0.5 bg-[#00F0FF] shadow-[0_0_5px_#00F0FF]" />
            </motion.div>

            {/* The Actual Panel */}
            <div 
              className="absolute inset-0 border border-white/20 bg-[#07101B]/80 backdrop-blur-xl shadow-[0_0_40px_rgba(0,240,255,0.2)] overflow-hidden"
              style={{
                // Cut top-left and bottom-right corners
                clipPath: "polygon(10% 0, 100% 0, 100% 85%, 90% 100%, 0 100%, 0 15%)"
              }}
            >
              {/* Background Grid Pattern */}
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: "linear-gradient(rgba(0, 240, 255, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.4) 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                  backgroundPosition: "center center"
                }}
              />

              {/* Decorative Corner: Top Left Stripes */}
              <div className="absolute top-0 left-0 w-24 h-6 bg-transparent flex gap-1 transform -skew-x-[45deg] origin-top-left -ml-2 -mt-1 pointer-events-none">
                {[1,2,3,4,5,6,7].map((i) => (
                  <div key={i} className="h-full w-2 bg-white shadow-[0_0_10px_#fff]" />
                ))}
              </div>

              {/* Decorative Corner: Bottom Right Block */}
              <div className="absolute bottom-0 right-0 w-32 h-16 bg-transparent pointer-events-none flex items-end justify-end p-1">
                <div 
                  className="w-full h-full border-t-2 border-l-2 border-white bg-white/10"
                  style={{
                    clipPath: "polygon(0 100%, 100% 0, 100% 100%)"
                  }}
                />
              </div>

              {/* Glowing edges at top and bottom */}
              <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-[#00F0FF] shadow-[0_0_20px_5px_#00F0FF]" />
              <div className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-[#00F0FF] shadow-[0_0_20px_5px_#00F0FF]" />

              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 z-50 text-white/50 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              {/* Content Area */}
              <div className="relative z-20 w-full h-full p-8 sm:p-12 flex flex-col justify-center gap-4 text-white">
                <motion.h3 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00F0FF] drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]"
                >
                  {service.title}
                </motion.h3>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm sm:text-base text-gray-300 max-w-lg leading-relaxed border-l-2 border-[#00F0FF]/50 pl-4"
                >
                  {service.description}
                </motion.p>

                <div className="mt-4 flex flex-col gap-3">
                  {service.features.map((feature, idx) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + (idx * 0.1) }}
                      key={idx} 
                      className="flex items-center gap-3 text-sm sm:text-base text-cyan-50"
                    >
                      <div className="w-5 h-5 flex items-center justify-center rounded-sm bg-[#00F0FF]/20 border border-[#00F0FF]/50">
                        <Check size={14} className="text-[#00F0FF]" />
                      </div>
                      {feature}
                    </motion.div>
                  ))}
                </div>

              </div>
            </div>
          </motion.div>

          {/* Holographic Projection Beam & Base */}
          <div className="relative flex flex-col items-center mt-2 w-full max-w-md">
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "80px", opacity: 0.6 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="w-full bg-gradient-to-b from-[#00F0FF]/50 via-[#00F0FF]/10 to-transparent"
              style={{ clipPath: "polygon(10% 100%, 90% 100%, 100% 0, 0 0)" }}
            />
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="w-48 h-6 bg-[#00F0FF]/30 rounded-[100%] border-2 border-[#00F0FF]/80 shadow-[0_0_30px_#00F0FF] -mt-3 flex items-center justify-center"
            >
              <div className="w-24 h-2 bg-white rounded-[100%] blur-[2px]" />
            </motion.div>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  )
}
