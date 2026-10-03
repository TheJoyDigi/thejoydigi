/* Value, Created Ch 8 LinkedIn infographic: chapter config and scenes for ../_engine (design time; WARP maps real time onto it). */
const CHAPTER = 8, KICKER_END = 46.65, BAR_END = 46.75;
const WARP = [[0, 0], [6.4, 4.5], [10.9, 7.6], [16, 11.2], [20.7, 14.5], [27.6, 19.3], [33.1, 23.2], [40.3, 28.2], [47.1, 33], [53, 38]];
/* ---------- timeline constants shared by visuals and cues ---------- */
const STOP = 1.2, CHALK = 3.9, RESTART = 4.7;
const BILL = [7.4, 8.4];
const PO = [11.5, 11.8, 12.1], USED = 12.8;
const LIGHT = [17.2, 17.7, 18.2, 18.7];
const WALK = 22.3, DROP = 23.6;
const BUB = [28.5, 28.9, 29.3], APP = 30.2, FLOW = 30.8;
const LAYERS = [34.0, 34.7, 35.4], KNOW = 37.0;
const SWIPES = [6.4, 20.7, 33.1];
const E = 46.85;
const IMPACTS = [[CHALK + .4, 6], [RESTART, 12], [BILL[0] + .3, 4], [BILL[1] + .5, 10], ...PO.map((s, i) => [s + .3, 3 + i]), [USED + 1.0, 5], ...LIGHT.map((s, i) => [s + .1, 3 + i]),
  [DROP, 16], [DROP + .45, 5], ...BUB.map(s => [s + .1, 3]), [APP + .8, 6], ...LAYERS.map((s, i) => [s + .3, 3 + i]), [KNOW + .3, 14], [41.4, 12], [E + 1.2, 7]];
const KB = [[0, 6.4], [6.4, 20.7], [20.7, 33.1], [33.1, 46.8]];

