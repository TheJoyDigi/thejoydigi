/* Level 31, The Meta-Game: refuse to play and write new rules; players compete for prizes, designers collect the entry fees. */
const HOOK = "The biggest wins refused to play";
const EMPH = ['taxis', 'shelves?', 'biggest', 'refused', 'rules', 'meta-game.', 'designing', 'designed', 'designers', 'entry', 'fees.'];

const pawnC = col => shape(P(() => { ctx.arc(0, -52, 34, 0, 7); ctx.moveTo(-26, -24); ctx.lineTo(26, -24); ctx.lineTo(40, 50); ctx.lineTo(66, 50); ctx.lineTo(66, 88); ctx.lineTo(-66, 88); ctx.lineTo(-66, 50); ctx.lineTo(-40, 50); ctx.closePath(); }), col);
function drawTaxi() {
  shape(P(() => { ctx.moveTo(-52, -18); ctx.lineTo(-34, -62); ctx.lineTo(40, -62); ctx.lineTo(62, -18); ctx.closePath(); }), C.lime);
  shape(P(() => ctx.roundRect(-20, -86, 44, 22, 6)), C.white, { shadow: false, lw: 6 });
  shape(P(() => ctx.roundRect(-92, -20, 184, 68, 20)), C.lime);
  [-52, 52].forEach(x => { shape(P(() => ctx.arc(x, 50, 24, 0, 7)), C.ink, { shadow: false, lw: 6 }); shape(P(() => ctx.arc(x, 50, 9, 0, 7)), C.white, { shadow: false, lw: 3 }); });
}
const BOOKC = [C.pink, C.cyan, C.orange, C.lime, C.white, C.pink, C.cyan];
/* gone: number of books already removed */
function drawShelf(gone) {
  [-40, 60].forEach((y, r) => {
    BOOKC.forEach((col, i) => { if (r * 7 + i < gone) return; shape(P(() => ctx.roundRect(-150 + i * 43, y - 54 - (i % 3) * 8, 34, 54 + (i % 3) * 8, 5)), col, { shadow: false, lw: 6 }); });
    ctx.save(); ctx.strokeStyle = C.white; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-170, y + 6); ctx.lineTo(170, y + 6); ctx.stroke(); ctx.restore();
  });
}
function drawPaper(lines, title) {
  pill(-130, -140, 260, 280, C.white, { r: 20, shadow: 11, lw: 7 });
  stext(title, 0, -96, fit(title, 220, 52), { color: C.ink, stroke: 0, shadow: 0 });
  for (let i = 0; i < 4; i++) { const w = [200, 200, 200, 120][i] * clamp(lines * 4 - i); if (w > 1) { ctx.fillStyle = '#c9c4d6'; ctx.beginPath(); ctx.roundRect(-100, -48 + i * 40, w, 16, 8); ctx.fill(); } }
}

/* cold open: taxis, then no taxis */
custom(T('competing'), T('then') - .05, (t, p) => {
  [250, 450, 650].forEach((x, i) => { ctx.save(); ctx.translate(x, 1420 - Math.abs(Math.sin(t * 5 + i * 2)) * 14); ctx.scale(1.0 * Math.min(p, 1.1), 1.0 * Math.min(p, 1.1)); drawTaxi(); ctx.restore(); });
});
icon('trophy', T('best'), T('then') - .05, { y: 1160, s: 1.1 });
icon('question', T('someone'), T('no'), { y: 1290, s: 1.3 });
custom(T('no'), T('everyone', 2) - .05, (t, p) => {
  const a = 1 - prog(t, T('at all'), .5);
  ctx.translate(STAGE.cx, 1290); ctx.scale(1.6 * Math.min(p, 1.1), 1.6 * Math.min(p, 1.1)); ctx.globalAlpha *= a; ctx.rotate(prog(t, T('at all'), .5) * -.5); drawTaxi();
});
icon('cross', T('taxis'), T('everyone', 2) - .05, { y: 1290, s: 1.6 });

/* bookstore, no shelves */
bg(T('everyone', 2) - .1, C.ink, { y: 1300 });
custom(T('bookstore'), T('the biggest') - .05, (t, p) => {
  ctx.translate(STAGE.cx, 1300); ctx.scale(1.8 * Math.min(p, 1.1), 1.8 * Math.min(p, 1.1));
  const gone = t > T('no shelves') ? Math.floor((t - T('no shelves')) / .06) : 0;
  drawShelf(gone);
});
icon('cross', T('shelves'), T('the biggest') - .05, { y: 1300, s: 1.6 });

