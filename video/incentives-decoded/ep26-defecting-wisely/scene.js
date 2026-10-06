/* Level 26, Defecting Wisely: the unwritten office rule, one pawn leaves at five, then "stop donating your compliance". */
const HOOK = "Nobody leaves before the boss";
const EMPH = ['unwritten', 'defected', 'defected.', 'break', 'survive', 'rebellion.', 'better', 'compliance.', 'donating'];

/* local pawn so the followers can change colour */
const pawnC = col => shape(P(() => { ctx.arc(0, -52, 34, 0, 7); ctx.moveTo(-26, -24); ctx.lineTo(26, -24); ctx.lineTo(40, 50); ctx.lineTo(66, 50); ctx.lineTo(66, 88); ctx.lineTo(-66, 88); ctx.lineTo(-66, 50); ctx.lineTo(-40, 50); ctx.closePath(); }), col);

/* cold open: the unwritten rule */
icon('briefcase', T('office'), T('do not') - .05, { y: 1290, s: 1.25 });
stamp('UNWRITTEN', T('unwritten'), T('do not') + .2, { y: 1440, rot: -.1 });
icon('lock', T('do not'), T('boss') - .05, { y: 1290, s: 1.25 });
icon('crown', T('boss'), T('work') - .05, { y: 1280, s: 1.35, enter: 'drop' });
icon('check', T('work'), T('even if', 2) - .05, { y: 1290, s: 1.25 });
icon('people', T('just'), T('everyone') - .05, { x: 270, y: 1290, s: 1.0 });
icon('hourglass', T('sitting'), T('everyone') - .05, { x: 630, y: 1290, s: 1.1 });

/* everyone complies, one pawn defects, others follow */
bg(T('everyone') - .1, C.ink, { y: 1300 });
const PX = [190, 320, 450, 580, 710];
const followAt = [T('others') - .2, T('others') + .2, null, T('others') + .55, T('others') + .9];
custom(T('everyone'), T('rule dies') - .1, (t, p) => {
  const defect = T('one person'), walk = T('they leave');
  PX.forEach((x, i) => {
    const pin = clamp(prog(t, T('everyone') + i * .1, .3));
    let y = 1430, px = x, col = C.cyan, s = .85, hop = 0;
    if (i === 2) {
      const h = eo(prog(t, defect, .45));
      y -= 190 * h; px += 200 * eio(prog(t, walk, 1.4));
      if (t >= defect) { col = C.lime; s = .85 + .25 * h; }
      if (t >= defect) {
        ctx.save(); ctx.translate(px, y - 20); ctx.globalAlpha = .55 * (.6 + .4 * Math.sin(t * 9)); ctx.strokeStyle = C.lime; ctx.lineWidth = 10;
        ctx.beginPath(); ctx.arc(0, 0, 150 + 12 * Math.sin(t * 6), 0, 7); ctx.stroke(); ctx.restore();
      }
    } else if (followAt[i] != null && t >= followAt[i]) {
      col = C.lime; const q = prog(t, followAt[i], .5); hop = Math.sin(q * Math.PI) * 80;
    }
    ctx.save(); ctx.translate(px, y - hop); ctx.scale(s * eback(pin), s * eback(pin)); pawnC(col); ctx.restore();
  });
});
stamp('STUPID', T('stupid'), T('until') - .05, { y: 1180, rot: -.12 });
icon('star', T('excellent') - .2, T('slowly'), { x: 640, y: 1120, s: 1.1 });
icon('clock', T('five') - .3, T('their') - .05, { x: 300, y: 1130, s: 1.15, enter: 'drop' });
custom(T('five'), T('their') - .05, (t, p) => { ctx.translate(300, 1250); ctx.scale(p, p); chip('5:00', 0, -35, C.lime, C.ink, 40, 'center'); });

/* the rule dies */
icon('lock', T('rule dies'), T('meeting') - .05, { y: 1270, s: 1.25 });
stamp('DEAD', T('dies'), T('meeting') - .05, { y: 1290, rot: -.14 });
list(T('someone') - .1, [['x:Meeting', T('meeting')], ['x:Memo', T('memo')], ['x:Permission', T('permission')]], { y: 1110, gap: 140 });

/* someone defected, the game got better */
bg(T('someone') - .1, C.lime, { y: 1250 });
decode('DEFECTED', T('defected'), T('today') - .05, { y: 1160, size: 120, bg: C.ink, color: C.lime, dur: .6 });
icon('chartUp', T('got'), T('today') - .05, { y: 1420, s: 1.1 });
icon('question', T('learn'), T('break') - .05, { y: 1280, s: 1.2 });
icon('lightning', T('break'), T('the goal') - .3, { x: 250, y: 1290, s: 1.25 });
icon('heart', T('survive'), T('the goal') - .3, { x: 650, y: 1290, s: 1.25 });
arrowFx(T('survive') - .1, T('the goal') - .3, 340, 1290, 560, 1290, { color: C.pink });

/* the payoff segment */
bg(T('the goal') - .1, C.pink, { y: 1260, sfx: false });
versus(T('the goal'), T('defect') - .1, 'Rebellion', 'Better games', { y: 1270, winner: 'b', tWin: T('better games') });
icon('cross', T('defect'), T('good one') - .05, { x: 220, y: 1270, s: .95 });
arrowFx(T('build'), T('who follows') - .05, 320, 1270, 430, 1270, { color: C.ink });
icon('house', T('build'), T('bad games') - .1, { x: 600, y: 1270, s: 1.2 });
[['people', 250, 1450], ['people', 450, 1470], ['people', 650, 1450]].forEach(([k, x, y], i) =>
  icon(k, T('who follows') + i * .22, T('bad games') - .1, { x, y, s: .65 }));

bg(T('bad games') - .1, C.ink, { y: 1250 });
icon('magnet', T('bad games'), T('stop') - .05, { y: 1160, s: 1.1 });
arrowFx(T('need your') - .1, T('stop') - .05, 170, 1400, 360, 1220, { color: C.pink });
arrowFx(T('need your') + .1, T('stop') - .05, 730, 1400, 540, 1220, { color: C.pink });
decode('COMPLIANCE', T('compliance'), T('stop') - .05, { y: 1440, size: 100, bg: C.lime, dur: .7 });
slam('STOP.', T('stop'), VOICE_END - .1, { y: 1220, bg: C.pink, size: 200, shake: 16 });
[0, 1, 2].forEach(i => icon('coin', T('donating') + i * .15, VOICE_END - .1, { x: 250 + i * 200, y: 1460 - (i % 2) * 20, s: .7, enter: 'drop' }));
burstFx(T('stop') + .1, STAGE.cx, 1220);
