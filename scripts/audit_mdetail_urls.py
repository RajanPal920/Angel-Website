import re
from catalog_products import products_db

# Load all 309 products
# Create lookup: (category, slug) -> product
category_slug_map = {}
for p in products_db:
    key = (p['category'].lower(), p['slug'].lower())
    category_slug_map[key] = p
    # Also without category
    category_slug_map[p['slug'].lower()] = p

print(f"Total valid products in catalog: {len(products_db)}")

# Read productSlugMap.ts
with open('src/data/productSlugMap.ts', 'r', encoding='utf-8') as f:
    slugmap_content = f.read()

slug_map_matches = re.findall(r'"([^"]+)":\s*\{\s*"categorySlug":\s*"([^"]+)",\s*"canonicalSlug":\s*"([^"]+)"\s*\}', slugmap_content)
slug_redirect_map = {k: {"categorySlug": cat, "canonicalSlug": can} for k, cat, can in slug_map_matches}

# Read materials.ts to get all materials and their items
with open('src/data/materials.ts', 'r', encoding='utf-8') as f:
    mat_text = f.read()

# Parse materials
mat_starts = [m.start() for m in re.finditer(r'name:\s*"([^"]+)",\s*slug:\s*"([^"]+)"', mat_text)]
materials_data = []

for idx in mat_starts:
    snippet = mat_text[idx:idx+400]
    name_m = re.search(r'name:\s*"([^"]+)"', snippet)
    slug_m = re.search(r'slug:\s*"([^"]+)"', snippet)
    name = name_m.group(1) if name_m else 'unknown'
    mat_slug = slug_m.group(1) if slug_m else 'unknown'
    
    next_indices = [i for i in mat_starts if i > idx]
    end_idx = next_indices[0] if next_indices else len(mat_text)
    block = mat_text[idx:end_idx]
    
    # Extract item objects { slug: "...", title: "..." }
    item_matches = re.findall(r'slug:\s*"([^"]+)",[\s\S]*?title:\s*"([^"]+)"', block)
    # Filter out material itself if captured
    items = []
    for islug, ititle in item_matches:
        if islug != mat_slug:
            items.append({'slug': islug, 'title': ititle})
    materials_data.append({'name': name, 'slug': mat_slug, 'items': items})

# Helper function mimicking getCategoryForMaterialProduct from MDetail.tsx
product_type_map = {
    "pipes": "pipes-tubes",
    "tubes": "pipes-tubes",
    "flanges": "flanges/forged-fittings",
    "fasteners": "fasteners",
    "pipe-fittings": "buttweld-fittings",
    "forged-fittings": "flanges/forged-fittings",
    "round-bars": "round-bars",
    "round-bar": "round-bars",
    "bars": "round-bars",
    "bar": "round-bars",
    "rods": "round-bars",
    "rod": "round-bars",
    "sheets": "sheets/plate/coil",
    "sheet": "sheets/plate/coil",
    "plates": "sheets/plate/coil",
    "plate": "sheets/plate/coil",
    "wires": "wires",
    "wire": "wires",
    "coils": "sheets/plate/coil",
    "coil": "sheets/plate/coil",
}

def get_category_for_product(pslug):
    for key, cat in product_type_map.items():
        if key in pslug:
            return cat
    return "pipes-tubes"

print("\n=======================================================")
print("CHECKING ALL EMBEDDED ITEMS IN materials.ts FOR 404s")
print("=======================================================")

for mat in materials_data:
    print(f"\nChecking Material: {mat['name']} ({mat['slug']}) - Embedded items: {len(mat['items'])}")
    broken = []
    working = []
    for it in mat['items']:
        raw_slug = it['slug'].strip().lower()
        mapped = slug_redirect_map.get(raw_slug)
        if mapped:
            prod_slug = mapped['canonicalSlug']
            cat_slug = mapped['categorySlug']
        else:
            prod_slug = raw_slug
            cat_slug = get_category_for_product(prod_slug)
            
        # Does this product exist in our catalog?
        # Check by slug
        found = False
        if prod_slug in category_slug_map:
            found = True
        elif raw_slug in category_slug_map:
            found = True
            
        if found:
            working.append((it['title'], f"/products/{cat_slug}/{prod_slug}"))
        else:
            broken.append((it['title'], it['slug'], f"/products/{cat_slug}/{prod_slug}"))
            
    print(f"  Working items: {len(working)}")
    print(f"  BROKEN items (results in 'Material Not Found'): {len(broken)}")
    for b_title, b_slug, b_url in broken:
        print(f"     [BROKEN] {b_title} (slug: {b_slug}) -> URL: {b_url}")
