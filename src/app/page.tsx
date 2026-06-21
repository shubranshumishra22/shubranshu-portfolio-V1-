"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ThemeProvider } from "@/lib/theme";
import LaptopEntry from "@/components/LaptopEntry";
import LoadingScreen from "@/components/LoadingScreen";
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
import Footer from "@/components/Footer";

export default function Home() {
  const [ready, setReady] = useState(false);

  return (
    <>
      {!ready && (
        <div className="fixed inset-0 z-[300]">
          <LaptopEntry onComplete={() => setReady(true)} />
        </div>
      )}

      {!ready && <LoadingScreen />}

      {ready && (
        <ThemeProvider>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative" style={{ background: "var(--color-bg)" }}>
              <AntigravityParticles />
              <Navbar />
              <main className="relative z-10">
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Research />
                <Achievements />
                <Experience />
                <Contact />
              </main>
              <Footer />
            </div>
          </motion.div>
        </ThemeProvider>
      )}
    </>
  );
}
