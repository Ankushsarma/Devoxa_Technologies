/**
 * Replace ALL solid/plain background colors with the cinematic horizontal gradient.
 * Gradient: #08060E → #1A0733 → #4A1890 → #7120C8 → #8B2FD1
 */
const fs = require('fs');
const path = require('path');

const GRAD = 'linear-gradient(to right, #08060E 0%, #08060E 20%, #1A0733 40%, #4A1890 62%, #7120C8 80%, #8B2FD1 100%)';

// All known solid dark/panel bg hex colors to replace
const SOLID_HEX = [
  '#08060E', '#0A0710', '#0A0A0B', '#0D0417', '#0d0d11', '#050506', '#080514',
  '#120F17', '#170f2e', '#1A0733', '#2B0F45', '#230C38', '#3A1656', '#4A1890',
];

// ─── CSS ─────────────────────────────────────────────────────────────────────
function fixCSS(content) {
  // Replace background: <solid-hex> ; (plain solid color)
  SOLID_HEX.forEach(hex => {
    // background: #xxx; or background: #xxx !important;
    const re = new RegExp(`background:\\s*${hex.replace('#','#')}\\s*(!important)?;`, 'gi');
    content = content.replace(re, `background: ${GRAD} $1;`);
    // background-color: #xxx;
    const re2 = new RegExp(`background-color:\\s*${hex.replace('#','#')}\\s*(!important)?;`, 'gi');
    content = content.replace(re2, `background: ${GRAD} $1;`);
  });

  // Replace var(--bg-void), var(--bg-deep), var(--bg-base), var(--bg-panel-2) used as backgrounds
  content = content.replace(/background:\s*var\(--bg-void\)\s*(!important)?;/gi, `background: ${GRAD} $1;`);
  content = content.replace(/background:\s*var\(--bg-deep\)\s*(!important)?;/gi, `background: ${GRAD} $1;`);
  content = content.replace(/background:\s*var\(--bg-base\)\s*(!important)?;/gi, `background: ${GRAD} $1;`);
  content = content.replace(/background:\s*var\(--bg-panel-2\)\s*(!important)?;/gi, `background: ${GRAD} $1;`);
  content = content.replace(/background-color:\s*var\(--bg-void\)\s*(!important)?;/gi, `background: ${GRAD} $1;`);
  content = content.replace(/background-color:\s*var\(--bg-panel-2\)\s*(!important)?;/gi, `background: ${GRAD} $1;`);

  // Replace existing OLD gradient variants (radial or linear using old colors)
  content = content.replace(/background:radial-gradient\(ellipse at 75% 50%[^;]+\);/gi, `background: ${GRAD};`);
  content = content.replace(/background:linear-gradient\(135deg,#0D0417[^;]+\);/gi, `background: ${GRAD};`);
  content = content.replace(/background:linear-gradient\(135deg,#0A0710[^;]+\);/gi, `background: ${GRAD};`);

  // IMPORTANT: Fix the body rule specifically
  content = content.replace(
    /body\s*\{([^}]*?)background:[^;]+;(\s*)background-attachment: fixed;/gi,
    (m, pre, sp) => `body {${pre}background: ${GRAD} fixed;${sp}background-attachment: fixed;`
  );

  return content;
}

// ─── TSX / JSX ───────────────────────────────────────────────────────────────
function fixJSX(content) {
  // Inline style={{ background: "#xxx" }} or style={{ backgroundColor: "#xxx" }}
  SOLID_HEX.forEach(hex => {
    // background: "hex"
    const re1 = new RegExp(`background:\\s*["']${hex}["']`, 'gi');
    content = content.replace(re1, `background: "${GRAD}"`);
    // backgroundColor: "hex"
    const re2 = new RegExp(`backgroundColor:\\s*["']${hex}["']`, 'gi');
    content = content.replace(re2, `background: "${GRAD}", backgroundColor: undefined`);
  });

  // Tailwind bg-[#xxx] for solid dark colors → replace with a gradient class wrapper
  // These we can't easily replace with a gradient class (Tailwind doesn't do gradients like this)
  // Instead, replace with bg-transparent so the fixed body gradient shows through
  SOLID_HEX.forEach(hex => {
    const tHex = hex.replace('#', '');
    const re = new RegExp(`bg-\\[${hex}\\](\\/[0-9]+)?`, 'gi');
    content = content.replace(re, 'bg-transparent');
    const re2 = new RegExp(`bg-\\[#${tHex}\\](\\/[0-9]+)?`, 'gi');
    content = content.replace(re2, 'bg-transparent');
  });

  // Replace old radial gradient strings in JSX inline styles
  content = content.replace(
    /background:\s*["']radial-gradient\(ellipse at 75% 50%[^'"]+\)["']/gi,
    `background: "${GRAD}"`
  );

  // Replace var(--bg-void) / var(--bg-deep) / var(--bg-base) in inline styles
  content = content.replace(/background:\s*["']var\(--bg-void\)["']/gi, `background: "${GRAD}"`);
  content = content.replace(/background:\s*["']var\(--bg-deep\)["']/gi, `background: "${GRAD}"`);
  content = content.replace(/background:\s*["']var\(--bg-base\)["']/gi, `background: "${GRAD}"`);
  content = content.replace(/background:\s*["']var\(--bg-panel-2\)["']/gi, `background: "${GRAD}"`);

  // Also fix "background: 'var(--bg-void)'" single-quote style
  content = content.replace(/background:\s*'var\(--bg-void\)'/gi, `background: "${GRAD}"`);
  content = content.replace(/background:\s*'var\(--bg-deep\)'/gi, `background: "${GRAD}"`);

  // Replace light-sec sections (which use bg-panel-2 in CSS) — inject inline bg override
  // We can't easily do this without restructuring, so rely on CSS override above

  return content;
}

// ─── Process CSS files ────────────────────────────────────────────────────────
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

// ─── Process JSX/TSX files ────────────────────────────────────────────────────
function processDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fp = path.join(dir, file);
    if (fs.statSync(fp).isDirectory()) {
      processDir(fp);
    } else if (fp.endsWith('.tsx') || fp.endsWith('.jsx')) {
      let c = fs.readFileSync(fp, 'utf8');
      c = fixJSX(c);
      fs.writeFileSync(fp, c);
      console.log(`✓ JSX: ${fp}`);
    }
  });
}

processDir('app');
processDir('components');

// ─── Also patch landing.css light-sec and panel-2 class overrides directly ───
let lc = fs.readFileSync('app/landing.css', 'utf8');

// .vx .light-sec — was bg-panel-2, must use gradient
lc = lc.replace(
  /\.vx \.light-sec\s*\{([^}]*?)background:[^;!]+(!important)?;/gi,
  (m, mid, imp) => `.vx .light-sec {${mid}background: ${GRAD} !important;`
);

// #services-collection
lc = lc.replace(
  /#services-collection\s*\{([^}]*?)background:[^;!]+(!important)?;/gi,
  (m, mid, imp) => `#services-collection {${mid}background: ${GRAD} !important;`
);

// .demos-section (hero demos background)
lc = lc.replace(
  /\.vx \.demos-section\s*\{([^}]*?)background:[^;!]+(!important)?;/gi,
  (m, mid, imp) => `.vx .demos-section {${mid}background: ${GRAD} !important;`
);

// step-card, hiw-card, card, price-card etc which use var(--bg-panel-2)
lc = lc.replace(/var\(--bg-panel-2\)/g, '#2B0F45');

// Demo frame (the browser-like frame inside portfolio cards)
lc = lc.replace(
  /\.vx \.demo-frame\s*\{([^}]*?)background:[^;]+;/gi,
  (m, mid) => `.vx .demo-frame {${mid}background: ${GRAD};`
);

fs.writeFileSync('app/landing.css', lc);
console.log('✓ landing.css section patches applied');

console.log('\n🎨 ALL SECTIONS NOW USE THE GRADIENT!');
