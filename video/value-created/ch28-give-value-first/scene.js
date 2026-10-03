/* Value, Created Ch 28 LinkedIn infographic: chapter config and scenes for ../_engine (design time; WARP maps real time onto it). */
const CHAPTER = 28, KICKER_END = 46.65, BAR_END = 46.75;
const WARP = [[0, 0], [6.4, 4.5], [14.2, 10], [21, 14.8], [34, 24], [40.7, 28.8], [46.85, 33.2], [53, 38]];
/* ---------- timeline constants shared by visuals and cues ---------- */
const QA = [.45, 1.2, 1.95, 2.7];
const DEP0 = 7.1, DEP_N = 48, ZERO = 10.9;
const dep = i => DEP0 + 3.5 * Math.pow(i / DEP_N, .6);
const ASK = 14.5, POST = 15.3, DROP = 17.4;
const SC_L = 22.0, SC_R = 23.4, LAND_L = SC_L + .35, LAND_R = SC_R + .35;
const GIFT = 28.2, HOOK = 29.4, UNHOOK = 31.5;
const MV = [35.0, 36.0, 37.0, 38.0];
const T0 = 40.7;
const SWIPES = [6.4, 21, 34];
const E = 46.85;
const IMPACTS = [[QA[3] + .4, 4], [ZERO + .05, 12], [DROP, 16], [DROP + .4, 5], [LAND_L, 3], [LAND_R, 11], [UNHOOK + .05, 9],
  ...MV.map((s, i) => [s + .15, 3 + i]), [T0 + 1.3, 12], [E + 1.2, 7]];
const KB = [[0, 6.4], [6.4, 21], [21, 34], [34, 46.8]];

cue(0, 'impact', { v: .6 }); cue(.02, 'pop', { f: 1 });
QA.forEach((x, i) => { cue(x, 'pop', { f: 1 }); cue(x + .3, 'blip', { n: [60, 64, 67, 72][i] }); cue(x + .3, 'tick', { f: 2 }); });
cue(QA[3] + .4, 'thud'); cue(3.9, 'pop', { f: 1.2 }); cue(4.5, 'swish');
SWIPES.forEach(x => cue(x - .3, 'whoosh', { v: 1 }));
cue(6.65, 'pop', { f: 1.2 }); cue(6.95, 'whoosh', { v: .25 });
for (let i = 0; i < DEP_N; i += 2) cue(dep(i), 'tick', { f: (i / 2) % 2 });
for (let i = 0; i < DEP_N; i += 12) cue(dep(i) + .03, 'blip', { n: 55 + i / 3 | 0 });
cue(ZERO - .6, 'riser', { d: .6 }); cue(ZERO, 'impact', { v: .9 }); cue(ZERO, 'thud'); cue(ZERO + .1, 'pop', { f: 1.2 });
cue(14.4, 'pop', { f: 1.2 }); cue(POST - .15, 'whoosh', { v: .3 }); cue(POST + .1, 'pop', { f: 1 });
cue(POST + .3, 'riser', { d: DROP - POST - .3 });
for (let x = 16.3, k = 0; x < DROP - .05; x += .14 - k * .004, k++) cue(x, 'tick', { f: k % 2 });
cue(DROP, 'boom', { v: 1 }); cue(DROP, 'chime', { n: 79 }); cue(DROP, 'impact', { v: 1 }); cue(DROP + .2, 'whoosh', { v: .4 });
[0, 1, 2, 3, 4, 5].forEach(i => cue(DROP + .1 + i * .09, 'blip', { n: [67, 71, 74, 79, 72, 76][i] }));
cue(21.2, 'pop', { f: 1.2 });
cue(SC_L - .05, 'whoosh', { v: .3 }); cue(LAND_L, 'thud'); cue(LAND_L + .02, 'blip', { n: 60 });
cue(23.3, 'pop', { f: 1.2 }); cue(SC_R - .05, 'whoosh', { v: .4 }); cue(LAND_R, 'impact', { v: .8 }); cue(LAND_R, 'thud'); cue(LAND_R + .05, 'chime', { n: 76 });
cue(27.9, 'pop', { f: 1.2 }); cue(GIFT, 'swish'); cue(GIFT + .35, 'pop', { f: 1 });
cue(HOOK - .2, 'whoosh', { v: .25 }); cue(HOOK + .25, 'thud'); cue(HOOK + .3, 'blip', { n: 55 }); cue(30.0, 'pop', { f: .9 });
cue(UNHOOK - .1, 'riser', { d: .15 }); cue(UNHOOK, 'swish'); cue(UNHOOK + .05, 'impact', { v: .8 }); cue(UNHOOK + .05, 'chime', { n: 76 });
cue(32.0, 'pop', { f: 1.2 });
cue(34.2, 'pop', { f: 1.2 });
MV.forEach((s, i) => { cue(s, 'whoosh', { v: .25 }); cue(s + .15, 'thud'); cue(s + .15, 'blip', { n: [60, 64, 67, 72][i] }); });
cue(MV[3] + .15, 'chime', { n: 79 });
cue(T0 - .05, 'whoosh', { v: .35 }); cue(T0 + .1, 'thud'); cue(T0 + 1.3, 'impact', { v: .9 }); cue(T0 + 1.3, 'chime', { n: 76 });
cue(T0 + 2.4, 'swish'); cue(T0 + 3.0, 'pop', { f: .9 });
cue(E - .05, 'whoosh', { v: 1 });
[E + .95, E + 1.1].forEach((x, i) => cue(x + .1, 'blip', { n: [72, 79][i] }));
cue(E + 1.2, 'boom', { v: .9 }); cue(E + 1.25, 'chime', { n: 72 });
cue(E + 2.55, 'pop', { f: .9 });
const MARKERS = { groove: 6.4, breakdown: POST + .3, drop: DROP, end: 46.75 };

