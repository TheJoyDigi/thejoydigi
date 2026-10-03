/* Value, Created Ch 21 LinkedIn infographic: chapter config and scenes for ../_engine (design time; WARP maps real time onto it). */
const CHAPTER = 21, KICKER_END = 46.65, BAR_END = 46.75;
const WARP = [[0, 0], [6.4, 4.5], [12.4, 8.7], [29.2, 20.6], [46.85, 33.2], [53, 38]];
/* ---------- timeline constants shared by visuals and cues ---------- */
const PARTS = [.45, .65, .85, 1.05], PENCIL = 1.5, DOTS0 = 4.0, DOT_DT = .035, NDOTS = 36;
const PERS2 = [7.0, 7.2], ITEMS = [7.8, 8.0], SWAP = [9.2, 10.2];
const CAGE = 13.2, PERS3 = 14.3, BLOCKS0 = 14.8, RISE0 = 16.4, DROP = 18.4;
const ROW1 = 22.8, BURN = 24.6, ROW2 = 25.2, THREE = 27.4;
const RING = [30.3, 31.9];
const LIST = 34.6, CIRCLE = 36.3, CHIPS = [37.0, 37.3, 37.6, 37.9];
const T7 = { a: 40.4, b: 41.4, s: 42.6, lever: [43.0, 43.4, 43.8, 44.2] };
const SWIPES = [6.4, 12.4, 29.2];
const E = 46.85;
const IMPACTS = [[PENCIL + .45, 5], [DOTS0 + NDOTS * DOT_DT, 7], [SWAP[0] + .5, 4], [DROP, 16], [DROP + .45, 5], [BURN, 5], [THREE, 9],
  [CIRCLE + .4, 9], [T7.b, 11], [T7.lever[3] + .3, 7], [E + 1.2, 7]];
const KB = [[0, 6.4], [6.4, 12.4], [12.4, 29.2], [29.2, 46.8]];

