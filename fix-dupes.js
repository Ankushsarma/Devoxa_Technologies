const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), 'components');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx') || f.endsWith('.tsx'));

const blockRegex = /\s*const _origErr = console\.error;\s*console\.error = \(\.\.\.args\) => \{\s*if \(typeof args\[0\] === 'string' && \(args\[0\]\.toLowerCase\(\)\.includes\('webgl'\) \|\| args\[0\]\.includes\('BindToCurrentSequence'\)\)\) return;\s*_origErr\.apply\(console, args\);\s*\};\s*/g;

const prefix = `    const _origErr = console.error;
    console.error = (...args) => {
      if (typeof args[0] === 'string' && (args[0].toLowerCase().includes('webgl') || args[0].includes('BindToCurrentSequence'))) return;
      _origErr.apply(console, args);
    };\n`;

for (const file of files) {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  let original = content;

  content = content.replace(blockRegex, '\n');

  content = content.replace(/try\s*\{\s*(this\.)?renderer\s*=\s*new\s+(THREE\.)?(WebGL)?Renderer\b/g, (match) => {
    return prefix + '    ' + match;
  });

  content = content.replace(/(\s*console\.error = _origErr;)+/g, '\n      console.error = _origErr;');

  if (content !== original) {
    fs.writeFileSync(path.join(dir, file), content, 'utf8');
    console.log('Fixed duplicate origErr in', file);
  }
}
