'use client';

import { useEffect, useState } from 'react';

/**
 * CSSParticleStars
 * Pure CSS animated star/particle field — zero WebGL, zero hydration mismatch.
 * 
 * Server renders: background overlay + ambient glows only (no dots).
 * Client renders: dots added after mount via useEffect to avoid SSR/client mismatch.
 */

const COLORS = ['#ffffff', '#f1eef1', '#ded8df', '#c6bbc7', '#ad9daf', '#8f7992', '#705474', '#523056'];

function seededRand(seed: number) {
  const x = Math.sin(seed + 1) * 43758.5453;
  return x - Math.floor(x);
}

interface Dot {
  x: string;
  y: string;
  size: string;
  color: string;
  dur: string;
  delay: string;
  driftX: string;
  driftY: string;
  opacity: string;
  dotOp: string;
  anim: string;
  shadow: string;
}

function generateDots(count: number): Dot[] {
  const dots: Dot[] = [];
  for (let i = 0; i < count; i++) {
    const r = (n: number) => seededRand(i * 13 + n);
    const size  = 1 + r(2) * 2.5;
    const color = COLORS[Math.floor(r(3) * COLORS.length)];
    const dur   = 6 + r(4) * 14;
    const delay = -(r(5) * 20);
    const dX    = (r(6) - 0.5) * 40;
    const dY    = (r(7) - 0.5) * 40;
    const op    = 0.25 + r(8) * 0.65;
    const isTwinkle = i % 3 !== 0;
    const animDur = isTwinkle ? dur * 0.6 : dur;

    // Pre-format all values as strings with controlled precision to match server/client
    dots.push({
      x:      `${(r(0) * 100).toFixed(4)}%`,
      y:      `${(r(1) * 100).toFixed(4)}%`,
      size:   `${size.toFixed(4)}px`,
      color,
      dur:    `${animDur.toFixed(4)}s`,
      delay:  `${delay.toFixed(4)}s`,
      driftX: `${dX.toFixed(4)}px`,
      driftY: `${dY.toFixed(4)}px`,
      opacity: op.toFixed(6),
      dotOp:  op.toFixed(6),
      anim:   isTwinkle
        ? `twinkleDot ${animDur.toFixed(4)}s ${delay.toFixed(4)}s ease-in-out infinite`
        : `floatDot ${animDur.toFixed(4)}s ${delay.toFixed(4)}s ease-in-out infinite`,
      shadow: size > 2.5
        ? `0 0 ${(size * 3).toFixed(4)}px ${size.toFixed(4)}px ${color}55`
        : 'none',
    });
  }
  return dots;
}

const HIGH_DOTS = generateDots(200);
const LOW_DOTS  = generateDots(120);

interface Props {
  density?: 'high' | 'low';
  overlay?: number;
}

export default function CSSParticleStars({ density = 'high', overlay = 0.65 }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dots = density === 'high' ? HIGH_DOTS : LOW_DOTS;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* Dark overlay — rendered on both server and client */}
      <div style={{ position: 'absolute', inset: 0, background: `rgba(0,0,0,${overlay})` }} />

      {/* Ambient glows — rendered on both server and client */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)',
        width: '60%', height: '50%',
        background: 'radial-gradient(ellipse, rgba(82,48,86,0.25) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }} />
      <div style={{
        position: 'absolute', top: '-5%', left: '-5%', width: '40%', height: '40%',
        background: 'radial-gradient(ellipse, rgba(51,11,56,0.18) 0%, transparent 70%)',
        filter: 'blur(50px)',
      }} />
      <div style={{
        position: 'absolute', bottom: '-5%', right: '-5%', width: '40%', height: '40%',
        background: 'radial-gradient(ellipse, rgba(112,84,116,0.12) 0%, transparent 70%)',
        filter: 'blur(50px)',
      }} />

      {/* Dots — client only, added after hydration to avoid SSR mismatch */}
      {mounted && (
        <>
          <style>{`
            @keyframes floatDot {
              0%, 100% { transform: translate(0, 0); opacity: var(--dot-op); }
              33%       { transform: translate(var(--dx), var(--dy)); opacity: calc(var(--dot-op) * 0.5); }
              66%       { transform: translate(calc(var(--dx) * -0.6), calc(var(--dy) * 0.4)); opacity: var(--dot-op); }
            }
            @keyframes twinkleDot {
              0%, 100% { opacity: var(--dot-op); }
              50%       { opacity: calc(var(--dot-op) * 0.3); }
            }
          `}</style>

          {dots.map((dot, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: dot.x,
                top: dot.y,
                width: dot.size,
                height: dot.size,
                borderRadius: '50%',
                backgroundColor: dot.color,
                ['--dot-op' as string]: dot.dotOp,
                ['--dx' as string]: dot.driftX,
                ['--dy' as string]: dot.driftY,
                opacity: parseFloat(dot.opacity),
                animation: dot.anim,
                boxShadow: dot.shadow,
                willChange: 'transform, opacity',
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}
