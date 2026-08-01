'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';

export function CuteRobot() {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch('/humanoid-robot.json')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Animation not found');
      })
      .then((data) => setAnimationData(data))
      .catch(() => {
        console.warn('humanoid-robot.json not found in public folder. Please add it to see the 3D humanoid robot.');
      });
  }, []);
  return (
    <motion.div
      initial={{ x: 0, y: 0, opacity: 1 }} 
      animate={{
        //          1    2    3    4    5    6    7    8    9   10   11   12   13   14   15   16
        x:       [  0,  50,  50,  50,  50,  65,  80,  80,  80,  80,  80,  80, 160, 240, 240, 240],
        y:       [-55, -55, -55, -55, -55, -85,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50],
        rotateY: [ 60,  60,  60,  60,  60,  60,  60,  60,  60,  60,   0,  60,  60,  60,  60,  60],
        rotate:  [  0,   0,   0,  25,   0,   0,   0,  90,  90,   0,   0,   0,   0,   0,   0,   0],
        scaleX:  [  1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1],
        scaleY:  [  1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1],
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
        top: -65, 
        left: '10%', 
        width: '100px', 
        height: '140px',
        zIndex: 10,
        pointerEvents: 'none',
        transformStyle: 'preserve-3d'
      }}
    >
      {animationData ? (
        <Lottie 
          animationData={animationData} 
          loop={true} 
          style={{ width: '100%', height: '100%', filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.5))' }} 
        />
      ) : (
        <>
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
      
      <svg viewBox="0 0 100 110" width="100%" height="100%" style={{ filter: 'drop-shadow(0 15px 20px rgba(0,0,0,0.6))' }}>
        <defs>
          {/* Head 3D Lighting Gradient */}
          <radialGradient id="head-blender-3d" cx="30%" cy="25%" r="75%" fx="25%" fy="20%">
            <stop offset="0%" stopColor="#87929d" />
            <stop offset="40%" stopColor="#555d66" />
            <stop offset="85%" stopColor="#353b42" />
            <stop offset="100%" stopColor="#22262b" />
          </radialGradient>
          
          {/* Body 3D Gradient */}
          <linearGradient id="body-blender-3d" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#353b42" />
            <stop offset="30%" stopColor="#555d66" />
            <stop offset="100%" stopColor="#25292e" />
          </linearGradient>

          {/* Glossy Dark Screen Gradient */}
          <radialGradient id="screen-blender-3d" cx="40%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#25292e" />
            <stop offset="60%" stopColor="#121416" />
            <stop offset="100%" stopColor="#0a0b0c" />
          </radialGradient>

          {/* Screen Glass Reflection */}
          <linearGradient id="glass-reflection" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
            <stop offset="45%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        {/* Soft Ambient Ground Shadow */}
        <ellipse cx="50" cy="102" rx="22" ry="4" fill="rgba(0,0,0,0.6)" filter="blur(3px)" />

        <g className="robot-body">
          <g className="robot-heave">
            
            {/* Torso & Stubby Legs (Blender Style) */}
            <g className="robot-legs">
              {/* Main Body Nub */}
              <path d="M 36 62 Q 50 58 64 62 C 68 62, 70 75, 65 88 C 62 94, 57 96, 52 90 C 48 96, 43 94, 40 88 C 35 75, 32 62, 36 62 Z" fill="url(#body-blender-3d)" />
              {/* Occlusion Shadow under Head */}
              <path d="M 34 62 Q 50 67 66 62 C 64 68, 36 68, 34 62 Z" fill="rgba(0,0,0,0.4)" />
            </g>

            {/* Left Arm Nub */}
            <g className="robot-arm-left">
              <path d="M 33 66 Q 25 70 27 78 Q 30 83 34 78" fill="url(#body-blender-3d)" />
            </g>
            
            {/* Right Arm Nub */}
            <g className="robot-arm-right">
              <path d="M 67 66 Q 75 70 73 78 Q 70 83 66 78" fill="url(#body-blender-3d)" />
            </g>

            {/* Head Assembly */}
            <g className="robot-head">
              
              {/* Left Side Button / Ear Nub */}
              <rect className="robot-ear" x="8" y="32" width="10" height="20" rx="4" fill="#41474e" />
              <rect className="robot-ear" x="9" y="33" width="8" height="8" rx="2" fill="rgba(255,255,255,0.15)" />

              {/* Main Head Casing (Rounded 3D Cube Helmet) */}
              <rect x="14" y="8" width="72" height="60" rx="24" fill="url(#head-blender-3d)" />
              
              {/* Top Soft Rim Highlight (3D Lighting Bevel) */}
              <rect x="15" y="9" width="70" height="58" rx="23" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
              <rect x="14" y="8" width="72" height="60" rx="24" fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" />
              
              {/* Inset Screen Bevel Frame */}
              <rect x="23" y="16" width="54" height="44" rx="18" fill="#25292e" />
              <rect x="24" y="17" width="52" height="42" rx="17" fill="url(#screen-blender-3d)" />

              {/* Glossy Glass Reflection Overlay */}
              <rect x="24" y="17" width="52" height="24" rx="17" fill="url(#glass-reflection)" />

              {/* Eyes (Glowing Rounded Squares) */}
              <g className="robot-eyes-container">
                <rect className="robot-eye" x="38" y="30" width="10" height="13" rx="4" fill="#ffffff" style={{ filter: 'drop-shadow(0px 0px 6px rgba(255,255,255,0.9))' }} />
                <rect className="robot-eye" x="52" y="30" width="10" height="13" rx="4" fill="#ffffff" style={{ filter: 'drop-shadow(0px 0px 6px rgba(255,255,255,0.9))' }} />
              </g>

            </g>
          </g>
        </g>
      </svg>
      </>
      )}
    </motion.div>
  );
}
