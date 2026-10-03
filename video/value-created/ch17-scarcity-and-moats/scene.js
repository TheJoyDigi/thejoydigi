/* Value, Created Ch 17 LinkedIn infographic: chapter config and scenes for ../_engine (design time; WARP maps real time onto it). */
const CHAPTER = 17, KICKER_END = 46.65, BAR_END = 46.75;
const WARP = [[0, 0], [6.4, 4.5], [18.4, 13.0], [36.2, 25.5], [46.85, 33.2], [53, 38]];
/* ---------- timeline constants shared by visuals and cues ---------- */
const SHOP = .45, QUEUE = [1.0, 1.15, 1.3, 1.45, 1.6], COPY = [4.1, 4.45], LEAVE = 4.8, CLOSED = 5.5;
const KEEP = 7.0, LAD = [9.3, 9.7, 10.1, 10.5], RISE0 = 11.6, DROP = 14.0;
const TILES = [19.8, 20.3, 20.8, 21.3, 21.8, 22.3];
const RINGS = [26.0, 26.55, 27.1, 27.65], LADR = 29.4, FALL = 29.95;
const WATER = 31.4, PLUG = 32.9, DRAIN = [33.0, 34.4], WALK = [34.5, 35.4];
const R6 = [38.0, 38.6, 39.2, 39.8, 40.4];
const T7 = { a: 41.9, b: 43.0, ring: 43.6, s: 44.6 };
const SWIPES = [6.4, 18.4, 36.2];
const E = 46.85;
const IMPACTS = [[COPY[0] + .25, 3], [COPY[1] + .25, 3], [CLOSED, 8], ...LAD.map(s => [s + .35, 3]), [DROP, 16], [DROP + .45, 5],
  [TILES[5] + .2, 4], ...RINGS.map((s, i) => [s + .3, 3 + i]), [FALL + .5, 4], [PLUG, 4], [WALK[1], 11], [T7.b, 12], [E + 1.2, 7]];
const KB = [[0, 6.4], [6.4, 18.4], [18.4, 36.2], [36.2, 46.8]];

