/* Value, Created Ch 18 LinkedIn infographic: chapter config and scenes for ../_engine (design time; WARP maps real time onto it). */
const CHAPTER = 18, KICKER_END = 46.65, BAR_END = 46.75;
const WARP = [[0, 0], [6.4, 4.5], [17.2, 12.1], [34.8, 24.7], [46.85, 33.2], [53, 38]];
/* ---------- timeline constants shared by visuals and cues ---------- */
const OWN = 2.7, L_H = [1.0, 1.4, 1.8], M_H = [1.0, 1.4, 1.8, 3.2, 3.55, 3.9, 4.25, 4.6], CREW = 3.0, NUMS = [5.0, 5.15];
const RUNGS = [7.0, 7.3, 7.6, 7.9], FIG0 = 8.4, TRIES = [9.2, 10.2, 11.6], RISE0 = 11.0, DROP = 13.4;
const PILL = [18.6, 19.2, 19.8], SEAT = 20.4, GEM3 = 20.9, PULL = 22.2;
const CARD = 24.6, GEAR = 25.0, PERS = 25.4, LEAVE = 26.8, CHECK = 27.6;
const ROWS = 29.6, STRIKES = [31.6, 32.5];
const TILES = [36.0, 36.6, 37.2], BATON = 38.2;
const T7 = { a: 41.2, strike: 42.1, b1: 43.0, b2: 43.5, s: 44.6, gear: 44.9 };
const SWIPES = [6.4, 17.2, 34.8];
const E = 46.85;
const IMPACTS = [[OWN + .2, 4], [NUMS[1] + .1, 8], [DROP, 16], [DROP + .45, 5], [SEAT + .3, 5], [PULL + .6, 9], [CHECK, 7],
  ...STRIKES.map(s => [s + .5, 4]), [BATON + .2, 8], [T7.b2, 12], [E + 1.2, 7]];
const KB = [[0, 6.4], [6.4, 17.2], [17.2, 34.8], [34.8, 46.8]];

