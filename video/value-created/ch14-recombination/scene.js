/* Value, Created Ch 14 LinkedIn infographic: chapter config and scenes for ../_engine (design time; WARP maps real time onto it). */
const CHAPTER = 14, KICKER_END = 46.65, BAR_END = 46.75;
const WARP = [[0, 0], [6.4, 4.5], [10.9, 7.6], [16, 11.2], [20.7, 14.5], [27.6, 19.3], [33.1, 23.2], [40.3, 28.2], [47.1, 33], [53, 38]];
/* ---------- timeline constants shared by visuals and cues ---------- */
const PARTS = [.5, .9, 1.3], MERGE = 3.9;
const DEV = [7.1, 7.45, 7.8], MRG2 = 8.8, HIT2 = 9.3;
const ROWS = [11.4, 12.4, 13.4], RHIT = ROWS.map(s => s + .85);
const SH0 = 16.7, SH_DT = .1;
const DROP = 23.6, EDGE0 = 21.2, EDGE_DT = .04;
const PAN = 28.0, BHIT = 30.6;
const TIL0 = 33.5, TIL_DT = .04, XS = 35.0, X_DT = .08, WIN = 37.6, WINI = 12;
const SWIPES = [6.4, 20.7, 33.1];
const E = 46.85;
const IMPACTS = [[MERGE + .45, 11], ...PARTS.map(s => [s + .3, 3]), [HIT2, 10], ...RHIT.map((s, i) => [s, 4 + i * 2]), [SH0 + 1.1, 4],
  [DROP, 16], [DROP + .45, 5], [BHIT, 11], [WIN, 12], [41.4, 12], [E + 1.2, 7]];
const KB = [[0, 6.4], [6.4, 20.7], [20.7, 33.1], [33.1, 46.8]];

cue(0, 'impact', { v: .6 }); cue(.02, 'pop', { f: 1 });
PARTS.forEach((s, i) => { cue(s, 'whoosh', { v: .25 }); cue(s + .3, 'blip', { n: [55, 59, 62][i] }); });
[1.7, 2.0].forEach(x => cue(x, 'tick', { f: 2 }));
cue(3.4, 'pop', { f: 1 });
cue(MERGE, 'whoosh', { v: .5 }); cue(MERGE + .45, 'impact', { v: .9 }); cue(MERGE + .45, 'chime', { n: 76 }); cue(4.7, 'pop', { f: 1.1 });
SWIPES.forEach(x => cue(x - .3, 'whoosh', { v: 1 }));
cue(6.65, 'pop', { f: 1.2 });
DEV.forEach((s, i) => { cue(s, 'pop', { f: 1 }); cue(s + .1, 'blip', { n: [60, 64, 67][i] }); });
cue(MRG2, 'riser', { d: HIT2 - MRG2 }); cue(HIT2, 'impact', { v: .9 }); cue(HIT2, 'chime', { n: 79 }); cue(9.0, 'pop', { f: 1.1 });
cue(11.1, 'pop', { f: 1.2 });
ROWS.forEach((s, i) => {
  cue(s, 'pop', { f: 1 }); cue(s + .3, 'pop', { f: .9 }); cue(RHIT[i] - .1, 'swish');
  cue(RHIT[i], 'thud'); cue(RHIT[i] + .02, 'chime', { n: [72, 76, 79][i] });
});
cue(16.2, 'pop', { f: 1.2 });
for (let i = 0; i < 10; i++) cue(SH0 + i * SH_DT, 'tick', { f: i % 3 });
[0, 4, 7].forEach((i, k) => cue(SH0 + i * SH_DT + .15, 'blip', { n: [57, 62, 66][k] }));
cue(18.9, 'pop', { f: .9 });
cue(20.2, 'riser', { d: DROP - 20.2 }); cue(21.0, 'pop', { f: 1 });
for (let k = 0; k < 45; k += 3) cue(EDGE0 + k * EDGE_DT, 'tick', { f: (k / 3) % 2 });
for (let x = 22.8, k = 0; x < DROP - .05; x += .12 - k * .005, k++) cue(x, 'tick', { f: 2 });
cue(DROP, 'boom', { v: 1 }); cue(DROP, 'chime', { n: 79 }); cue(DROP, 'impact', { v: 1 }); cue(DROP + .2, 'whoosh', { v: .4 }); cue(DROP + .45, 'thud');
cue(27.8, 'pop', { f: 1.2 });
cue(PAN, 'whoosh', { v: .3 }); cue(PAN + .5, 'swish'); [28.9, 29.1, 29.3].forEach((x, i) => cue(x, 'blip', { n: [55, 59, 62][i] }));
cue(29.6, 'whoosh', { v: .35 }); cue(BHIT - .5, 'riser', { d: .5 });
cue(BHIT, 'impact', { v: .9 }); cue(BHIT, 'chime', { n: 76 }); cue(BHIT + .1, 'pop', { f: 1.2 });
cue(33.3, 'tick', { f: 2 }); cue(33.3, 'pop', { f: 1 });
for (let i = 0; i < 20; i += 2) cue(TIL0 + i * TIL_DT, 'tick', { f: (i / 2) % 2 });
cue(34.0, 'pop', { f: .9 });
for (let i = 0; i < 20; i += 2) cue(XS + i * X_DT, 'tick', { f: 0 });
cue(WIN - .5, 'riser', { d: .5 }); cue(WIN, 'boom', { v: .8 }); cue(WIN, 'chime', { n: 79 }); cue(WIN + .1, 'pop', { f: 1.2 });
cue(40.0, 'whoosh', { v: .35 }); cue(40.45, 'thud'); cue(41.4, 'impact', { v: .9 }); cue(42.35, 'swish'); cue(43.4, 'pop', { f: .9 });
cue(E - .05, 'whoosh', { v: 1 });
[E + .95, E + 1.1].forEach((x, i) => cue(x + .1, 'blip', { n: [72, 79][i] }));
cue(E + 1.2, 'boom', { v: .9 }); cue(E + 1.25, 'chime', { n: 72 });
cue(E + 2.55, 'pop', { f: .9 });
const MARKERS = { groove: 6.4, breakdown: 20.2, drop: DROP, end: 46.75 };