cue(0, 'impact', { v: .6 }); cue(.02, 'pop', { f: 1 }); cue(SHOP + .1, 'pop', { f: 1.2 });
QUEUE.forEach((x, i) => cue(x + .1, 'blip', { n: [55, 59, 62, 64, 67][i] }));
cue(3.9, 'pop', { f: 1 });
COPY.forEach((x, i) => { cue(x, 'whoosh', { v: .3 }); cue(x + .25, 'thud'); cue(x + .3, 'blip', { n: [60, 57][i] }); });
[0, 2, 4].forEach(i => cue(LEAVE + i * .12, 'tick', { f: 2 }));
cue(LEAVE + .3, 'drain', { d: .7 }); cue(CLOSED, 'impact', { v: .8 }); cue(CLOSED, 'knock', { v: 1 }); cue(CLOSED + .25, 'knock', { v: .8 });
SWIPES.forEach(x => cue(x - .3, 'whoosh', { v: 1 }));
cue(6.65, 'pop', { f: 1.2 }); cue(KEEP, 'whoosh', { v: .3 }); cue(KEEP + .3, 'thud'); cue(KEEP + .35, 'blip', { n: 55 }); cue(7.9, 'chime', { n: 72 }); cue(8.3, 'pop', { f: 1 });
LAD.forEach((s, i) => { cue(s - .2, 'whoosh', { v: .25 }); cue(s + .35, 'thud'); cue(s + .4, 'blip', { n: [57, 60, 57, 60][i] }); });
cue(RISE0, 'riser', { d: DROP - RISE0 });
for (let x = 13.1, k = 0; x < DROP - .05; x += .13 - k * .004, k++) cue(x, 'tick', { f: k % 2 });
cue(DROP, 'boom', { v: 1 }); cue(DROP, 'chime', { n: 79 }); cue(DROP, 'impact', { v: 1 }); cue(DROP + .2, 'whoosh', { v: .4 });
cue(DROP + .45, 'thud'); cue(DROP + .05, 'pop', { f: 1.2 }); cue(DROP + .35, 'pop', { f: 1 });
cue(19.0, 'pop', { f: 1.2 });
TILES.forEach((s, i) => { cue(s, 'pop', { f: 1 }); cue(s + .05, 'blip', { n: [60, 62, 64, 67, 69, 72][i] }); });
cue(TILES[5] + .2, 'chime', { n: 76 });
cue(25.0, 'pop', { f: 1.2 });
RINGS.forEach((s, i) => { cue(s, 'whoosh', { v: .25 }); cue(s + .3, 'blip', { n: [55, 59, 62, 66][i] }); });
cue(28.6, 'pop', { f: .9 }); cue(LADR - .1, 'whoosh', { v: .3 }); cue(FALL, 'drain', { d: .6 }); cue(FALL + .5, 'thud'); cue(FALL + .6, 'chime', { n: 72 });
cue(31.0, 'pop', { f: 1.2 }); cue(WATER - .1, 'whoosh', { v: .3 }); cue(WATER + .3, 'thud'); cue(32.2, 'pop', { f: .9 });
cue(PLUG, 'pop', { f: 1.2 }); cue(PLUG, 'impact', { v: .5 }); cue(DRAIN[0], 'drain', { d: DRAIN[1] - DRAIN[0] });
for (let x = WALK[0]; x < WALK[1]; x += .25) cue(x, 'tick', { f: 0 });
cue(WALK[1], 'impact', { v: .9 }); cue(WALK[1], 'knock', { v: 1 }); cue(WALK[1] + .3, 'knock', { v: .8 });
cue(36.7, 'pop', { f: 1.2 }); cue(37.4, 'pop', { f: 1.2 });
R6.forEach((s, i) => { cue(s + .1, 'blip', { n: [60, 64, 67, 71, 74][i] }); });
cue(R6[4] + .4, 'chime', { n: 79 });
cue(T7.a, 'pop', { f: 1.2 }); cue(T7.b - .6, 'riser', { d: .6 }); cue(T7.b, 'impact', { v: .9 }); cue(T7.b, 'chime', { n: 79 }); cue(T7.b + .1, 'pop', { f: 1.2 });
cue(T7.ring, 'whoosh', { v: .3 }); cue(T7.s, 'pop', { f: .9 });
cue(E - .05, 'whoosh', { v: 1 });
[E + .95, E + 1.1].forEach((x, i) => cue(x + .1, 'blip', { n: [72, 79][i] }));
cue(E + 1.2, 'boom', { v: .9 }); cue(E + 1.25, 'chime', { n: 72 });
cue(E + 2.55, 'pop', { f: .9 });
const MARKERS = { groove: 6.4, breakdown: RISE0, drop: DROP, end: 46.75 };

