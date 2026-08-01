'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

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
        top: -75, // Adjust slightly higher to accommodate 3D model box
        left: '10%', 
        width: '120px', // Larger box so 3D model looks crisp and not cut off
        height: '140px',
        zIndex: 10,
        pointerEvents: 'auto', // Needs auto to interact with Spline
        transformStyle: 'preserve-3d'
      }}
    >
      {/* High-quality fully interactive 3D robot using Spline */}
      <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
    </motion.div>
  );
}
