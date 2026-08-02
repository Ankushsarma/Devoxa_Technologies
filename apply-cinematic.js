/**
 * DEVOXA TECHNOLOGIES — CINEMATIC HERO PALETTE APPLIER
 * 
 * New Palette:
 *   #0A0710  – Left-edge near-black base
 *   #2B0F45  – Deep violet mid-background / card panels
 *   #5B1FA0  – Radial glow core / rich purple
 *   #8B2FD1  – Vivid violet / right-edge brightest glow
 *   #FFFFFF  – Headline text
 *   #A8A5AD  – Subheading muted gray
 *   #0D0D0D  – CTA button text
 */
const fs = require('fs');
const path = require('path');

const NEW = {
  // Backgrounds
  nearBlack: '#0A0710',
  deepViolet: '#2B0F45',
  richPurple: '#5B1FA0',
  vividViolet: '#8B2FD1',
  // Text
  headlineWhite: '#FFFFFF',
  mutedGray: '#A8A5AD',
  btnText: '#0D0D0D',
  // Derived accents
  primaryAccent: '#5B1FA0',
  secondaryAccent: '#8B2FD1',
  lavender: '#EAD9F7',
};

// ─── CSS FILES ─────────────────────────────────────────────────────────────
function fixCSS(content) {
  // Old background vars
  content = content.replace(/--bg-void:\s*#[0-9a-f]{3,8}/gi, `--bg-void: ${NEW.nearBlack}`);
  content = content.replace(/--bg-deep:\s*#[0-9a-f]{3,8}/gi, `--bg-deep: ${NEW.nearBlack}`);
  content = content.replace(/--bg-base:\s*#[0-9a-f]{3,8}/gi, `--bg-base: ${NEW.nearBlack}`);
  content = content.replace(/--bg-elevated:\s*#[0-9a-f]{3,8}/gi, `--bg-elevated: ${NEW.deepViolet}`);
  content = content.replace(/--bg-glow:\s*#[0-9a-f]{3,8}/gi, `--bg-glow: ${NEW.richPurple}`);
  content = content.replace(/--bg-panel-2:\s*#[0-9a-f]{3,8}/gi, `--bg-panel-2: ${NEW.deepViolet}`);
  content = content.replace(/--background:\s*#[0-9a-f]{3,8}/gi, `--background: ${NEW.nearBlack}`);
  content = content.replace(/--foreground:\s*#[0-9a-f]{3,8}/gi, `--foreground: ${NEW.headlineWhite}`);

  // Old accent vars
  content = content.replace(/--accent-start:\s*#[0-9a-f]{3,8}/gi, `--accent-start: ${NEW.vividViolet}`);
  content = content.replace(/--accent-end:\s*#[0-9a-f]{3,8}/gi, `--accent-end: ${NEW.richPurple}`);
  content = content.replace(/--accent-solid:\s*#[0-9a-f]{3,8}/gi, `--accent-solid: ${NEW.primaryAccent}`);
  content = content.replace(/--violet:\s*#[0-9a-f]{3,8}/gi, `--violet: ${NEW.primaryAccent}`);
  content = content.replace(/--violet-soft:\s*#[0-9a-f]{3,8}/gi, `--violet-soft: ${NEW.secondaryAccent}`);

  // Text vars
  content = content.replace(/--text-hi:\s*#[0-9a-f]{3,8}/gi, `--text-hi: ${NEW.headlineWhite}`);
  content = content.replace(/--text-primary:\s*#[0-9a-f]{3,8}/gi, `--text-primary: ${NEW.headlineWhite}`);
  content = content.replace(/--text-muted:[^;]+;/gi, `--text-muted: ${NEW.mutedGray};`);
  content = content.replace(/--text-mid:[^;]+;/gi, `--text-mid: ${NEW.mutedGray};`);
  content = content.replace(/--text-low:[^;]+;/gi, `--text-low: rgba(168,165,173,0.7);`);

  // Button vars
  content = content.replace(/--btn-primary-bg:\s*#[0-9a-f]{3,8}/gi, `--btn-primary-bg: ${NEW.headlineWhite}`);
  content = content.replace(/--btn-primary-text:\s*#[0-9a-f]{3,8}/gi, `--btn-primary-text: ${NEW.btnText}`);
  content = content.replace(/--btn-outline-border:[^;]+;/gi, `--btn-outline-border: rgba(139,47,209,0.4);`);

  // Border vars
  content = content.replace(/--border-c:[^;]+;/gi, `--border-c: rgba(139,47,209,0.2);`);
  content = content.replace(/--border:[^;]+;/gi, `--border: rgba(139,47,209,0.2);`);

  // Body background — hero gradient
  content = content.replace(
    /body\s*\{([^}]*?)background[^;]*;/gi,
    (m, mid) => `body {${mid}background: radial-gradient(ellipse at 75% 50%, ${NEW.vividViolet} 0%, ${NEW.richPurple} 25%, ${NEW.deepViolet} 55%, ${NEW.nearBlack} 85%) fixed;`
  );

  // .vx and .nx backgrounds
  content = content.replace(/\.vx\s*\{([^}]*?)background:\s*#[0-9a-f]{3,8}/gi, (m, mid) => `.vx {${mid}background: transparent`);
  content = content.replace(/\.nx\s*\{([^}]*?)background:\s*#[0-9a-f]{3,8}/gi, (m, mid) => `.nx {${mid}background: radial-gradient(ellipse at 75% 50%, ${NEW.vividViolet} 0%, ${NEW.richPurple} 25%, ${NEW.deepViolet} 55%, ${NEW.nearBlack} 85%)`);

  // CTA Banner
  content = content.replace(
    /\.vx \.cta-banner\s*\{([^}]*?)background:\s*[^;!]*(?:!important)?;/gi,
    (m, mid) => `.vx .cta-banner {${mid}background: radial-gradient(ellipse at 75% 50%, ${NEW.richPurple} 0%, ${NEW.deepViolet} 45%, ${NEW.nearBlack} 80%) !important;`
  );

  // Old hardcoded hex colors → new palette
  content = content.replace(/#0D0417/gi, NEW.nearBlack);
  content = content.replace(/#0d0d11/gi, NEW.nearBlack);
  content = content.replace(/#050506/gi, NEW.nearBlack);
  content = content.replace(/#080514/gi, NEW.nearBlack);
  content = content.replace(/#0A0A0B/gi, NEW.nearBlack);
  content = content.replace(/#120F17/gi, NEW.nearBlack);
  content = content.replace(/#170f2e/gi, NEW.deepViolet);
  content = content.replace(/#2B0F45/gi, NEW.deepViolet);
  content = content.replace(/#230C38/gi, NEW.deepViolet);
  content = content.replace(/#7B1FA2/gi, NEW.primaryAccent);
  content = content.replace(/#A94FE0/gi, NEW.secondaryAccent);
  content = content.replace(/#7c3aed/gi, NEW.primaryAccent);
  content = content.replace(/#8b5cf6/gi, NEW.primaryAccent);
  content = content.replace(/#a78bfa/gi, NEW.secondaryAccent);
  content = content.replace(/#c084fc/gi, NEW.secondaryAccent);
  content = content.replace(/#A855F7/gi, NEW.secondaryAccent);
  content = content.replace(/#6366F1/gi, NEW.richPurple);
  content = content.replace(/#4F46E5/gi, NEW.primaryAccent);
  content = content.replace(/#5227FF/gi, NEW.primaryAccent);
  content = content.replace(/#B497CF/gi, NEW.lavender);
  content = content.replace(/#EAD9F7/gi, NEW.lavender);
  content = content.replace(/#c4b5fd/gi, NEW.secondaryAccent);
  content = content.replace(/#c4b5ff/gi, NEW.secondaryAccent);
  content = content.replace(/#8981A6/gi, NEW.mutedGray);

  // Old rgba glow colors → new
  content = content.replace(/rgba\(139,\s*92,\s*246,\s*([0-9.]+)\)/gi, (m, a) => `rgba(139,47,209,${a})`);
  content = content.replace(/rgba\(168,\s*85,\s*247,\s*([0-9.]+)\)/gi, (m, a) => `rgba(139,47,209,${a})`);
  content = content.replace(/rgba\(79,\s*70,\s*229,\s*([0-9.]+)\)/gi, (m, a) => `rgba(91,31,160,${a})`);
  content = content.replace(/rgba\(82,\s*39,\s*255,\s*([0-9.]+)\)/gi, (m, a) => `rgba(91,31,160,${a})`);

  // Border white opacities → palette
  content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.(0[1-9]|1[0-5])\)/gi, 'rgba(139,47,209,0.2)');

  // Gradient from/via/to → new palette
  content = content.replace(/gradient\(135deg,\s*#7B1FA2,\s*#A94FE0\)/gi, `gradient(135deg, ${NEW.richPurple}, ${NEW.vividViolet})`);
  content = content.replace(/gradient\(135deg,\s*#[0-9a-f]{6},\s*#a78bfa\)/gi, `gradient(135deg, ${NEW.richPurple}, ${NEW.vividViolet})`);
  content = content.replace(/gradient\(135deg,\s*#[0-9a-f]{6},\s*#A94FE0\)/gi, `gradient(135deg, ${NEW.richPurple}, ${NEW.vividViolet})`);
  content = content.replace(/gradient\(90deg,\s*#7B1FA2,\s*#A94FE0\)/gi, `gradient(90deg, ${NEW.richPurple}, ${NEW.vividViolet})`);
  content = content.replace(/gradient\(90deg,\s*#[0-9a-f]{6},\s*#a78bfa\)/gi, `gradient(90deg, ${NEW.richPurple}, ${NEW.vividViolet})`);

  // Section head gradient text
  content = content.replace(
    /background:linear-gradient\(135deg,\s*#EAD9F7\s*30%,\s*#A94FE0\s*100%\)/gi,
    `background: linear-gradient(135deg, ${NEW.headlineWhite} 30%, ${NEW.secondaryAccent} 100%)`
  );

  // .hiw-card .hiw-num old gradient
  content = content.replace(
    /gradient\(135deg,#[0-9a-f]{6},#A94FE0\)/gi,
    `gradient(135deg,${NEW.richPurple},${NEW.vividViolet})`
  );

  return content;
}

// ─── TSX / JSX FILES ────────────────────────────────────────────────────────
function fixJSX(content, filePath) {
  // Simple hex swaps
  content = content.replace(/#0D0417/gi, NEW.nearBlack);
  content = content.replace(/#0d0d11/gi, NEW.nearBlack);
  content = content.replace(/#050506/gi, NEW.nearBlack);
  content = content.replace(/#080514/gi, NEW.nearBlack);
  content = content.replace(/#0A0A0B/gi, NEW.nearBlack);
  content = content.replace(/#120F17/gi, NEW.nearBlack);
  content = content.replace(/#170f2e/gi, NEW.deepViolet);
  content = content.replace(/#2B0F45/gi, NEW.deepViolet);
  content = content.replace(/#230C38/gi, NEW.deepViolet);
  content = content.replace(/#3A1656/gi, NEW.richPurple);
  content = content.replace(/#7B1FA2/gi, NEW.primaryAccent);
  content = content.replace(/#A94FE0/gi, NEW.secondaryAccent);
  content = content.replace(/#7c3aed/gi, NEW.primaryAccent);
  content = content.replace(/#8b5cf6/gi, NEW.primaryAccent);
  content = content.replace(/#a78bfa/gi, NEW.secondaryAccent);
  content = content.replace(/#c084fc/gi, NEW.secondaryAccent);
  content = content.replace(/#A855F7/gi, NEW.secondaryAccent);
  content = content.replace(/#6366F1/gi, NEW.richPurple);
  content = content.replace(/#4F46E5/gi, NEW.primaryAccent);
  content = content.replace(/#5227FF/gi, NEW.primaryAccent);
  content = content.replace(/#B497CF/gi, NEW.lavender);
  content = content.replace(/#FF9FFC/gi, NEW.secondaryAccent);
  content = content.replace(/#c4b5fd/gi, NEW.secondaryAccent);
  content = content.replace(/#c4b5ff/gi, NEW.secondaryAccent);
  content = content.replace(/#8981A6/gi, NEW.mutedGray);

  // EAD9F7 => WHITE for headlines (pure white text)
  content = content.replace(/#EAD9F7/gi, '#FFFFFF');

  // rgba old purple glows → new
  content = content.replace(/rgba\(139,\s*92,\s*246,\s*([0-9.]+)\)/gi, (m, a) => `rgba(139,47,209,${a})`);
  content = content.replace(/rgba\(168,\s*85,\s*247,\s*([0-9.]+)\)/gi, (m, a) => `rgba(139,47,209,${a})`);
  content = content.replace(/rgba\(169,\s*79,\s*224,\s*([0-9.]+)\)/gi, (m, a) => `rgba(139,47,209,${a})`);
  content = content.replace(/rgba\(79,\s*70,\s*229,\s*([0-9.]+)\)/gi, (m, a) => `rgba(91,31,160,${a})`);
  content = content.replace(/rgba\(82,\s*39,\s*255,\s*([0-9.]+)\)/gi, (m, a) => `rgba(91,31,160,${a})`);

  // Tailwind class swaps — bg
  content = content.replace(/bg-\[#[0-9a-f]{6}\]/gi, (m) => {
    const hex = m.match(/#([0-9a-f]{6})/i)?.[1]?.toLowerCase();
    const map = {
      '0d0417': `bg-[${NEW.nearBlack}]`, '0d0d11': `bg-[${NEW.nearBlack}]`, '050506': `bg-[${NEW.nearBlack}]`,
      '080514': `bg-[${NEW.nearBlack}]`, '0a0a0b': `bg-[${NEW.nearBlack}]`, '2b0f45': `bg-[${NEW.deepViolet}]`,
      '230c38': `bg-[${NEW.deepViolet}]`, '3a1656': `bg-[${NEW.richPurple}]`,
      '7b1fa2': `bg-[${NEW.primaryAccent}]`, 'a94fe0': `bg-[${NEW.secondaryAccent}]`,
      'ead9f7': 'bg-white',
    };
    return map[hex] || m;
  });

  // ReactBit WebGL component prop colors
  // MagicRings
  content = content.replace(/color=["']#A855F7["']/g, `color="${NEW.primaryAccent}"`);
  content = content.replace(/color=["']#6366F1["']/g, `color="${NEW.richPurple}"`);
  content = content.replace(/colorTwo=["']#6366F1["']/g, `colorTwo="${NEW.richPurple}"`);
  content = content.replace(/colorTwo=["']#A855F7["']/g, `colorTwo="${NEW.vividViolet}"`);

  // LightRays
  content = content.replace(/raysColor=["']#[0-9a-fA-F]{6}["']/g, `raysColor="${NEW.primaryAccent}"`);

  // SideRays
  content = content.replace(/rayColor1=["']#[0-9a-fA-F]{6}["']/g, `rayColor1="${NEW.vividViolet}"`);
  content = content.replace(/rayColor2=["']#[0-9a-fA-F]{6}["']/g, `rayColor2="${NEW.richPurple}"`);

  // LightPillar
  content = content.replace(/topColor=["']#[0-9a-fA-F]{6}["']/g, `topColor="${NEW.vividViolet}"`);
  content = content.replace(/bottomColor=["']#[0-9a-fA-F]{6}["']/g, `bottomColor="${NEW.richPurple}"`);

  // LiquidEther colors array
  content = content.replace(/colors=\{?\[['"]#5227FF['"],\s*['"]#FF9FFC['"],\s*['"]#B497CF['"]\]/g,
    `colors={['${NEW.primaryAccent}', '${NEW.vividViolet}', '${NEW.lavender}']}`);
  content = content.replace(/colors=\{?\[['"]#[0-9a-fA-F]{6}['"],\s*['"]#[0-9a-fA-F]{6}['"],\s*['"]#[0-9a-fA-F]{6}['"]\]\}?/g,
    `colors={['${NEW.primaryAccent}', '${NEW.vividViolet}', '${NEW.lavender}']}`);

  // Particles colors
  content = content.replace(/particleColors=\{?\[["']\s*#ffffff\s*["'],\s*["']\s*#[0-9a-fA-F]{6}\s*["'],\s*["']\s*#[0-9a-fA-F]{6}\s*["']\]\}?/gi,
    `particleColors={["#ffffff", "${NEW.vividViolet}", "${NEW.richPurple}"]}`);

  // SpecularButton lineColor and baseColor props
  content = content.replace(/lineColor=["']#[0-9a-fA-F]{6}["']/g, `lineColor="${NEW.vividViolet}"`);
  content = content.replace(/baseColor=["']#[0-9a-fA-F]{6}["']/g, `baseColor="${NEW.deepViolet}"`);

  // ShinyText shineColor prop
  content = content.replace(/shineColor=["']#[0-9a-fA-F]{6}["']/g, `shineColor="${NEW.vividViolet}"`);

  // Spotlight color
  content = content.replace(/spotlightColor=["'][^"']+["']/g, `spotlightColor="rgba(139, 47, 209, 0.15)"`);

  // Hero background: explicitly set the cinematic radial gradient on the hero nx section
  content = content.replace(
    /<section id="hero"[^>]*className="nx([^"]*)"[^>]*>/g,
    (m) => m.replace('className="nx', `className="nx`)
  );

  return content;
}

// ─── PROCESS ALL FILES ──────────────────────────────────────────────────────
const cssFiles = [
  'app/globals.css',
  'app/landing.css',
  'components/BorderGlow.css',
  'components/PillNav.css',
  'components/SpecularButton.css',
  'components/SpotlightCard.css',
  'components/LightPillar.css',
  'components/LightRays.css',
  'components/ShinyText.css',
  'components/SideRays.css',
  'components/TextType.css',
  'components/LineWaves.css',
  'components/MagicRings.css',
  'components/Particles.css',
  'components/DotGrid.css',
  'components/CircularGallery.css',
  'components/LiquidChrome.css',
  'components/LiquidEther.css',
  'components/LineSidebar.css',
];

cssFiles.forEach(f => {
  if (!fs.existsSync(f)) return;
  let c = fs.readFileSync(f, 'utf8');
  c = fixCSS(c);
  fs.writeFileSync(f, c);
  console.log(`✓ CSS: ${f}`);
});

function processDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fp = path.join(dir, file);
    if (fs.statSync(fp).isDirectory()) {
      processDir(fp);
    } else if (fp.endsWith('.tsx') || fp.endsWith('.jsx')) {
      let c = fs.readFileSync(fp, 'utf8');
      c = fixJSX(c, fp);
      fs.writeFileSync(fp, c);
      console.log(`✓ JSX: ${fp}`);
    }
  });
}

processDir('app');
processDir('components');

// ─── HERO SECTION: Apply cinematic radial gradient background on .nx ──────
// This targets landing.css directly for the .nx block background rule
let landingCSS = fs.readFileSync('app/landing.css', 'utf8');
// Ensure the hero section has the exact cinematic gradient
landingCSS = landingCSS.replace(
  /\.nx\s*\{[^}]*background:[^;};]*;/g,
  (m) => m.replace(/background:[^;};]*;/, `background: radial-gradient(ellipse at 75% 50%, ${NEW.vividViolet} 0%, ${NEW.richPurple} 25%, ${NEW.deepViolet} 55%, ${NEW.nearBlack} 85%);`)
);
fs.writeFileSync('app/landing.css', landingCSS);
console.log('✓ Hero gradient applied to landing.css');

// ─── GLOBALS.CSS: Set the page-level fixed background ─────────────────────
let globalCSS = fs.readFileSync('app/globals.css', 'utf8');
globalCSS = globalCSS.replace(
  /--background:\s*#[0-9a-fA-F]{6}/g,
  `--background: ${NEW.nearBlack}`
);
globalCSS = globalCSS.replace(
  /background:[^;]*linear-gradient[^;]*;(\s*)background-attachment: fixed;/,
  `background: radial-gradient(ellipse at 75% 50%, ${NEW.vividViolet} 0%, ${NEW.richPurple} 25%, ${NEW.deepViolet} 55%, ${NEW.nearBlack} 85%) fixed;$1background-attachment: fixed;`
);
fs.writeFileSync('app/globals.css', globalCSS);
console.log('✓ globals.css updated');

console.log('\n🎨 CINEMATIC PALETTE APPLIED SUCCESSFULLY!');