const PAPER = '#FFFBF3', GREY = 'rgba(58,52,44,0.35)';
function star(x, y, r) {
  ctx.save(); ctx.translate(x, y); ctx.beginPath();
  for (let i = 0; i < 8; i++) { const rad = i % 2 ? r * .28 : r, an = i * Math.PI / 4 - Math.PI / 2; ctx.lineTo(Math.cos(an) * rad, Math.sin(an) * rad); }
  ctx.closePath(); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
}
function gem(x, y, r, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(0, -r); ctx.lineTo(r * .8, 0); ctx.lineTo(0, r); ctx.lineTo(-r * .8, 0); ctx.closePath();
  ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke();
  ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-r * .8, 0); ctx.lineTo(r * .8, 0); ctx.moveTo(-r * .3, -r * .62); ctx.lineTo(-r * .3, 0); ctx.lineTo(0, r); ctx.stroke();
  ctx.restore();
}
function person(x, y, s, col) {
  ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y - 54 * s, 13 * s, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(x, y, 26 * s, Math.PI, 2 * Math.PI); ctx.fill();
}
function ladder(x, y, len, a) {
  ctx.save(); ctx.translate(x, y); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.strokeStyle = C.ink; ctx.lineWidth = 6;
  ctx.beginPath(); ctx.moveTo(-len / 2, -17); ctx.lineTo(len / 2, -17); ctx.moveTo(-len / 2, 17); ctx.lineTo(len / 2, 17); ctx.stroke();
  ctx.lineWidth = 4; ctx.beginPath(); for (let k = -len / 2 + 14; k < len / 2; k += 24) { ctx.moveTo(k, -17); ctx.lineTo(k, 17); } ctx.stroke(); ctx.restore();
}
function shop(x0, base, w, h, awn, aa, body) {
  ctx.save(); ctx.globalAlpha *= body; const top = base - h;
  rr(x0, top + 40, w, h - 40, 8); ctx.fillStyle = PAPER; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke();
  rr(x0 + w * .58, base - 104, w * .26, 104, 6); ctx.fillStyle = 'rgba(58,52,44,0.18)'; ctx.fill(); ctx.stroke();
  rr(x0 + w * .1, base - 130, w * .34, 70, 6); ctx.fillStyle = 'rgba(58,52,44,0.10)'; ctx.fill(); ctx.stroke();
  const n = 6, sw = (w + 16) / n;
  awn.forEach(([col, al]) => {
    ctx.globalAlpha = body * aa * al;
    for (let i = 0; i < n; i++) { ctx.fillStyle = i % 2 ? PAPER : col; ctx.fillRect(x0 - 8 + i * sw, top, sw, 44); }
    ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.strokeRect(x0 - 8, top, w + 16, 44);
  });
  ctx.restore();
}

/* ---------- S1: Daniel's line, then the copies (0 – 6.4) ---------- */
const BASE = 750, FEET = 838, QX = [400, 458, 516, 574, 632], QT = [715, 770, 825, 885, 940];
function scene1(t) {
  if (t > 6.6) return;
  line(t, 'A line out the door.', W / 2, 215, { size: 84, start: -.62, stagger: .12, end: 3.7 });
  line(t, 'Then came the [copies.]', W / 2, 215, { size: 84, start: 3.9, stagger: .1, end: 5.95 });
  const out = 1 - eio(prog(t, 5.95, .35)), cl = eio(prog(t, LEAVE + .3, .5));
  ctx.save(); ctx.globalAlpha = out;
  ctx.strokeStyle = C.faint; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(72, FEET + 8); ctx.lineTo(W - 72, FEET + 8); ctx.stroke();
  const sp = eback(prog(t, SHOP, .45));
  if (sp > 0) {
    ctx.save(); ctx.translate(207, BASE); ctx.scale(sp, sp); ctx.translate(-207, -BASE);
    shop(72, BASE, 270, 250, [[C.goldL, 1 - cl], [GREY, cl]], 1, 1); ctx.restore();
  }
  label('DANIEL’S', 207, 485, out * eo(prog(t, SHOP + .3, .3)), C.goldText, 24);
  COPY.forEach((s, i) => {
    const p = eback(prog(t, s, .4)); if (p <= 0) return;
    const x0 = [650, 830][i], w = 170;
    ctx.save(); ctx.translate(x0 + w / 2, BASE); ctx.scale(p, p); ctx.translate(-x0 - w / 2, -BASE);
    shop(x0, BASE, w, 190, [[GREY, 1]], 1, 1); ctx.restore();
  });
  QX.forEach((x, i) => {
    const p = eback(prog(t, QUEUE[i], .35)), m = eio(prog(t, LEAVE + i * .12, .6)); if (p <= 0) return;
    ctx.save(); const px = lerp(x, QT[i], m); ctx.translate(px, FEET); ctx.scale(p, p); ctx.translate(-px, -FEET); person(px, FEET, 1.25, C.ink); ctx.restore();
  });
  const cp = eback(prog(t, CLOSED, .35));
  if (cp > 0) {
    ctx.save(); ctx.translate(72 + 270 * .71, BASE - 62); ctx.rotate(.08 * Math.sin(t * 24) * (1 - prog(t, CLOSED + .9, .5))); ctx.scale(cp, cp);
    rr(-62, -22, 124, 44, 8); ctx.fillStyle = C.ink; ctx.fill();
    ctx.font = font('sans', 22, 700); ctx.letterSpacing = '4px'; ctx.fillStyle = C.cream; ctx.textAlign = 'center'; ctx.fillText('CLOSED', 2, 8); ctx.restore();
  }
  ctx.restore();
  ring(t, CLOSED, 207, 650, 40, 300, C.gold, .7, 9);
}

