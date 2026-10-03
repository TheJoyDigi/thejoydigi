/* Value, Created Ch 31 LinkedIn infographic: chapter config and scenes for ../_engine (design time; WARP maps real time onto it). */
const CHAPTER = 31, KICKER_END = 46.65, BAR_END = 46.75;
const WARP = [[0, 0], [6.4, 4.5], [13.2, 9.3], [21.6, 15.3], [27.4, 19.4], [34.6, 24.4], [40.6, 28.8], [46.85, 33.2], [53, 38]];
/* ---------- timeline constants shared by visuals and cues ---------- */
const PILE0 = .3, PILE_DT = .1, PILE_N = 30;
const HOUSE = [7.2, 8.6, 10.0], ARR = [8.2, 9.6], RET = 10.9;
const CAL0 = 14.6, CAL_N = 30, DROP = 18.4;
const cal = i => CAL0 + 2.9 * Math.pow(i / CAL_N, .6);
const STACK0 = 22.4, STACK_DT = .13, STACK_N = 18, WAREH = 24.9;
const RULES = [28.4, 29.7, 31.0];
const PAGE = 35.0, LINES = [35.8, 36.3, 36.8], STAMP = 37.9;
const T0 = 41.0;
const SWIPES = [6.4, 21.6, 34.6];
const E = 46.85;
const IMPACTS = [[PILE0 + PILE_N * PILE_DT, 6], [3.0, 3], [HOUSE[0] + .15, 3], [HOUSE[1] + .15, 4], [HOUSE[2] + .15, 5], [RET + .8, 7], [DROP, 16], [DROP + .45, 5],
  [WAREH + .1, 11], ...RULES.map((s, i) => [s + .15, 3 + i]), [STAMP + .1, 13], [T0 + 1.4, 12], [E + 1.2, 7]];
const KB = [[0, 6.4], [6.4, 21.6], [21.6, 34.6], [34.6, 46.8]];

