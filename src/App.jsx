import React, { useState, useMemo, useEffect } from "react";
import { PF, BFS } from "./pushfoldData.js";
import logo from "./assets/logo.png";

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
  h("p",{className:"note"},(isBB?"The big blind can’t open, since it acts last preflop, so this shows how to defend against a BTN open at "+st+"bb: "+(st===15?"":st<=50?"dark red = 3-bet all-in, ":"red = 3-bet, ")+"green = call. ":(st===15?"Dark red = open shove (all-in) when action folds to you, "+tbl+", 15bb. ":"Red = open-raise when action folds to you, "+tbl+", "+st+"bb. "))+"Typical open size is "+(st===15?"all-in":st===25?"2x":st===50?"2.2x":st===100?"2.5x":"2.5–3x")+". Pairs on the diagonal, suited above it, offsuit below. These are simplified solver-style charts: real solutions mix some hands at partial frequencies, which are rounded to raise or fold here."+(mode==="Tournament"?" Tournament charts add antes, so ranges are wider than cash. They do not model ICM pressure; see the Push/fold tab for heads-up charts with a bubble factor.":" Cash charts assume no ante.")+(tbl==="6-max"?" The 6-max UTG range is the 9-max LJ range; HJ, CO, BTN and SB are the same seats as at a 9-max table.":"")));
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

const TAGS={ranges:'Open ranges',tree:'3-bet / 4-bet',post:'Postflop',combo:'Combos',spr:'SPR',pf:'Push/fold'};
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

const SUITS=['s','h','d','c'],SYM={s:'\u2660',h:'\u2665',d:'\u2666',c:'\u2663'},fmt=k=>k[0]+SYM[k[1]];
function comboList(x){const a=x[0],b=x[1],t=x[2],o=[];
 if(!t){for(let i=0;i<4;i++)for(let j=i+1;j<4;j++)o.push([a+SUITS[i],a+SUITS[j]]);}
 else if(t==='s'){SUITS.forEach(s=>o.push([a+s,b+s]));}
 else{SUITS.forEach(s=>SUITS.forEach(u=>{if(s!==u)o.push([a+s,b+u]);}));}
 return o;}
const COMBOS=Object.fromEntries(ALL.map(x=>[x,comboList(x)]));

function Combos({init,onSave}){
 const [hero,setHero]=useState(init?init.hero:[]),[board,setBoard]=useState(init?init.board:[]),[grp,setGrp]=useState('hero');
 const [pos,setPos]=useState(init?init.pos:'UTG'),[st,setSt]=useState(init?init.st:100);
 const set=pos==='All hands'?new Set(ALL):RANGES[st][pos];
 const info=useMemo(()=>{const dead=new Set(hero.concat(board)),o={};ALL.forEach(x=>{o[x]=[COMBOS[x].length,COMBOS[x].filter(cc=>!cc.some(k=>dead.has(k))).length];});return o;},[hero,board]);
 const tog=k=>{
  if(grp==='hero')setHero(hero.includes(k)?hero.filter(x=>x!==k):board.includes(k)||hero.length>=2?hero:hero.concat(k));
  else setBoard(board.includes(k)?board.filter(x=>x!==k):hero.includes(k)||board.length>=5?board:board.concat(k));};
 let full=0,rem=0;const hit=[];
 set.forEach(x=>{const [f,r]=info[x];full+=f;rem+=r;if(r<f)hit.push([x,f,r]);});
 hit.sort((a,b)=>(b[1]-b[2])-(a[1]-a[2]));
 const chips=(a,v,fn)=>h('div',{className:'pos'},a.map(x=>h('button',{key:x,className:'chipb','aria-pressed':x===v,onClick:()=>fn(x)},typeof x==='number'?x+'bb':x)));
 const tiles=(a,e)=>a.length?a.map(k=>h('span',{key:k,className:'pc'+(/[hd]/.test(k[1])?' r':'')},fmt(k))):h('span',{className:'lbl'},e);
 return h('div',{className:'panel'},
  h('div',{className:'lbl'},'Cards to remove'),
  h('div',{className:'pos'},[['hero','Your hand (2)'],['board','Board (up to 5)']].map(([k,l])=>h('button',{key:k,className:'chipb','aria-pressed':grp===k,onClick:()=>setGrp(k)},l)),
   h('button',{className:'chipb',onClick:()=>{setHero([]);setBoard([]);}},'Clear')),
  h('div',{className:'deck'},SUITS.map(s=>R.map(r=>{const k=r+s,inH=hero.includes(k),inB=board.includes(k),oth=grp==='hero'?inB:inH;
   return h('button',{key:k,className:'dk'+(/[hd]/.test(s)?' r':'')+(inH?' h':inB?' b':'')+(oth?' x':''),'aria-pressed':inH||inB,'aria-label':r+' of '+s,disabled:oth,onClick:()=>tog(k)},h('span',null,r),h('span',null,SYM[s]));}))),
  h('div',{className:'boards'},h('div',{className:'board'},tiles(hero,'No hand selected')),h('div',{className:'board'},tiles(board,'No board'))),
  h('div',{className:'lbl'},'Opponent range'),chips(['All hands'].concat(POS),pos,setPos),chips(STACKS,st,setSt),
  h('div',{className:'grid'},ALL.map(x=>{const [f,r]=info[x],inR=set.has(x);
   return h('div',{key:x,className:'cell cc'+(inR?(r?' in':' in dim'):'')+(inR&&r<f?' cut':'')},x,inR?h('small',null,r+'/'+f):null);})),
  h('div',{className:'legend'},[['#c8302f','In range (combos left / total)'],['var(--fold)','Not in range']].map(([c,l])=>h('span',{key:l},h('i',{style:{background:c}}),l)),h('span',null,h('i',{style:{boxShadow:'inset 0 0 0 2px var(--accent)'}}),'Reduced by blockers')),
  h('div',{className:'stats'},
   h('div',null,h('div',{className:'big'},rem),h('div',{className:'lbl'},'combos left (of '+full+')')),
   h('div',null,h('div',{className:'big'},full?((full-rem)/full*100).toFixed(1)+'%':'0%'),h('div',{className:'lbl'},'removed by your cards'))),
  hit.length?h('p',{className:'note'},'Biggest changes: '+hit.slice(0,6).map(([x,f,r])=>x+' '+f+'\u2192'+r).join(', ')+'.'):null,
  h(SaveBar,{onSave:n=>onSave({type:'combo',title:'Combos: '+(hero.map(fmt).join(' ')||'no hand')+(board.length?' on '+board.map(fmt).join(' '):'')+' vs '+pos,params:{hero,board,pos,st},note:n})}),
  h('p',{className:'note'},'A pair has 6 combos, a suited hand 4 and an offsuit hand 12. Cards you hold or see on the board cannot be in your opponent\u2019s hand. For example, holding one ace turns AA from 6 combos into 3, AKs from 4 into 3 and AKo from 12 into 9.'));
}

