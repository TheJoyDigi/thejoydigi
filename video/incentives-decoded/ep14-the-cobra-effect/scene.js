/* Level 14, The Cobra Effect: the Delhi cobra story (told as "the story goes") then "every incentive is an invitation to be creative". */
const HOOK = "The cobra bounty that backfired";
const EMPH = ['cobra', 'cobras', 'cobras?', 'bounty', 'bounty.', 'cash.', 'success.', 'dead', 'story', 'creative', 'creative.', 'incentive', 'invitation', 'direction'];

const tag = (t0, t1, text, x, y, fill, o = {}) => custom(t0, t1, (t, p) => {
  ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(Math.min(p, 1.1), Math.min(p, 1.1)); chip(text, 0, -30, fill, C.ink, o.size || 30, 'center');
});

/* the story goes: Delhi, British rule */
tag(.05, T('under') + .4, 'THE STORY GOES', 450, 1170, C.lime, { rot: -.04, size: 54 });
tag(T('delhi'), T('under') + .4, 'DELHI, INDIA', 450, 1310, C.white, { rot: .03, size: 54 });
tag(T('british'), T('city') - .05, 'BRITISH RULE', 450, 1450, C.cyan, { rot: -.03, size: 54 });

/* the cobra problem */
icon('snake', T('city'), T('too') - .05, { y: 1280, s: 1.9 });
[[230, 1170], [660, 1170], [230, 1420], [660, 1420]].forEach(([x, y], i) => icon('snake', T('too') + i * .15, T('so') - .05, { x, y, s: .95, rot: i % 2 ? .2 : -.2, sfx: i < 2 }));
icon('warning', T('venomous'), T('so') - .05, { x: 450, y: 1290, s: .95 });

/* the bounty */
bg(T('so') - .1, C.pink, { y: 1260 });
icon('megaphone', T('government'), T('bring') - .05, { x: 300, y: 1260, s: 1.4 });
icon('coin', T('bounty') - .1, T('bring') - .05, { x: 620, y: 1260, s: 1.4 });
tag(T('bounty'), T('bring') - .05, 'BOUNTY', 450, 1450, C.lime, { size: 40 });
icon('snake', T('bring'), T('it') - .05, { x: 230, y: 1280, s: 1.3 });
stamp('DEAD', T('dead'), T('it') - .05, { x: 230, y: 1300, rot: -.2, color: C.ink });
arrowFx(T('dead'), T('it') - .05, 330, 1280, 530, 1280, { color: C.ink });
icon('coin', T('cash'), T('it') - .05, { x: 680, y: 1280, s: 1.5 });

/* it works */
icon('people', T('streets'), T('success') - .05, { y: 1200, s: 1.2 });
[0, 1, 2, 3, 4].forEach(i => icon('snake', T('dead', 2) + i * .12, T('until') - .05, { x: 170 + i * 130, y: 1400 + (i % 2) * 40, s: .75, rot: (i - 2) * .25, sfx: i % 2 === 0 }));
icon('check', T('works'), T('dead', 2) - .05, { y: 1280, s: 1.4 });
icon('check', T('safer'), T('until') - .05, { x: 640, y: 1160, s: .8 });
slam('SUCCESS', T('success'), T('until') - .05, { y: 1220, bg: C.lime });

/* until someone realizes */
bg(T('until') - .1, C.ink, { y: 1260 });
icon('thought', T('until'), T('cobras are') - .05, { y: 1280, s: 1.8 });
icon('question', T('realizes'), T('cobras are') - .05, { x: 640, y: 1160, s: .7, sfx: false });
icon('snake', T('cobras are'), T('so', 2) - .05, { x: 450, y: 1400, s: 1.2 });
icon('coin', T('money'), T('so', 2) - .05, { x: 450, y: 1160, s: 1.2 });
arrowFx(T('money') + .1, T('so', 2) - .05, 450, 1330, 450, 1240, { color: C.lime });