/* the biggest wins: refused to play, wrote new rules */
bg(T('the biggest') - .1, C.lime, { y: 1280 });
icon('trophy', T('biggest'), T('did') - .05, { y: 1290, s: 1.5 });
icon('pawn', T('did'), T('they') - .05, { x: 300, y: 1290, s: 1.3 });
icon('cross', T('not'), T('they') - .05, { x: 640, y: 1290, s: 1.1 });
custom(T('they'), T('wrote') - .05, (t, p) => { ctx.translate(640, 1340); ctx.scale(1.5 * Math.min(p, 1.1), 1.5 * Math.min(p, 1.1)); pawnC(C.violet); });
icon('die', T('refused'), T('wrote') - .05, { x: 290, y: 1300, s: 1.2 });
icon('cross', T('play'), T('wrote') - .05, { x: 290, y: 1300, s: 1.0, layer: 2 });
custom(T('wrote'), T('that') - .05, (t, p) => {
  ctx.translate(STAGE.cx, 1300); ctx.scale(p * 1.3, p * 1.3); ctx.rotate(-.03); drawPaper(prog(t, T('wrote'), 1.2), 'NEW RULES');
});

/* the meta-game */
bg(T('that') - .1, C.pink, { y: 1260 });
decode('META-GAME', T('meta-game'), T('not playing') - .05, { y: 1180, size: 130, bg: C.ink, color: C.lime, dur: .6 });
shake(T('meta-game') + .65, 12);
versus(T('not playing'), T('every') - .05, 'Playing better', 'Designing', { y: 1280, winner: 'b', tWin: T('designing') });

/* payoff: every game was designed by someone */
bg(T('every') - .1, C.violet, { y: 1260, sfx: false });
icon('die', T('game was'), T('the rules') - .05, { x: 280, y: 1290, s: 1.3 });
custom(T('designed'), T('the rules') - .05, (t, p) => { ctx.translate(640, 1340); ctx.scale(1.5 * Math.min(p, 1.1), 1.5 * Math.min(p, 1.1)); pawnC(C.pink); });
arrowFx(T('designed') + .2, T('the rules') - .05, 560, 1290, 400, 1290, { color: C.pink });
list(T('none') - .1, [['Rules', T('rules', 2)], ['Payoffs', T('payoffs')], ['Winners', T('winners')]], { y: 1110, gap: 150 });
icon('thought', T('none'), T('someone wrote') - .05, { y: 1130, s: 1.3 });
arrowFx(T('fell'), T('someone wrote') - .05, 450, 1230, 450, 1380, { color: C.pink });
icon('cross', T('sky'), T('someone wrote') - .05, { y: 1450, s: .8 });
custom(T('someone wrote'), T('the players') - .05, (t, p) => {
  ctx.translate(290, 1290); ctx.scale(p * 1.0, p * 1.0); ctx.rotate(-.04); drawPaper(prog(t, T('someone wrote'), 1.0), 'RULES');
});
[['people', 560, 1200], ['people', 690, 1380]].forEach(([k, x, y], i) => icon(k, T('showed') + i * .25, T('the players') - .05, { x, y, s: .7 }));
custom(T('the players'), T('the designers') - .05, (t, p) => {
  [0, 1, 2].forEach(i => { ctx.save(); ctx.translate(250 + i * 200, 1420 - Math.abs(Math.sin(t * 5 + i)) * 20); ctx.scale(Math.min(p, 1.1), Math.min(p, 1.1)); pawnC(C.cyan); ctx.restore(); });
});
icon('trophy', T('prizes'), T('the designers') - .05, { y: 1180, s: 1.1 });
custom(T('designers'), VOICE_END - .1, (t, p) => { ctx.translate(STAGE.cx, 1400); ctx.scale(1.4 * Math.min(p, 1.1), 1.4 * Math.min(p, 1.1)); pawnC(C.lime); });
icon('crown', T('designers'), VOICE_END - .1, { y: 1090, s: .9, enter: 'drop' });
[0, 1].forEach(i => icon('coin', T('collect') + i * .2, VOICE_END - .1, { x: 230 + i * 440, y: 1430, s: .7, enter: 'drop' }));
slam('ENTRY FEES', T('entry'), VOICE_END - .1, { y: 1250, bg: C.lime, size: 130, shake: 16 });
burstFx(T('entry') + .05, STAGE.cx, 1250);
