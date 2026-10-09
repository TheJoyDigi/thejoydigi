// Checks every email template against docs/brand/design-standard.md. Run: node scripts/email-brand-check.cjs
// Exit code 1 on any failure, so it can gate PRs.
const jiti = require("jiti")(__filename);
const { JOY, THEMES, STUDIO } = jiti("../src/lib/email/brand.ts");
const { welcomeEmail } = jiti("../src/lib/email/welcome.ts");
const { NEWSLETTER_SHOWS } = jiti("../src/lib/email/subscribe.ts");

const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

let fails = 0;
const row = (ok, label, detail = "") => {
  if (!ok) fails++;
  console.log(`  ${ok ? "PASS" : "FAIL"}  ${label}${detail ? `  (${detail})` : ""}`);
};

console.log("Umbrella (The Joy Digi)");
for (const [label, fg, bg, min] of [
  ["wordmark ink on sand", JOY.ink, JOY.sand, 4.5],
  ["footer text on sand", JOY.inkSoft, JOY.sand, 4.5],
]) {
  const r = contrast(fg, bg);
  row(r >= min, label, `${r.toFixed(2)}:1, need ${min}`);
}

for (const t of [STUDIO, ...Object.values(THEMES)]) {
  console.log(`\n${t.name}`);
  // Small text (<18.66px bold / <24px regular) needs 4.5:1; the 34px heading needs 3:1 (WCAG AA).
  for (const [label, fg, bg, min] of [
    ["body text on card", t.text, t.card, 4.5],
    ["muted text on card", t.muted, t.card, 4.5],
    ["muted text on RSS box", t.muted, t.subtle, 4.5],
    ["kicker on card", t.kicker, t.card, 4.5],
    ["heading on card", t.heading, t.card, 3],
    ["primary button label", t.onAccent, t.accent, 4.5],
    ["secondary button label", t.text, t.card, 4.5],
    ["secondary button border", t.outline, t.card, 3],
  ]) {
    const r = contrast(fg, bg);
    row(r >= min, label, `${r.toFixed(2)}:1, need ${min}`);
  }
}

// One welcome for the whole list, with an optional line for the show the reader signed up from.
for (const interest of [undefined, ...NEWSLETTER_SHOWS]) {
  console.log(`\nWelcome email (${interest ?? "no interest"})`);
  const e = welcomeEmail(`Sam <b>&</b>`, interest);
  const h = e.html;
  const kb = Buffer.byteLength(h) / 1024;
  row(kb < 90, "HTML under Gmail's ~102 KB clip limit", `${kb.toFixed(1)} KB`);
  row(/The Joy Digi<\/td>/.test(h), "umbrella header wordmark present");
  row(/is a production of <a[^>]*>The Joy Digi<\/a>/.test(h), "umbrella footer credit present");
  row(/href="mailto:[^"]+Unsubscribe/.test(h), "visible unsubscribe link");
  row(/display:none;max-height:0/.test(h), "hidden preheader present");
  row(h.includes("max-width:600px"), "600px max width");
  row(!/<script/i.test(h), "no <script>");
  row([...h.matchAll(/<img\b[^>]*>/g)].every((m) => /\balt="/.test(m[0])), "every <img> has alt");
  row([...h.matchAll(/<img\b[^>]*src="([^"]+)"/g)].every((m) => m[1].startsWith("https://")), "images are absolute https");
  row([...h.matchAll(/href="([^"]+)"/g)].every((m) => /^(https:\/\/|mailto:)/.test(m[1])), "links are https or mailto");
  row(!h.includes("<b>&</b>") && h.includes("&lt;b&gt;&amp;&lt;/b&gt;"), "subscriber name is HTML-escaped");
  const plain = welcomeEmail("Sam", interest).text;
  row(plain.length > 200 && !/<[a-z]/i.test(plain), "plain-text part present and tag-free");
  row(/^.+ <hello@thejoydigi\.com>$/.test(e.from), "from = '<Show> <hello@thejoydigi.com>'", e.from);
  row(e.subject.length <= 50, "subject ≤ 50 chars", e.subject);
}

console.log(`\n${fails ? `${fails} FAILED` : "All checks passed"}`);
process.exit(fails ? 1 : 0);
