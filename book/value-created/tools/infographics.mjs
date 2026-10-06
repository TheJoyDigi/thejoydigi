// Renders infographics/NN.json → out/images/chNN.png (1600×2000) and out/images/sheet.png.
// Usage: node tools/infographics.mjs [chapterNumber ...] | --examples
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = process.env.SRC ? path.resolve(process.env.SRC) : path.join(ROOT, "infographics");
const OUT = process.env.OUT ? path.resolve(process.env.OUT) : path.join(ROOT, "out", "images");
const FONTS = path.resolve(ROOT, "../../src/assets/fonts");
const W = 1600;
const H = 2000;

// Character limits keep every label legible at Kindle screen widths; the overflow check below is the backstop.
const LIMITS = { title: 44, subtitle: 90, takeaway: 80, label: 26, note: 70, heading: 22, cell: 46, center: 18, axis: 30 };

// Inlined because a setContent page (about:blank) may not load file:// fonts.
const font = (f) => `data:font/ttf;base64,${fs.readFileSync(path.join(FONTS, f)).toString("base64")}`;
const esc = (s = "") =>
  String(s)
    .replace(/(^|[\s(])"/g, "$1“")
    .replace(/"/g, "”")
    .replace(/(^|[\s(])'/g, "$1‘")
    .replace(/'/g, "’")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

function check(spec, file) {
  const errs = [];
  const len = (v, max, where) => v != null && String(v).length > max && errs.push(`${where} is ${String(v).length} chars (max ${max}): "${v}"`);
  len(spec.title, LIMITS.title, "title");
  len(spec.subtitle, LIMITS.subtitle, "subtitle");
  len(spec.takeaway, LIMITS.takeaway, "takeaway");
  if (!spec.title || !spec.takeaway || !spec.type) errs.push("title, type and takeaway are required");
  const items = spec.items || spec.steps || spec.nodes || spec.terms || spec.bars || [];
  items.forEach((it, i) => {
    len(it.label, LIMITS.label, `item ${i + 1} label`);
    len(it.note, LIMITS.note, `item ${i + 1} note`);
  });
  (spec.rows || []).forEach((r, i) => r.forEach((c, j) => len(c, LIMITS.cell, `row ${i + 1} cell ${j + 1}`)));
  len(spec.left, LIMITS.heading, "left");
  len(spec.right, LIMITS.heading, "right");
  len(spec.center, LIMITS.center, "center");
  len(spec.axis, LIMITS.axis, "axis");
  if (spec.result) {
    len(spec.result.label, LIMITS.label, "result label");
    len(spec.result.note, LIMITS.note, "result note");
  }
  if (spec.quadrants) Object.entries(spec.quadrants).forEach(([k, q]) => (len(q.label, LIMITS.label, `quadrant ${k} label`), len(q.note, LIMITS.note, `quadrant ${k} note`)));
  if (errs.length) throw new Error(`${file}:\n  - ${errs.join("\n  - ")}`);
}

const box = (it, hi, extra = "") => `<div class="box fit ${hi ? "hi" : ""} ${extra}"><div class="label">${esc(it.label)}</div>${it.note ? `<div class="note">${esc(it.note)}</div>` : ""}</div>`;
const isHi = (spec, i) => (Array.isArray(spec.highlight) ? spec.highlight.includes(i) : spec.highlight === i);

const ARROW_DOWN = `<svg class="arrow" viewBox="0 0 60 60"><path d="M30 6v40M14 32l16 16 16-16" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const TYPES = {
  // A sequence, top to bottom.
  flow(spec) {
    return `<div class="flow">${spec.steps
      .map((s, i) => `${i ? ARROW_DOWN : ""}<div class="row"><div class="num ${isHi(spec, i) ? "hi" : ""}">${i + 1}</div>${box(s, isHi(spec, i))}</div>`)
      .join("")}</div>`;
  },
  // Rising steps; the first item is the bottom step.
  ladder(spec) {
    const n = spec.steps.length;
    const shift = n > 1 ? Math.min(110, 440 / (n - 1)) : 0;
    return `<div class="ladder">${spec.steps
      .map((s, i) => ({ s, i }))
      .reverse()
      .map(({ s, i }) => `<div class="tread" style="margin-left:${i * shift}px"><div class="num ${isHi(spec, i) ? "hi" : ""}">${i + 1}</div>${box(s, isHi(spec, i))}</div>`)
      .join("")}</div>`;
  },
  // Two columns compared row by row.
  compare(spec) {
    return `<div class="compare"><div class="heads"><div class="head fit">${esc(spec.left)}</div><div class="vs">vs</div><div class="head fit hi">${esc(spec.right)}</div></div>${spec.rows
      .map(([a, b]) => `<div class="pair"><div class="cell fit">${esc(a)}</div><div class="cell fit right">${esc(b)}</div></div>`)
      .join("")}</div>`;
  },
  // Ingredients that combine into a result.
  equation(spec) {
    const ops = spec.ops || spec.terms.slice(1).map(() => "+");
    return `<div class="equation">${spec.terms
      .map((t, i) => `${i ? `<div class="op">${esc(ops[i - 1])}</div>` : ""}${box(t, false)}`)
      .join("")}<div class="op eq">=</div>${box(spec.result, true)}</div>`;
  },
  // A loop of 3–5 stages around a center.
  cycle(spec) {
    const n = spec.nodes.length;
    const cx = 690;
    const cy = 650;
    const r = n > 4 ? 500 : 470;
    const bw = n > 4 ? 440 : 520;
    const bh = 290;
    const ang = (i) => -Math.PI / 2 + (i * 2 * Math.PI) / n;
    const gap = 0.5;
    const arcs = spec.nodes
      .map((_, i) => {
        const a0 = ang(i) + gap;
        const a1 = ang(i + 1) - gap;
        const p = (a) => `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;
        const large = a1 - a0 > Math.PI ? 1 : 0;
        return `<path d="M${p(a0)} A${r} ${r} 0 ${large} 1 ${p(a1)}" fill="none" stroke="#B8893A" stroke-width="9" stroke-linecap="round" marker-end="url(#head)"/>`;
      })
      .join("");
    const nodes = spec.nodes
      .map((nd, i) => {
        const x = cx + r * Math.cos(ang(i)) - bw / 2;
        const y = cy + r * Math.sin(ang(i)) - bh / 2;
        return `<div class="node" style="left:${x}px;top:${y}px;width:${bw}px;height:${bh}px">${box(nd, isHi(spec, i))}</div>`;
      })
      .join("");
    return `<div class="cycle"><svg width="1380" height="1280" viewBox="0 0 1380 1280"><defs><marker id="head" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#B8893A"/></marker></defs>${arcs}</svg>${
      spec.center ? `<div class="center fit" style="left:${cx - 170}px;top:${cy - 90}px">${esc(spec.center)}</div>` : ""
    }${nodes}</div>`;
  },
  // Horizontal bars (never money); values -100..100.
  bars(spec) {
    const vals = spec.bars.map((b) => b.value);
    const min = Math.min(0, ...vals);
    const max = Math.max(0, ...vals);
    const span = max - min || 1;
    const track = 860;
    const zero = (-min / span) * track;
    return `<div class="bars"><div class="rows"><div class="zero" style="left:${460 + zero}px"></div>${spec.bars
      .map((b, i) => {
        const w = (Math.abs(b.value) / span) * track;
        const left = b.value >= 0 ? zero : zero - w;
        return `<div class="bar-row"><div class="bar-label fit"><div>${esc(b.label)}</div>${b.note ? `<div class="bar-note">${esc(b.note)}</div>` : ""}</div><div class="track"><div class="bar ${isHi(spec, i) ? "hi" : ""} ${b.value < 0 ? "neg" : ""}" style="left:${left}px;width:${Math.max(w, 10)}px"></div></div></div>`;
      })
      .join("")}</div>${spec.axis ? `<div class="axis">${esc(spec.axis)}</div>` : ""}</div>`;
  },
  // 2×2 grid with two labelled axes.
  matrix(spec) {
    const q = spec.quadrants;
    const cell = (k) => box(q[k], spec.highlight === k);
    return `<div class="matrix"><div class="ylab fit"><span>${esc(spec.y.low)}</span><b>${esc(spec.y.label)} →</b><span>${esc(spec.y.high)}</span></div><div class="grid2">${cell("tl")}${cell("tr")}${cell("bl")}${cell("br")}</div><div class="xlab fit"><span>${esc(spec.x.low)}</span><b>${esc(spec.x.label)} →</b><span>${esc(spec.x.high)}</span></div></div>`;
  },
  // A set of 3–6 equal ideas.
  grid(spec) {
    return `<div class="cards n${spec.items.length}">${spec.items.map((it, i) => `<div class="card"><div class="num ${isHi(spec, i) ? "hi" : ""}">${i + 1}</div>${box(it, isHi(spec, i))}</div>`).join("")}</div>`;
  },
};

const CSS = `
@font-face{font-family:"Fraunces";src:url("${font("Fraunces-SemiBold.ttf")}");font-weight:600}
@font-face{font-family:"DM Sans";src:url("${font("DMSans-Medium.ttf")}");font-weight:500}
@font-face{font-family:"DM Sans";src:url("${font("DMSans-Bold.ttf")}");font-weight:700}
*{box-sizing:border-box;margin:0;padding:0}
body{width:${W}px;height:${H}px;background:#F4EDE0;color:#1A1814;font-family:"DM Sans";font-weight:500}
.page{position:relative;width:100%;height:100%;padding:100px 110px 90px;display:flex;flex-direction:column}
.kicker{font-weight:700;font-size:30px;letter-spacing:7px;text-transform:uppercase;color:#946A1C}
.kicker span{color:#5E564B}
h1{font-family:"Fraunces";font-weight:600;font-size:96px;line-height:1.04;letter-spacing:-1.5px;margin-top:26px}
.sub{font-size:42px;line-height:1.3;color:#5E564B;margin-top:22px}
main{flex:1;display:flex;align-items:center;justify-content:center;padding:50px 0 40px;min-height:0}
main>*{width:100%}
footer{border-top:6px solid #B8893A;padding-top:34px}
.take{font-family:"Fraunces";font-weight:600;font-size:58px;line-height:1.15;color:#1A1814}
.box{background:#FFFBF2;border:4px solid #1A1814;border-radius:22px;padding:24px 32px;flex:1;min-width:0;overflow:hidden}
.box.hi{background:#1A1814;color:#F4EDE0}
.label{font-family:"Fraunces";font-weight:600;font-size:60px;line-height:1.1}
.note{font-size:44px;line-height:1.25;margin-top:8px;color:#4A443B}
.box.hi .note{color:#E6DCC8}
.num{flex:none;width:92px;height:92px;border-radius:50%;background:#EAD9B0;border:4px solid #1A1814;display:grid;place-items:center;font-family:"Fraunces";font-weight:600;font-size:50px}
.num.hi{background:#B8893A}
.arrow{display:block;width:60px;height:60px;margin:6px 0 6px 16px;color:#B8893A}
.flow .row,.ladder .tread,.card{display:flex;align-items:center;gap:28px}
.ladder{display:flex;flex-direction:column;gap:22px}
.ladder .tread .box{border-bottom-width:12px}
.compare .heads,.compare .pair{display:grid;grid-template-columns:1fr 100px 1fr;align-items:stretch}
.compare .pair{grid-template-columns:1fr 1fr;gap:28px;margin-top:22px}
.compare .head{font-family:"Fraunces";font-weight:600;font-size:56px;padding:26px 28px;border:4px solid #1A1814;border-radius:22px;background:#EAD9B0;text-align:center;overflow:hidden}
.compare .head.hi{background:#1A1814;color:#F4EDE0}
.compare .vs{display:grid;place-items:center;font-family:"Fraunces";font-size:46px;color:#946A1C}
.compare .cell{font-size:44px;line-height:1.22;padding:20px 24px;background:#FFFBF2;border:3px solid #CDBFA7;border-radius:18px;overflow:hidden}
.compare .cell.right{border-color:#1A1814;border-width:4px}
.equation{display:flex;flex-direction:column;align-items:stretch;gap:0}
.equation .op{font-family:"Fraunces";font-size:84px;line-height:1;text-align:center;color:#946A1C;padding:8px 0}
.cycle{position:relative;width:1380px;height:1280px}
.cycle svg{position:absolute;inset:0}
.cycle .node{position:absolute;display:flex}
.cycle .node .box{display:flex;flex-direction:column;justify-content:center;text-align:center}
.cycle .center{position:absolute;width:340px;height:180px;display:grid;place-items:center;text-align:center;font-family:"Fraunces";font-size:50px;line-height:1.1;color:#946A1C;overflow:hidden}
.bars .rows{position:relative}
.bar-row{display:flex;align-items:center;gap:30px;min-height:130px;padding:12px 0}
.bar-label{flex:none;width:430px;text-align:right;font-family:"Fraunces";font-size:50px;line-height:1.25;padding:4px 0;overflow:hidden}
.track{position:relative;width:860px;height:100px}
.zero{position:absolute;top:0;bottom:0;width:6px;margin-left:-3px;background:#1A1814;z-index:1}
.bar{position:absolute;top:0;bottom:0;background:#CDBFA7;border:4px solid #1A1814;border-radius:10px}
.bar.hi{background:#B8893A}
.bar.neg{background:repeating-linear-gradient(45deg,#CDBFA7 0 14px,#FFFBF2 14px 28px)}
.bar-note{font-family:"DM Sans";font-size:38px;line-height:1.2;color:#4A443B;margin-top:6px}
.axis{margin-top:22px;padding-left:460px;font-weight:700;font-size:30px;letter-spacing:5px;text-transform:uppercase;color:#946A1C}
.matrix{display:grid;grid-template-columns:120px 1fr;grid-template-rows:1fr 120px}
.matrix .grid2{display:grid;grid-template-columns:1fr 1fr;gap:24px}
.matrix .grid2 .box{min-height:330px;display:flex;flex-direction:column;justify-content:center}
.ylab,.xlab{display:flex;justify-content:space-between;align-items:center;font-size:32px;color:#5E564B;overflow:hidden}
.ylab{writing-mode:vertical-rl;transform:rotate(180deg);padding:10px 0}
.xlab{grid-column:2;padding:0 10px}
.ylab b,.xlab b{font-weight:700;letter-spacing:4px;text-transform:uppercase;color:#946A1C;font-size:30px}
.cards{display:flex;flex-direction:column;gap:26px}
`;

function page(spec) {
  const body = TYPES[spec.type];
  if (!body) throw new Error(`unknown type "${spec.type}" (use: ${Object.keys(TYPES).join(", ")})`);
  return `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body><div class="page">
<div class="kicker">Value, Created <span>· ${esc(spec.kicker ?? `Chapter ${spec.chapter}`)}</span></div>
<h1>${esc(spec.title)}</h1>${spec.subtitle ? `<p class="sub">${esc(spec.subtitle)}</p>` : ""}
<main>${body(spec)}</main>
<footer><p class="take">${esc(spec.takeaway)}</p></footer>
</div></body></html>`;
}

// Scales the diagram up (≤1.3×) to fill its space, so text stays legible on phone-sized Kindle screens.
const GROW = () => {
  const main = document.querySelector("main");
  const el = main.firstElementChild;
  const box = () => {
    const m = main.getBoundingClientRect();
    const r = [...main.querySelectorAll("*")].map((e) => e.getBoundingClientRect());
    return { fits: Math.max(...r.map((x) => x.bottom)) <= m.bottom - 40 && Math.max(...r.map((x) => x.right)) <= document.body.clientWidth - 60 && [...document.querySelectorAll(".fit")].every((e) => e.scrollHeight <= e.clientHeight + 2 && e.scrollWidth <= e.clientWidth + 2) };
  };
  for (let s = 1.3; s > 1.0; s -= 0.05) {
    el.style.width = `${main.clientWidth / s}px`;
    el.style.zoom = s;
    if (box().fits) return s;
  }
  el.style.width = "";
  el.style.zoom = "";
  return 1;
};

// Fails on clipped text, or a diagram that runs past the takeaway rule.
const OVERFLOW = () => {
  const bad = [];
  document.querySelectorAll(".fit").forEach((el) => {
    if (el.scrollHeight > el.clientHeight + 2 || el.scrollWidth > el.clientWidth + 2) bad.push(`clipped: "${el.textContent.trim().slice(0, 60)}"`);
  });
  const main = document.querySelector("main").getBoundingClientRect();
  const kids = [...document.querySelectorAll("main *")].map((e) => e.getBoundingClientRect());
  const bottom = Math.max(...kids.map((r) => r.bottom));
  const right = Math.max(...kids.map((r) => r.right));
  if (bottom > main.bottom + 1) bad.push(`diagram is ${Math.round(bottom - main.bottom)}px too tall`);
  if (right > document.body.clientWidth - 60) bad.push(`diagram runs ${Math.round(right - (document.body.clientWidth - 60))}px off the right edge`);
  return bad;
};

function jobs() {
  const args = process.argv.slice(2);
  if (args[0] === "--examples") {
    const specs = JSON.parse(fs.readFileSync(path.join(ROOT, "tools", "examples.json"), "utf8"));
    const dir = path.join(ROOT, "out", "examples");
    return { dir, list: specs.map((spec, i) => ({ name: `example ${i + 1} (${spec.type})`, spec: { chapter: i + 1, ...spec }, out: path.join(dir, `ch${String(i + 1).padStart(2, "0")}.png`) })) };
  }
  const want = args.map(Number);
  const list = fs
    .readdirSync(SRC)
    .filter((f) => /^\d\d\.json$/.test(f))
    .filter((f) => !want.length || want.includes(Number(f.slice(0, 2))))
    .sort()
    .map((f) => ({ name: f, spec: { chapter: Number(f.slice(0, 2)), ...JSON.parse(fs.readFileSync(path.join(SRC, f), "utf8")) }, out: path.join(OUT, `ch${f.slice(0, 2)}.png`) }));
  return { dir: OUT, list };
}

async function main() {
  const { dir, list } = jobs();
  fs.mkdirSync(dir, { recursive: true });
  const browser = await chromium.launch();
  const tab = await browser.newPage({ viewport: { width: W, height: H } });
  const failures = [];
  for (const { name, spec, out } of list) {
    try {
      check(spec, name);
      await tab.setContent(page(spec), { waitUntil: "load" });
      const fontsOk = await tab.evaluate(async () => (await document.fonts.ready, ['600 50px "Fraunces"', '500 30px "DM Sans"'].every((f) => document.fonts.check(f))));
      if (!fontsOk) throw new Error(`${name}: brand fonts did not load`);
      await tab.evaluate(GROW);
      const bad = await tab.evaluate(OVERFLOW);
      if (bad.length) throw new Error(`${name}:\n  - ${bad.join("\n  - ")}`);
      const png = await tab.screenshot({ type: "png" });
      await sharp(png).png({ palette: true, colors: 96, effort: 10 }).toFile(out);
      console.log(`ok  ${path.relative(ROOT, out)}  ${(fs.statSync(out).size / 1024).toFixed(0)} KB`);
    } catch (e) {
      failures.push(e.message);
      console.error(`ERR ${e.message}`);
    }
  }
  await browser.close();
  await sheet(dir);
  if (failures.length) process.exit(1);
}

// Contact sheet of every rendered image, for review at a glance.
async function sheet(OUT) {
  const imgs = fs.readdirSync(OUT).filter((f) => /^ch\d\d\.png$/.test(f)).sort();
  if (!imgs.length) return;
  const tw = 400;
  const th = 500;
  const cols = 8;
  const rows = Math.ceil(imgs.length / cols);
  const tiles = await Promise.all(imgs.map((f) => sharp(path.join(OUT, f)).resize(tw, th).toBuffer()));
  await sharp({ create: { width: cols * tw, height: rows * th, channels: 3, background: "#888" } })
    .composite(tiles.map((input, i) => ({ input, left: (i % cols) * tw, top: Math.floor(i / cols) * th })))
    .png()
    .toFile(path.join(OUT, "sheet.png"));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