/* ---------- S2: the castle and the moat (6.4 – 18.0) ---------- */
const KX = 540, KY = 650;
function tower(x, y) { rr(x - 26, y - 26, 52, 52, 6); ctx.fillStyle = PAPER; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke(); }
function scene2(t) {
  if (t < 6.4 || t > 18.1) return;
  const end = 17.8, out = 1 - eio(prog(t, end, .35)), pre = 13.7;
  line(t, 'Value is the [treasure.]', W / 2, 220, { size: 80, start: 6.65, end: pre });
  line(t, 'No moat? Ladders walk in.', W / 2, 305, { size: 54, color: C.ink2, start: 8.3, stagger: .07, end: pre });
  line(t, 'The [moat]', W / 2, 220, { size: 84, start: DROP + .05, stagger: .1, end });
  line(t, 'keeps copies out.', W / 2, 310, { size: 76, start: DROP + .3, stagger: .08, end });
  ctx.save(); ctx.globalAlpha = out;
  const ws = lerp(260, 490, eo(prog(t, DROP, .5))), wp = prog(t, DROP, .5);
  if (wp > 0) {
    ctx.beginPath(); ctx.roundRect(KX - ws / 2, KY - ws / 2, ws, ws, 40 * wp); ctx.roundRect(KX - 130, KY - 130, 260, 260, 24); ctx.fillStyle = 'rgba(94,86,75,0.20)'; ctx.fill('evenodd');
    ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.beginPath(); ctx.roundRect(KX - ws / 2, KY - ws / 2, ws, ws, 40 * wp); ctx.stroke();
    ctx.beginPath(); ctx.roundRect(KX - 130, KY - 130, 260, 260, 24); ctx.stroke();
    if (wp >= 1) {
      ctx.save(); ctx.strokeStyle = C.gold; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.setLineDash([22, 16]); ctx.lineDashOffset = -t * 40;
      ctx.beginPath(); ctx.roundRect(KX - 188, KY - 188, 376, 376, 34); ctx.stroke(); ctx.restore();
    }
  }
  const kp = eback(prog(t, KEEP, .5));
  if (kp > 0) {
    ctx.save(); ctx.translate(KX, KY); ctx.scale(kp, kp); ctx.translate(-KX, -KY);
    rr(KX - 100, KY - 100, 200, 200, 14); ctx.fillStyle = PAPER; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
    rr(KX - 74, KY - 74, 148, 148, 8); ctx.lineWidth = 3; ctx.stroke();
    [[-100, -100], [100, -100], [-100, 100], [100, 100]].forEach(([dx, dy]) => tower(KX + dx, KY + dy));
    const shake = 5 * Math.sin(t * 60) * eo(prog(t, RISE0 + .6, .8)) * (1 - eo(prog(t, DROP, .15)));
    gem(KX + shake, KY, 46, 1 + .06 * Math.sin(t * 4));
    ctx.restore();
  }
  LAD.forEach((s, i) => {
    const left = i % 2 === 0, y = [610, 610, 700, 700][i], p = eo(prog(t, s, .35)), push = eio(prog(t, DROP + .05, .55));
    const x = left ? lerp(-100, 360, p) - push * 300 : lerp(W + 100, 720, p) + push * 300;
    ladder(x, y, 140, (1 - push) * clamp(p * 3));
  });
  ctx.restore();
  ring(t, DROP, KX, KY, 60, 520, C.gold, .8, 12);
  ring(t, DROP + .12, KX, KY, 40, 420, C.goldL, .7, 8);
  burst(t, DROP, KX, KY, 28, 313, C.goldL, 1000, .9);
}

