/* Value, Created Ch 30 LinkedIn infographic: chapter config and scenes for ../_engine (design time; WARP maps real time onto it). */
const CHAPTER = 30, KICKER_END = 46.65, BAR_END = 46.75;
const WARP = [[0, 0], [6.4, 4.5], [12.4, 8.7], [21.4, 15.1], [27.4, 19.3], [34.6, 24.4], [40.6, 28.8], [46.85, 33.2], [53, 38]];
/* ---------- timeline constants shared by visuals and cues ---------- */
const BLK0 = .5, BLK_DT = .15, BLK_N = 16, EQ = 3.4;
const FAX = 7.6, GOLD = 8.8, PROB = 10.0;
const BAR0 = 13.0, BAR_DT = .2, SLOT = 14.9, ZERO = 15.5, DROP = 18.0;
const BOX = [22.4, 23.5, 24.6];
const CHK = [29.4, 30.8, 32.2];
const RING0 = 36.4, MARK = 38.0;
const T0 = 41.0;
const SWIPES = [6.4, 21.4, 34.6];
const E = 46.85;
const IMPACTS = [[EQ, 5], [FAX + .25, 6], [GOLD + .5, 8], [PROB, 11], [ZERO, 13], [DROP, 16], [DROP + .45, 5], ...BOX.map((s, i) => [s + .5, 4 + i * 2]),
  ...CHK.map(s => [s + .6, 4]), [MARK, 7], [T0 + 1.4, 12], [E + 1.2, 7]];
const KB = [[0, 6.4], [6.4, 21.4], [21.4, 34.6], [34.6, 46.8]];

cue(0, 'impact', { v: .6 }); cue(.02, 'pop', { f: 1 });
for (let i = 0; i < BLK_N; i += 1) if (i % 2 === 0) cue(BLK0 + i * BLK_DT, 'tick', { f: (i / 2) % 2 });
[BLK0 + 4 * BLK_DT, BLK0 + 10 * BLK_DT, BLK0 + 15 * BLK_DT].forEach((x, i) => cue(x + .02, 'blip', { n: [55, 59, 64][i] }));
cue(EQ - .05, 'whoosh', { v: .3 }); cue(EQ, 'thud'); cue(EQ + .02, 'chime', { n: 72 }); cue(4.5, 'pop', { f: 1 });
SWIPES.forEach(x => cue(x - .3, 'whoosh', { v: 1 }));
cue(6.65, 'pop', { f: 1.2 }); cue(FAX - .15, 'whoosh', { v: .3 }); cue(FAX + .25, 'thud'); cue(FAX + .3, 'blip', { n: 52 }); cue(FAX + .6, 'drain', { d: .9 });
cue(GOLD - .1, 'whoosh', { v: .35 }); cue(GOLD + .5, 'impact', { v: .7 }); cue(GOLD + .5, 'chime', { n: 76 });
cue(9.7, 'pop', { f: 1.2 }); cue(PROB, 'impact', { v: .9 }); cue(PROB, 'chime', { n: 79 }); cue(PROB + .1, 'pop', { f: 1.2 });
cue(12.55, 'pop', { f: 1.2 });
for (let i = 0; i < 7; i++) { cue(BAR0 + i * BAR_DT, 'tick', { f: 2 }); cue(BAR0 + i * BAR_DT + .02, 'blip', { n: [55, 59, 62, 64, 67, 71, 74][i] }); }
cue(SLOT, 'pop', { f: 1 }); cue(ZERO - .2, 'whoosh', { v: .3 }); cue(ZERO, 'impact', { v: .9 }); cue(ZERO, 'thud'); cue(ZERO + .05, 'drain', { d: .8 }); cue(ZERO + .1, 'pop', { f: 1.1 });
cue(16.4, 'riser', { d: DROP - 16.4 });
for (let x = 16.9, k = 0; x < DROP - .05; x += .15 - k * .006, k++) cue(x, 'tick', { f: k % 2 });
cue(DROP, 'boom', { v: 1 }); cue(DROP, 'chime', { n: 79 }); cue(DROP, 'impact', { v: 1 }); cue(DROP + .15, 'whoosh', { v: .4 });
for (let i = 0; i < 7; i++) cue(DROP + .1 + i * .05, 'blip', { n: [60, 64, 67, 71, 74, 76, 79][i] });
cue(21.0, 'swish');
cue(21.65, 'pop', { f: 1.2 });
BOX.forEach((s, i) => { cue(s - .1, 'whoosh', { v: .25 }); cue(s + .5, 'thud'); cue(s + .5, 'chime', { n: [67, 72, 76][i] }); });
cue(27.65, 'pop', { f: 1.2 });
CHK.forEach((s, i) => { cue(s, 'pop', { f: 1 }); cue(s + .6, 'blip', { n: [64, 67, 72][i] }); cue(s + .6, 'tick', { f: 2 }); });
cue(CHK[2] + .65, 'chime', { n: 79 });
cue(34.9, 'pop', { f: 1.2 });
for (let i = 0; i < 6; i++) cue(RING0 + i * .18, 'tick', { f: i % 2 });
cue(37.0, 'pop', { f: 1 }); cue(MARK - .2, 'riser', { d: .2 }); cue(MARK, 'impact', { v: .8 }); cue(MARK, 'chime', { n: 76 });
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
function fax(x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineWidth = 5 / s; ctx.strokeStyle = C.ink; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  ctx.save(); ctx.translate(-20, -50); ctx.rotate(-.1); rr(-40, -55, 80, 62, 4); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-26, -38); ctx.lineTo(26, -38); ctx.moveTo(-26, -24); ctx.lineTo(10, -24); ctx.stroke(); ctx.restore();
  rr(-85, -52, 170, 52, 10); ctx.fillStyle = C.fill; ctx.fill(); ctx.stroke();
  ctx.fillStyle = C.faint; for (let k = 0; k < 4; k++) { rr(-62 + k * 22, -36, 16, 12, 3); ctx.fill(); }
  ctx.beginPath(); ctx.moveTo(30, -18); ctx.lineTo(72, -18); ctx.strokeStyle = C.cream; ctx.stroke();
  ctx.restore();
}

