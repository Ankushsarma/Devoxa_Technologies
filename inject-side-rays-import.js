const fs = require('fs');
let c = fs.readFileSync('app/page.tsx', 'utf8');

if (!c.includes('import SideRays from')) {
  c = c.replace('import MagicRings from "@/components/MagicRings"', 'import MagicRings from "@/components/MagicRings"\nimport SideRays from "@/components/SideRays"');
}

fs.writeFileSync('app/page.tsx', c);