/* ---------- S3: six kinds of water (18.8 – 24.8) ---------- */
function icon6(i) {
  ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.fillStyle = C.goldL;
  if (i === 0) {
    ctx.beginPath(); ctx.arc(0, -10, 18, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-8, 4); ctx.lineTo(8, 4); ctx.lineTo(16, 38); ctx.lineTo(-16, 38); ctx.closePath(); ctx.fill(); ctx.stroke();
  } else if (i === 1) {
    const P = [[0, -34], [-40, 22], [40, 22], [0, 4]];
    ctx.beginPath(); [[0, 1], [0, 2], [1, 2], [3, 0], [3, 1], [3, 2]].forEach(([a, b]) => { ctx.moveTo(...P[a]); ctx.lineTo(...P[b]); }); ctx.stroke();
    P.forEach(([x, y]) => { ctx.beginPath(); ctx.arc(x, y, 11, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); });
  } else if (i === 2) {
    ctx.lineWidth = 8; rr(-52, -18, 62, 36, 18); ctx.stroke(); rr(-10, -18, 62, 36, 18); ctx.strokeStyle = C.gold; ctx.stroke();
  } else if (i === 3) {
    star(0, 0, 42);
  } else if (i === 4) {
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) { rr(-45 + c * 32, -45 + r * 32, 26, 26, 5); ctx.fillStyle = (r + c) % 2 ? C.goldL : PAPER; ctx.fill(); ctx.lineWidth = 4; ctx.stroke(); }
  } else {
    ctx.beginPath(); ctx.moveTo(0, -42); ctx.lineTo(34, -28); ctx.lineTo(34, 6); ctx.quadraticCurveTo(34, 30, 0, 44); ctx.quadraticCurveTo(-34, 30, -34, 6); ctx.lineTo(-34, -28); ctx.closePath();
    ctx.fill(); ctx.stroke(); ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(-14, 2); ctx.lineTo(-3, 15); ctx.lineTo(16, -10); ctx.stroke();
  }
  ctx.restore();
}
function scene3(t) {
  if (t < 18.8 || t > 24.9) return;
  const end = 24.5, out = 1 - eio(prog(t, end, .35));
  line(t, 'Six kinds of [water.]', W / 2, 220, { size: 84, start: 19.0, end });
  const names = [['SECRETS'], ['NETWORKS'], ['SWITCHING', 'COSTS'], ['BRAND'], ['SCALE'], ['PERMISSION']];
  ctx.save(); ctx.globalAlpha = out;
  names.forEach((nm, i) => {
    const p = eback(prog(t, TILES[i], .4)); if (p <= 0) return;
    const cx = 212 + (i % 3) * 328, cy = 480 + ((i / 3) | 0) * 250;
    ctx.save(); ctx.translate(cx, cy); ctx.scale(p, p);
    rr(-140, -105, 280, 210, 22); ctx.fillStyle = PAPER; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
    ctx.save(); ctx.translate(0, -26); icon6(i); ctx.restore();
    nm.forEach((s, k) => label(s, 0, 62 + k * 26 - (nm.length - 1) * 10, ctx.globalAlpha, C.ink, 24));
    ctx.restore();
  });
  ctx.restore();
  ring(t, TILES[5] + .2, 868, 730, 40, 260, C.gold, .7, 9);
  burst(t, TILES[5] + .2, 868, 730, 16, 421, C.goldL, 700, .8);
}

