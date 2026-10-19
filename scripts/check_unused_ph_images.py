import os
import re

with open('src/data/productsMaterials.ts', 'r', encoding='utf-8') as f:
    pm_text = f.read()

with open('src/data/materials.ts', 'r', encoding='utf-8') as f:
    mat_text = f.read()

stock_files = os.listdir('public/stock')
print(f"Total files in public/stock: {len(stock_files)}")

# Check 17-4 and 15-5 related files specifically
ph_files = [f for f in stock_files if '17-4' in f or '15-5' in f or '5ph' in f]
print(f"\n17-4 and 15-5 stock files ({len(ph_files)}):")
for f in sorted(ph_files):
    in_pm = f in pm_text
    in_mat = f in mat_text
    print(f"  {f:45} | in_pm: {str(in_pm):5} | in_mat: {str(in_mat):5}")
