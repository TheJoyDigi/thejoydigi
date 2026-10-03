/* Value, Created Ch 20 LinkedIn infographic: chapter config and scenes for ../_engine (design time; WARP maps real time onto it). */
const CHAPTER = 20, KICKER_END = 46.65, BAR_END = 46.75;
const WARP = [[0, 0], [6.4, 4.5], [17.2, 12.1], [31.4, 22.1], [46.85, 33.2], [53, 38]];
/* ---------- timeline constants shared by visuals and cues ---------- */
const GRID0 = .45, GOLD = 1.9, CLOCK = [2.5, 3.7], PERS1 = 3.7, FLY = 3.9, PULSE = 4.9;
const BARS = [7.2, 7.5], RISE0 = 11.2, DROP = 13.6;
const PERS3 = 17.9, ROWS3 = 18.5, OUT = [20.4, 20.8], RISK = 22.6;
const ROWS4 = [26.0, 26.7, 27.4];
const STONES = [32.4, 33.0, 33.6, 34.2], ISLAND = 34.8, PWALK = 34.9, HOPS = [35.5, 36.1, 36.7, 37.3];
const T6 = { a: 39.0, b: 40.2, s: 42.4, key: 43.2 };
const SWIPES = [6.4, 17.2, 31.4];
const E = 46.85;
const IMPACTS = [[GOLD + .15, 4], [FLY + .3, 6], [BARS[1] + 1.9, 3], [DROP, 16], [DROP + .45, 5], [OUT[0] + .3, 4], [OUT[1] + .3, 9],
  ...ROWS4.map(s => [s + .3, 3]), [HOPS[3] + .35, 9], [T6.b, 12], [E + 1.2, 7]];
const KB = [[0, 6.4], [6.4, 17.2], [17.2, 31.4], [31.4, 46.8]];

