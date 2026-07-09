"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@/lib/theme";
import { ReactLenis, useLenis } from "lenis/react";
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
import SpotifyPlayer from "@/components/SpotifyPlayer";

// Internal controller component to handle scroll locks during loading
function ScrollTransitionController({ loaded }: { loaded: boolean }) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    if (!loaded) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [lenis, loaded]);

  return null;
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Preload and cache the vintage computer centerpiece image
    const img = new Image();
    img.src = "/background.jpg";
    img.onload = () => {
      setImageLoaded(true);
    };
  }, []);

  return (
    <ThemeProvider>
      <AnimatePresence>
        {!loaded && (
          <LoadingScreen 
            key="loader" 
            imageLoaded={imageLoaded} 
            onComplete={() => setLoaded(true)} 
          />
        )}
      </AnimatePresence>

      {/* ReactLenis mounts once at root, preventing unmount/remount duplicate loads */}
      <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
        <ScrollTransitionController loaded={loaded} />
        <div 
          className={
            loaded 
              ? "relative transition-opacity duration-300" 
              : "relative pointer-events-none"
          }
          style={{ background: "var(--color-bg)" }}
        >
          <AntigravityParticles />
          <Navbar />
          <SpotifyPlayer />
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
      </ReactLenis>
    </ThemeProvider>
  );
}
