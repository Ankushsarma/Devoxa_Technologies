const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  const unsplashRegex = /<img\s+src="https:\/\/images\.unsplash\.com[^"]+"\s+alt="([^"]+)"\s*(className="[^"]*")?\s*\/>/g;
  if (unsplashRegex.test(content)) {
    content = content.replace(unsplashRegex, (match, alt, className) => {
      return `<Image src="${match.match(/src="([^"]+)"/)[1]}" alt="${alt}" fill ${className || ''} />`;
    });
    changed = true;
  }

  // Blog specific image replacements
  const authorAvatarRegex = /<img src=\{([^}]+)\}\s+alt=\{([^}]+)\}\s+className="([^"]+)"\s*\/>/g;
  if (authorAvatarRegex.test(content)) {
    content = content.replace(authorAvatarRegex, (match, src, alt, className) => {
      return `<Image src={${src}} alt={${alt}} width={64} height={64} className="${className}" />`;
    });
    changed = true;
  }

  // Blog general image replacements (e.g. post.image)
  const blogImageRegex = /<img src=\{([^}]+)\}\s+alt=\{([^}]+)\}\s+className="([^"]+)"\s*\/>/g;
  if (blogImageRegex.test(content)) {
    content = content.replace(blogImageRegex, (match, src, alt, className) => {
      return `<Image src={${src}} alt={${alt}} fill className="${className}" />`;
    });
    changed = true;
  }

  if (changed) {
    if (!content.includes('import Image from "next/image"') && !content.includes("import Image from 'next/image'")) {
      content = content.replace(/(import [^\n]+\n)/, `$1import Image from "next/image"\n`);
    }
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

processFile(path.join(__dirname, 'app/blog/page.tsx'));
processFile(path.join(__dirname, 'app/blog/[slug]/page.tsx'));
processFile(path.join(__dirname, 'app/dashboard/admin/page.tsx'));
