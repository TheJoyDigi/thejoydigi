/* Value, Created Ch 5 LinkedIn infographic: chapter config and scenes for ../_engine (design time; WARP maps real time onto it). */
const CHAPTER = 5, KICKER_END = 46.65, BAR_END = 46.75;
const WARP = [[0, 0], [6.4, 4.5], [10.9, 7.6], [16, 11.2], [20.7, 14.5], [27.6, 19.3], [33.1, 23.2], [40.3, 28.2], [47.1, 33], [53, 38]];
/* ---------- timeline constants shared by visuals and cues ---------- */
const STAMPS = [1.7, 2.3, 2.9];
const WELLS = [7.3, 7.9, 8.5];
const LOAF0 = 11.8, LOAF_N = 40, LOAF_DT = .05, HOPS = [14.0, 14.35, 14.7, 15.05], HOP_IDX = [19, 4, 27, 12];
const BAGS = [16.6, 17.9];
const DROP = 23.6;
const BARS = [28.3, 29.2], PAIN_HIT = 30.6;
const QS = [33.5, 34.6, 35.7];
const SWIPES = [6.4, 20.7, 33.1];
const E = 46.85;
const IMPACTS = [[STAMPS[0] + .25, 4], [STAMPS[1] + .25, 6], [STAMPS[2] + .25, 11], ...WELLS.map((s, i) => [s + .25, 4 + i * 2]),
  [LOAF0 + LOAF_N * LOAF_DT, 5], [BAGS[0] + .3, 7], [BAGS[1] + .1, 3], [DROP, 16], [DROP + .45, 5], [BARS[0] + .7, 3], [BARS[1] + .7, 4],
  [PAIN_HIT, 11], ...QS.map(s => [s + .1, 3]), [41.4, 12], [E + 1.2, 7]];
const KB = [[0, 6.4], [6.4, 20.7], [20.7, 33.1], [33.1, 46.8]];

