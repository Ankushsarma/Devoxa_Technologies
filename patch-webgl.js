const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), 'components');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx') || f.endsWith('.tsx'));

const prefix = `    const _origErr = console.error;
    console.error = (...args) => {
      if (typeof args[0] === 'string' && (args[0].toLowerCase().includes('webgl') || args[0].includes('BindToCurrentSequence'))) return;
      _origErr.apply(console, args);
    };
    try {`;

for (const file of files) {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  let original = content;

  content = content.replace(/try\s*\{\s*(this\.)?renderer\s*=\s*new\s+(THREE\.)?(WebGL)?Renderer\b/g, (match) => {
    return prefix + '\n      ' + match.replace(/try\s*\{/, '');
  });

  content = content.replace(/(\s*)\}\s*catch\s*\(([^)]*)\)\s*\{/g, (match) => {
    return `\n      console.error = _origErr;` + match;
  });

  content = content.replace(/catch\s*\(([^)]*)\)\s*\{([\s\S]*?)return;/g, (match, errVar, catchBody) => {
    if (catchBody.includes('_origErr')) return match; 
    return `catch (${errVar}) {${catchBody}\n      console.error = _origErr;\n      return;`;
  });

  if (content !== original) {
    fs.writeFileSync(path.join(dir, file), content, 'utf8');
    console.log('Patched', file);
  }
}