/* ---------- shared drawings (all centred on 0,0) ---------- */
const PAPER2 = '#FFFBF3';
function ink(w) { ctx.lineWidth = w; ctx.strokeStyle = C.ink; ctx.lineJoin = ctx.lineCap = 'round'; }
function winePress() {
  ink(6);
  ctx.beginPath(); ctx.moveTo(-42, 50); ctx.lineTo(-42, -40); ctx.moveTo(42, 50); ctx.lineTo(42, -40); ctx.stroke();
  rr(-56, -54, 112, 18, 5); ctx.fillStyle = C.paper; ctx.fill(); ctx.stroke();
  ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(0, -36); ctx.lineTo(0, 22); ctx.moveTo(-34, -74); ctx.lineTo(34, -74); ctx.moveTo(0, -54); ctx.lineTo(0, -74); ctx.stroke();
  ink(6); rr(-34, 20, 68, 12, 4); ctx.fillStyle = C.goldL; ctx.fill(); ctx.stroke();
  rr(-56, 46, 112, 14, 5); ctx.fillStyle = C.fill; ctx.fill(); ctx.stroke();
}
function typeBlock() {
  ink(6); rr(-26, -50, 52, 108, 6); ctx.fillStyle = C.paper; ctx.fill(); ctx.stroke();
  ctx.save(); ctx.scale(-1, 1); ctx.font = font('serif', 74, 700); ctx.textAlign = 'center'; ctx.fillStyle = C.ink; ctx.fillText('A', 0, 18); ctx.restore();
  ctx.textAlign = 'left';
}
function mold() {
  ink(6);
  [-1, 1].forEach(d => { ctx.save(); ctx.scale(d, 1); ctx.beginPath(); ctx.moveTo(8, -50); ctx.lineTo(44, -50); ctx.lineTo(44, 50); ctx.lineTo(8, 50); ctx.lineTo(8, 24); ctx.lineTo(22, 24); ctx.lineTo(22, -24); ctx.lineTo(8, -24); ctx.closePath(); ctx.fillStyle = C.fill; ctx.fill(); ctx.stroke(); ctx.restore(); });
  rr(-12, -24, 24, 48, 4); ctx.fillStyle = C.goldL; ctx.fill(); ctx.stroke();
}
function page() {
  ink(6); rr(-46, -64, 92, 128, 8); ctx.fillStyle = C.paper; ctx.fill(); ctx.stroke();
  ctx.lineWidth = 6; ctx.beginPath(); [-36, -16, 4, 24].forEach(y => { ctx.moveTo(-28, y); ctx.lineTo(28, y); }); ctx.moveTo(-28, 44); ctx.lineTo(8, 44); ctx.stroke();
}
function ipod() {
  ink(6); rr(-58, -92, 116, 184, 20); ctx.fillStyle = C.paper; ctx.fill(); ctx.stroke();
  rr(-40, -72, 80, 56, 6); ctx.fillStyle = C.goldL; ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 40, 36, 0, Math.PI * 2); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 40, 12, 0, Math.PI * 2); ctx.stroke();
}
function phone() {
  ink(6); rr(-52, -92, 104, 184, 18); ctx.fillStyle = C.paper; ctx.fill(); ctx.stroke();
  rr(-36, -74, 72, 40, 4); ctx.fillStyle = C.goldL; ctx.fill(); ctx.stroke();
  ctx.fillStyle = C.ink; [0, 1, 2].forEach(i => [0, 1, 2].forEach(j => { ctx.beginPath(); ctx.arc((i - 1) * 26, -8 + j * 26, 6, 0, Math.PI * 2); ctx.fill(); }));
}
function globe() {
  ink(6); ctx.beginPath(); ctx.arc(0, 0, 66, 0, Math.PI * 2); ctx.fillStyle = C.paper; ctx.fill(); ctx.stroke();
  ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(0, 0, 28, 66, 0, 0, Math.PI * 2); ctx.moveTo(-66, 0); ctx.lineTo(66, 0); ctx.moveTo(-56, -34); ctx.lineTo(56, -34); ctx.moveTo(-56, 34); ctx.lineTo(56, 34); ctx.stroke();
}
function slab() {
  ink(6); rr(-72, -132, 144, 264, 28); ctx.fillStyle = C.goldL; ctx.fill(); ctx.stroke();
  rr(-58, -114, 116, 200, 10); ctx.fillStyle = C.paper; ctx.fill(); ctx.lineWidth = 4; ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 108, 11, 0, Math.PI * 2); ctx.lineWidth = 4; ctx.stroke();
}
function crescent() {
  ink(5); ctx.beginPath(); ctx.arc(0, 0, 40, .75, 5.53); ctx.arc(14, 0, 30, 5.2, 1.08, true); ctx.closePath(); ctx.fillStyle = C.goldL; ctx.fill(); ctx.stroke();
}
function donut(r, fill) {
  ink(5); ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fillStyle = fill; ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 0, r * .3, 0, Math.PI * 2); ctx.fillStyle = C.paper; ctx.fill(); ctx.stroke();
}
function cronut() {
  donut(50, C.goldL); ink(4); ctx.beginPath();
  for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; ctx.moveTo(Math.cos(a) * 24, Math.sin(a) * 24); ctx.lineTo(Math.cos(a) * 42, Math.sin(a) * 42); }
  ctx.stroke();
}
function bookmark() {
  ink(5); ctx.beginPath(); ctx.moveTo(-26, -50); ctx.lineTo(26, -50); ctx.lineTo(26, 50); ctx.lineTo(0, 30); ctx.lineTo(-26, 50); ctx.closePath(); ctx.fillStyle = C.paper; ctx.fill(); ctx.stroke();
}
function drop() {
  ink(5); ctx.beginPath(); ctx.moveTo(0, -44); ctx.bezierCurveTo(40, 0, 36, 40, 0, 40); ctx.bezierCurveTo(-36, 40, -40, 0, 0, -44); ctx.fillStyle = C.fill; ctx.fill(); ctx.stroke();
}
function postit() {
  ink(5); ctx.beginPath(); ctx.moveTo(-46, -46); ctx.lineTo(46, -46); ctx.lineTo(46, 22); ctx.lineTo(22, 46); ctx.lineTo(-46, 46); ctx.closePath(); ctx.fillStyle = C.goldL; ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(46, 22); ctx.lineTo(22, 22); ctx.lineTo(22, 46); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-28, -22); ctx.lineTo(24, -22); ctx.moveTo(-28, -4); ctx.lineTo(10, -4); ctx.stroke();
}
function mic() {
  ink(5); rr(-16, -48, 32, 52, 16); ctx.fillStyle = C.paper; ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 0, 28, .15, Math.PI - .15); ctx.moveTo(0, 28); ctx.lineTo(0, 48); ctx.moveTo(-16, 48); ctx.lineTo(16, 48); ctx.stroke();
}
function note() {
  ink(6); ctx.beginPath(); ctx.ellipse(-12, 30, 18, 13, -.4, 0, Math.PI * 2); ctx.fillStyle = C.ink; ctx.fill();
  ctx.beginPath(); ctx.moveTo(4, 26); ctx.lineTo(4, -48); ctx.lineTo(30, -30); ctx.stroke();
}
function karaoke() {
  ctx.beginPath(); ctx.arc(0, 0, 54, 0, Math.PI * 2); ctx.fillStyle = C.goldL; ctx.fill(); ink(5); ctx.stroke();
  ctx.save(); ctx.translate(-14, 0); ctx.scale(.62, .62); mic(); ctx.restore();
  ctx.save(); ctx.translate(24, -6); ctx.scale(.45, .45); note(); ctx.restore();
}
function glyph(k, s, col) {
  ctx.fillStyle = col; ctx.strokeStyle = C.ink; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.beginPath();
  switch (k % 10) {
    case 0: ctx.arc(0, 0, s * .5, 0, Math.PI * 2); break;
    case 1: ctx.moveTo(0, -s * .55); ctx.lineTo(s * .55, s * .45); ctx.lineTo(-s * .55, s * .45); ctx.closePath(); break;
    case 2: ctx.rect(-s * .45, -s * .45, s * .9, s * .9); break;
    case 3: { const a = s * .2, b = s * .55; ctx.moveTo(-a, -b); ctx.lineTo(a, -b); ctx.lineTo(a, -a); ctx.lineTo(b, -a); ctx.lineTo(b, a); ctx.lineTo(a, a); ctx.lineTo(a, b); ctx.lineTo(-a, b); ctx.lineTo(-a, a); ctx.lineTo(-b, a); ctx.lineTo(-b, -a); ctx.lineTo(-a, -a); ctx.closePath(); break; }
    case 4: ctx.moveTo(0, -s * .6); ctx.lineTo(s * .5, 0); ctx.lineTo(0, s * .6); ctx.lineTo(-s * .5, 0); ctx.closePath(); break;
    case 5: ctx.arc(0, 0, s * .5, 0, Math.PI * 2); ctx.moveTo(s * .2, 0); ctx.arc(0, 0, s * .2, 0, Math.PI * 2, true); break;
    case 6: for (let i = 0; i < 6; i++) ctx.lineTo(Math.cos(i * Math.PI / 3) * s * .55, Math.sin(i * Math.PI / 3) * s * .55); ctx.closePath(); break;
    case 7: ctx.arc(0, s * .2, s * .5, Math.PI, 2 * Math.PI); ctx.closePath(); break;
    case 8: ctx.roundRect(-s * .6, -s * .22, s * 1.2, s * .44, s * .22); break;
    default: ctx.arc(-s * .25, 0, s * .22, 0, Math.PI * 2); ctx.moveTo(s * .47, 0); ctx.arc(s * .25, 0, s * .22, 0, Math.PI * 2);
  }
  ctx.fill('evenodd'); ctx.stroke();
}
function at(x, y, s, rot, fn) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot || 0); ctx.scale(s, s); fn(); ctx.restore(); }

