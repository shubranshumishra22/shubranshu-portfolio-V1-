"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const achievements = [
  {
    index: "01",
    title: "NASA Space Settlement Contest",
    detail: "Awarded Global First Place for conceptual design architecture.",
    note: "Out of 26,000+ entries worldwide",
    icon: "🏆",
    accentColor: "var(--color-rust)",
    cardClass: "card-rust",
    badgeClass: "border-[var(--color-rust)]/20 bg-[var(--color-rust)]/5 text-[var(--color-rust)]",
  },
  {
    index: "02",
    title: "Springer LNNS Publication",
    detail: "First-author research in Robotic Plant Health Monitoring.",
    note: "Presented in Bangkok, 2025",
    icon: "📄",
    accentColor: "var(--color-teal)",
    cardClass: "card-teal",
    badgeClass: "border-[var(--color-teal)]/20 bg-[var(--color-teal)]/5 text-[var(--color-teal)]",
  },
  {
    index: "03",
    title: "HackTrix Hackathon Finalist",
    detail: "Ranked among top teams in national hackathon event.",
    note: "AI & Cybersecurity focus",
    icon: "⚡",
    accentColor: "var(--color-amber)",
    cardClass: "card-amber",
    badgeClass: "border-[var(--color-amber)]/20 bg-[var(--color-amber)]/5 text-[var(--color-amber)]",
  },
];

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-[var(--color-bg)]"
    >
      <div className="w-full max-w-[1440px] mx-auto">
        <SectionHeading title="Achievements" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((achievement, idx) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              className="flex"
            >
              <div 
                className={`tano-card p-8 flex flex-col justify-between w-full h-full relative group ${achievement.cardClass}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    {/* Index display */}
                    <span className={`text-[10px] tracking-widest uppercase font-semibold rounded-full px-2.5 py-0.5 select-none ${achievement.badgeClass}`}>
                      Milestone {achievement.index}
                    </span>

                    {/* Icon container */}
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-lg select-none group-hover:border-[var(--achievement-accent)]/40 transition-colors" style={{ "--achievement-accent": achievement.accentColor } as React.CSSProperties}>
                      {achievement.icon}
                    </div>
                  </div>

                  <h3 className="text-2xl font-serif-editorial font-normal text-[var(--color-primary)] leading-tight mb-3">
                    {achievement.title}
                  </h3>
                  
                  <p className="text-sm text-[var(--color-secondary)] leading-relaxed mb-6">
                    {achievement.detail}
                  </p>
                </div>

                {/* Annotation Note at the bottom */}
                <div className="pt-6 border-t border-[var(--color-border)] mt-auto flex items-center justify-between">
                  <span className="font-handwritten text-base text-[var(--achievement-accent)] select-none" style={{ "--achievement-accent": achievement.accentColor } as React.CSSProperties}>
                    {achievement.note}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--color-muted)] uppercase">
                    Verified
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
