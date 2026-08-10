const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app/globals.css');
let content = fs.readFileSync(filePath, 'utf8');

// The original tag CSS has:
// background: rgba(255, 255, 255, 0.14);
// border: 1px solid rgba(255, 255, 255, 0.2);
content = content.replace(
  /background: rgba\(255, 255, 255, 0\.14\);\r?\n\s*border: 1px solid rgba\(255, 255, 255, 0\.2\);/,
  `background: transparent;\n  border: none;`
);

fs.writeFileSync(filePath, content);
console.log('Updated app/globals.css tag transparency');
