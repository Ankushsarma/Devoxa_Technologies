const fs = require('fs');
let c = fs.readFileSync('app/page.tsx', 'utf8');

// Remove imports for the 5 bad components
const importsToRemove = ['LineWaves', 'LightPillar', 'MagicRings', 'SpecularButton', 'SideRays'];
importsToRemove.forEach(imp => {
  const regex = new RegExp(`import\\s+${imp}\\s+from\\s+['"]@/components/${imp}['"]\\s*\\r?\\n`, 'g');
  c = c.replace(regex, '');
});

// Remove single line components
const singleLineComponents = ['SideRays', 'MagicRings', 'LightPillar', 'LineWaves'];
singleLineComponents.forEach(comp => {
  const regex = new RegExp(`<${comp}[^>]*/>\\s*\\r?\\n`, 'g');
  c = c.replace(regex, '');
});

// Replace SpecularButton with a standard button
c = c.replace(/<SpecularButton[^>]*onClick=\{([^}]+)\}[^>]*>\s*([\s\S]*?)\s*<\/SpecularButton>/g, '<button className="btn-primary" onClick={$1}>$2</button>');

// Remove WebGLVisibilityWrapper completely
c = c.replace(/import WebGLVisibilityWrapper[^\\n]*\\n/, '');
c = c.replace(/<WebGLVisibilityWrapper>\s*([\s\S]*?)\s*<\/WebGLVisibilityWrapper>/g, '$1');

fs.writeFileSync('app/page.tsx', c);
console.log('Stripped 5 components and WebGLVisibilityWrapper');
