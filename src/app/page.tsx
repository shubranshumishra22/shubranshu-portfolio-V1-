"use client";

import { useState } from "react";
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
  const [loading, setLoading] = useState(() => {
    if (typeof window !== "undefined" && localStorage.getItem("shubranshu_visited")) {
      return false;
    }
    return true;
  });

  const handleComplete = () => {
    localStorage.setItem("shubranshu_visited", "true");
    setLoading(false);
  };

  return (
    <>
      {loading && <LoadingScreen onComplete={handleComplete} />}

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
    </>
  );
}
