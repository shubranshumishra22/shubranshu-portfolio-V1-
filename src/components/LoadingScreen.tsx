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

  useEffect(() => {
    if (doneRef.current) return;

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((p) => {
        const increment = Math.random() * 15 + 10;
        return Math.min(p + increment, 100);
      });
    }, 70);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Complete transition when progress reaches 100% and background image is ready
    if (progress >= 100 && imageLoaded && !doneRef.current) {
      doneRef.current = true;
      const timer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [progress, imageLoaded, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-[#FFFFFF] select-none cursor-none"
    >
      <div className="text-center">
        <h1 
          className="text-black font-semibold text-[15px] tracking-normal select-none pointer-events-none animate-[pulse_1.2s_cubic-bezier(0.4,0,0.6,1)_infinite]" 
          style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
          Shub Related
        </h1>
      </div>
    </motion.div>
  );
}
