"use client"

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Terminal } from 'lucide-react';
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
    <section className="h-screen w-screen overflow-hidden bg-[#05050A] text-white flex flex-col items-center justify-center font-sans relative">
      
      {/* Dynamic Interactive Spotlight */}
      <motion.div 
        className="absolute w-[800px] h-[800px] rounded-full blur-[150px] opacity-20 pointer-events-none z-0"
        animate={{
          x: mousePosition.x - 400,
          y: mousePosition.y - 400,
          background: "radial-gradient(circle, rgba(120,87,255,1) 0%, rgba(0,212,255,0) 60%)"
        }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.2 }}
      />

      {/* Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl">
        
        {/* Animated 404 Text with Glitch/Glow Layers */}
        <div className="relative mb-6">
          <motion.h1 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, type: "spring", bounce: 0.6 }}
            className="text-[8rem] md:text-[14rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-[#E8E4FF] to-[#3B3A4C]"
          >
            404
          </motion.h1>
          
          <motion.div 
            animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 text-[8rem] md:text-[14rem] font-black leading-none tracking-tighter text-[#00F0FF] blur-2xl opacity-40 mix-blend-screen -z-10"
          >
            404
          </motion.div>
          <motion.div 
            animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute inset-0 text-[8rem] md:text-[14rem] font-black leading-none tracking-tighter text-[#7857FF] blur-3xl opacity-30 mix-blend-screen -z-10"
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
            <Terminal size={14} />
            <span>SYSTEM_ERROR_CODE_404</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Signal Lost in the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#7857FF]">Void</span>
          </h2>
          <p className="text-gray-400 text-base md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            The coordinates you provided lead to an empty sector. 
            The data has either been deleted, moved, or never existed in this timeline.
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
      
      {/* Decorative Floating Geometry */}
      <motion.div 
        animate={{ y: [0, -30, 0], rotate: [0, 90, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[10%] md:left-[15%] w-16 h-16 rounded-2xl border border-[#7857FF]/20 bg-[#7857FF]/5 backdrop-blur-xl hidden md:block"
      />
      <motion.div 
        animate={{ y: [0, 40, 0], rotate: [0, -90, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[20%] right-[10%] md:right-[15%] w-24 h-24 rounded-full border border-[#00F0FF]/20 bg-[#00F0FF]/5 backdrop-blur-xl hidden md:block"
      />

    </section>
  );
}