cue(0, 'impact', { v: .6 }); cue(.02, 'pop', { f: 1 });
for (let i = 0; i < 10; i += 2) cue(GRID0 + i * .07, 'tick', { f: i % 3 });
cue(GOLD, 'whoosh', { v: .3 }); cue(GOLD + .15, 'chime', { n: 72 }); cue(GOLD + .15, 'blip', { n: 64 });
for (let x = CLOCK[0]; x < CLOCK[1]; x += .3) cue(x, 'tick', { f: 2 });
cue(3.9, 'pop', { f: 1 }); cue(FLY - .1, 'whoosh', { v: .5 }); cue(FLY + .3, 'thud'); cue(FLY + .3, 'blip', { n: 55 }); cue(PULSE, 'chime', { n: 76 });
SWIPES.forEach(x => cue(x - .3, 'whoosh', { v: 1 }));
cue(6.65, 'pop', { f: 1.2 }); cue(8.0, 'pop', { f: 1 });
BARS.forEach((s, i) => { cue(s, 'whoosh', { v: .3 }); cue(s + 1.9, 'thud'); cue(s + 1.9, 'blip', { n: [57, 62][i] }); });
cue(RISE0, 'riser', { d: DROP - RISE0 });
for (let x = 12.5, k = 0; x < DROP - .05; x += .13 - k * .004, k++) cue(x, 'tick', { f: k % 2 });
cue(DROP, 'boom', { v: 1 }); cue(DROP, 'chime', { n: 79 }); cue(DROP, 'impact', { v: 1 }); cue(DROP + .2, 'whoosh', { v: .4 });
cue(DROP + .45, 'thud'); cue(DROP + .05, 'pop', { f: 1.2 }); cue(DROP + .35, 'pop', { f: 1 });
for (let x = DROP + .8; x < 16.4; x += .4) cue(x, 'tick', { f: 2 });
cue(17.8, 'pop', { f: 1.2 }); cue(PERS3, 'pop', { f: 1.1 });
for (let i = 0; i < 5; i += 2) cue(ROWS3 + i * .12, 'tick', { f: i % 3 });
cue(OUT[0], 'whoosh', { v: .3 }); cue(OUT[0] + .3, 'thud'); cue(OUT[0] + .3, 'blip', { n: 60 });
cue(OUT[1], 'whoosh', { v: .4 }); cue(OUT[1] + .3, 'impact', { v: .9 }); cue(OUT[1] + .3, 'chime', { n: 79 }); cue(OUT[1] + .35, 'pop', { f: 1.2 });
cue(RISK, 'pop', { f: .9 }); cue(RISK + .4, 'knock', { v: .8 });
cue(24.6, 'pop', { f: 1.2 }); cue(25.3, 'pop', { f: 1 });
ROWS4.forEach((s, i) => { cue(s, 'whoosh', { v: .3 }); cue(s + .3, 'thud'); cue(s + .35, 'blip', { n: [60, 64, 67][i] }); });
cue(28.4, 'chime', { n: 72 });
cue(31.9, 'pop', { f: 1.2 }); cue(32.3, 'pop', { f: .9 });
STONES.forEach((s, i) => { cue(s, 'pop', { f: 1 }); cue(s + .05, 'blip', { n: [55, 59, 62, 66][i] }); });
cue(ISLAND, 'whoosh', { v: .3 }); cue(ISLAND + .3, 'thud');
HOPS.forEach((h, i) => { cue(h, 'whoosh', { v: .2 }); cue(h + .3, 'tick', { f: 2 }); cue(h + .3, 'blip', { n: [62, 66, 69, 74][i] }); });
cue(HOPS[3] + .35, 'impact', { v: .9 }); cue(HOPS[3] + .35, 'chime', { n: 79 });
cue(T6.a, 'pop', { f: 1.2 }); cue(T6.b - .6, 'riser', { d: .6 }); cue(T6.b, 'impact', { v: .9 }); cue(T6.b, 'chime', { n: 79 }); cue(T6.b + .1, 'pop', { f: 1.2 });
cue(T6.s, 'pop', { f: .9 }); cue(T6.key, 'whoosh', { v: .3 }); cue(T6.key + .3, 'blip', { n: 72 }); cue(T6.key + .45, 'blip', { n: 79 });
cue(E - .05, 'whoosh', { v: 1 });
[E + .95, E + 1.1].forEach((x, i) => cue(x + .1, 'blip', { n: [72, 79][i] }));
cue(E + 1.2, 'boom', { v: .9 }); cue(E + 1.25, 'chime', { n: 72 });
cue(E + 2.55, 'pop', { f: .9 });
const MARKERS = { groove: 6.4, breakdown: RISE0, drop: DROP, end: 46.75 };

const PAPER = '#FFFBF3';
function star(x, y, r) {
  ctx.save(); ctx.translate(x, y); ctx.beginPath();
  for (let i = 0; i < 8; i++) { const rad = i % 2 ? r * .28 : r, an = i * Math.PI / 4 - Math.PI / 2; ctx.lineTo(Math.cos(an) * rad, Math.sin(an) * rad); }
  ctx.closePath(); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
}
function person(x, y, s, col) {
  ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y - 54 * s, 13 * s, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(x, y, 26 * s, Math.PI, 2 * Math.PI); ctx.fill();
}
function keyIcon(x, y, s, rot, col) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.lineWidth = 7; ctx.strokeStyle = C.ink; ctx.fillStyle = col;
  ctx.beginPath(); ctx.arc(-52, 0, 28, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.arc(-52, 0, 9, 0, Math.PI * 2); ctx.fillStyle = PAPER; ctx.fill(); ctx.stroke();
  rr(-24, -9, 96, 18, 6); ctx.fillStyle = col; ctx.fill(); ctx.stroke();
  [[40, 24], [62, 18]].forEach(([tx, th]) => { rr(tx - 7, 8, 14, th, 4); ctx.fill(); ctx.stroke(); });
  ctx.restore();
}

