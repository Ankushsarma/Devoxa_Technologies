const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'components/Particles.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// We need to add the visibilityRef logic inside the Particles component.
// Find the line with `const mouseRef = useRef({ x: 0, y: 0 });`
content = content.replace(
  'const mouseRef = useRef({ x: 0, y: 0 });',
  `const mouseRef = useRef({ x: 0, y: 0 });\n  const { isVisible } = useVisibility();\n  const visibilityRef = useRef(isVisible);\n  useEffect(() => { visibilityRef.current = isVisible; }, [isVisible]);`
);

fs.writeFileSync(filePath, content);
console.log('Fixed visibilityRef in Particles.jsx');
