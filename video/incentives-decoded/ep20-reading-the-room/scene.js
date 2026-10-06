/* Level 20, Reading the Room: the meeting where everyone nods, then "stop listening to what they say, start watching what they want". */
const HOOK = "Everyone nodded. Nobody meant it.";
const EMPH = ['nods', 'nothing', 'theater', 'game', 'blind', 'scan', 'payoff', 'logic', 'want'];
const J = CLIP.joins[0];

/* 1. six people around a table, an idea, everyone nods, nothing happens */
custom(T('six people'), T('because') - .05, (t, p) => {
  const tN = T('nods'), tZ = T('nothing'), pp = Math.min(p, 1);
  ctx.save(); ctx.translate(STAGE.cx, 1300); ctx.scale(pp, pp);
  pill(-190, -80, 380, 160, C.lilac, { r: 80, shadow: 10, lw: 6 });
  ctx.restore();
  const cols = [C.pink, C.cyan, C.lime, C.orange, C.pink, C.cyan];
  for (let i = 0; i < 6; i++) {
    const a = -Math.PI / 2 + i * Math.PI / 3, q = eback(prog(t, T('six people') + .1 + i * .13, .28));
    if (q <= 0) continue;
    const nod = t > tN && t < tZ ? Math.abs(Math.sin((t - tN) * 9 + i)) * 22 : 0;
    const x = STAGE.cx + Math.cos(a) * 255, y = 1310 + Math.sin(a) * 150 + nod + (i === 0 ? -4 : 0);
    ctx.save(); ctx.translate(x, y); ctx.scale(q * .85, q * .85);
    shape(P(() => { ctx.moveTo(-60, 70); ctx.quadraticCurveTo(-60, 10, 0, 10); ctx.quadraticCurveTo(60, 10, 60, 70); ctx.closePath(); }), cols[i]);
    shape(P(() => ctx.arc(0, -28, 38, 0, 7)), cols[i]);
    ctx.restore();
  }
  if (t > tZ) { ctx.save(); ctx.globalAlpha = .55; ctx.fillStyle = C.ink; ctx.restore(); }
});
icon('thought', T('idea'), T('everyone nods') - .05, { x: 450, y: 1090, s: .8 });
stamp('NOTHING', T('nothing'), T('because') - .05, { y: 1300, size: 110, rot: -.1, color: C.lime });

/* 2. the nodding was theater */
bg(T('because'), C.pink, { y: 1260 });
slam('THEATER', T('theater'), T('nobody in') - .05, { y: 1260, bg: C.ink, color: C.lime });
icon('thought', T('nobody in'), T('said no') - .05, { x: 400, y: 1280, s: 1.2 });
icon('cross', T('nobody in') + .45, T('said no') - .05, { x: 560, y: 1200, s: .7 });
icon('megaphone', T('said no'), T('every meeting') - .05, { x: 400, y: 1300, s: 1.2 });
icon('cross', T('out loud'), T('every meeting') - .05, { x: 560, y: 1220, s: .7 });

/* 3. every meeting is a game, playing blind */
bg(T('every meeting'), C.ink, { y: 1260 });
icon('die', T('game'), T('and if') - .05, { y: 1290, s: 1.3, enter: 'drop' });
[250, 450, 650].forEach((x, i) => {
  icon('people', T('each person wants') + i * .15, T('today') - .05, { x, y: 1390, s: .8 });
  icon('question', T('each person wants') + .3 + i * .15, T('today') - .05, { x, y: 1200, s: .8 });
});
stamp('BLIND', T('blind'), T('today') - .05, { y: 1300, size: 140, rot: -.12, color: C.pink });

/* 4. today we scan any room in five minutes */
bg(T('today'), C.violet, { y: 1260 });
decode('SCAN THE ROOM', T('scan'), J - .05, { y: 1120, size: 100, dur: .8, bg: C.lime });
icon('eye', T('fix that'), T('five minutes') - .05, { x: 450, y: 1340, s: 1.3 });
counter(T('five minutes'), J - .05, 0, 5, { y: 1340, dur: .5, label: 'minutes', size: 190 });

/* 5. after the cut: when someone objects, address the payoff, not the point */
bg(J + .02, C.orange, { y: 1260, sfx: false });
list(T('ask yourself') - .05, [['x:Argue the point', T('argue')]], { y: 1110 });
icon('warning', T('objects'), T('payoff') + .1, { x: 450, y: 1330, s: 1.2 });
icon('coin', T('payoff'), T('you will') - .05, { x: 320, y: 1300, s: 1.3 });
icon('warning', T('threatened'), T('address') - .05, { x: 600, y: 1260, s: .9 });
icon('check', T('address'), T('you will') - .05, { x: 600, y: 1290, s: 1.0 });
versus(T('you will'), T('stop listening') - .05, 'Payoff: minutes', 'Logic: hours', { y: 1280, winner: 'a', tWin: T('hours') + .3, ca: C.lime, cb: C.white });

/* 6. stop listening, start watching */
bg(T('stop listening'), C.violet, { y: 1260 });
icon('megaphone', T('stop listening'), T('start watching') - .05, { x: 450, y: 1290, s: 1.3 });
icon('cross', T('stop listening') + .5, T('start watching') - .05, { x: 600, y: 1180, s: .8 });
icon('eye', T('start watching'), VOICE_END - .1, { x: 450, y: 1400, s: 1.1 });
decode('WHAT THEY WANT', T('start watching'), VOICE_END - .1, { y: 1150, size: 100, dur: .5, bg: C.lime });
shake(T('what they want'), 14); burstFx(T('what they want'), STAGE.cx, 1280);
