/* Value, Created Ch 19 LinkedIn infographic: chapter config and scenes for ../_engine (design time; WARP maps real time onto it). */
const CHAPTER = 19, KICKER_END = 46.65, BAR_END = 46.75;
const WARP = [[0, 0], [6.4, 4.5], [17.8, 12.5], [34.2, 24.2], [46.85, 33.2], [53, 38]];
/* ---------- timeline constants shared by visuals and cues ---------- */
const BOT = [.45, .6], EQ = 1.6, BUB = [4.0, 4.3, 4.6, 4.9];
const JAR = 7.0, STARS = Array.from({ length: 9 }, (_, i) => 7.6 + i * .32);
const TIER = [12.8, 13.4, 14.0];
const NODES = [19.2, 19.8, 20.4, 21.0], RISE0 = 21.8, DROP = 24.0;
const JAR5 = 29.2, STARS5 = Array.from({ length: 10 }, (_, i) => 29.5 + i * .1), CRACK = 31.0, SPILL = 31.2;
const CARD = 35.0, ITEMS = [36.6, 37.3, 38.0, 38.7];
const T7 = { a: 41.0, bub: 41.8, b: 43.6 };
const SWIPES = [6.4, 17.8, 34.2];
const E = 46.85;
const IMPACTS = [[EQ + .15, 4], [BUB[3] + .1, 6], [STARS[8] + .3, 4], [TIER[2] + .25, 8], [DROP, 16], [DROP + .45, 5], [CRACK, 12],
  [ITEMS[3] + .2, 5], [T7.bub + .3, 8], [T7.b, 10], [E + 1.2, 7]];
const KB = [[0, 6.4], [6.4, 17.8], [17.8, 34.2], [34.2, 46.8]];

cue(0, 'impact', { v: .6 }); cue(.02, 'pop', { f: 1 });
BOT.forEach((x, i) => cue(x + .1, i ? 'blip' : 'thud', i ? { n: 57 } : undefined));
cue(EQ, 'pop', { f: 1.2 }); cue(EQ + .15, 'blip', { n: 64 });
cue(3.9, 'pop', { f: 1 });
BUB.forEach((x, i) => { cue(x, 'pop', { f: 1 + i * .1 }); cue(x + .05, 'blip', { n: [67, 71, 74, 79][i] }); });
cue(BUB[3] + .1, 'chime', { n: 79 });
SWIPES.forEach(x => cue(x - .3, 'whoosh', { v: 1 }));
cue(6.65, 'pop', { f: 1.2 }); cue(JAR, 'whoosh', { v: .3 }); cue(JAR + .3, 'thud'); cue(8.0, 'pop', { f: 1 });
STARS.forEach((s, i) => { if (i % 2 === 0) { cue(s + .3, 'tick', { f: i % 3 }); cue(s + .32, 'blip', { n: 55 + i * 2 }); } });
cue(STARS[8] + .3, 'chime', { n: 76 });
cue(12.2, 'pop', { f: 1.2 });
TIER.forEach((s, i) => { cue(s, 'whoosh', { v: .3 }); cue(s + .3, 'blip', { n: [57, 62, 69][i] }); });
cue(TIER[2] + .3, 'chime', { n: 76 }); cue(15.0, 'pop', { f: .9 });
cue(18.4, 'pop', { f: 1.2 });
NODES.forEach((s, i) => { cue(s, 'whoosh', { v: .25 }); cue(s + .3, 'blip', { n: [55, 59, 62, 66][i] }); });
cue(RISE0, 'riser', { d: DROP - RISE0 });
for (let x = 22.9, k = 0; x < DROP - .05; x += .13 - k * .004, k++) cue(x, 'tick', { f: k % 2 });
cue(DROP, 'boom', { v: 1 }); cue(DROP, 'chime', { n: 79 }); cue(DROP, 'impact', { v: 1 }); cue(DROP + .2, 'whoosh', { v: .4 });
cue(DROP + .45, 'thud'); cue(DROP + .05, 'pop', { f: 1.2 }); cue(DROP + .5, 'pop', { f: 1 });
for (let x = DROP + .8; x < 27.4; x += .4) cue(x, 'tick', { f: 2 });
cue(29.1, 'pop', { f: 1.2 }); cue(30.4, 'pop', { f: 1 });
cue(JAR5, 'whoosh', { v: .3 }); cue(JAR5 + .3, 'thud');
for (let i = 0; i < 10; i += 2) cue(STARS5[i], 'tick', { f: i % 3 });
cue(CRACK - .5, 'riser', { d: .5 }); cue(CRACK, 'impact', { v: 1 }); cue(CRACK, 'knock', { v: 1 }); cue(CRACK + .1, 'scratch');
cue(SPILL, 'drain', { d: 1.4 });
cue(35.2, 'pop', { f: 1.2 }); cue(35.7, 'pop', { f: .9 });
cue(CARD, 'whoosh', { v: .3 }); cue(CARD + .3, 'thud');
ITEMS.forEach((s, i) => { cue(s + .1, 'blip', { n: [60, 64, 67, 71][i] }); });
cue(ITEMS[3] + .3, 'chime', { n: 79 });
cue(T7.a, 'pop', { f: 1.2 }); cue(T7.bub, 'whoosh', { v: .35 }); cue(T7.bub + .3, 'impact', { v: .7 }); cue(T7.bub + .3, 'chime', { n: 76 });
cue(T7.b - .6, 'riser', { d: .6 }); cue(T7.b, 'impact', { v: .9 }); cue(T7.b, 'chime', { n: 79 }); cue(T7.b + .1, 'pop', { f: 1.2 });
cue(E - .05, 'whoosh', { v: 1 });
[E + .95, E + 1.1].forEach((x, i) => cue(x + .1, 'blip', { n: [72, 79][i] }));
cue(E + 1.2, 'boom', { v: .9 }); cue(E + 1.25, 'chime', { n: 72 });
cue(E + 2.55, 'pop', { f: .9 });
const MARKERS = { groove: 6.4, breakdown: RISE0, drop: DROP, end: 46.75 };

