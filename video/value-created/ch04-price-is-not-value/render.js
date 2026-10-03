/* node render.js [--sheet t1,t2,...] [--audio-only]: renders out/value-created-ch4-price-is-not-value.mp4 (soundtrack from music.py) or PNG stills. */
const fs = require('fs'), path = require('path'), { spawn, spawnSync } = require('child_process');
const { launch } = require('../../worth-it/02-engine/render/lib.js');
const args = process.argv.slice(2), opt = n => { const i = args.indexOf('--' + n); return i > -1 ? args[i + 1] : null; };
const fps = 30, out = path.join(__dirname, 'out');
fs.mkdirSync(out, { recursive: true });
(async () => {
  const browser = await launch();
  const page = await browser.newPage({ viewport: { width: 1100, height: 1100 } });
  page.on('pageerror', e => console.error('page error:', e.message));
  page.on('console', m => console.log('console:', m.text()));
  await page.goto('file://' + path.join(__dirname, 'index.html') + '?render');
  await page.evaluate(() => window.ready);
  const dur = await page.evaluate(() => window.DUR);
  if (opt('sheet')) {
    for (const t of opt('sheet').split(',').map(Number)) {
      const b64 = await page.evaluate(t => frame(t, 'image/png'), t);
      fs.writeFileSync(path.join(out, `f-${t.toFixed(2)}.png`), Buffer.from(b64, 'base64'));
    }
    await browser.close(); return;
  }
  fs.writeFileSync(path.join(out, 'cues.json'), JSON.stringify(await page.evaluate(() => cues())));
  const mus = spawnSync('python3', ['music.py'], { cwd: __dirname, encoding: 'utf8' });
  console.log(mus.stdout, mus.stderr);
  spawnSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', path.join(out, 'music-raw.wav'), '-af', 'loudnorm=I=-15:TP=-1.5:LRA=9', '-ar', '48000', path.join(out, 'music.wav')]);
  if (args.includes('--audio-only')) { await browser.close(); return; }
  const frames = Math.round(dur * fps), mp4 = path.join(out, 'value-created-ch4-price-is-not-value.mp4');
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-', '-i', path.join(out, 'music.wav'),
    '-filter_complex', '[0:v]scale=out_color_matrix=bt709:out_range=tv,format=yuv420p[v]', '-map', '[v]', '-map', '1:a',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-profile:v', 'high', '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709',
    '-r', String(fps), '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-movflags', '+faststart', '-t', (frames / fps).toFixed(3), mp4], { stdio: ['pipe', 'inherit', 'inherit'] });
  const done = new Promise((res, rej) => ff.on('close', c => c === 0 ? res() : rej(new Error('ffmpeg ' + c))));
  for (let i = 0; i < frames; i++) {
    const b64 = await page.evaluate(t => frame(t, 'image/jpeg', .96), i / fps);
    if (!ff.stdin.write(Buffer.from(b64, 'base64'))) await new Promise(r => ff.stdin.once('drain', r));
    if (i % 150 === 0) process.stdout.write(`\r${i}/${frames}`);
  }
  ff.stdin.end(); await done; await browser.close();
  console.log('\n' + mp4);
})().catch(e => { console.error(e); process.exit(1); });
