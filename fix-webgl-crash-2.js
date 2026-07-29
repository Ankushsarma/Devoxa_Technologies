const fs = require('fs');

function addTryCatch(file, constructorName) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('WebGL limit reached')) return; // already added

  let regex;
  if (constructorName === 'Renderer') {
    regex = /(const renderer|this\.renderer|let renderer)\s*=\s*new\s+Renderer\s*\([\s\S]*?\);/;
  } else {
    regex = /(const renderer|this\.renderer|let renderer)\s*=\s*new\s+THREE\.WebGLRenderer\s*\([\s\S]*?\);/;
  }
  
  content = content.replace(regex, (match, type) => {
    if (type === 'const renderer') {
       return 'let renderer;\n      try {\n        renderer = ' + match.replace('const renderer = ', '') + '\n      } catch(e) {\n        console.warn("WebGL limit reached.");\n        return;\n      }';
    } else {
       return 'try {\n        ' + match + '\n      } catch(e) {\n        console.warn("WebGL limit reached.");\n        return;\n      }';
    }
  });

  fs.writeFileSync(file, content);
}

addTryCatch('components/Particles.jsx', 'Renderer');
addTryCatch('components/CircularGallery.jsx', 'Renderer');
addTryCatch('components/LiquidEther.jsx', 'THREE.WebGLRenderer');
addTryCatch('components/LightRays.jsx', 'Renderer');
console.log('Fixed regex and patched all files!');
