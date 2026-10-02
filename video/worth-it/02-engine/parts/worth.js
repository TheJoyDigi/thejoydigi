/* worth: the Worth It visual system. Warm editorial, not cartoon: paper cream,
   ink, gold. Devices: Lens, Counter, Myth Strike, Move Card. Objects: coffee
   cup, price tag, knot resolving to a straight line. Every piece is a pure
   function of time on the shared canvas context `c`. Creature rigs live in
   rig-mei.js / infographics.js and are RETIRED (not deleted, not used here). */

  var WI={paper:'#F6EEDC',ink:'#1B2340',gold:'#F5B83D',teal:'#0E4D5C',red:'#E4574D',green:'#3FA97C',
          card:'#FFFDF7',goldSoft:'rgba(245,184,61,.15)',redWash:'rgba(228,87,77,.13)',tealDeep:'#003B49',coral:'#FF6B6B',sand:'#FDF6EC'};
  var F_SG='"Space Grotesk","Figtree",system-ui,sans-serif';

  /* paper background + one subtle paper-grain overlay (light speckle, very low alpha) */
  var wiGrainCv=null;
  function wiGrain(t){
    if(!wiGrainCv){
      wiGrainCv=document.createElement('canvas');wiGrainCv.width=wiGrainCv.height=128;
      var g=wiGrainCv.getContext('2d'),id=g.createImageData(128,128),r=rng(99),k;
      for(k=0;k<id.data.length;k+=4){
        var v=200+r()*55;
        id.data[k]=v;id.data[k+1]=v;id.data[k+2]=v;id.data[k+3]=r()*22;
      }
      g.putImageData(id,0,0);
    }
    var f=Math.floor(t*8),ox=(f*37)%128,oy=(f*61)%128,x,y;
    c.save();
    for(x=-ox;x<W;x+=128)for(y=-oy;y<H;y+=128)c.drawImage(wiGrainCv,x,y);
    c.restore();
  }
  function wiPaper(t){
    c.fillStyle=WI.paper;c.fillRect(0,0,W,H);
    wiGrain(t);
  }

  /* calm statement text: words land with weight (firm ease-out, short settle), never bounce */
  function wiTx(str,x,y,size,tt,o){
    if(tt<0)return;
    o=o||{};
    var fam=o.fam||F_SG,wt=o.wt||'700',stag=o.stag==null?.035:o.stag;
    c.save();
    c.font=wt+' '+size+'px '+fam;c.textBaseline='alphabetic';c.textAlign='left';c.lineJoin='round';
    var ws=[],tot=0,i;
    for(i=0;i<str.length;i++){ws[i]=c.measureText(str[i]).width;tot+=ws[i];}
    var cx=o.align==='left'?x:x-tot/2;
    for(i=0;i<str.length;i++){
      var li=tt-i*stag;
      if(str[i]!==' '&&li>0){
        var k=clamp(li/.3,0,1),e=1-Math.pow(1-k,3);
        var al=clamp(li/.12,0,1),dy=(1-e)*size*.32,sc=.94+.06*e;
        c.save();
        c.globalAlpha=(o.alpha==null?1:o.alpha)*al;
        c.translate(cx+ws[i]/2,y+dy);c.scale(sc,sc);
        if(o.sw){c.lineWidth=size*o.sw;c.strokeStyle=o.stroke||WI.ink;c.strokeText(str[i],0,0);}
        c.fillStyle=o.fill||WI.ink;c.fillText(str[i],0,0);
        c.restore();
      }
      cx+=ws[i];
    }
    c.restore();
  }
  /* stacked lines with per-line stagger */
  function wiLines(lines,x,y0,lh,size,tt,o){
    o=o||{};
    var i;
    for(i=0;i<lines.length;i++)wiTx(lines[i],x,y0+i*lh,size,tt-i*(o.gap==null?.3:o.gap),o);
  }

  /* ---------- 1. THE LENS: gold ring sweeps in, settles, reveals the value inside ---------- */
  function wiLens(x,y,r,tt,o){
    o=o||{};
    if(o.draw)o.draw();
    var k=sm(clamp(tt/.6,0,1)),al=clamp(tt/.15,0,1),rad=r*(1.7-.7*k);
    if(al>0){
      c.save();c.globalAlpha=al;
      c.fillStyle=WI.goldSoft;c.beginPath();c.arc(x,y,rad,0,6.3);c.fill();
      c.strokeStyle=WI.gold;c.lineWidth=5;c.beginPath();c.arc(x,y,rad,0,6.3);c.stroke();
      c.strokeStyle='rgba(245,184,61,.4)';c.lineWidth=1.6;c.beginPath();c.arc(x,y,rad+8,0,6.3);c.stroke();
      c.restore();
    }
    var lines=o.lines||[],lt=tt-.6,i;
    c.save();
    c.font='600 13.5px '+F_U;c.textBaseline='alphabetic';
    for(i=0;i<lines.length;i++){
      var ltt=lt-i*.32;
      if(ltt>0){
        var la=clamp(ltt/.3,0,1),ly=y+r+36+i*23,rise=(1-sm(clamp(ltt/.3,0,1)))*6;
        var tw=c.measureText(lines[i]).width,lx=x-tw/2;
        c.save();c.globalAlpha=la;
        c.fillStyle=WI.gold;c.beginPath();c.arc(lx-11,ly-4.5+rise,3.6,0,6.3);c.fill();
        c.fillStyle=WI.ink;c.textAlign='left';c.fillText(lines[i],lx,ly+rise);
        c.restore();
      }
    }
    c.restore();
  }

  /* ---------- 2. THE COUNTER: teal line; buy side below, create side above; the question crosses it ---------- */
  function wiCounter(y,tt,o){
    o=o||{};
    var k=sm(clamp(tt/.35,0,1));
    if(k>0){
      c.save();
      c.strokeStyle=WI.teal;c.lineWidth=3;c.lineCap='round';
      var hw=150*k;
      c.beginPath();c.moveTo(180-hw,y);c.lineTo(180+hw,y);c.stroke();
      c.globalAlpha=k;
      c.font='700 11px '+F_U;c.textAlign='center';c.textBaseline='alphabetic';
      c.fillStyle=WI.ink;c.fillText('BUY SIDE',180,y+24);
      c.fillStyle=WI.green;c.fillText('CREATE SIDE',180,y-14);
      c.restore();
    }
    var q=o.question||[],qt=clamp((tt-.35)/.6,0,1);
    if(qt>0&&q.length){
      var e=qt<.5?2*qt*qt:1-Math.pow(-2*qt+2,2)/2,qy=y+66-e*150,i;
      for(i=0;i<q.length;i++)wiTx(q[i],180,qy+i*30,21,qt*2.2-i*.35,{fam:F_H,wt:'700',fill:WI.ink});
    }
  }

  /* ---------- 3. THE MYTH STRIKE: myth slams in on a red wash, one line crosses it out ---------- */
  function wiMythStrike(lines,x,y,size,tt,o){
    o=o||{};
    var lh=size*1.32,n=lines.length,y0=y-(n-1)*lh/2,w=o.w||300,i;
    var wk=sm(clamp(tt/.4,0,1));
    if(wk>0){
      c.save();c.globalAlpha=wk;
      c.fillStyle=WI.redWash;
      rrect(x-w/2,y0-size*1.02,w,n*lh+size*.42,10);c.fill();
      c.restore();
    }
    for(i=0;i<n;i++)wiTx(lines[i],x,y0+i*lh,size,tt-i*.26,{fill:o.fill||WI.ink,stag:o.stag});
    var st=clamp((tt-.6)/.5,0,1);
    if(st>0){
      var sy=y+size*.1,x1=x-w/2,x2=x1+w*st,segs=16;
      c.save();
      c.strokeStyle=WI.red;c.lineWidth=Math.max(3,size*.085);c.lineCap='round';
      c.beginPath();
      for(var k2=0;k2<=segs;k2++){
        var u=k2/segs,px=x1+(x2-x1)*u,py=sy+Math.sin(u*7+1.3)*2;
        if(k2===0)c.moveTo(px,py);else c.lineTo(px,py);
      }
      c.stroke();c.restore();
    }
  }

  /* ---------- 4. THE MOVE CARD: cream card, ink border, gold DO THIS tab, Worth it. stamp ---------- */
  function wiMoveCard(lines,tt,o){
    o=o||{};
    var cx=o.x||180,cy=o.y||300,w=o.w||284,lh=30,padT=46,padB=32;
    var h=padT+lines.length*lh+padB;
    var k=sm(clamp(tt/.45,0,1)),al=clamp(tt/.2,0,1),i;
    c.save();
    c.translate(cx,cy);c.scale(Math.max(k,.001),Math.max(k,.001));c.globalAlpha=al;
    c.fillStyle='rgba(27,36,64,.13)';rrect(-w/2+4,-h/2+7,w,h,14);c.fill();
    c.fillStyle=WI.card;rrect(-w/2,-h/2,w,h,14);c.fill();
    c.strokeStyle=WI.ink;c.lineWidth=3;rrect(-w/2,-h/2,w,h,14);c.stroke();
    c.restore();
    if(k<=0)return;
    c.save();c.globalAlpha=al;
    c.translate(cx-w/2+20,cy-h/2);
    c.fillStyle=WI.gold;rrect(-43,-13,86,26,8);c.fill();
    c.strokeStyle=WI.ink;c.lineWidth=2;rrect(-43,-13,86,26,8);c.stroke();
    c.fillStyle=WI.ink;c.font='700 12px '+F_U;c.textAlign='center';c.textBaseline='middle';
    c.fillText('DO THIS',0,1);
    c.restore();
    var y0=cy-h/2+padT+10;
    for(i=0;i<lines.length;i++)wiTx(lines[i],cx,y0+i*lh,19,tt-.45-i*.28,{fill:WI.ink});
    var st=clamp((tt-1.15)/.4,0,1);
    if(st>0){
      var sk=sm(st),sc=1+(1-sk)*(1-sk)*1.6;
      c.save();
      c.translate(cx+(o.stampX==null?64:o.stampX),cy+h/2+(o.stampY==null?-32:o.stampY));c.rotate(-.14);c.scale(sc,sc);c.globalAlpha=clamp(st/.15,0,1);
      c.strokeStyle=WI.ink;c.lineWidth=3;rrect(-62,-19,124,38,8);c.stroke();
      c.lineWidth=1.2;rrect(-56,-13,112,26,5);c.stroke();
      c.fillStyle=WI.ink;c.font='700 21px '+F_SG;c.textAlign='center';c.textBaseline='middle';
      c.fillText('Worth it.',0,1);
      c.restore();
    }
  }

  /* ---------- everyday objects: flat, ink-outlined, paper-textured. No faces, no mascots ---------- */
  function wiCoffeeCup(x,y,s,t){
    c.save();c.translate(x,y);c.scale(s,s);
    c.lineWidth=3;c.strokeStyle=WI.ink;c.lineJoin='round';c.lineCap='round';
    c.beginPath();c.ellipse(0,34,44,8,0,0,6.3);c.stroke();
    c.fillStyle=WI.card;
    c.beginPath();c.moveTo(-30,-28);c.lineTo(30,-28);c.lineTo(22,28);c.lineTo(-22,28);c.closePath();c.fill();c.stroke();
    c.fillStyle=WI.gold;
    c.beginPath();c.moveTo(-27.4,-8);c.lineTo(27.4,-8);c.lineTo(25,8);c.lineTo(-25,8);c.closePath();c.fill();c.stroke();
    c.beginPath();c.arc(35,0,13,-1.2,1.2);c.stroke();
    c.strokeStyle='rgba(27,36,64,.45)';c.lineWidth=2.4;
    for(var k=0;k<2;k++){
      var sx=-10+k*20,ph=(t||0)*1.4+k*2;
      c.beginPath();
      for(var i=0;i<=12;i++){
        var u=i/12,px=sx+Math.sin(u*5+ph)*5,py=-36-u*22;
        if(i===0)c.moveTo(px,py);else c.lineTo(px,py);
      }
      c.stroke();
    }
    c.restore();
  }
  function wiPriceTag(x,y,s,label){
    c.save();c.translate(x,y);c.scale(s,s);c.rotate(-.12);
    c.lineWidth=3;c.strokeStyle=WI.ink;c.lineJoin='round';c.lineCap='round';
    c.beginPath();c.moveTo(0,-66);c.quadraticCurveTo(7,-50,0,-38);c.stroke();
    c.fillStyle=WI.gold;
    c.beginPath();
    c.moveTo(-34,-36);c.lineTo(10,-36);c.lineTo(34,-12);c.lineTo(34,36);c.lineTo(-34,36);c.closePath();
    c.fill();c.stroke();
    c.fillStyle=WI.paper;
    c.beginPath();c.arc(-22,-22,6,0,6.3);c.fill();c.stroke();
    if(label){
      c.fillStyle=WI.ink;c.font='700 20px '+F_SG;c.textAlign='center';c.textBaseline='middle';
      c.fillText(label,2,9);
    }
    c.restore();
  }
  /* tangled knot that resolves into a straight line as tt goes 0 -> 1 */
  function wiKnot(x,y,s,tt){
    var p=sm(clamp(tt,0,1)),N=60,amp=34*(1-p);
    c.save();c.translate(x,y);c.scale(s,s);
    c.lineWidth=4;c.strokeStyle=WI.ink;c.lineCap='round';
    c.beginPath();
    for(var i=0;i<=N;i++){
      var u=i/N,px=(u-.5)*150;
      var py=Math.sin(u*9.4)*amp*.6+Math.sin(u*23.7+1.7)*amp*.4;
      if(p<.7)py+=Math.sin(u*47+4)*amp*.3*(1-p/.7);
      if(i===0)c.moveTo(px,py);else c.lineTo(px,py);
    }
    c.stroke();
    if(p<1){
      c.save();c.globalAlpha=(1-p)*.7;c.fillStyle=WI.ink;
      for(var k=0;k<3;k++){
        c.beginPath();c.arc((rr(k,11)-.5)*110*(1-p),(rr(k,23)-.5)*56*(1-p),4,0,6.3);c.fill();
      }
      c.restore();
    }
    c.restore();
  }

  /* ---------- brand slate (end card) ---------- */
  function wiBrandSlate(t,tt){
    var k=sm(clamp(tt/.5,0,1));
    if(k<=0)return;
    c.save();c.globalAlpha=k;
    c.fillStyle=WI.tealDeep;c.fillRect(0,0,W,H);
    c.fillStyle=WI.coral;star4(180,232,24,0);c.fill();
    c.fillStyle=WI.sand;c.font='700 30px "Fraunces",Georgia,serif';
    c.textAlign='center';c.textBaseline='alphabetic';
    c.fillText('The Joy Digi',180,298);
    c.font='500 10px "DM Sans",sans-serif';
    c.fillText('Worth It is a production of The Joy Digi',180,326);
    c.restore();
  }
  /* cover-only lockup: series name for the uploaded cover image; never drawn into the video */
  function wiCoverLockup(){
    c.save();
    c.fillStyle='rgba(27,36,64,.55)';rrect(34,86,150,36,10);c.fill();
    c.fillStyle=WI.coral;star4(49,98,5.5,0);c.fill();
    c.fillStyle=WI.paper;c.font='700 13px '+F_SG;c.textAlign='left';c.textBaseline='alphabetic';
    c.fillText('WORTH IT',60,103);
    c.restore();
  }