cue(0, 'impact', { v: .6 }); cue(.02, 'pop', { f: 1 });
for (let i = 0; i < PILE_N; i += 2) cue(PILE0 + i * PILE_DT + .3, 'tick', { f: (i / 2) % 2 });
cue(PILE0 + PILE_N * PILE_DT + .2, 'thud'); cue(3.9, 'pop', { f: 1.2 }); cue(4.6, 'swish');
SWIPES.forEach(x => cue(x - .3, 'whoosh', { v: 1 }));
cue(6.65, 'pop', { f: 1.2 });
HOUSE.forEach((s, i) => { cue(s, 'whoosh', { v: .3 }); cue(s + .25, 'thud'); cue(s + .3, 'blip', { n: [60, 64, 67][i] }); });
ARR.forEach(x => cue(x, 'swish'));
cue(RET - .15, 'whoosh', { v: .3 }); cue(RET - .2, 'pop', { f: 1.1 }); cue(RET + .8, 'impact', { v: .7 }); cue(RET + .8, 'chime', { n: 72 });
cue(13.6, 'pop', { f: 1.2 }); cue(14.2, 'pop', { f: 1 });
for (let i = 0; i < CAL_N; i += 2) cue(cal(i), 'tick', { f: (i / 2) % 2 });
for (let i = 0; i < CAL_N; i += 10) cue(cal(i) + .03, 'blip', { n: 55 + i / 2.5 | 0 });
cue(16.4, 'riser', { d: DROP - 16.4 });
for (let x = 17.2, k = 0; x < DROP - .05; x += .14 - k * .005, k++) cue(x, 'tick', { f: k % 2 });
cue(DROP, 'boom', { v: 1 }); cue(DROP, 'chime', { n: 79 }); cue(DROP, 'impact', { v: 1 }); cue(DROP + .2, 'whoosh', { v: .4 });
for (let i = 0; i < 6; i++) cue(DROP + .25 + i * .1, 'blip', { n: [67, 71, 74, 79, 72, 76][i] });
cue(21.2, 'swish');
cue(21.9, 'pop', { f: 1.2 });
for (let i = 0; i < STACK_N; i += 2) cue(STACK0 + i * STACK_DT, 'tick', { f: (i / 2) % 2 });
cue(WAREH - .5, 'riser', { d: .5 }); cue(WAREH, 'pop', { f: 1.2 }); cue(WAREH + .1, 'impact', { v: .9 }); cue(WAREH + .1, 'drain', { d: 1.1 });
cue(27.65, 'pop', { f: 1.2 });
RULES.forEach((s, i) => { cue(s, 'whoosh', { v: .25 }); cue(s + .15, 'pop', { f: 1 }); cue(s + .2, 'blip', { n: [64, 67, 72][i] }); });
cue(RULES[2] + .2, 'chime', { n: 79 });
cue(34.9, 'pop', { f: 1.2 }); cue(PAGE, 'whoosh', { v: .3 });
LINES.forEach((x, i) => { cue(x, 'tick', { f: 2 }); cue(x + .02, 'blip', { n: [60, 64, 67][i] }); });
cue(37.1, 'pop', { f: 1 }); cue(STAMP - .2, 'riser', { d: .2 }); cue(STAMP + .1, 'impact', { v: .9 }); cue(STAMP + .1, 'chime', { n: 76 });
cue(T0 - .05, 'whoosh', { v: .35 }); cue(T0 + .1, 'thud'); cue(T0 + 1.4, 'impact', { v: .9 }); cue(T0 + 1.4, 'chime', { n: 76 });
cue(T0 + 2.5, 'swish'); cue(T0 + 3.1, 'pop', { f: .9 });
cue(E - .05, 'whoosh', { v: 1 });
[E + .95, E + 1.1].forEach((x, i) => cue(x + .1, 'blip', { n: [72, 79][i] }));
cue(E + 1.2, 'boom', { v: .9 }); cue(E + 1.25, 'chime', { n: 72 });
cue(E + 2.55, 'pop', { f: .9 });
const MARKERS = { groove: 6.4, breakdown: 16.4, drop: DROP, end: 46.75 };

