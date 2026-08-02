import sys
import os

filepath = 'components/LightPillar.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()
    
if 'CanvasVisibilityWrapper' not in content:
    out_lines = []
    lines = content.split('\n')
    inserted_import = False
    for line in lines:
        out_lines.append(line)
        if 'use client' in line and not inserted_import:
            out_lines.append('import CanvasVisibilityWrapper from "@/components/CanvasVisibilityWrapper";')
            inserted_import = True
            
    content = '\n'.join(out_lines)
    
    content = content.replace(
        'export default function LightPillar',
        'function LightPillarInner'
    )
    content += '\n\nexport default function LightPillar(props: any) {\n  return (\n    <CanvasVisibilityWrapper>\n      <LightPillarInner {...props} />\n    </CanvasVisibilityWrapper>\n  );\n}\n'
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print('Wrapped LightPillar.tsx')
