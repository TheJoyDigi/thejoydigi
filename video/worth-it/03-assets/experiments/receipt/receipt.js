/* receipt: EXPERIMENT. Ep 1 told on a thermal receipt that prints in real time and scrolls up out of a printer.
   Same narration as the production Ep 1 (Leda). Pure function of time on the shared canvas context `c`. */
var R={paper:'#F6F2E7',ink:'#1F232B',red:'#E23B3F',navy:'#2C3B91',green:'#13955A',gold:'#E09A12',hi:'rgba(255,200,61,.6)',coral:'#FF6B6B'};
var F_MONO='"Space Mono",ui-monospace,Menlo,monospace',F_MK='"Permanent Marker","Bangers",cursive';
var SLOT=470,PX=46,PW=228,PL=58,PR=262,DUR=32.0,FLIP=18.4;
var HT={hdr:30,c:20,item:23,dash:14,dash2:16,big:32,inv:28,logo:66,bar:46,cup:46};
var RA=[
  {k:'cup',at:-3},{k:'hdr',t:'CORNER CAFE',at:-3},{k:'c',t:'12 MAIN ST  *  ORDER #0001',at:-3,size:11},{k:'c',t:'10/02/26   07:42 AM',at:-3,size:11},{k:'dash',at:-3},
  {k:'item',t:'LATTE 12OZ',r:'$5.00',at:-2,id:'latte'},{k:'blank',h:122,at:-1.8,id:'note'},
  {k:'dash',at:5.45},{k:'inv',t:'WHAT YOU ACTUALLY GOT',at:5.7},{k:'c',t:'SOMEONE SOLVED A PROBLEM:',at:6.55},
  {k:'item',t:'WARM CUP',r:'#',at:7.95},{k:'item',t:'PLACE TO SIT',r:'#',at:8.9},{k:'item',t:'10 QUIET MINUTES',r:'#',at:9.9},
  {k:'dash',at:11.2},{k:'item',t:'YOU PAID',r:'$5.00',at:11.45},{k:'item',t:'GLADLY?',r:'YES',at:12.65,id:'gladly'},
  {k:'dash2',at:13.55},{k:'big',t:'PROBLEM SOLVED',at:13.75},{k:'big',t:'VALUE PAID',at:14.35,id:'vp'},{k:'dash2',at:14.85},
  {k:'blank',h:84,at:15.45,id:'q'}
];
var RB=[
  {k:'hdr',t:'YOUR SHOP',at:18.55},{k:'c',t:'MERCHANT COPY  *  OPEN',at:18.55,size:11},{k:'dash',at:18.55},
  {k:'c',t:'A CUSTOMER ASKS:',at:20.1},{k:'big',t:'WHAT CAN I MAKE',at:20.4,size:19},{k:'big',t:'THAT SOMEONE',at:20.95,size:19},{k:'big',t:'WOULD PAY $5 FOR?',at:21.55,size:17},
  {k:'item',t:'YOUR ITEM: ______',r:'$5.00',at:22.35,id:'yours'},{k:'dash',at:23.1},
  {k:'item',t:'YOU ARE THE',r:'CUSTOMER',at:23.35,id:'role'},{k:'blank',h:26,at:23.6},
  {k:'inv',t:'ORDER #1  -  DO THIS',at:25.3},{k:'c',t:'Write down one thing',at:25.75,size:13},{k:'c',t:'people already ask',at:26.15,size:13},{k:'c',t:'you for help with.',at:26.55,size:13},
  {k:'blank',h:62,at:26.9,id:'stamp'},{k:'c',t:'***  THANK YOU  ***',at:28.45},{k:'dash',at:28.75},
  {k:'logo',at:29.0},{k:'c',t:'Worth It is a production',at:29.55,size:11},{k:'c',t:'of The Joy Digi',at:29.85,size:11},{k:'bar',at:30.15},
  {k:'c',t:'Educational only.',at:30.6,size:11},{k:'c',t:'Not financial advice.',at:30.9,size:11},{k:'blank',h:26,at:31.15}
];
var NA=[
  {ty:'text',id:'note',x:PL+2,y:24,t:'EVERYONE SAYS',s:15,at:.3,d:.45,col:R.red},
  {ty:'text',id:'note',x:PL+2,y:62,t:'THIS IS WHY',s:27,at:.85,d:.55,col:R.red},
  {ty:'text',id:'note',x:PL+2,y:100,t:"YOU'RE BROKE",s:27,at:1.5,d:.65,col:R.red},
  {ty:'arrow',id:'note',x0:PR-30,y0:14,x1:PR-34,y1:-8,at:2.25,col:R.red},
  {ty:'circle',id:'latte',cx:PR-26,cy:11,rx:34,ry:15,at:2.45,d:.35,col:R.red},
  {ty:'scribble',id:'note',x0:PL-4,x1:PR-8,y0:30,y1:104,at:3.2,d:.45,col:R.ink},
  {ty:'stamp',id:'note',x:(PL+PR)/2,y:64,t:'MYTH: VOID',s:34,at:3.55,col:R.navy,rot:-.16},
  {ty:'circle',id:'gladly',cx:PR-15,cy:11,rx:24,ry:13,at:13.0,d:.3,col:R.green},
  {ty:'hilite',id:'vp',at:14.55,d:.35},
  {ty:'text',id:'q',x:PL+6,y:44,t:'how do I spend less?',s:16,at:15.75,d:1.0,col:R.ink},
  {ty:'scribble',id:'q',x0:PL,x1:PR-6,y0:26,y1:50,at:17.25,d:.45,col:R.ink}
];
var NB=[
  {ty:'cursor',id:'yours',at:22.6},
  {ty:'strike',id:'role',x0:PR-80,x1:PR+2,y:12,at:24.3,d:.3,col:R.ink},
  {ty:'text',id:'role',x:PR-98,y:44,t:'MERCHANT',s:19,at:24.6,d:.55,col:R.green},
  {ty:'check',id:'role',x:PR-6,y:36,at:25.15,col:R.green},
  {ty:'stamp',id:'stamp',x:(PL+PR)/2,y:32,t:'WORTH IT.',s:32,at:28.05,col:R.gold,rot:-.1}
];
var EVTS=[[3.55,.08,7,.012],[14.35,.06,4,.006],[FLIP,.07,8,.02],[24.6,.04,3,0],[28.05,.09,7,.012],[13.75,.04,3,0],[29.0,.03,2,0]];

