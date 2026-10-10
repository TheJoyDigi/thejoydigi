#!/usr/bin/env python3
"""Replace the hand-drawn rays: mode 'none' drops them; mode 'halo' puts N even coral rays on a cream ring so the outline stays a clean circle."""
import sys, pickle, math
import numpy as np
from PIL import Image, ImageDraw

P = pickle.load(open(sys.argv[1], "rb")); out, mode = sys.argv[2], sys.argv[3]
N = int(sys.argv[4]) if len(sys.argv) > 4 else 5
lab = P["lab"]; cx, cy = P["sun"]; H, W = lab.shape
main = max(P["comps"], key=lambda c: c["area"])
rays = [c for c in P["comps"] if c is not main and c["cy"] < cy]
for c in rays: lab[lab == c["n"]] = 0
P["comps"] = [c for c in P["comps"] if c not in rays]
ma = P["main_a"]; row = np.where(ma[int(cy)] > 128)[0]; R = (row.max() - row.min()) / 2
print(f"removed {len(rays)} rays, badge radius {R:.0f}")
if mode == "halo":
    CREAM, CORAL, BROWN = (255, 244, 218), (255, 111, 97), (107, 52, 16)
    RING = 74; SS = 4; Ro = R + RING
    img = Image.new("RGBA", (W * SS, H * SS), (0, 0, 0, 0)); d = ImageDraw.Draw(img)
    d.ellipse(((cx - Ro) * SS, (cy - Ro) * SS, (cx + Ro) * SS, (cy + Ro) * SS), fill=CREAM + (255,))
    span = 128 if N <= 5 else 150
    for k in range(N):
        a = math.radians(-90 - span / 2 + span * k / (N - 1)); r0, r1, w = R + 18, R + RING - 20, 22
        p0 = (cx + r0 * math.cos(a), cy + r0 * math.sin(a)); p1 = (cx + r1 * math.cos(a), cy + r1 * math.sin(a))
        d.line([(p0[0] * SS, p0[1] * SS), (p1[0] * SS, p1[1] * SS)], fill=CORAL + (255,), width=w * SS)
        for p in (p0, p1): d.ellipse(((p[0] - w / 2) * SS, (p[1] - w / 2) * SS, (p[0] + w / 2) * SS, (p[1] + w / 2) * SS), fill=CORAL + (255,))
    halo = np.array(img.resize((W, H), Image.LANCZOS)).astype(float)
    a_h = halo[..., 3] / 255; a_m = P["main_a"].astype(float) / 255
    rgb = P["main_rgb"].astype(float) * a_m[..., None] + halo[..., :3] * a_h[..., None] * (1 - a_m[..., None])
    a = a_m + a_h * (1 - a_m)
    P["main_rgb"] = np.where(a[..., None] > 0, rgb / np.maximum(a[..., None], 1e-6), 0).clip(0, 255).astype("uint8"); P["main_a"] = (a * 255).astype("uint8")
ys, xs = np.where(P["main_a"] > 5); main.update(bbox=(xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))
pickle.dump(P, open(out, "wb"))
