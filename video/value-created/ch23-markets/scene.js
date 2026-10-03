/* Value, Created Ch 23 LinkedIn infographic: chapter config and scenes for ../_engine (design time; WARP maps real time onto it). */
const CHAPTER = 23, KICKER_END = 46.65, BAR_END = 46.75;
const WARP = [[0, 0], [6.4, 4.5], [10.9, 7.6], [16, 11.2], [20.7, 14.5], [27.6, 19.3], [33.1, 23.2], [40.3, 28.2], [47.1, 33], [53, 38]];
/* ---------- timeline constants shared by visuals and cues ---------- */
const STALLS = [.45, .9], EQ = 1.7, NEQ = 2.5, WHAT = 3.9, AROUND = 4.7;
const ARR = 7.0, PUSH0 = 8.0, MEET = 9.1;
const BID = [14.2, 14.6, 15.0, 15.4, 15.8], DROPOUT = [16.7, 17.0, 17.3, 17.6], SOLD = 18.0;
const DROP = 23.6;
const WOB0 = 28.3, SETTLE = 31.0;
const PILE0 = 33.9, PILE_DT = .06, GOLD = 35.4, PADDLES = [36.5, 36.7, 36.9, 37.1];
const SWIPES = [6.4, 20.7, 33.1];
const E = 46.85;
const IMPACTS = [[NEQ + .1, 8], [MEET, 10], [SOLD, 10], [DROP, 16], [DROP + .45, 5], [SETTLE, 7], [PADDLES[3], 9], [41.4, 12], [E + 1.2, 7]];
const KB = [[0, 6.4], [6.4, 20.7], [20.7, 33.1], [33.1, 46.8]];

cue(0, 'impact', { v: .6 }); cue(.02, 'pop', { f: 1 });
STALLS.forEach((x, i) => { cue(x, 'whoosh', { v: .25 }); cue(x + .3, 'blip', { n: [60, 64][i] }); cue(x + .5, 'pop', { f: 1 }); });
cue(EQ, 'pop', { f: 1.1 }); cue(EQ + .1, 'tick', { f: 2 });
cue(NEQ, 'scratch'); cue(NEQ + .1, 'impact', { v: .8 }); cue(NEQ + .1, 'chime', { n: 76 });
cue(WHAT, 'pop', { f: 1.2 }); cue(AROUND, 'pop', { f: .9 }); cue(AROUND + .1, 'swish');
SWIPES.forEach(x => cue(x - .3, 'whoosh', { v: 1 }));
cue(6.65, 'pop', { f: 1.2 }); cue(ARR, 'whoosh', { v: .4 }); cue(ARR + .15, 'whoosh', { v: .4 });
for (let x = PUSH0, k = 0; x < MEET - .05; x += .17, k++) cue(x, 'knock', { v: .4 + k * .08 });
cue(MEET - .3, 'riser', { d: .3 });
cue(MEET, 'impact', { v: .9 }); cue(MEET, 'chime', { n: 76 }); cue(MEET + .1, 'pop', { f: 1.2 }); cue(MEET + .5, 'blip', { n: 83 });
cue(12.6, 'pop', { f: 1.2 }); cue(13.2, 'pop', { f: .9 });
BID.forEach((x, i) => { cue(x, 'swish'); cue(x + .05, 'blip', { n: 60 + i * 3 }); });
DROPOUT.forEach((x, i) => { cue(x, 'thud'); cue(x + .02, 'blip', { n: 57 - i * 2 }); });
cue(SOLD, 'impact', { v: .9 }); cue(SOLD, 'chime', { n: 79 }); cue(SOLD + .05, 'knock', { v: 1 }); cue(17.9, 'pop', { f: 1.1 });
cue(20.2, 'riser', { d: DROP - 20.2 }); cue(21.0, 'pop', { f: 1.1 }); cue(21.4, 'pop', { f: .9 });
for (let x = 22.4, k = 0; x < DROP - .05; x += .16 - k * .004, k++) cue(x, 'tick', { f: k % 2 });
cue(DROP, 'boom', { v: 1 }); cue(DROP, 'chime', { n: 79 }); cue(DROP, 'impact', { v: 1 }); cue(DROP + .2, 'whoosh', { v: .4 }); cue(DROP + .45, 'thud');
[0, 1, 2].forEach(i => cue(DROP + .3 + i * .25, 'swish'));
cue(25.2, 'pop', { f: .9 });
cue(27.8, 'pop', { f: 1.2 }); cue(28.0, 'swish');
for (let k = 0; k < 8; k++) cue(WOB0 + k * .38, 'tick', { f: k % 2 });
cue(SETTLE, 'chime', { n: 72 }); cue(SETTLE, 'impact', { v: .6 }); cue(30.0, 'pop', { f: 1.1 });
cue(33.3, 'tick', { f: 2 }); cue(33.4, 'pop', { f: 1.1 });
for (let i = 0; i < 12; i++) cue(PILE0 + i * PILE_DT, 'tick', { f: i % 2 });
cue(GOLD - .1, 'whoosh', { v: .35 }); cue(GOLD + .3, 'thud'); cue(GOLD + .3, 'chime', { n: 76 }); cue(36.3, 'pop', { f: 1 });
PADDLES.forEach((x, i) => { cue(x, 'swish'); cue(x + .05, 'blip', { n: [64, 67, 71, 76][i] }); });
cue(PADDLES[3] + .05, 'impact', { v: .7 });
cue(40.0, 'whoosh', { v: .35 }); cue(40.45, 'thud'); cue(41.4, 'impact', { v: .9 }); cue(41.4, 'chime', { n: 76 }); cue(42.35, 'swish'); cue(43.4, 'pop', { f: .9 });
cue(E - .05, 'whoosh', { v: 1 });
[E + .95, E + 1.1].forEach((x, i) => cue(x + .1, 'blip', { n: [72, 79][i] }));
cue(E + 1.2, 'boom', { v: .9 }); cue(E + 1.25, 'chime', { n: 72 });
cue(E + 2.55, 'pop', { f: .9 });
const MARKERS = { groove: 6.4, breakdown: 20.2, drop: DROP, end: 46.75 };

