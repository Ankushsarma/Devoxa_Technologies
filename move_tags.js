const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'components/HomePageDesktop.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const regex = /(<Image[^>]+fill\s*\/>\s*)<div className="overlay">(\s*<div className="title">[^<]+<\/div>\s*<div className="desc">[^<]+<\/div>\s*)(<div className="tags">[\s\S]*?<\/div>)/g;

const newContent = content.replace(regex, (match, image, titleDesc, tags) => {
  return image + tags + '\n              <div className="overlay">' + titleDesc;
});

if (content !== newContent) {
  fs.writeFileSync(filePath, newContent);
  console.log('Successfully updated tags position in HomePageDesktop.tsx');
} else {
  console.log('No matches found. Regex might be wrong.');
}
