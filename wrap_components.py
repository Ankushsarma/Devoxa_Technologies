import sys
import os

components = [
    'Particles.jsx',
    'LiquidEther.jsx',
    'MagicRings.jsx',
    'LineWaves.jsx',
    'Lightfall.jsx',
    'LightRays.jsx',
    'DarkVeil.jsx',
    'CircularGallery.jsx',
    'SpecularButton.jsx',
    'SideRays.jsx',
    'BorderGlow.jsx'
]

for comp in components:
    filepath = os.path.join('components', comp)
    if not os.path.exists(filepath):
        continue
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if 'CanvasVisibilityWrapper' in content:
        continue
        
    # We need to find the export default
    # Options: 
    # 1. export default function Name(
    # 2. const Name = ( ... export default Name;
    
    comp_name = comp.replace('.jsx', '')
    
    out_lines = []
    lines = content.split('\n')
    
    # Put import at top after "use client" if exists
    inserted_import = False
    for line in lines:
        out_lines.append(line)
        if 'use client' in line and not inserted_import:
            out_lines.append('import CanvasVisibilityWrapper from "@/components/CanvasVisibilityWrapper";')
            inserted_import = True
            
    if not inserted_import:
        out_lines.insert(0, 'import CanvasVisibilityWrapper from "@/components/CanvasVisibilityWrapper";')
        
    content = '\n'.join(out_lines)
    
    # Replace the actual export
    if f'export default function {comp_name}' in content:
        content = content.replace(
            f'export default function {comp_name}',
            f'function {comp_name}Inner'
        )
        content += f'\n\nexport default function {comp_name}(props) {{\n  return (\n    <CanvasVisibilityWrapper>\n      <{comp_name}Inner {{...props}} />\n    </CanvasVisibilityWrapper>\n  );\n}}\n'
    elif f'export default {comp_name}' in content:
        content = content.replace(
            f'export default {comp_name}',
            f'// export default {comp_name}'
        )
        content += f'\n\nexport default function {comp_name}Wrapper(props) {{\n  return (\n    <CanvasVisibilityWrapper>\n      <{comp_name} {{...props}} />\n    </CanvasVisibilityWrapper>\n  );\n}}\n'
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Wrapped {comp}')