const pop = (t, a, d) => Math.max(0, eback(prog(t, a, d)));
const hl = (t, str, y, o) => line(t, str, W / 2, y, Object.assign({}, o, { size: fit(str, 900, o.size || 80, 'serif') }));

/* fish is anchored at its centre and w is its overall length */
function fish(x, y, w, fill, o) {
  o = o || {};
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); const s = w / 220; ctx.scale(s, s);
  ctx.lineWidth = (o.lw || 5) / s; ctx.strokeStyle = C.ink; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.ellipse(10, 0, 88, 46, 0, 0, Math.PI * 2); ctx.fillStyle = fill; ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-70, 0); ctx.lineTo(-118, -38); ctx.lineTo(-118, 38); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.arc(55, -10, 7, 0, Math.PI * 2); ctx.fillStyle = C.ink; ctx.fill();
  ctx.restore();
}

/* stall is anchored at its table-top centre */
function stall(x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.lineWidth = 6 / s; ctx.strokeStyle = C.ink; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-150, -50); ctx.lineTo(-150, -230); ctx.moveTo(150, -50); ctx.lineTo(150, -230); ctx.stroke();
  for (let i = 0; i < 6; i++) {
    const x0 = -170 + i * 56.7;
    ctx.beginPath(); ctx.moveTo(x0, -280); ctx.lineTo(x0 + 56.7, -280); ctx.lineTo(x0 + 56.7 + 5, -226); ctx.lineTo(x0 + 5, -226); ctx.closePath();
    ctx.fillStyle = i % 2 ? '#FFFBF3' : C.goldL; ctx.fill(); ctx.stroke();
  }
  rr(-175, -20, 350, 28, 8); ctx.fillStyle = 'rgba(58,52,44,0.12)'; ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-140, 8); ctx.lineTo(-140, 70); ctx.moveTo(140, 8); ctx.lineTo(140, 70); ctx.stroke();
  ctx.restore();
}

function paddle(x, yTop, a, fill) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x, yTop); ctx.lineTo(x, yTop + 130); ctx.stroke();
  ctx.beginPath(); ctx.arc(x, yTop, 38, 0, Math.PI * 2); ctx.fillStyle = fill; ctx.fill(); ctx.stroke();
  ctx.restore();
}

function boat(x, y, sx, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(sx * s, s); ctx.lineWidth = 5 / s; ctx.strokeStyle = C.ink; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(0, -90); ctx.lineTo(0, -4); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(6, -86); ctx.lineTo(54, -14); ctx.lineTo(6, -14); ctx.closePath(); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-60, 0); ctx.lineTo(60, 0); ctx.lineTo(42, 26); ctx.lineTo(-42, 26); ctx.closePath(); ctx.fillStyle = C.goldL; ctx.fill(); ctx.stroke();
  ctx.restore();
}