const GLOSS=[
["GTO (game theory optimal)","A strategy that cannot be exploited. In a two-player zero-sum game, playing it guarantees you at least break-even against any opponent strategy, whatever they do."],
["Nash equilibrium","A set of strategies, one for each player, where no one can improve their expected value by changing only their own strategy. Solvers compute approximations of it, and GTO play is built on it."],
["Exploitative play","Deliberately deviating from GTO to take advantage of a specific opponent\u2019s mistakes, such as bluffing more against a player who folds too often. It gains EV but can itself be exploited."],
["EV (expected value)","The average result of a decision if you could repeat it many times: the sum of each outcome multiplied by its probability. A +EV play wins money on average and a \u2212EV play loses it."],
["Range","The full set of hands a player could hold in a given spot, based on how they have played so far. GTO thinking assigns ranges to players, not single hands."],
["Combos","The individual two-card combinations that make up a hand type. A pocket pair has 6 combos, a suited hand 4 and an offsuit hand 12, and there are 1,326 starting combos in total."],
["Blockers","Cards in your hand (or on the board) that make certain opponent holdings less likely. Holding an ace removes combos of AA and AK from your opponent\u2019s range."],
["Equity","Your share of the pot on average if all remaining cards were dealt with no further betting. A hand with 60% equity wins the pot 60% of the time, counting ties as shared."],
["Equity realization","How much of your raw equity you actually collect. Position, hand playability and stack depth change it: suited connectors in position realize more than weak offsuit hands out of position."],
["Pot odds","The price a call offers. Equity you need = call \u00f7 (pot after your call). Calling 50 into a pot of 100 plus a 50 bet needs 50 \u00f7 200 = 25% equity."],
["Implied odds","Extra money you expect to win on later streets when you hit your hand. They let you call with less equity than pot odds alone require, mostly with deep stacks and hidden hands like sets."],
["MDF (minimum defense frequency)","The share of your range you must continue with against a bet so the bettor\u2019s pure bluffs cannot profit. MDF = pot \u00f7 (pot + bet), so versus a half-pot bet you defend about 67%."],
["Alpha","The fold frequency a pure bluff needs to break even: bet \u00f7 (pot + bet). It equals 1 \u2212 MDF. A half-pot bluff needs the opponent to fold 33% of the time."],
["Polarized range","A betting range made of very strong hands and bluffs, with few medium-strength hands. Large bets and overbets usually come from polarized ranges."],
["Merged range","A range of strong and medium-strength hands with few bluffs, also called linear or condensed. It usually bets smaller and more often, because medium hands want to get value from worse."],
["Range advantage","Your range has more equity on average than your opponent\u2019s on a given board. The player with it can bet more often, usually with smaller sizes."],
["Nut advantage","You hold a larger share of the strongest possible hands. It supports big bets and overbets, even if the opponent has more medium-strength hands."],
["Mixed strategy","Taking different actions with the same hand at set frequencies, such as raising 60% and calling 40%. Solvers mix so opponents cannot guess what you hold."],
["Indifference","When two actions have the same EV for a hand, so you are indifferent between them. A mixed strategy is only optimal with hands that are indifferent."],
["Balance","Having the right proportion of value hands to bluffs in a range so the opponent gains nothing by always calling or always folding."],
["Value bet","A bet made because you expect to be called by worse hands."],
["Bluff","A bet or raise made with a hand that expects to win mostly because the opponent folds. A semi-bluff is a bluff with a draw that can still improve to the best hand."],
["Bluff catcher","A hand that beats only bluffs, such as a medium pair facing a polarized bet. Whether to call depends on the pot odds and the number of bluffs in the bettor\u2019s range."],
["C-bet (continuation bet)","A bet on the flop by the player who raised preflop. How often and how big depends on the board texture and on who has the range advantage."],
["Board texture","The character of the community cards, such as dry, wet, paired or monotone. It decides which ranges connect and how often and how big to bet."],
["RFI (raise first in)","Opening the pot with a raise when everyone before you has folded. Opening ranges grow wider as you move closer to the button."],
["3-bet, 4-bet, 5-bet","The raises that follow the big blind: the first raise is the open, a re-raise is the 3-bet, then the 4-bet and 5-bet. A 5-bet is often an all-in at 100bb."],
["Squeeze","A 3-bet made after one player opens and at least one other calls. Callers have capped ranges, so squeezes are often more profitable than a plain 3-bet."],
["Position (IP / OOP)","Acting after the opponent is in position (IP) and acting before them is out of position (OOP). Being IP gives you more information and better equity realization."],
["Check-raise","Checking and then raising after the opponent bets. A balanced check-raise range combines strong hands with draws and other bluffs."],
["Overbet","A bet larger than the pot. Overbets work best with a nut advantage and a polarized range."],
["Geometric sizing","Betting the same fraction of the pot on each street so that the stacks are all in by the river. It is a common plan with strong or polarized ranges."],
["SPR (stack-to-pot ratio)","The effective stack divided by the pot on the flop. Low SPR means committing with top pair is natural, and high SPR makes drawing hands and nutty hands more valuable."],
["Frequency","How often a strategy takes an action in a spot, such as betting 33% of the time. Solver charts show frequencies for each hand, not just a yes or no."],
["Solver","Software that computes near-GTO strategies for a defined spot, usually with counterfactual regret minimization. Solvers need the ranges, bet sizes and stack depth as inputs."],
["ICM (Independent Chip Model)","A method that turns tournament chip stacks into estimated prize-pool equity. Near pay jumps, losing chips costs more than winning chips earn, so ranges tighten."],
["Push/fold","Short-stack play where the only options preflop are going all-in or folding. It applies at low stack depths, around 10bb or less, and is solved with Nash equilibrium charts."]
].sort((a,b)=>a[0].localeCompare(b[0]));
function Glossary(){
 const [q,setQ]=useState(''),l=q.trim().toLowerCase();
 const list=GLOSS.filter(([t,d])=>!l||t.toLowerCase().includes(l)||d.toLowerCase().includes(l));
 return h('div',{className:'panel gl'},
  h('input',{type:'text',placeholder:'Search terms','aria-label':'Search glossary',value:q,onChange:e=>setQ(e.target.value)}),
  h('div',{className:'lbl',style:{margin:'8px 0'}},list.length+' of '+GLOSS.length+' terms'),
  list.length?list.map(([t,d])=>h('div',{key:t,className:'term'},h('b',null,t),h('p',null,d))):h('p',{className:'note'},'No terms match your search.'));
}

