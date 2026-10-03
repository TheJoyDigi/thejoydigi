/* Value, Created Ch 1 LinkedIn infographic: chapter config and scenes for ../_engine (design time; WARP maps real time onto it). */
const CHAPTER = 1, KICKER_END = 46.65, BAR_END = 46.75;
const WARP = [[0, 0], [6.4, 4.5], [10.9, 7.6], [16, 11.2], [20.7, 14.5], [27.6, 19.3], [33.1, 23.2], [40.3, 28.2], [47.1, 33], [53, 38]];
/* ---------- timeline constants shared by visuals and cues ---------- */
const TIP1 = 4.2, TIP2 = 7.6;
const DIALS = [11.2, 11.6, 12.0], BAR_IN = 13.0, TURNS = [16.8, 18.0, 19.2];
const DROP = 23.6;
const DRILL = 28.0, HOLE = 29.6;
const STRIKE = 34.6, ASK = 35.5, ARROW = 36.4, ARRIVE = 37.6;
const SWIPES = [6.4, 20.7, 33.1];
const E = 46.85;
const IMPACTS = [[TIP1 + .45, 7], [TIP2 + .45, 9], ...DIALS.map((s, i) => [s + .3, 3 + i]), ...TURNS.map((s, i) => [s + .5, 4 + i * 2]),
  [DROP, 16], [DROP + .45, 5], [HOLE, 11], [STRIKE, 4], [ARRIVE, 11], [41.4, 12], [E + 1.2, 7]];
const KB = [[0, 6.4], [6.4, 20.7], [20.7, 33.1], [33.1, 46.8]];

cue(0, 'impact', { v: .6 }); cue(.02, 'pop', { f: 1 });
[.45, .6].forEach((x, i) => { cue(x, 'whoosh', { v: .25 }); cue(x + .15, 'blip', { n: [55, 62][i] }); });
[1.2, 1.6, 2.0, 2.4, 2.8, 3.2].forEach((x, i) => cue(x, 'tick', { f: i % 2 }));
cue(3.9, 'pop', { f: 1.2 }); cue(TIP1 - .1, 'whoosh', { v: .35 }); cue(TIP1 + .45, 'thud'); cue(TIP1 + .45, 'blip', { n: 60 }); cue(4.7, 'pop', { f: 1.2 });
SWIPES.forEach(x => cue(x - .3, 'whoosh', { v: 1 }));
cue(6.65, 'pop', { f: 1.2 }); cue(7.2, 'pop', { f: 1 });
cue(TIP2 - .1, 'swish'); cue(TIP2 + .45, 'thud'); cue(TIP2 + .45, 'chime', { n: 76 }); cue(TIP2 + .45, 'impact', { v: .7 }); cue(8.7, 'pop', { f: .9 });
cue(11.1, 'pop', { f: 1.2 });
DIALS.forEach((s, i) => { cue(s, 'whoosh', { v: .25 }); cue(s + .35, 'blip', { n: [60, 64, 67][i] }); cue(s + .4, 'tick', { f: 1 }); });
cue(BAR_IN, 'pop', { f: 1 }); cue(BAR_IN + .1, 'thud');
cue(16.2, 'pop', { f: 1.2 }); cue(17.0, 'pop', { f: .9 });
TURNS.forEach((s, i) => { cue(s, 'swish'); cue(s + .5, 'blip', { n: [72, 55, 76][i] }); cue(s + .5, i === 1 ? 'thud' : 'tick', { f: 2 }); });
cue(19.7, 'chime', { n: 79 });
cue(20.2, 'riser', { d: DROP - 20.2 }); cue(21.0, 'pop', { f: 1 });
for (let x = 22.6, k = 0; x < DROP - .05; x += .12 - k * .003, k++) cue(x, 'tick', { f: k % 2 });
cue(DROP - .4, 'whoosh', { v: .4 });
cue(DROP, 'boom', { v: 1 }); cue(DROP, 'chime', { n: 79 }); cue(DROP, 'impact', { v: 1 }); cue(DROP + .2, 'whoosh', { v: .4 }); cue(DROP + .45, 'thud');
cue(27.8, 'pop', { f: 1.2 }); cue(DRILL, 'swish'); cue(DRILL + .1, 'blip', { n: 55 });
for (let x = 29.0; x < HOLE - .02; x += .06) cue(x, 'tick', { f: 0 });
cue(HOLE, 'impact', { v: .9 }); cue(HOLE, 'chime', { n: 76 }); cue(HOLE + .1, 'pop', { f: 1.2 }); cue(HOLE + .35, 'knock', { v: .8 });
cue(33.3, 'pop', { f: 1 }); cue(STRIKE, 'swish'); cue(STRIKE + .1, 'thud'); cue(35.0, 'pop', { f: .9 }); cue(ASK, 'pop', { f: 1.2 });
for (let x = ARROW; x < ARRIVE - .1; x += .15) cue(x, 'tick', { f: 2 });
cue(ARRIVE, 'chime', { n: 74 }); cue(ARRIVE, 'thud'); cue(ARRIVE + .1, 'impact', { v: .8 });
cue(40.0, 'whoosh', { v: .35 }); cue(40.45, 'thud'); cue(41.4, 'impact', { v: .9 }); cue(42.35, 'swish'); cue(43.4, 'pop', { f: .9 });
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

