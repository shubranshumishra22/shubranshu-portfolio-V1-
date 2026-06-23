"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Research", href: "#research" },
  { label: "Skills", href: "#skills" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 transform",
        "w-max max-w-[95vw]"
      )}
    >
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 3.5, ease: "easeOut" }}
        className="w-full"
      >
        <div
          className={cn(
            "w-full rounded-full backdrop-blur-xl transition-all duration-500",
            scrolled
              ? "bg-[var(--color-surface)]/70 border border-[var(--color-border)]/50 py-2.5"
              : "bg-[var(--color-surface)]/40 border border-[var(--color-border)]/30 py-3"
          )}
        >
          <div className="flex items-center justify-center gap-1 px-4">
            <span
              className={cn(
                "text-[var(--color-muted)] terminal-text transition-all duration-500 mr-2",
                scrolled ? "text-[10px]" : "text-xs"
              )}
            >
              $
            </span>
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "relative px-2.5 py-1 text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-all duration-300 rounded-full hover:bg-[var(--color-border)]/30",
                  "terminal-text tracking-tight",
                  scrolled ? "text-[11px]" : "text-xs"
                )}
              >
                {item.label.toLowerCase()}
              </a>
            ))}
            <button
              onClick={toggle}
              className="ml-2 px-2.5 py-1 text-xs terminal-text text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "☀" : "☾"}
            </button>
          </div>
        </div>
      </motion.nav>
    </div>
  );
}
