/* lead v2: the recurring anime lead (working name WREN), early 20s, waist-up. Cel-shaded Path2D with base, shade, rim light and highlights.
   Pure function of time on the shared canvas context `c`. Local origin = belt centre, y up is negative. API: wiLead(x,y,s,pose,t,o). */

  var LD={ink:'#141A3C',skin:'#F6D4B6',skinSh:'#DDA683',skinHL:'#FFE9D2',hair:'#1A2150',hairSh:'#0A0F33',hairHL:'#6E8CFF',streak:'#2FE3D0',
          jk:'#0E4D5C',jkSh:'#082F3A',jkHL:'#2C8A9B',cream:'#FDF6EC',creamSh:'#CFC6B4',gold:'#F5B83D',goldSh:'#B97F12',
          iris:'#0F7C8C',iris2:'#4DE8D8',rim:'#2FE3D0',blush:'rgba(255,107,107,.30)',lip:'#B8584F'};

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
    var w=5.1,h=5.9*eo,sc=ldEll(ex,ey,w,h);
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
    c.strokeStyle=LD.ink;c.lineCap='round';c.lineWidth=2.2;c.beginPath();c.ellipse(ex,ey,w,h,0,Math.PI*1.04,Math.PI*1.96);c.stroke();
    c.lineWidth=1.5;c.beginPath();c.moveTo(ex+side*w*.9,ey-h*.45);c.quadraticCurveTo(ex+side*(w+2.2),ey-h*.7,ex+side*(w+3.8),ey-h*.4);c.stroke();
    
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
    var P=LPOSE[name]||LPOSE.stand,F=LFACE[o.face||P.face]||LFACE.calm;
    var gz=o.gz||P.gz,breath=Math.sin(t*2.2)*.6,bp=(t%3.6)/3.6,blink=bp>.965?Math.sin((bp-.965)/.035*Math.PI):0;
    if(o.rim)LD.rim=o.rim;
    c.save();c.translate(x,y);c.scale(s*(o.flip?-1:1),s);c.rotate(P.lean);
    var hy=-57+breath*.3;

    /* back hair */
    c.save();c.translate(0,hy);c.rotate(P.tilt);
    ldPart(new Path2D('M-19 -20 C-25 -44 -14 -59 0 -59 C14 -59 25 -44 19 -20 C21 -9 18 0 14 7 C8 4 -8 4 -14 7 C-18 0 -21 -9 -19 -20 Z'),LD.hair,LD.hairSh,{norim:1});
    c.restore();

    /* torso: jacket */
    var torso=new Path2D('M-9 -55 C-15 -54 -24 -51 -27 -43 C-30 -30 -28 -12 -25 0 C-10 4 10 4 25 0 C28 -12 30 -30 27 -43 C24 -51 15 -54 9 -55 C5 -50 -5 -50 -9 -55 Z');
    ldPart(torso,LD.jk,LD.jkSh,{hl:LD.jkHL});
    ldPart(new Path2D('M-6 -53 L0 -36 L6 -53 C3 -50 -3 -50 -6 -53 Z'),LD.cream,LD.creamSh,{lw:1,norim:1});
    c.strokeStyle=LD.jkSh;c.lineWidth=1.1;c.beginPath();c.moveTo(0,-36);c.lineTo(0,3);c.stroke();
    c.strokeStyle=LD.gold;c.lineWidth=2.2;c.lineCap='round';c.beginPath();c.moveTo(-24,-4);c.quadraticCurveTo(0,0,24,-4);c.stroke();
    c.strokeStyle=LD.jkSh;c.lineWidth=1;c.beginPath();c.moveTo(-17,-18);c.lineTo(-10,-18);c.moveTo(17,-18);c.lineTo(10,-18);c.stroke();
    /* collar flaps */
    ldPart(new Path2D('M-9 -56 L-14 -46 L-6 -40 L-2 -50 Z'),LD.jk,LD.jkSh,{lw:1.1,hl:LD.jkHL});
    ldPart(new Path2D('M9 -56 L14 -46 L6 -40 L2 -50 Z'),LD.jk,LD.jkSh,{lw:1.1,hl:LD.jkHL});
    /* gold lens pendant */
    var pg=Math.sin(t*1.6)*.4;
    c.strokeStyle=LD.goldSh;c.lineWidth=1;c.beginPath();c.moveTo(-5,-48);c.lineTo(0,-27+pg);c.lineTo(5,-48);c.stroke();
    c.beginPath();c.arc(0,-24+pg,4.4,0,Math.PI*2);c.lineWidth=2.6;c.strokeStyle=LD.goldSh;c.stroke();c.strokeStyle=LD.gold;c.lineWidth=1.6;c.stroke();
    c.fillStyle='rgba(245,184,61,.25)';c.beginPath();c.arc(0,-24+pg,2.6,0,Math.PI*2);c.fill();

    /* arms: tapered sleeves, gold cuffs, hands */
    function arm(side,A,sd){
      var sx=side*25,sy=-44+breath*.3,a1=A[0],a2=A[1];
      var ex=sx+side*Math.sin(a1)*23,ey=sy+Math.cos(a1)*23;
      var wx=ex+side*Math.sin(a2)*21,wy=ey+Math.cos(a2)*21;
      ldPart(ldTaper(sx,sy,ex,ey,7,5.7),LD.jk,LD.jkSh,{hl:LD.jkHL});
      ldPart(ldTaper(ex,ey,wx,wy,5.7,4.8),LD.jk,LD.jkSh,{hl:LD.jkHL});
      var ca=Math.atan2(wy-ey,wx-ex),cx2=wx-Math.cos(ca)*3,cy2=wy-Math.sin(ca)*3;
      c.strokeStyle=LD.gold;c.lineWidth=2.4;c.lineCap='butt';c.beginPath();c.moveTo(cx2-Math.sin(ca)*4.8,cy2+Math.cos(ca)*4.8);c.lineTo(cx2+Math.sin(ca)*4.8,cy2-Math.cos(ca)*4.8);c.stroke();
      ldHand(wx,wy,ca*(side<0?1:1),P.hand,sd);
    }
    arm(-1,P.lA,0);arm(1,o.rA||P.rA,1);

    /* neck + head */
    ldPart(new Path2D('M-5.6 -62 L5.6 -62 L5.6 -50 C2 -47 -2 -47 -5.6 -50 Z'),LD.skin,LD.skinSh,{lw:1.1,norim:1});
    c.save();c.translate(0,hy);c.rotate(P.tilt);
    ldPart(new Path2D('M-16 -30 C-17 -20 -15 -9 -9 -3 C-5 .5 -2 1.5 0 1.5 C2 1.5 5 .5 9 -3 C15 -9 17 -20 16 -30 C16 -40 8 -45 0 -45 C-8 -45 -16 -40 -16 -30 Z'),LD.skin,LD.skinSh,{hl:LD.skinHL});
    /* face features */
    c.fillStyle=LD.blush;c.beginPath();c.ellipse(-10,-11,4,2,0,0,Math.PI*2);c.ellipse(10,-11,4,2,0,0,Math.PI*2);c.fill();
    var by=-33+F.bry;
    c.strokeStyle=LD.hairSh;c.lineWidth=1.6;c.lineCap='round';
    c.beginPath();c.moveTo(-13,by-F.br[0]*10);c.quadraticCurveTo(-9,by-1.4,-3.2,by+F.br[0]*7);c.stroke();
    c.beginPath();c.moveTo(3.2,by+F.br[1]*7);c.quadraticCurveTo(9,by-1.4,13,by-F.br[1]*10);c.stroke();
    ldEye(-7,-22.5,-1,F,gz,blink);ldEye(7,-22.5,1,F,gz,blink);
    c.strokeStyle=LD.skinSh;c.lineWidth=1.1;c.beginPath();c.moveTo(.6,-15);c.lineTo(1.6,-11.6);c.lineTo(-.3,-11.2);c.stroke();
    ldMouth(-6.4,F);

    /* front hair: layered fringe, side locks, teal streak, shine */
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
    function cup(sd){
      ldPart(new Path2D('M'+(sd*15)+' -30 C'+(sd*25)+' -31 '+(sd*25)+' -12 '+(sd*15)+' -13 Z'),LD.jk,LD.jkSh,{lw:1.2,hl:LD.jkHL});
      c.strokeStyle=LD.gold;c.lineWidth=1.6;c.beginPath();c.ellipse(sd*19.5,-21.5,2.6,5,0,0,Math.PI*2);c.stroke();
      c.fillStyle='rgba(47,227,208,.55)';c.beginPath();c.ellipse(sd*19.5,-21.5,1.2,3,0,0,Math.PI*2);c.fill();
    }
    cup(-1);cup(1);
    c.restore();
    c.restore();
  }
