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
  let content = fs.readFileSync(file, 'utf8');

  // If the hook is used but not imported
  if (content.includes('useIntersectionObserver({') && !content.includes('import { useIntersectionObserver }')) {
    // Just put it after the first import or at the very top
    content = `import { useIntersectionObserver } from 'usehooks-ts';\n` + content;
    fs.writeFileSync(file, content, 'utf8');
  }
});

console.log('Fixed missing imports!');
