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

// Internal controller component to handle scroll locks and smooth page-to-page transitions
function ScrollTransitionController({ loaded }: { loaded: boolean }) {
  const lenis = useLenis();
  const scrollingRef = useRef(false);
  const touchStartY = useRef(0);

  useEffect(() => {
    if (!lenis) return;

    if (!loaded) {
      lenis.stop();
      return;
    } else {
      lenis.start();
    }

    const handleWheel = (e: WheelEvent) => {
      if (scrollingRef.current) {
        e.preventDefault();
        return;
      }

      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      // From Hero section (scrollY === 0) scroll down to About section
      if (scrollY < 10 && e.deltaY > 0) {
        e.preventDefault();
        scrollingRef.current = true;
        lenis.scrollTo("#about", {
          duration: 1.5,
          force: true,
          onComplete: () => {
            scrollingRef.current = false;
          },
        });
      }

      // From top of About section scroll back up to Hero section
      if (scrollY > 10 && scrollY <= vh + 5 && e.deltaY < 0) {
        e.preventDefault();
        scrollingRef.current = true;
        lenis.scrollTo(0, {
          duration: 1.5,
          force: true,
          onComplete: () => {
            scrollingRef.current = false;
          },
        });
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (scrollingRef.current) {
        e.preventDefault();
        return;
      }

      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY.current - touchEndY; // Positive means scroll down
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      // Swipe up (scroll down) from Hero
      if (scrollY < 10 && deltaY > 10) {
        e.preventDefault();
        scrollingRef.current = true;
        lenis.scrollTo("#about", {
          duration: 1.5,
          force: true,
          onComplete: () => {
            scrollingRef.current = false;
          },
        });
      }

      // Swipe down (scroll up) from top of About
      if (scrollY > 10 && scrollY <= vh + 5 && deltaY < -10) {
        e.preventDefault();
        scrollingRef.current = true;
        lenis.scrollTo(0, {
          duration: 1.5,
          force: true,
          onComplete: () => {
            scrollingRef.current = false;
          },
        });
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [lenis, loaded]);

  return null;
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Preload and cache the vintage computer centerpiece image
    const img = new Image();
    img.src = "/pexels-piotrbaranowski-22763683.jpg";
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
