"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { Copy, Check, ArrowUpRight, Mail } from "lucide-react";

// Inline SVG Icon components to ensure cross-version compatibility
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FileTextIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);

const links = [
  { 
    label: "GitHub", 
    url: "https://github.com/shubranshumishra22", 
    icon: GithubIcon, 
    desc: "Explore my open-source code and development projects." 
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/shubranshu-shekhar-633192299/",
    icon: LinkedinIcon,
    desc: "Connect with me professionally and check my updates."
  },
  { 
    label: "Instagram", 
    url: "https://www.instagram.com/buildwithshub/", 
    icon: InstagramIcon, 
    desc: "Follow my daily design work and coding tips." 
  },
  {
    label: "Resume",
    url: "https://drive.google.com/file/d/1aG8dQ7MXFvwYUtlIp2LsYbdHLpnNq51u/view?usp=sharing",
    icon: FileTextIcon,
    desc: "Read my detailed experience and qualifications."
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "shubranshushekhar22@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24"
    >
      <div className="w-full max-w-[1440px] mx-auto">
        <SectionHeading title="Connect" />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1.1fr_1.3fr] gap-12 lg:gap-20">
          
          {/* LEFT COLUMN: Message & Main Email CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-between"
          >
            <div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-primary)] leading-tight">
                Let's build something <br />
                <span className="text-[#7CFF8A]">exceptional</span> together.
              </h3>
              <p className="mt-6 text-[15px] md:text-base text-[var(--color-secondary)] leading-relaxed max-w-lg">
                I'm always looking for new opportunities to collaborate on innovative projects, 
                contribute to open-source systems, or engage in interesting engineering discussions. 
                Drop a line or find me on socials!
              </p>
            </div>

            {/* Premium Copyable Email Block */}
            <div className="mt-12 lg:mt-0 pt-8 border-t border-[var(--color-border)]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                Direct Contact
              </span>
              <div className="mt-3 flex items-center justify-between p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/40 hover:border-[#7CFF8A]/35 transition-all duration-300 group max-w-md">
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 text-[var(--color-primary)] hover:text-[#7CFF8A] transition-colors duration-200"
                >
                  <Mail className="w-[18px] h-[18px] text-[#7CFF8A]" />
                  <span className="text-sm font-medium tracking-wide truncate">{email}</span>
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 text-xs text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors duration-200 px-3 py-1.5 rounded-lg bg-[var(--color-surface)] hover:bg-[var(--color-card)]"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-[13px] h-[13px] text-[#7CFF8A]" />
                      <span className="text-[#7CFF8A] font-medium">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-[13px] h-[13px]" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Interactive Social Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {links.map((link, idx) => {
              const Icon = link.icon;
              return (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col justify-between h-full p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/20 hover:border-[#7CFF8A]/35 hover:bg-[#7CFF8A]/5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300 group"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="p-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-secondary)] group-hover:text-[#7CFF8A] group-hover:bg-[#7CFF8A]/5 group-hover:border-[#7CFF8A]/10 transition-all duration-300">
                          <Icon className="w-[18px] h-[18px]" />
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-[var(--color-muted)] group-hover:text-[var(--color-primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                      </div>
                      <h4 className="mt-6 text-base font-semibold text-[var(--color-primary)] tracking-wide">
                        {link.label}
                      </h4>
                      <p className="mt-2 text-[12.5px] text-[var(--color-secondary)] leading-relaxed">
                        {link.desc}
                      </p>
                    </div>
                  </a>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
