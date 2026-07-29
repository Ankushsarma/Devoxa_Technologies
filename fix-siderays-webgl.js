const fs = require('fs');
let c = fs.readFileSync('components/SideRays.jsx', 'utf8');

const targetRegex = /const renderer = new Renderer\(\{\s*dpr: Math\.min\(window\.devicePixelRatio, 2\),\s*alpha: true,\s*premultipliedAlpha: false\s*\}\);/g;

const replacement = `let renderer;
      try {
        renderer = new Renderer({
          dpr: Math.min(window.devicePixelRatio, 2),
          alpha: true,
          premultipliedAlpha: false
        });
      } catch (err) {
        console.warn("WebGL not supported for SideRays", err);
        return;
      }`;

c = c.replace(targetRegex, replacement);
fs.writeFileSync('components/SideRays.jsx', c);
console.log('Fixed SideRays.jsx!');