const PAPER = '#FFFBF3';
function star(x, y, r, a) {
  if (a <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.globalAlpha *= a; ctx.beginPath();
  for (let i = 0; i < 8; i++) { const rad = i % 2 ? r * .28 : r, an = i * Math.PI / 4 - Math.PI / 2; ctx.lineTo(Math.cos(an) * rad, Math.sin(an) * rad); }
  ctx.closePath(); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
}
function sun(x, y, r) {
  ctx.save(); ctx.translate(x, y); ctx.fillStyle = C.goldL; ctx.strokeStyle = C.ink; ctx.lineWidth = 3.5; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(0, 0, r * .45, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.beginPath();
  for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; ctx.moveTo(Math.cos(a) * r * .65, Math.sin(a) * r * .65); ctx.lineTo(Math.cos(a) * r * .95, Math.sin(a) * r * .95); }
  ctx.stroke(); ctx.restore();
}
function person(x, y, s, col) {
  ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y - 54 * s, 13 * s, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(x, y, 26 * s, Math.PI, 2 * Math.PI); ctx.fill();
}
function tick(x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = 6; ctx.strokeStyle = C.cream;
  ctx.beginPath(); ctx.moveTo(-12, 1); ctx.lineTo(-3, 11); ctx.lineTo(14, -9); ctx.stroke(); ctx.restore();
}
/* bottle and jar are anchored at their bottom centre */
function bottle(x, y, s, l1, l2) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineWidth = 5 / s; ctx.strokeStyle = C.ink;
  rr(-56, -150, 112, 150, 20); ctx.fillStyle = 'rgba(184,137,58,0.32)'; ctx.fill(); ctx.stroke();
  rr(-40, -180, 80, 34, 8); ctx.fillStyle = 'rgba(184,137,58,0.32)'; ctx.fill(); ctx.stroke();
  rr(-50, -208, 100, 30, 8); ctx.fillStyle = C.ink2; ctx.fill(); ctx.stroke();
  rr(-46, -128, 92, 76, 6); ctx.fillStyle = PAPER; ctx.fill(); ctx.stroke();
  ctx.font = font('sans', 17, 700); ctx.letterSpacing = '2px'; ctx.fillStyle = C.ink; ctx.textAlign = 'center'; ctx.fillText(l1, 1, -96); ctx.fillText(l2, 1, -70);
  ctx.restore();
}
function jar(x, y, cr) {
  ctx.save(); ctx.translate(x, y); ctx.lineJoin = 'round'; ctx.lineWidth = 7; ctx.strokeStyle = C.ink;
  rr(-150, -330, 300, 330, 44); ctx.fillStyle = 'rgba(255,255,255,0.45)'; ctx.fill(); ctx.stroke();
  rr(-112, -372, 224, 56, 10); ctx.fillStyle = PAPER; ctx.fill(); ctx.stroke();
  ctx.lineWidth = 3; ctx.globalAlpha = .5; ctx.beginPath(); ctx.moveTo(-118, -280); ctx.lineTo(-118, -90); ctx.stroke();
  if (cr > 0) {
    ctx.globalAlpha = 1; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.strokeStyle = C.ink;
    const pts = [[150, -250], [112, -214], [140, -178], [96, -140], [124, -100]], n = cr * (pts.length - 1);
    ctx.beginPath(); ctx.moveTo(...pts[0]); for (let i = 1; i < pts.length; i++) { if (i - 1 >= n) break; const q = Math.min(1, n - (i - 1)); ctx.lineTo(lerp(pts[i - 1][0], pts[i][0], q), lerp(pts[i - 1][1], pts[i][1], q)); } ctx.stroke();
  }
  ctx.restore();
}
const slot = i => [(i % 3 - 1) * 90, -46 - 72 * ((i / 3) | 0)];

