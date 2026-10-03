/* Value, Created Ch 27 LinkedIn infographic: chapter config and scenes for ../_engine (design time; WARP maps real time onto it). */
const CHAPTER = 27, KICKER_END = 46.65, BAR_END = 46.75;
const WARP = [[0, 0], [6.4, 4.5], [10.9, 7.6], [16, 11.2], [20.7, 14.5], [27.6, 19.3], [33.1, 23.2], [40.3, 28.2], [47.1, 33], [53, 38]];
/* ---------- timeline constants shared by visuals and cues ---------- */
const GRAINS = [1.0, 1.45, 1.9, 2.35, 2.8, 3.25];
const FLAT_T = 7.0, FLAT_DT = .045;
const LAD_T = 11.5, LAD_DT = .6;
const ROLL = [17.0, 20.2];
const TW_T = 21.3, DROP = 23.6;
const CASH = 28.2, SLASH = 30.4;
const QS = [33.5, 34.6, 35.7];
const SWIPES = [6.4, 20.7, 33.1];
const E = 46.85;
const IMPACTS = [[GRAINS[5] + .2, 5], [LAD_T + LAD_DT * 4 + .3, 11], [ROLL[1], 4], [DROP, 16], [DROP + .45, 5], [SLASH + .05, 12],
  ...QS.map(s => [s + .1, 3]), [41.7, 12], [E + 1.2, 7]];
const KB = [[0, 6.4], [6.4, 20.7], [20.7, 33.1], [33.1, 46.8]];

cue(0, 'impact', { v: .6 }); cue(.02, 'pop', { f: 1 });
for (let i = 0; i < 6; i++) cue(.2 + i * .1, 'tick', { f: 2 });
GRAINS.forEach((x, i) => { cue(x, 'blip', { n: [55, 59, 62, 67, 71, 74][i] }); cue(x, 'pop', { f: .9 + i * .06 }); });
cue(GRAINS[5] + .2, 'impact', { v: .7 }); cue(GRAINS[5] + .2, 'chime', { n: 76 });
cue(3.9, 'pop', { f: 1.2 }); cue(4.7, 'pop', { f: 1 }); cue(4.75, 'thud');
SWIPES.forEach(x => cue(x - .3, 'whoosh', { v: 1 }));
cue(6.65, 'pop', { f: 1.2 }); cue(7.2, 'pop', { f: .9 });
for (let i = 0; i < 32; i += 2) cue(FLAT_T + i * FLAT_DT, 'tick', { f: (i / 2) % 2 });
cue(8.4, 'swish'); cue(9.0, 'thud'); cue(9.9, 'blip', { n: 67 });
cue(11.1, 'pop', { f: 1.2 }); cue(11.6, 'pop', { f: .9 });
for (let i = 0; i < 5; i++) { const s = LAD_T + i * LAD_DT; cue(s, 'whoosh', { v: .25 }); cue(s + .3, 'thud'); cue(s + .3, 'blip', { n: [60, 64, 67, 71, 76][i] }); }
cue(LAD_T + LAD_DT * 4 + .3, 'chime', { n: 79 }); cue(LAD_T + LAD_DT * 4 + .3, 'impact', { v: .8 });
cue(16.2, 'pop', { f: 1.2 }); cue(16.9, 'pop', { f: 1 });
for (let x = ROLL[0], k = 0; x < ROLL[1]; x += .2, k++) cue(x, 'tick', { f: k % 2 });
for (let i = 0; i < 4; i++) cue(ROLL[0] + i * .8, 'blip', { n: 55 + i * 3 });
cue(ROLL[1], 'thud');
cue(20.2, 'riser', { d: DROP - 20.2 }); cue(21.0, 'pop', { f: 1 });
for (let i = 0; i < 5; i++) { cue(TW_T + i * .2, 'thud'); cue(TW_T + i * .2 + .05, 'blip', { n: [50, 53, 55, 58, 60][i] }); }
for (let x = 22.6, k = 0; x < DROP - .05; x += .12 - k * .003, k++) cue(x, 'tick', { f: k % 2 });
cue(DROP, 'boom', { v: 1 }); cue(DROP, 'chime', { n: 79 }); cue(DROP, 'impact', { v: 1 }); cue(DROP + .2, 'whoosh', { v: .4 }); cue(DROP + .45, 'thud');
cue(27.8, 'pop', { f: 1.2 }); cue(29.2, 'pop', { f: 1 });
for (let i = 0; i < 6; i++) { cue(CASH + i * .3, 'whoosh', { v: .2 }); cue(CASH + i * .3 + .25, 'blip', { n: [60, 62, 64, 67, 69, 72][i] }); }
cue(SLASH - .6, 'riser', { d: .6 }); cue(SLASH, 'scratch'); cue(SLASH + .05, 'impact', { v: .9 });
cue(SLASH + .15, 'drain', { d: .7 }); cue(SLASH + 1.0, 'knock', { v: .8 });
cue(33.3, 'tick', { f: 2 });
QS.forEach((s, i) => { cue(s + .1, 'blip', { n: [67, 71, 74][i] }); cue(s + .1, 'pop', { f: 1 }); });
cue(40.0, 'whoosh', { v: .35 }); cue(40.45, 'thud'); cue(41.0, 'thud'); cue(41.7, 'impact', { v: .9 }); cue(41.7, 'chime', { n: 76 }); cue(42.5, 'swish'); cue(43.4, 'pop', { f: .9 });
for (let x = 44.0, k = 0; x < 46.4; x += .25, k++) cue(x, 'tick', { f: k % 2 });
cue(E - .05, 'whoosh', { v: 1 });
[E + .95, E + 1.1].forEach((x, i) => cue(x + .1, 'blip', { n: [72, 79][i] }));
cue(E + 1.2, 'boom', { v: .9 }); cue(E + 1.25, 'chime', { n: 72 });
cue(E + 2.55, 'pop', { f: .9 });
const MARKERS = { groove: 6.4, breakdown: 20.2, drop: DROP, end: 46.75 };

