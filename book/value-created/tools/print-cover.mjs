// Renders the paperback wraparound cover (back + spine + front, 0.125 in bleed) → out/print/value-created-cover.pdf.
// Spine width follows KDP's formula for black & white on white paper; run tools/print.mjs first for the page count.
import fs from "node:fs";
import path from "node:path";
import { PDFDocument } from "pdf-lib";
import { chromium } from "playwright";
import sharp from "sharp";
import book from "../book.json" with { type: "json" };
import { esc, OUT, ROOT } from "./lib.mjs";

const PRINT = path.join(OUT, "print");
const TRIM_W = 6;
const TRIM_H = 9;
const BLEED = 0.125;
const PER_PAGE = 0.002252; // KDP, black & white interior on white paper
const { pages } = JSON.parse(fs.readFileSync(path.join(PRINT, "pages.json"), "utf8"));
const SPINE = +(pages * PER_PAGE).toFixed(4);
const W = +(BLEED * 2 + TRIM_W * 2 + SPINE).toFixed(4);
const H = TRIM_H + BLEED * 2;
const ART = path.resolve(ROOT, "../../public/podcasts/value-created/cover-v3.jpg");

const STEPS = [
  ["See it", "Value is not in things. It is in people."],
  ["Create it", "The job is not to invent. It is to notice."],
  ["Capture it", "Creation is abundant. Capture is scarce."],
  ["Scale it", "Leverage is doing more with less."],
  ["Master it", "Teaching is the final leverage."],
];