cue(0, 'impact', { v: .6 }); cue(.02, 'pop', { f: 1 }); cue(.4, 'pop', { f: 1.2 });
M_H.forEach((s, i) => { cue(s, 'tick', { f: 2 }); if (i % 4 === 0) cue(s + .02, 'blip', { n: 55 + i * 2 }); });
cue(OWN, 'swish'); cue(OWN + .1, 'drain', { d: .8 }); cue(2.8, 'pop', { f: 1 }); cue(CREW, 'pop', { f: 1.2 }); cue(CREW + .1, 'thud');
cue(NUMS[0], 'whoosh', { v: .3 }); cue(NUMS[0] + .2, 'thud'); cue(NUMS[1] + .1, 'impact', { v: .8 }); cue(NUMS[1] + .1, 'chime', { n: 76 });
SWIPES.forEach(x => cue(x - .3, 'whoosh', { v: 1 }));
cue(6.65, 'pop', { f: 1.2 }); cue(8.0, 'pop', { f: 1 });
RUNGS.forEach((s, i) => { cue(s, 'whoosh', { v: .25 }); cue(s + .3, 'blip', { n: [55, 59, 62, 66][i] }); });
cue(FIG0, 'pop', { f: 1.2 });
TRIES.forEach(s => { cue(s, 'whoosh', { v: .25 }); cue(s + .45, 'scratch'); });
cue(RISE0, 'riser', { d: DROP - RISE0 });
for (let x = 12.4, k = 0; x < DROP - .05; x += .12 - k * .004, k++) cue(x, 'tick', { f: k % 2 });
cue(DROP, 'boom', { v: 1 }); cue(DROP, 'chime', { n: 79 }); cue(DROP, 'impact', { v: 1 }); cue(DROP + .2, 'whoosh', { v: .4 });
cue(DROP + .45, 'thud'); cue(DROP + .05, 'pop', { f: 1.2 }); cue(DROP + .35, 'pop', { f: 1 });
cue(17.8, 'pop', { f: 1.2 });
PILL.forEach((s, i) => { cue(s, 'whoosh', { v: .3 }); cue(s + .3, 'blip', { n: [60, 64, 67][i] }); });
cue(SEAT, 'whoosh', { v: .4 }); cue(SEAT + .3, 'thud'); cue(GEM3, 'chime', { n: 72 });
cue(22.1, 'pop', { f: 1.2 }); cue(PULL, 'swish'); cue(PULL + .6, 'impact', { v: .8 }); cue(PULL + .6, 'knock', { v: 1 });
cue(23.9, 'pop', { f: 1.2 }); cue(24.3, 'pop', { f: .9 });
cue(CARD, 'whoosh', { v: .3 }); cue(CARD + .3, 'thud'); cue(GEAR, 'pop', { f: 1 }); cue(PERS, 'pop', { f: 1.2 });
for (let x = GEAR + .5; x < LEAVE; x += .6) cue(x, 'tick', { f: 2 });
cue(LEAVE, 'swish'); cue(CHECK, 'impact', { v: .8 }); cue(CHECK, 'chime', { n: 79 }); cue(CHECK + .1, 'pop', { f: 1.2 });
cue(29.2, 'pop', { f: 1.2 });
for (let i = 0; i < 7; i += 2) cue(ROWS + i * .12, 'tick', { f: i % 3 });
cue(30.6, 'pop', { f: .9 });
STRIKES.forEach(s => { cue(s, 'scratch'); cue(s + .5, 'blip', { n: 64 }); });
cue(33.5, 'chime', { n: 72 });
cue(35.4, 'pop', { f: 1.2 }); cue(35.9, 'pop', { f: .9 });
TILES.forEach((s, i) => { cue(s, 'whoosh', { v: .3 }); cue(s + .3, 'blip', { n: [60, 64, 67][i] }); });
cue(BATON, 'swish'); cue(BATON + .2, 'impact', { v: .7 }); cue(BATON + .2, 'chime', { n: 76 }); cue(39.0, 'pop', { f: .9 });
cue(T7.a, 'pop', { f: 1.2 }); cue(T7.strike, 'swish'); cue(T7.b1, 'pop', { f: 1 });
cue(T7.b2 - .6, 'riser', { d: .6 }); cue(T7.b2, 'impact', { v: .9 }); cue(T7.b2, 'chime', { n: 79 }); cue(T7.b2 + .1, 'pop', { f: 1.2 });
cue(T7.s, 'pop', { f: .9 }); cue(T7.gear, 'whoosh', { v: .3 }); cue(T7.gear + .2, 'blip', { n: 67 });
cue(E - .05, 'whoosh', { v: 1 });
[E + .95, E + 1.1].forEach((x, i) => cue(x + .1, 'blip', { n: [72, 79][i] }));
cue(E + 1.2, 'boom', { v: .9 }); cue(E + 1.25, 'chime', { n: 72 });
cue(E + 2.55, 'pop', { f: .9 });
const MARKERS = { groove: 6.4, breakdown: RISE0, drop: DROP, end: 46.75 };

