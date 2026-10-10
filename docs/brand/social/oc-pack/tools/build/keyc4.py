#!/usr/bin/env python3
"""Cut the OC Monogram logo family off its green screen and build the avatar."""
import sys, math
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
SRC, OUT = sys.argv[1], sys.argv[2]
def key(p):
    im = Image.open(p).convert("RGB"); a = np.array(im).astype(int)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    green = (g - np.maximum(r, b))                        # >0 on screen, <=0 on art
    al = np.clip(1 - (green - 25) / 70, 0, 1)             # soft edge band
    al = np.array(Image.fromarray((al * 255).astype("uint8")).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.6))).astype(float) / 255
    a[..., 1] = np.minimum(g, np.maximum(r, b) + 8)       # despill
    out = Image.fromarray(a.clip(0, 255).astype("uint8")).convert("RGBA"); out.putalpha(Image.fromarray((al * 255).astype("uint8")))
    out = out.crop(out.getbbox()); pad = 40
    c = Image.new("RGBA", (out.width + 2 * pad, out.height + 2 * pad), (0, 0, 0, 0)); c.alpha_composite(out, (pad, pad)); return c
logo = key(f"{SRC}/primary-b.png"); logo.save(f"{OUT}/logo.png")
mark = key(f"{SRC}/mark.png"); mark.save(f"{OUT}/mark.png")
key(f"{SRC}/lockup-b.png").save(f"{OUT}/lockup.png")
A = 2160; av = Image.new("RGB", (A, A), (0x2E, 0x9C, 0xA6)); d = ImageDraw.Draw(av); n = 28; R = A * 2
for j in range(0, n, 2):
    t0, t1 = 2 * math.pi * j / n, 2 * math.pi * (j + 1) / n
    d.polygon([(A / 2, A / 2), (A / 2 + R * math.cos(t0), A / 2 + R * math.sin(t0)), (A / 2 + R * math.cos(t1), A / 2 + R * math.sin(t1))], fill=(0x7C, 0xC8, 0xC8))
ma = np.array(mark.getchannel("A")) > 20; ys, xs = np.where(ma)
k = 0.47 * A / np.hypot(xs - mark.width / 2, ys - mark.height / 2).max()
m = mark.resize((round(mark.width * k), round(mark.height * k)), Image.LANCZOS)
av = av.convert("RGBA"); av.alpha_composite(m, ((A - m.width) // 2, (A - m.height) // 2))
av.convert("RGB").resize((1080, 1080), Image.LANCZOS).save(f"{OUT}/avatar.png")
print("logo", logo.size, "mark", mark.size, "avatar scale", round(k, 3))