cue(0, 'impact', { v: .6 }); cue(.02, 'pop', { f: 1 });
PARTS.forEach((x, i) => { cue(x, 'whoosh', { v: .25 }); if (i % 2) cue(x + .25, 'blip', { n: [55, 59, 62, 66][i] }); });
for (let i = 0; i < 4; i += 2) cue(PENCIL + i * .15, 'tick', { f: 2 });
cue(PENCIL + .45, 'thud'); cue(PENCIL + .45, 'chime', { n: 72 });
cue(3.9, 'pop', { f: 1 });
for (let i = 0; i < NDOTS; i += 6) cue(DOTS0 + i * DOT_DT, 'tick', { f: i % 3 });
cue(DOTS0 + NDOTS * DOT_DT, 'impact', { v: .8 }); cue(DOTS0 + NDOTS * DOT_DT, 'chime', { n: 76 });
SWIPES.forEach(x => cue(x - .3, 'whoosh', { v: 1 }));
cue(6.9, 'pop', { f: 1.2 }); cue(7.35, 'pop', { f: 1 });
PERS2.forEach((x, i) => { cue(x, 'whoosh', { v: .25 }); cue(x + .25, 'thud'); cue(x + .3, 'blip', { n: [57, 62][i] }); });
ITEMS.forEach((x, i) => cue(x, 'pop', { f: 1 + i * .15 }));
SWAP.forEach((x, i) => { cue(x, 'whoosh', { v: .35 }); });
cue(SWAP[0] + .5, 'chime', { n: 76 }); cue(10.4, 'pop', { f: .9 });
cue(12.95, 'pop', { f: 1.2 }); cue(13.5, 'pop', { f: 1 });
cue(CAGE, 'whoosh', { v: .3 }); cue(CAGE + .6, 'thud'); cue(PERS3, 'pop', { f: 1.2 });
for (let i = 0; i < 6; i += 2) cue(BLOCKS0 + i * .4, 'tick', { f: i % 3 });
cue(RISE0, 'riser', { d: DROP - RISE0 });
for (let x = 17.6, k = 0; x < DROP - .05; x += .12 - k * .004, k++) cue(x, 'tick', { f: k % 2 });
cue(DROP, 'boom', { v: 1 }); cue(DROP, 'chime', { n: 79 }); cue(DROP, 'impact', { v: 1 }); cue(DROP + .2, 'whoosh', { v: .4 });
cue(DROP + .45, 'thud'); cue(DROP + .05, 'pop', { f: 1.2 }); cue(DROP + .5, 'pop', { f: 1 });
cue(21.9, 'pop', { f: 1.2 }); cue(22.4, 'pop', { f: .9 });
for (let i = 0; i < 5; i += 2) cue(ROW1 + i * .15, 'tick', { f: i % 3 });
cue(BURN, 'impact', { v: .7 }); cue(BURN, 'knock', { v: 1 });
cue(THREE - .5, 'riser', { d: .5 }); cue(THREE, 'impact', { v: .9 }); cue(THREE, 'chime', { n: 79 }); cue(THREE + .1, 'pop', { f: 1.2 });
cue(29.8, 'pop', { f: 1.2 }); cue(30.5, 'pop', { f: .9 });
cue(RING[0], 'riser', { d: RING[1] - RING[0] });
cue(RING[1], 'impact', { v: .8 }); cue(RING[1], 'chime', { n: 76 }); cue(RING[1] + .1, 'pop', { f: 1.2 }); cue(33.0, 'pop', { f: .9 });
cue(34.8, 'pop', { f: 1.2 }); cue(35.2, 'pop', { f: .9 });
for (let i = 0; i < 5; i += 2) cue(LIST + i * .12, 'tick', { f: i % 3 });
cue(CIRCLE, 'swish'); cue(CIRCLE + .4, 'impact', { v: .9 }); cue(CIRCLE + .4, 'chime', { n: 79 });
CHIPS.forEach((x, i) => { cue(x, 'pop', { f: 1 }); });
cue(T7.a, 'pop', { f: 1.2 }); cue(T7.b - .6, 'riser', { d: .6 }); cue(T7.b, 'impact', { v: .9 }); cue(T7.b, 'chime', { n: 79 }); cue(T7.b + .1, 'pop', { f: 1.2 });
cue(T7.s, 'pop', { f: .9 });
T7.lever.forEach((x, i) => { cue(x, 'pop', { f: 1 }); });
cue(T7.lever[3] + .3, 'thud'); cue(T7.lever[3] + .3, 'chime', { n: 76 });
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
function chip(x, y, w, h, txt, size, fill, col) {
  rr(x, y, w, h, 14); ctx.fillStyle = fill; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke();
  ctx.font = font('sans', size, 700); ctx.letterSpacing = '3px'; ctx.fillStyle = col || C.ink; ctx.textAlign = 'center'; ctx.fillText(txt, x + w / 2 + 1.5, y + h / 2 + size * .35);
}

