/* EP02 The Diamond in the Desert. Lead Kai, narrator Puck. Shots are timed from the narration plan (voice.json -> export/voice/plan.json). */
var EP={num:2,lead:'kai',title:'The Diamond in the Desert',slug:'ep02-diamond-desert-anime',
  shots:[
    {type:'boss',from:0,hit:'m2',lines:['They say you get','what you pay for.']},
    {type:'compare',from:'r1-0.25',cardAt:['r1+0.35','r1+1.0'],winAt:'r1.end-0.4',moveAt:'r2+0.2',bannerAt:'r3+1.25',banner:"IT'S IN THE PERSON.",win:1,
     cards:[{item:'diamond',title:'DIAMOND',rows:['costs a fortune','saves no one']},{item:'water',title:'WATER',rows:['costs pennies','saves you']}],
     poses:[['r1','think'],['r2','point'],['r3+1.25','resolve']]},
    {type:'punch',from:'k1-0.1',slam2At:'k1+0.85',lines:['STOP ASKING',"WHAT IT'S WORTH."],x0:180,y0:228,size0:30,x1:180,y1:272,size1:24},
    {type:'lockon',from:'f1-0.1',item:'diamond',moveAt:'f2-0.1',lockAt:'f2+0.5',typeAt:'f2-0.2',question:['Who is it worth it to?'],
     label:"WHAT'S IT WORTH?",lockedLabel:'WHO? THE PERSON.',poses:[['f1','think'],['f2+0.5','shock'],['f3','resolve']]},
    {type:'quest',from:'g1-0.1',levelAt:'g2',plateAt:'g3',lines:['Before your next purchase,','ask whose problem it solves:',"mine, or the ad's?"]},
    {type:'outro',from:'g3.end+0.45',dur:3.1}
  ]};
