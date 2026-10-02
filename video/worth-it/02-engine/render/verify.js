#!/usr/bin/env node
/* verify.js: frame fingerprints, to prove a refactor did not change the picture.
 *   node 02-engine/render/verify.js <ep> --save before.json
 *   node 02-engine/render/verify.js <ep> --check before.json      (exit 1 on any difference)
 * Hashes the canvas pixels at 40 evenly spaced times, for each hook variant. */
const fs = require('fs'), crypto = require('crypto'), path = require('path');
const { launch, openEpisode, resolveEp } = require('./lib');
const args = process.argv.slice(2), opt = n => { const i = args.indexOf('--' + n); return i > -1 ? args[i + 1] : null; };
const epDir = resolveEp(args.find(a => !a.startsWith('--')));
const meta = JSON.parse(fs.readFileSync(path.join(epDir, 'page.json'), 'utf8'));
(async () => {
  const browser = await launch(), out = {};
  for (const hook of ['A', 'B', 'C']) {
    const page = await openEpisode(browser, epDir, meta.slug, `?hook=${hook}&t=0`);
    const dur = await page.evaluate(() => TT.DUR);
    for (let i = 0; i < 40; i++) {
      const t = +(0.05 + i * (dur - 0.1) / 39).toFixed(3);
      if (hook !== 'A' && t > 2.5) break;
      const b64 = await page.evaluate(x => TT.frameData(x, 'image/png'), t);
      out[hook + '@' + t] = crypto.createHash('sha1').update(b64).digest('hex').slice(0, 16);
    }
    await page.close();
  }
  await browser.close();
  if (opt('save')) { fs.writeFileSync(opt('save'), JSON.stringify(out, null, 1)); console.log('saved', Object.keys(out).length, 'frame hashes'); }
  if (opt('check')) {
    const ref = JSON.parse(fs.readFileSync(opt('check'), 'utf8'));
    const diff = Object.keys(ref).filter(k => ref[k] !== out[k]);
    console.log(diff.length ? 'DIFFERENT frames: ' + diff.join(', ') : 'identical: all ' + Object.keys(ref).length + ' frames match');
    process.exit(diff.length ? 1 : 0);
  }
})().catch(e => { console.error(e); process.exit(1); });
