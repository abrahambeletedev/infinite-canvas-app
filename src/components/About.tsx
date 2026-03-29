'use client'
import Image from "next/image";

export function About() {
  return (
    <section id="about" className="border-x border-zinc-900/50 max-w-7xl mx-auto border-b border-zinc-800">
      <div className="flex justify-center py-40 bg-[#050505]">
        <div className="max-w-2xl px-6 text-center">
          <span className="font-sans text-[10px] text-zinc-400 block mb-12 uppercase tracking-[0.8em]">02 / Philosophy</span>
          <h2 className="font-serif text-5xl md:text-7xl leading-none italic mb-20">
            Design is the <br />
            <span className="text-zinc-400 underline underline-offset-8 decoration-zinc-700">silent ambassador</span> <br />
            of your brand.
          </h2>
          <div className="relative w-full aspect-[16/10] mb-20 grayscale border border-zinc-900">
            <Image 
                src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853" 
                alt="Studio View" 
                fill 
                className="object-cover opacity-50 transition-opacity duration-1000 hover:opacity-100" 
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-left border-t border-zinc-900 pt-16">
            <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-zinc-400 leading-relaxed">
              Based in the digital ether, my practice focuses on the architectural structure of interfaces and the organic flow of visual art.
            </p>
            <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-zinc-400 leading-relaxed">
              Every project is an opportunity to explore the tension between high-contrast typography and vast, negative space.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}