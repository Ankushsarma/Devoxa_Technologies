const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function replaceInFile(filePath) {
  if (!filePath.match(/\.(ts|tsx|js|jsx)$/)) return;
  if (filePath.includes('node_modules') || filePath.includes('.next')) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  content = content.replace(/BYI \| Beyond Your Imagination/g, 'Devoxa Technologies');
  content = content.replace(/BYI — Beyond Your Imagination/g, 'Devoxa Technologies');
  content = content.replace(/Beyond Your Imagination/g, 'Devoxa Technologies');
  content = content.replace(/BYI Technology/g, 'Devoxa Technologies');
  content = content.replace(/BYI Team/g, 'Devoxa Team');
  content = content.replace(/BYI Logo/g, 'Devoxa Logo');
  content = content.replace(/hello@byi\.agency/g, 'hello@devoxa.tech');
  content = content.replace(/legal@byi\.agency/g, 'legal@devoxa.tech');
  content = content.replace(/john@byi\.agency/g, 'john@devoxa.tech');
  content = content.replace(/byi\.agency/g, 'devoxa.tech');
  content = content.replace(/BYI Developer Chat/g, 'Devoxa Developer Chat');
  content = content.replace(/BYI Pitch Deck/g, 'Devoxa Pitch Deck');
  content = content.replace(/\bBYI\b(?!\-)/g, 'Devoxa');

  // Replace logo.jpeg with logo.png, and remove invert classes if present since the new logo is dark
  content = content.replace(/\/logo\.jpeg/g, '/logo.png');
  content = content.replace(/type: 'image\/jpeg'/g, "type: 'image/png'");

  // The mix-blend-screen brightness-200 invert classes will mess up the new logo, so remove them and add white bg
  content = content.replace(/mix-blend-screen brightness-200 invert/g, 'bg-white p-1');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated ' + filePath);
  }
}

walkDir('./app', replaceInFile);
walkDir('./components', replaceInFile);
walkDir('./lib', replaceInFile);
