const fs = require('fs');
const path = require('path');
const components = [
  'Particles.jsx',
  'LiquidEther.jsx',
  'LiquidChrome.jsx',
  'LightRays.jsx',
  'SideRays.jsx',
  'MagicRings.jsx',
  'LightPillar.tsx',
  'CircularGallery.jsx',
  'LineWaves.jsx',
  'SpecularButton.jsx'
];

components.forEach(comp => {
  const file = path.join(process.cwd(), 'components', comp);
  if (!fs.existsSync(file)) return;
  let c = fs.readFileSync(file, 'utf8');
  if (c.startsWith("import { useIntersectionObserver }")) {
    c = c.replace(/import \{ useIntersectionObserver \} from 'usehooks-ts';\r?\n(?:'use client';|"use client";)\r?\n/, "'use client';\nimport { useIntersectionObserver } from 'usehooks-ts';\n");
    fs.writeFileSync(file, c, 'utf8');
  }
});
console.log('Fixed use client order');