const PAPER = '#FFFBF3', GREY = 'rgba(58,52,44,0.12)';
function person(x, y, s, col) {
  ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y - 54 * s, 13 * s, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(x, y, 26 * s, Math.PI, 2 * Math.PI); ctx.fill();
}
function house(x, y, s, fill) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(-26, 0); ctx.lineTo(-26, -30); ctx.lineTo(0, -54); ctx.lineTo(26, -30); ctx.lineTo(26, 0); ctx.closePath();
  ctx.fillStyle = fill; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke();
  rr(-8, -22, 16, 22, 3); ctx.fillStyle = C.ink; ctx.fill(); ctx.restore();
}
function gear(x, y, r, a, fill) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.beginPath();
  for (let i = 0; i < 10; i++) { const a0 = i * Math.PI / 5; [[-.17, .78], [-.1, 1], [.1, 1], [.17, .78]].forEach(([da, k]) => ctx.lineTo(Math.cos(a0 + da) * r * k, Math.sin(a0 + da) * r * k)); }
  ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); ctx.lineWidth = 6; ctx.lineJoin = 'round'; ctx.strokeStyle = C.ink; ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 0, r * .3, 0, Math.PI * 2); ctx.fillStyle = PAPER; ctx.fill(); ctx.lineWidth = 5; ctx.stroke(); ctx.restore();
}
function tick(x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = 6; ctx.strokeStyle = C.cream;
  ctx.beginPath(); ctx.moveTo(-12, 1); ctx.lineTo(-3, 11); ctx.lineTo(14, -9); ctx.stroke(); ctx.restore();
}

/* ---------- S1: two painters, both step away (0 – 6.4) ---------- */
const LANES = [520, 760], SX = k => 275 + k * 78;
function scene1(t) {
  if (t > 6.6) return;
  line(t, 'Two painters. Same city.', W / 2, 215, { size: 76, start: -.62, stagger: .1, end: 2.55 });
  line(t, 'Both step away.', W / 2, 215, { size: 76, start: 2.8, stagger: .08, end: 5.95 });
  line(t, '[One keeps going.]', W / 2, 300, { size: 76, start: 3.4, stagger: .08, end: 5.95 });
  const out = 1 - eio(prog(t, 5.95, .35));
  ctx.save(); ctx.globalAlpha = out;
  ['LUIS', 'MARCUS'].forEach((nm, i) => {
    const cy = LANES[i];
    label(nm, 72, cy - 102, out * eo(prog(t, .3 + i * .15, .3)), i ? C.goldText : C.ink, 26, 'left');
    ctx.save(); ctx.globalAlpha *= eo(prog(t, .3 + i * .15, .4)); rr(72, cy - 85, 936, 170, 18); ctx.fillStyle = 'rgba(58,52,44,0.06)'; ctx.fill(); ctx.restore();
    const leave = eio(prog(t, OWN, .7)), ox = lerp(170, -90, leave), op = eback(prog(t, .45 + i * .15, .4));
    if (op > 0) { ctx.save(); ctx.translate(ox, cy + 55); ctx.scale(op, op); person(0, 0, 1.55, C.ink); ctx.restore(); }
    const H = i ? M_H : L_H;
    for (let k = 0; k < 8; k++) {
      const hp = k < H.length ? eback(prog(t, H[k], .3)) : 0;
      if (hp > 0) { ctx.save(); ctx.translate(SX(k), cy + 55); ctx.scale(hp, hp); house(0, 0, 1.25, C.goldL); ctx.restore(); }
      else if (t > OWN + .6) {
        ctx.save(); ctx.globalAlpha *= .5 * eo(prog(t, OWN + .6, .4)); ctx.setLineDash([8, 8]); ctx.lineWidth = 3; ctx.strokeStyle = C.ink2;
        rr(SX(k) - 30, cy - 18, 60, 72, 8); ctx.stroke(); ctx.restore();
      }
    }
  });
  [140, 215].forEach((x, k) => {
    const p = eback(prog(t, CREW + k * .15, .35)); if (p <= 0) return;
    ctx.save(); ctx.translate(x, LANES[1] + 55); ctx.scale(p, p); person(0, 0, 1.2, C.ink2); ctx.restore();
  });
  [['0', C.ink2], ['41', C.goldText]].forEach(([s, col], i) => {
    const p = eback(prog(t, NUMS[i], .4)); if (p <= 0) return;
    ctx.save(); ctx.translate(930, LANES[i] + 24); ctx.scale(p, p); ctx.font = font('serif', 84); ctx.fillStyle = col; ctx.textAlign = 'center'; ctx.fillText(s, 0, 0); ctx.restore();
    label('HOUSES', 930, LANES[i] + 66, out * eo(prog(t, NUMS[i] + .2, .3)), C.ink2, 24);
  });
  ctx.restore();
  ring(t, NUMS[1] + .1, 930, LANES[1], 30, 260, C.gold, .7, 9);
  burst(t, NUMS[1] + .1, 930, LANES[1], 18, 311, C.goldL, 700, .8);
}

