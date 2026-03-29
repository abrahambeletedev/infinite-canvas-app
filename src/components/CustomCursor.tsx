'use client'
import { useEffect, useState } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";

export function CustomCursor() {
  const [hoverData, setHoverData] = useState<{ 
    isPointer: boolean; 
    isTab: boolean;
    img: string | null 
  }>({
    isPointer: false,
    isTab: false,
    img: null
  });

  const cursorX = useSpring(0, { stiffness: 800, damping: 40 });
  const cursorY = useSpring(0, { stiffness: 800, damping: 40 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      const previewImg = target.getAttribute('data-preview');
      
      // Check if it's a clickable element or a specific navigation tab
      const isClickable = window.getComputedStyle(target).cursor === 'pointer' || !!target.closest('button, a');
      const isTab = !!target.closest('nav a, .flex-wrap button');

      setHoverData({
        isPointer: isClickable,
        isTab: isTab,
        img: previewImg
      });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center overflow-hidden"
        style={{
          translateX: cursorX,
          translateY: cursorY,
          x: "-50%",
          y: "-50%",
          // Size shifts based on hover state
          width: hoverData.img ? "120px" : (hoverData.isTab ? "45px" : "12px"),
          height: hoverData.img ? "160px" : (hoverData.isTab ? "45px" : "12px"),
          borderRadius: hoverData.img ? "4px" : "100%",
          // Mix blend difference makes it white on black, black on white
          mixBlendMode: hoverData.isTab ? "normal" : "difference",
          // Border logic
          border: hoverData.isTab ? "1px solid #ff3355" : "1px solid white",
          backgroundColor: hoverData.isTab ? "rgba(255, 51, 85, 0.05)" : (hoverData.isPointer && !hoverData.img ? "white" : "transparent"),
        }}
        animate={{
          scale: hoverData.isPointer && !hoverData.isTab ? 2.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <AnimatePresence>
          {hoverData.img && (
            <motion.img
              key={hoverData.img}
              src={hoverData.img}
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full object-cover grayscale"
            />
          )}
        </AnimatePresence>
        
        {/* Subtle glow inside the transparent tab cursor */}
        {hoverData.isTab && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-[#ff3355]/10 blur-sm rounded-full"
          />
        )}
      </motion.div>
    </div>
  );
}