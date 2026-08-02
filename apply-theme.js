const fs = require('fs');
const path = require('path');

const targetDirs = ['app', 'components'];

function processDirectory(directory) {
  fs.readdirSync(directory).forEach(file => {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // 1. Base Backgrounds & Global Gradients
      content = content.replace(/bg-\[#050506\]/g, 'bg-[#0D0417]');
      content = content.replace(/bg-\[#0c0817\]\/[0-9]+/g, 'bg-[#2B0F45]');
      content = content.replace(/bg-\[#0c0817\]/g, 'bg-[#2B0F45]');
      content = content.replace(/bg-\[#080514\]/g, 'bg-[#0D0417]');
      content = content.replace(/bg-\[#0d0d11\]/g, 'bg-[#0D0417]');
      
      content = content.replace(/from-\[#0e0a1f\]/g, 'from-[#0D0417]');
      content = content.replace(/via-\[#080514\]/g, 'via-[#230C38]');
      content = content.replace(/to-\[#050506\]/g, 'to-[#0D0417]');

      content = content.replace(/from-\[#0D0417\] via-\[#230C38\] to-\[#0D0417\]/g, 'from-[#0D0417] via-[#230C38] to-[#0D0417]');

      // 2. Map standard tailwind colors to palette
      // Primary Accent: #7B1FA2
      content = content.replace(/bg-purple-500\/[0-9]+/g, 'bg-[#7B1FA2]');
      content = content.replace(/bg-purple-600\/[0-9]+/g, 'bg-[#7B1FA2]');
      content = content.replace(/bg-purple-900\/[0-9]+/g, 'bg-[#230C38]');
      content = content.replace(/bg-purple-950\/[0-9]+/g, 'bg-[#230C38]');
      content = content.replace(/bg-purple-[456]00/g, 'bg-[#7B1FA2]');
      content = content.replace(/from-violet-[56]00/g, 'from-[#7B1FA2]');
      content = content.replace(/via-purple-[56]00/g, 'via-[#3A1656]');
      content = content.replace(/to-fuchsia-[56]00/g, 'to-[#7B1FA2]');
      content = content.replace(/from-purple-950\/[0-9]+/g, 'from-[#230C38]');
      content = content.replace(/via-indigo-950\/[0-9]+/g, 'via-[#230C38]');
      content = content.replace(/to-indigo-950\/[0-9]+/g, 'to-[#230C38]');
      
      // Secondary Accent: #A94FE0
      content = content.replace(/text-purple-300/g, 'text-[#A94FE0]');
      content = content.replace(/text-purple-400/g, 'text-[#A94FE0]');
      content = content.replace(/text-fuchsia-300/g, 'text-[#A94FE0]');
      content = content.replace(/text-indigo-300/g, 'text-[#A94FE0]');
      content = content.replace(/text-violet-300/g, 'text-[#A94FE0]');
      content = content.replace(/text-purple-500/g, 'text-[#A94FE0]');
      
      content = content.replace(/border-purple-500\/30/g, 'border-[#A94FE0]/30');
      content = content.replace(/border-purple-500\/40/g, 'border-[#A94FE0]/40');
      content = content.replace(/border-purple-400\/30/g, 'border-[#A94FE0]/30');
      content = content.replace(/border-purple-400\/40/g, 'border-[#A94FE0]/40');
      content = content.replace(/border-purple-500/g, 'border-[#A94FE0]');
      content = content.replace(/hover:border-purple-500\/[0-9]+/g, 'hover:border-[#A94FE0]/40');
      content = content.replace(/border-white\/10/g, 'border-[#A94FE0]/15');
      content = content.replace(/border-white\/15/g, 'border-[#A94FE0]/15');
      
      // Cards and Glassmorphism
      content = content.replace(/bg-white\/5/g, 'bg-[#2B0F45]/80');
      
      // Glows and Shadows
      content = content.replace(/shadow-\[0_[0-9]+px_[0-9]+px_rgba\([^)]+\)\]/g, 'shadow-[0_0_40px_rgba(169,79,224,0.15)]');
      
      // Text
      content = content.replace(/text-gray-200/g, 'text-[#EAD9F7]');
      content = content.replace(/text-gray-300/g, 'text-[#EAD9F7]/70');
      content = content.replace(/text-gray-400/g, 'text-[#EAD9F7]/60');
      content = content.replace(/text-gray-500/g, 'text-[#EAD9F7]/50');
      content = content.replace(/text-white/g, 'text-[#EAD9F7]');
      
      // Gradient text highlight
      content = content.replace(/bg-gradient-to-r from-purple-400 via-[a-z]+-[0-9]+ to-[a-z]+-[0-9]+/g, 'bg-gradient-to-r from-[#EAD9F7] to-[#A94FE0]');
      content = content.replace(/from-purple-400 via-fuchsia-300 to-purple-400/g, 'from-[#EAD9F7] to-[#A94FE0]');
      content = content.replace(/from-purple-[234]00 via-[a-z]+-[0-9]+ to-[a-z]+-[0-9]+/g, 'from-[#EAD9F7] to-[#A94FE0]');
      
      fs.writeFileSync(fullPath, content);
    }
  });
}

targetDirs.forEach(dir => processDirectory(path.join(__dirname, dir)));
console.log("Colors successfully replaced!");