/* gem and glass are anchored at their bottom centre */
function gem(x, y, s, lw) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-60, -70); ctx.lineTo(-36, -108); ctx.lineTo(36, -108); ctx.lineTo(60, -70); ctx.lineTo(0, 0); ctx.closePath();
  ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = (lw || 6) / s; ctx.lineJoin = 'round'; ctx.strokeStyle = C.ink; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-60, -70); ctx.lineTo(60, -70); ctx.moveTo(-18, -70); ctx.lineTo(0, 0); ctx.lineTo(18, -70);
  ctx.moveTo(-18, -70); ctx.lineTo(-36, -108); ctx.moveTo(18, -70); ctx.lineTo(36, -108); ctx.lineWidth = 3 / s; ctx.stroke();
  ctx.restore();
}
function glass(x, y, s, lw) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-42, -112); ctx.lineTo(42, -112); ctx.lineTo(32, 0); ctx.lineTo(-32, 0); ctx.closePath();
  ctx.fillStyle = 'rgba(58,52,44,0.12)'; ctx.fill();
  ctx.beginPath(); ctx.moveTo(-38.5, -80); ctx.lineTo(38.5, -80); ctx.lineTo(32, 0); ctx.lineTo(-32, 0); ctx.closePath(); ctx.fillStyle = 'rgba(184,137,58,0.35)'; ctx.fill();
  ctx.beginPath(); ctx.moveTo(-42, -112); ctx.lineTo(42, -112); ctx.lineTo(32, 0); ctx.lineTo(-32, 0); ctx.closePath();
  ctx.lineWidth = (lw || 6) / s; ctx.lineJoin = 'round'; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
}
function person(x, y, s, lw) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineWidth = (lw || 6) / s; ctx.strokeStyle = C.ink;
  ctx.beginPath(); ctx.arc(0, -150, 44, 0, Math.PI * 2); ctx.fillStyle = C.paper; ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-90, 0); ctx.bezierCurveTo(-90, -80, -50, -100, 0, -100); ctx.bezierCurveTo(50, -100, 90, -80, 90, 0); ctx.closePath();
  ctx.fillStyle = 'rgba(58,52,44,0.12)'; ctx.fill(); ctx.stroke(); ctx.restore();
}
function glow(x, y, r, a) {
  if (a <= 0) return;
  const g = ctx.createRadialGradient(x, y, 10, x, y, r);
  g.addColorStop(0, `rgba(221,182,95,${a})`); g.addColorStop(1, 'rgba(221,182,95,0)');
  ctx.fillStyle = g; ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
}

