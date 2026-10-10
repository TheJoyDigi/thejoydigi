#!/usr/bin/env python3
"""Story/Reel cover: Codex float sticker keyed off green, placed on flat code-drawn pool water inside the safe zones."""
import sys, math, random
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

src, out = sys.argv[1], sys.argv[2]
LAGOON, TEAL, CREAM, BROWN = (0x7C, 0xC8, 0xC8), (0x2E, 0x9C, 0xA6), (0xFF, 0xF4, 0xDA), (0x6B, 0x34, 0x10)
im = Image.open(src).convert("RGB"); w, h = im.size; work = im.copy()
for xy in [(0, 0), (w-1, 0), (0, h-1), (w-1, h-1)]: ImageDraw.floodfill(work, xy, (255, 0, 255), thresh=90)
bg = (np.array(work) == [255, 0, 255]).all(2)
a = np.array(im).astype(int); a[..., 1] = np.minimum(a[..., 1], np.maximum(a[..., 0], a[..., 2]) + 10)
fl = Image.fromarray(a.clip(0, 255).astype("uint8")).convert("RGBA")
fl.putalpha(Image.fromarray(np.where(bg, 0, 255).astype("uint8")).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.8)))
fl = fl.crop(fl.getbbox())

SS = 2; W, H = 1080 * SS, 1920 * SS
c = Image.new("RGB", (W, H), LAGOON); d = ImageDraw.Draw(c); rnd = random.Random(5)
def wavy(x0, y0, length, amp, period, width, col):
    pts = [(x0 + t, y0 + amp * math.sin(2 * math.pi * t / period)) for t in range(0, length, 6)]
    d.line(pts, fill=col, width=width, joint="curve")
    for p in (pts[0], pts[-1]): d.ellipse((p[0] - width / 2, p[1] - width / 2, p[0] + width / 2, p[1] + width / 2), fill=col)
fw = int(0.72 * W); fh = int(fw * 0.785); cx, cy = W // 2, int(0.655 * H)
keep_out = (cx - fw * 0.66, cy - fh * 0.62, cx + fw * 0.66, cy + fh * 0.75)
for r, y in enumerate(np.arange(0.06, 0.97, 0.075) * H):
    for x in ((0.08, 0.56) if r % 2 == 0 else (0.30,)):
        x0 = (x + rnd.uniform(-0.04, 0.04)) * W; L = int(0.26 * W)
        if not (x0 + L < keep_out[0] or x0 > keep_out[2] or y < keep_out[1] or y > keep_out[3]): continue
        wavy(x0, y + rnd.uniform(-0.01, 0.01) * H, L, 12 * SS, 150 * SS, 9 * SS, CREAM)
fl = fl.resize((fw, int(fl.height * fw / fl.width)), Image.LANCZOS)
for k, r in enumerate([1.10, 1.22]):
    rx, ry = fw / 2 * r, fl.height / 2 * r * 0.62
    d.ellipse((cx - rx, cy + fl.height * 0.18 - ry, cx + rx, cy + fl.height * 0.18 + ry), outline=TEAL, width=(14 - 4 * k) * SS)
c = c.convert("RGBA"); c.alpha_composite(fl, (cx - fl.width // 2, cy - fl.height // 2))
c = c.convert("RGB").resize((1080, 1920), Image.LANCZOS); c.save(out, quality=92, optimize=True, progressive=True)
bx = (cx - fl.width // 2) // SS, (cy - fl.height // 2) // SS
print("float box", bx, (bx[0] + fl.width // SS, bx[1] + fl.height // SS))
