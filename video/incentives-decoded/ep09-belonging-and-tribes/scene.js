/* Level 09, Belonging and Tribes: a city guy's pickup truck that is really membership, then "identity beats logic". */
const HOOK = "Why he really bought that truck";
const EMPH = ['tribe.', 'tribe', 'membership.', 'truck.', 'identity', 'logic,', 'family.', 'wallet', 'everywhere.', 'thinks.'];

/* pickup truck sticker (cab right, open bed left); flag shows on the rear window when flagP > 0 */
function truck(x, y, s, p, flagP = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s * p, s * p);
  shape(P(() => ctx.roundRect(-150, -6, 170, 66, 10)), C.orange);
  shape(P(() => { ctx.moveTo(10, 60); ctx.lineTo(10, -62); ctx.lineTo(70, -62); ctx.lineTo(112, -10); ctx.lineTo(154, -10); ctx.lineTo(154, 60); ctx.closePath(); }), C.cyan);
  shape(P(() => { ctx.moveTo(24, -12); ctx.lineTo(24, -48); ctx.lineTo(62, -48); ctx.lineTo(92, -12); ctx.closePath(); }), C.white, { shadow: false, lw: 6 });
  if (flagP > 0) { ctx.save(); ctx.translate(28, -44); ctx.scale(flagP, flagP); shape(P(() => ctx.rect(0, 0, 28, 20)), C.pink, { shadow: false, lw: 4 }); ctx.restore(); }
  [[-90, 62], [100, 62]].forEach(([wx, wy]) => { shape(P(() => ctx.arc(wx, wy, 32, 0, 7)), C.ink, { shadow: false }); ctx.fillStyle = C.lime; ctx.beginPath(); ctx.arc(wx, wy, 12, 0, 7); ctx.fill(); });
  ctx.restore();
}

/* the truck, the city, never hauled */
custom(T('drives'), T('ask him') - .05, (t, p) => { ctx.translate(0, Math.sin(t * 3) * 4); truck(STAGE.cx, 1290, 2.0, p); });
icon('house', T('lives'), T('ask him') - .05, { x: 680, y: 1120, s: .75 });
stamp('EMPTY BED', T('never'), T('ask him') - .05, { x: 330, y: 1160, color: C.pink, rot: -.12, size: 80 });

/* the reasons */
bg(T('ask him') - .05, C.pink, { y: 1260 });
icon('question', T('ask him'), T('reasons') + .05, { y: 1280, s: 1.4 });
bubble(T('reasons') + .1, T('but the') - .05, 'Towing capacity', { side: 'left', y: 1110, fill: C.white });
bubble(T('safety'), T('but the') - .05, 'Safety', { side: 'right', y: 1250, fill: C.lime });
bubble(T('resale'), T('but the') - .05, 'Resale value', { side: 'left', y: 1390, fill: C.white });

/* the real reason: the sticker, the flag, the tribe */
bg(T('but the'), C.ink, { y: 1290 });
icon('eye', T('but the'), T('sticker') - .05, { y: 1280, s: 1.4 });
custom(T('sticker'), T('he is not') - .05, (t, p) => { truck(390, 1300, 1.5, p, eback(prog(t, T('the flag'), .3))); });
arrowFx(T('on the back'), T('he is not') - .05, 560, 1130, 440, 1230, { color: C.lime });
[0, 1, 2].forEach(i => icon('people', T('the tribe') + i * .18, T('he is not') - .05, { x: 640 + (i - 1) * 90, y: 1160 + i % 2 * 80 + 120, s: .55 }));
versus(T('he is not'), T('and he', 2) - .05, 'A truck', 'Membership', { y: 1270, ca: C.white, cb: C.lime, winner: 'b', tWin: T('buying', 2) });

/* defend it like family */
bg(T('and he', 2), C.violet, { y: 1260 });
icon('people', T('defend'), T('because') - .05, { x: 300, y: 1290, s: 1.3 });
icon('heart', T('family') - .1, T('because') - .05, { x: 640, y: 1290, s: 1.3 });
icon('thought', T('in his'), T('people') - .05, { y: 1290, s: 1.5 });
icon('heart', T('it is'), T('people') - .05, { x: 455, y: 1268, s: .55 });

/* after the cut: identity beats logic */
bg(T('people') - .1, C.cyan, { y: 1260, sfx: false });
icon('check', T('people'), T('buy') - .05, { x: 450, y: 1160, s: .8 });
icon('coin', T('wallet'), T('buy') - .05, { x: 250, y: 1340, s: 1.2 });
icon('cross', T('wallet') + .2, T('buy') - .05, { x: 250, y: 1340, s: .8 });
arrowFx(T('to stay'), T('buy') - .05, 350, 1340, 540, 1340, { color: C.pink });
icon('people', T('tribe', 2), T('buy') - .05, { x: 690, y: 1330, s: 1.2 });
icon('gift', T('buy'), T('argue') - .05, { x: 280, y: 1290, s: 1.2 });
icon('chartDown', T('budget') - .15, T('argue') - .05, { x: 620, y: 1290, s: 1.2 });
icon('megaphone', T('argue'), T('identity') - .05, { x: 270, y: 1290, s: 1.2 });
stamp('FACTS', T('facts') - .1, T('identity') - .05, { x: 640, y: 1290, color: C.ink, rot: -.1, size: 110 });
icon('cross', T('facts') + .1, T('identity') - .05, { x: 640, y: 1290, s: .8 });
versus(T('identity'), T('and once') - .05, 'Identity', 'Logic', { y: 1270, ca: C.lime, cb: C.white, winner: 'a', tWin: T('logic') });
icon('eye', T('and once'), T('you do not') - .05, { y: 1280, s: 1.4 });
[['people', 250, 1130], ['crown', 650, 1140], ['phone', 230, 1450], ['house', 670, 1450]].forEach(([k, x, y], i) =>
  icon(k, T('everywhere') - .2 + i * .1, T('you do not') - .05, { x, y, s: .6, rot: i % 2 ? .2 : -.2 }));

/* payoff */
bg(T('you do not') - .1, C.violet, { y: 1260 });
icon('thought', T('you do not'), T('you believe') - .05, { y: 1280, s: 1.5 });
icon('cross', T('believe'), T('you believe') - .05, { x: 455, y: 1270, s: .7 });
decode('TRIBE', T('your tribe') - .1, VOICE_END - .1, { y: 1180, size: 190, bg: C.lime, dur: .6 });
[0, 1, 2].forEach(i => icon('people', T('believe', 2) + i * .2, VOICE_END - .1, { x: 250 + i * 200, y: 1440, s: .75 }));
shake(T('tribe', 3) + .2, 14); burstFx(T('tribe', 3) + .2, STAGE.cx, 1230);
