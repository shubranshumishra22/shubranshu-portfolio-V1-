"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const experiences = [
  { year: "2026", title: "Software Engineer", description: "Building products at scale" },
  { year: "2025", title: "Springer Publication", description: "Robotic Plant Health Monitoring" },
  { year: "2025", title: "AI Security Systems", description: "Threat Detection & Blockchain" },
  { year: "2024", title: "Full Stack Development", description: "React, Node.js, PostgreSQL" },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24"
    >
      <div className="w-full max-w-[1440px] mx-auto">
        <SectionHeading command="$ history" title="Experience" />

        <div className="relative">
          <div className="absolute left-[15px] md:left-[19px] top-0 bottom-0 w-px bg-[#222]" />

          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.year + exp.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="relative pl-12 md:pl-14"
              >
                <div className="absolute left-[9px] md:left-[13px] top-1 w-3 h-3 rounded-full bg-[#111] border border-[#444] group-hover:border-white/40 transition-colors" />

                <div className="rounded-xl border border-[#222] bg-[#0D0D0D] p-5 md:p-6 group hover:border-white/10 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-xs terminal-text text-[#666] font-medium">
                      {exp.year}
                    </span>
                    <span className="h-px flex-1 bg-[#222]" />
                  </div>
                  <h3 className="text-white font-semibold text-base md:text-lg tracking-tight">
                    {exp.title}
                  </h3>
                  <p className="text-[#A1A1A1] text-sm mt-1">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