/* ---------- S1: Gutenberg rearranged (0 – 6.4) ---------- */
function scene1(t) {
  if (t > 6.6) return;
  line(t, 'Gutenberg invented', W / 2, 215, { size: 84, start: -.62, stagger: .12, end: 3.7 });
  line(t, '[nothing.]', W / 2, 305, { size: 84, start: -.4, stagger: .12, end: 3.7 });
  line(t, 'He [rearranged.]', W / 2, 260, { size: 100, start: MERGE, stagger: .12, end: 5.95 });
  const out = 1 - eio(prog(t, 5.95, .35));
  ctx.save(); ctx.globalAlpha = out;
  const XS3 = [215, 540, 865], icons = [winePress, typeBlock, mold], names = ['WINE PRESS', 'TYPE', 'MOLD'];
  const mp = eio(prog(t, MERGE, .45)), fade = 1 - eo(prog(t, MERGE + .3, .2));
  XS3.forEach((x, i) => {
    const p = eback(prog(t, PARTS[i], .4)); if (p <= 0) return;
    const cx = lerp(x, 540, mp), a = fade * clamp(p * 2);
    ctx.save(); ctx.globalAlpha *= a; ctx.translate(cx, 640); ctx.scale(p * (1 - .25 * mp), p * (1 - .25 * mp));
    rr(-115, -125, 230, 250, 24); ctx.fillStyle = PAPER2; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
    ctx.scale(1.15, 1.15); icons[i](); ctx.restore();
    label(names[i], x, 820, out * eo(prog(t, PARTS[i] + .25, .3)) * (1 - eio(prog(t, MERGE, .25))), C.ink, 26);
  });
  [378, 702].forEach((x, i) => { ctx.save(); ctx.globalAlpha *= eo(prog(t, 1.7 + i * .3, .25)) * (1 - eio(prog(t, MERGE, .2))); ctx.font = font('serif', 76); ctx.textAlign = 'center'; ctx.fillStyle = C.ink2; ctx.fillText('+', x, 665); ctx.restore(); });
  const rp = eback(prog(t, MERGE + .4, .4));
  if (rp > 0) {
    ctx.save(); ctx.translate(540, 640); ctx.scale(rp, rp);
    rr(-150, -135, 300, 270, 28); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
    ctx.scale(1.3, 1.3); page(); ctx.restore();
    label('PRINTING PRESS', 540, 820, out * eo(prog(t, MERGE + .6, .3)), C.goldText, 28);
  }
  ring(t, MERGE + .45, 540, 640, 40, 340, C.gold, .7, 10);
  burst(t, MERGE + .45, 540, 640, 22, 41, C.goldL, 1000, .8);
  ctx.restore();
}

