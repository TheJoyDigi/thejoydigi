/* Level 23, Skin in the Game: chef vs critic and consultant, the trust test, then "ask what they stand to lose". */
const HOOK = "Who loses if they're wrong?";
const EMPH = ['chef', 'loses', 'critic', 'skin', 'cheap', 'trust', 'lose', 'opinions', 'think'];
const J = CLIP.joins[0];

/* 1. critic loses nothing, chef loses everything */
icon('megaphone', T('food critic'), T('chef loses') - .05, { y: 1280, s: 1.3 });
custom(T('food critic') + .15, T('chef loses') - .05, (t, p) => { ctx.translate(STAGE.cx, 1450); ctx.scale(Math.min(p, 1), Math.min(p, 1)); chip('FOOD CRITIC', 0, -30, C.lime, C.ink, 30, 'center'); });
meter(T('chef loses'), T('careful') - .05, 'the chef loses', 0, 1, { y: 1180, color: C.pink, dur: .8 });
meter(T('critic loses'), T('careful') - .05, 'the critic loses', 0, 0, { y: 1380 });
icon('scale', T('careful'), T('guess') - .05, { y: 1290, s: 1.4 });
icon('question', T('guess'), T('a consultant') - .05, { y: 1290, s: 1.5 });

/* 2. the consultant sends the invoice either way */
bg(T('a consultant'), C.pink, { y: 1260 });
icon('briefcase', T('consultant'), T('if it fails') - .05, { y: 1290, s: 1.4 });
icon('briefcase', T('if it fails'), T('flies home') - .05, { x: 330, y: 1290, s: 1.1 });
icon('cross', T('fails'), T('flies home') - .05, { x: 620, y: 1210, s: .9 });
stamp('INVOICE SENT', T('invoice'), T('flies home') - .05, { y: 1420, size: 80, rot: -.08, color: C.ink });
icon('house', T('flies home'), T('the chef has') - .05, { x: 330, y: 1300, s: 1.3 });
icon('arrow', T('flies home'), T('the chef has') - .05, { x: 640, y: 1300, s: 1.0, rot: 3.14 });
icon('check', T('either way'), T('the chef has') - .05, { x: 620, y: 1190, s: .7 });

/* 3. skin in the game: chef has it, critic and consultant do not */
bg(T('the chef has'), C.ink, { y: 1260 });
decode('SKIN IN THE GAME', T('skin'), T('advice is') - .05, { y: 1100, size: 100, dur: .8 });
icon('house', T('the chef has'), T('advice is') - .05, { x: 230, y: 1340, s: 1.0 });
icon('check', T('the chef has') + .3, T('advice is') - .05, { x: 340, y: 1250, s: .6 });
icon('megaphone', T('the critic and'), T('advice is') - .05, { x: 520, y: 1340, s: .8 });
icon('briefcase', T('the critic and') + .3, T('advice is') - .05, { x: 680, y: 1340, s: .8 });
icon('cross', T('do not') , T('advice is') - .05, { x: 600, y: 1240, s: .6 });
shake(T('everything', 2), 10);

/* 4. advice is cheap when the advisor does not suffer; the trust test */
bg(T('advice is'), C.violet, { y: 1260 });
icon('thought', T('advice is'), T('trust test') - .05, { x: 450, y: 1290, s: 1.4 });
stamp('CHEAP', T('cheap'), T('trust test') - .05, { y: 1300, size: 120, rot: -.12, color: C.lime });
icon('cross', T('suffer'), T('trust test') - .05, { x: 650, y: 1180, s: .8 });
decode('THE TRUST TEST', T('trust test'), J - .05, { y: 1290, size: 110, dur: .7, bg: C.lime });
shake(T('trust test') + .7, 10);

/* 5. after the cut: something to lose is the only one worth hearing */
bg(J + .02, C.orange, { y: 1260, sfx: false });
icon('megaphone', T('in a world'), T('free opinions') + .1, { y: 1290, s: 1.3 });
[250, 450, 650].forEach((x, i) => icon('thought', T('free opinions') + i * .12, T('something to lose') - .05, { x, y: 1280, s: .8, rot: (i - 1) * .12 }));
stamp('FREE', T('free opinions') + .3, T('something to lose') - .05, { y: 1290, size: 130, rot: -.1, color: C.ink });
icon('people', T('something to lose'), T('do not ask') - .05, { x: 450, y: 1290, s: 1.4 });
[[250, 1200], [650, 1200], [450, 1470]].forEach(([x, y], i) => icon('coin', T('lose') + i * .12, T('do not ask') - .05, { x, y, s: .6 }));
icon('check', T('worth hearing'), T('do not ask') - .05, { x: 650, y: 1160, s: .8 });

/* 6. do not ask what they think, ask what they stand to lose */
bg(T('do not ask'), C.violet, { y: 1260 });
icon('thought', T('do not ask'), T('ask what') - .05, { y: 1290, s: 1.4 });
icon('cross', T('think'), T('ask what') - .05, { x: 620, y: 1180, s: .9 });
icon('question', T('ask what'), T('stand to lose') - .05, { y: 1290, s: 1.4 });
decode('STAND TO LOSE', T('stand to lose'), VOICE_END - .1, { y: 1150, size: 120, bg: C.lime, dur: .6 });
[[250, 1400], [450, 1430], [650, 1400]].forEach(([x, y], i) => icon('coin', TE('stand to lose') - .3 + i * .1, VOICE_END - .1, { x, y, s: .8, enter: 'drop' }));
shake(T('stand to lose') + .6, 14); burstFx(T('stand to lose') + .6, STAGE.cx, 1290);
