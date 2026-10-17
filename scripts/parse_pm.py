import re

print("Reading productsMaterials.ts...")
with open('src/data/productsMaterials.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's find all array exports: export const <name>: ProductMaterial[] = [ ... ];
array_defs = re.findall(r'export const (\w+):\s*ProductMaterial\[\]\s*=\s*\[', text)
print(f"Exported arrays: {array_defs}")

# For each product, it has `slug: "..."` and `title: "..."` and `id: ...`
# Let's count how many `id: <num>,` exist
id_count = len(re.findall(r'id:\s*\d+,', text))
print(f"Total product id entries: {id_count}")

# Let's find all slugs in productsMaterials.ts
slugs_in_pm = set(re.findall(r'slug:\s*"([^"]+)"', text))
print(f"Unique slugs in productsMaterials.ts: {len(slugs_in_pm)}")
