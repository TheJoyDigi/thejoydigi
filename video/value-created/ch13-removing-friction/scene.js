/* Value, Created Ch 13 LinkedIn infographic: chapter config and scenes for ../_engine (design time; WARP maps real time onto it). */
const CHAPTER = 13, KICKER_END = 46.65, BAR_END = 46.75;
const WARP = [[0, 0], [6.4, 4.5], [10.9, 7.6], [16, 11.2], [20.7, 14.5], [27.6, 19.3], [33.1, 23.2], [40.3, 28.2], [47.1, 33], [53, 38]];
/* ---------- timeline constants shared by visuals and cues ---------- */
const FLIP = 3.9, PRE = [[.5, 0], [.85, 0], [1.2, 1], [1.55, 0], [1.9, 0], [2.25, 0], [2.6, 0]], POST = [4.1, 4.3, 4.5, 4.7, 4.9, 5.1, 5.3];
const BOOTH = [6.95, 7.15, 7.35, 7.55, 7.75], TRAIN = 8.0, SP2 = 560, XS = [190, 365, 540, 715, 890], EXIT = [1, 1, 2, 2, 3, 3, 4, 4, 5, 6];
const DROPS = EXIT.map((e, i) => e > 5 ? null : TRAIN + i * .11 + (XS[e - 1] - 72) / SP2 + .15).filter(x => x);
const GRID0 = 11.3, TK = [13.0, 13.9, 14.8];
const FILL = [16.9, 17.16, 17.42, 17.68, 17.94, 18.2, 18.46, 18.72], BOUNCE = [19.2, 19.7];
const BUILD = 21.3, WHEELS = [22.4, 22.7], DROP = 23.6, CART_N = 16;
const CK = [29.3, 29.8, 30.3, 30.8], DEL = [34.5, 35.4];
const SWIPES = [6.4, 20.7, 33.1];
const E = 46.85;
const IMPACTS = [[FLIP + .25, 12], ...BOOTH.map(s => [s + .3, 4]), ...TK.map(s => [s + .1, 5]), ...BOUNCE.map(s => [s + .3, 6]), [FILL[7] + .25, 4],
  [BUILD + 1.2, 4], [DROP, 16], [DROP + .45, 5], ...CK.map(s => [s + .05, 4]), ...DEL.map(s => [s + .1, 6]), [39.0, 7], [41.4, 12], [E + 1.2, 7]];
const KB = [[0, 6.4], [6.4, 20.7], [20.7, 33.1], [33.1, 46.8]];

