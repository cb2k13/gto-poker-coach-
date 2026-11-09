import React, { useState, useMemo, useEffect } from "react";

const h = React.createElement;
const R="AKQJT98765432".split(""), RI={};R.forEach((r,i)=>RI[r]=i);
function parse(s){const out=new Set();s.split(",").forEach(t=>{t=t.trim();const plus=t.endsWith("+");if(plus)t=t.slice(0,-1);
 const a=t[0],b=t[1],k=t[2]||"";
 if(a===b){if(plus){for(let i=RI[a];i>=0;i--)out.add(R[i]+R[i]);}else out.add(a+b);}
 else if(plus){for(let i=RI[b];i>RI[a];i--)out.add(a+R[i]+k);}else out.add(a+b+k);});return out;}
const RAW={
UTG:"77+,ATs+,A5s,KTs+,QTs+,JTs,AJo+,KQo",
"UTG+1":"66+,ATs+,A5s,A4s,KTs+,QTs+,JTs,T9s,AJo+,KQo",
"UTG+2":"55+,A9s+,A5s,A4s,A3s,KTs+,QTs+,J9s+,T9s,98s,ATo+,KQo",
LJ:"44+,A8s+,A5s,A4s,A3s,A2s,K9s+,Q9s+,J9s+,T9s,98s,87s,ATo+,KJo+",
HJ:"33+,A2s+,K8s+,Q9s+,J9s+,T8s+,98s,87s,76s,ATo+,KJo+,QJo",
CO:"22+,A2s+,K6s+,Q8s+,J8s+,T8s+,97s+,86s+,76s,65s,A9o+,KTo+,QTo+,JTo",
BTN:"22+,A2s+,K2s+,Q4s+,J6s+,T6s+,96s+,85s+,75s+,64s+,54s,A2o+,K8o+,Q9o+,J9o+,T9o,98o",
SB:"22+,A2s+,K4s+,Q6s+,J7s+,T7s+,97s+,86s+,76s,65s,54s,A4o+,K9o+,QTo+,JTo"};
const RAWS={15:{UTG:"55+,A9s+,A5s,A4s,KJs+,QJs,ATo+,KQo","UTG+1":"44+,A8s+,A5s,A4s,A3s,KTs+,QJs,ATo+,KQo","UTG+2":"33+,A7s+,A5s,A4s,A3s,A2s,KTs+,QTs+,JTs,ATo+,KJo+",LJ:"22+,A2s+,K9s+,QTs+,JTs,T9s,A9o+,KJo+",HJ:"22+,A2s+,K8s+,Q9s+,J9s+,T9s,98s,A8o+,KTo+,QJo",CO:"22+,A2s+,K5s+,Q8s+,J8s+,T8s+,98s,87s,A5o+,K9o+,QTo+,JTo",BTN:"22+,A2s+,K2s+,Q5s+,J7s+,T7s+,97s+,86s+,76s,65s,A2o+,K6o+,Q9o+,J9o+,T9o",SB:"22+,A2s+,K2s+,Q2s+,J4s+,T6s+,96s+,85s+,75s+,65s,54s,A2o+,K2o+,Q7o+,J8o+,T8o+,98o"},25:{UTG:"66+,ATs+,A5s,KJs+,QJs,JTs,AJo+,KQo","UTG+1":"55+,ATs+,A5s,A4s,KTs+,QJs,JTs,AJo+,KQo","UTG+2":"44+,A9s+,A5s,A4s,A3s,KTs+,QTs+,JTs,T9s,ATo+,KQo",LJ:"33+,A8s+,A5s,A4s,A3s,A2s,K9s+,QTs+,J9s+,T9s,98s,ATo+,KJo+",HJ:"22+,A2s+,K9s+,Q9s+,J9s+,T9s,98s,87s,ATo+,KJo+,QJo",CO:"22+,A2s+,K7s+,Q9s+,J8s+,T8s+,98s,87s,76s,A9o+,KTo+,QTo+,JTo",BTN:"22+,A2s+,K3s+,Q6s+,J7s+,T7s+,97s+,86s+,75s+,65s,54s,A3o+,K8o+,Q9o+,J9o+,T9o",SB:"22+,A2s+,K4s+,Q7s+,J7s+,T7s+,97s+,86s+,76s,65s,A5o+,K9o+,QTo+,JTo"},50:{UTG:"77+,ATs+,KJs+,QJs,JTs,AJo+,KQo","UTG+1":"66+,ATs+,A5s,KTs+,QJs,JTs,AJo+,KQo","UTG+2":"55+,A9s+,A5s,A4s,KTs+,QTs+,JTs,T9s,ATo+,KQo",LJ:"44+,A8s+,A5s,A4s,A3s,K9s+,QTs+,J9s+,T9s,98s,ATo+,KJo+",HJ:"33+,A2s+,K9s+,Q9s+,J9s+,T9s,98s,87s,ATo+,KJo+,QJo",CO:"22+,A2s+,K7s+,Q9s+,J9s+,T8s+,98s,87s,76s,A9o+,KTo+,QTo+,JTo",BTN:"22+,A2s+,K4s+,Q6s+,J7s+,T7s+,97s+,86s+,76s,65s,A4o+,K9o+,QTo+,JTo",SB:"22+,A2s+,K6s+,Q8s+,J8s+,T8s+,98s,87s,76s,A7o+,KTo+,QTo+,JTo"},
100:RAW,
150:{UTG:"66+,ATs+,A5s,A4s,KTs+,QTs+,JTs,T9s,AJo+,KQo","UTG+1":"55+,A9s+,A5s,A4s,A3s,KTs+,QTs+,J9s+,T9s,98s,AJo+,KQo","UTG+2":"44+,A8s+,A5s,A4s,A3s,A2s,K9s+,Q9s+,J9s+,T9s,98s,87s,ATo+,KQo",LJ:"33+,A2s+,K9s+,Q9s+,J9s+,T9s,98s,87s,76s,ATo+,KJo+",HJ:"22+,A2s+,K7s+,Q9s+,J8s+,T8s+,97s+,87s,76s,65s,ATo+,KJo+,QJo",CO:"22+,A2s+,K5s+,Q8s+,J7s+,T7s+,96s+,86s+,75s+,65s,54s,A9o+,KTo+,QTo+,JTo",BTN:"22+,A2s+,K2s+,Q2s+,J4s+,T6s+,95s+,85s+,74s+,64s+,53s+,A2o+,K7o+,Q9o+,J9o+,T8o+,98o",SB:"22+,A2s+,K3s+,Q5s+,J7s+,T6s+,96s+,85s+,75s+,65s,54s,A3o+,K9o+,QTo+,JTo"},
200:{UTG:"66+,ATs+,A5s,A4s,A3s,KTs+,QTs+,JTs,T9s,98s,AJo+,KQo","UTG+1":"55+,A9s+,A5s,A4s,A3s,A2s,KTs+,QTs+,J9s+,T9s,98s,87s,AJo+,KQo","UTG+2":"44+,A8s+,A5s,A4s,A3s,A2s,K9s+,Q9s+,J9s+,T9s,98s,87s,76s,ATo+,KQo",LJ:"33+,A2s+,K8s+,Q9s+,J9s+,T8s+,98s,87s,76s,65s,ATo+,KJo+",HJ:"22+,A2s+,K6s+,Q8s+,J8s+,T7s+,97s+,86s+,76s,65s,54s,ATo+,KJo+,QJo",CO:"22+,A2s+,K4s+,Q7s+,J7s+,T7s+,96s+,85s+,75s+,64s+,54s,A9o+,KTo+,QTo+,JTo",BTN:"22+,A2s+,K2s+,Q2s+,J2s+,T4s+,94s+,84s+,74s+,63s+,53s+,43s,A2o+,K6o+,Q8o+,J8o+,T8o+,98o,87o",SB:"22+,A2s+,K2s+,Q4s+,J6s+,T6s+,95s+,85s+,74s+,64s+,53s+,A2o+,K8o+,Q9o+,J9o+,T9o,98o"}};
const RANGES={};Object.keys(RAWS).forEach(s=>{RANGES[s]={};Object.keys(RAWS[s]).forEach(k=>RANGES[s][k]=parse(RAWS[s][k]));});
const STACKS=[15,25,50,100,150,200];
const POS=Object.keys(RAW);
const BBR={};Object.entries({15:["22+,A2s+,K5s+,Q8s+,J8s+,T8s+,98s,87s,A4o+,K9o+,QTo+,JTo","AA"],25:["22+,A2s+,K3s+,Q6s+,J7s+,T7s+,97s+,86s+,75s+,65s,54s,A2o+,K8o+,Q9o+,J9o+,T9o,98o","TT+,AJs+,AQo+,A5s,A4s"],50:["22+,A2s+,K4s+,Q6s+,J7s+,T7s+,97s+,86s+,76s,65s,54s,A2o+,K9o+,QTo+,JTo","TT+,AQs+,AQo+,A5s"],100:["22+,A2s+,K2s+,Q4s+,J6s+,T6s+,96s+,85s+,74s+,64s+,53s+,43s,A2o+,K7o+,Q9o+,J9o+,T8o+,98o,87o","JJ+,AQs+,AKo,A5s,A4s"],150:["22+,A2s+,K2s+,Q4s+,J6s+,T6s+,95s+,85s+,74s+,64s+,53s+,43s,A2o+,K7o+,Q9o+,J9o+,T8o+,98o,87o","JJ+,AQs+,AKo,A5s,A4s,A3s"],200:["22+,A2s+,K2s+,Q3s+,J5s+,T6s+,95s+,84s+,74s+,63s+,53s+,43s,A2o+,K6o+,Q9o+,J9o+,T8o+,98o,87o","QQ+,AQs+,AKo,A5s,A4s,A3s"]}).forEach(([s,[a,b]])=>BBR[s]={def:parse(a),b3:parse(b)});BBR[15].b3=new Set();
const label=(i,j)=>i===j?R[i]+R[i]:i<j?R[i]+R[j]+"s":R[j]+R[i]+"o";
const ALL=[];for(let i=0;i<13;i++)for(let j=0;j<13;j++)ALL.push(label(i,j));
const combos=x=>x[2]==="s"?4:x[2]==="o"?12:6;
const pct=(n,d=1)=>(isFinite(n)?(n*100).toFixed(d):"–")+"%";