/* so why not make more cobras? breeding them */
icon('thought', T('why'), T('make') - .05, { y: 1230, s: 1.5 });
[0, 1, 2].forEach(i => icon('snake', T('make') + i * .2, T('in', 4) - .05, { x: 200 + i * 250, y: 1440 + (i % 2) * 30, s: .85, rot: (i - 1) * .3, sfx: true }));
icon('house', T('breeding'), T('in', 4) - .05, { x: 450, y: 1200, s: 1.6 });
tag(T('basements'), T('in', 4) - .05, 'BASEMENT', 450, 1330, C.lime, { size: 40 });

/* the bounty is cancelled, breeders release their snakes */
bg(T('in', 4) - .05, C.violet, { y: 1260 });
tag(T('in', 4), T('and') - .05, 'IN THE STORY', 450, 1130, C.white, { rot: -.03, size: 36 });
icon('coin', T('bounty', 2), T('overnight'), { y: 1340, s: 1.3 });
stamp('CANCELLED', T('cancelled'), T('overnight'), { y: 1350, rot: -.14, color: C.pink });
icon('hourglass', T('overnight'), T('breeders'), { y: 1290, s: 1.3 });
icon('house', T('breeders'), T('now-worthless') - .05, { x: 450, y: 1260, s: 1.3 });
arrowFx(T('released'), T('now-worthless') - .05, 340, 1260, 150, 1260, { color: C.lime });
arrowFx(T('released') + .1, T('now-worthless') - .05, 560, 1260, 750, 1260, { color: C.lime });
icon('snake', T('their snakes') + .1, T('now-worthless') - .05, { x: 120, y: 1420, s: .95, rot: -.3 });
icon('snake', T('their snakes') + .1, T('now-worthless') - .05, { x: 760, y: 1420, s: .95, rot: .3, sfx: false });

/* worthless cobras into the wild */
icon('coin', T('now-worthless'), T('more', 2) - .05, { x: 450, y: 1160, s: 1.1 });
icon('cross', T('now-worthless') + .3, T('more', 2) - .05, { x: 560, y: 1230, s: .6, sfx: false });
[[180, 1330], [450, 1370], [720, 1330], [300, 1470], [600, 1480], [140, 1470], [760, 1470]].forEach(([x, y], i) =>
  icon('snake', T('cobras', 4) - .1 + i * .13, T('every') - .05, { x, y, s: .8, rot: (i - 3) * .15, sfx: i % 2 === 0 }));
slam('MORE COBRAS', T('more', 2), T('every') - .05, { y: 1150, bg: C.pink });

/* after the cut: an invitation to be creative */
bg(T('every') - .1, C.lime, { y: 1260, sfx: false });
decode('INCENTIVE', T('incentive'), T('invitation') - .05, { y: 1160, size: 120, bg: C.violet, color: C.white, dur: .6 });
icon('coin', T('incentive'), T('invitation') - .05, { y: 1370, s: 1.2 });
custom(T('invitation'), T('make', 2) - .05, (t, p) => {
  ctx.translate(STAGE.cx, 1260); ctx.rotate(-.04); ctx.scale(Math.min(p, 1.1), Math.min(p, 1.1));
  pill(-190, -110, 380, 220, C.white, { r: 20, shadow: 12, lw: 7 });
  shape(P(() => { ctx.moveTo(-190, -110); ctx.lineTo(0, 20); ctx.lineTo(190, -110); }), C.pink, { shadow: false, lw: 7 });
  chip('INVITATION', 0, 40, C.violet, C.white, 34, 'center');
});
[[200, 1470], [450, 1480], [700, 1470]].forEach(([x, y], i) => icon('star', T('creative') + i * .1, T('make', 2) - .05, { x, y, s: .55, rot: (i - 1) * .3 }));

bg(T('make', 2) - .1, C.violet, { y: 1260 });
[[200, 1130], [700, 1150], [450, 1470]].forEach(([x, y], i) => arrowFx(T('they get') + i * .1, T('direction') + .1, 450, 1300, x, y, { color: [C.pink, C.cyan, C.orange][i] }));
icon('target', T('direction'), VOICE_END - .1, { x: 680, y: 1300, s: 1.5 });
arrowFx(T('direction') + .15, VOICE_END - .1, 160, 1300, 520, 1300, { color: C.lime });
shake(T('want') + .05, 14); burstFx(T('want') + .05, STAGE.cx, 1260);