/* ---------- S1: same pill, different name (0 – 6.4) ---------- */
function scene1(t) {
  if (t > 6.6) return;
  line(t, 'Same pill. Same factory.', W / 2, 215, { size: 76, start: -.62, stagger: .1, end: 3.7 });
  line(t, 'They pay for what’s [not inside.]', W / 2, 215, { size: fit('They pay for what’s not inside.', 930, 76), start: 3.9, stagger: .09, end: 5.95 });
  const out = 1 - eio(prog(t, 5.95, .35)), BY = 830;
  ctx.save(); ctx.globalAlpha = out;
  [[340, 'NAME', 'BRAND'], [740, 'STORE', 'BRAND']].forEach(([x, a, b], i) => {
    const p = eback(prog(t, BOT[i], .45)); if (p <= 0) return;
    ctx.save(); ctx.translate(x, BY); ctx.scale(p, p); ctx.translate(-x, -BY); bottle(x, BY, 1.65, a, b); ctx.restore();
  });
  const ep = eback(prog(t, EQ, .35));
  if (ep > 0) { ctx.save(); ctx.translate(540, 700); ctx.scale(ep, ep); ctx.fillStyle = C.gold; rr(-34, -24, 68, 12, 6); ctx.fill(); rr(-34, 8, 68, 12, 6); ctx.fill(); ctx.restore(); }
  [[255, 430, 38], [345, 360, 46], [435, 430, 38], [345, 285, 30]].forEach(([x, y, r], i) => {
    const p = eback(prog(t, BUB[i], .4)); if (p <= 0) return;
    const bob = 5 * Math.sin(t * 3 + i * 1.7);
    ctx.save(); ctx.translate(x, y + bob); ctx.scale(p, p); ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fillStyle = PAPER; ctx.fill();
    ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.stroke(); sun(0, 0, r * .8); ctx.restore();
  });
  ctx.restore();
  ring(t, BUB[3] + .1, 340, 400, 40, 300, C.gold, .7, 9);
  burst(t, BUB[3] + .1, 340, 400, 16, 311, C.goldL, 700, .8);
}