const decHex=hx=>{const s=new Set();ALL.forEach((x,i)=>{if((parseInt(hx[i>>2],16)>>(3-(i&3)))&1)s.add(x);});return s;};
const BFL=['Chip EV (1.0)','Light ICM (1.2)','Bubble (1.5)','Heavy ICM (2.0)'];
function PushFold({init,onSave}){
 const [st,setSt]=useState(init?init.st:10),[bf,setBf]=useState(init?init.bf:0),[who,setWho]=useState(init?init.who:'SB shove');
 const [sSet,cSet]=useMemo(()=>PF[st][bf].map(decHex),[st,bf]);
 const isCall=who==='BB call',set=isCall?cSet:sSet,B=BFS[bf];
 const share=s=>[...s].reduce((a,x)=>a+cm(x),0)/1326;
 const need=(B*st-1)/(st*(1+B));
 return h('div',{className:'panel'},
  h('div',{className:'pos'},['SB shove','BB call'].map(x=>h('button',{key:x,className:'chipb','aria-pressed':x===who,onClick:()=>setWho(x)},x))),
  h('label',{htmlFor:'pf-stack'},'Effective stack: '+st+'bb'),
  h('input',{id:'pf-stack',type:'range',min:8,max:20,step:1,value:st,onChange:e=>setSt(+e.target.value)}),
  h('div',{className:'lbl'},'Bubble factor'),
  h('div',{className:'pos'},BFL.map((l,i)=>h('button',{key:l,className:'chipb','aria-pressed':i===bf,onClick:()=>setBf(i)},l))),
  h('div',{className:'grid'},ALL.map(x=>h('div',{key:x,className:'cell'+(set.has(x)?(isCall?' call':' allin'):'')},x))),
  h('div',{className:'legend'},[[isCall?'#2b8a3e':'#7a1018',isCall?'Call':'Shove (all-in)'],['var(--fold)','Fold']].map(([c,l])=>h('span',{key:l},h('i',{style:{background:c}}),l))),
  h('div',{className:'stats'},
   h('div',null,h('div',{className:'big'},pct(share(set),1)),h('div',{className:'lbl'},isCall?'of hands called':'of hands shoved')),
   isCall?h('div',null,h('div',{className:'big'},pct(need,1)),h('div',{className:'lbl'},'equity needed to call')):h('div',null,h('div',{className:'big'},pct(1-share(cSet),1)),h('div',{className:'lbl'},'of hands BB folds'))),
  h(SaveBar,{onSave:n=>onSave({type:'pf',title:'Push/fold: '+who+', '+st+'bb, BF '+B,params:{st,bf,who},note:n})}),
  h('p',{className:'note'},'Heads-up Nash push/fold: SB either shoves or folds and BB either calls or folds, with no antes (SB posts 0.5bb, BB posts 1bb). The charts were solved with fictitious play from a simulated 169-by-169 hand equity table, so hands right at a cutoff can flip with small changes. The bubble factor is how much more losing chips costs than winning them gains, and here it applies to both players, like two short stacks near a pay jump. Equity needed to call = (BF \u00d7 stack \u2212 1) \u00f7 (stack \u00d7 (1 + BF)). Tables with more than two players need a multiway solver, so treat these as a guide there.'));
}