/* beacon is anchored at its bottom centre; lit 0..1 fills the lamp gold */
function beacon(x, y, lit) {
  ctx.save(); ctx.translate(x, y); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(-34, 0); ctx.lineTo(34, 0); ctx.lineTo(20, -150); ctx.lineTo(-20, -150); ctx.closePath(); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-30, -44); ctx.lineTo(30, -44); ctx.lineTo(26, -78); ctx.lineTo(-26, -78); ctx.closePath(); ctx.fillStyle = 'rgba(58,52,44,0.25)'; ctx.fill();
  ctx.beginPath(); ctx.moveTo(-34, -150); ctx.lineTo(0, -196); ctx.lineTo(34, -150); ctx.closePath(); ctx.fillStyle = C.ink; ctx.fill();
  ctx.beginPath(); ctx.arc(0, -150, 24, 0, Math.PI * 2); ctx.fillStyle = lit > .5 ? C.goldL : C.faint; ctx.fill(); ctx.stroke();
  ctx.restore();
}

function arrow(x, y, dir, len) {
  ctx.save(); ctx.translate(x, y); ctx.scale(dir, 1);
  ctx.beginPath(); ctx.moveTo(-len, -26); ctx.lineTo(-26, -26); ctx.lineTo(-26, -52); ctx.lineTo(26, 0); ctx.lineTo(-26, 52); ctx.lineTo(-26, 26); ctx.lineTo(-len, 26); ctx.closePath();
  ctx.fillStyle = dir > 0 ? C.fill : C.goldL; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore();
}

function person(x, y, s, col) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.arc(0, -34, 14, 0, Math.PI * 2); ctx.fillStyle = col; ctx.fill();
  ctx.beginPath(); ctx.arc(0, 0, 24, Math.PI, 2 * Math.PI); ctx.fill(); ctx.restore();
}

/* speech bubble centred on 0,0 with three dots that pulse in turn */
function bubble(t) {
  ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.roundRect(-80, -48, 160, 96, 28); ctx.moveTo(-40, 46); ctx.lineTo(-56, 76); ctx.lineTo(-10, 48);
  ctx.fillStyle = C.goldL; ctx.fill(); ctx.stroke();
  [-36, 0, 36].forEach((x, i) => { ctx.beginPath(); ctx.arc(x, 0, 9 + 4 * Math.max(0, Math.sin(t * 6 - i * 1.1)), 0, Math.PI * 2); ctx.fillStyle = C.ink; ctx.fill(); });
}