/* ---------- S1 and S2: one scale, two places (0 – 10.9) ---------- */
const PX = 540, PY = 520, BEAM = 330;
function scale(ang, pop) {
  ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = C.ink; ctx.lineWidth = 6;
  ctx.translate(PX, 820); ctx.scale(pop, pop); ctx.translate(-PX, -820);
  ctx.beginPath(); ctx.moveTo(PX, PY); ctx.lineTo(PX, 800); ctx.stroke();
  rr(PX - 110, 796, 220, 26, 10); ctx.fillStyle = C.paper; ctx.fill(); ctx.stroke();
  const ex = Math.cos(ang) * BEAM, ey = Math.sin(ang) * BEAM;
  ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(PX - ex, PY - ey); ctx.lineTo(PX + ex, PY + ey); ctx.stroke();
  const ends = [[PX - ex, PY - ey], [PX + ex, PY + ey]];
  ends.forEach(([x, y]) => {
    ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 110, y + 170); ctx.moveTo(x, y); ctx.lineTo(x + 110, y + 170); ctx.stroke();
    ctx.lineWidth = 6; ctx.beginPath(); ctx.ellipse(x, y + 170, 120, 34, 0, 0, Math.PI); ctx.closePath(); ctx.fillStyle = C.paper; ctx.fill(); ctx.stroke();
  });
  ctx.beginPath(); ctx.arc(PX, PY, 14, 0, Math.PI * 2); ctx.fillStyle = C.gold; ctx.fill(); ctx.lineWidth = 5; ctx.stroke();
  ctx.restore();
  return ends.map(([x, y]) => [x, y + 170]);
}
function scalePic(t, ang, pop, itemP) {
  const pans = scale(ang, pop);
  const gp = eback(prog(t, .45, .4)), wp = eback(prog(t, .6, .4));
  ctx.save();
  if (gp > 0 && itemP[0]) { ctx.translate(pans[0][0], pans[0][1] - 4); ctx.scale(gp, gp); gem(0, 0, 1.6); }
  ctx.restore(); ctx.save();
  if (wp > 0 && itemP[1]) { ctx.translate(pans[1][0], pans[1][1] - 4); ctx.scale(wp, wp); glass(0, 0, 1.6); }
  ctx.restore();
  return pans;
}
function scene1(t) {
  if (t > 6.6) return;
  line(t, 'Diamond or water?', W / 2, 215, { size: 84, start: -.62, stagger: .1, end: 3.7 });
  line(t, 'Which is worth more?', W / 2, 305, { size: 54, color: C.ink2, start: 1.0, stagger: .08, end: 3.7 });
  line(t, 'In a kitchen,', W / 2, 220, { size: 84, start: 3.9, stagger: .1, end: 5.95 });
  line(t, '[diamond] wins.', W / 2, 310, { size: 84, start: 4.7, stagger: .12, end: 5.95 });
  const out = 1 - eio(prog(t, 5.95, .35));
  const wob = .16 * Math.sin(t * 5.5) * eo(prog(t, .9, .5)) * (1 - eio(prog(t, TIP1 - .3, .35)));
  const ang = t < TIP1 - .3 ? wob : lerp(wob, -.2, eback(prog(t, TIP1, .5)));
  ctx.save(); ctx.globalAlpha = out;
  const pans = scalePic(t, ang, eio(prog(t, .2, .4)), [1, 1]);
  ring(t, TIP1 + .45, pans[0][0], pans[0][1] - 40, 40, 260, C.gold, .7, 10);
  burst(t, TIP1 + .45, pans[0][0], pans[0][1] - 60, 18, 17, C.goldL, 800, .8);
  ctx.restore();
}
function scene2(t) {
  if (t < 6.4 || t > 11) return;
  const end = 10.45, out = 1 - eio(prog(t, end, .35));
  line(t, 'In a desert,', W / 2, 220, { size: 84, start: 6.65, stagger: .1, end });
  line(t, '[water] wins.', W / 2, 310, { size: 84, start: 7.2, stagger: .12, end });
  line(t, 'Nothing about them changed.', W / 2, 905, { size: 46, color: C.ink2, start: 8.7, stagger: .07, end });
  const ang = lerp(-.2, .2, eback(prog(t, TIP2, .5)));
  ctx.save(); ctx.globalAlpha = out;
  const dp = eo(prog(t, 6.5, .5));
  ctx.strokeStyle = C.faint; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(72, 860); ctx.bezierCurveTo(300, 830, 420, 880, 540, 862); ctx.bezierCurveTo(700, 840, 820, 880, W - 72, 850); ctx.stroke();
  ctx.save(); ctx.translate(920, 440); ctx.globalAlpha *= dp; ctx.rotate(t * .25);
  ctx.beginPath(); ctx.arc(0, 0, 34, 0, Math.PI * 2); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke();
  for (let i = 0; i < 8; i++) { ctx.rotate(Math.PI / 4); ctx.beginPath(); ctx.moveTo(48, 0); ctx.lineTo(66, 0); ctx.stroke(); }
  ctx.restore();
  const pans = scalePic(t, ang, 1, [1, 1]);
  ring(t, TIP2 + .45, pans[1][0], pans[1][1] - 40, 40, 260, C.gold, .7, 10);
  burst(t, TIP2 + .45, pans[1][0], pans[1][1] - 60, 18, 29, C.goldL, 800, .8);
  ctx.restore();
}

