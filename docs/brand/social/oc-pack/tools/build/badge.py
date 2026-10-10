#!/usr/bin/env python3
"""Close the sun into a full circle badge: water fills the circle below a clean wave; pets and wordmark untouched."""
import sys, pickle, math
from collections import deque
import numpy as np
from PIL import Image, ImageDraw

P = pickle.load(open(sys.argv[1], "rb")); out = sys.argv[2]
lab, rgb = P["lab"], P["rgb"].astype(int); H, W = lab.shape
main = max(P["comps"], key=lambda c: c["area"]); m = lab == main["n"]
BROWN, TEAL, LAGOON, GOLD = (107, 52, 16), (46, 156, 166), (124, 200, 200), (254, 187, 73)

# sun circle from the outer edge of its brown outline (upper half only)
gold = m & (np.abs(rgb - GOLD).sum(2) < 50)
pts = []
for x in range(W):
    ys = np.where(gold[:, x])[0]
    if len(ys) and ys.min() < 600: pts.append((x, ys.min()))
for y in range(250, 640, 4):
    xs = np.where(gold[y])[0]
    if len(xs): pts += [(xs.min(), y), (xs.max(), y)]
pts = np.array(pts, float); A = np.c_[2 * pts[:, 0], 2 * pts[:, 1], np.ones(len(pts))]
cx, cy, c = np.linalg.lstsq(A, (pts ** 2).sum(1), rcond=None)[0]; r_in = math.sqrt(c + cx ** 2 + cy ** 2)
OUT = 14; R = r_in + OUT
print(f"sun centre ({cx:.0f},{cy:.0f}) inner r {r_in:.0f}")

# old wave top (teal connected to the bottom rows), used so the new water fully covers it
teal = m & ((np.abs(rgb - TEAL).sum(2) < 90) | (np.abs(rgb - LAGOON).sum(2) < 90))
wave = np.zeros_like(teal); q = deque()
for x in range(W):
    ys = np.where(teal[:, x])[0]
    if len(ys) and ys.max() > 840: wave[ys.max(), x] = True; q.append((ys.max(), x))
while q:
    y, x = q.popleft()
    for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        ny, nx = y + dy, x + dx
        if 0 <= ny < H and 0 <= nx < W and teal[ny, nx] and not wave[ny, nx] and ny > 760: wave[ny, nx] = True; q.append((ny, nx))
inside = lambda x: abs(x - cx) < r_in - 4
cols = [x for x in np.where(wave.any(0))[0] if inside(x)]
xs = np.array(cols); ot = np.array([np.where(wave[:, x])[0].min() - OUT for x in cols], float)

best = None
for per in range(240, 440, 4):
    for ph in np.linspace(0, 2 * math.pi, 48, endpoint=False):
        s = np.sin(2 * math.pi * xs / per + ph); M = np.c_[np.ones_like(s), s]
        coef = np.linalg.lstsq(M, ot, rcond=None)[0]; res = ((M @ coef - ot) ** 2).sum()
        if coef[1] > 0 and (best is None or res < best[0]): best = (res, per, ph, coef)
_, PER, PH, (BASE, AMP) = best; AMP = float(np.clip(AMP, 12, 18))
f = lambda x: BASE + AMP * np.sin(2 * math.pi * np.asarray(x, float) / PER + PH)
lift = max(0.0, float((f(xs) - ot).max())); top = lambda x: f(x) - lift
print(f"wave per={PER} amp={AMP:.1f} lift={lift:.1f} top~{BASE - lift:.0f}")

SS = 4; img = Image.new("RGBA", (W * SS, H * SS), (0, 0, 0, 0)); d = ImageDraw.Draw(img)
def circ(rr): return ((cx - rr) * SS, (cy - rr) * SS, (cx + rr) * SS, (cy + rr) * SS)
xr = np.linspace(cx - R - 2, cx + R + 2, 600)
mask = Image.new("L", img.size, 0); md = ImageDraw.Draw(mask)
md.polygon([(x * SS, top(x) * SS) for x in xr] + [((cx + R + 2) * SS, (cy + R + 4) * SS), ((cx - R - 2) * SS, (cy + R + 4) * SS)], fill=255)
water = Image.new("RGBA", img.size, (0, 0, 0, 0)); wd = ImageDraw.Draw(water)
wd.ellipse(circ(R), fill=BROWN + (255,)); wd.ellipse(circ(r_in), fill=TEAL + (255,))
def stroke(draw, fy, x0, x1, width, col, caps=True):
    """Constant-width stroke along y=fy(x), drawn as one polygon (Pillow's wide polylines leave slivers)."""
    xs_ = np.linspace(x0, x1, 400); ys_ = fy(xs_); dy = np.gradient(ys_, xs_); n = np.hypot(1, dy)
    nx_, ny_ = -dy / n * width / 2, 1 / n * width / 2
    up = [((x - a) * SS, (y - b) * SS) for x, y, a, b in zip(xs_, ys_, nx_, ny_)]
    dn = [((x + a) * SS, (y + b) * SS) for x, y, a, b in zip(xs_, ys_, nx_, ny_)][::-1]
    draw.polygon(up + dn, fill=col + (255,))
    if caps:
        for x, y in ((xs_[0], ys_[0]), (xs_[-1], ys_[-1])): draw.ellipse(((x - width / 2) * SS, (y - width / 2) * SS, (x + width / 2) * SS, (y + width / 2) * SS), fill=col + (255,))
