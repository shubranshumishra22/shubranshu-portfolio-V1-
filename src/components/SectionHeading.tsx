"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  command?: string;
  title?: string;
  className?: string;
}

const indexMap: Record<string, string> = {
  "About Me": "01",
  "Experience": "02",
  "Projects": "03",
  "Research": "04",
  "Skills & Tools": "05",
  "Achievements": "06",
  "Connect": "07"
};

export default function SectionHeading({ title, className }: SectionHeadingProps) {
  const index = title ? indexMap[title] : "";

  return (
    <div className={cn("mb-12 md:mb-16", className)}>
      {index && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-[10px] sm:text-[11px] tracking-[0.22em] font-semibold text-[var(--color-accent)] uppercase mb-3 block"
        >
          {index} &mdash; {title === "Connect" ? "GET IN TOUCH" : title?.toUpperCase()}
        </motion.div>
      )}
      {title && (
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-serif-editorial text-[var(--color-primary)] font-normal leading-tight tracking-tight"
        >
          {title}
        </motion.h2>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="h-[1px] bg-[var(--color-border)] mt-4 origin-left w-24"
      />
    </div>
  );
}
