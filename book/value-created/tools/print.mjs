// Builds the 6×9 in paperback interior → out/print/value-created-interior.pdf (black & white, KDP print specs).
// Lays out pages with Paged.js in Chromium; run tools/infographics.mjs first. Writes out/print/pages.json for print-cover.mjs.
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import sharp from "sharp";
import book from "../book.json" with { type: "json" };
import { esc, NUM, OUT, pad, render as renderMd, ROOT, smart } from "./lib.mjs";

const PRINT = path.join(OUT, "print");
const PDF = path.join(PRINT, "value-created-interior.pdf");
const render = (file, figId) => renderMd(file, figId, (id) => `images/ch${id}.png`);

// Grayscale with the cream paper tone lifted to pure white, so figures sit on the page instead of in gray boxes.
async function images() {
  fs.mkdirSync(path.join(PRINT, "images"), { recursive: true });
  for (const f of fs.readdirSync(path.join(OUT, "images")).filter((f) => /^ch\d\d\.png$/.test(f))) {
    await sharp(path.join(OUT, "images", f)).grayscale().linear(255 / 236, 0).png({ compressionLevel: 9 }).toFile(path.join(PRINT, "images", f));
  }
}

const CSS = `
@page { size: 6in 9in; margin: 0.75in 0.6in 0.8in 0.75in; }
@page :left { margin-left: 0.6in; margin-right: 0.75in;
  @top-left { content: "${book.title}"; font: italic 8.5pt "Source Serif 4", serif; letter-spacing: 0.02em; color: #222; vertical-align: bottom; padding-bottom: 0.18in; }
  @bottom-left { content: counter(page); font: 8.5pt "Source Serif 4", serif; vertical-align: top; padding-top: 0.2in; } }
@page :right { margin-left: 0.75in; margin-right: 0.6in;
  @top-right { content: string(chapter); font: italic 8.5pt "Source Serif 4", serif; letter-spacing: 0.02em; color: #222; vertical-align: bottom; padding-bottom: 0.18in; }
  @bottom-right { content: counter(page); font: 8.5pt "Source Serif 4", serif; vertical-align: top; padding-top: 0.2in; } }
@page front { @top-left { content: none; } @top-right { content: none; } @bottom-left { content: none; } @bottom-right { content: none; } }
@page opener:first { @top-left { content: none; } @top-right { content: none; } }
@page :blank { @top-left { content: none; } @top-right { content: none; } @bottom-left { content: none; } @bottom-right { content: none; } }

html { font-family: "Source Serif 4", Georgia, serif; font-size: 10.5pt; line-height: 1.45; color: #000; font-variant-numeric: oldstyle-nums; }
body { margin: 0; hyphens: auto; -webkit-hyphens: auto; }
p { margin: 0; text-indent: 1.3em; text-align: justify; orphans: 2; widows: 2; }
h1 + p, h2 + p, figure + p, blockquote + p, ol + p, ul + p, .chapter-head + p { text-indent: 0; }
h1, h2, .display { font-family: "Fraunces", Georgia, serif; font-weight: 600; font-variant-numeric: lining-nums; hyphens: none; }
h2 { font-size: 12.5pt; line-height: 1.25; margin: 1.5em 0 0.55em; break-after: avoid; }
em { font-style: italic; }
strong { font-weight: 650; }
ol, ul { margin: 0.6em 0 0.9em; padding-left: 1.4em; }
li { margin: 0 0 0.45em; text-align: justify; }
blockquote.pull { margin: 1.3em 0.6em; padding: 0.6em 0; border-top: 0.6pt solid #000; border-bottom: 0.6pt solid #000; break-inside: avoid; }
blockquote.pull p { text-indent: 0; text-align: center; font-style: italic; font-size: 12pt; line-height: 1.35; }
figure.infographic { margin: 1em 0; break-inside: avoid; text-align: center; }
figure.infographic img { width: 100%; height: auto; display: block; }
a { color: inherit; text-decoration: none; }

.front { page: front; }
.title-page { break-after: page; text-align: center; padding-top: 1.6in; }
.title-page .t { font-size: 34pt; line-height: 1.05; margin: 0; text-indent: 0; text-align: center; }
.title-page .s { font-size: 13pt; font-style: italic; margin: 0.35in 0 0; text-indent: 0; text-align: center; }
.title-page .rule { width: 1.2in; border-top: 0.75pt solid #000; margin: 0.4in auto; }
.title-page .a { font-family: "Fraunces", serif; font-size: 11pt; letter-spacing: 0.25em; text-transform: uppercase; text-indent: 0; text-align: center; margin-top: 2.6in; }
.copyright { break-after: page; padding-top: 4.4in; font-size: 8.5pt; line-height: 1.45; }
.copyright p { text-indent: 0; text-align: left; margin: 0 0 0.75em; }
.toc { break-before: right; break-after: page; }
.toc h1 { font-size: 20pt; text-align: center; margin: 0.4in 0 0.35in; }
.toc ol { list-style: none; padding: 0; margin: 0; }
.toc li { display: flex; align-items: baseline; margin: 0 0 0.28em; text-align: left; font-size: 9.5pt; }
.toc li.part { margin-top: 0.75em; font-family: "Fraunces", serif; font-weight: 600; font-size: 9.5pt; }
.toc li.chapter { padding-left: 1.2em; }
.toc li a { flex: 1; display: flex; }
.toc li a::after { content: target-counter(attr(href), page); margin-left: auto; padding-left: 0.6em; font-variant-numeric: lining-nums; }

section.opener { page: opener; break-before: page; }
section.opener.recto { break-before: right; }
.chapter-head { text-align: center; padding: 0.55in 0 0.3in; }
.chapter-head .label { display: block; font-family: "Fraunces", serif; font-size: 8.5pt; letter-spacing: 0.32em; text-transform: uppercase; margin-bottom: 0.14in; }
.chapter-head h1 { font-size: 21pt; line-height: 1.15; margin: 0; }
h1.running { string-set: chapter content(text); }
.chapter-head .rule { width: 0.9in; border-top: 0.75pt solid #000; margin: 0.22in auto 0; }

section.part { page: front; break-before: right; break-after: page; text-align: center; padding-top: 1.7in; }
section.part .label { font-family: "Fraunces", serif; font-size: 9pt; letter-spacing: 0.32em; text-transform: uppercase; }
section.part h1 { font-size: 26pt; margin: 0.15in 0 0.35in; }
section.part p { text-indent: 0; text-align: center; font-style: italic; font-size: 10pt; margin: 0 0.2in 0.3in; }
section.part ol { list-style: none; padding: 0; margin: 0; font-size: 9.5pt; line-height: 1.7; }
section.part li { text-align: center; margin: 0; }
`;