def wline(y0, x0, x1, amp, width, col, ph=0.0):
    stroke(wd, lambda x: y0 + amp * np.sin(2 * math.pi * x / PER + PH + ph), x0, x1, width, col)
T0 = BASE - lift
wline(T0 + OUT + 14, cx - R, cx + R, AMP, 20, LAGOON)                      # lit band right under the crest
wline(T0 + 100, cx - 0.62 * r_in, cx - 0.08 * r_in, AMP * 0.6, 14, LAGOON, 0.6)
wline(T0 + 100, cx + 0.18 * r_in, cx + 0.58 * r_in, AMP * 0.6, 14, LAGOON, 0.6)
wline(T0 + 170, cx - 0.32 * r_in, cx + 0.30 * r_in, AMP * 0.5, 14, LAGOON, 1.4)
ring = Image.new("L", img.size, 0); ImageDraw.Draw(ring).ellipse(circ(R), fill=255); ImageDraw.Draw(ring).ellipse(circ(r_in), fill=0)
wd.bitmap((0, 0), ring, fill=BROWN + (255,))
img.paste(water, (0, 0), mask)
stroke(d, top, cx - R, cx + R, OUT, BROWN, caps=False)
clip = Image.new("L", img.size, 0); ImageDraw.Draw(clip).ellipse(circ(R), fill=255)
img.putalpha(Image.fromarray(np.minimum(np.array(img.getchannel("A")), np.array(clip))))
img = img.resize((W, H), Image.LANCZOS); wat = np.array(img).astype(float); al = wat[..., 3] / 255

yy, xx = np.mgrid[0:H, 0:W]; dist = np.hypot(xx - cx, yy - cy)
keep = m & ~((yy > top(np.clip(xx, cx - R, cx + R)) + 2) | (dist > R + 1))      # mascot pixels above the water, inside the badge
keep |= m & (dist > R + 1) & (yy < cy)                                            # nothing of the mascot sits outside the circle above centre except none; kept for safety
# old wave left 1-2px brown hairs just above the new line; remove thin dark strokes in that band, keep real outlines
tt = top(np.clip(xx, cx - R, cx + R))
band = keep & (yy > tt - 18) & (yy < tt + 2)
dark = (rgb[..., 0] < 170) & (rgb[..., 1] < 120)
wide = np.zeros_like(dark)
for dx in (-3, -2, 2, 3): wide |= np.roll(dark, dx, axis=1)
hair = band & dark & ~(np.roll(dark, 3, 1) & np.roll(dark, -3, 1)) & ~(np.roll(dark, 2, 1) | np.roll(dark, -2, 1))
rgb = rgb.copy()
for y, x in zip(*np.where(hair)):
    row = rgb[y, max(0, x - 6):x + 7]; ok = ~dark[y, max(0, x - 6):x + 7]
    if ok.any(): rgb[y, x] = np.median(row[ok], axis=0)
print("hair px removed", int(hair.sum()))
main_a = np.maximum(keep.astype(float), al)
main_rgb = np.where(keep[..., None], rgb, 0).astype(float)
main_rgb = (wat[..., :3] * al[..., None] + main_rgb * (1 - al[..., None]))
main_rgb = np.where(main_a[..., None] > 0, main_rgb / np.maximum(main_a[..., None], 1e-6) * np.where(keep[..., None], 1, 1), 0)
ys2, xs2 = np.where(main_a > 0.02)
main.update(bbox=(xs2.min(), ys2.min(), xs2.max() + 1, ys2.max() + 1), cy=float(cy), cx=float(cx))
# drop leftover scraps of the old wave that were split off below it (the paw print beside PACK is kept)
scraps = [c for c in P["comps"] if c is not main and c["area"] < 2000 and c["cy"] > cy and c["bbox"][2] < cx + 0.95 * r_in]
for c in scraps: lab[lab == c["n"]] = 0
P["comps"] = [c for c in P["comps"] if c not in scraps]; print("dropped scraps", [c["n"] for c in scraps])
P.update(main_rgb=main_rgb.clip(0, 255).astype("uint8"), main_a=(main_a * 255).astype("uint8"), sun=(cx, cy))
pickle.dump(P, open(out, "wb"))