/* ---------- S1 + S2: two builders, one problem each (0 – 12.4) ---------- */
const TX = [300, 780], BASE = 900, BH = 20, BG = 5;
function tower(t, x, fill, alpha, gold) {
  for (let i = 0; i < BLK_N; i++) {
    const p = eback(prog(t, BLK0 + i * BLK_DT, .25)); if (p <= 0) continue;
    const y = BASE - (i + 1) * (BH + BG) + BG;
    ctx.save(); ctx.globalAlpha *= alpha;
    rr(x - 75 * p, y + BH * (1 - p) / 2, 150 * p, BH * p, 5);
    if (gold > 0) { ctx.fillStyle = C.fill; ctx.fill(); ctx.globalAlpha *= clamp((gold * (BLK_N + 4) - (i + 2)) / 3); ctx.fillStyle = i % 3 === 2 ? C.gold : C.goldL; ctx.fill(); } else { ctx.fillStyle = fill; ctx.fill(); }
    ctx.restore();
  }
}
function scene12(t) {
  if (t > 12.5) return;
  const out1 = 1 - eio(prog(t, 5.95, .35));
  line(t, 'Two builders.', W / 2, 215, { size: 84, start: -.62, stagger: .12, end: 5.95 });
  line(t, 'Same [16-hour days.]', W / 2, 305, { size: 80, start: -.4, stagger: .1, end: 5.95 });
  if (t < 6.4) {
    ctx.save(); ctx.globalAlpha = out1;
    TX.forEach(x => { ctx.fillStyle = C.faint; ctx.fillRect(x - 100, BASE + 8, 200, 4); tower(t, x, C.fill, 1, 0); });
    const ep = eback(prog(t, EQ, .4));
    if (ep > 0) { ctx.save(); ctx.translate(540, 700); ctx.scale(ep, ep); ctx.font = font('serif', 150); ctx.textAlign = 'center'; ctx.fillStyle = C.goldText; ctx.fillText('=', 0, 40); ctx.restore(); }
    ctx.restore();
    ring(t, EQ, 540, 700, 40, 280, C.gold, .7, 8);
    return;
  }
  const end = 11.95, out = 1 - eio(prog(t, end, .35));
  line(t, 'Not the effort.', W / 2, 215, { size: 84, start: 6.7, stagger: .1, end });
  line(t, 'The [problem] they chose.', W / 2, 305, { size: fit('The problem they chose.', 900, 78, 'serif'), start: PROB, stagger: .12, end });
  ctx.save(); ctx.globalAlpha = out;
  const fp = eo(prog(t, FAX, .5)), gp = eio(prog(t, GOLD, .9));
  ctx.fillStyle = C.faint; TX.forEach(x => ctx.fillRect(x - 100, BASE + 8, 200, 4));
  tower(t, TX[0], C.fill, 1 - .6 * fp, 0);
  tower(t, TX[1], C.fill, 1, gp);
  const fy = BASE - BLK_N * (BH + BG) + BG, ap = eback(prog(t, FAX, .45));
  if (ap > 0) { ctx.save(); ctx.globalAlpha = out * clamp(ap); ctx.translate(TX[0], fy - 70 * (1 - clamp(ap))); fax(0, 0, 1.0 * ap); ctx.restore(); }
  [-52, 0, 52].forEach((dx, i) => { const pp = eback(prog(t, GOLD + .5 + i * .12, .4)); if (pp > 0) person(TX[1] + dx, fy - 22, pp * .95, i === 1 ? C.gold : C.goldL); });
  if (gp > 0) {
    const g = ctx.createRadialGradient(TX[1], 660, 30, TX[1], 660, 330); g.addColorStop(0, `rgba(221,182,95,${.4 * gp})`); g.addColorStop(1, 'rgba(221,182,95,0)');
    ctx.fillStyle = g; ctx.fillRect(TX[1] - 330, 330, 660, 660);
  }
  ctx.restore();
  label('FAX ACCESSORY, 2006', TX[0], BASE + 58, out * eo(prog(t, FAX + .4, .3)), C.ink2, 24);
  label('A DECADE, STEADY', TX[1], BASE + 58, out * eo(prog(t, GOLD + .8, .3)), C.goldText, 24);
  ring(t, GOLD + .5, TX[1], 520, 40, 300, C.gold, .7, 10);
  burst(t, GOLD + .5, TX[1], 520, 18, 41, C.goldL, 800, .8);
  ring(t, PROB, 540, 300, 60, 480, C.gold, .6, 10);
}