/* ---------- S2: the ladder from job to asset (6.4 – 17) ---------- */
const RY = [830, 700, 570, 440], LX = [280, 520], FX = 400;
function scene2(t) {
  if (t < 6.4 || t > 17.3) return;
  const end = 16.75, out = 1 - eio(prog(t, end, .35)), pre = 13.1;
  line(t, 'Stops when you stop?', W / 2, 220, { size: 80, start: 6.65, end: pre });
  line(t, 'That’s a [job.]', W / 2, 310, { size: 84, start: 8.0, end: pre });
  line(t, 'Runs without you?', W / 2, 220, { size: 80, start: DROP, stagger: .1, end });
  line(t, 'That’s an [asset.]', W / 2, 310, { size: 84, start: DROP + .3, stagger: .1, end });
  ctx.save(); ctx.globalAlpha = out;
  const rp = eio(prog(t, RUNGS[0] - .2, .6)), up = eo(prog(t, DROP, .5)), gl = eo(prog(t, DROP + .1, .5));
  ctx.strokeStyle = C.ink; ctx.lineWidth = 9; ctx.lineCap = 'round';
  LX.forEach(x => { ctx.beginPath(); ctx.moveTo(x, 880); ctx.lineTo(x, lerp(880, 400, rp)); ctx.stroke(); });
  if (gl > 0) { const g = ctx.createRadialGradient(400, RY[3], 10, 400, RY[3], 220); g.addColorStop(0, `rgba(221,182,95,${.7 * gl})`); g.addColorStop(1, 'rgba(221,182,95,0)'); ctx.fillStyle = g; ctx.fillRect(150, RY[3] - 220, 600, 440); }
  ['JOB', 'PRACTICE', 'BUSINESS', 'ASSET'].forEach((nm, i) => {
    const p = eback(prog(t, RUNGS[i], .35)); if (p <= 0) return;
    const top = i === 3;
    ctx.beginPath(); ctx.moveTo(LX[0], RY[i]); ctx.lineTo(lerp(LX[0], LX[1], clamp(p)), RY[i]); ctx.lineWidth = top && gl > 0 ? 14 : 9; ctx.strokeStyle = top && gl > 0 ? C.gold : C.ink; ctx.stroke();
    label(nm, 592, RY[i] + 9, out * eo(prog(t, RUNGS[i] + .15, .3)), top && gl > 0 ? C.goldText : C.ink, 28, 'left');
  });
  const fp = eback(prog(t, FIG0, .4)), base = RY[0] - 10, p1 = RY[1] - 10, top = RY[3] - 10;
  let fy = base;
  TRIES.forEach(s => { fy -= (base - p1) * (eo(prog(t, s, .35)) - eo(prog(t, s + .55, .3))); });
  const jump = eback(prog(t, DROP, .6)), wob = 5 * Math.sin(t * 60) * eo(prog(t, RISE0 + .6, .8)) * (1 - eo(prog(t, DROP, .15)));
  fy = lerp(fy, top, jump);
  if (up > 0) { const g = ctx.createLinearGradient(0, top, 0, base); g.addColorStop(0, 'rgba(221,182,95,0.6)'); g.addColorStop(1, 'rgba(221,182,95,0)'); ctx.fillStyle = g; ctx.fillRect(FX - 20, top, 40, (base - top) * (1 - .3 * up)); }
  if (fp > 0) { ctx.save(); ctx.translate(FX + wob, fy); ctx.scale(fp, fp); person(0, 0, 1.3, C.ink); ctx.restore(); }
  ctx.restore();
  ring(t, DROP, FX, RY[3], 40, 420, C.gold, .8, 12);
  ring(t, DROP + .12, FX, RY[3], 30, 330, C.goldL, .7, 8);
  burst(t, DROP, FX, RY[3], 28, 313, C.goldL, 1000, .9);
}

