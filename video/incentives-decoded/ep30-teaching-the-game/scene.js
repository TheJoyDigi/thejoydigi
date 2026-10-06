/* Level 30, Teaching the Game: the manager who opened the books and turned on the lights. */
const HOOK = "The manager who turned on the lights";
const EMPH = ['frustrated', 'books.', 'costs.', 'margins.', 'see', 'game.', 'lights.', 'explain', 'teach', 'better.'];

const pawnC = col => shape(P(() => { ctx.arc(0, -52, 34, 0, 7); ctx.moveTo(-26, -24); ctx.lineTo(26, -24); ctx.lineTo(40, 50); ctx.lineTo(66, 50); ctx.lineTo(66, 88); ctx.lineTo(-66, 88); ctx.lineTo(-66, 50); ctx.lineTo(-40, 50); ctx.closePath(); }), col);
function drawBook() {
  shape(P(() => { ctx.moveTo(0, -60); ctx.lineTo(-100, -50); ctx.lineTo(-100, 70); ctx.lineTo(0, 80); ctx.closePath(); }), C.white);
  shape(P(() => { ctx.moveTo(0, -60); ctx.lineTo(100, -50); ctx.lineTo(100, 70); ctx.lineTo(0, 80); ctx.closePath(); }), C.lilac);
  [-30, 0, 30].forEach(y => { shape(P(() => { ctx.moveTo(-80, y - 8); ctx.lineTo(-22, y - 2); ctx.moveTo(22, y - 2); ctx.lineTo(80, y - 8); }), null, { shadow: false, lw: 8 }); });
}
function drawBulb(on, t) {
  if (on) for (let i = 0; i < 10; i++) { const a = i * Math.PI / 5 + t * .6; shape(P(() => { ctx.moveTo(Math.cos(a) * 110, -30 + Math.sin(a) * 110); ctx.lineTo(Math.cos(a) * 150, -30 + Math.sin(a) * 150); }), null, { shadow: false, lw: 12 }); }
  shape(P(() => ctx.arc(0, -30, 78, 0, 7)), on ? C.lime : C.white);
  shape(P(() => ctx.roundRect(-34, 40, 68, 54, 12)), C.orange, { shadow: false, lw: 8 });
  shape(P(() => { ctx.moveTo(-20, -20); ctx.lineTo(0, 20); ctx.lineTo(20, -20); }), null, { shadow: false, lw: 8 });
}

/* cold open: a frustrated manager, a team that does not care */
custom(T('manager'), T('missed') - .05, (t, p) => {
  ctx.translate(STAGE.cx, 1330); ctx.scale(p * 1.8, p * 1.8); pawnC(C.pink);
  ctx.translate(0, -165); ctx.scale(.55, .55); chip('MANAGER', 0, -35, C.lime, C.ink, 40, 'center');
});
icon('lightning', T('frustrated'), T('missed') - .05, { x: 640, y: 1190, s: 1.1 });
icon('target', T('missed'), T('low') - .05, { y: 1290, s: 1.3 });
stamp('MISSED', T('targets'), T('low') - .05, { y: 1300, rot: -.14 });
meter(T('low'), T('nobody') - .05, 'Energy', .55, .08, { y: 1300, dur: .8 });
icon('heart', T('nobody'), T('then') - .05, { x: 330, y: 1290, s: 1.3 });
icon('cross', T('care'), T('then') - .05, { x: 620, y: 1290, s: 1.1 });

/* she opened the books */
bg(T('then') - .1, C.lime, { y: 1280 });
icon('fire', T('radical') - .3, T('opened') - .05, { y: 1290, s: 1.3 });
custom(T('opened'), T('showed') - .05, (t, p) => { ctx.translate(STAGE.cx, 1290); ctx.scale(p * 1.6, p * 1.6); drawBook(); });
list(T('explained') - .1, [['Revenue', T('revenue')], ['Costs', T('costs')], ['Margins', T('margins')]], { y: 1110, gap: 150 });
icon('coin', T('bonuses'), T('within') - .05, { x: 280, y: 1290, s: 1.2 });
icon('chartUp', T('moved'), T('within') - .05, { x: 620, y: 1290, s: 1.1 });