cue(0, 'impact', { v: .6 }); cue(.02, 'pop', { f: 1 });
[.45, .6, .75].forEach((x, i) => cue(x + .1, 'blip', { n: [55, 59, 62][i] }));
[1.0, 1.15, 1.3].forEach(x => cue(x, 'tick', { f: 2 }));
STAMPS.forEach((x, i) => { cue(x + .15, 'whoosh', { v: .25 }); cue(x + .25, 'blip', { n: [64, 69, 76][i] }); });
cue(STAMPS[2] + .25, 'impact', { v: .8 }); cue(STAMPS[2] + .25, 'chime', { n: 76 });
cue(3.9, 'pop', { f: 1 }); cue(4.7, 'pop', { f: 1.2 }); cue(4.75, 'thud');
SWIPES.forEach(x => cue(x - .3, 'whoosh', { v: 1 }));
cue(6.65, 'pop', { f: 1.2 }); cue(7.0, 'swish'); cue(7.2, 'pop', { f: .9 });
WELLS.forEach((s, i) => { cue(s, 'whoosh', { v: .3 }); cue(s + .25, 'thud'); cue(s + .3, 'blip', { n: [60, 64, 67][i] }); cue(s + .35, 'tick', { f: 1 }); });
cue(WELLS[2] + .3, 'chime', { n: 72 });
cue(11.1, 'pop', { f: 1.2 }); cue(11.6, 'pop', { f: .9 });
for (let i = 0; i < LOAF_N; i += 2) cue(LOAF0 + i * LOAF_DT, 'tick', { f: (i / 2) % 2 });
for (let i = 0; i < LOAF_N; i += 8) cue(LOAF0 + i * LOAF_DT + .05, 'blip', { n: 55 + i * .4 | 0 });
cue(LOAF0 + LOAF_N * LOAF_DT + .05, 'thud'); cue(HOPS[0] - .15, 'whoosh', { v: .3 });
HOPS.forEach((h, i) => { cue(h, 'tick', { f: 2 }); cue(h + .02, 'blip', { n: [67, 62, 69, 64][i] }); });
cue(16.2, 'pop', { f: 1.2 }); cue(BAGS[0] - .1, 'whoosh', { v: .35 }); cue(BAGS[0] + .3, 'thud'); cue(BAGS[0] + .3, 'chime', { n: 79 });
cue(BAGS[0] + .3, 'impact', { v: .6 }); cue(17.7, 'pop', { f: 1 }); cue(BAGS[1], 'swish'); cue(BAGS[1] + .1, 'blip', { n: 57 }); cue(18.5, 'drain', { d: 1.2 });
cue(20.2, 'riser', { d: DROP - 20.2 }); cue(21.0, 'pop', { f: 1 });
[21.3, 21.6, 21.9].forEach((s, i) => { cue(s, 'thud'); cue(s + .05, 'blip', { n: [55, 59, 62][i] }); });
for (let x = 22.6, k = 0; x < DROP - .05; x += .12 - k * .003, k++) cue(x, 'tick', { f: k % 2 });
cue(DROP, 'boom', { v: 1 }); cue(DROP, 'chime', { n: 79 }); cue(DROP, 'impact', { v: 1 }); cue(DROP + .2, 'whoosh', { v: .4 }); cue(DROP + .45, 'thud');
cue(27.8, 'pop', { f: 1.2 }); cue(28.0, 'swish');
BARS.forEach((s, i) => { cue(s, 'whoosh', { v: .25 }); cue(s + .7, 'thud'); cue(s + .7, 'blip', { n: [60, 64][i] }); });
cue(PAIN_HIT - .6, 'riser', { d: .6 }); cue(PAIN_HIT, 'impact', { v: .9 }); cue(PAIN_HIT, 'chime', { n: 76 }); cue(PAIN_HIT + .1, 'pop', { f: 1.2 });
cue(PAIN_HIT + .35, 'knock', { v: 1 }); cue(PAIN_HIT + .6, 'knock', { v: .8 });
for (let x = PAIN_HIT + .9; x < 32.5; x += .3) cue(x, 'tick', { f: 0 });
cue(33.3, 'tick', { f: 2 });
QS.forEach((s, i) => { cue(s + .1, 'blip', { n: [67, 71, 74][i] }); cue(s + .1, 'pop', { f: 1 }); });
cue(40.0, 'whoosh', { v: .35 }); cue(40.45, 'thud'); cue(41.4, 'impact', { v: .9 }); cue(42.35, 'swish'); cue(43.4, 'pop', { f: .9 });
cue(E - .05, 'whoosh', { v: 1 });
[E + .95, E + 1.1].forEach((x, i) => cue(x + .1, 'blip', { n: [72, 79][i] }));
cue(E + 1.2, 'boom', { v: .9 }); cue(E + 1.25, 'chime', { n: 72 });
cue(E + 2.55, 'pop', { f: .9 });
const MARKERS = { groove: 6.4, breakdown: 20.2, drop: DROP, end: 46.75 };

