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
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const vh = window.innerHeight || 800;
      setVisible(window.scrollY > vh - 100);
      setHovered(false); // Shrink when scroll occurs
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={() => {
        if (!hovered) setHovered(true);
      }}
      initial={{ y: -20, opacity: 0 }}
      animate={{ 
        y: visible ? 0 : -20, 
        opacity: visible ? 1 : 0 
      }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-[width] duration-500 ease-in-out",
        visible ? "pointer-events-auto" : "pointer-events-none",
        hovered ? "w-[90%] md:w-[70%]" : "w-[80%] md:w-[55%]"
      )}
    >
      <div
        className={cn(
          "w-full rounded-full backdrop-blur-xl transition-[padding,background-color,border-color] duration-500 ease-in-out",
          hovered
            ? "bg-[var(--color-surface)]/40 border border-[var(--color-border)]/30 py-3"
            : "bg-[var(--color-surface)]/70 border border-[var(--color-border)]/50 py-2.5"
        )}
      >
        <div className="flex items-center justify-center gap-1 px-4">
          <span
            className={cn(
              "text-[var(--color-muted)] terminal-text transition-all duration-500 mr-2",
              hovered ? "text-xs" : "text-[10px]"
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
                hovered ? "text-xs" : "text-[11px]"
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
  );
}
