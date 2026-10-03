/* node _engine/render.js <chapter-folder> [--sheet t1,t2,...] [--design] [--audio-only] [--warp]: renders <chapter>/out/<slug>.mp4 or PNG stills. */
const fs = require('fs'), path = require('path'), { spawn, spawnSync } = require('child_process');
const { launch } = require('../../worth-it/02-engine/render/lib.js');
const args = process.argv.slice(2), opt = n => { const i = args.indexOf('--' + n); return i > -1 ? args[i + 1] : null; };
const chArg = args.find((a, i) => !a.startsWith('--') && args[i - 1] !== '--sheet');
if (!chArg) { console.error('usage: render.js <chapter-folder> [--sheet t1,t2] [--design] [--audio-only] [--warp]'); process.exit(1); }
const chDir = path.resolve(chArg), ch = path.basename(chDir);
if (!fs.existsSync(path.join(chDir, 'scene.js'))) { console.error(`no scene.js in ${chDir}`); process.exit(1); }
const slug = 'value-created-' + ch.replace(/^ch0?(\d+)/, 'ch$1');
const fps = 30, out = path.join(chDir, 'out'), ff = a => spawnSync('ffmpeg', ['-y', '-loglevel', 'error', ...a]);
fs.mkdirSync(out, { recursive: true });

/* tile PNG stills (or a video) into one contact sheet */
function tile(inputs, dest, cols, size) {
  const list = path.join(out, 'list.txt');
  fs.writeFileSync(list, inputs.map(f => `file '${f}'`).join('\n'));
  ff(['-f', 'concat', '-safe', '0', '-i', list, '-vf', `scale=${size}:${size},tile=${cols}x${Math.ceil(inputs.length / cols)}:padding=4:color=gray`, '-frames:v', '1', dest]);
}

(async () => {
  const browser = await launch();
  const page = await browser.newPage({ viewport: { width: 1100, height: 1100 } });
  page.on('pageerror', e => console.error('page error:', e.message));
  page.on('console', m => console.log('console:', m.text()));
  await page.goto('file://' + path.join(__dirname, 'index.html') + '?render&ch=' + encodeURIComponent(ch));
  await page.waitForFunction(() => window.ready); await page.evaluate(() => window.ready);
  const dur = await page.evaluate(() => window.DUR);
  if (args.includes('--warp')) {
    console.log(`duration ${dur} s real\ndesign -> real`);
    console.log((await page.evaluate(() => WARP)).map(([d, r]) => `${String(d).padStart(6)} -> ${r}`).join('\n'));
    await browser.close(); return;
  }
  if (opt('sheet')) {
    let ts = opt('sheet').split(',').map(Number);
    if (args.includes('--design')) ts = await page.evaluate(ts => ts.map(toReal), ts);
    for (const f of fs.readdirSync(out)) if (/^f-.*\.png$/.test(f)) fs.unlinkSync(path.join(out, f));
    const files = [];
    for (const t of ts) {
      const f = path.join(out, `f-${t.toFixed(2)}.png`);
      fs.writeFileSync(f, Buffer.from(await page.evaluate(t => frame(t, 'image/png'), t), 'base64'));
      files.push(f);
    }
    tile(files, path.join(out, 'sheet.png'), Math.min(6, files.length), 330);
    console.log(`${files.length} stills (real s: ${ts.map(t => t.toFixed(2)).join(', ')}) -> ${path.join(out, 'sheet.png')}`);
    await browser.close(); return;
  }
  fs.writeFileSync(path.join(out, 'cues.json'), JSON.stringify(await page.evaluate(() => cues())));
  const mus = spawnSync('python3', [path.join(__dirname, 'music.py')], { cwd: chDir, encoding: 'utf8' });
  if (mus.status !== 0) { console.error(mus.stderr); process.exit(1); }
  console.log(mus.stdout.trim());
  ff(['-i', path.join(out, 'music-raw.wav'), '-af', 'loudnorm=I=-15:TP=-1.5:LRA=9', '-ar', '48000', path.join(out, 'music.wav')]);
  if (args.includes('--audio-only')) { await browser.close(); return; }
  const frames = Math.round(dur * fps), mp4 = path.join(out, slug + '.mp4');
  const enc = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-', '-i', path.join(out, 'music.wav'),
    '-filter_complex', '[0:v]scale=out_color_matrix=bt709:out_range=tv,format=yuv420p[v]', '-map', '[v]', '-map', '1:a',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-profile:v', 'high', '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709',
    '-r', String(fps), '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-movflags', '+faststart', '-t', (frames / fps).toFixed(3), mp4], { stdio: ['pipe', 'inherit', 'inherit'] });
  const done = new Promise((res, rej) => enc.on('close', c => c === 0 ? res() : rej(new Error('ffmpeg ' + c))));
  for (let i = 0; i < frames; i++) {
    const b64 = await page.evaluate(t => frame(t, 'image/jpeg', .96), i / fps);
    if (!enc.stdin.write(Buffer.from(b64, 'base64'))) await new Promise(r => enc.stdin.once('drain', r));
    if (i % 150 === 0) process.stdout.write(`\r${i}/${frames}`);
  }
  enc.stdin.end(); await done; await browser.close();
  /* checks: format, loudness, and a 32-frame contact sheet of the finished file */
  const probe = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'stream=codec_name,width,height,r_frame_rate:format=duration,size', '-of', 'compact', mp4], { encoding: 'utf8' }).stdout.trim();
  const lufs = (spawnSync('ffmpeg', ['-hide_banner', '-nostats', '-i', mp4, '-af', 'ebur128', '-f', 'null', '-'], { encoding: 'utf8' }).stderr.match(/I:\s+(-?[\d.]+) LUFS/g) || []).pop();
  ff(['-i', mp4, '-vf', `fps=32/${dur},scale=240:240,tile=8x4:padding=4:color=gray`, '-frames:v', '1', path.join(out, 'mp4sheet.png')]);
  console.log(`\n${mp4}\n${probe}\n${lufs}\ncontact sheet: ${path.join(out, 'mp4sheet.png')}`);
})().catch(e => { console.error(e); process.exit(1); });
