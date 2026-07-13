"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { ArrowUpRight } from "lucide-react";

// Inline SVG Icon components for social links to ensure cross-version compatibility
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const projects = [
  {
    id: "nudge-commerce-ai",
    title: "Nudge Commerce AI",
    subtitle: "Full-Stack SaaS Platform for AI-Powered Storefronts",
    url: "https://nudgeai-nine.vercel.app/",
    repo: "https://github.com/shubranshumishra22",
    highlights: [
      "Multi-Tenant Routing Engine & Custom Domains",
      "Self-Healing LLM Fallback Pipeline",
      "Supabase PostgreSQL Constraints & RLS",
      "Interactive Split Editor & Live Preview",
      "Razorpay Subscription & Checkout flows",
    ],
    tags: ["Next.js", "Supabase", "OpenRouter", "Razorpay", "Tailwind CSS"],
    special: true,
    accentColor: "var(--color-rust)",
    cardClass: "card-rust",
    badgeClass: "border-[var(--color-rust)]/20 bg-[var(--color-rust)]/5 text-[var(--color-rust)]",
    pillClass: "border-[var(--color-rust)]/15 bg-[var(--color-rust)]/5 text-[var(--color-rust)]",
  },
  {
    id: "codewithshub",
    title: "CodeWithShub",
    subtitle: "DSA Learning OS",
    url: "https://codewithshub-frontend.vercel.app/",
    repo: "https://github.com/shubranshumishra22",
    highlights: [
      "Revision Scheduler with 1-3-7-17-30-60-90 Rule",
      "Real-time DSA Tracking & Progress Analytics",
      "Gamified Streaks System & Smart revision loops",
      "Modern dashboard interface for learning insights",
    ],
    tags: ["React", "Next.js", "TypeScript", "PostgreSQL"],
    special: true,
    accentColor: "var(--color-teal)",
    cardClass: "card-teal",
    badgeClass: "border-[var(--color-teal)]/20 bg-[var(--color-teal)]/5 text-[var(--color-teal)]",
    pillClass: "border-[var(--color-teal)]/15 bg-[var(--color-teal)]/5 text-[var(--color-teal)]",
  },
  {
    id: "threat-detection",
    title: "URL Threat Detection",
    subtitle: "AI + Blockchain Security",
    url: "https://github.com/shubranshumishra22/maliciousDomainDetector",
    highlights: [
      "36,000+ URLs analyzed with MLP Classifier",
      "97.07% Accuracy in live domain detection",
      "Gemini API integration with Blockchain Storage",
    ],
    tags: ["Python", "Flask", "scikit-learn", "Web3"],
    special: false,
    accentColor: "var(--color-sage)",
    cardClass: "card-sage",
    badgeClass: "border-[var(--color-sage)]/20 bg-[var(--color-sage)]/5 text-[var(--color-sage)]",
    pillClass: "border-[var(--color-sage)]/15 bg-[var(--color-sage)]/5 text-[var(--color-sage)]",
  },
  {
    id: "wafer-fault",
    title: "Wafer Sensor Fault",
    subtitle: "Predictive Maintenance",
    url: "https://github.com/shubranshumishra22/Wafer-Sensor-Fault-Detection-System",
    highlights: [
      "Analyzes 500+ sensors using Random Forest model",
      "SMOTETomek data balancing pipeline & Flask API",
      "Containerized deployment configuration",
    ],
    tags: ["Python", "Flask", "ML", "Docker"],
    special: false,
    accentColor: "var(--color-amber)",
    cardClass: "card-amber",
    badgeClass: "border-[var(--color-amber)]/20 bg-[var(--color-amber)]/5 text-[var(--color-amber)]",
    pillClass: "border-[var(--color-amber)]/15 bg-[var(--color-amber)]/5 text-[var(--color-amber)]",
  },
  {
    id: "cookmate",
    title: "CookMate",
    subtitle: "Recipe Management Platform",
    url: "https://cookmate-flame.vercel.app/",
    highlights: [
      "Full-stack platform built with Supabase & PostgreSQL",
      "Real-time user ratings and multi-tenant scaling",
      "Optimized query constraints & responsive interfaces",
    ],
    tags: ["Next.js", "PostgreSQL", "Supabase", "Express"],
    special: false,
    accentColor: "var(--color-teal)",
    cardClass: "card-teal",
    badgeClass: "border-[var(--color-teal)]/20 bg-[var(--color-teal)]/5 text-[var(--color-teal)]",
    pillClass: "border-[var(--color-teal)]/15 bg-[var(--color-teal)]/5 text-[var(--color-teal)]",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-[var(--color-bg)]"
    >
      <div className="w-full max-w-[1440px] mx-auto">
        <SectionHeading title="Projects" />

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 items-stretch">
          {projects.map((project, idx) => {
            const isFeatured = project.special;
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={isFeatured ? "lg:col-span-3 flex" : "lg:col-span-2 flex"}
              >
                <div 
                  className={`tano-card p-6 md:p-8 flex flex-col justify-between w-full h-full relative group ${project.cardClass}`}
                >
                  {/* Subtle index mark */}
                  <div className="absolute top-6 right-6 font-handwritten text-xl text-[var(--project-accent)] opacity-40 select-none" style={{ "--project-accent": project.accentColor } as React.CSSProperties}>
                    #{idx + 1}
                  </div>

                  <div>
                    {/* Tags block */}
                    <div className="flex flex-wrap gap-1.5 mb-6 pr-6">
                      {isFeatured && (
                        <span className={`text-[10px] tracking-wider uppercase font-semibold rounded-full px-2 py-0.5 ${project.badgeClass}`}>
                          Featured
                        </span>
                      )}
                      <span className="text-[10px] tracking-wider uppercase font-medium text-[var(--color-muted)] font-mono">
                        {project.id.replace(/-/g, " ")}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-serif-editorial font-normal text-[var(--color-primary)] leading-tight mb-2 pr-6">
                      {project.title}
                    </h3>
                    <p className="text-xs uppercase tracking-wider text-[var(--color-secondary)]/70 font-semibold mb-6">
                      {project.subtitle}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-3 mb-8">
                      {project.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2.5 text-sm text-[var(--color-secondary)] leading-relaxed">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[var(--project-accent)]" style={{ "--project-accent": project.accentColor } as React.CSSProperties} />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack & action buttons */}
                  <div className="pt-6 border-t border-[var(--color-border)] mt-auto">
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`tano-pill px-2.5 py-1 text-[11px] font-medium ${project.pillClass}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--project-accent)] hover:opacity-85 transition-opacity"
                          style={{ "--project-accent": project.accentColor } as React.CSSProperties}
                        >
                          <span>Launch Project</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {project.repo && (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors ml-auto"
                          title="View Repository"
                        >
                          <GithubIcon className="w-4 h-4" />
                          <span>Source</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
