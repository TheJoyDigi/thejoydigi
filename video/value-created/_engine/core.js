/* Shared engine for the Value, Created chapter videos; a chapter's scene.js supplies the config globals listed in README.md. */
const cv = document.getElementById('c'), ctx = cv.getContext('2d');
const W = 1080, H = 1080;
const C = {
  paper: '#F4EDE0', ink: '#1A1814', ink2: '#5E564B', faint: '#CDBFA7',
  gold: '#B8893A', goldText: '#946A1C', goldL: '#DDB65F', night: '#16130F', cream: '#F4EDE0', fill: '#3A342C'
};

/* WARP is [design, real] pairs from the chapter */
function mapT(x, from, to) {
  for (let i = 0; i < WARP.length - 1; i++) {
    const a = WARP[i], b = WARP[i + 1];
    if (x <= b[from] || i === WARP.length - 2) return a[to] + (b[to] - a[to]) * (x - a[from]) / (b[from] - a[from]);
  }
}
const toDesign = r => mapT(r, 1, 0), toReal = d => mapT(d, 0, 1);

const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const prog = (t, a, d) => clamp((t - a) / d);
const eo = x => 1 - Math.pow(1 - clamp(x), 3);
const eio = x => { x = clamp(x); return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
const eback = x => { x = clamp(x); const c1 = 1.7, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
const lerp = (a, b, p) => a + (b - a) * p;
const env = (t, a, b, fin = .45, fout = .4) => eo(prog(t, a, fin)) * (1 - eio(prog(t, b, fout)));
const rnd = n => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

/* sound cues in design time; exported in real time for music.py */
const CUES = [];
const cue = (t, type, o) => CUES.push(Object.assign({ t, type }, o || {}));

/* paper grain: static so it compresses well */
const grain = document.createElement('canvas'); grain.width = W; grain.height = H;
(() => {
  const g = grain.getContext('2d'), id = g.createImageData(W, H); let s = 20261003;
  for (let i = 0; i < id.data.length; i += 4) {
    s = (s * 1664525 + 1013904223) >>> 0; const v = s / 4294967296;
    const c = v < .5 ? 0 : 255; id.data[i] = id.data[i + 1] = id.data[i + 2] = c; id.data[i + 3] = Math.abs(v - .5) * 22;
  }
  g.putImageData(id, 0, 0);
})();

function font(kind, size, weight) {
  return kind === 'sans' ? `${weight || 500} ${size}px "DM Sans"` : `${weight || 600} ${size}px "Fraunces"`;
}

/* largest font size (≤ size) at which str fits in maxW; [brackets] are ignored like line() does */
function fit(str, maxW, size, kind, weight, track) {
  ctx.save(); ctx.letterSpacing = (track || 0) + 'px';
  const s = str.replace(/[\[\]]/g, '');
  let px = size;
  for (; px > 12; px--) { ctx.font = font(kind, px, weight); if (ctx.measureText(s).width <= maxW) break; }
  ctx.restore();
  return px;
}

/* Kinetic line: words pop in with overshoot. [bracketed] words render gold. */
function line(t, str, x, y, o) {
  const size = o.size || 64, start = o.start, end = o.end == null ? 1e9 : o.end, stag = o.stagger == null ? .09 : o.stagger;
  ctx.save();
  ctx.font = font(o.font, size, o.weight);
  ctx.letterSpacing = (o.track || 0) + 'px';
  let gold = false;
  const toks = str.split(' ').map(w => {
    if (w.startsWith('[')) gold = true;
    const tok = { w: w.replace(/[\[\]]/g, ''), g: gold };
    if (w.endsWith(']')) gold = false;
    return tok;
  });
  const sp = ctx.measureText(' ').width;
  toks.forEach(k => k.wd = ctx.measureText(k.w).width);
  const total = toks.reduce((a, k) => a + k.wd, 0) + sp * (toks.length - 1);
  let cx = o.align === 'left' ? x : x - total / 2;
  const out = 1 - eio(prog(t, end, .35));
  toks.forEach((k, i) => {
    const p = prog(t, start + i * stag, .38);
    const a = clamp(p * 2.5) * out * (o.alpha == null ? 1 : o.alpha);
    if (a > .001) {
      const s = lerp(.5, 1, eback(p)) * lerp(1, .92, 1 - out);
      ctx.save();
      ctx.globalAlpha = a;
      ctx.translate(cx + k.wd / 2, y - size * .33 + (1 - eo(p)) * size * .55 - (1 - out) * size * .35);
      ctx.rotate((1 - eo(p)) * (i % 2 ? .08 : -.08));
      ctx.scale(s, s);
      ctx.fillStyle = k.g ? (o.goldColor || C.goldText) : (o.color || C.ink);
      ctx.fillText(k.w, -k.wd / 2, size * .33);
      ctx.restore();
    }
    cx += k.wd + sp;
  });
  ctx.restore();
  return { x0: o.align === 'left' ? x : x - total / 2, w: total };
}

function rr(x, y, w, h, r) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); }

function label(str, x, y, a, color, size, align) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.font = font('sans', size || 30, 700); ctx.letterSpacing = '5px';
  ctx.textAlign = align || 'center'; ctx.fillStyle = color || C.ink; ctx.fillText(str, x + (align ? 0 : 2.5), y); ctx.restore();
}

