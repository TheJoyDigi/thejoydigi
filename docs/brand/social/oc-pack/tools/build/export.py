"""Export logo family, profile art, banners and the overview sheet from a keyc4.py output folder into the kit."""
import sys
from PIL import Image, ImageDraw, ImageFilter
import numpy as np
D, V = sys.argv[1], sys.argv[2]
def save(im, rel):
    p = f"{D}/{rel}"
    if rel.endswith(".jpg"): im.convert("RGB").save(p, quality=92, optimize=True, progressive=True)
    else: im.save(p, optimize=True)
def cover(im, W, H, ay=0.5):
    s = max(W / im.width, H / im.height); r = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    x = (r.width - W) // 2; y = int((r.height - H) * ay); return r.crop((x, y, x + W, y + H))
def place(canvas, logo, mw, mh, cx=None, cy=0.5):
    s = min(mw / logo.width, mh / logo.height); l = logo.resize((round(logo.width * s), round(logo.height * s)), Image.LANCZOS)
    c = canvas.convert("RGBA"); x = (c.width - l.width) // 2 if cx is None else cx; c.alpha_composite(l, (x, int(c.height * cy - l.height / 2))); return c
logo = Image.open(f"{V}/logo.png"); lock = Image.open(f"{V}/lockup.png"); mark = Image.open(f"{V}/mark.png")
save(logo, "logo/oc-pack-logo.png"); save(lock, "logo/oc-pack-lockup-horizontal.png"); save(mark, "logo/oc-pack-mark.png")
save(place(Image.new("RGBA", (1254, 1254), (0xFD, 0xE3, 0xA7, 255)), logo, 1150, 1150), "logo/oc-pack-logo-on-sand.jpg")
av = Image.open(f"{V}/avatar.png").convert("RGB"); save(av, "profile/oc-pack-avatar-1080.jpg")
m = Image.new("L", (1080, 1080), 0); ImageDraw.Draw(m).ellipse((0, 0, 1079, 1079), fill=255); c = av.convert("RGBA"); c.putalpha(m)
save(c.resize((320, 320), Image.LANCZOS), "profile/oc-pack-avatar-circle-preview.png")
scene = Image.open(f"{D}/tools/banner-scene.jpg").convert("RGB")
yt = np.array(cover(scene, 2560, 1440)).astype(int); H, W = yt.shape[:2]; y0 = H - 140; reg = yt[y0:]
issand = np.abs(reg - np.array([0xFD, 0xE3, 0xA7])).sum(2) < 70
brown = (reg[..., 0] < 200) & (reg[..., 1] < 150) & (reg[..., 2] < 120)
mk = np.array(Image.fromarray((brown * 255).astype("uint8")).filter(ImageFilter.MaxFilter(11))) > 0
xs = np.arange(W); mk &= ((xs > 230) & (xs < W - 230))[None, :]
for yy in range(reg.shape[0]):
    if mk[yy].any(): reg[yy][mk[yy]] = np.median(reg[yy][issand[yy] & ~mk[yy]], axis=0)
yt[y0:] = reg
save(place(Image.fromarray(yt.astype("uint8")), lock, 1546 * 0.9, 423 * 0.95), "profile/oc-pack-youtube-banner-2560x1440.jpg")
k = 320 / lock.height; lw = round(lock.width * k)
save(place(cover(scene, 1500, 500), lock, lw, 320, cx=max(465, 840 - lw // 2)), "profile/oc-pack-x-header-1500x500.jpg")
save(place(cover(scene, 1640, 624), lock, 1000, 380), "profile/oc-pack-facebook-cover-1640x624.jpg")
sheet = Image.new("RGB", (2400, 2900), (0xFD, 0xE3, 0xA7))
def put(path, box, circle=False):
    im = Image.open(D + "/" + path).convert("RGBA"); im.thumbnail(box[2:])
    if circle:
        mm = Image.new("L", im.size, 0); ImageDraw.Draw(mm).ellipse((0, 0, im.width - 1, im.height - 1), fill=255); im.putalpha(mm)
    sheet.paste(im, (box[0] + (box[2] - im.width) // 2, box[1] + (box[3] - im.height) // 2), im)
put("logo/oc-pack-logo.png", (60, 60, 640, 640)); put("profile/oc-pack-avatar-1080.jpg", (760, 130, 500, 500), circle=True)
put("logo/oc-pack-lockup-horizontal.png", (1320, 160, 1020, 480))
put("profile/oc-pack-youtube-banner-2560x1440.jpg", (60, 780, 1150, 650)); put("profile/oc-pack-x-header-1500x500.jpg", (1240, 780, 1100, 370)); put("profile/oc-pack-facebook-cover-1640x624.jpg", (1240, 1180, 1100, 420))
for i, n in enumerate(["episodes", "local", "beaches", "health", "training", "ask"]):
    im = Image.open(f"{D}/highlights/oc-pack-highlight-{n}.jpg").crop((0, 420, 1080, 1500)).resize((300, 300), Image.LANCZOS)
    mm = Image.new("L", (300, 300), 0); ImageDraw.Draw(mm).ellipse((0, 0, 299, 299), fill=255); sheet.paste(im, (80 + i * 390, 1690), mm)
for i, p in enumerate(["templates/oc-pack-tip-card-1080x1350.jpg", "templates/oc-pack-episode-drop-1080x1350.jpg", "templates/oc-pack-story-reel-cover-1080x1920.jpg", "examples/oc-pack-example-tip-card.jpg", "examples/oc-pack-example-episode-drop.jpg", "templates/oc-pack-pattern-tile.jpg"]):
    put(p, (40 + i * 393, 2080, 370, 760))
sheet.save(D + "/oc-pack-social-kit-overview.jpg", quality=88, optimize=True, progressive=True)
print("exported")
