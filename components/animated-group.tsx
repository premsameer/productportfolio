'use client';
import { Children, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
// Adapted from Motion Primitives AnimatedGroup, https://motion-primitives.com/docs/animated-group.
export function AnimatedGroup({children,className}:{children:ReactNode,className?:string}){
 const reduced=useReducedMotion();
 return <motion.div className={className} initial="hidden" whileInView="visible" viewport={{once:true,amount:.1}} variants={{hidden:{},visible:{transition:{staggerChildren:reduced?0:.1}}}}>{Children.map(children,(child,index)=><motion.div key={index} variants={{hidden:{opacity:1,y:reduced?0:18},visible:{opacity:1,y:0,transition:{duration:reduced?0:.5}}}}>{child}</motion.div>)}</motion.div>
}
