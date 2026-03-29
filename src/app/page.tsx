'use client'
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Gallery } from "@/components/Gallery";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { CustomCursor } from "@/components/CustomCursor";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  // BEVVLEN Hero fades out quickly and disappears permanently
  const heroOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const heroDisplay = useTransform(scrollYProgress, (pos) => pos > 0.05 ? "none" : "flex");
  
  // Content fades in right after
  const contentOpacity = useTransform(scrollYProgress, [0.08, 0.15], [0, 1]);

  // Footer Branding: Triggered at the absolute end
  const footerOpacity = useTransform(scrollYProgress, [0.94, 0.99], [0, 1]);
  const footerScale = useTransform(scrollYProgress, [0.94, 1], [0.9, 1]);

  return (
    <main ref={containerRef} className="relative bg-[#050505] cursor-none min-h-[500vh]">
      <CustomCursor />
      <Navbar />

      {/* TOP BRANDING */}
      <motion.section 
        style={{ opacity: heroOpacity, display: heroDisplay }}
        className="fixed top-0 left-0 w-full h-screen z-50 flex items-center justify-center pointer-events-none"
      >
        <Hero />
      </motion.section>

      {/* MAIN CONTENT BLOCK */}
      <motion.div 
        style={{ opacity: contentOpacity }}
        className="relative z-10 w-full bg-[#050505] mt-[100vh]"
      >
        <Gallery />
        <About />
        <Contact />

        {/* REFINED FOOTER SECTION */}
        <footer className="relative h-screen flex flex-col items-center justify-center bg-[#050505] border-t border-zinc-900/50 overflow-hidden">
          <motion.div style={{ opacity: footerOpacity, scale: footerScale }} className="text-center">
            {/* Signature BEVVLEN with subtle Red Aura */}
            <p className="font-signature text-[12rem] md:text-[22rem] text-white/5 leading-none select-none tracking-tighter drop-shadow-[0_0_30px_rgba(255,51,85,0.05)]">
              BEVVLEN
            </p>
            <div className="mt-8 flex flex-col items-center gap-4">
              <div className="h-12 w-[1px] bg-gradient-to-b from-[#ff3355] to-transparent" />
              <div className="font-sans text-[10px] uppercase tracking-[1.5em] text-zinc-400">
                Architecture of Digital Emotion — 2026
              </div>
            </div>
          </motion.div>
        </footer>
      </motion.div>
    </main>
  );
}