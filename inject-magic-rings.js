const fs = require('fs');
let c = fs.readFileSync('app/page.tsx', 'utf8');

if (!c.includes('import MagicRings from')) {
  c = c.replace('import LightPillar from "@/components/LightPillar"', 'import LightPillar from "@/components/LightPillar"\nimport MagicRings from "@/components/MagicRings"');
}

c = c.replace(
  /<section id="how-it-works" className="light-sec vx-float" style=\{\{ padding: "100px 0", position: "relative" \}\}>\s*<div style=\{\{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 \}\}>\s*<\/div>/g,
  `<section id="how-it-works" className="light-sec vx-float" style={{ padding: "100px 0", position: "relative" }}>
        
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "100vw", height: "100vw", minWidth: "1000px", minHeight: "1000px", opacity: 0.4 }}>
            <MagicRings
              color="#A855F7"
              colorTwo="#6366F1"
              ringCount={6}
              speed={1}
              attenuation={10}
              lineThickness={2}
              baseRadius={0.35}
              radiusStep={0.1}
              scaleRate={0.1}
              mouseInfluence={0.5}
            />
          </div>
        </div>`
);

fs.writeFileSync('app/page.tsx', c);
