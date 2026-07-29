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
  'LineWaves.jsx',
  'SpecularButton.jsx'
];

components.forEach(comp => {
  const file = path.join(process.cwd(), 'components', comp);
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  if (content.includes('useIntersectionObserver')) return; // Already patched

  // Add import
  content = content.replace(/(import React[^]*?['"];?)/, "$1\nimport { useIntersectionObserver } from 'usehooks-ts';");

  // Add hook inside component. We look for `const containerRef = useRef` or `const mountRef = useRef`
  // Some use containerRef, some use mountRef, some use btnRef.
  let refName = 'containerRef';
  if (content.includes('const mountRef = useRef')) refName = 'mountRef';
  if (content.includes('const btnRef = useRef')) refName = 'btnRef';

  const refMatch = new RegExp(`const ${refName} = useRef\\(.*?\\);`);
  content = content.replace(refMatch, `$&
  const { isIntersecting } = useIntersectionObserver({
    ref: ${refName},
    threshold: 0,
    rootMargin: '200px',
  });`);

  // Add if (!isIntersecting) return; at start of useEffect
  // Need to be careful because some components have multiple useEffects. 
  // Usually the main one is the one containing `let renderer;` or `new Renderer` or `new THREE.WebGLRenderer`
  
  // We can just find the useEffect that contains `let renderer;`
  const useEffectRegex = /useEffect\(\(\) => \{\s*(const \w+ = (?:containerRef|mountRef|btnRef)\.current;\s*if \(!\w+\) return;)/;
  if (useEffectRegex.test(content)) {
    content = content.replace(useEffectRegex, (match, containerCheck) => {
      return `useEffect(() => {\n    if (!isIntersecting) return;\n    ${containerCheck}`;
    });
  } else {
    // If it doesn't match the specific container check, just find useEffect containing let renderer
    const fallbackRegex = /(useEffect\(\(\) => \{[\s\S]*?let renderer;)/;
    content = content.replace(fallbackRegex, (match) => {
      return match.replace('useEffect(() => {', 'useEffect(() => {\n    if (!isIntersecting) return;\n');
    });
  }

  // Add isIntersecting to the dependency array of that useEffect
  // The dependency array is at the end of the useEffect. 
  // Since some useEffects are huge, let's use a trick: 
  // We can just add it before the closing bracket of the dependency array.
  // Actually, some dependency arrays are empty `[]`, some have elements.
  // We can just find `]);` or `],` or `} , [`
  // Let's just find the last `]);` in the file? No, could be multiple.
  
  // A robust way to add to the dependency array of the main useEffect:
  // It's the one we just modified. But regexing forward to its closing is hard.
  // Let's just do a blanket replace of all dependency arrays that contain props?
  // Actually, if we just find `// eslint-disable-next-line react-hooks/exhaustive-deps\n  }, [`
  content = content.replace(/\/\/ eslint-disable-next-line react-hooks\/exhaustive-deps\s*\n\s*\}, \[/g, '$&\n    isIntersecting,');
  
  // What if it doesn't have the eslint disable?
  // Let's just blindly add it to all non-empty dependency arrays? Too risky.
  // Since we only need it to re-trigger, if we add it manually, it's safer.
  // Let's use a generic regex for `}, [`
  content = content.replace(/\}, \[([^\]]*)\]\);/g, (match, deps) => {
    if (deps.trim() === '') return '}, [isIntersecting]);';
    return `}, [isIntersecting, ${deps}]);`;
  });

  fs.writeFileSync(file, content, 'utf8');
});

console.log('Internal lazy loading applied!');
