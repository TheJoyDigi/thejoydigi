/* sound v2: ambience + groove + punchy effects, every cue keyed to the visual timeline (t in seconds).
   S = bed synth (pads, bass, arps, ambience: ducks under the narrator). F = fx synth (drums, hits, risers, UI sounds: never ducked). */
function SOUND(S,F){
  var B=.46875; /* 128 bpm */
  var seed=7;function rnd(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}
  function whoosh(at,len,vol){F.noise(at,len||.3,vol||.15,350,5200);}
  function rise(at,notes,step,vol){F.arp(at,notes,notes.length,step||.06,0,vol||.05,'triangle');}
  function roll(from,to,vol){var n=0,t=from,gap=.16;while(t<to-.02){F.snare(t,vol*(.5+.5*(t-from)/(to-from)));gap=Math.max(.045,gap*.82);t+=gap;n++;}}
  function groove(from,to,o){
    var i=0;
    for(var b=from;b<to-.01;b+=B,i++){
      if(o.kick&&(!o.half||i%2===0))F.kick(b,o.kick);
      if(o.hat){F.hat(b+B/2,o.hat);if(o.hat16){F.hat(b+B/4,o.hat*.55);F.hat(b+B*.75,o.hat*.55);}}
      if(o.clap&&i%2===1)F.clap(b,o.clap);
      if(o.bass){var n=o.bass[i%o.bass.length];S.bass(b,n,B*.9,o.bv||.07);S.bass(b+B/2,n,B*.4,(o.bv||.07)*.7);}
      if(o.arp){for(var q=0;q<4;q++)S.tone(b+q*B/4,o.arp[(i*4+q)%o.arp.length],B/4*1.8,'triangle',o.av||.03,2800);}
    }
  }

  /* ---- AMBIENCE: always on. drone, breathing air, sparse HUD chatter ---- */
  for(var a=0;a<31;a+=5.5)S.pad(a,[33,40],6.6,.05);
  for(var a2=0;a2<31;a2+=5)S.noise(a2,6,.035,450,1100);
  for(var ct=1.3;ct<29;ct+=.6+rnd()*1.7)S.tone(ct,93+Math.floor(rnd()*3)*3,.05,'square',.012,3500,.002);

  /* ---- chord bed, one chord per beat of the story ---- */
  S.pad(.05,[45,52,57,60],5.2,.034);
  S.pad(5.4,[53,57,60,64],10.1,.03);
  S.pad(15.65,[48,55,60,64],7.4,.03);
  S.pad(23.3,[53,60,65,69],5.5,.036);

  /* ---- MYTH 0-5.3: alert, build, HIT, dark groove ---- */
  F.tone(.02,81,.12,'square',.05,3000);F.tone(.3,81,.12,'square',.05,3000);F.tone(.58,81,.12,'square',.05,3000);
  S.bass(.0,33,1.0,.07);
  F.riser(.05,.9,.1);
  F.hit(.95,.7);F.noise(.95,.4,.2,6500,300);
  F.tone(1.0,88,.32,'sawtooth',.08,3800);F.clink(1.3,.13);
  groove(1.4,5.0,{kick:.2,half:true,hat:.02,bass:[33,33,36,33,40,33,36,31],bv:.07});
  F.tone(2.7,57,.5,'triangle',.05,1500);
  F.riser(4.75,.55,.09);

  /* ---- REFRAME 5.3-15.6: drop, groove, steps, slam ---- */
  F.crash(5.3,.14);F.kick(5.3,.35);F.boom(5.3,.2);
  F.sweep(5.35,.9,72,96,'triangle',.05,4000);F.tone(6.3,91,.18,'square',.045,4000);   /* scan lock */
  whoosh(6.35,.25,.14);
  F.click(6.55,.13);F.tone(6.55,76,.12,'triangle',.07,3000);F.coin(6.6,.04);          /* step 1 */
  F.click(7.85,.13);F.pluck(7.9,79,.07);                                              /* step 2 */
  F.pluck(8.15,79,.08);F.pluck(8.75,83,.08);F.pluck(9.35,86,.08);
  F.clink(8.2,.09);F.clink(8.8,.09);F.clink(9.4,.09);
  F.click(11.3,.13);F.coin(11.45,.09);F.coin(11.6,.08);F.tone(11.85,91,.25,'sine',.08,4000);  /* step 3 */
  groove(5.3+B*2,12.9,{kick:.22,hat:.028,hat16:true,clap:.11,bass:[41,41,48,45],bv:.065,arp:[65,69,72,76],av:.026});
  roll(12.9,13.7,.16);F.riser(12.95,.75,.08);
  whoosh(13.55,.25,.14);
  F.hit(13.75,.55);F.boom(14.3,.38);F.snare(14.3,.28);F.clink(14.25,.24);F.coin(14.25,.1);F.tone(14.25,96,.4,'sine',.1,5000);
  groove(13.75,15.55,{kick:.22,hat:.03,clap:.12,bass:[41,41,48,45],bv:.065,arp:[65,69,72,76],av:.026});

  /* ---- FLIP 15.6-23.2: tension, flip, return ---- */
  S.bass(15.65,36,1.9,.06);S.bass(17.5,36,1.0,.06);
  for(var tk=15.65;tk<18.4;tk+=B)F.click(tk,.03);
  F.pluck(16.2,67,.055);F.pluck(16.8,64,.055);F.pluck(17.4,60,.055);                  /* money leaves: falling */
  F.riser(17.85,.65,.09);
  F.kick(18.5,.35);F.boom(18.5,.32);F.crash(18.5,.1);F.sweep(18.5,.5,60,84,'sawtooth',.05,4000);F.clink(18.95,.16);
  F.pluck(19.3,72,.065);F.pluck(19.75,76,.065);
  groove(18.55,20.1,{kick:.2,half:true,hat:.022,clap:.08,bass:[36,36,43,41],bv:.065});
  whoosh(20.0,.25,.13);
  for(var k=0;k<28;k++)F.click(20.65+k*.07,.034);                                      /* typed question */
  groove(20.1,21.9,{kick:.18,hat:.025,clap:.09,bass:[36,36,43,41],bv:.065,arp:[60,64,67,71],av:.024});
  F.riser(21.95,.65,.09);
  F.hit(22.6,.45);rise(22.6,[67,72,76,79,84],.06,.065);F.clink(22.75,.22);F.tone(22.75,88,.5,'sine',.09,4500);  /* gate opens */
  groove(22.6,23.2,{kick:.2,hat:.028,bass:[36,36,43,41],bv:.065});

  /* ---- MOVE 23.2-28.9: quest, level up, stamp ---- */
  F.kick(23.25,.3);F.sweep(23.2,.22,60,84,'square',.05,4000);F.click(23.3,.11);F.tone(23.3,84,.15,'triangle',.08,3500);
  F.pluck(23.6,72,.055);F.pluck(23.88,76,.055);F.pluck(24.16,79,.055);F.clink(24.5,.13);
  groove(23.3,25.55,{kick:.22,hat:.03,hat16:true,clap:.12,bass:[41,48,45,48],bv:.065,arp:[65,69,72,76],av:.028});
  roll(25.55,26.2,.18);F.riser(25.55,.65,.09);
  F.hit(26.2,.7);F.arp(26.2,[72,76,79,84,88],5,.07,0,.075,'square');F.clink(26.5,.22);S.pad(26.2,[60,64,67,72],2.7,.034);   /* level up */
  groove(26.3,28.0,{kick:.24,hat:.032,hat16:true,clap:.14,bass:[41,48,45,48],bv:.065,arp:[72,76,79,84],av:.03});
  F.hit(28.05,.55);F.noise(28.05,.12,.22,900,200);F.clink(28.1,.26);                  /* Worth it. stamp */

  /* ---- OUTRO 28.9-32: card in, mark assembles, lands, sparkles ---- */
  whoosh(28.85,.3,.14);F.crash(28.95,.1);
  F.riser(28.95,.7,.08);
  F.hit(29.62,.5);F.clink(29.67,.26);F.arp(29.67,[72,76,79,84,88,91],6,.08,0,.06,'triangle');S.pad(29.62,[60,64,67,72],3,.034);
  F.clink(30.55,.09);F.clink(30.95,.08);F.clink(31.4,.07);
}
