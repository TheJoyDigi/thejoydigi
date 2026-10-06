/* Level 18, The Tournament: 100 dots cut to 12, three prize races, the trophy that everyone pays for, then "build your own ladder" and game choosers. */
const HOOK = "Almost everyone loses. We still enter.";
const EMPH = ['tournament', 'prize', 'loses', 'unicorn', 'twelve', 'ladder', 'positive-sum', 'zero-sum', 'choosers'];
const J = CLIP.joins[0];

/* 1. one hundred kids, twelve make it */
custom(T('one hundred'), T('one thousand') - .3, (t, p) => {
  const tA = T('hundred'), tM = T('twelve'), tO = T('eighty-eight');
  for (let i = 0; i < 100; i++) {
    const cx = STAGE.cx - 207 + (i % 10) * 46, cy = 1062 + Math.floor(i / 10) * 46;
    const q = prog(t, tA + i * .007, .25), made = i < 12 && t > tM, gone = i >= 12 && t > tO;
    if (q <= 0) continue;
    const pulse = made ? 1 + .35 * Math.exp(-(t - tM - i * .04) * 6) * (t > tM + i * .04) : 1;
    ctx.save(); ctx.translate(cx, cy); ctx.scale(eback(q) * pulse * (gone ? .85 : 1), eback(q) * pulse * (gone ? .85 : 1)); ctx.globalAlpha = gone ? .35 : 1;
    shape(P(() => ctx.arc(0, 0, 17, 0, 7)), made ? C.lime : C.white, { shadow: false, lw: 5 });
    ctx.restore();
  }
  if (t > tM) { ctx.save(); ctx.translate(STAGE.cx, 1535); chip('12 MAKE THE TEAM', 0, -30, C.lime, C.ink, 26, 'center'); ctx.restore(); }
});
cue(T('twelve'), 'chime', { n: 79 });

/* 2. one thousand applications, one job */
counter(T('one thousand'), T('nine hundred') - .1, 0, 1000, { y: 1230, label: 'applications', dur: .9, color: C.white });
icon('briefcase', T('one job'), T('nine hundred') - .1, { x: 450, y: 1440, s: .7 });
counter(T('nine hundred'), T('ten startups') - .1, 0, 999, { y: 1230, label: 'rejections', dur: .9, color: C.pink });
stamp('REJECTED', T('rejections') + .1, T('ten startups') - .1, { y: 1480, rot: -.1, size: 84 });

/* 3. ten startups, one unicorn */
bg(T('ten startups'), C.pink, { y: 1260 });
custom(T('ten startups'), T('this is the tournament') - .05, (t, p) => {
  const tU = T('unicorn'), tC = T('cautionary'), pp = Math.min(p, 1);
  if (t < tU) { ctx.save(); ctx.translate(STAGE.cx, 1200); ctx.scale(pp * .8, pp * .8); ICONS.target(); ctx.restore(); stext('ONE MARKET', STAGE.cx, 1050, 40, { kind: 'mono', track: 3, color: C.white, stroke: 8, shadow: 4 }); }
  for (let i = 0; i < 10; i++) {
    const win = i === 4, run = Math.abs(Math.sin(t * 7 + i * 1.3)) * 14, k = eo(prog(t, tC, .3));
    let x = 144 + i * 68, y = 1470 - run, a = 1, rot = 0, s = .4;
    if (t > tU && win) { const u = eo(prog(t, tU, .4)); x = lerp(x, STAGE.cx, u); y = lerp(1470, 1370, u); s = .5; }
    if (t > tC && !win) { rot = .5 * k * (i % 2 ? 1 : -1); a = 1 - .55 * k; y = 1470 + 10 * k; }
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s * pp, s * pp); ctx.globalAlpha = a; ICONS.pawn(); ctx.restore();
    if (win && t > tU) { ctx.save(); ctx.translate(STAGE.cx, y - 104); const q = eback(prog(t, tU + .1, .3)); ctx.scale(q * .5, q * .5); ICONS.crown(); ctx.restore(); }
  }
  if (t > tU && t < tC) { const q = eback(prog(t, tU + .15, .3)); ctx.save(); ctx.translate(STAGE.cx, 1170); ctx.scale(q, q); chip('UNICORN', 0, -30, C.lime, C.ink, 34, 'center'); ctx.restore(); }
});
stamp('CAUTIONARY TALES', T('cautionary'), T('this is the tournament') - .1, { y: 1190, rot: -.08, size: 70, color: C.ink });
cue(T('unicorn'), 'chime', { n: 84 });

