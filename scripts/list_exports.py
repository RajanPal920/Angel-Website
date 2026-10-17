with open('src/data/materials.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if line.strip().startswith('export '):
        print(f"Line {i+1}: {line.strip()[:80]}")
