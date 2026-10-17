import re

with open('src/data/productsMaterials.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Map array name to canonical category
array_to_category = {
    'circles': 'circles/rings',
    'rings': 'circles/rings',
    'sheets': 'sheets/plate/coil',
    'coils': 'sheets/plate/coil',
    'flanges': 'flanges/forged-fittings',
    'forgedfitting': 'flanges/forged-fittings',
    'anchorChannel': 'angle-channels/flat-plate',
    'buttweldFitting': 'buttweld-fittings',
    'fasteners': 'fasteners',
    'perforatedsheet': 'perforated-sheet',
    'rodBars': 'round-bars',
    'pipes': 'pipes-tubes',
    'wireMesh': 'wire-mesh',
    'wires': 'wires'
}

# Find all arrays in productsMaterials.ts
array_positions = []
for arr_name in array_to_category.keys():
    pattern = rf'export const {arr_name}:\s*ProductMaterial\[\]\s*=\s*\['
    m = re.search(pattern, text)
    if m:
        array_positions.append((m.start(), arr_name))

# Sort by position
array_positions.sort()

# Also find end of arrays
products_db = []
for idx, (pos, arr_name) in enumerate(array_positions):
    end_pos = array_positions[idx+1][0] if idx + 1 < len(array_positions) else len(text)
    section = text[pos:end_pos]
    
    # In section, extract all products
    # Each product is an object { id: ..., slug: "...", title: "..." }
    prod_matches = re.finditer(r'id:\s*(\d+),[\s\S]*?slug:\s*"([^"]+)",[\s\S]*?title:\s*"([^"]+)"', section)
    count = 0
    for pm in prod_matches:
        pid = int(pm.group(1))
        pslug = pm.group(2)
        ptitle = pm.group(3)
        cat = array_to_category[arr_name]
        products_db.append({
            'id': pid,
            'slug': pslug,
            'title': ptitle,
            'array': arr_name,
            'category': cat,
            'url': f"/products/{cat}/{pslug}"
        })
        count += 1
    print(f"Array '{arr_name:18}' -> category '{array_to_category[arr_name]:25}' : {count:3} products")

print(f"\nTotal catalogued products: {len(products_db)}")
