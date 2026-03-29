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

  // Subtle fade for the footer approach
  const footerOpacity = useTransform(scrollYProgress, [0.9, 0.98], [0, 1]);

  return (
    <main ref={containerRef} className="relative bg-white cursor-none min-h-screen">
      <CustomCursor />
      <Navbar />

      {/* TOP BRANDING - Normal static flow instead of glitchy fixed stack */}
      <section className="relative w-full h-screen z-0 flex items-center justify-center pointer-events-none">
        <Hero />
      </section>

      {/* MAIN CONTENT BLOCK */}
      <div className="relative z-20 w-full bg-white">
        <Gallery />
        <About />
        <Contact />

        {/* REFINED FOOTER SECTION - Hero reappears */}
        <footer className="relative h-screen flex flex-col items-center justify-center bg-zinc-50 border-t border-zinc-200 overflow-hidden">
          <motion.div style={{ opacity: footerOpacity }} className="pointer-events-none">
             <Hero />
          </motion.div>
        </footer>
      </div>
    </main>
  );
}