/* ---------- S3: three parts, miss one and it collapses (17.6 – 23.8) ---------- */
const PX = [250, 540, 830], SEAT_Y = 530;
function pillarIcon(i) {
  ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = 5; ctx.strokeStyle = C.ink;
  if (i === 0) {
    [-30, 0, 30].forEach(y => { rr(-40, y - 9, 18, 18, 4); ctx.fillStyle = C.goldL; ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-10, y); ctx.lineTo(40, y); ctx.stroke(); });
  } else if (i === 1) {
    person(0, 20, 1.1, C.ink); rr(-34, 30, 68, 26, 6); ctx.fillStyle = C.goldL; ctx.fill(); ctx.stroke();
  } else {
    ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(0, 24, 46, Math.PI, 2 * Math.PI); ctx.stroke(); ctx.lineWidth = 6; ctx.strokeStyle = C.gold;
    ctx.beginPath(); ctx.moveTo(0, 24); ctx.lineTo(24, -14); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 24, 7, 0, Math.PI * 2); ctx.fillStyle = C.ink; ctx.fill();
  }
  ctx.restore();
}
function scene3(t) {
  if (t < 17.6 || t > 23.9) return;
  const end = 23.5, out = 1 - eio(prog(t, end, .35));
  line(t, 'A system has [three parts.]', W / 2, 220, { size: fit('A system has three parts.', 930, 80), start: 17.8, end: 21.9 });
  line(t, 'Miss one. It [collapses.]', W / 2, 220, { size: 80, start: 22.1, stagger: .1, end });
  ctx.save(); ctx.globalAlpha = out;
  const cap = ['WRITTEN DOWN', 'WITH NAMES', 'ONE NUMBER'], pull = eio(prog(t, PULL + .3, .6));
  ['PROCESS', 'ROLES', 'FEEDBACK'].forEach((nm, i) => {
    const p = eback(prog(t, PILL[i], .4)); if (p <= 0) return;
    const gone = i === 2 ? pull : 0;
    ctx.save(); ctx.globalAlpha *= 1 - gone; ctx.translate(PX[i] + gone * 90, 590 + gone * 120); ctx.scale(p, p);
    rr(-95, 0, 190, 250, 16); ctx.fillStyle = PAPER; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
    label(nm, 0, 52, out * (1 - gone), C.ink, 24); ctx.save(); ctx.translate(0, 150); pillarIcon(i); ctx.restore(); ctx.restore();
    label(cap[i], PX[i], 888, out * eo(prog(t, PILL[i] + .3, .3)) * (1 - gone), C.ink2, 24);
  });
  const sp = eback(prog(t, SEAT, .45));
  if (sp > 0) {
    const d = 120 * pull, y0 = -140 * (1 - clamp(sp));
    ctx.save(); ctx.globalAlpha *= clamp(sp * 2); ctx.translate(0, y0);
    ctx.beginPath(); ctx.moveTo(150, SEAT_Y); ctx.lineTo(930, SEAT_Y + d); ctx.lineTo(930, SEAT_Y + 58 + d); ctx.lineTo(150, SEAT_Y + 58); ctx.closePath();
    ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 6; ctx.lineJoin = 'round'; ctx.strokeStyle = C.ink; ctx.stroke();
    const gp = eback(prog(t, GEM3, .4)), roll = eio(prog(t, PULL + .5, .6)), gx = lerp(540, 860, roll), gy = SEAT_Y + d * (gx - 150) / 780 - 36 * gp;
    if (gp > 0) {
      ctx.save(); ctx.translate(gx, gy); ctx.scale(gp, gp); ctx.rotate(roll * 3);
      ctx.beginPath(); ctx.arc(0, 0, 36, 0, Math.PI * 2); ctx.fillStyle = PAPER; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
      ctx.beginPath(); ctx.arc(0, 0, 18, 0, Math.PI * 2); ctx.fillStyle = C.gold; ctx.fill(); ctx.restore();
    }
    ctx.restore();
  }
  ctx.restore();
  burst(t, GEM3, 540, SEAT_Y - 30, 14, 641, C.goldL, 500, .7);
  burst(t, PULL + .6, 880, 640, 14, 653, C.goldL, 500, .7);
}