function rfont(w,s,f){c.font=w+' '+s+'px '+(f||F_MONO);}
function layout(L){var y=0;L.forEach(function(l){l.h=l.h||HT[l.k]||20;l.y=y;y+=l.h;});return L;}
layout(RA);layout(RB);
function feedOf(L,t){var f=0;L.forEach(function(l){var fd=l.k==='blank'?.32:.17,u=clamp((t-l.at)/fd,0,1);f+=l.h*(1-Math.pow(1-u,3));});return f;}
function byId(L,id){for(var i=0;i<L.length;i++)if(L[i].id===id)return L[i];return null;}

function drawCheck(x,y,s,col,p){c.save();c.strokeStyle=col;c.lineWidth=2.6*s;c.lineCap='round';c.lineJoin='round';c.beginPath();var a=[x-7*s,y],b=[x-2*s,y+5*s],e=[x+8*s,y-7*s];c.moveTo(a[0],a[1]);if(p<.4)c.lineTo(a[0]+(b[0]-a[0])*p/.4,a[1]+(b[1]-a[1])*p/.4);else{c.lineTo(b[0],b[1]);var q=(p-.4)/.6;c.lineTo(b[0]+(e[0]-b[0])*q,b[1]+(e[1]-b[1])*q);}c.stroke();c.restore();}

