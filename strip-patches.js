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

  // Regex to match the entire bad try/catch block and extract the Renderer/THREE.WebGLRenderer call
  const badTryCatchRegex = /let (?:this\.)?renderer;\s*try\s*\{\s*(?:this\.)?renderer = new (Renderer|THREE\.WebGLRenderer)\(\{([\s\S]*?)\}\);\s*if \(!(?:this\.)?renderer\.(?:gl|domElement)\) throw new Error\('.*?'\);\s*\}\s*catch\s*\(e\)\s*\{\s*console\.warn\([\s\S]*?\);\s*return;\s*\}/g;
  
  content = content.replace(badTryCatchRegex, (match, constructor, options) => {
    return `const renderer = new ${constructor}({${options}});`;
  });
  
  // Also match the other version of try/catch that I injected earlier which was still in LiquidEther
  const oldTryCatchRegex = /let (this\.)?renderer;\s*const _origErr = console\.error;\s*console\.error = \(\.\.\.args\) => \{[\s\S]*?\};\s*try\s*\{\s*\1renderer = new (Renderer|THREE\.WebGLRenderer)\(\{([\s\S]*?)\}\);\s*\}\s*catch\s*\(e\)\s*\{\s*console\.warn\([\s\S]*?\);\s*return;\s*\}/g;

  content = content.replace(oldTryCatchRegex, (match, prefix, constructor, options) => {
    return `const ${prefix || ''}renderer = new ${constructor}({${options}});`;
  });
  
  // Clean up any remaining console.error patches just in case
  content = content.replace(/const _origErr = console\.error;\s*console\.error = \(\.\.\.args\) => \{[\s\S]*?\};\s*/g, '');

  fs.writeFileSync(file, content, 'utf8');
});

console.log('Completely stripped out try/catch and console.error patches!');