function star(x, y, r, a) {
  if (a <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.globalAlpha *= a; ctx.beginPath();
  for (let i = 0; i < 8; i++) { const rad = i % 2 ? r * .28 : r, an = i * Math.PI / 4 - Math.PI / 2; ctx.lineTo(Math.cos(an) * rad, Math.sin(an) * rad); }
  ctx.closePath(); ctx.fillStyle = C.goldL; ctx.fill(); ctx.restore();
}

/* loaf and bag are anchored at their bottom centre */
function loaf(x, y, s, lw) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rr(-100, -110, 200, 110, 55); ctx.fillStyle = 'rgba(58,52,44,0.12)'; ctx.fill();
  ctx.lineWidth = (lw || 6) / s; ctx.strokeStyle = C.ink; ctx.stroke();
  ctx.lineCap = 'round'; ctx.beginPath();
  [-50, 0, 50].forEach(k => { ctx.moveTo(k - 12, -86); ctx.lineTo(k + 10, -36); });
  ctx.stroke(); ctx.restore();
}
function bag(x, y, s, gold) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.lineWidth = 6 / s; ctx.strokeStyle = C.ink;
  ctx.beginPath(); ctx.arc(0, -150, 55, Math.PI, 2 * Math.PI); ctx.stroke();
  rr(-95, -150, 190, 150, 18); ctx.fillStyle = gold ? C.goldL : 'rgba(58,52,44,0.10)'; ctx.fill(); ctx.stroke();
  rr(-18, -118, 36, 28, 6); ctx.fillStyle = C.ink; ctx.fill();
  ctx.restore();
}
function pipe(x, y, t, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.lineWidth = 6 / s; ctx.strokeStyle = C.ink; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const piece = d => {
    ctx.beginPath(); ctx.moveTo(d * 130, -244); ctx.lineTo(d * 22, -244); ctx.lineTo(d * 8, -228); ctx.lineTo(d * 24, -216); ctx.lineTo(d * 10, -200); ctx.lineTo(d * 22, -190);
    ctx.lineTo(d * 130, -190); ctx.closePath(); ctx.fillStyle = 'rgba(58,52,44,0.12)'; ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(d * 104, -244); ctx.lineTo(d * 104, -190); ctx.stroke();
  };
  piece(-1);
  ctx.save(); ctx.translate(126, -218); ctx.rotate(.2); ctx.translate(-126, 218); piece(1); ctx.restore();
  for (let i = 0; i < 7; i++) {
    const ph = (t * 1.3 + i * .15) % 1, dx = (i - 3) * 20 * (.3 + ph), dy = -196 + ph * ph * 190 + ph * 20;
    ctx.beginPath(); ctx.arc(dx, dy, 10 * (1 - ph * .35), 0, Math.PI * 2); ctx.fillStyle = C.gold; ctx.fill();
  }
  ctx.beginPath(); ctx.ellipse(0, -4, 120, 16, 0, 0, Math.PI * 2); ctx.fillStyle = 'rgba(221,182,95,0.55)'; ctx.fill(); ctx.lineWidth = 4 / s; ctx.stroke();
  ctx.restore();
}
function stamp(text, gold) {
  rr(-105, -32, 210, 64, 16); ctx.fillStyle = gold ? C.goldL : '#FFFBF3'; ctx.fill();
  ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.stroke();
  ctx.font = font('sans', 28, 700); ctx.letterSpacing = '5px'; ctx.textAlign = 'center'; ctx.fillStyle = C.ink; ctx.fillText(text, 2.5, 10); ctx.textAlign = 'left';
}

/* cut-away well: shaft hangs below y0, gold fills from the bottom */
function well(x, y0, depth, frac, t) {
  if (depth <= 2) return;
  ctx.save();
  ctx.beginPath(); ctx.rect(x - 100, y0, 200, depth); ctx.fillStyle = 'rgba(58,52,44,0.12)'; ctx.fill();
  const fh = depth * frac;
  ctx.save(); ctx.beginPath(); ctx.rect(x - 100, y0, 200, depth); ctx.clip();
  const g = ctx.createLinearGradient(0, y0 + depth - fh, 0, y0 + depth); g.addColorStop(0, C.goldL); g.addColorStop(1, C.gold);
  ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x - 100, y0 + depth);
  for (let k = 0; k <= 20; k++) ctx.lineTo(x - 100 + k * 10, y0 + depth - fh + 5 * Math.sin(t * 4 + k * .7 + x));
  ctx.lineTo(x + 100, y0 + depth); ctx.closePath(); ctx.fill(); ctx.restore();
  ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.lineJoin = 'round'; ctx.beginPath();
  ctx.moveTo(x - 100, y0); ctx.lineTo(x - 100, y0 + depth); ctx.lineTo(x + 100, y0 + depth); ctx.lineTo(x + 100, y0); ctx.stroke();
  rr(x - 124, y0 - 18, 248, 30, 10); ctx.fillStyle = C.paper; ctx.fill(); ctx.stroke();
  ctx.restore();
}
const WX = [240, 540, 840];

