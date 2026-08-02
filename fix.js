
const fs = require('fs');
let code = fs.readFileSync('app/globals.css', 'utf8');

code = code.replace(/background-attachment:\s*fixed;/g, '');

const bodyBefore = \
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    z-index: -9999;
    pointer-events: none;
    background: 
      linear-gradient(135deg, transparent 8%, rgba(51, 11, 56, 0.25) 8%, rgba(51, 11, 56, 0.25) 15%, transparent 15%),
      linear-gradient(135deg, transparent 18%, rgba(51, 11, 56, 0.4) 18%, rgba(51, 11, 56, 0.4) 22%, transparent 22%),
      linear-gradient(135deg, transparent 45%, rgba(20, 6, 26, 0.3) 45%, rgba(20, 6, 26, 0.3) 55%, transparent 55%),
      linear-gradient(135deg, transparent 70%, rgba(20, 6, 26, 0.6) 70%, rgba(20, 6, 26, 0.6) 80%, transparent 80%),
      linear-gradient(135deg, transparent 83%, rgba(51, 11, 56, 0.3) 83%, rgba(51, 11, 56, 0.3) 90%, transparent 90%),
      linear-gradient(135deg, #04030a 0%, #14061a 30%, #330b38 55%, #14061a 78%, #04030a 100%);
    will-change: transform;
    transform: translateZ(0);
  }
\;

if(!code.includes('body::before')) {
  code = code.replace(/@apply font-sans;\s*\n\s*\}/, '@apply font-sans;\n  }\n' + bodyBefore);
  fs.writeFileSync('app/globals.css', code);
  console.log('Successfully optimized CSS');
}
\
node fix.js
rm fix.js