/* ---------- shared drawing ---------- */
const BS = 62, BX0 = 292, BY0 = 380;
const sq = i => [BX0 + (i % 8) * BS + BS / 2, BY0 + ((i / 8) | 0) * BS + BS / 2];

function rice(x, y, a, s) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.beginPath(); ctx.ellipse(0, 0, 6 * s, 3.2 * s, 0, 0, Math.PI * 2);
  ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 1.5; ctx.strokeStyle = C.gold; ctx.stroke(); ctx.restore();
}
function pile(i, n, t, t0, dt) {
  const [cx, cy] = sq(i), cols = Math.ceil(Math.sqrt(n)), sp = n === 1 ? 0 : 40 / cols;
  for (let k = 0; k < n; k++) {
    const p = eback(prog(t, t0 + k * dt, .25)); if (p <= 0) continue;
    const gx = (k % cols - (cols - 1) / 2) * sp + (rnd(k + i * 7) - .5) * 3, gy = ((k / cols | 0) - (Math.ceil(n / cols) - 1) / 2) * sp + (rnd(k + i * 7 + 50) - .5) * 3;
    rice(cx + gx, cy + gy, rnd(k + i * 13) * Math.PI, (n < 3 ? 1.7 : n <= 8 ? 1.5 : n <= 16 ? 1.15 : .95) * p);
  }
}
function board(t, t0) {
  for (let i = 0; i < 64; i++) {
    const r = (i / 8) | 0, c = i % 8, p = eback(prog(t, t0 + (r + c) * .03, .3)); if (p <= 0) continue;
    const [cx, cy] = sq(i);
    ctx.save(); ctx.translate(cx, cy); ctx.scale(p, p);
    rr(-BS / 2, -BS / 2, BS, BS, 3); ctx.fillStyle = (r + c) % 2 ? 'rgba(58,52,44,0.16)' : 'rgba(58,52,44,0.05)'; ctx.fill(); ctx.restore();
  }
  const bp = eo(prog(t, t0 + .3, .4));
  if (bp > 0) { ctx.save(); ctx.globalAlpha *= bp; rr(BX0, BY0, BS * 8, BS * 8, 4); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore(); }
}
function bracket(x, y0, y1, dir, p) {
  if (p <= 0) return;
  ctx.save(); ctx.strokeStyle = C.ink2; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath();
  const yb = lerp(y0, y1, p);
  ctx.moveTo(x + dir * 14, y0); ctx.lineTo(x, y0); ctx.lineTo(x, yb); if (p >= 1) ctx.lineTo(x + dir * 14, y1); ctx.stroke(); ctx.restore();
}

