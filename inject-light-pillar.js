const fs = require('fs');
let c = fs.readFileSync('app/page.tsx', 'utf8');

if (!c.includes('import LightPillar from')) {
  c = c.replace('import AgencySection from "@/components/AgencySection"', 'import AgencySection from "@/components/AgencySection"\nimport LightPillar from "@/components/LightPillar"');
}

c = c.replace(
  /<div style=\{\{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.8, pointerEvents: 'none' \}\}>\s*<\/div>/g,
  `<div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.8, pointerEvents: 'none' }}>
          <LightPillar
            baseColor="#8b5cf6"
            coreColor="#ffffff"
            pulseSpeed={1.5}
            noiseIntensity={0.5}
            pillarRotation={25}
            interactive={false}
            mixBlendMode="screen"
            quality="high"
          />
        </div>`
);

fs.writeFileSync('app/page.tsx', c);