function person(x, y, s, fill) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineWidth = 4 / s; ctx.strokeStyle = C.ink; ctx.fillStyle = fill;
  ctx.beginPath(); ctx.arc(0, -18, 15, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 30, 31, Math.PI, 2 * Math.PI); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.restore();
}
function gear(x, y, r, rot, fill, lw) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.beginPath();
  for (let k = 0; k < 8; k++) {
    const a = k * Math.PI / 4, w = Math.PI / 16;
    ctx.lineTo(Math.cos(a - w * 1.6) * r * .78, Math.sin(a - w * 1.6) * r * .78); ctx.lineTo(Math.cos(a - w) * r, Math.sin(a - w) * r);
    ctx.lineTo(Math.cos(a + w) * r, Math.sin(a + w) * r); ctx.lineTo(Math.cos(a + w * 1.6) * r * .78, Math.sin(a + w * 1.6) * r * .78);
  }
  ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); ctx.lineWidth = lw || 5; ctx.lineJoin = 'round'; ctx.strokeStyle = C.ink; ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 0, r * .28, 0, Math.PI * 2); ctx.fillStyle = C.paper; ctx.fill(); ctx.stroke(); ctx.restore();
}
const HX = [220, 540, 860];
/* roomy house outline, roof apex at (x, 430), floor at y 760 */
function house(x, fill, lit) {
  ctx.beginPath(); ctx.moveTo(x - 125, 520); ctx.lineTo(x, 430); ctx.lineTo(x + 125, 520); ctx.lineTo(x + 125, 760); ctx.lineTo(x - 125, 760); ctx.closePath();
  ctx.fillStyle = fill; ctx.fill(); ctx.lineWidth = 6; ctx.lineJoin = 'round'; ctx.strokeStyle = C.ink; ctx.stroke();
}
function inboxIcon(x, y, a) {
  ctx.save(); ctx.translate(x, y); ctx.globalAlpha *= a; ctx.lineWidth = 7; ctx.strokeStyle = C.ink; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(-50, 10); ctx.lineTo(-50, 44); ctx.lineTo(50, 44); ctx.lineTo(50, 10); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, -50); ctx.lineTo(0, 20); ctx.moveTo(-26, -6); ctx.lineTo(0, 22); ctx.lineTo(26, -6); ctx.stroke(); ctx.restore();
}
function wheelIcon(x, y, rot, a) {
  ctx.save(); ctx.translate(x, y); ctx.globalAlpha *= a; ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(0, 0, 54, 0, Math.PI * 2); ctx.stroke(); ctx.strokeStyle = C.gold;
  for (let k = 0; k < 6; k++) { const an = rot + k * Math.PI / 3; ctx.beginPath(); ctx.moveTo(Math.cos(an) * 14, Math.sin(an) * 14); ctx.lineTo(Math.cos(an) * 54, Math.sin(an) * 54); ctx.stroke(); }
  ctx.beginPath(); ctx.arc(0, 0, 14, 0, Math.PI * 2); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
}
function roomArrow(x0, x1, y, p) {
  if (p <= 0) return;
  const x = lerp(x0, x1, p);
  ctx.save(); ctx.strokeStyle = C.gold; ctx.fillStyle = C.gold; ctx.lineWidth = 8; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x, y); ctx.stroke();
  if (p > .9) { ctx.beginPath(); ctx.moveTo(x1 + 8, y); ctx.lineTo(x1 - 14, y - 16); ctx.lineTo(x1 - 14, y + 16); ctx.closePath(); ctx.fill(); }
  ctx.restore();
}

/* ---------- S1: thirty parts, no machine (0 – 6.4) ---------- */
function scene1(t) {
  if (t > 6.6) return;
  line(t, 'Thirty chapters.', W / 2, 215, { size: 84, start: -.62, stagger: .12, end: 3.7 });
  line(t, 'Thirty [parts.]', W / 2, 305, { size: 84, start: -.4, stagger: .12, end: 3.7 });
  line(t, 'Parts are not a [machine.]', W / 2, 250, { size: fit('Parts are not a machine.', 900, 80, 'serif'), start: 3.9, stagger: .1, end: 5.95 });
  const out = 1 - eio(prog(t, 5.95, .35));
  ctx.save(); ctx.globalAlpha = out;
  for (let i = 0; i < PILE_N; i++) {
    const s = PILE0 + i * PILE_DT, p = prog(t, s, .5); if (p <= 0) continue;
    const lx = 540 + (rnd(i + 1) - .5) * 640, ly = 870 - Math.pow(rnd(i + 77), 1.3) * 250 * Math.max(.15, 1 - Math.abs(lx - 540) / 380);
    const y = lerp(400, ly, p * p), ang = (rnd(i + 31) - .5) * 1.5;
    const w = 90 + rnd(i + 5) * 60, h = 34 + rnd(i + 9) * 22;
    ctx.save(); ctx.globalAlpha *= clamp(p * 4); ctx.translate(lx, y); ctx.rotate(ang * eo(p)); rr(-w / 2, -h / 2, w, h, 8);
    ctx.fillStyle = i % 3 === 0 ? C.goldL : i % 3 === 1 ? '#FFFBF3' : C.faint; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
  }
  ctx.restore();
}

