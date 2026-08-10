const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app/globals.css');
let content = fs.readFileSync(filePath, 'utf8');

// The original tag CSS has:
/*
.ind-grid .tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 11px;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 999px;
  
}
*/

content = content.replace(
  /\.ind-grid \.tag \{[\s\S]*?font-weight: 500;\s*padding: 6px 12px;\s*border-radius: 999px;\s*\}/,
  `.ind-grid .tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 13px;
  font-weight: 800;
  padding: 6px 0;
  border-radius: 999px;
  text-shadow: 0px 2px 6px rgba(0, 0, 0, 0.9), 0px 1px 3px rgba(0, 0, 0, 0.7);
  letter-spacing: 0.5px;
}`
);

fs.writeFileSync(filePath, content);
console.log('Updated app/globals.css tag typography and shadow');
