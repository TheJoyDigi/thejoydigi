#!/usr/bin/env node
/* render.js: deterministic MP4 render of one built episode.
 *   node 02-engine/render/render.js 01-episodes/ep14-minimum-payment-trap [--fps 30] [--scale 3] [--crf 19] [--cover 1.6] [--query "?hook=B&t=0" --suffix -hookB]
 * Draws every frame with draw(t) at 1080x1920, renders the soundtrack offline, and muxes both with ffmpeg.
 * Output: <ep>/export/<slug>.mp4 (master, crf 19), <slug>-share.mp4 (720p, under 15 MB), <slug>-cover.png (all git-ignored, see video/.gitignore).
 * Needs ffmpeg and playwright (found locally or in the npx cache). */
const fs = require('fs'), os = require('os'), path = require('path'), { spawn, spawnSync } = require('child_process');

const { launch, openEpisode, resolveEp } = require('./lib');

const args = process.argv.slice(2);
const epArg = args.find(a => !a.startsWith('--'));
const opt = (n, d) => { const i = args.indexOf('--' + n); return i > -1 ? args[i + 1] : d; };
if (!epArg) { console.error('usage: render.js <episode folder>'); process.exit(1); }
const root = path.resolve(__dirname, '..', '..');
const epDir = resolveEp(epArg);
const meta = JSON.parse(fs.readFileSync(path.join(epDir, 'page.json'), 'utf8'));
const fps = +opt('fps', 30), scale = +opt('scale', 3);
const outDir = path.join(epDir, 'export'), suffix = opt('suffix', '');
fs.mkdirSync(outDir, { recursive: true });

(async () => {
  const browser = await launch();
  const page = await openEpisode(browser, epDir, meta.slug, opt('query', '?t=0'));
  await page.evaluate(s => TT.scale(s), scale);
  const dur = await page.evaluate(() => TT.DUR), frames = Math.ceil(dur * fps);
  console.log(`rendering ${frames} frames at ${fps} fps, ${360 * scale}x${640 * scale}, ${dur.toFixed(2)} s`);

  const wavB64 = await page.evaluate(() => TT.renderAudio(48000));
  const wav = path.join(outDir, meta.slug + suffix + '.wav');
  fs.writeFileSync(wav, Buffer.from(wavB64, 'base64'));

  /* loudness pass 1: measure, so pass 2 can normalize linearly and land on -14 LUFS exactly */
  const meas = spawnSync('ffmpeg', ['-hide_banner', '-nostats', '-i', wav, '-af', 'loudnorm=I=-14:TP=-1.5:LRA=7:print_format=json', '-f', 'null', '-'], { encoding: 'utf8' }).stderr;
  const L = JSON.parse(meas.slice(meas.lastIndexOf('{'), meas.lastIndexOf('}') + 1));
  const norm = `loudnorm=I=-14:TP=-1.5:LRA=7:measured_I=${L.input_i}:measured_TP=${L.input_tp}:measured_LRA=${L.input_lra}:measured_thresh=${L.input_thresh}:offset=${L.target_offset}:linear=true`;
  const mp4 = path.join(outDir, meta.slug + suffix + '.mp4');
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-', '-i', wav,
    '-filter_complex', `[0:v]scale=out_color_matrix=bt709:out_range=tv,format=yuv420p[v];[1:a]${norm},aresample=48000[a]`,
    '-map', '[v]', '-map', '[a]', '-c:v', 'libx264', '-preset', 'slow', '-crf', String(opt('crf', 19)), '-profile:v', 'high', '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709',
    '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', '-t', dur.toFixed(3), mp4], { stdio: ['pipe', 'inherit', 'inherit'] });
  const done = new Promise((res, rej) => { ff.on('close', c => c === 0 ? res() : rej(new Error('ffmpeg exit ' + c))); });

  for (let i = 0; i < frames; i++) {
    const b64 = await page.evaluate(t => TT.frameData(t, 'image/jpeg', 0.95), i / fps);
    if (!ff.stdin.write(Buffer.from(b64, 'base64'))) await new Promise(r => ff.stdin.once('drain', r));
    if (i % 60 === 0) process.stdout.write(`\r${i}/${frames}`);
  }
  ff.stdin.end();
  await done;
  const cover = await page.evaluate(t => TT.cover(t), +opt('cover', 1.6));  /* 1.6 s: both hook lines, the shock face and the stamp are all on screen */
  fs.writeFileSync(path.join(outDir, meta.slug + suffix + '-cover.png'), Buffer.from(cover, 'base64'));
  await browser.close();
  /* a lighter 720p copy for phones, Slack and review (under 15 MB) */
  const share = path.join(outDir, meta.slug + suffix + '-share.mp4');
  spawnSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', mp4, '-vf', 'scale=720:1280:flags=lanczos', '-c:v', 'libx264', '-preset', 'medium', '-crf', '24', '-pix_fmt', 'yuv420p', '-c:a', 'copy', '-movflags', '+faststart', share]);
  console.log(`wrote ${share} (${(fs.statSync(share).size / 1048576).toFixed(1)} MB)`);
  const st = fs.statSync(mp4);
  console.log(`\nwrote ${mp4} (${(st.size / 1048576).toFixed(1)} MB)`);
  const probe = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'stream=codec_name,width,height,r_frame_rate,duration', '-of', 'compact', mp4]);
  console.log(String(probe.stdout));
})().catch(e => { console.error(e); process.exit(1); });