function drawLine(l,top,t){
  var p=clamp((t-l.at)/(l.k==='blank'?.32:.17),0,1);if(p<=0)return;
  var y=top+l.y,rev=clamp(p*1.15,0,1);
  c.save();c.beginPath();c.rect(PX,y-2,PW*(l.k==='inv'||l.k==='bar'||l.k==='logo'||l.k==='cup'?1:rev)+2,l.h+4);c.clip();
  c.fillStyle=R.ink;c.textBaseline='alphabetic';
  if(l.k==='hdr'){rfont('700',20);c.textAlign='center';c.fillText(l.t,(PL+PR)/2,y+22);}
  else if(l.k==='c'){rfont('700',l.size||13);c.textAlign='center';c.fillText(l.t,(PL+PR)/2,y+14);}
  else if(l.k==='item'){rfont('700',14);c.textAlign='left';c.fillText(l.t,PL,y+16);
    if(l.r==='#')drawCheck(PR-10,y+10,1,R.ink,clamp((t-l.at-.12)/.2,0,1));else{c.textAlign='right';c.fillText(l.r,PR,y+16);}
    var tw;rfont('700',14);tw=c.measureText(l.t).width;var rw=l.r==='#'?22:c.measureText(l.r).width+6;c.fillStyle='rgba(31,35,43,.45)';for(var dx=PL+tw+6;dx<PR-rw;dx+=6)c.fillRect(dx,y+14,1.6,1.6);}
  else if(l.k==='dash'){c.fillStyle='rgba(31,35,43,.6)';for(var x=PL;x<PR;x+=9)c.fillRect(x,y+7,5,1.6);}
  else if(l.k==='dash2'){c.fillStyle=R.ink;c.fillRect(PL,y+5,PR-PL,2);c.fillRect(PL,y+10,PR-PL,2);}
  else if(l.k==='big'){rfont('700',l.size||22);c.textAlign='center';c.fillText(l.t,(PL+PR)/2,y+24);}
  else if(l.k==='inv'){c.fillStyle=R.ink;c.fillRect(PL-4,y+3,(PR-PL+8)*rev,l.h-6);c.fillStyle=R.paper;rfont('700',13);c.textAlign='center';c.fillText(l.t,(PL+PR)/2,y+19);}
  else if(l.k==='bar'){var k,bx=PL+20;for(k=0;bx<PR-20;k++){var bw=1+Math.floor(aRand(k*3.7)*3.2);if(k%2===0){c.fillStyle=R.ink;c.fillRect(bx,y+6,bw,30);}bx+=bw+1;}rfont('400',9);c.textAlign='center';c.fillText('0 41729 00001 5',(PL+PR)/2,y+44);}
  else if(l.k==='logo'){c.fillStyle=R.coral;star4((PL+PR)/2,y+20,14,0);c.fill();c.fillStyle=R.ink;c.font='700 19px "Fraunces",Georgia,serif';c.textAlign='center';c.fillText('The Joy Digi',(PL+PR)/2,y+58);}
  else if(l.k==='cup'){var cx=(PL+PR)/2;c.strokeStyle=R.ink;c.lineWidth=2.2;c.beginPath();c.moveTo(cx-12,y+14);c.lineTo(cx-9,y+36);c.lineTo(cx+9,y+36);c.lineTo(cx+12,y+14);c.closePath();c.stroke();c.beginPath();c.arc(cx+15,y+24,5,-1.4,1.4);c.stroke();c.beginPath();c.moveTo(cx-4,y+10);c.quadraticCurveTo(cx-1,y+4,cx-4,y);c.moveTo(cx+4,y+10);c.quadraticCurveTo(cx+7,y+4,cx+4,y);c.stroke();}
  c.restore();
}