/* ---------- S2: three rooms, one loop (6.4 – 13.2) ---------- */
function scene2(t) {
  if (t < 6.4 || t > 13.3) return;
  const end = 12.85, out = 1 - eio(prog(t, end, .35));
  line(t, 'Three [rooms.]', W / 2, 225, { size: 88, start: 6.7, stagger: .12, end });
  line(t, 'One [loop.]', W / 2, 315, { size: 62, color: C.ink2, start: RET - .2, stagger: .12, end });
  const names = ['INTAKE', 'ENGINE', 'FLYWHEEL'], subs = ['what flows in', 'what you build', 'what comes back'];
  ctx.save(); ctx.globalAlpha = out;
  HX.forEach((x, i) => {
    const p = eback(prog(t, HOUSE[i], .45)); if (p <= 0) return;
    ctx.save(); ctx.translate(x, 760); ctx.scale(p, p); ctx.translate(-x, -760);
    house(x, 'rgba(255,252,246,0.75)');
    if (i === 0) inboxIcon(x, 630, 1); else if (i === 1) gear(x, 630, 62, t * .9, C.goldL, 5); else wheelIcon(x, 630, t * 1.6, 1);
    ctx.restore();
    label(names[i], x, 815, out * eo(prog(t, HOUSE[i] + .25, .3)), i === 2 ? C.goldText : C.ink, 26);
    ctx.save(); ctx.globalAlpha = out * eo(prog(t, HOUSE[i] + .35, .3)); ctx.font = font('sans', 26, 500); ctx.textAlign = 'center'; ctx.fillStyle = C.ink2; ctx.fillText(subs[i], x, 862); ctx.restore();
  });
  roomArrow(352, 410, 640, eio(prog(t, ARR[0], .4)));
  roomArrow(672, 730, 640, eio(prog(t, ARR[1], .4)));
  const rp = eio(prog(t, RET, .9));
  if (rp > 0) {
    const pts = [[860, 424], [860, 372], [220, 372], [220, 418]], lens = [52, 640, 46], tot = 738;
    let rem = tot * rp; ctx.strokeStyle = C.gold; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(...pts[0]);
    for (let k = 0; k < 3 && rem > 0; k++) { const d = Math.min(rem, lens[k]), q = d / lens[k]; ctx.lineTo(lerp(pts[k][0], pts[k + 1][0], q), lerp(pts[k][1], pts[k + 1][1], q)); rem -= d; }
    ctx.stroke();
    if (rp > .96) { ctx.fillStyle = C.gold; ctx.beginPath(); ctx.moveTo(220, 428); ctx.lineTo(204, 404); ctx.lineTo(236, 404); ctx.closePath(); ctx.fill(); }
  }
  ctx.restore();
  ring(t, RET + .8, 220, 430, 30, 240, C.gold, .6, 8);
}

