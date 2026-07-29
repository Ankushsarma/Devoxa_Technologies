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

  // Replace the bad try/catch blocks that I injected earlier with a robust one
  const badTryCatchRegex = /let renderer;\s*const _origErr = console\.error;\s*console\.error = \(\.\.\.args\) => \{[\s\S]*?\};\s*try\s*\{\s*renderer = new Renderer\(\{([\s\S]*?)\}\);\s*\}\s*catch\s*\(e\)\s*\{\s*console\.warn\([\s\S]*?\);\s*return;\s*\}/g;
  
  content = content.replace(badTryCatchRegex, (match, options) => {
    return `let renderer;
    try {
      renderer = new Renderer({${options}});
      if (!renderer.gl) throw new Error('No gl');
    } catch (e) {
      console.warn("WebGL limit reached, skipping ${comp} rendering.");
      return;
    }`;
  });

  // Also fix THREE.js based components (CircularGallery, LightPillar)
  const badThreeRegex = /let renderer;\s*const _origErr = console\.error;\s*console\.error = \(\.\.\.args\) => \{[\s\S]*?\};\s*try\s*\{\s*renderer = new THREE\.WebGLRenderer\(\{([\s\S]*?)\}\);\s*\}\s*catch\s*\(e\)\s*\{\s*console\.warn\([\s\S]*?\);\s*return;\s*\}/g;
  
  content = content.replace(badThreeRegex, (match, options) => {
    return `let renderer;
    try {
      renderer = new THREE.WebGLRenderer({${options}});
      if (!renderer.domElement) throw new Error('No domElement');
    } catch (e) {
      console.warn("WebGL limit reached, skipping ${comp} rendering.");
      return;
    }`;
  });

  fs.writeFileSync(file, content, 'utf8');
});

console.log('Fixed try/catch blocks in all WebGL components!');
