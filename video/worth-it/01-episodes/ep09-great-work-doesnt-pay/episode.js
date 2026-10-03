/* EP09 Great Work Doesn't Pay. Lead Wren, narrator Leda. */
var EP={num:9,lead:'wren',title:"Great Work Doesn't Pay",slug:'ep09-great-work-anime',
  shots:[
    {type:'boss',from:0,hit:'m2',lines:['Do great work,','get rewarded.']},
    {type:'compare',from:'r1-0.25',tint:'#FF7A4D',sun:false,cardAt:['r1+0.1','r1+1.3'],winAt:'r2+0.3',moveAt:'r2+0.9',bannerAt:'r3+0.3',banner:'SOMEONE ALWAYS CAPTURES.',win:1,badge:'CAPTURES',
     cards:[{item:'chef',title:'THE CHEF',rows:['makes','the meal']},{item:'owner',title:'THE OWNER',rows:['keeps','the margin']}],
     poses:[['r1','think'],['r2','point'],['r3+0.3','resolve']]},
    {type:'punch',from:'k1-0.1',slam2At:'k1+0.8',lines:["CREATING ISN'T",'ENOUGH.'],x0:180,y0:228,size0:26,x1:180,y1:272,size1:32},
    {type:'shift',from:'f1-0.1',flipAt:'f3',typeAt:'f2-0.2',question:'Who captures the value you create?',
     a:{icon:'leak',label:'FIND THE LEAK'},b:{icon:'plug',label:'PLUG ONE'},poses:[['f1','think'],['f3','resolve']]},
    {type:'quest',from:'g1-0.1',levelAt:'g2',plateAt:'g3',lines:['Name one way to keep,','say, ten percent more','of what you make.']},
    {type:'outro',from:'g3.end+0.45',dur:3.1}
  ]};