/* ---------- S4: layer them (24.8 – 30.8) ---------- */
function scene4(t) {
  if (t < 24.8 || t > 30.9) return;
  const end = 30.5, out = 1 - eio(prog(t, end, .35)), cy = 650, R = [62, 117, 172, 227], names = ['SECRET', 'SUBSCRIPTIONS', 'REGULARS', 'REPUTATION'];
  line(t, '[Layer] them.', W / 2, 220, { size: 84, start: 25.0, end });
  line(t, 'Rivals must cross all at once.', W / 2, 305, { size: 50, color: C.ink2, start: 28.6, stagger: .07, end });
  ctx.save(); ctx.globalAlpha = out;
  gem(W / 2, cy, 30, eback(prog(t, 25.4, .4)));
  R.forEach((r, i) => {
    const p = eio(prog(t, RINGS[i], .5)); if (p <= 0) return;
    ctx.beginPath(); ctx.arc(W / 2, cy, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * p);
    ctx.lineWidth = 14; ctx.strokeStyle = C.gold; ctx.lineCap = 'butt'; ctx.stroke();
    ctx.lineWidth = 3; ctx.strokeStyle = C.ink; ctx.beginPath(); ctx.arc(W / 2, cy, r + 7, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * p); ctx.arc(W / 2, cy, r - 7, -Math.PI / 2 + Math.PI * 2 * p, -Math.PI / 2, true); ctx.stroke();
  });
  R.forEach((r, i) => {
    const a = eo(prog(t, RINGS[i] + .35, .3)); if (a <= 0) return;
    ctx.save(); ctx.globalAlpha *= a; ctx.font = font('sans', 24, 700); ctx.letterSpacing = '4px';
    const w = ctx.measureText(names[i]).width + 28; rr(W / 2 - w / 2, cy - r - 17, w, 34, 17); ctx.fillStyle = PAPER; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = C.ink; ctx.stroke();
    ctx.fillStyle = C.ink; ctx.textAlign = 'center'; ctx.fillText(names[i], W / 2 + 2, cy - r + 7); ctx.restore();
  });
  const lp = prog(t, LADR, .55), fall = prog(t, FALL, .5);
  if (lp > 0) { ctx.save(); ctx.translate(lerp(80, 296, eo(lp)), cy + 12 + 190 * fall * fall); ctx.rotate(fall * .9); ladder(0, 0, 120, 1 - fall); ctx.restore(); }
  ctx.restore();
  burst(t, FALL + .45, 290, cy + 150, 12, 733, C.goldL, 400, .6);
}

