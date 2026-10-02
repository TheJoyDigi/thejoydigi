/* game: the gaming-style kit for Worth It v2. Dark arcade world, neon HUD, boss fights, scans, dialogue boxes, quests, level-ups.
   Every piece is a pure function of time on the shared canvas context `c`. Semantics: red = the myth, gold = value, green = the way forward, cyan = interface. */

  var G={bg:'#0A0F2C',bg2:'#1A1450',panel:'#10163F',panel2:'#18215C',cyan:'#2FE3D0',gold:'#FFC83D',red:'#FF4D5E',green:'#4DFFA0',violet:'#7B5CFF',white:'#F4F7FF',ink:'#05081F',mute:'#8F9BD6'};
  var F_RU='"Russo One",Impact,system-ui,sans-serif';
  var F_HD='"Rajdhani",system-ui,sans-serif';
  var F_SX='"Bangers","Russo One",Impact,sans-serif';

  function gGlow(col,blur,fn){c.save();c.shadowColor=col;c.shadowBlur=blur;fn();c.restore();}
  function gChamfer(x,y,w,h,cut){
    var p=new Path2D();p.moveTo(x+cut,y);p.lineTo(x+w,y);p.lineTo(x+w,y+h-cut);p.lineTo(x+w-cut,y+h);p.lineTo(x,y+h);p.lineTo(x,y+cut);p.closePath();return p;
  }
  function gPanel(x,y,w,h,col,al){
    var p=gChamfer(x,y,w,h,10);
    c.save();c.globalAlpha=al==null?1:al;
    var g=c.createLinearGradient(0,y,0,y+h);g.addColorStop(0,G.panel2);g.addColorStop(1,G.panel);
    c.fillStyle=g;c.fill(p);
    c.restore();
    gGlow(col,10,function(){c.strokeStyle=col;c.lineWidth=2;c.stroke(p);});
    c.strokeStyle='rgba(255,255,255,.12)';c.lineWidth=1;c.beginPath();c.moveTo(x+12,y+4);c.lineTo(x+w-6,y+4);c.stroke();
  }
  function gTx(str,x,y,size,tt,o){
    o=o||{};
    c.save();
    if(o.glow){c.shadowColor=o.glow;c.shadowBlur=o.blur||12;}
    wiTx(str,x,y,size,tt,{fam:o.fam||F_RU,wt:o.wt||'400',fill:o.fill||G.white,sw:o.sw==null?.16:o.sw,stroke:o.stroke||G.ink,stag:o.stag,align:o.align,alpha:o.alpha});
    c.restore();
  }
  function gLabel(str,x,y,size,col,align,al){c.save();c.globalAlpha=al==null?1:al;c.fillStyle=col||G.white;c.font='700 '+size+'px '+F_HD;c.textAlign=align||'left';c.textBaseline='alphabetic';c.fillText(str,x,y);c.restore();}

  /* arcade world: gradient, scrolling grid, rising sparks, soft tint pulse, vignette, scanlines */
  function gBg(t,o){
    o=o||{};
    var g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,G.bg);g.addColorStop(1,o.low||G.bg2);c.fillStyle=g;c.fillRect(0,0,W,H);
    var tint=o.tint||G.violet,pulse=.14+.06*Math.sin(t*2.4);
    var rg=c.createRadialGradient(180,300,20,180,300,360);rg.addColorStop(0,tint);rg.addColorStop(1,'rgba(0,0,0,0)');
    c.save();c.globalAlpha=pulse;c.fillStyle=rg;c.fillRect(0,0,W,H);c.restore();
    c.save();c.strokeStyle='rgba(47,227,208,.09)';c.lineWidth=1;
    var k,off=(t*10)%30;
    for(k=0;k<=W;k+=30){c.beginPath();c.moveTo(k,0);c.lineTo(k,H);c.stroke();}
    for(k=-30;k<=H;k+=30){c.beginPath();c.moveTo(0,k+off);c.lineTo(W,k+off);c.stroke();}
    c.restore();
    if(o.pos!=null)gWorld(t,o.pos,o);
    c.save();
    for(k=0;k<26;k++){
      var sx=aRand(k*3.1)*W,sp=8+aRand(k*7.7)*22,sy=H-((t*sp+aRand(k*5.3)*H)%H),sz=.8+aRand(k*2.3)*1.8;
      c.globalAlpha=.25+.35*aRand(k*9.1);c.fillStyle=k%3===0?G.gold:G.cyan;c.fillRect(sx,sy,sz,sz);
    }
    c.restore();
    var vg=c.createRadialGradient(180,320,180,180,320,420);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,12,.55)');c.fillStyle=vg;c.fillRect(0,0,W,H);
  }
  function gScanlines(){c.save();c.fillStyle='rgba(0,0,0,.10)';for(var y=0;y<H;y+=3)c.fillRect(0,y,W,1);c.restore();}

  /* top HUD: level chip + XP bar that fills over the episode */
  function gHud(t,xp,lv,label){
    c.save();
    c.fillStyle=G.ink;c.fill(gChamfer(40,94,44,18,5));
    gGlow(G.cyan,6,function(){c.strokeStyle=G.cyan;c.lineWidth=1.5;c.stroke(gChamfer(40,94,44,18,5));});
    gLabel('LV '+('0'+lv).slice(-2),62,107,12,G.cyan,'center');
    c.fillStyle='rgba(255,255,255,.12)';rrect(92,98,128,9,4.5);c.fill();
    var w=128*clamp(xp,0,1);
    if(w>1){var g=c.createLinearGradient(92,0,220,0);g.addColorStop(0,G.cyan);g.addColorStop(1,G.gold);c.fillStyle=g;rrect(92,98,w,9,4.5);c.fill();}
    gLabel('XP',226,107,10,G.mute);
    gLabel(label||'WORTH IT',320,107,10,G.mute,'right');
    c.restore();
  }

  /* floating number / word that pops, rises and fades */
  function gDamage(x,y,txt,tt,col,size){
    if(tt<0||tt>1.4)return;
    var u=clamp(tt/.18,0,1),sc=.5+.7*u-.2*sm(clamp((tt-.18)/.2,0,1)),rise=tt*26,al=1-sm(clamp((tt-.9)/.5,0,1));
    c.save();c.translate(x,y-rise);c.scale(sc,sc);c.globalAlpha=al;
    c.shadowColor=col||G.gold;c.shadowBlur=14;c.font='400 '+(size||24)+'px '+F_RU;c.textAlign='center';c.textBaseline='middle';
    c.lineWidth=5;c.strokeStyle=G.ink;c.lineJoin='round';c.strokeText(txt,0,0);c.fillStyle=col||G.gold;c.fillText(txt,0,0);
    c.restore();
  }

  /* hit: white flash, burst lines, shock rings, slash. u = 0..1 over ~0.35 s. Uses the scene under it */
  function gImpact(u,o){
    o=o||{};if(u<=0||u>=1)return;
    var cx=o.x||180,cy=o.y||200,k;
    c.save();
    if(u<.2){c.fillStyle='rgba(255,255,255,'+(1-u/.2)*.85+')';c.fillRect(0,0,W,H);}
    var al=1-sm(u);
    for(k=0;k<30;k++){
      var a=k/30*Math.PI*2+aRand(k)*.1,w=.035+.05*aRand(k*3),r0=18+u*60,r1=r0+120+260*aRand(k*5);
      c.fillStyle=k%2?'rgba(47,227,208,'+al*.8+')':'rgba(123,92,255,'+al*.8+')';
      c.beginPath();c.moveTo(cx+Math.cos(a-w)*r1,cy+Math.sin(a-w)*r1);c.lineTo(cx+Math.cos(a+w)*r1,cy+Math.sin(a+w)*r1);c.lineTo(cx+Math.cos(a)*r0,cy+Math.sin(a)*r0);c.closePath();c.fill();
    }
    var rr=30+u*220;
    c.lineWidth=5*(1-u)+1;c.strokeStyle='rgba(255,77,94,'+al+')';c.beginPath();c.arc(cx-4,cy,rr,0,6.3);c.stroke();
    c.strokeStyle='rgba(47,227,208,'+al+')';c.beginPath();c.arc(cx+4,cy,rr,0,6.3);c.stroke();
    var sp=clamp(u*3,0,1);
    gGlow(G.red,16,function(){c.strokeStyle='#fff';c.lineWidth=6*(1-u)+1;c.lineCap='round';c.beginPath();c.moveTo(cx-190,cy-70);c.lineTo(cx-190+380*sp,cy-70+140*sp);c.stroke();});
    c.restore();
  }

  /* BOSS: the myth appears as a boss with an HP bar; one critical hit breaks it. tt = local time, hit = time of the hit */
  function gBoss(tt,lines,o){
    o=o||{};var hit=o.hit==null?.95:o.hit,x=40,y=170,w=280,h=104;
    var pre=clamp(tt/.35,0,1),k=sm(pre);
    if(k<=0)return;
    c.save();c.globalAlpha=k;
    /* alert tab with hazard stripes */
    var tab=gChamfer(x,y-26,w,22,6);
    c.fillStyle=G.red;c.fill(tab);
    c.save();c.clip(tab);c.fillStyle='rgba(0,0,0,.28)';
    for(var s=-20;s<w+20;s+=16){c.beginPath();c.moveTo(x+s,y-4);c.lineTo(x+s+8,y-4);c.lineTo(x+s+22,y-26);c.lineTo(x+s+14,y-26);c.closePath();c.fill();}
    c.restore();
    c.fillStyle=G.ink;c.font='400 13px '+F_RU;c.textAlign='center';c.textBaseline='middle';
    var broken=tt>hit+.2;
    c.fillText(broken?'MYTH BROKEN':'!! MYTH APPEARED !!',x+w/2,y-15);
    gPanel(x,y,w,h,broken?G.mute:G.red);
    c.restore();
    var i,lh=27,y0=y+h/2-(lines.length-1)*lh/2+4;
    for(i=0;i<lines.length;i++)gTx(lines[i],x+w/2,y0+i*lh,23,tt-.15-i*.12,{stag:.015,fill:broken?'#C5CBEA':G.white,glow:broken?null:G.red,blur:8});
    /* HP bar */
    var hp=1-sm(clamp((tt-hit)/.35,0,1));
    gLabel('MYTH HP',x,y+h+16,11,G.red);
    c.fillStyle='rgba(255,255,255,.12)';rrect(x+56,y+h+8,w-56,9,4.5);c.fill();
    if(hp>.005){gGlow(G.red,8,function(){var g=c.createLinearGradient(x+56,0,x+w,0);g.addColorStop(0,'#FF2E49');g.addColorStop(1,'#FF8A5E');c.fillStyle=g;rrect(x+56,y+h+8,(w-56)*hp,9,4.5);c.fill();});}
    /* slash through the text + cracks */
    var st=clamp((tt-hit)/.25,0,1);
    if(st>0){
      gGlow('#fff',10,function(){c.strokeStyle='#fff';c.lineWidth=3;c.lineCap='round';c.beginPath();c.moveTo(x-6,y+h*.15);c.lineTo(x-6+(w+12)*st,y+h*.15+h*.7*st);c.stroke();});
      if(st>=1){c.strokeStyle=G.red;c.lineWidth=2.5;c.beginPath();c.moveTo(x+8,y+h*.5+3);c.lineTo(x+w-8,y+h*.5+3);c.stroke();}
    }
  }

  /* IDENTIFY: a scan reticle over an item, then its hidden stats read out as bars */
  function gScan(x,y,r,tt,o){
    o=o||{};
    var ap=sm(clamp(tt/.5,0,1));
    /* pedestal */
    c.save();c.globalAlpha=.5*ap;var pg=c.createRadialGradient(x,y+r*.95,2,x,y+r*.95,r);pg.addColorStop(0,G.cyan);pg.addColorStop(1,'rgba(47,227,208,0)');c.fillStyle=pg;c.beginPath();c.ellipse(x,y+r*.95,r,r*.22,0,0,6.3);c.fill();c.restore();
    if(o.draw)o.draw();
    if(ap<=0)return;
    c.save();c.translate(x,y);c.globalAlpha=ap;
    var rr=r*(1.35-.35*ap);
    gGlow(G.cyan,10,function(){
      c.strokeStyle=G.cyan;c.lineWidth=2;c.setLineDash([10,7]);c.lineDashOffset=-tt*40;c.beginPath();c.arc(0,0,rr,0,6.3);c.stroke();c.setLineDash([]);
      c.lineWidth=3;var q,b=rr+10,L=14;
      for(q=0;q<4;q++){c.save();c.rotate(q*Math.PI/2);c.beginPath();c.moveTo(-b,-b+L);c.lineTo(-b,-b);c.lineTo(-b+L,-b);c.stroke();c.restore();}
    });
    /* scan beam sweeps once */
    var sw=clamp((tt-.5)/.9,0,1);
    if(sw>0&&sw<1){c.save();c.beginPath();c.arc(0,0,rr,0,6.3);c.clip();var by=-rr+2*rr*sw;gGlow(G.cyan,12,function(){c.strokeStyle='rgba(47,227,208,.9)';c.lineWidth=2;c.beginPath();c.moveTo(-rr,by);c.lineTo(rr,by);c.stroke();});
      var bg=c.createLinearGradient(0,by-24,0,by);bg.addColorStop(0,'rgba(47,227,208,0)');bg.addColorStop(1,'rgba(47,227,208,.28)');c.fillStyle=bg;c.fillRect(-rr,by-24,rr*2,24);c.restore();}
    c.restore();
    gLabel(tt<1.4?'IDENTIFYING...':'IDENTIFIED',x,y-rr-16,12,G.cyan,'center',ap);
  }
  /* stat rows with gold bars; rows = [[label,pct,'+tag'],...]; ends with a VALUE FOUND badge */
  function gStats(x,y,w,tt,rows){
    var rh=26,h=rows.length*rh+16,i;
    var k=sm(clamp(tt/.3,0,1));if(k<=0)return;
    c.save();c.globalAlpha=k;gPanel(x,y,w,h,G.gold,.95);c.restore();
    for(i=0;i<rows.length;i++){
      var lt=tt-.35-i*.55,pr=sm(clamp(lt/.5,0,1));if(lt<0)continue;
      var ry=y+14+i*rh;
      c.fillStyle=G.gold;c.fillRect(x+12,ry-1,8,8);
      gLabel(rows[i][0],x+26,ry+8,13,G.white);
      c.fillStyle='rgba(255,255,255,.12)';rrect(x+26,ry+12,w-84,5,2.5);c.fill();
      gGlow(G.gold,6,function(){c.fillStyle=G.gold;rrect(x+26,ry+12,(w-84)*rows[i][1]*pr,5,2.5);c.fill();});
      gLabel(rows[i][2],x+w-14,ry+8,13,G.gold,'right',pr);
    }
    var bt=tt-.35-rows.length*.55;
    if(bt>0){var u=sm(clamp(bt/.25,0,1)),sc=1+.25*Math.sin(u*Math.PI);
      c.save();c.translate(x+w/2,y+h+16);c.scale(sc,sc);c.globalAlpha=u;
      gGlow(G.gold,14,function(){c.fillStyle=G.gold;c.fill(gChamfer(-62,-11,124,22,6));});
      c.fillStyle=G.ink;c.font='400 13px '+F_RU;c.textAlign='center';c.textBaseline='middle';c.fillText('VALUE FOUND',0,1);c.restore();}
  }

  /* LEVEL GATE: glowing beam, buy side below, create side above */
  function gGate(y,tt,o){
    o=o||{};var k=sm(clamp(tt/.4,0,1));if(k<=0)return;
    var hw=150*k,pulse=.6+.4*Math.sin(tt*5),lit=o.lit||0;
    gGlow(lit>0?G.green:G.cyan,14+10*lit,function(){c.strokeStyle=lit>0?G.green:G.cyan;c.lineWidth=3+2*lit;c.lineCap='round';c.beginPath();c.moveTo(180-hw,y);c.lineTo(180+hw,y);c.stroke();});
    c.save();c.globalAlpha=k;
    gLabel('CREATE SIDE',180,y-10,13,G.green,'center');
    gLabel('BUY SIDE',180,y+20,13,G.mute,'center');
    var i;for(i=-6;i<=6;i++){c.fillStyle='rgba(47,227,208,'+(.25+.2*pulse)+')';c.fillRect(180+i*22-1,y-3,2,6);}
    c.restore();
  }
  /* dialogue box with typewriter text, name tag and a blinking arrow */
  function gDialog(x,y,w,h,name,lines,tt,o){
    var k=sm(clamp(tt/.3,0,1));if(k<=0)return;
    c.save();c.globalAlpha=k;gPanel(x,y,w,h,G.cyan,.96);
    c.fillStyle=G.cyan;c.fill(gChamfer(x+10,y-11,60,18,5));
    c.fillStyle=G.ink;c.font='400 11px '+F_RU;c.textAlign='center';c.textBaseline='middle';c.fillText(name,x+40,y-1);c.restore();
    var total=0,i;for(i=0;i<lines.length;i++)total+=lines[i].length;
    var shown=Math.floor(Math.max(0,tt-.35)*(o&&o.cps||30)),left=shown;
    c.save();c.fillStyle=G.white;c.font='700 16px '+F_HD;c.textAlign='left';c.textBaseline='alphabetic';
    for(i=0;i<lines.length;i++){var n=Math.max(0,Math.min(lines[i].length,left));c.fillText(lines[i].slice(0,n),x+14,y+30+i*21);left-=lines[i].length;}
    c.restore();
    if(shown>=total&&Math.floor(tt*2)%2===0){c.fillStyle=G.cyan;c.beginPath();c.moveTo(x+w-24,y+h-18);c.lineTo(x+w-14,y+h-18);c.lineTo(x+w-19,y+h-11);c.closePath();c.fill();}
  }

  /* QUEST card with a reward line */
  function gQuest(x,y,w,lines,tt,o){
    var k=sm(clamp(tt/.4,0,1));if(k<=0)return;
    var lh=24,h=44+lines.length*lh+30;
    c.save();c.translate(x+w/2,y+h/2);var kb=.62+.38*gBack(clamp(tt/.4,0,1));c.scale(kb,kb);c.translate(-(x+w/2),-(y+h/2));c.globalAlpha=k;
    gPanel(x,y,w,h,G.gold,.97);
    gGlow(G.gold,10,function(){c.fillStyle=G.gold;c.fill(gChamfer(x+10,y-12,92,22,6));});
    c.fillStyle=G.ink;c.font='400 13px '+F_RU;c.textAlign='center';c.textBaseline='middle';c.fillText('NEW QUEST',x+56,y-1);
    c.restore();
    var i,fs=17,mw=0;c.save();c.font='400 17px '+F_RU;for(i=0;i<lines.length;i++)mw=Math.max(mw,c.measureText(lines[i]).width);c.restore();if(mw>w-26)fs=Math.floor(17*(w-26)/mw*10)/10;
    for(i=0;i<lines.length;i++)gTx(lines[i],x+w/2,y+40+i*lh,fs,tt-.4-i*.28,{sw:.14,stag:.02});
    var rt=tt-.4-lines.length*.28-.2;
    if(rt>0){c.save();c.globalAlpha=sm(clamp(rt/.3,0,1));c.fillStyle='rgba(255,200,61,.14)';c.fillRect(x+10,y+h-30,w-20,20);
      gLabel('REWARD',x+16,y+h-15,12,G.mute);gLabel('+1 WORTH',x+w-16,y+h-15,14,G.gold,'right');c.restore();}
    return h;
  }
  /* LEVEL UP banner with rays and sparks; tt local, cx,cy centre */
  function gLevelUp(cx,cy,tt){
    if(tt<0)return;var u=sm(clamp(tt/.25,0,1)),ov=1+.22*Math.sin(clamp(tt/.35,0,1)*Math.PI),k;
    c.save();c.translate(cx,cy);
    c.save();c.globalAlpha=.5*u;c.rotate(tt*.5);
    for(k=0;k<12;k++){c.rotate(Math.PI/6);var g=c.createLinearGradient(0,0,150,0);g.addColorStop(0,'rgba(255,200,61,.8)');g.addColorStop(1,'rgba(255,200,61,0)');c.fillStyle=g;c.beginPath();c.moveTo(0,0);c.lineTo(150,-9);c.lineTo(150,9);c.closePath();c.fill();}
    c.restore();
    c.scale(ov*u,ov*u);
    c.shadowColor=G.gold;c.shadowBlur=20;c.font='400 38px '+F_RU;c.textAlign='center';c.textBaseline='middle';
    c.lineWidth=7;c.strokeStyle=G.ink;c.lineJoin='round';c.strokeText('LEVEL UP!',0,0);
    var g2=c.createLinearGradient(0,-20,0,20);g2.addColorStop(0,'#FFF3B0');g2.addColorStop(1,G.gold);c.fillStyle=g2;c.fillText('LEVEL UP!',0,0);
    c.restore();
    for(k=0;k<14;k++){var a=k/14*Math.PI*2+aRand(k),d=26+tt*90*(.5+aRand(k*3)),al=1-sm(clamp((tt-.2)/.9,0,1));if(al>0){c.save();c.globalAlpha=al;c.fillStyle=k%2?G.gold:G.cyan;c.fillRect(cx+Math.cos(a)*d-1.5,cy+Math.sin(a)*d*.7-1.5,3,3);c.restore();}}
  }
  /* "Worth it." plate with a stamp-in */
  function gWorthPlate(cx,cy,tt){
    if(tt<0)return;var u=sm(clamp(tt/.3,0,1)),sc=1+(1-u)*(1-u)*1.4;
    c.save();c.translate(cx,cy);c.rotate(-.06);c.scale(sc,sc);c.globalAlpha=clamp(tt/.1,0,1);
    gGlow(G.gold,16,function(){c.fillStyle=G.gold;c.fill(gChamfer(-74,-19,148,38,9));});
    c.fillStyle=G.ink;c.font='400 24px '+F_RU;c.textAlign='center';c.textBaseline='middle';c.fillText('Worth it.',0,2);
    c.restore();
  }

  /* anime sound-effect word on a burst: pops in, wobbles, fades. rot in radians */
  function gSfx(txt,x,y,rot,tt,col,size){
    if(tt<0||tt>1.3)return;
    var u=clamp(tt/.14,0,1),sc=.3+.9*u-.18*sm(clamp((tt-.14)/.2,0,1)),al=1-sm(clamp((tt-.8)/.5,0,1)),k;
    c.save();c.translate(x,y);c.rotate(rot+Math.sin(tt*30)*.02*(1-u));c.scale(sc,sc);c.globalAlpha=al;
    c.fillStyle=col||G.red;c.beginPath();
    for(k=0;k<16;k++){var a=k/16*Math.PI*2,r=k%2?34:52;c.lineTo(Math.cos(a)*r*1.35,Math.sin(a)*r*.8);}
    c.closePath();c.shadowColor=col||G.red;c.shadowBlur=14;c.fill();c.shadowBlur=0;
    c.font='400 '+(size||40)+'px '+F_SX;c.textAlign='center';c.textBaseline='middle';c.lineJoin='round';
    c.lineWidth=7;c.strokeStyle=G.ink;c.strokeText(txt,0,2);c.fillStyle='#fff';c.fillText(txt,0,2);
    c.restore();
  }
  /* neon item: a cup drawn as glowing line art with steam and a gold fill line */
  function gCup(x,y,s,t){
    c.save();c.translate(x,y);c.scale(s,s);c.lineJoin='round';c.lineCap='round';
    var body=new Path2D('M-26 -22 L-22 22 C-21 28 -16 31 -10 31 L10 31 C16 31 21 28 22 22 L26 -22 Z');
    c.fillStyle='rgba(47,227,208,.10)';c.fill(body);
    c.save();c.clip(body);var fl=c.createLinearGradient(0,-4,0,31);fl.addColorStop(0,'#FFC83D');fl.addColorStop(1,'#B97F12');c.fillStyle=fl;c.globalAlpha=.9;c.fillRect(-30,-4+Math.sin(t*2)*1,60,40);c.restore();
    gGlow(G.cyan,12,function(){c.strokeStyle=G.cyan;c.lineWidth=3;c.stroke(body);c.beginPath();c.arc(31,0,10,-1.3,1.3);c.stroke();c.beginPath();c.ellipse(0,31,26,6,0,0,Math.PI);c.stroke();});
    c.strokeStyle='rgba(244,247,255,.7)';c.lineWidth=2;
    for(var k=0;k<3;k++){var ph=t*1.2+k*.7,sx=-12+k*12,sy=-30-(ph%1)*16;c.globalAlpha=1-(ph%1);c.beginPath();c.moveTo(sx,sy+8);c.quadraticCurveTo(sx+4,sy+2,sx,sy-4);c.stroke();}
    c.restore();
  }

  /* ---------- motion punch: camera zoom/shake/roll, flash, colour-split ghost, particles, overshoot ---------- */
  function gBack(x){x=clamp(x,0,1);var c1=1.70158,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2);}
  /* evs = [[time, zoom, shakePx, rollRad], ...]; wraps everything drawn after it, close with c.restore() */
  function gPunchBegin(t,evs,cx,cy){
    var z=1,dx=0,dy=0,rot=0,i;
    for(i=0;i<evs.length;i++){
      var e=evs[i],tt=t-e[0];if(tt<0||tt>.7)continue;
      var env=Math.exp(-tt*9)*(tt<.035?tt/.035:1);
      z+=e[1]*env;dx+=e[2]*env*Math.sin(tt*72+e[0]*3);dy+=e[2]*env*Math.cos(tt*85+e[0]*5);rot+=e[3]*env*Math.sin(tt*58+e[0]);
    }
    c.save();c.translate(cx+dx,cy+dy);c.rotate(rot);c.scale(z,z);c.translate(-cx,-cy);
  }
  function gFlash(t,t0,col,amp,dur){
    var tt=t-t0;if(tt<0||tt>dur)return;
    c.save();c.globalAlpha=amp*Math.exp(-tt*(5/dur));c.fillStyle=col;c.fillRect(0,0,W,H);c.restore();
  }
  /* colour-split ghosting of the frame already drawn: red/cyan echoes, a glitchy hit */
  function gGhost(t,t0,dur,amp){
    var tt=t-t0;if(tt<0||tt>dur)return;var env=1-tt/dur;
    c.save();c.setTransform(1,0,0,1,0,0);c.globalCompositeOperation='lighter';
    c.globalAlpha=.30*env;c.drawImage(cv,-amp*SC*env,0);
    c.globalAlpha=.22*env;c.drawImage(cv,amp*SC*env,0);
    c.restore();
  }
  /* squash and stretch: returns [sx,sy,dy] for a character; pops = [[time, amount], ...] */
  function gSquash(t,pops){
    var sq=0,i;for(i=0;i<pops.length;i++){var tt=t-pops[i][0];if(tt>=0&&tt<1.2)sq+=pops[i][1]*Math.exp(-tt*7)*Math.cos(tt*24);}
    return [1-sq*.55,1+sq,-Math.max(0,sq)*14];
  }
  function gBurst(x,y,tt,cols,n,spd,grav){
    if(tt<0||tt>1.3)return;var k;
    c.save();
    for(k=0;k<n;k++){
      var a=aRand(k*3.7)*Math.PI*2,sp=(.45+.55*aRand(k*5.1))*(spd||160),px=x+Math.cos(a)*sp*tt,py=y+Math.sin(a)*sp*tt+.5*(grav||260)*tt*tt;
      c.globalAlpha=1-sm(clamp((tt-.5)/.8,0,1));c.fillStyle=cols[k%cols.length];
      var sz=2+2.4*aRand(k*7.9);c.save();c.translate(px,py);c.rotate(tt*6+k);c.fillRect(-sz/2,-sz/2,sz,sz);c.restore();
    }
    c.restore();
  }

  /* ---------- the moving world: parallax skyline, perspective floor, light streaks. pos = distance travelled (see worldPos) ---------- */
  var GSKY={};
  function gSkyLayer(pos,hy,L){
    var tile=540,off=(((pos*L.sp*60)%tile)+tile)%tile,bl=GSKY[L.seed],k,rep;
    if(!bl){bl=GSKY[L.seed]=[];var x=0;k=0;while(x<tile){var w=16+Math.floor(aRand(k*3+L.seed)*26),h=10+aRand(k*5+L.seed)*L.hmax;bl.push([x,w,h,k]);x+=w+(aRand(k*7+L.seed)<.3?4:0);k++;}}
    c.save();
    for(rep=0;rep<2;rep++)for(k=0;k<bl.length;k++){
      var b=bl[k],bx=b[0]-off+rep*tile;if(bx>W||bx+b[1]<0)continue;
      c.fillStyle=L.col;c.fillRect(bx,hy-b[2],b[1],b[2]+2);
      c.fillStyle=L.win;
      for(var wy=hy-b[2]+4;wy<hy-4;wy+=7)for(var wx=bx+3;wx<bx+b[1]-3;wx+=6)if(aRand(b[3]*13+wx*.37+wy*.11+L.seed)<.28)c.fillRect(wx,wy,2,2.5);
    }
    c.restore();
  }
  function gFloor(pos,hy){
    var gr=c.createLinearGradient(0,hy,0,H);gr.addColorStop(0,'rgba(47,227,208,.20)');gr.addColorStop(.25,'rgba(30,40,130,.45)');gr.addColorStop(1,'rgba(8,10,40,.92)');
    c.fillStyle=gr;c.fillRect(0,hy,W,H-hy);
    var N=11,p=((pos*1.2)%1+1)%1,k,i;
    c.save();c.lineCap='butt';
    for(k=0;k<N;k++){var z=(k+p)/N,y=hy+(H-hy)*z*z;c.globalAlpha=.10+.42*z;c.strokeStyle=G.cyan;c.lineWidth=.6+1.6*z;c.beginPath();c.moveTo(0,y);c.lineTo(W,y);c.stroke();}
    for(i=-10;i<=10;i++){c.globalAlpha=.16;c.strokeStyle=G.cyan;c.lineWidth=1;c.beginPath();c.moveTo(180+i*7,hy);c.lineTo(180+i*66,H);c.stroke();}
    c.globalAlpha=1;
    var hg=c.createLinearGradient(0,hy-14,0,hy+4);hg.addColorStop(0,'rgba(123,92,255,0)');hg.addColorStop(1,'rgba(123,92,255,.55)');c.fillStyle=hg;c.fillRect(0,hy-14,W,18);
    c.restore();
  }
  function gStreaks(pos,t){
    c.save();
    for(var i=0;i<16;i++){
      var y=105+aRand(i*3.3)*420,len=40+aRand(i*5.1)*90,sp=80+aRand(i*7.7)*240,span=W+len+60;
      var x=W+30-((pos*sp*.9+aRand(i*9.1)*700)%span);
      c.globalAlpha=.07+.10*aRand(i*2.9);c.fillStyle=i%3===0?G.gold:G.cyan;c.fillRect(x,y,len,1.2);
    }
    c.restore();
  }
  function gWorld(t,pos,o){
    o=o||{};var hy=o.hy||430;
    if(o.sun){var sg=c.createRadialGradient(180,hy-6,6,180,hy-6,110);sg.addColorStop(0,'rgba(255,200,61,.75)');sg.addColorStop(.45,'rgba(255,140,60,.35)');sg.addColorStop(1,'rgba(255,140,60,0)');c.fillStyle=sg;c.fillRect(0,hy-120,W,124);c.fillStyle='rgba(255,214,120,.85)';c.beginPath();c.arc(180,hy-4,34,Math.PI,0);c.fill();}
    gSkyLayer(pos*.55,hy,{sp:.10,hmax:62,col:'rgba(18,24,88,.9)',win:'rgba(123,92,255,.55)',seed:11});
    gSkyLayer(pos*.9,hy,{sp:.22,hmax:40,col:'rgba(10,14,60,.95)',win:'rgba(255,200,61,.55)',seed:23});
    gFloor(pos,hy);
    gStreaks(pos,t);
  }

  /* ---------- OUTRO: arcade "episode complete" card with the Joy Digi brand. u = seconds since the outro began. Centre x = 150 (inside the lower safe notch) ---------- */
  function gOutro(u,ep){
    var CX=150,SY=262,k;
    /* tag: EPISODE COMPLETE */
    var tk=gBack(clamp((u-.1)/.4,0,1));
    if(tk>0){
      c.save();c.globalAlpha=clamp(tk*1.4,0,1);c.translate(0,(1-tk)*-26);
      gGlow(G.green,10,function(){c.fillStyle=G.ink;c.fill(gChamfer(CX-92,122,184,26,7));c.strokeStyle=G.green;c.lineWidth=2;c.stroke(gChamfer(CX-92,122,184,26,7));});
      iIcon('check',CX-72,135,.75,G.green);
      c.font='700 13px '+F_HD;c.textAlign='center';c.textBaseline='middle';c.fillStyle=G.white;try{c.letterSpacing='2px';}catch(e){}
      c.fillText('EPISODE '+(ep||1)+' COMPLETE',CX+8,136);try{c.letterSpacing='0px';}catch(e){}
      c.restore();
    }
    /* brand title card (Joy Digi teal) */
    var pk=sm(clamp((u-.5)/.45,0,1));
    if(pk>0){
      c.save();c.globalAlpha=pk;c.translate(0,(1-pk)*16);
      var pp=gChamfer(40,278,220,116,12);
      c.fillStyle='#003B49';c.fill(pp);
      gGlow(G.cyan,12,function(){c.strokeStyle=G.cyan;c.lineWidth=2;c.stroke(pp);});
      c.save();c.clip(pp);
      var sw=sm(clamp((u-1.7)/.7,0,1));
      if(sw>0&&sw<1){var bx=40-60+sw*340,gr=c.createLinearGradient(bx-30,0,bx+30,0);gr.addColorStop(0,'rgba(255,255,255,0)');gr.addColorStop(.5,'rgba(255,255,255,.28)');gr.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=gr;c.save();c.transform(1,0,-.4,1,0,0);c.fillRect(bx-30+160,278,60,116);c.restore();}
      c.restore();
      c.restore();
    }
    /* the mark: particles converge, pop, spin, orbit */
    var asm=clamp((u-.15)/.55,0,1);
    if(asm<1){
      c.save();
      for(k=0;k<28;k++){
        var a=aRand(k*4.1)*Math.PI*2,r0=130+aRand(k*6.3)*90,e=sm(asm),px=CX+Math.cos(a)*r0*(1-e),py=SY+Math.sin(a)*r0*(1-e);
        c.globalAlpha=.3+.7*e;c.fillStyle=k%3===0?G.gold:'#FF6B6B';c.fillRect(px-1.5,py-1.5,3,3);
      }
      c.restore();
    }
    var sp=gBack(clamp((u-.7)/.38,0,1));
    if(u>=.7){
      var ring=(u-.7)/.6;
      if(ring<1){c.save();c.globalAlpha=(1-ring)*.8;c.strokeStyle='#FF6B6B';c.lineWidth=4*(1-ring)+1;c.beginPath();c.arc(CX,SY,16+ring*130,0,6.3);c.stroke();c.restore();}
      c.save();c.translate(CX,SY);c.rotate((u-.7)*.8);
      var pulse=1+.05*Math.sin(u*5);c.scale(sp*pulse,sp*pulse);
      c.shadowColor='#FF6B6B';c.shadowBlur=26;c.fillStyle='#FF6B6B';star4(0,0,44,0);c.fill();c.shadowBlur=0;
      c.strokeStyle='rgba(255,255,255,.55)';c.lineWidth=1.6;star4(0,0,44,0);c.stroke();
      c.fillStyle='rgba(255,255,255,.7)';star4(0,0,14,0);c.fill();
      c.restore();
      for(k=0;k<5;k++){var oa=u*1.6+k*Math.PI*2/5,orx=70+6*Math.sin(u*2+k);c.save();c.globalAlpha=sm(clamp((u-1.0)/.4,0,1))*.9;c.fillStyle=k%2?G.gold:G.cyan;star4(CX+Math.cos(oa)*orx,SY+Math.sin(oa)*orx*.55,4+2*Math.sin(u*4+k),oa);c.fill();c.restore();}
    }
    /* wordmark + credit + disclaimer */
    c.save();
    wiTx('The Joy Digi',CX,330,30,u-.95,{fam:F_FR,wt:'700',fill:WI.sand,sw:0,stag:.035});
    var ct=sm(clamp((u-1.5)/.4,0,1));
    c.globalAlpha=ct;c.fillStyle='#BFE9EE';c.font='600 12px '+F_HD;c.textAlign='center';c.textBaseline='alphabetic';c.fillText('Worth It is a production of The Joy Digi',CX,356);
    c.globalAlpha=ct;c.fillStyle='#A9D7DD';c.font='600 10.5px '+F_HD;c.fillText('Educational only. Not financial advice.',CX,376);
    c.restore();
  }