/* ---------- S1: nobody knows how to make a pencil (0 – 6.4) ---------- */
const PCY = 650;
const DOTS = (() => {
  const a = [];
  for (let i = 0; i < NDOTS; i++) for (let k = 0; k < 30; k++) {
    const x = 100 + rnd(i * 31 + k * 7 + 1) * 880, y = 400 + rnd(i * 31 + k * 7 + 2) * 480;
    if (y > 585 && y < 715 && x > 270 && x < 810) continue;
    if (a.some(d => Math.hypot(d[0] - x, d[1] - y) < 70)) continue;
    a.push([x, y]); break;
  }
  return a;
})();
function pencilPiece(i, s) {
  ctx.save(); ctx.translate(...[[322, PCY], [362, PCY], [540, PCY], [740, PCY]][i]); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineWidth = 6; ctx.strokeStyle = C.ink;
  if (i === 0) { rr(-24, -50, 48, 100, 12); ctx.fillStyle = C.ink2; ctx.fill(); ctx.stroke(); }
  else if (i === 1) { rr(-14, -50, 28, 100, 4); ctx.fillStyle = C.gold; ctx.fill(); ctx.stroke(); }
  else if (i === 2) { rr(-163, -50, 326, 100, 4); ctx.fillStyle = C.goldL; ctx.fill(); ctx.stroke(); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-163, 0); ctx.lineTo(163, 0); ctx.stroke(); }
  else { ctx.beginPath(); ctx.moveTo(-38, -50); ctx.lineTo(60, -12); ctx.lineTo(60, 12); ctx.lineTo(-38, 50); ctx.closePath(); ctx.fillStyle = PAPER; ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(40, -9); ctx.lineTo(82, 0); ctx.lineTo(40, 9); ctx.closePath(); ctx.fillStyle = C.ink; ctx.fill(); }
  ctx.restore();
}
function scene1(t) {
  if (t > 6.6) return;
  line(t, 'Nobody knows how to make', W / 2, 215, { size: fit('Nobody knows how to make', 930, 76), start: -.62, stagger: .08, end: 3.7 });
  line(t, 'a [pencil.]', W / 2, 310, { size: 90, start: -.2, stagger: .1, end: 3.7 });
  line(t, 'Thousands of people.', W / 2, 215, { size: 76, start: 3.9, stagger: .08, end: 5.95 });
  line(t, 'Coordinated by [trade.]', W / 2, 310, { size: 76, start: 4.4, stagger: .08, end: 5.95 });
  const out = 1 - eio(prog(t, 5.95, .35));
  ctx.save(); ctx.globalAlpha = out;
  const tiles = [['CEDAR', 250, 470, 330, PCY - 50], ['GRAPHITE', 830, 470, 740, PCY - 50], ['RAPESEED', 250, 850, 322, PCY + 50], ['BRASS', 830, 850, 362, PCY + 50]], tf = 1 - eio(prog(t, 3.7, .4));
  tiles.forEach(([nm, x, y, px, py], i) => {
    const p = eback(prog(t, PARTS[i], .4)) * tf; if (p <= 0) return;
    ctx.save(); ctx.globalAlpha *= clamp(p); ctx.strokeStyle = C.ink2; ctx.lineWidth = 3; ctx.setLineDash([3, 10]); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(lerp(x, px, eo(prog(t, PARTS[i] + .3, .6))), lerp(y, py, eo(prog(t, PARTS[i] + .3, .6)))); ctx.stroke(); ctx.setLineDash([]);
    ctx.translate(x, y); ctx.scale(p, p); ctx.translate(-x, -y); chip(x - 100, y - 30, 200, 60, nm, 24, PAPER); ctx.restore();
  });
  const pp = DOTS.map((d, i) => eback(prog(t, DOTS0 + i * DOT_DT, .3)));
  DOTS.forEach(([x, y], i) => {
    if (pp[i] <= 0) return;
    const px = clamp(x, 330, 760), py = PCY + clamp(y - PCY, -40, 40);
    ctx.save(); ctx.globalAlpha *= .22 * clamp(pp[i]); ctx.strokeStyle = C.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(px, py); ctx.stroke(); ctx.restore();
  });
  DOTS.forEach(([x, y], i) => { if (pp[i] <= 0) return; ctx.save(); ctx.translate(x, y + 24); ctx.scale(pp[i], pp[i]); person(0, 0, .6, i % 7 === 0 ? C.gold : C.ink2); ctx.restore(); });
  [0, 1, 2, 3].forEach(i => { const p = eback(prog(t, PENCIL + i * .15, .35)); if (p > 0) pencilPiece(i, p); });
  ctx.restore();
  ring(t, PENCIL + .45, 540, PCY, 60, 420, C.gold, .8, 10);
  ring(t, DOTS0 + NDOTS * DOT_DT, 540, PCY, 60, 460, C.goldL, .8, 10);
}

