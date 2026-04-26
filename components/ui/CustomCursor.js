"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const cursorX = useSpring(-100, { stiffness: 500, damping: 28, mass: 0.5 });
  const cursorY = useSpring(-100, { stiffness: 500, damping: 28, mass: 0.5 });
  
  const ringX = useSpring(-100, { stiffness: 150, damping: 20, mass: 0.8 });
  const ringY = useSpring(-100, { stiffness: 150, damping: 20, mass: 0.8 });

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    };
    
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    const updateMousePosition = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);

      const isInteractive = e.target.closest("a, button, input, textarea, [role='button']");
      setIsHovering(!!isInteractive);
    };

    if (!isMobile) {
      window.addEventListener("mousemove", updateMousePosition);
    }

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("resize", checkIsMobile);
    };
  }, [isMobile, cursorX, cursorY, ringX, ringY]);

  if (isMobile) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%"
        }}
      />
      
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-blue-400/50 bg-blue-500/10 rounded-full pointer-events-none z-[99] backdrop-blur-[1px]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </>
  );
}