/* ---------- S1: same fish, two towns (0 – 6.4) ---------- */
const SX = [250, 830], SY = 830;
function scene1(t) {
  if (t > 6.6) return;
  hl(t, 'Same fish. Two towns.', 215, { size: 84, start: -.62, stagger: .12, end: 3.7 });
  hl(t, 'What moved?', 215, { size: 84, start: WHAT, stagger: .1, end: 5.95 });
  hl(t, 'Everything [around it.]', 305, { size: 72, start: AROUND, stagger: .1, end: 5.95 });
  const out = 1 - eio(prog(t, 5.95, .35));
  ctx.save(); ctx.globalAlpha = out;
  SX.forEach((x, i) => {
    const p = pop(t, STALLS[i], .5);
    if (p > 0) { ctx.save(); ctx.translate(x, SY); ctx.scale(p, p); ctx.translate(-x, -SY); stall(x, SY, .95); ctx.restore(); }
    const fp = pop(t, STALLS[i] + .35, .35);
    if (fp > 0) fish(x, SY - 46, 150 * fp, C.goldL);
    const ha = eo(prog(t, AROUND, .4));
    if (ha > 0) for (let k = 0; k < 2; k++) {
      const ph = (t * .7 + k * .5) % 1; ctx.save(); ctx.globalAlpha = out * ha * (1 - ph) * .9; ctx.setLineDash([12, 14]); ctx.lineWidth = 4; ctx.strokeStyle = C.goldText;
      ctx.beginPath(); ctx.arc(x, SY - 46, 110 + ph * 110, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
    }
  });
  const ep = pop(t, EQ, .4), np = eio(prog(t, NEQ, .25));
  if (ep > 0) {
    ctx.save(); ctx.translate(W / 2, 680); ctx.scale(ep * (1 + .25 * Math.exp(-Math.max(0, t - NEQ) * 8) * (t > NEQ ? 1 : 0)), ep);
    ctx.lineCap = 'round'; ctx.lineWidth = 12; ctx.strokeStyle = np > .5 ? C.goldText : C.ink; ctx.beginPath();
    ctx.moveTo(-50, -18); ctx.lineTo(50, -18); ctx.moveTo(-50, 18); ctx.lineTo(50, 18);
    if (np > 0) { ctx.moveTo(-34 + 68 * (1 - np), 52); ctx.lineTo(34 - 68 * (1 - np), -52); }
    ctx.stroke(); ctx.restore();
  }
  label('THE GAP', W / 2, 790, out * eo(prog(t, NEQ + .2, .3)), C.goldText, 28);
  ring(t, NEQ + .1, W / 2, 680, 30, 280, C.gold, .7, 10);
  burst(t, NEQ + .1, W / 2, 680, 16, 91, C.goldL, 700, .7);
  ctx.restore();
}

/* ---------- S2: nobody sets the price (6.4 – 11) ---------- */
function scene2(t) {
  if (t < 6.4 || t > 12.5) return;
  const end = 11.95, out = 1 - eio(prog(t, end, .35)), Y = 620;
  hl(t, 'Nobody sets the price.', 220, { size: 80, start: 6.65, end });
  hl(t, 'It’s [discovered.]', 312, { size: 90, start: MEET, stagger: .12, end });
  ctx.save(); ctx.globalAlpha = out;
  const a = eio(prog(t, ARR, 1.0)), push = Math.sin(Math.max(0, t - PUSH0) * 17) * 14 * eo(prog(t, PUSH0, .3)) * (t < MEET ? 1 : 0);
  const rest = 1 - eo(prog(t, MEET, .25)) * .0;
  const lx = lerp(-200, 470 + push, a), rx = lerp(W + 200, 610 - push, a);
  arrow(lx, Y, 1, 330 * rest); arrow(rx, Y, -1, 330 * rest);
  const bump = eo(prog(t, MEET, .3)) * (1 - eo(prog(t, MEET + .4, .4)));
  if (bump > 0) { ctx.save(); ctx.translate(W / 2, Y); ctx.scale(1 + bump * .4, 1 + bump * .4); ctx.restore(); }
  const dp = pop(t, MEET, .4);
  if (dp > 0) {
    ctx.save(); ctx.translate(W / 2, Y); ctx.scale(dp, dp); ctx.beginPath(); ctx.arc(0, 0, 34, 0, Math.PI * 2); ctx.fillStyle = C.gold; ctx.fill();
    ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
  }
  ctx.restore();
  label('SELLER WANTS MORE', 72, Y + 130, out * eo(prog(t, ARR + .6, .3)), C.ink, 24, 'left');
  label('BUYER WANTS LESS', W - 72, Y + 130, out * eo(prog(t, ARR + .6, .3)), C.ink, 24, 'right');
  label('THE PRICE', W / 2, Y - 80, out * eo(prog(t, MEET + .3, .3)), C.goldText, 28);
  ring(t, MEET, W / 2, Y, 40, 320, C.gold, .8, 10);
  ring(t, MEET + .12, W / 2, Y, 30, 240, C.goldL, .7, 8);
  burst(t, MEET, W / 2, Y, 26, 205, C.goldL, 900, .8);
}

/* ---------- S3: bids collide (12.4 – 20.7) ---------- */
const PX = [190, 365, 540, 715, 890];
function scene3(t) {
  if (t < 12.4 || t > 20.8) return;
  const end = 20.2, out = 1 - eio(prog(t, end, .35)), BASE = 850;
  hl(t, 'Opinions collide.', 215, { size: 80, start: 12.6, end });
  hl(t, 'The [price] survives.', 305, { size: 80, start: 17.9, stagger: .1, end });
  ctx.save(); ctx.globalAlpha = out;
  const cp = pop(t, 13.1, .4);
  if (cp > 0) {
    ctx.save(); ctx.translate(W / 2, 470); ctx.scale(cp, cp);
    rr(-110, -44, 220, 88, 14); ctx.fillStyle = 'rgba(58,52,44,0.12)'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
    fish(0, 0, 130, C.goldL); ctx.restore();
  }
  PX.forEach((x, i) => {
    const up = eo(prog(t, BID[i], .35)), dn = i < 4 ? eio(prog(t, DROPOUT[i], .45)) : 0, last = i === 4;
    const yTop = lerp(BASE, 580 - i * 8, up) + dn * 150 - 0;
    const isOut = dn > 0;
    ctx.save(); if (isOut) ctx.globalAlpha = out * (1 - .5 * dn);
    paddle(x, yTop + 0, up > 0 ? 1 : 0, last && t >= SOLD ? C.goldL : (isOut ? C.faint : '#FFFBF3'));
    ctx.restore();
  });
  const sp = pop(t, SOLD, .4);
  if (sp > 0) {
    ctx.save(); ctx.translate(PX[4] - 20, 480); ctx.rotate(-.12); ctx.scale(sp, sp);
    rr(-86, -32, 172, 64, 16); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.stroke();
    ctx.font = font('sans', 32, 700); ctx.letterSpacing = '6px'; ctx.textAlign = 'center'; ctx.fillStyle = C.ink; ctx.fillText('SOLD', 3, 11); ctx.restore();
  }
  ctx.restore();
  ring(t, SOLD, PX[4], 580 - 32, 40, 300, C.gold, .8, 10);
  burst(t, SOLD, PX[4], 560, 22, 331, C.goldL, 900, .8);
}

/* ---------- S4: a price is a message (20.7 – 27.6) ---------- */
const BOATS = [[110, 640, -1, 395, 788], [955, 690, 1, 690, 788], [190, 800, -1, 255, 770]];
function scene4(t) {
  if (t < 20.7 || t > 27.7) return;
  const end = 27.1, out = 1 - eio(prog(t, end, .35));
  hl(t, 'A price is a', 215, { size: 84, start: 21.0, stagger: .1, end });
  hl(t, '[message.]', 310, { size: 96, start: DROP, stagger: .14, end });
  hl(t, 'It tells everyone what to do next.', 395, { size: 50, color: C.ink2, start: 25.2, stagger: .07, end });
  ctx.save(); ctx.globalAlpha = out;
  ctx.strokeStyle = C.ink2; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath();
  for (let x = 72; x <= W - 72; x += 8) { const y = 818 + 6 * Math.sin(x * .05 + t * 2); x === 72 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); }
  ctx.stroke();
  const bp = pop(t, 21.0, .45), lit = t >= DROP ? 1 : 0;
  if (bp > 0) { ctx.save(); ctx.translate(W / 2, 800); ctx.scale(bp * 1.45, bp * 1.45); ctx.translate(-W / 2, -800); beacon(W / 2, 800, lit); ctx.restore(); }
  BOATS.forEach(([x0, y0, face, x1, y1], i) => {
    const p = pop(t, 21.4 + i * .15, .4), mv = eio(prog(t, DROP + .3 + i * .25, 1.8));
    if (p <= 0) return;
    const sx = lerp(face, -face, eio(prog(t, DROP + .1 + i * .1, .35))), bob = 5 * Math.sin(t * 3 + i * 2);
    boat(lerp(x0, x1, mv), lerp(y0, y1, mv) + bob, sx, p * 1.15);
  });
  ctx.restore();
  [0, .22, .44].forEach(d => ring(t, DROP + d, W / 2, 600, 30, 560, C.gold, .9, 12 - d * 12));
  burst(t, DROP, W / 2, 600, 24, 313, C.goldL, 1000, .9);
  const glow = eo(prog(t, DROP, .5)) * out * (.5 + .1 * Math.sin(t * 6));
  if (glow > 0) {
    const g = ctx.createRadialGradient(W / 2, 600, 10, W / 2, 600, 260); g.addColorStop(0, `rgba(221,182,95,${glow * .7})`); g.addColorStop(1, 'rgba(221,182,95,0)');
    ctx.fillStyle = g; ctx.fillRect(W / 2 - 260, 340, 520, 520);
  }
}

