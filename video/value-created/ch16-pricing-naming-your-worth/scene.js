/* Value, Created Ch 16 LinkedIn infographic: chapter config and scenes for ../_engine (design time; WARP maps real time onto it). */
const CHAPTER = 16, KICKER_END = 46.65, BAR_END = 46.75;
const WARP = [[0, 0], [6.4, 4.5], [17, 12.1], [31, 22], [37.4, 26.6], [46.85, 33.3], [53, 38]];
/* ---------- timeline constants shared by visuals and cues ---------- */
const NAP = .45, SCRIB = [.9, 2.5], SEC_T = 2.7, YRS = [4.3, 5.5];
const FLOOR_T = 7.3, CEIL_T = 8.3, GAP_T = 9.3, BALL3 = 12.0, GHOST = 14.4;
const RISE0 = 19.6, DROP = 22.0;
const TIERS = [26.0, 26.4, 26.8], PICK = 28.4;
const HOPS = [32.2, 33.2, 34.2];
const T7 = { a: 37.8, b: 38.5, strike: 39.3, c: 40.2, sign: [41.0, 42.4], s1: 43.0, s2: 44.2 };
const SWIPES = [6.4, 17.0, 37.4];
const E = 46.85;
const IMPACTS = [[FLOOR_T + .25, 6], [CEIL_T + .25, 8], [YRS[1], 8], [DROP, 16], [DROP + .45, 5], [TIERS[2] + .25, 4], [PICK, 7],
  [HOPS[2] + .1, 12], [T7.c, 11], [E + 1.2, 7]];
const KB = [[0, 6.4], [6.4, 17], [17, 37.4], [37.4, 46.8]];

