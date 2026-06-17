"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import VoxelScene from "./VoxelScene";

export default function Research() {
  const [hovered, setHovered] = useState(false);

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
          className="relative rounded-2xl border border-[#222] bg-[#0D0D0D] overflow-hidden"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
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

            <div className="relative min-h-[300px] lg:min-h-full bg-gradient-to-br from-[#111] to-[#0D0D0D] overflow-hidden">
              {/* Scanner frame */}
              <div className="absolute inset-0 pointer-events-none z-20">
                {/* Corner brackets */}
                <div className="absolute top-3 left-3 w-4 h-px bg-white/20" />
                <div className="absolute top-3 left-3 w-px h-4 bg-white/20" />
                <div className="absolute top-3 right-3 w-4 h-px bg-white/20" />
                <div className="absolute top-3 right-3 w-px h-4 bg-white/20" />
                <div className="absolute bottom-3 left-3 w-4 h-px bg-white/20" />
                <div className="absolute bottom-3 left-3 w-px h-4 bg-white/20" />
                <div className="absolute bottom-3 right-3 w-4 h-px bg-white/20" />
                <div className="absolute bottom-3 right-3 w-px h-4 bg-white/20" />

                {/* Frame border lines */}
                <div className="absolute top-[18px] left-3 right-3 h-px bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
                <div className="absolute bottom-[18px] left-3 right-3 h-px bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
                <div className="absolute left-[18px] top-3 bottom-3 w-px bg-gradient-to-b from-transparent via-white/[0.03] to-transparent" />
                <div className="absolute right-[18px] top-3 bottom-3 w-px bg-gradient-to-b from-transparent via-white/[0.03] to-transparent" />
              </div>

              {/* Voxel scene */}
              <div className="absolute inset-0 z-10">
                <VoxelScene hovered={hovered} />
              </div>

              {/* HUD overlay */}
              <div className="absolute top-4 left-10 z-20 space-y-0.5">
                <p className="text-[8px] terminal-text text-white/40 tracking-wider">
                  research.lab/plant_health
                </p>
                <motion.p
                  animate={{ opacity: hovered ? [0.4, 0.8, 0.4] : 0.5 }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-[8px] terminal-text text-green-500/50 tracking-wider"
                >
                  status: monitoring
                </motion.p>
              </div>

              <div className="absolute bottom-10 left-10 z-20 space-y-0.5">
                <p className="text-[8px] terminal-text text-white/30">
                  accuracy: 99.37%
                </p>
                <p className="text-[8px] terminal-text text-white/20">
                  environment: controlled
                </p>
              </div>

              {/* Blinking status indicator */}
              <div className="absolute bottom-4 right-10 z-20 flex items-center gap-2">
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1 h-1 rounded-full bg-green-500/60"
                />
                <span className="text-[8px] terminal-text text-white/30">
                  system.active
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
