import re
import json

# Read productsMaterials.ts and productIndex.ts to get all products and categories
# Or let's parse productsMaterials.ts
with open('src/data/productSlugMap.ts', 'r', encoding='utf-8') as f:
    slugmap_content = f.read()

# Extract productSlugRedirectMap
slug_map_matches = re.findall(r'"([^"]+)":\s*\{\s*"categorySlug":\s*"([^"]+)",\s*"canonicalSlug":\s*"([^"]+)"\s*\}', slugmap_content)
slug_redirect_map = {k: {"categorySlug": cat, "canonicalSlug": can} for k, cat, can in slug_map_matches}
print(f"Total entries in productSlugRedirectMap: {len(slug_redirect_map)}")

# Read productIndex.ts
with open('src/data/productIndex.ts', 'r', encoding='utf-8') as f:
    pindex_content = f.read()

# Let's inspect productsMaterials.ts to get all products: id, title, slug, category
with open('src/data/productsMaterials.ts', 'r', encoding='utf-8') as f:
    pm_content = f.read()

# In productsMaterials.ts, find all product objects
# Each has title, slug (or oldSlug)
products = []
# Find blocks with id, title, slug
prod_matches = re.finditer(r'title:\s*"([^"]+)",\s*slug:\s*"([^"]+)"', pm_content)
for m in prod_matches:
    products.append({"title": m.group(1), "slug": m.group(2)})

print(f"Total products found in productsMaterials.ts: {len(products)}")

# Also read materials.ts
with open('src/data/materials.ts', 'r', encoding='utf-8') as f:
    mat_content = f.read()

# Find top materials
top_mat_matches = re.finditer(r'\{\s*name:\s*"([^"]+)",\s*slug:\s*"([^"]+)"(?:[^\}]*?items:\s*buildItemsWithImages\(\[([\s\S]*?)\]\))?', mat_content)
materials_data = []
for m in top_mat_matches:
    name = m.group(1)
    slug = m.group(2)
    items_raw = m.group(3) if m.group(3) else ""
    items = []
    if items_raw:
        item_matches = re.findall(r'title:\s*"([^"]+)",\s*slug:\s*"([^"]+)"', items_raw)
        for it_title, it_slug in item_matches:
            items.append({"title": it_title, "slug": it_slug})
    materials_data.append({"name": name, "slug": slug, "items": items})

print(f"\n--- AUDIT OF MATERIALS IN materials.ts ---")
for mat in materials_data:
    print(f"\nMaterial: {mat['name']} (slug: {mat['slug']}) - Embedded items: {len(mat['items'])}")
    for it in mat['items']:
        # Check if item.slug exists in slug_redirect_map
        raw_slug = it['slug'].strip().lower()
        mapped = slug_redirect_map.get(raw_slug)
        if mapped:
            print(f"   ✓ Item: {it['title']} -> /products/{mapped['categorySlug']}/{mapped['canonicalSlug']}")
        else:
            print(f"   ✗ Item: {it['title']} (slug: {it['slug']}) NOT FOUND in slug_redirect_map!")