/* 4. the tournament: one prize, everyone pays, almost everyone loses, we keep signing up */
bg(T('this is the tournament'), C.ink, { y: 1260 });
decode('THE TOURNAMENT', T('tournament'), J - .05, { y: 1085, size: 92, dur: .8 });
icon('trophy', T('one prize'), T('and we all') - .05, { y: 1330, s: 1.1, enter: 'drop' });
[[200, 1260], [700, 1260], [210, 1450], [690, 1450]].forEach(([x, y], i) => icon('coin', T('pays') + i * .12, T('and we all') - .05, { x, y, s: .5, rot: i % 2 ? .2 : -.2 }));
custom(T('entry'), T('and we all') - .05, (t, p) => { ctx.translate(STAGE.cx, 1520); ctx.scale(p, p); chip('ENTRY FEE', 0, -30, C.lime, C.ink, 28, 'center'); });
stamp('LOSE', T('almost everyone'), T('and we all') - .05, { y: 1340, rot: -.14, size: 130 });
custom(T('and we all'), J - .05, (t, p) => {
  const press = Math.sin((t - T('signing')) * 6) > .6 && t > T('signing');
  ctx.translate(STAGE.cx, 1330); ctx.scale(p, p);
  pill(-250, -70, 500, 140, C.lime, { r: 32, shadow: press ? 4 : 12, lw: 7 });
  stext('SIGN UP', 0, 4, 84, { color: C.ink, stroke: 0, shadow: 0 });
  ctx.save(); ctx.translate(150 + (press ? -6 : 0), 70 + (press ? -4 : 0)); ctx.scale(.7, .7); ctx.rotate(-.1); ICONS.cursor(); ctx.restore();
});

/* 5. after the cut: build your own ladder, a small audience, game choosers */
bg(J + .02, C.cyan, { y: 1260, sfx: false });
custom(T('build'), T('do not chase') - .05, (t, p) => {
  const t0 = T('your own') - .1, n = 6;
  ctx.translate(STAGE.cx, 1290); ctx.rotate(-.05); ctx.scale(Math.min(p, 1), Math.min(p, 1));
  [-95, 95].forEach(x => { shape(P(() => ctx.roundRect(x - 17, -230, 34, 470, 12)), C.orange); });
  for (let i = 0; i < n; i++) { const q = eback(prog(t, t0 + i * .1, .2)); if (q <= 0) continue; ctx.save(); ctx.translate(0, 190 - i * 76); ctx.scale(q, 1); shape(P(() => ctx.roundRect(-95, -14, 190, 28, 8)), C.lime, { shadow: false, lw: 7 }); ctx.restore(); }
});
cue(T('your own'), 'tick'); cue(T('ladder'), 'chime', { n: 79 });
list(T('positive-sum') + .05, [['x:Chase followers', T('chase', 2)], ['Small audience', T('build a small')]], { y: 1130, gap: 140 });
icon('people', T('audience'), T('positive-sum') + .05, { y: 1440, s: .8 });
versus(T('positive-sum'), T('remember') - .05, 'Positive-sum next door', 'Zero-sum tournament', { y: 1270, winner: 'a', tWin: T('better'), ca: C.lime, cb: C.white });
bg(T('remember'), C.violet, { y: 1300 });
custom(T('remember'), T('not the best competitors') - .05, (t, p) => {
  ctx.translate(STAGE.cx, 1270); ctx.rotate(-.04); ctx.scale(p, p);
  pill(-270, -130, 540, 260, C.white, { r: 30, shadow: 12, lw: 7 });
  stext('Remember', 0, -62, 56, { color: C.ink, stroke: 0, shadow: 0 });
  stext('CHAPTER 17', 0, 34, 98, { color: C.violet, stroke: 0, shadow: 0 });
});
list(VOICE_END - .1, [['x:Best competitors', T('not the best competitors')]], { y: 1085 });
decode('GAME CHOOSERS', T('game choosers'), VOICE_END - .1, { y: 1330, size: 120, bg: C.lime, dur: .65 });
shake(T('choosers') + .15, 14); burstFx(T('choosers') + .15, STAGE.cx, 1300);