/* ---------- S4: could it run a Tuesday without you? (23.8 – 29) ---------- */
function scene4(t) {
  if (t < 23.8 || t > 29.1) return;
  const end = 28.7, out = 1 - eio(prog(t, end, .35));
  line(t, 'Could it run a Tuesday', W / 2, 215, { size: 70, start: 23.9, end });
  line(t, '[without you?]', W / 2, 315, { size: 88, start: 24.3, end });
  ctx.save(); ctx.globalAlpha = out;
  const cp = eback(prog(t, CARD, .45));
  if (cp > 0) {
    ctx.save(); ctx.translate(W / 2, 640); ctx.scale(cp, cp); ctx.translate(-W / 2, -640);
    rr(300, 450, 480, 380, 22); ctx.fillStyle = PAPER; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
    ctx.save(); ctx.beginPath(); ctx.roundRect(300, 450, 480, 76, [22, 22, 0, 0]); ctx.fillStyle = C.ink; ctx.fill(); ctx.restore();
    label('TUESDAY', W / 2, 500, out, C.cream, 30); ctx.restore();
  }
  const gp = eback(prog(t, GEAR, .45)), spin = (t - GEAR) * 1.4;
  if (gp > 0) { ctx.save(); ctx.translate(610, 680); ctx.scale(gp, gp); gear(0, 0, 95, spin, C.goldL); ctx.restore(); }
  const pp = eback(prog(t, PERS, .4)), lv = eio(prog(t, LEAVE, .7));
  if (pp > 0) {
    ctx.save(); ctx.globalAlpha *= 1 - lv; ctx.translate(lerp(395, 250, lv), 760); ctx.scale(pp, pp); person(0, 0, 1.4, C.ink); ctx.restore();
    label('YOU', 395, 800, out * eo(prog(t, PERS + .2, .3)) * (1 - lv), C.ink2, 24);
  }
  const ck = eback(prog(t, CHECK, .35));
  if (ck > 0) { ctx.save(); ctx.translate(745, 480 + 76 - 24); ctx.scale(ck, ck); ctx.beginPath(); ctx.arc(0, 0, 40, 0, Math.PI * 2); ctx.fillStyle = C.gold; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke(); tick(0, 0, 1.2); ctx.restore(); }
  ctx.restore();
  ring(t, CHECK, 745, 532, 30, 320, C.gold, .7, 10);
  burst(t, CHECK, 745, 532, 20, 811, C.goldL, 800, .8);
}