/* ---------- S2: a brand is trust, stored (6.4 – 11.8) ---------- */
function scene2(t) {
  if (t < 6.4 || t > 11.9) return;
  const end = 11.4, out = 1 - eio(prog(t, end, .35)), JX = 540, JY = 860;
  line(t, 'A brand is [trust, stored.]', W / 2, 220, { size: 84, start: 6.65, end });
  line(t, 'Every kept promise goes in.', W / 2, 305, { size: 52, color: C.ink2, start: 8.0, stagger: .07, end });
  ctx.save(); ctx.globalAlpha = out;
  ctx.save(); ctx.translate(JX, JY); ctx.scale(1.2, 1.2); ctx.translate(-JX, -JY);
  const jp = eback(prog(t, JAR, .5));
  if (jp > 0) { ctx.save(); ctx.translate(JX, JY); ctx.scale(jp, jp); ctx.translate(-JX, -JY); jar(JX, JY, 0); ctx.restore(); }
  STARS.forEach((s, i) => {
    const q = prog(t, s, .5); if (q <= 0) return;
    const [sx, sy] = slot(i), fall = q < 1 ? eo(q) : 1, y = lerp(-560, sy, fall) + (q < 1 ? 0 : 0);
    star(JX + lerp(0, sx, fall), JY + y, 31, 1);
  });
  ctx.restore();
  label('KEPT PROMISES', JX, JY + 44, out * eo(prog(t, JAR + .3, .3)), C.ink, 24);
  ctx.restore();
  burst(t, STARS[8] + .3, JX, JY - 140, 18, 411, C.goldL, 700, .8);
}

/* ---------- S3: promise, proof, memory (12 – 17.4) ---------- */
function scene3(t) {
  if (t < 12 || t > 17.5) return;
  const end = 17.0, out = 1 - eio(prog(t, end, .35)), TY = [790, 665, 540];
  line(t, '[Promise.] [Proof.] [Memory.]', W / 2, 220, { size: 84, start: 12.2, stagger: .3, end });
  line(t, 'Proof has to be visible.', W / 2, 305, { size: 50, color: C.ink2, start: 15.0, stagger: .07, end });
  ctx.save(); ctx.globalAlpha = out;
  ['PROMISE', 'PROOF', 'MEMORY'].forEach((nm, i) => {
    const p = eback(prog(t, TIER[i], .45)); if (p <= 0) return;
    const y = TY[i], hi = i === 2;
    ctx.save(); ctx.translate(540, y); ctx.scale(p, p);
    rr(-270, -54, 540, 108, 20); ctx.fillStyle = hi ? '#FFF1CC' : PAPER; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
    ctx.beginPath(); ctx.arc(-204, 0, 38, 0, Math.PI * 2); ctx.fillStyle = hi ? C.gold : C.ink; ctx.fill();
    ctx.save(); ctx.translate(-204, 0); ctx.strokeStyle = C.cream; ctx.fillStyle = C.cream; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    if (i === 0) { rr(-17, -16, 34, 24, 6); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-6, 8); ctx.lineTo(-10, 18); ctx.lineTo(4, 8); ctx.stroke(); }
    else if (i === 1) { ctx.beginPath(); ctx.arc(0, 0, 17, 0, Math.PI * 2); ctx.stroke(); tick(0, 0, .75); }
    else { ctx.beginPath(); ctx.arc(0, -8, 9, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(0, 18, 18, Math.PI, 2 * Math.PI); ctx.fill(); }
    ctx.restore(); ctx.restore();
    label(nm, 540 - 150, y + 19, out * eo(prog(t, TIER[i] + .2, .3)), hi ? C.goldText : C.ink, 56, 'left');
  });
  ctx.restore();
  ring(t, TIER[2] + .25, 540, TY[2], 40, 360, C.gold, .7, 10);
  burst(t, TIER[2] + .25, 540, TY[2], 20, 508, C.goldL, 800, .8);
}