/* ---------- S5: no one is in charge (27.6 – 33.1) ---------- */
function scene5(t) {
  if (t < 27.6 || t > 33.2) return;
  const end = 32.65, out = 1 - eio(prog(t, end, .35)), PX0 = W / 2, PY = 540, L = 320;
  hl(t, 'No one is in charge.', 215, { size: 80, start: 27.8, end });
  hl(t, 'And yet it [works.]', 305, { size: 80, start: 30.0, stagger: .1, end });
  const dt = Math.max(0, t - WOB0), ang = .36 * Math.exp(-dt * 1.1) * Math.cos(dt * 4.2) * (t >= SETTLE ? 0 : 1);
  const bp = eio(prog(t, 28.0, .5));
  ctx.save(); ctx.globalAlpha = out * bp;
  ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(PX0, PY); ctx.lineTo(PX0, 830); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(PX0 - 90, 830); ctx.lineTo(PX0 + 90, 830); ctx.lineTo(PX0 + 60, 800); ctx.lineTo(PX0 - 60, 800); ctx.closePath(); ctx.fillStyle = 'rgba(58,52,44,0.12)'; ctx.fill(); ctx.stroke();
  const ends = [-1, 1].map(s => [PX0 + s * L * Math.cos(ang), PY - s * L * Math.sin(ang) * -1]);
  ctx.beginPath(); ctx.moveTo(ends[0][0], ends[0][1]); ctx.lineTo(ends[1][0], ends[1][1]); ctx.lineWidth = 9; ctx.stroke(); ctx.lineWidth = 6;
  ctx.beginPath(); ctx.arc(PX0, PY, 16, 0, Math.PI * 2); ctx.fillStyle = C.goldL; ctx.fill(); ctx.stroke();
  ends.forEach(([ex, ey], i) => {
    const py = ey + 150;
    ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(ex - 100, py); ctx.moveTo(ex, ey); ctx.lineTo(ex + 100, py); ctx.lineWidth = 4; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ex - 110, py); ctx.lineTo(ex + 110, py); ctx.lineTo(ex + 80, py + 26); ctx.lineTo(ex - 80, py + 26); ctx.closePath();
    ctx.fillStyle = 'rgba(58,52,44,0.12)'; ctx.fill(); ctx.lineWidth = 5; ctx.stroke();
    if (i === 0) [-55, 0, 55].forEach((dx, k) => fish(ex + dx, py - 26 - (k === 1 ? 14 : 0), 76, C.goldL, { lw: 4 }));
    else [-60, -20, 20, 60].forEach((dx, k) => person(ex + dx, py - 8, .95, k % 2 ? C.fill : C.ink2));
  });
  ctx.restore();
  label('SELLERS', 250, 880, out * bp, C.ink2, 24); label('BUYERS', 830, 880, out * bp, C.ink2, 24);
  ring(t, SETTLE, PX0, PY, 30, 300, C.gold, .7, 10);
  burst(t, SETTLE, PX0, PY, 18, 441, C.goldL, 800, .8);
}

