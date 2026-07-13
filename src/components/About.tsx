"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const skills = [
  { name: "Python", colorClass: "border-[var(--color-teal)]/20 bg-[var(--color-teal)]/5 text-[var(--color-teal)] hover:!border-[var(--color-teal)]" },
  { name: "C++", colorClass: "border-[var(--color-rust)]/20 bg-[var(--color-rust)]/5 text-[var(--color-rust)] hover:!border-[var(--color-rust)]" },
  { name: "JavaScript", colorClass: "border-[var(--color-rust)]/20 bg-[var(--color-rust)]/5 text-[var(--color-rust)] hover:!border-[var(--color-rust)]" },
  { name: "React", colorClass: "border-[var(--color-sage)]/20 bg-[var(--color-sage)]/5 text-[var(--color-sage)] hover:!border-[var(--color-sage)]" },
  { name: "Next.js", colorClass: "border-[var(--color-sage)]/20 bg-[var(--color-sage)]/5 text-[var(--color-sage)] hover:!border-[var(--color-sage)]" },
  { name: "TensorFlow", colorClass: "border-[var(--color-teal)]/20 bg-[var(--color-teal)]/5 text-[var(--color-teal)] hover:!border-[var(--color-teal)]" },
  { name: "PyTorch", colorClass: "border-[var(--color-teal)]/20 bg-[var(--color-teal)]/5 text-[var(--color-teal)] hover:!border-[var(--color-teal)]" },
  { name: "SQL", colorClass: "border-[var(--color-amber)]/20 bg-[var(--color-amber)]/5 text-[var(--color-amber)] hover:!border-[var(--color-amber)]" },
  { name: "PostgreSQL", colorClass: "border-[var(--color-amber)]/20 bg-[var(--color-amber)]/5 text-[var(--color-amber)] hover:!border-[var(--color-amber)]" },
  { name: "Supabase", colorClass: "border-[var(--color-amber)]/20 bg-[var(--color-amber)]/5 text-[var(--color-amber)] hover:!border-[var(--color-amber)]" }
];

export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-[var(--color-bg)]"
    >
      <div className="w-full max-w-[1440px] mx-auto">
        <SectionHeading title="About Me" />

        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-20 items-center">
          
          {/* LEFT COLUMN: Professional biography and skills badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Tagline / Subtitle */}
            <div className="tano-pill uppercase tracking-wider text-[10px] py-1 px-3 border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 text-[var(--color-accent)] font-semibold">
              Building AI Agents & RAG Applications | AI Engineer | Full Stack Developer
            </div>

            {/* Intro Heading */}
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif-editorial font-normal tracking-tight text-[var(--color-primary)] leading-tight">
              I love building software that <span className="text-[var(--color-accent)] italic">solves real problems</span>.
            </h3>

            {/* Narrative bio paragraphs */}
            <div className="space-y-4 text-[var(--color-secondary)] text-sm md:text-base leading-relaxed">
              <p>
                Final-year B.Tech ECE student at SRM Institute of Science & Technology passionate about AI/ML and Full-Stack Development. I enjoy building intelligent systems and scalable applications that solve real-world problems.
              </p>
              <p>
                My work includes published research in IoT-based plant health monitoring, AI-powered cybersecurity solutions, machine learning systems for fault detection, and full-stack web platforms.
              </p>
            </div>

            {/* Skills Badges Grid */}
            <div className="pt-6 border-t border-[var(--color-border)]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                  Core Competencies
                </span>
                <span className="font-handwritten text-base text-[var(--color-accent)] -rotate-2 select-none">
                  Always learning new things...
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`tano-pill border text-xs font-medium px-3.5 py-1.5 ${skill.colorClass}`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Profile Picture Framing */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center lg:items-end"
          >
            <div className="tano-card p-3 w-full max-w-[380px] aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(28,24,21,0.06)] group">
              <div className="w-full h-full rounded-2xl overflow-hidden bg-[var(--color-surface)]">
                <img
                  src="/IMG_2392.PNG"
                  alt="Shubranshu Shekhar"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
            </div>
            
            <div className="mt-4 flex items-center gap-2 max-w-[380px] w-full px-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
              <span className="text-xs text-[var(--color-secondary)] uppercase tracking-wider font-semibold">
                Available for internships & roles
              </span>
              <span className="font-handwritten text-lg text-[var(--color-accent)] rotate-3 ml-auto select-none">
                Get in touch!
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