/* ---------- S3: Priya, thirty minutes a morning (13.2 – 21.6) ---------- */
function scene3(t) {
  if (t < 13.2 || t > 21.7) return;
  const end = 21.05, out = 1 - eio(prog(t, end, .35));
  line(t, 'Priya answers questions.', W / 2, 220, { size: fit('Priya answers questions.', 900, 76, 'serif'), start: 13.6, stagger: .1, end });
  line(t, '30 minutes. Every morning.', W / 2, 308, { size: 54, color: C.ink2, start: 14.3, stagger: .08, end: DROP - .4 });
  line(t, 'Clients she never [pitched.]', W / 2, 308, { size: fit('Clients she never pitched.', 900, 62, 'serif'), start: DROP, stagger: .1, end });
  const dp = eo(prog(t, DROP, .5));
  ctx.save(); ctx.globalAlpha = out;
  const sc = lerp(1, .5, dp), ox = lerp(270, 80, dp), oy = lerp(440, 540, dp);
  ctx.save(); ctx.translate(ox, oy); ctx.scale(sc, sc);
  for (let i = 0; i < CAL_N; i++) {
    const p = eback(prog(t, cal(i), .22)), pa = eback(prog(t, 14.4 + i * .01, .3)); if (pa <= 0) continue;
    const cx = (i % 6) * 92 + 40, cy = ((i / 6) | 0) * 92 + 40;
    rr(cx - 40 * pa, cy - 40 * pa, 80 * pa, 80 * pa, 12); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.lineWidth = 4 / 1; ctx.strokeStyle = C.ink; ctx.stroke();
    if (p > 0) { rr(cx - 40 * p, cy - 40 * p, 80 * p, 80 * p, 12); ctx.fillStyle = i % 5 === 4 ? C.gold : C.goldL; ctx.fill(); ctx.stroke(); }
  }
  ctx.restore();
  const gp = eback(prog(t, DROP + .1, .45));
  if (gp > 0) {
    ctx.save(); ctx.translate(640, 640); ctx.scale(gp, gp);
    rr(-80, -110, 160, 220, 14); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
    ctx.fillStyle = C.goldL; rr(-56, -84, 112, 16, 6); ctx.fill(); ctx.fillStyle = C.faint; [-40, -14, 12, 38, 64].forEach(yy => { rr(-56, yy, 112, 10, 5); ctx.fill(); });
    ctx.restore();
    ctx.strokeStyle = C.faint; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.setLineDash([2, 12]);
    ctx.beginPath(); ctx.moveTo(366, 640); ctx.lineTo(lerp(366, 548, eio(prog(t, DROP + .05, .4))), 640); ctx.moveTo(732, 640); ctx.lineTo(lerp(732, 760, eio(prog(t, DROP + .3, .3))), 640); ctx.stroke(); ctx.setLineDash([]);
  }
  [[800, 590], [895, 590], [990, 590], [800, 720], [895, 720], [990, 720]].forEach(([px, py], i) => { const pp = eback(prog(t, DROP + .35 + i * .1, .35)); if (pp > 0) person(px - 24, py, pp * .95, i % 2 ? C.gold : C.goldL); });
  ctx.restore();
  label('GUIDE', 640, 830, out * eo(prog(t, DROP + .5, .3)), C.ink2, 24); label('CLIENTS', 880, 830, out * eo(prog(t, DROP + .8, .3)), C.goldText, 24);
  ring(t, DROP, 640, 640, 60, 560, C.gold, .8, 12);
  ring(t, DROP + .12, 640, 640, 40, 440, C.goldL, .7, 8);
  burst(t, DROP, 640, 640, 28, 313, C.goldL, 1000, .9);
}

/* ---------- S4: a warehouse, not a machine (21.6 – 27.4) ---------- */
function scene4(t) {
  if (t < 21.6 || t > 27.5) return;
  const end = 26.85, out = 1 - eio(prog(t, end, .35));
  line(t, 'All intake. No output.', W / 2, 225, { size: fit('All intake. No output.', 900, 80, 'serif'), start: 21.9, stagger: .1, end });
  line(t, '[A warehouse.]', W / 2, 315, { size: 76, start: WAREH, stagger: .12, end });
  ctx.save(); ctx.globalAlpha = out;
  const dark = eo(prog(t, WAREH, .4));
  HX.forEach((x, i) => {
    const p = eback(prog(t, 22.0 + i * .15, .4)); if (p <= 0) return;
    ctx.save(); ctx.translate(x, 760); ctx.scale(p, p); ctx.translate(-x, -760);
    house(x, i === 0 ? 'rgba(255,252,246,0.75)' : `rgba(58,52,44,${.1 + .7 * dark})`);
    if (i === 1) gear(x, 630, 62, 0, `rgba(205,191,167,${1 - .6 * dark})`, 5);
    if (i === 2) wheelIcon(x, 630, 0, 1 - .6 * dark);
    ctx.restore();
  });
  roomArrow(352, 410, 640, 1); roomArrow(672, 730, 640, 1);
  for (let i = 0; i < STACK_N; i++) {
    const s = STACK0 + i * STACK_DT, p = prog(t, s, .3); if (p <= 0) continue;
    const c = i % 3, r = (i / 3) | 0, x = HX[0] - 80 + c * 80, y = 735 - r * 46 - 24 * (1 - eo(p)) * 6;
    ctx.save(); ctx.globalAlpha *= clamp(p * 3); ctx.translate(x, y); ctx.rotate((rnd(i + 3) - .5) * .3); rr(-34, -20, 68, 40, 8);
    ctx.fillStyle = i % 2 ? C.goldL : '#FFFBF3'; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
  }
  ctx.restore();
  label('NOTHING SHIPS', HX[1], 860, out * eo(prog(t, WAREH + .3, .3)), C.ink2, 26);
  ring(t, WAREH + .1, HX[1], 640, 40, 340, C.ink2, .6, 10);
}

