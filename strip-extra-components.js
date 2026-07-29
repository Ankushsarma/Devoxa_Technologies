const fs = require('fs');
let c = fs.readFileSync('app/page.tsx', 'utf8');

// Remove imports
const importsToRemove = [
  'LineWaves', 'LightPillar', 'MagicRings', 'CircularGallery', 
  'LiquidEther', 'SpecularButton', 'LightRays', 'SideRays'
];
importsToRemove.forEach(imp => {
  const regex = new RegExp(`import\\s+${imp}\\s+from\\s+['"]@/components/${imp}['"]\\s*\\r?\\n`, 'g');
  c = c.replace(regex, '');
});

// Remove single line self-closing components
const singleLineComponents = ['LiquidEther', 'LightRays', 'SideRays', 'MagicRings', 'LightPillar', 'LineWaves'];
singleLineComponents.forEach(comp => {
  const regex = new RegExp(`<${comp}[^>]*/>\\s*\\r?\\n`, 'g');
  c = c.replace(regex, '');
});

// Remove CircularGallery (has children, we just want to remove the whole block including children, since it was just a gallery section addition)
// Wait, actually CircularGallery is in the "Works" section.
c = c.replace(/<CircularGallery[\\s\\S]*?<\/CircularGallery>\\s*\\r?\\n/g, '');

// Replace SpecularButton with a standard button
c = c.replace(/<SpecularButton[^>]*onClick=\{([^}]+)\}[^>]*>\s*([\s\S]*?)\s*<\/SpecularButton>/g, '<button className="btn-primary" onClick={$1}>$2</button>');

fs.writeFileSync('app/page.tsx', c);
console.log('Removed 8 components');
