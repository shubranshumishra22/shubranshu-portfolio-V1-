"use client";

import { motion } from "framer-motion";
import CRTComputer from "./CRTComputer";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-screen h-screen overflow-hidden bg-transparent select-none"
    >
      {/* Centerpiece vintage CRT computer */}
      <div className="relative z-10 w-full h-full select-none">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <CRTComputer />
        </motion.div>
      </div>
    </section>
  );
}