/* ---------- S2: farmer and blacksmith swap (6.6 – 12) ---------- */
function wheat(x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineWidth = 6; ctx.strokeStyle = C.ink;
  ctx.beginPath(); ctx.moveTo(0, 50); ctx.lineTo(0, -50); ctx.stroke();
  [-40, -15, 10].forEach(yy => [-1, 1].forEach(d => { ctx.beginPath(); ctx.ellipse(d * 16, yy, 8, 17, d * .6, 0, Math.PI * 2); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 4; ctx.stroke(); }));
  ctx.restore();
}
function hammer(x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(.5); ctx.lineJoin = 'round'; ctx.lineWidth = 6; ctx.strokeStyle = C.ink;
  rr(-8, -40, 16, 100, 4); ctx.fillStyle = C.goldL; ctx.fill(); ctx.stroke(); rr(-40, -56, 80, 38, 8); ctx.fillStyle = C.ink2; ctx.fill(); ctx.stroke(); ctx.restore();
}
function scene2(t) {
  if (t < 6.6 || t > 12.1) return;
  const end = 11.7, out = 1 - eio(prog(t, end, .35)), PX = [270, 810], FY = 790;
  line(t, 'Do one thing well.', W / 2, 220, { size: 84, start: 6.9, end });
  line(t, 'Trade for the [rest.]', W / 2, 310, { size: 84, start: 7.35, end });
  line(t, 'Both eat better.', W / 2, 400, { size: 46, color: C.ink2, start: 10.4, stagger: .07, end });
  ctx.save(); ctx.globalAlpha = out;
  ['FARMER', 'BLACKSMITH'].forEach((nm, i) => {
    const p = eback(prog(t, PERS2[i], .4)); if (p > 0) { ctx.save(); ctx.translate(PX[i], FY); ctx.scale(p, p); person(0, 0, 1.9, C.ink); ctx.restore(); }
    label(nm, PX[i], FY + 56, out * eo(prog(t, PERS2[i] + .2, .3)), C.ink, 24);
  });
  const sw = [eio(prog(t, SWAP[0], 1.0)), eio(prog(t, SWAP[1], 1.0))];
  [[0, wheat], [1, hammer]].forEach(([i, fn]) => {
    const p = eback(prog(t, ITEMS[i], .4)); if (p <= 0) return;
    const q = i ? eio(prog(t, SWAP[0] + .1, 1.0)) : eio(prog(t, SWAP[0], 1.0)), x = lerp(PX[i], PX[1 - i], q), y = 560 - Math.sin(q * Math.PI) * 90 * (i ? -1 : 1) + (i ? 0 : 0);
    ctx.save(); ctx.translate(x, y); ctx.scale(p, p); fn(0, 0, 1.3); ctx.restore();
  });
  const sp = eo(prog(t, SWAP[0] + .9, .4));
  [0, 1].forEach(i => { if (sp > 0) star(PX[i], 560 - 8 * Math.sin(t * 3 + i), 26 * sp); });
  ctx.restore();
  ring(t, SWAP[0] + 1.0, W / 2, 600, 40, 420, C.gold, .8, 10);
  burst(t, SWAP[0] + 1.0, W / 2, 560, 22, 311, C.goldL, 800, .8);
}

