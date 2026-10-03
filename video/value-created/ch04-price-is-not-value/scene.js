/* Value, Created Ch 4 LinkedIn infographic: scenes run in design time and WARP maps real time onto it, so retiming is one array. */
const cv = document.getElementById('c'), ctx = cv.getContext('2d');
const W = 1080, H = 1080;
const C = {
  paper: '#F4EDE0', ink: '#1A1814', ink2: '#5E564B', faint: '#CDBFA7',
  gold: '#B8893A', goldText: '#946A1C', goldL: '#DDB65F', night: '#16130F', cream: '#F4EDE0', fill: '#3A342C'
};

/* [design, real] pairs */
const WARP = [[0, 0], [7, 4.9], [12.5, 8.7], [19.5, 13.6], [25, 17.4], [30.5, 21.2], [37, 25.8], [46.6, 32.6], [52.5, 37.6]];
const DUR = WARP[WARP.length - 1][1];
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

/* ---------- timeline constants shared by visuals and cues ---------- */
const TAGS = [1.7, 2.3, 2.9];
const SHUFFLE = [10.4, 10.8, 11.2, 11.6], SHUF_N = [42, 51, 37, 46, 42];
const LAPS = [14.0, 15.3, 16.6];
const lapPrice = t => 40 + 20 * eback(prog(t, LAPS[1], .5)) - 25 * eback(prog(t, LAPS[2], .5));
const VALUE_HIT = 20.9;
const GAP_DOWN = 26.5, GAP_FLIP = 28.3;
const CARDS = [31.4, 31.9, 32.4, 32.9];
const SWIPES = [7.0, 25.0, 37.0];
const IMPACTS = [[TAGS[0] + .25, 4], [TAGS[1] + .25, 6], [TAGS[2] + .25, 11], [9.25, 9], ...SHUFFLE.map(s => [s, 3]),
  [13.0, 5], [VALUE_HIT, 15], [GAP_DOWN + .4, 6], [27.2, 9], [GAP_FLIP + .4, 6], ...CARDS.map((s, i) => [s + .15, 4 + i]),
  [37.5, 3], [38.5, 3], [39.5, 3], [42.0, 6], [43.05, 12], [47.55, 7]];
const KB = [[0, 7], [7, 25], [25, 37], [37, 46.6]];