/* ---------- S2: the iPhone, three old gadgets (6.4 – 10.9) ---------- */
function scene2(t) {
  if (t < 6.4 || t > 11) return;
  const end = 10.45, out = 1 - eio(prog(t, end, .35));
  line(t, 'Three old gadgets.', W / 2, 220, { size: 76, start: 6.65, stagger: .1, end });
  line(t, 'One new [arrangement.]', W / 2, 310, { size: 66, color: C.ink2, start: MRG2 + .2, stagger: .1, end });
  ctx.save(); ctx.globalAlpha = out;
  const xs = [220, 540, 860], fns = [ipod, phone, globe], names = ['PLAYER', 'PHONE', 'WEB'];
  const mp = eio(prog(t, MRG2, .5)), fade = 1 - eo(prog(t, MRG2 + .3, .2));
  xs.forEach((x, i) => {
    const p = eback(prog(t, DEV[i], .4)); if (p <= 0) return;
    ctx.save(); ctx.globalAlpha *= fade; at(lerp(x, 540, mp), 650, p * lerp(1, .35, mp), mp * (i - 1) * 1.6, fns[i]); ctx.restore();
    label(names[i], x, 850, out * eo(prog(t, DEV[i] + .2, .3)) * (1 - eio(prog(t, MRG2, .25))), C.ink, 26);
  });
  const sp = eback(prog(t, MRG2 + .45, .4));
  if (sp > 0) at(540, 650, sp * 1.1, 0, slab);
  ring(t, HIT2, 540, 650, 50, 380, C.gold, .7, 10);
  burst(t, HIT2, 540, 650, 22, 63, C.goldL, 1000, .8);
  ctx.restore();
}