function bubblePath(x, y, w, h, side) {
  const r = 28; ctx.beginPath(); ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y); ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r); ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  if (side > 0) { ctx.lineTo(x + w - 30, y + h); ctx.lineTo(x + w - 20, y + h + 26); ctx.lineTo(x + w - 66, y + h); } else { ctx.lineTo(x + 66, y + h); ctx.lineTo(x + 20, y + h + 26); ctx.lineTo(x + 30, y + h); }
  ctx.lineTo(x + r, y + h); ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r); ctx.arcTo(x, y, x + r, y, r); ctx.closePath();
}
function bubble(x, y, w, h, side, fill, p, inner) {
  if (p <= 0) return;
  ctx.save(); ctx.translate(x + w / 2, y + h / 2); ctx.scale(p, p); ctx.translate(-x - w / 2, -y - h / 2);
  bubblePath(x, y, w, h, side); ctx.fillStyle = fill; ctx.fill();
  ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.strokeStyle = C.ink; ctx.stroke();
  if (inner) inner(); ctx.restore();
}
function person(x, y, s, fill) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineWidth = 4 / s; ctx.strokeStyle = C.ink; ctx.fillStyle = fill;
  ctx.beginPath(); ctx.arc(0, -18, 15, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 30, 31, Math.PI, 2 * Math.PI); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.restore();
}

/* ---------- S1: she answered (0 – 6.4) ---------- */
function scene1(t) {
  if (t > 6.6) return;
  line(t, 'She answered.', W / 2, 215, { size: 84, start: -.62, stagger: .12, end: 3.7 });
  line(t, 'For [months.]', W / 2, 305, { size: 84, start: -.4, stagger: .12, end: 3.7 });
  line(t, 'She never [pitched.]', W / 2, 260, { size: 84, start: 3.9, stagger: .12, end: 5.95 });
  const out = 1 - eio(prog(t, 5.95, .35));
  ctx.save(); ctx.globalAlpha = out;
  QA.forEach((s, i) => {
    const y = 410 + i * 130, h = 86;
    bubble(110, y, 340, h, -1, '#FFFBF3', eback(prog(t, s, .35)), () => {
      ctx.font = font('serif', 50); ctx.fillStyle = C.ink; ctx.fillText('?', 142, y + 60);
      rr(200, y + 26, 200, 11, 5); ctx.fillStyle = C.faint; ctx.fill(); rr(200, y + 50, 130, 11, 5); ctx.fill();
    });
    bubble(630, y, 340, h, 1, C.goldL, eback(prog(t, s + .3, .35)), () => {
      ctx.fillStyle = 'rgba(26,24,20,0.5)'; rr(662, y + 26, 230, 11, 5); ctx.fill(); rr(662, y + 50, 160, 11, 5); ctx.fill();
      ctx.beginPath(); ctx.arc(958, y + 2, 24, 0, Math.PI * 2); ctx.fillStyle = C.ink; ctx.fill();
      ctx.beginPath(); ctx.moveTo(947, y + 3); ctx.lineTo(955, y + 11); ctx.lineTo(970, y - 8);
      ctx.strokeStyle = C.cream; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke();
    });
  });
  ctx.restore();
}

