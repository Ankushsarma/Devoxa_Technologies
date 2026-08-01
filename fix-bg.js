const fs = require('fs');
let content = fs.readFileSync('components/HomePageDesktop.tsx', 'utf8');

const gradient = 'linear-gradient(135deg, #0D0417 0%, #230C38 50%, #0D0417 100%)';

content = content.replace(/style={{ background: "var\(--bg-void\)"([^}]*) }}/g, (match, rest) => {
  return `style={{ background: "${gradient}"${rest} }}`;
});

content = content.replace(/style={{ background: "var\(--bg-void\)",([^}]*) }}/g, (match, rest) => {
  return `style={{ background: "${gradient}", ${rest} }}`;
});

fs.writeFileSync('components/HomePageDesktop.tsx', content);
console.log('HomePageDesktop.tsx updated!');