/* three months later */
bg(T('within') - .1, C.violet, { y: 1280 });
counter(T('within'), T('suggesting') - .05, 0, 3, { y: 1250, label: 'months', dur: .8 });
icon('chartDown', T('cost'), T('same') - .05, { x: 280, y: 1290, s: 1.0 });
icon('target', T('chasing'), T('same') - .05, { x: 640, y: 1290, s: 1.1 });
custom(T('same'), T('but') - .05, (t, p) => {
  [0, 1, 2, 3].forEach(i => { ctx.save(); ctx.translate(210 + i * 160, 1340 - Math.abs(Math.sin(t * 4 + i)) * 18); ctx.scale(1.0 * Math.min(p, 1.1), 1.0 * Math.min(p, 1.1)); pawnC(C.cyan); ctx.restore(); });
});
stamp('SAME', T('same'), T('but') - .05, { y: 1150, rot: -.1, color: C.lime });
icon('eye', T('now'), T('she did not') - .05, { y: 1290, s: 1.5 });

/* not better players: the lights */
bg(T('she did not') - .1, C.ink, { y: 1280 });
icon('pawn', T('hire'), T('she just') - .05, { y: 1290, s: 1.3 });
icon('cross', T('players'), T('she just') - .05, { x: 640, y: 1150, s: .9 });
custom(T('she just'), T('instead') - .05, (t, p) => {
  const on = t > T('lights');
  ctx.translate(STAGE.cx, 1290); ctx.scale(p * 1.6, p * 1.6); drawBulb(on, t);
});
bg(T('lights') - .05, C.lime, { y: 1290, sfx: false });
cue(T('lights') - .05, 'chime', { n: 84 });

/* payoff: turn on the lights, teach it */
bg(T('instead') - .1, C.pink, { y: 1260, sfx: false });
icon('arrow', T('pushing'), T('try') - .05, { x: 450, y: 1290, s: 1.4 });
icon('cross', T('harder'), T('try') - .05, { x: 650, y: 1150, s: .8 });
custom(T('try'), T('explain') - .05, (t, p) => { ctx.translate(STAGE.cx, 1290); ctx.scale(p * 1.5, p * 1.5); drawBulb(t > T('turning'), t); });
icon('megaphone', T('explain'), T('then', 2) - .05, { y: 1290, s: 1.4 });
icon('eye', T('watch'), T('do') - .05, { x: 280, y: 1290, s: 1.2 });
icon('chartUp', T('changes'), T('do') - .05, { x: 640, y: 1290, s: 1.1 });

bg(T('do') - .1, C.violet, { y: 1260 });
icon('pawn', T('do'), T('teach') - .05, { y: 1290, s: 1.3 });
icon('cross', T('just', 2), T('teach') - .05, { x: 650, y: 1150, s: .8 });
custom(T('teach'), VOICE_END - .1, (t, p) => {
  const lit = i => t > T('everyone', 2) + i * .12;
  [0, 1, 2, 3].forEach(i => { ctx.save(); ctx.translate(240 + i * 150, 1400 - (lit(i) ? Math.abs(Math.sin((t - T('everyone', 2)) * 6 + i)) * 40 : 0)); ctx.scale(1.2 * Math.min(p, 1.1), 1.2 * Math.min(p, 1.1)); pawnC(lit(i) ? C.lime : C.cyan); ctx.restore(); });
});
decode('TEACH IT', T('teach'), VOICE_END - .1, { y: 1170, size: 130, bg: C.lime, dur: .5 });
shake(T('better', 2) + .05, 14); burstFx(T('better', 2) + .05, STAGE.cx, 1250);