/* ---------- S1: one grain, doubled (0 – 6.4) ---------- */
function scene1(t) {
  if (t > 6.6) return;
  line(t, 'One grain of rice.', W / 2, 215, { size: fit('One grain of rice.', 900, 84), start: -.62, stagger: .12, end: 3.7 });
  line(t, '[Doubled] on every square.', W / 2, 305, { size: fit('Doubled on every square.', 900, 76), start: -.4, stagger: .12, end: 3.7 });
  line(t, 'The king laughed.', W / 2, 220, { size: fit('The king laughed.', 900, 84), start: 3.9, stagger: .1, end: 5.95 });
  line(t, 'Rice was [cheap.]', W / 2, 310, { size: 70, color: C.ink2, start: 4.7, end: 5.95 });
  ctx.save(); ctx.globalAlpha = 1 - eio(prog(t, 5.95, .35));
  board(t, .1);
  [1, 2, 4, 8, 16, 32].forEach((n, i) => pile(i, n, t, GRAINS[i], .02));
  ctx.restore();
  ring(t, GRAINS[5] + .2, sq(5)[0], sq(5)[1], 20, 160, C.gold, .6, 8);
}

/* ---------- S2: the first half is almost nothing (6.4 – 10.9) ---------- */
function scene2(t) {
  if (t < 6.4 || t > 11) return;
  const end = 10.45, out = 1 - eio(prog(t, end, .35));
  line(t, 'First 32: [almost nothing.]', W / 2, 220, { size: fit('First 32: almost nothing.', 900, 80), start: 6.65, end });
  line(t, 'Flat looks like nothing.', W / 2, 305, { size: 52, color: C.ink2, start: 7.2, stagger: .07, end });
  ctx.save(); ctx.globalAlpha = out;
  board(t, 6.5);
  for (let i = 0; i < 32; i++) {
    const p = eback(prog(t, FLAT_T + i * FLAT_DT, .25)); if (p <= 0) continue;
    const [x, y] = sq(i); rice(x, y, rnd(i) * Math.PI, 1.3 * p);
  }
  bracket(BX0 - 22, BY0, BY0 + BS * 4, 1, eio(prog(t, 8.4, .5)));
  ctx.restore();
  label('FIRST 32', BX0 - 120, BY0 + BS * 2 + 8, out * eo(prog(t, 8.7, .3)), C.ink2, 26);
  ctx.save(); ctx.globalAlpha = out; ctx.scale(-1, 1); ctx.translate(-2 * (BX0 + BS * 8 + 22), 0);
  bracket(BX0 + BS * 8 + 22, BY0 + BS * 4, BY0 + BS * 8, 1, eio(prog(t, 9.6, .5))); ctx.restore();
  label('LAST 32', BX0 + BS * 8 + 120, BY0 + BS * 6 + 8, out * eo(prog(t, 9.9, .3)), C.goldText, 26);
}

/* ---------- S3: four doublings in 28 years (10.9 – 16) ---------- */
const s3Y = x => 520 + 300 * Math.pow((x - 90) / 900, 1.35);
const S3X = [150, 330, 525, 735, 925];
function scene3(t) {
  if (t < 10.9 || t > 16.1) return;
  const end = 15.55, out = 1 - eio(prog(t, end, .35));
  line(t, 'Double every [seven] years.', W / 2, 220, { size: fit('Double every seven years.', 900, 80), start: 11.1, end });
  line(t, 'Patience, not the rate.', W / 2, 305, { size: 52, color: C.ink2, start: 11.6, stagger: .07, end });
  ctx.save(); ctx.globalAlpha = out;
  const sp = eio(prog(t, 11.2, .6)), xe = lerp(90, 990, sp);
  ctx.beginPath(); ctx.moveTo(90, 900);
  for (let x = 90; x <= xe; x += 15) ctx.lineTo(x, s3Y(x));
  ctx.lineTo(xe, s3Y(xe)); ctx.lineTo(xe, 900); ctx.closePath(); ctx.fillStyle = 'rgba(58,52,44,0.07)'; ctx.fill();
  ctx.beginPath(); ctx.moveTo(90, s3Y(90));
  for (let x = 90; x <= xe; x += 15) ctx.lineTo(x, s3Y(x));
  ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke();
  [1, 2, 4, 8, 16].forEach((m, i) => {
    const s = LAD_T + i * LAD_DT, p = eback(prog(t, s, .5)); if (p <= 0) return;
    const r = 20 * Math.sqrt(m) * Math.max(0, p), [bx, by] = ballOn(s3Y, S3X[i], r);
    snowball(bx, by, r, (t - s) * 3);
    ctx.save(); ctx.globalAlpha = out * eo(prog(t, s + .3, .3)); ctx.font = font('serif', 44); ctx.letterSpacing = '0px'; ctx.textAlign = 'center';
    ctx.fillStyle = i === 4 ? C.goldText : C.ink; ctx.fillText('×' + m, bx, by - r - 18); ctx.restore();
    label(i ? 'YR ' + 7 * i : 'START', S3X[i], s3Y(S3X[i]) + 46, out * eo(prog(t, s + .1, .3)), C.ink2, 24);
  });
  ctx.restore();
  const [fx, fy] = ballOn(s3Y, S3X[4], 80);
  ring(t, LAD_T + LAD_DT * 4 + .3, fx, fy, 30, 330, C.gold, .7, 10);
  burst(t, LAD_T + LAD_DT * 4 + .3, fx, fy - 40, 18, 211, C.goldL, 800, .8);
}

