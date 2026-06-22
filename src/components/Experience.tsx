"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SectionHeading from "./SectionHeading";

const experiences = [
  {
    id: "ltm",
    role: "Graduate Engineer Trainee",
    company: "LTM",
    location: "Bengaluru, India",
    period: "Jul 2026 – Present",
    description: [
      "Building and maintaining full-stack applications for enterprise clients",
      "Developing RESTful APIs and microservices in Node.js and Python",
      "Collaborating on CI/CD pipelines and cloud deployments (AWS)",
      "Optimizing database queries & improving system performance",
    ],
    stack: ["Node.js", "React", "Python", "AWS", "PostgreSQL", "Docker"],
  },
];

const logOutput = [
  { line: "> cat /var/log/work/current.log", style: "command" },
  { line: "", style: "empty" },
  { line: "┌─────────────────────────────────────────────┐", style: "border" },
  { line: "  ROLE       Graduate Engineer Trainee", style: "field" },
  { line: "  COMPANY    LTM", style: "field" },
  { line: "  LOCATION   Bengaluru, India", style: "field" },
  { line: "  PERIOD     Jul 2026 – Present", style: "field" },
  { line: "└─────────────────────────────────────────────┘", style: "border" },
  { line: "", style: "empty" },
  { line: "  RESPONSIBILITIES:", style: "header" },
  { line: "  → Building and maintaining full-stack applications", style: "bullet" },
  { line: "    for enterprise clients", style: "bulletCont" },
  { line: "  → Developing RESTful APIs and microservices in", style: "bullet" },
  { line: "    Node.js and Python", style: "bulletCont" },
  { line: "  → Collaborating on CI/CD pipelines and cloud", style: "bullet" },
  { line: "    deployments (AWS)", style: "bulletCont" },
  { line: "  → Optimizing database queries & improving system", style: "bullet" },
  { line: "    performance", style: "bulletCont" },
  { line: "", style: "empty" },
  { line: "  STACK: [Node.js, React, Python, AWS, PostgreSQL, Docker]", style: "stack" },
  { line: "", style: "empty" },
  { line: "", style: "cursor" },
];

export default function Experience() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev < logOutput.length) return prev + 1;
        clearInterval(timer);
        return prev;
      });
    }, 40);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="experience"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="w-full max-w-[1440px] mx-auto relative">
        <SectionHeading command="$ history" title="Experience" />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 mt-12">
          {/* Timeline rail */}
          <div className="lg:col-span-1 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
            <div className="relative flex lg:flex-col items-center h-full">
              {/* Line */}
              <div className="w-px h-16 lg:h-full bg-gradient-to-b from-transparent via-[var(--color-border)] to-transparent" />
              {/* Dot */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute top-4 lg:top-1/2 left-1/2 -translate-x-1/2 lg:-translate-y-1/2"
              >
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-[var(--color-primary)]" />
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-[var(--color-primary)] animate-ping opacity-30" />
                </div>
              </motion.div>
            </div>
            <div className="lg:absolute lg:left-8 lg:top-1/2 lg:-translate-y-1/2 lg:text-left text-center">
              <span className="text-xs terminal-text text-[var(--color-muted)]">
                {experiences[0].period}
              </span>
            </div>
          </div>

          {/* Terminal card */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden group"
            >
              {/* Chrome */}
              <div className="flex items-center gap-1.5 px-5 py-3 border-b border-[var(--color-border)]">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                <span className="ml-3 text-[11px] text-[var(--color-muted)] terminal-text">
                  work.log — /var/log/work
                </span>
              </div>

              {/* Terminal body */}
              <div className="p-5 md:p-7 font-mono text-sm leading-6 min-h-[360px]">
                {logOutput.slice(0, visibleLines).map((entry, i) => (
                  <div
                    key={i}
                    className={cn(
                      "whitespace-pre tracking-tight",
                      entry.style === "command" && "text-[var(--color-primary)]",
                      entry.style === "border" && "text-[var(--color-muted)]",
                      entry.style === "field" && "text-[var(--color-secondary)]",
                      entry.style === "header" && "text-[var(--color-primary)] font-semibold",
                      entry.style === "bullet" && "text-[var(--color-muted)]",
                      entry.style === "bulletCont" && "text-[var(--color-secondary)] ml-6",
                      entry.style === "stack" && "text-[var(--color-muted)]",
                      entry.style === "empty" && "select-none"
                    )}
                  >
                    {entry.line}
                    {entry.style === "cursor" && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                        className="inline-block w-2 h-4 bg-[var(--color-primary)] ml-0.5 align-middle"
                      />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Tech tags below */}
            <div className="flex flex-wrap gap-2 mt-4">
              {experiences[0].stack.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] terminal-text px-2.5 py-1 rounded-full border border-[var(--color-border)] text-[var(--color-muted)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
