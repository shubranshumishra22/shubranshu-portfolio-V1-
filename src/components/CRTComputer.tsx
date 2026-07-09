"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/lib/theme";
import ArcadeGame from "./ArcadeGame";

interface Hotspot {
  id: string;
  name: string;
  x: number; // Center X as percentage (0-100)
  y: number; // Center Y as percentage (0-100)
  w: number; // Interactive box width as percentage
  h: number; // Interactive box height as percentage
  actionType: "scroll" | "sound" | "theme" | "glitch" | "game";
  target?: string;
  labelText: string;
  labelX: number; // Label X placement as percentage
  labelY: number; // Label Y placement as percentage
}

export default function CRTComputer() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isGameOpen, setIsGameOpen] = useState(false);
  const { toggle } = useTheme();

  const hotspots: Hotspot[] = [
    {
      id: "monitor",
      name: "Projects Monitor",
      x: 52.7,
      y: 56.0,
      w: 22,
      h: 18,
      actionType: "scroll",
      target: "projects",
      labelText: "projects",
      labelX: 54.2,
      labelY: 33.0,
    },
    {
      id: "microphone",
      name: "Audio Mic",
      x: 54.79,
      y: 64.20,
      w: 4,
      h: 8,
      actionType: "sound",
      labelText: "sound player",
      labelX: 62.0,
      labelY: 76.0,
    },
    {
      id: "keyboard",
      name: "Keyboard",
      x: 43.19,
      y: 86.00,
      w: 16,
      h: 8,
      actionType: "scroll",
      target: "contact",
      labelText: "contact info",
      labelX: 32.0,
      labelY: 81.00,
    },
    {
      id: "mouse",
      name: "Arcade Mouse",
      x: 51.3,
      y: 81.0,
      w: 9,
      h: 8,
      actionType: "game",
      labelText: "arcade mode",
      labelX: 48.0,
      labelY: 73.0,
    },
    {
      id: "plant",
      name: "Achievements Plant",
      x: 25.69,
      y: 48.15,
      w: 10,
      h: 18,
      actionType: "scroll",
      target: "achievements",
      labelText: "achievements",
      labelX: 18.0,
      labelY: 53.0,
    },
    {
      id: "camera",
      name: "About Camera",
      x: 32.0,
      y: 69.5,
      w: 6,
      h: 10,
      actionType: "scroll",
      target: "about",
      labelText: "about me",
      labelX: 25.0,
      labelY: 71.5,
    },

    {
      id: "poster",
      name: "Resume Poster",
      x: 84.06,
      y: 57.0,
      w: 14,
      h: 20,
      actionType: "scroll",
      target: "skills",
      labelText: "skills matrix",
      labelX: 84.0,
      labelY: 48.0,
    }
  ];

  const handleAction = (hs: Hotspot) => {
    if (hs.actionType === "scroll" && hs.target) {
      const el = document.getElementById(hs.target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else if (hs.actionType === "sound") {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("maximize-spotify-player"));
      }
    } else if (hs.actionType === "theme") {
      toggle();
    } else if (hs.actionType === "glitch") {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 2500);
    } else if (hs.actionType === "game") {
      setIsGameOpen(true);
    }
  };

  return (
    <div className="absolute top-1/2 left-[46%] -translate-x-1/2 -translate-y-1/2 fullscreen-cover-3-2 select-none">
      <div className="relative w-full h-full select-none">
        
        {/* Vintage Computer Full-Size Image Base */}
        <img
          src="/background.jpg"
          alt="Vintage computer workspace"
          className="relative z-10 w-full h-full object-cover select-none pointer-events-none filter brightness-[0.88] contrast-[1.03]"
        />

        {/* Glitch rain sequence screen overlay positioned exactly inside the CRT monitor screen bezel */}
        {isGlitching && (
          <div
            className="absolute z-20 overflow-hidden animate-pulse"
            style={{
              top: "47.0%",
              left: "43.0%",
              width: "18.9%",
              height: "16.6%",
              background: "rgba(0,0,0,0.9)",
              border: "1px solid rgba(124,255,138,0.5)",
              boxShadow: "0 0 20px rgba(124,255,138,0.3) inset"
            }}
          >
            <div className="w-full h-full flex flex-col items-center justify-center font-terminal text-[8px] sm:text-[10px] text-[#7CFF8A] overflow-hidden relative">
              <div className="absolute inset-0 bg-linear-to-b from-[#7CFF8A]/10 to-transparent" />
              <div className="animate-bounce tracking-widest font-bold">SYS_GLITCH</div>
              <div className="text-[6px] opacity-70 mt-1 uppercase">Loading Rain Kernel...</div>
            </div>
          </div>
        )}

        {/* SVG HUD Overlays for Connecting Lines (Constant on screen) */}
        <svg className="absolute inset-0 w-full h-full z-30 pointer-events-none" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          {hotspots.map((hs) => {
            const isHovered = hoveredId === hs.id;
            const startX = hs.x * 10;
            const startY = hs.y * 10;
            const labelX = hs.labelX * 10;
            const labelY = hs.labelY * 10;

            const midX = startX + (labelX - startX) * 0.4;
            const pathD = `M ${startX} ${startY} L ${midX} ${labelY} L ${labelX} ${labelY}`;

            return (
              <g key={hs.id}>
                {/* Target Circle (Inner Dot) */}
                <motion.circle
                  cx={startX}
                  cy={startY}
                  r="5"
                  animate={isHovered ? { opacity: 1, scale: 1.2 } : { opacity: [0.3, 0.9, 0.3] }}
                  transition={isHovered ? { duration: 0.2 } : { repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                  style={{
                    fill: isHovered ? "#FFFFFF" : "#7CFF8A",
                  }}
                />

                {/* Target Rings */}
                <motion.circle
                  cx={startX}
                  cy={startY}
                  r={isHovered ? 18 : 12}
                  fill="none"
                  strokeWidth="1.2"
                  animate={isHovered ? { opacity: 0.9, scale: 1.1 } : { opacity: [0.15, 0.6, 0.15] }}
                  transition={isHovered ? { duration: 0.2 } : { repeat: Infinity, duration: 1.6, ease: "easeInOut", delay: 0.25 }}
                  style={{
                    stroke: isHovered ? "#FFFFFF" : "#7CFF8A",
                    filter: isHovered ? "drop-shadow(0 0 4px rgba(255,255,255,0.8))" : "drop-shadow(0 0 2px rgba(124,255,138,0.4))",
                  }}
                />

                {/* Leader connecting path line */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="#7CFF8A"
                  strokeWidth="1.2"
                  className="transition-all duration-300"
                  style={{
                    opacity: isHovered ? 0.95 : 0.35,
                    stroke: isHovered ? "#FFFFFF" : "#7CFF8A",
                    filter: isHovered ? "drop-shadow(0 0 4px rgba(255,255,255,0.7))" : "none",
                  }}
                />
              </g>
            );
          })}
        </svg>

        {/* Hotspot Interactive Trigger Zones & HUD Labels */}
        <div className="absolute inset-0 w-full h-full z-40">
          {hotspots.map((hs) => {
            const isHovered = hoveredId === hs.id;
            return (
              <div key={hs.id}>
                {/* Invisible Hover Zone */}
                <div
                  onMouseEnter={() => setHoveredId(hs.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => handleAction(hs)}
                  className="absolute cursor-pointer rounded-lg transition-all duration-300 hover:bg-[#7CFF8A]/3 border border-transparent hover:border-[#7CFF8A]/15"
                  style={{
                    left: `${hs.x - hs.w / 2}%`,
                    top: `${hs.y - hs.h / 2}%`,
                    width: `${hs.w}%`,
                    height: `${hs.h}%`,
                  }}
                  aria-label={`Highlight ${hs.name}`}
                />

                {/* Constant Labeled Text tag (Flowing inward to prevent clipping) */}
                <button
                  onMouseEnter={() => setHoveredId(hs.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => handleAction(hs)}
                  className="absolute z-50 font-terminal text-[9px] uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer rounded px-2 py-0.5"
                  style={{
                    left: `${hs.labelX}%`,
                    top: `${hs.labelY}%`,
                    transform: `translate(${hs.labelX < 50 ? "0" : "-100%"}, -50%)`,
                    border: isHovered ? "1px solid #FFFFFF" : "1px solid rgba(124,255,138,0.4)",
                    color: isHovered ? "#000000" : "#7CFF8A",
                    backgroundColor: isHovered ? "#FFFFFF" : "rgba(5, 5, 5, 0.85)",
                    boxShadow: isHovered 
                      ? "0 0 12px rgba(255, 255, 255, 0.6)" 
                      : "0 0 6px rgba(124, 255, 138, 0.15)",
                  }}
                >
                  {hs.labelText}
                </button>
              </div>
            );
          })}
        </div>

        {isGameOpen && (
          <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/45 backdrop-blur-[2px] px-4">
            <div className="relative w-[min(92vw,520px)] aspect-[4/3] rounded-lg border border-[#7CFF8A]/35 bg-[#050505]/95 p-4 shadow-[0_0_36px_rgba(124,255,138,0.18)]">
              <button
                onClick={() => setIsGameOpen(false)}
                className="absolute right-3 top-2 z-10 font-terminal text-[10px] text-[#7CFF8A]/70 hover:text-white transition-colors cursor-pointer"
                aria-label="Close arcade game"
              >
                [x]
              </button>
              <ArcadeGame onExit={() => setIsGameOpen(false)} />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