/* ---------- S5: systems rot, so prune them (29 – 34.4) ---------- */
const RW = [380, 300, 430, 340, 400, 280, 360], STRUCK = [2, 4];
function scene5(t) {
  if (t < 29 || t > 34.5) return;
  const end = 34.2, out = 1 - eio(prog(t, end, .35));
  line(t, 'Systems [rot.]', W / 2, 220, { size: 84, start: 29.2, end });
  line(t, 'Ask: what step is stupid now?', W / 2, 305, { size: 48, color: C.ink2, start: 30.6, stagger: .06, end });
  ctx.save(); ctx.globalAlpha = out;
  const cps = STRUCK.map((r, k) => eio(prog(t, STRIKES[k] + .5, .45)));
  const removed = cps.reduce((a, b) => a + b, 0), h = 36 + (7 - removed) * 62, cp = eback(prog(t, ROWS - .2, .4));
  if (cp > 0) {
    ctx.save(); ctx.translate(W / 2, 420); ctx.scale(clamp(cp), clamp(cp)); ctx.translate(-W / 2, -420);
    rr(270, 420, 540, h, 20); ctx.fillStyle = PAPER; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
  }
  for (let i = 0; i < 7; i++) {
    const p = eback(prog(t, ROWS + i * .12, .3)); if (p <= 0) continue;
    const k = STRUCK.indexOf(i), pos = i - STRUCK.reduce((a, r, kk) => a + (r < i ? cps[kk] : 0), 0), y = 468 + pos * 62;
    const hl = k > -1 ? eo(prog(t, STRIKES[k] - .5, .3)) : 0, sk = k > -1 ? eio(prog(t, STRIKES[k], .35)) : 0, al = k > -1 ? 1 - cps[k] : 1;
    ctx.save(); ctx.globalAlpha *= al * clamp(p); ctx.translate(540, y); ctx.scale(p, p); ctx.translate(-540, -y);
    rr(310, y - 15, 30, 30, 6); ctx.fillStyle = C.gold; ctx.fill(); tick(325, y, .5);
    rr(366, y - 9, RW[i], 18, 9); ctx.fillStyle = hl > 0 ? C.goldL : 'rgba(58,52,44,0.28)'; ctx.fill();
    if (sk > 0) { ctx.fillStyle = C.ink; ctx.fillRect(360, y - 3, (RW[i] + 14) * sk, 6); }
    ctx.restore();
  }
  ctx.restore();
  STRIKES.forEach((s, k) => burst(t, s + .5, 800, 468 + STRUCK[k] * 62, 10, 520 + k * 9, C.goldL, 400, .6));
}

/* ---------- S6: do, document, delegate (35.2 – 40.8) ---------- */
function icon6(i, t) {
  ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = 5; ctx.strokeStyle = C.ink;
  if (i === 0) {
    person(-34, 30, 1.0, C.ink); rr(0, -44, 84, 48, 14); ctx.fillStyle = C.goldL; ctx.fill(); ctx.stroke();
    [18, 42, 66].forEach(x => { ctx.beginPath(); ctx.arc(x, -20, 5, 0, Math.PI * 2); ctx.fillStyle = C.ink; ctx.fill(); });
  } else if (i === 1) {
    rr(-40, -56, 80, 108, 10); ctx.fillStyle = PAPER; ctx.fill(); ctx.stroke();
    [-30, -6, 18].forEach(y => { rr(-28, y - 7, 14, 14, 3); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 3; ctx.stroke(); ctx.beginPath(); ctx.moveTo(-6, y); ctx.lineTo(28, y); ctx.stroke(); });
  } else {
    const m = eio(prog(t, BATON, .6)), lv = 1 - .75 * m;
    ctx.save(); ctx.globalAlpha *= lv; person(-56, 38, 1.0, C.ink); ctx.restore();
    person(56, 38, 1.0, C.ink2);
    rr(lerp(-40, 22, m) - 18, -34, 36, 14, 7); ctx.fillStyle = C.gold; ctx.fill(); ctx.lineWidth = 4; ctx.stroke();
  }
  ctx.restore();
}
function scene6(t) {
  if (t < 35.2 || t > 40.9) return;
  const end = 40.6, out = 1 - eio(prog(t, end, .35));
  line(t, 'Do. Document. [Delegate.]', W / 2, 215, { size: fit('Do. Document. Delegate.', 930, 84), start: 35.4, stagger: .12, end });
  line(t, 'Start with the task you resent.', W / 2, 305, { size: 48, color: C.ink2, start: 35.9, stagger: .06, end });
  ctx.save(); ctx.globalAlpha = out;
  const cap = ['NARRATE IT', 'TEN STEPS', 'LET GO'];
  cap.forEach((nm, i) => {
    const p = eback(prog(t, TILES[i], .4)); if (p <= 0) return;
    ctx.save(); ctx.translate(212 + i * 328, 650); ctx.scale(p, p);
    rr(-140, -165, 280, 330, 22); ctx.fillStyle = PAPER; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
    ctx.save(); ctx.translate(0, -18); icon6(i, t); ctx.restore(); label(nm, 0, 128, out, C.ink, 24); ctx.restore();
    if (i < 2) {
      const ap = eio(prog(t, TILES[i + 1] - .15, .3)); if (ap > 0) {
        ctx.save(); ctx.globalAlpha *= ap; ctx.translate(376 + i * 328, 650); ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = C.gold;
        ctx.beginPath(); ctx.moveTo(-14, -18); ctx.lineTo(8, 0); ctx.lineTo(-14, 18); ctx.stroke(); ctx.restore();
      }
    }
  });
  ctx.restore();
  ring(t, BATON + .2, 868, 640, 40, 300, C.gold, .7, 10);
  burst(t, BATON + .2, 868, 640, 18, 903, C.goldL, 700, .8);
}