cue(0, 'impact', { v: .6 }); cue(.02, 'pop', { f: 1 });
for (let x = .3; x < STOP + .6; x += .11) cue(x, 'tick', { f: 0 });
cue(STOP + .4, 'drain', { d: 1.0 }); cue(2.5, 'thud'); cue(1.0, 'pop', { f: .9 });
cue(3.9, 'pop', { f: 1.2 }); [CHALK + .05, CHALK + .3].forEach(x => cue(x, 'scratch'));
cue(RESTART - .3, 'riser', { d: .3 }); cue(RESTART, 'boom', { v: .8 }); cue(RESTART, 'impact', { v: .9 }); cue(RESTART, 'chime', { n: 76 }); cue(5.0, 'pop', { f: 1.1 });
for (let x = RESTART + .3; x < 6.0; x += .1) cue(x, 'tick', { f: 2 });
SWIPES.forEach(x => cue(x - .3, 'whoosh', { v: 1 }));
cue(6.65, 'pop', { f: 1.2 }); cue(7.1, 'pop', { f: 1 });
cue(BILL[0], 'whoosh', { v: .25 }); cue(BILL[0] + .3, 'tick', { f: 2 }); cue(BILL[0] + .3, 'blip', { n: 60 });
cue(BILL[1] - .1, 'whoosh', { v: .4 }); cue(BILL[1] + .5, 'thud'); cue(BILL[1] + .5, 'chime', { n: 79 }); cue(BILL[1] + .5, 'impact', { v: .7 });
cue(11.1, 'pop', { f: 1.2 });
PO.forEach((s, i) => { cue(s, 'whoosh', { v: .25 }); cue(s + .3, 'thud'); cue(s + .35, 'blip', { n: [55, 59, 64][i] }); });
cue(13.2, 'pop', { f: 1.2 }); cue(USED, 'drain', { d: 1.1 }); for (let x = USED; x < USED + 1.0; x += .1) cue(x, 'tick', { f: 0 });
cue(USED + 1.0, 'thud'); cue(USED + 1.0, 'chime', { n: 76 });
cue(16.2, 'pop', { f: 1.2 }); cue(16.8, 'pop', { f: 1 });
LIGHT.forEach((s, i) => { cue(s - .1, 'swish'); cue(s + .05, 'blip', { n: [64, 67, 71, 76][i] }); cue(s + .05, 'tick', { f: 2 }); });
cue(19.6, 'chime', { n: 72 });
cue(20.2, 'riser', { d: DROP - 20.2 }); cue(21.0, 'pop', { f: 1 });
for (let x = 22.6, k = 0; x < DROP - .05; x += .12 - k * .003, k++) cue(x, 'tick', { f: k % 2 });
cue(DROP - .4, 'whoosh', { v: .4 });
cue(DROP, 'boom', { v: 1 }); cue(DROP, 'chime', { n: 79 }); cue(DROP, 'impact', { v: 1 }); cue(DROP + .2, 'whoosh', { v: .4 }); cue(DROP + .45, 'thud'); cue(25.4, 'pop', { f: .9 });
cue(27.8, 'pop', { f: 1.2 }); cue(28.0, 'swish');
BUB.forEach((s, i) => { cue(s, 'pop', { f: [1, 1.2, 1.4][i] }); cue(s + .05, 'blip', { n: [60, 64, 67][i] }); });
cue(APP - .1, 'whoosh', { v: .3 }); cue(APP + .3, 'thud'); cue(30.2, 'pop', { f: 1.2 });
for (let x = FLOW; x < FLOW + .9; x += .15) cue(x, 'tick', { f: 2 });
cue(FLOW + .9, 'chime', { n: 74 });
cue(33.3, 'pop', { f: 1 });
LAYERS.forEach((s, i) => { cue(s, 'whoosh', { v: .25 }); cue(s + .3, 'thud'); cue(s + .35, 'blip', { n: [72, 67, 62][i] }); });
cue(KNOW - .6, 'riser', { d: .6 }); cue(KNOW, 'whoosh', { v: .5 }); cue(KNOW + .3, 'boom', { v: .9 }); cue(KNOW + .3, 'chime', { n: 79 }); cue(KNOW + .3, 'impact', { v: .9 }); cue(KNOW + .5, 'pop', { f: 1.2 });
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
function glow(x, y, r, a) {
  if (a <= 0) return;
  const g = ctx.createRadialGradient(x, y, 10, x, y, r);
  g.addColorStop(0, `rgba(221,182,95,${a})`); g.addColorStop(1, 'rgba(221,182,95,0)');
  ctx.fillStyle = g; ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
}
function small(str, x, y, a, color, size, align) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.font = font('sans', size || 30, 500); ctx.textAlign = align || 'center'; ctx.fillStyle = color || C.ink2; ctx.fillText(str, x, y); ctx.restore();
}
function person(x, y, s, head, body, lw) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineWidth = (lw || 6) / s; ctx.strokeStyle = C.ink;
  ctx.beginPath(); ctx.arc(0, -150, 44, 0, Math.PI * 2); ctx.fillStyle = head || C.paper; ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-90, 0); ctx.bezierCurveTo(-90, -80, -50, -100, 0, -100); ctx.bezierCurveTo(50, -100, 90, -80, 90, 0); ctx.closePath();
  ctx.fillStyle = body || 'rgba(58,52,44,0.12)'; ctx.fill(); ctx.stroke(); ctx.restore();
}
function gear(x, y, r, ang, fill, lw) {
  const N = 12, st = Math.PI * 2 / N;
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.lineJoin = 'round'; ctx.beginPath();
  for (let i = 0; i < N; i++) {
    const a = i * st; [[-.32, .8], [-.2, 1], [.2, 1], [.32, .8]].forEach(([d, k], j) => { const px = Math.cos(a + d * st) * r * k, py = Math.sin(a + d * st) * r * k; if (i === 0 && j === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); });
  }
  ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); ctx.lineWidth = lw || 6; ctx.strokeStyle = C.ink; ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 0, r * .42, 0, Math.PI * 2); ctx.fillStyle = C.paper; ctx.fill(); ctx.lineWidth = (lw || 6) * .8; ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 0, r * .12, 0, Math.PI * 2); ctx.fillStyle = C.ink; ctx.fill(); ctx.restore();
}

