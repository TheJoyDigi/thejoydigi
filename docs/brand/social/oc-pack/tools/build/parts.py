#!/usr/bin/env python3
"""Split the master logo into art components (border/shadow stripped) so every lockup reuses the exact same drawings."""
import sys, pickle
from collections import deque
import numpy as np
from PIL import Image, ImageDraw

src = Image.open(sys.argv[1]).convert("RGB"); a = np.array(src).astype(int); H, W, _ = a.shape
def near(c, t): return np.abs(a - np.array(c)).sum(2) < t
work = src.copy()
for xy in [(0, 0), (W-1, 0), (0, H-1), (W-1, H-1)]: ImageDraw.floodfill(work, xy, (255, 0, 255), thresh=22)
bg = (np.array(work) == [255, 0, 255]).all(2)
brown = near((107, 52, 16), 110); creamish = near((255, 244, 218), 70) & ~brown

def grow(seed, allowed):
    out = seed.copy(); q = deque(zip(*np.where(seed)))
    while q:
        y, x = q.popleft()
        for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):
            ny, nx = y+dy, x+dx
            if 0 <= ny < H and 0 <= nx < W and allowed[ny, nx] and not out[ny, nx]:
                out[ny, nx] = True; q.append((ny, nx))
    return out

def touching(m):
    t = np.zeros_like(m); t[1:] |= m[:-1]; t[:-1] |= m[1:]; t[:, 1:] |= m[:, :-1]; t[:, :-1] |= m[:, 1:]; return t

fringe = ~bg & ~brown & ~creamish
outer = grow(bg, fringe)                                  # antialias between sand and sticker
shadow = grow(touching(outer) & brown & ~outer, brown)    # hard shadow: brown touching the outside
border = grow(touching(outer | shadow) & creamish, creamish)
art = ~(outer | shadow | border)

# label art components
lab = np.zeros((H, W), int); comps = []
for y in range(H):
    for x in range(W):
        if art[y, x] and not lab[y, x]:
            n = len(comps)+1; seed = np.zeros((H, W), bool); seed[y, x] = True
            q = deque([(y, x)]); lab[y, x] = n; ys = []; xs = []
            while q:
                cy, cx = q.popleft(); ys.append(cy); xs.append(cx)
                for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):
                    ny, nx = cy+dy, cx+dx
                    if 0 <= ny < H and 0 <= nx < W and art[ny, nx] and not lab[ny, nx]:
                        lab[ny, nx] = n; q.append((ny, nx))
            comps.append(dict(n=n, area=len(ys), bbox=(min(xs), min(ys), max(xs)+1, max(ys)+1), cy=float(np.mean(ys)), cx=float(np.mean(xs))))
comps = [c for c in comps if c["area"] > 150]
for c in sorted(comps, key=lambda c: c["cy"]): print(c["n"], c["area"], c["bbox"], round(c["cy"]))
pickle.dump(dict(rgb=a.astype("uint8"), lab=lab, comps=comps), open(sys.argv[2], "wb"))
Image.fromarray(np.where(art[..., None], a, 0).astype("uint8")).save(sys.argv[2] + ".art.png")
