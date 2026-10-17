from catalog_products import products_db

materials_list = [
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
]

def classify_product(title, slug):
    t = title.lower()
    s = slug.lower()
    
    # Check specific alloy families first
    if 'hastelloy' in s or 'hastelloy' in t or 'c22' in s or 'c276' in s or 'c2000' in s:
        return 'hastelloy'
    if 'incoloy' in s or 'incoloy' in t or '800h' in s or '825' in s:
        return 'incoloy'
    if 'inconel' in s or 'inconel' in t or '600' in s or '601' in s or '625' in s or '718' in s or 'x-750' in s or 'x750' in s:
        return 'inconel'
    if 'monel' in s or 'monel' in t or 'k500' in s or '400' in s and ('monel' in t or 'monel' in s):
        return 'monel'
    if 'nimonic' in s or 'nimonic' in t or '80a' in s:
        return 'nimonic'
    if 'titanium' in s or 'titanium' in t:
        return 'titanium'
    if 'cu-ni' in s or 'copper-nickel' in s or 'copper nickel' in t or 'cupro' in s:
        return 'copper-nickel'
    if 'duplex' in s or 'duplex' in t or 's31803' in s or 's32205' in s or 's32750' in s or 's32760' in s or '2205' in s or '2507' in s:
        return 'duplex-steel'
    if 'nickel' in s or 'nickel' in t or 'alloy-20' in s or 'alloy-28' in s or '200' in s or '201' in s:
        return 'nickel-alloy'
    if 'stainless' in s or 'stainless' in t or 'ss-' in s or 'ss ' in t or '304' in s or '316' in s or '310' in s or '317' in s or '321' in s or '347' in s or '904' in s or '410' in s or '420' in s:
        return 'stainless-steel'
        
    return 'unclassified'

counts = {m[1]: 0 for m in materials_list}
counts['unclassified'] = 0

unclassified_list = []

for p in products_db:
    mat = classify_product(p['title'], p['slug'])
    counts[mat] += 1
    if mat == 'unclassified':
        unclassified_list.append(p)

print("\n--- CLASSIFICATION OF 309 PRODUCTS INTO 10 MATERIALS ---")
for mname, mslug in materials_list:
    print(f"  {mname:20} ({mslug:16}): {counts[mslug]:3} products")
print(f"  Unclassified products: {counts['unclassified']}")

if unclassified_list:
    print("\nSample Unclassified products:")
    for u in unclassified_list[:15]:
        print(f"   - {u['slug']} | {u['title'][:45]} | cat: {u['category']}")
