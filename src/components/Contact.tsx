'use client'
import { motion } from "framer-motion";

export function Contact() {
  return (
    <section id="contact" className="py-40 px-6 border-t border-zinc-200">
      <div className="max-w-xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.6em] text-zinc-500 mb-8 block underline decoration-zinc-300">Contact</span>
          <h2 className="font-serif text-5xl md:text-7xl italic mb-12 tracking-tighter">
            Let's start <br /> something new.
          </h2>
          <a 
            href="mailto:hello@bevvlen.com" 
            className="font-sans text-xs uppercase tracking-[0.4em] text-black border-b border-zinc-200 pb-2 hover:text-zinc-500 transition-colors"
          >
            hello@bevvlen.com
          </a>
          
          <div className="mt-20 flex justify-center gap-12 font-sans text-[9px] uppercase tracking-widest text-zinc-500">
            <span className="hover:text-black cursor-none">Instagram</span>
            <span className="hover:text-black cursor-none">Behance</span>
            <span className="hover:text-black cursor-none">Twitter</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}