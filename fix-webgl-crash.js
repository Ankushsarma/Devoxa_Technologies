const fs = require('fs');

function addTryCatch(file, constructorName) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Find `const renderer = new Renderer({ ... });`
  // or `this.renderer = new THREE.WebGLRenderer({ ... });`
  
  if (content.includes('try {')) return; // Already has try catch

  const regex = new RegExp(`(const renderer|this\\.renderer|let renderer)\\s*=\\s*new\\s+${constructorName}\\s*\\([\\s\\S]*?\\);`);
  
  content = content.replace(regex, (match) => {
    // If it's a const, we need to change it to let before the try block if it's used after
    if (match.startsWith('const renderer')) {
       return `let renderer;\n    try {\n      renderer = ${match.replace('const renderer = ', '')}\n    } catch(e) {\n      console.warn("WebGL limit reached.");\n      return;\n    }`;
    } else {
       return `try {\n      ${match}\n    } catch(e) {\n      console.warn("WebGL limit reached.");\n      return;\n    }`;
    }
  });

  fs.writeFileSync(file, content);
}

addTryCatch('components/Particles.jsx', 'Renderer');
addTryCatch('components/CircularGallery.jsx', 'Renderer');
addTryCatch('components/LiquidEther.jsx', 'THREE\\.WebGLRenderer');
addTryCatch('components/LightRays.jsx', 'Renderer');

console.log('Added clean try/catch blocks to all 4 WebGL components!');