/* sound cues (design time); exported in real time for music.py */
const CUES = [];
const cue = (t, type, o) => CUES.push(Object.assign({ t, type }, o || {}));
cue(0, 'impact', { v: .6 }); cue(.02, 'pop', { f: 1 });
[.45, .6, .75].forEach((x, i) => cue(x + .1, 'blip', { n: [55, 59, 62][i] }));
[1.0, 1.15, 1.3].forEach(x => cue(x, 'tick', { f: 2 }));
TAGS.forEach((x, i) => { cue(x + .15, 'whoosh', { v: .25 }); cue(x + .25, 'blip', { n: [64, 69, 76][i] }); });
cue(TAGS[2] + .25, 'impact', { v: .8 }); cue(TAGS[2] + .25, 'chime', { n: 76 });
cue(3.7, 'pop', { f: 1 }); cue(4.75, 'thud'); [4.8, 4.95].forEach(x => cue(x, 'tick', { f: 0 }));
SWIPES.forEach(x => cue(x - .3, 'whoosh', { v: 1 }));
cue(7.25, 'pop', { f: 1.2 }); cue(7.9, 'pop', { f: .9 });
cue(8.4, 'whoosh', { v: .4 }); cue(9.25, 'impact', { v: .85 }); cue(9.25, 'chime', { n: 72 });
SHUFFLE.forEach((s, i) => { cue(s, 'tick', { f: i % 2 }); cue(s + .02, 'blip', { n: [67, 62, 69, 64][i] }); });
cue(12.7, 'pop', { f: 1 }); cue(13.0, 'thud'); cue(13.4, 'pop', { f: 1.2 });
cue(LAPS[0], 'whoosh', { v: .3 }); cue(LAPS[0] + .2, 'thud');
cue(LAPS[1], 'swish'); cue(LAPS[1] + .05, 'blip', { n: 76 });
cue(LAPS[2], 'whoosh', { v: .35 }); cue(LAPS[2] + .05, 'blip', { n: 57 });
(() => { let last = 40; for (let x = LAPS[1]; x < LAPS[2] + .8; x += .01) { const p = Math.round(lapPrice(x)); if (Math.abs(p - last) >= 3) { cue(x, 'tick', { f: 2 }); last = p; } } })();
cue(19.4, 'riser', { d: VALUE_HIT - 19.4 }); cue(19.7, 'pop', { f: 1 });
cue(VALUE_HIT, 'boom', { v: 1 }); cue(VALUE_HIT, 'chime', { n: 79 }); cue(21.8, 'swish'); cue(22.3, 'tick', { f: 2 });
cue(25.3, 'pop', { f: 1.2 }); cue(25.6, 'swish'); cue(25.9, 'swish');
cue(GAP_DOWN, 'whoosh', { v: .35 }); cue(GAP_DOWN + .4, 'thud');
cue(27.2, 'impact', { v: .8 }); cue(27.2, 'chime', { n: 76 });
cue(GAP_FLIP, 'whoosh', { v: .4 }); cue(GAP_FLIP + .4, 'thud'); cue(28.7, 'pop', { f: .8 });
cue(30.7, 'pop', { f: 1 });
CARDS.forEach((s, i) => { cue(s, 'whoosh', { v: .2 }); cue(s + .15, 'blip', { n: [60, 64, 67, 72][i] }); cue(s + .15, 'thud'); });
cue(37.3, 'tick', { f: 2 });
[37.4, 38.4, 39.4].forEach((s, i) => { cue(s + .1, 'blip', { n: [67, 71, 74][i] }); cue(s + .1, 'pop', { f: 1 }); });
cue(41.6, 'whoosh', { v: .35 }); cue(42.0, 'thud'); cue(43.05, 'impact', { v: .9 }); cue(43.9, 'swish');
cue(46.3, 'whoosh', { v: 1 });
[47.3, 47.45].forEach((x, i) => cue(x + .1, 'blip', { n: [72, 79][i] }));
cue(47.55, 'boom', { v: .9 }); cue(47.6, 'chime', { n: 72 });
cue(48.9, 'pop', { f: .9 });
const MARKERS = { groove: 7.0, breakdown: 19.4, drop: VALUE_HIT, end: 46.4 };

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
  const a = env(t, -.2, 46.2, .6, .3);
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a;
  ctx.font = font('sans', 26, 700); ctx.letterSpacing = '5px'; ctx.fillStyle = C.goldText;
  ctx.fillText('VALUE, CREATED', 72, 96);
  const w = ctx.measureText('VALUE, CREATED').width;
  ctx.fillStyle = C.ink2; ctx.fillText('CHAPTER 4', 72 + w + 26, 96);
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
  if (t > 46.4) return;
  ctx.fillStyle = 'rgba(26,24,20,0.08)'; ctx.fillRect(0, H - 8, W, 8);
  ctx.fillStyle = C.gold; ctx.fillRect(0, H - 8, W * real / toReal(46.4), 8);
}

/* hanging price tag, hole at the origin */
function tag(text, w, h, gold, size) {
  ctx.beginPath();
  ctx.moveTo(0, -26); ctx.lineTo(w / 2, -2); ctx.lineTo(w / 2, h - 10); ctx.quadraticCurveTo(w / 2, h, w / 2 - 10, h);
  ctx.lineTo(-w / 2 + 10, h); ctx.quadraticCurveTo(-w / 2, h, -w / 2, h - 10); ctx.lineTo(-w / 2, -2); ctx.closePath();
  ctx.fillStyle = gold ? C.goldL : '#FFFBF3'; ctx.fill();
  ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.stroke();
  ctx.beginPath(); ctx.arc(0, -4, 7, 0, Math.PI * 2); ctx.fillStyle = C.paper; ctx.fill(); ctx.lineWidth = 3; ctx.stroke();
  ctx.font = font('serif', size || 48); ctx.textAlign = 'center'; ctx.fillStyle = C.ink;
  ctx.fillText(text, 0, h * .62 + (size || 48) * .2);
  ctx.textAlign = 'left';
}

