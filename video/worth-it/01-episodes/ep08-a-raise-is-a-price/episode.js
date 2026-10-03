/* EP08 A Raise Is a Price. Lead Kai, narrator Puck. */
var EP={num:8,lead:'kai',title:'A Raise Is a Price',slug:'ep08-raise-is-price-anime',
  shots:[
    {type:'boss',from:0,hit:'m2',lines:['Be grateful.',"Don't ask for more."]},
    {type:'compare',from:'r1-0.25',tint:'#7B5CFF',sun:false,cardAt:['r2','r2+0.7'],winAt:'r2+1.3',bannerAt:'r3+0.3',banner:'SAME WORK. NEW NUMBER.',win:1,badge:'NAMES IT',estScale:1.5,estX:[104,256],
     cards:[{item:'hope',title:'BEGGARS',rows:['hope','and wait']},{item:'nameplate',title:'PRICERS',rows:['name','the number']}],
     poses:[['r1','think'],['r2','point'],['r3+0.3','resolve']]},
    {type:'punch',from:'k1-0.1',slam2At:'k1+0.8',lines:['BEGGARS HOPE.','PRICERS NAME.'],x0:180,y0:228,size0:26,x1:180,y1:272,size1:26},
    {type:'shift',from:'f1-0.1',flipAt:'f3',typeAt:'f2-0.2',question:'What value did you create this year, in one number?',
     a:{icon:'nameplate0',label:'THEIR NUMBER'},b:{icon:'nameplate',label:'YOUR NUMBER'},poses:[['f1','think'],['f3','resolve']]},
    {type:'quest',from:'g1-0.1',levelAt:'g2',plateAt:'g3',lines:['Before any negotiation,','write the number down.','Walk in with it.']},
    {type:'outro',from:'g3.end+0.45',dur:3.1}
  ]};
