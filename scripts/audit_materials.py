import re
import json

with open('src/data/materials.ts', 'r', encoding='utf-8') as f:
    mat_content = f.read()

# Find all material objects in the main materials array: export const materials: Material[] = [...]
# Look for: { name: "...", slug: "...", ... }
material_blocks = re.findall(r'\{\s*name:\s*"([^"]+)",\s*slug:\s*"([^"]+)"', mat_content)
print(f"Total top-level materials in materials.ts: {len(material_blocks)}")
for name, slug in material_blocks:
    print(f"  - Name: {name:25} | Slug: {slug}")