/* ---------- S1: same water, three prices (0 – 7) ---------- */
const BX = [250, 540, 830], BB = 800;
function bottle(x, s) {
  ctx.save(); ctx.translate(x, BB); ctx.scale(s, s); ctx.translate(-x, -BB);
  rr(x - 49, BB - 170, 98, 164, 20); ctx.fillStyle = 'rgba(58,52,44,0.12)'; ctx.fill();
  ctx.lineWidth = 6; ctx.strokeStyle = C.ink;
  rr(x - 55, BB - 230, 110, 230, 26); ctx.stroke();
  rr(x - 26, BB - 282, 52, 56, 10); ctx.stroke();
  rr(x - 31, BB - 306, 62, 26, 6); ctx.fillStyle = C.ink; ctx.fill();
  ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 55, BB - 150); ctx.lineTo(x + 55, BB - 150); ctx.moveTo(x - 55, BB - 96); ctx.lineTo(x + 55, BB - 96); ctx.stroke();
  ctx.restore();
}
function scene1(t) {
  if (t > 7.2) return;
  line(t, 'Same bottle of water.', W / 2, 220, { size: 84, start: -.62, stagger: .12, end: 3.45 });
  line(t, 'Did the water [change?]', W / 2, 220, { size: 84, start: 3.7, stagger: .1, end: 6.55 });
  line(t, 'No.', W / 2, 310, { size: 70, color: C.ink2, start: 4.7, end: 6.55 });
  const out = 1 - eio(prog(t, 6.55, .35));
  ctx.save(); ctx.globalAlpha = out;
  BX.forEach((x, i) => { const s = eback(prog(t, .45 + i * .15, .4)); if (s > 0) bottle(x, s); });
  const eq = eback(prog(t, 4.8, .3));
  if (eq > 0) {
    ctx.font = font('serif', 80 * eq); ctx.textAlign = 'center'; ctx.fillStyle = C.goldText;
    [395, 685].forEach(x => ctx.fillText('=', x, 690));
    ctx.textAlign = 'left';
  }
  TAGS.forEach((tt, i) => {
    const p = prog(t, tt, .25); if (p <= 0) return;
    const dt = Math.max(0, t - tt - .25), sc = [1, 1.18, 1.4][i];
    const ang = .5 * Math.exp(-dt * 3.5) * Math.cos(dt * 9) * (p >= 1 ? 1 : 0) + (1 - p) * -.4;
    ctx.save();
    ctx.translate(BX[i] + 4, BB - 262 - 420 * (1 - eo(p)));
    ctx.rotate(ang); ctx.scale(sc, sc);
    tag(['50¢', '$5', '$20'][i], 108, 96, i === 2);
    ctx.restore();
  });
  ring(t, TAGS[2] + .25, BX[2], BB - 200, 40, 300, C.gold, .7, 10);
  burst(t, TAGS[2] + .25, BX[2], BB - 200, 20, 41, C.goldL, 1000, .8);
  ctx.restore();
  ['GROCERY', 'AIRPORT', 'CONCERT'].forEach((s, i) => label(s, BX[i], 870, out * eo(prog(t, 1.0 + i * .15, .3)), i === 2 ? C.goldText : C.ink2, 26));
}

/* ---------- S2: a price is a rumor (7 – 12.5) ---------- */
function scene2(t) {
  if (t < 7 || t > 12.6) return;
  line(t, 'A price is a [rumor,]', W / 2, 230, { size: 84, start: 7.25, end: 12.1 });
  line(t, 'not a fact.', W / 2, 320, { size: 70, color: C.ink2, start: 7.9, end: 12.1 });
  const out = 1 - eio(prog(t, 12.1, .35)), cy = 600;
  const inP = eo(prog(t, 8.4, .45)), lp = eio(prog(t, 8.85, .4));
  const pulse = i => 1 + SHUFFLE.reduce((a, s, k) => a + (t > s && (k + i) % 2 === 0 ? .18 * Math.exp(-(t - s) * 9) : 0), 0);
  ctx.save(); ctx.globalAlpha = out;
  const bx = lerp(-80, 300, inP), sx = lerp(W + 80, 780, inP);
  ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.setLineDash([2, 16]); ctx.lineCap = 'round';
  if (lp > 0) {
    ctx.beginPath(); ctx.moveTo(bx + 70, cy); ctx.lineTo(lerp(bx + 70, W / 2 - 60, lp), cy);
    ctx.moveTo(sx - 70, cy); ctx.lineTo(lerp(sx - 70, W / 2 + 60, lp), cy); ctx.stroke();
  }
  ctx.setLineDash([]);
  [[bx, C.ink, 0], [sx, C.fill, 1]].forEach(([x, col, i]) => {
    ctx.save(); ctx.translate(x, cy); const s = pulse(i); ctx.scale(s, s);
    ctx.beginPath(); ctx.arc(0, 0, 62, 0, Math.PI * 2); ctx.fillStyle = col; ctx.fill(); ctx.restore();
  });
  const tp = eback(prog(t, 9.1, .3));
  if (tp > 0) {
    const n = SHUF_N[SHUFFLE.filter(s => t >= s).length];
    const kick = 1 + SHUFFLE.reduce((a, s) => a + (t > s ? .22 * Math.exp(-(t - s) * 12) : 0), 0);
    ctx.save(); ctx.translate(W / 2, cy - 70); ctx.scale(tp * kick, tp * kick);
    ctx.rotate(.08 * Math.sin(t * 3));
    tag('$' + n, 120, 110, true, 52);
    ctx.restore();
  }
  ring(t, 9.25, W / 2, cy, 40, 320, C.gold, .7, 10);
  ctx.restore();
  label('BUYER', 300, 712, out * inP, C.ink, 26);
  label('SELLER', 780, 712, out * inP, C.ink, 26);
  label('ONE MOMENT', W / 2, 712, out * eo(prog(t, 9.5, .3)), C.goldText, 26);
}