/* ---------- S4: the snowball (16 – 20.7) ---------- */
const slopeY = x => 560 + 330 * Math.pow((x - 90) / 900, 1.35);
function snowball(x, y, r, rot) {
  ctx.save(); ctx.translate(x, y);
  ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.lineWidth = Math.max(3, r * .07); ctx.strokeStyle = C.ink; ctx.stroke();
  ctx.rotate(rot); ctx.lineCap = 'round'; ctx.lineWidth = Math.max(2.5, r * .05); ctx.strokeStyle = C.gold;
  ctx.beginPath(); ctx.arc(0, 0, r * .62, .2, 2.4); ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 0, r * .3, 3.6, 5.6); ctx.stroke();
  ctx.restore();
}
function ballOn(f, x, r) {
  const dy = (f(x + 1) - f(x - 1)) / 2, k = Math.sqrt(1 + dy * dy);
  return [x + r * dy / k, f(x) - r / k];
}
function scene4(t) {
  if (t < 16 || t > 20.8) return;
  const end = 20.25, out = 1 - eio(prog(t, end, .35));
  line(t, 'Compounding is [time,]', W / 2, 220, { size: fit('Compounding is time,', 900, 84), start: 16.2, stagger: .1, end });
  line(t, 'turned into a multiplier.', W / 2, 305, { size: fit('turned into a multiplier.', 900, 66), color: C.ink2, start: 17.2, stagger: .07, end });
  ctx.save(); ctx.globalAlpha = out;
  const sp = eio(prog(t, 16.3, .6)), xe = lerp(90, 990, sp);
  ctx.beginPath(); ctx.moveTo(90, 900);
  for (let x = 90; x <= xe; x += 15) ctx.lineTo(x, slopeY(x));
  ctx.lineTo(xe, slopeY(xe)); ctx.lineTo(xe, 900); ctx.closePath(); ctx.fillStyle = 'rgba(58,52,44,0.07)'; ctx.fill();
  ctx.beginPath(); ctx.moveTo(90, slopeY(90));
  for (let x = 90; x <= xe; x += 15) ctx.lineTo(x, slopeY(x));
  ctx.lineTo(xe, slopeY(xe)); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke();
  const rp = prog(t, ROLL[0], ROLL[1] - ROLL[0]), pop = eback(prog(t, ROLL[0] - .3, .3));
  if (pop > 0) {
    const r = 16 * Math.pow(6, rp) * pop, x = lerp(190, 830, eio(rp) * .4 + rp * .6), [bx, by] = ballOn(slopeY, x, r);
    for (let k = 1; k < 8; k++) {
      const xs = x - k * 38 * (1 + rp), rs = 16 * Math.pow(6, clamp(rp - k * .07)) * .7;
      if (xs < 190 || rp <= k * .07) continue;
      const [tx, ty] = ballOn(slopeY, xs, rs); ctx.save(); ctx.globalAlpha = out * (1 - k / 8) * .5; ctx.beginPath(); ctx.arc(tx, ty, Math.max(2, rs * .18), 0, Math.PI * 2); ctx.fillStyle = C.goldL; ctx.fill(); ctx.restore();
    }
    snowball(bx, by, r, rp * 14);
  }
  ctx.restore();
}

