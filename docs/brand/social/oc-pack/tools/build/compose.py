#!/usr/bin/env python3
"""Compose logo, horizontal lockup and avatar from the master logo's own art, with a regenerated die-cut border."""
import sys, pickle, math, pathlib
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

P = pickle.load(open(sys.argv[1], "rb")); OUT = pathlib.Path(sys.argv[2])
rgb, lab = P["rgb"], P["lab"]
main_c = max(P["comps"], key=lambda c: c["area"])
CREAM, BROWN = (255, 244, 218), (107, 52, 16)
BORDER, SHADOW = 22, (14, 16)
cut = P["sun"][1] if "sun" in P else main_c["bbox"][3] - 40
mascot = [c for c in P["comps"] if c is main_c or c["cy"] < cut]
words = [c for c in P["comps"] if c is not main_c and c["cy"] >= cut]

def group(comps):
    x0 = min(c["bbox"][0] for c in comps); y0 = min(c["bbox"][1] for c in comps)
    x1 = max(c["bbox"][2] for c in comps); y1 = max(c["bbox"][3] for c in comps)
    m = np.isin(lab[y0:y1, x0:x1], [c["n"] for c in comps if not ("main_a" in P and c is main_c)])
    im = Image.fromarray(rgb[y0:y1, x0:x1]).convert("RGBA")
    im.putalpha(Image.fromarray((m * 255).astype("uint8")))
    if "main_a" in P and any(c is main_c for c in comps):
        base = Image.fromarray(P["main_rgb"][y0:y1, x0:x1]).convert("RGBA"); base.putalpha(Image.fromarray(P["main_a"][y0:y1, x0:x1]))
        base.alpha_composite(im); im = base
    return im

def dilate(alpha, r):
    a = np.array(alpha) > 127; out = a.copy(); H, W = a.shape
    for k, rr in ((k, rr) for rr in (r, r * 0.75, r * 0.5, r * 0.25) for k in range(64)):
        t = 2 * math.pi * k / 64; dx, dy = round(rr * math.cos(t)), round(rr * math.sin(t))
        s = np.zeros_like(a)
        s[max(dy, 0):H + min(dy, 0), max(dx, 0):W + min(dx, 0)] = a[max(-dy, 0):H + min(-dy, 0), max(-dx, 0):W + min(-dx, 0)]
        out |= s
    return Image.fromarray((out * 255).astype("uint8")).filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.GaussianBlur(0.9))

def sticker(layers, size):
    """layers: [(RGBA image, (x, y))] on a transparent canvas, then cream border + hard brown shadow behind."""
    art = Image.new("RGBA", size, (0, 0, 0, 0))
    for im, xy in layers: art.alpha_composite(im, xy)
    border = dilate(art.getchannel("A"), BORDER)
    out = Image.new("RGBA", size, (0, 0, 0, 0))
    sh = Image.new("RGBA", size, BROWN + (255,)); sh.putalpha(border)
    out.alpha_composite(sh, SHADOW)
    cr = Image.new("RGBA", size, CREAM + (255,)); cr.putalpha(border)
    out.alpha_composite(cr); out.alpha_composite(art)
    return out.crop(out.getbbox())

M = group(mascot); Wd = group(words)
mx0 = min(c["bbox"][0] for c in mascot); my0 = min(c["bbox"][1] for c in mascot)
wx0 = min(c["bbox"][0] for c in words); wy0 = min(c["bbox"][1] for c in words)
pad = 60