/* ---------- S3: the business sat still, the price ran laps (12.5 – 19.5) ---------- */
function scene3(t) {
  if (t < 12.5 || t > 19.7) return;
  line(t, 'The business sat still.', W / 2, 220, { size: 76, start: 12.7, end: 19.1 });
  line(t, 'The [price] ran laps.', W / 2, 305, { size: 76, start: 13.4, end: 19.1 });
  const out = 1 - eio(prog(t, 19.1, .35));
  const bp = eback(prog(t, 13.0, .4));
  ctx.save(); ctx.globalAlpha = out;
  if (bp > 0) {
    ctx.save(); ctx.translate(W / 2, 890); ctx.scale(bp, bp);
    const g = ctx.createLinearGradient(0, -160, 0, 0); g.addColorStop(0, C.goldL); g.addColorStop(1, C.gold);
    rr(-190, -160, 380, 160, 16); ctx.fillStyle = g; ctx.fill();
    ctx.restore();
  }
  const p = prog(t, LAPS[0], .35);
  if (p > 0) {
    const price = lapPrice(t), ty = 560 - (price - 35) * 8 - 420 * (1 - eo(p));
    const bottom = ty + 96 * 1.15;
    ctx.strokeStyle = C.ink; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(W / 2, bottom);
    const zig = 10, span = 730 - bottom;
    for (let k = 1; k < zig; k++) ctx.lineTo(W / 2 + (k % 2 ? 18 : -18), bottom + span * k / zig);
    ctx.lineTo(W / 2, 730); ctx.stroke();
    ctx.save(); ctx.translate(W / 2, ty); ctx.scale(1.15, 1.15); ctx.rotate(.06 * Math.sin(t * 5) * (1 - prog(t, LAPS[2] + 1, .5)));
    tag('$' + Math.round(price), 120, 96, false, 50);
    ctx.restore();
    const m = LAPS.filter(s => t >= s).length - 1, mp = 1 + .3 * Math.exp(-(t - LAPS[m]) * 10);
    ctx.save(); ctx.translate(330, ty + 70); ctx.scale(mp, mp);
    ctx.font = font('sans', 34, 700); ctx.letterSpacing = '4px'; ctx.textAlign = 'center'; ctx.fillStyle = C.ink2;
    ctx.fillText(['JAN', 'JUN', 'OCT'][Math.max(0, m)], 0, 0);
    ctx.restore();
  }
  ctx.restore();
  label('THE BUSINESS', W / 2, 822, out * eo(prog(t, 13.2, .3)), C.ink, 26);
}

/* ---------- S4: price is what you pay (19.5 – 25) ---------- */
function scene4(t) {
  if (t < 19.5 || t > 25.2) return;
  const end = 24.6;
  line(t, 'Price is what you pay.', W / 2, 420, { size: 82, start: 19.7, stagger: .07, end });
  const r = line(t, '[Value is what you get.]', W / 2, 545, { size: 82, start: VALUE_HIT - .15, stagger: .07, end });
  const u = eio(prog(t, 21.8, .4)) * (1 - eio(prog(t, end, .35)));
  if (u > 0) { ctx.fillStyle = C.gold; ctx.fillRect(r.x0, 578, r.w * u, 8); }
  label('WARREN BUFFETT', W / 2, 680, env(t, 22.3, end, .3), C.ink2, 26);
  burst(t, VALUE_HIT, W / 2, 600, 18, 909, C.goldL, 900, .8);
  ring(t, VALUE_HIT, W / 2, 500, 200, 700, C.gold, .8, 12);
}

