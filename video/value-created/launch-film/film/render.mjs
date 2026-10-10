// node render.mjs --stills 1,5,10   |   node render.mjs --video out.mp4 [--fps 30]
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const OUT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../out");
fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ headless: true, args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"] });
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
page.on("console", (m) => { if (m.type() === "error") console.error("page:", m.text()); });
page.on("pageerror", (e) => console.error("pageerror:", e.message));
await page.goto("http://127.0.0.1:8765/film/index.html");
await page.evaluate(() => window.ready);
const canvas = await page.$("canvas");
const shot = async (t, f = 0) => { await page.evaluate(([t, f]) => window.renderFrame(t, f), [t, f]); return canvas.screenshot({ type: "png" }); };

if (opt("--stills")) {
  for (const s of opt("--stills").split(",").map(Number)) { fs.writeFileSync(`${OUT}/still-${s.toFixed(2)}.png`, await shot(s, Math.round(s * 30))); console.log("still", s); }
} else if (opt("--video")) {
  const fps = +opt("--fps", 30), dur = await page.evaluate(() => T.dur), n = Math.round(dur * fps);
  const ff = spawn("ffmpeg", ["-y", "-v", "error", "-f", "image2pipe", "-framerate", String(fps), "-i", "-", "-c:v", "libx264", "-preset", "slow", "-crf", "15", "-pix_fmt", "yuv420p", "-movflags", "+faststart", opt("--video")], { stdio: ["pipe", "inherit", "inherit"] });
  const t0 = Date.now();
  for (let f = 0; f < n; f++) {
    const buf = await shot(f / fps, f);
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once("drain", r));
    if (f % 60 === 0) console.log(`frame ${f}/${n}  ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  }
  ff.stdin.end(); await new Promise((r) => ff.on("close", r));
  console.log("video", opt("--video"));
}
await browser.close();
