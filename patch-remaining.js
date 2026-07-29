const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), 'components');

const prefix = `    const _origErr = console.error;
    console.error = (...args) => {
      if (typeof args[0] === 'string' && (args[0].toLowerCase().includes('webgl') || args[0].includes('BindToCurrentSequence'))) return;
      _origErr.apply(console, args);
    };
    try {`;

const restoreSuccess = `\n      console.error = _origErr;`;
const restoreFail = `\n      console.error = _origErr;`;

const files = ['LightRays.jsx', 'LineWaves.jsx', 'SideRays.jsx', 'MagicRings.jsx', 'SpecularButton.jsx'];

for (const file of files) {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  
  content = content.replace(/try\s*\{\s*(\n\s*)*\s*(if \(typeof Renderer !== 'undefined'\) \{)?\s*renderer = new (Renderer|THREE\.WebGLRenderer)\b/, (match) => {
    return prefix + match.replace(/try\s*\{\s*(\n\s*)*/, '\n      ');
  });

  if (file !== 'MagicRings.jsx') {
    content = content.replace(/\}\s*catch\s*\(([^)]*)\)\s*\{\s*console\.warn\([^)]*\);/, (match) => {
      return match + restoreFail;
    });
  } else {
    content = content.replace(/\}\s*catch\s*\{/, '} catch {' + restoreFail);
  }

  if (file === 'LightRays.jsx' || file === 'LineWaves.jsx' || file === 'SideRays.jsx') {
    content = content.replace(/\s*\}\s*\}\s*catch\s*\(/, restoreSuccess + '\n      }\n    } catch (');
  } else if (file === 'MagicRings.jsx') {
    content = content.replace(/THREE\.WebGLRenderer\(\{ alpha: true \}\);/, 'THREE.WebGLRenderer({ alpha: true });' + restoreSuccess);
  } else if (file === 'SpecularButton.jsx') {
    content = content.replace(/renderer = new Renderer\([^)]*\);/, (match) => match + restoreSuccess);
  }

  fs.writeFileSync(path.join(dir, file), content, 'utf8');
  console.log('Patched remaining', file);
}
