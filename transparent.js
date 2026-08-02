const fs = require('fs');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;

  // 1. Mobile & Desktop: Remove inline backgrounds for these sections
  const inlineBgPattern1 = /background:\s*"linear-gradient\(to right,\s*#08060E\s*0%,\s*#08060E\s*20%,\s*#1A0733\s*40%,\s*#4A1890\s*62%,\s*#7120C8\s*80%,\s*#8B2FD1\s*100%\)"/g;
  const inlineBgPattern2 = /background:\s*"linear-gradient\(135deg,\s*#0A0710\s*0%,\s*#2B0F45\s*50%,\s*#0A0710\s*100%\)"/g;
  
  newContent = newContent.replace(inlineBgPattern1, 'background: "transparent"');
  newContent = newContent.replace(inlineBgPattern2, 'background: "transparent"');

  // 2. Mobile & Desktop: Make sure `light-sec` sections get `transparent-bg`
  // We only target #solutions and #industries, and maybe #how-it-works if it has it.
  
  // For #solutions
  newContent = newContent.replace(/<section id="solutions"\s+className="([^"]*?light-sec[^"]*?)"/g, (m, c) => {
    if (!c.includes('transparent-bg')) {
      return `<section id="solutions" className="${c} transparent-bg"`;
    }
    return m;
  });

  // For #industries
  newContent = newContent.replace(/<section id="industries"\s+className="([^"]*?light-sec[^"]*?)"/g, (m, c) => {
    if (!c.includes('transparent-bg')) {
      return `<section id="industries" className="${c} transparent-bg"`;
    }
    return m;
  });

  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

processFile('d:/devoxa/Devoxa_Technologies/components/HomePageMobile.tsx');
processFile('d:/devoxa/Devoxa_Technologies/components/HomePageDesktop.tsx');
