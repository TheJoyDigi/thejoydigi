// Shared by build.mjs (EPUB) and print.mjs (paperback PDF) so both editions render the manuscript identically.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const MS = path.join(ROOT, "manuscript");
export const OUT = path.join(ROOT, "out");
export const NUM = ["One", "Two", "Three", "Four", "Five"];
export const pad = (n) => String(n).padStart(2, "0");
export const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Marked has already escaped quotes in text tokens, so decode those before curling them.
export const smart = (s) =>
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

export function figure(id, src) {
  const spec = JSON.parse(fs.readFileSync(path.join(ROOT, "infographics", `${id}.json`), "utf8"));
  const items = (spec.terms || spec.steps || spec.nodes || spec.items || spec.bars || []).map((it) => (it.note ? `${it.label}: ${it.note}` : it.label));
  if (spec.result) items.push(`Result, ${spec.result.label}: ${spec.result.note}`);
  if (spec.rows) items.push(...spec.rows.map(([a, b]) => `${spec.left}: ${a}; ${spec.right}: ${b}`));
  if (spec.quadrants) items.push(...Object.values(spec.quadrants).map((q) => `${q.label}: ${q.note}`));
  const alt = `Infographic: ${spec.title}. ${items.join(". ")}. ${spec.takeaway}`.replace(/\.\./g, ".");
  return `<figure class="infographic"><img src="${src(id)}" alt="${esc(alt)}"/></figure>`;
}

// Markdown → XHTML body; returns the H1 text separately. `img(id)` gives each infographic's image path.
export function render(file, figId, img) {
  const src = fs.readFileSync(path.join(MS, file), "utf8");
  const m = src.match(/^# (.+)\n/);
  if (!m) throw new Error(`${file}: must start with "# Title"`);
  let html = marked.parse(src.slice(m[0].length));
  const marks = html.match(/<p>\{\{infographic(?::(\d\d))?\}\}<\/p>/g) || [];
  if (figId && marks.length !== 1) throw new Error(`${file}: needs exactly one {{infographic}} (found ${marks.length})`);
  html = html.replace(/<p>\{\{infographic(?::(\d\d))?\}\}<\/p>/g, (_, id) => figure(id || figId, img));
  // XHTML: close void elements.
  html = html.replace(/<(br|hr|img)([^>]*?)\s*\/?>/g, "<$1$2/>");
  if (/\{\{|<table|<h3/.test(html)) throw new Error(`${file}: unsupported Markdown (see STYLE.md)`);
  return { title: smart(m[1].trim()), html };
}
