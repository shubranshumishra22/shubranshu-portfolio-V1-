"use client";

import { motion } from "framer-motion";
import TerminalWindow from "./TerminalWindow";

const terminalLines = [
  { content: "whoami", type: "prompt" as const },
  { content: "Shubranshu Shekhar", type: "output" as const },
  { content: "", type: "system" as const },
  { content: "Software Engineer", type: "output" as const },
  { content: "AI Engineer", type: "output" as const },
  { content: "Athlete", type: "output" as const },
  { content: "Cinematography Enthusiast", type: "output" as const },
  { content: "", type: "system" as const },
  { content: "Current Status:", type: "system" as const },
  { content: "Final Year Engineering Student", type: "output" as const },
  { content: "Open To Opportunities", type: "output" as const },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-24 pb-16 px-6 md:px-12 lg:px-24"
    >
      <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 3.8 }}
          className="space-y-4"
        >
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 4.0 }}
            className="text-[#666] terminal-text text-xs sm:text-sm tracking-widest uppercase"
          >
            Shubranshu.OS — v1.0
          </motion.p>
          <div className="space-y-0 -ml-1">
            {["BUILDING", "SOFTWARE", "THAT SOLVES", "REAL PROBLEMS"].map(
              (word, i) => (
                <motion.div
                  key={word}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 4.2 + i * 0.15,
                    ease: [0.25, 0.1, 0, 1],
                  }}
                >
                  <h1 className="text-[clamp(2.5rem,8vw,6.5rem)] font-bold leading-[0.9] tracking-[-0.03em] text-white">
                    {word}
                  </h1>
                </motion.div>
              )
            )}
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 5.0 }}
            className="text-[#A1A1A1] text-sm sm:text-base max-w-md leading-relaxed pt-4"
          >
            Building software, intelligent systems, and products that solve real
            problems.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 5.2 }}
            className="flex items-center gap-3 pt-2"
          >
            <span className="w-2 h-2 rounded-full bg-green-500/80 animate-pulse" />
            <span className="text-xs text-[#666] terminal-text">
              Available for opportunities
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 4.5, ease: "easeOut" }}
          className="w-full max-w-lg mx-auto lg:mx-0"
        >
          <TerminalWindow lines={terminalLines} />
        </motion.div>
      </div>
    </section>
  );
}
