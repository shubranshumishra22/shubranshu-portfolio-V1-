"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 3.5, ease: "easeOut" }}
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500",
        scrolled ? "w-[65%] md:w-[50%]" : "w-[80%] md:w-[65%]"
      )}
    >
      <div
        className={cn(
          "w-full rounded-full backdrop-blur-xl transition-all duration-500",
          scrolled
            ? "bg-[#0D0D0D]/70 border border-[#222]/50 py-2.5"
            : "bg-[#0D0D0D]/40 border border-[#222]/30 py-3"
        )}
      >
        <div className="flex items-center justify-center gap-1 px-4">
          <span
            className={cn(
              "text-white/40 terminal-text transition-all duration-500 mr-2",
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
                "relative px-2.5 py-1 text-[#A1A1A1] hover:text-white transition-all duration-300 rounded-full hover:bg-white/5",
                "terminal-text tracking-tight",
                scrolled ? "text-[11px]" : "text-xs"
              )}
            >
              {item.label.toLowerCase()}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
