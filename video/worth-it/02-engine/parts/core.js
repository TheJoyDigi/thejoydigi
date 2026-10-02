/* core: helpers, fonts and text effects. Lifted unchanged from reference/mei-reel.html (lines 127-303, DOM vars removed). */

  function clamp(x,a,b){return x<a?a:x>b?b:x;}
  function sm(x){x=clamp(x,0,1);return x*x*(3-2*x);}
  function fract(x){return x-Math.floor(x);}
  function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;var t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
  function hex(h){return[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];}
  function mix(a,b,p){var A=hex(a),B=hex(b);return 'rgb('+Math.round(A[0]+(B[0]-A[0])*p)+','+Math.round(A[1]+(B[1]-A[1])*p)+','+Math.round(A[2]+(B[2]-A[2])*p)+')';}
  function mh(a,b,p){var A=hex(a),B=hex(b);function h(v){v=Math.round(v);return('0'+v.toString(16)).slice(-2);}return '#'+h(A[0]+(B[0]-A[0])*p)+h(A[1]+(B[1]-A[1])*p)+h(A[2]+(B[2]-A[2])*p);}
  function rr(i,s){return fract(Math.sin(i*12.9898+s*78.233)*43758.5453);}

  var F_T='"Dela Gothic One","Hiragino Sans","Yu Gothic","Noto Sans JP",sans-serif';
  var F_H='"Caveat","Segoe Print","Bradley Hand",cursive';
  var F_U='"Figtree","Segoe UI",system-ui,sans-serif';
  var TS={fill:'#fff6e0',stroke:'#1c2550',shadow:'#ff7a59'};
  /* ================= text effects ================= */
  function kin(str,x,y,size,tt,o){
    if(tt<0)return;
    o=o||{};
    var fam=o.fam||F_T,stag=o.stag||.04,sp=o.sp||0,n=str.length,ws=[],tot=0,i;
    c.save();
    c.font=(o.wt||'400')+' '+size+'px '+fam;c.textBaseline='alphabetic';c.textAlign='center';c.lineJoin='round';
    for(i=0;i<n;i++){ws[i]=c.measureText(str[i]).width+sp;tot+=ws[i];}
    tot-=sp;
    var cx=o.align==='l'?x:x-tot/2;
    for(i=0;i<n;i++){
      var adv=ws[i];
      if(str[i]!==' '){
        var li=tt-i*stag;
        if(li>0){
          var ft=clamp(li/.38,0,1),e=1+2.70158*Math.pow(ft-1,3)+1.70158*Math.pow(ft-1,2);
          var al=clamp(li/.1,0,1),dy=(1-ft)*size*.7,r=rr(i,size)*2-1,rot=r*(o.rot||.25)*(1-ft);
          if(o.outAt!=null){
            var xo=tt-o.outAt-i*stag*.7;
            if(xo>0){var ex=clamp(xo/.45,0,1);al*=1-ex;dy-=ex*ex*size*1.6;rot+=r*ex*.8;}
          }
          if(al>0.01){
            c.save();
            c.globalAlpha=al*(o.alpha==null?1:o.alpha);
            c.translate(cx+(adv-sp)/2,y+dy);c.rotate(rot);c.scale(e,e);
            var lw=size*(o.sw||.14);
            c.lineWidth=lw;
            c.strokeStyle=o.shadow||TS.shadow;c.strokeText(str[i],size*.05,size*.07);
            c.strokeStyle=o.stroke||TS.stroke;c.strokeText(str[i],0,0);
            c.fillStyle=o.fill||TS.fill;c.fillText(str[i],0,0);
            c.restore();
          }
        }
      }
      cx+=adv;
    }
    c.restore();
  }

  function bounceH(tt,H0,g,e){
    if(tt<0)return H0;
    var t1=Math.sqrt(2*H0/g);
    if(tt<t1)return H0-.5*g*tt*tt;
    var v=g*t1*e,rem=tt-t1;
    for(var k=0;k<6;k++){
      var dur=2*v/g;
      if(rem<dur)return v*rem-.5*g*rem*rem;
      rem-=dur;v*=e;
    }
    return 0;
  }
  function drop(str,x,y,size,tt,o){
    if(tt<0)return;
    o=o||{};
    var n=str.length,ws=[],tot=0,i;
    c.save();
    c.font='400 '+size+'px '+F_T;c.textBaseline='alphabetic';c.textAlign='center';c.lineJoin='round';
    for(i=0;i<n;i++){ws[i]=c.measureText(str[i]).width;tot+=ws[i];}
    var cx=x-tot/2;
    for(i=0;i<n;i++){
      var adv=ws[i];
      if(str[i]!==' '){
        var li=tt-i*.06,hh=bounceH(li,150+rr(i,3)*60,1100,.38);
        if(li>0||true){
          var al=li<0?0:1;
          if(o.outAt!=null){var xo=tt-o.outAt;if(xo>0)al*=1-clamp(xo/.5,0,1);}
          if(al>0.01){
            var r=rr(i,9)*2-1,spin=r*1.6*clamp(hh/150,0,1)+r*.12;
            c.save();c.globalAlpha=al;
            c.translate(cx+adv/2,y-hh);c.rotate(spin);
            c.lineWidth=size*.14;
            c.strokeStyle=TS.shadow;c.strokeText(str[i],size*.05,size*.07);
            c.strokeStyle=TS.stroke;c.strokeText(str[i],0,0);
            c.fillStyle=TS.fill;c.fillText(str[i],0,0);
            c.restore();
          }
        }
      }
      cx+=adv;
    }
    c.restore();
  }

  function hand(str,x,y,size,tt,dur,o){
    if(tt<0)return 0;
    o=o||{};
    c.save();
    c.font='700 '+size+'px '+F_H;c.textBaseline='alphabetic';c.textAlign='left';
    var tw=c.measureText(str).width,p=sm(tt/dur);
    c.beginPath();c.rect(x-6,y-size*1.1,(tw+12)*p,size*1.6);c.clip();
    c.shadowColor=o.glow||'rgba(255,200,120,.7)';c.shadowBlur=8;
    c.fillStyle=o.fill||'#ffe9b8';
    c.fillText(str,x,y+Math.sin(tt*9)*.6);
    c.restore();
    if(p>0&&p<1){c.save();c.fillStyle='rgba(255,240,200,.9)';c.beginPath();c.arc(x+tw*p,y-size*.25,3,0,6.3);c.fill();c.restore();}
    return tw;
  }
  function underline(x1,x2,y,tt,dur,col,w){
    if(tt<0)return;
    var p=sm(tt/dur),n=24,i;
    c.save();c.strokeStyle=col;c.lineWidth=w;c.lineCap='round';c.lineJoin='round';
    c.beginPath();
    for(i=0;i<=n*p;i++){
      var u=i/n,px=x1+(x2-x1)*u,py=y+Math.sin(u*9)*2.4;
      if(i===0)c.moveTo(px,py);else c.lineTo(px,py);
    }
    c.stroke();c.restore();
  }

  function slam(str,x,y,size,tt,o){
    if(tt<0)return;
    o=o||{};
    var d=.14,k=clamp(tt/d,0,1),sc=1+(1-k)*(1-k)*(o.from||2.6);
    var shake=tt<.5?Math.sin(tt*90)*(1-tt/.5)*(o.shake==null?4:o.shake):0;
    var al=clamp(tt/.05,0,1);
    if(o.outAt!=null){var xo=tt-o.outAt;if(xo>0)al*=1-clamp(xo/.3,0,1);}
    if(al<.01)return;
    c.save();
    c.globalAlpha=al;
    c.font=(o.wt||'400')+' '+size+'px '+(o.fam||F_T);c.textAlign='center';c.textBaseline='alphabetic';c.lineJoin='round';
    c.translate(x+shake,y+(o.sink||0)*(1-k));c.scale(sc,sc);
    var tw=c.measureText(str).width;
    var fill=o.fill||TS.fill;
    if(o.shine){
      var sp=(tt*.9)%1.8-.4,g=c.createLinearGradient(-tw/2,0,tw/2,0);
      g.addColorStop(0,fill);g.addColorStop(clamp(sp-.12,0,1),fill);g.addColorStop(clamp(sp,0,1),'#ffffff');g.addColorStop(clamp(sp+.12,0,1),fill);g.addColorStop(1,fill);
      fill=g;
    }
    c.lineWidth=size*(o.sw||.12);
    c.strokeStyle=o.shadow||TS.shadow;c.strokeText(str,size*.05,size*.07);
    c.strokeStyle=o.stroke||TS.stroke;c.strokeText(str,0,0);
    c.fillStyle=fill;c.fillText(str,0,0);
    c.restore();
    if(tt>.06&&tt<.6){
      var rp=(tt-.06)/.54;
      c.save();c.strokeStyle='rgba(255,255,255,'+(1-rp)*.7+')';c.lineWidth=3*(1-rp)+1;
      c.beginPath();c.ellipse(x,y-size*.3,60+rp*300,20+rp*90,0,0,6.3);c.stroke();c.restore();
    }
  }

  function speedLines(t,cx,cy,amt,col,r0min){
    if(amt<.02)return;
    var r2=rng(Math.floor(t*12)*977+3),k;
    for(k=0;k<70;k++){
      var an=r2()*6.2832,r0=(r0min||130)+r2()*60,r1=r0+120+r2()*220,lw=.6+r2()*1.6,al=.15+.45*amt*r2();
      c.strokeStyle=col.replace('A',al);c.lineWidth=lw;
      c.beginPath();c.moveTo(cx+Math.cos(an)*r0,cy+Math.sin(an)*r0);c.lineTo(cx+Math.cos(an)*r1,cy+Math.sin(an)*r1);c.stroke();
    }
  }

  function swipe(t,t0,col){
    var p=(t-t0+.2)/.4;
    if(p<=0||p>=1)return;
    var xc=-460+(W+920)*p,hw=420;
    c.save();
    c.fillStyle=col;
    c.beginPath();c.moveTo(xc-hw+70,-10);c.lineTo(xc+hw+70,-10);c.lineTo(xc+hw-70,H+10);c.lineTo(xc-hw-70,H+10);c.closePath();c.fill();
    c.fillStyle='#fff6e0';
    c.beginPath();c.moveTo(xc+hw+70,-10);c.lineTo(xc+hw+84,-10);c.lineTo(xc+hw-56,H+10);c.lineTo(xc+hw-70,H+10);c.closePath();c.fill();
    c.restore();
  }