/* ---------- S5: moats drain (30.8 – 35.8) ---------- */
function scene5(t) {
  if (t < 30.8 || t > 35.9) return;
  const end = 35.6, out = 1 - eio(prog(t, end, .35)), TOP = 560, BOT = 760;
  line(t, 'Moats [drain.]', W / 2, 220, { size: 84, start: 31.0, end });
  line(t, 'An app drained the taxi moat.', W / 2, 305, { size: 50, color: C.ink2, start: 32.2, stagger: .07, end });
  ctx.save(); ctx.globalAlpha = out;
  const gp = eio(prog(t, WATER - .1, .5));
  const poly = () => { ctx.beginPath(); ctx.moveTo(72, TOP); ctx.lineTo(220, TOP); ctx.lineTo(260, BOT); ctx.lineTo(820, BOT); ctx.lineTo(860, TOP); ctx.lineTo(W - 72, TOP); ctx.lineTo(W - 72, BOT + 50); ctx.lineTo(72, BOT + 50); ctx.closePath(); };
  if (gp > 0) {
    ctx.save(); ctx.globalAlpha *= gp; poly(); ctx.fillStyle = 'rgba(58,52,44,0.12)'; ctx.fill(); ctx.lineWidth = 6; ctx.lineJoin = 'round'; ctx.strokeStyle = C.ink; ctx.stroke();
    const frac = eo(prog(t, WATER + .1, .8)) * (1 - .96 * eio(prog(t, DRAIN[0], DRAIN[1] - DRAIN[0])));
    ctx.save(); ctx.beginPath(); ctx.moveTo(220, TOP); ctx.lineTo(260, BOT); ctx.lineTo(820, BOT); ctx.lineTo(860, TOP); ctx.closePath(); ctx.clip();
    const sy = BOT - (BOT - TOP + 14) * frac; ctx.fillStyle = C.goldL; ctx.globalAlpha *= .75; ctx.beginPath(); ctx.moveTo(200, BOT + 2);
    for (let k = 0; k <= 36; k++) ctx.lineTo(200 + k * 18, sy + 5 * Math.sin(t * 4 + k * .7));
    ctx.lineTo(880, BOT + 2); ctx.closePath(); ctx.fill(); ctx.restore();
    if (frac < .3) { ctx.strokeStyle = C.ink2; ctx.lineWidth = 3; ctx.globalAlpha *= 1 - frac / .3; ctx.beginPath(); for (let k = 0; k < 8; k++) { const x = 300 + k * 70; ctx.moveTo(x, BOT - 6); ctx.lineTo(x + 18, BOT - 22); ctx.lineTo(x + 34, BOT - 8); } ctx.stroke(); }
    const pp = eio(prog(t, PLUG, .5));
    ctx.globalAlpha = gp * (1 - pp); ctx.beginPath(); ctx.arc(540, BOT - 14 + pp * 60, 22, 0, Math.PI * 2); ctx.fillStyle = C.ink; ctx.fill();
    ctx.restore();
    label('APP', 540, BOT + 96, out * gp * eo(prog(t, PLUG - .5, .3)), C.goldText, 26);
    const kg = eback(prog(t, WATER, .5));
    if (kg > 0) {
      ctx.save(); ctx.translate(146, TOP); ctx.scale(kg, kg); ctx.translate(-146, -TOP);
      rr(92, TOP - 150, 108, 150, 8); ctx.fillStyle = PAPER; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
      [0, 1, 2].forEach(k => { rr(92 + k * 40, TOP - 176, 28, 26, 4); ctx.fillStyle = PAPER; ctx.fill(); ctx.stroke(); });
      const sh = 4 * Math.sin(t * 60) * (t > WALK[1] ? 1 - prog(t, WALK[1], .8) : 0);
      gem(146 + sh, TOP - 76, 30, 1); ctx.restore();
    }
    const pts = [[934, TOP], [860, TOP], [820, BOT], [260, BOT], [220, TOP], [206, TOP]], seg = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1])), tot = seg.reduce((a, b) => a + b, 0);
    let d = eio(prog(t, WALK[0], WALK[1] - WALK[0])) * tot, rx = pts[0][0], ry = pts[0][1];
    for (let i = 0; i < seg.length; i++) { const q = Math.min(1, d / seg[i]); rx = lerp(pts[i][0], pts[i + 1][0], q); ry = lerp(pts[i][1], pts[i + 1][1], q); d -= seg[i]; if (d <= 0) break; }
    const rp = eback(prog(t, WATER + .3, .4)); if (rp > 0) { ctx.save(); ctx.translate(rx, ry); ctx.scale(rp, rp); person(0, 0, 1.25, C.ink); ctx.restore(); }
  }
  ctx.restore();
  ring(t, WALK[1], 150, TOP - 76, 30, 300, C.gold, .7, 10);
  burst(t, WALK[1], 150, TOP - 76, 18, 811, C.goldL, 800, .8);
}

/* ---------- S6: the moat test (36.5 – 41.6) ---------- */
function scene6(t) {
  if (t < 36.5 || t > 41.7) return;
  const end = 41.45;
  line(t, 'Rival across the street.', W / 2, 215, { size: fit('Rival across the street.', 930, 76), start: 36.7, end });
  line(t, 'What is still [yours?]', W / 2, 315, { size: 84, start: 37.4, end });
  ['Secret process', 'Relationships', 'Reputation', 'Speed', 'Deep niche'].forEach((q, i) => {
    const s = R6[i], y = 500 + i * 90, np = eback(prog(t, s, .3)) * (1 - eio(prog(t, end, .3)));
    if (np > 0) {
      ctx.save(); ctx.translate(205, y - 14); ctx.scale(np, np); ctx.beginPath(); ctx.arc(0, 0, 32, 0, Math.PI * 2); ctx.fillStyle = C.gold; ctx.fill();
      ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = 6; ctx.strokeStyle = C.cream; ctx.beginPath(); ctx.moveTo(-12, 1); ctx.lineTo(-3, 11); ctx.lineTo(14, -9); ctx.stroke(); ctx.restore();
    }
    line(t, q, 270, y, { size: 56, align: 'left', start: s + .1, stagger: .06, end });
  });
}