/* ---------- S3: same trick, everywhere (10.9 – 16) ---------- */
function scene3(t) {
  if (t < 10.9 || t > 16.1) return;
  const end = 15.55, out = 1 - eio(prog(t, end, .35));
  line(t, 'Same trick, [everywhere.]', W / 2, 225, { size: 72, start: 11.1, stagger: .1, end });
  const defs = [[crescent, 1, () => donut(40, C.paper), 1, cronut, 'CRONUT'], [bookmark, 1, drop, .9, postit, 'POST-IT'], [mic, 1, note, 1, karaoke, 'KARAOKE']];
  ctx.save(); ctx.globalAlpha = out;
  defs.forEach(([fa, sa, fb, sb, fr, nm], i) => {
    const y = 460 + i * 165, s = ROWS[i];
    const pa = eback(prog(t, s, .35)), pb = eback(prog(t, s + .3, .35)), pr = eback(prog(t, RHIT[i], .4));
    if (pa > 0) at(215, y, .9 * pa, 0, fa);
    if (pb > 0) at(425, y, .9 * pb, 0, fb);
    ctx.font = font('serif', 64); ctx.textAlign = 'center'; ctx.fillStyle = C.ink2;
    ctx.save(); ctx.globalAlpha *= eo(prog(t, s + .15, .25)); ctx.fillText('+', 320, y + 22); ctx.restore();
    ctx.save(); ctx.globalAlpha *= eo(prog(t, s + .55, .25)); ctx.fillText('=', 530, y + 22); ctx.restore();
    ctx.textAlign = 'left';
    if (pr > 0) at(650, y, 1.05 * pr, 0, fr);
    ring(t, RHIT[i], 650, y, 40, 190, C.gold, .6, 8);
    burst(t, RHIT[i], 650, y, 12, 71 + i * 9, C.goldL, 500, .6);
  });
  ctx.restore();
  defs.forEach((d, i) => label(d[5], 745, 460 + i * 165 + 10, out * eo(prog(t, RHIT[i] + .15, .3)), C.ink, 28, 'left'));
}

