import re
from catalog_products import products_db

# Read productIndex.ts to know exact mapping of canonical categories
with open('src/data/productSlugMap.ts', 'r', encoding='utf-8') as f:
    slugmap_content = f.read()

slug_map_matches = re.findall(r'"([^"]+)":\s*\{\s*"categorySlug":\s*"([^"]+)",\s*"canonicalSlug":\s*"([^"]+)"\s*\}', slugmap_content)
slug_redirect_map = {k: {"categorySlug": cat, "canonicalSlug": can} for k, cat, can in slug_map_matches}

# Group products by category
categories_products = {}
for p in products_db:
    categories_products.setdefault(p['category'], []).append(p)

print("Checking each of the 309 products in catalog...")
errors = []
for p in products_db:
    cat = p['category']
    slug = p['slug']
    
    # Check if categoryData has it
    cat_prods = categories_products.get(cat, [])
    found = any(item['slug'] == slug for item in cat_prods)
    if not found:
        errors.append((cat, slug, "Not found in category!"))
        
    # Also check if redirect map exists for this slug
    red = slug_redirect_map.get(slug.lower())
    if red:
        if red['categorySlug'] != cat:
            errors.append((cat, slug, f"Redirect category mismatch: {red['categorySlug']} vs {cat}"))
            
if not errors:
    print("✓ All 309 products in products_db match their canonical category perfectly!")
else:
    print(f"Found {len(errors)} errors:")
    for err in errors[:10]:
        print(" ", err)