/* ---------- S5: three rules (27.4 – 34.6) ---------- */
function ruleIcon(kind) {
  ctx.save(); ctx.strokeStyle = C.cream; ctx.fillStyle = C.cream; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  if (kind === 0) { for (let r = 0; r < 2; r++) for (let c = 0; c < 3; c++) { rr(-19 + c * 14, -12 + r * 14, 10, 10, 2); ctx.fill(); } }
  else if (kind === 1) { ctx.beginPath(); ctx.arc(0, 0, 17, -Math.PI * .4, Math.PI * 1.3); ctx.stroke(); ctx.beginPath(); ctx.moveTo(9, -22); ctx.lineTo(17, -12); ctx.lineTo(4, -10); ctx.stroke(); }
  else { rr(2, -16, 22, 32, 4); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-24, 0); ctx.lineTo(-4, 0); ctx.moveTo(-12, -8); ctx.lineTo(-4, 0); ctx.lineTo(-12, 8); ctx.stroke(); }
  ctx.restore();
}
function scene5(t) {
  if (t < 27.4 || t > 34.7) return;
  const end = 34.05;
  line(t, 'Three [rules.]', W / 2, 250, { size: 88, start: 27.65, stagger: .12, end });
  ['A rhythm, not a decision', 'Check the returns monthly', 'Hand off the boring parts'].forEach((q, i) => {
    const s = RULES[i], y = 470 + i * 150, np = eback(prog(t, s, .3)) * (1 - eio(prog(t, end, .3)));
    if (np > 0) {
      ctx.save(); ctx.translate(165, y - 20); ctx.scale(np, np);
      ctx.beginPath(); ctx.arc(0, 0, 42, 0, Math.PI * 2); ctx.fillStyle = i === 2 ? C.ink : C.gold; ctx.fill(); ruleIcon(i); ctx.restore();
    }
    line(t, q, 235, y, { size: 56, align: 'left', start: s + .1, stagger: .06, end });
    ring(t, s + .15, 165, y - 20, 30, 150, C.gold, .6, 8);
  });
}

/* ---------- S6: one page (34.6 – 40.6) ---------- */
function scene6(t) {
  if (t < 34.6 || t > 40.7) return;
  const end = 40.15, out = 1 - eio(prog(t, end, .35));
  line(t, 'One [page.]', W / 2, 225, { size: 96, start: 34.9, stagger: .12, end });
  line(t, 'Run it ninety days.', W / 2, 310, { size: 56, color: C.ink2, start: 37.1, stagger: .09, end });
  const pp = eback(prog(t, PAGE, .5)) * out;
  if (pp > 0) {
    ctx.save(); ctx.translate(540, 640); ctx.scale(pp, pp); ctx.rotate(-.025);
    rr(-250, -240, 500, 480, 14); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
    ['INTAKE', 'ENGINE', 'FLYWHEEL'].forEach((nm, i) => {
      const y = -150 + i * 130, lp = eo(prog(t, LINES[i], .35));
      ctx.save(); ctx.globalAlpha = lp; ctx.font = font('sans', 24, 700); ctx.letterSpacing = '5px'; ctx.fillStyle = i === 2 ? C.goldText : C.ink; ctx.fillText(nm, -210, y); ctx.restore();
      ctx.save(); ctx.globalAlpha = lp; ctx.fillStyle = i === 2 ? C.goldL : C.faint; rr(-210, y + 20, 420 * lp, 14, 7); ctx.fill(); rr(-210, y + 46, 280 * lp, 14, 7); ctx.fill(); ctx.restore();
    });
    ctx.restore();
  }
  const sp = eback(prog(t, STAMP, .3));
  if (sp > 0) {
    ctx.save(); ctx.globalAlpha = out; ctx.translate(730, 820); ctx.rotate(-.18); ctx.scale(sp * 1.15, sp * 1.15);
    rr(-105, -34, 210, 68, 16); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke();
    ctx.font = font('sans', 30, 700); ctx.letterSpacing = '5px'; ctx.textAlign = 'center'; ctx.fillStyle = C.ink; ctx.fillText('90 DAYS', 2.5, 11); ctx.restore();
  }
  ring(t, STAMP + .1, 730, 820, 40, 340, C.gold, .7, 10);
  burst(t, STAMP + .1, 730, 820, 18, 41, C.goldL, 800, .8);
}

