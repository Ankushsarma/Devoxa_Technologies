const fs = require('fs');
let c = fs.readFileSync('app/page.tsx', 'utf8');

if (!c.includes('import SideRays from')) {
  c = c.replace('import MagicRings from "@/components/MagicRings"', 'import MagicRings from "@/components/MagicRings"\nimport SideRays from "@/components/SideRays"');
}

const targetStr = `<div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, opacity: 0.5 }}>
          
        </div>`;

const replacementStr = `<div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, opacity: 0.5 }}>
          <SideRays
            speed={2}
            rayColor1="#a78bfa"
            rayColor2="#7c3aed"
            intensity={1.2}
            spread={2}
            origin="top-right"
            tilt={-10}
            saturation={1.5}
            blend={0.75}
            falloff={1.6}
            opacity={1}
          />
        </div>`;

c = c.replace(targetStr, replacementStr);

fs.writeFileSync('app/page.tsx', c);
console.log('SideRays injected into Industries section!');