/* ---------- S7: takeaway (41.8 – 46.85) ---------- */
function scene7(t) {
  if (t < 41.8 || t > 47) return;
  const end = 46.7, out = 1 - eio(prog(t, end, .35));
  line(t, 'Value gets you in the game.', W / 2, 330, { size: fit('Value gets you in the game.', 930, 80), start: T7.a, stagger: .09, end });
  line(t, '[A moat keeps you in it.]', W / 2, 430, { size: fit('A moat keeps you in it.', 930, 84), start: T7.b, stagger: .1, end });
  line(t, 'Dig it before you need it.', W / 2, 590, { size: 50, color: C.ink2, start: T7.s, stagger: .07, end });
  ctx.save(); ctx.globalAlpha = out;
  [[110, T7.ring], [70, T7.ring + .15]].forEach(([r, s]) => {
    const p = eio(prog(t, s, .6)); if (p <= 0) return;
    ctx.beginPath(); ctx.arc(W / 2, 770, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * p); ctx.lineWidth = 14; ctx.strokeStyle = C.gold; ctx.stroke();
  });
  gem(W / 2, 770, 34, eback(prog(t, T7.ring - .1, .4)));
  ctx.restore();
  burst(t, T7.b + .1, W / 2, 430, 24, 707, C.goldL, 1100, .9);
}

/* ---------- S8: end card ---------- */
function scene8(t) {
  if (t < E - .05) return;
  const rp = eio(prog(t, E, .55));
  ctx.fillStyle = C.night; ctx.beginPath(); ctx.arc(W / 2, 600, 1300 * rp, 0, Math.PI * 2); ctx.fill();
  if (rp < 1) return;
  [[46, E + .9], [30, E + 1.0]].forEach(([r, s]) => {
    const p = eio(prog(t, s, .5)); if (p <= 0) return;
    ctx.beginPath(); ctx.arc(W / 2, 218, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * p); ctx.lineWidth = 5; ctx.strokeStyle = C.cream; ctx.globalAlpha = .6; ctx.stroke(); ctx.globalAlpha = 1;
  });
  const gp = eback(prog(t, E + .95, .4)); if (gp > 0) gem(W / 2, 218, 15, gp);
  ring(t, E + 1.2, W / 2, 218, 30, 300, C.goldL, .8, 8);
  line(t, 'Value, Created —', W / 2, 440, { size: 88, color: C.cream, start: E + 1.15, stagger: .1 });
  const T = 'Chapter 17: Scarcity and Moats';
  line(t, '[' + T + ']', W / 2, 535, { size: fit(T, 900, 60), goldColor: C.goldL, start: E + 1.6, stagger: .06 });
  const lp = eio(prog(t, E + 2.15, .45));
  ctx.fillStyle = C.goldL; ctx.fillRect(W / 2 - 70 * lp, 590, 140 * lp, 4);
  line(t, 'Full 10-minute episode — link in comments', W / 2, 680, { font: 'sans', size: 38, color: C.cream, start: E + 2.55, stagger: .05 });
  ctx.save(); ctx.globalAlpha = .6 * eo(prog(t, E + 3.35, .5));
  ctx.font = font('sans', 22, 700); ctx.letterSpacing = '5px'; ctx.textAlign = 'center'; ctx.fillStyle = C.cream;
  ctx.fillText('A FREE AUDIOBOOK · PRODUCED BY THE JOY DIGI', W / 2 + 2.5, 980);
  ctx.restore();
}

const SCENES = [scene1, scene2, scene3, scene4, scene5, scene6, scene7];
const END_CARD = scene8;