/* ---------- S1: same person, three decisions (0 – 6.4) ---------- */
const BX = [250, 540, 830], BB = 790;
function scene1(t) {
  if (t > 6.6) return;
  line(t, 'Same person.', W / 2, 215, { size: 84, start: -.62, stagger: .12, end: 3.7 });
  line(t, 'Three [decisions.]', W / 2, 305, { size: 84, start: -.4, stagger: .12, end: 3.7 });
  line(t, 'What was different?', W / 2, 220, { size: 84, start: 3.9, stagger: .1, end: 5.95 });
  line(t, 'The [well.]', W / 2, 310, { size: 70, color: C.ink2, start: 4.7, end: 5.95 });
  const out = 1 - eio(prog(t, 5.95, .35));
  ctx.save(); ctx.globalAlpha = out;
  const ip = i => eback(prog(t, .45 + i * .15, .4));
  if (ip(0) > 0) { ctx.save(); ctx.translate(BX[0], BB); ctx.scale(ip(0), ip(0)); ctx.translate(-BX[0], -BB); loaf(BX[0], BB, 1.3); ctx.restore(); }
  if (ip(1) > 0) { ctx.save(); ctx.translate(BX[1], BB); ctx.scale(ip(1), ip(1)); ctx.translate(-BX[1], -BB); bag(BX[1], BB, 1.15, true); ctx.restore(); }
  if (ip(2) > 0) { ctx.save(); ctx.translate(BX[2], BB); ctx.scale(ip(2), ip(2)); ctx.translate(-BX[2], -BB); pipe(BX[2], BB, t, 1.1); ctx.restore(); }
  ['REFLEX', 'FANTASY', 'RESCUE'].forEach((s, i) => {
    const p = eback(prog(t, STAMPS[i], .35)); if (p <= 0) return;
    ctx.save(); ctx.translate(BX[i], 880); ctx.rotate((1 - clamp(p)) * -.25 + (i === 2 ? .03 : 0)); ctx.scale(p * [1, 1.08, 1.2][i], p * [1, 1.08, 1.2][i]);
    stamp(s, i === 2); ctx.restore();
  });
  ring(t, STAMPS[2] + .25, BX[2], 700, 40, 300, C.gold, .7, 10);
  burst(t, STAMPS[2] + .25, BX[2], 700, 20, 41, C.goldL, 1000, .8);
  ctx.restore();
}

/* ---------- S2: three wells (6.4 – 10.9) ---------- */
function scene2(t) {
  if (t < 6.4 || t > 11) return;
  const end = 10.45, out = 1 - eio(prog(t, end, .35)), y0 = 540;
  line(t, 'Value springs from', W / 2, 220, { size: 80, start: 6.65, end });
  line(t, 'three [wells.]', W / 2, 310, { size: 84, start: 7.2, end });
  ctx.save(); ctx.globalAlpha = out;
  const gp = eio(prog(t, 7.0, .5));
  ctx.strokeStyle = C.ink; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath();
  ctx.moveTo(W / 2 - (W / 2 - 72) * gp, y0); ctx.lineTo(W / 2 + (W / 2 - 72) * gp, y0); ctx.stroke();
  WX.forEach((x, i) => {
    const p = eback(prog(t, WELLS[i], .45));
    well(x, y0, 300 * p, .5, t);
    burst(t, WELLS[i] + .3, x, y0 - 10, 10, 60 + i * 20, C.goldL, 520, .7);
  });
  ring(t, WELLS[2] + .3, WX[2], y0, 40, 300, C.gold, .7, 10);
  ctx.restore();
  ['NEEDS', 'WANTS', 'PAIN'].forEach((s, i) => label(s, WX[i], y0 - 34, out * eo(prog(t, WELLS[i] + .15, .3)), C.ink, 28));
}

