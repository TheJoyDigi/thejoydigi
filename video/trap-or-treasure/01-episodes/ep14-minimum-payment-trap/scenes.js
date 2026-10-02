/* EP14 scenes: The Minimum Payment Trap. Timeline and numbers mirror script.md and calc.py. All text ASCII. */

  var T={hook:0,stepA:2.2,stepB:5.5,xa:8,xb:14,trA:20,trB:23.5,quest:30,end:35};

  /* the same arithmetic as calc.py: $1,000, 24% APR, minimum = max($25, interest + 1%), vs flat $50 */
  function simPay(fn){
    var bal=1000,out=[{b:1000,i:0}],cum=0,m,iv,pay;
    for(m=0;m<300&&bal>.005;m++){
      iv=Math.round(bal*.24/12*100)/100;pay=Math.min(fn(bal,iv),bal+iv);cum+=iv;
      bal=Math.round((bal+iv-pay)*100)/100;out.push({b:bal,i:cum});
    }
    return out;
  }
  var MIN=simPay(function(b,i){return Math.max(25,i+b*.01);}),FLAT=simPay(function(){return 50;});
  var MIN_M=MIN.length-1,FLAT_M=FLAT.length-1,MIN_INT=MIN[MIN_M].i,FLAT_INT=FLAT[FLAT_M].i;
  if(window.console)console.log('ep14 sim: min '+MIN_M+' months $'+MIN_INT.toFixed(2)+', flat '+FLAT_M+' months $'+FLAT_INT.toFixed(2)+', saved $'+(MIN_INT-FLAT_INT).toFixed(2));

  /* ---------- 1. HOOK ---------- */
  var HOOKV=(/[?&]hook=([A-Z])/.exec(location.search)||[])[1]||'A';
  /* A (default): Mei proud, then shocked. Three bands: the number on top, her face in the middle, the shock readout below. */
  function hookBanner(t){
    var tt=t-1.0;if(tt<0)return;
    var k=sm(tt/.16);
    c.save();c.translate(0,(1-k)*70);
    c.fillStyle='rgba(38,5,20,.86)';rrect(36,398,236,74,14);c.fill();c.strokeStyle=PC.paper;c.lineWidth=2.4;c.stroke();
    c.restore();
  }
  function sceneHookA(t){
    bgGrad('#3a0d22','#7a1d2f');
    speedLines(t,150,320,.45,'rgba(255,130,140,A)',110);
    var k;
    for(k=0;k<9;k++){
      var x=rr(k,1)*W,y=((rr(k,2)*H+t*(50+rr(k,3)*90))%(H+40))-20;
      c.save();c.globalAlpha=.3;coin(x,y,5+rr(k,4)*5,'',PC.gold,0);c.restore();
    }
    var shock=t>=1.0,f=Math.floor(t*8),pop=shock?Math.max(0,1-(t-1.0)/.25)*.06:0;
    meiAt(150,520,2.0*(1+pop),mk(shock?'shock':'joy',{ht:shock?-.1:-.03,wind:.3}),f,{bag:false,d:.05});
    if(shock&&t<2.2){
      var sd=clamp((t-1.05)/.4,0,1);
      c.save();c.globalAlpha=sd;c.fillStyle='rgba(170,220,255,.95)';c.strokeStyle=PC.navy;c.lineWidth=2;
      c.beginPath();c.moveTo(214,262+sd*10);c.quadraticCurveTo(224,278+sd*10,214,286+sd*10);c.quadraticCurveTo(204,278+sd*10,214,262+sd*10);c.fill();c.stroke();c.restore();
    }
    hookText('YOU PAID',148,146,20,t,0,{fill:PC.paper});
    hookText('$30.',148,208,58,t,0,{fill:PC.gold,from:.14});
    hookBanner(t);
    hookText('DEBT DROPPED',154,424,17,t,1.0,{fill:PC.paper});
    hookText('$10.',154,464,46,t,1.0,{fill:PC.paper,stroke:'#8d1230',from:.14});
    stamp(272,116,'TRAP 14','OF 24',t-1.55,{w:80,h:34,rot:-.14,size:14});
    vignette(.5);
  }
  /* C: text only, kept for the hook lab */
  function sceneHookC(t){
    bgGrad('#3a0d22','#7a1d2f');
    speedLines(t,150,300,.45,'rgba(255,130,140,A)',110);
    hookText('YOU PAID',172,160,24,t,0,{fill:PC.paper});
    hookText('$30.',172,238,70,t,0,{fill:PC.gold,from:.14});
    hookText('DEBT DROPPED',172,360,22,t,1.0,{fill:PC.paper});
    hookText('$10.',172,448,70,t,1.0,{fill:PC.paper,stroke:'#8d1230',from:.14});
    stamp(270,118,'TRAP 14','OF 24',t-1.55,{w:84,h:34,rot:-.14,size:15});
    vignette(.55);
  }
  function sceneHookB(t){
    bgGrad('#2a0a2e','#5a1a5e');
    speedLines(t,150,330,.5,'rgba(230,140,255,A)',110);
    var rev=t>=1.1;
    function g(){c.save();c.translate(150,440);gremlin(0,0,2.8,t,{mood:'smug',remote:true});c.restore();}
    if(rev)g();else silhouette(g);
    hookText(rev?'MEET THE':'WHO TOOK',172,156,22,t,0,{fill:PC.paper});
    hookText(rev?'GREMLIN.':'MY $20?',172,216,rev?42:48,t,rev?1.1:0,{fill:rev?PC.gold:PC.paper,from:.14});
    stamp(268,118,'TRAP 14','OF 24',t-1.55,{w:84,h:34,rot:-.14,size:15});
    vignette(.5);
  }
  function setHook(v){HOOKV=v;}
  function sceneHook(t){if(HOOKV==='B')sceneHookB(t);else if(HOOKV==='C')sceneHookC(t);else sceneHookA(t);}

  /* ---------- 2. STEP IN A: Mei taps "Pay minimum"; something peeks over the phone ---------- */
  function sceneStepA(t){
    var tt=t-T.stepA;
    bgGrad('#2a1030','#4a1b3c');
    c.save();cam(tt,3.3,1,1.04,150,330);
    floorBand(470,'#2a1030','#12061a','#8a4160');
    var g=c.createRadialGradient(190,290,10,190,290,200);g.addColorStop(0,'rgba(255,110,140,.28)');g.addColorStop(1,'rgba(255,110,140,0)');
    c.fillStyle=g;c.fillRect(0,0,W,H);
    var f=Math.floor(t*8),tap=tt>1.55&&tt<1.9;
    meiAt(78,470,1.15,mk(tt<1.7?'calm':'sad',{nA:tap?[-.55,-1.0]:[-.3,-.7],lean:.04}),f);
    var rise=sm((tt-1.8)/.4);
    if(rise>0)gremlin(188,206+(1-rise)*64,.85,t,{mood:'smug',remote:true,ph:1});
    var slide=1-sm(tt/.45),press=clamp((tt-1.45)/.12,0,1)*(1-clamp((tt-1.75)/.2,0,1)),paid=tt>1.7;
    c.save();c.translate(120+slide*160,184+wob(tt,2));c.scale(.78,.78);
    phoneUI(0,0,172,300,{bal:paid?'$990':'$1,000',balCol:paid?PC.red:PC.navy,press:press,glow:tt>.9&&tt<1.5,t:t});
    c.restore();
    if(tt>1.75){var fl=clamp((tt-1.75)/1.2,0,1);tx('-$10',252,276-fl*22,17,{fill:PC.red,stroke:PC.navy,alpha:1-fl*.5});}
    c.restore();
    hand('Easy.',40,184,24,tt-.5,.5,{fill:'#ffd9a8'});
    hand('Pay the',40,212,24,tt-.8,.5,{fill:'#ffd9a8'});
    hand('minimum.',40,240,24,tt-1.1,.6,{fill:'#ffd9a8'});
    lowerThird('TREADMILL GREMLIN','MEET TRAP 14',tt-2.0,96,424);
    vignette(.5);
  }

  /* ---------- 3. STEP IN B: the treadmill (headline, then the scoreboard, then the hero) ---------- */
  function sceneStepB(t){
    var tt=t-T.stepB;
    bgGrad('#2a1030','#4a1b3c');
    floorBand(482,'#2a1030','#12061a','#8a4160');
    var f=Math.floor(t*8),zoom=1.06-.06*sm(tt/.6);
    c.save();cam(tt,2.5,zoom,1,150,350);
    treadmill(40,470,214,t,70);
    meiAt(124,470,1.1,Kwalk(f,.85,'sad',false),f,{bag:true,d:.05});
    gremlin(246,352,1.1,t,{mood:'smug',remote:true,ph:2});
    nickel(62,446,.8,t,'worried');
    c.restore();
    var frac=1-.01*sm(tt/1.8);
    hpBar(40,262,260,22,frac,PC.red,'DEBT',fmtMoney(1000-10*sm(tt/1.8)),{lab:PC.paper,track:'rgba(255,255,255,.2)',line:PC.paper});
    kin('Feels responsible.',172,170,24,tt-.1,{fill:PC.paper});
    kin('Goes nowhere.',172,216,32,tt-.9,{fill:PC.gold});
    vignette(.5);
  }

  /* ---------- 4. X-RAY A: where the $30 goes ---------- */
  function sceneXrayA(t){
    var tt=t-T.xa,st=tt-1.7,arrive=st>1.55;
    pearlBg(t,tt<2.0?'WHERE DID THE $20 GO?':(tt<3.2?'$20 GOES TO INTEREST':'$10 PAYS YOUR DEBT'),Math.min(tt,tt<2.0?tt:tt<3.2?tt-2.0:tt-3.2));
    wallet(66,222,1.1);
    var drop=sm((tt-.5)/.8);
    var px=66+(150-66)*drop,py=222+(276-222)*drop-Math.sin(drop*3.14)*36;
    if(tt<=1.7&&tt>.4)coin(px,py,30,'$30',PC.gold,tt,{sq:1+Math.sin(clamp((tt-1.3)/.4,0,1)*3.14)*.12});
    var shave=tt>2.6?sm((tt-2.6)/.5)*.01:0;
    hpBar(40,440,220,18,1-shave,PC.teal,'YOUR DEBT',tt>3.1?'$990':'$1,000',{});
    if(tt>2.2){var wa=clamp((tt-2.2)/.3,0,1);
      tx('24% a year',40,306,12.5,{fam:F_U,wt:'700',fill:PC.navy,sw:0,shadow:false,align:'left',alpha:wa});
      tx('is about 2%',40,323,12.5,{fam:F_U,wt:'700',fill:PC.navy,sw:0,shadow:false,align:'left',alpha:wa});
      tx('a month: $20',40,340,12.5,{fam:F_U,wt:'700',fill:PC.rust,sw:0,shadow:false,align:'left',alpha:wa});}
    var gulp=arrive?Math.max(0,1-(st-1.55)/.5):0;
    gremlin(226,396,1.25,t,{mood:arrive?'gulp':'smug',gulp:gulp,ph:3});
    coinSack(172,396,1.0,arrive?1:0,t);
    if(tt>1.7){
      var fy=sm(st/.9),dx=140-50*fy,dy=276+(430-276)*fy;
      if(st<1.0)coin(dx,dy,21,'$10',PC.teal,st);
      var pts=[[166,272],[172,272],[172,358]],ap=sm((st-.2)/1.4);
      arrowFlow(pts,ap,t,PC.rust,10);
      if(ap>.02&&ap<.98){
        var seg=ap*(6+86),cx2=166,cy2=272;
        if(seg<=6){cx2=166+seg;}else{cx2=172;cy2=272+(seg-6);}
        coin(cx2,cy2,19,'$20',PC.rust,st);
      }
      if(arrive)sparkles(172,370,st-1.55,PC.gold,8,36);
    }
    pearlFooter(14,'MINIMUM PAYMENT');
    grain(t,.09);
  }

  /* ---------- 5. X-RAY B: the cost of staying on the treadmill ---------- */
  function sceneXrayB(t){
    var tt=t-T.xb;
    pearlBg(t,'74 PAYMENTS LATER...',tt);
    var total=MIN_M,m=Math.floor(clamp((tt-.3)/3.3,0,1)*total),cols=10,cell=21,x0=40,y0=182,k;
    for(k=0;k<80;k++){
      var cx=x0+(k%cols)*cell,cy=y0+Math.floor(k/cols)*cell,on=k<m,real=k<total;
      if(!real)continue;
      c.fillStyle=on?PC.rust:'rgba(47,127,134,.18)';rrect(cx,cy,cell-3,cell-3,4);c.fill();
      if(on){c.strokeStyle=PC.navy;c.lineWidth=1.4;c.stroke();if(k===m-1){c.fillStyle=PC.gold;c.fillRect(cx+4,cy+4,cell-11,cell-11);}}
    }
    var intNow=MIN[Math.min(m,MIN_M)].i,fin=tt>3.7,fade=fin?1-clamp((tt-3.7)/.2,0,1):1;
    if(fade>0){
      tx(String(m),96,392,36,{fill:PC.paper,stroke:PC.navy,alpha:fade});
      tx('PAYMENTS',96,410,11,{fam:F_U,wt:'700',fill:PC.navy,sw:0,shadow:false,alpha:fade});
      tx(fmtMoney(intNow),206,392,36,{fill:PC.paper,stroke:PC.red,alpha:fade});
      tx('INTEREST PAID',206,410,11,{fam:F_U,wt:'700',fill:PC.navy,sw:0,shadow:false,alpha:fade});
    }
    if(fin)slam('about 6 YEARS',150,392,32,tt-3.7,{fill:PC.red,stroke:PC.navy,shadow:'rgba(0,0,0,.25)',shake:2,sw:.14});
    if(tt>4.5)tx('$1,000 becomes $1,887',150,418,15,{fill:PC.rust,stroke:PC.navy,alpha:clamp((tt-4.5)/.3,0,1)});
    var dis=clamp((tt-.6)/.4,0,1);
    c.save();c.globalAlpha=dis;c.fillStyle=PC.navy;c.textAlign='left';c.font='700 10px '+F_U;
    c.fillText('Illustrative. $1,000 at 24% APR.',40,442);
    c.fillText('Minimum = interest + 1%. Real cards vary.',40,454);
    c.fillText('Receipts in the comments.',40,466);c.restore();
    pearlFooter(14,'74 PAYMENTS');
    grain(t,.09);
  }

  /* ---------- 6. TREASURE A: the staircase ---------- */
  function sceneTreasureA(t){
    var tt=t-T.trA;
    treasureBg(t);
    var y0=470,n=6,sw=36,sh=26,x0=40;
    c.fillStyle='#3a8c6a';c.fillRect(0,y0,W,230);c.fillStyle='#4fb88b';c.fillRect(0,y0,W,5);
    grass(y0,t);
    stairs(x0,y0,n,sw,sh,tt-.1,PC.green);
    var p=clamp((tt-.8)/2.2,0,1),mx=44+p*60,u=(mx-x0)/sw,my=y0;
    if(u>=0){var si=Math.min(n-1,Math.floor(u));my=y0-sh*si-sh*sm((u-si)/.4);if(u>=n)my=y0-sh*n;}
    var f=Math.floor(t*8);
    meiAt(mx,my,1.05,Kwalk(f,.8,'joy',false),f,{d:0,w:.15,rim:'#fffbe0',bag:true});
    nickel(196,y0-sh*5-20,.85,t,'happy');
    var op=sm((tt-2.2)/.5);
    chest(238,y0-sh*6,.9,op,t);
    if(tt>2.2){
      sparkles(238,y0-sh*6-22,tt-2.2,PC.gold,14,60);
    }
    kin('PAY $50.',172,168,44,tt-.15,{fill:PC.paper,stroke:PC.navy,shadow:PC.green});
    kin('EVERY MONTH.',172,204,28,tt-.4,{fill:PC.gold,stroke:PC.navy,shadow:'#1a8a5a'});
    tx('The minimum shrinks.',172,234,15,{fam:F_U,wt:'700',fill:PC.navy,sw:0,shadow:false,alpha:clamp((tt-.9)/.3,0,1)});
    tx('Your payment shouldn\'t.',172,253,15,{fam:F_U,wt:'700',fill:PC.navy,sw:0,shadow:false,alpha:clamp((tt-1.4)/.3,0,1)});
  }

  /* ---------- 7. TREASURE B: the race. The Gremlin's size is the debt. ---------- */
  function sceneTreasureB(t){
    var tt=t-T.trB;
    treasureBg(t);
    var mm=Math.min(FLAT_M,Math.floor(clamp((tt-.5)/2.7,0,1)*FLAT_M));
    var minB=MIN[Math.min(mm,MIN_M)].b,flatB=FLAT[Math.min(mm,FLAT_M)].b;
    c.save();c.translate(172,150);c.fillStyle=PC.navy;rrect(-56,-14,112,28,14);c.fill();
    c.fillStyle=PC.paper;c.font='400 14px '+F_T;c.textAlign='center';c.textBaseline='middle';c.fillText('MONTH '+mm,0,1);c.restore();
    hpBar(40,200,200,20,minB/1000,PC.red,'MINIMUM ONLY (it shrinks)',fmtMoney(minB),{});
    hpBar(40,256,200,20,flatB/1000,PC.green,'$50 EVERY MONTH',flatB<=0.005?'CLEARED!':fmtMoney(flatB),{});
    gremlin(278,222,.24+.4*(minB/1000),t,{mood:'smug',ph:1});
    var cleared=mm>=FLAT_M,ct=tt-3.2;
    if(!cleared)gremlin(278,278,.24+.4*(flatB/1000),t,{mood:flatB<500?'scared':'smug',ph:2});
    else if(ct<.7){gremlin(278,278,.24*(1-ct/.7),t,{mood:'dizzy',ph:2});sparkles(278,262,ct,PC.gold,14,50);}
    if(cleared)nickel(278,264,.6,t,'happy',{ph:1});
    coinPile((MIN[Math.min(mm,MIN_M)].i-FLAT[Math.min(mm,FLAT_M)].i)/(MIN_INT-FLAT_INT),t);
    var dis=clamp((tt-3.6)/.4,0,1);
    c.save();c.globalAlpha=dis*.9;c.fillStyle=PC.navy;c.textAlign='center';c.font='700 10px '+F_U;
    c.fillText('Illustrative. $1,000 at 24% APR. Real cards vary.',172,304);c.restore();
    if(tt>3.4)kin('2 YEARS',150,356,40,tt-3.4,{fill:PC.paper,stroke:PC.navy,shadow:'#1a8a5a'});
    if(tt>3.9)tx('$290 interest',150,388,20,{fill:PC.navy,sw:0,shadow:false,alpha:clamp((tt-3.9)/.3,0,1),fam:F_T});
    if(tt>4.6)tx('YOU KEEP',150,418,19,{fill:PC.paper,stroke:PC.navy,alpha:clamp((tt-4.6)/.2,0,1)});
    if(tt>4.8)slam('$597',150,466,56,tt-4.8,{fill:PC.gold,stroke:PC.navy,shadow:'#1a8a5a',shine:true,sw:.1});
  }

  /* ---------- 8. QUEST card + the collectible Trap File + brand slate ---------- */
  function sceneQuest(t){
    var tt=t-T.quest;
    c.fillStyle=PC.deep;c.fillRect(0,0,W,H);
    c.fillStyle='rgba(253,246,236,.06)';
    for(var y=0;y<H;y+=16)for(var x=((y/16)%2)*8;x<W;x+=16){c.beginPath();c.arc(x,y,1.4,0,6.3);c.fill();}
    var k=sm(tt/.4),by=124+(1-k)*50;
    c.save();c.globalAlpha=k;
    c.fillStyle='rgba(0,0,0,.3)';rrect(36,by+7,270,284,20);c.fill();
    c.fillStyle=PC.sand;rrect(30,by,270,284,20);c.fill();c.strokeStyle=PC.navy;c.lineWidth=3;c.stroke();
    c.fillStyle=PC.coral;rrect(44,by+14,74,24,12);c.fill();c.strokeStyle=PC.navy;c.lineWidth=2;c.stroke();
    c.fillStyle=PC.paper;c.font='400 12px '+F_T;c.textAlign='center';c.textBaseline='middle';c.fillText('QUEST',81,by+27);
    c.restore();
    if(tt>.3){
      tx('PAY A',44,by+88,23,{fill:PC.navy,sw:0,shadow:false,align:'left',alpha:clamp((tt-.3)/.25,0,1)});
      tx('FIXED',44,by+118,23,{fill:PC.navy,sw:0,shadow:false,align:'left',alpha:clamp((tt-.45)/.25,0,1)});
      tx('AMOUNT.',44,by+148,23,{fill:PC.coral,stroke:PC.navy,align:'left',alpha:clamp((tt-.6)/.25,0,1)});
      if(false)tx('',44,by+144,21,{fill:PC.navy,sw:0,shadow:false,align:'left',alpha:clamp((tt-.6)/.25,0,1)});
      tx('Above your minimum.',44,by+172,12.5,{fam:F_U,wt:'700',fill:PC.navy,sw:0,shadow:false,align:'left',alpha:clamp((tt-.75)/.25,0,1)});
      tx('Same amount, every month.',44,by+188,12.5,{fam:F_U,wt:'700',fill:PC.navy,sw:0,shadow:false,align:'left',alpha:clamp((tt-.85)/.25,0,1)});
    }
    if(tt>.6)trapCard(200,by+16,90,142,{n:14,name:'GREMLIN',compact:true,mood:'dizzy',solT:tt-1.2},t);
    if(tt>1.0){
      var a=clamp((tt-1.0)/.3,0,1);
      c.save();c.globalAlpha=a;
      c.fillStyle=PC.red;rrect(44,by+204,66,22,11);c.fill();c.fillStyle=PC.paper;c.font='400 10px '+F_T;c.textAlign='center';c.textBaseline='middle';c.fillText('TRAP 14',77,by+215);
      c.fillStyle=PC.navy;c.font='400 14px '+F_T;c.fillText('>',124,by+215);
      c.fillStyle=PC.green;rrect(138,by+204,86,22,11);c.fill();c.fillStyle=PC.navy;c.font='400 10px '+F_T;c.fillText('TREASURE',181,by+215);
      c.restore();
    }
    if(tt>1.4){
      hpBar(44,by+248,140,10,.55+.08*sm((tt-1.4)/1.0),PC.gold,'MEI XP  LV 4',null,{lab:PC.navy});
      var lv=clamp((tt-1.6)/.3,0,1);
      c.save();c.globalAlpha=lv;c.fillStyle=PC.navy;c.font='500 10px '+F_U;c.textAlign='left';
      c.fillText('World 4  Ep 14/24',200,by+257);
      c.fillText('Educational only. Not financial advice.',44,by+274);c.restore();
    }
    if(tt>1.6)tx('Level up!',150,by+27,16,{fam:F_P,fill:PC.coral,stroke:PC.navy,sw:.08,rot:-.1+Math.sin(tt*5)*.03,alpha:clamp((tt-1.6)/.3,0,1)});
    nickel(292,by-2,.55,t,'happy',{ph:2});
    if(tt>1.9&&tt<3.5)tx('Which trap got you?',150,444,15,{fam:F_U,wt:'700',fill:PC.sand,sw:0,shadow:false,alpha:clamp((tt-1.9)/.3,0,1)*(1-clamp((tt-3.2)/.3,0,1))});
    binderStrip(tt,14,1);
    if(tt>3.5){
      var b=sm((tt-3.5)/.4);
      c.save();c.globalAlpha=b;
      brandMark(86,436,11,PC.coral);
      c.fillStyle=PC.sand;c.font='700 22px '+F_FR;c.textAlign='left';c.textBaseline='alphabetic';c.fillText('The Joy Digi',102,444);
      c.fillStyle=PC.sand;c.font='500 10px '+F_DM;c.textAlign='center';c.fillText('Trap or Treasure is a production of The Joy Digi',150,464);
      c.restore();
    }
  }

  /* ---------- timeline ---------- */
  /* Scenes are written in "design time" (T above). Playback is compressed onto 128 bpm bar lines so cuts land on the beat. */
  var BPM=128,B=60/BPM;
  var TD=[0,2.2,5.5,8,14,20,23.5,30,35];
  var TR=[0,4,9,13,23,33,40,52,61].map(function(n){return n*B;});
  var DUR=TR[TR.length-1];
  function warp(t){
    for(var i=0;i<TR.length-1;i++)if(t<TR[i+1]||i===TR.length-2)return TD[i]+(t-TR[i])*(TD[i+1]-TD[i])/(TR[i+1]-TR[i]);
    return TD[TD.length-1];
  }
  function rt(d){
    for(var i=0;i<TD.length-1;i++)if(d<TD[i+1]||i===TD.length-2)return TR[i]+(d-TD[i])*(TR[i+1]-TR[i])/(TD[i+1]-TD[i]);
    return DUR;
  }
  /* impact hits (design time): the whole frame punches in, then settles */
  var HITS=[0,1.0,1.55,3.65,9.7,11.2,17.7,20.1,22.2,26.7,28.3,30];
  function punch(d){
    var s=0;
    for(var i=0;i<HITS.length;i++){var u=d-HITS[i];if(u>=0&&u<.3)s+=.04*Math.pow(1-u/.3,2);}
    return s;
  }

  function draw(tr){
    var t=warp(tr),ph=(tr/B)%1,z=1+punch(t)+.012*Math.pow(1-ph,3);
    c.setTransform(SC,0,0,SC,0,0);
    c.save();c.translate(W/2,H/2);c.scale(z,z);c.translate(-W/2,-H/2);
    if(t<T.stepA)sceneHook(t);
    else if(t<T.stepB)sceneStepA(t);
    else if(t<T.xa)sceneStepB(t);
    else if(t<T.xb)sceneXrayA(t);
    else if(t<T.trA)sceneXrayB(t);
    else if(t<T.trB)sceneTreasureA(t);
    else if(t<T.quest)sceneTreasureB(t);
    else sceneQuest(t);
    if(t>=T.stepA&&t<T.trA)actTag(172,104,'TRAP 14 / 24',PC.red,PC.paper,t-T.stepA);
    if(t>=T.trA&&t<T.quest)actTag(172,104,'TREASURE',PC.green,PC.navy,t-T.trA);
    c.restore();
    swipe(t,T.stepA,PC.red);swipe(t,T.xa,PC.teal);swipe(t,T.trA,PC.green);swipe(t,T.quest,PC.deep);
    grain(t,.06);
  }

  var SCENES=[
    [rt(0),'Hook','Kinetic type, trap stamp'],
    [rt(2.2),'Step in','Anime + fake phone UI'],
    [rt(5.5),'Treadmill','Feels responsible, goes nowhere'],
    [rt(8),'X-ray','Pearl print, coin split, money arrow'],
    [rt(14),'The price','74 payments, interest counter'],
    [rt(20),'Treasure','Pay $50, every month'],
    [rt(23.5),'The race','Two debt bars, who wins'],
    [rt(30),'Quest','Treasure card + brand slate']
  ];

  /* sound: 128 bpm. Trap = tense pulse, X-ray = bouncy, treasure = four on the floor. Sound effects (clicks, clinks, stamps) sit on the actions. */
  function cues(S){
    var n,k,at;
    var BASS_T=[33,33,36,31],BASS_X=[38,38,41,36],BASS_G=[48,43,45,41],CH=[[60,64,67],[55,59,62],[57,60,64],[53,57,60]];
    /* beat bed */
    for(n=0;n<61;n++){
      at=n*B;
      if(n<13){ /* trap: pulse and tension */
        S.kick(at,n<4?.55:.7);
        if(n>=4)S.hat(at+B/2,.05);
        S.bass(at,BASS_T[Math.floor(n/2)%4],B*.9,.06);
      }else if(n<33){ /* x-ray: bounce */
        S.kick(at,.6);if(n%2===1)S.clap(at,.16);
        S.hat(at+B/2,.07);S.hat(at,.03);
        S.bass(at+B/2,BASS_X[Math.floor(n/4)%4],B*.45,.07);
        S.pluck(at,[62,65,69,72][n%4]+12,.07);
      }else{ /* treasure + quest: four on the floor, bright */
        S.kick(at,.7);S.hat(at+B/2,.09);S.hat(at+B/4,.03);S.hat(at+B*.75,.03);
        if(n%2===1)S.clap(at,.16);
        S.bass(at,BASS_G[Math.floor((n-33)/4)%4],B*.8,.08);
        if(n%4===0)S.pad(at,CH[Math.floor((n-33)/4)%4],B*4,.03);
        S.pluck(at+B/2,CH[Math.floor((n-33)/4)%4][n%3]+24,.08);
      }
    }
    /* hook */
    S.thump(0,.9);S.noise(0,.3,.18,2000,200);S.thump(rt(1.0),.9);S.thump(rt(1.55),1);S.noise(rt(1.55),.15,.3,900,300);
    /* step in */
    S.click(rt(3.55),.5);S.click(rt(3.65),.6);S.tone(rt(3.95),64,.3,'triangle',.12,2000,.01);S.tone(rt(4.2),59,.4,'triangle',.12,2000,.01);
    /* the Gremlin: a sly laugh when it appears, a gulp when the interest lands, a poof when it is beaten */
    S.tone(rt(4.0),57,.12,'triangle',.14,1800,.005);S.tone(rt(4.0)+.13,57,.12,'triangle',.14,1800,.005);S.tone(rt(4.0)+.26,52,.22,'triangle',.14,1800,.005);
    S.tone(rt(11.3)+.05,45,.16,'sine',.2,500,.005);S.tone(rt(11.3)+.15,52,.12,'sine',.16,700,.005);
    S.noise(rt(26.7),.45,.2,2500,300);S.tone(rt(26.7),72,.4,'sine',.1,2000,.005);S.tone(rt(26.7)+.1,60,.4,'sine',.08,1500,.005);
    /* x-ray */
    S.tone(rt(8.35),84,.15,'sine',.12,4000,.004);
    S.clink(rt(9.7),.14);S.clink(rt(9.82),.12);S.noise(rt(9.9),.35,.1,500,3000);
    S.clink(rt(11.2),.16);S.clink(rt(11.3),.14);S.tone(rt(11.3),103,.5,'sine',.1,6000,.004);
    for(k=0;k<12;k++)S.click(rt(14.3+k*.27),.22);
    S.thump(rt(17.7),.9);S.noise(rt(17.7),.3,.2,1500,300);
    /* treasure */
    S.noise(rt(20),.4,.22,300,7000);
    [72,76,79,84].forEach(function(m,i){S.tone(rt(20.15)+i*.07,m,.8,'sine',.14,3800,.004);});
    for(k=0;k<6;k++)S.tone(rt(20.1+k*.11),[60,64,67,72,76,79][k],.18,'square',.05,3000,.004);
    for(k=0;k<6;k++)S.clink(rt(22.3)+k*.06,.1);
    S.thump(rt(22.2),.7);
    for(k=0;k<10;k++)S.click(rt(24+k*.27),.14);
    for(k=0;k<4;k++)S.clink(rt(26.7)+k*.07,.14);
    S.thump(rt(28.3),1);S.noise(rt(28.3),.3,.22,1500,300);S.clink(rt(28.4),.2);S.clink(rt(28.5),.18);
    /* quest */
    S.thump(rt(30),.9);[72,76,79,84].forEach(function(m,i){S.tone(rt(30)+i*.06,m,1.6,'sine',.13,3600,.004);});
    S.click(rt(31.0),.3);S.click(rt(31.3),.3);S.clink(rt(31.6),.16);
  }
