"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { cn } from "@/lib/utils";

const projects = [
  {
    id: "nudge-commerce-ai",
    title: "Nudge Commerce AI",
    subtitle: "Full-Stack SaaS Platform for AI-Powered Storefronts",
    url: "https://nudgeai-nine.vercel.app/",
    repo: "https://github.com/shubranshumishra22",
    highlights: [
      "Multi-Tenant Routing Engine & Custom Domains",
      "Self-Healing LLM Fallback Pipeline",
      "Next.js ISR & On-demand Revalidation",
      "Supabase PostgreSQL Constraints & RLS",
      "Interactive Split Editor & Live Preview",
      "Razorpay Subscription & Checkout flows",
    ],
    command: "$ open nudge-commerce-ai --focus",
    tags: ["Next.js", "Supabase", "OpenRouter", "Razorpay", "Tailwind CSS"],
    special: true,
  },
  {
    id: "codewithshub",
    title: "CodeWithShub",
    subtitle: "DSA Learning OS",
    url: "https://codewithshub-frontend.vercel.app/",
    repo: "https://github.com/shubranshumishra22",
    highlights: [
      "DSA Tracking",
      "Revision Scheduler",
      "1-3-7-17-30-60-90 Rule",
      "Streaks System",
      "Progress Analytics",
      "Smart Revision",
    ],
    command: "$ open codewithshub --focus",
    tags: ["React", "Next.js", "TypeScript", "PostgreSQL"],
    special: false,
    previewImage: "/codewithshubnew.png",
    previewAlt: "CodeWithShub homepage screen",
  },
  {
    id: "threat-detection",
    title: "URL Threat Detection",
    subtitle: "AI + Blockchain Security",
    url: "https://github.com/shubranshumishra22/maliciousDomainDetector",
    highlights: [
      "36,000+ URLs Analyzed",
      "97.07% Accuracy",
      "Flask API",
      "MLP Classifier",
      "Gemini Integration",
      "Blockchain Storage",
    ],
    command: "$ open threat-system",
    tags: ["Python", "Flask", "scikit-learn", "Web3"],
    special: false,
  },
  {
    id: "wafer-fault",
    title: "Wafer Sensor Fault",
    subtitle: "Predictive Maintenance",
    url: "https://github.com/shubranshumishra22/Wafer-Sensor-Fault-Detection-System",
    highlights: [
      "500+ Sensors",
      "Random Forest",
      "Flask Deployment",
      "Automated Pipeline",
      "SMOTETomek",
    ],
    command: "$ open wafer-detection",
    tags: ["Python", "Flask", "ML", "Docker"],
    special: false,
  },
  {
    id: "cookmate",
    title: "CookMate",
    subtitle: "Full-Stack Recipe Platform",
    url: "https://cookmate-flame.vercel.app/",
    highlights: [
      "PostgreSQL",
      "Supabase",
      "Express",
      "Real-time Ratings",
      "Multi-tenant System",
    ],
    command: "$ open cookmate",
    tags: ["Next.js", "PostgreSQL", "Supabase", "Express"],
    special: false,
  },
];

const visualLines = [
  "import { Project } from './types'",
  "",
  "const app: Project = {",
  "  status: 'production',",
  "  stack: ['React', 'Node'],",
  "  deploy: 'vercel',",
  "  metrics: {",
  "    users: '1.2k+',",
  "    uptime: '99.9%'",
  "  }",
  "}",
  "",
  "export default app",
];

function RightVisual() {
  return (
    <div className="absolute inset-0 bg-[var(--color-card)] overflow-hidden">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />
      {/* Diagonal lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="white" strokeWidth="0.5" />
        <line x1="30%" y1="0" x2="100%" y2="50%" stroke="white" strokeWidth="0.5" />
        <line x1="0" y1="40%" x2="60%" y2="100%" stroke="white" strokeWidth="0.5" />
      </svg>
      {/* Terminal code lines */}
      <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12">
        <div className="space-y-[3px] w-full">
          {visualLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03, duration: 0.3 }}
              className="flex items-start gap-2"
            >
              <span className="text-[10px] leading-5 text-[var(--color-muted)] terminal-text w-5 text-right shrink-0 select-none">
                {i + 1}
              </span>
              <span
                className={cn(
                  "text-[11px] leading-5 terminal-text whitespace-pre",
                  line.startsWith("  ")
                    ? "text-[var(--color-muted)]"
                    : line.startsWith("}")
                    ? "text-[var(--color-muted)]"
                    : line.endsWith(":") || line.includes(":")
                    ? "text-[var(--color-secondary)]"
                    : line.includes("'") || line.includes('"')
                    ? "text-[var(--color-muted)]"
                    : "text-[var(--color-primary)]"
                )}
              >
                {line || " "}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Gradient fade on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[var(--color-card)] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[var(--color-card)] to-transparent pointer-events-none" />
    </div>
  );
}