/* ---------- S1: the factory stops (0 – 6.4) ---------- */
const GXS = [[250, 100], [540, 140], [830, 100]];
const gearAng = (t, i) => {
  const w = [1.6, -1.1, 1.6][i], base = t < STOP ? w * t : w * (STOP + .5 * eo(prog(t, STOP, .9)));
  const u = Math.max(0, t - RESTART), rest = w * 2.4 * (u < .6 ? u * u / 1.2 : u - .3);
  return base + rest;
};
function scene1(t) {
  if (t > 6.6) return;
  line(t, 'A factory stops.', W / 2, 215, { size: 84, start: -.62, stagger: .1, end: 3.7 });
  line(t, 'Nobody knows why.', W / 2, 305, { size: 54, color: C.ink2, start: 1.0, stagger: .08, end: 3.7 });
  line(t, 'One chalk [X.]', W / 2, 220, { size: 84, start: CHALK, stagger: .1, end: 5.95 });
  line(t, 'It roars back.', W / 2, 310, { size: 70, color: C.ink2, start: RESTART + .1, stagger: .1, end: 5.95 });
  const out = 1 - eio(prog(t, 5.95, .35));
  ctx.save(); ctx.globalAlpha = out;
  GXS.forEach(([x, r], i) => {
    const p = eback(prog(t, .1 + i * .12, .4)); if (p <= 0) return;
    ctx.save(); ctx.translate(x, 640); ctx.scale(clamp(p), clamp(p)); ctx.translate(-x, -640);
    const on = t >= RESTART ? eo(prog(t, RESTART, .3)) : 0;
    if (on > 0) glow(x, 640, r * 2.2, .5 * on);
    gear(x, 640, r, gearAng(t, i), i === 1 ? C.goldL : '#CDBFA7'); ctx.restore();
  });
  const xp = eio(prog(t, CHALK, .3)), xq = eio(prog(t, CHALK + .25, .3));
  if (xp > 0) {
    ctx.save(); ctx.strokeStyle = C.ink; ctx.lineWidth = 14; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(540 - 44, 640 - 44); ctx.lineTo(540 - 44 + 88 * xp, 640 - 44 + 88 * xp); ctx.stroke();
    if (xq > 0) { ctx.beginPath(); ctx.moveTo(540 + 44, 640 - 44); ctx.lineTo(540 + 44 - 88 * xq, 640 - 44 + 88 * xq); ctx.stroke(); }
    ctx.restore();
  }
  ctx.restore();
  ring(t, RESTART, 540, 640, 60, 520, C.gold, .8, 12);
  burst(t, RESTART, 540, 640, 26, 41, C.goldL, 1000, .8);
}

/* ---------- S2: the bill (6.4 – 10.9) ---------- */
function scene2(t) {
  if (t < 6.4 || t > 11) return;
  const end = 10.45, out = 1 - eio(prog(t, end, .35));
  line(t, 'The chalk mark was cheap.', W / 2, 220, { size: fit('The chalk mark was cheap.', 936, 80, 'serif'), start: 6.65, stagger: .08, end });
  line(t, 'Knowing where to put it wasn’t.', W / 2, 305, { size: 50, color: C.ink2, start: 9.0, stagger: .06, end });
  const cp = eback(prog(t, 6.8, .5)); if (cp <= 0) return;
  ctx.save(); ctx.globalAlpha = out; ctx.translate(540, 640); ctx.scale(clamp(cp), clamp(cp)); ctx.translate(-540, -640);
  rr(150, 450, 780, 400, 20); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
  ctx.restore();
  label('INVOICE', 210, 515, out * eo(prog(t, 7.0, .3)), C.goldText, 24, 'left');
  ctx.save(); ctx.globalAlpha = out; ctx.strokeStyle = C.faint; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(210, 540); ctx.lineTo(870, 540); ctx.stroke();
  const rows = [[610, 'CHALK MARK', 16, BILL[0], C.ink], [740, 'KNOWING WHERE', 600, BILL[1], C.gold]];
  rows.forEach(([y, nm, w, s, col], i) => {
    const p = i === 1 ? eio(prog(t, s, .6)) : eback(prog(t, s, .4));
    label(nm, 210, y - 30, out * eo(prog(t, s - .1, .3)), i ? C.goldText : C.ink2, 24, 'left');
    if (p > 0) { rr(210, y - 18, Math.max(6, w * clamp(p)), 40, 10); ctx.fillStyle = col; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke(); }
  });
  ctx.restore();
  glow(540, 740, 300 * eo(prog(t, BILL[1] + .4, .4)), .35 * out);
  ring(t, BILL[1] + .5, 810, 742, 40, 340, C.gold, .8, 10);
  burst(t, BILL[1] + .5, 810, 742, 22, 29, C.goldL, 900, .8);
}

