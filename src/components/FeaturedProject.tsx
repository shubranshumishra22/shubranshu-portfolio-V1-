"use client";

import { motion } from "framer-motion";

export default function FeaturedProject() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 5.5 }}
      className="flex justify-center px-6 pb-8"
    >
      <a
        href="https://nudgeai-nine.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]/30 hover:bg-[var(--color-card)] transition-all duration-300"
      >
        <span className="text-[var(--color-muted)] terminal-text text-[11px]">$</span>
        <span className="text-[var(--color-primary)] terminal-text text-[11px] font-medium">
          ./featured.sh
        </span>
        <span className="text-[var(--color-muted)] text-[11px] font-mono">→</span>
        <span className="text-[var(--color-secondary)] text-xs font-medium">
          Build your website using NudgeAI
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-green-500/70 animate-pulse ml-0.5" />
      </a>
    </motion.div>
  );
}
