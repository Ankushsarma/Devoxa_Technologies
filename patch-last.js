const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), 'components');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx') || f.endsWith('.tsx'));

const prefix = `    const _origErr = console.error;
    console.error = (...args) => {
      if (typeof args[0] === 'string' && (args[0].toLowerCase().includes('webgl') || args[0].includes('BindToCurrentSequence'))) return;
      _origErr.apply(console, args);
    };\n    `;

for (const file of files) {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  let original = content;

  // Ensure it doesn't already have the patch
  if (content.includes('const _origErr = console.error;')) continue;

  // We are looking for: try { ... renderer = new Renderer
  // Because some have blank lines, we use a regex that handles whitespace
  content = content.replace(/(?<!\/\/\s*)try\s*\{\s*(?:\n\s*)*\s*(?:if \(typeof Renderer !== 'undefined'\) \{)?\s*(?:this\.)?renderer = new (?:THREE\.WebGLRenderer|Renderer)\b/, (match) => {
    return prefix + match.trimStart();
  });

  if (content !== original) {
    fs.writeFileSync(path.join(dir, file), content, 'utf8');
    console.log('Successfully applied patch to', file);
  }
}