/* ---------- S7: takeaway (41 – 46.85) ---------- */
function scene7(t) {
  if (t < 41 || t > 47) return;
  const end = 46.7, fo = 1 - eio(prog(t, end, .35));
  const r = line(t, 'How do I do more?', W / 2, 340, { size: 80, color: C.ink2, start: T7.a, stagger: .07, end });
  const sk = eio(prog(t, T7.strike, .4)) * fo;
  if (sk > 0) { ctx.fillStyle = C.ink; ctx.fillRect(r.x0 - 8, 328, (r.w + 16) * sk, 6); }
  line(t, 'How does this happen', W / 2, 500, { size: 74, start: T7.b1, stagger: .08, end });
  line(t, '[without me?]', W / 2, 610, { size: 96, start: T7.b2, stagger: .12, end });
  line(t, 'Build the machine.', W / 2, 730, { size: 50, color: C.ink2, start: T7.s, stagger: .07, end });
  const gp = eback(prog(t, T7.gear, .45));
  if (gp > 0) { ctx.save(); ctx.globalAlpha = fo; ctx.translate(W / 2, 850); ctx.scale(gp, gp); gear(0, 0, 54, (t - T7.gear) * 1.4, C.goldL); ctx.restore(); }
  burst(t, T7.b2 + .1, W / 2, 590, 24, 707, C.goldL, 1100, .9);
}

/* ---------- S8: end card ---------- */
function scene8(t) {
  if (t < E - .05) return;
  const rp = eio(prog(t, E, .55));
  ctx.fillStyle = C.night; ctx.beginPath(); ctx.arc(W / 2, 600, 1300 * rp, 0, Math.PI * 2); ctx.fill();
  if (rp < 1) return;
  const gp = eback(prog(t, E + .95, .45));
  if (gp > 0) {
    ctx.save(); ctx.translate(W / 2, 218); ctx.scale(gp, gp); ctx.rotate((t - E) * 1.4); ctx.beginPath();
    for (let i = 0; i < 10; i++) { const a0 = i * Math.PI / 5; [[-.17, .78], [-.1, 1], [.1, 1], [.17, .78]].forEach(([da, k]) => ctx.lineTo(Math.cos(a0 + da) * 42 * k, Math.sin(a0 + da) * 42 * k)); }
    ctx.closePath(); ctx.fillStyle = C.goldL; ctx.fill(); ctx.beginPath(); ctx.arc(0, 0, 13, 0, Math.PI * 2); ctx.fillStyle = C.night; ctx.fill(); ctx.restore();
  }
  ring(t, E + 1.2, W / 2, 218, 30, 300, C.goldL, .8, 8);
  line(t, 'Value, Created —', W / 2, 440, { size: 88, color: C.cream, start: E + 1.15, stagger: .1 });
  const T = 'Chapter 18: Systems That Run Without You';
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
