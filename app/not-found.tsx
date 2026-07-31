"use client"

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Satellite, Rocket } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="h-screen w-screen overflow-hidden bg-[#241A4A] text-white flex flex-col items-center justify-center font-sans relative">
      
      {/* Abstract Background Waves */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Top Left Wavy Blobs */}
        <svg viewBox="0 0 800 600" className="absolute -top-10 -left-10 w-[70vw] h-auto text-[#5B3DF5] opacity-60" preserveAspectRatio="none">
          <path d="M 0 0 L 800 0 C 600 200 700 500 400 500 C 200 500 100 400 0 300 Z" fill="currentColor" />
        </svg>
        <svg viewBox="0 0 800 600" className="absolute top-0 left-0 w-[50vw] h-auto text-[#9C7CFF] opacity-70" preserveAspectRatio="none">
          <path d="M 0 0 L 600 0 C 400 100 500 400 200 400 C 100 400 0 200 0 200 Z" fill="currentColor" />
        </svg>
        {/* Bottom Right Wavy Blob */}
        <svg viewBox="0 0 800 600" className="absolute -bottom-10 -right-10 w-[80vw] h-auto text-[#7452FF] opacity-60" preserveAspectRatio="none">
          <path d="M 800 600 L 0 600 C 200 500 200 200 400 200 C 600 200 700 300 800 400 Z" fill="currentColor" />
        </svg>
      </div>

      {/* Scattered Stars and Shooting Stars */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* 4-Pointed Stars (Sparkles) */}
        <div className="absolute top-[15%] left-[20%] text-white text-lg animate-pulse">✦</div>
        <div className="absolute top-[10%] right-[30%] text-white text-xl animate-pulse delay-75">✦</div>
        <div className="absolute bottom-[20%] left-[15%] text-white text-sm animate-pulse delay-150">✦</div>
        <div className="absolute top-[40%] right-[10%] text-white text-lg animate-pulse delay-300">✦</div>
        <div className="absolute bottom-[30%] right-[25%] text-white text-xs animate-pulse delay-500">✦</div>
        
        {/* Small Dots */}
        <div className="absolute top-[5%] left-[5%] w-1 h-1 bg-white rounded-full opacity-50" />
        <div className="absolute top-[25%] right-[15%] w-1 h-1 bg-white rounded-full opacity-50" />
        <div className="absolute bottom-[10%] left-[40%] w-1 h-1 bg-white rounded-full opacity-50" />
        <div className="absolute bottom-[40%] right-[5%] w-1 h-1 bg-white rounded-full opacity-50" />

        {/* Shooting Stars */}
        <motion.div 
          animate={{ x: [-200, 1000], y: [-200, 1000] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
          className="absolute top-[10%] left-[10%] w-[100px] h-[2px] bg-gradient-to-r from-transparent to-[#FF8CFF] rotate-45"
        />
        <motion.div 
          animate={{ x: [-200, 1000], y: [-200, 1000] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 3 }}
          className="absolute bottom-[40%] left-[20%] w-[150px] h-[3px] bg-gradient-to-r from-transparent to-[#FF8CFF] rotate-45"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl transform scale-[0.55] sm:scale-[0.60] md:scale-[0.65] lg:scale-[0.70] xl:scale-[0.75] origin-center mt-8">
        
        {/* Animated 404 Text with Sharp Cyber Glitch Effects */}
        <div className="relative mb-6 flex items-center justify-center">
          <motion.h1 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, type: "spring", bounce: 0.6 }}
            className="text-[7rem] md:text-[11rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500 relative z-10"
          >
            404
          </motion.h1>
          
          <motion.div 
            animate={{ x: [-3, 3, -3], opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: 0.15, repeat: Infinity, repeatType: "mirror" }}
            className="absolute inset-0 text-[7rem] md:text-[11rem] font-black leading-none tracking-tighter text-[#00F0FF] blur-[3px] mix-blend-screen opacity-80 -z-10"
          >
            404
          </motion.div>
          <motion.div 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 text-[7rem] md:text-[11rem] font-black leading-none tracking-tighter text-[#7857FF] blur-[20px] opacity-100 mix-blend-screen -z-20"
          >
            404
          </motion.div>

        </div>

        {/* Text Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7857FF]/10 border border-[#7857FF]/30 text-[#A893FF] text-sm font-semibold mb-6">
            <Satellite size={14} />
            <span>SATELLITE_UPLINK_FAILED_404</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight leading-snug">
            Signal Lost Somewhere in the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#7857FF]">Galaxy.</span>
          </h2>
          <p className="text-gray-400 text-base md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            We detected your request leaving Earth successfully, but it never returned. Our satellites are still searching the cosmos for your missing page.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full"
        >
          <Link 
            href="/"
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-gradient-to-r from-[#5B3DF5] to-[#7857FF] rounded-full focus:outline-none hover:shadow-[0_0_30px_rgba(120,87,255,0.4)] overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Home size={18} className="group-hover:scale-110 transition-transform" />
              Return to Base
            </span>
          </Link>

          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-8 py-4 font-bold text-gray-300 transition-all duration-200 bg-transparent border border-gray-700/50 rounded-full hover:bg-white/5 hover:text-white focus:outline-none hover:border-gray-500 backdrop-blur-sm"
          >
            <ArrowLeft size={18} className="mr-2" />
            Go Back
          </button>
        </motion.div>
        
      </div>
      
      {/* Vector Illustration Planets & UFO */}
      
      {/* UFO (Top Center) */}
      <motion.div 
        animate={{ x: [0, -30, 0], y: [0, 15, 0], rotate: [-10, -5, -10] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[40%] md:left-[45%] w-24 h-24 md:w-32 md:h-32 z-0 pointer-events-none"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          {/* Light Beam */}
          <polygon points="40,65 60,65 75,100 25,100" fill="url(#beamGrad)" opacity="0.6" />
          <defs>
            <linearGradient id="beamGrad" x1="50" y1="65" x2="50" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFF" stopOpacity="0.8" />
              <stop offset="1" stopColor="#FFF" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* UFO Dome */}
          <path d="M 35 45 A 15 15 0 0 1 65 45 Z" fill="#9C7CFF" />
          {/* UFO Body */}
          <ellipse cx="50" cy="48" rx="35" ry="10" fill="#5B3DF5" />
          <ellipse cx="50" cy="48" rx="35" ry="10" fill="#4F359B" transform="scale(0.9) translate(5, 1)" />
          {/* Lights */}
          <circle cx="35" cy="48" r="1.5" fill="#FFF" />
          <circle cx="50" cy="48" r="1.5" fill="#FFF" />
          <circle cx="65" cy="48" r="1.5" fill="#FFF" />
        </svg>
      </motion.div>

      {/* Top Right Planet with Ring */}
      <motion.div 
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] right-[5%] md:right-[15%] w-28 h-28 md:w-40 md:h-40 z-0 pointer-events-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#B24CE2]">
           {/* Back Ring */}
           <path d="M -5 50 A 55 12 0 0 1 105 50" fill="none" stroke="#7A689B" strokeWidth="3" transform="rotate(-15 50 50)" />
           {/* Planet */}
           <circle cx="50" cy="50" r="25" fill="currentColor" />
           {/* Craters */}
           <circle cx="45" cy="40" r="5" fill="#8429B8" opacity="0.7" />
           <circle cx="60" cy="55" r="3" fill="#8429B8" opacity="0.7" />
           <circle cx="50" cy="60" r="6" fill="#8429B8" opacity="0.7" />
           {/* Front Ring */}
           <path d="M -5 50 A 55 12 0 0 0 105 50" fill="none" stroke="#9A88BB" strokeWidth="5" transform="rotate(-15 50 50)" />
        </svg>
      </motion.div>

      {/* Bottom Left Large Craters Planet */}
      <motion.div 
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[20%] left-[5%] md:left-[10%] w-32 h-32 md:w-56 md:h-56 rounded-full bg-gradient-to-tr from-[#6142DD] to-[#8C6DFF] shadow-[-10px_10px_20px_rgba(29,18,66,0.6)] z-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute top-[20%] left-[20%] w-[25%] h-[25%] rounded-full bg-[#4F359B]/60" />
        <div className="absolute bottom-[25%] left-[45%] w-[35%] h-[35%] rounded-full bg-[#4F359B]/50" />
        <div className="absolute top-[50%] right-[10%] w-[15%] h-[15%] rounded-full bg-[#4F359B]/60" />
        <div className="absolute top-[40%] left-[10%] w-[10%] h-[10%] rounded-full bg-[#4F359B]/50" />
      </motion.div>

      {/* Top Left Small Planet */}
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[5%] left-[5%] md:left-[10%] w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-[#9C7CFF] to-[#D4A5FF] shadow-[-5px_5px_15px_rgba(0,0,0,0.3)] z-0 pointer-events-none"
      >
        <div className="absolute top-[25%] left-[30%] w-[20%] h-[20%] rounded-full bg-[#7452FF]/40" />
        <div className="absolute bottom-[30%] left-[50%] w-[30%] h-[30%] rounded-full bg-[#7452FF]/40" />
      </motion.div>

      {/* Bottom Right Small Light Planet */}
      <motion.div 
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[5%] right-[5%] md:right-[15%] w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#B69AFF] shadow-[inset_-5px_-5px_10px_rgba(0,0,0,0.2)] z-0 pointer-events-none"
      >
        <div className="absolute top-[20%] left-[30%] w-[20%] h-[20%] rounded-full bg-white/40" />
        <div className="absolute bottom-[35%] left-[50%] w-[25%] h-[25%] rounded-full bg-white/30" />
        <div className="absolute top-[50%] left-[20%] w-[15%] h-[15%] rounded-full bg-white/40" />
      </motion.div>

    </section>
  );
}