/* ---------- S2: deposits, no withdrawals (6.4 – 14.2) ---------- */
function scene2(t) {
  if (t < 6.4 || t > 14.3) return;
  const end = 13.75, out = 1 - eio(prog(t, end, .35)), LX = 110, LY = 420, LW = 860, LH = 460;
  line(t, 'Hundreds of [deposits.]', W / 2, 220, { size: 74, start: 6.7, stagger: .1, end });
  line(t, 'Zero [withdrawals.]', W / 2, 310, { size: 74, start: ZERO - .05, stagger: .14, end });
  const lp = eback(prog(t, 6.9, .5));
  ctx.save(); ctx.globalAlpha = out;
  ctx.translate(W / 2, LY + LH / 2); ctx.scale(lp, lp); ctx.translate(-W / 2, -LY - LH / 2);
  rr(LX, LY, LW, LH, 22); ctx.fillStyle = 'rgba(255,252,246,0.7)'; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(W / 2, LY + 14); ctx.lineTo(W / 2, LY + LH - 14); ctx.lineWidth = 3; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(LX + 20, LY + 80); ctx.lineTo(LX + LW - 20, LY + 80); ctx.stroke();
  const cols = 8, rows = 6, g = 8, cw = (370 - g * (cols - 1)) / cols, ch = (320 - g * (rows - 1)) / rows;
  for (let i = 0; i < DEP_N; i++) {
    const p = eback(prog(t, dep(i), .22)); if (p <= 0) continue;
    const cx = 140 + (i % cols) * (cw + g) + cw / 2, cy = 520 + ((i / cols) | 0) * (ch + g) + ch / 2;
    rr(cx - cw * p / 2, cy - ch * p / 2, cw * p, ch * p, 6); ctx.fillStyle = i % 5 === 4 ? C.gold : C.goldL; ctx.fill();
  }
  ctx.restore();
  label('DEPOSITS', 325, LY + 52, out * eo(prog(t, 7.3, .3)), C.goldText, 24);
  label('WITHDRAWALS', 755, LY + 52, out * eo(prog(t, 7.5, .3)), C.ink2, 24);
  const zp = eback(prog(t, ZERO, .4));
  if (zp > 0) {
    ctx.save(); ctx.globalAlpha = out; ctx.translate(755, 740); ctx.scale(zp, zp);
    ctx.font = font('serif', 230); ctx.textAlign = 'center'; ctx.fillStyle = C.ink2; ctx.fillText('0', 0, 0); ctx.restore();
  }
  ring(t, ZERO, 755, 690, 40, 280, C.ink2, .6, 8);
}

