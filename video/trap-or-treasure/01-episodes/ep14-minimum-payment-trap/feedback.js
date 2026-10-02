(function(){
  var BEATS=[
    ['hook','Hook','0:00','Does it grab you in the first second?'],
    ['stepin','Step in','0:02','Is Mei\'s moment relatable?'],
    ['treadmill','Treadmill','0:04','Does "feels responsible, goes nowhere" land?'],
    ['xray','X-ray','0:06','Can you see where the $20 goes?'],
    ['price','The price','0:11','Are 74 payments and $887 clear and shocking?'],
    ['treasure','Treasure','0:16','Does the escape feel good?'],
    ['race','The race','0:18','Is "pay a fixed $50" and the payoff obvious?'],
    ['quest','Quest card','0:24','Would you screenshot this card?']
  ];
  var QS=[
    {id:'hook',label:'Which opening would stop your scroll?',opts:['A: Mei\'s face','B: Creature reveal','C: Text only','None']},
    {id:'voice',label:'Mei\'s voice is Leda. Keep her?',opts:['Keep Leda','Try the runner-up (Callirrhoe)','No voice']},
    {id:'voicecut',label:'Does the voice help the video?',opts:['Yes, keep it','Only some lines','No, captions only']},
    {id:'pace',label:'Pace and energy',opts:['Too slow','About right','Too frantic']},
    {id:'chars',label:'Characters: does Mei read as 19 with a first job, and do the creatures work?',opts:['Yes to both','Mei yes, creatures no','Creatures yes, Mei no','Neither']},
    {id:'mute',label:'With sound off, did you get the trap, the number and the quest?',opts:['Yes, all three','Mostly','No']},
    {id:'voice',label:'Voiceover for Mei?',opts:['Captions only','Add Mei voice','Test both on Ep 1']},
    {id:'look',label:'Look and style mix',opts:['Keep this mix','More anime','More flat graphics']}
  ];
  var root=document.getElementById('fb');
  if(!root)return;
  var state={beats:{},overall:{}},db=null,saving=false;
  var REACT=['Keep','Tweak','Redo'];

  function el(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
  function seg(options,current,onPick){
    var wrap=el('div','seg'),btns=[];
    options.forEach(function(o){
      var b=el('button',null,o);b.type='button';b.setAttribute('aria-pressed',current===o?'true':'false');
      b.addEventListener('click',function(){
        var on=b.getAttribute('aria-pressed')==='true';
        btns.forEach(function(x){x.setAttribute('aria-pressed','false');});
        if(!on){b.setAttribute('aria-pressed','true');onPick(o);}else onPick('');
        markDirty();
      });
      btns.push(b);wrap.appendChild(b);
    });
    return wrap;
  }
  var status,saveBtn;
  function markDirty(){if(status)status.textContent='Not saved yet.';}

  function build(){
    root.textContent='';
    root.appendChild(el('h2',null,'Director\'s questions'));
    root.appendChild(el('p','note','Watch once with sound off, once with sound on. React to each beat, then answer the questions at the bottom. Nothing is saved until you press Save.'));
    BEATS.forEach(function(b,i){
      var id=b[0],cur=state.beats[id]||{};
      var card=el('div','beat'),top=el('div','beat-top'),left=el('div');
      var nm=el('div','beat-name');nm.appendChild(el('span','beat-time',b[2]));nm.appendChild(document.createTextNode(b[1]));
      left.appendChild(nm);left.appendChild(el('div','beat-q',b[3]));
      var play=el('button','fb-play','Play this beat');play.type='button';
      play.addEventListener('click',function(){
        var chips=document.querySelectorAll('.scene');if(chips[i])chips[i].click();
        try{window.scrollTo({top:0,behavior:'smooth'});}catch(e){window.scrollTo(0,0);}
      });
      top.appendChild(left);top.appendChild(play);card.appendChild(top);
      card.appendChild(seg(REACT,cur.r||'',function(v){state.beats[id]=state.beats[id]||{};state.beats[id].r=v;}));
      var ta=el('textarea');ta.id='note-'+id;ta.placeholder='Optional note';ta.value=cur.n||'';ta.setAttribute('aria-label','Note on '+b[1]);
      ta.addEventListener('input',function(){state.beats[id]=state.beats[id]||{};state.beats[id].n=ta.value;markDirty();});
      card.appendChild(ta);root.appendChild(card);
    });
    QS.forEach(function(q){
      var g=el('div','q');g.appendChild(el('div','q-label',q.label));
      g.appendChild(seg(q.opts,state.overall[q.id]||'',function(v){state.overall[q.id]=v;}));
      root.appendChild(g);
    });
    [
     ['notes','Anything else, or what should I change first?','Your words']].forEach(function(f){
      var g=el('div','q');var lab=el('label','q-label',f[1]);lab.htmlFor='ov-'+f[0];g.appendChild(lab);
      var ta=el('textarea');ta.id='ov-'+f[0];ta.placeholder=f[2];ta.value=state.overall[f[0]]||'';
      ta.addEventListener('input',function(){state.overall[f[0]]=ta.value;markDirty();});
      g.appendChild(ta);root.appendChild(g);
    });
    var row=el('div','fb-save');
    saveBtn=el('button','btn primary','Save feedback');saveBtn.type='button';
    status=el('span','fb-status',db?'':'Saving is not available in this view. Tell Claude your feedback in the chat instead.');
    status.setAttribute('aria-live','polite');
    if(!db)saveBtn.disabled=true;
    saveBtn.addEventListener('click',save);
    row.appendChild(saveBtn);row.appendChild(status);root.appendChild(row);
  }

  async function save(){
    if(!db||saving)return;
    saving=true;saveBtn.disabled=true;status.textContent='Saving...';
    try{
      state.savedAt=new Date().toISOString();
      await db.doc('feedback/ep14').set(state);
      status.textContent='Saved. Tell Claude in the chat when you are done.';
    }catch(e){
      status.textContent='Could not save ('+((e&&e.code)||'error')+'). Tell Claude your feedback in the chat instead.';
    }
    saving=false;saveBtn.disabled=false;
  }

  var hb=document.querySelectorAll('#hooks button');
  hb.forEach(function(b){b.addEventListener('click',function(){
    hb.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});
    if(window.TT&&TT.setHook){TT.setHook(b.getAttribute('data-h'));TT.seek(0);}
    try{window.scrollTo({top:0,behavior:'smooth'});}catch(e){}
  });});
  build();
  (async function(){
    try{
      db=window.claude&&window.claude.use?await window.claude.use('db'):null;
      if(!db){build();return;}
      var snap=await db.doc('feedback/ep14').get();
      if(snap.exists){var d=snap.data()||{};state={beats:d.beats||{},overall:d.overall||{}};}
      build();
      if(snap.exists)status.textContent='Loaded your saved feedback.';
    }catch(e){db=null;build();}
  })();
})();
