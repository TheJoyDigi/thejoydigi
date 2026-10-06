/* Level 19, Who Writes the Rules Wins: the board-game owner always wins, then three moves ending on "the rule-maker collects". */
const HOOK = "The game owner always wins";
const EMPH = ['owned', 'structural', 'rules', 'rule-maker', 'collects', 'cut', 'own'];
const J = CLIP.joins[0];

const rulebook = () => {
  shape(P(() => ctx.roundRect(-80, -105, 160, 210, 16)), C.violet);
  shape(P(() => ctx.roundRect(-62, -88, 16, 176, 6)), C.ink, { shadow: false, lw: 3 });
  stext('RULES', 14, -34, 38, { color: C.white, stroke: 0, shadow: 0 });
  shape(P(() => { ctx.moveTo(-20, 10); ctx.lineTo(58, 10); ctx.moveTo(-20, 42); ctx.lineTo(58, 42); ctx.moveTo(-20, 74); ctx.lineTo(34, 74); }), null, { shadow: false, lw: 8 });
};

/* 1. the board game and its owner */
custom(T('board game'), T('it is not funny') - .05, (t, p) => {
  const tO = T('owned'), tW = T('win'), pp = Math.min(p, 1);
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {
    const q = eback(prog(t, T('board game') + (r + c) * .06, .25)); if (q <= 0) continue;
    ctx.save(); ctx.translate(STAGE.cx - 168 + c * 112, 1100 + r * 112); ctx.scale(q, q);
    pill(-52, -52, 104, 104, (r + c) % 2 ? C.lilac : C.white, { r: 14, shadow: 5, lw: 4 }); ctx.restore();
  }
  const youQ = eback(prog(t, T('someone') - .3, .3));
  if (youQ > 0) { ctx.save(); ctx.translate(STAGE.cx - 168, 1100 + 336); ctx.scale(.5 * youQ, .5 * youQ); ICONS.pawn(); ctx.restore(); }
  if (t > tO) {
    const q = eback(prog(t, tO, .3));
    ctx.save(); ctx.translate(STAGE.cx + 168, 1100); ctx.scale(.5 * q, .5 * q); ICONS.pawn(); ctx.restore();
    ctx.save(); ctx.translate(STAGE.cx + 168, 1100 - 58); ctx.scale(.3 * q, .3 * q); ICONS.crown(); ctx.restore();
    ctx.save(); ctx.translate(STAGE.cx + 168, 1100 + 66); ctx.scale(q, q); chip('OWNER', 0, -26, C.lime, C.ink, 22, 'center'); ctx.restore();
  }
  if (youQ > 0) { ctx.save(); ctx.translate(STAGE.cx - 168, 1100 + 336 + 66); ctx.scale(youQ, youQ); chip('YOU', 0, -26, C.white, C.ink, 22, 'center'); ctx.restore(); }
  if (t > tW) { const q = eback(prog(t, tW - .2, .35)); ctx.save(); ctx.translate(STAGE.cx + 168, 1100 + 168); ctx.rotate(.1); ctx.scale(.55 * q, .55 * q); ICONS.trophy(); ctx.restore(); }
});
cue(T('owned'), 'pop', { f: 1.5 }); cue(T('win') - .2, 'chime', { n: 77 });

/* 2. not funny, structural */
bg(T('it is not funny'), C.pink, { y: 1260 });
versus(T('it is not funny'), T('they know') - .05, 'Funny', 'Structural', { winner: 'b', tWin: T('structural'), ca: C.white, cb: C.lime });
list(T('and life') - .05, [['Knows the shortcuts', T('shortcuts')], ['Wrote the house rules', T('wrote the house rules')], ['Decided what wins', T('decided')]], { y: 1100, gap: 140 });