const SPRP=[['Single-raised',97.5,5.5],['3-bet pot',92,16.5],['4-bet pot',80,40.5]],STREETS=['Flop','Turn','River'];
function Spr({init,onSave}){
 const [stack,setStack]=useState(init?init.stack:97.5),[pot,setPot]=useState(init?init.pot:5.5),[from,setFrom]=useState(init?init.from:3);
 const S=+stack||0,P=+pot||0,ok=S>0&&P>0,spr=ok?S/P:0,f=ok?(Math.pow(1+2*spr,1/from)-1)/2:0;
 const rows=[];let p=P,s=S;
 if(ok)for(let k=0;k<from;k++){const b=f*p;rows.push([STREETS[3-from+k],b,f*100,p,s-b]);p+=2*b;s-=b;}
 const tip=spr<=3?'Low SPR: top pair and better can usually commit, and there is little room to maneuver or bluff.':spr<=8?'Medium SPR: overpairs, strong top pair and good draws can play for stacks, while marginal hands prefer smaller pots.':'High SPR: you need strong hands or strong draws to commit, so bets can start small and grow each street.';
 const num=(id,l,v,fn)=>h('div',null,h('label',{htmlFor:id},l),h('input',{id,type:'number',min:0,step:'any',value:v,onChange:e=>fn(e.target.value)}));
 return h('div',{className:'panel'},
  h('div',{className:'pos'},SPRP.map(([l,a,b])=>h('button',{key:l,className:'chipb',onClick:()=>{setStack(a);setPot(b);setFrom(3);}},l+' (100bb)'))),
  h('div',{className:'row'},num('spr-stack','Effective stack (bb)',stack,setStack),num('spr-pot','Pot (bb)',pot,setPot)),
  h('div',{className:'lbl'},'Start betting on'),
  h('div',{className:'pos'},[[3,'Flop'],[2,'Turn'],[1,'River']].map(([n,l])=>h('button',{key:n,className:'chipb','aria-pressed':n===from,onClick:()=>setFrom(n)},l+' ('+n+(n===1?' bet)':' bets)')))),
  ok?h('div',null,
   h('div',{className:'stats'},
    h('div',null,h('div',{className:'big'},spr.toFixed(1)),h('div',{className:'lbl'},'SPR')),
    h('div',null,h('div',{className:'big'},(f*100).toFixed(0)+'%'),h('div',{className:'lbl'},'pot per bet'+(f>1?' (overbet)':'')))),
   h('div',{style:{overflowX:'auto',marginTop:12}},h('table',{className:'tbl'},
    h('thead',null,h('tr',null,['Street','Bet','% pot','Pot before','Stack after'].map(t=>h('th',{key:t},t)))),
    h('tbody',null,rows.map(r=>h('tr',{key:r[0]},h('td',null,r[0]),h('td',null,r[1].toFixed(1)),h('td',null,r[2].toFixed(0)+'%'),h('td',null,r[3].toFixed(1)),h('td',null,Math.max(0,r[4]).toFixed(1))))))),
   h('p',{className:'note'},tip)):h('p',{className:'note'},'Enter a stack and a pot above zero.'),
  h(SaveBar,{onSave:n=>onSave({type:'spr',title:'SPR '+spr.toFixed(1)+': '+S+'bb stack, '+P+'bb pot',params:{stack:S,pot:P,from},note:n})}),
  h('p',{className:'note'},'A geometric plan bets the same fraction of the pot on every remaining street so the stack is all-in by the river. Each bet and call multiplies the pot by (1 + 2 \u00d7 fraction), so fraction = ((1 + 2 \u00d7 SPR)^(1 \u00f7 bets) \u2212 1) \u00f7 2. Solvers mix several sizes, so treat this as a baseline. Stack and pot are in big blinds; the presets assume a BTN open to 2.5bb, a 3-bet to 8bb and a 4-bet to 20bb.'));
}

function evalPack(mask,n){let v=0,k=n;for(let r=12;r>=0&&k>0;r--)if((mask>>r)&1){v=v*16+r;k--;}while(k-->0)v*=16;return v;}
function strHi(m){const x=(m<<1)|((m>>12)&1);for(let q=13;q>=4;q--)if(((x>>(q-4))&31)===31)return q-1;return -1;}
function eval7(c){
 const rc=new Array(13).fill(0),sm=[0,0,0,0],sc=[0,0,0,0];let rm=0;
 for(const k of c){const r=k>>2,u=k&3;rc[r]++;sm[u]|=1<<r;sc[u]++;rm|=1<<r;}
 for(let u=0;u<4;u++)if(sc[u]>=5){const q=strHi(sm[u]);if(q>=0)return (8<<20)|q;}
 let q4=-1,t=-1,t2=-1,p1=-1,p2=-1;
 for(let r=12;r>=0;r--){if(rc[r]===4){if(q4<0)q4=r;}else if(rc[r]===3){if(t<0)t=r;else if(t2<0)t2=r;}else if(rc[r]===2){if(p1<0)p1=r;else if(p2<0)p2=r;}}
 if(q4>=0)return (7<<20)|(q4<<16)|evalPack(rm&~(1<<q4),1);
 if(t>=0&&(t2>=0||p1>=0))return (6<<20)|(t<<16)|(Math.max(t2,p1)<<12);
 for(let u=0;u<4;u++)if(sc[u]>=5)return (5<<20)|evalPack(sm[u],5);
 const q=strHi(rm);if(q>=0)return (4<<20)|q;
 if(t>=0)return (3<<20)|(t<<16)|evalPack(rm&~(1<<t),2);
 if(p1>=0&&p2>=0)return (2<<20)|(p1<<16)|(p2<<12)|evalPack(rm&~(1<<p1)&~(1<<p2),1);
 if(p1>=0)return (1<<20)|(p1<<16)|evalPack(rm&~(1<<p1),3);
 return evalPack(rm,5);
}
const cardN=k=>(12-RI[k[0]])*4+SUITS.indexOf(k[1]);
const DECK=[];R.forEach(r=>SUITS.forEach(s=>DECK.push(r+s)));
const rnd=n=>Math.floor(Math.random()*n),pickOf=a=>a[rnd(a.length)];
function wpick(l,wf){let r=Math.random()*l.reduce((t,x)=>t+wf(x),0);for(const x of l){r-=wf(x);if(r<=0)return x;}return l[l.length-1];}
const dealC=(x,dead)=>{const l=COMBOS[x].filter(cc=>!cc.some(k=>dead.includes(k)));return pickOf(l.length?l:COMBOS[x]);};
function runout(hc,ox,seat){
 const oc=dealC(ox,hc),dead=new Set(hc.concat(oc)),rest=DECK.filter(k=>!dead.has(k));
 const ev=(a,b)=>eval7(a.concat(b).map(cardN));
 const draw=()=>{const a=rest.slice();for(let i=0;i<5;i++){const j=i+rnd(a.length-i);[a[i],a[j]]=[a[j],a[i]];}return a.slice(0,5);};
 let w=0;const N=400;
 for(let i=0;i<N;i++){const b=draw(),x=ev(hc,b),y=ev(oc,b);w+=x>y?1:x===y?.5:0;}
 const board=draw(),x=ev(hc,board),y=ev(oc,board);
 return {oc,board,seat,res:x>y?'win':x<y?'lose':'tie',eq:w/N};
}