/* ---------- S3: a multiplier times zero (12.4 – 21.4) ---------- */
const BARX = i => 100 + i * 76, BAR_B = 840, BAR_H = [110, 150, 130, 190, 170, 230, 270], SLOTC = [815, 650];
function scene3(t) {
  if (t < 12.4 || t > 21.5) return;
  const end = 20.95, out = 1 - eio(prog(t, end, .35));
  line(t, 'Every tool is a [multiplier.]', W / 2, 220, { size: fit('Every tool is a multiplier.', 900, 74, 'serif'), start: 12.55, stagger: .09, end });
  line(t, 'Wrong one? [Zero.]', W / 2, 310, { size: 76, start: ZERO, stagger: .12, end: DROP - .4 });
  line(t, 'Right one? [Everything works.]', W / 2, 310, { size: fit('Right one? Everything works.', 900, 72, 'serif'), start: DROP, stagger: .08, end });
  ctx.save(); ctx.globalAlpha = out;
  for (let i = 0; i < 7; i++) {
    const rise = eback(prog(t, BAR0 + i * BAR_DT, .45)); if (rise <= 0) continue;
    const z = eio(prog(t, ZERO, .25)), up = t >= DROP ? 1.12 * eback(prog(t, DROP + i * .05, .5)) : 0;
    const f = t < ZERO ? rise : t < DROP ? rise * (1 - z) : up, h = Math.max(6, BAR_H[i] * f), alive = t < ZERO || t >= DROP;
    const bx = BARX(i), by = BAR_B - h;
    rr(bx, by, 56, h, 10);
    if (alive) { const g = ctx.createLinearGradient(0, by, 0, BAR_B); g.addColorStop(0, C.goldL); g.addColorStop(1, C.gold); ctx.fillStyle = g; } else ctx.fillStyle = C.ink2;
    ctx.fill();
    burst(t, DROP + .1 + i * .05, bx + 28, by, 6, 70 + i * 9, C.goldL, 500, .6);
  }
  ctx.fillStyle = C.faint; ctx.fillRect(86, BAR_B + 4, 540, 4);
  const sp = eback(prog(t, SLOT, .4));
  if (sp > 0) {
    const flip = eio(prog(t, DROP, .3)), shake = t > 16.4 && t < DROP ? 5 * Math.sin(t * 80) : 0, sx = Math.abs(Math.cos(flip * Math.PI)) * (1 - .05 * 0);
    ctx.save(); ctx.translate(SLOTC[0] + shake, SLOTC[1]); ctx.scale(sp, sp);
    ctx.save(); ctx.scale(Math.max(.05, sx), 1);
    rr(-80, -80, 160, 160, 26); ctx.fillStyle = flip > .5 ? C.gold : '#FFFBF3'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
    ctx.font = font('serif', 110); ctx.textAlign = 'center'; ctx.fillStyle = flip > .5 ? C.cream : C.ink;
    if (flip > .5) { ctx.beginPath(); ctx.moveTo(-40, 4); ctx.lineTo(-10, 36); ctx.lineTo(44, -34); ctx.strokeStyle = C.cream; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke(); }
    else ctx.fillText(t < ZERO ? '?' : '0', 0, 38);
    ctx.restore(); ctx.restore();
    ctx.save(); ctx.globalAlpha = out * eo(prog(t, SLOT, .3)); ctx.font = font('serif', 90); ctx.textAlign = 'center'; ctx.fillStyle = C.ink2; ctx.fillText('×', 700, SLOTC[1] + 30); ctx.restore();
    label('YOUR PROBLEM', SLOTC[0], SLOTC[1] + 130, out * eo(prog(t, SLOT + .15, .3)), t >= DROP ? C.goldText : C.ink2, 24);
  }
  ctx.restore();
  ring(t, DROP, SLOTC[0], SLOTC[1], 60, 560, C.gold, .8, 12);
  ring(t, DROP + .12, 330, 700, 40, 420, C.goldL, .7, 8);
  burst(t, DROP, SLOTC[0], SLOTC[1], 28, 313, C.goldL, 1000, .9);
}