/* ---------- S1: a tenth, sold twelve days in (0 – 6.4) ---------- */
const bx = i => 140 + (i % 5) * 134, by = i => 450 + ((i / 5) | 0) * 134;
function scene1(t) {
  if (t > 6.6) return;
  line(t, 'Ten percent. Twelve days.', W / 2, 215, { size: 76, start: -.62, stagger: .1, end: 3.7 });
  line(t, 'Then he sold his [claim.]', W / 2, 215, { size: 76, start: 3.9, stagger: .1, end: 5.95 });
  const out = 1 - eio(prog(t, 5.95, .35));
  ctx.save(); ctx.globalAlpha = out;
  const fly = eio(prog(t, FLY, .7)), pul = eo(prog(t, PULSE, .5));
  for (let i = 0; i < 10; i++) {
    const p = eback(prog(t, GRID0 + i * .07, .35)); if (p <= 0) continue;
    const gold = i === 9 && t >= GOLD, cx = bx(i) + 60, cy = by(i) + 60;
    if (i === 9) {
      if (fly >= 1) continue;
      const fx = lerp(cx, 905, fly), fy = lerp(cy, 610, fly) - Math.sin(fly * Math.PI) * 120, sc = p * (1 - .4 * fly);
      ctx.save(); ctx.translate(fx, fy); ctx.scale(sc, sc); rr(-60, -60, 120, 120, 14); ctx.fillStyle = gold ? C.goldL : 'rgba(58,52,44,0.14)'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
      continue;
    }
    const s2 = 1 + .06 * pul;
    ctx.save(); ctx.translate(cx, cy); ctx.scale(p * s2, p * s2); rr(-60, -60, 120, 120, 14); ctx.fillStyle = 'rgba(58,52,44,0.14)'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
    if (pul > 0 && i < 9) star(cx, cy, 20 * pul);
  }
  if (fly > 0) { ctx.save(); ctx.globalAlpha *= .6 * (1 - pul); ctx.setLineDash([10, 10]); ctx.lineWidth = 4; ctx.strokeStyle = C.ink2; rr(bx(9), by(9), 120, 120, 14); ctx.stroke(); ctx.restore(); }
  label('HIS 10%', bx(9) + 140, by(9) + 68, out * eo(prog(t, GOLD, .3)) * (1 - fly), C.goldText, 24, 'left');
  const cl = eo(prog(t, CLOCK[0] - .2, .4));
  if (cl > 0) {
    ctx.save(); ctx.translate(300, 830); ctx.scale(cl, cl); ctx.beginPath(); ctx.arc(0, 0, 50, 0, Math.PI * 2); ctx.fillStyle = PAPER; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
    const a = prog(t, CLOCK[0], CLOCK[1] - CLOCK[0]) * Math.PI * 2 * 2 - Math.PI / 2; ctx.lineCap = 'round'; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a) * 34, Math.sin(a) * 34); ctx.stroke(); ctx.restore();
    label('12 DAYS', 380, 840, out * cl, C.ink, 30, 'left');
  }
  [905, 975].forEach((x, i) => { const p = eback(prog(t, PERS1 + i * .12, .35)); if (p > 0) { ctx.save(); ctx.translate(x, 760); ctx.scale(p, p); person(0, 0, 1.05, C.ink2); ctx.restore(); } });
  ctx.restore();
  ring(t, FLY + .3, 905, 660, 30, 240, C.gold, .7, 9);
  burst(t, GOLD, bx(9) + 60, by(9) + 60, 14, 311, C.goldL, 600, .7);
}