const P6=["UTG","HJ","CO","BTN","SB"],MAP6={UTG:"LJ"},ANTE={UTG:2,"UTG+1":2,"UTG+2":3,LJ:3,HJ:4,CO:6,BTN:9,SB:8,BB:4};
const wide=(s,p)=>new Set([...s,...take(ORD,p*13.26,s)]);
function Ranges({init,onSave}){
 const [pos0,setPos]=useState(init?init.pos:"BTN"),[st,setSt]=useState(init?init.st:100),[tbl,setTbl]=useState(init&&init.tbl||"9-max"),[mode,setMode]=useState(init&&init.mode||"Cash");
 const plist=tbl==="6-max"?P6:POS,pos=pos0==="BB"||plist.includes(pos0)?pos0:"UTG",isBB=pos==="BB",key=tbl==="6-max"?(MAP6[pos]||pos):pos;
 const set=useMemo(()=>{const b=isBB?BBR[st].def:RANGES[st][key];return mode==="Tournament"?wide(b,ANTE[key]):b;},[st,key,isBB,mode]);
 const share=useMemo(()=>[...set].reduce((a,x)=>a+combos(x.length===2?x:x),0)/1326,[set]);
 return h("div",{className:"panel"},
  h("div",{className:"pos",role:"group","aria-label":"Table size and game type"},["9-max","6-max"].map(t=>h("button",{key:t,className:"chipb","aria-pressed":t===tbl,onClick:()=>setTbl(t)},t)),["Cash","Tournament"].map(m=>h("button",{key:m,className:"chipb","aria-pressed":m===mode,onClick:()=>setMode(m)},m))),
  h("div",{className:"pos",role:"group","aria-label":"Stack depth"},STACKS.map(s=>h("button",{key:s,className:"chipb","aria-pressed":s===st,onClick:()=>setSt(s)},s+"bb"))),
  h("div",{className:"pos",role:"group","aria-label":"Position"},plist.concat("BB").map(p=>h("button",{key:p,className:"chipb","aria-pressed":p===pos,onClick:()=>setPos(p)},p))),
  h("div",{className:"grid"},ALL.map(x=>h("div",{key:x,className:"cell"+(isBB?(BBR[st].b3.has(x)?(st<=50?" allin":" in"):set.has(x)?" call":""):(set.has(x)?(st===15?" allin":" in"):""))},x))),
  h("div",{className:"legend"},[...(isBB&&st===15?[]:[[(isBB?st<=50:st===15)?"#7a1018":"#c8302f",isBB?(st<=50?"3-bet all-in":"3-bet"):(st===15?"Open shove (all-in)":"Raise")]]),...(isBB?[["#2b8a3e","Call"]]:[]),["var(--fold)","Fold"]].map(([c,l])=>h("span",{key:l},h("i",{style:{background:c}}),l))),
  h(SaveBar,{onSave:n=>onSave({type:"ranges",title:pos+" "+st+"bb "+(isBB?"defense":"open")+", "+tbl+" "+mode.toLowerCase(),params:{pos,st,tbl,mode},note:n})}),
  h("div",{className:"stats"},
   h("div",null,h("div",{className:"big"},pct(share,0)),h("div",{className:"lbl"},isBB?"of hands defended":"of hands opened")),
   h("div",null,h("div",{className:"big"},[...set].length),h("div",{className:"lbl"},isBB?"hand types defended":"hand types raised"))),
  h("p",{className:"note"},(isBB?"The big blind can’t open, since it acts last preflop, so this shows how to defend against a BTN open at "+st+"bb: "+(st===15?"":st<=50?"dark red = 3-bet all-in, ":"red = 3-bet, ")+"green = call. ":(st===15?"Dark red = open shove (all-in) when action folds to you, "+tbl+", 15bb. ":"Red = open-raise when action folds to you, "+tbl+", "+st+"bb. "))+"Typical open size is "+(st===15?"all-in":st===25?"2x":st===50?"2.2x":st===100?"2.5x":"2.5–3x")+". Pairs on the diagonal, suited above it, offsuit below. These are simplified solver-style charts: real solutions mix some hands at partial frequencies, which are rounded to raise or fold here."+(mode==="Tournament"?" Tournament charts add antes, so ranges are wider than cash. They do not model ICM pressure, which tightens play near pay jumps.":" Cash charts assume no ante.")+(tbl==="6-max"?" The 6-max UTG range is the 9-max LJ range; HJ, CO, BTN and SB are the same seats as at a 9-max table.":"")));
}

