import re
from catalog_products import products_db

# Set of valid product slugs from productsMaterials.ts
valid_product_slugs = {p['slug']: p for p in products_db}

# Read slug redirect map
with open('src/data/productSlugMap.ts', 'r', encoding='utf-8') as f:
    slugmap_content = f.read()

slug_map_matches = re.findall(r'"([^"]+)":\s*\{\s*"categorySlug":\s*"([^"]+)",\s*"canonicalSlug":\s*"([^"]+)"\s*\}', slugmap_content)
slug_redirect_map = {k: {"categorySlug": cat, "canonicalSlug": can} for k, cat, can in slug_map_matches}

# Read materials.ts
with open('src/data/materials.ts', 'r', encoding='utf-8') as f:
    mat_text = f.read()

# Find all material blocks
mat_starts = [m.start() for m in re.finditer(r'name:\s*"([^"]+)",\s*slug:\s*"([^"]+)"', mat_text)]

for idx in mat_starts:
    snippet = mat_text[idx:idx+400]
    name_m = re.search(r'name:\s*"([^"]+)"', snippet)
    slug_m = re.search(r'slug:\s*"([^"]+)"', snippet)
    name = name_m.group(1) if name_m else 'unknown'
    mat_slug = slug_m.group(1) if slug_m else 'unknown'
    
    next_indices = [i for i in mat_starts if i > idx]
    end_idx = next_indices[0] if next_indices else len(mat_text)
    block = mat_text[idx:end_idx]
    
    item_slugs = re.findall(r'slug:\s*"([^"]+)"', block)[1:] # skip material itself
    
    print(f"\n==========================================")
    print(f"MATERIAL: {name} (slug: {mat_slug}) - Total items in array: {len(item_slugs)}")
    print(f"==========================================")
    
    valid_count = 0
    invalid_count = 0
    
    for islug in item_slugs:
        # Check if islug is directly in valid_product_slugs
        p_direct = valid_product_slugs.get(islug)
        # Check if islug is in slug_redirect_map
        redirect = slug_redirect_map.get(islug.lower())
        
        target_canonical = redirect['canonicalSlug'] if redirect else islug
        target_category = redirect['categorySlug'] if redirect else None
        
        # Check if target_canonical is in valid_product_slugs
        p_canonical = valid_product_slugs.get(target_canonical)
        
        if p_direct or p_canonical:
            p = p_direct or p_canonical
            valid_count += 1
            # print(f"  ✓ {islug} -> Found in category: {p['category']}")
        else:
            invalid_count += 1
            print(f"  [X] BROKEN ITEM: '{islug}' -> DOES NOT EXIST IN ANY PRODUCT CATEGORY!")
            
    print(f"Summary for {name}: {valid_count} VALID products, {invalid_count} BROKEN items.")