/* ---------- S4: good problems look boring (21.4 – 27.4) ---------- */
function scene4(t) {
  if (t < 21.4 || t > 27.5) return;
  const end = 26.85, out = 1 - eio(prog(t, end, .35));
  line(t, 'Good problems look [boring.]', W / 2, 225, { size: fit('Good problems look boring.', 900, 78, 'serif'), start: 21.65, stagger: .1, end });
  const names = [['FREIGHT', 'INVOICES'], ['DENTAL', 'SCHEDULING'], ['PLUMBING', 'SUPPLY']];
  ctx.save(); ctx.globalAlpha = out;
  names.forEach((nm, i) => {
    const x = 105 + i * 300, y = 500, w = 270, h = 280, p = eback(prog(t, 22.0 + i * .2, .4)), op = eio(prog(t, BOX[i], .6));
    if (p <= 0) return;
    ctx.save(); ctx.translate(x + w / 2, y + h); ctx.scale(p, p); ctx.translate(-x - w / 2, -y - h);
    rr(x, y, w, h, 20); ctx.fillStyle = 'rgba(58,52,44,0.12)'; ctx.fill();
    if (op > 0) {
      ctx.save(); rr(x, y, w, h, 20); ctx.clip();
      const g = ctx.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, C.goldL); g.addColorStop(1, C.gold);
      ctx.fillStyle = g; ctx.fillRect(x, y + h * (1 - op), w, h * op); ctx.restore();
    }
    rr(x, y, w, h, 20); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
    ctx.save(); ctx.font = font('sans', 26, 700); ctx.letterSpacing = '5px'; ctx.textAlign = 'center'; ctx.fillStyle = C.ink;
    ctx.fillText(nm[0], x + w / 2 + 2.5, y + h / 2 - 8); ctx.fillText(nm[1], x + w / 2 + 2.5, y + h / 2 + 30); ctx.restore();
    ctx.restore();
    ring(t, BOX[i] + .5, x + w / 2, y + h / 2, 40, 260, C.gold, .7, 9);
    burst(t, BOX[i] + .5, x + w / 2, y + h / 2, 16, 90 + i * 31, C.goldL, 700, .7);
  });
  ctx.restore();
}