/* ---------- S4: collect ingredients (16 – 20.7) ---------- */
function scene4(t) {
  if (t < 16 || t > 20.8) return;
  const end = 20.25, out = 1 - eio(prog(t, end, .35)), grp = i => i < 4 ? 0 : i < 7 ? 1 : 2;
  line(t, 'You don’t need to invent.', W / 2, 220, { size: 66, start: 16.2, stagger: .08, end });
  line(t, 'Just collect [ingredients.]', W / 2, 308, { size: 58, color: C.ink2, start: 18.9, stagger: .08, end });
  ctx.save(); ctx.globalAlpha = out;
  const sp = eio(prog(t, 16.4, .5));
  ctx.strokeStyle = C.ink; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(540 - 440 * sp, 720); ctx.lineTo(540 + 440 * sp, 720); ctx.stroke();
  for (let i = 0; i < 10; i++) {
    const p = eback(prog(t, SH0 + i * SH_DT, .35)); if (p <= 0) continue;
    const x = 125 + i * 88 + grp(i) * 22;
    ctx.save(); ctx.translate(x, 676); ctx.scale(p, p);
    rr(-39, -39, 78, 78, 14); ctx.fillStyle = PAPER2; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke();
    glyph(i, 36, [C.fill, C.goldL, C.paper][grp(i)]); ctx.restore();
  }
  ctx.restore();
  [['SKILLS', 0], ['TOOLS', 4], ['INDUSTRIES', 7]].forEach(([s, i0], k) => {
    const n = [4, 3, 3][k], cx = 125 + (i0 + (n - 1) / 2) * 88 + k * 22;
    label(s, cx, 800, out * eo(prog(t, SH0 + (i0 + n - 1) * SH_DT + .1, .3)), C.ink, 24);
  });
}

/* ---------- S5: ten make 45, twenty make 190 (20.7 – 27.6) ---------- */
function scene5(t) {
  if (t < 20.7 || t > 27.7) return;
  const end = 27.1, out = 1 - eio(prog(t, end, .35)), CX = 540, CY = 660, R = 235;
  line(t, 'Ten ingredients make [45 pairs.]', W / 2, 210, { size: 50, color: C.ink2, start: 21.0, stagger: .08, end });
  line(t, 'Twenty make [190.]', W / 2, 305, { size: 84, start: DROP, stagger: .12, end });
  const pos = i => [CX + Math.cos(i * Math.PI / 10 - Math.PI / 2) * R, CY + Math.sin(i * Math.PI / 10 - Math.PI / 2) * R];
  ctx.save(); ctx.globalAlpha = out; ctx.lineCap = 'round';
  let k = 0;
  const post = t >= DROP;
  for (let a = 0; a < 20; a++) for (let b = a + 1; b < 20; b++) {
    const oldE = a % 2 === 0 && b % 2 === 0;
    const [x1, y1] = pos(a), [x2, y2] = pos(b);
    if (oldE) {
      const p = eo(prog(t, EDGE0 + k * EDGE_DT, .3)); k++;
      if (p <= 0) continue;
      ctx.strokeStyle = `rgba(58,52,44,${.34 * p})`; ctx.lineWidth = 2.5;
    } else {
      const p = eo(prog(t, DROP + .05 + rnd(a * 31 + b) * .4, .25)); if (p <= 0) continue;
      ctx.strokeStyle = `rgba(184,137,58,${.45 * p})`; ctx.lineWidth = 2;
    }
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  }
  for (let i = 0; i < 20; i++) {
    const isNew = i % 2 === 1, p = isNew ? eback(prog(t, DROP + .03 + (i >> 1) * .03, .3)) : eback(prog(t, 21.0 + (i >> 1) * .07, .3));
    if (p <= 0) continue;
    const [x, y] = pos(i);
    ctx.beginPath(); ctx.arc(x, y, (isNew ? 15 : 17) * p, 0, Math.PI * 2); ctx.fillStyle = isNew ? C.goldL : C.ink; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.stroke();
  }
  const cp = eback(prog(t, 21.0, .4)), slam = 1 + .3 * Math.exp(-Math.max(0, t - DROP) * 7) * (t > DROP ? 1 : 0);
  ctx.save(); ctx.translate(CX, CY); ctx.scale(cp * slam, cp * slam);
  ctx.beginPath(); ctx.arc(0, 0, 92, 0, Math.PI * 2); ctx.fillStyle = post ? C.goldL : PAPER2; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
  const num = post ? Math.round(lerp(45, 190, eo(prog(t, DROP, .8)))) : Math.min(45, Math.round(45 * prog(t, EDGE0, 45 * EDGE_DT)));
  ctx.font = font('serif', num > 99 ? 76 : 84, 700); ctx.textAlign = 'center'; ctx.fillStyle = C.ink; ctx.fillText(num, 0, 22);
  ctx.restore();
  ctx.restore();
  label('PAIRS', CX, CY + 64, out * cp, C.ink2, 24);
  ring(t, DROP, CX, CY, 60, 520, C.gold, .8, 12);
  ring(t, DROP + .12, CX, CY, 40, 420, C.goldL, .7, 8);
  burst(t, DROP, CX, CY, 30, 313, C.goldL, 1100, .9);
}

