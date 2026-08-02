const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const targetFiles = [
  'components/HomePageMobile.tsx',
  'components/HomePageDesktop.tsx',
  'components/ui/footer-section.tsx',
  'components/ui/footer-section-mobile.tsx',
  'components/ConsultationModal.tsx',
  'components/SciFiServiceModal.tsx',
  'components/ResponsiveNavbar.tsx',
  'components/FAQAccordion.jsx',
  'app/terms/page.tsx',
  'app/security/page.tsx',
  'app/privacy/page.tsx',
  'app/not-found.tsx',
  'app/login/page.tsx',
  'app/cookie/page.tsx',
  'app/dashboard/developer/page.tsx',
  'app/dashboard/client/page.tsx'
];

const workspaceDir = 'd:/devoxa/Devoxa_Technologies';

targetFiles.forEach(relPath => {
  const filePath = path.join(workspaceDir, relPath);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }
  
  let originalContent = '';
  try {
    originalContent = execSync(`git show HEAD:${relPath}`, { cwd: workspaceDir, encoding: 'utf8' });
  } catch (e) {
    console.log(`Could not get git HEAD for ${relPath}, skipping.`);
    return;
  }

  // Process line by line to guarantee we don't accidentally swallow newlines or match across imports
  const lines = originalContent.split('\n');
  
  const processedLines = lines.map(line => {
    let newLine = line;
    
    // Check if line has a gradient
    if (newLine.includes('bg-gradient-to-')) {
      const isText = newLine.includes('text-transparent') || newLine.includes('bg-clip-text');
      
      // Remove text-transparent and bg-clip-text
      newLine = newLine.replace(/\btext-transparent\b/g, '').replace(/\bbg-clip-text\b/g, '');
      
      // Replace hover:bg-gradient...
      newLine = newLine.replace(/hover:bg-gradient-to-[a-z]{1,2}\s+hover:from-([^\s"']+)(?:\s+hover:via-[^\s"']+)?(?:\s+hover:to-[^\s"']+)?/g, (m, fromColor) => {
        return isText ? `hover:text-${fromColor}` : `hover:bg-${fromColor}`;
      });

      // Replace standard bg-gradient...
      newLine = newLine.replace(/bg-gradient-to-[a-z]{1,2}\s+from-([^\s"']+)(?:\s+via-[^\s"']+)?(?:\s+to-[^\s"']+)?/g, (m, fromColor) => {
        return isText ? `text-${fromColor}` : `bg-${fromColor}`;
      });
      
      // Clean up extra spaces introduced by removal
      newLine = newLine.replace(/\s{2,}/g, ' ');
    }
    
    return newLine;
  });

  const content = processedLines.join('\n');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${relPath}`);
  } else {
    // write original back anyway to restore
    fs.writeFileSync(filePath, originalContent, 'utf8');
    console.log(`Restored ${relPath}`);
  }
});
