/* Level 04, Follow the Money: a "free" app, who is paying, then "there is no free, only paid by someone else". */
const HOOK = "If the app is free, who pays?";
const EMPH = ['free', 'free.', 'free,', 'product.', 'customer', 'customer,', 'customer.', 'paying', 'pays', 'collects', 'else.', 'inventory.', 'money?'];

/* the free app */
icon('phone', T('app'), T('no subscription') - .05, { y: 1290, s: 1.25, enter: 'drop' });
stamp('FREE', T('free'), T('no subscription') - .05, { y: 1440, color: C.lime, rot: -.12, size: 120 });
list(T('millions') - .1, [['x:Subscription', T('subscription')], ['x:Ads you can see', T('no ads')]], { y: 1150, gap: 140 });
[[250, 1330], [450, 1280], [650, 1330]].forEach(([x, y], i) => icon('people', T('millions') + i * .2, T('so how') - .05, { x, y, s: .85 }));

/* so who is paying? */
bg(T('so how') - .05, C.pink, { y: 1260 });
icon('question', T('so how'), T('make money') + .1, { x: 300, y: 1280, s: 1.3 });
icon('coin', T('money'), T('somebody') - .05, { x: 640, y: 1280, s: 1.2, enter: 'drop' });
custom(T('somebody'), T('somebody', 2) - .05, (t, p) => {
  ctx.translate(STAGE.cx, 1280); ctx.scale(p, p);
  [-120, 0, 120].forEach((y, i) => {
    pill(-210, y - 48, 420, 96, C.white, { r: 18, shadow: 10, lw: 6 });
    [0, 1, 2].forEach(k => { const on = Math.sin(t * 6 + i * 2 + k) > 0; ctx.fillStyle = on ? C.lime : '#9A96A8'; ctx.strokeStyle = C.ink; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(-160 + k * 44, y, 12, 0, 7); ctx.fill(); ctx.stroke(); });
    pill(20, y - 14, 150, 28, '#E4E1EC', { shadow: 0, lw: 0 });
  });
});
icon('people', T('somebody', 2) + .1, T('if you are') - .05, { x: 280, y: 1280, s: 1.2 });
icon('coin', T('paying', 2), T('if you are') - .05, { x: 650, y: 1190, s: .9 });
arrowFx(T('engineers') - .1, T('if you are') - .05, 560, 1220, 400, 1270, { color: C.lime });

/* customer vs product */
bg(T('if you are'), C.ink, { y: 1290 });
versus(T('if you are'), T('your attention') - .05, 'Customer', 'Product', { y: 1270, ca: C.white, cb: C.pink });
stamp('YOU', T('you are the'), T('your attention') - .05, { x: 640, y: 1130, color: C.lime, rot: .12, size: 110 });
icon('eye', T('attention'), T('you just') - .05, { x: 230, y: 1290, s: 1.1 });
arrowFx(T('sold'), T('you just') - .05, 330, 1290, 570, 1290, { color: C.lime });
icon('briefcase', T('someone'), T('you just') - .05, { x: 680, y: 1290, s: 1.1 });
icon('handshake', T('invited') - .1, T('every free') - .05, { y: 1280, s: 1.3 });
stamp('NOT INVITED', T('not invited'), T('every free') - .05, { y: 1290, color: C.pink, rot: -.1, size: 90 });

/* every free thing has a price */
bg(T('every free'), C.cyan, { y: 1260 });
icon('gift', T('every free'), T('who pays') - .05, { y: 1430, s: .9 });
decode('A PRICE', T('has a price') - .1, T('who pays') - .05, { y: 1220, size: 140, bg: C.white, dur: .5 });
versus(T('who pays'), T('when something') - .05, 'Who pays?', 'Who collects?', { y: 1270, ca: C.white, cb: C.lime });
arrowFx(T('collects'), T('when something') - .05, 300, 1440, 600, 1440, { color: C.pink });

/* after the cut: the real customer */
bg(T('when something') - .1, C.violet, { y: 1260, sfx: false });
icon('gift', T('when something'), T('find') - .05, { y: 1280, s: 1.3 });
icon('target', T('find'), T('free app') - .05, { y: 1280, s: 1.3 });
stamp('REAL CUSTOMER', T('real customer'), T('free app') - .05, { y: 1440, color: C.lime, rot: -.06, size: 78 });
list(T('there is no') - .05, [['App: advertisers', T('free app')], ['Content: attention', T('free content')], ['Advice: advisor sells', T('free advice')]], { y: 1150, gap: 150 });

/* payoff */
bg(T('there is no') - .1, C.pink, { y: 1260 });
slam('NO', T('no free'), T('only paid') - .05, { y: 1150, bg: C.lime, size: 200, shake: 16 });
slam('FREE', T('no free') + .25, T('only paid') - .05, { y: 1350, bg: C.white, size: 200, rot: .04, shake: 10 });
icon('coin', T('only paid'), VOICE_END - .1, { x: 230, y: 1280, s: 1.2 });
arrowFx(T('by someone'), VOICE_END - .1, 340, 1280, 560, 1280, { color: C.ink });
icon('people', T('someone else'), VOICE_END - .1, { x: 690, y: 1280, s: 1.2 });
burstFx(T('else'), STAGE.cx, 1260);
