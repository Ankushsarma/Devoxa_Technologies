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
    <section className="h-screen w-screen overflow-hidden bg-[#05050A] text-white flex flex-col items-center justify-center font-mono relative">
      
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

      {/* Deep Space Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#150D3A] via-[#05050A] to-[#000000] -z-20"></div>

      {/* Dense Starfield Particles - Traveling through space */}
      <motion.div 
        animate={{ backgroundPosition: ["0px 0px", "300px 300px"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[size:30px_30px] opacity-50 z-0"
      />
      <motion.div 
        animate={{ backgroundPosition: ["40px 40px", "840px 840px"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.4)_1.5px,transparent_1.5px)] bg-[size:80px_80px] opacity-40 z-0"
      />
      <motion.div 
        animate={{ backgroundPosition: ["70px 70px", "1570px 1570px"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.2)_2px,transparent_2px)] bg-[size:150px_150px] opacity-20 z-0"
      />

      {/* Abstract Orbiting Satellites / Cosmic Elements */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] md:w-[80vw] md:h-[80vw] border-[0.5px] border-white/5 rounded-full z-0 pointer-events-none"
      >
        <div className="absolute top-[10%] left-[10%] w-2 h-2 bg-[#00F0FF] rounded-full shadow-[0_0_10px_#00F0FF]"></div>
      </motion.div>

      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] md:w-[110vw] md:h-[110vw] border-[0.5px] border-white/5 rounded-full z-0 pointer-events-none"
      >
        <div className="absolute bottom-[20%] right-[15%] w-3 h-3 bg-[#7857FF] rounded-full shadow-[0_0_15px_#7857FF]"></div>
      </motion.div>

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

          {/* Orbiting Rocket around 404 */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center"
          >
            <div className="translate-x-[150px] md:translate-x-[240px] rotate-90">
              <Rocket className="w-12 h-12 md:w-16 md:h-16 text-[#00F0FF] drop-shadow-[0_0_15px_rgba(0,240,255,1)]" />
            </div>
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
      
      {/* Cartoon Planets */}
      
      {/* Planet with Ring (Saturn style) */}
      <motion.div 
        animate={{ y: [-20, 20, -20], rotate: [0, 5, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] right-[10%] md:right-[15%] w-32 h-32 md:w-48 md:h-48 z-0 pointer-events-none drop-shadow-[0_0_20px_rgba(120,87,255,0.4)]"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#7857FF]">
           <path d="M 10 50 A 40 15 0 0 1 90 50" fill="none" stroke="#00F0FF" strokeWidth="3" />
           <circle cx="50" cy="50" r="28" fill="currentColor" />
           <path d="M 10 50 A 40 15 0 0 0 90 50" fill="none" stroke="#00F0FF" strokeWidth="6" />
        </svg>
      </motion.div>

      {/* Glowing Cosmic Portal / Black Hole */}
      <motion.div 
        animate={{ rotate: 360, scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[20%] left-[10%] md:left-[15%] w-24 h-24 md:w-32 md:h-32 rounded-full z-0 pointer-events-none flex items-center justify-center shadow-[0_0_40px_#7857FF]"
        style={{ background: "conic-gradient(from 0deg, #7857FF, #00F0FF, #FF3366, #7857FF)" }}
      >
        <div className="absolute inset-[3px] rounded-full bg-[#05050A]" />
        <div className="absolute inset-[10px] rounded-full bg-black shadow-[inset_0_0_20px_rgba(120,87,255,0.8)]" />
      </motion.div>

      {/* Shooting Star */}
      <motion.div
        animate={{ x: ['120vw', '-40vw'], y: ['-20vh', '100vh'], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 2 }}
        className="absolute top-0 right-0 z-0 pointer-events-none flex items-center rotate-[35deg]"
      >
        <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-white to-white rounded-l-full" />
        <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_15px_5px_#fff]" />
      </motion.div>

      {/* Random Moving Satellites */}
      <motion.div 
        animate={{ x: ['-20vw', '120vw'], y: ['20vh', '80vh'] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 text-[#A893FF] opacity-60 pointer-events-none z-0"
      >
        <Satellite size={32} />
      </motion.div>
      <motion.div 
        animate={{ x: ['120vw', '-20vw'], y: ['60vh', '10vh'] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 5 }}
        className="absolute top-0 left-0 text-[#00F0FF] opacity-50 pointer-events-none z-0 rotate-[45deg]"
      >
        <Satellite size={24} />
      </motion.div>
      <motion.div 
        animate={{ x: ['-20vw', '120vw'], y: ['90vh', '30vh'] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear", delay: 15 }}
        className="absolute top-0 left-0 text-[#FF3366] opacity-40 pointer-events-none z-0 -rotate-[30deg]"
      >
        <Satellite size={28} />
      </motion.div>

    </section>
  );
}
