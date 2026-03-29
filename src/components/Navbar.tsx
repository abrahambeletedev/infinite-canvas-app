'use client'
import { motion, useScroll, useSpring } from "framer-motion";
import { useState } from "react";

const NAV_LINKS = [
  { name: 'Work', href: '#work', preview: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e' },
  { name: 'About', href: '#about', preview: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853' },
  { name: 'Contact', href: '#contact', preview: 'https://images.unsplash.com/photo-1433086177607-6c369bb41b4b' },
];

export function Navbar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] border-b border-zinc-200 bg-white/80 backdrop-blur-md">
      <motion.div className="absolute top-0 left-0 right-0 h-[1px] bg-black/40 origin-left" style={{ scaleX }} />
      
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center border-x border-zinc-200/50">
        <div className="flex items-center gap-4">
          <span className="font-sans font-bold tracking-tighter text-xl uppercase">BEVVLEN.</span>
        </div>
        
        <div className="flex gap-12 items-center">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              // We use data-attributes to pass the image to the cursor
              data-preview={link.preview}
              className="nav-link font-sans text-[9px] uppercase tracking-[0.3em] text-zinc-500 hover:text-black transition-colors cursor-none"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}