/* ---------- S5: the gap is the opportunity (25 – 30.5) ---------- */
function scene5(t) {
  if (t < 25 || t > 30.6) return;
  line(t, 'The gap is the [opportunity.]', W / 2, 220, { size: 76, start: 25.3, end: 30.1 });
  const out = 1 - eio(prog(t, 30.1, .35));
  const x0 = 170, x1 = 800, vy = 520;
  const py = vy + 240 * eback(prog(t, GAP_DOWN, .4)) - 390 * eback(prog(t, GAP_FLIP, .4));
  const vw = eio(prog(t, 25.6, .4)), pw = eio(prog(t, 25.9, .4));
  ctx.save(); ctx.globalAlpha = out;
  if (Math.abs(py - vy) > 4 && pw >= 1) {
    const below = py > vy;
    ctx.fillStyle = below ? 'rgba(221,182,95,0.28)' : 'rgba(26,24,20,0.07)';
    ctx.fillRect(x0, Math.min(py, vy), x1 - x0, Math.abs(py - vy));
  }
  ctx.fillStyle = C.gold; ctx.fillRect(x0, vy - 7, (x1 - x0) * vw, 14);
  ctx.fillStyle = C.ink; ctx.fillRect(x0, py - 7, (x1 - x0) * pw, 14);
  ctx.restore();
  label('VALUE', x1 + 24, vy + 11, out * vw, C.goldText, 28, 'left');
  label('PRICE', x1 + 24, py + 11, out * pw, C.ink, 28, 'left');
  const buy = eback(prog(t, 27.2, .3)) * (1 - eio(prog(t, GAP_FLIP - .1, .2)));
  if (buy > 0) {
    ctx.save(); ctx.globalAlpha = out * clamp(buy); ctx.translate((x0 + x1) / 2, (vy + py) / 2); ctx.scale(buy, buy);
    ctx.font = font('serif', 84); ctx.textAlign = 'center'; ctx.fillStyle = C.goldText; ctx.fillText('BUY', 0, 28); ctx.restore();
  }
  burst(t, 27.2, (x0 + x1) / 2, vy + 120, 22, 512, C.goldL, 1000, .8);
  label('WALK AWAY', (x0 + x1) / 2, (vy + py) / 2 + 13, out * eo(prog(t, 28.7, .3)), C.ink2, 36);
}

/* ---------- S6: why prices go wrong (30.5 – 37) ---------- */
function scene6(t) {
  if (t < 30.5 || t > 37.2) return;
  line(t, 'Why prices go [wrong:]', W / 2, 220, { size: 80, start: 30.7, end: 36.6 });
  const out = 1 - eio(prog(t, 36.6, .35));
  const names = ['URGENCY', 'INFORMATION', 'EMOTION', 'THIN CROWD'];
  CARDS.forEach((s, i) => {
    const p = eback(prog(t, s, .35)); if (p <= 0) return;
    const cx = i % 2 ? 765 : 315, cy = i < 2 ? 450 : 655;
    ctx.save(); ctx.globalAlpha = out * clamp(p * 3);
    ctx.translate(cx, cy); ctx.scale(p, 1); ctx.rotate((1 - clamp(p)) * .2);
    rr(-205, -85, 410, 170, 18); ctx.fillStyle = i === 0 ? C.goldL : '#FFFBF3'; ctx.fill();
    ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.stroke();
    ctx.font = font('serif', 70); ctx.fillStyle = i === 0 ? C.ink : C.goldText; ctx.fillText(String(i + 1), -170, 25);
    ctx.font = font('sans', i === 1 ? 31 : 34, 700); ctx.letterSpacing = '3px'; ctx.fillStyle = C.ink; ctx.fillText(names[i], -105, 13);
    ctx.restore();
  });
}

