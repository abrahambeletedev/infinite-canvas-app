'use client'
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

export function Hero() {
  const title = "BEVVLEN";
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, 26, { duration: 2, ease: "circOut" });
    return controls.stop;
  }, [count]);

  const containerVars = {
    visible: { transition: { staggerChildren: 0.04, delayChildren: 0.2 } }
  };

  const letterVars = {
    initial: { y: "100%" },
    visible: { 
      y: 0, 
      transition: { duration: 1.8, ease: [0.22, 1, 0.36, 1] as any } 
    }
  };

  return (
    <section className="relative h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
      <div className="z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.5em] text-zinc-400 italic">Project Index</span>
          <motion.span className="font-serif italic text-2xl text-white underline underline-offset-4 decoration-zinc-800">
            {rounded}
          </motion.span>
        </motion.div>

        <motion.h1 
          variants={containerVars}
          initial="initial"
          animate="visible"
          className="font-serif italic text-[18vw] md:text-[14rem] leading-none tracking-tighter text-white flex overflow-hidden text-mask"
        >
          {title.split("").map((char, i) => (
            <motion.span key={i} variants={letterVars} className="inline-block">
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
          className="mt-10 font-sans text-[9px] md:text-[11px] uppercase tracking-[1.2em] text-zinc-400 ml-[1.2em]"
        >
          Architecture of Digital Emotion
        </motion.p>
      </div>
    </section>
  );
}