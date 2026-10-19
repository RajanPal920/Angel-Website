from PIL import Image
import numpy as np

def make_white_bg(src_path, dst_path, target_size=(700, 700)):
    im = Image.open(src_path).convert('RGB')
    
    # Calculate aspect ratio
    src_w, src_h = im.size
    aspect = src_w / src_h
    
    # Target max dimension within 620 to leave clean white margin
    max_dim = 620
    if aspect > 1:
        new_w = max_dim
        new_h = int(max_dim / aspect)
    else:
        new_h = max_dim
        new_w = int(max_dim * aspect)
        
    im_resized = im.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    # Create pure white canvas
    canvas = Image.new('RGB', target_size, (255, 255, 255))
    
    # Paste centered
    paste_x = (target_size[0] - new_w) // 2
    paste_y = (target_size[1] - new_h) // 2
    canvas.paste(im_resized, (paste_x, paste_y))
    
    # If the corners of resized image aren't pure white, flood/blend edges to pure white
    arr = np.array(canvas)
    
    # Save high quality jpeg
    canvas.save(dst_path, 'JPEG', quality=95)
    print(f"Saved {dst_path} ({target_size})")

# 17-4 PH Bars: using stainless-steel-420-bars.jpg
make_white_bg('public/stock/stainless-steel-420-bars.jpg', 'public/stock/stainless-steel-17-4ph-bars.jpg')
make_white_bg('public/stock/stainless-steel-420-bars.jpg', 'public/stocks/stainless-steel-17-4ph-bars.jpg')
make_white_bg('public/stock/stainless-steel-420-bars.jpg', 'public/stock/ss-17-4ph-bars.jpg')
make_white_bg('public/stock/stainless-steel-420-bars.jpg', 'public/stocks/ss-17-4ph-bars.jpg')

# 15-5 PH Bars: using duplex-steel-s31803-round-bars.jpg (distinct precision machined stainless round bar)
make_white_bg('public/stock/duplex-steel-s31803-round-bars.jpg', 'public/stock/stainless-steel-15-5ph-bars.jpg')
make_white_bg('public/stock/duplex-steel-s31803-round-bars.jpg', 'public/stocks/stainless-steel-15-5ph-bars.jpg')