function note(n,L,top,t){
  var l=byId(L,n.id);if(!l||t<n.at)return;var oy=top+l.y,u=clamp((t-n.at)/(n.d||.3),0,1);
  c.save();c.lineCap='round';c.lineJoin='round';
  if(n.ty==='text'){c.font='400 '+n.s+'px '+F_MK;c.fillStyle=n.col;c.textAlign='left';c.textBaseline='alphabetic';var w=c.measureText(n.t).width;c.beginPath();c.rect(n.x-4,oy+n.y-n.s*1.2,(w+10)*u,n.s*1.6);c.clip();c.save();c.translate(n.x,oy+n.y);c.rotate(-.035);c.fillText(n.t,0,0);c.restore();}
  else if(n.ty==='circle'){c.strokeStyle=n.col;c.lineWidth=3;c.beginPath();var a0=-2.2,a1=a0+Math.PI*2.15*u;for(var a=a0;a<=a1;a+=.08){var rr=1+.06*Math.sin(a*3);var px=n.cx+Math.cos(a)*n.rx*rr,py=oy+n.cy+Math.sin(a)*n.ry*rr;if(a===a0)c.moveTo(px,py);else c.lineTo(px,py);}c.stroke();}
  else if(n.ty==='arrow'){var k=clamp((t-n.at)/.25,0,1);c.strokeStyle=n.col;c.lineWidth=3;c.beginPath();var ex=n.x0+(n.x1-n.x0)*k,ey=oy+n.y0+(n.y1-n.y0)*k;c.moveTo(n.x0,oy+n.y0);c.lineTo(ex,ey);c.stroke();if(k>=1){c.beginPath();c.moveTo(ex-7,ey+6);c.lineTo(ex,ey);c.lineTo(ex+6,ey+7);c.stroke();}}
  else if(n.ty==='scribble'){c.strokeStyle=n.col;c.lineWidth=3;c.globalAlpha=.5;c.beginPath();var steps=10,i,last=Math.floor(steps*u);for(i=0;i<=last;i++){var x=i%2?n.x1:n.x0,y=oy+n.y0+(n.y1-n.y0)*i/steps+(aRand(i)*6-3);if(i===0)c.moveTo(x,y);else c.lineTo(x,y);}c.stroke();}
  else if(n.ty==='strike'){c.strokeStyle=n.col;c.lineWidth=3.5;c.beginPath();c.moveTo(n.x0,oy+n.y+1);c.lineTo(n.x0+(n.x1-n.x0)*u,oy+n.y-2*u);c.stroke();}
  else if(n.ty==='check'){drawCheck(n.x,oy+n.y,1.4,n.col,clamp((t-n.at)/.25,0,1));}
  else if(n.ty==='cursor'){if(Math.floor(t*2.4)%2===0){c.fillStyle=R.ink;c.fillRect(PL+90,oy+5,8,14);}}
  else if(n.ty==='hilite'){c.globalCompositeOperation='multiply';c.fillStyle=R.hi;c.save();c.translate(PL-6,oy+6);c.rotate(-.02);c.fillRect(0,0,(PR-PL+12)*u,22);c.restore();}
  else if(n.ty==='stamp'){
    var sk=clamp((t-n.at)/.16,0,1),sc=1+(1-sk)*(1-sk)*1.8;
    c.translate(n.x,oy+n.y);c.rotate(n.rot);c.scale(sc,sc);c.globalAlpha=Math.min(1,sk*1.5)*.95;
    c.font='400 '+n.s+'px '+F_MK;c.textAlign='center';c.textBaseline='middle';var sw=c.measureText(n.t).width+26,sh=n.s*1.5;
    c.strokeStyle=n.col;c.lineWidth=4;rrect(-sw/2,-sh/2,sw,sh,6);c.stroke();c.lineWidth=1.6;rrect(-sw/2+5,-sh/2+5,sw-10,sh-10,4);c.stroke();
    c.fillStyle=n.col;c.fillText(n.t,0,2);
    c.globalCompositeOperation='destination-out';for(var q=0;q<40;q++){c.fillRect(-sw/2+aRand(q*3.1)*sw,-sh/2+aRand(q*5.7)*sh,1.6,1.6);}
  }
  c.restore();
}

function receipt(L,N,t,o){
  o=o||{};var f=feedOf(L,t),top=SLOT-f;
  c.save();
  if(o.sx!=null){c.translate(160,0);c.scale(Math.max(.001,o.sx),1);c.translate(-160,0);}
  if(o.dy)c.translate(0,o.dy);if(o.rot){c.translate(160,SLOT);c.rotate(o.rot);c.translate(-160,-SLOT);}
  var y0=Math.max(top,-20);
  c.save();c.shadowColor='rgba(0,0,0,.45)';c.shadowBlur=18;c.shadowOffsetY=6;c.fillStyle=o.back?'#FBF3DD':R.paper;c.fillRect(PX,y0,PW,SLOT-y0+6);c.restore();
  var pg=c.createLinearGradient(PX,0,PX+PW,0);pg.addColorStop(0,'rgba(0,0,0,.08)');pg.addColorStop(.12,'rgba(0,0,0,0)');pg.addColorStop(.88,'rgba(0,0,0,0)');pg.addColorStop(1,'rgba(0,0,0,.1)');c.fillStyle=pg;c.fillRect(PX,y0,PW,SLOT-y0+6);
  if(top>-20){c.fillStyle=o.back?'#FBF3DD':R.paper;c.beginPath();c.moveTo(PX,top);for(var zx=0;zx<=PW;zx+=8)c.lineTo(PX+zx,top-(zx/8%2?4:0));c.lineTo(PX+PW,top+2);c.closePath();c.fill();}
  if(o.back){c.fillStyle='rgba(224,154,18,.85)';c.fillRect(PX,top,PW,5);}
  L.forEach(function(l){var sy=top+l.y;if(sy>SLOT+4||sy+l.h<-40)return;drawLine(l,top,t);});
  N.forEach(function(n){note(n,L,top,t);});
  if(o.torn){c.fillStyle='rgba(0,0,0,0)';}
  c.restore();
}

