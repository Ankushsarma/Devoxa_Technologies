import sys

pages = [
    'app/dashboard/client/page.tsx',
    'app/dashboard/developer/page.tsx',
    'app/dashboard/manager/page.tsx'
]

for page in pages:
    with open(page, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if 'import { Chat } from "@/components/chat"' in content:
        content = content.replace('import { Chat } from "@/components/chat"', '// import { Chat } from "@/components/chat"')
        
    if '<Chat />' in content:
        content = content.replace('<Chat />', '{/* <Chat /> */}')
        
    with open(page, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f'Fixed {page}')
