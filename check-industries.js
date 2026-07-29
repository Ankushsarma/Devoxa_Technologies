const fs = require('fs');
const c = require('child_process').execSync('git show 5e4dab4:app/page.tsx').toString();
const lines = c.split('\n');
lines.forEach((l, i) => {
  if (l.toLowerCase().includes('industries')) {
    console.log(lines.slice(Math.max(0, i-25), i+25).join('\n'));
  }
});