cue(0, 'impact', { v: .6 }); cue(.02, 'pop', { f: 1 });
PRE.forEach(([s, p]) => cue(s + .9, p ? 'tick' : 'thud', p ? { f: 2 } : undefined));
cue(3.1, 'pop', { f: 1 });
cue(FLIP - .2, 'riser', { d: .2 }); cue(FLIP + .25, 'impact', { v: .9 }); cue(FLIP + .25, 'chime', { n: 76 }); cue(FLIP + .1, 'pop', { f: 1.2 });
POST.forEach((x, i) => cue(x + .1, 'blip', { n: [64, 67, 71, 74, 76, 79, 83][i] }));
cue(4.7, 'pop', { f: 1.2 });
SWIPES.forEach(x => cue(x - .3, 'whoosh', { v: 1 }));
cue(6.65, 'pop', { f: 1.2 }); cue(7.1, 'pop', { f: .9 });
BOOTH.forEach((s, i) => { cue(s, 'whoosh', { v: .25 }); cue(s + .3, 'thud'); cue(s + .35, 'blip', { n: [55, 59, 62, 64, 67][i] }); });
DROPS.forEach((x, i) => cue(x, 'tick', { f: i % 3 }));
cue(11.1, 'pop', { f: 1.2 }); cue(11.7, 'pop', { f: .9 });
for (let x = GRID0, k = 0; k < 20; x += .06, k++) cue(x, 'tick', { f: 1 });
TK.forEach((s, i) => { cue(s - .1, 'whoosh', { v: .3 }); cue(s + .1, 'knock', { v: .9 }); cue(s + .1, 'blip', { n: [60, 57, 53][i] }); });
cue(15.9, 'whoosh', { v: .35 });
cue(16.2, 'pop', { f: 1.2 }); cue(16.7, 'pop', { f: .9 });
FILL.forEach((s, i) => { cue(s + .3, 'thud'); cue(s + .32, 'blip', { n: 55 + i * 2 }); });
BOUNCE.forEach(s => { cue(s + .3, 'knock', { v: 1 }); cue(s + .35, 'swish'); });
cue(20.2, 'riser', { d: DROP - 20.2 }); cue(21.0, 'pop', { f: 1 });
cue(BUILD, 'whoosh', { v: .3 }); cue(BUILD + .9, 'thud'); WHEELS.forEach(x => { cue(x, 'pop', { f: 1 }); cue(x + .05, 'thud'); });
for (let x = 22.9, k = 0; x < DROP - .05; x += .12 - k * .004, k++) cue(x, 'tick', { f: k % 2 });
cue(DROP, 'boom', { v: 1 }); cue(DROP, 'chime', { n: 79 }); cue(DROP, 'impact', { v: 1 }); cue(DROP + .2, 'whoosh', { v: .4 });
for (let i = 0; i < CART_N; i += 2) cue(DROP + .3 + i * .1, 'tick', { f: (i / 2) % 3 });
cue(25.3, 'pop', { f: .9 });
cue(27.8, 'pop', { f: 1.2 }); cue(28.5, 'pop', { f: .9 }); cue(28.2, 'swish');
CK.forEach((s, i) => { cue(s, 'knock', { v: .8 }); cue(s + .02, 'blip', { n: [62, 62, 62, 62][i] }); });
cue(31.1, 'impact', { v: .8 }); cue(31.1, 'chime', { n: 72 }); cue(31.6, 'swish');
cue(33.3, 'pop', { f: 1.2 }); cue(33.9, 'pop', { f: .9 });
DEL.forEach((s, i) => { cue(s, 'scratch'); cue(s + .2, 'swish'); cue(s + .35, 'blip', { n: [67, 72][i] }); });
cue(36.4, 'pop', { f: 1.2 }); cue(37.0, 'pop', { f: .9 });
for (let x = 37.3; x < 38.5; x += .1) cue(x, 'tick', { f: 0 });
cue(38.55, 'thud'); cue(38.6, 'blip', { n: 64 }); cue(39.0, 'pop', { f: 1.2 }); cue(39.0, 'chime', { n: 76 });
cue(40.0, 'whoosh', { v: .35 }); cue(40.45, 'thud'); cue(41.4, 'impact', { v: .9 }); cue(42.35, 'swish'); cue(43.4, 'pop', { f: .9 });
cue(E - .05, 'whoosh', { v: 1 });
[E + .95, E + 1.1].forEach((x, i) => cue(x + .1, 'blip', { n: [72, 79][i] }));
cue(E + 1.2, 'boom', { v: .9 }); cue(E + 1.25, 'chime', { n: 72 });
cue(E + 2.55, 'pop', { f: .9 });
const MARKERS = { groove: 6.4, breakdown: 20.2, drop: DROP, end: 46.75 };

/* ---------- shared drawings ---------- */
function dot(x, y, r, fill, stroke) {
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = fill; ctx.fill();
  if (stroke) { ctx.lineWidth = 4; ctx.strokeStyle = stroke; ctx.stroke(); }
}
function item(x, y, i, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.lineJoin = 'round';
  const k = i % 3, stripe = i % 7 === 0 ? C.goldL : C.ink;
  if (k === 0) {
    rr(-26, -26, 52, 52, 8); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.stroke();
    ctx.fillStyle = stripe; ctx.fillRect(-26, -7, 52, 14); ctx.strokeRect(-26, -7, 52, 14);
  } else if (k === 1) {
    rr(-20, -30, 40, 60, 6); ctx.fillStyle = '#E9DFC9'; ctx.fill(); ctx.stroke();
    ctx.fillStyle = stripe; ctx.fillRect(-20, -9, 40, 18); ctx.strokeRect(-20, -9, 40, 18);
  } else {
    rr(-17, -6, 34, 36, 8); ctx.fillStyle = C.fill; ctx.fill(); ctx.stroke();
    rr(-8, -30, 16, 26, 4); ctx.fillStyle = C.fill; ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#FFFBF3'; ctx.fillRect(-17, 6, 34, 12);
  }
  ctx.restore();
}
function eye(x, y, s, lx, ly) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineWidth = 6 / s; ctx.strokeStyle = C.ink; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-60, 0); ctx.quadraticCurveTo(0, -64, 60, 0); ctx.quadraticCurveTo(0, 64, -60, 0); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.stroke();
  dot(lx, ly, 18, C.ink); ctx.restore();
}
function cursor(x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath();
  ctx.moveTo(0, 0); ctx.lineTo(0, 40); ctx.lineTo(11, 30); ctx.lineTo(20, 50); ctx.lineTo(29, 46); ctx.lineTo(20, 27); ctx.lineTo(34, 27); ctx.closePath();
  ctx.fillStyle = C.ink; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = '#FFFBF3'; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore();
}