const TK=[['open','Open'],['vsopen','Vs open'],['vs3','Vs 3-bet'],['vs4','Vs 4-bet']],KL={open:'Open (RFI)',vsopen:'Facing an open',vs3:'Facing a 3-bet',vs4:'Facing a 4-bet'};
const seatsOf=t=>(t==='6-max'?P6:POS).concat('BB'),ck=(t,s)=>t==='6-max'?(MAP6[s]||s):s;
const openSet=(cfg,s)=>{const key=ck(cfg.tbl,s),b=RANGES[cfg.st][key];return cfg.mode==='Tournament'?wide(b,ANTE[key]):b;};
const openSz=(cfg,s)=>cfg.st===15?'all-in':s==='SB'?'3':cfg.st===25?'2':cfg.st===50?'2.2':'2.5';
const callsShove=x=>ORD.indexOf(x)<=9;
function makeNode(cfg){
 const S=seatsOf(cfg.tbl),can=cfg.st===100;
 let ks=(cfg.kinds.length?cfg.kinds:['open','vsopen','vs3','vs4']).filter(k=>k==='open'||can);
 if(!ks.length)ks=['open'];
 const pool=cfg.seats.length?cfg.seats:S;
 for(let t=0;t<80;t++){
  const kind=pickOf(ks),hero=pickOf(pool),i=S.indexOf(hero),hk=ck(cfg.tbl,hero);
  if(kind==='open'){
   if(hero==='BB')continue;
   const set=openSet(cfg,hero),hand=Math.random()<.5?pickOf([...set]):pickOf(ALL);
   return {kind,hero,hand,gto:set.has(hand)?'raise':'fold'};
  }
  if(kind==='vsopen'){
   if(i<1)continue;
   const o=pickOf(S.slice(0,i)),m=solve(ck(cfg.tbl,o),hk,0).m,cl=pickOf(['r','c','f']),pl=ALL.filter(x=>cl==='f'?!m[x]:m[x]===cl);
   if(!pl.length)continue;
   const hand=pickOf(pl);
   return {kind,hero,opener:o,hand,gto:{r:'raise',c:'call'}[m[hand]]||'fold'};
  }
  if(kind==='vs3'){
   if(hero==='BB'||i>=S.length-1)continue;
   const d=pickOf(S.slice(i+1)),dk=ck(cfg.tbl,d),m=solve(hk,dk,1).m,hand=pickOf([...RANGES[100][hk]]);
   return {kind,hero,def:d,hand,oppHand:pickOf(solve(hk,dk,2).pool),gto:{a:'allin',r:'raise',c:'call'}[m[hand]]||'fold'};
  }
  if(i<1)continue;
  const o=pickOf(S.slice(0,i)),ok=ck(cfg.tbl,o),s1=solve(ok,hk,1).m,s2=solve(ok,hk,2),op=[...RANGES[100][ok]].filter(x=>s1[x]==='r');
  if(!op.length)continue;
  const hand=pickOf(s2.pool);
  return {kind:'vs4',hero,opener:o,hand,oppHand:pickOf(op),gto:{a:'allin',c:'call'}[s2.m[hand]]||'fold'};
 }
 return {kind:'open',hero:'BTN',hand:'AA',gto:'raise'};
}
function actsOf(n,cfg){
 const S=seatsOf(cfg.tbl),a={},hi=S.indexOf(n.hero),so=s=>'Raise '+openSz(cfg,s),s3=s=>SZ3[ck(cfg.tbl,s)];
 if(n.kind==='open')S.slice(0,hi).forEach(s=>a[s]='Fold');
 else if(n.kind==='vsopen'){const oi=S.indexOf(n.opener);S.slice(0,oi).forEach(s=>a[s]='Fold');a[n.opener]=so(n.opener);S.slice(oi+1,hi).forEach(s=>a[s]='Fold');}
 else if(n.kind==='vs3'){S.slice(0,hi).forEach(s=>a[s]='Fold');a[n.hero]=so(n.hero);S.slice(hi+1,S.indexOf(n.def)).forEach(s=>a[s]='Fold');a[n.def]='3-bet '+s3(n.def);}
 else{const oi=S.indexOf(n.opener);S.slice(0,oi).forEach(s=>a[s]='Fold');S.slice(oi+1,hi).forEach(s=>a[s]='Fold');a[n.opener]='4-bet 22';a[n.hero]='3-bet '+s3(n.hero);}
 return a;
}
function storyOf(n,cfg){
 const s3=s=>SZ3[ck(cfg.tbl,s)];
 if(n.kind==='open')return 'Folded to you on the '+n.hero+'.';
 if(n.kind==='vsopen')return n.opener+' raises to '+openSz(cfg,n.opener)+'. Action is on you on the '+n.hero+'.';
 if(n.kind==='vs3')return 'You opened to '+openSz(cfg,n.hero)+' from the '+n.hero+'. '+n.def+' 3-bets to '+s3(n.def)+'.';
 return n.opener+' opened, you 3-bet to '+s3(n.hero)+' from the '+n.hero+', and '+n.opener+' 4-bets to 22.';
}
function optsOf(n,cfg){
 const f=['fold','Fold'],c=['call','Call'],a=['allin','All-in 100'];
 if(n.kind==='open')return [f,['raise',cfg.st===15?'All-in 15':'Raise '+openSz(cfg,n.hero)]];
 if(n.kind==='vsopen')return [f,c,['raise','Raise '+SZ3[ck(cfg.tbl,n.hero)]],a];
 if(n.kind==='vs3')return [f,c,['raise','Raise 22'],a];
 return [f,c,a];
}
function respOpen(cfg,hero,s){
 if(cfg.st===100){const m=solve(ck(cfg.tbl,hero),ck(cfg.tbl,s),0).m,x=wpick(ALL,cm);return {hand:x,act:{r:'3bet',c:'call'}[m[x]]||'fold'};}
 if(s!=='BB')return {act:'fold'};
 const b=BBR[cfg.st],x=wpick(ALL,cm);
 return {hand:x,act:b.b3.has(x)?'3bet':b.def.has(x)?'call':'fold'};
}
function resolve(n,a,cfg,cards){
 const S=seatsOf(cfg.tbl),hi=S.indexOf(n.hero),fl='The flop comes next (postflop is not simulated yet).';
 const end=t=>({lines:[t],next:null}),sd=(oh,seat,t)=>({lines:[t],next:null,sd:runout(cards,oh,seat)});
 if(a==='fold')return end('You fold.');
 if(n.kind==='open'){
  for(const s of S.slice(hi+1)){
   const r=respOpen(cfg,n.hero,s);if(r.act==='fold')continue;
   if(r.act==='call')return cfg.st===15?sd(r.hand,s,s+' calls your all-in.'):end(s+' calls. '+fl);
   if(cfg.st!==100)return end(s+(cfg.st<=50?' shoves all-in. ':' 3-bets. ')+'The charts for facing it exist at 100bb only, so the hand ends here.');
   const m=solve(ck(cfg.tbl,n.hero),ck(cfg.tbl,s),1).m;
   return {lines:[s+' 3-bets to '+SZ3[ck(cfg.tbl,s)]+'.'],next:{kind:'vs3',hero:n.hero,def:s,hand:n.hand,oppHand:r.hand,gto:{a:'allin',r:'raise',c:'call'}[m[n.hand]]||'fold'}};
  }
  return end('Everyone folds. You win the blinds.');
 }
 if(n.kind==='vsopen'){
  if(a==='call')return end('You call. '+fl);
  const ok=ck(cfg.tbl,n.opener),hk=ck(cfg.tbl,n.hero),oh=wpick([...RANGES[100][ok]],cm);
  if(a==='allin')return callsShove(oh)?sd(oh,n.opener,n.opener+' calls your all-in.'):end(n.opener+' folds. You win the pot.');
  const oc=solve(ok,hk,1).m[oh];
  if(oc==='a')return callsShove(n.hand)?sd(oh,n.opener,n.opener+' shoves over your 3-bet and you call.'):end(n.opener+' shoves over your 3-bet and you fold.');
  if(oc==='r')return {lines:[n.opener+' 4-bets to 22.'],next:{kind:'vs4',hero:n.hero,opener:n.opener,hand:n.hand,oppHand:oh,gto:{a:'allin',c:'call'}[solve(ok,hk,2).m[n.hand]]||'fold'}};
  if(oc==='c')return end(n.opener+' calls your 3-bet. '+fl);
  return end(n.opener+' folds. You win the pot.');
 }
 if(n.kind==='vs3'){
  if(a==='call')return end('You call. '+fl);
  if(a==='allin')return callsShove(n.oppHand)?sd(n.oppHand,n.def,n.def+' calls your all-in.'):end(n.def+' folds. You win the pot.');
  const oc=solve(ck(cfg.tbl,n.hero),ck(cfg.tbl,n.def),2).m[n.oppHand];
  if(oc==='a')return callsShove(n.hand)?sd(n.oppHand,n.def,n.def+' 5-bets all-in and you call.'):end(n.def+' 5-bets all-in and you fold.');
  if(oc==='c')return end(n.def+' calls your 4-bet. '+fl);
  return end(n.def+' folds. You win the pot.');
 }
 if(a==='call')return end('You call. '+fl);
 return callsShove(n.oppHand)?sd(n.oppHand,n.opener,n.opener+' calls your all-in.'):end(n.opener+' folds. You win the pot.');
}

