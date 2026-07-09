"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { Briefcase, Layers, Laptop } from "lucide-react";

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
    stack: ["Node.js", "React", "Python", "AWS", "PostgreSQL", "Docker"],
  };

  const freelanceProjects = [
    {
      title: "The Fusion Lab",
      url: "https://thefusionlab.vercel.app/",
      desc: "A custom laboratory client management platform and interface.",
    },
    {
      title: "School Project Portal",
      url: "https://schoolproject-indol-ten.vercel.app/",
      desc: "An educational assignment management and portal prototype.",
    },
  ];

  return (
    <section
      id="experience"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Soft atmospheric background grid */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="w-full max-w-[1440px] mx-auto relative">
        <SectionHeading title="Experience" />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1.2fr_2fr] gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Corporate / Industry Positions */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="w-4 h-4 text-[#7CFF8A]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                Industry Experience
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/20 hover:border-[#7CFF8A]/35 transition-all duration-300 relative group"
            >
              {/* Incoming Badge */}
              <div className="absolute top-6 right-6 px-3 py-1 rounded-full border border-[#7CFF8A]/35 bg-[#7CFF8A]/5 text-[10px] font-semibold text-[#7CFF8A] uppercase tracking-wider">
                {corporateExperience.status}
              </div>

              <h4 className="text-lg font-bold text-[var(--color-primary)] tracking-wide">
                {corporateExperience.role}
              </h4>
              
              <div className="mt-1 flex flex-wrap items-center gap-x-2 text-[13px] text-[var(--color-secondary)]">
                <span className="font-semibold text-[var(--color-primary)]">{corporateExperience.company}</span>
                <span className="text-[var(--color-muted)]">•</span>
                <span>{corporateExperience.location}</span>
              </div>

              <div className="mt-2 text-xs text-[#7CFF8A] font-semibold">
                {corporateExperience.period}
              </div>

              <ul className="mt-6 space-y-3">
                {corporateExperience.description.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-[13.5px] text-[var(--color-secondary)] leading-relaxed">
                    <span className="text-[#7CFF8A] mt-1.5 font-semibold text-[10px]">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-[var(--color-border)] flex flex-wrap gap-1.5">
                {corporateExperience.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-secondary)] text-[11px] font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Freelancing Live Website Previews */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Laptop className="w-4 h-4 text-[#7CFF8A]" />
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
                      <h4 className="text-sm font-semibold text-[var(--color-primary)] tracking-wide group-hover:text-[#7CFF8A] transition-colors duration-200">
                        {proj.title}
                      </h4>
                      <p className="text-[12px] text-[var(--color-secondary)] mt-0.5 line-clamp-1">
                        {proj.desc}
                      </p>
                    </div>

                    {/* Website Preview Container (Clean, direct preview, no mock browser bar) */}
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-card)] shadow-[0_12px_32px_rgba(0,0,0,0.05)] group-hover:border-[#7CFF8A]/35 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300">
                      
                      {/* Viewport Frame loading the live Vercel application at a scaled-down ratio */}
                      <div className="w-full h-full bg-white relative overflow-hidden">
                        <iframe
                          src={proj.url}
                          title={proj.title}
                          className="absolute inset-0 w-[200%] h-[200%] border-none scale-[0.5] origin-top-left pointer-events-none select-none bg-white"
                          sandbox="allow-scripts allow-same-origin"
                        />
                        {/* Invisible pointer-events cover to prevent scroll conflicts but keep visual interactivity on hover */}
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