function Calc(){
 const [pot,setPot]=useState(100),[bet,setBet]=useState(50),[eq,setEq]=useState(30);
 const p=+pot||0,b=+bet||0,e=(+eq||0)/100;
 const need=b/(p+2*b),mdf=p/(p+b),bluffPer=b/(p+b);
 const ev=e*(p+b)-(1-e)*b;
 const fld=(l,v,s)=>h("div",null,h("label",{htmlFor:l},s),h("input",{id:l,type:"number",min:0,value:v,onChange:ev=>({pot:setPot,bet:setBet,eq:setEq}[l])(ev.target.value)}));
 return h("div",{className:"panel"},
  h("div",{className:"row"},fld("pot",pot,"Pot before the bet"),fld("bet",bet,"Bet size")),
  h("div",{className:"pos"},[33,50,75,100,150].map(x=>h("button",{key:x,className:"chipb",onClick:()=>setBet(Math.round(p*x/100))},x+"% pot"))),
  h("div",{className:"res"},
   h("div",null,h("div",{className:"big"},pct(need)),h("div",{className:"lbl"},"equity you need to call")),
   h("div",null,h("div",{className:"big"},pct(mdf)),h("div",{className:"lbl"},"minimum defense frequency: how often to continue vs this bet")),
   h("div",null,h("div",{className:"big"},pct(need)),h("div",{className:"lbl"},"share of your betting range that can be bluffs (river)")),
   h("div",null,h("div",{className:"big"},bluffPer.toFixed(2)),h("div",{className:"lbl"},"bluffs per value combo at this size"))),
  h("div",{style:{marginTop:20}},fld("eq",eq,"Your equity vs their range (%)"),
   h("p",{style:{margin:"10px 0 0"},className:"big",style:{color:ev>=0?"var(--ok)":"var(--bad)"}},(ev>=0?"+":"")+ev.toFixed(1)),
   h("div",{className:"lbl"},"EV of calling, in the same units as the pot. "+(ev>=0?"Calling is profitable on pure odds.":"Folding is better on pure odds."))),
  h("p",{className:"note"},"Pot odds ignore implied odds and future streets, so treat them as the floor for a call, not the whole decision. Smaller bets let you defend less and bluff less; larger bets force you to defend more rarely but need more value hands."));
}

