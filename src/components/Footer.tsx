"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative py-16 px-6 md:px-12 lg:px-24 border-t border-[var(--color-border)]">
      <div className="w-full max-w-[1440px] mx-auto">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 terminal-text text-sm"
          >
            <span className="text-[var(--color-muted)]">visitor@shubranshu</span>
            <span className="text-[var(--color-primary)]">:~$</span>
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: "auto" }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1.5, ease: "easeInOut" }}
              className="text-[var(--color-primary)] overflow-hidden whitespace-nowrap inline-block"
            >
              Thanks for visiting.
            </motion.span>
            <span className="inline-block w-2 h-4 bg-white cursor-blink align-middle" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="mt-6 pt-4 border-t border-[var(--color-border)]"
          >
            <p className="text-[10px] terminal-text text-[var(--color-muted)] text-center">
              © {new Date().getFullYear()} Shubranshu Shekhar
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
