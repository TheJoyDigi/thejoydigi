// Renders the Kindle eBook cover → out/cover.jpg (1600×2560, KDP's recommended 1.6:1).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import sharp from "sharp";
import book from "../book.json" with { type: "json" };

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REPO = path.resolve(ROOT, "../..");
const OUT = path.join(ROOT, "out");
const W = 1600;
const H = 2560;

// The podcast cover's diamond-over-water art, cropped above its baked-in title.
const ART = path.join(REPO, "public/podcasts/value-created/cover-v3.jpg");

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const art = await sharp(ART).extract({ left: 510, top: 60, width: 1980, height: 1980 }).resize(1500, 1500).jpeg({ quality: 95 }).toBuffer();
  const html = `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Cormorant+Garamond:ital,wght@1,500&display=block" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:${W}px;height:${H}px;overflow:hidden;background:radial-gradient(ellipse 120% 80% at 50% 32%,#141B4A 0%,#0C1130 45%,#070B22 100%);position:relative}
.art{position:absolute;left:180px;top:90px;width:1240px;height:1240px;background:url(data:image/jpeg;base64,${art.toString("base64")}) center/cover;
  -webkit-mask-image:radial-gradient(closest-side at 50% 50%,#000 72%,transparent 100%);mask-image:radial-gradient(closest-side at 50% 50%,#000 72%,transparent 100%)}
.title{position:absolute;left:0;right:0;top:1350px;text-align:center;font-family:"Cinzel";font-weight:700;font-size:250px;line-height:.98;letter-spacing:6px;
  background:linear-gradient(180deg,#FFF0B8 0%,#FFD47E 35%,#F2A81D 62%,#B07A1E 100%);-webkit-background-clip:text;background-clip:text;color:transparent;
  filter:drop-shadow(0 6px 24px rgba(242,168,29,.28))}
.rule{position:absolute;left:50%;top:1885px;width:420px;height:3px;margin-left:-210px;background:linear-gradient(90deg,transparent,#D9AE4A,transparent)}
.sub{position:absolute;left:120px;right:120px;top:1930px;text-align:center;font-family:"Cormorant Garamond";font-style:italic;font-weight:500;font-size:84px;line-height:1.12;color:#F4EEDD}
.by{position:absolute;left:0;right:0;bottom:120px;text-align:center;font-family:"Cinzel";font-weight:600;font-size:62px;letter-spacing:14px;color:#E9C870}
</style></head><body>
<div class="art"></div>
<div class="title">VALUE,<br>CREATED</div>
<div class="rule"></div>
<div class="sub">${book.subtitle.replace(", ", ",<br>")}</div>
<div class="by">${book.author.toUpperCase()}</div>
</body></html>`;
  const browser = await chromium.launch();
  const tab = await browser.newPage({ viewport: { width: W, height: H } });
  await tab.setContent(html, { waitUntil: "networkidle" });
  const ok = await tab.evaluate(async () => (await document.fonts.ready, document.fonts.check('700 50px "Cinzel"') && document.fonts.check('italic 500 50px "Cormorant Garamond"')));
  if (!ok) throw new Error("cover fonts did not load (needs network for Google Fonts)");
  const png = await tab.screenshot({ type: "png" });
  await browser.close();
  const out = path.join(OUT, "cover.jpg");
  await sharp(png).jpeg({ quality: 92, chromaSubsampling: "4:4:4" }).toFile(out);
  await sharp(png).resize(200).png().toFile(path.join(OUT, "cover-thumb.png"));
  console.log(`ok  ${path.relative(ROOT, out)}  ${W}×${H}  ${(fs.statSync(out).size / 1024).toFixed(0)} KB`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
