const fs = require('fs');
const path = require('path');

const components = [
  'Particles.jsx',
  'LiquidEther.jsx',
  'LiquidChrome.jsx',
  'LightRays.jsx',
  'SideRays.jsx',
  'MagicRings.jsx',
  'LightPillar.tsx',
  'CircularGallery.jsx',
  'LineWaves.jsx'
];

components.forEach(comp => {
  const file = path.join(process.cwd(), 'components', comp);
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // Skip if already patched
  if (content.includes('useIntersectionObserver')) return;

  // Add import
  content = content.replace(/(import React[^]*?['"];?)/, "$1\nimport { useIntersectionObserver } from 'usehooks-ts';");

  // Determine ref name
  let refName = 'containerRef';
  if (content.includes('const mountRef = useRef')) refName = 'mountRef';

  // Inject useIntersectionObserver right after the ref definition
  const refMatch = new RegExp(`const ${refName} = useRef\\(.*?\\);`);
  content = content.replace(refMatch, `$&
  const { isIntersecting } = useIntersectionObserver({
    ref: ${refName},
    threshold: 0,
    rootMargin: '200px',
  });`);

  // Inject early return inside useEffect that contains 'new Renderer' or 'new THREE.WebGLRenderer'
  const useEffectRegex = /(useEffect\(\(\) => \{)([\s\S]*?(?:new Renderer|new THREE\.WebGLRenderer))/;
  content = content.replace(useEffectRegex, (match, p1, p2) => {
    return `${p1}\n    if (!isIntersecting) return;${p2}`;
  });

  // Inject isIntersecting into the dependency array of the modified useEffect
  // We'll look for `}, [` and append it
  content = content.replace(/\}, \[([^\]]*)\]\);/g, (match, deps) => {
    if (deps.trim() === '') return '}, [isIntersecting]);';
    return `}, [isIntersecting, ${deps}]);`;
  });

  fs.writeFileSync(file, content, 'utf8');
});

// SpecularButton is special
const sbFile = path.join(process.cwd(), 'components', 'SpecularButton.jsx');
if (fs.existsSync(sbFile)) {
  let sbContent = fs.readFileSync(sbFile, 'utf8');
  if (!sbContent.includes('useIntersectionObserver')) {
    sbContent = sbContent.replace(/(import React[^]*?['"];?)/, "$1\nimport { useIntersectionObserver } from 'usehooks-ts';");
    sbContent = sbContent.replace(/const btnRef = useRef\(.*?\);/, `$&
  const { isIntersecting } = useIntersectionObserver({
    ref: btnRef,
    threshold: 0,
    rootMargin: '200px',
  });`);
    const sbUseEffectRegex = /(useEffect\(\(\) => \{)([\s\S]*?new Renderer)/;
    sbContent = sbContent.replace(sbUseEffectRegex, (match, p1, p2) => {
      return `${p1}\n    if (!isIntersecting) return;${p2}`;
    });
    sbContent = sbContent.replace(/\}, \[([^\]]*)\]\);/g, (match, deps) => {
      if (deps.trim() === '') return '}, [isIntersecting]);';
      return `}, [isIntersecting, ${deps}]);`;
    });
    fs.writeFileSync(sbFile, sbContent, 'utf8');
  }
}

console.log('Successfully injected useIntersectionObserver into all WebGL components!');
