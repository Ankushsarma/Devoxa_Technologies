const fs = require('fs');
const c = fs.readFileSync('app/page.tsx', 'utf8');
const index = c.indexOf('id="how-it-works"');
console.log(c.slice(index, index + 500));
