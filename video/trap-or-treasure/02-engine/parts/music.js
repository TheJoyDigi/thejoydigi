/* music: tiny generative synth shared by all episodes. An episode supplies cues(S) and calls S.tone, S.noise, S.thump, S.pad, S.arp. */

  function mnote(n){return 440*Math.pow(2,(n-69)/12);}
  function makeSynth(ctx,dest,off,dur,lead){
    var T0=ctx.currentTime+(lead==null?.12:lead)-off,master=ctx.createGain(),seed=20261001;
    function rnd(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}
    master.gain.value=.6;
    var dly=ctx.createDelay(1);dly.delayTime.value=.27;
    var fb=ctx.createGain();fb.gain.value=.26;
    var wet=ctx.createGain();wet.gain.value=.3;
    var lp=ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=2400;
    master.connect(dest);master.connect(dly);dly.connect(lp);lp.connect(fb);fb.connect(dly);lp.connect(wet);wet.connect(dest);
    master.gain.setValueAtTime(.6,T0+dur-1.4);master.gain.linearRampToValueAtTime(0,T0+dur-.05);
    function live(at){return at>=off-.001;}
    function tone(at,n,len,type,vol,lpf,att){
      if(!live(at))return;
      var o=ctx.createOscillator(),g=ctx.createGain(),f=ctx.createBiquadFilter(),s=T0+at;
      o.type=type;o.frequency.value=mnote(n);f.type='lowpass';f.frequency.value=lpf||2600;
      g.gain.setValueAtTime(.0001,s);g.gain.exponentialRampToValueAtTime(vol,s+(att||.012));g.gain.exponentialRampToValueAtTime(.0005,s+len);
      o.connect(f);f.connect(g);g.connect(master);o.start(s);o.stop(s+len+.05);
    }
    function noise(at,len,vol,f0,f1){
      if(!live(at))return;
      var n=Math.floor(ctx.sampleRate*len),b=ctx.createBuffer(1,n,ctx.sampleRate),d=b.getChannelData(0),q;
      for(q=0;q<n;q++)d[q]=rnd()*2-1;
      var s=ctx.createBufferSource();s.buffer=b;
      var f=ctx.createBiquadFilter();f.type='bandpass';f.frequency.setValueAtTime(f0,T0+at);f.frequency.exponentialRampToValueAtTime(f1,T0+at+len);
      var g=ctx.createGain();g.gain.setValueAtTime(.0001,T0+at);g.gain.exponentialRampToValueAtTime(vol,T0+at+len*.9);g.gain.exponentialRampToValueAtTime(.0001,T0+at+len);
      s.connect(f);f.connect(g);g.connect(master);s.start(T0+at);
    }
    function thump(at,vol){
      if(!live(at))return;
      var o=ctx.createOscillator(),g=ctx.createGain(),s=T0+at;
      o.type='sine';o.frequency.setValueAtTime(120,s);o.frequency.exponentialRampToValueAtTime(40,s+.4);
      g.gain.setValueAtTime(vol,s);g.gain.exponentialRampToValueAtTime(.001,s+.7);
      o.connect(g);g.connect(master);o.start(s);o.stop(s+.8);
    }
    function pad(at,notes,len,vol){notes.forEach(function(n){tone(at,n,len,'sawtooth',vol,700,.35);tone(at,n+12,len,'sine',vol*.6,1200,.35);});}
    function arp(at,notes,n,step,oct,vol,type){for(var q=0;q<n;q++)tone(at+q*step,notes[q%notes.length]+oct+(q%(notes.length*2)>=notes.length?12:0),step*3,type||'triangle',vol,2800);}
    function kick(at,vol){
      if(!live(at))return;
      var o=ctx.createOscillator(),g=ctx.createGain(),s=T0+at;
      o.type='sine';o.frequency.setValueAtTime(160,s);o.frequency.exponentialRampToValueAtTime(42,s+.11);
      g.gain.setValueAtTime(vol,s);g.gain.exponentialRampToValueAtTime(.001,s+.22);
      o.connect(g);g.connect(master);o.start(s);o.stop(s+.25);
    }
    function hat(at,vol){noise(at,.045,vol,7000,9000);}
    function clap(at,vol){noise(at,.09,vol,1600,1100);noise(at+.012,.07,vol*.7,2200,1400);}
    function click(at,vol){noise(at,.025,vol,4200,3000);tone(at,96,.04,'square',vol*.5,5000,.002);}
    function clink(at,vol){tone(at,100,.5,'sine',vol,6000,.002);tone(at+.012,107,.45,'sine',vol*.7,6000,.002);tone(at+.03,112,.35,'sine',vol*.4,6000,.002);}
    function bass(at,n,len,vol){tone(at,n,len,'sawtooth',vol,420,.01);tone(at,n-12,len,'sine',vol*.8,200,.01);}
    function pluck(at,n,vol){tone(at,n,.28,'triangle',vol,3200,.004);}
    return{tone:tone,noise:noise,thump:thump,pad:pad,arp:arp,kick:kick,hat:hat,clap:clap,click:click,clink:clink,bass:bass,pluck:pluck};
  }