/* ---------- S4: the flywheel (18.1 – 28.6) ---------- */
const FX = 540, FY = 650, ND = [[-135, -135], [135, -135], [135, 135], [-135, 135]];
function spin(t) { const d = Math.max(0, t - DROP), t0 = NODES[3] + .4; return .5 * Math.max(0, Math.min(t, DROP) - t0) + .5 * d + 7 * (d - (1 - Math.exp(-1.5 * d)) / 1.5); }
function scene4(t) {
  if (t < 18.1 || t > 28.7) return;
  const end = 28.2, out = 1 - eio(prog(t, end, .35)), th = spin(t), np = 4;
  line(t, 'Promises build a [flywheel.]', W / 2, 220, { size: fit('Promises build a flywheel.', 930, 80), start: 18.4, end: DROP - .3 });
  line(t, 'It [compounds.]', W / 2, 220, { size: 90, start: DROP, stagger: .1, end });
  line(t, 'Faster each turn.', W / 2, 305, { size: 52, color: C.ink2, start: DROP + .5, stagger: .07, end });
  ctx.save(); ctx.globalAlpha = out; ctx.translate(FX, FY); ctx.scale(1.12, 1.12); ctx.translate(-FX, -FY);
  const wp = eback(prog(t, NODES[0] - .3, .5)), R = 191;
  if (wp > 0) {
    ctx.save(); ctx.translate(FX, FY); ctx.scale(wp, wp);
    ctx.lineWidth = 10; ctx.strokeStyle = C.ink; ctx.beginPath(); ctx.arc(0, 0, 112, 0, Math.PI * 2); ctx.stroke();
    ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); for (let k = 0; k < 6; k++) { const a = th + k * Math.PI / 3; ctx.moveTo(Math.cos(a) * 30, Math.sin(a) * 30); ctx.lineTo(Math.cos(a) * 108, Math.sin(a) * 108); } ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 0, 34, 0, Math.PI * 2); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 6; ctx.stroke(); star(0, 0, 18, 1);
    ctx.restore();
  }
  ND.forEach(([dx, dy], i) => {
    const a0 = Math.atan2(dy, dx), a1 = Math.atan2(ND[(i + 1) % np][1], ND[(i + 1) % np][0]), ap = eio(prog(t, NODES[(i + 1) % np] - .35, .4));
    if (i < 3 && ap > 0 || i === 3 && t >= NODES[3] + .3) {
      const p = i === 3 ? eio(prog(t, NODES[3] + .3, .4)) : ap, span = Math.PI / 2 - .5;
      ctx.beginPath(); ctx.arc(FX, FY, R, a0 + .25, a0 + .25 + span * p); ctx.lineWidth = 7; ctx.strokeStyle = C.gold; ctx.lineCap = 'round'; ctx.stroke();
    }
  });
  if (t > DROP) {
    for (let k = 0; k < 4; k++) { const a = th * .9 + k * Math.PI / 2 - Math.PI / 4; ctx.beginPath(); ctx.arc(FX + Math.cos(a) * R, FY + Math.sin(a) * R, 11, 0, Math.PI * 2); ctx.fillStyle = C.gold; ctx.globalAlpha = out * eo(prog(t, DROP, .5)); ctx.fill(); }
  }
  const names = ['PROMISE', 'KEPT', 'SHARED', 'TRUSTED'];
  ND.forEach(([dx, dy], i) => {
    const p = eback(prog(t, NODES[i], .4)); if (p <= 0) return;
    ctx.save(); ctx.translate(FX + dx, FY + dy); ctx.scale(p, p); ctx.beginPath(); ctx.arc(0, 0, 46, 0, Math.PI * 2); ctx.fillStyle = i === 3 ? C.goldL : PAPER; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
    ctx.font = font('serif', 46); ctx.fillStyle = C.ink; ctx.textAlign = 'center'; ctx.fillText(String(i + 1), 0, 16); ctx.restore();
    const right = dx > 0;
    label(names[i], FX + dx + (right ? 76 : -76), FY + dy + 9, out * eo(prog(t, NODES[i] + .15, .3)), C.ink, 24, right ? 'left' : 'right');
  });
  ctx.restore();
  ring(t, DROP, FX, FY, 60, 520, C.gold, .8, 12);
  ring(t, DROP + .12, FX, FY, 40, 420, C.goldL, .7, 8);
  burst(t, DROP, FX, FY, 28, 313, C.goldL, 1000, .9);
}

