'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function CuteRobot() {
  return (
    <motion.div
      initial={{ x: 0, y: 0 }} // Start on top of "BUILD"
      animate={{
        x: [0, 80, 0], // Jump from "BUILD" to "FUTURE" and back
        y: [0, -40, 30, -40, 0], // Parabolic jump up and land, then jump back
        rotate: [0, 10, 0, -10, 0] // Slight rotation while jumping
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: "loop",
        times: [0, 0.4, 0.5, 0.9, 1], // Timing of the jump phases
        ease: "easeInOut"
      }}
      style={{
        position: 'absolute',
        top: -45, // Position above the text
        left: '25%', // Starting horizontal position
        width: '60px',
        height: '70px',
        zIndex: 10,
        pointerEvents: 'none'
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blink {
          0%, 45%, 55%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.1); }
        }
        @keyframes lookAround {
          0%, 20% { transform: translateX(0); }
          25%, 45% { transform: translateX(-4px); }
          50%, 70% { transform: translateX(4px); }
          75%, 100% { transform: translateX(0); }
        }
        .robot-eye {
          animation: blink 4s infinite;
          transform-origin: center;
        }
        .robot-eyes-container {
          animation: lookAround 6s infinite;
        }
      `}} />
      
      <svg viewBox="0 0 100 120" width="100%" height="100%">
        <defs>
          <linearGradient id="head-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8b95a1" />
            <stop offset="100%" stopColor="#5b636d" />
          </linearGradient>
          <linearGradient id="body-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6b737d" />
            <stop offset="100%" stopColor="#4b535d" />
          </linearGradient>
          <linearGradient id="screen-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2c3036" />
            <stop offset="100%" stopColor="#141619" />
          </linearGradient>
        </defs>

        {/* Shadow */}
        <ellipse cx="50" cy="105" rx="20" ry="4" fill="rgba(0,0,0,0.3)" />

        {/* Small arm/ear left */}
        <rect x="5" y="35" width="20" height="25" rx="5" fill="#4b535d" />
        
        {/* Head Casing */}
        <rect x="15" y="10" width="70" height="60" rx="20" fill="url(#head-grad)" />
        
        {/* Screen Face */}
        <rect x="25" y="20" width="50" height="40" rx="15" fill="url(#screen-grad)" />

        {/* Screen Reflection Curve */}
        <path d="M 28 35 Q 50 22 72 35 L 72 25 Q 50 18 28 25 Z" fill="rgba(255,255,255,0.05)" />

        {/* Eyes (Animated) */}
        <g className="robot-eyes-container">
          <rect className="robot-eye" x="40" y="32" width="10" height="12" rx="3" fill="#ffffff" style={{ filter: 'drop-shadow(0px 0px 4px rgba(255,255,255,0.8))' }} />
          <rect className="robot-eye" x="55" y="32" width="10" height="12" rx="3" fill="#ffffff" style={{ filter: 'drop-shadow(0px 0px 4px rgba(255,255,255,0.8))' }} />
        </g>

        {/* Body */}
        <path d="M 35 70 Q 50 65 65 70 C 70 70, 70 85, 65 95 C 60 105, 55 105, 50 100 C 45 105, 40 105, 35 95 C 30 85, 30 70, 35 70 Z" fill="url(#body-grad)" />
        
        {/* Left Arm */}
        <path d="M 32 75 Q 22 80 25 90 Q 28 95 32 90" fill="url(#body-grad)" />
        {/* Right Arm */}
        <path d="M 68 75 Q 78 80 75 90 Q 72 95 68 90" fill="url(#body-grad)" />
      </svg>
    </motion.div>
  );
}
