with open('src/data/materials.ts', 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Find each material block inside `const materials: Material[] = [`
# Material block starts with:
# name: "..."
# slug: "..."
mat_starts = [m.start() for m in re.finditer(r'name:\s*"([^"]+)",\s*slug:\s*"([^"]+)"', text)]
print("Material start indices count:", len(mat_starts))

for idx in mat_starts:
    snippet = text[idx:idx+400]
    name_m = re.search(r'name:\s*"([^"]+)"', snippet)
    slug_m = re.search(r'slug:\s*"([^"]+)"', snippet)
    name = name_m.group(1) if name_m else 'unknown'
    slug = slug_m.group(1) if slug_m else 'unknown'
    
    # Let's count items in this material
    # From this idx to next idx
    next_indices = [i for i in mat_starts if i > idx]
    end_idx = next_indices[0] if next_indices else len(text)
    block = text[idx:end_idx]
    
    # Find all items slugs: slug: "..."
    item_slugs = re.findall(r'slug:\s*"([^"]+)"', block)
    # The first slug is the material itself
    product_slugs = item_slugs[1:]
    print(f"Material: {name:25} | slug: {slug:20} | items count: {len(product_slugs)}")
    if len(product_slugs) > 0:
        print("   sample items:", product_slugs[:3])