cue(0, 'impact', { v: .6 }); cue(.02, 'pop', { f: 1 }); cue(NAP + .1, 'pop', { f: 1.2 });
for (let x = SCRIB[0]; x < SCRIB[1]; x += .2) cue(x, 'tick', { f: 2 });
cue(SEC_T, 'whoosh', { v: .3 }); cue(SEC_T + .3, 'thud'); cue(SEC_T + .3, 'blip', { n: 57 });
cue(3.9, 'pop', { f: 1 }); cue(YRS[0] - .1, 'whoosh', { v: .5 });
for (let x = YRS[0] + .1; x < YRS[1]; x += .2) cue(x, 'tick', { f: (x * 8 | 0) % 2 });
cue(YRS[1], 'impact', { v: .9 }); cue(YRS[1], 'chime', { n: 76 });
SWIPES.forEach(x => cue(x - .3, 'whoosh', { v: 1 }));
cue(6.65, 'pop', { f: 1.2 }); cue(8.1, 'pop', { f: 1 });
[[FLOOR_T, 55], [CEIL_T, 62]].forEach(([s, n]) => { cue(s, 'whoosh', { v: .3 }); cue(s + .25, 'thud'); cue(s + .3, 'blip', { n }); });
cue(GAP_T, 'swish'); cue(GAP_T + .1, 'chime', { n: 72 });
cue(11.7, 'pop', { f: 1.2 }); cue(BALL3, 'thud'); cue(BALL3 + .05, 'blip', { n: 52 }); cue(13.3, 'pop', { f: .9 });
cue(GHOST, 'whoosh', { v: .3 }); cue(GHOST + .3, 'blip', { n: 74 }); cue(GHOST + .5, 'blip', { n: 79 });
cue(17.3, 'pop', { f: 1.2 }); cue(17.8, 'pop', { f: 1 });
[18.2, 18.5].forEach((s, i) => { cue(s, 'whoosh', { v: .3 }); cue(s + .3, 'thud'); cue(s + .35, 'blip', { n: [60, 64][i] }); });
cue(RISE0, 'riser', { d: DROP - RISE0 });
for (let x = 21.0, k = 0; x < DROP - .05; x += .12 - k * .003, k++) cue(x, 'tick', { f: k % 2 });
cue(DROP, 'boom', { v: 1 }); cue(DROP, 'chime', { n: 79 }); cue(DROP, 'impact', { v: 1 }); cue(DROP + .2, 'whoosh', { v: .4 });
cue(DROP + .45, 'thud'); cue(DROP + .3, 'pop', { f: 1.2 });
cue(25.2, 'pop', { f: 1.2 });
TIERS.forEach((s, i) => { cue(s, 'whoosh', { v: .3 }); cue(s + .25, 'thud'); cue(s + .3, 'blip', { n: [60, 64, 67][i] }); });
cue(PICK - .2, 'pop', { f: 1 }); cue(PICK, 'impact', { v: .6 }); cue(PICK, 'chime', { n: 76 }); cue(PICK + .1, 'swish');
cue(31.2, 'pop', { f: 1.2 }); cue(31.6, 'thud'); cue(31.6, 'blip', { n: 55 });
HOPS.forEach((h, i) => { cue(h - .1, 'whoosh', { v: .25 }); cue(h + .3, 'blip', { n: [60, 64, 69][i] }); if (i < 2) cue(h + .35, 'pop', { f: 1.1 }); });
cue(HOPS[2] + .3, 'impact', { v: .9 }); cue(HOPS[2] + .3, 'knock', { v: 1 }); cue(HOPS[2] + .6, 'knock', { v: .8 });
cue(HOPS[2] + .9, 'chime', { n: 76 }); cue(35.3, 'pop', { f: .9 });
cue(T7.a, 'pop', { f: 1.2 }); cue(T7.b, 'pop', { f: 1 }); cue(T7.strike, 'swish');
cue(T7.c - .6, 'riser', { d: .6 }); cue(T7.c, 'impact', { v: .9 }); cue(T7.c, 'chime', { n: 79 }); cue(T7.c + .1, 'pop', { f: 1.2 });
for (let x = T7.sign[0]; x < T7.sign[1]; x += .28) cue(x, 'tick', { f: 0 });
cue(T7.s1, 'pop', { f: .9 }); cue(T7.s2, 'pop', { f: .9 });
cue(E - .05, 'whoosh', { v: 1 });
[E + .95, E + 1.1].forEach((x, i) => cue(x + .1, 'blip', { n: [72, 79][i] }));
cue(E + 1.2, 'boom', { v: .9 }); cue(E + 1.25, 'chime', { n: 72 });
cue(E + 2.55, 'pop', { f: .9 });
const MARKERS = { groove: 6.4, breakdown: RISE0, drop: DROP, end: 46.75 };

function star(x, y, r, a) {
  if (a <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.globalAlpha *= a; ctx.beginPath();
  for (let i = 0; i < 8; i++) { const rad = i % 2 ? r * .28 : r, an = i * Math.PI / 4 - Math.PI / 2; ctx.lineTo(Math.cos(an) * rad, Math.sin(an) * rad); }
  ctx.closePath(); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
}
function ball(x, y, r, gold) {
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = gold ? C.goldL : 'rgba(58,52,44,0.25)'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
}
/* ink ledge that grows from its centre; hatch ticks point away from the room (dir +1 below, -1 above) */
function ledge(y, x0, x1, p, dir) {
  if (p <= 0) return;
  const m = (x0 + x1) / 2, hw = (x1 - x0) / 2 * p;
  ctx.save(); ctx.strokeStyle = C.ink; ctx.lineCap = 'round'; ctx.lineWidth = 7;
  ctx.beginPath(); ctx.moveTo(m - hw, y); ctx.lineTo(m + hw, y); ctx.stroke();
  ctx.lineWidth = 3; ctx.globalAlpha *= .45; ctx.beginPath();
  for (let x = m - hw + 26; x < m + hw - 8; x += 34) { ctx.moveTo(x, y + dir * 8); ctx.lineTo(x - 18, y + dir * 28); }
  ctx.stroke(); ctx.restore();
}
function napkin(x, y, scr) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(-.06);
  rr(-200, -140, 400, 280, 14); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(140, -140); ctx.lineTo(200, -80); ctx.lineTo(140, -80); ctx.closePath();
  ctx.fillStyle = 'rgba(58,52,44,0.12)'; ctx.fill(); ctx.lineWidth = 4; ctx.stroke();
  ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.beginPath();
  const n = Math.floor(160 * scr);
  for (let i = 0; i <= n; i++) {
    const s = i / 160, px = -130 + 260 * s + 42 * Math.sin(s * 19), py = 20 + 52 * Math.cos(s * 19) - 36 * s;
    i ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
  }
  ctx.stroke(); ctx.restore();
}