/* ---------- S7: takeaway (40.6 – 46.85) ---------- */
function scene7(t) {
  if (t < 40.6 || t > 47) return;
  const end = 46.5;
  line(t, 'The machine', W / 2, 410, { size: 100, start: T0 + .1, stagger: .1, end });
  const r = line(t, '[builds you back.]', W / 2, 540, { size: fit('builds you back.', 900, 100, 'serif'), start: T0 + 1.4, stagger: .1, end });
  const u = eio(prog(t, T0 + 2.4, .4)) * (1 - eio(prog(t, end, .35)));
  if (u > 0) { ctx.fillStyle = C.gold; ctx.fillRect(r.x0, 576, r.w * u, 9); }
  line(t, 'You are its first product.', W / 2, 740, { size: 46, color: C.ink2, start: T0 + 3.1, stagger: .07, end });
  burst(t, T0 + 1.5, W / 2, 510, 24, 707, C.goldL, 1100, .9);
}

/* ---------- S8: end card (46.85 – 53) ---------- */
function scene8(t) {
  if (t < E - .05) return;
  const rp = eio(prog(t, E, .55));
  ctx.fillStyle = C.night; ctx.beginPath(); ctx.arc(W / 2, 600, 1300 * rp, 0, Math.PI * 2); ctx.fill();
  if (rp < 1) return;
  const mp = eback(prog(t, E + .95, .4));
  if (mp > 0) { ctx.save(); ctx.translate(W / 2, 258); ctx.scale(mp, mp); gear(0, 0, 54, (t - E) * 1.2, C.goldL, 5); ctx.restore(); }
  line(t, 'Value, Created —', W / 2, 440, { size: 88, color: C.cream, start: E + 1.15, stagger: .1 });
  line(t, '[Chapter 31: Your Value-Creation System]', W / 2, 535, { size: fit('Chapter 31: Your Value-Creation System', 900, 66, 'serif'), goldColor: C.goldL, start: E + 1.6, stagger: .06 });
  const lp = eio(prog(t, E + 2.15, .45));
  ctx.fillStyle = C.goldL; ctx.fillRect(W / 2 - 70 * lp, 590, 140 * lp, 4);
  line(t, 'Full 8-minute episode — link in comments', W / 2, 680, { font: 'sans', size: 38, color: C.cream, start: E + 2.55, stagger: .05 });
  ctx.save(); ctx.globalAlpha = .6 * eo(prog(t, E + 3.35, .5));
  ctx.font = font('sans', 22, 700); ctx.letterSpacing = '5px'; ctx.textAlign = 'center'; ctx.fillStyle = C.cream;
  ctx.fillText('A FREE AUDIOBOOK · PRODUCED BY THE JOY DIGI', W / 2 + 2.5, 980);
  ctx.restore();
}

const SCENES = [scene1, scene2, scene3, scene4, scene5, scene6, scene7];
const END_CARD = scene8;