/* ---------- S5: the last three squares (20.7 – 27.6) ---------- */
function heap(cx, base, b, k) {
  const h = .62 * b;
  ctx.beginPath(); ctx.moveTo(cx - b / 2, base); ctx.quadraticCurveTo(cx, base - h * 2, cx + b / 2, base); ctx.closePath();
  ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.strokeStyle = C.ink; ctx.stroke();
  const n = Math.min(40, Math.floor(b / 5));
  for (let g = 0; g < n; g++) {
    const u = (rnd(g + k * 31) - .5) * .8, v = rnd(g + k * 17 + 9) * .75;
    const gx = cx + u * b * (1 - v * .6), gy = base - 6 - v * h * .9 * (1 - Math.abs(u));
    rice(gx, gy, rnd(g + k) * Math.PI, Math.max(.8, b / 110));
  }
}
function scene5(t) {
  if (t < 20.7 || t > 27.7) return;
  const end = 27.1, out = 1 - eio(prog(t, end, .35)), SQ = 100, x0 = 100, sy = 730, base = sy + SQ / 2;
  line(t, 'The last three squares:', W / 2, 220, { size: fit('The last three squares:', 900, 80), start: 21.0, end });
  line(t, '[Almost everything.]', W / 2, 310, { size: fit('Almost everything.', 900, 92), start: DROP, stagger: .12, end });
  const wob = 3 * Math.sin(t * 70) * eo(prog(t, 22.6, .9)) * (1 - eo(prog(t, DROP, .15)));
  ctx.save(); ctx.globalAlpha = out;
  const bp = eo(prog(t, 21.0, .5));
  for (let i = 0; i < 8; i++) {
    rr(x0 + i * SQ, sy, SQ * bp, SQ, 3); ctx.fillStyle = i % 2 ? 'rgba(58,52,44,0.16)' : 'rgba(58,52,44,0.05)'; ctx.fill();
  }
  rr(x0, sy, SQ * 8 * bp, SQ, 4); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke();
  for (let i = 0; i < 8; i++) {
    const big = i >= 5, cx = x0 + i * SQ + SQ / 2;
    const p = big ? eback(prog(t, DROP + (i - 5) * .08, .55)) : eo(prog(t, TW_T + i * .2, .3));
    if (p > 0) { ctx.save(); ctx.translate(wob * (big ? 0 : 1), 0); heap(cx, base, 22 * Math.sqrt(Math.pow(2, i)) * Math.max(0, p), i); ctx.restore(); }
    label(String(57 + i), cx, sy + SQ + 46, out * eo(prog(t, 21.1 + i * .05, .3)), big ? C.goldText : C.ink2, 24);
  }
  ctx.restore();
  const tx = x0 + 7 * SQ + SQ / 2;
  ring(t, DROP, tx, base - 70, 60, 560, C.gold, .8, 12);
  ring(t, DROP + .12, tx, base - 70, 40, 440, C.goldL, .7, 8);
  burst(t, DROP, tx, base - 120, 30, 313, C.goldL, 1000, .9);
  burst(t, DROP + .1, x0 + 6 * SQ + SQ / 2, base - 80, 18, 377, C.gold, 800, .8);
}