function Quiz(){
 const pick=()=>{const p=POS[Math.floor(Math.random()*POS.length)],st=STACKS[Math.floor(Math.random()*STACKS.length)];
  const pool=Math.random()<.5?[...RANGES[st][p]]:ALL;return {p,st,hand:pool[Math.floor(Math.random()*pool.length)]};};
 const [q,setQ]=useState(pick),[fb,setFb]=useState(null),[s,setS]=useState({ok:0,n:0,streak:0});
 const answer=a=>{const inR=RANGES[q.st][q.p].has(q.hand),right=(a==="raise")===inR;
  setS({ok:s.ok+(right?1:0),n:s.n+1,streak:right?s.streak+1:0});
  setFb({right,msg:q.hand+" is a "+(inR?"raise":"fold")+" from the "+q.p+" at "+q.st+"bb when folded to you."});};
 const next=()=>{setQ(pick());setFb(null);};
 return h("div",{className:"panel"},
  h("div",{className:"score"},h("span",null,s.ok+" / "+s.n+" correct"),h("span",null,"Streak "+s.streak)),
  h("div",{className:"hand","aria-live":"polite"},q.hand),
  h("div",{className:"where"},"You are on the "+q.p+" with "+q.st+"bb. Everyone folds to you."),
  h("div",{className:"acts"},
   h("button",{className:"act",disabled:!!fb,onClick:()=>answer("raise")},"Raise"),
   h("button",{className:"act f",disabled:!!fb,onClick:()=>answer("fold")},"Fold")),
  fb&&h("div",{className:"fb"+(fb.right?"":" bad"),role:"status"},h("strong",null,fb.right?"Correct. ":"Not quite. "),fb.msg,
   h("div",null,h("button",{className:"next",onClick:next},"Next hand"))));
}