# Primary logo: the original arrangement, clean border
logo = sticker([(M, (mx0, my0)), (Wd, (wx0, wy0))], (1254 + pad, 1254 + pad))
c = Image.new("RGBA", (max(logo.size) + 2 * pad,) * 2, (0, 0, 0, 0)); c.alpha_composite(logo, ((c.width - logo.width) // 2, (c.height - logo.height) // 2))
c.save(OUT / "logo.png"); print("logo", c.size)

# Horizontal lockup: mascot block left, the same stacked wordmark right
s = 1.12; Ws = Wd.resize((round(Wd.width * s), round(Wd.height * s)), Image.LANCZOS)
gap = 44; Wx = pad + M.width + gap; Wy = pad + round(M.height * 0.60 - Ws.height / 2)
size = (Wx + Ws.width + pad, pad * 2 + max(M.height, Wy - pad + Ws.height))
lock = sticker([(M, (pad, pad)), (Ws, (Wx, Wy))], size)
lock.save(OUT / "lockup.png"); print("lockup", lock.size)

# Mascot sticker alone (for avatar and future use)
mark = sticker([(M, (pad, pad))], (M.width + 2 * pad, M.height + 2 * pad)); mark.save(OUT / "mark.png"); print("mark", mark.size)

# Avatar: largest mark that stays inside a 94%-diameter safe circle; rays radiate from the mark's sun
A = 2160; ma = np.array(mark.getchannel("A")) > 20; ys, xs = np.where(ma)
best = None
for k in np.arange(0.5, 2.5, 0.01):
    for oy in np.arange(-0.15, 0.15, 0.005):
        px = (xs - mark.width / 2) * k; py = (ys - mark.height / 2) * k + oy * A
        if (np.hypot(px, py).max() <= 0.47 * A): best = (k, oy)
    if best is None or best[0] < k - 0.011: break
k = best[0] * 0.9; px = (xs - mark.width / 2) * k
oy = max(o for o in np.arange(-0.2, 0.2, 0.002) if np.hypot(px, (ys - mark.height / 2) * k + o * A).max() <= 0.47 * A)
if "main_a" in P:  # round badge: centre it, sized to sit inside the circle crop with an even margin
    k = 0.78 * A / max(mark.width, mark.height); oy = 0.0
print("avatar scale", round(k, 3), "offset", round(oy, 3))
mk = mark.resize((round(mark.width * k), round(mark.height * k)), Image.LANCZOS)
ox, oyp = round(A / 2 - mk.width / 2), round(A / 2 - mk.height / 2 + oy * A)
sx, sy = P["sun"] if "sun" in P else ((main_c["bbox"][0] + main_c["bbox"][2]) / 2, main_c["bbox"][3] - 0.30 * (main_c["bbox"][3] - main_c["bbox"][1]))
sun_cx = ox + (pad + sx - mx0) * k; sun_cy = oyp + (pad + sy - my0) * k
av = Image.new("RGB", (A, A), (0xFC, 0x7F, 0x46)); d = ImageDraw.Draw(av); R = A * 2; n = 28
for j in range(0, n, 2):
    t0, t1 = 2 * math.pi * j / n, 2 * math.pi * (j + 1) / n
    d.polygon([(sun_cx, sun_cy), (sun_cx + R * math.cos(t0), sun_cy + R * math.sin(t0)), (sun_cx + R * math.cos(t1), sun_cy + R * math.sin(t1))], fill=(0xFF, 0x6F, 0x61))
if "main_a" not in P:
    sea_top = oyp + mk.height * 0.80
    def wave(y0, amp, period, phase):
        return [(x, y0 + amp * math.sin(2 * math.pi * x / period + phase)) for x in range(-10, A + 11, 6)]
    top = wave(sea_top, 22, A / 2.5, 0.6)
    d.polygon(top + [(A + 10, A + 10), (-10, A + 10)], fill=(0x2E, 0x9C, 0xA6))
    d.line(top, fill=(0x6B, 0x34, 0x10), width=16, joint="curve")
    for yy, ph, x0, x1 in [(sea_top + 250, 1.9, 0.16, 0.46), (sea_top + 250, 1.9, 0.58, 0.80), (sea_top + 370, 0.4, 0.32, 0.66)]:
        d.line([pt for pt in wave(yy, 14, A / 3.2, ph) if x0 * A < pt[0] < x1 * A], fill=(0x7C, 0xC8, 0xC8), width=24, joint="curve")
av = av.convert("RGBA"); av.alpha_composite(mk, (ox, oyp))
av.convert("RGB").resize((1080, 1080), Image.LANCZOS).save(OUT / "avatar.png"); print("avatar ok")
