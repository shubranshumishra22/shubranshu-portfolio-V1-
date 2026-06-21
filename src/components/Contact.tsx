"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const links = [
  { label: "GitHub", url: "https://github.com/shubranshumishra22", icon: ">" },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/shubranshu-shekhar-633192299/",
    icon: ">",
  },
  { label: "Instagram", url: "https://www.instagram.com/buildwithshub/", icon: ">" },
  {
    label: "Resume",
    url: "https://drive.google.com/file/d/1aG8dQ7MXFvwYUtlIp2LsYbdHLpnNq51u/view?usp=sharing",
    icon: ">",
  },
];

export default function Contact() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (label: string, url: string) => {
    navigator.clipboard.writeText(url.replace("mailto:", ""));
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24"
    >
      <div className="w-full max-w-[1440px] mx-auto">
        <SectionHeading command="$ connect" title="Connect" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 md:p-12 max-w-2xl"
        >
          <div className="flex items-center gap-2 mb-8">
            <span className="text-[var(--color-muted)] terminal-text text-xs">
              visitor@shubranshu
            </span>
            <span className="text-[var(--color-primary)] terminal-text text-xs">:~$</span>
            <span className="text-[var(--color-primary)] terminal-text text-xs">connect</span>
          </div>

          <div className="space-y-3">
            {links.map((link, idx) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.3 }}
                className="group"
              >
                <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] hover:border-white/20 transition-all duration-300">
                  <a
                    href={link.url}
                    target={link.url.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.url.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex items-center gap-3 flex-1"
                  >
                    <span className="text-[var(--color-muted)] terminal-text text-sm">
                      {link.icon}
                    </span>
                    <span className="text-[var(--color-primary)] text-sm font-medium">
                      {link.label}
                    </span>
                  </a>
                  <button
                    onClick={() => handleCopy(link.label, link.url)}
                    className="text-[10px] terminal-text text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors duration-200 px-2 py-1 rounded hover:bg-white/5"
                  >
                    {copied === link.label ? "✓ Copied" : "[copy]"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="mt-8 pt-6 border-t border-[var(--color-border)]"
          >
            <p className="text-[var(--color-muted)] terminal-text text-xs">
              {/*  */}
              $ Connection established. Ready to build something great.
              <span className="inline-block w-2 h-4 bg-white ml-1 cursor-blink align-middle" />
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
