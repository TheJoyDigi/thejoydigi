/* Level 28, Win-Win Design: deals that need policing vs deals that run themselves, then "the best contract is the one you never open". */
const HOOK = "Best deals don't need policing";
const EMPH = ['policing?', 'policing', 'nobody', 'never', 'trust.', 'design.', 'enforcement', 'aligning.', 'contract', 'winning'];

const pawnC = col => shape(P(() => { ctx.arc(0, -52, 34, 0, 7); ctx.moveTo(-26, -24); ctx.lineTo(26, -24); ctx.lineTo(40, 50); ctx.lineTo(66, 50); ctx.lineTo(66, 88); ctx.lineTo(-66, 88); ctx.lineTo(-66, 50); ctx.lineTo(-40, 50); ctx.closePath(); }), col);

/* cold open: a deal that needs constant policing */
icon('handshake', T('deal'), T('contractor') - .3, { x: 300, y: 1290, s: 1.35 });
icon('eye', T('policing'), T('contractor') - .3, { x: 630, y: 1290, s: 1.2 });
list(T('now') - .15, [['x:Contractor', T('contractor')], ['x:Roommate', T('roommate')], ['x:Partnership', T('partnership')]], { y: 1110, gap: 150 });

/* the best deal: nobody monitoring */
bg(T('now') - .1, C.lime, { y: 1280 });
icon('scale', T('compare'), T('best') - .05, { y: 1290, s: 1.2 });
icon('handshake', T('best'), T('nobody') - .05, { y: 1290, s: 1.6 });
icon('medal', T('best deal'), T('nobody') - .05, { x: 640, y: 1130, s: .8, rot: .2 });
icon('eye', T('nobody'), T('both') - .05, { x: 280, y: 1290, s: 1.3 });
icon('cross', T('monitored'), T('both') - .05, { x: 640, y: 1290, s: 1.0 });
custom(T('both'), T('the difference') - .05, (t, p) => {
  const q = eo(prog(t, T('both'), .6));
  [[C.cyan, -1], [C.pink, 1]].forEach(([col, d]) => {
    ctx.save(); ctx.translate(STAGE.cx + d * (140 + (1 - q) * 380), 1340 + Math.abs(Math.sin(t * 5)) * -20); ctx.scale(1.8, 1.8); pawnC(col); ctx.restore();
  });
});
icon('check', T('right'), T('the difference') - .05, { y: 1110, s: .9 });

/* not trust, design */
bg(T('the difference') - .1, C.ink, { y: 1280 });
versus(T('difference'), T('one deal') - .05, 'Trust', 'Design', { y: 1220, winner: 'b', tWin: T('design') });
list(T('redesign') - .3, [['x:Needs enforcement', T('one deal')], ['Needs none', T('the other')]], { y: 1190, gap: 160 });

/* payoff: stop policing, start aligning */
bg(T('redesign') - .1, C.pink, { y: 1260, sfx: false });
icon('gift', T('redesign'), T('watch') - .05, { y: 1290, s: 1.4, spin: true });
versus(T('watch'), T('the best contract') - .05, 'Policing', 'Aligning', { y: 1270, winner: 'b', tWin: T('aligning') });

bg(T('the best contract') - .1, C.violet, { y: 1260 });
custom(T('contract') - .3, T('both', 2) - .05, (t, p) => {
  ctx.translate(STAGE.cx, 1290); ctx.rotate(-.04); ctx.scale(p, p);
  pill(-170, -170, 340, 340, C.white, { r: 24, shadow: 12, lw: 7 });
  stext('CONTRACT', 0, -120, 54, { color: C.ink, stroke: 0, shadow: 0 });
  for (let i = 0; i < 5; i++) { ctx.fillStyle = '#c9c4d6'; ctx.beginPath(); ctx.roundRect(-120, -70 + i * 42, i === 4 ? 140 : 240, 16, 8); ctx.fill(); }
});
stamp('NEVER OPENED', T('never', 2), T('both', 2) - .05, { y: 1320, rot: -.16 });
custom(T('both', 2), T('winning') - .05, (t, p) => {
  [[C.cyan, 250], [C.pink, 650]].forEach(([col, x], i) => { ctx.save(); ctx.translate(x, 1410 - Math.abs(Math.sin(t * 5 + i * 1.5)) * 30); ctx.scale(1.5 * Math.min(p, 1.1), 1.5 * Math.min(p, 1.1)); pawnC(col); ctx.restore(); });
});
icon('trophy', T('busy'), T('winning') - .05, { y: 1220, s: 1.2 });
slam('BOTH WIN.', T('winning'), VOICE_END - .1, { y: 1250, bg: C.lime, size: 150, shake: 16 });
burstFx(T('winning') + .1, STAGE.cx, 1250);
