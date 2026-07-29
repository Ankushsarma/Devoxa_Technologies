const fs = require('fs');

let c = fs.readFileSync('app/page.tsx', 'utf8');

// 1. Remove unwanted imports
c = c.replace(/import LineWaves from ["'].*["']\s*\n/g, '');
c = c.replace(/import SpecularButton from ["'].*["']\s*\n/g, '');
c = c.replace(/import SideRays from ["'].*["']\s*\n/g, '');
c = c.replace(/import WebGLVisibilityWrapper from ["'].*["']\s*\n/g, '');

// 2. Remove unwanted components
c = c.replace(/<LineWaves[^>]*\/>/g, '');
c = c.replace(/<SideRays[^>]*\/>/g, '');

// 3. Remove SpecularButton entirely (it wraps the contact button)
// Let's replace the whole SpecularButton block with a standard button
c = c.replace(/<SpecularButton[^>]*>([\s\S]*?)<\/SpecularButton>/g, '$1');

// 4. Strip WebGLVisibilityWrapper tags but KEEP content
c = c.replace(/<WebGLVisibilityWrapper>/g, '');
c = c.replace(/<\/WebGLVisibilityWrapper>/g, '');

fs.writeFileSync('app/page.tsx', c);
console.log('Cleaned up page.tsx while keeping LightPillar and MagicRings!');