const ORD=[...new Set('AA KK QQ AKs JJ AQs KQs AKo TT AJs KJs ATs AQo QJs KTs 99 JTs QTs A5s AJo KQo A9s 88 A4s A3s A8s KJo T9s A7s A2s A6s QJo 77 K9s J9s ATo Q9s 98s T8s KTo 87s A9o 66 K8s QTo JTo J8s 76s 97s 65s K7s 55 A8o Q8s T9o 54s K6s 86s 75s K5s J7s A7o Q7s K9o 44 K4s 64s A5o Q6s 98o J9o K3s T7s Q5s A6o 33 K2s 96s A4o J6s 87o Q9o 85s T8o A3o 53s Q4s 22 K8o A2o 74s'.split(' ').concat(ALL))];
const BL='A5s A4s A3s A2s K9s Q9s J9s 76s 65s 54s T9s 98s 87s 86s K8s'.split(' ');
const cm=x=>x.length===2?6:x[2]==='s'?4:12,sum=a=>a.reduce((t,x)=>t+cm(x),0);
function take(l,t,u){const o=[];let n=0;for(const x of l){if(n>=t)break;if(u&&u.has(x))continue;o.push(x);n+=cm(x);}return o;}
const PS=['UTG','UTG+1','UTG+2','LJ','HJ','CO','BTN','SB','BB'],SPOTS=['Facing open','Facing 3-bet','Facing 4-bet'];
const TT={UTG:.65,'UTG+1':.7,'UTG+2':.75,LJ:.85,HJ:.95,CO:1.1,BTN:1.3,SB:1.2};
const B3={'UTG+1':4,'UTG+2':4.5,LJ:5,HJ:5.5,CO:7,BTN:9,SB:11,BB:10};
const BC={'UTG+1':4,'UTG+2':5,LJ:6,HJ:7,CO:9,BTN:12,SB:6,BB:30};
const SZ3={'UTG+1':'7.5','UTG+2':'7.5',LJ:'7.5',HJ:'7.5',CO:'8',BTN:'8',SB:'11',BB:'13'};
function solve(o,r,sp){
 const f=13.26,x=B3[r]*TT[o],v=take(ORD,.65*x*f),b=take(BL,.35*x*f,new Set(v)),t3=new Set(v.concat(b)),cl=take(ORD,BC[r]*TT[o]*f,t3),m={};
 if(sp===0){t3.forEach(k=>m[k]='r');cl.forEach(k=>m[k]='c');return {m,pool:ALL};}
 const S=sp===1?RANGES[100][o]:t3,L=ORD.filter(k=>S.has(k)),tot=sum(L);
 if(sp===1){const a=take(L,.06*tot),v4=take(L,.06*tot,new Set(a)),b4=take(BL.filter(k=>S.has(k)),.04*tot,new Set(a.concat(v4))),c4=take(L,.34*tot,new Set(a.concat(v4,b4)));
  a.forEach(k=>m[k]='a');v4.concat(b4).forEach(k=>m[k]='r');c4.forEach(k=>m[k]='c');return {m,pool:L};}
 const a=take(L,.18*tot),c5=take(L,.28*tot,new Set(a));a.forEach(k=>m[k]='a');c5.forEach(k=>m[k]='c');return {m,pool:L};
}
function Tree({init,onSave}){
 const [o,setO]=useState(init?init.o:'CO'),[r,setR]=useState(init?init.r:'BB'),[sp,setSp]=useState(init?init.sp:0),[sel,setSel]=useState(null);
 const oi=PS.indexOf(o),rr=PS.indexOf(r)>oi?r:'BB',ri=PS.indexOf(rr);
 const {m,pool}=useMemo(()=>solve(o,rr,sp),[o,rr,sp]);
 const s3=SZ3[rr],so=o==='SB'?'3':'2.5',hero=sp===1?o:rr,cls={r:'in',c:'call',a:'allin'};
 const opts=sp===2?[['f','Fold'],['c','Call'],['a','Allin 100']]:[['f','Fold'],['c','Call'],['r','Raise '+(sp?'22':s3)],['a','Allin 100']];
 const P=k=>(sum(k==='f'?pool.filter(q=>!m[q]):pool.filter(q=>m[q]===k))/sum(pool)*100).toFixed(1)+'%';
 const seat=p=>{const i=PS.indexOf(p);
  if(p===hero)return h('div',{key:p,className:'seat act'},h('b',null,p,h('span',null,'100')),opts.map(([k,t])=>h('button',{key:k,className:'opt'+(sel===k?' on':''),onClick:()=>setSel(sel===k?null:k)},h('span',null,t),h('span',null,P(k)))));
  const t=i<oi?'Fold':p===o?'Raise '+(sp===2?'22':so):p===rr?'Raise '+s3:i<ri?'Fold':'–';
  return h('div',{key:p,className:'seat'+(t==='Fold'||t==='–'?' out':'')},h('b',null,p,h('span',null,'100')),h('div',null,t));};
 const chips=(a,v,fn)=>h('div',{className:'pos'},a.map(p=>h('button',{key:p,className:'chipb','aria-pressed':p===v,onClick:()=>{fn(p);setSel(null);}},p)));
 return h('div',{className:'panel'},
  h('div',{className:'lbl'},'Opened by'),chips(PS.slice(0,8),o,setO),
  h('div',{className:'lbl'},'Defender'),chips(PS.slice(oi+1),rr,setR),
  h('div',{className:'lbl'},'Action'),chips(SPOTS,SPOTS[sp],p=>setSp(SPOTS.indexOf(p))),
    h('div',{className:'grid'},ALL.map(x=>h('div',{key:x,className:'cell'+(m[x]?' '+cls[m[x]]:'')+(sel&&(m[x]||'f')!==sel?' dim':'')},x))),
  h('div',{className:'legend'},[['#c8302f','Raise'],['#2b8a3e','Call'],['#7a1018','All-in'],['var(--fold)','Fold']].map(([c,l])=>h('span',{key:l},h('i',{style:{background:c}}),l))),
  h(SaveBar,{onSave:n=>onSave({type:'tree',title:o+' open, '+rr+' '+SPOTS[sp].toLowerCase(),params:{o,r:rr,sp},note:n})}),
  h('p',{className:'note'},'100bb, sizes in big blinds (open 2.5, 3-bet 7.5 to 13, 4-bet 22). Red = raise, dark red = all-in, green = call, grey = fold. Ranges are hand-strength bands plus suited-ace and suited-connector bluffs, rounded to one action per hand, so use them as a study guide rather than exact solver output.'));
}
function SaveBar({onSave}){
 const [n,setN]=useState(''),[ok,setOk]=useState(false);
 return h('div',{className:'savebar'},
  h('input',{type:'text',placeholder:'Add a note (optional)','aria-label':'Note',value:n,onChange:e=>setN(e.target.value)}),
  h('button',{className:'btn',onClick:()=>{onSave(n);setN('');setOk(true);setTimeout(()=>setOk(false),1500);}},ok?'Saved \u2713':'Save spot'));
}

