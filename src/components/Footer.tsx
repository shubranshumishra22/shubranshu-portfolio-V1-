"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative py-16 px-6 md:px-12 lg:px-24 border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="w-full max-w-[1440px] mx-auto">
        <div className="tano-card p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <span className="font-serif-editorial text-xl italic text-[var(--color-primary)]">shub</span>
              <span className="text-[var(--color-accent)] font-semibold text-xs">.dev</span>
            </div>
            <p className="text-xs text-[var(--color-secondary)] text-center md:text-left">
              Building intelligent agents, IoT systems, and scalable applications.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-handwritten text-lg text-[var(--color-accent)]"
            >
              Thanks for stopping by!
            </motion.div>
            <p className="text-[10px] uppercase tracking-wider text-[var(--color-muted)]">
              © {new Date().getFullYear()} Shubranshu Shekhar &bull; All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