/* ---------- S3: trade breaks both caps (12.8 – 21.6) ---------- */
const BXL = 240, BXR = 840, BYT = 460, BYB = 860;
function scene3(t) {
  if (t < 12.8 || t > 21.7) return;
  const end = 21.3, out = 1 - eio(prog(t, end, .35)), pre = DROP - .3;
  line(t, 'Alone, you hit two caps.', W / 2, 220, { size: 76, start: 12.95, end: pre });
  line(t, 'Your time. Your weak spots.', W / 2, 305, { size: 50, color: C.ink2, start: 13.5, stagger: .07, end: pre });
  line(t, 'Trade breaks [both.]', W / 2, 220, { size: 84, start: DROP, stagger: .1, end });
  line(t, 'Rent everyone’s best hours.', W / 2, 305, { size: 50, color: C.ink2, start: DROP + .5, stagger: .07, end });
  ctx.save(); ctx.globalAlpha = out;
  const cp = eio(prog(t, CAGE, .7)), br = eo(prog(t, DROP, .9)), shake = 4 * Math.sin(t * 60) * eo(prog(t, RISE0 + .6, .8)) * (1 - eo(prog(t, DROP, .15)));
  ctx.lineCap = 'round';
  ctx.save(); ctx.globalAlpha *= 1 - eo(prog(t, DROP, .4)); ctx.strokeStyle = C.ink; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(BXL, BYB); ctx.lineTo(lerp(BXL, BXR, cp), BYB); ctx.stroke(); ctx.beginPath(); ctx.moveTo(BXL, BYB); ctx.lineTo(BXL, lerp(BYB, BYT, cp)); ctx.stroke(); ctx.restore();
  if (cp > 0) {
    ctx.save(); ctx.translate(shake, -br * 700); ctx.rotate(-br * .5); ctx.globalAlpha *= 1 - br; rr(BXL - 14, BYT - 14, lerp(40, BXR - BXL + 28, cp), 40, 8); ctx.fillStyle = C.ink; ctx.fill(); ctx.restore();
    ctx.save(); ctx.translate(br * 700, shake); ctx.rotate(br * .5); ctx.globalAlpha *= 1 - br; rr(BXR - 14, BYT + 24, 40, lerp(0, BYB - BYT - 24, cp), 8); ctx.fillStyle = C.ink; ctx.fill(); ctx.restore();
  }
  label('24 HOURS', (BXL + BXR) / 2, BYT + 6, out * (1 - eo(prog(t, DROP, .3))) * eo(prog(t, CAGE + .6, .3)), C.cream, 24);
  ctx.save(); ctx.translate(BXR + 6, (BYT + BYB) / 2 + 20); ctx.rotate(Math.PI / 2); label('WEAK SPOTS', 0, 0, out * (1 - eo(prog(t, DROP, .3))) * eo(prog(t, CAGE + .6, .3)), C.cream, 24); ctx.restore();
  const pp = eback(prog(t, PERS3, .4)), BN = 6;
  if (pp > 0) { ctx.save(); ctx.translate(540, BYB - 6); ctx.scale(pp, pp); person(0, 0, 1.6, C.ink); ctx.restore(); }
  for (let i = 0; i < BN; i++) {
    const p = eback(prog(t, BLOCKS0 + i * .4, .3)); if (p <= 0) continue;
    const c = i % 2, r = (i / 2) | 0, bx = 330 + c * 90 + (i > 0 ? 0 : 0), by = BYB - 50 - r * 82;
    ctx.save(); ctx.translate(bx + (c ? 180 : -10), by); ctx.scale(p, p); rr(-36, -36, 72, 72, 10); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
  }
  const NP = [[110, 520], [180, 760], [960, 520], [900, 760], [300, 420], [780, 420], [120, 640], [960, 650]];
  NP.forEach(([x, y], i) => {
    const p = eback(prog(t, DROP + .2 + i * .08, .35)); if (p <= 0) return;
    ctx.save(); ctx.globalAlpha *= .22 * clamp(p); ctx.strokeStyle = C.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(540, 700); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.translate(x, y + 30); ctx.scale(p, p); person(0, 0, .85, i % 3 === 0 ? C.gold : C.ink2); ctx.restore();
  });
  for (let i = 0; i < 8; i++) {
    const p = eback(prog(t, DROP + .5 + i * .1, .3)); if (p <= 0) continue;
    const x = 360 + (i % 4) * 110, y = BYB - 160 - ((i / 4) | 0) * 110 - 90;
    ctx.save(); ctx.translate(x, y); ctx.scale(p, p); rr(-34, -34, 68, 68, 10); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
  }
  ctx.restore();
  ring(t, DROP, 540, 650, 60, 520, C.gold, .8, 12);
  ring(t, DROP + .12, 540, 650, 40, 420, C.goldL, .7, 8);
  burst(t, DROP, 540, 650, 28, 313, C.goldL, 1000, .9);
}

