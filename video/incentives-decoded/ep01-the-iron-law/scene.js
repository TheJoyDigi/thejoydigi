/* Level 01, The Iron Law: cold open (phone + attention) then Munger's line and "the iron law". */
const HOOK = "Why you can't stop scrolling";
const EMPH = ['incentive', 'incentive,', 'incentives', 'attention', 'scroll', 'scroll.', 'payoff', 'iron', 'law'];

/* cold open: the phone */
icon('question', T('quick') + .1, T('phone') - .15, { y: 1280, s: 1.1 });
icon('phone', T('phone'), T('smartest') - .1, { y: 1290, s: 1.25, enter: 'drop' });
[['bell', 270, 1130, -.2], ['bell', 640, 1170, .25], ['bell', 300, 1450, .15]].forEach(([k, x, y, rot], i) =>
  icon(k, T('today') + i * .18, T('smartest') - .1, { x, y, s: .55, rot }));

/* "smartest people alive ... their incentive is not your happiness" */
icon('people', T('smartest'), T('happiness') - .1, { y: 1270, s: 1.1 });
icon('heart', T('happiness'), T('their incentive is your') - .1, { y: 1270, s: 1.1 });
stamp('NOT THE GOAL', T('happiness') + .35, T('their incentive is your') - .1, { y: 1290 });

/* attention is the product */
decode('ATTENTION', T('attention'), T('paid') - .05, { y: 1180, size: 120 });
icon('eye', T('attention') + .2, T('paid') - .05, { y: 1400, s: .9 });
[0, 1, 2].forEach(i => icon('coin', T('paid') + i * .14, T('machines') - .05, { x: 240 + i * 210, y: 1250 - i * 30, s: .75 }));
icon('phone', T('machines'), T('it works') - .05, { y: 1290, s: 1.1 });
arrowFx(T('make you scroll'), T('it works') - .05, 700, 1420, 700, 1120, { color: C.pink });
arrowFx(T('make you scroll') + .25, T('it works') - .05, 200, 1120, 200, 1420, { color: C.pink });
slam('IT WORKS.', T('it works'), T('on everyone') - .05, { y: 1180 });
[['people', 250, 1420], ['people', 450, 1440], ['people', 650, 1420]].forEach(([k, x, y], i) =>
  icon(k, T('on you') + i * .32, T('willpower') - .1, { x, y, s: .6 }));

/* not willpower: incentives */
versus(T('willpower'), T('once you learn') - .05, 'Willpower problem', 'Incentive problem', { y: 1270, winner: 'b', tWin: T('incentive problem') });
bg(T('spot'), C.ink, { y: 1300 });
icon('eye', T('spot'), T('everywhere') + .1, { y: 1280, s: 1.3 });
[['coin', 230, 1110], ['phone', 680, 1140], ['bell', 210, 1450], ['heart', 690, 1450], ['crown', 450, 1520]].forEach(([k, x, y], i) =>
  icon(k, T('everywhere') + i * .07, T('show me the') - .35, { x, y, s: .5, rot: (i % 2 ? .2 : -.2) }));

/* after the cut: Munger's line, then the law */
bg(T('show me the') - .1, C.violet, { sfx: false });
custom(T('show me the'), T('that is the iron') - .05, (t, p) => {
  ctx.translate(STAGE.cx, 1250); ctx.rotate(-.03); ctx.scale(p, p);
  pill(-300, -150, 600, 300, C.white, { r: 30, shadow: 12, lw: 7 });
  stext('"Show me the', 0, -70, 64, { color: C.ink, stroke: 0, shadow: 0 });
  stext('incentive..."', 0, 4, 64, { color: C.violet, stroke: 0, shadow: 0 });
  if (t > T('show you the')) stext('...the outcome.', 0, 82, 56, { color: C.ink, stroke: 0, shadow: 0 });
});
custom(T('show me the') + .3, T('that is the iron') - .05, (t, p) => { ctx.translate(STAGE.cx + 150, 1440); ctx.rotate(.04); ctx.scale(p, p); chip('CHARLIE MUNGER', 0, -30, C.lime, C.ink, 26, 'center'); });
cue(T('show me the'), 'pop', { f: 1.2 }); cue(T('show you the'), 'pop', { f: 1.5 });

bg(T('that is the iron'), C.pink, { y: 1260 });
decode('THE IRON LAW', T('iron'), T('speeches') - .1, { y: 1180, size: 120, bg: C.lime, dur: .6 });
shake(T('law') + .1, 14); burstFx(T('law') + .1, STAGE.cx, 1260);
list(VOICE_END - .1, [['x:Not speeches', T('speeches')], ['x:Not mission statements', T('mission statements')], ['The payoff', T('to the payoff')]], { y: 1110, gap: 140 });