/* ---------- S3 and S4: three dials, same rock (10.9 – 20.7) ---------- */
const DX = [230, 540, 850], DY = 590, DR = 130, NEEDLE_V = .5;
function dialV(i, t) { return i === 0 && t >= TURNS[0] ? lerp(.5, .95, eback(prog(t, TURNS[0], .5))) : i === 1 && t >= TURNS[1] ? lerp(.5, .1, eback(prog(t, TURNS[1], .5))) : i === 2 && t >= TURNS[2] ? lerp(.5, .9, eback(prog(t, TURNS[2], .5))) : NEEDLE_V; }
function scene3(t) {
  if (t < 10.9 || t > 20.8) return;
  const end = 20.25, out = 1 - eio(prog(t, end, .35));
  line(t, 'Three [dials] set value.', W / 2, 220, { size: 76, start: 11.1, stagger: .1, end: 15.55 });
  line(t, 'Turn one.', W / 2, 220, { size: 84, start: 16.2, stagger: .1, end });
  line(t, '[Value moves.]', W / 2, 310, { size: 84, start: 17.0, stagger: .12, end });
  ctx.save(); ctx.globalAlpha = out;
  const names = ['DESIRE', 'SCARCITY', 'CONTEXT'];
  let sum = 0;
  DX.forEach((x, i) => {
    const p = eback(prog(t, DIALS[i], .45)); if (p <= 0) return;
    sum += dialV(i, t);
    ctx.save(); ctx.translate(x, DY); ctx.scale(p, p); ctx.lineCap = 'round'; ctx.lineWidth = 6; ctx.strokeStyle = C.ink;
    ctx.beginPath(); ctx.arc(0, 0, DR, Math.PI, 2 * Math.PI); ctx.closePath(); ctx.fillStyle = 'rgba(58,52,44,0.08)'; ctx.fill(); ctx.stroke();
    ctx.lineWidth = 4;
    for (let k = 0; k <= 6; k++) { const a = Math.PI + k * Math.PI / 6; ctx.beginPath(); ctx.moveTo(Math.cos(a) * (DR - 6), Math.sin(a) * (DR - 6)); ctx.lineTo(Math.cos(a) * (DR - 20), Math.sin(a) * (DR - 20)); ctx.stroke(); }
    const sweep = eo(prog(t, DIALS[i] + .1, .6)), vv = lerp(0, dialV(i, t), sweep), a = Math.PI + vv * Math.PI;
    ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a) * (DR - 22), Math.sin(a) * (DR - 22)); ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 0, 13, 0, Math.PI * 2); ctx.fillStyle = C.gold; ctx.fill(); ctx.lineWidth = 4; ctx.stroke();
    ctx.restore();
    label(names[i], x, DY + 66, out * eo(prog(t, DIALS[i] + .2, .3)), C.ink, 26);
  });
  const avg = sum / 3, bp = eback(prog(t, BAR_IN, .45));
  if (bp > 0) {
    const bx = 320, bw = 620, by = 810;
    ctx.save(); ctx.translate(bx + bw / 2, by); ctx.scale(clamp(bp), clamp(bp)); ctx.translate(-bx - bw / 2, -by);
    rr(bx, by - 22, bw, 44, 22); ctx.fillStyle = 'rgba(58,52,44,0.12)'; ctx.fill();
    ctx.save(); rr(bx, by - 22, bw, 44, 22); ctx.clip();
    const fw = bw * clamp(avg) * eo(prog(t, BAR_IN + .1, .5)); ctx.fillStyle = C.gold; ctx.fillRect(bx, by - 22, fw, 44); ctx.restore();
    rr(bx, by - 22, bw, 44, 22); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
    label('VALUE', bx + 6, by - 44, out * eo(prog(t, BAR_IN + .2, .3)), C.goldText, 24, 'left');
    gem(190, by + 40, .75, 5);
    label('SAME ROCK', 190, by + 88, out * eo(prog(t, BAR_IN + .3, .3)), C.ink2, 24);
  }
  ctx.restore();
}

