const fs = require('fs');
const path = require('path');

const file = path.join(process.cwd(), 'app', 'page.tsx');
let content = fs.readFileSync(file, 'utf8');

// Remove import
content = content.replace(/import WebGLVisibilityWrapper from ['"]\.\/components\/WebGLVisibilityWrapper['"];?\r?\n/g, '');

// Remove wrapper open tags with optional props
content = content.replace(/<WebGLVisibilityWrapper[^>]*>/g, '');

// Remove wrapper close tags
content = content.replace(/<\/WebGLVisibilityWrapper>/g, '');

fs.writeFileSync(file, content, 'utf8');
console.log('Unwrapped all components in page.tsx');
