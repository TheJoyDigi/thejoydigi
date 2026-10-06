/* Level 17, Zero-Sum vs. Positive-Sum: poker night vs potluck, then "which game am I playing". */
const HOOK = "Poker night or potluck?";
const EMPH = ['poker', 'potluck.', 'zero-sum.', 'positive-sum.', 'multiplies.', 'game.', 'move.', 'playing.', 'win.', 'pot.'];

const tag = (t0, t1, text, x, y, fill, o = {}) => custom(t0, t1, (t, p) => {
  ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(Math.min(p, 1.1), Math.min(p, 1.1)); chip(text, 0, -30, fill, C.ink, o.size || 30, 'center');
});
const pawnAt = (x, y, s, q) => { ctx.save(); ctx.translate(x, y); ctx.scale(s * q, s * q); ICONS.pawn(); ctx.restore(); };
function card(x, y, rot, label, color, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  pill(-60, -85, 120, 170, C.white, { r: 14, shadow: 8, lw: 6 });
  stext(label, -22, -42, 52, { color, stroke: 0, shadow: 0 });
  ctx.save(); ctx.translate(0, 28); ctx.scale(.5, .5); ICONS.heart(); ctx.restore();
  ctx.restore();
}

/* poker night: two cards, then five friends around one pot */
custom(.05, T('five'), (t, p) => { card(310, 1280, -.2, 'A', C.pink, Math.min(p, 1.1) * 1.5); card(570, 1290, .15, 'K', C.ink, Math.min(p, 1.1) * 1.5); });
const RING = [[230, 1190], [670, 1190], [700, 1370], [450, 1460], [200, 1370]];
custom(T('five'), T('now') - .05, (t, p) => {
  const n = Math.min(5, Math.floor((t - T('five')) / .16) + 1);
  for (let i = 0; i < n; i++) pawnAt(RING[i][0], RING[i][1] + Math.sin(t * 2 + i) * 4, 1.05, eback(prog(t, T('five') + i * .16, .25)));
  if (t > T('pot')) { ctx.save(); ctx.translate(450, 1290); const q = eback(prog(t, T('pot'), .3)); ctx.scale(1.3 * q, 1.3 * q); ICONS.coin(); ctx.restore(); }
  if (t > T('win')) { ctx.save(); ctx.translate(RING[0][0] + 5, RING[0][1] - 100); const q = eback(prog(t, T('win'), .25)); ctx.scale(q, q); chip('+$1', 0, -30, C.lime, C.ink, 36, 'center'); ctx.restore(); }
  if (t > T('loses')) { ctx.save(); ctx.translate(RING[2][0] - 10, RING[2][1] - 100); const q = eback(prog(t, T('loses'), .25)); ctx.scale(q, q); chip('-$1', 0, -30, C.pink, C.ink, 36, 'center'); ctx.restore(); }
  if (t > T('better')) { ctx.save(); ctx.translate(RING[0][0] - 95, RING[0][1] + 10); const q = eback(prog(t, T('better'), .3)); ctx.scale(.5 * q, .5 * q); ICONS.chartUp(); ctx.restore(); }
  if (t > T('worse')) { ctx.save(); ctx.translate(RING[2][0] + 95, RING[2][1] + 10); const q = eback(prog(t, T('worse'), .3)); ctx.scale(.5 * q, .5 * q); ICONS.chartDown(); ctx.restore(); }
});
cue(T('five') + .1, 'pop', { f: 1.1 }); cue(T('five') + .5, 'pop', { f: 1.3 });
arrowFx(T('someone'), T('now') - .05, RING[2][0] - 60, RING[2][1] - 60, RING[0][0] + 80, RING[0][1] + 70, { color: C.lime });