async function main() {
  if (pages < 79) throw new Error(`${pages} pages: KDP allows spine text only from 79 pages`);
  const art = await sharp(ART).extract({ left: 510, top: 60, width: 1980, height: 1980 }).jpeg({ quality: 95 }).toBuffer();
  const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Cormorant+Garamond:ital,wght@0,500;1,500&family=DM+Sans:wght@500;700&display=block" rel="stylesheet">
<style>
@page { size: ${W}in ${H}in; margin: 0; }
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}in;height:${H}in}
body{position:relative;overflow:hidden;background:#0C1130;color:#F4EEDD;font-family:"Cormorant Garamond",serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.bg{position:absolute;inset:0;background:radial-gradient(ellipse ${TRIM_W * 1.2}in ${TRIM_H * 0.8}in at ${BLEED + TRIM_W + SPINE + TRIM_W / 2}in ${H * 0.32}in,#141B4A 0%,#0C1130 45%,#070B22 100%)}
.panel{position:absolute;top:0;height:${H}in}
.back{left:0;width:${BLEED + TRIM_W}in}
.spine{left:${BLEED + TRIM_W}in;width:${SPINE}in}
.front{left:${BLEED + TRIM_W + SPINE}in;width:${TRIM_W + BLEED}in}
/* Front: same composition as the eBook cover, scaled to 6 x 9 in. */
.art{position:absolute;left:${0.15}in;top:${0.25}in;width:${5.7}in;height:${5.7}in;background:url(data:image/jpeg;base64,${art.toString("base64")}) center/cover;
  -webkit-mask-image:radial-gradient(closest-side,#000 72%,transparent 100%);mask-image:radial-gradient(closest-side,#000 72%,transparent 100%)}
.title{position:absolute;left:0;right:${BLEED}in;top:5.45in;text-align:center;font-family:"Cinzel";font-weight:700;font-size:0.92in;line-height:.98;letter-spacing:.02in;
  background:linear-gradient(180deg,#FFF0B8 0%,#FFD47E 35%,#F2A81D 62%,#B07A1E 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.rule{position:absolute;left:50%;width:1.6in;height:1.2pt;margin-left:calc(-0.8in - ${BLEED / 2}in);background:linear-gradient(90deg,transparent,#D9AE4A,transparent)}
.front .rule{top:7.45in}
.sub{position:absolute;left:0.45in;right:${0.45 + BLEED}in;top:7.6in;text-align:center;font-style:italic;font-size:0.3in;line-height:1.12}
.by{position:absolute;left:0;right:${BLEED}in;bottom:${0.3 + BLEED}in;text-align:center;font-family:"Cinzel";font-weight:600;font-size:0.21in;letter-spacing:.05in;color:#E9C870}
/* Spine: reads top to bottom, as US spines do. */
.spine .txt{position:absolute;left:50%;top:50%;width:${H - 1.2}in;transform:translate(-50%,-50%) rotate(90deg);display:flex;justify-content:space-between;align-items:center;font-family:"Cinzel";white-space:nowrap}
.spine .t{font-weight:700;font-size:${Math.min(0.26, SPINE * 0.55).toFixed(3)}in;letter-spacing:.03in;color:#FFD47E}
.spine .a{font-weight:600;font-size:${Math.min(0.15, SPINE * 0.34).toFixed(3)}in;letter-spacing:.04in;color:#E9C870}
/* Back: blurb inside the safe area, bottom right kept clear for KDP's barcode. */
.blurb{position:absolute;left:${BLEED + 0.55}in;right:0.55in;top:${BLEED + 0.6}in}
.kicker{font-family:"DM Sans";font-weight:700;font-size:0.095in;letter-spacing:.035in;text-transform:uppercase;color:#F2A81D}
.head{font-family:"Cinzel";font-weight:700;font-size:0.3in;line-height:1.12;margin-top:.14in;color:#FFD47E}
.body{font-size:0.165in;line-height:1.38;margin-top:.18in;color:#F4EEDD}
.steps{list-style:none;margin-top:.2in;border-top:0.6pt solid rgba(217,174,74,.45);border-bottom:0.6pt solid rgba(217,174,74,.45);padding:.1in 0}
.steps li{display:flex;gap:.14in;font-size:0.155in;line-height:1.55}
.steps b{font-family:"Cinzel";font-weight:700;font-size:0.12in;letter-spacing:.015in;color:#FFD47E;width:1.05in;flex:none;padding-top:.02in}
.quote{font-style:italic;font-size:0.205in;line-height:1.3;margin-top:.22in;color:#FFD47E}
.foot{position:absolute;left:${BLEED + 0.55}in;bottom:${BLEED + 0.5}in;font-family:"Cinzel";font-weight:600;font-size:0.15in;letter-spacing:.04in;color:#E9C870}
.foot span{display:block;font-family:"DM Sans";font-weight:500;font-size:0.1in;letter-spacing:.02in;color:rgba(244,238,221,.7);margin-top:.05in}
</style></head><body>
<div class="bg"></div>
<div class="panel back">
  <div class="blurb">
    <div class="kicker">Business &amp; Economics</div>
    <div class="head">What is money<br>made of?</div>
    <p class="body">Everyone wants more money. Almost no one asks what it's made of. <i>Value, Created</i> answers that question: money is created value, frozen so it can be spent later. Behind every paycheck, every price and every fortune is someone who changed something for someone else. Learn how that change happens, and you can make it happen on purpose.</p>
    <ul class="steps">${STEPS.map(([a, b]) => `<li><b>${a}</b><span>${b}</span></li>`).join("")}</ul>
    <p class="body">Thirty-two short chapters, each ending with a one-page infographic, three takeaways and a small exercise to try this week.</p>
    <p class="quote">Find a real problem. Solve it well.<br>Charge less than the pain it caused.</p>
  </div>
  <div class="foot">${esc(book.author)}<span>thejoydigi.com</span></div>
</div>
<div class="panel spine"><div class="txt"><span class="t">VALUE, CREATED</span><span class="a">${esc(book.author.toUpperCase())}</span></div></div>
<div class="panel front">
  <div class="art"></div>
  <div class="title">VALUE,<br>CREATED</div>
  <div class="rule"></div>
  <div class="sub">${esc(book.subtitle).replace(", ", ",<br>")}</div>
  <div class="by">${esc(book.author.toUpperCase())}</div>
</div>
</body></html>`;
  const file = path.join(PRINT, "cover.html");
  fs.writeFileSync(file, html);
  const browser = await chromium.launch();
  const tab = await browser.newPage({ viewport: { width: Math.round(W * 96), height: Math.round(H * 96) } });
  await tab.goto(`file://${file}`, { waitUntil: "networkidle" });
  const ok = await tab.evaluate(async () => (await document.fonts.ready, ['700 20px "Cinzel"', 'italic 500 20px "Cormorant Garamond"', '700 20px "DM Sans"'].every((f) => document.fonts.check(f))));
  if (!ok) throw new Error("cover fonts did not load (needs network for Google Fonts)");
  const pdf = path.join(PRINT, "value-created-cover.pdf");
  await tab.pdf({ path: pdf, width: `${W}in`, height: `${H}in`, printBackground: true, pageRanges: "1" });
  await tab.screenshot({ path: path.join(PRINT, "cover-preview.png") });
  await browser.close();
  // Chrome rounds the page to whole CSS pixels; KDP checks cover size, so pin it to the exact formula.
  const doc = await PDFDocument.load(fs.readFileSync(pdf));
  const [page] = doc.getPages();
  page.setMediaBox(0, page.getHeight() - H * 72, W * 72, H * 72);
  page.setCropBox(0, page.getHeight() - H * 72, W * 72, H * 72);
  fs.writeFileSync(pdf, await doc.save());
  console.log(`ok  ${path.relative(ROOT, pdf)}  ${W} x ${H} in  spine ${SPINE} in (${pages} pages)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
