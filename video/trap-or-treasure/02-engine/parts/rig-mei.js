/* rig-mei: Mei vector parts, poses and girl(). Lifted from reference/mei-reel.html (lines 395-602), then extended: env.look 'work' (Mei, first-job outfit) and 'rex' (friend variant), a 'shock' face. */
  /* ================= the girl: vector parts ================= */
  var V={
    torso:new Path2D('M-9 0 C-11 -9 -11.5 -22 -8.5 -31 C-5.5 -35 5.5 -35 8.5 -31 C11.5 -22 11 -9 9.5 0 C4 2.5 -4 2.5 -9 0 Z'),
    hemB:new Path2D('M-9 -3 C-4 -0.5 4 -0.5 9.5 -3 L9.5 0 C4 2.5 -4 2.5 -9 0 Z'),
    collar:new Path2D('M-4 -34 L6.5 -34 L3 -25 Z'),
    bow:new Path2D('M3 -27 L10 -30.5 L10 -23.5 Z M3 -27 L-4 -30.5 L-4 -23.5 Z'),
    knot:new Path2D('M1.2 -27 A1.9 1.9 0 1 0 4.9 -27 A1.9 1.9 0 1 0 1.2 -27 Z'),
    open:new Path2D('M3 -24 C3.5 -15 3.5 -8 3 -2'),
    skirt:new Path2D('M-9.5 -3 L10.5 -3 C13.5 5 14.5 11 15.5 17 C8 20 -8 20 -14.5 17 C-12.5 11 -10.5 5 -9.5 -3 Z'),
    pleats:new Path2D('M-4 -2 L-6.5 18 M2 -2 L2.5 19 M8 -2 L11 18'),
    pack:new Path2D('M-9 -31 C-19 -31 -22.5 -25 -22.5 -13 C-22.5 -5 -18 -0.5 -9 -1.5 Z'),
    packZip:new Path2D('M-20 -22 C-17 -24.5 -13 -24.5 -10 -22'),
    strap:new Path2D('M-3.5 -33 C-6 -20 -7 -10 -8.5 -2'),
    thigh:new Path2D('M-5 -3 C-5.8 7 -5.4 16 -4.4 24 L4.6 24 C5.5 16 6 7 5 -3 Z'),
    shin:new Path2D('M-4.4 0 C-4.2 8 -3.9 16 -3.6 23 L3.9 23 C4.1 16 4.4 8 4.6 0 Z'),
    sock:new Path2D('M-4.3 12 C-4.2 17 -4 20 -3.8 23 L4.2 23 C4.4 20 4.5 17 4.5 12 Z'),
    shoe:new Path2D('M-4.2 -2 L4.6 -2 C5 2 11 2.5 13.5 6 C14 8.5 12 9 9.5 9 L-4.6 9 C-5.4 5 -5 1 -4.2 -2 Z'),
    sole:new Path2D('M-4.6 6.2 L10.5 6.2 C13 6.4 14 7 13.9 7.8 C13.8 9 12.2 9 9.5 9 L-4.6 9 Z'),
    sleeve:new Path2D('M-4.2 -2 C-5 4 -4.8 9 -4 12.5 L4.2 12.5 C5 9 5.4 4 4.6 -2 C2 -5 -2 -5 -4.2 -2 Z'),
    upSkin:new Path2D('M-3.4 10 L3.6 10 C3.7 14 3.5 16 3.4 17.8 L-3.2 17.8 C-3.4 16 -3.5 14 -3.4 10 Z'),
    fore:new Path2D('M-3.6 -1 C-3.9 6 -3.5 12 -2.8 17 L3.2 17 C3.7 12 4 6 3.7 -1 Z'),
    hand:new Path2D('M-3.2 16 C-4.8 20 -4 24 0 25 C4 24 5 20 3.2 16 Z'),
    neck:new Path2D('M-3 9 L-3 -3 L6.5 -3 L6.5 9 Z'),
    face:new Path2D('M-9 -22 C-10 -10 -8 -4 -2 -0.5 C4 2 10 1 13 -3.5 C15.5 -7 16.5 -12 15.5 -18 C14.5 -27 6 -31 -2 -30 C-7 -29 -9 -26 -9 -22 Z'),
    hairBack:new Path2D('M-10 -20 C-17 -32 -10 -44 2 -45 C14 -47 24 -40 23 -27 C21 -35 12 -38 4 -35 C-2 -31 -8 -27 -10 -20 Z'),
    backHead:new Path2D('M-9 -28 C-16 -26 -17 -12 -12 -4 C-9 0 -4 2 -2 0 C-8 -6 -9 -14 -9 -22 Z'),
    sideLock:new Path2D('M-9.5 -22 C-12 -12 -11 -2 -7 5 C-6 -2 -5.5 -12 -4 -19 Z'),
    tail:new Path2D('M-12 -35 C-24 -36 -35 -28 -41 -12 C-45 -1 -43 11 -36 21 C-38 9 -34 1 -30 -5 C-26 -13 -19 -20 -11 -27 Z'),
    rib:new Path2D('M-12 -33 L-19 -38.5 L-19 -27.5 Z M-12 -33 L-5 -38.5 L-5 -27.5 Z'),
    bangs:new Path2D('M-9.5 -23 C-10 -35 4 -40 15 -35 C19.5 -32 19 -27 17.5 -21 C14 -25 11 -26 8 -21 C6 -26 2 -27 -1 -22 C-3 -25 -7 -24 -9.5 -23 Z'),
    hairHL:new Path2D('M-3 -38 C3 -42 11 -41 15 -36'),
    browShade:new Path2D('M-9 -28 L17 -28 L17 -20.5 C9 -22 -2 -22 -9 -21 Z'),
    eyeN:new Path2D('M0.3 -14 C1.8 -18.5 7 -18.5 9.2 -13.5 C7 -9.3 2.5 -9.3 0.3 -14 Z'),
    eyeF:new Path2D('M10.8 -13.6 C11.6 -17.4 15.4 -17.4 16.2 -13 C15.2 -9.6 12 -9.6 10.8 -13.6 Z'),
    lidN:new Path2D('M-1.6 -15.6 L0.3 -14 C1.8 -18.5 7 -18.5 9.2 -13.5'),
    lidF:new Path2D('M10.8 -13.6 C11.6 -17.4 15.4 -17.4 16.2 -13'),
    nose:new Path2D('M14.6 -9 L15.9 -7.6 L14.4 -7.3'),
    blush:new Path2D('M3 -7.5 A3 1.8 0 1 0 9 -7.5 A3 1.8 0 1 0 3 -7.5 Z'),
    tear:new Path2D('M5.5 -9 C3.8 -6 4.2 -3.8 5.5 -3.8 C6.8 -3.8 7.2 -6 5.5 -9 Z'),
    hips:new Path2D('M-9.5 -3 L10.5 -3 C11 3 10.5 8 9.5 11 L-8.5 11 C-9.5 8 -10 3 -9.5 -3 Z'),
    badge:new Path2D('M-0.2 -18 L6.6 -18 L6.6 -10 L-0.2 -10 Z'),
    bangsR:new Path2D('M-9.5 -23 C-11 -35 -2 -45 9 -44 L11 -50 L15 -43 L21 -45 L19 -37 L24 -32 L17.5 -25 C14 -28 11 -28 8 -23 C6 -28 2 -29 -1 -23 C-3 -27 -7 -26 -9.5 -23 Z'),
    hpBand:new Path2D('M-5 -17 C-15 -30 -9 -49 8 -49 C21 -49 25 -37 23 -28'),
    hpCup:new Path2D('M-5 -22 C-10 -22 -11 -8 -5 -6 C1 -6 2 -22 -5 -22 Z')
  };
  var BROWS={
    calm:['M-0.5 -20.5 C2.5 -22.5 6.5 -22 9 -20','M11 -20 C13 -21.5 15 -20.8 16.3 -19.5'],
    sad:['M-0.5 -19.5 L9 -21.8','M11 -21.8 L16.3 -19.8'],
    resolve:['M-0.5 -21.5 L9 -19.4','M11 -19.4 L16.3 -21.3'],
    shout:['M-0.5 -21.5 L9 -18.6','M11 -18.6 L16.3 -20.8'],
    joy:['M-0.5 -21 C2.5 -23.5 6.5 -23 9 -21','M11 -21 C13 -22.5 15 -22 16.3 -20.5'],
    shock:['M-0.5 -22.5 C2.5 -25.5 6.5 -25 9 -22.5','M11 -22.5 C13 -24.5 15 -24 16.3 -22.8']
  };
  var MOUTH={
    sad:['M8.5 -4.4 C10 -6.4 12 -6.4 13.5 -4.8',0],
    calm:['M8 -6 C10 -4.6 12 -4.8 13.5 -6.3',0],
    resolve:['M8.5 -5.6 C10.5 -5 12 -5 13.5 -5.8',0],
    shout:['M7.5 -8 C8.5 -2.5 13 -2.5 14 -8.5 C11 -9.5 9.5 -9.5 7.5 -8 Z',1],
    joy:['M7 -8.5 C8.5 -3 13.5 -3.5 14.5 -9 Z',1],
    shock:['M8.5 -7 C8.5 -3.2 12.8 -3.2 12.8 -7 C12.8 -9.6 8.5 -9.6 8.5 -7 Z',1]
  };
  var PAL_P=null;
  function pal(d,w,rim,mono,look){
    if(mono)return{skin:'#fff',sShade:'#fff',hair:'#000',hShade:'#000',hHL:'#fff',blouse:'#fff',bShade:'#fff',card:'#111',cShade:'#000',cDeep:'#000',skirt:'#000',kShade:'#000',shoe:'#000',sole:'#fff',sock:'#fff',sockSh:'#fff',pack:'#000',pShade:'#000',ribbon:'#fff',rShade:'#ccc',sclera:'#fff',iris:'#000',iris2:'#555',ink:'#000',rim:'#fff',lw:1.7};
    function T(h){return mh(mh(h,'#161c3c',d*.6),'#ffb27a',w*.3);}
    var P=pal0(T,d,w,rim);
    if(look==='work'){P.jeans=T('#3d63a8');P.jShade=T('#27407a');P.shoe=T('#f4f7ff');P.sole=T('#ff6b6b');P.lan=T('#e63d5c');}
    if(look==='rex'){P.jeans=T('#2f3b63');P.jShade=T('#1c2646');P.shoe=T('#f3c969');P.sole=T('#f4f7ff');P.card=T('#ff6b6b');P.cShade=T('#c9443f');P.cDeep=T('#9a2f2c');P.hair=T('#3b2a24');P.hShade=T('#1e1411');P.hHL=T('#8a6a58');P.blouse=T('#fdf6ec');P.bShade=T('#d8cdb8');}
    return P;
  }
  function pal0(T,d,w,rim){
    return{skin:T('#f7d3bb'),sShade:T('#df9f8e'),hair:T('#2b1e33'),hShade:T('#150f1f'),hHL:T('#8f78c8'),
      blouse:T('#ffffff'),bShade:T('#cdd3ea'),card:T('#f3c969'),cShade:T('#c99a3a'),cDeep:T('#a67a28'),
      skirt:T('#2e3b78'),kShade:T('#1d2650'),shoe:T('#6a4333'),sole:T('#efe6dc'),sock:T('#ffffff'),sockSh:T('#cdd3ea'),
      pack:T('#ff7a59'),pShade:T('#c9502f'),ribbon:T('#e63d5c'),rShade:T('#a82440'),
      sclera:T('#fbece6'),iris:T('#6b3f33'),iris2:T('#c28a62'),ink:T('#1a1226'),rim:rim,lw:1};
  }
  function part(path,base,shade,rot,noRim){
    var C=PAL_P,cs=Math.cos(rot),sn=Math.sin(rot);
    var dx=2.4*cs-1.8*sn,dy=-2.4*sn-1.8*cs;
    c.fillStyle=shade;c.fill(path);
    c.save();c.clip(path);
    c.translate(dx,dy);c.fillStyle=base;c.fill(path);
    c.restore();
    if(!noRim){
      c.save();c.clip(path);
      c.translate(-.75*dx,-.75*dy);
      c.strokeStyle=C.rim;c.lineWidth=1.5;c.stroke(path);
      c.restore();
    }
    c.strokeStyle=C.ink;c.lineWidth=C.lw;c.lineJoin='round';c.stroke(path);
  }
  function line(path,col,w){c.strokeStyle=col;c.lineWidth=w;c.lineCap='round';c.stroke(path);}
  function smoothPath(a,b){
    var pa=new Path2D(),n=a.length,k;
    pa.moveTo(a[0][0],a[0][1]);
    for(k=1;k<n-1;k++)pa.quadraticCurveTo(a[k][0],a[k][1],(a[k][0]+a[k+1][0])/2,(a[k][1]+a[k+1][1])/2);
    pa.lineTo(a[n-1][0],a[n-1][1]);pa.lineTo(b[n-1][0],b[n-1][1]);
    for(k=n-2;k>0;k--)pa.quadraticCurveTo(b[k][0],b[k][1],(b[k][0]+b[k-1][0])/2,(b[k][1]+b[k-1][1])/2);
    pa.lineTo(b[0][0],b[0][1]);pa.closePath();
    return pa;
  }

  /* poses */
  function Kwalk(f,amp,face,slump){
    var ph=f*Math.PI/4,s=Math.sin(ph);
    return{lean:slump?.12:.05,ht:slump?.3:-.02,nA:[.85*amp*s,-.3],fA:[-.85*amp*s,-.25],nL:[-amp*s,.9*amp*Math.max(0,Math.cos(ph+.6))],fL:[amp*s,.9*amp*Math.max(0,-Math.cos(ph+.6))],face:face||'calm',gz:slump?[.6,1.5]:[.8,0],lid:slump?2.5:0,wind:.14};
  }
  function Krun(f){
    var ph=f*Math.PI/3,s=Math.sin(ph);
    return{lean:.3,ht:-.04,nA:[1.0*s,-1.3],fA:[-1.0*s,-1.3],nL:[-.95*s,1.3*Math.max(0,Math.cos(ph+.5))],fL:[.95*s,1.3*Math.max(0,-Math.cos(ph+.5))],face:'resolve',gz:[1,0],lid:0,wind:.4};
  }
  var POSE={
    sit:{lean:.14,ht:.12,nA:[-.3,-.95],fA:[-.15,-.8],nL:[-1.55,1.55],fL:[-1.5,1.5],face:'calm',gz:[.7,1.2],lid:1.5,wind:.05,nobag:1},
    sitR:{lean:.1,ht:.02,nA:[-.3,-.95],fA:[-.15,-.8],nL:[-1.55,1.55],fL:[-1.5,1.5],face:'resolve',gz:[1,.5],lid:0,wind:.05,nobag:1},
    slump:{lean:.14,ht:.34,nA:[-.08,-.12],fA:[.04,-.1],nL:[.02,-.02],fL:[-.02,.02],face:'sad',gz:[.6,1.6],lid:2.5,wind:.08},
    help:{lean:.75,ht:.1,nA:[-1.3,-.35],fA:[-1.1,-.3],nL:[-.85,1.5],fL:[-.6,1.2],face:'resolve',gz:[1,.4],lid:0,wind:.2},
    calm:{lean:0,ht:-.05,nA:[-.1,-.2],fA:[.05,-.1],nL:[.03,-.03],fL:[-.03,.04],face:'calm',gz:[1,0],lid:0,wind:.12},
    joy:{lean:0,ht:-.05,nA:[-.1,-.2],fA:[.05,-.1],nL:[.03,-.03],fL:[-.03,.04],face:'joy',gz:[0,0],lid:0,wind:.12},
    vic:{lean:-.05,ht:-.18,nA:[2.7,.2],fA:[-2.5,-.3],nL:[-.35,.3],fL:[.4,-.12],face:'joy',gz:[0,0],lid:0,wind:.3},
    fist:{lean:.06,ht:-.14,nA:[-1.55,-1.45],fA:[.1,-.3],nL:[-.28,.25],fL:[.32,-.1],face:'shout',gz:[1,-.3],lid:0,wind:.3}
  };

  function girl(K,f,env){
    var C=PAL_P=pal(env.d||0,env.w||0,env.rim||'#fff3d0',env.mono,env.look),odd=f%2,i,pants=env.look==='work'||env.look==='rex',rex=env.look==='rex';
    function legDrop(a){return 24*Math.cos(a[0])+32*Math.cos(a[0]+a[1]);}
    var hipH=Math.max(legDrop(K.nL),legDrop(K.fL))+(odd?.5:0);
    var hop=env.hop||0;
    if(!env.mono){c.fillStyle='rgba(0,0,0,.35)';c.beginPath();c.ellipse(2,0,28-hop*.6,4.5,0,0,6.3);c.fill();}
    c.save();c.translate(0,-hop);

    function leg(hx,a,far){
      c.save();c.translate(hx,-hipH);c.rotate(a[0]);
      part(V.thigh,pants?(far?C.jShade:C.jeans):(far?C.sShade:C.skin),pants?C.jShade:C.sShade,a[0],true);
      c.translate(0,24);c.rotate(a[1]);
      part(V.shin,pants?(far?C.jShade:C.jeans):(far?C.sShade:C.skin),pants?C.jShade:C.sShade,a[0]+a[1],true);
      if(!pants)part(V.sock,far?C.sockSh:C.sock,C.sockSh,a[0]+a[1],true);
      c.translate(0,23);c.rotate(-(a[0]+a[1]));
      part(V.shoe,C.shoe,C.hShade,0,true);
      part(V.sole,C.sole,C.sole,0,true);
      c.restore();
    }
    leg(4,K.fL,true);
    leg(-3,K.nL,false);

    function arm(sx,sy,a,far,lean){
      c.save();c.translate(sx,sy);c.rotate(a[0]);
      part(V.upSkin,far?C.sShade:C.skin,C.sShade,lean+a[0],true);
      part(V.sleeve,far?C.cShade:C.card,far?C.cDeep:C.cShade,lean+a[0],far);
      c.translate(0,17);c.rotate(a[1]);
      part(V.fore,far?C.sShade:C.skin,C.sShade,lean+a[0]+a[1],far);
      part(V.hand,far?C.sShade:C.skin,C.sShade,lean+a[0]+a[1],far);
      c.restore();
    }

    c.save();c.translate(0,-hipH);c.rotate(K.lean);
    if(!K.nobag&&env.bag!==false)part(V.pack,C.pack,C.pShade,K.lean);
    arm(7,-31,K.fA,true,K.lean);
    c.save();c.rotate(Math.sin(f*1.3)*.05+(K.skirtSw||0));
    if(pants)part(V.hips,C.jeans,C.jShade,K.lean,true);
    else{part(V.skirt,C.skirt,C.kShade,K.lean,true);
    line(V.pleats,C.kShade,.9);}
    c.restore();
    part(V.torso,C.card,C.cShade,K.lean);
    part(V.hemB,C.cShade,C.cDeep,K.lean,true);
    part(V.collar,C.blouse,C.bShade,K.lean,true);
    line(V.open,C.cDeep,.9);
    if(!pants){part(V.bow,C.ribbon,C.rShade,K.lean,true);
    part(V.knot,C.ribbon,C.rShade,K.lean,true);}
    if(env.look==='work'){line(new Path2D('M-1.5 -33 L2.6 -18'),C.lan,1.5);line(new Path2D('M6.6 -33 L3.4 -18'),C.lan,1.5);part(V.badge,'#ffffff','#cdd3ea',K.lean,true);}
    if(!K.nobag&&env.bag!==false)line(V.strap,C.pShade,2.6);

    c.save();c.translate(0,-37);c.rotate(K.ht-K.lean);
    var hr=K.ht;
    part(V.neck,C.sShade,C.sShade,hr,true);
    part(V.backHead,C.hShade,C.hShade,hr,true);
    c.save();c.translate(-12,-33);c.rotate(-.1+(K.wind||.1)*(1+Math.sin(f*1.4)*.6));c.translate(12,33);
    if(!rex)part(V.tail,C.hair,C.hShade,hr);
    c.restore();
    part(V.hairBack,C.hair,C.hShade,hr);
    if(!rex)part(V.rib,C.ribbon,C.rShade,hr,true);
    part(V.face,C.skin,C.sShade,hr);
    c.save();c.clip(V.face);c.globalAlpha=.25;c.fillStyle=C.ink;c.fill(V.browShade);c.restore();

    var bro=BROWS[K.face],mo=MOUTH[K.face],gx=K.gz[0],gy=K.gz[1];
    function eye(shape,lid,cx,cy,rx,ry){
      c.fillStyle=C.sclera;c.fill(shape);
      c.save();c.clip(shape);
      c.fillStyle=C.iris;c.beginPath();c.ellipse(cx+gx*.6,cy+gy*.6,rx,ry,0,0,6.3);c.fill();
      c.fillStyle=C.iris2;c.beginPath();c.ellipse(cx+gx*.6,cy+gy*.6+ry*.45,rx*.75,ry*.45,0,0,6.3);c.fill();
      c.fillStyle=C.ink;c.beginPath();c.ellipse(cx+gx*.6,cy+gy*.6,rx*(K.face==='shock'?.28:.45),ry*(K.face==='shock'?.36:.55),0,0,6.3);c.fill();
      c.fillStyle='#fff';c.beginPath();c.arc(cx+gx*.6+rx*.35,cy+gy*.6-ry*.35,rx*.38,0,6.3);c.fill();
      c.beginPath();c.arc(cx+gx*.6-rx*.3,cy+gy*.6+ry*.45,rx*.16,0,6.3);c.fill();
      if(K.lid){c.fillStyle=C.skin;c.fillRect(cx-6,cy-8,14,8+K.lid-1.5);}
      c.restore();
      c.strokeStyle=C.ink;c.lineWidth=.35;c.globalAlpha=.5;c.stroke(shape);c.globalAlpha=1;
      line(lid,C.ink,1.7);
    }
    if(K.face==='joy'){
      line(new Path2D('M0.5 -12.5 C2 -16.8 7 -16.8 9 -12.5'),C.ink,1.7);
      line(new Path2D('M11 -12.5 C12 -15.8 15 -15.8 16.3 -12.3'),C.ink,1.7);
    }else{
      eye(V.eyeN,V.lidN,4.8,-13.6,3.7,4.7);
      eye(V.eyeF,V.lidF,13.6,-13.3,2.5,4.1);
    }
    line(new Path2D(bro[0]),C.hair,1.5);
    line(new Path2D(bro[1]),C.hair,1.3);
    line(V.nose,C.sShade,.8);
    if(K.face==='joy'||K.face==='shout'||K.face==='sad'){c.fillStyle='rgba(255,110,140,.32)';c.fill(V.blush);}
    if(K.face==='sad'){c.fillStyle='rgba(170,220,255,.9)';c.fill(V.tear);}
    var mp=new Path2D(mo[0]);
    if(mo[1]){c.fillStyle=env.mono?'#000':'#5a1424';c.fill(mp);c.strokeStyle=C.ink;c.lineWidth=.8;c.stroke(mp);}
    else line(mp,C.ink,1.1);
    part(V.sideLock,C.hair,C.hShade,hr,true);
    part(rex?V.bangsR:V.bangs,C.hair,C.hShade,hr);
    if(rex){line(V.hpBand,'#1c2550',3.4);part(V.hpCup,'#ff6b6b','#c9443f',hr,true);}
    line(V.hairHL,C.hHL,1.4);
    c.restore();

    arm(-4,-31,K.nA,false,K.lean);
    c.restore();
    c.restore();
  }

  function figAt(x,y,s,K,f,env){
    c.save();c.translate(x,y);c.scale(s,s);girl(K,f,env);c.restore();
  }
