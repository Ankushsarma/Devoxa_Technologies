const fs = require('fs');
const path = require('path');

const targetDirs = ['app', 'components'];

function processDirectory(directory) {
  fs.readdirSync(directory).forEach(file => {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');

      // 1. Broad replace for all background purples/violets/indigos/fuchsias to primary accent #7B1FA2
      content = content.replace(/bg-(purple|violet|indigo|fuchsia)-[456789]00(\/[0-9]+)?/g, (match, p1, p2) => `bg-[#7B1FA2]${p2 || ''}`);
      
      // 2. Broad replace for all gradient FROM to #7B1FA2 or #0D0417 depending on depth
      content = content.replace(/from-(purple|violet|indigo|fuchsia)-[456]00(\/[0-9]+)?/g, (match, p1, p2) => `from-[#7B1FA2]${p2 || ''}`);
      content = content.replace(/from-(purple|violet|indigo|fuchsia)-[789]00(\/[0-9]+)?/g, (match, p1, p2) => `from-[#230C38]${p2 || ''}`);
      content = content.replace(/from-(purple|violet|indigo|fuchsia)-950(\/[0-9]+)?/g, (match, p1, p2) => `from-[#230C38]${p2 || ''}`);
      
      // 3. Broad replace for all gradient VIA to #A94FE0 or #230C38
      content = content.replace(/via-(purple|violet|indigo|fuchsia)-[456]00(\/[0-9]+)?/g, (match, p1, p2) => `via-[#A94FE0]${p2 || ''}`);
      content = content.replace(/via-(purple|violet|indigo|fuchsia)-[789]00(\/[0-9]+)?/g, (match, p1, p2) => `via-[#230C38]${p2 || ''}`);
      content = content.replace(/via-(purple|violet|indigo|fuchsia)-950(\/[0-9]+)?/g, (match, p1, p2) => `via-[#230C38]${p2 || ''}`);
      
      // 4. Broad replace for all gradient TO to #7B1FA2 or #230C38
      content = content.replace(/to-(purple|violet|indigo|fuchsia)-[456]00(\/[0-9]+)?/g, (match, p1, p2) => `to-[#7B1FA2]${p2 || ''}`);
      content = content.replace(/to-(purple|violet|indigo|fuchsia)-[789]00(\/[0-9]+)?/g, (match, p1, p2) => `to-[#230C38]${p2 || ''}`);
      content = content.replace(/to-(purple|violet|indigo|fuchsia)-950(\/[0-9]+)?/g, (match, p1, p2) => `to-[#230C38]${p2 || ''}`);
      
      // 5. Broad replace for text to Secondary Accent #A94FE0
      content = content.replace(/text-(purple|violet|indigo|fuchsia)-[2345]00(\/[0-9]+)?/g, (match, p1, p2) => `text-[#A94FE0]${p2 || ''}`);
      
      // 6. Broad replace for borders to Secondary Accent #A94FE0
      content = content.replace(/border-(purple|violet|indigo|fuchsia)-[3456]00(\/[0-9]+)?/g, (match, p1, p2) => `border-[#A94FE0]${p2 || ''}`);
      content = content.replace(/hover:border-(purple|violet|indigo|fuchsia)-[3456]00(\/[0-9]+)?/g, (match, p1, p2) => `hover:border-[#A94FE0]${p2 || ''}`);
      
      // 7. Fix up glows and shadows
      content = content.replace(/shadow-\[0_0_[0-9]+px_rgba\([^)]+\)\]/g, 'shadow-[0_0_40px_rgba(169,79,224,0.15)]');
      
      // 8. Backgrounds that were missed
      content = content.replace(/bg-purple-[23]00(\/[0-9]+)?/g, (match, p1) => `bg-[#A94FE0]${p1 || ''}`);

      fs.writeFileSync(fullPath, content);
    }
  });
}

targetDirs.forEach(dir => processDirectory(path.join(__dirname, dir)));
console.log("Colors successfully replaced!");