/* ---------- S3: needs are crowded (10.9 – 16) ---------- */
const gx = c => 540 + (c - 3.5) * 106, gy = r => 480 + r * 92;
function scene3(t) {
  if (t < 10.9 || t > 16.1) return;
  const end = 15.55, full = LOAF0 + LOAF_N * LOAF_DT;
  line(t, 'Needs are [crowded.]', W / 2, 220, { size: 80, start: 11.1, end });
  line(t, 'Forty loaves. Buyers compare.', W / 2, 305, { size: 52, color: C.ink2, start: 11.6, stagger: .07, end });
  const out = 1 - eio(prog(t, end, .35));
  ctx.save(); ctx.globalAlpha = out;
  for (let i = 0; i < LOAF_N; i++) {
    const c = i % 8, r = (i / 8) | 0, p = eback(prog(t, LOAF0 + i * LOAF_DT, .3)); if (p <= 0) continue;
    const bob = 6 * Math.sin(t * 6 - c * .8 - r * .6) * eo(prog(t, full + .1, .3));
    loaf(gx(c), gy(r) + bob, .42 * p, 4);
  }
  const hi = HOPS.filter(h => t >= h).length - 1;
  if (hi >= 0) {
    const b = HOP_IDX[hi], a = HOP_IDX[Math.max(0, hi - 1)], q = hi === 0 ? 1 : eo(prog(t, HOPS[hi], .2)), sp = eback(prog(t, HOPS[0], .25));
    const px = lerp(gx(a % 8), gx(b % 8), q), py = lerp(gy((a / 8) | 0), gy((b / 8) | 0), q) - 20;
    ctx.beginPath(); ctx.arc(px, py, 52 * sp, 0, Math.PI * 2); ctx.lineWidth = 7; ctx.strokeStyle = C.goldText; ctx.stroke();
  }
  ctx.restore();
}

/* ---------- S4: wants are fickle (16 – 20.7) ---------- */
function scene4(t) {
  if (t < 16 || t > 20.8) return;
  const end = 20.25, out = 1 - eio(prog(t, end, .35));
  line(t, 'Wants are [fickle.]', W / 2, 220, { size: 80, start: 16.2, end });
  line(t, 'The second bag thrills less.', W / 2, 305, { size: 54, color: C.ink2, start: 17.7, stagger: .07, end });
  const by = 780, p1 = eback(prog(t, BAGS[0], .45)), p2 = eback(prog(t, BAGS[1], .4));
  const fade = eio(prog(t, 18.5, 1.2));
  ctx.save(); ctx.globalAlpha = out;
  const glow = (x, r, a) => {
    const g = ctx.createRadialGradient(x, by - 90, 10, x, by - 90, r);
    g.addColorStop(0, `rgba(221,182,95,${a})`); g.addColorStop(1, 'rgba(221,182,95,0)');
    ctx.fillStyle = g; ctx.fillRect(x - r, by - 90 - r, 2 * r, 2 * r);
  };
  if (p1 > 0) {
    glow(330, 260 * clamp(p1), .75);
    ctx.save(); ctx.translate(330, by); ctx.scale(p1, p1); ctx.translate(-330, -by); bag(330, by, 1.35, true); ctx.restore();
    const tw = k => .5 + .5 * Math.sin(t * 5 + k * 2);
    star(180, by - 270, 26, tw(0) * eo(prog(t, BAGS[0] + .3, .3)));
    star(480, by - 250, 20, tw(1) * eo(prog(t, BAGS[0] + .4, .3)));
    star(215, by - 80, 16, tw(2) * eo(prog(t, BAGS[0] + .5, .3)));
  }
  if (p2 > 0) {
    ctx.save(); ctx.globalAlpha = out * .55;
    glow(750, 130, .3 * (1 - fade));
    ctx.translate(750, by); ctx.scale(p2, p2); ctx.translate(-750, -by); bag(750, by, 1.05, false); ctx.restore();
    star(830, by - 215, 14, (.5 + .5 * Math.sin(t * 5)) * (1 - fade) * .8);
  }
  ctx.restore();
  ring(t, BAGS[0] + .3, 330, by - 90, 40, 300, C.gold, .7, 10);
  burst(t, BAGS[0] + .3, 330, by - 90, 16, 33, C.goldL, 800, .8);
}