/* ---------- S5: value is in people (20.7 – 27.6) ---------- */
function scene5(t) {
  if (t < 20.7 || t > 27.7) return;
  const end = 27.1, out = 1 - eio(prog(t, end, .35)), GX = 290, GY = 790, HX = 760, HY = 790 - 150 * 1.7;
  line(t, 'Value isn’t in things.', W / 2, 220, { size: 76, start: 21.0, stagger: .09, end });
  line(t, '[It’s in people.]', W / 2, 315, { size: 92, start: DROP, stagger: .12, end });
  const gp = eback(prog(t, 21.2, .45)), pp = eback(prog(t, 21.5, .45)), wob = 5 * Math.sin(t * 70) * eo(prog(t, 22.6, .9)) * (1 - eo(prog(t, DROP, .15)));
  const orb = prog(t, DROP - .4, .4), after = eo(prog(t, DROP + .1, .6));
  ctx.save(); ctx.globalAlpha = out;
  ctx.strokeStyle = C.faint; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(72, 800); ctx.lineTo(W - 72, 800); ctx.stroke();
  if (gp > 0) {
    glow(GX, GY - 70, 230 * clamp(gp), .75 * (1 - after) * (orb < 1 ? 1 - orb * .5 : .5));
    ctx.save(); ctx.globalAlpha = out * lerp(1, .55, after); ctx.translate(GX + wob, GY); ctx.scale(gp, gp); gem(0, 0, 1.7); ctx.restore();
  }
  if (pp > 0) {
    glow(HX, HY, 300 * after + 1, .85 * after);
    ctx.save(); ctx.translate(HX, GY); ctx.scale(pp, pp); person(0, 0, 1.7); ctx.restore();
  }
  if (orb > 0 && orb < 1) {
    const q = eio(orb), ox = lerp(GX, HX, q), oy = lerp(GY - 70, HY, q) - 170 * Math.sin(Math.PI * q);
    ctx.beginPath(); ctx.arc(ox, oy, 24, 0, Math.PI * 2); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.gold; ctx.stroke();
  }
  star(HX - 130, HY - 40, 22, (.5 + .5 * Math.sin(t * 5)) * after);
  star(HX + 130, HY - 70, 16, (.5 + .5 * Math.sin(t * 5 + 2)) * after);
  ctx.restore();
  ring(t, DROP, HX, HY, 50, 520, C.gold, .8, 12);
  ring(t, DROP + .12, HX, HY, 30, 420, C.goldL, .7, 8);
  burst(t, DROP, HX, HY, 30, 313, C.goldL, 1000, .9);
}

/* ---------- S6: nobody buys a drill (27.6 – 33.1) ---------- */
function drill(x, y, s, shake) {
  ctx.save(); ctx.translate(x + shake, y); ctx.scale(s, s); ctx.lineWidth = 6 / s; ctx.strokeStyle = C.ink; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  rr(-120, -40, 180, 70, 22); ctx.fillStyle = C.goldL; ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-70, 30); ctx.lineTo(-60, 120); ctx.lineTo(-20, 120); ctx.lineTo(-10, 30); ctx.fillStyle = 'rgba(58,52,44,0.12)'; ctx.fill(); ctx.stroke();
  rr(60, -22, 34, 34, 6); ctx.fillStyle = C.paper; ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(94, -5); ctx.lineTo(160, -5); ctx.stroke();
  ctx.restore();
}
function scene6(t) {
  if (t < 27.6 || t > 33.2) return;
  const end = 32.65, out = 1 - eio(prog(t, end, .35));
  line(t, 'Nobody buys a [drill.]', W / 2, 220, { size: 80, start: 27.8, stagger: .1, end });
  line(t, 'They buy the [hole.]', W / 2, 315, { size: 80, start: HOLE - .15, stagger: .12, end });
  ctx.save(); ctx.globalAlpha = out;
  const wp = eio(prog(t, 28.0, .5));
  rr(540 - 400 * wp, 480, 800 * wp, 380, 18); ctx.fillStyle = 'rgba(58,52,44,0.07)'; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke();
  const dp = eback(prog(t, DRILL, .45)), dash = t > 29.0 && t < HOLE ? 6 * Math.sin(t * 90) : 0, fade = 1 - .65 * eo(prog(t, HOLE + .2, .5));
  const dx = 280 + 70 * eio(prog(t, 29.0, .55));
  if (dp > 0) { ctx.save(); ctx.globalAlpha = out * fade; drill(dx, 640, dp * 1.05, dash); ctx.restore(); }
  const hp = eback(prog(t, HOLE, .35));
  if (hp > 0) {
    ctx.save(); ctx.translate(760, 645); ctx.scale(hp, hp);
    glow(0, 0, 170, .7);
    ctx.beginPath(); ctx.arc(0, 0, 34, 0, Math.PI * 2); ctx.fillStyle = C.ink; ctx.fill(); ctx.lineWidth = 7; ctx.strokeStyle = C.gold; ctx.stroke();
    ctx.lineWidth = 5; ctx.lineCap = 'round';
    for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4 + t * .4, r0 = 58, r1 = 58 + 22 + 8 * Math.sin(t * 6 + i); ctx.beginPath(); ctx.moveTo(Math.cos(a) * r0, Math.sin(a) * r0); ctx.lineTo(Math.cos(a) * r1, Math.sin(a) * r1); ctx.stroke(); }
    ctx.restore();
  }
  ctx.restore();
  ring(t, HOLE, 760, 645, 40, 320, C.gold, .8, 10);
  burst(t, HOLE, 760, 645, 22, 604, C.goldL, 1000, .8);
}

