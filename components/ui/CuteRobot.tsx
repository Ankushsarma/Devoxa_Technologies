'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function CuteRobot() {
  return (
    <motion.div
      initial={{ x: 0, y: 0, opacity: 1 }} 
      animate={{
        x:       [0, 90, 90, 90, 90, 90, 105, 120, 120, 120, 120, 120, 220, 220, 0],
        y:       [0, 0,  0,  0,  0,  0,  -60, 50,  50,  50,  50,  50,  50,  50,  0],
        rotate:  [0, 0,  0,  0,  0,  0,  180, 90,  90,  110, 70,  0,   0,   0,   0],
        scaleX:  [1, 1,  1,  1,  1,  1.1, 0.8, 1.4, 1.4, 1,   1,   1,   1,   1,   1],
        scaleY:  [1, 1,  1,  1,  1,  0.8, 1.2, 0.5, 0.5, 1,   1,   1,   1,   1,   1],
        opacity: [1, 1,  1,  1,  1,  1,   1,   1,   1,   1,   1,   1,   1,   0,   1]
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        repeatType: "loop",
        times: [0, 0.15, 0.25, 0.30, 0.40, 0.45, 0.475, 0.50, 0.55, 0.60, 0.62, 0.65, 0.90, 0.95, 1],
        ease: "easeInOut"
      }}
      style={{
        position: 'absolute',
        top: -95, 
        left: '10%', 
        width: '100px',
        height: '140px',
        zIndex: 10,
        pointerEvents: 'none'
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes walkLegFront {
          0%, 15%, 16%, 64%, 90%, 100% { transform: rotate(0deg); }
          2%, 6%, 10%, 14%, 67%, 71%, 75%, 79%, 83%, 87% { transform: rotate(-25deg); }
          4%, 8%, 12%, 69%, 73%, 77%, 81%, 85%, 89% { transform: rotate(25deg); }
        }
        @keyframes walkLegBack {
          0%, 15%, 16%, 64%, 90%, 100% { transform: rotate(0deg); }
          2%, 6%, 10%, 14%, 67%, 71%, 75%, 79%, 83%, 87% { transform: rotate(25deg); }
          4%, 8%, 12%, 69%, 73%, 77%, 81%, 85%, 89% { transform: rotate(-25deg); }
        }
        @keyframes headLook {
          0%, 25% { transform: rotate(0deg) translateY(0); }
          28%, 38% { transform: rotate(15deg) translateY(4px); }
          40%, 100% { transform: rotate(0deg) translateY(0); }
        }
        @keyframes eyeSquint {
          0%, 39% { transform: scaleY(1); rx: 15; }
          40%, 46% { transform: scaleY(0.15); rx: 10; }
          47%, 100% { transform: scaleY(1); rx: 15; }
        }
        @keyframes smileFade {
          0%, 39% { opacity: 0; transform: translateY(5px) scale(0.5); }
          40%, 46% { opacity: 1; transform: translateY(0px) scale(1.2); }
          47%, 100% { opacity: 0; transform: translateY(5px) scale(0.5); }
        }
        .mecha-leg-f {
          animation: walkLegFront 10s infinite ease-in-out;
          transform-origin: 50px 90px;
        }
        .mecha-leg-b {
          animation: walkLegBack 10s infinite ease-in-out;
          transform-origin: 50px 90px;
        }
        .mecha-arm-f {
          animation: walkLegBack 10s infinite ease-in-out;
          transform-origin: 55px 75px;
        }
        .mecha-arm-b {
          animation: walkLegFront 10s infinite ease-in-out;
          transform-origin: 45px 75px;
        }
        .mecha-head {
          animation: headLook 10s infinite ease-in-out;
          transform-origin: 50px 65px;
        }
        .mecha-eye {
          animation: eyeSquint 10s infinite;
          transform-origin: center;
        }
        .mecha-smile {
          animation: smileFade 10s infinite;
        }
      `}} />
      
      <svg viewBox="0 0 100 140" width="100%" height="100%" style={{ filter: 'drop-shadow(0 15px 20px rgba(0,0,0,0.5))' }}>
        <defs>
          <linearGradient id="armor-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e3dccc" />
          </linearGradient>
          <linearGradient id="armor-dark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#d5cebd" />
            <stop offset="100%" stopColor="#b5ae9d" />
          </linearGradient>
          <linearGradient id="joint-blue" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8a9bb2" />
            <stop offset="100%" stopColor="#546985" />
          </linearGradient>
          <linearGradient id="joint-dark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#414f6b" />
            <stop offset="100%" stopColor="#232a35" />
          </linearGradient>
          <linearGradient id="orange-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f5aa92" />
            <stop offset="100%" stopColor="#df8f74" />
          </linearGradient>
          <linearGradient id="screen-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7a92af" />
            <stop offset="100%" stopColor="#4a627f" />
          </linearGradient>
        </defs>

        <g stroke="#232a35" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          
          {/* BACKGROUND ARM (Left Arm) */}
          <g className="mecha-arm-b">
            {/* Shoulder */}
            <circle cx="35" cy="75" r="8" fill="url(#joint-dark)" />
            {/* Upper Arm */}
            <rect x="28" y="75" width="12" height="20" rx="3" fill="url(#joint-blue)" />
            {/* Forearm Block */}
            <rect x="25" y="90" width="18" height="25" rx="4" fill="url(#armor-dark)" />
            {/* Fist */}
            <circle cx="34" cy="116" r="6" fill="url(#joint-dark)" />
          </g>

          {/* BACKGROUND LEG (Left Leg) */}
          <g className="mecha-leg-b">
            {/* Thigh */}
            <rect x="35" y="95" width="14" height="20" rx="4" fill="url(#joint-dark)" />
            {/* Knee Orange Accent */}
            <circle cx="42" cy="115" r="5" fill="url(#orange-glow)" />
            {/* Calf Block */}
            <path d="M 32 115 L 50 115 L 52 135 L 30 135 Z" fill="url(#armor-dark)" />
            {/* Foot */}
            <path d="M 28 135 L 54 135 L 56 142 L 26 142 Z" fill="url(#joint-blue)" />
          </g>

          {/* FOREGROUND LEG (Right Leg) */}
          <g className="mecha-leg-f">
            {/* Thigh */}
            <rect x="52" y="95" width="16" height="22" rx="5" fill="url(#joint-blue)" />
            {/* Knee Orange Accent */}
            <circle cx="60" cy="118" r="6" fill="url(#orange-glow)" />
            {/* Calf Block */}
            <path d="M 50 118 L 70 118 L 74 138 L 46 138 Z" fill="url(#armor-grad)" />
            {/* Calf Panel Lines */}
            <line x1="56" y1="125" x2="64" y2="125" stroke="#232a35" strokeWidth="2" />
            {/* Foot */}
            <path d="M 44 138 L 76 138 L 78 145 L 42 145 Z" fill="url(#joint-dark)" />
          </g>

          {/* TORSO / CHEST */}
          <g>
            {/* Waist/Pelvis */}
            <path d="M 38 85 L 62 85 L 65 102 L 35 102 Z" fill="url(#armor-dark)" />
            {/* Pelvis Plate */}
            <path d="M 40 95 L 60 95 L 58 106 L 42 106 Z" fill="url(#armor-grad)" />
            
            {/* Chest Core */}
            <rect x="30" y="65" width="40" height="25" rx="4" fill="url(#joint-blue)" />
            {/* Chest Armor Box */}
            <path d="M 25 60 L 75 60 L 72 82 L 28 82 Z" fill="url(#armor-grad)" />
            
            {/* Chest Details */}
            <circle cx="50" cy="72" r="4" fill="#a49a88" stroke="none" />
            <rect x="30" y="65" width="4" height="2" fill="#232a35" stroke="none" />
            <rect x="66" y="65" width="4" height="2" fill="#232a35" stroke="none" />
            {/* Lower chest vent */}
            <rect x="40" y="82" width="20" height="4" fill="#232a35" stroke="none" />
          </g>

          {/* FOREGROUND ARM (Right Arm) */}
          <g className="mecha-arm-f">
            {/* Shoulder Joint/Armor */}
            <path d="M 65 65 L 82 62 L 85 75 L 65 72 Z" fill="url(#armor-dark)" />
            <circle cx="78" cy="70" r="6" fill="url(#orange-glow)" />
            {/* Upper Arm */}
            <rect x="74" y="75" width="14" height="22" rx="4" fill="url(#joint-blue)" />
            {/* Forearm Block */}
            <rect x="70" y="94" width="22" height="30" rx="5" fill="url(#armor-grad)" />
            {/* Forearm Details */}
            <rect x="85" y="112" width="5" height="5" fill="#232a35" stroke="none" />
            <rect x="73" y="112" width="10" height="2" fill="#232a35" stroke="none" />
            {/* Fist */}
            <path d="M 72 124 L 90 124 L 88 132 L 74 132 Z" fill="url(#joint-dark)" rx="3" />
          </g>

          {/* HEAD */}
          <g className="mecha-head">
            {/* Neck */}
            <rect x="40" y="55" width="20" height="10" fill="url(#joint-dark)" />

            {/* Main Casing */}
            <rect x="15" y="10" width="70" height="55" rx="15" fill="url(#armor-grad)" />
            
            {/* Panel Lines / Screws */}
            <line x1="25" y1="10" x2="25" y2="20" />
            <line x1="75" y1="10" x2="75" y2="20" />
            <circle cx="75" cy="55" r="2" fill="#232a35" stroke="none" />
            <line x1="20" y1="50" x2="25" y2="45" />

            {/* Blue Screen Face Base */}
            <rect x="22" y="18" width="45" height="40" rx="8" fill="url(#screen-grad)" />
            {/* Screen Corner Screws (Orange) */}
            <circle cx="26" cy="22" r="2.5" fill="url(#orange-glow)" />
            <circle cx="63" cy="22" r="2.5" fill="url(#orange-glow)" />
            <circle cx="26" cy="54" r="2.5" fill="url(#orange-glow)" />
            <circle cx="63" cy="54" r="2.5" fill="url(#orange-glow)" />

            {/* Glass Reflection Highlight */}
            <path d="M 22 25 Q 45 35 67 25 L 67 18 Q 45 10 22 18 Z" fill="rgba(255,255,255,0.15)" stroke="none" />

            {/* Giant Circular Earpiece (Right) */}
            <circle cx="80" cy="35" r="16" fill="url(#armor-grad)" />
            <circle cx="80" cy="35" r="12" fill="url(#orange-glow)" />
            <circle cx="80" cy="35" r="9" fill="url(#armor-dark)" />
            <line x1="80" y1="26" x2="80" y2="30" stroke="#232a35" strokeWidth="2" />
            <line x1="80" y1="40" x2="80" y2="44" stroke="#232a35" strokeWidth="2" />

            {/* Eyes */}
            <rect className="mecha-eye" x="28" y="32" width="12" height="14" rx="15" fill="#ffffff" />
            <rect className="mecha-eye" x="50" y="32" width="12" height="14" rx="15" fill="#ffffff" />

            {/* The Cute Smile (Only appears during look up) */}
            <path className="mecha-smile" d="M 40 45 Q 45 42 50 45" stroke="#232a35" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </g>
        </g>
      </svg>
    </motion.div>
  );
}
