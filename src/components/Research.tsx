"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

export default function Research() {
  return (
    <section
      id="research"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24"
    >
      <div className="w-full max-w-[1440px] mx-auto">
        <SectionHeading command="$ open research" title="Research" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl border border-[#222] bg-[#0D0D0D] overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-12 relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-[#666] terminal-text text-xs">$</span>
                <span className="text-white terminal-text text-xs">
{" "}cat research/plant-health.txt
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">
                Robotic Plant Health<br />Monitoring System
              </h3>

              <div className="space-y-3 mb-8">
                {[
                  "CNN-based disease detection system",
                  "99.37% Accuracy",
                  "Published in Springer LNNS",
                  "Presented at ICTIS 2025, Bangkok",
                ].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.3 }}
                    className="flex items-center gap-3"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
                    <span className="text-[#A1A1A1] text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>

              <a
                href="https://link.springer.com/chapter/10.1007/978-981-96-8796-1_49"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#222] bg-[#111] text-white/80 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300 terminal-text text-xs"
              >
                <span className="text-[#666]">$</span>
                <span>open springer-publication</span>
              </a>

              <div className="flex gap-3 flex-wrap mt-6">
                <span className="text-[10px] terminal-text px-3 py-1.5 rounded-full border border-[#222] text-[#666]">
                  Springer LNNS
                </span>
                <span className="text-[10px] terminal-text px-3 py-1.5 rounded-full border border-[#222] text-[#666]">
                  ICTIS 2025
                </span>
                <span className="text-[10px] terminal-text px-3 py-1.5 rounded-full border border-[#222] text-[#666]">
                  CNN
                </span>
              </div>
            </div>

            <div className="relative min-h-[300px] lg:min-h-full bg-[#0A0A0A] overflow-hidden">
              <img
                src="/research-plant.png"
                alt="Robotic Plant Health Monitoring System"
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:contrast-125 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/30 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-green-500/60" />
                  <span className="text-[10px] terminal-text text-[#555]">
                    system.active — v1.0
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
