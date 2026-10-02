/* lead v3: the two recurring anime leads, early 20s, waist-up: WREN (odd episodes) and KAI (even episodes). Cel-shaded Path2D with base, shade, rim light and highlights.
   Pure function of time on the shared canvas context `c`. Local origin = belt centre, y up is negative. API: wiLead(x,y,s,pose,t,o) with o.who = 'wren' (default) | 'kai'. */

  var LD={ink:'#141A3C',skin:'#F6D4B6',skinSh:'#DDA683',skinHL:'#FFE9D2',hair:'#1A2150',hairSh:'#0A0F33',hairHL:'#6E8CFF',streak:'#2FE3D0',
          jk:'#0E4D5C',jkSh:'#082F3A',jkHL:'#2C8A9B',cream:'#FDF6EC',creamSh:'#CFC6B4',gold:'#F5B83D',goldSh:'#B97F12',
          iris:'#0F7C8C',iris2:'#4DE8D8',rim:'#2FE3D0',blush:'rgba(255,107,107,.30)',lip:'#B8584F'};

  var LDW=Object.assign({},LD);
  var LDK=Object.assign({},LD,{skin:'#D9A47B',skinSh:'#B9805A',skinHL:'#EBC29C',hair:'#2B1B16',hairSh:'#130B08',hairHL:'#9A6A4A',streak:'#E9EEFF',
          jk:'#4A3BD0',jkSh:'#271E80',jkHL:'#8272FF',iris:'#7A431A',iris2:'#F0A94E',rim:'#9B8CFF',blush:'rgba(255,107,107,.10)'});
  var LD_ES=1;

  /* flat fill + offset shade, clipped; optional rim light on the lower-right edge; ink outline on top */
  function ldPart(path,base,shade,o){
    o=o||{};var lw=o.lw||1.3;
    c.fillStyle=shade;c.fill(path);
    c.save();c.clip(path);c.translate(-2.4,-2.6);c.fillStyle=base;c.fill(path);c.restore();
    if(o.hl){c.save();c.clip(path);c.translate(1.4,1.6);c.strokeStyle=o.hl;c.lineWidth=1.4;c.globalAlpha=.7;c.stroke(path);c.restore();}
    if(!o.norim){c.save();c.clip(path);c.translate(-1.4,-1.4);c.strokeStyle=LD.rim;c.globalAlpha=.32;c.lineWidth=1.3;c.stroke(path);c.restore();}
    c.strokeStyle=LD.ink;c.lineWidth=lw;c.lineJoin='round';c.stroke(path);
  }
  function ldTaper(x0,y0,x1,y1,r0,r1){
    var a=Math.atan2(y1-y0,x1-x0),p=new Path2D();
    p.arc(x0,y0,r0,a+Math.PI/2,a+Math.PI*1.5);
    p.arc(x1,y1,r1,a-Math.PI/2,a+Math.PI/2);
    p.closePath();return p;
  }
  function ldEll(x,y,rx,ry,rot){var p=new Path2D();p.ellipse(x,y,rx,ry,rot||0,0,Math.PI*2);return p;}

  /* poses: lean, tilt, rA/lA = [upper-arm, forearm] absolute angles from straight-down (+ = outward), face, gaze, hand */
  var LPOSE={
    stand:{lean:0,tilt:0,rA:[.16,.3],lA:[.16,.3],face:'calm',gz:[0,0],hand:'fist'},
    shock:{lean:-.05,tilt:-.07,rA:[.95,.8],lA:[.95,.8],face:'shock',gz:[0,0],hand:'open'},
    think:{lean:.03,tilt:.1,rA:[.12,.3],lA:[.5,2.45],face:'think',gz:[.7,-.8],hand:'fist'},
    point:{lean:.04,tilt:.05,rA:[.35,1.95],lA:[.12,.3],face:'resolve',gz:[.6,-.1],hand:'point'},
    joy:{lean:0,tilt:.08,rA:[.7,1.1],lA:[.7,1.1],face:'joy',gz:[0,0],hand:'fist'},
    resolve:{lean:.05,tilt:0,rA:[.2,.5],lA:[.2,.5],face:'resolve',gz:[0,0],hand:'fist'},
    shrug:{lean:0,tilt:.1,rA:[.75,1.55],lA:[.75,1.55],face:'sad',gz:[0,.5],hand:'open'}
  };
  var LFACE={
    calm:{eo:1,ir:1,br:[-.02,.02],bry:0,mouth:'smile'},
    shock:{eo:1.3,ir:.62,br:[-.14,.14],bry:-3,mouth:'o'},
    think:{eo:.88,ir:1,br:[.14,-.1],bry:-1,mouth:'flat'},
    resolve:{eo:.78,ir:1,br:[.26,-.26],bry:1,mouth:'firm'},
    joy:{eo:0,ir:1,br:[-.1,.1],bry:-2,mouth:'grin'},
    sad:{eo:.9,ir:1,br:[-.3,.3],bry:0,mouth:'frown'}
  };

  /* hands, drawn in a frame where +x runs along the forearm */
  function ldHand(wx,wy,ang,kind,sd){
    c.save();c.translate(wx,wy);c.rotate(ang);
    var p=new Path2D();
    if(kind==='open'){
      ldPart(new Path2D('M0 -4.4 C4 -5.4 8 -5 9.5 -3 C10.5 -1 10.5 2 9.5 4 C7 5.6 3 5.4 0 4.4 Z'),LD.skin,LD.skinSh,{lw:1.1,norim:1});
      var k;for(k=-2;k<=1;k++){ldPart(ldTaper(9,k*2.7+1,14.5,k*3.6+1,1.35,1.1),LD.skin,LD.skinSh,{lw:.9,norim:1});}
      ldPart(ldTaper(3,-4,8,-9,1.7,1.3),LD.skin,LD.skinSh,{lw:.9,norim:1});
    }else{
      ldPart(new Path2D('M-.5 -4.8 C4 -6 9 -5.4 10.4 -2.6 C11.4 0 11 3 9.4 4.8 C6 6 2 5.6 -.5 4.6 Z'),LD.skin,LD.skinSh,{lw:1.1,norim:1});
      c.strokeStyle=LD.skinSh;c.lineWidth=1;c.lineCap='round';
      c.beginPath();c.moveTo(4.5,-4.8);c.lineTo(4.8,4.2);c.moveTo(7.8,-4);c.lineTo(8,4.4);c.stroke();
      if(kind==='point'&&sd){ldPart(ldTaper(9,-2.6,18,-2.6,1.9,1.4),LD.skin,LD.skinSh,{lw:1,norim:1});}
      ldPart(ldEll(2.5,-5.6,2.6,1.8,.3),LD.skin,LD.skinSh,{lw:.9,norim:1});
    }
    c.restore();
  }

  function ldEye(ex,ey,side,F,gz,blink){
    var eo=F.eo*(1-blink);
    if(eo<.14){
      c.strokeStyle=LD.ink;c.lineWidth=2.1;c.lineCap='round';c.beginPath();
      if(F.eo===0){c.moveTo(ex-5.4,ey+1.4);c.quadraticCurveTo(ex,ey-4.6,ex+5.4,ey+1.4);}
      else{c.moveTo(ex-5.4,ey+.4);c.quadraticCurveTo(ex,ey+3.6,ex+5.4,ey+.4);}
      c.stroke();return;
    }
    var w=5.1*LD_ES,h=5.9*LD_ES*eo,sc=ldEll(ex,ey,w,h);
    c.fillStyle='#FFFEFA';c.fill(sc);
    c.save();c.clip(sc);
    var ix=ex+gz[0]*1.8,iy=ey+gz[1]*1.8,ir=4.7*F.ir,g=c.createLinearGradient(0,iy-ir,0,iy+ir*1.3);
    g.addColorStop(0,LD.hairSh);g.addColorStop(.35,LD.iris);g.addColorStop(1,LD.iris2);
    c.fillStyle=g;c.beginPath();c.ellipse(ix,iy+.8,ir,Math.min(h+1,ir*1.5),0,0,Math.PI*2);c.fill();
    c.fillStyle=LD.ink;c.beginPath();c.arc(ix,iy+.6,ir*.4,0,Math.PI*2);c.fill();
    c.fillStyle='#fff';c.beginPath();c.arc(ix-ir*.42,iy-ir*.5,ir*.36,0,Math.PI*2);c.fill();
    c.beginPath();c.arc(ix+ir*.45,iy+ir*.5,ir*.17,0,Math.PI*2);c.fill();
    c.fillStyle='rgba(10,15,51,.35)';c.fillRect(ex-w,ey-h,w*2,h*.55);
    c.restore();
    c.strokeStyle=LD.ink;c.lineCap='round';c.lineWidth=LD_ES<1?1.6:2.2;c.beginPath();c.ellipse(ex,ey,w,h,0,Math.PI*1.04,Math.PI*1.96);c.stroke();
    if(LD_ES>=1){c.lineWidth=1.5;c.beginPath();c.moveTo(ex+side*w*.9,ey-h*.45);c.quadraticCurveTo(ex+side*(w+2.2),ey-h*.7,ex+side*(w+3.8),ey-h*.4);c.stroke();}
    
  }
  function ldMouth(y,F){
    c.strokeStyle=LD.ink;c.lineWidth=1.3;c.lineCap='round';c.lineJoin='round';c.beginPath();
    switch(F.mouth){
      case'smile':c.moveTo(-3.6,y);c.quadraticCurveTo(0,y+2.6,3.6,y-.2);c.stroke();break;
      case'grin':c.moveTo(-5,y-.8);c.quadraticCurveTo(0,y+7,5,y-.8);c.closePath();c.fillStyle='#7A2E33';c.fill();c.save();c.clip();c.fillStyle='#FFFEFA';c.fillRect(-5,y-1,10,2.6);c.restore();c.stroke();break;
      case'o':c.ellipse(0,y+.8,2.3,3.2,0,0,Math.PI*2);c.fillStyle='#7A2E33';c.fill();c.stroke();break;
      case'flat':c.moveTo(-2.8,y+.8);c.lineTo(2.8,y);c.stroke();break;
      case'firm':c.moveTo(-3.6,y+.5);c.quadraticCurveTo(0,y+1.4,3.8,y-.7);c.stroke();break;
      case'frown':c.moveTo(-3.4,y+2);c.quadraticCurveTo(0,y-.8,3.4,y+2);c.stroke();break;
    }
  }

  /* x,y = belt centre, s = scale, name = LPOSE key, t = time, o = {flip, face, gz, rA, rim} */
  function wiLead(x,y,s,name,t,o){
    o=o||{};
    var K=o.who==='kai',P=LPOSE[name]||LPOSE.stand,F=LFACE[o.face||P.face]||LFACE.calm;
    Object.assign(LD,K?LDK:LDW);if(o.rim)LD.rim=o.rim;LD_ES=K?.9:1;
    var gz=o.gz||P.gz,breath=Math.sin(t*2.2)*.6,bp=(t%3.6)/3.6,blink=bp>.965?Math.sin((bp-.965)/.035*Math.PI):0;
    var cuff=K?LD.cream:LD.gold;
    c.save();c.translate(x,y);c.scale(s*(o.flip?-1:1),s);c.rotate(P.lean);
    var hy=-57+breath*.3;

    /* back hair */
    c.save();c.translate(0,hy);c.rotate(P.tilt);
    if(K)ldPart(new Path2D('M-17 -22 C-22 -44 -12 -56 0 -56 C12 -56 22 -44 17 -22 C16 -14 14 -6 10 -2 L-10 -2 C-14 -6 -16 -14 -17 -22 Z'),LD.hair,LD.hairSh,{norim:1});
    else ldPart(new Path2D('M-19 -20 C-25 -44 -14 -59 0 -59 C14 -59 25 -44 19 -20 C21 -9 18 0 14 7 C8 4 -8 4 -14 7 C-18 0 -21 -9 -19 -20 Z'),LD.hair,LD.hairSh,{norim:1});
    c.restore();

    /* torso (Kai: broader shoulders) */
    c.save();if(K)c.scale(1.1,1);
    var torso=new Path2D('M-9 -55 C-15 -54 -24 -51 -27 -43 C-30 -30 -28 -12 -25 0 C-10 4 10 4 25 0 C28 -12 30 -30 27 -43 C24 -51 15 -54 9 -55 C5 -50 -5 -50 -9 -55 Z');
    ldPart(torso,LD.jk,LD.jkSh,{hl:LD.jkHL});
    ldPart(new Path2D('M-6 -53 L0 -36 L6 -53 C3 -50 -3 -50 -6 -53 Z'),LD.cream,LD.creamSh,{lw:1,norim:1});
    c.strokeStyle=LD.jkSh;c.lineWidth=1.1;c.beginPath();c.moveTo(0,-36);c.lineTo(0,3);c.stroke();
    if(K){
      c.strokeStyle=LD.cream;c.lineWidth=2;c.lineCap='round';c.beginPath();c.moveTo(-24,-6);c.quadraticCurveTo(0,-2,24,-6);c.moveTo(-24.5,-1.5);c.quadraticCurveTo(0,2.5,24.5,-1.5);c.stroke();
      c.strokeStyle=LD.jkSh;c.lineWidth=1;c.beginPath();c.moveTo(12,-22);c.lineTo(20,-18);c.moveTo(-12,-22);c.lineTo(-20,-18);c.stroke();
      ldPart(new Path2D('M-11 -57 C-6 -52 6 -52 11 -57 L13 -49 C6 -44 -6 -44 -13 -49 Z'),LD.jk,LD.jkSh,{lw:1.1,hl:LD.jkHL});
      c.strokeStyle=LD.jkSh;c.lineWidth=.8;c.beginPath();for(var rb=-8;rb<=8;rb+=4){c.moveTo(rb,-52+Math.abs(rb)*.12);c.lineTo(rb*1.1,-46+Math.abs(rb)*.12);}c.stroke();
    }else{
      c.strokeStyle=LD.gold;c.lineWidth=2.2;c.lineCap='round';c.beginPath();c.moveTo(-24,-4);c.quadraticCurveTo(0,0,24,-4);c.stroke();
      c.strokeStyle=LD.jkSh;c.lineWidth=1;c.beginPath();c.moveTo(-17,-18);c.lineTo(-10,-18);c.moveTo(17,-18);c.lineTo(10,-18);c.stroke();
      ldPart(new Path2D('M-9 -56 L-14 -46 L-6 -40 L-2 -50 Z'),LD.jk,LD.jkSh,{lw:1.1,hl:LD.jkHL});
      ldPart(new Path2D('M9 -56 L14 -46 L6 -40 L2 -50 Z'),LD.jk,LD.jkSh,{lw:1.1,hl:LD.jkHL});
    }
    var pg=Math.sin(t*1.6)*.4;
    if(K){
      /* headphones worn around the neck */
      c.strokeStyle=LD.ink;c.lineWidth=5;c.lineCap='round';c.beginPath();c.moveTo(-14,-49);c.bezierCurveTo(-16,-36,16,-36,14,-49);c.stroke();
      c.strokeStyle='#1F2557';c.lineWidth=3;c.stroke();
      [-1,1].forEach(function(sd){ldPart(new Path2D('M'+(sd*10)+' -44 L'+(sd*18)+' -44 L'+(sd*18)+' -31 L'+(sd*10)+' -31 Z'),'#1F2557','#0E1230',{lw:1.2,hl:LD.jkHL});c.strokeStyle=LD.jkHL;c.lineWidth=1.3;c.beginPath();c.ellipse(sd*14,-37.5,2.4,4.2,0,0,Math.PI*2);c.stroke();});
      /* gold dog tag */
      c.strokeStyle=LD.goldSh;c.lineWidth=1;c.beginPath();c.moveTo(-5,-49);c.lineTo(0,-30+pg);c.lineTo(5,-49);c.stroke();
      ldPart(new Path2D('M-3.6 '+(-30+pg)+' L3.6 '+(-30+pg)+' L3.6 '+(-17+pg)+' L-3.6 '+(-17+pg)+' Z'),LD.gold,LD.goldSh,{lw:1.2,norim:1});
      c.strokeStyle=LD.goldSh;c.lineWidth=.8;c.beginPath();c.moveTo(-1.8,-26+pg);c.lineTo(1.8,-26+pg);c.moveTo(-1.8,-23+pg);c.lineTo(1.8,-23+pg);c.stroke();
      c.fillStyle='rgba(245,184,61,.25)';c.beginPath();c.arc(0,-23.5+pg,7,0,Math.PI*2);c.fill();
    }else{
      c.strokeStyle=LD.goldSh;c.lineWidth=1;c.beginPath();c.moveTo(-5,-48);c.lineTo(0,-27+pg);c.lineTo(5,-48);c.stroke();
      c.beginPath();c.arc(0,-24+pg,4.4,0,Math.PI*2);c.lineWidth=2.6;c.strokeStyle=LD.goldSh;c.stroke();c.strokeStyle=LD.gold;c.lineWidth=1.6;c.stroke();
      c.fillStyle='rgba(245,184,61,.25)';c.beginPath();c.arc(0,-24+pg,2.6,0,Math.PI*2);c.fill();
    }

    /* arms: tapered sleeves, trimmed cuffs, hands */
    function arm(side,A,sd){
      var sx=side*25,sy=-44+breath*.3,a1=A[0],a2=A[1];
      var ex=sx+side*Math.sin(a1)*23,ey=sy+Math.cos(a1)*23;
      var wx=ex+side*Math.sin(a2)*21,wy=ey+Math.cos(a2)*21;
      ldPart(ldTaper(sx,sy,ex,ey,K?7.6:7,K?6.2:5.7),LD.jk,LD.jkSh,{hl:LD.jkHL});
      ldPart(ldTaper(ex,ey,wx,wy,K?6.2:5.7,K?5.2:4.8),LD.jk,LD.jkSh,{hl:LD.jkHL});
      var ca=Math.atan2(wy-ey,wx-ex),cx2=wx-Math.cos(ca)*3,cy2=wy-Math.sin(ca)*3;
      c.strokeStyle=cuff;c.lineWidth=2.4;c.lineCap='butt';c.beginPath();c.moveTo(cx2-Math.sin(ca)*4.8,cy2+Math.cos(ca)*4.8);c.lineTo(cx2+Math.sin(ca)*4.8,cy2-Math.cos(ca)*4.8);c.stroke();
      ldHand(wx,wy,ca,P.hand,sd);
    }
    arm(-1,P.lA,0);arm(1,o.rA||P.rA,1);
    c.restore();

    /* neck + head */
    ldPart(new Path2D('M-5.6 -62 L5.6 -62 L5.6 -50 C2 -47 -2 -47 -5.6 -50 Z'),LD.skin,LD.skinSh,{lw:1.1,norim:1});
    c.save();c.translate(0,hy);c.rotate(P.tilt);
    if(K){ldPart(ldEll(-16.8,-16,2.6,4.2),LD.skin,LD.skinSh,{lw:1.1,norim:1});ldPart(ldEll(16.8,-16,2.6,4.2),LD.skin,LD.skinSh,{lw:1.1,norim:1});}
    ldPart(new Path2D(K?'M-16 -30 C-17 -20 -15.5 -10 -11 -4.5 C-8 -1 -5 .5 -2 1 L2 1 C5 .5 8 -1 11 -4.5 C15.5 -10 17 -20 16 -30 C16 -40 8 -45 0 -45 C-8 -45 -16 -40 -16 -30 Z':'M-16 -30 C-17 -20 -15 -9 -9 -3 C-5 .5 -2 1.5 0 1.5 C2 1.5 5 .5 9 -3 C15 -9 17 -20 16 -30 C16 -40 8 -45 0 -45 C-8 -45 -16 -40 -16 -30 Z'),LD.skin,LD.skinSh,{hl:LD.skinHL});
    c.fillStyle=LD.blush;c.beginPath();c.ellipse(-10,-11,4,2,0,0,Math.PI*2);c.ellipse(10,-11,4,2,0,0,Math.PI*2);c.fill();
    var by=-33+F.bry+(K?-1.2:0);
    c.strokeStyle=LD.hairSh;c.lineWidth=K?2:1.6;c.lineCap='round';
    c.beginPath();c.moveTo(-13,by-F.br[0]*10);c.quadraticCurveTo(-9,by-(K?.8:1.4),-3.2,by+F.br[0]*7);c.stroke();
    c.beginPath();c.moveTo(3.2,by+F.br[1]*7);c.quadraticCurveTo(9,by-(K?.8:1.4),13,by-F.br[1]*10);c.stroke();
    ldEye(-7,-22.5,-1,F,gz,blink);ldEye(7,-22.5,1,F,gz,blink);
    c.strokeStyle=LD.skinSh;c.lineWidth=1.1;c.beginPath();c.moveTo(.6,K?-17:-15);c.lineTo(1.8,-11.2);c.lineTo(-.4,-10.8);c.stroke();
    ldMouth(K?-5.6:-6.4,F);

    /* front hair */
    if(K){
      ldPart(new Path2D('M-17 -26 C-21 -40 -15 -54 -6 -57 L-4 -62 L0 -57 L4 -64 L7 -57 L12 -61 L12 -55 C20 -52 20 -38 17 -26 C16 -33 13 -37 9 -38 C10 -33 8 -29 5 -27 C3 -32 0 -35 -4 -36 C-5 -32 -8 -28 -12 -26 C-13 -30 -15 -33 -17 -26 Z'),LD.hair,LD.hairSh,{norim:1});
      ldPart(new Path2D('M-17 -26 C-18 -20 -17.5 -14 -16 -9 L-14.5 -9 C-14 -15 -14 -22 -14.5 -26 Z'),LD.hair,LD.hairSh,{lw:1,norim:1});
      ldPart(new Path2D('M17 -26 C18 -20 17.5 -14 16 -9 L14.5 -9 C14 -15 14 -22 14.5 -26 Z'),LD.hair,LD.hairSh,{lw:1,norim:1});
      ldPart(new Path2D('M4 -64 L7 -57 L6.5 -47 L2.6 -56 Z'),LD.streak,'#B9C4F0',{lw:.9,norim:1});
      c.strokeStyle=LD.hairHL;c.lineWidth=1.6;c.lineCap='round';c.globalAlpha=.8;c.beginPath();c.moveTo(-12,-50);c.quadraticCurveTo(-6,-56,-1,-55);c.stroke();c.globalAlpha=1;
    }else{
      ldPart(new Path2D('M-18 -24 C-22 -42 -12 -58 2 -58 C16 -58 24 -44 19 -24 C18 -33 15 -38 11 -40 C12 -34 10 -29 6.5 -26 C5.5 -31 3 -35 -.5 -37 C-1 -32 -4.5 -28 -8 -26 C-9 -31 -11 -35 -15 -38 C-16 -33 -17 -28 -18 -24 Z'),LD.hair,LD.hairSh,{norim:1});
      ldPart(new Path2D('M-18 -26 C-22 -14 -21 -2 -17 8 C-14 -1 -14.5 -12 -14.5 -24 Z'),LD.hair,LD.hairSh,{lw:1.1,norim:1});
      ldPart(new Path2D('M18 -26 C22 -14 21 -2 17 8 C14 -1 14.5 -12 14.5 -24 Z'),LD.hair,LD.hairSh,{lw:1.1,norim:1});
      ldPart(new Path2D('M6 -36 C8 -33 8 -29 6.5 -26 C5.5 -31 3 -35 -.5 -37 C2 -37.5 4.5 -37.6 6 -36 Z'),LD.streak,'#14A99F',{lw:.9,norim:1});
      c.strokeStyle=LD.hairHL;c.lineWidth=1.8;c.lineCap='round';c.globalAlpha=.85;
      c.beginPath();c.moveTo(-11,-51);c.quadraticCurveTo(0,-56,11,-52);c.stroke();c.globalAlpha=1;
      /* gaming headset */
      c.strokeStyle=LD.ink;c.lineWidth=5.2;c.beginPath();c.moveTo(-17.5,-24);c.bezierCurveTo(-19,-62,19,-62,17.5,-24);c.stroke();
      c.strokeStyle=LD.jk;c.lineWidth=3;c.stroke();
      c.strokeStyle=LD.gold;c.lineWidth=.9;c.stroke();
      [-1,1].forEach(function(sd){
        ldPart(new Path2D('M'+(sd*15)+' -30 C'+(sd*25)+' -31 '+(sd*25)+' -12 '+(sd*15)+' -13 Z'),LD.jk,LD.jkSh,{lw:1.2,hl:LD.jkHL});
        c.strokeStyle=LD.gold;c.lineWidth=1.6;c.beginPath();c.ellipse(sd*19.5,-21.5,2.6,5,0,0,Math.PI*2);c.stroke();
        c.fillStyle='rgba(47,227,208,.55)';c.beginPath();c.ellipse(sd*19.5,-21.5,1.2,3,0,0,Math.PI*2);c.fill();
      });
    }
    c.restore();
    c.restore();
  }
