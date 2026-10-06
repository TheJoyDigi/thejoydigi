// Checks every chapter against STYLE.md's structure and banned-content rules.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const curriculum = fs.readFileSync(path.resolve(ROOT, "../../podcast/shows/value-created/curriculum.md"), "utf8");
const titles = Object.fromEntries([...curriculum.matchAll(/^(\d+)\. (.+?) — /gm)].map((m) => [Number(m[1]), m[2].replace(/"/g, "")]));

const BANNED = [
  [/\b(Alex|Jordan)\b/, "host name"],
  [/\bLong La\b|\bLong\b(?= (says|said|built|wrote))/, "personal byline"],
  [/Nextdoor|Blue Sock|Orange County/i, "named business or place"],
  [/\b(podcast|episode|listeners?|as you listen|listening to (this|us)|tune in|welcome to|thanks for|next time)\b/i, "podcast phrasing"],
  [/\b[Cc]hapter (one|two|three|four|five|six|seven|eight|nine|ten|\d+)\b/, "chapter cross-reference by number"],
  [/produced by/i, "credit line"],
  [/^###|<[a-z]|\|.*\|/m, "unsupported Markdown"],
];

let problems = 0;
const warn = (n, msg) => (problems++, console.log(`ch${String(n).padStart(2, "0")}: ${msg}`));
const stats = [];
for (let n = 1; n <= 32; n++) {
  const file = path.join(ROOT, "manuscript", `${String(n).padStart(2, "0")}.md`);
  if (!fs.existsSync(file)) {
    warn(n, "missing");
    continue;
  }
  const src = fs.readFileSync(file, "utf8");
  const h1 = src.match(/^# (.+)$/m)?.[1];
  if (h1 !== titles[n]) warn(n, `title "${h1}" ≠ curriculum "${titles[n]}"`);
  if ((src.match(/^# /gm) || []).length !== 1) warn(n, "needs exactly one H1");
  if ((src.match(/\{\{infographic\}\}/g) || []).length !== 1) warn(n, "needs exactly one {{infographic}}");
  if ((src.match(/^> /gm) || []).length !== 1) warn(n, `needs exactly one pull quote (has ${(src.match(/^> /gm) || []).length})`);
  if (!/^## The takeaways$/m.test(src)) warn(n, "missing ## The takeaways");
  const h2 = [...src.matchAll(/^## (.+)$/gm)].map((m) => m[1]);
  const tryThis = h2.includes("Try this");
  for (const [re, what] of BANNED) {
    for (const line of src.split("\n")) {
      const m = line.match(re);
      if (m) warn(n, `${what}: "…${line.slice(Math.max(0, m.index - 40), m.index + 50)}…"`);
    }
  }
  const words = src.split(/\s+/).filter(Boolean).length;
  const dashes = (src.match(/—/g) || []).length;
  stats.push({ n, words, h2: h2.length, tryThis, dashes });
}
console.log(stats.map((s) => `${String(s.n).padStart(2)} ${String(s.words).padStart(5)}w  ${s.h2} h2  try:${s.tryThis ? "y" : "n"}  —:${s.dashes}`).join("\n"));
console.log(`total ${stats.reduce((a, s) => a + s.words, 0)} words; ${problems} problem(s)`);
process.exit(problems ? 1 : 0);
