import re
from PIL import Image
import numpy as np
import os

with open('src/data/materials.ts', 'r', encoding='utf-8') as f:
    mat_text = f.read()

with open('src/data/productsMaterials.ts', 'r', encoding='utf-8') as f:
    pm_text = f.read()

products = [
    'stainless-steel-17-4ph-bars-rods',
    'stainless-steel-17-4ph-wires',
    'stainless-steel-17-4ph-flat-bars',
    'stainless-steel-17-4ph-sheets',
    'stainless-steel-17-4ph-plates',
    'stainless-steel-17-4ph-circles',
    'stainless-steel-17-4ph-forged-rings',
    'stainless-steel-15-5ph-bars-rods',
    'stainless-steel-15-5ph-wires',
    'stainless-steel-15-5ph-flat-bars',
    'stainless-steel-15-5ph-sheets',
    'stainless-steel-15-5ph-plates',
    'stainless-steel-15-5ph-circles',
    'stainless-steel-15-5ph-forged-rings'
]

print("=== Image checks in materials.ts and productsMaterials.ts ===")
for slug in products:
    m_mat = re.search(rf'slug:\s*"{slug}"[\s\S]*?image:\s*"([^"]+)"', mat_text)
    mat_img = m_mat.group(1) if m_mat else 'NOT FOUND'
    
    # In productsMaterials.ts, find by slug or oldSlug
    m_pm = re.search(rf'slug:\s*"{slug}[^"]*"[\s\S]*?image:\s*"([^"]+)"', pm_text)
    if not m_pm:
        m_pm = re.search(rf'image:\s*"([^"]+)"[\s\S]*?slug:\s*"{slug}[^"]*"', pm_text)
    pm_img = m_pm.group(1) if m_pm else 'NOT FOUND'
    
    # Check if files exist on disk
    def check_file(rel_path):
        if not rel_path or rel_path == 'NOT FOUND':
            return 'MISSING'
        p = os.path.join('public', rel_path.lstrip('/'))
        if not os.path.exists(p):
            return f'NOT_ON_DISK ({p})'
        try:
            im = Image.open(p).convert('RGB')
            arr = np.array(im)
            corners = [arr[0,0], arr[0,-1], arr[-1,0], arr[-1,-1]]
            avg_corner = np.mean(corners, axis=0)
            is_white = np.all(avg_corner >= 250)
            return f"OK (size={im.size}, corners={avg_corner.round(1).tolist()}, white={is_white})"
        except Exception as e:
            return f"CORRUPTED: {e}"

    print(f"\nProduct: {slug}")
    print(f"  materials.ts: {mat_img} -> {check_file(mat_img)}")
    print(f"  pm.ts       : {pm_img} -> {check_file(pm_img)}")
