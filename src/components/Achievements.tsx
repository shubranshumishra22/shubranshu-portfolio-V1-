"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const achievements = [
  {
    status: "OK",
    title: "NASA Space Settlement Design Contest",
    detail: "Global 1st Place",
    icon: "🏆",
  },
  {
    status: "OK",
    title: "Springer Publication",
    detail: "Robotic Plant Health Monitoring — LNNS",
    icon: "📄",
  },
  {
    status: "OK",
    title: "HackTrix Finalist",
    detail: "National Level Hackathon",
    icon: "⚡",
  },
];

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24"
    >
      <div className="w-full max-w-[1440px] mx-auto">
        <SectionHeading command="$ journalctl achievements" title="Achievements" />

        <div className="space-y-4">
          {achievements.map((achievement, idx) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              className="relative group"
            >
              <div className="rounded-xl border border-[#222] bg-[#0D0D0D] p-6 md:p-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex items-start gap-4 md:gap-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg border border-[#222] bg-[#111] flex items-center justify-center">
                    <span className="text-[10px] terminal-text text-green-500/80 font-bold">
                      [{achievement.status}]
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-base md:text-lg tracking-tight mb-1">
                      {achievement.title}
                    </h3>
                    <p className="text-[#A1A1A1] text-sm">{achievement.detail}</p>
                  </div>
                  <span className="text-lg flex-shrink-0 opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                    {achievement.icon}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
