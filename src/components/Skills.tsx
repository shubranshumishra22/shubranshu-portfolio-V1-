"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const skillCategories = [
  {
    name: "Programming",
    items: ["C", "C++", "Python", "JavaScript", "SQL"],
  },
  {
    name: "AI / ML",
    items: [
      "Machine Learning",
      "Deep Learning",
      "TensorFlow",
      "PyTorch",
      "NLP",
      "Transformers",
      "Scikit-learn",
    ],
  },
  {
    name: "Web",
    items: ["React", "Next.js", "Node.js", "Express", "TypeScript"],
  },
  {
    name: "Databases",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Supabase"],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24"
    >
      <div className="w-full max-w-[1440px] mx-auto">
        <SectionHeading command="$ npm list skills" title="Skills & Tools" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[var(--color-border)]">
                <span className="text-[var(--color-muted)] terminal-text text-xs">├──</span>
                <h3 className="text-[var(--color-primary)] font-semibold text-base tracking-tight">
                  {category.name}
                </h3>
              </div>
              <div className="space-y-2.5 pl-4">
                {category.items.map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 + i * 0.05, duration: 0.3 }}
                    className="flex items-center gap-3 group"
                  >
                    <span className="text-[var(--color-muted)] terminal-text text-xs">
                      ├──
                    </span>
                    <span className="text-[var(--color-secondary)] group-hover:text-[var(--color-primary)] transition-colors duration-300 text-sm">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
