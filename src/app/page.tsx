"use client";

import { motion } from "framer-motion";
import { ThemeProvider } from "@/lib/theme";
import { ReactLenis } from "lenis/react";
import AntigravityParticles from "@/components/AntigravityParticles";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Research from "@/components/Research";
import Achievements from "@/components/Achievements";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <ThemeProvider>
      <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative animate-fadeIn" style={{ background: "var(--color-bg)" }}>
            <AntigravityParticles />
            <Navbar />
            <main className="relative z-10">
              <Hero />
              <About />
              <Experience />
              <Projects />
              <Research />
              <Skills />
              <Achievements />
              <Contact />
            </main>
            {/* Sentinel element to trigger the scroll-lock matrix loop */}
            <div id="page-bottom-sentinel" className="w-full h-2 pointer-events-none" />
          </div>
        </motion.div>
      </ReactLenis>
    </ThemeProvider>
  );
}