function Felt({seats,hero,sel,acts,board,onSeat}){
 const N=seats.length,pt=i=>{const th=(120+i*360/N)*Math.PI/180;return [50+43*Math.cos(th),50+40*Math.sin(th)];},bi=seats.indexOf('BTN'),[bx,by]=pt(bi);
 return h('div',{className:'felt'},h('div',{className:'rail'}),
  h('div',{className:'fboard'},[0,1,2,3,4].map(i=>board&&board[i]?h('span',{key:i,className:'bc'+(/[hd]/.test(board[i][1])?' r':'')},fmt(board[i])):h('span',{key:i,className:'bc'}))),
  seats.map((s,i)=>{const [x,y]=pt(i),a=acts&&acts[s],on=!!(sel&&sel.includes(s)),cl='ts'+(s===hero?' hero':'')+(on?' sel':'')+(a==='Fold'?' fold':''),st={left:x+'%',top:y+'%'};
   return onSeat?h('button',{key:s,className:cl,style:st,'aria-pressed':on,onClick:()=>onSeat(s)},s,a?h('small',null,a):null):h('div',{key:s,className:cl,style:st},s,a?h('small',null,a):null);}),
  h('span',{className:'dealer',style:{left:(bx+(50-bx)*.28)+'%',top:(by+(50-by)*.28)+'%'}},'D'));
}

