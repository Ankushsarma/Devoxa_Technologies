'use client';

/**
 * CSSParticleStars
 * Pure CSS animated star/particle field — zero WebGL, zero canvas.
 * Replicates the Particles component look using brand palette colours.
 *
 * Props:
 *   density  – 'high' (hero, ~200 dots) | 'low' (CTA, ~120 dots)
 *   overlay  – optional dark overlay opacity (default 0.65)
 */

// Brand palette
const COLORS = ['#ffffff', '#f1eef1', '#ded8df', '#c6bbc7', '#ad9daf', '#8f7992', '#705474', '#523056'];

// Pre-seeded pseudo-random to avoid hydration mismatch
function seededRand(seed: number) {
  const x = Math.sin(seed + 1) * 43758.5453;
  return x - Math.floor(x);
}

interface Dot {
  x: number;   // % from left
  y: number;   // % from top
  size: number; // px
  color: string;
  dur: number;  // animation duration s
  delay: number; // animation delay s
  driftX: number; // how far it drifts px
  driftY: number;
  opacity: number;
}

function generateDots(count: number): Dot[] {
  const dots: Dot[] = [];
  for (let i = 0; i < count; i++) {
    const r = (n: number) => seededRand(i * 13 + n);
    dots.push({
      x: r(0) * 100,
      y: r(1) * 100,
      size: 1 + r(2) * 2.5,
      color: COLORS[Math.floor(r(3) * COLORS.length)],
      dur: 6 + r(4) * 14,
      delay: -(r(5) * 20),
      driftX: (r(6) - 0.5) * 40,
      driftY: (r(7) - 0.5) * 40,
      opacity: 0.25 + r(8) * 0.65,
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
      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `rgba(0,0,0,${overlay})`,
        }}
      />

      {/* Ambient purple glow — centre */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60%',
          height: '50%',
          background: 'radial-gradient(ellipse, rgba(82,48,86,0.25) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      {/* Subtle corner glows */}
      <div style={{ position: 'absolute', top: '-5%', left: '-5%', width: '40%', height: '40%', background: 'radial-gradient(ellipse, rgba(51,11,56,0.18) 0%, transparent 70%)', filter: 'blur(50px)' }} />
      <div style={{ position: 'absolute', bottom: '-5%', right: '-5%', width: '40%', height: '40%', background: 'radial-gradient(ellipse, rgba(112,84,116,0.12) 0%, transparent 70%)', filter: 'blur(50px)' }} />

      {/* CSS keyframe block — one per component instance */}
      <style>{`
        @keyframes floatDot {
          0%, 100% { transform: translate(0, 0);        opacity: var(--dot-op); }
          33%       { transform: translate(var(--dx), var(--dy)); opacity: calc(var(--dot-op) * 0.5); }
          66%       { transform: translate(calc(var(--dx) * -0.6), calc(var(--dy) * 0.4)); opacity: var(--dot-op); }
        }
        @keyframes twinkleDot {
          0%, 100% { opacity: var(--dot-op); }
          50%       { opacity: calc(var(--dot-op) * 0.3); }
        }
      `}</style>

      {/* Particle dots */}
      {dots.map((dot, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            borderRadius: '50%',
            backgroundColor: dot.color,
            // CSS custom props used inside keyframes
            ['--dot-op' as string]: dot.opacity,
            ['--dx' as string]: `${dot.driftX}px`,
            ['--dy' as string]: `${dot.driftY}px`,
            opacity: dot.opacity,
            // Alternate between float and twinkle
            animation: i % 3 === 0
              ? `floatDot ${dot.dur}s ${dot.delay}s ease-in-out infinite`
              : `twinkleDot ${dot.dur * 0.6}s ${dot.delay}s ease-in-out infinite`,
            // Larger dots get a soft glow in brand colours
            boxShadow: dot.size > 2.5
              ? `0 0 ${dot.size * 3}px ${dot.size}px ${dot.color}55`
              : 'none',
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </div>
  );
}
