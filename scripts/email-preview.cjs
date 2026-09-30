// Renders every show's email templates to .email-previews/ for review. Run: node scripts/email-preview.cjs [outDir]
// jiti (already installed via Tailwind) lets this plain-Node script load the TypeScript templates.
const jiti = require("jiti")(__filename);
const { mkdirSync, writeFileSync } = require("node:fs");
const { resolve } = require("node:path");

const { THEMES } = jiti("../src/lib/email/brand.ts");
const { welcomeEmail } = jiti("../src/lib/email/welcome.ts");

const out = resolve(process.argv[2] || ".email-previews");
mkdirSync(out, { recursive: true });
const index = [];
for (const slug of Object.keys(THEMES)) {
  const e = welcomeEmail(slug, "Sam");
  writeFileSync(`${out}/welcome-${slug}.html`, e.html);
  writeFileSync(`${out}/welcome-${slug}.txt`, `From: ${e.from}\nSubject: ${e.subject}\n\n${e.text}\n`);
  index.push(`<li><a href="welcome-${slug}.html">${e.subject}</a> (<a href="welcome-${slug}.txt">text</a>)</li>`);
}
writeFileSync(`${out}/index.html`, `<!doctype html><meta charset="utf-8"><title>Email previews</title><ul>${index.join("")}</ul>`);
console.log(`wrote ${index.length} templates to ${out}`);
