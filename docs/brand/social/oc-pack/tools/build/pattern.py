#!/usr/bin/env python3
"""Rebuild the pattern as a truly seamless tile from the stickers in Codex's pattern plate."""
import sys, random
from collections import deque, defaultdict
import numpy as np
from PIL import Image, ImageFilter

src = Image.open(sys.argv[1]).convert("RGB"); out = sys.argv[2]
a = np.array(src).astype(int); H, W, _ = a.shape
bgc = np.median(a.reshape(-1, 3), axis=0)
fg = np.abs(a - bgc).sum(2) > 45
fg = np.array(Image.fromarray((fg*255).astype("uint8")).filter(ImageFilter.MaxFilter(5))) > 0

lab = np.zeros((H, W), int); comps = []
for y in range(H):
    for x in range(W):
        if fg[y, x] and not lab[y, x]:
            n = len(comps) + 1; q = deque([(y, x)]); lab[y, x] = n; px = []
            while q:
                cy, cx = q.popleft(); px.append((cy, cx))
                for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):
                    ny, nx = cy+dy, cx+dx
                    if 0 <= ny < H and 0 <= nx < W and fg[ny, nx] and not lab[ny, nx]:
                        lab[ny, nx] = n; q.append((ny, nx))
            ys, xs = zip(*px); comps.append((n, min(ys), min(xs), max(ys)+1, max(xs)+1, len(px)))

areas = sorted(c[5] for c in comps); med = areas[len(areas)//2]
PAL = {"paw": (107,52,16), "sun": (254,187,85), "frond": (31,107,92), "wave": (46,156,166), "heart": (255,111,97)}
stickers = defaultdict(list)
for n, y0, x0, y1, x1, area in comps:
    if y0 < 3 or x0 < 3 or y1 > H-3 or x1 > W-3 or not (0.5*med < area < 2.2*med): continue
    m = (lab[y0:y1, x0:x1] == n); rgb = a[y0:y1, x0:x1][m]
    sat = rgb.max(1) - rgb.min(1); col = rgb[(sat > 60)]
    if len(col) < 20: continue
    def share(k): return (np.abs(rgb - np.array(PAL[k])).sum(1) < 70).mean()
    if share("frond") > 0.12: kind = "frond"
    elif share("wave") > 0.12: kind = "wave"
    elif share("sun") > 0.12: kind = "sun"
    elif share("heart") > 0.12: kind = "heart"
    else: kind = "paw"
    im = Image.fromarray(a[y0:y1, x0:x1].astype("uint8")).convert("RGBA")
    al = Image.fromarray((m*255).astype("uint8")).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.7))
    im.putalpha(al); stickers[kind].append(im)
print({k: len(v) for k, v in stickers.items()})

T = 1024; rows, cols = 7, 7; cw, ch = T/cols, T/rows
tile = Image.new("RGBA", (T, T), tuple(int(v) for v in bgc) + (255,))
order = [k for k in ["paw", "sun", "frond", "heart", "wave"] if stickers[k]]
rnd = random.Random(11)
for r in range(rows):
    for c in range(cols):
        kind = order[(c + 2*r) % len(order)]
        st = rnd.choice(stickers[kind]); s = (0.66 if kind != "wave" else 0.74) * cw / max(st.size)
        st = st.resize((round(st.width*s), round(st.height*s)), Image.LANCZOS).rotate(rnd.uniform(-10, 10), Image.BICUBIC, expand=True)
        cx = (c + 0.5 + (0.5 if r % 2 else 0)) * cw + rnd.uniform(-0.14, 0.14) * cw
        cy = (r + 0.5) * ch + rnd.uniform(-0.16, 0.16) * ch
        for ox in (-T, 0, T):
            for oy in (-T, 0, T):
                tile.alpha_composite(st, (int(cx - st.width/2 + ox) % (3*T) - T if False else int(cx - st.width/2 + ox), int(cy - st.height/2 + oy))) if -st.width < cx-st.width/2+ox < T and -st.height < cy-st.height/2+oy < T else None
tile.convert("RGB").save(out, quality=92, optimize=True, progressive=True)
