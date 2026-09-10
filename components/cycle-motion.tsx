'use client';
import { useEffect, useState } from 'react';
import { Lottie } from 'lottie-react';
// Original geometric motion asset; no third-party animation licensing required.
const animation={v:'5.7.4',fr:30,ip:0,op:90,w:100,h:100,nm:'Product cycles',ddd:0,assets:[],layers:[{ddd:0,ind:1,ty:4,nm:'Cycle',sr:1,ks:{o:{a:0,k:100},r:{a:1,k:[{t:0,s:[0],e:[180]},{t:90,s:[180]}]},p:{a:0,k:[50,50,0]},a:{a:0,k:[0,0,0]},s:{a:0,k:[100,100,100]}},shapes:[{ty:'el',p:{a:0,k:[0,0]},s:{a:0,k:[70,40]},nm:'Orbit'},{ty:'st',c:{a:0,k:[.85,1,.44,1]},o:{a:0,k:100},w:{a:0,k:2},lc:2,lj:2,nm:'Stroke'},{ty:'tr',p:{a:0,k:[0,0]},a:{a:0,k:[0,0]},s:{a:0,k:[100,100]},r:{a:0,k:0},o:{a:0,k:100},sk:{a:0,k:0},sa:{a:0,k:0}}],ip:0,op:90,st:0,bm:0}]};
export function CycleMotion(){const [ready,setReady]=useState(false);useEffect(()=>{setReady(!matchMedia('(prefers-reduced-motion: reduce)').matches)},[]);return <span aria-hidden="true" className="cycle-motion">{ready&&<Lottie src={animation} style={{width:48,height:40}} loop autoplay/>}</span>}


