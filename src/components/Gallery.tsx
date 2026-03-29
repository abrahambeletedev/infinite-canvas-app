'use client'
import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const TAGS = ["All", "Project", "Concept", "Editorial", "Art"];

const PROJECTS = [
  { id: "01", title: "Midnight Echo", tag: "Editorial", url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e", size: "tall", year: "2024" },
  { id: "02", title: "Fractured Light", tag: "Concept", url: "https://images.unsplash.com/photo-1449156001437-37c645d9bc8c", size: "wide", year: "2025" },
  { id: "03", title: "Silent Watcher", tag: "Project", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b", size: "small", year: "2024" },
  { id: "04", title: "Urban Decay", tag: "Art", url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470", size: "small", year: "2026" },
  { id: "05", title: "Liquid Form", tag: "Concept", url: "https://images.unsplash.com/photo-1433086177607-6c369bb41b4b", size: "tall", year: "2025" },
  { id: "06", title: "Ethereal Plane", tag: "Art", url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb", size: "wide", year: "2024" },
];

function ParallaxCard({ project, onClick }: { project: any, onClick: () => void }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.div
      ref={cardRef}
      layout // This is the magic for the shuffle animation
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ 
        layout: { type: "spring", stiffness: 200, damping: 25 },
        opacity: { duration: 0.4 } 
      }}
      onClick={onClick}
      className={`relative group cursor-none overflow-hidden bg-zinc-950 border border-zinc-900/50 rounded-sm ${
        project.size === 'tall' ? 'md:row-span-3' : 
        project.size === 'wide' ? 'md:col-span-2 md:row-span-2' : 
        'md:row-span-2'
      }`}
    >
      <motion.div style={{ y, height: "115%", top: "-7.5%" }} className="relative w-full">
        <Image 
          src={project.url} 
          alt={project.title} 
          fill 
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 opacity-50 group-hover:opacity-100" 
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 pointer-events-none">
        <p className="font-sans text-[9px] uppercase tracking-widest text-[#ff3355] mb-1 font-bold">{project.tag}</p>
        <h4 className="font-serif italic text-2xl text-white">{project.title}</h4>
      </div>
    </motion.div>
  );
}

export function Gallery() {
  const [activeTag, setActiveTag] = useState("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  const filtered = activeTag === "All" ? PROJECTS : PROJECTS.filter(p => p.tag === activeTag);

  return (
    <section id="work" className="max-w-7xl mx-auto px-6 py-32 relative z-10 bg-[#050505]">
      {/* Filter Menu */}
      <div className="flex flex-col items-center mb-24">
        <div className="flex flex-wrap justify-center gap-10">
          {TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`relative font-sans text-[10px] uppercase tracking-[0.4em] transition-all cursor-none py-2 ${
                activeTag === tag ? "text-[#ff3355]" : "text-zinc-600 hover:text-zinc-400"
              }`}
            >
              {tag}
              {activeTag === tag && (
                <motion.div 
                  layoutId="activeTagLine"
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#ff3355]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* The Animated Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-4 gap-8 auto-rows-[250px]"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <ParallaxCard key={p.id} project={p} onClick={() => setSelectedId(p.id)} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Detail Modal Restored with Aura Red pop */}
      <AnimatePresence>
        {selectedId && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setSelectedId(null)} 
              className="absolute inset-0 bg-black/95 backdrop-blur-2xl" 
            />
            <motion.div 
              layoutId={`card-${selectedId}`} 
              className="relative bg-black border border-zinc-800 w-full max-w-6xl h-full max-h-[85vh] overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-[0_0_80px_rgba(255,51,85,0.08)]"
            >
              {/* Modal Content */}
              <div className="relative h-full w-full bg-zinc-900">
                <Image src={PROJECTS.find(p=>p.id===selectedId)?.url || ""} alt="view" fill className="object-cover" />
              </div>
              <div className="p-12 flex flex-col justify-between bg-black">
                <div>
                   <span className="font-sans text-[10px] text-[#ff3355] block mb-4 tracking-[0.4em] uppercase font-bold">Project Detail</span>
                   <h2 className="font-serif italic text-5xl md:text-7xl text-white">BEVVLEN /{PROJECTS.find(p=>p.id===selectedId)?.title}</h2>
                </div>
                <button 
                  onClick={() => setSelectedId(null)} 
                  className="font-sans text-[10px] uppercase tracking-[0.5em] text-white border border-zinc-800 py-4 hover:bg-[#ff3355] hover:border-[#ff3355] transition-all cursor-none"
                >
                  Return to Index
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}