/* ---------- S6: sell what the market is short of (33.1 – 40.3) ---------- */
function scene6(t) {
  if (t < 33.1 || t > 40.4) return;
  const end = 39.85, out = 1 - eio(prog(t, end, .35));
  hl(t, 'Don’t ask how to charge more.', 215, { size: 80, start: 33.4, stagger: .08, end: 36.0 });
  hl(t, 'Ask what the market', 215, { size: 76, start: 36.3, stagger: .08, end });
  hl(t, 'is [bidding for.]', 295, { size: 76, start: 36.7, stagger: .08, end });
  ctx.save(); ctx.globalAlpha = out;
  for (let i = 0; i < 12; i++) {
    const c = i % 4, r = (i / 4) | 0, p = pop(t, PILE0 + i * PILE_DT, .3); if (p <= 0) continue;
    fish(140 + c * 100, 630 + r * 80 + 4 * Math.sin(t * 3 + i), 104 * p, '#B5AB98', { lw: 4 });
  }
  const gp = pop(t, GOLD, .5), glow = eo(prog(t, PADDLES[3], .6));
  if (gp > 0) {
    if (glow > 0) {
      const g = ctx.createRadialGradient(780, 740, 20, 780, 740, 230); g.addColorStop(0, `rgba(221,182,95,${.7 * glow})`); g.addColorStop(1, 'rgba(221,182,95,0)');
      ctx.fillStyle = g; ctx.fillRect(550, 510, 460, 460);
    }
    fish(780, 740 + 4 * Math.sin(t * 3), 300 * gp, C.goldL, { lw: 6 });
  }
  [[655, 520], [745, 478], [835, 496], [925, 540]].forEach(([x, y], i) => {
    const up = eo(prog(t, PADDLES[i], .35)); paddle(x, lerp(y + 90, y, up), up, '#FFFBF3');
  });
  ctx.restore();
  label('TOO MANY', 290, 880, out * eo(prog(t, 34.6, .3)), C.ink2, 26);
  label('TOO FEW', 780, 880, out * eo(prog(t, 35.9, .3)), C.goldText, 26);
  ring(t, PADDLES[3], 780, 740, 40, 320, C.gold, .8, 10);
  burst(t, PADDLES[3], 780, 740, 22, 551, C.goldL, 900, .8);
}