/* ---------- S1: one word on a button (0 – 6.4) ---------- */
const BX = 360, BY = 590, BW = 360, BH = 140, LANE1 = 660, STALL = 336;
function scene1(t) {
  if (t > 6.6) return;
  line(t, 'One word on a [button.]', W / 2, 225, { size: 84, start: -.62, stagger: .12, end: 3.7 });
  line(t, '[Purchases] up 45%.', W / 2, 235, { size: 90, start: FLIP + .3, stagger: .12, end: 5.95 });
  const out = 1 - eio(prog(t, 5.95, .35));
  ctx.save(); ctx.globalAlpha = out;
  ctx.strokeStyle = C.faint; ctx.lineWidth = 3; ctx.setLineDash([2, 14]); ctx.lineCap = 'round';
  const lp = eo(prog(t, .1, .6)); ctx.beginPath(); ctx.moveTo(72, LANE1); ctx.lineTo(72 + 936 * lp, LANE1); ctx.stroke(); ctx.setLineDash([]);
  PRE.forEach(([s, pass], i) => {
    if (t < s) return;
    const a = eo(prog(t, s, .2)); let x = lerp(72, STALL, eo(prog(t, s, .9))), y = LANE1, al = a;
    if (pass && t > s + 1) x = STALL + (t - s - 1) * 520;
    else if (!pass && t > s + 1.2) { const d = t - s - 1.2; y += 300 * d * d; al = a * (1 - prog(d, 0, .8)); x -= 20 * d; }
    if (al > 0 && x < 1100) { ctx.globalAlpha = out * al; dot(x, y, 22, C.ink2); }
  });
  ctx.globalAlpha = out;
  POST.forEach(s => { const x = 72 + (t - s) * 480; if (t >= s && x < 1100) { ctx.globalAlpha = out * eo(prog(t, s, .15)); dot(x, LANE1, 22, C.gold); } });
  ctx.globalAlpha = out;
  const bp = eback(prog(t, .3, .45)), gold = t >= FLIP, kp = gold ? 1 + .1 * Math.exp(-(t - FLIP - .15) * 10) * (t > FLIP + .15 ? 1 : 0) : 1;
  if (bp > 0) {
    ctx.save(); ctx.translate(W / 2, BY + BH / 2); ctx.scale(bp * kp, bp * kp); ctx.translate(-W / 2, -BY - BH / 2);
    rr(BX, BY, BW, BH, 28); ctx.fillStyle = gold ? C.goldL : C.fill; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
    ctx.font = font('sans', 40, 700); ctx.letterSpacing = '5px'; ctx.textAlign = 'center'; ctx.fillStyle = gold ? C.ink : C.cream;
    ctx.fillText(gold ? 'CONTINUE' : 'REGISTER', W / 2 + 2.5, BY + BH / 2 + 14); ctx.restore();
  }
  ring(t, FLIP + .25, W / 2, BY + BH / 2, 80, 400, C.gold, .7, 10);
  burst(t, FLIP + .25, W / 2, BY + BH / 2, 22, 41, C.goldL, 900, .8);
  ctx.restore();
}

/* ---------- S2: toll booths (6.4 – 10.9) ---------- */
function scene2(t) {
  if (t < 6.4 || t > 11) return;
  const end = 10.45, out = 1 - eio(prog(t, end, .35)), LANE = 820;
  line(t, 'Never one big wall.', W / 2, 220, { size: 76, start: 6.65, stagger: .1, end });
  line(t, 'A thousand [toll booths.]', W / 2, 310, { size: 70, start: 7.2, stagger: .1, end });
  ctx.save(); ctx.globalAlpha = out;
  ctx.strokeStyle = C.faint; ctx.lineWidth = 3; ctx.setLineDash([2, 14]); ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(72, LANE); ctx.lineTo(1008, LANE); ctx.stroke(); ctx.setLineDash([]);
  XS.forEach((x, k) => {
    const p = eback(prog(t, BOOTH[k], .4)); if (p <= 0) return;
    ctx.save(); ctx.translate(x, 770); ctx.scale(p * 1.4, p * 1.4); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.lineJoin = 'round';
    rr(-44, -130, 88, 130, 14); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.stroke();
    rr(-58, -148, 116, 24, 8); ctx.fillStyle = C.ink; ctx.fill();
    rr(-26, -104, 52, 40, 8); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 4; ctx.stroke(); ctx.restore();
  });
  EXIT.forEach((e, i) => {
    const st = TRAIN + i * .11; if (t < st - .2) return;
    const a = eo(prog(t, st - .2, .2)); let x = 72 + (t - st) * SP2, y = LANE, al = a;
    if (t < st) x = 72;
    if (e <= 5) { const stop = XS[e - 1]; if (x >= stop) { const d = t - (st + (stop - 72) / SP2) - .15; x = stop; if (d > 0) { y += 260 * d * d; al = a * (1 - prog(d, 0, .55)); } } }
    if (al > 0 && x < 1100) { ctx.globalAlpha = out * al; dot(x, y, 19, e > 5 ? C.gold : C.ink2); }
  });
  ctx.restore();
}