const TEX={
 Dry:{ex:['A\u2660 7\u2666 2\u2663','K\u2665 8\u2663 3\u2666','Q\u2666 6\u2660 2\u2663'],ip:[68,10,22],oop:[48,10,42],tips:['The raiser has the range advantage: more top pairs and overpairs, and few draws for the caller.','Bet small (about 33% pot) with most of the range, including plenty of weak hands.','Bluff with backdoor draws and overcards, and check back some medium pairs.']},
 Wet:{ex:['J\u2665 T\u2665 9\u2660','9\u2660 8\u2660 7\u2666','T\u2666 9\u2666 6\u2663'],ip:[15,35,50],oop:[8,22,70],tips:['The caller connects with pairs and draws, so the raiser\u2019s range advantage shrinks.','Bet less often and polarize: bigger bets (75% pot or more) with strong hands and good draws.','Check marginal hands and weak holdings with no equity rather than bluffing small.']},
 Paired:{ex:['K\u2660 7\u2665 7\u2666','6\u2663 6\u2666 2\u2660','Q\u2660 Q\u2666 4\u2665'],ip:[75,8,17],oop:[55,8,37],tips:['Few hands in either range hold trips, and the raiser usually has the stronger overall range.','Bet small and very often (25 to 33% pot), because even weak hands fold out the caller\u2019s misses.','Bluff with overcards and backdoors; strong hands can mix in checks to protect the checking range.']},
 Monotone:{ex:['Q\u2665 7\u2665 5\u2665','9\u2660 6\u2660 3\u2660','K\u2666 T\u2666 4\u2666'],ip:[35,8,57],oop:[20,5,75],tips:['Both players can hold flush draws, so equities run close and the raiser checks a lot.','When you bet, keep it small (about 33% pot) and lean on strong hands and nut flush draws.','Hands with a high card of the flush suit make the best bluffs because they block the nut flush.']}};

