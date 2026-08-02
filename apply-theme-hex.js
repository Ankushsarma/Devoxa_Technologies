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

      // Base Backgrounds
      content = content.replace(/#0A0A0B/gi, '#2B0F45');
      content = content.replace(/#201a30/gi, '#2B0F45');
      content = content.replace(/#3b2b5c/gi, '#2B0F45');

      // Primary Accent replacements (#7B1FA2)
      content = content.replace(/#7c3aed/gi, '#7B1FA2');
      content = content.replace(/#8b5cf6/gi, '#7B1FA2');
      content = content.replace(/#4F46E5/gi, '#7B1FA2');
      
      // Secondary Accent replacements (#A94FE0)
      content = content.replace(/#a78bfa/gi, '#A94FE0');
      content = content.replace(/#c084fc/gi, '#A94FE0');
      content = content.replace(/#f472b6/gi, '#A94FE0');
      content = content.replace(/#38bdf8/gi, '#A94FE0');

      // Text colors that are pure white or off-white inside inline styles
      // (Be careful not to replace every single #ffffff if it's not a color, but usually it is)
      content = content.replace(/color:\s*['"]#ffffff['"]/gi, 'color: "#EAD9F7"');
      content = content.replace(/color:\s*['"]#f5f5f5['"]/gi, 'color: "#EAD9F7"');
      
      content = content.replace(/textColor=['"]#f5f5f5['"]/gi, 'textColor="#EAD9F7"');
      content = content.replace(/textColor=['"]#ffffff['"]/gi, 'textColor="#EAD9F7"');
      content = content.replace(/tint=['"]#ffffff['"]/gi, 'tint="#EAD9F7"');

      // Re-replace text-[#EAD9F7] hovering since hover:text-[#EAD9F7] was hardcoded in previous script
      // Actually previous script changed some texts to #EAD9F7, let's just make sure there are no remaining bad hardcoded hexes

      fs.writeFileSync(fullPath, content);
    }
  });
}

targetDirs.forEach(dir => processDirectory(path.join(__dirname, dir)));
console.log("Hex colors successfully replaced!");