/* ---------- S3: other raw materials get used up (10.9 – 16) ---------- */
function girder(x, y, s, a) {
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineWidth = 6 / s; ctx.lineJoin = 'round'; ctx.strokeStyle = C.ink; ctx.fillStyle = '#CDBFA7';
  ctx.beginPath(); ctx.moveTo(-90, -90); ctx.lineTo(90, -90); ctx.lineTo(90, -66); ctx.lineTo(18, -66); ctx.lineTo(18, -24); ctx.lineTo(90, -24); ctx.lineTo(90, 0); ctx.lineTo(-90, 0); ctx.lineTo(-90, -24); ctx.lineTo(-18, -24); ctx.lineTo(-18, -66); ctx.lineTo(-90, -66); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
}
function logPiece(x, y, s, a) {
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineWidth = 6 / s; ctx.strokeStyle = C.ink;
  rr(-90, -90, 170, 90, 18); ctx.fillStyle = '#B98F5E'; ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(80, -45, 22, 45, 0, 0, Math.PI * 2); ctx.fillStyle = '#E9D2A6'; ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(80, -45, 9, 20, 0, 0, Math.PI * 2); ctx.lineWidth = 3 / s; ctx.stroke(); ctx.restore();
}
function scene3(t) {
  if (t < 10.9 || t > 16.1) return;
  const end = 15.55, out = 1 - eio(prog(t, end, .35));
  line(t, 'Iron runs out. Wood burns.', W / 2, 220, { size: 70, start: 11.1, stagger: .08, end });
  line(t, '[Knowledge doesn’t.]', W / 2, 315, { size: 88, start: 13.2, stagger: .1, end });
  ctx.save(); ctx.globalAlpha = out;
  const BY = 760, X = [250, 540, 830];
  ctx.strokeStyle = C.ink; ctx.lineWidth = 5; ctx.lineCap = 'round'; const gp = eio(prog(t, 11.2, .4));
  ctx.beginPath(); ctx.moveTo(W / 2 - (W / 2 - 72) * gp, BY); ctx.lineTo(W / 2 + (W / 2 - 72) * gp, BY); ctx.stroke();
  const use = eio(prog(t, USED, 1.0));
  const ip = eback(prog(t, PO[0], .45)), lp = eback(prog(t, PO[1], .45)), kp = eback(prog(t, PO[2], .45));
  if (ip > 0) { girder(X[0], BY, 1.55 * clamp(ip) * (1 - use * .95), 1 - use * .7); }
  if (lp > 0) { logPiece(X[1], BY, 1.55 * clamp(lp) * (1 - use * .95), 1 - use * .7); }
  if (use > 0 && use < 1) for (let i = 0; i < 10; i++) { const x = X[i % 2] + (rnd(i) - .5) * 120, y = BY - 40 - use * (60 + 120 * rnd(i + 3)); ctx.globalAlpha = out * (1 - use) * .8; ctx.fillStyle = C.ink2; ctx.beginPath(); ctx.arc(x, y, 3 + 3 * rnd(i + 7), 0, Math.PI * 2); ctx.fill(); }
  ctx.globalAlpha = out;
  if (kp > 0) {
    const pulse = 1 + .04 * Math.sin(t * 5);
    glow(X[2], BY - 100, 250 * clamp(kp), .75);
    ctx.save(); ctx.translate(X[2], BY - 100); ctx.scale(clamp(kp) * pulse, clamp(kp) * pulse);
    for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6 + t * .3; ctx.beginPath(); ctx.moveTo(Math.cos(a) * 80, Math.sin(a) * 80); ctx.lineTo(Math.cos(a) * 104, Math.sin(a) * 104); ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.strokeStyle = C.gold; ctx.stroke(); }
    ctx.beginPath(); ctx.arc(0, 0, 66, 0, Math.PI * 2); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 0, 34, 0, Math.PI * 2); ctx.lineWidth = 4; ctx.stroke(); ctx.restore();
  }
  ctx.restore();
  label('KNOWLEDGE', X[2], BY + 52, out * eo(prog(t, PO[2] + .3, .3)), C.goldText, 24);
  ring(t, USED + 1.0, X[2], BY - 100, 70, 330, C.gold, .8, 10);
}

