"use client";

import { motion } from "framer-motion";
import TerminalWindow from "./TerminalWindow";
import SectionHeading from "./SectionHeading";

const aboutLines = [
  { content: "cat about.txt", type: "prompt" as const },
  { content: "", type: "system" as const },
  {
    content:
      "Final-year engineering student focused on software engineering,",
    type: "output" as const,
  },
  {
    content: "AI systems, and full-stack development.",
    type: "output" as const,
  },
  { content: "", type: "system" as const },
  {
    content: "Passionate about building products that solve practical",
    type: "output" as const,
  },
  { content: "problems.", type: "output" as const },
  { content: "", type: "system" as const },
  {
    content: "Outside technology, I enjoy fitness, sports, and",
    type: "output" as const,
  },
  { content: "cinematography.", type: "output" as const },
  { content: "", type: "system" as const },
  {
    content: "Location: India",
    type: "system" as const,
  },
  {
    content: "Status: Final Year, B.Tech Engineering",
    type: "system" as const,
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24"
    >
      <div className="w-full max-w-[1440px] mx-auto">
        <SectionHeading command="$ cat about.txt" title="About Me" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <TerminalWindow lines={aboutLines} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden border border-[#222] bg-[#0A0A0A]">
              <img
                src="/research-plant.png"
                alt="Shubranshu Shekhar"
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 group-hover:opacity-100 group-hover:contrast-125 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10" />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <p className="terminal-text text-xs text-[#666]">
                  $ image --shubranshu
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