/* ---------- S7: three questions, then the takeaway (37 – 46.6) ---------- */
function scene7(t) {
  if (t < 37 || t > 46.6) return;
  const qEnd = 41.6;
  label('ASK THREE QUESTIONS', W / 2, 250, env(t, 37.3, qEnd, .3), C.goldText, 26);
  ['What’s it worth to me?', 'What would others pay?', 'What does the tag say?'].forEach((q, i) => {
    const s = [37.4, 38.4, 39.4][i], y = 410 + i * 140;
    const np = eback(prog(t, s, .3)) * (1 - eio(prog(t, qEnd, .3)));
    if (np > 0) {
      ctx.save(); ctx.translate(205, y - 22); ctx.scale(np, np);
      ctx.beginPath(); ctx.arc(0, 0, 36, 0, Math.PI * 2); ctx.fillStyle = i === 2 ? C.ink : C.gold; ctx.fill();
      ctx.font = font('serif', 44); ctx.textAlign = 'center'; ctx.fillStyle = C.cream; ctx.fillText(String(i + 1), 0, 15);
      ctx.restore();
    }
    line(t, q, 270, y, { size: 62, align: 'left', start: s + .1, stagger: .06, end: qEnd });
  });
  const end = 46.2;
  line(t, 'Hear the rumor.', W / 2, 470, { size: 100, start: 42.0, stagger: .1, end });
  const r = line(t, '[Don’t marry it.]', W / 2, 600, { size: 100, start: 42.95, stagger: .1, end });
  const u = eio(prog(t, 43.9, .4)) * (1 - eio(prog(t, end, .35)));
  if (u > 0) { ctx.fillStyle = C.gold; ctx.fillRect(r.x0, 636, r.w * u, 9); }
  burst(t, 43.05, W / 2, 570, 24, 707, C.goldL, 1100, .9);
}

/* ---------- S8: end card (46.6 – 52.5) ---------- */
function scene8(t) {
  if (t < 46.3) return;
  const rp = eio(prog(t, 46.35, .55));
  ctx.fillStyle = C.night; ctx.beginPath(); ctx.arc(W / 2, 600, 1300 * rp, 0, Math.PI * 2); ctx.fill();
  if (rp < 1) return;
  const tp = eback(prog(t, 47.3, .4)), bp = eback(prog(t, 47.45, .4));
  if (tp > 0) {
    ctx.save(); ctx.translate(W / 2 - 50, 222); ctx.scale(tp * .6, tp * .6); ctx.rotate(-.12);
    ctx.globalAlpha = .7; tag('', 100, 100, false); ctx.restore();
  }
  if (bp > 0) { const h = 110 * bp; rr(W / 2 + 20, 300 - h, 64, h, 8); ctx.fillStyle = C.goldL; ctx.fill(); }
  ring(t, 47.55, W / 2 + 52, 250, 30, 300, C.goldL, .8, 8);
  line(t, 'Value, Created —', W / 2, 440, { size: 88, color: C.cream, start: 47.5, stagger: .1 });
  line(t, '[Chapter 4: Price Is Not Value]', W / 2, 535, { size: 62, goldColor: C.goldL, start: 47.95, stagger: .08 });
  const lp = eio(prog(t, 48.5, .45));
  ctx.fillStyle = C.goldL; ctx.fillRect(W / 2 - 70 * lp, 590, 140 * lp, 4);
  line(t, 'Full 10-minute episode — link in comments', W / 2, 680, { font: 'sans', size: 38, color: C.cream, start: 48.9, stagger: .05 });
  ctx.save(); ctx.globalAlpha = .6 * eo(prog(t, 49.7, .5));
  ctx.font = font('sans', 22, 700); ctx.letterSpacing = '5px'; ctx.textAlign = 'center'; ctx.fillStyle = C.cream;
  ctx.fillText('A FREE AUDIOBOOK · PRODUCED BY THE JOY DIGI', W / 2 + 2.5, 980);
  ctx.restore();
}

function draw(real) {
  const t = toDesign(real);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalAlpha = 1; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
  background();
  ctx.save();
  camera(t);
  kicker(t);
  scene1(t);
  scene2(t);
  scene3(t);
  scene4(t);
  scene5(t);
  scene6(t);
  scene7(t);
  ctx.restore();
  swipe(t);
  scene8(t);
  progressBar(t, real);
}

window.DUR = DUR;
window.cues = () => ({
  dur: DUR,
  cues: CUES.map(c => Object.assign({}, c, { t: toReal(c.t), d: c.d ? toReal(c.t + c.d) - toReal(c.t) : undefined })).sort((a, b) => a.t - b.t),
  markers: Object.fromEntries(Object.entries(MARKERS).map(([k, v]) => [k, toReal(v)]))
});
window.frame = (t, type, q) => { draw(t); return cv.toDataURL(type || 'image/jpeg', q || .95).split(',')[1]; };
window.ready = Promise.all(['600 20px "Fraunces"', '500 20px "DM Sans"', '700 20px "DM Sans"'].map(f => document.fonts.load(f))).then(() => draw(0));
let t0 = null;
if (!/render/.test(location.search)) requestAnimationFrame(function loop(ts) { if (t0 === null) t0 = ts; draw(((ts - t0) / 1000) % DUR); requestAnimationFrame(loop); });
