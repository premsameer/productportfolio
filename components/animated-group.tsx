'use client';
import { Children, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
// Adapted from Motion Primitives AnimatedGroup, https://motion-primitives.com/docs/animated-group.
export function AnimatedGroup({children,className}:{children:ReactNode,className?:string}){
 const reduced=useReducedMotion();
 return <div className={className}>{Children.map(children,(child,index)=><motion.div initial={reduced ? false : {opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.12}} transition={{duration:reduced?0:.4,delay:reduced?0:(index%2)*.08,ease:[.22,1,.36,1]}} key={index}>{child}</motion.div>)}</div>
}
