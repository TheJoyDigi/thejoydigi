/* transport: canvas, play/scrub, scene chips, live generative sound, font preload. Exposes window.TT for tests. */

  var playB=document.getElementById('play'),restartB=document.getElementById('restart');
  var scrub=document.getElementById('scrub'),timeEl=document.getElementById('time');
  var sndChk=document.getElementById('snd'),loopChk=document.getElementById('loop');
  var scEl=document.getElementById('scenes'),scBtns=[];

  function fmt(x){x=Math.floor(x);return Math.floor(x/60)+':'+('0'+x%60).slice(-2);}
  function sceneIndex(tt){var k=0;for(var j=0;j<SCENES.length;j++)if(tt>=SCENES[j][0])k=j;return k;}

  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var q=/[?&]t=([\d.]+)/.exec(location.search);
  var t=q?parseFloat(q[1]):(reduce?3:0),playing=!reduce&&!q,dirty=true,last=performance.now(),actx=null;

  /* sound: schedule the whole track from the current time; restart on seek */
  function audioStop(){if(actx){try{actx.close();}catch(e){}actx=null;}}
  function audioStart(){
    audioStop();
    if(!sndChk.checked||!playing)return;
    try{
      actx=new (window.AudioContext||window.webkitAudioContext)();
      if(actx.resume)actx.resume();
      cues(makeSynth(actx,actx.destination,t,DUR));
    }catch(e){actx=null;}
  }
  function syncBtn(){playB.textContent=playing?'Pause':(t>=DUR?'Replay':'Play');}
  function seek(v){t=clamp(v,0,DUR-.001);playing=true;dirty=true;last=performance.now();syncBtn();audioStart();}

  SCENES.forEach(function(s){
    var b=document.createElement('button');
    b.type='button';b.className='scene';
    b.innerHTML='<b>'+fmt(s[0])+'</b><span>'+s[1]+'</span><small>'+s[2]+'</small>';
    b.addEventListener('click',function(){seek(s[0]);});
    scEl.appendChild(b);scBtns.push(b);
  });

  playB.addEventListener('click',function(){
    if(t>=DUR){t=0;playing=true;}else playing=!playing;
    last=performance.now();dirty=true;syncBtn();
    if(playing)audioStart();else audioStop();
  });
  restartB.addEventListener('click',function(){seek(0);});
  scrub.addEventListener('input',function(){t=parseFloat(scrub.value);dirty=true;if(playing)audioStart();syncBtn();});
  scrub.addEventListener('change',function(){if(playing)audioStart();});
  sndChk.addEventListener('change',function(){if(sndChk.checked&&playing)audioStart();else audioStop();});
  syncBtn();

  function frame(now){
    var dt=Math.min(.1,(now-last)/1000);last=now;
    if(playing){
      t+=dt;dirty=true;
      if(t>=DUR){
        if(loopChk.checked){t=0;audioStart();}else{t=DUR;playing=false;audioStop();syncBtn();}
      }
    }
    if(dirty){
      dirty=false;
      draw(Math.min(t,DUR-.001));
      scrub.value=t;timeEl.textContent=fmt(t)+' / '+fmt(DUR);
      var si=sceneIndex(t);
      for(var j=0;j<scBtns.length;j++){if(j===si)scBtns[j].setAttribute('aria-current','true');else scBtns[j].removeAttribute('aria-current');}
    }
    requestAnimationFrame(frame);
  }
  if(document.fonts&&document.fonts.load){
    Promise.all([
      document.fonts.load('400 48px "Dela Gothic One"','YOU PAID $30. DEBT DROPPED 0123456789'),
      document.fonts.load('700 40px "Caveat"','Easy. Pay the minimum.'),
      document.fonts.load('700 11px "Figtree"','CURRENT BALANCE'),
      document.fonts.load('400 20px "Bowlby One"','THE X-RAY'),
      document.fonts.load('400 20px "Pacifico"','Level up!'),
      document.fonts.load('700 26px "Fraunces"','The Joy Digi'),
      document.fonts.load('500 10px "DM Sans"','Trap or Treasure is a production')
    ]).then(function(){dirty=true;}).catch(function(){});
  }
  function setScale(s){SC=s;cv.width=Math.round(W*SC);cv.height=Math.round(H*SC);}
  /* offline render of the whole soundtrack to a 16-bit stereo WAV (base64), for the MP4 pipeline */
  async function renderAudio(sr){
    var ctx=new OfflineAudioContext(2,Math.ceil(sr*DUR),sr);
    cues(makeSynth(ctx,ctx.destination,0,DUR,0));
    var buf=await ctx.startRendering(),n=buf.length,ch=buf.numberOfChannels,dv=new DataView(new ArrayBuffer(44+n*ch*2)),i,k,o=44;
    function str(p,t){for(var j=0;j<t.length;j++)dv.setUint8(p+j,t.charCodeAt(j));}
    str(0,'RIFF');dv.setUint32(4,36+n*ch*2,true);str(8,'WAVE');str(12,'fmt ');dv.setUint32(16,16,true);dv.setUint16(20,1,true);dv.setUint16(22,ch,true);
    dv.setUint32(24,sr,true);dv.setUint32(28,sr*ch*2,true);dv.setUint16(32,ch*2,true);dv.setUint16(34,16,true);str(36,'data');dv.setUint32(40,n*ch*2,true);
    var data=[];for(k=0;k<ch;k++)data.push(buf.getChannelData(k));
    for(i=0;i<n;i++)for(k=0;k<ch;k++){var v=Math.max(-1,Math.min(1,data[k][i]));dv.setInt16(o,v<0?v*32768:v*32767,true);o+=2;}
    var u8=new Uint8Array(dv.buffer),bin='',CH=0x8000;
    for(i=0;i<u8.length;i+=CH)bin+=String.fromCharCode.apply(null,u8.subarray(i,i+CH));
    return btoa(bin);
  }
  window.TT={draw:function(x){draw(x);},DUR:DUR,stop:function(){playing=false;audioStop();},scale:setScale,seek:seek,setHook:function(v){if(typeof setHook==='function'){setHook(v);dirty=true;}},renderAudio:renderAudio,
    cover:function(x){draw(x);if(typeof coverLockup==='function'){c.setTransform(SC,0,0,SC,0,0);coverLockup();}return cv.toDataURL('image/png').split(',')[1];},
    frameData:function(x,type,q){draw(x);return cv.toDataURL(type||'image/jpeg',q==null?.95:q).split(',')[1];}};
  requestAnimationFrame(frame);