/* ---------- S5: pain is the deepest well (20.7 – 27.6) ---------- */
function scene5(t) {
  if (t < 20.7 || t > 27.7) return;
  const end = 27.1, out = 1 - eio(prog(t, end, .35)), y0 = 500;
  line(t, 'Pain is the', W / 2, 220, { size: 84, start: 21.0, end });
  line(t, '[deepest well.]', W / 2, 310, { size: 84, start: DROP, stagger: .12, end });
  const dim = 1 - .4 * eo(prog(t, DROP + .3, .5));
  const wob = 7 * Math.sin(t * 70) * eo(prog(t, 22.6, .9)) * (1 - eo(prog(t, DROP, .15)));
  const pd = 190 + 200 * eback(prog(t, DROP, .5)), pf = .45 + .35 * eo(prog(t, DROP, .6));
  ctx.save(); ctx.globalAlpha = out;
  ctx.strokeStyle = C.ink; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(72, y0); ctx.lineTo(W - 72, y0); ctx.stroke();
  [21.3, 21.6, 21.9].forEach((s, i) => {
    const p = eback(prog(t, s, .4)); if (p <= 0) return;
    ctx.save(); ctx.globalAlpha = out * (i < 2 ? dim : 1);
    if (i === 2) well(WX[i] + wob, y0, pd * p, pf, t); else well(WX[i], y0, 190 * p, .45, t);
    ctx.restore();
  });
  ctx.restore();
  ['NEEDS', 'WANTS'].forEach((s, i) => label(s, WX[i], y0 - 34, out * dim * eo(prog(t, 21.45 + i * .3, .3)), C.ink, 28));
  const lp = 1 + .35 * Math.exp(-Math.max(0, t - DROP) * 7) * (t > DROP ? 1 : 0);
  ctx.save(); ctx.translate(WX[2], y0 - 34); ctx.scale(lp, lp); label('PAIN', 0, 0, out * eo(prog(t, 22.05, .3)), C.goldText, 28); ctx.restore();
  ring(t, DROP, WX[2], y0 + 250, 60, 520, C.gold, .8, 12);
  ring(t, DROP + .12, WX[2], y0 + 250, 40, 420, C.goldL, .7, 8);
  burst(t, DROP, WX[2], y0 + 300, 30, 313, C.goldL, 1000, .9);
  burst(t, DROP + .1, WX[2], y0, 18, 377, C.gold, 800, .8);
}

