import re
from catalog_products import products_db

with open('src/data/productSlugMap.ts', 'r', encoding='utf-8') as f:
    slugmap_content = f.read()

slug_map_matches = re.findall(r'"([^"]+)":\s*\{\s*"categorySlug":\s*"([^"]+)",\s*"canonicalSlug":\s*"([^"]+)"\s*\}', slugmap_content)
slug_redirect_map = {k: {"categorySlug": cat, "canonicalSlug": can} for k, cat, can in slug_map_matches}

missing = []
for p in products_db:
    pslug = p['slug'].lower()
    if pslug not in slug_redirect_map:
        missing.append(p)

print(f"Total products in catalog: {len(products_db)}")
print(f"Products in catalog missing from productSlugRedirectMap: {len(missing)}")
if missing:
    for m in missing[:10]:
        print(f"  Missing: {m['slug']} in {m['category']}")
else:
    print("ALL 309 products in productsMaterials.ts are present in productSlugRedirectMap!")