function html() {
  const body = [];
  const toc = [`<li><a href="#intro">Before You Begin</a></li>`];
  body.push(`<section class="front title-page"><p class="display t">${esc(book.title)}</p><p class="s">${esc(book.subtitle)}</p><div class="rule"></div><p class="a">${esc(book.author)}</p></section>`);
  body.push(`<section class="front copyright">
<p><em>${esc(book.title)}: ${esc(book.subtitle)}</em></p>
<p>Copyright © ${book.year} ${esc(book.publisher)}. All rights reserved.</p>
<p>No part of this book may be reproduced or shared in any form without written permission from the publisher, except for brief quotations in reviews and articles.</p>
<p>This book is for education and general information only. It is not financial, investment, legal or tax advice. For decisions about your own situation, talk to a qualified professional.</p>
<p>Published by ${esc(book.publisher)} · thejoydigi.com</p>
<p>ISBN ${book.paperbackIsbn} (paperback)</p>
<p>First paperback edition, ${book.year}.</p>
</section>`);

  const sections = [];
  const intro = render("introduction.md");
  sections.push(`<section class="opener recto" id="intro"><div class="chapter-head"><h1 class="running">${esc(intro.title)}</h1><div class="rule"></div></div>${intro.html}</section>`);
  book.parts.forEach((p, pi) => {
    toc.push(`<li class="part"><a href="#part${pi + 1}">Part ${NUM[pi]}: ${esc(p.title)}</a></li>`);
    const list = p.chapters.map((n) => `<li>${n}. ${esc(render(`${pad(n)}.md`, pad(n)).title)}</li>`).join("");
    sections.push(`<section class="part" id="part${pi + 1}"><div class="label">Part ${NUM[pi]}</div><h1>${esc(p.title)}</h1><p>${esc(smart(p.intro))}</p><ol>${list}</ol></section>`);
    p.chapters.forEach((n, ci) => {
      const ch = render(`${pad(n)}.md`, pad(n));
      toc.push(`<li class="chapter"><a href="#ch${pad(n)}">${n}. ${esc(ch.title)}</a></li>`);
      sections.push(`<section class="opener${ci === 0 ? " recto" : ""}" id="ch${pad(n)}"><div class="chapter-head"><span class="label">Chapter ${n}</span><h1 class="running">${esc(ch.title)}</h1><div class="rule"></div></div>${ch.html}</section>`);
    });
  });
  const end = render("conclusion.md");
  toc.push(`<li class="part"><a href="#conclusion">${esc(end.title)}</a></li>`);
  sections.push(`<section class="opener recto" id="conclusion"><div class="chapter-head"><h1 class="running">${esc(end.title)}</h1><div class="rule"></div></div>${end.html}</section>`);
  const back = render("back.md");
  toc.push(`<li><a href="#back">${esc(back.title)}</a></li>`);
  // Print readers can't click, so show bare web addresses instead of linked text.
  const backHtml = back.html.replace(/<a href="mailto:([^"]+)">[^<]*<\/a>/g, "$1").replace(/<a href="https:\/\/([^"]+)">[^<]*<\/a>/g, "$1");
  sections.push(`<section class="opener" id="back"><div class="chapter-head"><h1 class="running">${esc(back.title)}</h1><div class="rule"></div></div>${backHtml}</section>`);

  body.push(`<nav class="front toc"><h1>Contents</h1><ol>${toc.join("")}</ol></nav>`);
  body.push(...sections);
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(book.title)}</title>
<link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,650;1,8..60,400&family=Fraunces:opsz,wght@9..144,600&display=block" rel="stylesheet">
<style>${CSS}</style>
<script>window.PagedConfig = { auto: false };</script>
<script src="${path.join(ROOT, "node_modules/pagedjs/dist/paged.polyfill.js")}"></script>
</head><body>${body.join("\n")}</body></html>`;
}

async function main() {
  await images();
  const file = path.join(PRINT, "interior.html");
  fs.writeFileSync(file, html());
  const browser = await chromium.launch();
  const tab = await browser.newPage();
  await tab.goto(`file://${file}`, { waitUntil: "networkidle" });
  const fonts = await tab.evaluate(async () => (await document.fonts.ready, ['400 10pt "Source Serif 4"', 'italic 400 10pt "Source Serif 4"', '600 10pt "Fraunces"'].every((f) => document.fonts.check(f))));
  if (!fonts) throw new Error("print fonts did not load (needs network for Google Fonts)");
  const errors = [];
  tab.on("pageerror", (e) => errors.push(e.message));
  const pages = await tab.evaluate(async () => (await window.PagedPolyfill.preview(), document.querySelectorAll(".pagedjs_page").length));
  if (errors.length) throw new Error(`layout errors:\n${errors.join("\n")}`);
  await tab.pdf({ path: PDF, preferCSSPageSize: true, printBackground: true });
  await browser.close();
  fs.writeFileSync(path.join(PRINT, "pages.json"), JSON.stringify({ pages }, null, 2));
  console.log(`ok  ${path.relative(ROOT, PDF)}  ${pages} pages  ${(fs.statSync(PDF).size / 1024 / 1024).toFixed(1)} MB`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