/* ---------- S3: a tenth of a second (10.9 – 16) ---------- */
function scene3(t) {
  if (t < 10.9 || t > 16.1) return;
  const end = 15.55, out = 1 - eio(prog(t, end, .35)), GX = 323, GY = 430, SQ = 38, GP = 6;
  line(t, 'A tenth of a second.', W / 2, 220, { size: 76, start: 11.1, stagger: .09, end });
  line(t, '[1% of sales.]', W / 2, 310, { size: 76, start: 11.7, stagger: .12, end });
  ctx.save(); ctx.globalAlpha = out;
  for (let i = 0; i < 100; i++) {
    const p = eback(prog(t, GRID0 + i * .012, .3)); if (p <= 0) continue;
    const cx = GX + (i % 10) * (SQ + GP) + SQ / 2, cy = GY + ((i / 10) | 0) * (SQ + GP) + SQ / 2, k = TK.findIndex((s, j) => j === i);
    const g = k >= 0 ? eo(prog(t, TK[k], .25)) : 0, sh = k >= 0 && t >= TK[k] ? 6 * Math.sin((t - TK[k]) * 60) * Math.exp(-(t - TK[k]) * 12) : 0;
    rr(cx - SQ * p / 2 + sh, cy - SQ * p / 2, SQ * p, SQ * p, 6); ctx.fillStyle = C.goldL; ctx.fill();
    if (g > 0) { ctx.globalAlpha = out * g; ctx.fillStyle = C.paper; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = C.faint; ctx.stroke(); ctx.globalAlpha = out; }
  }
  ctx.restore();
  const n = TK.filter(s => t >= s).length, last = TK.filter(s => t >= s).pop(), kp = last ? 1 + .3 * Math.exp(-(t - last) * 10) : 1, a = out * eo(prog(t, 12.4, .4));
  ctx.save(); ctx.globalAlpha = a; ctx.font = font('serif', 74); ctx.textBaseline = 'alphabetic';
  ctx.save(); ctx.translate(72, 660); ctx.scale(kp, kp); ctx.fillStyle = C.ink2; ctx.fillText((n / 10).toFixed(1) + ' s', 0, 0); ctx.restore();
  ctx.save(); ctx.translate(1008, 660); ctx.scale(kp, kp); ctx.textAlign = 'right'; ctx.fillStyle = C.goldText; ctx.fillText(n ? '−' + n + '%' : '0%', 0, 0); ctx.restore();
  ctx.restore();
  label('DELAY', 72, 715, a, C.ink2, 24, 'left'); label('SALES', 1008, 715, a, C.goldText, 24, 'right');
  label('AMAZON’S OWN TEST', W / 2, 895, out * eo(prog(t, 12.6, .4)) * .8, C.ink2, 22);
  TK.forEach(s => ring(t, s + .1, GX + SQ / 2 + (TK.indexOf(s)) * (SQ + GP), GY + SQ / 2, 20, 90, C.gold, .5, 6));
}

