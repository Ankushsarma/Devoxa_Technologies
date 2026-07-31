"use client"

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <section className="h-screen w-screen overflow-hidden bg-white flex flex-col items-center justify-center font-sans text-black relative">
      
      {/* Massive Background Watermark with Pulse */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.03, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <h1 className="text-[30vw] font-black tracking-tighter select-none">404</h1>
      </motion.div>

      {/* Floating decorative elements for a broken/funny vibe */}
      
      {/* Flying UFO */}
      <motion.div 
        className="absolute top-20 text-5xl md:text-7xl z-20 pointer-events-none"
        initial={{ x: '-20vw', y: 0, rotate: -15 }}
        animate={{ 
          x: '120vw', 
          y: [0, -40, 20, -20, 0], 
          rotate: [-15, 10, -5, 15, -15] 
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        🛸
      </motion.div>

      {/* Floating Planet */}
      <motion.div 
        className="absolute top-[20%] right-[10%] text-6xl md:text-8xl opacity-80"
        animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        🪐
      </motion.div>

      {/* Spinning Gear */}
      <motion.div 
        className="absolute bottom-[20%] left-[10%] text-5xl md:text-7xl opacity-50"
        animate={{ rotate: 360, y: [0, 10, 0] }}
        transition={{ rotate: { duration: 8, repeat: Infinity, ease: "linear" }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
      >
        ⚙️
      </motion.div>

      {/* Blinking Eyes */}
      <motion.div 
        className="absolute bottom-[25%] right-[15%] text-4xl md:text-6xl"
        animate={{ y: [0, -10, 0], scaleY: [1, 1, 0.1, 1, 1] }}
        transition={{ 
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          scaleY: { duration: 4, repeat: Infinity, ease: "easeInOut", times: [0, 0.45, 0.5, 0.55, 1] }
        }}
      >
        👀
      </motion.div>

      <div className="container mx-auto max-w-4xl text-center flex flex-col items-center justify-center h-full relative z-10 px-4">
        
        {/* GIF Background Container */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
          className="relative h-[250px] md:h-[350px] w-full max-w-[600px] mx-auto bg-center bg-no-repeat bg-contain"
          style={{ backgroundImage: 'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)' }}
        />
        
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
          className="space-y-4 md:space-y-6 relative z-10 p-6 md:p-10 rounded-3xl -mt-4 bg-white/70 backdrop-blur-md border border-gray-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]"
        >
          
          <h3 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900" style={{ backgroundSize: '200% auto', animation: 'gradientMove 3s ease infinite' }}>
            Houston, We Have a Problem!
          </h3>
          
          <div className="space-y-2">
            <p className="text-gray-600 text-lg md:text-xl font-medium max-w-lg mx-auto">
              The page you are looking for has been abducted by aliens... or maybe our cute robot ate the wires. 🤖⚡
            </p>
            <p className="text-gray-400 text-sm md:text-base italic">
              (Either way, it's definitely not here).
            </p>
          </div>
          
          <div className="pt-6">
            <Link 
              href="/" 
              className="group inline-flex items-center justify-center px-8 md:px-10 py-4 bg-gray-900 hover:bg-black text-white font-bold text-lg rounded-2xl transition-all duration-300 hover:scale-[1.05] active:scale-95 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden relative"
            >
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
              <span className="relative flex items-center gap-2">
                Flee to Homepage <span className="group-hover:translate-x-3 transition-transform duration-300">🏃‍♂️💨</span>
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