/* ---------- S6: recombination happens at the borders (27.6 – 33.1) ---------- */
function scene6(t) {
  if (t < 27.6 || t > 33.2) return;
  const end = 32.65, out = 1 - eio(prog(t, end, .35));
  line(t, 'Recombination happens', W / 2, 215, { size: 66, start: 27.8, stagger: .08, end });
  line(t, 'at the [borders.]', W / 2, 303, { size: 72, start: 28.3, stagger: .1, end });
  ctx.save(); ctx.globalAlpha = out;
  [[72, 'rgba(58,52,44,0.08)'], [578, 'rgba(184,137,58,0.14)']].forEach(([x, col], i) => {
    const p = eback(prog(t, PAN + i * .15, .45)); if (p <= 0) return;
    ctx.save(); ctx.translate(x + 215, 650); ctx.scale(p, p); rr(-215, -230, 430, 460, 28); ctx.fillStyle = col; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = C.faint; ctx.stroke(); ctx.restore();
  });
  const bp = eio(prog(t, PAN + .5, .6));
  ctx.strokeStyle = C.ink; ctx.lineWidth = 5; ctx.setLineDash([16, 12]); ctx.beginPath(); ctx.moveTo(540, 650 - 250 * bp); ctx.lineTo(540, 650 + 250 * bp); ctx.stroke(); ctx.setLineDash([]);
  [[190, 590, 0, 0], [300, 760, 2, 0], [230, 800, 3, 0], [800, 590, 1, 1], [900, 780, 4, 1], [760, 840, 6, 1]].forEach(([x, y, k, g], i) => {
    const p = eback(prog(t, 28.9 + i * .1, .3)); if (p <= 0) return;
    ctx.save(); ctx.translate(x, y); glyph(k, 44 * p, g ? C.goldL : C.fill); ctx.restore();
  });
  const mv = eio(prog(t, 29.7, BHIT - 29.7));
  if (t < BHIT + .02) {
    [[330, 660, C.fill, 0, -1], [760, 700, C.goldL, 1, 1]].forEach(([x, y, col, g, d]) => {
      const p = eback(prog(t, 29.4, .3)); if (p <= 0) return;
      ctx.save(); ctx.translate(lerp(x, 540 - d * 28, mv), lerp(y, 650, mv)); ctx.scale(p, p);
      ctx.beginPath(); ctx.arc(0, 0, 26, 0, Math.PI * 2); ctx.fillStyle = col; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
    });
  }
  const dp = eback(prog(t, BHIT, .4));
  if (dp > 0) {
    ctx.save(); ctx.translate(540, 650); ctx.rotate(Math.PI / 4 + .05 * Math.sin(t * 6)); ctx.scale(dp * 1.2, dp * 1.2);
    rr(-44, -44, 88, 88, 10); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
  }
  ctx.restore();
  label('YOUR FIELD', 287, 450, out * eo(prog(t, PAN + .6, .3)), C.ink2, 24);
  label('ANOTHER FIELD', 793, 450, out * eo(prog(t, PAN + .75, .3)), C.goldText, 24);
  ring(t, BHIT, 540, 650, 40, 380, C.gold, .8, 10);
  burst(t, BHIT, 540, 650, 24, 604, C.goldL, 1000, .8);
}

/* ---------- S7: test it cheap (33.1 – 40.3) ---------- */
function scene7(t) {
  if (t < 33.1 || t > 40.4) return;
  const qEnd = 39.85;
  line(t, 'Test it [cheap.]', W / 2, 220, { size: 80, start: 33.3, stagger: .1, end: qEnd });
  line(t, 'Small bets. Fast feedback.', W / 2, 305, { size: 50, color: C.ink2, start: 34.0, stagger: .07, end: 37.4 });
  line(t, '[Keep the winners.]', W / 2, 305, { size: 60, start: WIN + .1, stagger: .1, end: qEnd });
  const out = 1 - eio(prog(t, qEnd, .35)), dim = 1 - .62 * eo(prog(t, WIN, .3));
  ctx.save(); ctx.globalAlpha = out;
  for (let i = 0; i < 20; i++) {
    const c = i % 5, r = (i / 5) | 0, x = 308 + c * 116, y = 450 + r * 116;
    const p = eback(prog(t, TIL0 + i * TIL_DT, .3)); if (p <= 0) continue;
    const win = i === WINI, wp = win ? eback(prog(t, WIN, .35)) : 0;
    ctx.save(); ctx.translate(x, y); ctx.scale(p * (win ? 1 + .22 * wp : 1), p * (win ? 1 + .22 * wp : 1)); ctx.globalAlpha = out * (win ? 1 : dim);
    rr(-50, -50, 100, 100, 16); ctx.fillStyle = win && wp > 0 ? C.goldL : PAPER2; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke();
    ctx.lineCap = ctx.lineJoin = 'round';
    if (win) {
      if (wp > 0) { ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(-22, 2); ctx.lineTo(-6, 20); ctx.lineTo(24, -18); ctx.stroke(); }
    } else {
      const xp = eo(prog(t, XS + i * X_DT, .2));
      if (xp > 0) { ctx.strokeStyle = C.ink2; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(-20, -20); ctx.lineTo(-20 + 40 * xp, -20 + 40 * xp); ctx.moveTo(20, -20); ctx.lineTo(20 - 40 * xp, -20 + 40 * xp); ctx.stroke(); }
    }
    ctx.restore();
  }
  ctx.restore();
  ring(t, WIN, 308 + 2 * 116, 450 + 2 * 116, 50, 420, C.gold, .8, 12);
  burst(t, WIN, 308 + 2 * 116, 450 + 2 * 116, 28, 808, C.goldL, 1100, .9);
}