/* ---------- S4: share it, keep all of it (16 – 20.7) ---------- */
const CX = [200, 380, 560, 740, 920], CBY = 810;
function candle(x, h, t, lit, seed) {
  ctx.save(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; rr(x - 30, CBY - h, 60, h, 8); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x, CBY - h); ctx.lineTo(x, CBY - h - 16); ctx.lineWidth = 4; ctx.stroke();
  if (lit > 0) {
    const fl = 1 + .08 * Math.sin(t * 11 + seed), fy = CBY - h - 16;
    glow(x, fy - 36, 130 * lit, .7);
    ctx.save(); ctx.translate(x, fy); ctx.scale(lit * fl, lit * fl); ctx.beginPath(); ctx.moveTo(0, -72); ctx.bezierCurveTo(26, -40, 22, -6, 0, 0); ctx.bezierCurveTo(-22, -6, -26, -40, 0, -72);
    ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 4; ctx.stroke(); ctx.restore();
  }
  ctx.restore();
}
function scene4(t) {
  if (t < 16 || t > 20.8) return;
  const end = 20.25, out = 1 - eio(prog(t, end, .35));
  line(t, 'Share it.', W / 2, 220, { size: 84, start: 16.2, stagger: .1, end });
  line(t, '[Keep all of it.]', W / 2, 310, { size: 84, start: 16.8, stagger: .1, end });
  ctx.save(); ctx.globalAlpha = out;
  ctx.strokeStyle = C.ink; ctx.lineWidth = 5; ctx.lineCap = 'round'; const gp = eio(prog(t, 16.3, .4));
  ctx.beginPath(); ctx.moveTo(W / 2 - (W / 2 - 72) * gp, CBY); ctx.lineTo(W / 2 + (W / 2 - 72) * gp, CBY); ctx.stroke();
  CX.forEach((x, i) => {
    const p = eback(prog(t, 16.4 + i * .1, .4)); if (p <= 0) return;
    const lit = i === 0 ? eback(prog(t, 16.8, .4)) : eback(prog(t, LIGHT[i - 1], .35));
    ctx.save(); ctx.translate(x, CBY); ctx.scale(1, clamp(p)); ctx.translate(-x, -CBY); candle(x, i === 0 ? 230 : 130, t, 0, i); ctx.restore();
    if (lit > 0) candle(x, i === 0 ? 230 : 130, t, clamp(lit), i);
    if (i > 0) {
      const q = prog(t, LIGHT[i - 1] - .3, .35), ph = CX[i - 1], fy0 = CBY - (i === 1 ? 230 : 130) - 70, fy1 = CBY - 130 - 70;
      if (q > 0 && q < 1) { const e = eio(q); ctx.beginPath(); ctx.arc(lerp(ph, x, e), lerp(fy0, fy1, e) - 70 * Math.sin(Math.PI * e), 12, 0, Math.PI * 2); ctx.fillStyle = C.goldL; ctx.fill(); }
    }
    burst(t, LIGHT[Math.max(0, i - 1)], x, CBY - 150, 8, 17 + i, C.goldL, 400, .6);
  });
  ctx.restore();
}

/* ---------- S5: write it down (20.7 – 27.6) ---------- */
function scene5(t) {
  if (t < 20.7 || t > 27.7) return;
  const end = 27.1, out = 1 - eio(prog(t, end, .35)), PXN = 330, GY = 800, HY = GY - 150 * 1.7;
  line(t, 'One head holds it.', W / 2, 220, { size: 84, start: 21.0, stagger: .1, end: 23.45 });
  line(t, '[Write it down.]', W / 2, 220, { size: 92, start: DROP, stagger: .12, end });
  line(t, 'A rumor becomes an asset.', W / 2, 330, { size: 48, color: C.ink2, start: 25.4, stagger: .06, end });
  const pp = eback(prog(t, 21.2, .45)), gp = eback(prog(t, 21.7, .45));
  const walk = eio(prog(t, WALK, 1.3)), orb = prog(t, DROP - .4, .4), after = eo(prog(t, DROP + .1, .6));
  const px = PXN - 250 * walk, pa = 1 - walk;
  ctx.save(); ctx.globalAlpha = out;
  ctx.strokeStyle = C.faint; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(72, GY + 4); ctx.lineTo(W - 72, GY + 4); ctx.stroke();
  if (pp > 0 && pa > 0) {
    ctx.save(); ctx.globalAlpha = out * pa; const hg = orb < 1 ? 1 - eo(orb) : 0;
    glow(px, HY, 200, .75 * hg * clamp(pp));
    ctx.save(); ctx.translate(px, GY); ctx.scale(clamp(pp), clamp(pp)); ctx.translate(-px, -GY); person(px, GY, 1.7, C.paper, 'rgba(58,52,44,0.12)');
    ctx.beginPath(); ctx.arc(px, HY, 26 * (1 + .1 * Math.sin(t * 8)) * hg, 0, Math.PI * 2); ctx.fillStyle = C.gold; ctx.fill(); ctx.restore();
    ctx.restore();
  }
  if (gp > 0) {
    const PGX = 760, PGY = 470;
    ctx.save(); ctx.translate(PGX, 640); ctx.scale(clamp(gp), clamp(gp)); ctx.translate(-PGX, -640);
    glow(PGX, 640, 320, .6 * after);
    rr(PGX - 130, PGY, 260, 340, 14); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
    ctx.lineCap = 'round'; ctx.lineWidth = 6;
    for (let i = 0; i < 5; i++) { const lp = eio(prog(t, DROP + .3 + i * .18, .35)); ctx.strokeStyle = lp > 0 ? C.goldText : C.faint; ctx.beginPath(); ctx.moveTo(PGX - 90, PGY + 70 + i * 52); ctx.lineTo(PGX - 90 + (i === 4 ? 100 : 180) * (lp > 0 ? lp : 1), PGY + 70 + i * 52); ctx.stroke(); }
    ctx.restore();
  }
  if (orb > 0 && orb < 1) {
    const q = eio(orb), ox = lerp(PXN, 760, q), oy = lerp(HY, 640, q) - 150 * Math.sin(Math.PI * q);
    ctx.beginPath(); ctx.arc(ox, oy, 26, 0, Math.PI * 2); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.gold; ctx.stroke();
  }
  star(880, 520, 22, (.5 + .5 * Math.sin(t * 5)) * after); star(640, 600, 15, (.5 + .5 * Math.sin(t * 5 + 2)) * after);
  ctx.restore();
  ring(t, DROP, 760, 640, 50, 520, C.gold, .8, 12);
  ring(t, DROP + .12, 760, 640, 30, 420, C.goldL, .7, 8);
  burst(t, DROP, 760, 640, 30, 313, C.goldL, 1000, .9);
}

