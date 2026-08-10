const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app/globals.css');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(
  /\.ind-grid \.tags \{[\s\S]*?margin-bottom: 16px;\r?\n\}/,
  `.ind-grid .tags {
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  z-index: 20;
}`
);

fs.writeFileSync(filePath, content);
console.log('Updated app/globals.css tags styling');