/* ---------- S4: arms are full (16 – 20.7) ---------- */
function basket(cx, base, items, t, shake) {
  ctx.save(); ctx.translate(cx + shake, base); ctx.scale(1.25, 1.25); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.lineJoin = ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-170, -160); ctx.quadraticCurveTo(0, -330, 170, -160); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-170, -160); ctx.lineTo(170, -160); ctx.lineTo(130, 0); ctx.lineTo(-130, 0); ctx.closePath(); ctx.fillStyle = 'rgba(58,52,44,0.12)'; ctx.fill();
  items(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.beginPath(); ctx.moveTo(-170, -160); ctx.lineTo(170, -160); ctx.lineTo(130, 0); ctx.lineTo(-130, 0); ctx.closePath(); ctx.stroke();
  ctx.lineWidth = 3; ctx.beginPath(); [-85, 0, 85].forEach(x => { ctx.moveTo(x * 1.1, -160); ctx.lineTo(x * .85, 0); }); ctx.stroke();
  ctx.restore();
}
const SLOT = [[-105, -40], [-35, -40], [35, -40], [105, -40], [-70, -104], [0, -104], [70, -104], [0, -172]];
function scene4(t) {
  if (t < 16 || t > 20.8) return;
  const end = 20.25, out = 1 - eio(prog(t, end, .35)), CX = 540, BASE = 820;
  line(t, 'Sales stop when', W / 2, 215, { size: 76, start: 16.2, stagger: .1, end });
  line(t, '[arms are full.]', W / 2, 305, { size: 82, start: 16.7, stagger: .1, end });
  const hit = BOUNCE.filter(s => t >= s + .3).pop(), shake = hit ? 9 * Math.exp(-(t - hit - .3) * 9) * Math.sin((t - hit - .3) * 60) : 0;
  ctx.save(); ctx.globalAlpha = out;
  basket(CX, BASE, () => {
    FILL.forEach((s, i) => {
      if (t < s) return;
      const q = prog(t, s, .4), [sx, sy] = SLOT[i], y = lerp(-340, sy, q * q), sq = q >= 1 ? 1 + .12 * Math.exp(-(t - s - .4) * 14) : 1;
      item(sx, y, i, sq);
    });
  }, t, shake);
  BOUNCE.forEach((s, k) => {
    if (t < s) return;
    const dt = t - s, d = k ? 1 : -1, fall = prog(dt, 0, .3);
    let x = CX, y = lerp(BASE - 420, BASE - 235, fall * fall), al = 1;
    if (dt > .3) { const b = dt - .3; x = CX + d * 330 * b / .8; y = BASE - 235 - 240 * b + 480 * b * b; al = 1 - prog(b, .3, .5); }
    ctx.globalAlpha = out * al; item(x, y, k + 8, 1); ctx.globalAlpha = out;
  });
  ctx.restore();
  burst(t, BOUNCE[0] + .3, CX, BASE - 235, 10, 17, C.faint, 400, .5);
  burst(t, BOUNCE[1] + .3, CX, BASE - 235, 10, 29, C.faint, 400, .5);
}

/* ---------- S5: one cart, value pours in (20.7 – 27.6) ---------- */
function scene5(t) {
  if (t < 20.7 || t > 27.7) return;
  const end = 27.1, out = 1 - eio(prog(t, end, .35)), CX = 540, TOP = 570, BOT = 730, WB = 800;
  line(t, 'Remove one limit.', W / 2, 215, { size: 62, color: C.ink2, start: 21.0, stagger: .09, end });
  line(t, '[Sales soared.]', W / 2, 305, { size: 84, start: DROP, stagger: .12, end });
  line(t, 'The value was [already there.]', W / 2, 385, { size: 46, color: C.ink2, start: 25.3, stagger: .07, end });
  const glow = eo(prog(t, DROP, .3)) * (1 - eo(prog(t, DROP + .3, 1.2)));
  const wob = 5 * Math.sin(t * 70) * eo(prog(t, 22.9, .6)) * (1 - eo(prog(t, DROP, .12)));
  ctx.save(); ctx.globalAlpha = out;
  if (glow > 0) { const g = ctx.createRadialGradient(CX, 650, 10, CX, 650, 420); g.addColorStop(0, `rgba(221,182,95,${.6 * glow})`); g.addColorStop(1, 'rgba(221,182,95,0)'); ctx.fillStyle = g; ctx.fillRect(0, 230, W, 700); }
  const bp = eback(prog(t, BUILD, .5));
  if (bp > 0) {
    ctx.save(); ctx.translate(CX + wob, BOT); ctx.scale(bp, bp); ctx.translate(-CX, -BOT);
    ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.lineJoin = ctx.lineCap = 'round';
    const body = () => { ctx.beginPath(); ctx.moveTo(CX - 260, TOP); ctx.lineTo(CX + 260, TOP); ctx.lineTo(CX + 220, BOT); ctx.lineTo(CX - 220, BOT); ctx.closePath(); };
    body(); ctx.fillStyle = 'rgba(58,52,44,0.12)'; ctx.fill();
    for (let i = 0; i < CART_N; i++) {
      const s = DROP + .15 + i * .1; if (t < s) continue;
      const q = prog(t, s, .45), c = i % 7, r = (i / 7) | 0, ty = BOT - 34 - r * 58, tx = CX + (c - 3) * 62;
      item(tx, lerp(400, ty, q * q), i, q >= 1 ? 1 + .1 * Math.exp(-(t - s - .45) * 14) : 1);
    }
    body(); ctx.stroke(); ctx.lineWidth = 3; ctx.beginPath(); for (let k = -2; k <= 2; k++) { ctx.moveTo(CX + k * 100, TOP); ctx.lineTo(CX + k * 84, BOT); } ctx.stroke();
    ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(CX - 260, TOP); ctx.lineTo(CX - 330, TOP - 70); ctx.lineTo(CX - 400, TOP - 70); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(CX - 190, BOT); ctx.lineTo(CX - 150, WB - 26); ctx.moveTo(CX + 190, BOT); ctx.lineTo(CX + 150, WB - 26); ctx.stroke();
    ctx.restore();
    WHEELS.forEach((s, i) => { const p = eback(prog(t, s, .35)); if (p <= 0) return; const wx = CX + (i ? 150 : -150) + wob; ctx.save(); ctx.translate(wx, WB - 26); ctx.scale(p, p); dot(0, 0, 26, C.fill, C.ink); dot(0, 0, 8, C.cream); ctx.restore(); });
  }
  ctx.restore();
  ring(t, DROP, CX, 650, 60, 520, C.gold, .8, 12);
  ring(t, DROP + .12, CX, 650, 40, 420, C.goldL, .7, 8);
  burst(t, DROP, CX, 650, 30, 313, C.goldL, 1100, .9);
}

