"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const skillCategories = [
  {
    name: "Programming Languages",
    desc: "Writing core business logic and algorithms.",
    items: ["C", "C++", "Python", "JavaScript", "SQL"],
    accentColor: "var(--color-amber)",
    pillClass: "border-[var(--color-amber)]/20 bg-[var(--color-amber)]/5 text-[var(--color-amber)]",
    dotClass: "bg-[var(--color-amber)]",
    cardClass: "card-amber",
  },
  {
    name: "AI & Machine Learning",
    desc: "Building intelligence and computer vision systems.",
    items: [
      "Machine Learning",
      "Deep Learning",
      "TensorFlow",
      "PyTorch",
      "NLP",
      "Transformers",
      "Scikit-learn",
    ],
    accentColor: "var(--color-teal)",
    pillClass: "border-[var(--color-teal)]/20 bg-[var(--color-teal)]/5 text-[var(--color-teal)]",
    dotClass: "bg-[var(--color-teal)]",
    cardClass: "card-teal",
  },
  {
    name: "Web Technologies",
    desc: "Designing scalable user interfaces and servers.",
    items: ["React", "Next.js", "Node.js", "Express", "TypeScript"],
    accentColor: "var(--color-sage)",
    pillClass: "border-[var(--color-sage)]/20 bg-[var(--color-sage)]/5 text-[var(--color-sage)]",
    dotClass: "bg-[var(--color-sage)]",
    cardClass: "card-sage",
  },
  {
    name: "Databases & Cloud Platforms",
    desc: "Managing persistence, security, and schema designs.",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Supabase"],
    accentColor: "var(--color-rust)",
    pillClass: "border-[var(--color-rust)]/20 bg-[var(--color-rust)]/5 text-[var(--color-rust)]",
    dotClass: "bg-[var(--color-rust)]",
    cardClass: "card-rust",
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-[var(--color-bg)]"
    >
      <div className="w-full max-w-[1440px] mx-auto">
        <SectionHeading title="Skills & Tools" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex"
            >
              <div 
                className={`tano-card p-8 flex flex-col justify-between w-full h-full relative group ${category.cardClass}`}
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${category.dotClass} shrink-0`} />
                    <h3 className="text-xl md:text-2xl font-serif-editorial font-normal text-[var(--color-primary)] tracking-wide">
                      {category.name}
                    </h3>
                  </div>
                  <p className="text-xs uppercase tracking-wider text-[var(--color-muted)] font-semibold mb-6">
                    {category.desc}
                  </p>

                  <div className="flex flex-wrap gap-2.5">
                    {category.items.map((skill, i) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 + i * 0.04, duration: 0.3 }}
                        className={`tano-pill px-3.5 py-1.5 text-xs font-medium ${category.pillClass}`}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
