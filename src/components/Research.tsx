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

              <div className="flex gap-3 flex-wrap">
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

            <div className="relative min-h-[300px] lg:min-h-full bg-gradient-to-br from-[#111] to-[#0D0D0D] overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-40 h-40 md:w-56 md:h-56">
                  <div className="absolute inset-0 border border-[#333] rounded-full animate-[spin_10s_linear_infinite]" />
                  <div className="absolute inset-4 border border-[#222] rounded-full animate-[spin_8s_linear_infinite_reverse]" />
                  <div className="absolute inset-8 border border-white/5 rounded-full" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[10px] terminal-text text-[#444] text-center leading-relaxed">
                      RESEARCH
                      <br />
                      LAB
                    </span>
                  </div>
                </div>
              </div>

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
