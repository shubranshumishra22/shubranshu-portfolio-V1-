"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const skills = [
  "Python", "C++", "JavaScript", "React", "Node.js", 
  "TensorFlow", "PyTorch", "SQL", "PostgreSQL", "Supabase"
];

export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24"
    >
      <div className="w-full max-w-[1440px] mx-auto">
        <SectionHeading title="About Me" />

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center">
          
          {/* LEFT COLUMN: Professional biography and skills badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Tagline / Subtitle */}
            <div className="inline-block px-3 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[11px] font-semibold text-[#7CFF8A] uppercase tracking-wider">
              Building AI Agents & RAG Applications | AI Engineer | Full Stack Developer
            </div>

            {/* Intro Heading */}
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-primary)] leading-tight">
              I love building software that <span className="text-[#7CFF8A]">solves real problems</span>.
            </h3>

            {/* Narrative bio paragraphs */}
            <div className="space-y-4 text-[var(--color-secondary)] text-[15px] md:text-base leading-relaxed">
              <p>
                Final-year B.Tech ECE student at SRM Institute of Science & Technology passionate about AI/ML and Full-Stack Development. I enjoy building intelligent systems and scalable applications that solve real-world problems.
              </p>
              <p>
                My work includes published research in IoT-based plant health monitoring, AI-powered cybersecurity solutions, machine learning systems for fault detection, and full-stack web platforms.
              </p>
            </div>

            {/* Skills Badges Grid */}
            <div className="pt-6 border-t border-[var(--color-border)]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)] block mb-4">
                Core Competencies
              </span>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3.5 py-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/40 hover:border-[#7CFF8A]/35 hover:bg-[#7CFF8A]/5 hover:text-[#7CFF8A] text-[var(--color-secondary)] text-xs font-medium transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Profile Picture Framing */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center lg:justify-end items-center"
          >
            <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-card)] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] group">
              <img
                src="/IMG_2392.PNG"
                alt="Shubranshu Shekhar"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