/* ---------- S5: one broken promise (28.9 – 33.8) ---------- */
function scene5(t) {
  if (t < 28.9 || t > 33.9) return;
  const end = 33.5, out = 1 - eio(prog(t, end, .35)), JX = 540, JY = 880;
  line(t, 'One broken promise', W / 2, 220, { size: 80, start: 29.1, end });
  line(t, 'drains [ten kept ones.]', W / 2, 310, { size: fit('drains ten kept ones.', 930, 80), start: 30.4, stagger: .09, end });
  ctx.save(); ctx.globalAlpha = out;
  ctx.save(); ctx.translate(JX, JY); ctx.scale(1.2, 1.2); ctx.translate(-JX, -JY);
  const jp = eback(prog(t, JAR5, .5)), cr = eio(prog(t, CRACK, .25));
  if (jp > 0) { ctx.save(); ctx.translate(JX, JY); ctx.scale(jp, jp); ctx.translate(-JX, -JY); jar(JX, JY, cr); ctx.restore(); }
  STARS5.forEach((s, i) => {
    const p = eback(prog(t, s, .3)), q = prog(t, SPILL + i * .1, .9); if (p <= 0 || q >= 1) return;
    const [sx, sy] = slot(i), ex = 150 + 40 + (i % 3) * 30;
    ctx.save(); ctx.globalAlpha *= 1 - eo(q) * .9;
    const x = JX + lerp(sx, ex, eo(q)), y = JY + lerp(sy, 120 + (i % 4) * 14, q * q); ctx.translate(x, y); ctx.rotate(q * 4); ctx.scale(p, p); star(0, 0, 31, 1); ctx.restore();
  });
  ctx.restore(); ctx.restore();
  ring(t, CRACK, JX + 156, JY - 180, 30, 300, C.ink, .6, 9);
}

/* ---------- S6: it fits on an index card (34.6 – 40.4) ---------- */
function scene6(t) {
  if (t < 34.6 || t > 40.5) return;
  const end = 40.15, out = 1 - eio(prog(t, end, .35));
  line(t, 'Diane picked [one promise.]', W / 2, 220, { size: fit('Diane picked one promise.', 930, 80), start: 35.2, end });
  line(t, 'On time, fixed right, or free.', W / 2, 305, { size: 50, color: C.ink2, start: 35.7, stagger: .07, end });
  ctx.save(); ctx.globalAlpha = out;
  const cp = eback(prog(t, CARD, .5));
  if (cp > 0) {
    ctx.save(); ctx.translate(W / 2, 640); ctx.scale(cp, cp); ctx.translate(-W / 2, -640);
    rr(200, 410, 680, 470, 16); ctx.fillStyle = PAPER; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
    ctx.fillStyle = C.gold; ctx.fillRect(200, 480, 680, 5);
    ctx.strokeStyle = 'rgba(58,52,44,0.16)'; ctx.lineWidth = 2; [570, 660, 750, 840].forEach(y => { ctx.beginPath(); ctx.moveTo(224, y); ctx.lineTo(856, y); ctx.stroke(); });
    ctx.restore();
  }
  ['Pick one.', 'Keep it.', 'Show it.', 'Repeat it.'].forEach((q, i) => {
    const s = ITEMS[i], y = 555 + i * 90, np = eback(prog(t, s, .3)) * out;
    if (np > 0) {
      ctx.save(); ctx.translate(268, y - 16); ctx.scale(np, np); ctx.beginPath(); ctx.arc(0, 0, 30, 0, Math.PI * 2); ctx.fillStyle = C.gold; ctx.fill();
      ctx.font = font('sans', 32, 700); ctx.fillStyle = C.cream; ctx.textAlign = 'center'; ctx.fillText(String(i + 1), 0, 11); ctx.restore();
    }
    line(t, q, 330, y, { size: 56, align: 'left', start: s + .1, stagger: .06, end });
  });
  ctx.restore();
  ring(t, ITEMS[3] + .2, 268, 549 + 270, 30, 300, C.gold, .7, 9);
}

