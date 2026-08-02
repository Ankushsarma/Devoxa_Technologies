const fs = require('fs');
const path = require('path');

const filePath = 'd:/devoxa/Devoxa_Technologies/components/HomePageDesktop.tsx';
let content = fs.readFileSync(filePath, 'utf8');
let originalContent = content;

// Remove Particles
content = content.replace(/<WebGLVisibilityWrapper isAbsolute=\{false\}>\s*<Particles[\s\S]*?<\/WebGLVisibilityWrapper>/g, '');
content = content.replace(/<Particles className="" particleCount=\{100\} particleColors=\{[^}]+\} \/>/g, '');

// Remove LightPillar
content = content.replace(/<WebGLVisibilityWrapper isAbsolute=\{false\}>\s*<LightPillar[\s\S]*?<\/WebGLVisibilityWrapper>/g, '');

// Remove MagicRings
content = content.replace(/<WebGLVisibilityWrapper isAbsolute=\{false\}>\s*<MagicRings[\s\S]*?<\/WebGLVisibilityWrapper>/g, '');

// Remove LiquidEther
content = content.replace(/<WebGLVisibilityWrapper isAbsolute=\{false\}>\s*<LiquidEther[\s\S]*?<\/WebGLVisibilityWrapper>/g, '');

// Remove LightRays
content = content.replace(/<WebGLVisibilityWrapper isAbsolute=\{false\}>\s*<LightRays[\s\S]*?<\/WebGLVisibilityWrapper>/g, '');

// Remove SideRays
content = content.replace(/<WebGLVisibilityWrapper isAbsolute=\{false\}>\s*<SideRays[\s\S]*?<\/WebGLVisibilityWrapper>/g, '');

// Replace SpecularButton
content = content.replace(/<WebGLVisibilityWrapper isAbsolute=\{false\}>\s*<SpecularButton[^>]*?>\s*([\s\S]*?)\s*<\/SpecularButton>\s*<\/WebGLVisibilityWrapper>/g, 
  '<button style={{ padding: "10px 24px", borderRadius: "8px", background: "#5B1FA0", color: "#fff", border: "none", cursor: "pointer", fontWeight: "bold" }} onClick={onOpenModal}>$1</button>');

// Replace TextType
content = content.replace(/<TextType[\s\S]*?\/>/g, 'Ready to Transform Your Business?');

// Remove imports but KEEP WebGLVisibilityWrapper because CircularGallery might use it?
// Wait, grep showed WebGLVisibilityWrapper wrapping Particles, LightPillar, MagicRings, LiquidEther, LightRays, SideRays, SpecularButton. 
// Did it wrap CircularGallery? 
// No. So we can safely remove WebGLVisibilityWrapper if there are no more matches.

content = content.replace(/import WebGLVisibilityWrapper from '@\/components\/WebGLVisibilityWrapper';\n/g, '');
content = content.replace(/import Particles from "@\/components\/Particles"\n/g, '');
content = content.replace(/import LightPillar from "@\/components\/LightPillar"\n/g, '');
content = content.replace(/import MagicRings from "@\/components\/MagicRings"\n/g, '');
content = content.replace(/import LiquidEther from "@\/components\/LiquidEther"\n/g, '');
content = content.replace(/import LightRays from "@\/components\/LightRays"\n/g, '');
content = content.replace(/import SideRays from "@\/components\/SideRays"\n/g, '');
content = content.replace(/import SpecularButton from "@\/components\/SpecularButton"\n/g, '');
content = content.replace(/import BorderGlow from "@\/components\/BorderGlow"\n/g, '');
content = content.replace(/import TextType from '@\/components\/TextType';\n/g, '');

// Clean up leftover empty <div style={{ position: 'absolute', ... }}> wrappers
content = content.replace(/<div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, [^}]* }}>\s*<\/div>/g, '');
content = content.replace(/<div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1[^}]*}}>\s*<\/div>/g, '');
content = content.replace(/<div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, opacity: [0-9.]+ }}>\s*<\/div>/g, '');
content = content.replace(/<div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>\s*<div[^>]*>\s*<\/div>\s*<\/div>/g, '');

if (content !== originalContent) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully removed React Bits from HomePageDesktop.tsx');
} else {
  console.log('No changes were made.');
}
