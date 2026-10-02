#!/usr/bin/env node
/* sheet.js: contact sheet of an episode, for QA and review.
 *   node 02-engine/render/sheet.js <episode folder> [--times 0.3,2,5,...] [--cols 5] [--w 216] [--balance] [--safe] [--out file.png] [--query "?hook=B"]
 * Draws frames from draw(t) into one PNG. --safe overlays the platform UI zones (see 02-engine/render/safezone.json). */
const fs = require('fs'), path = require('path');
const { launch, openEpisode, resolveEp } = require('./lib');
const args = process.argv.slice(2);
const epArg = args.find(a => !a.startsWith('--'));
const opt = (n, d) => { const i = args.indexOf('--' + n); return i > -1 ? args[i + 1] : d; };
const root = path.resolve(__dirname, '..', '..');
const epDir = resolveEp(epArg);
const meta = JSON.parse(fs.readFileSync(path.join(epDir, 'page.json'), 'utf8'));
const cols = +opt('cols', 5), safe = args.includes('--safe'), cw = +opt('w', 216);
const zones = fs.existsSync(path.join(__dirname, 'safezone.json')) ? JSON.parse(fs.readFileSync(path.join(__dirname, 'safezone.json'), 'utf8')) : null;
/* --balance: where does the visual detail sit? Edge energy per vertical third, per frame, then the average. */
async function balance() {
  const browser = await launch();
  const page = await openEpisode(browser, epDir, meta.slug, opt('query', '?t=0'));
  const dur = await page.evaluate(() => TT.DUR);
  const times = opt('times', '') ? opt('times').split(',').map(Number) : Array.from({ length: 28 }, (_, i) => +(0.3 + i * (dur - 0.6) / 27).toFixed(2));
  const rows = await page.evaluate(times => {
    const cv = document.getElementById('cv'), W = 90, H = 160, c = document.createElement('canvas'); c.width = W; c.height = H;
    const g = c.getContext('2d', { willReadFrequently: true });
    return times.map(t => {
      TT.draw(t); g.drawImage(cv, 0, 0, W, H);
      const d = g.getImageData(0, 0, W, H).data, L = (x, y) => { const i = (y * W + x) * 4; return .3 * d[i] + .59 * d[i + 1] + .11 * d[i + 2]; };
      const th = [0, 0, 0]; let tot = 0;
      for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
        const e = Math.abs(L(x + 1, y) - L(x - 1, y)) + Math.abs(L(x, y + 1) - L(x, y - 1));
        th[Math.min(2, Math.floor(y / (H / 3)))] += e; tot += e;
      }
      return th.map(v => v / tot);
    });
  }, times);
  const avg = [0, 1, 2].map(i => rows.reduce((a, r) => a + r[i], 0) / rows.length);
  console.log('share of visual detail   top   middle   bottom   (ideal is about 0.33 / 0.34 / 0.33; the bottom third is the app-UI zone)');
  rows.forEach((r, i) => console.log(`t=${String(times[i]).padEnd(6)} ${r.map(v => v.toFixed(2).padStart(8)).join('')}`));
  console.log(`average  ${avg.map(v => v.toFixed(2).padStart(8)).join('')}`);
  await browser.close();
}

const out = opt('out', path.join(epDir, 'export', meta.slug + (safe ? '-safe' : '') + '-sheet.png'));
fs.mkdirSync(path.dirname(out), { recursive: true });

(async () => {
  if (args.includes('--balance')) { await balance(); return; }
  const browser = await launch();
  const page = await openEpisode(browser, epDir, meta.slug, opt('query', '?t=0'));
  const dur = await page.evaluate(() => TT.DUR);
  const times = opt('times', '') ? opt('times').split(',').map(Number) : Array.from({ length: 15 }, (_, i) => +(0.3 + i * (dur - 0.6) / 14).toFixed(2));
  const b64 = await page.evaluate(({ times, cols, safe, zones, cw }) => {
    const cv = document.getElementById('cv'), w = cw, h = Math.round(cw * 16 / 9), rows = Math.ceil(times.length / cols);
    const sheet = document.createElement('canvas'); sheet.width = cols * w; sheet.height = rows * h;
    const g = sheet.getContext('2d');
    times.forEach((tm, i) => {
      TT.draw(tm);
      const x = (i % cols) * w, y = Math.floor(i / cols) * h;
      g.drawImage(cv, x, y, w, h);
      if (safe && zones) { /* zones are fractions of the frame; red = covered by app UI */
        g.fillStyle = 'rgba(255,0,60,.28)';
        (zones.caution || []).forEach(r => { g.fillStyle = 'rgba(255,170,0,.22)'; g.fillRect(x + r[0] * w, y + r[1] * h, (r[2] - r[0]) * w, (r[3] - r[1]) * h); });
        g.fillStyle = 'rgba(255,0,60,.28)';
        zones.rects.forEach(r => g.fillRect(x + r[0] * w, y + r[1] * h, (r[2] - r[0]) * w, (r[3] - r[1]) * h));
      }
      g.fillStyle = 'rgba(0,0,0,.6)'; g.fillRect(x, y, 70, 18);
      g.fillStyle = '#fff'; g.font = '12px sans-serif'; g.fillText(tm.toFixed(1) + 's', x + 6, y + 13);
    });
    return sheet.toDataURL('image/png').split(',')[1];
  }, { times, cols, safe, zones, cw });
  fs.writeFileSync(out, Buffer.from(b64, 'base64'));
  await browser.close();
  console.log('wrote', out);
})().catch(e => { console.error(e); process.exit(1); });