/* ---------- S2: wages pay for the past, ownership for what is next (6.4 – 17) ---------- */
const NOWX = 500, WY = 580, OY = 740;
function scene2(t) {
  if (t < 6.4 || t > 17.1) return;
  const end = 16.65, out = 1 - eio(prog(t, end, .35)), pre = DROP - .3;
  line(t, 'Wages pay for your [past.]', W / 2, 220, { size: 80, start: 6.65, end: pre });
  line(t, 'The deal ends with the hours.', W / 2, 305, { size: 50, color: C.ink2, start: 8.0, stagger: .07, end: pre });
  line(t, 'Ownership pays for', W / 2, 220, { size: 80, start: DROP, stagger: .1, end });
  line(t, 'what [happens next.]', W / 2, 310, { size: 84, start: DROP + .3, stagger: .1, end });
  ctx.save(); ctx.globalAlpha = out;
  const np = eio(prog(t, 6.9, .5)), nowAlpha = np;
  ctx.save(); ctx.globalAlpha *= nowAlpha; ctx.setLineDash([4, 12]); ctx.lineWidth = 4; ctx.strokeStyle = C.ink2; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(NOWX, 430); ctx.lineTo(NOWX, 440 + 440 * np); ctx.stroke(); ctx.restore();
  label('NOW', NOWX, 410, out * nowAlpha, C.ink, 26);
  label('WAGE', 90, WY - 40, out * eo(prog(t, BARS[0], .3)), C.ink, 24, 'left');
  label('OWNERSHIP', 90, OY - 40, out * eo(prog(t, BARS[1], .3)), C.goldText, 24, 'left');
  const wg = eio(prog(t, BARS[0], 2.0)), og = eio(prog(t, BARS[1], 2.0)), ext = eo(prog(t, DROP, .8));
  if (wg > 0) { rr(90, WY, Math.max(4, (NOWX - 90) * wg), 46, 23); ctx.fillStyle = C.fill; ctx.fill(); }
  if (wg >= 1) { rr(NOWX - 6, WY - 14, 12, 74, 6); ctx.fillStyle = C.ink; ctx.fill(); }
  if (t > RISE0 + 1) { ctx.save(); ctx.globalAlpha *= .55 * eo(prog(t, RISE0 + 1, .5)); ctx.setLineDash([10, 10]); ctx.lineWidth = 3; ctx.strokeStyle = C.ink2; rr(NOWX + 14, WY, W - 72 - NOWX - 14, 46, 23); ctx.stroke(); ctx.restore(); }
  if (og > 0) { rr(90, OY, Math.max(4, (NOWX - 90) * og), 46, 23); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke(); }
  if (ext > 0) {
    const x1 = lerp(NOWX, W - 72, ext);
    rr(NOWX - 20, OY, x1 - NOWX + 20, 46, 23); ctx.fillStyle = C.goldL; ctx.fill(); ctx.stroke();
    ctx.save(); ctx.beginPath(); ctx.rect(NOWX, OY, x1 - NOWX, 46); ctx.clip(); ctx.fillStyle = C.gold;
    for (let k = -1; k < 12; k++) { const cx = NOWX + ((k * 70 + t * 160) % 840); ctx.beginPath(); ctx.moveTo(cx, OY + 8); ctx.lineTo(cx + 22, OY + 23); ctx.lineTo(cx, OY + 38); ctx.lineWidth = 6; ctx.strokeStyle = C.gold; ctx.stroke(); }
    ctx.restore();
    [[640, 0], [760, 1], [880, 2], [980, 3]].forEach(([x, k]) => { const a = eo(prog(t, DROP + .5 + k * .15, .4)); if (a > 0) star(x, OY - 44 - 14 * Math.sin(t * 3 + k), 20 * a); });
  }
  ctx.restore();
  ring(t, DROP, NOWX, OY + 23, 50, 520, C.gold, .8, 12);
  ring(t, DROP + .12, NOWX, OY + 23, 30, 420, C.goldL, .7, 8);
  burst(t, DROP, NOWX, OY + 23, 28, 313, C.goldL, 1000, .9);
}

