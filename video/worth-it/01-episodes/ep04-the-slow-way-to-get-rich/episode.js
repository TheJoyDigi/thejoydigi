/* EP04 The Slow Way to Get Rich. Lead Kai, narrator Puck. */
var EP={num:4,lead:'kai',title:'The Slow Way to Get Rich',slug:'ep04-slow-way-anime',
  shots:[
    {type:'boss',from:0,hit:'m2',lines:['The answer is','working harder.']},
    {type:'steps',from:'r1-0.25',stepAt:['r1+0.05','r1+1.0','r2+0.1'],bannerAt:'r3+0.2',banner:'PAYS YOU AGAIN TOMORROW.',
     steps:[{chip:'TIME',icon:'clock',title:'TIME',sub:'SPENT',meter:0},{chip:'EFFORT',icon:'bolt',title:'EFFORT',sub:'TIRES',meter:0},{chip:'SKILL',icon:'skill',title:'SKILL',sub:'GROWS',meter:1}],
     poses:[['r1','think'],['r2','point'],['r3','joy']]},
    {type:'punch',from:'k1-0.1',slam2At:'k1+0.8',lines:["HOURS DON'T",'COMPOUND.'],x0:180,y0:228,size0:30,x1:180,y1:272,size1:28},
    {type:'shift',from:'f1-0.1',flipAt:'f3',typeAt:'f2-0.2',question:'Which of your inputs grows without you?',
     a:{icon:'drain',label:'TIME + EFFORT'},b:{icon:'grow',label:'SKILL'},poses:[['f1','think'],['f3','resolve']]},
    {type:'quest',from:'g1-0.1',levelAt:'g2',plateAt:'g3',lines:["Give this week's extra hour",'to the skill,','not the shift.']},
    {type:'outro',from:'g3.end+0.45',dur:3.1}
  ]};
