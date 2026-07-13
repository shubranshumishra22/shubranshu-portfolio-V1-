"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import ResearchScene from "./ResearchScene";
import { ArrowUpRight } from "lucide-react";

export default function Research() {
  const [hovered, setHovered] = useState(false);

  return (
    <section
      id="research"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-[var(--color-bg)]"
    >
      <div className="w-full max-w-[1440px] mx-auto">
        <SectionHeading title="Research" />

        <motion.a
          href="https://link.springer.com/chapter/10.1007/978-981-96-8796-1_49"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="tano-card card-teal overflow-hidden block relative shadow-[0_20px_40px_-15px_rgba(28,24,21,0.06)] group"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Info Panel */}
            <div className="p-8 md:p-12 flex flex-col justify-between relative z-10">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-[10px] tracking-wider uppercase font-semibold text-[var(--color-accent)] border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 rounded-full px-2.5 py-0.5">
                    Peer-Reviewed Publication
                  </span>
                  <span className="font-handwritten text-base text-[var(--color-accent)] select-none">
                    Springer LNNS
                  </span>
                </div>

                <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif-editorial font-normal text-[var(--color-primary)] tracking-tight leading-tight mb-6">
                  Robotic Plant Health<br />Monitoring System
                </h3>

                <div className="space-y-4 mb-8">
                  {[
                    "CNN-based disease detection system",
                    "99.37% Accuracy in plant disease classification",
                    "Published in Springer Lecture Notes in Networks and Systems",
                    "Presented research live at ICTIS 2025 conference in Bangkok",
                  ].map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1, duration: 0.3 }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-[var(--color-accent)] mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[var(--color-accent)]" />
                      <span className="text-[var(--color-secondary)] text-sm md:text-base leading-relaxed">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 text-[var(--color-accent)] font-semibold text-xs transition-all duration-300 group-hover:border-[var(--color-accent)]/40 group-hover:bg-[var(--color-accent)]/10">
                  <span>Read Springer Publication</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>

                <div className="flex gap-2 flex-wrap mt-8 pt-6 border-t border-[var(--color-border)]">
                  <span className="tano-pill text-[10px] font-medium py-1 px-3">
                    Springer LNNS
                  </span>
                  <span className="tano-pill text-[10px] font-medium py-1 px-3">
                    ICTIS 2025
                  </span>
                  <span className="tano-pill text-[10px] font-medium py-1 px-3">
                    CNN
                  </span>
                  <span className="tano-pill text-[10px] font-medium py-1 px-3">
                    IoT
                  </span>
                </div>
              </div>
            </div>

            {/* Right Interactive Scene Container */}
            <div className="relative min-h-[350px] lg:min-h-full bg-[var(--color-card-teal-bg)]/40 overflow-hidden border-t lg:border-t-0 lg:border-l border-[var(--color-card-teal-border)]">
              <div className="absolute inset-0 z-10">
                <ResearchScene hovered={hovered} />
              </div>
              
              {/* Nice watermark layout */}
              <div className="absolute bottom-6 right-6 z-20 font-serif-editorial text-xl italic text-[var(--color-primary)] opacity-20 select-none pointer-events-none">
                Interactive Model View
              </div>
            </div>
          </div>
        </motion.a>
      </div>
    </section>
  );
}
