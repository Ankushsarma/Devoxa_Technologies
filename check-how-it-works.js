const fs = require('fs');
const c = require('child_process').execSync('git show HEAD:app/page.tsx').toString();
const lines = c.split('\n');
lines.forEach((l, i) => {
  if (l.includes('id="how-it-works"')) {
    console.log(lines.slice(i, i+15).join('\n'));
  }
});
