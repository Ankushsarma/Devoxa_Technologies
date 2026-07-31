"use client"

import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight, Compass } from 'lucide-react';
import CuteRobot from '@/components/ui/CuteRobot';

export default function NotFound() {
  return (
    <section className="min-h-screen w-full overflow-hidden bg-[#f4f7ff] flex flex-col items-center justify-center font-sans relative px-4 py-10">
      
      {/* Background Ambience */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#e0d6ff] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#d6e2ff] rounded-full blur-[100px] pointer-events-none" />
      
      {/* Huge Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <h1 className="text-[35vw] font-black tracking-tighter text-white drop-shadow-md">
          404
        </h1>
      </div>
      
      {/* Floating 3D Planets (Emojis scaled up for ambient effect) */}
      <motion.div className="absolute top-[15%] right-[5%] z-20 text-6xl drop-shadow-xl" animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }} transition={{ duration: 6, repeat: Infinity }}>
        🪐
      </motion.div>
      <motion.div className="absolute bottom-[10%] left-[5%] z-20 text-7xl drop-shadow-xl" animate={{ y: [0, -30, 0], rotate: [0, 10, -10, 0] }} transition={{ duration: 8, repeat: Infinity }}>
        🌍
      </motion.div>

      {/* Main Content Card */}
      <div className="relative z-10 w-full max-w-[1100px] bg-white/80 backdrop-blur-3xl rounded-[40px] shadow-[0_20px_80px_-20px_rgba(0,0,0,0.05)] border border-white p-8 md:p-12 flex flex-col">
        
        {/* Top Section (Left and Right) */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-0">
          
          {/* Left Column - Text content */}
          <div className="w-full lg:w-[55%] flex flex-col items-start text-left space-y-6">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#f0ecff] text-[#6b4cff] rounded-full text-sm font-semibold shadow-sm">
              <AlertTriangle className="w-4 h-4" />
              Oops! You're lost
            </div>
            
            {/* Heading */}
            <h2 className="text-5xl lg:text-[4.5rem] font-extrabold text-[#1c1c28] leading-[1.1] tracking-tight">
              Looks like you've <br/>
              wandered off <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6b4cff] to-[#b24cff]">the map!</span>
            </h2>
            
            {/* Description */}
            <p className="text-gray-500 text-lg max-w-[400px]">
              The page you're looking for doesn't exist or has been moved to another galaxy. 🪐
            </p>
            
            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <Link href="/" className="group inline-flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-[#4c24e8] to-[#6b4cff] hover:from-[#3f1bc4] hover:to-[#5536e0] text-white font-semibold rounded-full shadow-lg shadow-[#6b4cff]/40 transition-all hover:scale-105 active:scale-95">
                Take Me Home
                <div className="bg-white text-[#6b4cff] rounded-full p-[6px] group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
              
              <Link href="/" className="inline-flex items-center gap-2 text-[#6b4cff] font-semibold hover:text-[#4c24e8] transition-colors">
                <Compass className="w-5 h-5" />
                Explore Our Website
              </Link>
            </div>
            
          </div>
          
          {/* Right Column - Robot & Graphic */}
          <div className="w-full lg:w-[45%] relative flex justify-center items-center min-h-[400px]">
            {/* 404 Floating Bubble behind robot */}
            <motion.div 
              className="absolute top-0 w-[220px] h-[220px] rounded-full border-2 border-purple-100 bg-white shadow-[0_0_50px_rgba(107,76,255,0.15)] flex items-center justify-center z-0"
              animate={{ y: [-15, 15, -15] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#6b4cff] to-[#b24cff] font-black text-7xl">404</span>
            </motion.div>

            {/* Sparkles around robot */}
            <div className="absolute top-[20%] left-[10%] text-yellow-400 text-2xl animate-pulse">✨</div>
            <div className="absolute bottom-[30%] right-[10%] text-yellow-400 text-2xl animate-pulse" style={{ animationDelay: '1s'}}>✨</div>
            
            {/* Robot Component Container - We scale it down slightly so it fits beautifully */}
            <div className="relative z-10 w-[320px] h-[320px] flex items-end justify-center">
              <div className="scale-75 origin-bottom">
                <CuteRobot />
              </div>
            </div>

            {/* Speech Bubble */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: 'spring', bounce: 0.5 }}
              className="absolute top-[15%] right-[-10%] bg-white shadow-xl shadow-gray-200/50 rounded-2xl p-4 text-sm font-semibold text-gray-600 z-20 border border-gray-100"
            >
              Should I take <br/> you home? 🏠
              <div className="absolute bottom-[-6px] left-[20px] w-4 h-4 bg-white border-b border-r border-gray-100 rotate-45"></div>
            </motion.div>

          </div>
          
        </div>
        
        {/* Bottom Info Cards Section */}
        <div className="mt-16 pt-8 border-t border-gray-100/50 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50/80 transition-colors cursor-pointer group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f4f0ff] to-white flex items-center justify-center flex-shrink-0 shadow-sm border border-purple-50 group-hover:scale-110 transition-transform">
              <span className="text-2xl drop-shadow-sm">🪐</span>
            </div>
            <div>
              <h4 className="font-bold text-[#1c1c28]">Lost in Space?</h4>
              <p className="text-gray-400 text-xs mt-1 leading-relaxed">Let's get you back to the right place.</p>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50/80 transition-colors cursor-pointer group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f0f5ff] to-white flex items-center justify-center flex-shrink-0 shadow-sm border border-blue-50 group-hover:scale-110 transition-transform">
              <span className="text-2xl drop-shadow-sm">🤖</span>
            </div>
            <div>
              <h4 className="font-bold text-[#1c1c28]">Something Missing?</h4>
              <p className="text-gray-400 text-xs mt-1 leading-relaxed">Maybe what you need was moved or removed.</p>
            </div>
          </div>
          
          {/* Card 3 */}
          <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50/80 transition-colors cursor-pointer group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f8f0ff] to-white flex items-center justify-center flex-shrink-0 shadow-sm border border-pink-50 group-hover:scale-110 transition-transform">
              <span className="text-2xl drop-shadow-sm">🛰️</span>
            </div>
            <div>
              <h4 className="font-bold text-[#1c1c28]">Still Need Help?</h4>
              <p className="text-gray-400 text-xs mt-1 leading-relaxed">Contact our team, we're here for you.</p>
            </div>
          </div>

        </div>

      </div>

      {/* Footer Text */}
      <div className="mt-10 relative z-10 text-center">
        <p className="text-gray-500 font-medium text-sm">
          We'd give you an award for finding this dead end, 
          but we're out of budget. 🏆
        </p>
      </div>

    </section>
  );
}