/* ---------- S6: watch where people stall (27.6 – 33.1) ---------- */
function scene6(t) {
  if (t < 27.6 || t > 33.2) return;
  const end = 32.65, out = 1 - eio(prog(t, end, .35)), PX = 500, PY = 650;
  line(t, 'Watch where people [stall.]', W / 2, 215, { size: 66, start: 27.8, stagger: .08, end });
  line(t, 'Don’t ask.', W / 2, 295, { size: 54, color: C.ink2, start: 28.5, stagger: .1, end });
  const wp = eback(prog(t, 27.9, .45));
  ctx.save(); ctx.globalAlpha = out;
  if (wp > 0) {
    ctx.save(); ctx.translate(500, 615); ctx.scale(wp, wp); ctx.translate(-500, -615);
    rr(220, 440, 560, 350, 22); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(220, 500); ctx.lineTo(780, 500); ctx.stroke();
    [256, 284, 312].forEach(x => dot(x, 470, 8, C.ink2));
    const kk = CK.filter(s => t >= s).pop(), press = kk ? Math.exp(-(t - kk) * 14) : 0, sc = 1 - .07 * press;
    ctx.save(); ctx.translate(PX, PY); ctx.scale(sc, sc); rr(-100, -42, 200, 84, 22); ctx.fillStyle = C.fill; ctx.fill();
    ctx.font = font('sans', 32, 700); ctx.letterSpacing = '5px'; ctx.textAlign = 'center'; ctx.fillStyle = C.cream; ctx.fillText('BUY', 2.5, 11); ctx.restore();
    ctx.restore();
  }
  const cx0 = lerp(760, PX + 30, eio(prog(t, 28.3, .8))), cy0 = lerp(780, PY + 20, eio(prog(t, 28.3, .8)));
  const lv = eio(prog(t, 31.6, .6)), kk = CK.filter(s => t >= s).pop(), pr = kk ? Math.exp(-(t - kk) * 14) : 0;
  const cpx = lerp(cx0, 1160, lv) + 5 * pr, cpy = lerp(cy0, 960, lv) + 5 * pr;
  if (wp > 0.5) cursor(cpx, cpy, 1.1);
  CK.forEach(s => ring(t, s, PX + 8, PY + 6, 14, 90, C.goldText, .5, 6));
  const ep = eback(prog(t, 28.7, .4));
  if (ep > 0) { ctx.save(); ctx.translate(904, 520); ctx.scale(ep, ep); ctx.translate(-904, -520); const lx = clamp((cpx - 904) / 300, -1, 1) * 18, ly = clamp((cpy - 520) / 300, -1, 1) * 12; eye(904, 520, 1, lx, ly); ctx.restore(); }
  const np = eback(prog(t, 31.1, .35));
  if (np > 0) { ctx.save(); ctx.translate(904, 710); ctx.scale(np, np); ctx.font = font('serif', 110); ctx.textAlign = 'center'; ctx.fillStyle = C.goldText; ctx.fillText('×4', 0, 36); ctx.restore(); }
  ctx.restore();
  ring(t, 31.1, 904, 700, 30, 150, C.gold, .6, 8);
  burst(t, 31.1, 904, 700, 18, 604, C.goldL, 800, .7);
}

