from catalog_products import products_db

broken_slugs = [
    'stainless-steel-321-sheets-plates',
    'stainless-steel-flanges',
    'stainless-steel-316-316l-forgings',
    'stainless-steel-410-forgings',
    'duplex-steel-pipe-fittings',
    'super-duplex-steel-pipe-fittings',
    'nickel-flanges',
    'nickel-pipe-fittings',
    'nickel-copper-alloy-forged-fittings',
    'hastelloy-forged-fittings',
    'hastelloy-pipe-fittings',
    'incoloy-forged-fittings',
    'inconel-forged-fittings'
]

print("Searching if alternative or exact real products exist in productsMaterials.ts:")
for bs in broken_slugs:
    print(f"\nTarget: {bs}")
    # Search products_db for matches
    matches = []
    terms = [t for t in bs.split('-') if len(t) > 2]
    for p in products_db:
        pslug = p['slug'].lower()
        # count matching terms
        matched_terms = [t for t in terms if t in pslug]
        if len(matched_terms) >= len(terms) - 1:
            matches.append(p)
    if matches:
        print(f"  Possible matches ({len(matches)}):")
        for m in matches[:3]:
            print(f"    - {m['slug']} ({m['title'][:40]}) in {m['category']}")
    else:
        print("  No close match found in productsMaterials.ts")