export default function Projects() {
  const [current, setCurrent] = useState(() => projects.findIndex((project) => project.id === "codewithshub"));
  const [direction, setDirection] = useState(0);

  const total = projects.length;

  const goTo = useCallback((i: number) => {
    setDirection(i > current ? 1 : -1);
    setCurrent((i + total) % total);
  }, [current, total]);

  const next = useCallback(() => goTo(current + 1), [goTo, current]);
  const prev = useCallback(() => goTo(current - 1), [goTo, current]);

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  // Touch swipe
  const touchX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) <= 50) return;

    if (diff > 0) {
      next();
    } else {
      prev();
    }
  };

  const project = projects[current];
  const previewImage = "previewImage" in project ? project.previewImage : undefined;
  const previewAlt = "previewAlt" in project ? project.previewAlt : undefined;
  const hasPreview = Boolean(previewImage);

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <section
      id="projects"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      <div className="w-full max-w-[1440px] mx-auto">
        <SectionHeading command="$ open projects" title="Projects" />

        <div
          className="relative mx-auto max-w-5xl"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Poster */}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className="relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden group cursor-pointer">
              {/* Terminal chrome */}
              <div className="flex items-center gap-1.5 px-5 py-3.5 border-b border-[var(--color-border)]">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                <span className="ml-3 text-[11px] text-[var(--color-muted)] terminal-text">
                  {project.id} — {project.subtitle}
                </span>
              </div>

              {/* Poster content */}
              <div
                className={cn(
                  "relative min-h-[400px] md:min-h-[560px]",
                  hasPreview ? "overflow-hidden" : "grid grid-cols-1 md:grid-cols-2"
                )}
              >
                {previewImage && (
                  <>
                    <Image
                      src={previewImage}
                      alt={previewAlt ?? `${project.title} preview`}
                      fill
                      priority
                      sizes="(min-width: 1024px) 960px, 100vw"
                      className="object-cover object-center opacity-95 transition duration-700 group-hover:scale-[1.015]"
                    />
                  </>
                )}

                {/* Left: Info */}
                {!hasPreview && (
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={current}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.35, ease: [0.25, 0.1, 0, 1] }}
                      className="relative z-10 flex flex-col justify-between p-8 md:p-10"
                    >
                      <div>
                        {/* Command */}
                        <div className="flex items-center gap-2 mb-6">
                          <span className="terminal-text text-xs text-[var(--color-muted)]">$</span>
                          <span className="terminal-text text-xs text-[var(--color-primary)]">{project.command}</span>
                        </div>

                        {/* Title + subtitle */}
                        <div className="mb-2">
                          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--color-primary)]">
                            {project.title}
                          </h3>
                          <p className="text-sm terminal-text mt-1 text-[var(--color-muted)]">
                            {project.subtitle}
                          </p>
                        </div>

                        {/* Special badge */}
                        {project.special && (
                          <span className="inline-block mt-3 text-[10px] terminal-text text-[var(--color-primary)] opacity-60 border border-[var(--color-border)] rounded-full px-3 py-1">
                            ★ Featured
                          </span>
                        )}

                        {/* Highlights */}
                        <div className="mt-6 space-y-2">
                          {project.highlights.map((h, i) => (
                            <motion.div
                              key={h}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 + i * 0.04, duration: 0.3 }}
                              className="flex items-center gap-2.5"
                            >
                              <span className="terminal-text text-[10px] text-[var(--color-muted)]">◆</span>
                              <span className="text-sm text-[var(--color-secondary)]">{h}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Tags + action */}
                      <div className="mt-6 space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] terminal-text px-2.5 py-1 rounded-full border border-[var(--color-border)] text-[var(--color-muted)]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--color-border)] group-hover:border-[var(--color-primary)]/30 group-hover:bg-[var(--color-card)] transition-all duration-300">
                          <span className="terminal-text text-xs text-[var(--color-muted)]">$</span>
                          <span className="terminal-text text-xs text-[var(--color-primary)]">{project.command}</span>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}

                {!hasPreview && (
                  <div className="relative min-h-[280px] md:min-h-full overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={current}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0"
                      >
                        <RightVisual />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>
          </a>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6 px-2">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    i === current
                      ? "w-6 bg-[var(--color-primary)]"
                      : "w-1.5 bg-[var(--color-border)] hover:bg-[var(--color-muted)]"
                  )}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="w-8 h-8 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/30 transition-all duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 3L5 7L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={next}
                className="w-8 h-8 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/30 transition-all duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
