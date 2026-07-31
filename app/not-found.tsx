"use client"

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Globe, Bot, Satellite } from 'lucide-react';
import Image from 'next/image';

export default function NotFound() {
  return (
    <section className="min-h-screen w-screen overflow-x-hidden bg-[#F4F6FB] flex flex-col items-center justify-center font-sans text-black relative">
      
      {/* --- Ambient Background Elements --- */}
      {/* Light grid pattern (optional for the dotted bg in mockup) */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-40"></div>

      {/* Large Watermark 404 Numbers */}
      <div className="absolute hidden md:flex left-[-8vw] top-1/2 -translate-y-1/2 text-[35vw] font-black text-[#E8EAF4] pointer-events-none select-none z-0">
        4
      </div>
      <div className="absolute hidden md:flex right-[-8vw] top-1/2 -translate-y-1/2 text-[35vw] font-black text-[#E8EAF4] pointer-events-none select-none z-0">
        4
      </div>

      {/* Floating 3D Planets (CSS representations) */}
      <motion.div 
        animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-[15%] w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-600 shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.2)] z-0 hidden md:block"
      >
        <div className="absolute w-[140%] h-[10px] border-2 border-pink-300 rounded-[50%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 opacity-80"></div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 20, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-[10%] w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 shadow-[inset_-15px_-15px_30px_rgba(0,0,0,0.3)] z-0 hidden md:block"
      >
        <div className="absolute w-[150%] h-[15px] border-2 border-blue-300 rounded-[50%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12 opacity-70"></div>
      </motion.div>
      
      {/* Blurred distant planet */}
      <div className="absolute bottom-10 right-[10%] w-20 h-20 rounded-full bg-purple-900/40 blur-xl z-0 hidden md:block"></div>


      {/* --- Main Card Container --- */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="relative z-10 w-[95%] max-w-[1200px] bg-white/90 backdrop-blur-xl rounded-[40px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-white p-8 md:p-14 my-10 md:my-0 flex flex-col items-center"
      >
        
        {/* Floating Top 404 Badge */}
        <div className="absolute -top-12 md:-top-16 bg-white shadow-[0_15px_35px_rgba(150,150,250,0.15)] rounded-full px-10 md:px-14 py-4 md:py-6 border border-purple-50 flex items-center justify-center z-20">
          {/* Orbital Rings around the badge */}
          <div className="absolute w-[140%] h-[140%] border border-purple-200/50 rounded-full -rotate-12 pointer-events-none"></div>
          <div className="absolute w-[120%] h-[120%] border border-pink-200/50 rounded-full rotate-45 pointer-events-none"></div>
          
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            404
          </h1>
        </div>

        <div className="flex flex-col md:flex-row w-full mt-10 md:mt-8 gap-10 md:gap-0">
          
          {/* Left Content Side */}
          <div className="w-full md:w-[55%] flex flex-col justify-center space-y-6 md:space-y-8 z-10">
            
            <div className="bg-[#F3F0FF] text-[#7857FF] rounded-full px-4 py-2 w-max font-semibold text-sm flex items-center gap-2 shadow-sm">
              <span className="text-base">⚠️</span> Oops! You're lost
            </div>
            
            <h2 className="text-4xl md:text-[4rem] md:leading-[1.1] font-extrabold text-[#1a1b2e] tracking-tight">
              Looks like you've <br className="hidden md:block" />
              wandered off <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7857FF] to-[#D754FF]">the map!</span>
            </h2>
            
            <div className="relative">
              <p className="text-gray-500 md:text-lg font-medium leading-relaxed">
                The page you're looking for doesn't exist <br className="hidden md:block" />
                or has been moved to another galaxy. 🪐
              </p>
              {/* Little dashed arrow decoration */}
              <svg className="absolute -right-4 -top-6 hidden lg:block text-purple-300 w-24 h-12" fill="none" viewBox="0 0 100 50">
                <path d="M10,40 Q40,60 60,30 T95,15" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" fill="none" />
                <path d="M90,10 L98,13 L93,20" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pt-4">
              <Link 
                href="/" 
                className="group w-full sm:w-auto bg-gradient-to-r from-[#5B3DF5] to-[#7E45FE] text-white rounded-[100px] px-8 py-4 font-bold text-lg flex items-center justify-between sm:justify-center gap-4 hover:shadow-[0_15px_30px_rgba(91,61,245,0.3)] transition-all hover:scale-105 active:scale-95"
              >
                Take Me Home
                <div className="bg-white text-[#5B3DF5] rounded-full p-1.5 group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={20} strokeWidth={3} />
                </div>
              </Link>
              
              <Link 
                href="/" 
                className="w-full sm:w-auto text-[#5B3DF5] font-bold flex items-center justify-center gap-2 hover:text-[#4221d6] transition-colors bg-white px-6 py-4 rounded-full border border-purple-100 shadow-sm hover:shadow-md"
              >
                <Compass size={20} className="text-[#967CFF]" />
                Explore Our Website
              </Link>
            </div>

          </div>
          
          {/* Right Image Side */}
          <div className="w-full md:w-[45%] relative flex justify-center items-center mt-10 md:mt-0">
            {/* Soft glow behind robot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-200/50 rounded-full blur-[60px] z-0"></div>
            
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              {/* If image missing, we can use an emoji or the image we created. We assume public/images/robot-404.png exists */}
              <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px]">
                <Image 
                  src="/images/robot-404.png" 
                  alt="Cute lost 3D robot looking at a map" 
                  fill 
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </motion.div>
            
            {/* Floating Speech Bubble */}
            <motion.div 
              animate={{ y: [0, -10, 0], opacity: [0.9, 1, 0.9] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute right-0 md:-right-8 top-[15%] md:top-[25%] bg-white rounded-2xl p-4 shadow-xl text-sm md:text-base text-gray-700 font-semibold z-20 border border-purple-50 after:content-[''] after:absolute after:bottom-[-10px] after:left-6 after:border-l-[10px] after:border-l-transparent after:border-r-[10px] after:border-r-transparent after:border-t-[10px] after:border-t-white"
            >
              Should I take<br/>you home? 🏚️
            </motion.div>
          </div>

        </div>

        {/* --- Bottom Feature Cards --- */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 bg-[#FAFBFF] rounded-[30px] p-6 md:p-8 mt-12 md:mt-16 border border-indigo-50/50 shadow-inner">
          
          <div className="flex items-center gap-5 md:pr-8 md:border-r border-indigo-100">
            <div className="bg-gradient-to-br from-[#F5F0FF] to-[#EBE3FF] p-4 rounded-2xl shadow-sm border border-white">
              <Globe className="text-[#A274FF]" size={32} />
            </div>
            <div>
              <h4 className="font-extrabold text-[#1a1b2e] mb-1">Lost in Space?</h4>
              <p className="text-[13px] text-gray-500 font-medium leading-relaxed">Let's get you back<br/>to the right place.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-5 md:px-8 md:border-r border-indigo-100">
            <div className="bg-gradient-to-br from-[#EEF2FF] to-[#E0E7FF] p-4 rounded-2xl shadow-sm border border-white">
              <Bot className="text-[#5B3DF5]" size={32} />
            </div>
            <div>
              <h4 className="font-extrabold text-[#1a1b2e] mb-1">Something Missing?</h4>
              <p className="text-[13px] text-gray-500 font-medium leading-relaxed">Maybe what you need<br/>was moved or removed.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-5 md:pl-8">
            <div className="bg-gradient-to-br from-[#F3F4FF] to-[#E6EBFF] p-4 rounded-2xl shadow-sm border border-white">
              <Satellite className="text-[#6366F1]" size={32} />
            </div>
            <div>
              <h4 className="font-extrabold text-[#1a1b2e] mb-1">Still Need Help?</h4>
              <p className="text-[13px] text-gray-500 font-medium leading-relaxed">Contact our team,<br/>we're here for you.</p>
            </div>
          </div>

        </div>

        {/* --- Bottom Footer Text --- */}
        <div className="flex items-center gap-4 mt-10 md:mt-12 w-full justify-center opacity-80">
          <div className="h-[2px] w-12 md:w-32 bg-gradient-to-r from-transparent to-purple-200"></div>
          <p className="text-xs md:text-sm text-gray-500 text-center font-medium">
            We'd give you an award for finding this dead end,<br className="hidden md:block"/>
            but we're out of budget. 🏆
          </p>
          <div className="h-[2px] w-12 md:w-32 bg-gradient-to-l from-transparent to-purple-200"></div>
        </div>
        
      </motion.div>
    </section>
  );
}