/* ---------- S8: takeaway (40.3 – 47.1) ---------- */
function scene8(t) {
  if (t < 40.3 || t > 47.1) return;
  const end = 46.7;
  line(t, 'Don’t ask what to invent.', W / 2, 420, { size: 62, start: 40.45, stagger: .08, end });
  const r = line(t, 'Ask what to [combine.]', W / 2, 550, { size: 82, start: 41.4, stagger: .1, end });
  const u = eio(prog(t, 42.35, .4)) * (1 - eio(prog(t, end, .35)));
  if (u > 0) { ctx.fillStyle = C.gold; ctx.fillRect(r.x0, 586, r.w * u, 9); }
  line(t, 'Value hides in the [uncombined.]', W / 2, 730, { size: 52, color: C.ink2, start: 43.4, stagger: .07, end });
  burst(t, 41.5, W / 2, 520, 24, 707, C.goldL, 1100, .9);
}

/* ---------- S9: end card (47.1 – 53) ---------- */
function scene9(t) {
  if (t < E - .05) return;
  const rp = eio(prog(t, E, .55));
  ctx.fillStyle = C.night; ctx.beginPath(); ctx.arc(W / 2, 600, 1300 * rp, 0, Math.PI * 2); ctx.fill();
  if (rp < 1) return;
  [[-34, 0], [34, 1]].forEach(([dx, i]) => {
    const p = eback(prog(t, E + .95 + i * .1, .45)); if (p <= 0) return;
    ctx.beginPath(); ctx.arc(W / 2 + dx * p, 275, 56 * p, 0, Math.PI * 2); ctx.lineWidth = 5; ctx.strokeStyle = C.cream; ctx.stroke();
  });
  const lp0 = eback(prog(t, E + 1.1, .45));
  if (lp0 > 0) {
    ctx.save(); ctx.beginPath(); ctx.arc(W / 2 - 34, 275, 56, 0, Math.PI * 2); ctx.clip();
    ctx.beginPath(); ctx.arc(W / 2 + 34, 275, 56, 0, Math.PI * 2); ctx.fillStyle = C.goldL; ctx.globalAlpha = clamp(lp0); ctx.fill(); ctx.restore();
  }
  ring(t, E + 1.2, W / 2, 275, 30, 300, C.goldL, .8, 8);
  line(t, 'Value, Created —', W / 2, 440, { size: 88, color: C.cream, start: E + 1.15, stagger: .1 });
  const title = 'Chapter 14: Recombination';
  line(t, '[' + title + ']', W / 2, 535, { size: fit(title, 900, 66, 'serif'), goldColor: C.goldL, start: E + 1.6, stagger: .06 });
  const lp = eio(prog(t, E + 2.15, .45));
  ctx.fillStyle = C.goldL; ctx.fillRect(W / 2 - 70 * lp, 590, 140 * lp, 4);
  line(t, 'Full 9-minute episode — link in comments', W / 2, 680, { font: 'sans', size: 38, color: C.cream, start: E + 2.55, stagger: .05 });
  ctx.save(); ctx.globalAlpha = .6 * eo(prog(t, E + 3.35, .5));
  ctx.font = font('sans', 22, 700); ctx.letterSpacing = '5px'; ctx.textAlign = 'center'; ctx.fillStyle = C.cream;
  ctx.fillText('A FREE AUDIOBOOK · PRODUCED BY THE JOY DIGI', W / 2 + 2.5, 980);
  ctx.restore();
}

const SCENES = [scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8];
const END_CARD = scene9;