/* ---------- S6: cash out and start over (27.6 – 33.1) ---------- */
const s6Y = x => 620 + 260 * Math.pow((x - 90) / 900, 1.3);
function scene6(t) {
  if (t < 27.6 || t > 33.2) return;
  const end = 32.65, out = 1 - eio(prog(t, end, .35));
  line(t, 'Cash out, and you [start over.]', W / 2, 220, { size: fit('Cash out, and you start over.', 900, 80), start: 27.8, end });
  line(t, 'You lose the doublings after.', W / 2, 305, { size: fit('You lose the doublings after.', 900, 52), color: C.ink2, start: 29.2, stagger: .07, end });
  ctx.save(); ctx.globalAlpha = out;
  const sp = eio(prog(t, 28.0, .5)), xe = lerp(90, 990, sp);
  ctx.beginPath(); ctx.moveTo(90, 900);
  for (let x = 90; x <= xe; x += 15) ctx.lineTo(x, s6Y(x));
  ctx.lineTo(xe, s6Y(xe)); ctx.lineTo(xe, 900); ctx.closePath(); ctx.fillStyle = 'rgba(58,52,44,0.07)'; ctx.fill();
  ctx.beginPath(); ctx.moveTo(90, s6Y(90));
  for (let x = 90; x <= xe; x += 15) ctx.lineTo(x, s6Y(x));
  ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke();
  const rp = prog(t, CASH, SLASH - CASH - .2), bp = eback(prog(t, CASH - .1, .3)), fall = eio(prog(t, SLASH + .1, .5));
  const bx0 = lerp(170, 640, rp), br = 16 * Math.pow(5.5, rp);
  if (bp > 0 && fall < 1) {
    const [bx, by] = ballOn(s6Y, bx0, br * Math.max(0, bp)); ctx.save(); ctx.globalAlpha = out * (1 - fall); snowball(bx, by, br * Math.max(0, bp), rp * 14); ctx.restore();
  }
  if (fall > 0) {
    [[640, 88, .5], [830, 124, .35]].forEach(([gx, gr, a], i) => {
      const [x, y] = ballOn(s6Y, gx, gr);
      ctx.save(); ctx.globalAlpha = out * a * (i ? eo(prog(t, SLASH + .5, .5)) : fall) * (1 - .3 * prog(t, SLASH + 1.2, .8)); ctx.setLineDash([12, 12]); ctx.lineWidth = 4; ctx.strokeStyle = C.ink2;
      ctx.beginPath(); ctx.arc(x, y, gr, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
    });
  }
  const np = eback(prog(t, SLASH + 1.0, .4));
  if (np > 0) { const [nx, ny] = ballOn(s6Y, 170, 16 * Math.max(0, np)); snowball(nx, ny, 16 * Math.max(0, np), 0); }
  const sl = eo(prog(t, SLASH - .05, .18));
  if (sl > 0) {
    ctx.save(); ctx.globalAlpha = out * (1 - prog(t, SLASH + .5, .5)); ctx.strokeStyle = C.ink; ctx.lineWidth = 9; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(540, 520); ctx.lineTo(lerp(540, 760, sl), lerp(520, 830, sl)); ctx.stroke(); ctx.restore();
  }
  ctx.restore();
  label('LOST', 830, 540, out * eo(prog(t, SLASH + .9, .3)), C.goldText, 30);
  label('START OVER', 190, s6Y(170) + 56, out * eo(prog(t, SLASH + 1.0, .3)), C.ink2, 24);
  ring(t, SLASH + .05, 650, 700, 30, 360, C.gold, .7, 10);
  burst(t, SLASH + .05, 650, 700, 18, 733, C.goldL, 700, .7);
}

/* ---------- S7: three rules (33.1 – 40.3) ---------- */
function icon(kind) {
  ctx.save(); ctx.strokeStyle = C.cream; ctx.fillStyle = C.cream; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  if (kind === 0) {
    ctx.beginPath(); ctx.moveTo(-18, -18); ctx.lineTo(-18, 18); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-8, 0); ctx.lineTo(18, 0); ctx.moveTo(8, -10); ctx.lineTo(18, 0); ctx.lineTo(8, 10); ctx.stroke();
  } else if (kind === 1) {
    rr(-14, -14, 9, 28, 2); ctx.fill(); rr(5, -14, 9, 28, 2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-20, 20); ctx.lineTo(20, -20); ctx.strokeStyle = C.ink; ctx.lineWidth = 10; ctx.stroke(); ctx.strokeStyle = C.cream; ctx.lineWidth = 4; ctx.stroke();
  } else {
    ctx.beginPath(); ctx.arc(0, 0, 19, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 0, 10, .4, 4.2); ctx.stroke();
  }
  ctx.restore();
}
function scene7(t) {
  if (t < 33.1 || t > 40.4) return;
  const qEnd = 39.85;
  label('THREE RULES', W / 2, 290, env(t, 33.3, qEnd, .3), C.goldText, 26);
  ['Start early.', 'Never interrupt it.', 'Pick snowballs that [last.]'].forEach((q, i) => {
    const s = QS[i], y = 460 + i * 160;
    const np = eback(prog(t, s, .3)) * (1 - eio(prog(t, qEnd, .3)));
    if (np > 0) {
      ctx.save(); ctx.translate(205, y - 22); ctx.scale(np, np);
      ctx.beginPath(); ctx.arc(0, 0, 40, 0, Math.PI * 2); ctx.fillStyle = i === 2 ? C.ink : C.gold; ctx.fill();
      icon(i); ctx.restore();
    }
    line(t, q, 270, y, { size: fit(q, 730, 58), align: 'left', start: s + .1, stagger: .06, end: qEnd });
  });
}