/* ---------- S6: teach it, watch a master (27.6 – 33.1) ---------- */
function bubble(x, y, w, h, s, flip) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s * (flip ? -1 : 1), s); ctx.lineWidth = 5 / s; ctx.strokeStyle = C.ink; ctx.lineJoin = 'round';
  rr(-w / 2, -h / 2, w, h, 16); ctx.fillStyle = C.goldL; ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-w / 2 + 16, h / 2 - 2); ctx.lineTo(-w / 2 - 6, h / 2 + 24); ctx.lineTo(-w / 2 + 40, h / 2 - 2); ctx.closePath(); ctx.fillStyle = C.goldL; ctx.fill(); ctx.stroke();
  ctx.lineWidth = 4 / s; ctx.beginPath(); ctx.moveTo(-w / 2 + 18, -6); ctx.lineTo(w / 2 - 18, -6); ctx.moveTo(-w / 2 + 18, 10); ctx.lineTo(w / 2 - 40, 10); ctx.stroke(); ctx.restore();
}
function scene6(t) {
  if (t < 27.6 || t > 33.2) return;
  const end = 32.65, out = 1 - eio(prog(t, end, .35));
  line(t, 'Teach what you learn.', W / 2, 220, { size: 76, start: 27.8, stagger: .08, end });
  line(t, 'Watch the [masters.]', W / 2, 310, { size: 76, start: 29.9, stagger: .1, end });
  const CXS = [300, 780], CY = 450, CW = 380, CH = 420;
  const lc = eback(prog(t, 28.2, .45)), rc = eback(prog(t, APP, .45));
  ctx.save(); ctx.globalAlpha = out;
  if (lc > 0) {
    ctx.save(); ctx.translate(CXS[0], CY + CH / 2); ctx.scale(clamp(lc), clamp(lc)); ctx.translate(-CXS[0], -CY - CH / 2);
    rr(CXS[0] - CW / 2, CY, CW, CH, 22); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
    person(CXS[0] - 10, CY + 380, .95, C.paper, 'rgba(58,52,44,0.12)', 5);
    [[CXS[0] - 90, CY + 100, 0], [CXS[0] + 80, CY + 170, 1], [CXS[0] + 20, CY + 60, 0]].forEach(([x, y, f], i) => { const p = eback(prog(t, BUB[i], .35)); if (p > 0) bubble(x, y, 110, 54, clamp(p), f); });
  }
  if (rc > 0) {
    ctx.save(); ctx.translate(CXS[1], CY + CH / 2); ctx.scale(clamp(rc), clamp(rc)); ctx.translate(-CXS[1], -CY - CH / 2);
    rr(CXS[1] - CW / 2, CY, CW, CH, 22); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
    person(CXS[1] - 90, CY + 380, 1.0, C.paper, 'rgba(58,52,44,0.12)', 5);
    person(CXS[1] + 90, CY + 380, .78, C.paper, 'rgba(58,52,44,0.12)', 5);
    const fp = prog(t, FLOW, .9);
    for (let i = 0; i < 6; i++) {
      const q = clamp(fp * 1.6 - i * .15); if (q <= 0 || q >= 1) continue;
      const e = eio(q); ctx.beginPath(); ctx.arc(lerp(CXS[1] - 90, CXS[1] + 90, e), lerp(CY + 230, CY + 255, e) - 50 * Math.sin(Math.PI * e), 9, 0, Math.PI * 2); ctx.fillStyle = C.gold; ctx.fill();
    }
    glow(CXS[1] + 90, CY + 255, 100 * eo(prog(t, FLOW + .8, .3)), .7);
  }
  ctx.restore();
  label('TEACH', CXS[0], CY + CH + 50, out * eo(prog(t, 28.5, .3)), C.ink2, 24);
  label('APPRENTICE', CXS[1], CY + CH + 50, out * eo(prog(t, APP + .3, .3)), C.ink2, 24);
  ring(t, FLOW + .9, CXS[1] + 90, CY + 255, 30, 200, C.gold, .7, 8);
}

