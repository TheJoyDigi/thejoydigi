/* Level 12, The Principal-Agent Problem: cold open (the mechanic who knows you have no idea) then "pay them to deliver". */
const HOOK = "Your mechanic knows you're guessing";
const EMPH = ['mechanic', 'idea.', 'principal-agent', 'agent.', 'principal.', 'incentives.', 'care', 'deliver.'];

function car(t, s) {
  ctx.scale(s, s);
  shape(P(() => { ctx.moveTo(-70, -30); ctx.lineTo(-40, -78); ctx.lineTo(40, -78); ctx.lineTo(74, -30); ctx.closePath(); }), C.cyan);
  pill(-120, -40, 240, 74, C.pink, { r: 26, shadow: 10, lw: 7 });
  [-70, 70].forEach(x => { ctx.save(); ctx.translate(x, 36); ctx.rotate(t * 5); shape(P(() => ctx.arc(0, 0, 30, 0, 7)), C.ink, { shadow: false }); ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(0, 0, 11, 0, 7); ctx.fill(); ctx.fillStyle = C.ink; ctx.fillRect(-3, -22, 6, 14); ctx.restore(); });
}
function role(x, y, label, fill) {
  return (t, p) => {
    ctx.translate(x, y); ctx.scale(Math.min(p, 1.1), Math.min(p, 1.1));
    ctx.save(); ctx.scale(1.5, 1.5); ICONS.pawn(); ctx.restore();
    chip(label, 0, 130, fill, C.ink, 30, 'center');
  };
}

/* the car, the mechanic */
custom(.05, T('he'), (t, p) => { ctx.translate(STAGE.cx - 70 + Math.sin(t * 6) * 2, 1290); car(t, 1.5 * Math.min(p, 1.1)); });
icon('pawn', T('mechanic'), T('he'), { x: 700, y: 1260, s: 1.2 });
icon('phone', T('calls') - .05, T('good') - .05, { y: 1280, s: 1.5, enter: 'drop' });
versus(T('good'), T('brakes') - .05, 'Good news', 'Bad news', { y: 1270 });
icon('check', T('brakes'), T('while') - .05, { x: 300, y: 1280, s: 1.1 });
custom(T('brakes') + .1, T('while') - .05, (t, p) => { ctx.translate(560, 1280); ctx.rotate(.05); ctx.scale(Math.min(p, 1.1), Math.min(p, 1.1)); chip('BRAKES', 0, -30, C.lime, C.ink, 40, 'center'); });
icon('eye', T('while'), T('cracked') - .05, { y: 1280, s: 1.4 });
list(T('is it') - .1, [['x:Cracked belt', T('cracked')], ['x:Leaking gasket', T('leaking')], ['x:Control arm', T('control')]], { y: 1120, gap: 135 });

/* is it real? urgent? $900 or $90? */
bg(T('is it') - .15, C.pink, { y: 1250 });
bubble(T('is it'), T('is it', 3) - .05, 'Is it real?', { side: 'left', y: 1130 });
bubble(T('urgent') - .3, T('is it', 3) - .05, 'Is it urgent?', { side: 'right', y: 1290 });
versus(T('nine'), T('you', 2) - .05, '$900 repair', '$90 repair with a story', { y: 1270 });

icon('question', T('is it') + .3, T('is it', 3) - .05, { x: 280, y: 1440, s: 1.1 });
icon('warning', T('urgent'), T('is it', 3) - .05, { x: 600, y: 1440, s: 1.1 });

/* you have no idea, and he knows it */
icon('question', T('have'), T('and he') + .1, { x: 450, y: 1200, s: 1.4 });
custom(T('have'), T('that') - .05, role(260, 1330, 'YOU', C.white));
custom(T('knows'), T('that') - .05, role(640, 1330, 'THE MECHANIC', C.lime));
icon('eye', T('knows'), T('that') - .05, { x: 640, y: 1130, s: 1.1 });
icon('question', T('have', 2) + .1, T('that') - .05, { x: 260, y: 1130, s: .9, sfx: false });

/* the knowledge gap */
bg(T('that') - .1, C.ink, { y: 1300 });
meter(T('what'), T('principal-agent') - .05, 'What you know', 0, .25, { y: 1170, dur: .8, color: C.cyan });
meter(T('what', 2), T('principal-agent') - .05, 'What he knows', 0, 1, { y: 1340, dur: .8, color: C.pink });
decode('PRINCIPAL', T('principal-agent'), T('and it') - .05, { y: 1120, size: 100, bg: C.lime, dur: .8 });
decode('AGENT', T('principal-agent') + .2, T('and it') - .05, { y: 1250, size: 100, bg: C.lime, dur: .6 });
stamp('PROBLEM', T('problem'), T('and it') - .05, { y: 1400, rot: -.1, color: C.pink });

/* eating your money */
icon('coin', T('and it') - .1, T('because') - .05, { x: 450, y: 1150, s: 1.2 });
meter(T('eating') - .2, T('because') - .05, 'Your money', 1, 0, { y: 1330, dur: 1.5, color: C.lime });
[250, 450, 650].forEach((x, i) => icon('question', T('places') + i * .25, T('because') - .05, { x, y: 1470, s: .5, sfx: i === 0 }));

/* agent vs principal */
custom(T('your mechanic'), T('nobody') - .05, role(260, 1330, 'AGENT', C.pink));
custom(T('principal.') - .6, T('nobody') - .05, role(640, 1330, 'PRINCIPAL', C.lime));
arrowFx(T('his'), T('nobody') - .05, 400, 1170, 170, 1170, { color: C.pink });
arrowFx(T('his') + .15, T('nobody') - .05, 500, 1170, 730, 1170, { color: C.cyan });

/* after the cut: nobody cares like you */
bg(T('nobody') - .1, C.lime, { y: 1260, sfx: false });
icon('coin', T('money', 2) - .1, T('so') - .1, { x: 450, y: 1470, s: .9 });
meter(T('nobody') + .1, T('so') - .1, 'Nobody', 0, .12, { y: 1190, dur: .8, color: C.pink });
meter(T('as much') + .1, T('so') - .1, 'You', 0, 1, { y: 1340, dur: .7, color: C.violet });

bg(T('so') - .05, C.violet, { y: 1270 });
versus(T('so') + .2, VOICE_END - .1, 'Paying people to care', 'Paying them to deliver', { y: 1270, winner: 'b', tWin: T('deliver'), cb: C.lime });
shake(T('deliver') + .15, 14); burstFx(T('deliver') + .15, STAGE.cx, 1260);
