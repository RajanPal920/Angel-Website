import os
import pymupdf

logo_path = 'public/Dimensions/angel-metal-logo.png'
src_dir = 'public/Dimensions_backup'
dst_dir = 'public/Dimensions'
previews_dir = 'previews_branded'

os.makedirs(previews_dir, exist_ok=True)

# List of files and specific top styling rules
# Categories:
# 1. Standard tables (pipes, flanges, buttweld, forged, patta-patti, plates, sheet)
standard_tables = [
    'dimensions-pipes.pdf',
    'dimensions-flanges.pdf',
    'dimensions-buttweld-fittings.pdf',
    'dimensions-forged-fittings.pdf',
    'dimensions-patta-patti.pdf',
    'dimensions-plates.pdf',
    'dimensions-sheet.pdf'
]

pdf_files = sorted([f for f in os.listdir(src_dir) if f.endswith('.pdf')])

for filename in pdf_files:
    src_path = os.path.join(src_dir, filename)
    dst_path = os.path.join(dst_dir, filename)
    doc = pymupdf.open(src_path)
    page_count = len(doc)
    
    print(f"Processing {filename} ({page_count} pages)...")
    
    for pno in range(page_count):
        page = doc[pno]
        w = page.rect.width
        h = page.rect.height
        
        if filename in standard_tables:
            # Cover old logo at top-left
            page.draw_rect(pymupdf.Rect(0, 0, 360, 130), color=(1, 1, 1), fill=(1, 1, 1))
            # Insert Angel Metal India logo
            page.insert_image(pymupdf.Rect(22, 10, 142, 125), filename=logo_path, keep_proportion=True)
            
        elif filename == 'dimensions-angle-channels.pdf':
            # Cover top banner area above title
            page.draw_rect(pymupdf.Rect(0, 0, 595, 115), color=(1, 1, 1), fill=(1, 1, 1))
            page.insert_image(pymupdf.Rect(25, 10, 135, 110), filename=logo_path, keep_proportion=True)
            
        elif filename == 'dimensions-fasteners.pdf':
            # Cover top left area next to factory image
            page.draw_rect(pymupdf.Rect(0, 0, 310, 115), color=(1, 1, 1), fill=(1, 1, 1))
            page.insert_image(pymupdf.Rect(22, 10, 125, 110), filename=logo_path, keep_proportion=True)
            
        elif filename == 'dimensions-round-bars.pdf':
            # Cover old header with vendor details
            page.draw_rect(pymupdf.Rect(0, 0, w, 85), color=(1, 1, 1), fill=(1, 1, 1))
            page.insert_image(pymupdf.Rect(25, 8, 105, 80), filename=logo_path, keep_proportion=True)
            # Cover bottom vendor url
            page.draw_rect(pymupdf.Rect(0, h - 35, w, h), color=(1, 1, 1), fill=(1, 1, 1))
            
        elif filename == 'dimensions-tubes.pdf':
            # Cover old header with vendor details
            page.draw_rect(pymupdf.Rect(0, 0, w, 80), color=(1, 1, 1), fill=(1, 1, 1))
            page.insert_image(pymupdf.Rect(25, 8, 105, 78), filename=logo_path, keep_proportion=True)
            # Cover bottom vendor url
            page.draw_rect(pymupdf.Rect(0, h - 35, w, h), color=(1, 1, 1), fill=(1, 1, 1))
            
        elif filename == 'dimensions-coils.pdf':
            # Top left area beside Duracoil title
            page.draw_rect(pymupdf.Rect(0, 0, 285, 90), color=(1, 1, 1), fill=(1, 1, 1))
            page.insert_image(pymupdf.Rect(35, 10, 115, 85), filename=logo_path, keep_proportion=True)
            # Cover bottom vendor address
            page.draw_rect(pymupdf.Rect(25, h - 70, 220, h - 20), color=(1, 1, 1), fill=(1, 1, 1))
            
        elif filename == 'dimensions-wire.pdf':
            # Top whitespace above orange table header
            page.insert_image(pymupdf.Rect(35, 15, 145, 125), filename=logo_path, keep_proportion=True)
            
        else:
            # Fallback for any other file
            page.insert_image(pymupdf.Rect(25, 10, 130, 110), filename=logo_path, keep_proportion=True)
            
    # Save modified PDF
    doc.save(dst_path)
    
    # Save preview of page 0 for inspection
    pix = doc[0].get_pixmap(dpi=120)
    pix.save(os.path.join(previews_dir, f"{filename}.png"))
    doc.close()
    print(f"[OK] Saved {filename} and preview.")

print("All 13 dimensions PDFs successfully branded with Angel Metal India logo!")