/* ---------- S1: Picasso's napkin (0 – 6.4) ---------- */
function scene1(t) {
  if (t > 6.6) return;
  line(t, 'Thirty seconds of work.', W / 2, 215, { size: 76, start: -.62, stagger: .12, end: 3.7 });
  line(t, 'Charged for [forty years.]', W / 2, 215, { size: 76, start: 3.9, stagger: .1, end: 5.95 });
  const out = 1 - eio(prog(t, 5.95, .35));
  ctx.save(); ctx.globalAlpha = out;
  label('PICASSO, ON A NAPKIN', W / 2, 372, env(t, .3, 5.95, .4), C.goldText, 26);
  const np = eback(prog(t, NAP, .45));
  if (np > 0) { ctx.save(); ctx.translate(W / 2, 560); ctx.scale(np, np); ctx.translate(-W / 2, -560); napkin(W / 2, 560, eio(prog(t, SCRIB[0], SCRIB[1] - SCRIB[0]))); ctx.restore(); }
  label('30 SECONDS', 72, 764, out * eo(prog(t, SEC_T, .3)), C.ink2, 24, 'left');
  const sp = eback(prog(t, SEC_T, .35));
  if (sp > 0) { rr(72, 780, 30 * sp, 28, 14); ctx.fillStyle = C.fill; ctx.fill(); }
  label('40 YEARS', 72, 842, out * eo(prog(t, YRS[0], .3)), C.goldText, 24, 'left');
  const yp = eio(prog(t, YRS[0], YRS[1] - YRS[0]));
  if (yp > 0) { rr(72, 858, 936 * yp, 28, 14); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.stroke(); }
  ctx.restore();
  ring(t, YRS[1], 1008, 872, 30, 260, C.gold, .7, 9);
  burst(t, YRS[1], 1008, 872, 18, 311, C.goldL, 700, .8);
}