function scene(t){
  /* the café: warm dark counter, drifting bokeh, steam */
  var g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#120C0B');g.addColorStop(.6,'#2A1A14');g.addColorStop(1,'#140D0B');c.fillStyle=g;c.fillRect(0,0,W,H);
  var i;for(i=0;i<22;i++){var bx=(aRand(i*2.1)*420-30+t*(4+aRand(i)*8))%420-30,by=40+aRand(i*5.3)*360+Math.sin(t*.6+i)*8,br=8+aRand(i*7.7)*26;var bg=c.createRadialGradient(bx,by,0,bx,by,br);bg.addColorStop(0,i%4===0?'rgba(255,107,107,.22)':'rgba(255,190,110,.20)');bg.addColorStop(1,'rgba(255,190,110,0)');c.fillStyle=bg;c.beginPath();c.arc(bx,by,br,0,6.3);c.fill();}
  var wg=c.createLinearGradient(0,0,360,300);wg.addColorStop(0,'rgba(255,214,150,.10)');wg.addColorStop(1,'rgba(255,214,150,0)');c.fillStyle=wg;c.beginPath();c.moveTo(220,0);c.lineTo(360,0);c.lineTo(360,260);c.lineTo(80,640);c.lineTo(0,640);c.closePath();c.fill();
  var cg=c.createLinearGradient(0,470,0,640);cg.addColorStop(0,'#3B2418');cg.addColorStop(1,'#1A0F0A');c.fillStyle=cg;c.fillRect(0,476,W,H-476);
  c.fillStyle='rgba(255,200,140,.08)';c.fillRect(0,476,W,2);
  c.save();c.globalAlpha=.9;c.fillStyle='#0E0A09';rrect(300,430,46,52,8);c.fill();c.strokeStyle='rgba(255,200,140,.25)';c.lineWidth=1;c.stroke();c.restore();
  for(i=0;i<3;i++){var ph=(t*.5+i*.33)%1;c.save();c.globalAlpha=(1-ph)*.35;c.strokeStyle='#fff';c.lineWidth=2;c.beginPath();var sx=314+i*9;c.moveTo(sx,428-ph*60);c.quadraticCurveTo(sx+8,412-ph*60,sx,398-ph*60);c.stroke();c.restore();}
}
function printer(t,busy){
  c.save();var pg=c.createLinearGradient(0,462,0,600);pg.addColorStop(0,'#2C2F36');pg.addColorStop(1,'#111317');c.fillStyle=pg;rrect(26,462,268,140,14);c.fill();
  c.strokeStyle='rgba(255,255,255,.08)';c.lineWidth=1;c.stroke();
  c.fillStyle='#07080A';rrect(PX-4,466,PW+8,8,4);c.fill();
  if(busy){c.fillStyle='rgba(255,255,255,'+(.25+.25*Math.sin(t*60))+')';c.fillRect(PX,468,PW,2);}
  c.fillStyle=busy?'#3CFF8F':'#1E7A49';c.beginPath();c.arc(262,500,3.4,0,6.3);c.fill();
  c.fillStyle='rgba(255,255,255,.28)';c.font='700 8px '+F_MONO;c.textAlign='left';c.fillText('THERMAL  80MM',44,503);
  c.restore();
}
function busyAt(L,t){for(var i=0;i<L.length;i++){var l=L[i];if(t>=l.at&&t<l.at+(l.k==='blank'?.32:.2))return true;}return false;}

