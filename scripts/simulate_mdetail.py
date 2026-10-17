import sys
sys.path.append('scripts')
from catalog_products import products_db
import re

# Load productSlugRedirectMap
with open('src/data/productSlugMap.ts', 'r', encoding='utf-8') as f:
    slugmap_content = f.read()

slug_map_matches = re.findall(r'"([^"]+)":\s*\{\s*"categorySlug":\s*"([^"]+)",\s*"canonicalSlug":\s*"([^"]+)"\s*\}', slugmap_content)
slug_redirect_map = {k: {"categorySlug": cat, "canonicalSlug": can} for k, cat, can in slug_map_matches}

# Group products_db by category
categories_products = {}
for p in products_db:
    categories_products.setdefault(p['category'], []).append(p)

# Legacy category map in productIndex.ts
legacy_map = {
    "circles": "circles/rings",
    "rings": "circles/rings",
    "sheets-plates": "sheets/plate/coil",
    "sheets": "sheets/plate/coil",
    "plates": "sheets/plate/coil",
    "coils": "sheets/plate/coil",
    "flanges": "flanges/forged-fittings",
    "forged-fittings": "flanges/forged-fittings",
    "angle-channels": "angle-channels/flat-plate",
    "steel-pipes": "pipes-tubes",
    "steel-rods-bars": "round-bars",
    "steel-angles-channels": "angle-channels/flat-plate",
    "steel-plates-sheets": "sheets/plate/coil",
    "steel-coils": "sheets/plate/coil",
    "steel-flanges": "flanges/forged-fittings",
    "buttweld-steel-tubes": "buttweld-fittings",
    "industrial-fasteners": "fasteners",
    "stainless-steel-pipes": "pipes-tubes"
}

all_cat_map = dict(categories_products)
for leg_key, target_cat in legacy_map.items():
    all_cat_map[leg_key] = categories_products.get(target_cat, [])

# Valid detail pages: (category, slug)
valid_detail_pages = {(p['category'], p['slug']): p for p in products_db}

# Read materials from materials.ts
with open('src/data/materials.ts', 'r', encoding='utf-8') as f:
    mat_text = f.read()

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
    
    all_slugs = re.findall(r'"?slug"?:\s*"([^"]+)"', block)
    item_slugs = [s for s in all_slugs if s != mat_slug]
    materials_data.append({'name': name, 'slug': mat_slug, 'items': [{'slug': s} for s in item_slugs]})

print("\n=======================================================")
print("COMPREHENSIVE AUDIT OF ALL MATERIALS & PRODUCT LINKS")
print("=======================================================")

grand_total_products = 0
grand_total_broken = 0

for mat in materials_data:
    mat_name = mat['name']
    mat_slug = mat['slug']
    
    base_items = list(mat['items'])
    extra_items = []
    
    for cat_slug, cat_prods in categories_products.items():
        for p in cat_prods:
            pslug = p['slug'].lower()
            ptitle = p['title'].lower()
            mslug = mat_slug.lower()
            mname = mat_name.lower()
            
            # Exclusion logic as in MDetail.tsx
            matched = False
            if mslug in pslug or mname in ptitle or mname.replace(' ', '-') in pslug or mslug.replace('-', ' ') in ptitle:
                matched = True
            elif 'stainless-steel' in mslug and ('stainless' in pslug or 'ss-' in pslug or '304' in pslug or '316' in pslug or '310' in pslug or '317' in pslug or '321' in pslug or '347' in pslug or '904' in pslug or '410' in pslug or '420' in pslug or '422' in pslug or '15-5' in pslug or '17-4' in pslug):
                matched = True
            elif 'duplex' in mslug and not 'super-duplex' in mslug and ('duplex' in pslug or 's31803' in pslug or 's32205' in pslug):
                matched = True
            elif 'nickel-alloy' in mslug and ('nickel' in pslug or '200' in pslug or '201' in pslug):
                matched = True
            elif 'copper-nickel' in mslug and ('copper-nickel' in pslug or 'cu-ni' in pslug or 'cupro' in pslug or '90/10' in pslug or '70/30' in pslug or 'c70600' in pslug or 'c71500' in pslug):
                matched = True
            elif 'hastelloy' in mslug and ('hastelloy' in pslug or 'c22' in pslug or 'c276' in pslug or 'c2000' in pslug):
                matched = True
            elif 'inconel' in mslug and ('inconel' in pslug or '600' in pslug or '601' in pslug or '625' in pslug or '718' in pslug):
                matched = True
            elif 'incoloy' in mslug and ('incoloy' in pslug or '800' in pslug or '825' in pslug or '925' in pslug):
                matched = True
            elif 'monel' in mslug and ('monel' in pslug or '400' in pslug or 'k500' in pslug):
                matched = True
            elif 'titanium' in mslug and 'titanium' in pslug:
                matched = True
            elif 'nimonic' in mslug and 'nimonic' in pslug:
                matched = True
            
            if matched:
                extra_items.append({'slug': p['slug'], '__categorySlug': cat_slug})
                
    merged = base_items + extra_items
    
    # Validation step matching MDetail.tsx
    valid_products_list = []
    broken_products_list = []
    seen = set()
    
    for item in merged:
        raw_slug = item['slug'].strip().lower()
        mapped = slug_redirect_map.get(raw_slug)
        canon_slug = mapped['canonicalSlug'] if mapped else raw_slug
        canon_cat = mapped['categorySlug'] if mapped else item.get('__categorySlug', 'pipes-tubes')
        
        # Check against valid_detail_pages
        prod = valid_detail_pages.get((canon_cat, canon_slug))
        if not prod:
            # Check if exists in any category with canon_slug
            found_any = False
            for c, s in valid_detail_pages.keys():
                if s == canon_slug or s == raw_slug:
                    prod = valid_detail_pages[(c, s)]
                    canon_cat = c
                    canon_slug = s
                    found_any = True
                    break
                    
        if not prod:
            broken_products_list.append((raw_slug, f"/products/{canon_cat}/{canon_slug}"))
        else:
            if canon_slug not in seen:
                seen.add(canon_slug)
                valid_products_list.append(prod)
                
    grand_total_products += len(valid_products_list)
    grand_total_broken += len(broken_products_list)
    
    status = "PASS" if len(broken_products_list) == 0 and len(valid_products_list) > 0 else "FAIL"
    print(f"[{status}] Material: {mat_name:20} (slug: {mat_slug:18}) -> {len(valid_products_list):3} VALID products | {len(broken_products_list):2} BROKEN")
    for bslug, burl in broken_products_list:
        print(f"      [BROKEN LINK]: {bslug} -> {burl}")

print("=======================================================")
print(f"GRAND TOTAL: {grand_total_products} working product detail links across all materials.")
print(f"GRAND TOTAL BROKEN: {grand_total_broken}")
print("=======================================================\n")
