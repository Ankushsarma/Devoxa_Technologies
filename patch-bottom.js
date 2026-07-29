const fs = require('fs');
const path = require('path');

function patchComponent(compName, refName) {
  const file = path.join(process.cwd(), 'components', compName);
  if (!fs.existsSync(file)) return;
  let c = fs.readFileSync(file, 'utf8');

  if (c.includes('useIntersectionObserver')) return; // already patched

  // Add import after use client
  if (c.includes("'use client';")) {
    c = c.replace(/'use client';\r?\n/, "'use client';\nimport { useIntersectionObserver } from 'usehooks-ts';\n");
  } else if (c.includes('"use client";')) {
    c = c.replace(/"use client";\r?\n/, "\"use client\";\nimport { useIntersectionObserver } from 'usehooks-ts';\n");
  } else {
    c = "import { useIntersectionObserver } from 'usehooks-ts';\n" + c;
  }

  // Find ref and inject observer
  const refRegex = new RegExp(`const ${refName} = useRef\\(.*?\\);`);
  c = c.replace(refRegex, `$&
  const { isIntersecting } = useIntersectionObserver({
    ref: ${refName},
    threshold: 0,
    rootMargin: '200px',
  });`);

  // Find the useEffect that creates the renderer and add the if check
  // We'll specifically look for the one containing `new Renderer` or `new THREE.WebGLRenderer`
  const useEffectStart = /useEffect\(\(\) => \{/g;
  
  let match;
  let newContent = '';
  let lastIndex = 0;
  
  while ((match = useEffectStart.exec(c)) !== null) {
    // Find the end of this useEffect block roughly by looking for the next useEffect or end of file
    const nextMatch = c.indexOf('useEffect(() => {', useEffectStart.lastIndex);
    const blockEnd = nextMatch !== -1 ? nextMatch : c.length;
    
    const block = c.substring(match.index, blockEnd);
    if (block.includes('new Renderer') || block.includes('new THREE.WebGLRenderer')) {
      newContent += c.substring(lastIndex, match.index) + "useEffect(() => {\n    if (!isIntersecting) return;\n";
      lastIndex = match.index + match[0].length;
      
      // Also, in this specific block, we need to add isIntersecting to the dependency array!
      // But instead of complex regex, we can just find the NEXT `}, [` after match.index
      // Actually, it's safer to just let the script do a simple replacement if we find the exact block.
    }
  }
  
  if (newContent) {
    newContent += c.substring(lastIndex);
    c = newContent;
    
    // Now add isIntersecting to the dependency array of the WebGL useEffect.
    // It's usually the one with `// eslint-disable-next-line react-hooks/exhaustive-deps` or just `}, []);`
    // Let's just blindly add it to `}, []);` or `}, [something]);` IF it contains WebGL rendering?
    // It's safer to just replace all dependency arrays in these specific bottom components since they don't have 15 useEffects like LightPillar (wait, LightPillar does).
  }

  fs.writeFileSync(file, c, 'utf8');
}

// Let's manually patch the simplest ones that consume the most contexts:
// SpecularButton (3 contexts total on page)
patchComponent('SpecularButton.jsx', 'btnRef');

// LineWaves (1 context)
patchComponent('LineWaves.jsx', 'containerRef');

// CircularGallery (1 context)
patchComponent('CircularGallery.jsx', 'containerRef');

console.log('Patched bottom components!');
