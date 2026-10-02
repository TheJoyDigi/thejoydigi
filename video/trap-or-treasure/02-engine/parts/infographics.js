/* infographics: the Trap or Treasure kit. Every piece is a pure function of time, drawn on the shared canvas context `c`. */

  var F_B='"Bowlby One","Dela Gothic One",sans-serif';
  var F_P='"Pacifico","Caveat",cursive';
  var F_FR='"Fraunces",Georgia,serif';
  var F_DM='"DM Sans","Figtree",system-ui,sans-serif';
  var PC={gold:'#f5b83d',green:'#4cd68a',red:'#ff5d6c',blue:'#4cc9f0',purple:'#9b7bff',navy:'#1c2550',yellow:'#f3c969',cream:'#f4e6c8',paper:'#fff6e0',teal:'#2f7f86',rust:'#d0583a',deep:'#003B49',sand:'#FDF6EC',coral:'#FF6B6B',ink:'#4D7580'};

  function rrect(x,y,w,h,r){
    r=Math.min(r,w/2,h/2);
    c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath();
  }
  function star4(x,y,r,rot){
    c.save();c.translate(x,y);c.rotate(rot||0);
    c.beginPath();c.moveTo(0,-r);c.quadraticCurveTo(r*.12,-r*.12,r,0);c.quadraticCurveTo(r*.12,r*.12,0,r);c.quadraticCurveTo(-r*.12,r*.12,-r,0);c.quadraticCurveTo(-r*.12,-r*.12,0,-r);c.closePath();
    c.restore();
  }
  function fmtMoney(v){var s=Math.round(v).toString();return '$'+s.replace(/\B(?=(\d{3})+(?!\d))/g,',');}

  /* outlined text: one helper for every number and label */
  function tx(str,x,y,size,o){
    o=o||{};
    c.save();
    c.font=(o.wt||'400')+' '+size+'px '+(o.fam||F_T);c.textAlign=o.align||'center';c.textBaseline=o.base||'alphabetic';c.lineJoin='round';
    if(o.alpha!=null)c.globalAlpha=o.alpha;
    c.translate(x,y);if(o.rot)c.rotate(o.rot);if(o.sc)c.scale(o.sc,o.sc);
    if(o.sw!==0){
      c.lineWidth=size*(o.sw==null?.14:o.sw);
      if(o.shadow!==false){c.strokeStyle=o.shadow||'rgba(0,0,0,.28)';c.strokeText(str,size*.04,size*.06);}
      c.strokeStyle=o.stroke||PC.navy;c.strokeText(str,0,0);
    }
    c.fillStyle=o.fill||PC.paper;c.fillText(str,0,0);
    c.restore();
  }

  /* film grain and vignette: one overlay on everything keeps all styles in one show */
  var grainCv=null;
  function grain(t,al){
    if(!grainCv){
      grainCv=document.createElement('canvas');grainCv.width=grainCv.height=96;
      var g=grainCv.getContext('2d'),id=g.createImageData(96,96),r=rng(7),k;
      for(k=0;k<id.data.length;k+=4){var v=r()*255;id.data[k]=v;id.data[k+1]=v;id.data[k+2]=v;id.data[k+3]=r()*255;}
      g.putImageData(id,0,0);
    }
    var f=Math.floor(t*8),ox=(f*37)%96,oy=(f*61)%96;
    c.save();c.globalAlpha=al==null?.07:al;c.globalCompositeOperation='overlay';
    for(var x=-ox;x<W;x+=96)for(var y=-oy;y<H;y+=96)c.drawImage(grainCv,x,y);
    c.restore();
  }
  function vignette(al,col){
    var g=c.createRadialGradient(W/2,H*.48,H*.25,W/2,H*.48,H*.78);
    g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,(col||'rgba(20,0,10,A)').replace('A',al));
    c.fillStyle=g;c.fillRect(0,0,W,H);
  }
  function halftone(col,al,gap){
    c.save();c.fillStyle=col;c.globalAlpha=al;
    for(var y=0;y<H;y+=gap)for(var x=((y/gap)%2)*gap/2;x<W;x+=gap){
      var d=Math.min(1,Math.hypot(x-W/2,y-H/2)/(H*.62));
      if(d>.55){c.beginPath();c.arc(x,y,(d-.5)*gap*.55,0,6.3);c.fill();}
    }
    c.restore();
  }
  function rays(cx,cy,t,col,al,n){
    c.save();c.translate(cx,cy);c.rotate(t*.18);c.fillStyle=col;
    for(var k=0;k<n;k++){
      var a=k/n*6.2832,w=.09;
      c.globalAlpha=al*(k%2?.6:1);
      c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(a-w)*800,Math.sin(a-w)*800);c.lineTo(Math.cos(a+w)*800,Math.sin(a+w)*800);c.closePath();c.fill();
    }
    c.restore();
  }
  function sparkles(cx,cy,tt,col,n,spread){
    if(tt<0)return;
    for(var k=0;k<n;k++){
      var a=rr(k,3)*6.2832,sp=(spread||90)*(.4+rr(k,9)*.9),p=clamp(tt/(.7+rr(k,5)*.5),0,1);
      if(p>=1)continue;
      var x=cx+Math.cos(a)*sp*p,y=cy+Math.sin(a)*sp*p-30*p+60*p*p;
      c.save();c.globalAlpha=1-p;c.fillStyle=col;star4(x,y,4+rr(k,1)*5,tt*3+k);c.fill();c.restore();
    }
  }

  /* TRAP stamp (the series' numbered trap file) */
  function stamp(cx,cy,l1,l2,tt,o){
    if(tt<0)return;
    o=o||{};
    var k=clamp(tt/.14,0,1),sc=1+(1-k)*(1-k)*1.8,al=clamp(tt/.04,0,1),col=o.col||PC.red,rot=o.rot==null?-.12:o.rot;
    var shake=tt<.4?Math.sin(tt*70)*(1-tt/.4)*2.2:0,w=o.w||150,h=o.h||54;
    c.save();c.translate(cx+shake,cy);c.rotate(rot);c.scale(sc,sc);c.globalAlpha=al*(o.alpha==null?1:o.alpha);
    c.fillStyle=o.bg||PC.paper;rrect(-w/2,-h/2,w,h,9);c.fill();
    c.strokeStyle=col;c.lineWidth=4;rrect(-w/2,-h/2,w,h,9);c.stroke();
    c.lineWidth=1.4;rrect(-w/2+5,-h/2+5,w-10,h-10,5);c.stroke();
    c.fillStyle=col;c.textAlign='center';c.textBaseline='middle';
    c.font='400 '+(o.size||24)+'px '+F_T;c.fillText(l1,0,l2?-7:1);
    if(l2){c.font='700 10px '+F_U;c.fillText(l2,0,14);}
    c.restore();
  }
  /* small act tag that rides the top of the frame: TRAP 14/24 then TREASURE */
  function actTag(x,y,txt,bg,fg,tt){
    if(tt<0)return;
    var k=sm(tt/.25);
    c.save();c.translate(x,y-(1-k)*20);c.globalAlpha=k;
    c.font='400 13px '+F_T;var w=c.measureText(txt).width+26;
    c.fillStyle=bg;rrect(-w/2,-13,w,26,13);c.fill();c.strokeStyle=PC.navy;c.lineWidth=2;c.stroke();
    c.fillStyle=fg;c.textAlign='center';c.textBaseline='middle';c.fillText(txt,0,1);
    c.restore();
  }

  /* Nickel the coin: never speaks, emotes with eyes and bounces */
  function nickel(x,y,s,t,mood,o){
    o=o||{};
    var ph=o.ph||0,bob=Math.sin(t*5+ph)*2,sq=1+Math.sin(t*5+ph)*.045+(o.squash||0);
    c.save();c.translate(x,y+bob*s);c.scale(s*(2-sq),s*sq);
    c.fillStyle='rgba(0,0,0,.22)';c.beginPath();c.ellipse(0,19,11,3,0,0,6.3);c.fill();
    var aw=(mood==='happy'?Math.sin(t*10)*.5+.9:0)+(o.arm||0);
    c.strokeStyle=PC.navy;c.lineWidth=2.4;c.lineCap='round';
    c.beginPath();c.moveTo(-15,3);c.quadraticCurveTo(-22,4-aw*7,-21,-2-aw*13);c.stroke();
    c.beginPath();c.moveTo(15,3);c.quadraticCurveTo(22,4-aw*7,21,-2-aw*13);c.stroke();
    var g=c.createRadialGradient(-5,-6,2,0,0,17);g.addColorStop(0,'#ffe08a');g.addColorStop(1,PC.gold);
    c.fillStyle=g;c.beginPath();c.arc(0,0,16,0,6.3);c.fill();c.lineWidth=2.4;c.stroke();
    c.strokeStyle='#c98f1d';c.lineWidth=1.2;c.beginPath();c.arc(0,0,11.5,0,6.3);c.stroke();
    c.strokeStyle=PC.navy;c.fillStyle=PC.navy;c.lineWidth=2;
    if(mood==='happy'){
      c.beginPath();c.arc(-5,-3,3,3.5,5.9);c.stroke();c.beginPath();c.arc(5,-3,3,3.5,5.9);c.stroke();
      c.fillStyle='#7a2230';c.beginPath();c.arc(0,3,4.5,0,3.14);c.fill();
    }else{
      var bl=((t*.9+ph)%3.2)<.12?.3:1;
      c.beginPath();c.ellipse(-5,-3,2.2,2.6*bl,0,0,6.3);c.fill();c.beginPath();c.ellipse(5,-3,2.2,2.6*bl,0,0,6.3);c.fill();
      c.lineWidth=1.8;c.beginPath();
      if(mood==='worried'){c.moveTo(-8,-8);c.lineTo(-3,-6.5);c.moveTo(8,-8);c.lineTo(3,-6.5);c.stroke();c.beginPath();c.moveTo(-3.5,6);c.quadraticCurveTo(0,3,3.5,6);c.stroke();}
      else{c.moveTo(-3.5,3.5);c.quadraticCurveTo(0,6.5,3.5,3.5);c.stroke();}
    }
    c.restore();
  }

  /* a fake phone screen: generic app, no brand */
  function phoneUI(x,y,w,h,o){
    o=o||{};
    c.save();c.translate(x,y);
    c.fillStyle='rgba(0,0,0,.4)';rrect(5,9,w,h,20);c.fill();
    c.fillStyle='#10163a';rrect(0,0,w,h,20);c.fill();
    c.fillStyle=PC.sand;rrect(6,6,w-12,h-12,15);c.fill();
    c.save();rrect(6,6,w-12,h-12,15);c.clip();
    c.fillStyle='#e6e9f6';c.fillRect(6,6,w-12,34);
    c.fillStyle=PC.navy;c.font='700 12px '+F_U;c.textAlign='left';c.textBaseline='middle';c.fillText('My Card',18,24);
    c.fillStyle='#8a93b5';c.font='600 10px '+F_U;c.textBaseline='alphabetic';c.fillText('CURRENT BALANCE',18,66);
    c.fillStyle=o.balCol||PC.navy;c.font='400 '+(o.balSize||32)+'px '+F_T;c.fillText(o.bal||'$1,000',17,102);
    var bump=o.bump||0;
    c.fillStyle='#ffe3e6';rrect(16,118,w-32,52,10);c.fill();
    c.fillStyle='#8a93b5';c.font='600 10px '+F_U;c.fillText('MINIMUM DUE',26,138);
    c.fillStyle=PC.navy;c.font='400 22px '+F_T;c.fillText(o.min||'$30',26,162);
        c.textAlign='left';
    var pr=o.press||0,pulse=o.glow?1+Math.sin((o.t||0)*6)*.02:1,bw=w-32,bh=46,by=186;
    c.save();c.translate(16+bw/2,by+bh/2);c.scale((1-pr*.06)*pulse,(1-pr*.06)*pulse);
    c.fillStyle=pr>0?'#2f9fd0':PC.blue;rrect(-bw/2,-bh/2,bw,bh,23);c.fill();
    c.strokeStyle=PC.navy;c.lineWidth=2;c.stroke();
    c.fillStyle=PC.navy;c.font='400 15px '+F_T;c.textAlign='center';c.textBaseline='middle';c.fillText('Pay minimum',0,1);
    c.restore();
    c.fillStyle='#a3abc8';c.font='500 9px '+F_U;c.textAlign='center';c.textBaseline='alphabetic';c.fillText('Pay other amount',w/2,by+bh+22);
    c.restore();
    c.restore();
  }

  /* coin used in the money-flow story */
  function coin(x,y,r,label,fill,tt,o){
    o=o||{};
    c.save();c.translate(x,y);
    var sq=o.sq||1;c.scale(sq,1/sq);
    c.fillStyle='rgba(0,0,0,.2)';c.beginPath();c.ellipse(2,r+3,r*.8,r*.2,0,0,6.3);c.fill();
    c.fillStyle=fill;c.beginPath();c.arc(0,0,r,0,6.3);c.fill();
    c.lineWidth=2.5;c.strokeStyle=PC.navy;c.stroke();
    c.strokeStyle='rgba(255,255,255,.55)';c.lineWidth=1.5;c.beginPath();c.arc(0,0,r-5,3.6,5.3);c.stroke();
    if(label)tx(label,0,r*.28,r*.78,{fill:o.tcol||PC.paper,sw:.16,shadow:false});
    c.restore();
  }
  function wallet(x,y,s){
    c.save();c.translate(x,y);c.scale(s,s);
    c.fillStyle='rgba(0,0,0,.2)';rrect(-27,-14,60,48,8);c.fill();
    c.fillStyle='#8b5a3c';rrect(-30,-20,60,44,8);c.fill();c.strokeStyle=PC.navy;c.lineWidth=2.4;c.stroke();
    c.fillStyle='#a46c48';rrect(-30,-20,60,16,8);c.fill();c.stroke();
    c.fillStyle=PC.gold;c.beginPath();c.arc(18,6,5,0,6.3);c.fill();c.stroke();
    c.restore();
  }
  /* the lender: a plain tower, generic sign, no brand */
  function tower(x,y,w,h,t,hungry){
    c.save();c.translate(x,y);
    c.fillStyle='rgba(0,0,0,.2)';c.fillRect(6,6,w,h);
    c.fillStyle=PC.teal;c.fillRect(0,0,w,h);c.strokeStyle=PC.navy;c.lineWidth=2.6;c.strokeRect(0,0,w,h);
    c.fillStyle='#256068';c.fillRect(0,0,w,h*.12);c.strokeRect(0,0,w,h*.12);
    for(var r=0;r<4;r++)for(var k=0;k<3;k++){
      var lit=((r*3+k+Math.floor(t*2))%5)!==0;
      c.fillStyle=lit?'#ffd479':'#1b4b52';c.fillRect(8+k*(w-16)/3,h*.2+r*h*.16,(w-16)/3-6,h*.16-8);
    }
    var dw=w*.36,dh=h*.2;c.fillStyle=PC.navy;c.fillRect(w/2-dw/2,h-dh,dw,dh);
    c.fillStyle=PC.paper;c.font='400 9px '+F_T;c.textAlign='center';c.textBaseline='middle';c.fillText('LENDER',w/2,h*.06);
    c.restore();
    if(hungry){ /* coin slot glow */
      c.save();c.globalAlpha=.4+.3*Math.sin(t*8);c.fillStyle=PC.gold;c.beginPath();c.arc(x+w/2,y+h-4,16,0,6.3);c.fill();c.restore();
    }
  }
  /* follow-the-money arrow: same shape and color every time so viewers learn to spot it */
  function arrowFlow(pts,p,t,col,w){
    var n=pts.length,lens=[],tot=0,i;
    for(i=1;i<n;i++){var l=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);lens.push(l);tot+=l;}
    var goal=tot*clamp(p,0,1);
    if(goal<2)return null;
    var path=[],acc=0,last=pts[0];path.push(pts[0]);
    for(i=1;i<n;i++){
      var seg=lens[i-1];
      if(acc+seg<=goal){path.push(pts[i]);last=pts[i];acc+=seg;}
      else{var u=(goal-acc)/seg;last=[pts[i-1][0]+(pts[i][0]-pts[i-1][0])*u,pts[i-1][1]+(pts[i][1]-pts[i-1][1])*u];path.push(last);break;}
    }
    function stroke(){c.beginPath();c.moveTo(path[0][0],path[0][1]);for(var k=1;k<path.length;k++)c.lineTo(path[k][0],path[k][1]);c.stroke();}
    c.save();c.lineCap='round';c.lineJoin='round';
    c.strokeStyle=PC.navy;c.lineWidth=w+5;stroke();
    c.strokeStyle=col;c.lineWidth=w;stroke();
    c.strokeStyle='rgba(255,255,255,.7)';c.lineWidth=w*.35;c.setLineDash([6,12]);c.lineDashOffset=-t*46;stroke();c.setLineDash([]);
    var a=path[path.length-2],b=path[path.length-1],ang=Math.atan2(b[1]-a[1],b[0]-a[0]);
    c.translate(b[0],b[1]);c.rotate(ang);
    c.fillStyle=col;c.strokeStyle=PC.navy;c.lineWidth=2.6;
    c.beginPath();c.moveTo(w*1.7,0);c.lineTo(-w*.6,-w*1.3);c.lineTo(-w*.6,w*1.3);c.closePath();c.fill();c.stroke();
    c.restore();
    return last;
  }

  /* game UI bar */
  function hpBar(x,y,w,h,frac,col,label,val,o){
    o=o||{};
    c.save();
    c.font='700 11px '+F_U;c.textBaseline='alphabetic';
    c.fillStyle=o.lab||PC.navy;c.textAlign='left';c.fillText(label,x,y-6);
    if(val!=null){c.textAlign='right';c.fillText(val,x+w,y-6);}
    c.fillStyle=o.track||'rgba(28,37,80,.28)';rrect(x,y,w,h,h/2);c.fill();
    var fw=w*clamp(frac,0,1);
    if(fw>1){
      c.save();rrect(x,y,w,h,h/2);c.clip();
      c.fillStyle=col;c.fillRect(x,y,fw,h);
      c.fillStyle='rgba(255,255,255,.35)';c.fillRect(x,y+h*.14,fw,h*.26);
      c.restore();
    }
    c.strokeStyle=o.line||PC.navy;c.lineWidth=2.4;rrect(x,y,w,h,h/2);c.stroke();
    c.restore();
  }

  /* treadmill: belt scrolls left under a character walking right */
  function treadmill(x,y,w,t,speed){
    c.save();c.translate(x,y);
    c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.ellipse(w/2,30,w*.55,6,0,0,6.3);c.fill();
    c.fillStyle='#2b2f4e';rrect(0,0,w,16,8);c.fill();c.strokeStyle=PC.navy;c.lineWidth=2.4;c.stroke();
    c.save();rrect(0,0,w,16,8);c.clip();c.strokeStyle='#4a507c';c.lineWidth=2;
    for(var k=-2;k<w/14+2;k++){var px=((k*14-(t*speed)%14)+14)%(w+14)-7;c.beginPath();c.moveTo(px,2);c.lineTo(px-4,14);c.stroke();}
    c.restore();
    c.fillStyle='#1d213f';c.fillRect(8,16,10,14);c.fillRect(w-18,16,10,14);
    /* console arm on the right */
    c.strokeStyle=PC.navy;c.lineWidth=5;c.lineCap='round';c.beginPath();c.moveTo(w-8,4);c.lineTo(w-8,-86);c.stroke();
    c.strokeStyle='#8b93c0';c.lineWidth=2.6;c.beginPath();c.moveTo(w-8,4);c.lineTo(w-8,-86);c.stroke();
    c.fillStyle='#10163a';rrect(w-34,-120,52,38,6);c.fill();c.strokeStyle=PC.navy;c.lineWidth=2;c.stroke();
    c.fillStyle='#4cd68a';c.font='400 11px '+F_T;c.textAlign='center';c.textBaseline='middle';c.fillText('0.0 mi',w-8,-101);
    c.restore();
  }
  function stairs(x0,y0,n,sw,sh,tt,col){
    for(var i=0;i<n;i++){
      var li=tt-i*.11;if(li<=0)continue;
      var ft=clamp(li/.35,0,1),e=1+2.70158*Math.pow(ft-1,3)+1.70158*Math.pow(ft-1,2),hh=sh*(i+1)*e,xx=x0+i*sw;
      c.fillStyle=i%2?'#7edab0':'#5bcf9a';c.fillRect(xx,y0-hh,sw+1,hh);
      c.fillStyle='rgba(255,255,255,.5)';c.fillRect(xx,y0-hh,sw+1,3);
      c.strokeStyle=PC.navy;c.lineWidth=2.2;c.strokeRect(xx,y0-hh,sw+1,hh);
    }
  }
  function chest(x,y,s,open,t){
    c.save();c.translate(x,y);c.scale(s,s);
    if(open>0){
      var g=c.createRadialGradient(0,-20,2,0,-20,70);g.addColorStop(0,'rgba(255,230,140,.95)');g.addColorStop(1,'rgba(255,230,140,0)');
      c.globalAlpha=open;c.fillStyle=g;c.fillRect(-80,-100,160,140);c.globalAlpha=1;
    }
    c.fillStyle='#9a6038';rrect(-26,-22,52,26,4);c.fill();c.strokeStyle=PC.navy;c.lineWidth=2.4;c.stroke();
    c.fillStyle=PC.gold;c.fillRect(-26,-12,52,5);c.strokeRect(-26,-12,52,5);
    if(open>0.2){for(var k=0;k<5;k++){c.fillStyle=PC.gold;c.beginPath();c.arc(-16+k*8,-24-Math.sin(t*6+k)*2,5,0,6.3);c.fill();c.stroke();}}
    c.save();c.translate(-26,-22);c.rotate(-open*1.9);
    c.fillStyle='#b97a48';c.beginPath();c.moveTo(0,0);c.lineTo(52,0);c.lineTo(52,-14);c.quadraticCurveTo(26,-30,0,-14);c.closePath();c.fill();c.stroke();
    c.restore();
    c.restore();
  }
  function brandMark(x,y,s,col){c.save();c.fillStyle=col||PC.coral;star4(x,y,s,0);c.fill();c.restore();}

  /* ---- Snares: each trap is a small, sly creature that stands for one MECHANISM, never a company ---- */
  var GR={body:'#c04fd0',shade:'#8e33a3',belly:'#f3c9f6',ear:'#ff9bb5'};
  function gremlin(x,y,s,t,o){
    o=o||{};
    var mood=o.mood||'smug',ph=o.ph||0,bob=Math.sin(t*5+ph)*1.5,gulp=o.gulp||0,sh=o.shrink==null?1:o.shrink,face=o.face==null?1:o.face;
    c.save();c.translate(x,y);c.scale(s*sh*face,s*sh);
    c.fillStyle='rgba(0,0,0,.22)';c.beginPath();c.ellipse(0,1,19,4,0,0,6.3);c.fill();
    c.translate(0,bob);c.scale(1+gulp*.1,1-gulp*.07);
    /* tail with an arrow tip: it points at your wallet */
    var tw=Math.sin(t*6+ph)*5;
    c.lineCap='round';c.strokeStyle=PC.navy;c.lineWidth=5.4;c.beginPath();c.moveTo(14,-6);c.quadraticCurveTo(32,-4+tw,31,-22);c.stroke();
    c.strokeStyle=GR.body;c.lineWidth=2.8;c.beginPath();c.moveTo(14,-6);c.quadraticCurveTo(32,-4+tw,31,-22);c.stroke();
    c.fillStyle=GR.shade;c.strokeStyle=PC.navy;c.lineWidth=2;c.beginPath();c.moveTo(31,-30);c.lineTo(27,-21);c.lineTo(35,-21);c.closePath();c.fill();c.stroke();
    /* ears */
    [[-1,0],[1,0]].forEach(function(sd){
      var m=sd[0];c.save();c.scale(m,1);
      c.fillStyle=GR.body;c.strokeStyle=PC.navy;c.lineWidth=2.4;c.beginPath();c.moveTo(9,-33);c.lineTo(31,-54);c.lineTo(19,-25);c.closePath();c.fill();c.stroke();
      c.fillStyle=GR.ear;c.beginPath();c.moveTo(12,-32);c.lineTo(26,-47);c.lineTo(19,-29);c.closePath();c.fill();
      c.restore();
    });
    /* body */
    var bp=new Path2D('M-17 0 C-20 -20 -13 -37 0 -37 C13 -37 20 -20 17 0 C9 3 -9 3 -17 0 Z');
    c.fillStyle=GR.body;c.fill(bp);c.save();c.clip(bp);c.fillStyle=GR.shade;c.fillRect(6,-40,20,44);c.restore();
    c.strokeStyle=PC.navy;c.lineWidth=2.6;c.stroke(bp);
    c.fillStyle=GR.belly;c.beginPath();c.ellipse(0,-12,9.5,11,0,0,6.3);c.fill();
    /* feet */
    c.fillStyle=GR.shade;c.lineWidth=2.2;[-8,8].forEach(function(fx){c.beginPath();c.ellipse(fx,0,6,3.4,0,0,6.3);c.fill();c.stroke();});
    /* arms */
    c.strokeStyle=PC.navy;c.lineWidth=5.2;
    var wave=mood==='smug'?Math.sin(t*7+ph)*3:0;
    c.beginPath();c.moveTo(-16,-18);c.quadraticCurveTo(-24,-14,-25,-6+wave);c.stroke();
    c.beginPath();c.moveTo(16,-18);c.quadraticCurveTo(24,-14,25,-6-wave);c.stroke();
    c.strokeStyle=GR.body;c.lineWidth=2.8;
    c.beginPath();c.moveTo(-16,-18);c.quadraticCurveTo(-24,-14,-25,-6+wave);c.stroke();
    c.beginPath();c.moveTo(16,-18);c.quadraticCurveTo(24,-14,25,-6-wave);c.stroke();
    if(o.remote){c.fillStyle='#2b2f4e';c.strokeStyle=PC.navy;c.lineWidth=2;rrect(-31,-16,11,15,3);c.fill();c.stroke();c.fillStyle=PC.red;c.beginPath();c.arc(-25.5,-11,2.4,0,6.3);c.fill();}
    /* face */
    var ey=-25,blink=((t*.8+ph)%3.4)<.1?.25:1;
    c.lineJoin='round';
    function eye(ex){
      c.fillStyle=PC.paper;c.strokeStyle=PC.navy;c.lineWidth=2;c.beginPath();c.ellipse(ex,ey,5.6,6.6*blink,0,0,6.3);c.fill();c.stroke();
    }
    if(mood==='gulp'){
      c.strokeStyle=PC.navy;c.lineWidth=2.4;c.beginPath();c.arc(-7,ey+1,4,3.5,5.9);c.stroke();c.beginPath();c.arc(7,ey+1,4,3.5,5.9);c.stroke();
    }else if(mood==='dizzy'){
      c.strokeStyle=PC.navy;c.lineWidth=2.4;[-7,7].forEach(function(ex){c.beginPath();c.moveTo(ex-3.5,ey-3.5);c.lineTo(ex+3.5,ey+3.5);c.moveTo(ex+3.5,ey-3.5);c.lineTo(ex-3.5,ey+3.5);c.stroke();});
    }else{
      eye(-7);eye(7);
      c.fillStyle=PC.navy;
      if(mood==='scared'){[-7,7].forEach(function(ex){c.beginPath();c.arc(ex,ey,1.7,0,6.3);c.fill();});}
      else{[-7,7].forEach(function(ex){c.beginPath();c.arc(ex+1.4,ey+1.2,2.6,0,6.3);c.fill();});
        /* half lids: smug */
        c.fillStyle=GR.body;[-7,7].forEach(function(ex){c.save();c.beginPath();c.ellipse(ex,ey,5.6,6.6*blink,0,0,6.3);c.clip();c.fillRect(ex-7,ey-8,14,8.2);c.restore();});
        c.strokeStyle=PC.navy;c.lineWidth=2;c.beginPath();c.moveTo(-12.5,ey-.3);c.lineTo(-1.6,ey-.3);c.moveTo(1.6,ey-.3);c.lineTo(12.5,ey-.3);c.stroke();
      }
    }
    c.strokeStyle=PC.navy;c.lineWidth=2.2;c.beginPath();
    if(mood==='scared'){c.moveTo(-12,ey-9);c.lineTo(-3,ey-11);c.moveTo(12,ey-9);c.lineTo(3,ey-11);}
    else{c.moveTo(-12.5,ey-8);c.lineTo(-2.5,ey-5.5);c.moveTo(12.5,ey-8);c.lineTo(2.5,ey-5.5);}
    c.stroke();
    /* mouth */
    if(mood==='scared'){c.strokeStyle=PC.navy;c.lineWidth=2.2;c.beginPath();c.moveTo(-6,-12);c.quadraticCurveTo(-3,-15,0,-12);c.quadraticCurveTo(3,-9,6,-12);c.stroke();
      c.fillStyle='rgba(170,220,255,.95)';c.beginPath();c.moveTo(-18,-30);c.quadraticCurveTo(-21,-24,-18,-23);c.quadraticCurveTo(-15,-24,-18,-30);c.fill();}
    else if(mood==='dizzy'){c.strokeStyle=PC.navy;c.lineWidth=2.2;c.beginPath();c.arc(0,-11,4,3.4,6);c.stroke();}
    else{
      var mp=new Path2D('M-10 -14 C-5 -4 5 -4 10 -14 C4 -17 -4 -17 -10 -14 Z');
      c.fillStyle='#5a1430';c.fill(mp);c.strokeStyle=PC.navy;c.lineWidth=2.2;c.stroke(mp);
      c.fillStyle=PC.paper;c.beginPath();c.moveTo(-6.5,-15.5);c.lineTo(-3.5,-15);c.lineTo(-5,-10.8);c.closePath();c.fill();
      c.beginPath();c.moveTo(6.5,-15.5);c.lineTo(3.5,-15);c.lineTo(5,-10.8);c.closePath();c.fill();
      if(mood==='gulp'){c.fillStyle='rgba(255,120,150,.5)';c.beginPath();c.arc(-12,-16,3.4,0,6.3);c.arc(12,-16,3.4,0,6.3);c.fill();}
    }
    c.restore();
  }
  /* the coin sack a Snare hoards; bulges as coins arrive */
  function coinSack(x,y,s,fill,t){
    c.save();c.translate(x,y);c.scale(s*(1+fill*.18),s*(1+fill*.12));
    c.fillStyle='rgba(0,0,0,.2)';c.beginPath();c.ellipse(1,1,15,3.4,0,0,6.3);c.fill();
    var sp=new Path2D('M-12 0 C-18 -14 -8 -20 -4 -26 L4 -26 C8 -20 18 -14 12 0 Z');
    c.fillStyle='#9a6038';c.fill(sp);c.strokeStyle=PC.navy;c.lineWidth=2.4;c.stroke(sp);
    c.fillStyle='#c98f58';c.beginPath();c.ellipse(-4,-12,4,6,.3,0,6.3);c.fill();
    c.strokeStyle=PC.navy;c.lineWidth=2.2;c.beginPath();c.moveTo(-5,-25);c.lineTo(5,-25);c.stroke();
    c.fillStyle=PC.gold;c.beginPath();c.arc(0,-27,4,0,6.3);c.fill();c.stroke();
    tx('$',2,-7,15,{fill:PC.gold,stroke:PC.navy,sw:.2,shadow:false});
    c.restore();
  }
  /* the collectible Trap File card: sol = 0..1 SOLVED stamp progress */
  function trapCard(x,y,w,h,o,t){
    o=o||{};
    c.save();c.translate(x,y);
    c.fillStyle='rgba(0,0,0,.3)';rrect(4,7,w,h,14);c.fill();
    c.fillStyle=PC.paper;rrect(0,0,w,h,14);c.fill();c.strokeStyle=PC.navy;c.lineWidth=3;c.stroke();
    /* portrait window */
    var px=10,py=26,pw=w-20,ph=h*.50;
    c.save();rrect(px,py,pw,ph,9);c.clip();
    var g=c.createLinearGradient(0,py,0,py+ph);g.addColorStop(0,o.sky0||'#3a0d22');g.addColorStop(1,o.sky1||'#7a1d2f');c.fillStyle=g;c.fillRect(px,py,pw,ph);
    if(o.locked){tx('?',w/2,py+ph*.72,ph*.7,{fill:'rgba(255,255,255,.25)',sw:0,shadow:false});}
    else gremlin(w/2,py+ph-6,Math.min(pw,ph)/62,t||0,{mood:o.mood||'smug',remote:true});
    c.restore();
    c.strokeStyle=PC.navy;c.lineWidth=2.4;rrect(px,py,pw,ph,9);c.stroke();
    /* header */
    c.font='400 10px '+F_T;var pw2=c.measureText('TRAP '+o.n).width+16;
    c.fillStyle=PC.red;rrect(10,6,pw2,17,8.5);c.fill();
    c.fillStyle=PC.paper;c.textAlign='center';c.textBaseline='middle';c.fillText('TRAP '+o.n,10+pw2/2,15);
    if(!o.compact){c.fillStyle=PC.navy;c.textAlign='right';c.font='700 9px '+F_U;c.fillText(o.type||'',w-12,15);}
    c.textAlign='left';c.textBaseline='alphabetic';
    var ty=py+ph+22,nm=o.locked?'LOCKED':o.name,fs=17;
    c.font='400 '+fs+'px '+F_T;while(fs>9&&c.measureText(nm).width>w-24){fs-=.5;c.font='400 '+fs+'px '+F_T;}
    c.fillStyle=PC.navy;c.fillText(nm,12,ty);
    c.font='600 10px '+F_U;c.fillStyle=PC.ink;
    if(!o.locked&&!o.compact){c.fillText('MOVE   '+o.move,12,ty+17);c.fillStyle=PC.green;c.font='700 10px '+F_U;c.fillText('WEAKNESS   '+o.weak,12,ty+33);}
    c.restore();
    if(o.solT!=null&&o.solT>=0)stamp(x+w-52,y+26+h*.50-8,'SOLVED',null,o.solT,{w:84,h:28,rot:-.2,col:PC.green,size:15,bg:'rgba(253,246,236,.95)'});
  }
