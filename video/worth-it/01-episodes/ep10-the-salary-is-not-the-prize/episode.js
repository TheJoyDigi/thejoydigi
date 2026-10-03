/* EP10 The Salary Is Not the Prize. Lead Kai, narrator Puck. */
var EP={num:10,lead:'kai',title:'The Salary Is Not the Prize',slug:'ep10-salary-prize-anime',
  shots:[
    {type:'boss',from:0,hit:'m2',lines:['Land the salary,',"you're set."]},
    {type:'compare',from:'r1-0.25',tint:'#7B5CFF',sun:false,cardAt:['r1+0.1','r1+1.6'],winAt:'r2+0.4',bannerAt:'r2+2.6',banner:'EQUITY CAPTURES.',win:1,badge:'KEEPS PAYING',
     cards:[{item:'paycheck',title:'SALARY',rows:['rent on','your time']},{item:'gear',title:'OWNERSHIP',rows:['pays while','you sleep']}],
     poses:[['r1','think'],['r2','point'],['r2+2.6','resolve']]},
    {type:'punch',from:'k1-0.1',slam2At:'k1+0.8',lines:['SALARY STOPS.','OWNERSHIP COMPOUNDS.'],x0:180,y0:228,size0:28,x1:180,y1:272,size1:20},
    {type:'shift',from:'f1-0.1',flipAt:'f3',typeAt:'f2-0.2',question:"What's the smallest piece of ownership you can buy?",
     a:{icon:'paycheck',label:'PAYCHECK'},b:{icon:'share',label:'ONE SHARE'},poses:[['f1','think'],['f3','resolve']]},
    {type:'quest',from:'g1-0.1',levelAt:'g2',plateAt:'g3',lines:['Look up the price','of one share.','Start there.']},
    {type:'outro',from:'g3.end+0.45',dur:3.1}
  ]};