/* ---------- S7: the layers (33.1 – 40.3) ---------- */
function scene7(t) {
  if (t < 33.1 || t > 40.4) return;
  const end = 39.85, out = 1 - eio(prog(t, end, .35));
  line(t, 'Underneath it all:', W / 2, 225, { size: 52, color: C.ink2, start: 33.3, stagger: .07, end });
  line(t, '[knowledge.]', W / 2, 335, { size: 96, start: KNOW + .15, stagger: .1, end });
  const LY = [510, 620, 730, 840], LW = [420, 500, 580, 690], LX = 72;
  const names = ['TIME', 'EFFORT', 'SKILL', 'KNOWLEDGE'], desc = ['runs out', 'runs dry', 'compounds', ''];
  const starts = [LAYERS[0], LAYERS[1], LAYERS[2], KNOW];
  ctx.save(); ctx.globalAlpha = out;
  starts.forEach((s, i) => {
    const p = i === 3 ? eback(prog(t, s, .5)) : eback(prog(t, s, .45)); if (p <= 0) return;
    const k = i === 3, drop = k ? (1 - clamp(p)) * 200 : 0, w = LW[i] * clamp(p);
    if (k) glow(LX + LW[i] / 2, LY[i], 360 * eo(prog(t, s + .2, .4)), .7);
    rr(LX, LY[i] - 46 + drop, w, 92, 14); ctx.fillStyle = k ? C.gold : ['#E4DAC6', '#D3C8B0', '#BFB399'][i]; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke();
  });
  ctx.restore();
  names.forEach((nm, i) => label(nm, LX + 28, LY[i] + 9, out * eo(prog(t, starts[i] + .25, .3)), i === 3 ? C.ink : C.ink, 24, 'left'));
  desc.forEach((d, i) => { if (d) small(d, LX + LW[i] + 28, LY[i] + 14, out * eo(prog(t, starts[i] + .4, .3)), C.ink2, 44, 'left'); });
  ring(t, KNOW + .3, LX + LW[3] / 2, LY[3], 60, 480, C.gold, .8, 12);
  ring(t, KNOW + .42, LX + LW[3] / 2, LY[3], 40, 380, C.goldL, .7, 8);
  burst(t, KNOW + .3, LX + LW[3] / 2, LY[3], 28, 377, C.goldL, 1000, .9);
}

