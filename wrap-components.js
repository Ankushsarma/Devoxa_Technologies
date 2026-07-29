const fs = require('fs');
const path = require('path');

const pageFile = path.join(process.cwd(), 'app', 'page.tsx');
let content = fs.readFileSync(pageFile, 'utf8');

// Ensure import exists
if (!content.includes('WebGLVisibilityWrapper')) {
  content = content.replace(/(import .* from ['"]next\/image['"];?)/, "$1\nimport WebGLVisibilityWrapper from '@/components/WebGLVisibilityWrapper';");
}

// 1. Wrap self-closing WebGL components
const selfClosing = ['Particles', 'LiquidEther', 'LiquidChrome', 'LightRays', 'SideRays', 'MagicRings', 'LightPillar', 'CircularGallery', 'LineWaves'];
selfClosing.forEach(comp => {
  const regex = new RegExp(`(<${comp}[^>]*\\/>)`, 'g');
  content = content.replace(regex, (match) => {
    // If it's already wrapped, don't wrap it again
    if (content.includes(`<WebGLVisibilityWrapper>\n${match}`)) return match; // rudimentary check, but regex below is better
    return `<WebGLVisibilityWrapper>\n            ${match}\n          </WebGLVisibilityWrapper>`;
  });
});

// 2. Wrap SpecularButton
const buttonRegex = /(<SpecularButton[^]*?<\/SpecularButton>)/g;
content = content.replace(buttonRegex, (match) => {
  return `<WebGLVisibilityWrapper isAbsolute={false}>\n            ${match}\n          </WebGLVisibilityWrapper>`;
});

// Prevent double wrapping if script runs multiple times
// Just a simple safety check, we'll write this back cleanly
content = content.replace(/<WebGLVisibilityWrapper(\s+isAbsolute=\{false\})?>\s*<WebGLVisibilityWrapper[^>]*>/g, '<WebGLVisibilityWrapper$1>');
content = content.replace(/<\/WebGLVisibilityWrapper>\s*<\/WebGLVisibilityWrapper>/g, '</WebGLVisibilityWrapper>');

fs.writeFileSync(pageFile, content, 'utf8');
console.log('Successfully wrapped WebGL components in page.tsx');
