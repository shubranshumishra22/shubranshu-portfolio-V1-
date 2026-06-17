"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { cn } from "@/lib/utils";

const projects = [
  {
    id: "codewithshub",
    title: "CodeWithShub",
    subtitle: "DSA Learning OS",
    url: "https://codewithshub-frontend.vercel.app/",
    highlights: [
      "DSA Tracking",
      "Revision Scheduler",
      "1-3-7-17-30-60-90 Rule",
      "Streaks System",
      "Progress Analytics",
      "Smart Revision",
    ],
    accent: "border-white/20",
    command: "$ open codewithshub --focus",
    special: true,
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
    accent: "border-white/10",
    command: "$ open threat-system",
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
    accent: "border-white/10",
    command: "$ open wafer-detection",
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
    accent: "border-white/10",
    command: "$ open cookmate",
    special: false,
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative py-24 md:py-32"
      style={{ height: "200vh" }}
    >
      <div className="sticky top-0 overflow-hidden h-screen flex flex-col justify-center">
        <div className="px-6 md:px-12 lg:px-24 mb-12">
          <div className="w-full max-w-[1440px] mx-auto">
            <SectionHeading command="$ open projects" title="Projects" />
          </div>
        </div>

        <motion.div style={{ x }} className="flex gap-8 px-6 md:px-12 lg:px-24 w-max">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={cn(
                "relative rounded-2xl border bg-[#0D0D0D] backdrop-blur-sm flex-shrink-0 group block transition-all duration-500",
                project.accent,
                hoveredId === project.id ? "border-white/30" : "",
                project.special ? "w-[480px] md:w-[580px]" : "w-[360px] md:w-[440px]"
              )}
            >
              <div className="flex items-center gap-1.5 px-5 py-3.5 border-b border-[#222]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#666]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#444]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
                <span className="ml-3 text-[10px] text-[#555] terminal-text">
                  {project.id}
                </span>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#666] terminal-text">
                      {project.subtitle}
                    </p>
                  </div>
                  {project.special && (
                    <span className="text-[10px] terminal-text text-white/60 border border-white/10 rounded-full px-3 py-1 flex-shrink-0">
                      ★ Featured
                    </span>
                  )}
                </div>

                <div className="space-y-2.5 mb-8">
                  {project.highlights.map((h, i) => (
                    <motion.div
                      key={h}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04, duration: 0.3 }}
                      className="flex items-center gap-2.5"
                    >
                      <span className="text-[#444] terminal-text text-[10px]">
                        ◆
                      </span>
                      <span className="text-[#A1A1A1] text-sm">{h}</span>
                    </motion.div>
                  ))}
                </div>

                <div
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300",
                    hoveredId === project.id
                      ? "border-white/30 bg-white/5"
                      : "border-[#222] bg-transparent"
                  )}
                >
                  <span className="text-[#666] terminal-text text-xs">$</span>
                  <span className="text-white terminal-text text-xs">
                    {project.command}
                  </span>
                </div>
              </div>

              {project.special && (
                <div className="absolute -bottom-1 -right-1 left-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-white/5 rounded-b-2xl" />
              )}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
