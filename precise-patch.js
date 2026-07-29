const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), 'components');

const prefix = `    const _origErr = console.error;
    console.error = (...args) => {
      if (typeof args[0] === 'string' && (args[0].toLowerCase().includes('webgl') || args[0].includes('BindToCurrentSequence'))) return;
      _origErr.apply(console, args);
    };\n    `;
    
const restoreSuccess = `\n      console.error = _origErr;`;
const restoreFail = `\n      console.error = _origErr;`;

const replacements = [
  {
    file: 'CircularGallery.jsx',
    find: `    try {
      this.renderer = new Renderer({`,
    replace: prefix + `try {
      this.renderer = new Renderer({`,
    catchFind: `    } catch (e) {
      console.warn("WebGL limit reached, skipping CircularGallery rendering.");
      return;
    }`,
    catchReplace: `    } catch (e) {
      console.warn("WebGL limit reached, skipping CircularGallery rendering.");${restoreFail}
      return;
    }`
  },
  {
    file: 'LightPillar.tsx',
    find: `    try {
      renderer = new THREE.WebGLRenderer({`,
    replace: prefix + `try {
      renderer = new THREE.WebGLRenderer({`,
    catchFind: `    } catch (error) {
      setWebGLSupported(false);
      return;
    }`,
    catchReplace: `    } catch (error) {
      setWebGLSupported(false);${restoreFail}
      return;
    }`
  },
  {
    file: 'LightRays.jsx',
    find: `    try {
      if (typeof Renderer !== 'undefined') {
        renderer = new Renderer({`,
    replace: prefix + `try {
      if (typeof Renderer !== 'undefined') {
        renderer = new Renderer({`,
    catchFind: `      }
    } catch (e) {
      console.warn("WebGL limit reached, skipping LightRays rendering.");
      return;
    }`,
    catchReplace: `      }${restoreSuccess}
    } catch (e) {
      console.warn("WebGL limit reached, skipping LightRays rendering.");${restoreFail}
      return;
    }`
  },
  {
    file: 'LineWaves.jsx',
    find: `    try {
      if (typeof Renderer !== 'undefined') {
        renderer = new Renderer({`,
    replace: prefix + `try {
      if (typeof Renderer !== 'undefined') {
        renderer = new Renderer({`,
    catchFind: `      }
    } catch (e) {
      console.warn("WebGL limit reached, skipping LineWaves rendering.");
      return;
    }`,
    catchReplace: `      }${restoreSuccess}
    } catch (e) {
      console.warn("WebGL limit reached, skipping LineWaves rendering.");${restoreFail}
      return;
    }`
  },
  {
    file: 'LiquidChrome.jsx',
    find: `    try {
      renderer = new Renderer({`,
    replace: prefix + `try {
      renderer = new Renderer({`,
    catchFind: `    } catch (e) {
      console.warn("WebGL limit reached, skipping LiquidChrome rendering.");
      return;
    }`,
    catchReplace: `    } catch (e) {
      console.warn("WebGL limit reached, skipping LiquidChrome rendering.");${restoreFail}
      return;
    }`
  },
  {
    file: 'LiquidEther.jsx',
    find: `    try {
      Common.renderer = new Renderer({`,
    replace: prefix + `try {
      Common.renderer = new Renderer({`,
    catchFind: `    } catch (e) {
      console.warn("WebGL limit reached, skipping LiquidEther rendering.");
      return;
    }`,
    catchReplace: `    } catch (e) {
      console.warn("WebGL limit reached, skipping LiquidEther rendering.");${restoreFail}
      return;
    }`
  },
  {
    file: 'MagicRings.jsx',
    find: `    try {
      renderer = new THREE.WebGLRenderer({ alpha: true });
    } catch {
      return;
    }`,
    replace: prefix + `try {
      renderer = new THREE.WebGLRenderer({ alpha: true });${restoreSuccess}
    } catch {${restoreFail}
      return;
    }`,
    catchFind: null // merged above
  },
  {
    file: 'Particles.jsx',
    find: `    try {
      renderer = new Renderer({`,
    replace: prefix + `try {
      renderer = new Renderer({`,
    catchFind: `    } catch (e) {
      console.warn("WebGL limit reached, skipping Particles rendering.");
      return;
    }`,
    catchReplace: `    } catch (e) {
      console.warn("WebGL limit reached, skipping Particles rendering.");${restoreFail}
      return;
    }`
  },
  {
    file: 'SideRays.jsx',
    find: `    try {
      if (typeof Renderer !== 'undefined') {
        renderer = new Renderer({`,
    replace: prefix + `try {
      if (typeof Renderer !== 'undefined') {
        renderer = new Renderer({`,
    catchFind: `      }
    } catch (e) {
      console.warn("WebGL limit reached, skipping SideRays rendering.");
      return;
    }`,
    catchReplace: `      }${restoreSuccess}
    } catch (e) {
      console.warn("WebGL limit reached, skipping SideRays rendering.");${restoreFail}
      return;
    }`
  },
  {
    file: 'SpecularButton.jsx',
    find: `    try {
      renderer = new Renderer({ alpha: true, premultipliedAlpha: true, antialias: true, dpr });
    } catch (e) {
      console.warn("WebGL limit reached, skipping SpecularButton rendering.");
      return;
    }`,
    replace: prefix + `try {
      renderer = new Renderer({ alpha: true, premultipliedAlpha: true, antialias: true, dpr });${restoreSuccess}
    } catch (e) {
      console.warn("WebGL limit reached, skipping SpecularButton rendering.");${restoreFail}
      return;
    }`,
    catchFind: null
  }
];

for (const rep of replacements) {
  const filePath = path.join(dir, rep.file);
  if (!fs.existsSync(filePath)) continue;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // We want to add restoreSuccess dynamically for ones that don't have catchFind=null
  if (rep.catchFind) {
    // Add restoreSuccess right before the catch block if not MagicRings/SpecularButton
    const beforeCatch = `    } catch (e) {`;
    if (content.includes(beforeCatch) && rep.file !== 'LightRays.jsx' && rep.file !== 'LineWaves.jsx' && rep.file !== 'SideRays.jsx') {
      content = content.replace(beforeCatch, restoreSuccess + '\n' + beforeCatch);
    }
  }

  content = content.replace(rep.find, rep.replace);
  if (rep.catchFind) {
    content = content.replace(rep.catchFind, rep.catchReplace);
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully patched precisely:', rep.file);
  } else {
    console.log('No changes needed or exact string not found:', rep.file);
  }
}
