/* Value, Created Ch 6 LinkedIn infographic: chapter config and scenes for ../_engine (design time; WARP maps real time onto it). */
const CHAPTER = 6, KICKER_END = 46.65, BAR_END = 46.75;
const WARP = [[0, 0], [6.4, 4.5], [10.9, 7.6], [16, 11.2], [20.7, 14.5], [27.6, 19.3], [33.1, 23.2], [40.3, 28.2], [47.1, 33], [53, 38]];
/* ---------- timeline constants shared by visuals and cues ---------- */
const SOLVE = [1.7, 2.3, 2.9];
const ICONS = [7.3, 7.9, 8.5];
const ARROW_A = 11.8, ARROW_D = .8;
const PLANK0 = 17.0, REAL = 19.0;
const BLOCKS = [21.3, 22.0], DROP = 23.6;
const MAYBE = 28.8, PAY = 30.6;
const STRIKE = 34.5, MEND = [36.3, 36.9, 37.5];
const ROWS = [40.65, 41.2, 41.75];
const SWIPES = [6.4, 20.7, 33.1];
const E = 46.85;
const IMPACTS = [[SOLVE[0] + .45, 4], [SOLVE[1] + .45, 6], [SOLVE[2] + .45, 11], ...ICONS.map((s, i) => [s + .3, 4 + i * 2]), [ARROW_A + ARROW_D, 7], [REAL + .4, 8],
  [DROP, 16], [DROP + .45, 5], [PAY, 11], [STRIKE, 4], [MEND[2] + .45, 12], [ROWS[2], 12], [E + 1.2, 7]];
const KB = [[0, 6.4], [6.4, 20.7], [20.7, 33.1], [33.1, 46.8]];