/* ---------- S7: takeaway (40.3 – 47.1) ---------- */
function scene7(t) {
  if (t < 40.3 || t > 47.1) return;
  const end = 46.7;
  hl(t, 'The market is always talking.', 430, { size: 76, start: 40.45, stagger: .08, end });
  const r = hl(t, '[Are you listening?]', 570, { size: 104, start: 41.4, stagger: .1, end });
  const u = eio(prog(t, 42.35, .4)) * (1 - eio(prog(t, end, .35)));
  if (u > 0) { ctx.fillStyle = C.gold; ctx.fillRect(r.x0, 606, r.w * u, 9); }
  hl(t, 'Read prices like messages.', 740, { size: 50, color: C.ink2, start: 43.4, stagger: .07, end });
  const wp = eo(prog(t, 43.9, .4)) * (1 - eio(prog(t, end, .35)));
  if (wp > 0) {
    ctx.save(); ctx.globalAlpha = wp; ctx.translate(W / 2, 850); bubble(t); ctx.restore();
  }
  burst(t, 41.5, W / 2, 550, 24, 707, C.goldL, 1100, .9);
}

/* ---------- S8: end card (47.1 – 53) ---------- */
function scene8(t) {
  if (t < E - .05) return;
  const rp = eio(prog(t, E, .55));
  ctx.fillStyle = C.night; ctx.beginPath(); ctx.arc(W / 2, 600, 1300 * rp, 0, Math.PI * 2); ctx.fill();
  if (rp < 1) return;
  const gp = eio(prog(t, E + .9, .4));
  ctx.fillStyle = C.cream; ctx.globalAlpha = .7; ctx.fillRect(W / 2 - 120 * gp, 186, 240 * gp, 4); ctx.globalAlpha = 1;
  const p = pop(t, E + .95, .4);
  if (p > 0) {
    ctx.save(); ctx.translate(W / 2, 246); ctx.scale(p, p);
    ctx.beginPath(); ctx.roundRect(-52, -34, 104, 64, 20); ctx.moveTo(-26, 30); ctx.lineTo(-38, 52); ctx.lineTo(-6, 30);
    ctx.fillStyle = 'rgba(244,237,224,0.14)'; ctx.fill(); ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.strokeStyle = C.cream; ctx.stroke();
    [-24, 0, 24].forEach(x => { ctx.beginPath(); ctx.arc(x, -2, 7, 0, Math.PI * 2); ctx.fillStyle = C.goldL; ctx.fill(); });
    ctx.restore();
  }
  ring(t, E + 1.2, W / 2, 250, 30, 300, C.goldL, .8, 8);
  line(t, 'Value, Created —', W / 2, 440, { size: 88, color: C.cream, start: E + 1.15, stagger: .1 });
  const ts = 'Chapter 23: Markets';
  line(t, '[' + ts + ']', W / 2, 535, { size: fit(ts, 900, 60, 'serif'), goldColor: C.goldL, start: E + 1.6, stagger: .06 });
  const lp = eio(prog(t, E + 2.15, .45));
  ctx.fillStyle = C.goldL; ctx.fillRect(W / 2 - 70 * lp, 590, 140 * lp, 4);
  line(t, 'Full 7-minute episode — link in comments', W / 2, 680, { font: 'sans', size: 38, color: C.cream, start: E + 2.55, stagger: .05 });
  ctx.save(); ctx.globalAlpha = .6 * eo(prog(t, E + 3.35, .5));
  ctx.font = font('sans', 22, 700); ctx.letterSpacing = '5px'; ctx.textAlign = 'center'; ctx.fillStyle = C.cream;
  ctx.fillText('A FREE AUDIOBOOK · PRODUCED BY THE JOY DIGI', W / 2 + 2.5, 980);
  ctx.restore();
}

const SCENES = [scene1, scene2, scene3, scene4, scene5, scene6, scene7];
const END_CARD = scene8;
