"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import OSGatewayAnimation from "@/components/OSGatewayAnimation";
import LoadingScreen from "@/components/LoadingScreen";
import ASCIIBackground from "@/components/ASCIIBackground";
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
  const [phase, setPhase] = useState<"gate" | "loading" | "ready">(() => {
    if (typeof window !== "undefined" && localStorage.getItem("shubranshu_visited")) {
      return "ready";
    }
    return "gate";
  });

  const handleGateComplete = () => {
    localStorage.setItem("shubranshu_visited", "true");
    setPhase("loading");
  };

  return (
    <AnimatePresence mode="wait">
      {phase === "gate" && (
        <motion.div
          key="gate"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <OSGatewayAnimation onComplete={handleGateComplete} />
        </motion.div>
      )}

      {phase === "loading" && (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <LoadingScreen onComplete={() => setPhase("ready")} />
        </motion.div>
      )}

      {phase === "ready" && (
        <motion.div
          key="ready"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="relative">
            <ASCIIBackground />
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
      )}
    </AnimatePresence>
  );
}