/* ---------- S3: Maya and Tom (17.4 – 24.6) ---------- */
function scene3(t) {
  if (t < 17.4 || t > 24.7) return;
  const end = 24.3, out = 1 - eio(prog(t, end, .35)), CX = [300, 780];
  line(t, 'Same work. Same years.', W / 2, 215, { size: 76, start: 17.6, end: OUT[1] - .3 });
  line(t, 'Three times the [money.]', W / 2, 215, { size: fit('Three times the money.', 930, 80), start: OUT[1], stagger: .1, end });
  line(t, 'Tom also took the [risk.]', W / 2, 305, { size: 52, color: C.ink2, start: RISK, stagger: .08, end });
  ctx.save(); ctx.globalAlpha = out;
  ['MAYA', 'TOM'].forEach((nm, i) => {
    const p = eback(prog(t, PERS3 + i * .15, .4)); if (p > 0) { ctx.save(); ctx.translate(CX[i], 520); ctx.scale(p, p); person(0, 0, 1.7, C.ink); ctx.restore(); }
    label(nm, CX[i], 566, out * eo(prog(t, PERS3 + .3 + i * .15, .3)), C.ink, 26);
    for (let k = 0; k < 5; k++) {
      const q = eback(prog(t, ROWS3 + k * .12 + i * .04, .3)); if (q <= 0) continue;
      ctx.save(); ctx.translate(CX[i] + (k - 2) * 54, 620); ctx.scale(q, q); rr(-22, -22, 44, 44, 8); ctx.fillStyle = 'rgba(58,52,44,0.28)'; ctx.fill(); ctx.restore();
    }
  });
  const m1 = eback(prog(t, OUT[0], .4)), t3 = [eback(prog(t, OUT[1], .4)), eback(prog(t, OUT[1] + .15, .4)), eback(prog(t, OUT[1] + .3, .4))];
  const blk = (x, p, eq) => {
    if (p <= 0) return; const fl = eq ? .75 + .25 * Math.sin(t * 6) * eo(prog(t, RISK, .4)) : 1;
    ctx.save(); ctx.globalAlpha *= fl; ctx.translate(x, 800); ctx.scale(p, p); rr(-58, -58, 116, 116, 16); ctx.fillStyle = eq ? C.gold : C.goldL; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke(); if (eq) star(0, 0, 28); ctx.restore();
  };
  blk(CX[0], m1, false); blk(CX[1] - 128, t3[0], false); blk(CX[1], t3[1], true); blk(CX[1] + 128, t3[2], true);
  label('WAGES', CX[0], 710, out * eo(prog(t, OUT[0] + .2, .3)), C.ink2, 24);
  label('WAGES + A SHARE', CX[1], 710, out * eo(prog(t, OUT[1] + .2, .3)), C.goldText, 24);
  ctx.restore();
  ring(t, OUT[1] + .3, CX[1], 800, 40, 320, C.gold, .8, 11);
  burst(t, OUT[1] + .3, CX[1], 800, 24, 509, C.goldL, 900, .8);
}

