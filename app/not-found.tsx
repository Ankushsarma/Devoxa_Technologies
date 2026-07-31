"use client"

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <section className="h-screen w-screen overflow-hidden bg-[#fafafa] flex flex-col items-center justify-center font-sans text-black relative">
      
      {/* Ambient Premium Glowing Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-400/30 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-emerald-400/20 rounded-full blur-[150px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute top-[30%] left-[50%] w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 animate-pulse" style={{ animationDuration: '7s' }} />

      {/* Massive Background Watermark with Pulse */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.04, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <h1 className="text-[30vw] font-black tracking-tighter select-none bg-clip-text text-transparent bg-gradient-to-br from-black to-gray-500">
          404
        </h1>
      </motion.div>

      {/* Flying UFO */}
      <motion.div 
        className="absolute top-20 text-5xl md:text-7xl z-20 pointer-events-none drop-shadow-2xl"
        initial={{ x: '-20vw', y: 0, rotate: -15 }}
        animate={{ 
          x: '120vw', 
          y: [0, -40, 20, -20, 0], 
          rotate: [-15, 10, -5, 15, -15] 
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        🛸
      </motion.div>

      {/* Floating Planet */}
      <motion.div 
        className="absolute top-[15%] right-[12%] text-6xl md:text-8xl opacity-80 drop-shadow-xl"
        animate={{ y: [0, -30, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        🪐
      </motion.div>

      <div className="container mx-auto max-w-4xl text-center flex flex-col items-center justify-center h-full relative z-10 px-4">
        
        {/* GIF Background Container with Mix Blend Multiply to remove white background! */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
          className="relative h-[250px] md:h-[350px] w-full max-w-[600px] mx-auto bg-center bg-no-repeat bg-contain mix-blend-multiply drop-shadow-2xl"
          style={{ backgroundImage: 'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)' }}
        />
        
        <motion.div 
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
          className="space-y-4 md:space-y-6 relative z-10 p-6 md:p-10 rounded-3xl -mt-4 bg-white/40 backdrop-blur-xl border border-white/50 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.15)] ring-1 ring-black/5"
        >
          
          <h3 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-pink-600 to-orange-500 tracking-tight" style={{ backgroundSize: '200% auto', animation: 'gradientMove 4s ease infinite' }}>
            Congratulations! You broke the internet. 🎉
          </h3>
          
          <div className="space-y-3">
            <p className="text-gray-700 text-lg md:text-xl font-medium max-w-lg mx-auto">
              Just kidding. But seriously, the page you're looking for doesn't exist. Maybe our cute robot took it for a walk? 🤖🐕
            </p>
            <p className="text-gray-500 text-sm md:text-base font-medium">
              We'd give you an award for finding this dead end, but we're out of budget. 🏆
            </p>
          </div>
          
          <div className="pt-6">
            <Link 
              href="/" 
              className="group inline-flex items-center justify-center px-8 md:px-10 py-4 bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-800 text-white font-bold text-lg rounded-2xl transition-all duration-300 hover:scale-[1.05] active:scale-95 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden relative ring-2 ring-transparent hover:ring-white/20"
            >
              <span className="absolute inset-0 w-full h-full rounded-lg opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="relative flex items-center gap-2">
                Flee to Safety <span className="group-hover:translate-x-3 transition-transform duration-300">🏃‍♂️💨</span>
              </span>
            </Link>
          </div>
        </motion.div>

      </div>
      
      {/* Dynamic Gradient Animation for Text */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}} />
    </section>
  );
}
