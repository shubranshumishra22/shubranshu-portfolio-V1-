"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/lib/theme";
import { User, Code, FileText, Cpu, Trophy, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isNear, setIsNear] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isFirstPage, setIsFirstPage] = useState(true);
  const { theme, toggle } = useTheme();
  const navbarRef = useRef<HTMLDivElement>(null);

  // Proximity tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!navbarRef.current) return;
      const rect = navbarRef.current.getBoundingClientRect();

      const dx = Math.max(rect.left - e.clientX, 0, e.clientX - rect.right);
      const dy = Math.max(rect.top - e.clientY, 0, e.clientY - rect.bottom);
      const distance = Math.sqrt(dx * dx + dy * dy);

      setIsNear(distance < 120);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Scroll spy to detect active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "projects", "research", "skills", "achievements", "contact"];
      const scrollPosition = window.scrollY + 250; // offset
      setIsFirstPage(window.scrollY < window.innerHeight - 100);

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "About", href: "#about", icon: User, id: "about" },
    { label: "Projects", href: "#projects", icon: Code, id: "projects" },
    { label: "Research", href: "#research", icon: FileText, id: "research" },
    { label: "Skills", href: "#skills", icon: Cpu, id: "skills" },
    { label: "Achievements", href: "#achievements", icon: Trophy, id: "achievements" },
    { label: "Contact", href: "#contact", icon: Mail, id: "contact" },
  ];
  const useDarkNavbar = theme === "dark" || isFirstPage;

  return (
    <motion.nav
      ref={navbarRef}
      initial={{ 
        opacity: 0.85, 
        scale: 0.78, 
        y: -4,
        x: "-50%"
      }}
      animate={{ 
        opacity: isNear ? 1 : 0.85,
        scale: isNear ? 1 : 0.78,
        y: isNear ? 0 : -4,
        x: "-50%"
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 left-1/2 z-100 pointer-events-auto select-none w-[min(92vw,1100px)] md:w-[min(75vw,1100px)] max-w-[1100px]"
    >
      <div
        className={`w-full rounded-full border backdrop-blur-xl px-6 py-2.5 transition-all duration-300 ${
          useDarkNavbar
            ? "border-[#222222] bg-[#050505]/90 shadow-[0_8px_32px_rgba(0,0,0,0.22)]"
            : "border-[var(--color-border)] bg-[var(--color-bg)]/80 shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
        }`}
        style={{
          fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        <div className="flex items-center justify-between min-h-[36px]">
          
          <div className="flex items-center">
            <a 
              href="#" 
              className={`font-bold text-sm tracking-tight hover:text-[#7CFF8A] transition-colors duration-200 ${
                useDarkNavbar ? "text-white" : "text-[var(--color-primary)]"
              }`}
            >
              shub<span className="text-[#7CFF8A]">.dev</span>
            </a>
          </div>

          {/* Center: Navigation Links */}
          <div className="flex items-center gap-1 md:gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] md:text-[13px] font-medium transition-all duration-300 ${
                    useDarkNavbar && isActive
                      ? "text-white bg-[#111111] border border-[#2A2A2A] shadow-[0_2px_10px_rgba(0,0,0,0.18)]"
                      : useDarkNavbar
                        ? "text-[#A1A1A1] hover:text-white hover:bg-white/10"
                        : isActive
                          ? "text-[var(--color-primary)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[0_2px_10px_rgba(0,0,0,0.04)]"
                          : "text-[var(--color-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)]/50"
                  }`}
                >
                  <Icon className="w-[13px] h-[13px]" />
                  <span className="hidden sm:inline">{item.label}</span>
                </a>
              );
            })}
          </div>

          {/* Right Side: Theme Toggle */}
          <div className="flex items-center">
            <button
              onClick={toggle}
              className={`flex items-center justify-center w-8 h-8 rounded-full border text-sm font-medium transition-all duration-300 cursor-pointer ${
                useDarkNavbar
                  ? "border-[#2A2A2A] bg-[#111111]/70 text-[#A1A1A1] hover:text-white hover:bg-[#171717] hover:border-[#3A3A3A]"
                  : "border-[var(--color-border)] bg-[var(--color-surface)]/50 text-[var(--color-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)] hover:border-[var(--color-border)]"
              }`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "☀" : "☾"}
            </button>
          </div>

        </div>
      </div>
    </motion.nav>
  );
}