/* ---------- S8: takeaway (40.3 – 47.1) ---------- */
const flatY = x => 845 + (x - 200) * .07;
function scene8(t) {
  if (t < 40.3 || t > 47.1) return;
  const end = 46.7, out = 1 - eio(prog(t, end, .35));
  line(t, 'Build the snowball.', W / 2, 390, { size: fit('Build the snowball.', 900, 92), start: 40.45, stagger: .1, end });
  line(t, 'Point it downhill.', W / 2, 505, { size: fit('Point it downhill.', 900, 92), start: 41.0, stagger: .1, end });
  const r = line(t, '[Protect the years.]', W / 2, 620, { size: fit('Protect the years.', 900, 92), start: 41.6, stagger: .1, end });
  const u = eio(prog(t, 42.5, .4)) * out;
  if (u > 0) { ctx.fillStyle = C.gold; ctx.fillRect(r.x0, 656, r.w * u, 9); }
  line(t, 'Time is the final multiplier.', W / 2, 745, { size: 46, color: C.ink2, start: 43.4, stagger: .07, end });
  ctx.save(); ctx.globalAlpha = out;
  const sp = eio(prog(t, 43.8, .4));
  ctx.strokeStyle = C.ink; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(200, flatY(200)); ctx.lineTo(lerp(200, 880, sp), flatY(lerp(200, 880, sp))); ctx.stroke();
  const rp = prog(t, 44.0, 2.4);
  if (rp > 0) { const rad = 14 * Math.pow(3.6, rp), [bx, by] = ballOn(flatY, lerp(240, 800, rp), rad); snowball(bx, by, rad, rp * 12); }
  ctx.restore();
  burst(t, 41.7, W / 2, 590, 24, 707, C.goldL, 1100, .9);
}

/* ---------- S9: end card (47.1 – 53) ---------- */
function scene9(t) {
  if (t < E - .05) return;
  const rp = eio(prog(t, E, .55));
  ctx.fillStyle = C.night; ctx.beginPath(); ctx.arc(W / 2, 600, 1300 * rp, 0, Math.PI * 2); ctx.fill();
  if (rp < 1) return;
  const sf = x => 215 + (x - 440) * .42, gp = eio(prog(t, E + .9, .4));
  ctx.strokeStyle = C.cream; ctx.globalAlpha = .7; ctx.lineWidth = 4; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(440, sf(440)); ctx.lineTo(lerp(440, 640, gp), sf(lerp(440, 640, gp))); ctx.stroke(); ctx.globalAlpha = 1;
  const bp = eback(prog(t, E + 1.0, .4)), bq = eio(prog(t, E + 1.1, .6));
  if (bp > 0) {
    const rad = 24 * bp, [bx, by] = ballOn(sf, lerp(485, 565, bq), rad);
    ctx.beginPath(); ctx.arc(bx, by, rad, 0, Math.PI * 2); ctx.fillStyle = C.goldL; ctx.fill();
    ctx.lineWidth = 3; ctx.strokeStyle = C.cream; ctx.beginPath(); ctx.arc(bx, by, rad * .6, .2, 2.4 + bq * 6); ctx.stroke();
  }
  ring(t, E + 1.2, 560, 215, 30, 300, C.goldL, .8, 8);
  line(t, 'Value, Created —', W / 2, 440, { size: 88, color: C.cream, start: E + 1.15, stagger: .1 });
  line(t, '[Chapter 27: Compounding]', W / 2, 535, { size: fit('Chapter 27: Compounding', 900, 60), goldColor: C.goldL, start: E + 1.6, stagger: .06 });
  const lp = eio(prog(t, E + 2.15, .45));
  ctx.fillStyle = C.goldL; ctx.fillRect(W / 2 - 70 * lp, 590, 140 * lp, 4);
  line(t, 'Full 8-minute episode — link in comments', W / 2, 680, { font: 'sans', size: 38, color: C.cream, start: E + 2.55, stagger: .05 });
  ctx.save(); ctx.globalAlpha = .6 * eo(prog(t, E + 3.35, .5));
  ctx.font = font('sans', 22, 700); ctx.letterSpacing = '5px'; ctx.textAlign = 'center'; ctx.fillStyle = C.cream;
  ctx.fillText('A FREE AUDIOBOOK · PRODUCED BY THE JOY DIGI', W / 2 + 2.5, 980);
  ctx.restore();
}

const SCENES = [scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8];
const END_CARD = scene9;