function Postflop({init,onSave}){
 const [tex,setTex]=useState(init?init.tex:'Dry'),[ip,setIp]=useState(init?init.ip:true);
 const d=TEX[tex],[s,l,k]=ip?d.ip:d.oop;
 const chips=(a,v,fn)=>h('div',{className:'pos'},a.map(x=>h('button',{key:x,className:'chipb','aria-pressed':x===v,onClick:()=>fn(x)},x)));
 return h('div',{className:'panel'},
  h('div',{className:'lbl'},'Board texture'),chips(Object.keys(TEX),tex,setTex),
  h('div',{className:'lbl'},'Preflop raiser'),chips(['In position','Out of position'],ip?'In position':'Out of position',x=>setIp(x==='In position')),
  h('div',{className:'boards'},d.ex.map(b=>h('div',{key:b,className:'board'},b.split(' ').map(x=>h('span',{key:x,className:'pc'+(/[\u2665\u2666]/.test(x)?' r':'')},x))))),
  h('div',{className:'stats'},
   h('div',null,h('div',{className:'big'},(s+l)+'%'),h('div',{className:'lbl'},'c-bet frequency')),
   h('div',null,h('div',{className:'big'},'33% / 75%'),h('div',{className:'lbl'},'small / large size')),
   h('div',null,h('div',{className:'big'},k+'%'),h('div',{className:'lbl'},'check'))),
  h('div',{className:'bar',role:'img','aria-label':'Bet small '+s+'%, bet large '+l+'%, check '+k+'%'},
   h('span',{style:{width:s+'%',background:'#d23b38'}}),h('span',{style:{width:l+'%',background:'#7a1018'}}),h('span',{style:{width:k+'%',background:'#2b8a3e'}})),
  h('div',{className:'legend'},[['#d23b38','Bet small '+s+'%'],['#7a1018','Bet large '+l+'%'],['#2b8a3e','Check '+k+'%']].map(([c,t])=>h('span',{key:t},h('i',{style:{background:c}}),t))),
  h('ul',{className:'tips'},d.tips.map(t=>h('li',{key:t},t))),
  h(SaveBar,{onSave:n=>onSave({type:'post',title:'Postflop: '+tex+', raiser '+(ip?'in position':'out of position'),params:{tex,ip},note:n})}),
  h('p',{className:'note'},'Approximate solver trends for single-raised pots at 100bb, such as a CO open called by the BTN (raiser in position) or the reverse. Real frequencies depend on the exact board, hand and positions, so use these as a starting point.'));
}