/* ---------- S2 + S3: floor, ceiling, and living on the floor (6.4 – 16.7) ---------- */
const CEIL = 470, FLOOR = 830, BR = 44;
function scene2(t) {
  if (t < 6.4 || t > 16.8) return;
  const end = 16.55, out = 1 - eio(prog(t, end, .35)), mid = (CEIL + FLOOR) / 2;
  line(t, 'Costs set the [floor.]', W / 2, 220, { size: 80, start: 6.65, end: 11.2 });
  line(t, 'The buyer sets the [ceiling.]', W / 2, 310, { size: fit('The buyer sets the ceiling.', 930, 74), start: 8.1, end: 11.2 });
  line(t, 'Most live on the [floor.]', W / 2, 220, { size: 80, start: 11.7, end });
  line(t, 'Cost-plus ignores the customer.', W / 2, 305, { size: 52, color: C.ink2, start: 13.3, stagger: .07, end });
  ctx.save(); ctx.globalAlpha = out;
  const fp = eio(prog(t, FLOOR_T, .5)), cp = eio(prog(t, CEIL_T, .5)), gp = eo(prog(t, GAP_T, .6));
  ctx.fillStyle = `rgba(221,182,95,${.17 * gp})`; ctx.fillRect(72, CEIL, W - 144, FLOOR - CEIL);
  ledge(FLOOR, 72, W - 72, fp, 1); ledge(CEIL, 72, W - 72, cp, -1);
  label('COST', 72, FLOOR + 62, out * eo(prog(t, FLOOR_T + .2, .3)), C.ink, 26, 'left');
  label('BUYER’S VALUE', 72, CEIL - 50, out * eo(prog(t, CEIL_T + .2, .3)), C.goldText, 26, 'left');
  if (gp > 0) {
    ctx.save(); ctx.globalAlpha *= gp; ctx.strokeStyle = C.goldText; ctx.fillStyle = C.goldText; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.setLineDash([2, 12]);
    ctx.beginPath(); ctx.moveTo(950, CEIL + 36); ctx.lineTo(950, FLOOR - 36); ctx.stroke(); ctx.setLineDash([]);
    [[CEIL + 18, 1], [FLOOR - 18, -1]].forEach(([y, d]) => { ctx.beginPath(); ctx.moveTo(950, y); ctx.lineTo(938, y + d * 22); ctx.lineTo(962, y + d * 22); ctx.closePath(); ctx.fill(); });
    ctx.translate(900, mid); ctx.rotate(-Math.PI / 2); ctx.font = font('sans', 28, 700); ctx.letterSpacing = '5px'; ctx.textAlign = 'center'; ctx.fillText('THE GAP', 2.5, 0);
    ctx.restore();
  }
  const rest = FLOOR - BR - 3, bp = eback(prog(t, BALL3, .4));
  if (bp > 0) { ctx.save(); ctx.translate(540, rest + BR); ctx.scale(bp, bp); ctx.translate(-540, -rest - BR); ball(540, rest, BR, false); ctx.restore(); }
  label('COST-PLUS', 540, rest - BR - 24, out * eo(prog(t, BALL3 + .3, .3)), C.ink2, 24);
  const gh = eo(prog(t, GHOST, .5)), gy = CEIL + BR + 36;
  if (gh > 0) {
    ctx.save(); ctx.globalAlpha *= gh; ctx.strokeStyle = C.goldText; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.setLineDash([12, 12]);
    ctx.beginPath(); ctx.arc(540, gy, BR, 0, Math.PI * 2); ctx.globalAlpha *= .6 + .4 * Math.sin(t * 5); ctx.stroke();
    ctx.globalAlpha = out * gh; ctx.beginPath(); ctx.moveTo(540, rest - BR - 58); ctx.lineTo(540, lerp(rest - BR - 58, gy + BR + 24, eo(prog(t, GHOST + .1, .6)))); ctx.stroke(); ctx.setLineDash([]);
    ctx.restore();
  }
  ctx.restore();
  burst(t, FLOOR_T + .3, W / 2, FLOOR, 14, 61, C.goldL, 560, .6);
  burst(t, CEIL_T + .3, W / 2, CEIL, 14, 88, C.goldL, 560, .6);
  burst(t, GAP_T, 700, mid, 14, 77, C.goldL, 520, .7);
}

