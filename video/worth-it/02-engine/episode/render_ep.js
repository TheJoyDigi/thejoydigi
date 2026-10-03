/* render_ep.js: render one template episode to MP4. usage: node 02-engine/episode/render_ep.js <episode dir>
   1080x1920, 30 fps, H.264 + AAC. Frames come from the page's drawDemo(t) at 3x; audio is the page's own mix rendered offline. */
const fs = require('fs'), path = require('path'), { spawn, spawnSync } = require('child_process');
const lib = require(path.join(__dirname, '..', 'render', 'lib.js'));
const vcfg = JSON.parse(fs.readFileSync(path.join(path.resolve(process.argv[2]), 'voice.json'), 'utf8'));
const voice = (vcfg.label || vcfg.voice).toLowerCase();
const ep = path.resolve(process.argv[2]);
const cfg = fs.readFileSync(path.join(ep, 'episode.js'), 'utf8');
const outDir = path.join(ep, 'export');
const slug = /slug:'([^']+)'/.exec(cfg)[1];
const FPS = 30, LUFS = -16;
fs.mkdirSync(outDir, { recursive: true });
const f = n => path.join(outDir, n);

(async () => {
  const browser = await lib.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
  page.on('pageerror', e => console.error('page error:', e.message));
  await page.goto('file://' + path.join(ep, 'dist', slug + '.html') + '?hq=1');
  await page.evaluate(() => Promise.all(['400 20px "Russo One"', '700 20px "Rajdhani"', '400 20px "Bangers"', '700 20px "Fraunces"', '500 10px "DM Sans"', '500 9px "Figtree"'].map(x => document.fonts.load(x, 'Worth it. The Joy Digi 0123'))));
  await page.evaluate(() => window.WL && WL.fontsReady ? WL.fontsReady.then(() => 1) : 1);
  await page.waitForTimeout(500);
  const dur = await page.evaluate(() => WL.DUR), size = await page.evaluate(() => [document.querySelector('#cv').width, 0]);
  const frames = Math.round(dur * FPS);
  console.log(`rendering ${frames} frames (${dur}s) at 1080x1920, voice ${voice}`);

  /* cover (the hook: boss panel plus Wren's face, just before the hit) */
  fs.writeFileSync(f(slug + '-cover.png'), Buffer.from(await page.evaluate(() => WL.framePng(Math.max(.5, (WL.shots[0].hit || 1.25) - .35))), 'base64'));

  /* video */
  const silent = f(slug + '-silent.mp4');
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', '-vf', 'scale=in_range=full:out_range=tv:out_color_matrix=bt709,format=yuv420p', '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-profile:v', 'high', '-r', String(FPS), '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-color_range', 'tv', '-movflags', '+faststart', silent], { stdio: ['pipe', 'inherit', 'inherit'] });
  const done = new Promise(r => ff.on('close', r));
  const t0 = Date.now();
  for (let i = 0; i < frames; i++) {
    const b64 = await page.evaluate(n => WL.frameJpeg(n / 30, .95), i);
    if (!ff.stdin.write(Buffer.from(b64, 'base64'))) await new Promise(r => ff.stdin.once('drain', r));
    if (i % 120 === 0) console.log(`frame ${i}/${frames}  ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  }
  ff.stdin.end(); await done;
  console.log('video done', ((Date.now() - t0) / 1000).toFixed(0) + 's');

  /* captions from the narration plan */
  const plan = await page.evaluate(() => WL.PLAN);
  const ts = x => { const ms = Math.round(x * 1000); return `${String(Math.floor(ms / 3600000)).padStart(2, '0')}:${String(Math.floor(ms / 60000) % 60).padStart(2, '0')}:${String(Math.floor(ms / 1000) % 60).padStart(2, '0')},${String(ms % 1000).padStart(3, '0')}`; };
  fs.writeFileSync(f(`${slug}-${voice}.srt`), plan.map((l, i) => `${i + 1}\n${ts(l.start)} --> ${ts(Math.max(l.end, l.start + .8))}\n${l.text}\n`).join('\n'));
  /* audio: the page's own mix, rendered offline */
  const pcm = f(slug + '-mix.pcm');
  fs.writeFileSync(pcm, Buffer.from(await page.evaluate(v => window.renderMixPCM(48000)), 'base64'));
  await browser.close();

  const raw = ['-f', 's16le', '-ar', '48000', '-ac', '2', '-i', pcm];
  const meas = spawnSync('ffmpeg', ['-hide_banner', '-nostats', ...raw, '-af', `loudnorm=I=${LUFS}:TP=-1.5:LRA=7:print_format=json`, '-f', 'null', '-'], { encoding: 'utf8' }).stderr;
  const L = JSON.parse(meas.slice(meas.lastIndexOf('{'), meas.lastIndexOf('}') + 1));
  const norm = `loudnorm=I=${LUFS}:TP=-1.5:LRA=7:measured_I=${L.input_i}:measured_TP=${L.input_tp}:measured_LRA=${L.input_lra}:measured_thresh=${L.input_thresh}:offset=${L.target_offset}:linear=true,afade=t=out:st=${(dur - .5).toFixed(2)}:d=0.5`;
  const wav = f(slug + '-mix.wav');
  let r = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', ...raw, '-af', norm, '-ar', '48000', wav], { encoding: 'utf8' });
  if (r.status) throw new Error(r.stderr);
  const master = f(`${slug}-${voice}.mp4`);
  r = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', silent, '-i', wav, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-t', String(dur), '-movflags', '+faststart', master], { encoding: 'utf8' });
  if (r.status) throw new Error(r.stderr);
  const share = f(`${slug}-${voice}-share.mp4`);
  r = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', master, '-vf', 'scale=720:1280:flags=lanczos', '-c:v', 'libx264', '-preset', 'medium', '-crf', '24', '-pix_fmt', 'yuv420p', '-c:a', 'copy', '-movflags', '+faststart', share], { encoding: 'utf8' });
  if (r.status) throw new Error(r.stderr);
  fs.unlinkSync(pcm);
  const mb = p => (fs.statSync(p).size / 1048576).toFixed(1) + ' MB';
  console.log(`wrote ${master} (${mb(master)})\nwrote ${share} (${mb(share)})\nwrote ${silent} (${mb(silent)})\nwrote ${f(slug + '-cover.png')}\nwrote ${f(`${slug}-${voice}.srt`)}`);
})().catch(e => { console.error(e); process.exit(1); });
