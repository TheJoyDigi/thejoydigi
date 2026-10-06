/* node _engine/render.js <episode-folder> [--sheet t1,t2,...] [--safe] [--audio-only]: cuts the clip, then renders out/<slug>.mp4 (or PNG stills). */
const fs = require('fs'), path = require('path'), os = require('os'), { spawn, spawnSync } = require('child_process');
const { launch } = require('../../worth-it/02-engine/render/lib.js');
const args = process.argv.slice(2), opt = n => { const i = args.indexOf('--' + n); return i > -1 ? args[i + 1] : null; };
const epArg = args.find((a, i) => !a.startsWith('--') && args[i - 1] !== '--sheet');
if (!epArg) { console.error('usage: render.js <episode-folder> [--sheet t1,t2] [--safe] [--audio-only]'); process.exit(1); }
const epDir = path.resolve(epArg), ep = path.basename(epDir);
for (const f of ['clip.json', 'scene.js']) if (!fs.existsSync(path.join(epDir, f))) { console.error(`no ${f} in ${epDir}`); process.exit(1); }
const slug = 'incentives-decoded-' + ep.replace(/^ep0?(\d+)/, 'l$1');
const fps = 30, out = path.join(epDir, 'out'), ff = a => spawnSync('ffmpeg', ['-y', '-loglevel', 'error', ...a]);
const PY = fs.existsSync(path.join(os.homedir(), '.venvs/whisper/bin/python')) ? path.join(os.homedir(), '.venvs/whisper/bin/python') : 'python3';
fs.mkdirSync(out, { recursive: true });

function tile(inputs, dest, cols, size) {
  const list = path.join(out, 'list.txt');
  fs.writeFileSync(list, inputs.map(f => `file '${f}'`).join('\n'));
  ff(['-f', 'concat', '-safe', '0', '-i', list, '-vf', `scale=${size}:-2,tile=${cols}x${Math.ceil(inputs.length / cols)}:padding=6:color=gray`, '-frames:v', '1', dest]);
}

(async () => {
  const prep = spawnSync(PY, [path.join(__dirname, 'prep.py'), epDir], { encoding: 'utf8' });
  if (prep.status !== 0) { console.error(prep.stderr || prep.stdout); process.exit(1); }
  console.log(prep.stdout.trim().split('\n').pop());
  const browser = await launch();
  const page = await browser.newPage({ viewport: { width: 700, height: 1250 } });
  let failed = false;
  page.on('pageerror', e => { failed = true; console.error('page error:', e.message); });
  page.on('console', m => console.log('console:', m.text()));
  await page.goto('file://' + path.join(__dirname, 'index.html') + '?render&ep=' + encodeURIComponent(ep));
  await page.waitForFunction(() => window.ready || window.__err, null, { timeout: 30000 }).catch(() => {});
  const loadErr = await page.evaluate(() => window.__err || (window.ready ? null : 'page never became ready'));
  if (failed || loadErr) { if (loadErr) console.error('load error:', loadErr); await browser.close(); process.exit(1); }
  await page.evaluate(() => window.ready);
  const dur = await page.evaluate(() => window.DUR);
  if (opt('sheet')) {
    const ts = opt('sheet').split(',').map(Number);
    for (const f of fs.readdirSync(out)) if (/^f-.*\.png$/.test(f)) fs.unlinkSync(path.join(out, f));
    const files = [];
    for (const t of ts) {
      const f = path.join(out, `f-${t.toFixed(2)}.png`);
      fs.writeFileSync(f, Buffer.from(await page.evaluate(([t, safe]) => frame(t, 'image/png', 1, safe), [t, args.includes('--safe')]), 'base64'));
      files.push(f);
    }
    tile(files, path.join(out, 'sheet.png'), Math.min(5, files.length), 360);
    console.log(`${files.length} stills (${ts.join(', ')} s of ${dur.toFixed(2)}) -> ${path.join(out, 'sheet.png')}`);
    await browser.close(); return;
  }
  fs.writeFileSync(path.join(out, 'cues.json'), JSON.stringify(await page.evaluate(() => cues())));
  const mix = spawnSync('python3', [path.join(__dirname, 'mix.py')], { cwd: epDir, encoding: 'utf8' });
  if (mix.status !== 0) { console.error(mix.stderr); process.exit(1); }
  console.log(mix.stdout.trim());
  ff(['-i', path.join(out, 'mix-raw.wav'), '-af', 'loudnorm=I=-14:TP=-1.5:LRA=9', '-ar', '48000', path.join(out, 'mix.wav')]);
  if (args.includes('--audio-only')) { await browser.close(); return; }
  const frames = Math.round(dur * fps), mp4 = path.join(out, slug + '.mp4');
  const enc = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-', '-i', path.join(out, 'mix.wav'),
    '-filter_complex', '[0:v]scale=out_color_matrix=bt709:out_range=tv,format=yuv420p[v]', '-map', '[v]', '-map', '1:a',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-profile:v', 'high', '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709',
    '-r', String(fps), '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-movflags', '+faststart', '-t', (frames / fps).toFixed(3), mp4], { stdio: ['pipe', 'inherit', 'inherit'] });
  const done = new Promise((res, rej) => enc.on('close', c => c === 0 ? res() : rej(new Error('ffmpeg ' + c))));
  for (let i = 0; i < frames; i++) {
    const b64 = await page.evaluate(t => frame(t, 'image/jpeg', .95), i / fps);
    if (!enc.stdin.write(Buffer.from(b64, 'base64'))) await new Promise(r => enc.stdin.once('drain', r));
    if (i % 150 === 0) process.stdout.write(`\r${i}/${frames}`);
  }
  enc.stdin.end(); await done;
  fs.writeFileSync(path.join(out, 'cover.png'), Buffer.from(await page.evaluate(() => frame(1.5, 'image/png', 1)), 'base64'));
  await browser.close();
  /* checks: format, loudness, and a 30-frame contact sheet of the finished file */
  const probe = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'stream=codec_name,width,height,r_frame_rate:format=duration,size', '-of', 'compact', mp4], { encoding: 'utf8' }).stdout.trim();
  const lufs = (spawnSync('ffmpeg', ['-hide_banner', '-nostats', '-i', mp4, '-af', 'ebur128', '-f', 'null', '-'], { encoding: 'utf8' }).stderr.match(/I:\s+(-?[\d.]+) LUFS/g) || []).pop();
  ff(['-i', mp4, '-vf', `fps=30/${dur},scale=216:-2,tile=10x3:padding=4:color=gray`, '-frames:v', '1', path.join(out, 'mp4sheet.png')]);
  const exp = path.join(__dirname, '..', 'exports'); fs.mkdirSync(exp, { recursive: true });
  fs.copyFileSync(mp4, path.join(exp, slug + '.mp4')); fs.copyFileSync(path.join(out, 'cover.png'), path.join(exp, slug + '-cover.png'));
  console.log(`\n${mp4}\n${probe}\n${lufs}\ncontact sheet: ${path.join(out, 'mp4sheet.png')}\nexport: ${path.join(exp, slug + '.mp4')}`);
})().catch(e => { console.error(e); process.exit(1); });
