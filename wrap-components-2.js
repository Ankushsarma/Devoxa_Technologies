const fs = require('fs');
const path = require('path');

const pageFile = path.join(process.cwd(), 'app', 'page.tsx');
let content = fs.readFileSync(pageFile, 'utf8');

// Use a better regex for self-closing tags: match up to the first /> after the component name
const selfClosing = ['Particles', 'LiquidEther', 'LiquidChrome', 'LightRays', 'SideRays', 'MagicRings', 'LightPillar', 'CircularGallery', 'LineWaves'];
selfClosing.forEach(comp => {
  const regex = new RegExp(`(<${comp}[^]*?\\/>)`, 'g');
  content = content.replace(regex, (match) => {
    // If it's already wrapped by WebGLVisibilityWrapper, don't wrap it again
    if (content.indexOf(`<WebGLVisibilityWrapper>\n            ${match}`) !== -1 || content.indexOf(`<WebGLVisibilityWrapper>\n          ${match}`) !== -1) {
      return match;
    }
    // A quick hack to check if the match is already inside a wrapper in the actual content string (since replace evaluates per match)
    // Actually, just checking if match is immediately preceded by <WebGLVisibilityWrapper> is hard. Let's just wrap it and then clean up duplicates globally.
    return `<WebGLVisibilityWrapper>\n            ${match}\n          </WebGLVisibilityWrapper>`;
  });
});

// Clean up any double-wrapping that might have occurred
content = content.replace(/<WebGLVisibilityWrapper>\s*<WebGLVisibilityWrapper>/g, '<WebGLVisibilityWrapper>');
content = content.replace(/<\/WebGLVisibilityWrapper>\s*<\/WebGLVisibilityWrapper>/g, '</WebGLVisibilityWrapper>');

fs.writeFileSync(pageFile, content, 'utf8');
console.log('Successfully applied robust regex wrapping!');
