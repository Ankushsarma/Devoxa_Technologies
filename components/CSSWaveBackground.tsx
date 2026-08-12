'use client';

/**
 * CSSWaveBackground
 * Single-wave bottom edge, brand-palette only, top-30% of the FAQ section.
 */
export default function CSSWaveBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '30%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* Brand-coloured gradient fill */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, #1a061c 0%, #26082a 40%, #330b38 75%, #523056 100%)',
        }}
      />

      {/* Subtle diagonal stripe texture (brand 700→600) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 58px,
            rgba(82,48,86,0.06) 58px,
            rgba(82,48,86,0.06) 59px
          )`,
        }}
      />

      {/* Radial centre glow */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '70%',
          height: '80%',
          background:
            'radial-gradient(ellipse at center, rgba(112,84,116,0.22) 0%, transparent 70%)',
          filter: 'blur(32px)',
        }}
      />

      {/* ─── SVG: one animated wave as the bottom edge ─── */}
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          /* height scales with the wave amplitude */
          height: '120px',
        }}
      >
        <defs>
          <style>{`
            @keyframes waveEdge {
              0%   { d: path("M0,60 C180,20 360,100 540,60 C720,20 900,100 1080,60 C1260,20 1380,80 1440,60 L1440,120 L0,120 Z"); }
              25%  { d: path("M0,70 C200,110 380,30 560,70 C740,110 920,30 1100,70 C1280,110 1390,50 1440,70 L1440,120 L0,120 Z"); }
              50%  { d: path("M0,50 C160,90 340,10 520,50 C700,90 880,10 1060,50 C1240,90 1380,30 1440,50 L1440,120 L0,120 Z"); }
              75%  { d: path("M0,65 C190,25 370,105 550,65 C730,25 910,105 1090,65 C1270,25 1390,85 1440,65 L1440,120 L0,120 Z"); }
              100% { d: path("M0,60 C180,20 360,100 540,60 C720,20 900,100 1080,60 C1260,20 1380,80 1440,60 L1440,120 L0,120 Z"); }
            }
          `}</style>
        </defs>

        {/* Shadow layer — slightly behind, darker brand colour */}
        <path
          fill="#26082a"
          opacity="0.6"
          style={{ animation: 'waveEdge 9s ease-in-out infinite', animationDelay: '-1.5s' }}
          d="M0,60 C180,20 360,100 540,60 C720,20 900,100 1080,60 C1260,20 1380,80 1440,60 L1440,120 L0,120 Z"
        />

        {/* Main wave — #330b38 (brand-700) */}
        <path
          fill="#330b38"
          style={{ animation: 'waveEdge 7s ease-in-out infinite' }}
          d="M0,60 C180,20 360,100 540,60 C720,20 900,100 1080,60 C1260,20 1380,80 1440,60 L1440,120 L0,120 Z"
        />

        {/* Crest highlight — #523056 (brand-600) slightly offset */}
        <path
          fill="#523056"
          opacity="0.55"
          style={{ animation: 'waveEdge 7s ease-in-out infinite', animationDelay: '-3.5s' }}
          d="M0,60 C180,20 360,100 540,60 C720,20 900,100 1080,60 C1260,20 1380,80 1440,60 L1440,120 L0,120 Z"
        />
      </svg>

      {/* Top edge: fade in from page background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '60px',
          background: 'linear-gradient(to bottom, #0a0012, transparent)',
        }}
      />
    </div>
  );
}
