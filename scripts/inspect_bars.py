from PIL import Image, ImageOps
import numpy as np

# Load source bar images
# We have authentic stainless round bar photography:
# public/stock/stainless-steel-420-bars.jpg (1000x1000)
# public/stock/duplex-steel-s31803-round-bars.jpg (447x447)
# public/stock/incoloy-round-bars.jpg (447x447)
# public/stock/stainless-steel-304-round-bars.jpg (423x472)

im1 = Image.open('public/stock/stainless-steel-420-bars.jpg').convert('RGB')
print('im1:', im1.size)

im2 = Image.open('public/stock/duplex-steel-s31803-round-bars.jpg').convert('RGB')
print('im2:', im2.size)

im3 = Image.open('public/stock/stainless-steel-304-round-bars.jpg').convert('RGB')
print('im3:', im3.size)
