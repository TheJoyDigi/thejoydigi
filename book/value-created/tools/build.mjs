// Builds the Kindle-ready EPUB 3 → out/value-created.epub, then validates it with EPUBCheck when available.
// Run tools/infographics.mjs first; it writes the images this embeds.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";
import book from "../book.json" with { type: "json" };

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MS = path.join(ROOT, "manuscript");
const OUT = path.join(ROOT, "out");
const STAGE = path.join(OUT, "epub");
const OEBPS = path.join(STAGE, "OEBPS");
const EPUB = path.join(OUT, "value-created.epub");
const EPUBCHECK = path.join(OUT, "tools/epubcheck-5.2.1/epubcheck.jar");
const NUM = ["One", "Two", "Three", "Four", "Five"];
const pad = (n) => String(n).padStart(2, "0");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Marked has already escaped quotes in text tokens, so decode those before curling them.
const smart = (s) =>
  s
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/(^|[\s([{—–-])"/g, "$1“")
    .replace(/"/g, "”")
    .replace(/(\w)'(\w)/g, "$1’$2")
    .replace(/(^|[\s([{—–-])'/g, "$1‘")
    .replace(/'/g, "’")
    .replace(/ -- /g, " — ")
    .replace(/\.\.\./g, "…");

marked.use({
  walkTokens(t) {
    if (t.type === "text" && !t.tokens) t.text = smart(t.text);
  },
  renderer: {
    blockquote(quote) {
      return `<blockquote class="pull">${quote}</blockquote>\n`;
    },
  },
});

function figure(id) {
  const spec = JSON.parse(fs.readFileSync(path.join(ROOT, "infographics", `${id}.json`), "utf8"));
  const items = (spec.terms || spec.steps || spec.nodes || spec.items || spec.bars || []).map((it) => (it.note ? `${it.label}: ${it.note}` : it.label));
  if (spec.result) items.push(`Result, ${spec.result.label}: ${spec.result.note}`);
  if (spec.rows) items.push(...spec.rows.map(([a, b]) => `${spec.left}: ${a}; ${spec.right}: ${b}`));
  if (spec.quadrants) items.push(...Object.values(spec.quadrants).map((q) => `${q.label}: ${q.note}`));
  const alt = `Infographic: ${spec.title}. ${items.join(". ")}. ${spec.takeaway}`.replace(/\.\./g, ".");
  return `<figure class="infographic"><img src="../images/ch${id}.png" alt="${esc(alt)}"/></figure>`;
}

// Markdown → XHTML body; returns the H1 text separately.
function render(file, figId) {
  const src = fs.readFileSync(path.join(MS, file), "utf8");
  const m = src.match(/^# (.+)\n/);
  if (!m) throw new Error(`${file}: must start with "# Title"`);
  let html = marked.parse(src.slice(m[0].length));
  const marks = html.match(/<p>\{\{infographic(?::(\d\d))?\}\}<\/p>/g) || [];
  if (figId && marks.length !== 1) throw new Error(`${file}: needs exactly one {{infographic}} (found ${marks.length})`);
  html = html.replace(/<p>\{\{infographic(?::(\d\d))?\}\}<\/p>/g, (_, id) => figure(id || figId));
  // XHTML: close void elements.
  html = html.replace(/<(br|hr|img)([^>]*?)\s*\/?>/g, "<$1$2/>");
  if (/\{\{|<table|<h3|<img(?![^>]*images\/ch)/.test(html)) throw new Error(`${file}: unsupported Markdown (see STYLE.md)`);
  return { title: smart(m[1].trim()), html };
}

const page = (title, body, type = "") => `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="${book.language}" xml:lang="${book.language}">
<head><meta charset="utf-8"/><title>${esc(title)}</title><link rel="stylesheet" type="text/css" href="../style.css"/></head>
<body${type ? ` class="${type}"` : ""}>
${body}
</body>
</html>
`;

const CSS = `
html, body { margin: 0; padding: 0; }
p { margin: 0; text-indent: 1.2em; line-height: 1.45; }
h1 + p, h2 + p, figure + p, blockquote + p, ol + p, ul + p, .noindent { text-indent: 0; }
h1, h2 { font-weight: bold; page-break-after: avoid; break-after: avoid; -webkit-hyphens: none; hyphens: none; }
h1 { text-align: center; margin: 2.5em 0 1.6em; line-height: 1.2; }
h1 .label { display: block; font-size: 0.55em; font-weight: normal; text-transform: uppercase; letter-spacing: 0.18em; margin-bottom: 0.7em; }
h1 .name { display: block; font-size: 1.5em; }
h2 { font-size: 1.2em; margin: 1.8em 0 0.7em; line-height: 1.3; }
em { font-style: italic; }
strong { font-weight: bold; }
ol, ul { margin: 0.8em 0 1em 1.4em; padding: 0; }
li { margin: 0 0 0.6em; line-height: 1.45; }
li p { text-indent: 0; }
blockquote.pull { margin: 1.6em 1.4em; padding: 0.8em 0; border-top: 1px solid; border-bottom: 1px solid; text-align: center; page-break-inside: avoid; }
blockquote.pull p { text-indent: 0; font-size: 1.2em; font-style: italic; line-height: 1.35; }
figure.infographic { margin: 1.6em 0; padding: 0; text-align: center; page-break-inside: avoid; break-inside: avoid; }
figure.infographic img { width: 100%; max-width: 100%; height: auto; }
a { text-decoration: underline; }
.center { text-align: center; text-indent: 0; }
.title-page { text-align: center; }
.title-page .t { font-size: 2.4em; font-weight: bold; margin: 3em 0 0.4em; text-indent: 0; text-align: center; line-height: 1.15; }
.title-page .s { font-size: 1.2em; font-style: italic; margin: 0 0 4em; text-indent: 0; text-align: center; }
.title-page .a { font-size: 1em; text-transform: uppercase; letter-spacing: 0.2em; text-indent: 0; text-align: center; }
.copyright p { text-indent: 0; font-size: 0.85em; margin: 0 0 0.9em; }
.copyright { margin-top: 3em; }
.toc ol { list-style: none; margin: 0; padding: 0; }
.toc li { margin: 0 0 0.45em; }
.toc li.part { margin-top: 1.2em; font-weight: bold; }
.toc li.chapter { margin-left: 1.2em; }
.part-page h1 { margin-top: 4em; }
.part-page p { text-indent: 0; font-style: italic; text-align: center; margin: 0 1em 1.6em; }
.part-page ol { list-style: none; margin: 0 2em; padding: 0; text-align: center; }
`;

function main() {
  // PARTIAL=1 builds with whatever chapters exist so far, for previews only.
  if (process.env.PARTIAL) for (const p of book.parts) p.chapters = p.chapters.filter((n) => fs.existsSync(path.join(MS, `${pad(n)}.md`)) && fs.existsSync(path.join(OUT, "images", `ch${pad(n)}.png`)));
  const missing = book.parts.flatMap((p) => p.chapters).filter((n) => !fs.existsSync(path.join(MS, `${pad(n)}.md`)));
  if (missing.length) throw new Error(`missing chapters: ${missing.join(", ")} (PARTIAL=1 to preview without them)`);
  fs.rmSync(STAGE, { recursive: true, force: true });
  fs.mkdirSync(path.join(OEBPS, "text"), { recursive: true });
  fs.mkdirSync(path.join(OEBPS, "images"), { recursive: true });
  fs.writeFileSync(path.join(STAGE, "mimetype"), "application/epub+zip");
  fs.mkdirSync(path.join(STAGE, "META-INF"));
  fs.writeFileSync(
    path.join(STAGE, "META-INF/container.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container"><rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles></container>\n`
  );
  fs.writeFileSync(path.join(OEBPS, "style.css"), CSS.trim() + "\n");

  const spine = []; // { id, href, title, nav: {level, label} }
  const add = (id, title, body, type, nav) => {
    fs.writeFileSync(path.join(OEBPS, "text", `${id}.xhtml`), page(title, body, type));
    spine.push({ id, href: `text/${id}.xhtml`, title, nav });
  };

  add(
    "title",
    book.title,
    `<section epub:type="titlepage" class="title-page"><p class="t">${esc(book.title)}</p><p class="s">${esc(book.subtitle)}</p><p class="a">${esc(book.author)}</p></section>`,
    ""
  );
  add(
    "copyright",
    "Copyright",
    `<section epub:type="copyright-page" class="copyright">
<p><em>${esc(book.title)}: ${esc(book.subtitle)}</em></p>
<p>Copyright © ${book.year} ${esc(book.publisher)}. All rights reserved.</p>
<p>No part of this book may be reproduced or shared in any form without written permission from the publisher, except for brief quotations in reviews and articles.</p>
<p>This book is for education and general information only. It is not financial, investment, legal or tax advice. For decisions about your own situation, talk to a qualified professional.</p>
<p>Published by ${esc(book.publisher)}. <a href="${book.site}">thejoydigi.com</a></p>
<p>First Kindle edition, ${book.year}.</p>
</section>`,
    ""
  );

  // Inline contents page (KDP expects one alongside the nav document).
  const tocItems = [`<li><a href="intro.xhtml">Before You Begin</a></li>`];
  book.parts.forEach((p, pi) => {
    tocItems.push(`<li class="part"><a href="part${pi + 1}.xhtml">Part ${NUM[pi]}: ${esc(p.title)}</a></li>`);
    p.chapters.forEach((n) => tocItems.push(`<li class="chapter"><a href="ch${pad(n)}.xhtml">${n}. ${esc(render(`${pad(n)}.md`, pad(n)).title)}</a></li>`));
  });
  tocItems.push(`<li class="part"><a href="conclusion.xhtml">The Book in One Sentence</a></li>`, `<li><a href="back.xhtml">Keep Going</a></li>`);
  add("contents", "Contents", `<nav epub:type="toc" class="toc" id="contents"><h1><span class="name">Contents</span></h1><ol>${tocItems.join("\n")}</ol></nav>`, "", { level: 0, label: "Contents" });

  const intro = render("introduction.md");
  add("intro", intro.title, `<section epub:type="introduction" role="doc-introduction"><h1><span class="name">${esc(intro.title)}</span></h1>\n${intro.html}</section>`, "", { level: 0, label: intro.title });

  book.parts.forEach((p, pi) => {
    const list = p.chapters.map((n) => `<li>${n}. ${esc(render(`${pad(n)}.md`, pad(n)).title)}</li>`).join("");
    add(
      `part${pi + 1}`,
      `Part ${NUM[pi]}: ${p.title}`,
      `<section epub:type="part" role="doc-part" class="part-page"><h1><span class="label">Part ${NUM[pi]}</span><span class="name">${esc(p.title)}</span></h1>\n<p>${esc(smart(p.intro))}</p>\n<ol>${list}</ol></section>`,
      "",
      { level: 0, label: `Part ${NUM[pi]}: ${p.title}` }
    );
    p.chapters.forEach((n) => {
      const ch = render(`${pad(n)}.md`, pad(n));
      add(
        `ch${pad(n)}`,
        `${n}. ${ch.title}`,
        `<section epub:type="chapter" role="doc-chapter"><h1><span class="label">Chapter ${n}</span><span class="name">${esc(ch.title)}</span></h1>\n${ch.html}</section>`,
        "",
        { level: 1, label: `${n}. ${ch.title}` }
      );
    });
  });

  const end = render("conclusion.md");
  add("conclusion", end.title, `<section epub:type="conclusion" role="doc-conclusion"><h1><span class="name">${esc(end.title)}</span></h1>\n${end.html}</section>`, "", { level: 0, label: end.title });
  const back = render("back.md");
  add("back", back.title, `<section epub:type="backmatter"><h1><span class="name">${esc(back.title)}</span></h1>\n${back.html}</section>`, "", { level: 0, label: back.title });

  // Images referenced by the text.
  const imgs = new Set();
  for (const s of spine) for (const m of fs.readFileSync(path.join(OEBPS, s.href), "utf8").matchAll(/images\/(ch\d\d\.png)/g)) imgs.add(m[1]);
  for (const f of imgs) {
    const src = path.join(OUT, "images", f);
    if (!fs.existsSync(src)) throw new Error(`missing ${path.relative(ROOT, src)}: run node tools/infographics.mjs`);
    fs.copyFileSync(src, path.join(OEBPS, "images", f));
  }

  // Nav document: parts with nested chapters.
  const navItems = [];
  for (const s of spine.filter((s) => s.nav)) {
    const li = `<li><a href="${s.href}">${esc(s.nav.label)}</a>`;
    if (s.nav.level === 1) {
      const parent = navItems[navItems.length - 1];
      parent.kids.push(`${li}</li>`);
    } else navItems.push({ li, kids: [] });
  }
  const navOl = navItems.map((it) => `${it.li}${it.kids.length ? `<ol>${it.kids.join("")}</ol>` : ""}</li>`).join("\n");
  fs.writeFileSync(
    path.join(OEBPS, "nav.xhtml"),
    `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="${book.language}" xml:lang="${book.language}">
<head><meta charset="utf-8"/><title>Contents</title></head>
<body>
<nav epub:type="toc" id="toc"><h1>Contents</h1><ol>
${navOl}
</ol></nav>
<nav epub:type="landmarks" id="landmarks" hidden=""><h1>Landmarks</h1><ol>
<li><a epub:type="toc" href="text/contents.xhtml">Contents</a></li>
<li><a epub:type="bodymatter" href="text/intro.xhtml">Start reading</a></li>
</ol></nav>
</body>
</html>
`
  );

  // NCX for older Kindle readers.
  let order = 0;
  const ncxPoint = (label, href, inner = "") => `<navPoint id="np${++order}" playOrder="${order}"><navLabel><text>${esc(label)}</text></navLabel><content src="${href}"/>${inner}</navPoint>`;
  const ncxNav = [];
  for (const s of spine.filter((s) => s.nav)) {
    if (s.nav.level === 1) ncxNav[ncxNav.length - 1].kids.push(s);
    else ncxNav.push({ s, kids: [] });
  }
  const ncxBody = ncxNav
    .map(({ s, kids }) => {
      const head = ncxPoint(s.nav.label, s.href, "\u0000");
      const inner = kids.map((k) => ncxPoint(k.nav.label, k.href)).join("");
      return head.replace("\u0000", inner);
    })
    .join("\n");
  fs.writeFileSync(
    path.join(OEBPS, "toc.ncx"),
    `<?xml version="1.0" encoding="UTF-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1"><head><meta name="dtb:uid" content="${book.identifier}"/><meta name="dtb:depth" content="2"/><meta name="dtb:totalPageCount" content="0"/><meta name="dtb:maxPageNumber" content="0"/></head>
<docTitle><text>${esc(book.title)}</text></docTitle><navMap>
${ncxBody}
</navMap></ncx>
`
  );

  const modified = new Date().toISOString().replace(/\.\d+Z$/, "Z");
  const manifest = [
    `<item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>`,
    `<item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>`,
    `<item id="css" href="style.css" media-type="text/css"/>`,
    ...spine.map((s) => `<item id="${s.id}" href="${s.href}" media-type="application/xhtml+xml"/>`),
    ...[...imgs].sort().map((f) => `<item id="img-${f.replace(".png", "")}" href="images/${f}" media-type="image/png"/>`),
  ];
  fs.writeFileSync(
    path.join(OEBPS, "content.opf"),
    `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="bookid" xml:lang="${book.language}">
<metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
<dc:identifier id="bookid">${book.identifier}</dc:identifier>
<dc:title id="t1">${esc(book.title)}</dc:title>
<meta refines="#t1" property="title-type">main</meta>
<dc:title id="t2">${esc(book.subtitle)}</dc:title>
<meta refines="#t2" property="title-type">subtitle</meta>
<dc:creator id="c1">${esc(book.author)}</dc:creator>
<meta refines="#c1" property="role" scheme="marc:relators">aut</meta>
<dc:publisher>${esc(book.publisher)}</dc:publisher>
<dc:language>${book.language}</dc:language>
<dc:date>${book.year}</dc:date>
<dc:description>${esc(book.description)}</dc:description>
${book.subjects.map((s) => `<dc:subject>${esc(s)}</dc:subject>`).join("\n")}
<dc:rights>Copyright © ${book.year} ${esc(book.publisher)}. All rights reserved.</dc:rights>
<meta property="dcterms:modified">${modified}</meta>
</metadata>
<manifest>
${manifest.join("\n")}
</manifest>
<spine toc="ncx">
${spine.map((s) => `<itemref idref="${s.id}"/>`).join("\n")}
</spine>
<guide>
<reference type="toc" title="Contents" href="text/contents.xhtml"/>
<reference type="text" title="Start reading" href="text/intro.xhtml"/>
</guide>
</package>
`
  );

  fs.rmSync(EPUB, { force: true });
  execFileSync("zip", ["-X0q", EPUB, "mimetype"], { cwd: STAGE });
  execFileSync("zip", ["-Xr9Dq", EPUB, "META-INF", "OEBPS"], { cwd: STAGE });
  const words = spine.reduce((n, s) => n + fs.readFileSync(path.join(OEBPS, s.href), "utf8").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length, 0);
  console.log(`ok  ${path.relative(ROOT, EPUB)}  ${(fs.statSync(EPUB).size / 1024 / 1024).toFixed(2)} MB  ${spine.length} files  ${imgs.size} images  ~${words.toLocaleString()} words`);

  if (fs.existsSync(EPUBCHECK)) {
    try {
      const out = execFileSync("java", ["-jar", EPUBCHECK, EPUB], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
      console.log(out.trim().split("\n").slice(-3).join("\n"));
    } catch (e) {
      console.error((e.stdout || "") + (e.stderr || ""));
      process.exit(1);
    }
  } else console.log("skip epubcheck (see README to install)");
}

main();