function drawReceipt(t){
  c.setTransform(SC,0,0,SC,0,0);
  scene(t);
  var push=1+.05*sm(clamp(t/18,0,1))*(t<FLIP?1:0)+(t>=FLIP?.04*sm(clamp((t-FLIP)/12,0,1)):0);
  gPunchBegin(t,EVTS,160,330);
  c.save();c.translate(160,330);c.rotate(Math.sin(t*.7)*.006);c.scale(push,push);c.translate(-160,-330);
  if(t<FLIP+.22){
    var k=clamp((t-FLIP)/.22,0,1);
    receipt(RA,NA,Math.min(t,FLIP-.01),k>0?{dy:-sm(k)*70,sx:1-sm(k),rot:-k*.05}:{});
  }
  if(t>=FLIP+.12){var k2=sm(clamp((t-FLIP-.12)/.28,0,1));receipt(RB,NB,t,{sx:k2,back:true});}
  c.restore();
  printer(t,t<FLIP?busyAt(RA,t):busyAt(RB,t));
  c.restore();
  if(t>=FLIP&&t<FLIP+.3){c.save();c.globalAlpha=(1-(t-FLIP)/.3)*.5;c.fillStyle='#fff';c.fillRect(0,0,W,H);c.restore();}
  gFlash(t,14.35,'#FFD27A',.22,.25);gFlash(t,28.05,'#FFD27A',.3,.3);
  gBurst(160,300,t-28.05,[R.gold,'#fff',R.coral],22,190,260);gBurst(PR-15,330,t-14.35,[R.gold,'#fff'],14,140,260);
  var vg=c.createRadialGradient(180,320,200,180,320,440);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.5)');c.fillStyle=vg;c.fillRect(0,0,W,H);
}

/* sound: lo-fi bed (ducks under the voice) + printer, marker, stamps, tear (fx) */
function receiptSound(S,F){
  var B=.75,i,b;
  var CH=[[53,57,60,64],[52,55,59,62],[50,53,57,60],[48,52,55,59]];
  for(b=0,i=0;b<DUR;b+=B*4,i++){var ch=CH[i%4];ch.forEach(function(n,k){S.tone(b+.02+k*.012,n,B*3.6,'triangle',.028,1400,.02);S.tone(b+.02,n+12,B*1.2,'sine',.012,2000,.01);});S.bass(b,ch[0]-12,B*1.8,.05);S.bass(b+B*2,ch[0]-12,B*1.6,.045);}
  for(b=0;b<DUR;b+=4)S.noise(b,4.2,.012,5000,7000);
  for(b=1.5;b<DUR-1;b+=B){var bi=Math.round((b-1.5)/B);if(b>FLIP-.4&&b<FLIP+.8)continue;
    if(bi%4===0||bi%8===5)S.kick(b,.22);if(bi%4===2)S.snare(b,.11);S.hat(b+B/2+.04,.018);S.hat(b,.012);}
  function zzz(at,n){for(var q=0;q<n;q++)F.noise(at+q*.021,.016,.055,2600,1900);}
  [RA,RB].forEach(function(L){L.forEach(function(l){if(l.at<0)return;zzz(l.at,l.k==='blank'?6:(l.k==='big'?11:8));});});
  [NA,NB].forEach(function(N){N.forEach(function(n){if(n.ty==='text'||n.ty==='scribble'){for(var q=0;q<5;q++)F.noise(n.at+q*(n.d||.4)/5,.07,.035,4200,3200);}
    if(n.ty==='circle'||n.ty==='strike')F.noise(n.at,(n.d||.3),.04,3800,3000);
    if(n.ty==='stamp'){F.kick(n.at,.45);F.boom(n.at,.3);F.noise(n.at,.12,.22,900,200);F.clap(n.at+.01,.15);}
    if(n.ty==='check'){F.coin(n.at,.06);}});});
  [7.95,8.9,9.9].forEach(function(at){F.coin(at+.14,.05);});
  F.coin(14.35,.1);F.clink(14.45,.22);F.arp(14.4,[84,88,91,96],4,.06,0,.06,'triangle');
  F.noise(FLIP,.42,.3,6500,700);F.noise(FLIP+.05,.22,.2,3000,500);F.noise(FLIP+.15,.3,.12,400,5200);F.boom(FLIP,.25);
  F.clink(24.62,.16);F.arp(28.1,[72,76,79,84],4,.08,0,.06,'triangle');S.pad(28.05,[60,64,67,72],3.6,.03);
  F.noise(31.2,.28,.16,1800,6500);
}
