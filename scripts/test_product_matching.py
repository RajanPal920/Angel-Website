import re
from catalog_products import products_db

# Load all products from catalog_products
# In MDetail.tsx:
# It takes baseItems = material.items || []
# AND iterates over all products in productCategoryMap, checking:
# 1) belongsToOtherMaterial
# 2) belongsToThisMaterial

# Let's inspect all 309 products and test MDetail's exact matching logic!

with open('src/pages/MDetail.tsx', 'r', encoding='utf-8') as f:
    mdetail_content = f.read()

# Let's check which products in products_db match each material!
materials_to_check = [
    ("Stainless Steel", "stainless-steel"),
    ("Duplex Steel", "duplex-steel"),
    ("Nickel Alloy", "nickel-alloy"),
    ("Copper Nickel", "copper-nickel"),
    ("Hastelloy", "hastelloy"),
    ("Incoloy", "incoloy"),
    ("Inconel", "inconel"),
    ("Monel", "monel"),
    ("Titanium", "titanium"),
    ("Nimonic", "nimonic"),
    ("Other Materials", "other-materials"),
]

for mat_name, mat_slug in materials_to_check:
    matched = []
    for p in products_db:
        pslug = p['slug'].lower()
        ptitle = p['title'].lower()
        mslug = mat_slug.lower()
        mname = mat_name.lower()
        
        # Check matching
        is_match = False
        if mslug in pslug or mname in ptitle:
            is_match = True
        elif mat_slug == 'titanium' and ('titanium' in pslug or 'titanium' in ptitle):
            is_match = True
        elif mat_slug == 'monel' and ('monel' in pslug or 'monel' in ptitle):
            is_match = True
        elif mat_slug == 'nimonic' and ('nimonic' in pslug or 'nimonic' in ptitle):
            is_match = True
        elif mat_slug == 'hastelloy' and ('hastelloy' in pslug or 'hastelloy' in ptitle):
            is_match = True
        elif mat_slug == 'incoloy' and ('incoloy' in pslug or 'incoloy' in ptitle):
            is_match = True
        elif mat_slug == 'inconel' and ('inconel' in pslug or 'inconel' in ptitle):
            is_match = True
        elif mat_slug == 'copper-nickel' and ('cu-ni' in pslug or 'copper-nickel' in pslug or 'copper' in ptitle and 'nickel' in ptitle):
            is_match = True
            
        if is_match:
            matched.append(p)
            
    print(f"Material: {mat_name:20} (slug: {mat_slug:16}) -> Matches {len(matched):2} real products in products_db")
    if len(matched) > 0:
        print(f"   Sample products: {[p['title'][:35] for p in matched[:3]]}")