/* ---------- S7: delete a step, then time the wait (33.1 – 40.3) ---------- */
function scene7(t) {
  if (t < 33.1 || t > 40.4) return;
  const a1 = 36.5;
  line(t, 'Delete a [step.]', W / 2, 225, { size: 82, start: 33.3, stagger: .1, end: a1 });
  line(t, 'Before adding a feature.', W / 2, 308, { size: 50, color: C.ink2, start: 33.9, stagger: .07, end: a1 });
  const f1 = 1 - eio(prog(t, a1, .35));
  if (f1 > 0) {
    ctx.save(); ctx.globalAlpha = f1;
    for (let i = 0; i < 5; i++) {
      const sp = eback(prog(t, 33.5 + i * .12, .35)); if (sp <= 0) continue;
      const di = [1, 3].indexOf(i), D = di >= 0 ? DEL[di] : null;
      let shift = 0; [1, 3].forEach((j, k) => { if (j < i) shift += eio(prog(t, DEL[k] + .3, .4)); });
      const y = 450 + (i - shift) * 84, gone = D ? eio(prog(t, D + .25, .35)) : 0;
      if (gone >= 1) continue;
      ctx.save(); ctx.globalAlpha = f1 * (1 - gone); ctx.translate(W / 2 + gone * 160, y + 30); ctx.scale(sp, sp);
      rr(-280, -30, 560, 60, 14); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = D && t > D ? C.goldText : C.ink; ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-250, 0); ctx.lineTo(-250 + 140 + i * 24, 0); ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.strokeStyle = C.faint; ctx.stroke();
      if (D && t > D) { const xp = eio(prog(t, D, .25)); ctx.beginPath(); ctx.moveTo(-290, 0); ctx.lineTo(lerp(-290, 290, xp), 0); ctx.lineWidth = 8; ctx.strokeStyle = C.goldText; ctx.stroke(); }
      ctx.restore();
    }
    ctx.restore();
  }
  DEL.forEach(s => { burst(t, s + .3, W / 2 + 160, [534, 702][DEL.indexOf(s)], 12, 100 + s, C.goldL, 500, .5); });
  const b0 = 36.9;
  line(t, 'Time the [wait.]', W / 2, 225, { size: 82, start: b0, stagger: .1, end: 39.85 });
  line(t, 'Give it an owner.', W / 2, 308, { size: 50, color: C.ink2, start: b0 + .6, stagger: .07, end: 39.85 });
  const sp = eback(prog(t, b0 + .1, .45)) * (1 - eio(prog(t, 39.85, .3)));
  if (sp > 0) {
    const CX = 540, CY = 625, R = 165, q = eio(prog(t, 37.3, 1.2)) * .64;
    ctx.save(); ctx.translate(CX, CY); ctx.scale(sp, sp); ctx.translate(-CX, -CY);
    rr(CX - 22, CY - R - 38, 44, 30, 8); ctx.fillStyle = C.ink; ctx.fill();
    dot(CX, CY, R, '#FFFBF3'); ctx.lineWidth = 8; ctx.strokeStyle = C.ink; ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2); ctx.stroke();
    ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); for (let k = 0; k < 12; k++) { const an = k * Math.PI / 6; ctx.moveTo(CX + Math.cos(an) * (R - 10), CY + Math.sin(an) * (R - 10)); ctx.lineTo(CX + Math.cos(an) * (R - 28), CY + Math.sin(an) * (R - 28)); } ctx.stroke();
    ctx.beginPath(); ctx.moveTo(CX, CY); ctx.arc(CX, CY, R - 36, -Math.PI / 2, -Math.PI / 2 + q * Math.PI * 2); ctx.closePath(); ctx.fillStyle = 'rgba(221,182,95,0.7)'; ctx.fill();
    ctx.beginPath(); ctx.moveTo(CX, CY); ctx.lineTo(CX + Math.cos(-Math.PI / 2 + q * Math.PI * 2) * (R - 24), CY + Math.sin(-Math.PI / 2 + q * Math.PI * 2) * (R - 24)); ctx.lineWidth = 6; ctx.stroke();
    dot(CX, CY, 9, C.ink);
    ctx.restore();
    const nm = eo(prog(t, 38.3, .3));
    ctx.save(); ctx.globalAlpha = nm * sp; ctx.font = font('serif', 60); ctx.textAlign = 'center'; ctx.fillStyle = C.goldText; ctx.fillText((q / .64 * 3.2).toFixed(1) + ' s', CX + 295, CY + 20); ctx.restore();
    const cp = eback(prog(t, 39.0, .4));
    if (cp > 0) {
      ctx.save(); ctx.translate(CX, 850); ctx.scale(cp, cp); rr(-170, -36, 340, 72, 36); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke();
      dot(-120, -6, 11, C.ink); ctx.beginPath(); ctx.arc(-120, 26, 20, Math.PI, 2 * Math.PI); ctx.fillStyle = C.ink; ctx.fill();
      ctx.restore(); label('OWNER', CX + 30, 860, cp, C.ink, 28);
    }
    ring(t, 39.0, CX, 850, 40, 280, C.gold, .6, 8);
  }
  ctx.save(); ctx.globalAlpha = .55 * env(t, 37.9, 39.8); ctx.font = font('sans', 20, 500); ctx.textAlign = 'right'; ctx.fillStyle = C.ink2; ctx.fillText('Illustrative', W - 72, 1010); ctx.restore();
}