/* ---------- S8: takeaway (40.3 – 47.1) ---------- */
function scene8(t) {
  if (t < 40.3 || t > 47.1) return;
  const end = 46.7, out = 1 - eio(prog(t, end, .35));
  ctx.save(); ctx.globalAlpha = out;
  [[250, 0], [244, -14], [258, 12], [236, -8], [248, 10]].forEach(([w, off], i) => {
    const p = eback(prog(t, 40.45 + i * .12, .4)); if (p <= 0) return;
    const top = i === 4, y = 490 - i * 56;
    ctx.save(); ctx.translate(540 + off, y); ctx.scale(clamp(p), clamp(p)); ctx.lineJoin = 'round'; ctx.lineWidth = 5; ctx.strokeStyle = C.ink;
    rr(-w / 2, -26, w, 52, 8); ctx.fillStyle = top ? C.gold : '#FFFBF3'; ctx.fill(); ctx.stroke();
    ctx.fillStyle = C.ink; ctx.fillRect(-w / 2 + 4, -22, 16, 44);
    ctx.beginPath(); ctx.lineWidth = 3; ctx.strokeStyle = top ? C.ink : C.ink2; ctx.moveTo(-w / 2 + 44, -6); ctx.lineTo(w / 2 - 28, -6); ctx.moveTo(-w / 2 + 44, 10); ctx.lineTo(w / 2 - 70, 10); ctx.stroke(); ctx.restore();
  });
  const hp = eo(prog(t, 41.5, .4)); if (hp > 0) glow(550, 266, 170, .55 * hp);
  ctx.restore();
  line(t, 'Build the stockpile.', W / 2, 610, { size: fit('Build the stockpile.', 936, 92, 'serif'), start: 40.65, stagger: .1, end });
  const s2 = 'Write down the chalk marks.';
  const r = line(t, '[' + s2 + ']', W / 2, 720, { size: fit(s2, 936, 84, 'serif'), start: 41.4, stagger: .08, end });
  const u = eio(prog(t, 42.35, .4)) * out;
  if (u > 0) { ctx.fillStyle = C.gold; ctx.fillRect(r.x0, 752, r.w * u, 9); }
  burst(t, 41.5, W / 2, 690, 24, 707, C.goldL, 1100, .9);
}

/* ---------- S9: end card (47.1 – 53) ---------- */
function scene9(t) {
  if (t < E - .05) return;
  const rp = eio(prog(t, E, .55));
  ctx.fillStyle = C.night; ctx.beginPath(); ctx.arc(W / 2, 600, 1300 * rp, 0, Math.PI * 2); ctx.fill();
  if (rp < 1) return;
  const gp = eio(prog(t, E + .9, .4));
  ctx.fillStyle = C.cream; ctx.globalAlpha = .7; ctx.fillRect(W / 2 - 120 * gp, 186, 240 * gp, 4); ctx.globalAlpha = 1;
  const p1 = eback(prog(t, E + .95, .4)), p2 = eio(prog(t, E + 1.3, .3)), p3 = eio(prog(t, E + 1.5, .3));
  if (p1 > 0) {
    ctx.save(); ctx.globalAlpha = .7; ctx.translate(W / 2, 290); ctx.scale(clamp(p1), clamp(p1)); ctx.translate(-W / 2, -290);
    gear(W / 2, 290, 62, t * .9, C.night, 5); ctx.restore();
  }
  if (p2 > 0) {
    ctx.save(); ctx.strokeStyle = C.goldL; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(W / 2 - 30, 260); ctx.lineTo(W / 2 - 30 + 60 * p2, 260 + 60 * p2); ctx.stroke();
    if (p3 > 0) { ctx.beginPath(); ctx.moveTo(W / 2 + 30, 260); ctx.lineTo(W / 2 + 30 - 60 * p3, 260 + 60 * p3); ctx.stroke(); } ctx.restore();
  }
  ring(t, E + 1.5, W / 2, 290, 40, 300, C.goldL, .8, 8);
  const rows = ['Chapter 8:', 'Knowledge as Raw Material'], sz = Math.min(...rows.map(r => fit(r, 900, 72, 'serif'))), ry = 520 + rows.length * 78 - 30;
  line(t, 'Value, Created —', W / 2, 430, { size: 88, color: C.cream, start: E + 1.15, stagger: .1 });
  rows.forEach((r, i) => line(t, '[' + r + ']', W / 2, 520 + i * 78, { size: sz, goldColor: C.goldL, start: E + 1.6 + i * .2, stagger: .06 }));
  const lp = eio(prog(t, E + 2.15, .45));
  ctx.fillStyle = C.goldL; ctx.fillRect(W / 2 - 70 * lp, ry, 140 * lp, 4);
  line(t, 'Full 8-minute episode — link in comments', W / 2, ry + 90, { font: 'sans', size: fit('Full 8-minute episode — link in comments', 936, 44, 'sans'), color: C.cream, start: E + 2.55, stagger: .05 });
  ctx.save(); ctx.globalAlpha = .6 * eo(prog(t, E + 3.35, .5));
  ctx.font = font('sans', 24, 700); ctx.letterSpacing = '5px'; ctx.textAlign = 'center'; ctx.fillStyle = C.cream;
  ctx.fillText('A FREE AUDIOBOOK · PRODUCED BY THE JOY DIGI', W / 2 + 2.5, 980);
  ctx.restore();
}

const SCENES = [scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8];
const END_CARD = scene9;
