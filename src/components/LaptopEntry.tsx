"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const LOADING_ITEMS = ["Projects", "Research", "Experience", "Contact"];

export default function LaptopEntry({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<
    "initial" | "spotlight" | "laptop" | "tap" | "authenticating" | "zooming" | "dissolve" | "complete"
  >("initial");
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [authText, setAuthText] = useState("");
  const [showAuthResult, setShowAuthResult] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Show skip button after 1.5s
  useEffect(() => {
    const t = setTimeout(() => setShowSkip(true), 1500);
    return () => clearTimeout(t);
  }, []);

  // Keyboard skip: Space / Enter
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        onCompleteRef.current();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleSkip = useCallback(() => {
    onCompleteRef.current();
  }, []);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    const interval = setInterval(() => {
      setProgress((p) => {
        const inc = Math.random() * 8 + 2;
        return Math.min(p + inc, 100);
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const count = Math.min(Math.floor((progress / 100) * LOADING_ITEMS.length), LOADING_ITEMS.length);
    setVisibleCount(count);
    if (progress >= 100 && !showPrompt) {
      setTimeout(() => setShowPrompt(true), 500);
    }
  }, [progress, showPrompt]);

  useEffect(() => {
    if (phase === "initial") {
      const t = setTimeout(() => setPhase("spotlight"), 100);
      return () => clearTimeout(t);
    }
    if (phase === "spotlight") {
      const t = setTimeout(() => setPhase("laptop"), 400);
      return () => clearTimeout(t);
    }
    if (phase === "laptop") {
      const t = setTimeout(() => setPhase("tap"), 300);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    setMouseX((e.clientX - cx) / cx);
    setMouseY((e.clientY - cy) / cy);
  }, []);

  const handleClick = useCallback(() => {
    if (phase !== "tap") return;
    setPhase("authenticating");
    let i = 0;
    const text = "authenticate";
    const t1 = setInterval(() => {
      i++;
      setAuthText(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(t1);
        setTimeout(() => setShowAuthResult(true), 600);
        setTimeout(() => {
          setPhase("zooming");
        }, 1000);
      }
    }, 100);
  }, [phase]);

  useEffect(() => {
    if (phase === "zooming") {
      const t = setTimeout(() => setPhase("dissolve"), 1000);
      return () => clearTimeout(t);
    }
    if (phase === "dissolve") {
      const t = setTimeout(() => {
        setPhase("complete");
        setTimeout(onCompleteRef.current, 100);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const isLaptopVisible = phase === "laptop" || phase === "tap" || phase === "authenticating";
  const isZooming = phase === "zooming" || phase === "dissolve";
  const screenScale = phase === "zooming" ? 2.2 : phase === "dissolve" ? 60 : 1;

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      className="fixed inset-0 z-[200] bg-[#050505] overflow-hidden cursor-pointer"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* DUST PARTICLES */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px bg-white/20 rounded-full"
            style={{ left: `${(i * 2.7) % 100}%`, top: `${(i * 8.3) % 100}%` }}
            animate={{
              opacity: [0, 0.3, 0],
              y: [0, -15 - (i % 8) * 4],
            }}
            transition={{
              duration: 3 + (i % 4),
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* SPOTLIGHT */}
      <AnimatePresence>
        {(phase === "spotlight" || isLaptopVisible || isZooming) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              width: "55%",
              height: "65%",
              background:
                "radial-gradient(ellipse at center top, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 30%, transparent 65%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* VIGNETTE */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.5) 100%)",
      }} />

      {/* SKIP BUTTON */}
      <AnimatePresence>
        {showSkip && (
          <motion.button
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={(e) => { e.stopPropagation(); handleSkip(); }}
            className="absolute top-5 right-5 z-50 px-3 py-1.5 text-[11px] terminal-text text-white/30 hover:text-white/70 transition-colors border border-white/10 hover:border-white/30 rounded"
          >
            Skip &rarr;
          </motion.button>
        )}
      </AnimatePresence>

      {/* KEYBOARD HINT */}
      <AnimatePresence>
        {showSkip && !isZooming && phase !== "complete" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] terminal-text text-white/25 tracking-wider"
          >
            Space &#x2022; Enter to skip
          </motion.p>
        )}
      </AnimatePresence>

      {/* === LAPTOP === */}
      <AnimatePresence>
        {(isLaptopVisible || isZooming) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              rotateX: isZooming ? 0 : mouseY * -1.5,
              rotateY: isZooming ? 0 : mouseX * 3,
              transformStyle: "preserve-3d",
              perspective: 1200,
              transition: "rotateX 0.3s ease-out, rotateY 0.3s ease-out",
            }}
          >
            {/* SHADOW under laptop */}
            <motion.div
              animate={{ opacity: phase === "dissolve" ? 0 : 0.3 }}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[320px] h-10 rounded-full"
              style={{
                background: "radial-gradient(ellipse, rgba(0,0,0,0.5), transparent 70%)",
                filter: "blur(12px)",
              }}
            />

            <motion.div
              animate={{ opacity: phase === "dissolve" ? 0 : 1 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="relative"
              style={{ width: 260 }}
            >
              {/* === SCREEN LID === */}
              <div className="relative" style={{ marginBottom: -2 }}>
                {/* Outer lid shell */}
                <div
                  className="relative mx-auto overflow-hidden"
                  style={{
                    width: 260,
                    height: 178,
                    backgroundColor: "#0a0a0a",
                    borderRadius: "14px 14px 4px 4px",
                    border: "1px solid rgba(255,255,255,0.07)",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
                    transformOrigin: "center center",
                    transform: isZooming ? `scale(${screenScale})` : "scale(1)",
                    transition: phase === "zooming"
                      ? `transform 1.4s cubic-bezier(0.76, 0, 0.24, 1)`
                      : phase === "dissolve"
                      ? `transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)`
                      : "none",
                  }}
                >
                  {/* Lid top edge highlight */}
                  <div className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-20" />

                  {/* Inner recess for screen */}
                  <div
                    className="absolute inset-[12px] overflow-hidden"
                    style={{
                      backgroundColor: "#050505",
                      borderRadius: 8,
                    }}
                  >
                    {/* Screen content */}
                    <div className="absolute inset-0" style={{ backgroundColor: "#050505" }}>
                      {/* Top bar glow */}
                      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white/[0.025] to-transparent pointer-events-none" />

                      <div className="p-4 pt-5 flex flex-col h-full">
                        <p className="text-[9px] text-[#666] terminal-text mb-3 leading-none">
                          Initializing Shubranshu.OS...
                        </p>

                        <div className="space-y-1.5 mb-3 flex-1">
                          {LOADING_ITEMS.map((name, idx) => (
                            <div key={name} className="flex items-center gap-2">
                              <span
                                className={cn(
                                  "text-[8px] leading-none",
                                  idx < visibleCount ? "text-white" : "text-[#333]"
                                )}
                              >
                                {idx < visibleCount ? "✓" : "○"}
                              </span>
                              <span
                                className={cn(
                                  "text-[9px] terminal-text leading-none transition-colors",
                                  idx < visibleCount ? "text-white" : "text-[#444]"
                                )}
                              >
                                Loading {name}...
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="w-full h-px bg-[#111] mb-1 relative overflow-hidden shrink-0">
                          <motion.div
                            className="absolute left-0 top-0 h-full bg-white"
                            initial={{ width: "0%" }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.1 }}
                          />
                        </div>

                        <p className="text-[8px] text-[#444] terminal-text leading-none">
                          {Math.floor(progress)}%
                        </p>

                        {phase === "authenticating" && (
                          <motion.div className="mt-2 space-y-1">
                            <p className="text-[9px] terminal-text leading-none">
                              <span className="text-[#666]">visitor@shubranshu</span>
                              <span className="text-white">:~$</span>{" "}
                              <span className="text-white">{authText}</span>
                            </p>
                            {showAuthResult && (
                              <>
                                <p className="text-[9px] text-[#666] terminal-text leading-none">
                                  Verifying User...
                                </p>
                                <motion.p
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="text-[9px] text-green-500/70 terminal-text leading-none"
                                >
                                  Access Granted
                                </motion.p>
                              </>
                            )}
                          </motion.div>
                        )}

                        {showPrompt && phase === "tap" && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-[9px] text-white terminal-text mt-2 leading-none"
                          >
                            <span className="text-[#666]">visitor@shubranshu</span>
                            <span className="text-white">:~$</span>{" "}
                            <span>
                              ENTER SYSTEM
                              <span className="inline-block w-1.5 h-3 bg-white ml-0.5 align-middle cursor-blink" />
                            </span>
                          </motion.p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Screen glow */}
                  <div
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                      borderRadius: "14px 14px 4px 4px",
                      boxShadow: "inset 0 0 30px rgba(255,255,255,0.03)",
                    }}
                  />
                </div>
              </div>

              {/* === HINGE === */}
              <motion.div
                animate={{ opacity: phase === "zooming" || phase === "dissolve" ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                className="relative mx-auto z-10" style={{
                width: 160,
                height: 10,
                backgroundColor: "#080808",
                borderRadius: "0 0 4px 4px",
                border: "1px solid rgba(255,255,255,0.04)",
                borderTop: "none",
              }}>
                {/* Hinge cylinders */}
                <div className="absolute left-[20px] right-[20px] top-0 h-[6px] flex gap-[2px] justify-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-b-sm"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.02)",
                        borderTop: "none",
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* === KEYBOARD DECK === */}
              <motion.div
                animate={{
                  opacity: phase === "zooming" || phase === "dissolve" ? 0 : 1,
                  y: phase === "dissolve" ? 15 : 0,
                }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                className="relative z-10"
                style={{
                  width: 260,
                  height: 105,
                  backgroundColor: "#0a0a0a",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderTop: "none",
                  borderRadius: "0 0 14px 14px",
                  boxShadow: "0 6px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03)",
                }}
              >
                {/* Keyboard well */}
                <div
                  className="absolute top-3 left-3 right-3"
                  style={{
                    height: 52,
                    backgroundColor: "#060606",
                    borderRadius: 6,
                    border: "1px solid rgba(255,255,255,0.03)",
                  }}
                >
                  <div className="grid grid-cols-12 gap-[2px] p-[5px]">
                    {Array.from({ length: 48 }).map((_, i) => (
                      <div
                        key={i}
                        className="rounded-sm"
                        style={{
                          height: 8,
                          backgroundColor: "rgba(255,255,255,0.04)",
                          borderBottom: "1px solid rgba(255,255,255,0.02)",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Trackpad */}
                <div
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-sm"
                  style={{
                    width: 70,
                    height: 24,
                    backgroundColor: "rgba(255,255,255,0.015)",
                    border: "1px solid rgba(255,255,255,0.03)",
                    borderRadius: 4,
                  }}
                />

                {/* Palm rest gradient */}
                <div
                  className="absolute top-[58px] left-3 right-3 bottom-3 pointer-events-none"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 100%)",
                    borderRadius: 6,
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TAP TO ENTER */}
      <AnimatePresence>
        {phase === "tap" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 -translate-x-1/2 terminal-text text-[11px] text-white/60 tracking-[0.2em]"
            style={{ top: "calc(50% + 210px)" }}
          >
            TAP TO ENTER
          </motion.div>
        )}
      </AnimatePresence>

      {/* CLICK RING */}
      {phase === "tap" && (
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: 340,
            height: 360,
            border: "1px solid rgba(255,255,255,0.03)",
            borderRadius: 28,
          }}
        />
      )}

      {/* BLUR OVERLAY DURING ZOOM */}
      <AnimatePresence>
        {isZooming && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              backdropFilter: "blur(3px)",
              WebkitBackdropFilter: "blur(3px)",
            }}
          />
        )}
      </AnimatePresence>

      {/* LIGHT RAYS */}
      <AnimatePresence>
        {(isLaptopVisible || isZooming) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.025 }}
            exit={{ opacity: 0 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[35%] h-[75%] pointer-events-none"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%)",
              clipPath: "polygon(25% 0%, 75% 0%, 55% 100%, 45% 100%)",
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
