"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { Briefcase, Laptop } from "lucide-react";

export default function Experience() {
  const corporateExperience = {
    role: "Graduate Engineer Trainee",
    company: "LTM",
    status: "Incoming",
    location: "Bengaluru, India",
    period: "Starting Jul 2026",
    description: [
      "Building and maintaining full-stack applications for enterprise clients",
      "Developing RESTful APIs and microservices in Node.js and Python",
      "Collaborating on CI/CD pipelines and cloud deployments (AWS)",
      "Optimizing database queries & improving system performance",
    ],
    stack: [
      { name: "Node.js", colorClass: "border-[var(--color-teal)]/20 bg-[var(--color-teal)]/5 text-[var(--color-teal)]" },
      { name: "React", colorClass: "border-[var(--color-sage)]/20 bg-[var(--color-sage)]/5 text-[var(--color-sage)]" },
      { name: "Python", colorClass: "border-[var(--color-amber)]/20 bg-[var(--color-amber)]/5 text-[var(--color-amber)]" },
      { name: "AWS", colorClass: "border-[var(--color-rust)]/20 bg-[var(--color-rust)]/5 text-[var(--color-rust)]" },
      { name: "PostgreSQL", colorClass: "border-[var(--color-teal)]/20 bg-[var(--color-teal)]/5 text-[var(--color-teal)]" },
      { name: "Docker", colorClass: "border-[var(--color-sage)]/20 bg-[var(--color-sage)]/5 text-[var(--color-sage)]" }
    ],
  };

  const freelanceProjects = [
    {
      title: "The Fusion Lab",
      url: "https://thefusionlab.vercel.app/",
      desc: "Laboratory client management platform and interface.",
      accentColor: "var(--color-teal)",
    },
    {
      title: "School Project Portal",
      url: "https://schoolproject-indol-ten.vercel.app/",
      desc: "Educational assignment management and portal prototype.",
      accentColor: "var(--color-amber)",
    },
  ];

  return (
    <section
      id="experience"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden bg-[var(--color-bg)]"
    >
      <div className="w-full max-w-[1440px] mx-auto relative">
        <SectionHeading title="Experience" />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1.3fr_2fr] gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Corporate / Industry Positions */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2 px-1">
              <Briefcase className="w-4 h-4 text-[var(--color-accent)]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                Industry Experience
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="tano-card p-6 md:p-8 relative group card-rust"
            >
              {/* Incoming Badge */}
              <div className="absolute top-6 right-6 px-3 py-1 rounded-full border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 text-[10px] font-semibold text-[var(--color-accent)] uppercase tracking-wider">
                {corporateExperience.status}
              </div>

              <h4 className="text-lg md:text-xl font-serif-editorial text-[var(--color-primary)] font-normal tracking-wide">
                {corporateExperience.role}
              </h4>
              
              <div className="mt-2 flex flex-wrap items-center gap-x-2 text-[13px] text-[var(--color-secondary)]">
                <span className="font-semibold text-[var(--color-primary)]">{corporateExperience.company}</span>
                <span className="text-[var(--color-muted)]">&bull;</span>
                <span>{corporateExperience.location}</span>
              </div>

              <div className="mt-2 text-xs text-[var(--color-accent)] font-semibold uppercase tracking-wider">
                {corporateExperience.period}
              </div>

              <ul className="mt-6 space-y-4">
                {corporateExperience.description.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-[var(--color-secondary)] leading-relaxed">
                    <span className="text-[var(--color-accent)] mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[var(--color-accent)]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-[var(--color-border)] flex flex-wrap gap-2">
                {corporateExperience.stack.map((tech) => (
                  <span
                    key={tech.name}
                    className={`tano-pill border text-[11px] font-medium py-1 px-2.5 ${tech.colorClass}`}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Freelancing Live Website Previews */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2 px-1">
              <Laptop className="w-4 h-4 text-[var(--color-accent)]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                Freelance Work & Live Previews
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {freelanceProjects.map((proj, idx) => (
                <motion.div
                  key={proj.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                >
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col gap-3 group cursor-pointer block"
                  >
                    <div className="px-1">
                      <h4 className="text-sm font-semibold text-[var(--color-primary)] tracking-wide group-hover:text-[var(--proj-accent)] transition-colors duration-200" style={{ "--proj-accent": proj.accentColor } as React.CSSProperties}>
                        {proj.title}
                      </h4>
                      <p className="text-[12px] text-[var(--color-secondary)] mt-0.5 line-clamp-1">
                        {proj.desc}
                      </p>
                    </div>

                    {/* Website Preview Container (Styled like a clean warm browser viewport) */}
                    <div 
                      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-card)] shadow-[0_12px_32px_-8px_rgba(28,24,21,0.05)] group-hover:border-[var(--proj-accent)] group-hover:shadow-[0_20px_40px_-10px_rgba(28,24,21,0.08)] transition-all duration-400 flex flex-col"
                      style={{ "--proj-accent": proj.accentColor } as React.CSSProperties}
                    >
                      
                      {/* Browser top-bar */}
                      <div className="flex items-center gap-1 px-4 py-2 border-b border-[var(--color-border)] bg-[var(--color-surface)]/30 shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-muted)]/40" />
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-muted)]/40" />
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-muted)]/40" />
                        <div className="ml-3 px-3 py-0.5 rounded-md bg-[var(--color-card)] border border-[var(--color-border)] text-[9px] text-[var(--color-muted)] truncate max-w-[140px] text-center mx-auto select-none pointer-events-none">
                          {proj.url.replace("https://", "")}
                        </div>
                      </div>

                      {/* Viewport Frame loading the live Vercel application */}
                      <div className="w-full grow bg-white relative overflow-hidden">
                        <iframe
                          src={proj.url}
                          title={proj.title}
                          className="absolute inset-0 w-[200%] h-[200%] border-none scale-[0.5] origin-top-left pointer-events-none select-none bg-white"
                          sandbox="allow-scripts allow-same-origin"
                        />
                        {/* Overlay cover to prevent scroll conflict */}
                        <div className="absolute inset-0 bg-transparent z-10" />
                      </div>

                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