/* ---------- S5: pass all three (27.4 – 34.6) ---------- */
function scene5(t) {
  if (t < 27.4 || t > 34.7) return;
  const end = 34.05;
  line(t, 'Pass all [three.]', W / 2, 250, { size: 88, start: 27.65, stagger: .12, end });
  ['Do they pay for workarounds?', 'Does it grow if ignored?', 'Can you start small?'].forEach((q, i) => {
    const s = CHK[i], y = 470 + i * 150, np = eback(prog(t, s, .3)) * (1 - eio(prog(t, end, .3)));
    if (np > 0) {
      ctx.save(); ctx.translate(165, y - 20); ctx.scale(np, np);
      rr(-42, -42, 84, 84, 18); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
      const cp = eio(prog(t, s + .6, .3));
      if (cp > 0) {
        ctx.lineWidth = 12; ctx.strokeStyle = C.gold; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        ctx.beginPath(); ctx.moveTo(-22, 2); ctx.lineTo(lerp(-22, -6, clamp(cp * 2)), lerp(2, 20, clamp(cp * 2)));
        if (cp > .5) ctx.lineTo(lerp(-6, 26, (cp - .5) * 2), lerp(20, -26, (cp - .5) * 2));
        ctx.stroke();
      }
      ctx.restore();
    }
    line(t, q, 225, y, { size: 56, align: 'left', start: s + .1, stagger: .06, end });
    ring(t, s + .6, 165, y - 20, 30, 150, C.gold, .6, 8);
    burst(t, s + .6, 165, y - 20, 10, 130 + i * 17, C.goldL, 450, .6);
  });
}

/* ---------- S6: worth the years (34.6 – 40.6) ---------- */
function scene6(t) {
  if (t < 34.6 || t > 40.7) return;
  const end = 40.15, out = 1 - eio(prog(t, end, .35));
  line(t, 'Worth three years', W / 2, 220, { size: 80, start: 34.9, stagger: .1, end });
  line(t, 'of [mornings?]', W / 2, 310, { size: 84, start: 35.35, stagger: .1, end });
  line(t, 'Five or six real bets.', W / 2, 470, { size: 54, color: C.ink2, start: 37.0, stagger: .08, end });
  ctx.save(); ctx.globalAlpha = out;
  for (let i = 0; i < 6; i++) {
    const x = 165 + i * 150, y = 700, p = eback(prog(t, RING0 + i * .18, .35)); if (p <= 0) continue;
    const mk = eback(prog(t, MARK, .35)), cur = i === 2;
    ctx.save(); ctx.translate(x, y); ctx.scale(p, p);
    ctx.beginPath(); ctx.arc(0, 0, 58, 0, Math.PI * 2);
    if (i < 2) { ctx.fillStyle = C.fill; ctx.fill(); } else if (cur && mk > 0) { ctx.save(); ctx.scale(mk, mk); ctx.beginPath(); ctx.arc(0, 0, 58, 0, Math.PI * 2); ctx.fillStyle = C.gold; ctx.fill(); ctx.restore(); }
    ctx.beginPath(); ctx.arc(0, 0, 58, 0, Math.PI * 2); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
    ctx.restore();
  }
  const pl = t > MARK ? 1 + .12 * Math.sin((t - MARK) * 6) : 0;
  if (pl) { ctx.beginPath(); ctx.arc(165 + 300, 700, 76 * pl, 0, Math.PI * 2); ctx.lineWidth = 5; ctx.strokeStyle = C.goldText; ctx.globalAlpha = out * .6; ctx.stroke(); }
  ctx.restore();
  ring(t, MARK, 465, 700, 50, 300, C.gold, .7, 10);
  burst(t, MARK, 465, 700, 16, 211, C.goldL, 800, .8);
}

