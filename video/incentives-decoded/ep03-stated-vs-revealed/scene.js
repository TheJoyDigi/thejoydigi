/* Level 03, Stated vs. Revealed: two dating profiles that don't match the behavior, then "bet on the actions". */
const HOOK = "She loves hiking. Never been once.";
const EMPH = ['hiking.', 'hiking', 'never', 'once.', 'actions', 'actions.', 'truth,', 'wish.', 'serious.', 'nothing.'];

const profile = (t0, t1, tag, tTag, cy, face) => custom(t0, t1, (t, p) => {
  ctx.translate(STAGE.cx, cy); ctx.rotate(-.03); ctx.scale(p, p);
  pill(-270, -150, 540, 300, C.white, { r: 30, shadow: 12, lw: 6 });
  ctx.fillStyle = face; ctx.strokeStyle = C.ink; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(-170, -52, 56, 0, 7); ctx.fill(); ctx.stroke();
  ctx.fillStyle = C.ink; ctx.beginPath(); ctx.arc(-188, -60, 6, 0, 7); ctx.arc(-152, -60, 6, 0, 7); ctx.fill();
  pill(-80, -86, 250, 28, '#E4E1EC', { shadow: 0, lw: 0 }); pill(-80, -42, 170, 22, '#E4E1EC', { shadow: 0, lw: 0 });
  if (t > tTag) { const q = eback(prog(t, tTag, .3)); ctx.save(); ctx.translate(0, 70); ctx.scale(q, q); chip(tag, 0, -25, C.lime, C.ink, 38, 'center'); ctx.restore(); }
});

/* her profile */
profile(T('dating') - .1, T('hiking boots') - .02, 'LOVES HIKING', T('loves'), 1240, C.pink);
[[240, 1110, -.2], [680, 1130, .2], [470, 1440, .1]].forEach(([x, y, r], i) =>
  icon('star', [T('long walks'), T('sunrise'), T('nature')][i], T('she has') - .05, { x, y, s: .55, rot: r }));
list(T('never been') + 1.4, [['Hiking boots', T('hiking boots')], ['The photos', T('the photos')], ['x:Actual hikes', T('never been')]], { y: 1150, gap: 130 });
stamp('ZERO HIKES', T('not once'), T('his profile') - .1, { y: 1470, color: C.pink, rot: -.1 });

/* his profile */
bg(T('his profile') - .05, C.pink, { y: 1260 });
profile(T('his profile'), T('texting') - .03, 'WANTS SERIOUS', T('serious'), 1230, C.cyan);
icon('heart', T('real connection'), T('texting') - .03, { x: 700, y: 1440, s: .8, rot: .2 });
icon('phone', T('texting') - .05, T('nobody') - .1, { x: 300, y: 1290, s: 1.3 });
counter(T('six'), T('nobody') - .1, 0, 6, { y: 1300, size: 200, label: 'texting right now' });
arrowFx(T('six'), T('nobody') - .1, 430, 1290, 520, 1290, { color: C.pink });

/* nobody is lying exactly */
bg(T('nobody'), C.ink, { y: 1290 });
icon('thought', T('nobody'), T('but their actions') - .05, { y: 1280, s: 1.4 });
icon('heart', T('believe'), T('but their actions') - .05, { x: 640, y: 1400, s: .7, rot: .2 });
versus(T('their actions'), T('saying') - .15, 'What they type', 'What they do', { y: 1270, ca: C.white, cb: C.cyan, winner: 'b', tWin: T('different') });

/* after the cut: words are cheap, the Saturday is the truth */
bg(T('saying') - .1, C.violet, { y: 1260, sfx: false });
icon('megaphone', T('saying'), T('actually') - .05, { y: 1280, s: 1.3 });
stamp('FREE', T('nothing'), T('actually') - .05, { y: 1390, color: C.lime, rot: -.15, size: 110 });
custom(T('actually'), T('so the') - .05, (t, p) => {
  ctx.translate(STAGE.cx, 1270); ctx.rotate(.03); ctx.scale(p, p);
  pill(-210, -150, 420, 300, C.white, { r: 28, shadow: 12, lw: 6 });
  ctx.save(); ctx.beginPath(); ctx.roundRect(-210, -150, 420, 90, [28, 28, 0, 0]); ctx.fillStyle = C.pink; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
  stext('SATURDAY', 0, -104, 58, { stroke: 8, shadow: 4 });
  ctx.fillStyle = C.orange; ctx.strokeStyle = C.ink; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(-90, 30, 44, 0, 7); ctx.fill(); ctx.stroke();
  stext('MORNING', 62, 36, 46, { color: C.ink, stroke: 0, shadow: 0 });
});
icon('coin', T('costs', 2) + .2, T('so the') - .05, { x: 700, y: 1130, s: .7, rot: .2 });
versus(T('so the'), T('whenever') - .05, 'Saturday morning', 'The profile', { y: 1270, ca: C.lime, cb: C.lilac, winner: 'a', tWin: T('truth') });

/* the rule */
bg(T('whenever') - .05, C.cyan, { y: 1260 });
icon('megaphone', T('whenever') + .1, T('bet') - .05, { x: 230, y: 1280, s: 1.0, rot: -.1 });
icon('cross', T('disagree') - .2, T('bet') - .05, { x: 450, y: 1290, s: .8 });
icon('cursor', T('actions', 2), T('bet') - .05, { x: 670, y: 1280, s: 1.0 });
slam('ACTIONS', T('bet on'), VOICE_END - .1, { y: 1170, bg: C.lime, size: 150, shake: 12 });
slam('WIN', T('every'), VOICE_END - .1, { y: 1360, bg: C.white, size: 170, rot: .04, shake: 14 });
burstFx(T('every time'), STAGE.cx, 1260);