const TAGS={ranges:'Open ranges',tree:'3-bet / 4-bet',post:'Postflop'};
function Saved({saved,setSaved,open}){
 const upd=(id,note)=>setSaved(saved.map(s=>s.id===id?{...s,note}:s));
 const del=id=>setSaved(saved.filter(s=>s.id!==id));
 if(!saved.length)return h('div',{className:'panel'},h('p',{className:'note',style:{margin:0}},'No saved spots yet. Tap Save spot on the Open ranges, 3-bet / 4-bet or Postflop tab, then edit your notes here. Spots are stored in this browser only, so there is no login.'));
 return h('div',null,saved.map(s=>h('div',{key:s.id,className:'panel spot'},
  h('div',{className:'spothead'},h('b',null,s.title),h('span',{className:'tag'},TAGS[s.type])),
  h('textarea',{value:s.note,placeholder:'Notes',rows:2,'aria-label':'Notes for '+s.title,onChange:e=>upd(s.id,e.target.value)}),
  h('div',{className:'spotbtns'},h('button',{className:'btn',onClick:()=>open(s)},'Open'),h('button',{className:'btn ghost',onClick:()=>del(s.id)},'Delete')))),
  h('p',{className:'note'},'Saved in this browser only. Clearing site data removes them.'));
}

function App(){
 const [tab,setTab]=useState('ranges'),[load,setLoad]=useState(null);
 const [saved,setSaved]=useState(()=>{try{return JSON.parse(localStorage.getItem('gto-saved')||'[]');}catch(e){return [];}});
 useEffect(()=>{try{localStorage.setItem('gto-saved',JSON.stringify(saved));}catch(e){}},[saved]);
 const save=s=>setSaved([{...s,id:Date.now()+Math.random().toString(36).slice(2,6)},...saved]);
 const open=s=>{setLoad(s);setTab(s.type);};
 const init=load&&load.type===tab?load.params:null,key=tab+(init?load.id:''),pr={key,init,onSave:save};
 const T=[['ranges','Open ranges'],['tree','3-bet / 4-bet'],['post','Postflop'],['math','Bet math'],['quiz','Practice'],['saved','Saved ('+saved.length+')']];
 return h('div',{className:'wrap'},
  h('h1',null,'GTO Poker ',h('span',null,'Coach')),
  h('p',{className:'sub'},'Study opening ranges, work out pot odds and defense frequencies, then test yourself.'),
  h('div',{className:'tabs',role:'tablist'},T.map(([k,l])=>h('button',{key:k,role:'tab',className:'tab','aria-selected':tab===k,onClick:()=>setTab(k)},l))),
  tab==='ranges'?h(Ranges,pr):tab==='tree'?h(Tree,pr):tab==='post'?h(Postflop,pr):tab==='math'?h(Calc):tab==='quiz'?h(Quiz):h(Saved,{saved,setSaved,open}));
}

export default App;

