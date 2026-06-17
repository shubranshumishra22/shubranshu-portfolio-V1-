"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { cn } from "@/lib/utils";

const frames = [
  { id: 1, label: "shot_001.mp4", desc: "Golden Hour" },
  { id: 2, label: "shot_002.mp4", desc: "Street" },
  { id: 3, label: "shot_003.mp4", desc: "Portrait" },
  { id: 4, label: "shot_004.mp4", desc: "Landscape" },
  { id: 5, label: "shot_005.mp4", desc: "Night" },
  { id: 6, label: "shot_006.mp4", desc: "Action" },
];

export default function Cinematography() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  return (
    <section
      id="cinematography"
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="px-6 md:px-12 lg:px-24 mb-16">
        <div className="w-full max-w-[1440px] mx-auto">
          <SectionHeading
            command="$ open capturing_frames.mp4"
            title="Cinematography"
          />
        </div>
      </div>

      <motion.div style={{ x }} className="flex gap-4 px-6 md:px-12 lg:px-24 w-max pb-8">
        {frames.map((frame) => (
          <motion.div
            key={frame.id}
            onHoverStart={() => setHoveredId(frame.id)}
            onHoverEnd={() => setHoveredId(null)}
            className={cn(
              "relative flex-shrink-0 rounded-xl overflow-hidden border transition-all duration-500 cursor-pointer",
              hoveredId === frame.id
                ? "border-white/30 scale-[1.02]"
                : "border-[#222] grayscale"
            )}
            style={{ width: 280, height: 180 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#111] to-[#0D0D0D] flex items-center justify-center">
              <div className="text-center">
                <svg
                  className="w-8 h-8 text-[#333] mx-auto mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white text-xs font-medium">
                {frame.desc}
              </p>
              <p className="text-[#666] terminal-text text-[10px]">
                {frame.label}
              </p>
            </div>

            <div
              className={cn(
                "absolute top-2 right-2 px-1.5 py-0.5 rounded text-[8px] terminal-text transition-opacity duration-300",
                hoveredId === frame.id
                  ? "opacity-100 bg-white/10 text-white border border-white/20"
                  : "opacity-0"
              )}
            >
              ▶ Preview
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="px-6 md:px-12 lg:px-24 mt-8">
        <div className="w-full max-w-[1440px] mx-auto">
          <p className="text-[10px] terminal-text text-[#444]">
            {frames.length} files — {frames.length * 24} MB — grayscale
          </p>
        </div>
      </div>
    </section>
  );
}
