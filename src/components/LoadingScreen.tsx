"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface LoadingScreenProps {
  imageLoaded: boolean;
  onComplete?: () => void;
}

export default function LoadingScreen({ imageLoaded, onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const doneRef = useRef(false);

  // Mouse coordinate tracking
  const mouseX = useRef(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const mouseY = useRef(typeof window !== "undefined" ? window.innerHeight / 2 : 0);

  const [catStyle, setCatStyle] = useState<"center" | "cursor">("center");
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });

  // Cap visible progress at 99% until the background centerpiece image is fully loaded & cached
  const displayProgress = Math.min(progress, imageLoaded ? 100 : 99);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (doneRef.current) return;

    const interval = setInterval(() => {
      setProgress((p) => {
        const increment = Math.random() * 12 + 8; // Smooth progress updates
        return Math.min(p + increment, 100);
      });
    }, 70);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Complete only if the timer is at 100% AND the image is pre-loaded/cached
    if (progress >= 100 && imageLoaded && !doneRef.current) {
      doneRef.current = true;
      
      // Calculate target position relative to viewport center
      const viewportCenterX = window.innerWidth / 2;
      const viewportCenterY = window.innerHeight / 2;
      
      setTargetPos({
        x: mouseX.current - viewportCenterX,
        y: mouseY.current - viewportCenterY,
      });
      setCatStyle("cursor");

      // Complete transition after the spring/slide animation finishes
      const timer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 750); // Matches the motion transition duration
      return () => clearTimeout(timer);
    }
  }, [progress, imageLoaded, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ 
        backgroundColor: catStyle === "center" ? "#050505" : "rgba(5, 5, 5, 0)" 
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center select-none cursor-none"
    >
      <div className="flex flex-col items-center max-w-[280px] w-full text-center">
        
        {/* Retro-Styled Cat Face Vector drawing */}
        <motion.div
          animate={
            catStyle === "center"
              ? { y: [0, -3, 0], x: 0, scale: 1, opacity: 1 }
              : { 
                  x: targetPos.x, 
                  y: targetPos.y, 
                  scale: 0.16, 
                  opacity: 0,
                }
          }
          transition={
            catStyle === "center"
              ? {
                  y: { duration: 1.6, repeat: Infinity, ease: "easeInOut" },
                  x: { duration: 0 },
                  scale: { duration: 0.3 },
                  opacity: { duration: 0.3 }
                }
              : {
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1] // Smooth camera ease
                }
          }
          className="mb-8 relative"
          style={{ transformOrigin: "center" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 16 16"
            fill="none"
            stroke="#7CFF8A"
            strokeWidth="1"
            strokeLinejoin="round"
            className="filter drop-shadow-[0_0_12px_rgba(124,255,138,0.7)]"
          >
            {/* Glowing fill inside body */}
            <path
              d="M2 5 L2 2 L5 2 L7 5 L9 5 L11 2 L14 2 L14 5 L15 6 L15 10 L14 11 L11 13 L5 13 L2 11 L1 10 L1 6 Z"
              fill="rgba(124, 255, 138, 0.08)"
            />
            {/* Eyes */}
            <rect x="4" y="7" width="1.5" height="1.5" fill="#7CFF8A" stroke="none" />
            <rect x="10.5" y="7" width="1.5" height="1.5" fill="#7CFF8A" stroke="none" />
            {/* Mouth */}
            <path d="M7 9.5 L8 10.5 L9 9.5" stroke="#7CFF8A" fill="none" />
            {/* Whiskers */}
            <path d="M1 8 L3 8 M13 8 L15 8" stroke="#7CFF8A" />
          </svg>
        </motion.div>

        {/* Loading status bar */}
        <motion.div 
          animate={{ opacity: catStyle === "center" ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-full space-y-2"
        >
          <p className="text-[10px] text-[#7CFF8A] terminal-text tracking-widest font-bold opacity-80 animate-pulse">
            LOADING MATRIX...
          </p>

          <div className="w-full h-[2px] bg-[#141414] relative overflow-hidden rounded-full">
            <motion.div
              className="absolute left-0 top-0 h-full bg-[#7CFF8A]"
              initial={{ width: "0%" }}
              animate={{ width: `${displayProgress}%` }}
              transition={{ duration: 0.1 }}
              style={{ boxShadow: "0 0 8px #7CFF8A" }}
            />
          </div>

          <div className="flex justify-between items-center text-[9px] text-[#444] terminal-text">
            <span>SYSBOOT_SEQUENCE</span>
            <span>{Math.floor(displayProgress)}%</span>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
