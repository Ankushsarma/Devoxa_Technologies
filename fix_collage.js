const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'components/HomePageDesktop.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// The three images in the collage section currently have `fill` which overrides their tailwind width/height classes.
// We will replace `fill` with `width={600} height={600}` so they respect their tailwind classes again.

content = content.replace(
  /<Image src="https:\/\/images\.unsplash\.com\/photo-1498050108023-c5249f4df085\?auto=format&fit=crop&w=600&q=80" alt="Code" fill  className="([^"]+)" \/>/g,
  '<Image src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80" alt="Code" width={600} height={600} className="$1" />'
);

content = content.replace(
  /<Image src="https:\/\/images\.unsplash\.com\/photo-1558494949-ef010cbdcc31\?auto=format&fit=crop&w=600&q=80" alt="AI Tech" fill  className="([^"]+)" \/>/g,
  '<Image src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80" alt="AI Tech" width={600} height={600} className="$1" />'
);

content = content.replace(
  /<Image src="https:\/\/images\.unsplash\.com\/photo-1522071820081-009f0129c71c\?auto=format&fit=crop&w=600&q=80" alt="Design Process" fill  className="([^"]+)" \/>/g,
  '<Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80" alt="Design Process" width={600} height={600} className="$1" />'
);

fs.writeFileSync(filePath, content);
console.log('Fixed collage images in HomePageDesktop.tsx');
