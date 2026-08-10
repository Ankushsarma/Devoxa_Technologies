const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Replace Unsplash imgs with Image fill
  const unsplashRegex = /<img\s+src="https:\/\/images\.unsplash\.com[^"]+"\s+alt="([^"]+)"\s*(className="[^"]*")?\s*\/>/g;
  if (unsplashRegex.test(content)) {
    content = content.replace(unsplashRegex, (match, alt, className) => {
      return `<Image src="${match.match(/src="([^"]+)"/)[1]}" alt="${alt}" fill ${className || ''} />`;
    });
    changed = true;
  }

  // Replace logos in HomePageDesktop
  if (filePath.includes('HomePageDesktop')) {
    content = content.replace(
      /<img src="\/logo\.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} \/>/g,
      `<Image src="/logo.png" alt="Logo" width={36} height={36} className="object-contain w-full h-full" />`
    );
    content = content.replace(
      /<img src="\/logo\.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'scale\(1\.2\)' }} \/>/g,
      `<Image src="/logo.png" alt="Logo" width={32} height={32} className="object-contain w-full h-full" style={{ transform: 'scale(1.2)' }} />`
    );
    content = content.replace(
      /<img\s+src="\/untitled-logotype\.png"\s+alt="FUTURE"\s+style={{[^}]+}}\s+\/>/g,
      `<Image src="/untitled-logotype.png" alt="FUTURE" width={500} height={100} style={{ width: "100%", maxWidth: "clamp(320px, 35vw, 500px)", height: "auto", display: "block" }} />`
    );
    changed = true;
  }

  // Replace logos in HomePageMobile
  if (filePath.includes('HomePageMobile')) {
    content = content.replace(
      /<img src="\/logo\.png" alt="Logo" className="([^"]+)" \/>/g,
      `<Image src="/logo.png" alt="Logo" width={40} height={40} className="$1" />`
    );
    content = content.replace(
      /<img\s+src="\/untitled-logotype\.png"\s+alt="FUTURE"\s+className="([^"]+)"\s+\/>/g,
      `<Image src="/untitled-logotype.png" alt="FUTURE" width={200} height={40} className="$1" />`
    );
    changed = true;
  }

  if (changed) {
    // Add import if missing
    if (!content.includes('import Image from "next/image"') && !content.includes("import Image from 'next/image'")) {
      content = content.replace(/"use client"\r?\n/, `"use client"\nimport Image from "next/image"\n`);
    }
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

processFile(path.join(__dirname, 'components/HomePageDesktop.tsx'));
processFile(path.join(__dirname, 'components/HomePageMobile.tsx'));