/* ---------- S4: Elena the hero, Priya the network (21.8 – 29) ---------- */
function scene4(t) {
  if (t < 21.8 || t > 29.1) return;
  const end = 28.7, out = 1 - eio(prog(t, end, .35));
  line(t, 'The network beats the [hero.]', W / 2, 220, { size: fit('The network beats the hero.', 930, 78), start: 21.9, end });
  line(t, 'Same bread. Same street.', W / 2, 305, { size: 50, color: C.ink2, start: 22.4, stagger: .07, end });
  ctx.save(); ctx.globalAlpha = out;
  const tasks = ['MILLING', 'BOOKS', 'DELIVERY', 'SOCIAL', 'BREAD'], CW = 176, CX = i => 72 + i * (CW + 10), R = [{ y: 510, s: ROW1 }, { y: 770, s: ROW2 }];
  R.forEach((r, ri) => {
    label(ri ? 'PRIYA' : 'ELENA', 72, r.y - 130, out * eo(prog(t, r.s - .15, .3)), ri ? C.goldText : C.ink, 26, 'left');
    tasks.forEach((tk, i) => {
      const p = eback(prog(t, r.s + i * .15, .35)); if (p <= 0) return;
      const own = ri === 0 || i === 4, hi = ri === 1 && i === 4 && t >= THREE;
      ctx.save(); ctx.translate(CX(i) + CW / 2, r.y); ctx.scale(p, p); ctx.translate(-CX(i) - CW / 2, -r.y);
      person(CX(i) + CW / 2, r.y - 10, 1.15, own ? C.ink : C.ink2);
      chip(CX(i), r.y, CW, 72, tk, 24, hi ? C.goldL : PAPER); ctx.restore();
    });
  });
  const bp = eback(prog(t, BURN, .35)), tp = eback(prog(t, THREE, .4));
  if (bp > 0) { ctx.save(); ctx.translate(1008 - 100, 370); ctx.rotate(.05); ctx.scale(bp, bp); rr(-100, -28, 200, 56, 10); ctx.fillStyle = C.ink; ctx.fill(); ctx.font = font('sans', 24, 700); ctx.letterSpacing = '4px'; ctx.fillStyle = C.cream; ctx.textAlign = 'center'; ctx.fillText('BURNOUT', 2, 8); ctx.restore(); }
  if (tp > 0) { ctx.save(); ctx.translate(1008 - 120, 630); ctx.rotate(-.04); ctx.scale(tp, tp); rr(-120, -28, 240, 56, 10); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.font = font('sans', 24, 700); ctx.letterSpacing = '4px'; ctx.fillStyle = C.ink; ctx.textAlign = 'center'; ctx.fillText('THREE SHOPS', 2, 8); ctx.restore(); }
  ctx.restore();
  ring(t, THREE, 888, 806, 40, 360, C.gold, .8, 11);
  burst(t, THREE, 888, 806, 22, 509, C.goldL, 800, .8);
}

/* ---------- S5: the eighty percent test (29.6 – 34.4) ---------- */
function scene5(t) {
  if (t < 29.6 || t > 34.5) return;
  const end = 34.1, out = 1 - eio(prog(t, end, .35)), CY = 660, R = 150;
  line(t, 'Could someone do it', W / 2, 220, { size: 76, start: 29.8, end });
  line(t, '[80%] as well?', W / 2, 315, { size: 88, start: 30.5, stagger: .12, end });
  line(t, 'Good enough. Trade it.', W / 2, 890, { size: 48, color: C.ink2, start: 33.0, stagger: .07, end });
  ctx.save(); ctx.globalAlpha = out;
  const rp = eio(prog(t, RING[0], RING[1] - RING[0])), a0 = -Math.PI / 2, full = Math.PI * 2 * .8;
  ctx.lineCap = 'round'; ctx.lineWidth = 36; ctx.strokeStyle = 'rgba(58,52,44,0.12)'; ctx.beginPath(); ctx.arc(W / 2, CY, R, 0, Math.PI * 2); ctx.stroke();
  if (rp > 0) { ctx.strokeStyle = C.gold; ctx.beginPath(); ctx.arc(W / 2, CY, R, a0, a0 + full * rp); ctx.stroke(); }
  ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.beginPath(); ctx.arc(W / 2, CY, R + 20, 0, Math.PI * 2); ctx.stroke(); ctx.beginPath(); ctx.arc(W / 2, CY, R - 20, 0, Math.PI * 2); ctx.stroke();
  const np = eback(prog(t, RING[1], .4));
  ctx.save(); ctx.translate(W / 2, CY); ctx.scale(np, np); ctx.font = font('serif', 110); ctx.fillStyle = C.goldText; ctx.textAlign = 'center'; ctx.fillText('80%', 0, 38); ctx.restore();
  ctx.restore();
  ring(t, RING[1], W / 2, CY, 80, 460, C.gold, .8, 12);
  burst(t, RING[1], W / 2, CY, 24, 613, C.goldL, 900, .8);
}