/* ---------- S7: takeaway (40.6 – 46.85) ---------- */
function scene7(t) {
  if (t < 40.6 || t > 47) return;
  const end = 46.5;
  line(t, 'Only you can choose', W / 2, 420, { size: 88, start: T0 + .1, stagger: .09, end });
  const r = line(t, '[what’s worth building.]', W / 2, 550, { size: fit('what’s worth building.', 900, 88, 'serif'), start: T0 + 1.4, stagger: .1, end });
  const u = eio(prog(t, T0 + 2.4, .4)) * (1 - eio(prog(t, end, .35)));
  if (u > 0) { ctx.fillStyle = C.gold; ctx.fillRect(r.x0, 586, r.w * u, 9); }
  line(t, 'Choose like your life depends on it.', W / 2, 740, { size: 44, color: C.ink2, start: T0 + 3.1, stagger: .07, end });
  burst(t, T0 + 1.5, W / 2, 520, 24, 707, C.goldL, 1100, .9);
}

/* ---------- S8: end card (46.85 – 53) ---------- */
function scene8(t) {
  if (t < E - .05) return;
  const rp = eio(prog(t, E, .55));
  ctx.fillStyle = C.night; ctx.beginPath(); ctx.arc(W / 2, 600, 1300 * rp, 0, Math.PI * 2); ctx.fill();
  if (rp < 1) return;
  const mp = eback(prog(t, E + .95, .4));
  if (mp > 0) {
    ctx.save(); ctx.translate(W / 2, 258); ctx.scale(mp, mp); ctx.strokeStyle = C.goldL; ctx.lineWidth = 5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(0, 0, 56, 0, Math.PI * 2); ctx.stroke();
    [0, 1, 2, 3].forEach(k => { const a = k * Math.PI / 2; ctx.beginPath(); ctx.moveTo(Math.cos(a) * 56, Math.sin(a) * 56); ctx.lineTo(Math.cos(a) * 44, Math.sin(a) * 44); ctx.stroke(); });
    ctx.rotate(Math.sin((t - E) * 2.2) * .6 + .4);
    ctx.fillStyle = C.goldL; ctx.beginPath(); ctx.moveTo(0, -38); ctx.lineTo(9, 0); ctx.lineTo(0, 38); ctx.lineTo(-9, 0); ctx.closePath(); ctx.fill();
    ctx.fillStyle = C.cream; ctx.beginPath(); ctx.moveTo(0, -38); ctx.lineTo(9, 0); ctx.lineTo(-9, 0); ctx.closePath(); ctx.fill();
    ctx.restore();
  }
  line(t, 'Value, Created —', W / 2, 440, { size: 88, color: C.cream, start: E + 1.15, stagger: .1 });
  line(t, '[Chapter 30: Choosing What to Build]', W / 2, 535, { size: fit('Chapter 30: Choosing What to Build', 900, 66, 'serif'), goldColor: C.goldL, start: E + 1.6, stagger: .06 });
  const lp = eio(prog(t, E + 2.15, .45));
  ctx.fillStyle = C.goldL; ctx.fillRect(W / 2 - 70 * lp, 590, 140 * lp, 4);
  line(t, 'Full 6-minute episode — link in comments', W / 2, 680, { font: 'sans', size: 38, color: C.cream, start: E + 2.55, stagger: .05 });
  ctx.save(); ctx.globalAlpha = .6 * eo(prog(t, E + 3.35, .5));
  ctx.font = font('sans', 22, 700); ctx.letterSpacing = '5px'; ctx.textAlign = 'center'; ctx.fillStyle = C.cream;
  ctx.fillText('A FREE AUDIOBOOK · PRODUCED BY THE JOY DIGI', W / 2 + 2.5, 980);
  ctx.restore();
}

const SCENES = [scene12, scene3, scene4, scene5, scene6, scene7];
const END_CARD = scene8;