/* ---------- S7: just call Diane (40.8 – 46.85) ---------- */
function scene7(t) {
  if (t < 40.8 || t > 47) return;
  const end = 46.7, out = 1 - eio(prog(t, end, .35));
  line(t, 'A year in, they say:', W / 2, 330, { size: 66, color: C.ink2, start: T7.a, stagger: .08, end });
  const bp = eback(prog(t, T7.bub, .45));
  if (bp > 0) {
    ctx.save(); ctx.globalAlpha = out; ctx.translate(W / 2, 520); ctx.scale(bp, bp);
    ctx.beginPath(); ctx.roundRect(-340, -90, 680, 180, 40); ctx.moveTo(-120, 88); ctx.lineTo(-170, 150); ctx.lineTo(-60, 88);
    ctx.fillStyle = PAPER; ctx.fill(); ctx.lineWidth = 7; ctx.lineJoin = 'round'; ctx.strokeStyle = C.ink; ctx.stroke();
    ctx.font = font('serif', 76); ctx.fillStyle = C.ink; ctx.textAlign = 'center'; ctx.fillText('Just call Diane.', 0, 26); ctx.restore();
  }
  line(t, 'That sentence is the [brand.]', W / 2, 760, { size: fit('That sentence is the brand.', 930, 76), start: T7.b, stagger: .1, end });
  const sp = eback(prog(t, T7.b + .5, .4)); if (sp > 0) { ctx.save(); ctx.globalAlpha = out; star(W / 2, 860, 30 * sp, 1); ctx.restore(); }
  burst(t, T7.b + .1, W / 2, 740, 24, 707, C.goldL, 1100, .9);
  ring(t, T7.bub + .3, W / 2, 520, 60, 420, C.gold, .7, 10);
}

/* ---------- S8: end card ---------- */
function scene8(t) {
  if (t < E - .05) return;
  const rp = eio(prog(t, E, .55));
  ctx.fillStyle = C.night; ctx.beginPath(); ctx.arc(W / 2, 600, 1300 * rp, 0, Math.PI * 2); ctx.fill();
  if (rp < 1) return;
  const jp = eback(prog(t, E + .9, .45));
  if (jp > 0) {
    ctx.save(); ctx.translate(W / 2, 266); ctx.scale(jp * .28, jp * .28); ctx.lineJoin = 'round'; ctx.lineWidth = 16; ctx.strokeStyle = C.cream; ctx.globalAlpha = .75;
    rr(-150, -330, 300, 330, 44); ctx.stroke(); rr(-112, -372, 224, 56, 10); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.translate(W / 2, 226); ctx.scale(jp, jp); star(0, 0, 15, 1); ctx.restore();
  }
  ring(t, E + 1.2, W / 2, 216, 30, 300, C.goldL, .8, 8);
  line(t, 'Value, Created —', W / 2, 440, { size: 88, color: C.cream, start: E + 1.15, stagger: .1 });
  const T = 'Chapter 19: Brand: Trust, Stored';
  line(t, '[' + T + ']', W / 2, 535, { size: fit(T, 900, 60), goldColor: C.goldL, start: E + 1.6, stagger: .06 });
  const lp = eio(prog(t, E + 2.15, .45));
  ctx.fillStyle = C.goldL; ctx.fillRect(W / 2 - 70 * lp, 590, 140 * lp, 4);
  line(t, 'Full 9-minute episode — link in comments', W / 2, 680, { font: 'sans', size: 38, color: C.cream, start: E + 2.55, stagger: .05 });
  ctx.save(); ctx.globalAlpha = .6 * eo(prog(t, E + 3.35, .5));
  ctx.font = font('sans', 22, 700); ctx.letterSpacing = '5px'; ctx.textAlign = 'center'; ctx.fillStyle = C.cream;
  ctx.fillText('A FREE AUDIOBOOK · PRODUCED BY THE JOY DIGI', W / 2 + 2.5, 980);
  ctx.restore();
}

const SCENES = [scene1, scene2, scene3, scene4, scene5, scene6, scene7];
const END_CARD = scene8;
