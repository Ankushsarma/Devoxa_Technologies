const fs = require('fs');
const c = fs.readFileSync('app/page.tsx', 'utf8');
const lines = c.split('\n');
lines.forEach((l, i) => {
  if (l.includes('id="industries"')) {
    for (let j = i; j < i + 10; j++) {
      console.log(j + 1, lines[j]);
    }
  }
});
