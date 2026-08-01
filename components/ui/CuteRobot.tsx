'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function CuteRobot() {
  return (
    <motion.div
      initial={{ x: 0, y: 0, opacity: 1 }} 
      animate={{
        //          1    2    3    4    5    6    7    8    9   10   11   12   13   14   15   16
        x:       [  0,  50,  50,  50,  50,  65,  80,  80,  80,  80,  80,  80, 160, 240, 240, 240],
        y:       [-55, -55, -55, -55, -55, -85,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50],
        rotateY: [ 60,  60,  60,  60,  60,  60,  60,  60,  60,  60,   0,  60,  60,  60,  60,  60],
        rotate:  [  0,   0,   0,  25,   0,   0,   0,  90,  90,   0,   0,   0,   0,   0,   0,   0],
        scaleX:  [  1,   1,   1,   1,   1, 0.9, 1.2, 1.2, 1.2, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
        scaleY:  [  1,   1,   1,   1,   1, 1.1, 0.7, 0.7, 0.7, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
        opacity: [  1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1]
      }}
      transition={{
        duration: 14,
        repeat: Infinity,
        repeatType: "reverse",
        //      1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16
        times: [0.0, 0.15, 0.20, 0.23, 0.27, 0.32, 0.35, 0.37, 0.47, 0.50, 0.55, 0.60, 0.70, 0.80, 0.85, 1.0],
        ease: "easeInOut"
      }}
      style={{
        position: 'absolute',
        top: -45, 
        left: '10%', 
        width: '72px',
        height: '85px',
        zIndex: 10,
        pointerEvents: 'none',
        transformStyle: 'preserve-3d'
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes eyeExpression {
          0%, 19% { transform: scale(1, 1); rx: 4; }
          20%, 25% { transform: scale(1, 0.15); rx: 10; } /* Smile */
          26%, 44% { transform: scale(1, 1); rx: 4; }
          45%, 48% { transform: scale(1.3, 1.3); rx: 10; } /* Shocked jump */
          49%, 54% { transform: scale(1, 0); rx: 4; } /* Faceplant pain */
          55%, 100% { transform: scale(1, 1); rx: 4; }
        }
        @keyframes lookAround {
          0%, 100% { transform: translateX(0); }
        }
        @keyframes panting {
          0%, 100% { transform: scaleY(1) translateY(0); }
          50% { transform: scaleY(1.05) translateY(-2px); }
        }
        @keyframes earWiggle {
          0%, 54% { transform: rotate(0deg); }
          55%, 57%, 59% { transform: rotate(25deg); }
          56%, 58%, 60% { transform: rotate(-25deg); }
          61%, 100% { transform: rotate(0deg); }
        }
        @keyframes headBob {
          0%, 100% { transform: rotate(0deg) translateY(0px); }
          25% { transform: rotate(5deg) translateY(-2px); }
          50% { transform: rotate(0deg) translateY(0px); }
          75% { transform: rotate(-5deg) translateY(-2px); }
        }
        @keyframes legSwingLeft {
          0%, 100% { transform: rotate(20deg); }
          50% { transform: rotate(-25deg); }
        }
        @keyframes legSwingRight {
          0%, 100% { transform: rotate(-25deg); }
          50% { transform: rotate(20deg); }
        }
        @keyframes deepSigh {
          0%, 54% { transform: scale(1); }
          55%, 58% { transform: scale(1.05, 1.15) translateY(-5px); } /* Inhale deeply */
          59%, 63% { transform: scale(1.02, 0.95) translateY(2px); } /* Exhale heavily */
          64%, 100% { transform: scale(1); }
        }
        .robot-eye {
          animation: eyeExpression 14s infinite;
          transform-origin: center;
        }
        .robot-eyes-container {
          animation: lookAround 14s infinite;
        }
        .robot-body {
          animation: panting 0.6s infinite ease-in-out;
          transform-origin: bottom center;
        }
        .robot-heave {
          animation: deepSigh 14s infinite ease-in-out;
          transform-origin: bottom center;
        }
        .robot-head {
          animation: headBob 2.5s infinite ease-in-out;
          transform-origin: 50px 70px;
        }
        .robot-arm-left {
          animation: legSwingLeft 1.2s infinite ease-in-out;
          transform-origin: 30px 75px;
        }
        .robot-arm-right {
          animation: legSwingRight 1.2s infinite ease-in-out;
          transform-origin: 70px 75px;
        }
        .robot-ear {
          animation: earWiggle 14s infinite ease-in-out;
          transform-origin: right center;
        }
      `}} />
      
      <svg viewBox="0 0 100 120" width="100%" height="100%" style={{ filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.4))' }}>
        <defs>
          <radialGradient id="head-grad" cx="30%" cy="30%" r="80%" fx="30%" fy="30%">
            <stop offset="0%" stopColor="#a5b1c2" />
            <stop offset="50%" stopColor="#778492" />
            <stop offset="100%" stopColor="#3d444b" />
          </radialGradient>
          
          <radialGradient id="body-grad" cx="30%" cy="30%" r="80%" fx="30%" fy="30%">
            <stop offset="0%" stopColor="#838e9a" />
            <stop offset="70%" stopColor="#4a525b" />
            <stop offset="100%" stopColor="#2c3238" />
          </radialGradient>

          <radialGradient id="screen-grad" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#3a3f47" />
            <stop offset="60%" stopColor="#1a1d21" />
            <stop offset="100%" stopColor="#0a0c0e" />
          </radialGradient>

          <linearGradient id="screen-glass" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="40%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>

          <filter id="inner-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feOffset dx="0" dy="4"/>
            <feGaussianBlur stdDeviation="3" result="offset-blur"/>
            <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"/>
            <feFlood floodColor="black" floodOpacity="0.7" result="color"/>
            <feComposite operator="in" in="color" in2="inverse" result="shadow"/>
            <feComposite operator="over" in="shadow" in2="SourceGraphic"/>
          </filter>
        </defs>

        {/* Ground Shadow that scales with jump */}
        <ellipse cx="50" cy="105" rx="24" ry="5" fill="rgba(0,0,0,0.5)" filter="blur(2px)" />

        <g className="robot-body">
          <g className="robot-heave">
            {/* Body */}
            <path d="M 35 70 Q 50 65 65 70 C 70 70, 72 85, 65 95 C 60 105, 55 105, 50 100 C 45 105, 40 105, 35 95 C 28 85, 30 70, 35 70 Z" fill="url(#body-grad)" />
            {/* Body Highlight */}
            <path d="M 38 72 Q 50 68 62 72 Q 50 85 38 72" fill="rgba(255,255,255,0.15)" />
            
            {/* Left Arm (Paw) */}
            <g className="robot-arm-left">
              <path d="M 32 75 Q 22 80 25 90 Q 28 95 32 90" fill="url(#body-grad)" stroke="#3a4047" strokeWidth="1" />
              <path d="M 31 77 Q 24 82 26 88" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </g>
            
            {/* Right Arm (Paw) */}
            <g className="robot-arm-right">
              <path d="M 68 75 Q 78 80 75 90 Q 72 95 68 90" fill="url(#body-grad)" stroke="#3a4047" strokeWidth="1" />
              <path d="M 69 77 Q 76 82 74 88" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </g>

            <g className="robot-head">
              {/* Small arm/ear left (Puppy Ear Wiggle) */}
              <rect className="robot-ear" x="5" y="35" width="22" height="26" rx="6" fill="url(#body-grad)" />
              {/* Ear Highlight */}
              <rect className="robot-ear" x="6" y="36" width="20" height="10" rx="4" fill="rgba(255,255,255,0.2)" pointerEvents="none" />
              
              {/* Head Casing */}
              <rect x="15" y="10" width="70" height="60" rx="22" fill="url(#head-grad)" />
              {/* Head Bevel Highlight */}
              <rect x="16" y="11" width="68" height="58" rx="20" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
              <rect x="15" y="10" width="70" height="60" rx="22" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="2" />
              
              {/* Screen Face Base with Inner Shadow */}
              <rect x="25" y="20" width="50" height="40" rx="14" fill="url(#screen-grad)" filter="url(#inner-shadow)" />

              {/* Screen Glass Reflection */}
              <rect x="25" y="20" width="50" height="25" rx="14" fill="url(#screen-glass)" />
              <path d="M 25 35 Q 50 45 75 35 L 75 25 Q 50 15 25 25 Z" fill="rgba(255,255,255,0.1)" />

              {/* Eyes (Animated) */}
              <g className="robot-eyes-container">
                <rect className="robot-eye" x="40" y="32" width="10" height="12" rx="4" fill="#ffffff" style={{ filter: 'drop-shadow(0px 0px 8px rgba(255,255,255,1))' }} />
                <rect className="robot-eye" x="55" y="32" width="10" height="12" rx="4" fill="#ffffff" style={{ filter: 'drop-shadow(0px 0px 8px rgba(255,255,255,1))' }} />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </motion.div>
  );
}