/* ---------- S4: the same pattern everywhere (24.6 – 30.6) ---------- */
function scene4(t) {
  if (t < 24.6 || t > 30.7) return;
  const end = 30.3, out = 1 - eio(prog(t, end, .35)), RY = [520, 670, 820];
  line(t, 'The worker creates.', W / 2, 215, { size: 80, start: 24.7, end });
  line(t, 'The [owner] keeps.', W / 2, 310, { size: 84, start: 25.3, end });
  ctx.save(); ctx.globalAlpha = out;
  [['TENANT', 'LANDLORD'], ['AUTHOR', 'PUBLISHER'], ['MUSICIAN', 'LABEL']].forEach(([a, b], i) => {
    const p = eback(prog(t, ROWS4[i], .4)); if (p <= 0) return;
    const y = RY[i];
    ctx.save(); ctx.translate(540, y); ctx.scale(p, p); ctx.translate(-540, -y);
    rr(72, y - 48, 290, 96, 20); ctx.fillStyle = PAPER; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
    person(124, y + 28, .8, C.ink); label(a, 238, y + 9, 1, C.ink, 24);
    rr(718, y - 48, 290, 96, 20); ctx.fillStyle = C.goldL; ctx.fill(); ctx.stroke();
    ctx.save(); ctx.translate(768, y + 4); keyIcon(0, 0, .42, -.5, C.gold); ctx.restore(); label(b, 892, y + 9, 1, C.ink, 24);
    ctx.lineCap = 'round'; ctx.lineWidth = 5; ctx.strokeStyle = C.ink2; ctx.beginPath(); ctx.moveTo(382, y); ctx.lineTo(698, y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(682, y - 14); ctx.lineTo(700, y); ctx.lineTo(682, y + 14); ctx.stroke();
    for (let k = 0; k < 4; k++) { const f = (t * .5 + k / 4 + i * .13) % 1; ctx.beginPath(); ctx.arc(lerp(392, 688, f), y, 9, 0, Math.PI * 2); ctx.fillStyle = C.gold; ctx.fill(); }
    ctx.restore();
  });
  ctx.restore();
}

/* ---------- S5: four stepping stones to owning (31.8 – 38.4) ---------- */
const SX = [170, 340, 510, 680], SY = [830, 740, 650, 560];
function scene5(t) {
  if (t < 31.8 || t > 38.5) return;
  const end = 38.15, out = 1 - eio(prog(t, end, .35));
  line(t, 'Ownership is a [ladder.]', W / 2, 220, { size: 80, start: 31.9, end });
  line(t, 'The first rung is small.', W / 2, 305, { size: 50, color: C.ink2, start: 32.3, stagger: .07, end });
  ctx.save(); ctx.globalAlpha = out;
  const names = ['BUY IN AT WORK', 'ASK FOR A PIECE', 'BUY ASSETS', 'BUILD YOURS'];
  STONES.forEach((s, i) => {
    const p = eback(prog(t, s, .4)); if (p <= 0) return;
    ctx.save(); ctx.translate(SX[i], SY[i]); ctx.scale(p, p); ctx.beginPath(); ctx.ellipse(0, 0, 62, 44, 0, 0, Math.PI * 2); ctx.fillStyle = PAPER; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
    ctx.font = font('serif', 44); ctx.fillStyle = C.goldText; ctx.textAlign = 'center'; ctx.fillText(String(i + 1), 0, 15); ctx.restore();
    label(names[i], i === 3 ? SX[i] - 80 : SX[i] + 80, SY[i] + 9, out * eo(prog(t, s + .15, .3)), C.ink, 24, i === 3 ? 'right' : 'left');
  });
  const ip = eback(prog(t, ISLAND, .5));
  if (ip > 0) {
    ctx.save(); ctx.translate(900, 460); ctx.scale(ip, ip);
    ctx.beginPath(); ctx.ellipse(0, 50, 100, 36, 0, 0, Math.PI * 2); ctx.fillStyle = 'rgba(58,52,44,0.14)'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
    ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(-40, 40); ctx.lineTo(-40, -14); ctx.lineTo(0, -52); ctx.lineTo(40, -14); ctx.lineTo(40, 40); ctx.closePath(); ctx.fillStyle = C.goldL; ctx.fill(); ctx.stroke();
    rr(-11, 8, 22, 32, 4); ctx.fillStyle = C.ink; ctx.fill(); ctx.restore();
    label('YOURS', 900, 574, out * eo(prog(t, ISLAND + .3, .3)), C.goldText, 24);
  }
  const pp = eback(prog(t, PWALK, .35));
  if (pp > 0) {
    const pts = [[SX[0], SY[0]], [SX[1], SY[1]], [SX[2], SY[2]], [SX[3], SY[3]], [900, 506]];
    let px = pts[0][0], py = pts[0][1], hop = 0;
    HOPS.forEach((h, i) => { const q = prog(t, h, .42); if (q > 0) { px = lerp(pts[i][0], pts[i + 1][0], eo(q)); py = lerp(pts[i][1], pts[i + 1][1], eo(q)); hop = Math.sin(q * Math.PI) * 60; } });
    ctx.save(); ctx.translate(px, py - 6 - hop); ctx.scale(pp, pp); person(0, 0, 1.0, C.ink); ctx.restore();
  }
  ctx.restore();
  ring(t, HOPS[3] + .35, 900, 500, 30, 300, C.gold, .8, 10);
  burst(t, HOPS[3] + .35, 900, 500, 22, 811, C.goldL, 800, .8);
}

/* ---------- S6: takeaway (38.8 – 46.85) ---------- */
function scene6(t) {
  if (t < 38.8 || t > 47) return;
  const end = 46.7, out = 1 - eio(prog(t, end, .35));
  line(t, 'The question isn’t effort.', W / 2, 330, { size: fit('The question isn’t effort.', 930, 70), color: C.ink2, start: T6.a, stagger: .08, end });
  line(t, 'It’s [what you own.]', W / 2, 450, { size: fit('It’s what you own.', 930, 96), start: T6.b, stagger: .1, end });
  line(t, 'Start this week. Take one step.', W / 2, 580, { size: 48, color: C.ink2, start: T6.s, stagger: .06, end });
  const kp = eback(prog(t, T6.key, .5));
  if (kp > 0) { ctx.save(); ctx.globalAlpha = out; ctx.translate(W / 2, 780); ctx.scale(kp, kp); keyIcon(0, 0, 1.5, -.35, C.goldL); ctx.restore(); }
  burst(t, T6.b + .1, W / 2, 430, 24, 707, C.goldL, 1100, .9);
  ring(t, T6.key + .3, W / 2, 780, 40, 300, C.gold, .7, 9);
}

/* ---------- S7: end card ---------- */
function scene7(t) {
  if (t < E - .05) return;
  const rp = eio(prog(t, E, .55));
  ctx.fillStyle = C.night; ctx.beginPath(); ctx.arc(W / 2, 600, 1300 * rp, 0, Math.PI * 2); ctx.fill();
  if (rp < 1) return;
  const kp = eback(prog(t, E + .95, .45));
  if (kp > 0) {
    ctx.save(); ctx.translate(W / 2, 218); ctx.scale(kp * .55, kp * .55); ctx.rotate(-.35); ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.lineWidth = 8; ctx.strokeStyle = C.goldL; ctx.fillStyle = C.goldL;
    ctx.beginPath(); ctx.arc(-52, 0, 28, 0, Math.PI * 2); ctx.stroke(); rr(-24, -9, 96, 18, 6); ctx.fill();
    [[40, 24], [62, 18]].forEach(([tx, th]) => { rr(tx - 7, 8, 14, th, 4); ctx.fill(); }); ctx.restore();
  }
  ring(t, E + 1.2, W / 2, 218, 30, 300, C.goldL, .8, 8);
  line(t, 'Value, Created —', W / 2, 440, { size: 88, color: C.cream, start: E + 1.15, stagger: .1 });
  const T = 'Chapter 20: Ownership';
  line(t, '[' + T + ']', W / 2, 535, { size: fit(T, 900, 60), goldColor: C.goldL, start: E + 1.6, stagger: .06 });
  const lp = eio(prog(t, E + 2.15, .45));
  ctx.fillStyle = C.goldL; ctx.fillRect(W / 2 - 70 * lp, 590, 140 * lp, 4);
  line(t, 'Full 8-minute episode — link in comments', W / 2, 680, { font: 'sans', size: 38, color: C.cream, start: E + 2.55, stagger: .05 });
  ctx.save(); ctx.globalAlpha = .6 * eo(prog(t, E + 3.35, .5));
  ctx.font = font('sans', 22, 700); ctx.letterSpacing = '5px'; ctx.textAlign = 'center'; ctx.fillStyle = C.cream;
  ctx.fillText('A FREE AUDIOBOOK · PRODUCED BY THE JOY DIGI', W / 2 + 2.5, 980);
  ctx.restore();
}

const SCENES = [scene1, scene2, scene3, scene4, scene5, scene6];
const END_CARD = scene7;