/* ---------- S6: needs wait, wants wait, pain can't (27.6 – 33.1) ---------- */
function scene6(t) {
  if (t < 27.6 || t > 33.2) return;
  const end = 32.65, out = 1 - eio(prog(t, end, .35)), X0 = 270, RY = [470, 600, 750];
  line(t, 'Needs wait. Wants wait.', W / 2, 220, { size: 72, start: 27.8, end });
  line(t, '[Pain can’t.]', W / 2, 315, { size: 92, start: PAIN_HIT - .05, stagger: .14, end });
  ctx.save(); ctx.globalAlpha = out;
  const np = eio(prog(t, 28.0, .5));
  ctx.strokeStyle = C.ink2; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.setLineDash([2, 14]);
  ctx.beginPath(); ctx.moveTo(X0, 410); ctx.lineTo(X0, lerp(410, 830, np)); ctx.stroke(); ctx.setLineDash([]);
  [[BARS[0], RY[0], 580, C.ink2, 'MORNING'], [BARS[1], RY[1], 880, C.fill, 'PAYDAY']].forEach(([s, y, xe, col, nm]) => {
    const p = eio(prog(t, s, .7)); if (p <= 0) return;
    rr(X0, y - 14, Math.max(4, (xe - X0) * p), 28, 14); ctx.fillStyle = col; ctx.fill();
    const cp = eback(prog(t, s + .6, .35));
    if (cp > 0) {
      ctx.save(); ctx.translate(xe, y); ctx.scale(cp, cp); ctx.beginPath(); ctx.arc(0, 0, 20, 0, Math.PI * 2);
      ctx.fillStyle = C.paper; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
    }
    label(nm, xe, y - 40, out * eo(prog(t, s + .7, .3)), C.ink, 26);
  });
  ctx.restore();
  label('NEEDS', 72, RY[0] + 9, out * np, C.ink2, 26, 'left');
  label('WANTS', 72, RY[1] + 9, out * np, C.ink2, 26, 'left');
  label('PAIN', 72, RY[2] + 9, out * eo(prog(t, PAIN_HIT, .3)), C.goldText, 26, 'left');
  const cp = eback(prog(t, PAIN_HIT, .35));
  if (cp > 0) {
    const dt = Math.max(0, t - PAIN_HIT);
    ctx.save(); ctx.globalAlpha = out; ctx.translate(X0, RY[2]); ctx.scale(cp, cp); ctx.rotate(.07 * Math.sin(t * 32) * (1 - prog(t, PAIN_HIT + 1.2, .6)));
    [-1, 1].forEach(s => { ctx.beginPath(); ctx.arc(s * 32, -48, 10, 0, Math.PI * 2); ctx.fillStyle = C.ink; ctx.fill(); });
    ctx.beginPath(); ctx.arc(0, 0, 50, 0, Math.PI * 2); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
    ctx.lineCap = 'round'; ctx.beginPath();
    ctx.moveTo(0, 0); ctx.lineTo(Math.cos(dt * 10 - 1.57) * 36, Math.sin(dt * 10 - 1.57) * 36);
    ctx.moveTo(0, 0); ctx.lineTo(Math.cos(dt - 1.57) * 22, Math.sin(dt - 1.57) * 22); ctx.stroke();
    ctx.restore();
    const nw = eback(prog(t, PAIN_HIT + .15, .35));
    ctx.save(); ctx.globalAlpha = out; ctx.translate(X0 + 90, RY[2] + 32); ctx.scale(nw, nw);
    ctx.font = font('serif', 104); ctx.fillStyle = C.goldText; ctx.fillText('NOW', 0, 0); ctx.restore();
  }
  ring(t, PAIN_HIT, X0, RY[2], 40, 380, C.gold, .8, 10);
  burst(t, PAIN_HIT, X0, RY[2], 22, 604, C.goldL, 1000, .8);
}

/* ---------- S7: three questions (33.1 – 40.3) ---------- */
function icon(kind) {
  ctx.save(); ctx.strokeStyle = C.cream; ctx.fillStyle = C.cream; ctx.lineWidth = 4; ctx.lineCap = 'round';
  if (kind === 0) {
    ctx.beginPath(); ctx.arc(0, -10, 9, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(0, 18, 18, Math.PI, 2 * Math.PI); ctx.fill();
  } else if (kind === 1) {
    rr(-17, -14, 34, 32, 5); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-17, -4); ctx.lineTo(17, -4); ctx.moveTo(-8, -20); ctx.lineTo(-8, -10); ctx.moveTo(8, -20); ctx.lineTo(8, -10); ctx.stroke();
  } else {
    ctx.beginPath(); ctx.arc(0, 0, 18, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -12); ctx.moveTo(0, 0); ctx.lineTo(9, 5); ctx.stroke();
  }
  ctx.restore();
}
function scene7(t) {
  if (t < 33.1 || t > 40.4) return;
  const qEnd = 39.85;
  label('THREE QUESTIONS', W / 2, 290, env(t, 33.3, qEnd, .3), C.goldText, 26);
  ['Whose [pain] is this?', 'What does each day cost?', 'Would they pay [today?]'].forEach((q, i) => {
    const s = QS[i], y = 460 + i * 160;
    const np = eback(prog(t, s, .3)) * (1 - eio(prog(t, qEnd, .3)));
    if (np > 0) {
      ctx.save(); ctx.translate(205, y - 22); ctx.scale(np, np);
      ctx.beginPath(); ctx.arc(0, 0, 40, 0, Math.PI * 2); ctx.fillStyle = i === 2 ? C.ink : C.gold; ctx.fill();
      icon(i); ctx.restore();
    }
    line(t, q, 270, y, { size: 58, align: 'left', start: s + .1, stagger: .06, end: qEnd });
  });
}