/* ---------- S3: one post, dozens say yes (14.2 – 21) ---------- */
const CROWD = Array.from({ length: 32 }, (_, i) => ({ x: 540 + ((i % 8) - 3.5) * 112, y: 470 + ((i / 8) | 0) * 118 }));
function scene3(t) {
  if (t < 14.2 || t > 21.1) return;
  const end = 20.6, out = 1 - eio(prog(t, end, .35)), cx = 540, cy = 640;
  line(t, 'Then she asked.', W / 2, 220, { size: 80, start: ASK, stagger: .1, end });
  line(t, 'One [post.]', W / 2, 310, { size: 84, start: POST, stagger: .12, end: DROP - .4 });
  line(t, 'Dozens said [yes.]', W / 2, 310, { size: 84, start: DROP, stagger: .12, end });
  ctx.save(); ctx.globalAlpha = out;
  const bp = eback(prog(t, POST, .45)) * (1 - eo(prog(t, DROP, .15)));
  if (bp > 0) {
    const wob = .05 * Math.sin(t * 60) * eo(prog(t, POST + 1, 1.2)) * (t < DROP ? 1 : 0);
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(wob); ctx.translate(-cx, -cy);
    bubble(cx - 190, cy - 80, 380, 150, 1, C.goldL, bp, () => {
      ctx.fillStyle = 'rgba(26,24,20,0.5)'; [[-130, -36, 260], [-130, -4, 260], [-130, 28, 170]].forEach(([dx, dy, w]) => { rr(cx + dx, cy + dy, w, 12, 6); ctx.fill(); });
    });
    ctx.restore();
  }
  CROWD.forEach((p, i) => {
    const d = Math.hypot(p.x - cx, p.y - cy), s = eback(prog(t, DROP + .05 + d * .0009, .35)); if (s <= 0) return;
    person(p.x, p.y, s * 1.2, i % 7 === 3 ? C.gold : C.goldL);
  });
  ctx.restore();
  ring(t, DROP, cx, cy, 60, 520, C.gold, .8, 12);
  ring(t, DROP + .12, cx, cy, 40, 420, C.goldL, .7, 8);
  burst(t, DROP, cx, cy, 28, 313, C.goldL, 1000, .9);
}

/* ---------- S4: cheap to give, precious to get (21 – 27.8) ---------- */
function scene4(t) {
  if (t < 21 || t > 27.9) return;
  const end = 27.25, out = 1 - eio(prog(t, end, .35)), px = 540, py = 470, L = 300, drop = 150;
  line(t, 'Cheap for you.', W / 2, 220, { size: 82, start: 21.2, stagger: .1, end });
  line(t, 'Precious to [them.]', W / 2, 310, { size: 82, start: 23.3, stagger: .1, end });
  const th = t < LAND_R ? -.05 * eo(prog(t, LAND_L, .25)) : lerp(-.05, .17, eback(prog(t, LAND_R, .7)));
  const ends = [[px - L * Math.cos(th), py - L * Math.sin(th)], [px + L * Math.cos(th), py + L * Math.sin(th)]];
  ctx.save(); ctx.globalAlpha = out; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = C.ink; ctx.lineWidth = 6;
  const gp = eback(prog(t, 21.4, .5));
  ctx.save(); ctx.translate(px, 900); ctx.scale(1, gp); ctx.translate(-px, -900);
  ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, 900); ctx.stroke();
  rr(px - 140, 890, 280, 24, 10); ctx.fillStyle = C.ink; ctx.fill(); ctx.restore();
  ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(ends[0][0], ends[0][1]); ctx.lineTo(ends[1][0], ends[1][1]); ctx.stroke();
  ctx.beginPath(); ctx.arc(px, py, 22, 0, Math.PI * 2); ctx.fillStyle = C.gold; ctx.fill(); ctx.lineWidth = 5; ctx.stroke();
  [[0, SC_L, 'small'], [1, SC_R, 'big']].forEach(([k, s, kind]) => {
    const [ex, ey] = ends[k], pan = ey + drop, e = prog(t, s, .35), off = -330 * (1 - e * e);
    ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(ex - 95, pan); ctx.moveTo(ex, ey); ctx.lineTo(ex + 95, pan); ctx.stroke();
    if (e > 0) {
      ctx.save(); ctx.translate(ex, pan + off); ctx.lineWidth = 5;
      if (kind === 'small') { rr(-26, -48, 52, 48, 8); ctx.fillStyle = C.fill; ctx.fill(); ctx.stroke(); } else {
        const gg = ctx.createLinearGradient(0, -150, 0, 0); gg.addColorStop(0, C.goldL); gg.addColorStop(1, C.gold);
        rr(-64, -150, 128, 150, 14); ctx.fillStyle = gg; ctx.fill(); ctx.stroke();
      }
      ctx.restore();
    }
    rr(ex - 108, pan - 2, 216, 20, 10); ctx.fillStyle = C.ink2; ctx.fill();
    label(k ? 'A WEEK OF WORRY' : 'TWO MINUTES', ex, pan + 66, out * eo(prog(t, s + .45, .3)), k ? C.goldText : C.ink2, 24);
  });
  ctx.restore();
  ring(t, LAND_R, ends[1][0], ends[1][1] + drop, 40, 300, C.gold, .7, 10);
  burst(t, LAND_R, ends[1][0], ends[1][1] + drop, 18, 41, C.goldL, 900, .8);
}

