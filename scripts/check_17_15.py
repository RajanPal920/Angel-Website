import sys
sys.path.append('scripts')
from catalog_products import products_db

print("=== 17-4 & 15-5 Products in products_db ===")
matches = [p for p in products_db if '17-4' in p['slug'] or '15-5' in p['slug']]
for p in matches:
    print(f"[{p['category']:25}] slug: {p['slug']} | title: {p['title']}")

print(f"Total: {len(matches)}")