/* ---------- S8: takeaway (40.3 – 47.1) ---------- */
function scene8(t) {
  if (t < 40.3 || t > 47.1) return;
  const end = 46.7;
  line(t, 'Find the pain.', W / 2, 470, { size: 100, start: 40.45, stagger: .1, end });
  const r = line(t, '[Find the value.]', W / 2, 600, { size: 100, start: 41.4, stagger: .1, end });
  const u = eio(prog(t, 42.35, .4)) * (1 - eio(prog(t, end, .35)));
  if (u > 0) { ctx.fillStyle = C.gold; ctx.fillRect(r.x0, 636, r.w * u, 9); }
  line(t, 'Real pain. Never invented.', W / 2, 770, { size: 46, color: C.ink2, start: 43.4, stagger: .07, end });
  burst(t, 41.5, W / 2, 570, 24, 707, C.goldL, 1100, .9);
}

/* ---------- S9: end card (47.1 – 53) ---------- */
function scene9(t) {
  if (t < E - .05) return;
  const rp = eio(prog(t, E, .55));
  ctx.fillStyle = C.night; ctx.beginPath(); ctx.arc(W / 2, 600, 1300 * rp, 0, Math.PI * 2); ctx.fill();
  if (rp < 1) return;
  const gp = eio(prog(t, E + .9, .4));
  ctx.fillStyle = C.cream; ctx.globalAlpha = .7; ctx.fillRect(W / 2 - 120 * gp, 186, 240 * gp, 4); ctx.globalAlpha = 1;
  [[-70, 44, .55], [0, 44, .55], [70, 110, 1]].forEach(([dx, h, a], i) => {
    const p = eback(prog(t, E + .95 + i * .08, .4)); if (p <= 0) return;
    ctx.save(); ctx.globalAlpha = a; rr(W / 2 + dx - 22, 190, 44, h * p, 8); ctx.fillStyle = i === 2 ? C.goldL : C.cream; ctx.fill(); ctx.restore();
  });
  ring(t, E + 1.2, W / 2 + 70, 250, 30, 300, C.goldL, .8, 8);
  line(t, 'Value, Created —', W / 2, 440, { size: 88, color: C.cream, start: E + 1.15, stagger: .1 });
  line(t, '[Chapter 5: Needs, Wants, and Pain]', W / 2, 535, { size: 60, goldColor: C.goldL, start: E + 1.6, stagger: .06 });
  const lp = eio(prog(t, E + 2.15, .45));
  ctx.fillStyle = C.goldL; ctx.fillRect(W / 2 - 70 * lp, 590, 140 * lp, 4);
  line(t, 'Full 11-minute episode — link in comments', W / 2, 680, { font: 'sans', size: 38, color: C.cream, start: E + 2.55, stagger: .05 });
  ctx.save(); ctx.globalAlpha = .6 * eo(prog(t, E + 3.35, .5));
  ctx.font = font('sans', 22, 700); ctx.letterSpacing = '5px'; ctx.textAlign = 'center'; ctx.fillStyle = C.cream;
  ctx.fillText('A FREE AUDIOBOOK · PRODUCED BY THE JOY DIGI', W / 2 + 2.5, 980);
  ctx.restore();
}

const SCENES = [scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8];
const END_CARD = scene9;