/* ---------- S5: no hook (27.8 – 34) ---------- */
function scene5(t) {
  if (t < 27.8 || t > 34.1) return;
  const end = 33.5, out = 1 - eio(prog(t, end, .35)), cx = 540;
  line(t, 'A gift with a [hook?]', W / 2, 220, { size: 80, start: 27.9, stagger: .1, end: UNHOOK - .3 });
  line(t, 'People can tell.', W / 2, 308, { size: 56, color: C.ink2, start: 29.9, stagger: .08, end: UNHOOK - .3 });
  line(t, 'Want them to [win.]', W / 2, 250, { size: 84, start: UNHOOK + .1, stagger: .12, end });
  ctx.save(); ctx.globalAlpha = out;
  const gp = eback(prog(t, GIFT, .5)), by = 600;
  if (gp > 0) {
    const glow = eo(prog(t, UNHOOK, .4));
    ctx.save(); ctx.translate(cx, by + 100); ctx.scale(gp, gp); ctx.translate(-cx, -by - 100);
    if (glow > 0) {
      const g = ctx.createRadialGradient(cx, by + 40, 20, cx, by + 40, 330); g.addColorStop(0, `rgba(221,182,95,${.7 * glow})`); g.addColorStop(1, 'rgba(221,182,95,0)');
      ctx.fillStyle = g; ctx.fillRect(cx - 330, by - 290, 660, 660);
    }
    ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    rr(cx - 140, by + 60, 280, 200, 14); ctx.fillStyle = C.goldL; ctx.fill(); ctx.stroke();
    rr(cx - 160, by, 320, 64, 14); ctx.fillStyle = C.gold; ctx.fill(); ctx.stroke();
    ctx.fillStyle = C.cream; rr(cx - 20, by, 40, 260, 4); ctx.fill(); ctx.stroke();
    [-1, 1].forEach(d => { ctx.beginPath(); ctx.ellipse(cx + d * 52, by - 32, 52, 34, d * -.4, 0, Math.PI * 2); ctx.fillStyle = C.cream; ctx.fill(); ctx.stroke(); });
    ctx.beginPath(); ctx.arc(cx, by - 4, 18, 0, Math.PI * 2); ctx.fillStyle = C.cream; ctx.fill(); ctx.stroke();
    ctx.restore();
    const hp = eio(prog(t, HOOK - .3, .5)), up = -520 * eio(prog(t, UNHOOK, .55));
    if (hp > 0 && t < UNHOOK + .6) {
      ctx.save(); ctx.globalAlpha = out * (1 - eo(prog(t, UNHOOK + .25, .3))); ctx.translate(0, up); ctx.lineWidth = 6; ctx.strokeStyle = C.ink2;
      const hy = lerp(300, 470, hp);
      ctx.beginPath(); ctx.moveTo(cx, 360); ctx.lineTo(cx, hy); ctx.stroke();
      ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(cx, hy); ctx.lineTo(cx, hy + 56); ctx.arc(cx - 34, hy + 56, 34, 0, Math.PI * .95); ctx.stroke();
      ctx.restore();
    }
  }
  ctx.restore();
  ring(t, UNHOOK + .05, cx, by + 130, 60, 460, C.gold, .8, 12);
  burst(t, UNHOOK + .05, cx, by + 130, 26, 211, C.goldL, 1000, .9);
}

