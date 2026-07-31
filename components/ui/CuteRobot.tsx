'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function CuteRobot() {
  return (
    <motion.div
      initial={{ x: 0, y: 0, opacity: 1 }} 
      animate={{
        //          1    2    3    4    5    6    7    8    9    10   11   12   13   14   15   16   17   18   19
        x:       [  0,  40,  40,  40,  40,  40,  50,  60,  60,  60,  60, 100, 160, 160, 160, 160, 240, 240,   0],
        y:       [-55, -55, -55, -55, -55, -40,-100,  15,   0,   0,  15, -50,  50,  50,  50,  50,  50,  50, -55],
        rotateY: [ 60,  60,  60,   0,   0,  60,  60,  60,  60,   0,  60,  60,  60,  60,  60,  60,  60,  60,  60],
        rotate:  [  0,   0,  25,   0,   0,   0,   0,   0,   0,   0,   0,   0,  90,  90, 110,   0,   0,   0,   0],
        scaleX:  [  1,   1,   1,   1,   1,   1, 0.9,   1,   1,   1,   1, 0.9,   1,   1,   1,   1,   1,   1,   1],
        scaleY:  [  1,   1,   1,   1,   1,   1, 1.1,   1,   1,   1,   1, 1.1,   1,   1,   1,   1,   1,   1,   1],
        opacity: [  1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   0,   1]
      }}
      transition={{
        duration: 14,
        repeat: Infinity,
        repeatType: "loop",
        //      1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19
        times: [0.0, 0.10, 0.15, 0.20, 0.25, 0.28, 0.30, 0.32, 0.35, 0.40, 0.43, 0.45, 0.48, 0.52, 0.55, 0.65, 0.90, 0.95, 1.0],
        ease: "easeInOut"
      }}
      style={{
        position: 'absolute',
        top: -70, 
        left: '10%', 
        width: '66px',
        height: '80px',
        zIndex: 10,
        pointerEvents: 'none',
        transformStyle: 'preserve-3d'
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes leftThigh {
          0% { transform: rotate(-25deg); }
          2.5% { transform: rotate(25deg); }
          5% { transform: rotate(-25deg); }
          7.5% { transform: rotate(25deg); }
          10%, 25% { transform: rotate(0deg); }
          28% { transform: rotate(-50deg); }
          30% { transform: rotate(-10deg); }
          32% { transform: rotate(-50deg); }
          35%, 40% { transform: rotate(0deg); }
          43% { transform: rotate(-50deg); }
          45% { transform: rotate(10deg); }
          48%, 89% { transform: rotate(0deg); } 
          90% { transform: rotate(-25deg); }
          92.5% { transform: rotate(25deg); }
          95%, 100% { transform: rotate(0deg); }
        }
        @keyframes rightThigh {
          0% { transform: rotate(25deg); }
          2.5% { transform: rotate(-25deg); }
          5% { transform: rotate(25deg); }
          7.5% { transform: rotate(-25deg); }
          10%, 25% { transform: rotate(0deg); }
          28% { transform: rotate(-50deg); }
          30% { transform: rotate(-10deg); }
          32% { transform: rotate(-50deg); }
          35%, 40% { transform: rotate(0deg); }
          43% { transform: rotate(-50deg); }
          45% { transform: rotate(10deg); }
          48%, 89% { transform: rotate(0deg); } 
          90% { transform: rotate(25deg); }
          92.5% { transform: rotate(-25deg); }
          95%, 100% { transform: rotate(0deg); }
        }
        @keyframes leftCalf {
          0% { transform: rotate(5deg); }
          2.5% { transform: rotate(30deg); }
          5% { transform: rotate(5deg); }
          7.5% { transform: rotate(30deg); }
          10%, 25% { transform: rotate(0deg); }
          28% { transform: rotate(100deg); }
          30% { transform: rotate(20deg); }
          32% { transform: rotate(100deg); }
          35%, 40% { transform: rotate(0deg); }
          43% { transform: rotate(100deg); }
          45% { transform: rotate(20deg); }
          48%, 89% { transform: rotate(0deg); } 
          90% { transform: rotate(5deg); }
          92.5% { transform: rotate(30deg); }
          95%, 100% { transform: rotate(0deg); }
        }
        @keyframes rightCalf {
          0% { transform: rotate(30deg); }
          2.5% { transform: rotate(5deg); }
          5% { transform: rotate(30deg); }
          7.5% { transform: rotate(5deg); }
          10%, 25% { transform: rotate(0deg); }
          28% { transform: rotate(100deg); }
          30% { transform: rotate(20deg); }
          32% { transform: rotate(100deg); }
          35%, 40% { transform: rotate(0deg); }
          43% { transform: rotate(100deg); }
          45% { transform: rotate(20deg); }
          48%, 89% { transform: rotate(0deg); } 
          90% { transform: rotate(30deg); }
          92.5% { transform: rotate(5deg); }
          95%, 100% { transform: rotate(0deg); }
        }
        @keyframes leftArm {
          0% { transform: rotate(30deg); }
          2.5% { transform: rotate(-30deg); }
          5% { transform: rotate(30deg); }
          7.5% { transform: rotate(-30deg); }
          10%, 25% { transform: rotate(0deg); }
          28% { transform: rotate(-80deg); }
          30% { transform: rotate(150deg); }
          32% { transform: rotate(-40deg); }
          35%, 40% { transform: rotate(0deg); }
          43% { transform: rotate(-80deg); }
          45% { transform: rotate(150deg); }
          48%, 89% { transform: rotate(0deg); }
          90% { transform: rotate(30deg); }
          92.5% { transform: rotate(-30deg); }
          95%, 100% { transform: rotate(0deg); }
        }
        @keyframes rightArm {
          0% { transform: rotate(-30deg); }
          2.5% { transform: rotate(30deg); }
          5% { transform: rotate(-30deg); }
          7.5% { transform: rotate(30deg); }
          10%, 25% { transform: rotate(0deg); }
          28% { transform: rotate(80deg); }
          30% { transform: rotate(-150deg); }
          32% { transform: rotate(40deg); }
          35%, 40% { transform: rotate(0deg); }
          43% { transform: rotate(80deg); }
          45% { transform: rotate(-150deg); }
          48%, 89% { transform: rotate(0deg); }
          90% { transform: rotate(-30deg); }
          92.5% { transform: rotate(30deg); }
          95%, 100% { transform: rotate(0deg); }
        }
        @keyframes visorScan {
          0%, 100% { transform: scaleX(1); opacity: 1; }
          10%, 90% { transform: scaleX(0.5) translateX(-5px); opacity: 0.8; }
          50% { transform: scaleX(0.5) translateX(5px); opacity: 0.8; }
          45%, 52% { transform: scaleX(1.5) scaleY(1.5); opacity: 1; fill: #ef4444; } /* Red shock eye! */
        }
        .anim-left-thigh { animation: leftThigh 14s infinite ease-in-out; }
        .anim-right-thigh { animation: rightThigh 14s infinite ease-in-out; }
        .anim-left-calf { animation: leftCalf 14s infinite ease-in-out; }
        .anim-right-calf { animation: rightCalf 14s infinite ease-in-out; }
        .anim-left-arm { animation: leftArm 14s infinite ease-in-out; }
        .anim-right-arm { animation: rightArm 14s infinite ease-in-out; }
        .anim-visor { animation: visorScan 14s infinite ease-in-out; transform-origin: center; }
      `}} />
      
      <svg viewBox="0 0 100 120" width="100%" height="100%" style={{ filter: 'drop-shadow(0 15px 20px rgba(0,0,0,0.5))' }}>
        <defs>
          <linearGradient id="metal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <linearGradient id="dark-metal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
        </defs>

        <g transform="translate(50, 50)">
          {/* Right Arm (Back) */}
          <g className="anim-right-arm" style={{ transformOrigin: '0px -15px' }}>
            <rect x="-6" y="-15" width="12" height="35" rx="6" fill="url(#dark-metal)" />
            <circle cx="0" cy="-10" r="8" fill="#1e293b" />
          </g>

          {/* Right Leg (Back) */}
          <g className="anim-right-thigh" style={{ transformOrigin: '0px 10px' }}>
            <rect x="-7" y="10" width="14" height="25" rx="5" fill="url(#dark-metal)" />
            <circle cx="0" cy="10" r="6" fill="#0f172a" />
            <g className="anim-right-calf" style={{ transformOrigin: '0px 32px' }}>
              <rect x="-6" y="32" width="12" height="25" rx="4" fill="url(#dark-metal)" />
              <circle cx="0" cy="32" r="5" fill="#0f172a" />
              <path d="M -6 57 L 12 57 L 10 50 L -6 50 Z" fill="#1e293b" />
            </g>
          </g>

          {/* Left Leg (Front) */}
          <g className="anim-left-thigh" style={{ transformOrigin: '0px 10px' }}>
            <rect x="-8" y="10" width="16" height="25" rx="6" fill="url(#metal-grad)" />
            <circle cx="0" cy="10" r="7" fill="#334155" />
            <g className="anim-left-calf" style={{ transformOrigin: '0px 32px' }}>
              <rect x="-7" y="32" width="14" height="25" rx="5" fill="url(#metal-grad)" />
              <circle cx="0" cy="32" r="6" fill="#334155" />
              <path d="M -7 57 L 15 57 L 12 50 L -7 50 Z" fill="url(#metal-grad)" />
            </g>
          </g>

          {/* Torso */}
          <g className="torso">
            <path d="M -15 -20 L 15 -20 L 18 15 L -18 15 Z" fill="url(#metal-grad)" />
            {/* Chest Core Light */}
            <circle cx="0" cy="-2" r="6" fill="#e0f2fe" style={{ filter: 'drop-shadow(0 0 5px #38bdf8)' }} />
            <circle cx="0" cy="-2" r="3" fill="#ffffff" />
            <path d="M -10 -15 L 10 -15 L 12 -5 L -12 -5 Z" fill="rgba(255,255,255,0.2)" />
          </g>

          {/* Head */}
          <g className="head" style={{ transformOrigin: '0px -25px' }}>
            <rect x="-18" y="-50" width="36" height="28" rx="6" fill="url(#metal-grad)" />
            <rect x="-14" y="-45" width="28" height="15" rx="3" fill="#0f172a" />
            {/* LED Visor Eye */}
            <rect className="anim-visor" x="-10" y="-41" width="20" height="6" rx="3" fill="#38bdf8" style={{ filter: 'drop-shadow(0 0 6px #0ea5e9)' }} />
          </g>

          {/* Left Arm (Front) */}
          <g className="anim-left-arm" style={{ transformOrigin: '0px -15px' }}>
            <rect x="-7" y="-15" width="14" height="38" rx="7" fill="url(#metal-grad)" />
            <circle cx="0" cy="-10" r="9" fill="#334155" />
            <circle cx="0" cy="-10" r="4" fill="#94a3b8" />
          </g>
        </g>
      </svg>
    </motion.div>
  );
}