/* ---------- S4: price the outcome (17 – 24.6) ---------- */
function scene4(t) {
  if (t < 17 || t > 24.7) return;
  const end = 24.5, out = 1 - eio(prog(t, end, .35)), top = 440, bot = 800, r = 42, G = [290, 790], rest = bot - r - 3;
  line(t, 'Price the [outcome,]', W / 2, 220, { size: 84, start: 17.3, end: 21.6 });
  line(t, 'not the input.', W / 2, 310, { size: 84, start: 17.8, end: 21.6 });
  line(t, 'Same two hours.', W / 2, 220, { size: 80, start: DROP, stagger: .1, end });
  line(t, '[Twice] the money.', W / 2, 310, { size: 80, start: DROP + .3, stagger: .1, end });
  ctx.save(); ctx.globalAlpha = out;
  G.forEach((x, i) => {
    const p = eback(prog(t, 18.2 + i * .3, .45)); if (p <= 0) return;
    ctx.fillStyle = 'rgba(221,182,95,0.14)'; ctx.fillRect(x - 150, top, 300, (bot - top) * clamp(p));
    ledge(top, x - 150, x + 150, p, -1); ledge(bot, x - 150, x + 150, p, 1);
    label(i ? 'BY OUTCOME' : 'BY COST', x, bot + 66, out * eo(prog(t, 18.5 + i * .3, .3)), i ? C.goldText : C.ink, 26);
  });
  const lp = eback(prog(t, 18.6, .4));
  if (lp > 0) { ctx.save(); ctx.translate(G[0], rest + r); ctx.scale(lp, lp); ctx.translate(-G[0], -rest - r); ball(G[0], rest, r, false); ctx.restore(); }
  const rp = eback(prog(t, 18.9, .4)), up = eo(prog(t, DROP, .5));
  const wob = 6 * Math.sin(t * 70) * eo(prog(t, RISE0 + .6, .9)) * (1 - eo(prog(t, DROP, .15)));
  const ry = lerp(rest, top + r + 14, up);
  if (rp > 0) {
    if (up > 0) {
      const g = ctx.createLinearGradient(0, ry, 0, rest + r); g.addColorStop(0, 'rgba(221,182,95,0.7)'); g.addColorStop(1, 'rgba(221,182,95,0)');
      ctx.fillStyle = g; ctx.fillRect(G[1] - 22, ry, 44, rest + r - ry);
    }
    ctx.save(); ctx.translate(G[1] + wob, ry + r); ctx.scale(rp, rp); ctx.translate(-G[1] - wob, -ry - r); ball(G[1] + wob, ry, r, t >= DROP); ctx.restore();
  }
  ctx.restore();
  ring(t, DROP, G[1], top + 40, 40, 420, C.gold, .8, 12);
  ring(t, DROP + .12, G[1], top + 40, 30, 340, C.goldL, .7, 8);
  burst(t, DROP, G[1], top + 40, 28, 313, C.goldL, 1000, .9);
}

