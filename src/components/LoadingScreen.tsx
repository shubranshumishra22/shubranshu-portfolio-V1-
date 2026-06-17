"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const bootModules = [
  { name: "Projects" },
  { name: "Research" },
  { name: "Experience" },
  { name: "Contact" },
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);
  const doneRef = useRef(false);

  const visibleCount = Math.min(
    Math.floor((progress / 100) * bootModules.length),
    bootModules.length
  );

  useEffect(() => {
    if (doneRef.current) return;

    const interval = setInterval(() => {
      setProgress((p) => {
        const increment = Math.random() * 8 + 2;
        return Math.min(p + increment, 100);
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100 && !doneRef.current) {
      doneRef.current = true;
      const t1 = setTimeout(() => setShowPrompt(true), 500);
      const t2 = setTimeout(() => {
        setTimeout(onComplete, 800);
      }, 2500);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]">
        <div className="w-full max-w-lg px-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-sm text-[#666] mb-6 terminal-text"
          >
            Initializing Shubranshu.OS...
          </motion.p>

          <div className="space-y-2 mb-8">
            {bootModules.map((mod, idx) => (
              <motion.div
                key={mod.name}
                initial={{ opacity: 0, x: -10 }}
                animate={
                  idx < visibleCount
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0.3, x: -5 }
                }
                className="flex items-center gap-3 terminal-text text-sm"
              >
                <span
                  className={cn(
                    "text-xs",
                    idx < visibleCount ? "text-white" : "text-[#333]"
                  )}
                >
                  {idx < visibleCount ? "✓" : "○"}
                </span>
                <span
                  className={cn(
                    "transition-colors duration-300",
                    idx < visibleCount ? "text-white" : "text-[#444]"
                  )}
                >
                  Loading {mod.name}...
                </span>
              </motion.div>
            ))}
          </div>

          <div className="w-full h-[1px] bg-[#111] mb-2 relative overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full bg-white"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          <p className="text-xs text-[#444] terminal-text">{Math.floor(progress)}%</p>

          {showPrompt && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8"
            >
              <p className="text-sm text-white terminal-text">
                <span className="text-[#666]">visitor@shubranshu</span>
                <span className="text-white">:~$</span>{" "}
                <span>
                  ENTER SYSTEM
                  <span className="inline-block w-2 h-4 bg-white ml-1 align-middle cursor-blink" />
                </span>
              </p>
            </motion.div>
          )}
        </div>
    </motion.div>
  );
}