const ACT={fold:'folds',call:'calls',raise:'raises',allin:'goes all-in'};
function Trainer(){
 const [ph,setPh]=useState('setup'),[cfg,setCfg]=useState({mode:'Cash',tbl:'6-max',st:100,kinds:[],seats:[],n:10,fb:'each'});
 const [log,setLog]=useState([]),[idx,setIdx]=useState(1),[hd,setHd]=useState(null);
 const S=seatsOf(cfg.tbl),up=(k,v)=>setCfg({...cfg,[k]:v,...(k==='tbl'?{seats:[]}:{})});
 const mk=()=>{const node=makeNode(cfg);return {node,last:node,cards:dealC(node.hand,[]),lines:[],fbk:null,sd:null};};
 const begin=()=>{setLog([]);setIdx(1);setHd(mk());setPh('play');};
 const decide=a=>{const n=hd.node,ok=a===n.gto,r=resolve(n,a,cfg,hd.cards);
  setLog(log.concat([{kind:n.kind,hero:n.hero,hand:n.hand,pick:a,gto:n.gto,ok}]));
  setHd({...hd,node:r.next,last:r.next||n,lines:r.lines,fbk:{ok,gto:n.gto,hand:n.hand},sd:r.sd||null});};
 const next=()=>{if(idx>=cfg.n)setPh('done');else{setIdx(idx+1);setHd(mk());}};
 const chips=(a,on,fn,dis)=>h('div',{className:'pos'},a.map(([k,l])=>h('button',{key:k,className:'chipb','aria-pressed':on(k),disabled:!!(dis&&dis(k)),onClick:()=>fn(k)},l)));
 if(ph==='setup')return h('div',{className:'panel'},
  h(Felt,{seats:S,sel:cfg.seats,onSeat:s=>up('seats',cfg.seats.includes(s)?cfg.seats.filter(x=>x!==s):cfg.seats.concat(s))}),
  h('p',{className:'note',style:{textAlign:'center',marginTop:0}},'Tap seats to choose where you sit. None selected means any seat.'),
  h('div',{className:'lbl'},'Game'),chips([['Cash','Cash'],['Tournament','Tournament']],k=>k===cfg.mode,k=>up('mode',k)),
  h('div',{className:'lbl'},'Table'),chips([['6-max','6-max'],['9-max','9-max']],k=>k===cfg.tbl,k=>up('tbl',k)),
  h('div',{className:'lbl'},'Stack'),chips(STACKS.map(s=>[s,s+'bb']),k=>k===cfg.st,k=>up('st',k)),
  h('div',{className:'lbl'},'Decision'),chips([['any','Any']].concat(TK),k=>k==='any'?!cfg.kinds.length:cfg.kinds.includes(k),k=>up('kinds',k==='any'?[]:cfg.kinds.includes(k)?cfg.kinds.filter(x=>x!==k):cfg.kinds.concat(k)),k=>cfg.st!==100&&k!=='any'&&k!=='open'),
  h('div',{className:'lbl'},'Hands per session'),chips([10,25,50].map(n=>[n,String(n)]),k=>k===cfg.n,k=>up('n',k)),
  h('div',{className:'lbl'},'Feedback'),chips([['each','After each hand'],['end','At the end']],k=>k===cfg.fb,k=>up('fb',k)),
  h('button',{className:'btn big',onClick:begin},'Start training'),
  h('p',{className:'note'},'You play preflop against opponents that follow this app\u2019s chart approximations, not solver output. Spots facing a raise use the 100bb charts, so other stacks practice opening only. Follow-up reactions to all-ins are simple assumptions and are not scored. Postflop is not simulated yet.'));
 if(ph==='done'){
  const tot=log.length,ok=log.filter(x=>x.ok).length,by={};log.forEach(x=>{by[x.kind]=by[x.kind]||[0,0];by[x.kind][1]++;if(x.ok)by[x.kind][0]++;});
  const miss=log.filter(x=>!x.ok).slice(0,12);
  return h('div',{className:'panel'},
   h('div',{className:'stats'},h('div',null,h('div',{className:'big'},tot?Math.round(ok/tot*100)+'%':'\u2013'),h('div',{className:'lbl'},'accuracy')),h('div',null,h('div',{className:'big'},ok+' / '+tot),h('div',{className:'lbl'},'decisions correct'))),
   tot?h('table',{className:'tbl',style:{marginTop:12}},h('thead',null,h('tr',null,['Spot','Correct','Total'].map(t=>h('th',{key:t},t)))),h('tbody',null,Object.keys(by).map(k=>h('tr',{key:k},h('td',null,KL[k]),h('td',null,by[k][0]),h('td',null,by[k][1]))))):null,
   miss.length?h('div',null,h('div',{className:'lbl',style:{marginTop:14}},'Mistakes'),h('ul',{className:'tips'},miss.map((x,i)=>h('li',{key:i},x.hand+' on the '+x.hero+' ('+KL[x.kind]+'): you chose '+x.pick+', the chart '+ACT[x.gto]+'.')))):null,
   h('div',{className:'spotbtns'},h('button',{className:'btn',onClick:begin},'Train again'),h('button',{className:'btn ghost',onClick:()=>setPh('setup')},'Change settings')),
   h('p',{className:'note'},'Accuracy compares your choices to this app\u2019s approximate charts.'));
 }
 const n=hd.node,sdv=hd.sd,acts=actsOf(hd.last,cfg),show=cfg.fb==='each'&&hd.fbk,okc=log.filter(x=>x.ok).length;
 return h('div',{className:'panel'},
  h('div',{className:'score'},h('span',null,'Hand '+idx+' / '+cfg.n),h('span',null,cfg.fb==='each'?okc+' / '+log.length+' correct':'Feedback at the end')),
  h(Felt,{seats:S,hero:hd.last.hero,acts,board:sdv?sdv.board:null}),
  h('div',{className:'boards',style:{justifyContent:'center'}},h('div',{className:'board'},hd.cards.map(k=>h('span',{key:k,className:'pc'+(/[hd]/.test(k[1])?' r':'')},fmt(k))))),
  h('p',{className:'where'},hd.lines.length?hd.lines.join(' '):storyOf(n,cfg)),
  show?h('div',{className:'fb'+(hd.fbk.ok?'':' bad'),role:'status'},h('strong',null,hd.fbk.ok?'Correct. ':'Not quite. '),'The chart '+ACT[hd.fbk.gto]+' with '+hd.fbk.hand+' here.'):null,
  sdv?h('p',{className:'note'},'Opponent ('+sdv.seat+') shows '+sdv.oc.map(fmt).join(' ')+'. '+(sdv.res==='win'?'You win':sdv.res==='lose'?'You lose':'You split')+' the pot. Your equity before the board was about '+Math.round(sdv.eq*100)+'%.'):null,
  n?h('div',{className:'acts',style:{gridTemplateColumns:'repeat('+Math.min(optsOf(n,cfg).length,2)+',1fr)',marginTop:12}},optsOf(n,cfg).map(([k,l])=>h('button',{key:k,className:'act'+(k==='fold'?' f':k==='call'?' cl':''),onClick:()=>decide(k)},l)))
   :h('div',{className:'spotbtns'},h('button',{className:'btn',onClick:next},idx>=cfg.n?'See results':'Next hand'),h('button',{className:'btn ghost',onClick:()=>setPh('done')},'End session')));
}