cue(0, 'impact', { v: .6 }); cue(.02, 'pop', { f: 1 });
[.45, .6, .75].forEach((x, i) => cue(x + .1, 'blip', { n: [55, 59, 62][i] }));
[1.0, 1.15, 1.3, 1.45].forEach(x => cue(x, 'tick', { f: 2 }));
SOLVE.forEach((x, i) => { cue(x, 'swish'); cue(x + .45, 'thud'); cue(x + .45, 'blip', { n: [64, 69, 76][i] }); });
cue(SOLVE[2] + .45, 'impact', { v: .8 }); cue(SOLVE[2] + .45, 'chime', { n: 76 });
cue(3.9, 'pop', { f: 1 }); cue(4.7, 'pop', { f: 1.2 }); cue(4.75, 'thud');
SWIPES.forEach(x => cue(x - .3, 'whoosh', { v: 1 }));
cue(6.65, 'pop', { f: 1.2 }); cue(7.1, 'pop', { f: .9 });
ICONS.forEach((s, i) => { cue(s, 'whoosh', { v: .3 }); cue(s + .3, 'thud'); cue(s + .35, 'blip', { n: [60, 64, 67][i] }); });
cue(ICONS[2] + .35, 'chime', { n: 72 });
cue(11.1, 'pop', { f: 1.2 }); cue(11.6, 'pop', { f: .9 }); cue(ARROW_A, 'swish'); cue(ARROW_A + ARROW_D, 'thud'); cue(ARROW_A + ARROW_D, 'chime', { n: 74 }); cue(14.0, 'pop', { f: .9 });
cue(16.2, 'pop', { f: 1.2 }); cue(16.8, 'pop', { f: 1 });
for (let i = 0; i < 7; i++) { cue(PLANK0 + i * .13, 'tick', { f: i % 2 }); cue(PLANK0 + i * .13 + .02, 'knock', { v: .4 }); }
cue(REAL - .1, 'whoosh', { v: .35 }); cue(REAL + .4, 'thud'); cue(REAL + .4, 'chime', { n: 79 });
cue(20.2, 'riser', { d: DROP - 20.2 }); cue(21.0, 'pop', { f: 1 });
BLOCKS.forEach((s, i) => { cue(s, 'whoosh', { v: .3 }); cue(s + .4, 'thud'); cue(s + .45, 'blip', { n: [60, 55][i] }); });
for (let x = 22.6, k = 0; x < DROP - .05; x += .12 - k * .003, k++) cue(x, 'tick', { f: k % 2 });
cue(DROP, 'boom', { v: 1 }); cue(DROP, 'chime', { n: 79 }); cue(DROP, 'impact', { v: 1 }); cue(DROP + .2, 'whoosh', { v: .4 }); cue(DROP + .45, 'thud'); cue(DROP + .55, 'pop', { f: 1 });
cue(27.8, 'pop', { f: 1.2 }); cue(28.0, 'swish');
cue(MAYBE, 'whoosh', { v: .25 }); cue(MAYBE + .4, 'thud'); cue(MAYBE + .4, 'blip', { n: 55 });
cue(PAY - .6, 'riser', { d: .6 }); cue(PAY, 'impact', { v: .9 }); cue(PAY, 'chime', { n: 76 }); cue(PAY + .1, 'pop', { f: 1.2 }); cue(PAY + .35, 'knock', { v: 1 });
cue(33.3, 'pop', { f: 1 }); cue(STRIKE, 'swish'); cue(STRIKE + .1, 'thud'); cue(35.0, 'pop', { f: 1.2 });
MEND.forEach((s, i) => { cue(s, 'swish'); cue(s + .4, 'blip', { n: [64, 67, 72][i] }); cue(s + .45, 'tick', { f: 2 }); });
cue(MEND[2] + .45, 'chime', { n: 79 }); cue(MEND[2] + .45, 'thud');
cue(40.0, 'whoosh', { v: .35 }); cue(40.45, 'thud'); cue(ROWS[1], 'pop', { f: 1 }); cue(ROWS[2], 'impact', { v: .9 }); cue(ROWS[2], 'pop', { f: 1.2 }); cue(42.6, 'swish');
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
function small(str, x, y, a, color, size) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.font = font('sans', size || 28, 500); ctx.textAlign = 'center'; ctx.fillStyle = color || C.ink2; ctx.fillText(str, x, y); ctx.restore();
}
function card(x, y, w, h, stroke) {
  rr(x - w / 2, y, w, h, 20); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = stroke || C.ink; ctx.stroke();
}
function check(x, y, r, a) {
  if (a <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(a, a); ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fillStyle = C.gold; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.stroke();
  ctx.lineWidth = r * .22; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(-r * .42, 0); ctx.lineTo(-r * .1, r * .32); ctx.lineTo(r * .45, -r * .34); ctx.stroke(); ctx.restore();
}

/* ---------- S1: three before-and-afters (0 – 6.4) ---------- */
const TX = [240, 540, 840], TY = 450, TH = 370, KY = 625;
/* amp 1 = tangled, 0 = straight line */
function knot(x, y, amp, color, seed) {
  ctx.save(); ctx.translate(x, y); ctx.strokeStyle = color; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath();
  for (let k = 0; k <= 90; k++) {
    const s = k / 90, px = -110 + 220 * s + amp * 40 * Math.cos(s * 23 + seed), py = amp * (50 * Math.sin(s * 29 + seed) + 28 * Math.sin(s * 17 + 1 + seed));
    if (k) ctx.lineTo(px, py); else ctx.moveTo(px, py);
  }
  ctx.stroke(); ctx.restore();
}
function scene1(t) {
  if (t > 6.6) return;
  line(t, 'Three before-and-afters.', W / 2, 215, { size: 76, start: -.62, stagger: .1, end: 3.7 });
  line(t, 'Nobody bought a tool.', W / 2, 205, { size: 78, start: 3.9, stagger: .1, end: 5.95 });
  line(t, 'They bought', W / 2, 295, { size: 72, start: 4.7, stagger: .08, end: 5.95 });
  line(t, '[the end of a problem.]', W / 2, 380, { size: fit('the end of a problem.', 936, 76, 'serif'), start: 5.05, stagger: .07, end: 5.95 });
  const out = 1 - eio(prog(t, 5.95, .35));
  ctx.save(); ctx.globalAlpha = out;
  ['LOCKED OUT', 'EMPTY ROOM', 'HAND CHARTS'].forEach((nm, i) => {
    const ip = eback(prog(t, .45 + i * .15, .4)); if (ip <= 0) return;
    const sv = eio(prog(t, SOLVE[i], .55)), done = sv >= 1;
    ctx.save(); ctx.translate(TX[i], TY + TH / 2); ctx.scale(clamp(ip), clamp(ip)); ctx.translate(-TX[i], -TY - TH / 2);
    card(TX[i], TY, 270, TH, done ? C.gold : C.ink);
    knot(TX[i], KY, 1 - sv, sv > .5 ? C.goldText : C.ink, i * 2.1);
    label(nm, TX[i], TY + TH - 36, 1, C.ink2, 24);
    ctx.restore();
    check(TX[i] + 116, TY + 24, 30, eback(prog(t, SOLVE[i] + .4, .35)));
    ring(t, SOLVE[i] + .45, TX[i], KY, 30, 200, C.gold, .6, 8);
    burst(t, SOLVE[i] + .45, TX[i], KY, 12, 17 + i * 5, C.goldL, 500, .7);
  });
  ctx.restore();
}

/* ---------- S2: inventions are rescues (6.4 – 10.9) ---------- */
function icon(kind) {
  ctx.save(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  if (kind === 0) {
    rr(-80, -46, 160, 92, 6); ctx.fillStyle = C.goldL; ctx.fill(); ctx.stroke();
    ctx.lineWidth = 4; ctx.beginPath(); for (let k = -3; k <= 3; k++) { ctx.moveTo(k * 20, -40); ctx.lineTo(k * 20, 40); } ctx.stroke();
  } else if (kind === 1) {
    rr(-78, -52, 156, 104, 8); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.stroke();
    ctx.fillStyle = C.ink; let x = -62; [8, 4, 12, 4, 6, 10, 4, 8, 12, 6, 4, 8].forEach((w, i) => { if (i % 2 === 0) ctx.fillRect(x, -36, w, 72); x += w + 4; });
  } else {
    ctx.beginPath(); ctx.arc(-12, -12, 44, 0, Math.PI * 2); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.stroke();
    ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(20, 20); ctx.lineTo(62, 62); ctx.stroke();
    ctx.lineWidth = 5; ctx.strokeStyle = C.gold; ctx.beginPath(); ctx.arc(-12, -12, 30, 3.4, 4.6); ctx.stroke();
  }
  ctx.restore();
}
function scene2(t) {
  if (t < 6.4 || t > 11) return;
  const end = 10.45, out = 1 - eio(prog(t, end, .35));
  line(t, 'Every invention', W / 2, 220, { size: 84, start: 6.65, stagger: .1, end });
  line(t, 'is a [rescue.]', W / 2, 310, { size: 84, start: 7.1, stagger: .12, end });
  ctx.save(); ctx.globalAlpha = out;
  ['CONTAINER', 'BARCODE', 'SEARCH'].forEach((nm, i) => {
    const p = eback(prog(t, ICONS[i], .45)); if (p <= 0) return;
    ctx.save(); ctx.translate(TX[i], 620); ctx.scale(clamp(p), clamp(p)); ctx.translate(-TX[i], -620);
    card(TX[i], 460, 280, 330, C.ink);
    label(nm, TX[i], 750, 1, C.ink, 24); ctx.save(); ctx.translate(TX[i], 625); icon(i); ctx.restore();
    ctx.restore();
    check(TX[i] + 116, 482, 28, eback(prog(t, ICONS[i] + .4, .35)));
    ring(t, ICONS[i] + .3, TX[i], 630, 30, 200, C.gold, .6, 8);
  });
  ctx.restore();
}

/* ---------- S3: problem first (10.9 – 16) ---------- */
function scene3(t) {
  if (t < 10.9 || t > 16.1) return;
  const end = 15.55, out = 1 - eio(prog(t, end, .35));
  line(t, 'The problem', W / 2, 220, { size: 84, start: 11.1, stagger: .1, end });
  line(t, 'comes [first.]', W / 2, 310, { size: 84, start: 11.55, stagger: .12, end });
  ctx.save(); ctx.globalAlpha = out;
  const ax = 250, bx = 830, ay = 650;
  const np = eback(prog(t, 11.5, .5)), sp = eback(prog(t, ARROW_A + ARROW_D - .1, .5));
  if (np > 0) {
    ctx.save(); ctx.translate(ax, ay); ctx.scale(clamp(np), clamp(np)); ctx.beginPath(); ctx.arc(0, 0, 90, 0, Math.PI * 2); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
    ctx.restore(); knot(ax, ay, 1 - .0, C.ink, 1.3);
  }
  if (sp > 0) {
    ctx.save(); ctx.translate(bx, ay); ctx.scale(clamp(sp), clamp(sp)); glow(0, 0, 180, .6); rr(-80, -80, 160, 160, 28); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
  }
  const pr = eio(prog(t, ARROW_A, ARROW_D));
  if (pr > 0) {
    const x0 = ax + 110, x1 = lerp(x0, bx - 110, pr);
    ctx.strokeStyle = C.goldText; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x0, ay); ctx.lineTo(x1, ay); ctx.stroke();
    if (pr > .15) { ctx.beginPath(); ctx.moveTo(x1 - 26, ay - 26); ctx.lineTo(x1, ay); ctx.lineTo(x1 - 26, ay + 26); ctx.stroke(); }
  }
  ctx.restore();
  ring(t, ARROW_A + ARROW_D, bx, ay, 40, 280, C.gold, .7, 10);
  burst(t, ARROW_A + ARROW_D, bx, ay, 16, 41, C.goldL, 800, .8);
}

/* ---------- S4: the workaround bridge (16 – 20.7) ---------- */
const PL = Array.from({ length: 7 }, (_, i) => [300 + i * 80, 640 + (rnd(i + 4) - .5) * 44, (rnd(i + 9) - .5) * .6]);
function scene4(t) {
  if (t < 16 || t > 20.8) return;
  const end = 20.25, out = 1 - eio(prog(t, end, .35));
  line(t, 'Every workaround is a', W / 2, 220, { size: 72, start: 16.2, stagger: .08, end });
  line(t, '[problem in disguise.]', W / 2, 310, { size: 76, start: 16.8, stagger: .1, end });
  ctx.save(); ctx.globalAlpha = out;
  const bk = eio(prog(t, 16.3, .5));
  ctx.fillStyle = 'rgba(58,52,44,0.10)'; ctx.strokeStyle = C.ink; ctx.lineWidth = 5;
  rr(72 - 200 * (1 - bk), 660, 230, 220, 14); ctx.fill(); ctx.stroke(); rr(778 + 200 * (1 - bk), 660, 230, 220, 14); ctx.fill(); ctx.stroke();
  ctx.strokeStyle = C.faint; ctx.lineWidth = 4;
  for (let r = 0; r < 3; r++) { ctx.beginPath(); for (let x = 300; x <= 780; x += 8) { const y = 790 + r * 34 + 6 * Math.sin(x * .05 + t * 2.5 + r); if (x === 300) ctx.moveTo(x, y); else ctx.lineTo(x, y); } ctx.stroke(); }
  PL.forEach(([x, y, a], i) => {
    const p = eback(prog(t, PLANK0 + i * .13, .35)); if (p <= 0) return;
    ctx.save(); ctx.translate(x, y - (1 - clamp(p)) * 60); ctx.rotate(a); ctx.scale(clamp(p), clamp(p));
    rr(-44, -12, 88, 24, 5); ctx.fillStyle = i % 2 ? C.goldL : '#CDBFA7'; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
  });
  const sp = eo(prog(t, PLANK0 + .8, .6));
  if (sp > 0) { ctx.strokeStyle = C.ink2; ctx.lineWidth = 4; [-70, -42].forEach((dy, k) => { ctx.beginPath(); ctx.moveTo(300, 640 + dy); ctx.quadraticCurveTo(540, 640 + dy + 90 + k * 20, 300 + 480 * sp, 640 + dy); ctx.stroke(); }); }
  const rp = eo(prog(t, REAL, .5));
  if (rp > 0) {
    ctx.save(); ctx.strokeStyle = C.goldText; ctx.lineWidth = 8; ctx.setLineDash([3, 14]); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(300, 590); ctx.lineTo(300 + 480 * rp, 590); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
  }
  ctx.restore();
  ring(t, REAL + .4, 540, 590, 30, 330, C.gold, .7, 8);
}

/* ---------- S5: the formula (20.7 – 27.6) ---------- */
const FX = [220, 520, 820], FB = 830;
function scene5(t) {
  if (t < 20.7 || t > 27.7) return;
  const end = 27.1, out = 1 - eio(prog(t, end, .35));
  line(t, 'Problem solved,', W / 2, 220, { size: 80, start: 21.0, stagger: .09, end });
  line(t, 'minus the cost.', W / 2, 310, { size: 80, start: BLOCKS[1] - .2, stagger: .09, end });
  line(t, '[equals value.]', W / 2, 410, { size: 88, start: DROP, stagger: .1, end });
  ctx.save(); ctx.globalAlpha = out;
  ctx.strokeStyle = C.ink; ctx.lineWidth = 5; ctx.lineCap = 'round'; const gp = eio(prog(t, 21.1, .4));
  ctx.beginPath(); ctx.moveTo(W / 2 - (W / 2 - 72) * gp, FB); ctx.lineTo(W / 2 + (W / 2 - 72) * gp, FB); ctx.stroke();
  const bars = [[FX[0], 300, BLOCKS[0], C.gold], [FX[1], 110, BLOCKS[1], C.fill], [FX[2], 190, DROP, C.goldL]];
  bars.forEach(([x, h, s0, col], i) => {
    const p = i === 2 ? eback(prog(t, s0, .55)) : eio(prog(t, s0, .5)); if (p <= 0) return;
    const hh = Math.max(4, h * clamp(p)); rr(x - 75, FB - hh, 150, hh, 14);
    ctx.fillStyle = col; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke();
  });
  const mp = eback(prog(t, BLOCKS[1] - .1, .4)), ep = eback(prog(t, DROP, .4));
  ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.strokeStyle = C.ink;
  if (mp > 0) { ctx.save(); ctx.translate(370, 640); ctx.scale(clamp(mp), clamp(mp)); ctx.beginPath(); ctx.moveTo(-22, 0); ctx.lineTo(22, 0); ctx.stroke(); ctx.restore(); }
  if (ep > 0) { ctx.save(); ctx.translate(670, 640); ctx.scale(clamp(ep), clamp(ep)); ctx.beginPath(); ctx.moveTo(-22, -12); ctx.lineTo(22, -12); ctx.moveTo(-22, 12); ctx.lineTo(22, 12); ctx.stroke(); ctx.restore(); }
  const glowA = eo(prog(t, DROP, .6)); glow(FX[2], FB - 100, 230, .7 * glowA);
  ctx.restore();
  ring(t, DROP, FX[2], FB - 100, 50, 480, C.gold, .8, 12);
  ring(t, DROP + .12, FX[2], FB - 100, 30, 380, C.goldL, .7, 8);
  burst(t, DROP, FX[2], FB - 100, 30, 313, C.goldL, 1000, .9);
}

/* ---------- S6: the pay-today test (27.6 – 33.1) ---------- */
function scene6(t) {
  if (t < 27.6 || t > 33.2) return;
  const end = 32.65, out = 1 - eio(prog(t, end, .35));
  line(t, 'Would someone pay you', W / 2, 220, { size: 72, start: 27.8, stagger: .08, end });
  line(t, 'to make it stop, [today?]', W / 2, 310, { size: 76, start: 28.4, stagger: .08, end });
  const CX = [300, 780], CY = 460, CW = 360, CH = 400;
  const mp = eback(prog(t, MAYBE, .45)), pp = eback(prog(t, PAY, .4));
  ctx.save(); ctx.globalAlpha = out;
  if (mp > 0) {
    ctx.save(); ctx.globalAlpha = out * lerp(1, .55, eo(prog(t, PAY, .3))); ctx.translate(CX[1], CY + CH / 2); ctx.scale(clamp(mp), clamp(mp)); ctx.translate(-CX[1], -CY - CH / 2);
    card(CX[1], CY, CW, CH, C.ink2);
    ctx.beginPath(); ctx.arc(CX[1], CY + 130, 62, 0, Math.PI * 2); ctx.lineWidth = 6; ctx.strokeStyle = C.ink2; ctx.stroke();
    star(CX[1], CY + 130, 30, 1);
    ctx.restore();
    label('MAYBE LATER', CX[1], CY + 270, out * eo(prog(t, MAYBE + .3, .3)) * lerp(1, .55, eo(prog(t, PAY, .3))), C.ink2, 26);
    small('a hobby', CX[1], CY + 318, out * eo(prog(t, MAYBE + .5, .3)) * lerp(1, .55, eo(prog(t, PAY, .3))), C.ink2, 44);
    small('with a logo', CX[1], CY + 368, out * eo(prog(t, MAYBE + .5, .3)) * lerp(1, .55, eo(prog(t, PAY, .3))), C.ink2, 44);
  }
  if (pp > 0) {
    ctx.save(); ctx.translate(CX[0], CY + CH / 2); ctx.scale(clamp(pp), clamp(pp)); ctx.translate(-CX[0], -CY - CH / 2);
    glow(CX[0], CY + 200, 300, .6);
    card(CX[0], CY, CW, CH, C.gold);
    ctx.restore();
    check(CX[0], CY + 130, 62, clamp(pp));
    label('PAY TODAY', CX[0], CY + 270, out * eo(prog(t, PAY + .2, .3)), C.goldText, 26);
  }
  ctx.restore();
  ring(t, PAY, CX[0], CY + 130, 40, 330, C.gold, .8, 10);
  burst(t, PAY, CX[0], CY + 130, 22, 604, C.goldL, 1000, .8);
}

/* ---------- S7: ask what is broken (33.1 – 40.3) ---------- */
const RC = [540, 665], RO = 185, RI = 125, GAP = .15;
const SEGS = [[-.9, 1.0], [1.0, 3.1], [3.1, 5.3832]];
function annSeg(a0, a1) { ctx.beginPath(); ctx.arc(0, 0, RO, a0, a1); ctx.arc(0, 0, RI, a1, a0, true); ctx.closePath(); }
function scene7(t) {
  if (t < 33.1 || t > 40.4) return;
  const end = 39.85, out = 1 - eio(prog(t, end, .35));
  const r1 = line(t, 'Stop asking what you can build.', W / 2, 225, { size: 56, color: C.ink2, start: 33.3, stagger: .06, end });
  const u = eio(prog(t, STRIKE, .35)) * out;
  if (u > 0) { ctx.save(); ctx.strokeStyle = C.ink; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(r1.x0 - 12, 212); ctx.lineTo(r1.x0 - 12 + (r1.w + 24) * u, 212); ctx.stroke(); ctx.restore(); }
  line(t, 'Ask what’s [broken.]', W / 2, 335, { size: 88, start: 35.0, stagger: .1, end });
  const rp = eback(prog(t, 35.2, .5)); if (rp <= 0) return;
  ctx.save(); ctx.globalAlpha = out; ctx.translate(RC[0], RC[1]); ctx.scale(clamp(rp), clamp(rp));
  const fixed = MEND.map(s => eio(prog(t, s, .6)));
  SEGS.forEach(([a0, a1], i) => {
    const m = (a0 + a1) / 2, off = 14 * (1 - fixed[i]) * 1;
    ctx.save(); ctx.translate(Math.cos(m) * off, Math.sin(m) * off); annSeg(a0 + GAP, a1 - GAP); ctx.fillStyle = '#CDBFA7'; ctx.fill(); ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
  });
  SEGS.forEach(([a0], i) => {
    const f = fixed[i]; if (f <= 0) return;
    annSeg(a0 - GAP * f, a0 + GAP * f); ctx.fillStyle = C.gold; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke();
  });
  const all = fixed[2]; glow(0, 0, 330 * all, .45 * all);
  if (all > 0) { ctx.save(); ctx.globalAlpha *= .55 * all; SEGS.forEach(([a0, a1]) => { annSeg(a0 + GAP, a1 - GAP); ctx.fillStyle = C.goldL; ctx.fill(); }); ctx.restore(); }
  ctx.restore();
  ring(t, MEND[2] + .45, RC[0], RC[1], 60, 420, C.gold, .8, 10);
  burst(t, MEND[2] + .45, RC[0], RC[1] - RO, 22, 707, C.goldL, 900, .8);
}

/* ---------- S8: takeaway (40.3 – 47.1) ---------- */
function scene8(t) {
  if (t < 40.3 || t > 47.1) return;
  const end = 46.7, out = 1 - eio(prog(t, end, .35));
  const gp = eback(prog(t, 40.45, .5));
  if (gp > 0) {
    ctx.save(); ctx.globalAlpha = out; ctx.translate(540, 310); ctx.scale(clamp(gp) * .42, clamp(gp) * .42); glow(0, 0, 330, .55);
    SEGS.forEach(([a0, a1]) => { annSeg(a0 + GAP, a1 - GAP); ctx.fillStyle = '#CDBFA7'; ctx.fill(); ctx.lineWidth = 8; ctx.strokeStyle = C.ink; ctx.stroke(); });
    SEGS.forEach(([a0]) => { annSeg(a0 - GAP, a0 + GAP); ctx.fillStyle = C.gold; ctx.fill(); ctx.lineWidth = 8; ctx.strokeStyle = C.ink; ctx.stroke(); });
    ctx.restore();
  }
  line(t, 'Find the problem.', W / 2, 560, { size: 84, start: ROWS[0], stagger: .08, end });
  line(t, 'End it well.', W / 2, 660, { size: 84, start: ROWS[1], stagger: .08, end });
  const s3 = 'Charge less than the pain.';
  const r = line(t, '[' + s3 + ']', W / 2, 770, { size: fit(s3, 936, 84, 'serif'), start: ROWS[2], stagger: .08, end });
  const u = eio(prog(t, 42.6, .4)) * out;
  if (u > 0) { ctx.fillStyle = C.gold; ctx.fillRect(r.x0, 800, r.w * u, 9); }
  burst(t, ROWS[2] + .1, W / 2, 750, 24, 707, C.goldL, 1100, .9);
}

/* ---------- S9: end card (47.1 – 53) ---------- */
function scene9(t) {
  if (t < E - .05) return;
  const rp = eio(prog(t, E, .55));
  ctx.fillStyle = C.night; ctx.beginPath(); ctx.arc(W / 2, 600, 1300 * rp, 0, Math.PI * 2); ctx.fill();
  if (rp < 1) return;
  const gp = eio(prog(t, E + .9, .4));
  ctx.fillStyle = C.cream; ctx.globalAlpha = .7; ctx.fillRect(W / 2 - 120 * gp, 186, 240 * gp, 4); ctx.globalAlpha = 1;
  const kp = eio(prog(t, E + .95, .7)), cp = eback(prog(t, E + 1.6, .4));
  ctx.save(); ctx.translate(W / 2, 285); ctx.strokeStyle = C.cream; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.globalAlpha = .75; ctx.beginPath();
  for (let k = 0; k <= 60 * kp; k++) { const s = k / 60, amp = 1 - eio(prog(t, E + 1.5, .6)), px = -90 + 180 * s + amp * 20 * Math.cos(s * 23), py = amp * (24 * Math.sin(s * 29) + 12 * Math.sin(s * 17 + 1)); if (k) ctx.lineTo(px, py); else ctx.moveTo(px, py); }
  ctx.stroke(); ctx.restore();
  if (cp > 0) check(W / 2 + 130, 285, 24, cp);
  ring(t, E + 1.6, W / 2 + 130, 285, 30, 300, C.goldL, .8, 8);
  const rows = ['Chapter 6:', 'Every Value Starts', 'as a Problem Solved'], sz = Math.min(...rows.map(r => fit(r, 900, 72, 'serif'))), ry = 520 + rows.length * 78 - 30;
  line(t, 'Value, Created —', W / 2, 430, { size: 88, color: C.cream, start: E + 1.15, stagger: .1 });
  rows.forEach((r, i) => line(t, '[' + r + ']', W / 2, 520 + i * 78, { size: sz, goldColor: C.goldL, start: E + 1.6 + i * .2, stagger: .06 }));
  const lp = eio(prog(t, E + 2.15, .45));
  ctx.fillStyle = C.goldL; ctx.fillRect(W / 2 - 70 * lp, ry, 140 * lp, 4);
  line(t, 'Full 10-minute episode — link in comments', W / 2, ry + 90, { font: 'sans', size: fit('Full 10-minute episode — link in comments', 936, 44, 'sans'), color: C.cream, start: E + 2.55, stagger: .05 });
  ctx.save(); ctx.globalAlpha = .6 * eo(prog(t, E + 3.35, .5));
  ctx.font = font('sans', 24, 700); ctx.letterSpacing = '5px'; ctx.textAlign = 'center'; ctx.fillStyle = C.cream;
  ctx.fillText('A FREE AUDIOBOOK · PRODUCED BY THE JOY DIGI', W / 2 + 2.5, 980);
  ctx.restore();
}

const SCENES = [scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8];
const END_CARD = scene9;
