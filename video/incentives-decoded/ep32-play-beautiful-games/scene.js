/* Level 32, Play Beautiful Games (series finale): the iron-law callback, "a life built out of games worth playing", show me your games. */
const HOOK = "What the whole book was for";
const EMPH = ['law.', 'incentive,', 'outcome.', 'question', 'building', 'everything', 'cleverness.', 'winning', 'worth', 'playing.', 'games.', 'life.'];

function drawBook() {
  shape(P(() => { ctx.moveTo(0, -60); ctx.lineTo(-100, -50); ctx.lineTo(-100, 70); ctx.lineTo(0, 80); ctx.closePath(); }), C.white);
  shape(P(() => { ctx.moveTo(0, -60); ctx.lineTo(100, -50); ctx.lineTo(100, 70); ctx.lineTo(0, 80); ctx.closePath(); }), C.lilac);
  [-30, 0, 30].forEach(y => { shape(P(() => { ctx.moveTo(-80, y - 8); ctx.lineTo(-22, y - 2); ctx.moveTo(22, y - 2); ctx.lineTo(80, y - 8); }), null, { shadow: false, lw: 8 }); });
}
/* labelled sticker tile that pops in at t0 */
function tile(label, name, t0, t1, x, y) {
  cue(t0, 'pop', { f: 1.2 });
  el(t0, t1, t => {
    const { pin, pout } = life(t, t0, t1);
    if (pin <= 0 || pout >= 1) return;
    ctx.save(); ctx.translate(x, y); const s = eback(pin) * (1 - eio(pout)); ctx.scale(s, s); ctx.globalAlpha = clamp(pin * 3) * (1 - pout);
    ctx.save(); ctx.translate(0, -34); ctx.scale(.78, .78); ICONS[name](); ctx.restore();
    chip(label, 0, 62, C.white, C.ink, 26, 'center');
    ctx.restore();
  }, 2);
}

/* the iron-law callback */
counter(T('thirty-one'), T('simple') - .05, 0, 31, { y: 1250, label: 'chapters ago', dur: .9 });
decode('THE LAW', T('law'), T('show') - .05, { y: 1260, size: 130, bg: C.lime, dur: .5 });
icon('coin', T('show'), T('since') - .05, { x: 250, y: 1290, s: 1.2 });
arrowFx(T('i will'), T('since') - .05, 350, 1290, 550, 1290, { color: C.lime });
icon('target', T('outcome'), T('since') - .05, { x: 650, y: 1290, s: 1.2 });

/* everything you learned */
bg(T('since') - .1, C.ink, { y: 1300 });
icon('eye', T('learned'), T('nested') - .1, { y: 1290, s: 1.5 });
const GRID = [[240, 1150], [450, 1150], [660, 1150], [240, 1390], [450, 1390], [660, 1390]];
[['Nested', 'die', T('nested')], ['Currencies', 'coin', T('hidden')], ['Status', 'crown', T('status')], ['Traps', 'warning', T('traps')], ['Tournaments', 'trophy', T('tournaments')], ['Cobras', 'snake', T('cobra')]]
  .forEach(([label, name, t0], i) => tile(label, name, t0, T('so now') - .05, GRID[i][0], GRID[i][1]));

/* one question remains */
bg(T('so now') - .1, C.lime, { y: 1280 });
icon('lightning', T('so now'), T('one') - .05, { y: 1290, s: 1.5 });
icon('question', T('one'), T('whole') - .05, { y: 1290, s: 1.6 });
custom(T('whole'), T('this is') - .05, (t, p) => {
  const t0 = T('whole');
  for (let i = 0; i < 5; i++) {
    const q = eback(prog(t, t0 + i * .22, .3)); if (q <= 0) continue;
    const h = 70 + i * 62, x = 190 + i * 112, col = [C.cyan, C.pink, C.orange, C.white, C.violet][i];
    ctx.save(); ctx.translate(x, 1500); ctx.scale(1, q); pill(0, -h, 106, h, col, { r: 14, shadow: 8, lw: 6 }); ctx.restore();
  }
}, { layer: 1 });
icon('question', T('toward'), T('this is') - .05, { x: 640, y: 1090, s: .9 });

/* payoff: what the book was for */
bg(T('this is') - .1, C.violet, { y: 1260, sfx: false });
custom(T('this is'), T('not') - .05, (t, p) => { ctx.translate(STAGE.cx, 1290); ctx.scale(p * 1.8, p * 1.8); ctx.rotate(-.05); drawBook(); });
icon('check', T('was for'), T('not') - .05, { x: 650, y: 1120, s: .9 });
list(T('just') - .05, [['x:Cleverness', T('cleverness')], ['x:Winning more', T('winning')]], { y: 1190, gap: 160 });
icon('check', T('just'), T('a life') - .05, { y: 1290, s: 1.6 });
icon('die', T('built'), T('show me your') - .05, { y: 1450, s: .7 });
icon('die', T('out'), T('show me your') - .05, { y: 1310, s: .7 });
icon('die', T('games worth'), T('show me your') - .05, { y: 1170, s: .7 });
icon('heart', T('worth'), T('show me your') - .05, { y: 1050, s: .6, enter: 'drop' });

bg(T('show me your') - .1, C.pink, { y: 1260 });
decode('YOUR GAMES', T('show me your') + .1, T('and i will') - .05, { y: 1230, size: 120, bg: C.ink, color: C.lime, dur: .7 });
icon('eye', T('and i will'), T('your life') - .05, { y: 1290, s: 1.5 });
slam('YOUR LIFE.', T('your life'), VOICE_END - .1, { y: 1190, bg: C.lime, size: 150, shake: 22 });
burstFx(T('your life') + .05, STAGE.cx, 1200, { n: 30 });
burstFx(T('your life') + .35, 250, 1150, { n: 16 });
burstFx(T('your life') + .5, 650, 1150, { n: 16 });
icon('heart', T('your life') + .1, VOICE_END - .1, { y: 1450, s: .95 });