/* ---------- S5: three tiers, the middle wins (25 – 30.7) ---------- */
function card(cx, cy, name, n, hi, dim) {
  ctx.save(); ctx.globalAlpha *= dim; ctx.translate(cx, cy); ctx.scale(hi, hi);
  rr(-130, -165, 260, 330, 20); ctx.fillStyle = hi > 1 ? '#FFF1CC' : '#FFFBF3'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
  label(name, 0, -110, ctx.globalAlpha, hi > 1 ? C.goldText : C.ink, 24);
  for (let i = 0; i < n; i++) star((i - (n - 1) / 2) * 62, 20, 26, 1);
  ctx.restore();
}
function scene5(t) {
  if (t < 25 || t > 30.7) return;
  const end = 30.5, out = 1 - eio(prog(t, end, .35));
  line(t, 'Offer [three tiers.]', W / 2, 220, { size: 84, start: 25.2, end });
  line(t, 'The middle wins.', W / 2, 310, { size: 70, color: C.ink2, start: PICK - .2, stagger: .1, end });
  ctx.save(); ctx.globalAlpha = out;
  const pk = eback(prog(t, PICK, .4));
  ['BASIC', 'STANDARD', 'PREMIUM'].forEach((nm, i) => {
    const p = eback(prog(t, TIERS[i], .4)); if (p <= 0) return;
    const mid = i === 1, hi = mid ? 1 + .07 * pk : 1, dim = mid ? 1 : 1 - .45 * eo(prog(t, PICK, .4));
    ctx.save(); ctx.translate(215 + i * 325, 640 - (mid ? 18 * pk : 0)); ctx.scale(p, p); card(0, 0, nm, i + 1, hi, dim); ctx.restore();
  });
  const ck = eback(prog(t, PICK + .15, .35));
  if (ck > 0) {
    ctx.save(); ctx.translate(540 + 138, 640 - 18 - 176); ctx.scale(ck, ck);
    ctx.beginPath(); ctx.arc(0, 0, 36, 0, Math.PI * 2); ctx.fillStyle = C.gold; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke();
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = 7; ctx.strokeStyle = C.cream; ctx.beginPath(); ctx.moveTo(-14, 2); ctx.lineTo(-4, 13); ctx.lineTo(16, -10); ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
  ring(t, PICK, 540, 630, 60, 380, C.gold, .7, 10);
  burst(t, PICK, 540, 630, 22, 509, C.goldL, 800, .8);
}

/* ---------- S6: raise it until someone says no (31 – 37) ---------- */
function scene6(t) {
  if (t < 31 || t > 37.1) return;
  const end = 36.95, out = 1 - eio(prog(t, end, .35)), top = 520, bot = 850, r = 40, rest = bot - r - 3, hit = top + r + 3, lv = [0, .28, .58, 1];
  line(t, 'Raise it until', W / 2, 220, { size: 84, start: 31.2, end });
  line(t, 'someone says [no.]', W / 2, 310, { size: 84, start: 31.7, end });
  line(t, 'The right ones stay.', W / 2, 398, { size: 46, color: C.ink2, start: 35.3, stagger: .07, end });
  ctx.save(); ctx.globalAlpha = out;
  const lp = eio(prog(t, 31.3, .5));
  ctx.fillStyle = 'rgba(221,182,95,0.14)'; ctx.fillRect(72, top, W - 144, bot - top);
  ledge(bot, 72, W - 72, lp, 1); ledge(top, 72, W - 72, lp, -1);
  let L = 0, hop = 0;
  HOPS.forEach((h, i) => { const q = prog(t, h, .3); if (q > 0) { L = lerp(lv[i], lv[i + 1], eo(q)); hop = Math.sin(q * Math.PI) * (i < 2 ? 40 : 0); } });
  const bq = prog(t, HOPS[2] + .3, .5); if (bq > 0) L = lerp(1, .86, eo(bq));
  const bp = eback(prog(t, 31.6, .4)), by = lerp(rest, hit, L) - hop;
  if (bp > 0) { ctx.save(); ctx.translate(540, by + r); ctx.scale(bp, bp); ctx.translate(-540, -by - r); ball(540, by, r, t > HOPS[2] + .1); ctx.restore(); }
  [['+10%', 0], ['+20%', 1]].forEach(([s, i]) => {
    const a = env(t, HOPS[i] + .2, HOPS[i] + 1.1, .2, .3); if (a <= 0) return;
    ctx.save(); ctx.globalAlpha = out * a; ctx.translate(540 + 100, lerp(rest, hit, lv[i + 1]) - 8);
    rr(-8, -26, 108, 50, 14); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.stroke();
    ctx.font = font('sans', 28, 700); ctx.fillStyle = C.ink; ctx.textAlign = 'center'; ctx.fillText(s, 46, 10); ctx.restore();
  });
  const np = eback(prog(t, HOPS[2] + .1, .35));
  if (np > 0) {
    ctx.save(); ctx.translate(740, top + 100); ctx.rotate(.1 * Math.sin(t * 28) * (1 - prog(t, HOPS[2] + 1, .6)) + .06); ctx.scale(np, np);
    rr(-60, -38, 120, 76, 20); ctx.fillStyle = C.ink; ctx.fill();
    ctx.font = font('sans', 44, 700); ctx.letterSpacing = '4px'; ctx.fillStyle = C.cream; ctx.textAlign = 'center'; ctx.fillText('NO', 2, 15); ctx.restore();
  }
  ctx.restore();
  ring(t, HOPS[2] + .1, 540, top, 40, 330, C.gold, .8, 10);
  burst(t, HOPS[2] + .1, 540, top, 20, 604, C.goldL, 900, .8);
}

/* ---------- S7: takeaway (37.4 – 46.85) ---------- */
function scene7(t) {
  if (t < 37.4 || t > 47) return;
  const end = 46.7;
  line(t, 'Pricing is not', W / 2, 350, { size: 84, start: T7.a, stagger: .1, end });
  const r = line(t, 'arithmetic.', W / 2, 450, { size: 84, color: C.ink2, start: T7.b, stagger: .1, end });
  const sk = eio(prog(t, T7.strike, .35)) * (1 - eio(prog(t, end, .35)));
  if (sk > 0) { ctx.fillStyle = C.ink; ctx.fillRect(r.x0 - 12, 410, (r.w + 24) * sk, 8); }
  line(t, 'It is [autobiography.]', W / 2, 610, { size: fit('It is autobiography.', 930, 88), start: T7.c, stagger: .1, end });
  const sg = eio(prog(t, T7.sign[0], T7.sign[1] - T7.sign[0])), fo = 1 - eio(prog(t, end, .35));
  if (sg > 0) {
    ctx.save(); ctx.globalAlpha = fo; ctx.strokeStyle = C.gold; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath();
    const n = Math.floor(120 * sg);
    for (let i = 0; i <= n; i++) { const s = i / 120, px = 200 + 680 * s, py = 690 + 22 * Math.sin(s * 40) * (1 - s * .6) - 10 * s; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
    ctx.stroke(); ctx.restore();
  }
  line(t, 'Name it at the value you create.', W / 2, 800, { size: 44, color: C.ink2, start: T7.s1, stagger: .06, end });
  line(t, 'State it calmly, as a fact.', W / 2, 868, { size: 44, color: C.ink2, start: T7.s2, stagger: .06, end });
  burst(t, T7.c + .1, W / 2, 580, 24, 707, C.goldL, 1100, .9);
}

/* ---------- S8: end card ---------- */
function scene8(t) {
  if (t < E - .05) return;
  const rp = eio(prog(t, E, .55));
  ctx.fillStyle = C.night; ctx.beginPath(); ctx.arc(W / 2, 600, 1300 * rp, 0, Math.PI * 2); ctx.fill();
  if (rp < 1) return;
  const gp = eio(prog(t, E + .9, .4));
  ctx.fillStyle = C.cream; ctx.globalAlpha = .7; ctx.fillRect(W / 2 - 120 * gp, 176, 240 * gp, 5); ctx.fillRect(W / 2 - 120 * gp, 262, 240 * gp, 5); ctx.globalAlpha = 1;
  const bp = eback(prog(t, E + .95, .4)), up = eo(prog(t, E + 1.1, .5));
  if (bp > 0) { ctx.save(); ctx.translate(W / 2, lerp(243, 203, up)); ctx.scale(bp, bp); ctx.beginPath(); ctx.arc(0, 0, 17, 0, Math.PI * 2); ctx.fillStyle = C.goldL; ctx.fill(); ctx.restore(); }
  ring(t, E + 1.6, W / 2, 203, 20, 240, C.goldL, .8, 8);
  line(t, 'Value, Created —', W / 2, 440, { size: 88, color: C.cream, start: E + 1.15, stagger: .1 });
  const T = 'Chapter 16: Pricing: Naming Your Worth';
  line(t, '[' + T + ']', W / 2, 535, { size: fit(T, 900, 60), goldColor: C.goldL, start: E + 1.6, stagger: .06 });
  const lp = eio(prog(t, E + 2.15, .45));
  ctx.fillStyle = C.goldL; ctx.fillRect(W / 2 - 70 * lp, 590, 140 * lp, 4);
  line(t, 'Full 9-minute episode — link in comments', W / 2, 680, { font: 'sans', size: 38, color: C.cream, start: E + 2.55, stagger: .05 });
  ctx.save(); ctx.globalAlpha = .6 * eo(prog(t, E + 3.35, .5));
  ctx.font = font('sans', 22, 700); ctx.letterSpacing = '5px'; ctx.textAlign = 'center'; ctx.fillStyle = C.cream;
  ctx.fillText('A FREE AUDIOBOOK · PRODUCED BY THE JOY DIGI', W / 2 + 2.5, 980);
  ctx.restore();
}

const SCENES = [scene1, scene2, scene4, scene5, scene6, scene7];
const END_CARD = scene8;