/* deterministic spark burst */
function burst(t, tb, x, y, n, seed, color, speed, life) {
  const dt = t - tb; if (dt < 0 || dt > life) return;
  ctx.save(); ctx.fillStyle = color;
  for (let i = 0; i < n; i++) {
    const a = rnd(seed + i) * Math.PI * 2, sp = speed * (.35 + .65 * rnd(seed + i + 99));
    const d = sp * (1 - Math.exp(-dt * 5)) / 5, px = x + Math.cos(a) * d, py = y + Math.sin(a) * d + 160 * dt * dt;
    const r = (3 + 5 * rnd(seed + i + 7)) * (1 - dt / life);
    ctx.globalAlpha = 1 - dt / life;
    ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();
}
function ring(t, tb, x, y, r0, r1, color, life, lw) {
  const p = (t - tb) / life; if (p < 0 || p > 1) return;
  ctx.save(); ctx.globalAlpha = 1 - p; ctx.strokeStyle = color; ctx.lineWidth = (lw || 8) * (1 - p);
  ctx.beginPath(); ctx.arc(x, y, lerp(r0, r1, eo(p)), 0, Math.PI * 2); ctx.stroke(); ctx.restore();
}

function background() {
  ctx.fillStyle = C.paper; ctx.fillRect(0, 0, W, H);
  const g = ctx.createRadialGradient(W / 2, H / 2, 300, W / 2, H / 2, 820);
  g.addColorStop(0, 'rgba(255,250,240,0)'); g.addColorStop(1, 'rgba(120,90,40,0.10)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.drawImage(grain, 0, 0);
}

function camera(t) {
  let sx = 0, sy = 0, z = 1;
  IMPACTS.forEach(([ti, amp]) => {
    const dt = t - ti; if (dt < 0 || dt > .7) return;
    const e = Math.exp(-dt * 9);
    sx += amp * e * Math.sin(dt * 75); sy += amp * e * Math.cos(dt * 61);
    z += amp * .0028 * Math.exp(-dt * 12);
  });
  const seg = KB.find(([a, b]) => t >= a && t < b);
  if (seg) z *= 1 + .035 * eio((t - seg[0]) / (seg[1] - seg[0]));
  ctx.translate(W / 2 + sx, H / 2 + sy); ctx.scale(z, z); ctx.translate(-W / 2, -H / 2);
}

function kicker(t) {
  const a = env(t, -.2, KICKER_END, .6, .3);
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a;
  ctx.font = font('sans', 26, 700); ctx.letterSpacing = '5px'; ctx.fillStyle = C.goldText;
  ctx.fillText('VALUE, CREATED', 72, 96);
  const w = ctx.measureText('VALUE, CREATED').width;
  ctx.fillStyle = C.ink2; ctx.fillText('CHAPTER ' + CHAPTER, 72 + w + 26, 96);
  ctx.fillStyle = C.gold; ctx.fillRect(72 + w + 6, 85, 9, 3);
  ctx.restore();
}

/* ink panel that sweeps across and hides the cut */
function swipe(t) {
  SWIPES.forEach(tc => {
    const q = prog(t, tc - .38, .76); if (q <= 0 || q >= 1) return;
    const xL = lerp(-2.0 * W, 1.25 * W, eio(q)), wd = 1.7 * W, sk = .25 * W;
    const poly = (x0, x1, col) => {
      ctx.fillStyle = col; ctx.beginPath();
      ctx.moveTo(x0 + sk, 0); ctx.lineTo(x1 + sk, 0); ctx.lineTo(x1, H); ctx.lineTo(x0, H); ctx.closePath(); ctx.fill();
    };
    poly(xL, xL + wd, C.night);
    poly(xL + wd - 10, xL + wd + 34, C.goldL);
    poly(xL - 26, xL + 4, C.gold);
  });
}

function progressBar(t, real) {
  if (t > BAR_END) return;
  ctx.fillStyle = 'rgba(26,24,20,0.08)'; ctx.fillRect(0, H - 8, W, 8);
  ctx.fillStyle = C.gold; ctx.fillRect(0, H - 8, W * real / toReal(BAR_END), 8);
}

function draw(real) {
  const t = toDesign(real);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalAlpha = 1; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
  background();
  ctx.save();
  camera(t);
  kicker(t);
  SCENES.forEach(s => s(t));
  ctx.restore();
  swipe(t);
  END_CARD(t);
  progressBar(t, real);
}

function boot() {
  const DUR = WARP[WARP.length - 1][1];
  window.DUR = DUR;
  window.toReal = toReal; window.toDesign = toDesign;
  window.cues = () => ({
    dur: DUR,
    cues: CUES.map(c => Object.assign({}, c, { t: toReal(c.t), d: c.d ? toReal(c.t + c.d) - toReal(c.t) : undefined })).sort((a, b) => a.t - b.t),
    markers: Object.fromEntries(Object.entries(MARKERS).map(([k, v]) => [k, toReal(v)]))
  });
  window.frame = (t, type, q) => { draw(t); return cv.toDataURL(type || 'image/jpeg', q || .95).split(',')[1]; };
  window.ready = Promise.all(['600 20px "Fraunces"', '500 20px "DM Sans"', '700 20px "DM Sans"'].map(f => document.fonts.load(f))).then(() => draw(0));
  let t0 = null;
  if (!/render/.test(location.search)) requestAnimationFrame(function loop(ts) { if (t0 === null) t0 = ts; draw(((ts - t0) / 1000) % DUR); requestAnimationFrame(loop); });
}