/* ---------- S7: change, not things (33.1 – 40.3) ---------- */
function scene7(t) {
  if (t < 33.1 || t > 40.4) return;
  const end = 39.85, out = 1 - eio(prog(t, end, .35));
  const r1 = line(t, 'Stop asking: What can I make?', W / 2, 225, { size: 56, color: C.ink2, start: 33.3, stagger: .07, end });
  const u = eio(prog(t, STRIKE, .35)) * out;
  if (u > 0) { ctx.save(); ctx.strokeStyle = C.ink; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(r1.x0 - 12, 212); ctx.lineTo(r1.x0 - 12 + (r1.w + 24) * u, 212); ctx.stroke(); ctx.restore(); }
  line(t, 'Ask instead:', W / 2, 330, { font: 'sans', size: 44, color: C.ink2, start: 35.0, stagger: .07, end });
  line(t, 'What can I [change]', W / 2, 420, { size: 74, start: ASK, stagger: .08, end });
  line(t, 'for someone?', W / 2, 500, { size: 74, start: ASK + .4, stagger: .08, end });
  ctx.save(); ctx.globalAlpha = out;
  const ap = prog(t, 35.6, .5), ax = 250, bx = 830, ay = 740;
  const cr = eback(ap);
  if (cr > 0) { ctx.save(); ctx.translate(ax, ay); ctx.scale(cr, cr); ctx.beginPath(); ctx.arc(0, 0, 52, 0, Math.PI * 2); ctx.lineWidth = 7; ctx.strokeStyle = C.ink; ctx.setLineDash([2, 14]); ctx.lineCap = 'round'; ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
  const pr = eio(prog(t, ARROW, ARRIVE - ARROW));
  if (pr > 0) {
    const cxp = (ax + bx) / 2, cyp = ay - 190, N = 60;
    ctx.strokeStyle = C.goldText; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath();
    for (let k = 0; k <= N * pr; k++) { const s = k / N, px = (1 - s) * (1 - s) * (ax + 52) + 2 * s * (1 - s) * cxp + s * s * (bx - 62), py = (1 - s) * (1 - s) * (ay - 20) + 2 * s * (1 - s) * cyp + s * s * (ay - 20); if (k) ctx.lineTo(px, py); else ctx.moveTo(px, py); }
    ctx.stroke();
  }
  const bp = eback(prog(t, ARRIVE - .05, .45));
  if (bp > 0) {
    ctx.save(); ctx.translate(bx, ay); ctx.scale(bp, bp); glow(0, 0, 150, .8);
    ctx.beginPath(); ctx.arc(0, 0, 52, 0, Math.PI * 2); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 7; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
    star(bx + 90, ay - 70, 20, .5 + .5 * Math.sin(t * 5)); star(bx - 80, ay - 80, 14, .5 + .5 * Math.sin(t * 5 + 2));
  }
  ctx.restore();
  ring(t, ARRIVE, bx, ay, 40, 300, C.gold, .8, 10);
  burst(t, ARRIVE, bx, ay, 22, 707, C.goldL, 1000, .8);
}

/* ---------- S8: takeaway (40.3 – 47.1) ---------- */
function scene8(t) {
  if (t < 40.3 || t > 47.1) return;
  const end = 46.7, out = 1 - eio(prog(t, end, .35));
  const gp = eback(prog(t, 40.5, .45));
  if (gp > 0) {
    ctx.save(); ctx.globalAlpha = out; ctx.translate(W / 2, 340); ctx.scale(gp, gp); glow(0, -60, 170, .7); glass(0, 0, 1.45); ctx.restore();
    star(W / 2 + 100, 250, 22, (.5 + .5 * Math.sin(t * 5)) * out * gp); star(W / 2 - 90, 280, 15, (.5 + .5 * Math.sin(t * 5 + 2)) * out * gp);
  }
  line(t, 'The change is', W / 2, 500, { size: 100, start: 40.65, stagger: .1, end });
  const r = line(t, '[the product.]', W / 2, 625, { size: 100, start: 41.4, stagger: .1, end });
  const u = eio(prog(t, 42.35, .4)) * out;
  if (u > 0) { ctx.fillStyle = C.gold; ctx.fillRect(r.x0, 661, r.w * u, 9); }
  line(t, 'Now go find someone thirsty.', W / 2, 790, { size: 50, color: C.ink2, start: 43.4, stagger: .07, end });
  burst(t, 41.5, W / 2, 595, 24, 707, C.goldL, 1100, .9);
}

/* ---------- S9: end card (47.1 – 53) ---------- */
function scene9(t) {
  if (t < E - .05) return;
  const rp = eio(prog(t, E, .55));
  ctx.fillStyle = C.night; ctx.beginPath(); ctx.arc(W / 2, 600, 1300 * rp, 0, Math.PI * 2); ctx.fill();
  if (rp < 1) return;
  const gp = eio(prog(t, E + .9, .4));
  ctx.fillStyle = C.cream; ctx.globalAlpha = .7; ctx.fillRect(W / 2 - 120 * gp, 186, 240 * gp, 4); ctx.globalAlpha = 1;
  const p1 = eback(prog(t, E + .95, .4)), p2 = eback(prog(t, E + 1.05, .4));
  if (p1 > 0) {
    ctx.save(); ctx.translate(W / 2 - 62, 300); ctx.scale(p1, p1); ctx.globalAlpha = .6; ctx.lineJoin = 'round'; ctx.strokeStyle = C.cream; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(-40, -46); ctx.lineTo(-24, -70); ctx.lineTo(24, -70); ctx.lineTo(40, -46); ctx.lineTo(0, 0); ctx.closePath(); ctx.stroke(); ctx.restore();
  }
  if (p2 > 0) {
    ctx.save(); ctx.translate(W / 2 + 62, 296); ctx.scale(p2, p2); ctx.beginPath(); ctx.moveTo(0, -78); ctx.bezierCurveTo(8, -56, 30, -36, 30, -16);
    ctx.arc(0, -16, 30, 0, Math.PI, false); ctx.bezierCurveTo(-30, -36, -8, -56, 0, -78); ctx.fillStyle = C.goldL; ctx.fill(); ctx.restore();
  }
  ring(t, E + 1.2, W / 2 + 62, 250, 30, 300, C.goldL, .8, 8);
  const rows = ['Chapter 1:', 'What ‘Value’ Actually Means'], sz = Math.min(...rows.map(r => fit(r, 900, 72, 'serif'))), ry = 520 + rows.length * 78 - 30;
  line(t, 'Value, Created —', W / 2, 430, { size: 88, color: C.cream, start: E + 1.15, stagger: .1 });
  rows.forEach((r, i) => line(t, '[' + r + ']', W / 2, 520 + i * 78, { size: sz, goldColor: C.goldL, start: E + 1.6 + i * .2, stagger: .06 }));
  const lp = eio(prog(t, E + 2.15, .45));
  ctx.fillStyle = C.goldL; ctx.fillRect(W / 2 - 70 * lp, ry, 140 * lp, 4);
  line(t, 'Full 11-minute episode — link in comments', W / 2, ry + 90, { font: 'sans', size: fit('Full 11-minute episode — link in comments', 936, 44, 'sans'), color: C.cream, start: E + 2.55, stagger: .05 });
  ctx.save(); ctx.globalAlpha = .6 * eo(prog(t, E + 3.35, .5));
  ctx.font = font('sans', 24, 700); ctx.letterSpacing = '5px'; ctx.textAlign = 'center'; ctx.fillStyle = C.cream;
  ctx.fillText('A FREE AUDIOBOOK · PRODUCED BY THE JOY DIGI', W / 2 + 2.5, 980);
  ctx.restore();
}

const SCENES = [scene1, scene2, scene3, scene5, scene6, scene7, scene8];
const END_CARD = scene9;
