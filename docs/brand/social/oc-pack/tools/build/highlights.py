#!/usr/bin/env python3
"""Cut each icon off its cream plate and set it on an identical code-drawn disc, normalised to equal visual weight."""
import sys, pathlib, math
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

RAW, OUT = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
SUNSET, CREAM, BROWN = (0xFC, 0x7F, 0x46), (0xFF, 0xF4, 0xDA), (0x6B, 0x34, 0x10)
D, RING, SS = 900, 18, 4

def cut(p):
    im = Image.open(p).convert("RGB"); w, h = im.size; work = im.copy()
    for xy in [(0, 0), (w-1, 0), (0, h-1), (w-1, h-1)]: ImageDraw.floodfill(work, xy, (255, 0, 255), thresh=40)
    bg = (np.array(work) == [255, 0, 255]).all(2)
    al = Image.fromarray(np.where(bg, 0, 255).astype("uint8")).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.7))
    out = im.convert("RGBA"); out.putalpha(al); return out.crop(out.getbbox())

icons = {n: cut(RAW / f"hl-{n}.png") for n in ["episodes", "local", "beaches", "health", "training", "ask"]}
target = 0.47 * D
for n, ic in icons.items():
    area = (np.array(ic.getchannel("A")) > 127).sum()
    s = min(target / math.sqrt(area), 0.64 * D / max(ic.size))
    icons[n] = ic.resize((round(ic.width * s), round(ic.height * s)), Image.LANCZOS)

for n, ic in icons.items():
    big = Image.new("RGBA", (1080 * SS, 1920 * SS), SUNSET + (255,)); d = ImageDraw.Draw(big)
    cx, cy, r = 540 * SS, 960 * SS, D / 2 * SS
    sx, sy = 12 * SS, 14 * SS
    d.ellipse((cx - r + sx, cy - r + sy, cx + r + sx, cy + r + sy), fill=BROWN)
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=BROWN)
    d.ellipse((cx - r + RING * SS, cy - r + RING * SS, cx + r - RING * SS, cy + r - RING * SS), fill=CREAM)
    c = big.resize((1080, 1920), Image.LANCZOS)
    c.alpha_composite(ic, (540 - ic.width // 2, 960 - ic.height // 2))
    c.convert("RGB").save(OUT / f"oc-pack-highlight-{n}.jpg", quality=92, optimize=True, progressive=True)
    print(n, ic.size)