/* potluck: a table, five dishes that multiply */
bg(T('now') - .1, C.pink, { y: 1260 });
const DISH = [C.orange, C.lime, C.cyan, C.white, C.violet];
custom(T('potluck'), T('same') - .05, (t, p) => {
  const pr = Math.min(p, 1.1);
  [[190, 1130], [320, 1110], [450, 1100], [580, 1110], [710, 1130]].forEach(([x, y], i) => pawnAt(x, y + Math.sin(t * 2 + i) * 4, .85, pr));
  pill(100, 1390, 700, 56, C.white, { r: 16, shadow: 10, lw: 6 });
  const n = t < T('multiplies') ? Math.max(0, Math.floor((t - T('brings')) / .16) + 1) : 5 + Math.floor((t - T('multiplies')) / .08);
  const rows = [[1350, 1], [1285, .82], [1225, .66]];
  for (let k = 0; k < Math.min(15, n); k++) {
    const r = Math.floor(k / 5), c = k % 5, [y, sc] = rows[r], x = 190 + c * 130 + (r % 2) * 40;
    const q = eback(prog(t, k < 5 ? T('brings') + k * .16 : T('multiplies') + (k - 5) * .08, .25));
    ctx.save(); ctx.translate(x, y); ctx.scale(sc * q, sc * q);
    shape(P(() => { ctx.moveTo(-48, 0); ctx.arc(0, 0, 48, Math.PI, 0, true); ctx.closePath(); }), DISH[k % 5]);
    pill(-56, 0, 112, 14, C.ink, { r: 6, shadow: 0, lw: 0 });
    ctx.restore();
  }
  if (t > T('eats')) [0, 1, 2, 3, 4].forEach(i => { const q = eback(prog(t, T('eats') + i * .12, .3)); if (q <= 0) return; ctx.save(); ctx.translate([190, 320, 450, 580, 710][i], [1040, 1020, 1010, 1020, 1040][i]); ctx.scale(.28 * q, .28 * q); ICONS.heart(); ctx.restore(); });
});
icon('check', T('nobody'), T('the food') - .05, { x: 450, y: 1250, s: 1.2 });
tag(T('nobody'), T('the food') - .05, 'NOBODY LOSES', 450, 1450, C.lime, { size: 36 });

/* same people, different game */
bg(T('same') - .1, C.ink, { y: 1260 });
versus(T('same'), T('and') - .05, 'Poker night', 'Potluck', { y: 1250 });
tag(T('zero-sum'), T('and') - .05, 'ZERO-SUM', 280, 1450, C.pink, { size: 32 });
tag(T('positive-sum'), T('and') - .05, 'POSITIVE-SUM', 630, 1450, C.lime, { size: 32 });
[['house', 190], ['briefcase', 340], ['heart', 490], ['people', 640]].forEach(([k, x], i) => icon(k, T('entire') + i * .22, T('poker', 2) - .05, { x, y: 1210, s: .75 }));
custom(T('play'), T('but') - .05, (t, p) => { const q = Math.min(p, 1.1); card(270, 1400, -.18, 'A', C.pink, q); card(450, 1410, .02, 'K', C.ink, q); card(630, 1400, .18, 'Q', C.violet, q); });
slam('POKER', T('poker', 2), T('but') - .05, { y: 1330, bg: C.white, size: 120 });

/* biggest wins: pick the right game */
bg(T('but') - .1, C.lime, { y: 1260 });
icon('trophy', T('biggest'), T('beating') - .05, { y: 1260, s: 1.5 });
icon('pawn', T('beating') - .3, T('picking') - .05, { x: 220, y: 1320, s: 1 });
icon('pawn', T('beating') - .2, T('picking') - .05, { x: 680, y: 1320, s: 1 });
arrowFx(T('beating'), T('picking') - .05, 320, 1320, 580, 1320, { color: C.pink });
icon('cross', T('people', 3), T('picking') - .05, { x: 450, y: 1190, s: 1 });
icon('die', T('picking'), T('so') - .05, { x: 300, y: 1290, s: 1.4 });
arrowFx(T('picking') + .25, T('so') - .05, 400, 1290, 520, 1290, { color: C.ink });
icon('check', T('right'), T('so') - .05, { x: 640, y: 1290, s: 1.4 });

/* after the cut: the move */
bg(T('so') - .1, C.violet, { y: 1260, sfx: false });
icon('pawn', T('so'), T('move') - .05, { x: 300, y: 1310, s: 1.3 });
arrowFx(T('here'), T('move') - .05, 390, 1310, 600, 1310, { color: C.lime });
decode('THE MOVE', T('move'), T('stop') - .05, { y: 1260, size: 150, bg: C.lime, dur: .6 });
bubble(T('asking'), T('which') - .05, 'How do I win?', { side: 'left', y: 1130 });
icon('cross', T('win', 2) - .15, T('which') - .05, { x: 640, y: 1330, s: 1 });
bubble(T('which'), VOICE_END - .1, 'Which game am I playing?', { side: 'right', y: 1130 });
icon('die', T('game', 3), VOICE_END - .1, { x: 300, y: 1400, s: 1.3 });
icon('check', T('playing') - .1, VOICE_END - .1, { x: 620, y: 1400, s: 1.3 });
shake(T('playing') + .1, 14); burstFx(T('playing') + .1, STAGE.cx, 1290);
