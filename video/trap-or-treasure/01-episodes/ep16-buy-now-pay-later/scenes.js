/* EP16 scenes: Pay in 4 Is Not Free. Numbers mirror calc.py and claims.md. All text ASCII. */

  var T={hook:0,stepA:2.2,stepB:5.5,xa:8,xb:14,trA:20,trB:23.5,quest:30,end:35};

  /* the cart from calc.py: three Pay in 4 plans, 25% today then every two weeks */
  var CART=[{item:'Jacket',price:200,icon:'jacket',col:PC.gold},{item:'Earbuds',price:120,icon:'buds',col:PC.blue},{item:'Shoes',price:80,icon:'shoes',col:PC.coral}];
  CART.forEach(function(p){p.part=p.price/4;});
  var DATES=['TODAY','WK 2','WK 4','WK 6'];
  function calCols(plans){return DATES.map(function(d){return{label:d,bricks:plans.map(function(p){return{v:p.part,col:p.col};})};});}
  var ALL=calCols(CART),ONE=calCols([CART[0]]);
  var PER_DATE=CART.reduce(function(a,p){return a+p.part;},0),TOTAL=CART.reduce(function(a,p){return a+p.price;},0);
  if(window.console)console.log('ep16 cart: '+(CART.length*4)+' payments, $'+PER_DATE+' per date, $'+TOTAL+' total; one plan $'+CART[0].part+' per date');

  var REX={look:'rex',d:.0,w:0,rim:'#ff9db0',bag:false};
  function rexAt(x,y,s,K,f,over){var e={},k;for(k in REX)e[k]=REX[k];if(over)for(k in over)e[k]=over[k];figAt(x,y,s,K,f,e);}

  /* ---------- 1. HOOK ---------- */
  var HOOKV=(/[?&]hook=([A-Z])/.exec(location.search)||[])[1]||'A';
  function banner(t,t0){
    var tt=t-t0;if(tt<0)return;
    var k=sm(tt/.16);
    c.save();c.translate(0,(1-k)*70);
    c.fillStyle='rgba(38,5,20,.86)';rrect(36,398,236,74,14);c.fill();c.strokeStyle=PC.paper;c.lineWidth=2.4;c.stroke();
    c.restore();
  }
  /* A (default): Rex grinning at "only $50", then his face drops */
  function sceneHookA(t){
    bgGrad('#3a0d22','#7a1d2f');
    speedLines(t,150,320,.45,'rgba(255,130,140,A)',110);
    var k;
    for(k=0;k<9;k++){var x=rr(k,1)*W,y=((rr(k,2)*H+t*(50+rr(k,3)*90))%(H+40))-20;c.save();c.globalAlpha=.3;coin(x,y,5+rr(k,4)*5,'',PC.gold,0);c.restore();}
    var shock=t>=1.0,f=Math.floor(t*8),pop=shock?Math.max(0,1-(t-1.0)/.25)*.06:0;
    rexAt(150,520,2.0*(1+pop),mk(shock?'shock':'joy',{ht:shock?-.1:-.03,wind:.3}),f);
    hookText('ONLY',148,146,20,t,0,{fill:PC.paper});
    hookText('$50.',148,208,58,t,0,{fill:PC.gold,from:.14});
    banner(t,1.0);
    hookText('12 PAYMENTS.',154,428,24,t,1.0,{fill:PC.paper,stroke:'#8d1230'});
    hookText('IN 6 WEEKS.',154,460,20,t,1.0,{fill:PC.gold});
    stamp(272,116,'TRAP 16','OF 24',t-1.55,{w:80,h:34,rot:-.14,size:14});
    vignette(.5);
  }
  function sceneHookC(t){
    bgGrad('#3a0d22','#7a1d2f');
    speedLines(t,150,300,.45,'rgba(255,130,140,A)',110);
    hookText('ONLY',172,160,24,t,0,{fill:PC.paper});
    hookText('$50.',172,238,70,t,0,{fill:PC.gold,from:.14});
    hookText('12 PAYMENTS.',172,370,30,t,1.0,{fill:PC.paper,stroke:'#8d1230'});
    hookText('IN 6 WEEKS.',172,420,26,t,1.0,{fill:PC.gold});
    stamp(270,118,'TRAP 16','OF 24',t-1.55,{w:84,h:34,rot:-.14,size:15});
    vignette(.55);
  }
  function sceneHookB(t){
    bgGrad('#2a0a2e','#5a1a5e');
    speedLines(t,150,330,.5,'rgba(230,140,255,A)',110);
    var rev=t>=1.1;
    function g(){c.save();c.translate(150,440);gremlin(0,0,2.5,t,{mood:'smug',quad:true});c.restore();}
    if(rev)g();else silhouette(g);
    hookText(rev?'MEET THE':'WHO SPLIT',172,156,22,t,0,{fill:PC.paper});
    hookText(rev?'QUAD IMP.':'MY CART?',172,216,rev?42:48,t,rev?1.1:0,{fill:rev?PC.gold:PC.paper,from:.14});
    stamp(268,118,'TRAP 16','OF 24',t-1.55,{w:84,h:34,rot:-.14,size:15});
    vignette(.5);
  }
  function setHook(v){HOOKV=v;}
  function sceneHook(t){if(HOOKV==='B')sceneHookB(t);else if(HOOKV==='C')sceneHookC(t);else sceneHookA(t);}

  /* ---------- 2. STEP IN A: three taps, three "only"s ---------- */
  var TAPS=[1.0,1.7,2.5];
  function sceneStepA(t){
    var tt=t-T.stepA;
    bgGrad('#2a1030','#4a1b3c');
    c.save();cam(tt,3.3,1,1.04,150,330);
    floorBand(470,'#2a1030','#12061a','#8a4160');
    var g=c.createRadialGradient(190,290,10,190,290,200);g.addColorStop(0,'rgba(255,110,140,.28)');g.addColorStop(1,'rgba(255,110,140,0)');
    c.fillStyle=g;c.fillRect(0,0,W,H);
    var f=Math.floor(t*8),i=tt<TAPS[1]-.15?0:(tt<TAPS[2]-.15?1:2),p=CART[i];
    var tapping=TAPS.some(function(x){return tt>x-.1&&tt<x+.25;});
    rexAt(78,470,1.15,mk('joy',{nA:tapping?[-.55,-1.0]:[-.3,-.7],lean:.04}),f);
    var rise=sm((tt-2.65)/.35);
    if(rise>0)gremlin(188,206+(1-rise)*64,.8,t,{mood:'smug',quad:true,ph:1});
    var slide=1-sm(tt/.4),press=0;
    TAPS.forEach(function(x){press=Math.max(press,clamp((tt-x)/.1,0,1)*(1-clamp((tt-x-.15)/.15,0,1)));});
    c.save();c.translate(120+slide*160,184+wob(tt,2));c.scale(.78,.78);
    checkoutUI(0,0,172,300,{item:p.item,price:'$'+p.price,part:'$'+p.part,icon:p.icon,press:press});
    c.restore();
    c.restore();
    TAPS.forEach(function(x,j){hand('only $'+CART[j].part,40,186+j*30,24,tt-x-.05,.4,{fill:'#ffd9a8'});});
    lowerThird('QUAD IMP','MEET TRAP 16',tt-2.75,96,424);
    vignette(.5);
  }

  /* ---------- 3. STEP IN B: feels free, it's a loan ---------- */
  function sceneStepB(t){
    var tt=t-T.stepB;
    bgGrad('#2a1030','#4a1b3c');
    floorBand(482,'#2a1030','#12061a','#8a4160');
    var f=Math.floor(t*8),zoom=1.06-.06*sm(tt/.6);
    c.save();cam(tt,2.5,zoom,1,150,350);
    rexAt(112,476,1.2,POSE.vic,f);
    gremlin(236,452,1.3,t,{mood:'smug',quad:true,ph:2});
    nickel(52,446,.8,t,'worried');
    c.restore();
    /* the three plans, as a readout */
    CART.forEach(function(p,j){
      var a=clamp((tt-.3-j*.15)/.25,0,1),x=40+j*76;
      c.save();c.globalAlpha=a;
      c.fillStyle=PC.paper;rrect(x,248,68,30,8);c.fill();c.strokeStyle=p.col;c.lineWidth=2.6;c.stroke();
      c.fillStyle=PC.navy;c.font='700 11px '+F_U;c.textAlign='center';c.textBaseline='middle';c.fillText('$'+p.part+' x 4',x+34,263);
      c.restore();
    });
    kin('Feels free.',172,170,26,tt-.1,{fill:PC.paper});
    kin("It's a loan.",172,218,32,tt-.9,{fill:PC.gold});
    vignette(.5);
  }

  /* ---------- 4. X-RAY A: what's due when ---------- */
  function sceneXrayA(t){
    var tt=t-T.xa;
    pearlBg(t,tt<2.6?"WHAT'S DUE WHEN?":'$'+PER_DATE+' EVERY TWO WEEKS',tt<2.6?tt:tt-2.6);
    CART.forEach(function(p,j){
      var a=clamp((tt-.2-j*.12)/.25,0,1),x=[40,128,222][j];
      c.save();c.globalAlpha=a;c.fillStyle=p.col;rrect(x,182,14,14,3);c.fill();c.strokeStyle=PC.navy;c.lineWidth=1.6;c.stroke();
      c.fillStyle=PC.navy;c.font='700 11px '+F_U;c.textAlign='left';c.textBaseline='middle';c.fillText(p.item+' $'+p.part,x+19,189);c.restore();
    });
    tx('1/4 today, then every 2 weeks',150,224,12.5,{fam:F_U,wt:'700',fill:PC.navy,sw:0,shadow:false,alpha:clamp((tt-.4)/.3,0,1)});
    var drop=clamp((tt-.6)/2.9,0,1)*12;
    brickCalendar(40,394,220,ALL,drop,t,{scale:.9});
    if(tt>3.2)tx('63% had more than one at a time.',150,446,12.5,{fam:F_U,wt:'700',fill:PC.rust,sw:0,shadow:false,alpha:clamp((tt-3.2)/.3,0,1)});
    if(tt>3.2)tx('(CFPB, 2022 data)',150,462,10,{fam:F_U,wt:'700',fill:PC.navy,sw:0,shadow:false,alpha:clamp((tt-3.2)/.3,0,1)});
    pearlFooter(16,'PAY IN 4');
    grain(t,.09);
  }

  /* ---------- 5. X-RAY B: miss one ---------- */
  function sceneXrayB(t){
    var tt=t-T.xb;
    pearlBg(t,'ONE MISSED PAYMENT...',tt);
    tx('Stores pay the lender to offer it.',150,186,12,{fam:F_U,wt:'700',fill:PC.navy,sw:0,shadow:false,alpha:clamp((tt-.2)/.3,0,1)});
    tx('Late fees add more.',150,202,12,{fam:F_U,wt:'700',fill:PC.navy,sw:0,shadow:false,alpha:clamp((tt-.4)/.3,0,1)});
    c.save();if(tt>.9&&tt<1.3)c.translate(Math.sin(tt*90)*2,0);
    brickCalendar(40,318,220,ALL,12,t,{scale:.7});
    c.restore();
    if(tt>.9){c.save();c.globalAlpha=.25*clamp((tt-.9)/.2,0,1);c.fillStyle=PC.red;rrect(152,240,52,80,6);c.fill();c.restore();}
    var gulp=tt>2.4?Math.max(0,1-(tt-2.4)/.5):0;
    gremlin(246,396,.85,t,{mood:tt>2.4?'gulp':'smug',gulp:gulp,quad:true,ph:3});
    feeTag(108,356,'LATE FEE',tt-1.0);
    feeTag(150,390,'OVERDRAFT',tt-1.6,PC.rust);
    if(tt>2.8){
      var a=clamp((tt-2.8)/.3,0,1);
      tx('About 1 in 3 users aged 18 to 29',150,420,13,{fam:F_U,wt:'700',fill:PC.rust,sw:0,shadow:false,alpha:a});
      tx('paid late last year (Fed, 2025).',150,436,13,{fam:F_U,wt:'700',fill:PC.rust,sw:0,shadow:false,alpha:a});
    }
    var dis=clamp((tt-.6)/.4,0,1);
    c.save();c.globalAlpha=dis;c.fillStyle=PC.navy;c.textAlign='center';c.font='700 10px '+F_U;
    c.fillText('Illustrative cart. Fees vary by lender.',150,456);
    c.fillText('Receipts in the comments.',150,468);c.restore();
    pearlFooter(16,'LATE FEES');
    grain(t,.09);
  }

  /* ---------- 6. TREASURE A: add it up ---------- */
  function calculator(x,y,val,tt){
    c.save();c.translate(x,y);
    c.fillStyle='rgba(0,0,0,.2)';rrect(-44,-58,96,124,14);c.fill();
    c.fillStyle='#2b2f4e';rrect(-48,-62,96,124,14);c.fill();c.strokeStyle=PC.navy;c.lineWidth=2.6;c.stroke();
    c.fillStyle='#cfe9d2';rrect(-38,-52,76,32,6);c.fill();
    c.fillStyle=PC.navy;c.font='400 20px '+F_T;c.textAlign='right';c.textBaseline='middle';c.fillText(val,32,-35);
    for(var r=0;r<3;r++)for(var k=0;k<3;k++){c.fillStyle=(r===2&&k===2)?PC.green:'#4a507c';rrect(-36+k*26,-10+r*22,22,18,4);c.fill();}
    c.restore();
  }
  function sceneTreasureA(t){
    var tt=t-T.trA;
    treasureBg(t);
    var y0=470;
    c.fillStyle='#3a8c6a';c.fillRect(0,y0,W,230);c.fillStyle='#4fb88b';c.fillRect(0,y0,W,5);
    grass(y0,t);
    var f=Math.floor(t*8);
    meiAt(92,470,1.15,mk('resolve',{nA:[-.9,-1.3]}),f);
    /* twelve bricks fly into the calculator */
    var k;
    for(k=0;k<12;k++){
      var p=clamp((tt-.3-k*.06)/.5,0,1);if(p>=1)continue;
      var sx=50+(k%4)*50,sy=300+Math.floor(k/4)*18,ex=220,ey=300;
      var x=sx+(ex-sx)*sm(p),y=sy+(ey-sy)*sm(p)-Math.sin(p*3.14)*30;
      c.save();c.globalAlpha=1-p*.6;c.fillStyle=CART[k%3].col;rrect(x-10,y-6,20,12,3);c.fill();c.strokeStyle=PC.navy;c.lineWidth=1.4;c.stroke();c.restore();
    }
    var cnt=Math.round(TOTAL*sm(clamp((tt-.6)/1.0,0,1)));
    calculator(220,330,'$'+cnt,tt);
    if(tt>1.6){tx('12 payments in 6 weeks',220,420,12,{fam:F_U,wt:'700',fill:PC.navy,sw:0,shadow:false,alpha:clamp((tt-1.6)/.3,0,1)});sparkles(220,296,tt-1.6,PC.gold,10,50);}
    kin('ADD IT UP.',172,168,44,tt-.15,{fill:PC.paper,stroke:PC.navy,shadow:PC.green});
    kin('BEFORE YOU TAP.',172,206,26,tt-.4,{fill:PC.gold,stroke:PC.navy,shadow:'#1a8a5a'});
  }

  /* ---------- 7. TREASURE B: one plan at a time ---------- */
  function sceneTreasureB(t){
    var tt=t-T.trB;
    treasureBg(t);
    var y0=470;
    c.fillStyle='#3a8c6a';c.fillRect(0,y0,W,230);c.fillStyle='#4fb88b';c.fillRect(0,y0,W,5);
    grass(y0,t);
    tx('THREE PLANS',95,180,13,{fill:PC.paper,stroke:PC.navy});
    tx('ONE PLAN',223,180,13,{fill:PC.paper,stroke:PC.navy});
    brickCalendar(40,284,110,ALL,12,t,{scale:.75,mini:true});
    var drop=tt<1.0?12:4;
    brickCalendar(168,284,110,tt<1.0?ALL:ONE,drop,t,{scale:.75,mini:true});
    if(tt>1.0&&tt<1.8){for(var k=0;k<8;k++){var p=(tt-1.0)/.8,x=170+(k%4)*26+p*60*(k%2?1:-1),y=220-p*90+(k%3)*8;c.save();c.globalAlpha=1-p;c.fillStyle=CART[1+k%2].col;rrect(x,y,18,10,3);c.fill();c.restore();}}
    tx('$'+PER_DATE+' every 2 weeks',95,304,12,{fam:F_U,wt:'700',fill:PC.red,sw:0,shadow:false});
    if(tt>1.2)tx('$'+CART[0].part+' every 2 weeks',223,304,12,{fam:F_U,wt:'700',fill:PC.navy,sw:0,shadow:false,alpha:clamp((tt-1.2)/.3,0,1)});
    var shrink=tt<1.2?1:Math.max(.3,1-(tt-1.2)/1.0*.7);
    gremlin(300,264,.6*shrink,t,{mood:tt>1.6?'scared':'smug',quad:true,ph:2});
    var f=Math.floor(t*8);
    rexAt(50,470,.9,mk(tt<2.2?'calm':'joy'),f);
    if(tt>2.4)kin('ONE PLAN',172,378,30,tt-2.4,{fill:PC.paper,stroke:PC.navy,shadow:'#1a8a5a'});
    if(tt>2.8)kin('AT A TIME.',172,414,26,tt-2.8,{fill:PC.gold,stroke:PC.navy,shadow:'#1a8a5a'});
    if(tt>3.6)tx('Half the hit, every due date.',170,444,13,{fam:F_U,wt:'700',fill:PC.navy,sw:0,shadow:false,alpha:clamp((tt-3.6)/.3,0,1)});
    c.save();c.globalAlpha=clamp((tt-.6)/.4,0,1)*.9;c.fillStyle=PC.navy;c.textAlign='center';c.font='700 10px '+F_U;c.fillText('Illustrative cart.',172,464);c.restore();
  }

  /* ---------- 8. QUEST card + Trap File + brand slate ---------- */
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
      tx('ADD UP',44,by+88,23,{fill:PC.navy,sw:0,shadow:false,align:'left',alpha:clamp((tt-.3)/.25,0,1)});
      tx('EVERY',44,by+118,23,{fill:PC.navy,sw:0,shadow:false,align:'left',alpha:clamp((tt-.45)/.25,0,1)});
      tx('PAY IN 4.',44,by+148,23,{fill:PC.coral,stroke:PC.navy,align:'left',alpha:clamp((tt-.6)/.25,0,1)});
      tx('Due this month.',44,by+172,12.5,{fam:F_U,wt:'700',fill:PC.navy,sw:0,shadow:false,align:'left',alpha:clamp((tt-.75)/.25,0,1)});
      tx('Every app. Every plan.',44,by+188,12.5,{fam:F_U,wt:'700',fill:PC.navy,sw:0,shadow:false,align:'left',alpha:clamp((tt-.85)/.25,0,1)});
    }
    if(tt>.6)trapCard(200,by+16,90,142,{n:16,name:'QUAD IMP',compact:true,mood:'dizzy',quad:true,solT:tt-1.2},t);
    if(tt>1.0){
      var a=clamp((tt-1.0)/.3,0,1);
      c.save();c.globalAlpha=a;
      c.fillStyle=PC.red;rrect(44,by+204,66,22,11);c.fill();c.fillStyle=PC.paper;c.font='400 10px '+F_T;c.textAlign='center';c.textBaseline='middle';c.fillText('TRAP 16',77,by+215);
      c.fillStyle=PC.navy;c.font='400 14px '+F_T;c.fillText('>',124,by+215);
      c.fillStyle=PC.green;rrect(138,by+204,86,22,11);c.fill();c.fillStyle=PC.navy;c.font='400 10px '+F_T;c.fillText('TREASURE',181,by+215);
      c.restore();
    }
    if(tt>1.4){
      hpBar(44,by+248,140,10,.30+.08*sm((tt-1.4)/1.0),PC.gold,'MEI XP  LV 1',null,{lab:PC.navy});
      var lv=clamp((tt-1.6)/.3,0,1);
      c.save();c.globalAlpha=lv;c.fillStyle=PC.navy;c.font='500 10px '+F_U;c.textAlign='left';
      c.fillText('World 4  Ep 16/24',200,by+257);
      c.fillText('Educational only. Not financial advice.',44,by+274);c.restore();
    }
    if(tt>1.6)tx('Level up!',150,by+27,16,{fam:F_P,fill:PC.coral,stroke:PC.navy,sw:.08,rot:-.1+Math.sin(tt*5)*.03,alpha:clamp((tt-1.6)/.3,0,1)});
    nickel(292,by-2,.55,t,'happy',{ph:2});
    if(tt>1.9&&tt<3.5)tx('Which trap got you?',150,444,15,{fam:F_U,wt:'700',fill:PC.sand,sw:0,shadow:false,alpha:clamp((tt-1.9)/.3,0,1)*(1-clamp((tt-3.2)/.3,0,1))});
    binderStrip(tt,16,1);
    if(tt>3.5){
      var b=sm((tt-3.5)/.4);
      c.save();c.globalAlpha=b;
      brandMark(86,436,11,PC.coral);
      c.fillStyle=PC.sand;c.font='700 22px '+F_FR;c.textAlign='left';c.textBaseline='alphabetic';c.fillText('The Joy Digi',102,444);
      c.fillStyle=PC.sand;c.font='500 10px '+F_DM;c.textAlign='center';c.fillText('Trap or Treasure is a production of The Joy Digi',150,464);
      c.restore();
    }
  }

  /* ---------- timeline (same 128 bpm grid as Ep 14) ---------- */
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
  var HITS=[0,1.0,1.55,3.2,3.9,4.7,15.0,15.6,16.4,20.1,24.5,30];
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
    if(t>=T.stepA&&t<T.trA)actTag(172,104,'TRAP 16 / 24',PC.red,PC.paper,t-T.stepA);
    if(t>=T.trA&&t<T.quest)actTag(172,104,'TREASURE',PC.green,PC.navy,t-T.trA);
    c.restore();
    swipe(t,T.stepA,PC.red);swipe(t,T.xa,PC.teal);swipe(t,T.trA,PC.green);swipe(t,T.quest,PC.deep);
    grain(t,.06);
  }
  var SCENES=[
    [rt(0),'Hook','Only $50, then 12 payments'],
    [rt(2.2),'Step in','Three taps, three onlys'],
    [rt(5.5),'Feels free','It is a loan'],
    [rt(8),'X-ray','What is due when'],
    [rt(14),'Miss one','Late fee, overdraft'],
    [rt(20),'Treasure','Add it up before you tap'],
    [rt(23.5),'One plan','Half the hit'],
    [rt(30),'Quest','Trap File 16 + brand slate']
  ];

  function cues(S){
    var n,k,at;
    var BASS_T=[33,33,36,31],BASS_X=[38,38,41,36],BASS_G=[48,43,45,41],CH=[[60,64,67],[55,59,62],[57,60,64],[53,57,60]];
    for(n=0;n<61;n++){
      at=n*B;
      if(n<13){S.kick(at,n<4?.55:.7);if(n>=4)S.hat(at+B/2,.05);S.bass(at,BASS_T[Math.floor(n/2)%4],B*.9,.06);}
      else if(n<33){S.kick(at,.6);if(n%2===1)S.clap(at,.16);S.hat(at+B/2,.07);S.hat(at,.03);S.bass(at+B/2,BASS_X[Math.floor(n/4)%4],B*.45,.07);S.pluck(at,[62,65,69,72][n%4]+12,.07);}
      else{S.kick(at,.7);S.hat(at+B/2,.09);S.hat(at+B/4,.03);S.hat(at+B*.75,.03);if(n%2===1)S.clap(at,.16);S.bass(at,BASS_G[Math.floor((n-33)/4)%4],B*.8,.08);if(n%4===0)S.pad(at,CH[Math.floor((n-33)/4)%4],B*4,.03);S.pluck(at+B/2,CH[Math.floor((n-33)/4)%4][n%3]+24,.08);}
    }
    /* hook */
    S.thump(0,.9);S.noise(0,.3,.18,2000,200);S.thump(rt(1.0),.9);S.thump(rt(1.55),1);S.noise(rt(1.55),.15,.3,900,300);
    /* three taps, each with a cheerful "cha-ching" */
    TAPS.forEach(function(x){var a=rt(T.stepA+x);S.click(a,.6);S.clink(a+.05,.12);S.tone(a+.08,84,.2,'sine',.08,4000,.004);});
    /* the Quad Imp: a sly laugh */
    var q=rt(T.stepA+2.65);S.tone(q,57,.12,'triangle',.14,1800,.005);S.tone(q+.13,57,.12,'triangle',.14,1800,.005);S.tone(q+.26,52,.22,'triangle',.14,1800,.005);
    /* bricks land */
    for(k=0;k<12;k++)S.click(rt(T.xa+.6+(k+1)*2.9/12),.26);
    S.thump(rt(T.xa+2.6),.7);
    /* missed payment: buzz, two fee slams, a gulp */
    S.tone(rt(14.9),40,.5,'square',.06,600,.01);S.thump(rt(15.0),.9);S.noise(rt(15.0),.2,.2,1500,300);
    S.thump(rt(15.6),.9);S.noise(rt(15.6),.2,.2,1500,300);
    S.tone(rt(16.4)+.05,45,.16,'sine',.2,500,.005);S.tone(rt(16.4)+.15,52,.12,'sine',.16,700,.005);
    /* treasure */
    S.noise(rt(20),.4,.22,300,7000);
    [72,76,79,84].forEach(function(m,i){S.tone(rt(20.15)+i*.07,m,.8,'sine',.14,3800,.004);});
    for(k=0;k<12;k++)S.click(rt(20.3+k*.06),.18);
    for(k=0;k<8;k++)S.click(rt(20.6+k*.12),.12);
    S.clink(rt(21.6),.18);
    S.noise(rt(24.5),.45,.2,2500,300);S.tone(rt(24.5),72,.4,'sine',.1,2000,.005);
    S.thump(rt(25.9),.8);S.thump(rt(26.3),.7);
    /* quest */
    S.thump(rt(30),.9);[72,76,79,84].forEach(function(m,i){S.tone(rt(30)+i*.06,m,1.6,'sine',.13,3600,.004);});
    S.click(rt(31.0),.3);S.click(rt(31.3),.3);S.clink(rt(31.6),.16);
  }