/* ---------- S8: takeaway (40.3 – 47.1) ---------- */
function scene8(t) {
  if (t < 40.3 || t > 47.1) return;
  const end = 46.7;
  line(t, 'The value is', W / 2, 440, { size: 84, start: 40.45, stagger: .1, end });
  const r = line(t, '[already yours.]', W / 2, 570, { size: 104, start: 41.4, stagger: .1, end });
  const u = eio(prog(t, 42.35, .4)) * (1 - eio(prog(t, end, .35)));
  if (u > 0) { ctx.fillStyle = C.gold; ctx.fillRect(r.x0, 606, r.w * u, 9); }
  line(t, 'Go collect it.', W / 2, 740, { size: 56, color: C.ink2, start: 43.4, stagger: .1, end });
  burst(t, 41.5, W / 2, 540, 24, 707, C.goldL, 1100, .9);
}

/* ---------- S9: end card (47.1 – 53) ---------- */
function scene9(t) {
  if (t < E - .05) return;
  const rp = eio(prog(t, E, .55));
  ctx.fillStyle = C.night; ctx.beginPath(); ctx.arc(W / 2, 600, 1300 * rp, 0, Math.PI * 2); ctx.fill();
  if (rp < 1) return;
  const gp = eio(prog(t, E + .95, .35)), lift = eback(prog(t, E + 1.15, .5));
  ctx.save(); ctx.globalAlpha = gp; rr(W / 2 - 100, 290, 40, 76, 8); ctx.fillStyle = C.cream; ctx.fill();
  ctx.translate(W / 2 - 80, 300); ctx.rotate(-1.25 * lift);
  for (let k = 0; k < 6; k++) { rr(k * 32, -14, 32, 28, 0); ctx.fillStyle = k % 2 ? C.cream : C.goldL; ctx.fill(); }
  ctx.restore();
  ring(t, E + 1.2, W / 2, 270, 30, 300, C.goldL, .8, 8);
  line(t, 'Value, Created —', W / 2, 440, { size: 88, color: C.cream, start: E + 1.15, stagger: .1 });
  const title = 'Chapter 13: Removing Friction';
  line(t, '[' + title + ']', W / 2, 535, { size: fit(title, 900, 66, 'serif'), goldColor: C.goldL, start: E + 1.6, stagger: .06 });
  const lp = eio(prog(t, E + 2.15, .45));
  ctx.fillStyle = C.goldL; ctx.fillRect(W / 2 - 70 * lp, 590, 140 * lp, 4);
  line(t, 'Full 10-minute episode — link in comments', W / 2, 680, { font: 'sans', size: 38, color: C.cream, start: E + 2.55, stagger: .05 });
  ctx.save(); ctx.globalAlpha = .6 * eo(prog(t, E + 3.35, .5));
  ctx.font = font('sans', 22, 700); ctx.letterSpacing = '5px'; ctx.textAlign = 'center'; ctx.fillStyle = C.cream;
  ctx.fillText('A FREE AUDIOBOOK · PRODUCED BY THE JOY DIGI', W / 2 + 2.5, 980);
  ctx.restore();
}

const SCENES = [scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8];
const END_CARD = scene9;