/* 3. life works the same way */
bg(T('and life'), C.ink, { y: 1260 });
custom(T('and life'), T('the winners') - .05, (t, p) => {
  [250, 450, 650].forEach((x, i) => { ctx.save(); ctx.translate(x, 1340 - (i === 1 ? 20 : 0)); ctx.scale(.7 * Math.min(p, 1) * (i === 1 ? 1.2 : 1), .7 * Math.min(p, 1) * (i === 1 ? 1.2 : 1)); ICONS.pawn(); ctx.restore(); });
  if (t > T('same')) { const q = eback(prog(t, T('same'), .3)); ctx.save(); ctx.translate(450, 1190); ctx.scale(.6 * q, .6 * q); ICONS.crown(); ctx.restore(); }
});
icon('medal', T('the winners'), T('they are the people') - .05, { x: 330, y: 1290, s: 1.2 });
stamp('NOT ALWAYS', T('not always'), T('they are the people') - .05, { x: 440, y: 1300, size: 88, rot: -.12 });
custom(T('they are the people'), J - .05, (t, p) => {
  ctx.translate(STAGE.cx, 1300); ctx.scale(Math.min(p, 1) * 1.5, Math.min(p, 1) * 1.5); ctx.rotate(-.05 + Math.sin(t * 3) * .03); rulebook();
  ctx.save(); ctx.translate(0, -120); ctx.scale(.6, .6); ICONS.crown(); ctx.restore();
});
cue(T('they are the people'), 'thud');

/* 4. after the cut: write your own game */
bg(J + .02, C.orange, { y: 1260, sfx: false });
decode('YOUR OWN GAME', T('write your own'), T('start the newsletter') - .05, { y: 1150, size: 100, dur: .8, bg: C.white });
icon('die', T('own game'), T('start the newsletter') - .05, { y: 1390, s: 1.1, enter: 'drop' });
versus(T('start the newsletter'), T('build the audience') - .05, 'Start a newsletter', 'Pitch the publication', { y: 1250, winner: 'a', tWin: T('instead'), ca: C.lime, cb: C.white });
icon('people', T('audience'), T('rule-maker') + .1, { x: 270, y: 1290, s: 1.1 });
icon('lock', T('gatekeeper') - .3, T('rule-maker') + .1, { x: 640, y: 1290, s: 1.0 });
icon('cross', T('gatekeeper') + .1, T('rule-maker') + .1, { x: 700, y: 1170, s: .55 });

/* 5. the rule-maker collects */
bg(T('rule-maker'), C.violet, { y: 1260 });
custom(T('rule-maker'), T('players fight') - .05, (t, p) => {
  ctx.save(); ctx.translate(STAGE.cx, 1260); ctx.scale(Math.min(p, 1) * 1.3, Math.min(p, 1) * 1.3); rulebook(); ctx.restore();
  ctx.save(); ctx.translate(STAGE.cx, 1100); ctx.scale(Math.min(p, 1) * .7, Math.min(p, 1) * .7); ICONS.crown(); ctx.restore();
  ctx.save(); ctx.translate(STAGE.cx, 1470); ctx.scale(Math.min(p, 1), Math.min(p, 1)); chip('RULE-MAKER', 0, -30, C.lime, C.ink, 30, 'center'); ctx.restore();
});
[[230, 1180], [680, 1180], [200, 1380], [700, 1380]].forEach(([x, y], i) => {
  const t0 = T('collects') + i * .12;
  icon('coin', t0, T('players fight') - .05, { x, y, s: .55, rot: i % 2 ? .2 : -.2 });
});

/* 6. players fight, rule-makers take a cut again and again */
bg(T('players fight'), C.cyan, { y: 1260 });
[0, 1, 2].forEach(i => {
  const x = 190 + i * 260;
  icon('trophy', T('prize') + i * .08, VOICE_END - .1, { x, y: 1400, s: .75, enter: 'drop' });
});
[['cut', 0], ['every', 1], ['again', 2]].forEach(([w, i]) => icon('coin', T(w), VOICE_END - .1, { x: 190 + i * 260, y: 1250, s: .6, rot: .15 * (i - 1) }));
decode('THE CUT', T('rule-makers'), VOICE_END - .1, { y: 1105, size: 120, bg: C.lime, dur: .6 });
shake(T('again and again'), 12); burstFx(T('again and again') + .05, STAGE.cx, 1300);