/* ---------- S6: circle the one thing (34.5 – 40) ---------- */
function scene6(t) {
  if (t < 34.5 || t > 40.1) return;
  const end = 39.7, out = 1 - eio(prog(t, end, .35)), rows = ['MILLING', 'BOOKS', 'BAKING', 'DELIVERIES', 'POSTS'], RY = i => 478 + i * 88;
  line(t, 'Circle the [one thing.]', W / 2, 220, { size: 84, start: 34.8, end });
  line(t, 'Trade the rest.', W / 2, 305, { size: 50, color: C.ink2, start: 35.2, stagger: .07, end });
  ctx.save(); ctx.globalAlpha = out;
  const cp = eback(prog(t, LIST - .3, .5));
  if (cp > 0) {
    ctx.save(); ctx.translate(W / 2, 640); ctx.scale(clamp(cp), clamp(cp)); ctx.translate(-W / 2, -640);
    rr(200, 400, 680, 470, 16); ctx.fillStyle = PAPER; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
    ctx.fillStyle = C.gold; ctx.fillRect(200, 440, 680, 4); ctx.restore();
  }
  const cq = eio(prog(t, CIRCLE, .5));
  rows.forEach((nm, i) => {
    const p = eo(prog(t, LIST + i * .12, .3)); if (p <= 0) return;
    const dim = i === 2 ? 1 : 1 - .45 * cq, chipP = i === 2 ? 0 : eback(prog(t, CHIPS[i > 2 ? i - 1 : i], .35));
    ctx.save(); ctx.globalAlpha *= p * dim; ctx.font = font('sans', 56, 700); ctx.letterSpacing = '3px'; ctx.fillStyle = C.ink; ctx.textAlign = 'left'; ctx.fillText(nm, 250, RY(i) + 19); ctx.restore();
    if (chipP > 0) { ctx.save(); ctx.translate(780, RY(i)); ctx.scale(chipP, chipP); chip(-70, -23, 140, 46, 'TRADE', 24, C.goldL); ctx.restore(); }
  });
  if (cq > 0) {
    ctx.save(); ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.strokeStyle = C.gold; ctx.beginPath();
    const n = Math.floor(70 * cq); for (let k = 0; k <= n; k++) { const a = -2.2 + k / 70 * (Math.PI * 2 + .35); const x = 385 + Math.cos(a) * 170 * (1 + .02 * k / 70), y = RY(2) + Math.sin(a) * 48; k ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
    ctx.stroke(); ctx.restore();
  }
  ctx.restore();
  ring(t, CIRCLE + .4, 385, RY(2), 40, 360, C.gold, .8, 10);
  burst(t, CIRCLE + .4, 385, RY(2), 22, 811, C.goldL, 800, .8);
}

/* ---------- S7: takeaway (40.2 – 46.85) ---------- */
function scene7(t) {
  if (t < 40.2 || t > 47) return;
  const end = 46.7, out = 1 - eio(prog(t, end, .35)), PVX = 430, PVY = 740;
  line(t, 'Be the best at one thing.', W / 2, 320, { size: fit('Be the best at one thing.', 930, 80), start: T7.a, stagger: .08, end });
  line(t, '[Trade for the rest.]', W / 2, 420, { size: fit('Trade for the rest.', 930, 92), start: T7.b, stagger: .1, end });
  line(t, 'The first leverage.', W / 2, 510, { size: 46, color: C.ink2, start: T7.s, stagger: .07, end });
  ctx.save(); ctx.globalAlpha = out;
  const k = T7.lever.reduce((a, s) => a + eo(prog(t, s + .1, .4)), 0), th = .075 * k;
  ctx.lineJoin = 'round'; ctx.lineWidth = 6; ctx.strokeStyle = C.ink;
  ctx.beginPath(); ctx.moveTo(PVX, PVY); ctx.lineTo(PVX - 62, 860); ctx.lineTo(PVX + 62, 860); ctx.closePath(); ctx.fillStyle = PAPER; ctx.fill(); ctx.stroke();
  ctx.save(); ctx.translate(PVX, PVY); ctx.rotate(th);
  rr(-230, -14, 700, 28, 10); ctx.fillStyle = C.ink; ctx.fill();
  const bp = eback(prog(t, T7.a + .2, .5));
  ctx.save(); ctx.translate(-150, -14 - 62 * bp); ctx.scale(bp, bp); rr(-72, -62, 144, 124, 14); ctx.fillStyle = C.goldL; ctx.fill(); ctx.stroke(); star(0, 0, 34); ctx.restore();
  T7.lever.forEach((s, i) => { const p = eback(prog(t, s, .35)); if (p > 0) { ctx.save(); ctx.translate(170 + i * 85, -14); ctx.scale(p, p); person(0, 0, 1.25, i === 3 ? C.gold : C.ink2); ctx.restore(); } });
  ctx.restore();
  ctx.restore();
  ring(t, T7.lever[3] + .3, PVX - 150, PVY - 90, 40, 280, C.gold, .8, 10);
  burst(t, T7.b + .1, W / 2, 400, 24, 707, C.goldL, 1100, .9);
}

/* ---------- S8: end card ---------- */
function scene8(t) {
  if (t < E - .05) return;
  const rp = eio(prog(t, E, .55));
  ctx.fillStyle = C.night; ctx.beginPath(); ctx.arc(W / 2, 600, 1300 * rp, 0, Math.PI * 2); ctx.fill();
  if (rp < 1) return;
  const lp = eback(prog(t, E + .95, .45));
  if (lp > 0) {
    ctx.save(); ctx.translate(W / 2, 220); ctx.scale(lp, lp); ctx.rotate(.16 * eo(prog(t, E + 1.2, .5)));
    ctx.fillStyle = C.cream; rr(-80, -3, 160, 6, 3); ctx.fill(); ctx.fillStyle = C.goldL; rr(-80, -26, 32, 24, 5); ctx.fill(); ctx.restore();
    ctx.save(); ctx.globalAlpha = .7 * lp; ctx.fillStyle = C.cream; ctx.beginPath(); ctx.moveTo(W / 2, 222); ctx.lineTo(W / 2 - 24, 262); ctx.lineTo(W / 2 + 24, 262); ctx.closePath(); ctx.fill(); ctx.restore();
  }
  ring(t, E + 1.2, W / 2, 218, 30, 300, C.goldL, .8, 8);
  line(t, 'Value, Created —', W / 2, 440, { size: 88, color: C.cream, start: E + 1.15, stagger: .1 });
  const T = 'Chapter 21: Trade: The First Leverage';
  line(t, '[' + T + ']', W / 2, 535, { size: fit(T, 900, 60), goldColor: C.goldL, start: E + 1.6, stagger: .06 });
  const lp2 = eio(prog(t, E + 2.15, .45));
  ctx.fillStyle = C.goldL; ctx.fillRect(W / 2 - 70 * lp2, 590, 140 * lp2, 4);
  line(t, 'Full 8-minute episode — link in comments', W / 2, 680, { font: 'sans', size: 38, color: C.cream, start: E + 2.55, stagger: .05 });
  ctx.save(); ctx.globalAlpha = .6 * eo(prog(t, E + 3.35, .5));
  ctx.font = font('sans', 22, 700); ctx.letterSpacing = '5px'; ctx.textAlign = 'center'; ctx.fillStyle = C.cream;
  ctx.fillText('A FREE AUDIOBOOK · PRODUCED BY THE JOY DIGI', W / 2 + 2.5, 980);
  ctx.restore();
}

const SCENES = [scene1, scene2, scene3, scene4, scene5, scene6, scene7];
const END_CARD = scene8;