/* ---------- S6: four moves (34 – 40.7) ---------- */
function scene6(t) {
  if (t < 34 || t > 40.8) return;
  const end = 40.25, out = 1 - eio(prog(t, end, .35)), RY = [440, 565, 690, 815];
  line(t, 'Four [moves.]', W / 2, 250, { size: 88, start: 34.2, stagger: .12, end });
  const lastIdx = MV.filter(s => t >= s).length - 1;
  if (lastIdx > 0) {
    const q = eo(prog(t, MV[lastIdx], .3));
    ctx.save(); ctx.globalAlpha = out; ctx.strokeStyle = C.faint; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.setLineDash([2, 14]);
    ctx.beginPath(); ctx.moveTo(175, RY[0] - 18); ctx.lineTo(175, lerp(RY[lastIdx - 1], RY[lastIdx], q) - 18); ctx.stroke(); ctx.restore();
  }
  ['Five-minute favor, daily', 'Go where the questions are', 'Give the whole idea', 'Give where you’re [strong]'].forEach((s, i) => {
    const np = eback(prog(t, MV[i], .3)) * out;
    if (np > 0) {
      ctx.save(); ctx.translate(175, RY[i] - 18); ctx.scale(np, np);
      ctx.beginPath(); ctx.arc(0, 0, 40, 0, Math.PI * 2); ctx.fillStyle = i === 3 ? C.ink : C.gold; ctx.fill();
      ctx.font = font('serif', 46); ctx.textAlign = 'center'; ctx.fillStyle = C.cream; ctx.fillText(i + 1, 0, 16); ctx.restore();
    }
    line(t, s, 250, RY[i], { size: 56, align: 'left', start: MV[i] + .1, stagger: .06, end });
  });
  ring(t, MV[3] + .15, 175, RY[3] - 18, 30, 150, C.gold, .6, 8);
}

/* ---------- S7: takeaway (40.7 – 46.85) ---------- */
function scene7(t) {
  if (t < 40.6 || t > 47) return;
  const end = 46.5;
  line(t, 'Give first.', W / 2, 440, { size: 104, start: T0 + .1, stagger: .1, end });
  const r = line(t, '[Keep no score.]', W / 2, 570, { size: 104, start: T0 + 1.3, stagger: .1, end });
  const u = eio(prog(t, T0 + 2.4, .4)) * (1 - eio(prog(t, end, .35)));
  if (u > 0) { ctx.fillStyle = C.gold; ctx.fillRect(r.x0, 606, r.w * u, 9); }
  line(t, 'Their ledger is the one that [pays.]', W / 2, 760, { size: 46, color: C.ink2, start: T0 + 3.0, stagger: .07, end });
  burst(t, T0 + 1.4, W / 2, 540, 24, 707, C.goldL, 1100, .9);
}

/* ---------- S8: end card (46.85 – 53) ---------- */
function scene8(t) {
  if (t < E - .05) return;
  const rp = eio(prog(t, E, .55));
  ctx.fillStyle = C.night; ctx.beginPath(); ctx.arc(W / 2, 600, 1300 * rp, 0, Math.PI * 2); ctx.fill();
  if (rp < 1) return;
  const mp = eback(prog(t, E + .95, .4)), cy = 262;
  ctx.save(); ctx.translate(W / 2, cy); ctx.scale(mp, mp);
  [0, 1, 2].forEach(k => { const ph = ((t - E) * .6 + k / 3) % 1; ctx.beginPath(); ctx.arc(0, 0, 24 + ph * 70, 0, Math.PI * 2); ctx.strokeStyle = C.goldL; ctx.lineWidth = 5; ctx.globalAlpha = .8 * (1 - ph); ctx.stroke(); });
  ctx.globalAlpha = 1; ctx.beginPath(); ctx.arc(0, 0, 18, 0, Math.PI * 2); ctx.fillStyle = C.goldL; ctx.fill(); ctx.restore();
  line(t, 'Value, Created —', W / 2, 440, { size: 88, color: C.cream, start: E + 1.15, stagger: .1 });
  line(t, '[Chapter 28: Give Value First]', W / 2, 535, { size: fit('Chapter 28: Give Value First', 900, 66, 'serif'), goldColor: C.goldL, start: E + 1.6, stagger: .06 });
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
