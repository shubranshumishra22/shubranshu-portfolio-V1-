"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const metrics = [
  { label: "Discipline", value: 100, barColor: "bg-white" },
  { label: "Consistency", value: 95, barColor: "bg-white/90" },
  { label: "Focus", value: 96, barColor: "bg-white/80" },
  { label: "Execution", value: 94, barColor: "bg-white/70" },
];

export default function Athlete() {
  return (
    <section
      id="athlete"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24"
    >
      <div className="w-full max-w-[1440px] mx-auto">
        <SectionHeading command="$ system metrics --athlete" title="Athlete Profile" />

        <div className="relative rounded-2xl border border-[#222] bg-[#0D0D0D] overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="cricket-field" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 30 60 M 0 30 L 60 30" stroke="white" strokeWidth="0.5" fill="none" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cricket-field)" />
            </svg>
          </div>

          <div className="relative z-10 p-8 md:p-12">
            <div className="flex items-center gap-2 mb-8">
              <span className="text-[#666] terminal-text text-xs">$</span>
              <span className="text-white terminal-text text-xs">
                performance --profile athlete
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {metrics.map((metric, idx) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.4 }}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm font-medium">
                      {metric.label}
                    </span>
                    <span className="text-[#666] terminal-text text-xs">
                      {metric.value}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#111] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${metric.value}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + idx * 0.15, duration: 0.8, ease: "easeOut" }}
                      className={`h-full rounded-full ${metric.barColor}`}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    {Array.from({ length: Math.floor(metric.value / 10) }).map((_, i) => (
                      <span
                        key={i}
                        className="w-2 h-1 rounded-sm bg-white/20"
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="mt-8 pt-6 border-t border-[#222]"
            >
              <p className="text-[#666] terminal-text text-xs">
                {/*  */}$ system.performance — Status: FIT | READY | ACTIVE
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