function App(){
 const [tab,setTab]=useState('ranges'),[load,setLoad]=useState(null);
 const [saved,setSaved]=useState(()=>{try{return JSON.parse(localStorage.getItem('gto-saved')||'[]');}catch(e){return [];}});
 useEffect(()=>{try{localStorage.setItem('gto-saved',JSON.stringify(saved));}catch(e){}},[saved]);
 const save=s=>setSaved([{...s,id:Date.now()+Math.random().toString(36).slice(2,6)},...saved]);
 const open=s=>{setLoad(s);setTab(s.type);};
 const init=load&&load.type===tab?load.params:null,key=tab+(init?load.id:''),pr={key,init,onSave:save};
 const [menu,setMenu]=useState(null);
 const NAV=[['Preflop',[['ranges','Open ranges'],['tree','3-bet / 4-bet'],['pf','Push/fold']]],['Postflop',[['post','Postflop basics'],['spr','SPR planner']]],['Train',[['train','Trainer'],['quiz','Practice']]],['Tools',[['combo','Combos'],['math','Bet math'],['gloss','Glossary']]]];
 const LBL=Object.fromEntries(NAV.flatMap(g=>g[1]).concat([['saved','Saved spots']])),SAV='Saved ('+saved.length+')';
 const go=k=>{setTab(k);setMenu(null);window.scrollTo(0,0);};
 useEffect(()=>{
  if(!menu)return;
  const dn=e=>{if(!e.target.closest('.nav'))setMenu(null);},kd=e=>{if(e.key==='Escape')setMenu(null);};
  document.addEventListener('pointerdown',dn);document.addEventListener('keydown',kd);
  return()=>{document.removeEventListener('pointerdown',dn);document.removeEventListener('keydown',kd);};
 },[menu]);
 return h('div',null,
  h('nav',{className:'nav','aria-label':'Main'},
   h('div',{className:'navin'},
    h('button',{className:'navbrand',onClick:()=>go('ranges'),'aria-label':'GTO Poker Coach, go to Open ranges'},h('img',{src:logo,alt:'',width:345,height:360}),h('span',null,'GTO Poker ',h('b',null,'Coach'))),
    h('div',{className:'navlinks'},
     NAV.map(([g,items])=>h('div',{key:g,className:'ngw'},
      h('button',{className:'ng','aria-haspopup':'true','aria-expanded':menu===g,'aria-current':items.some(x=>x[0]===tab)?'true':undefined,onClick:()=>setMenu(menu===g?null:g)},g,h('i',{className:'car'})),
      menu===g?h('div',{className:'drop',role:'menu'},items.map(([k,l])=>h('button',{key:k,role:'menuitem',className:'ni'+(tab===k?' on':''),'aria-current':tab===k?'page':undefined,onClick:()=>go(k)},l))):null)),
     h('button',{className:'ng','aria-current':tab==='saved'?'page':undefined,onClick:()=>go('saved')},SAV)),
    h('button',{className:'burger','aria-label':'Menu','aria-expanded':menu==='mobile','aria-controls':'mpanel',onClick:()=>setMenu(menu==='mobile'?null:'mobile')},h('span'),h('span'),h('span'))),
   menu==='mobile'?h('div',{id:'mpanel',className:'mpanel'},
    NAV.map(([g,items])=>h('div',{key:g},h('div',{className:'mh'},g),h('div',{className:'mgrid'},items.map(([k,l])=>h('button',{key:k,className:'mi'+(tab===k?' on':''),'aria-current':tab===k?'page':undefined,onClick:()=>go(k)},l))))),
    h('div',{className:'mh'},'Saved'),h('div',{className:'mgrid'},h('button',{className:'mi'+(tab==='saved'?' on':''),'aria-current':tab==='saved'?'page':undefined,onClick:()=>go('saved')},SAV))):null),
  h('main',{className:'wrap'},
   h('h2',{className:'pt'},LBL[tab]),
   tab==='ranges'?h(Ranges,pr):tab==='tree'?h(Tree,pr):tab==='post'?h(Postflop,pr):tab==='combo'?h(Combos,pr):tab==='spr'?h(Spr,pr):tab==='pf'?h(PushFold,pr):tab==='train'?h(Trainer):tab==='math'?h(Calc):tab==='quiz'?h(Quiz):tab==='gloss'?h(Glossary):h(Saved,{saved,setSaved,open})));
}

export default App;