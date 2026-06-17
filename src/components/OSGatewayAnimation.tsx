"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";

type Phase =
  | "terminal"
  | "authenticating"
  | "beam"
  | "expanding"
  | "panels"
  | "opening"
  | "complete";

const LOADING_ITEMS = [
  "Loading Projects",
  "Loading Research",
  "Loading Skills",
  "Loading Experience",
  "Loading Contact",
];

const easeVault: [number, number, number, number] = [0.76, 0, 0.24, 1];

export default function OSGatewayAnimation({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("terminal");
  const [showCursor, setShowCursor] = useState(true);
  const [typedCommand, setTypedCommand] = useState("");
  const [loadingLog, setLoadingLog] = useState<string[]>([]);
  const [showAccess, setShowAccess] = useState(false);
  const [showBeamGlow, setShowBeamGlow] = useState(false);
  const [doorProgress, setDoorProgress] = useState(0);
  const [heroAnimated, setHeroAnimated] = useState(false);

  const particles = useMemo(() =>
    Array.from({ length: 20 }).map((_, i) => ({
      left: 30 + ((i * 17) % 40),
      top: 10 + ((i * 31) % 80),
      delay: ((i * 7) % 30) / 10,
      duration: 3 + ((i * 11) % 4),
      yOffset: -30 - ((i * 13) % 40),
    })),
  []);

  useEffect(() => {
    const ci = setInterval(() => {
      setShowCursor((c) => !c);
    }, 530);
    return () => clearInterval(ci);
  }, []);

  const handleEnter = useCallback(() => {
    setPhase("authenticating");
    let i = 0;
    const cmd = "enter";
    const t1 = setInterval(() => {
      i++;
      setTypedCommand(cmd.slice(0, i));
      if (i >= cmd.length) {
        clearInterval(t1);
        let idx = 0;
        const t2 = setInterval(() => {
          setLoadingLog((prev) => {
            if (idx < LOADING_ITEMS.length) {
              return [...prev, `✓ ${LOADING_ITEMS[idx]}`];
            }
            return prev;
          });
          idx++;
          if (idx > LOADING_ITEMS.length) {
            clearInterval(t2);
            setShowAccess(true);
            setTimeout(() => {
              setPhase("beam");
            }, 1200);
          }
        }, 350);
      }
    }, 120);
  }, []);

  useEffect(() => {
    if (phase === "beam") {
      const t = setTimeout(() => {
        setShowBeamGlow(true);
        setTimeout(() => setPhase("expanding"), 600);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "expanding") {
      const t = setTimeout(() => setPhase("panels"), 800);
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "panels") {
      const t = setTimeout(() => setPhase("opening"), 500);
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "opening") {
      const start = performance.now();
      const duration = 1800;
      let frameId: number;
      const animate = (now: number) => {
        const elapsed = now - start;
        const p = Math.min(elapsed / duration, 1);
        const eased = cubicBezier(p, 0.76, 0, 0.24, 1);
        setDoorProgress(eased);
        if (p < 1) {
          frameId = requestAnimationFrame(animate);
        } else {
          setTimeout(() => {
            setHeroAnimated(true);
            setTimeout(() => {
              setPhase("complete");
              setTimeout(onComplete, 600);
            }, 1200);
          }, 200);
        }
      };
      frameId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(frameId);
    }
  }, [phase, onComplete]);

  return (
    <div className="fixed inset-0 z-[200] bg-[#050505] overflow-hidden" style={{ perspective: "1200px" }}>
          <motion.div
            className="w-full h-full"
            animate={
              phase === "opening"
                ? { scale: 1 }
                : { scale: 0.96 }
            }
            transition={{ duration: 1.8, ease: easeVault }}
          >
            {/* Hero content hidden behind doors */}
            <div
              className="absolute inset-0 flex items-center px-6 md:px-12 lg:px-24"
              style={{ opacity: heroAnimated ? 1 : 0 }}
            >
              <div className="w-full max-w-[1440px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                  <div className="space-y-4">
                    <p className="text-[#666] terminal-text text-xs sm:text-sm tracking-widest uppercase">
                      Shubranshu.OS — v1.0
                    </p>
                    <div className="space-y-0 -ml-1">
                      {["HELLO, I'M", "BUILDING", "SOFTWARE", "THAT SOLVES", "REAL PROBLEMS"].map(
                        (word, i) => (
                          <motion.div
                            key={word}
                            initial={{ opacity: 0, y: 40 }}
                            animate={
                              heroAnimated
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 40 }
                            }
                            transition={{
                              duration: 0.6,
                              delay: 0.1 + i * 0.1,
                              ease: [0.25, 0.1, 0, 1],
                            }}
                          >
                            <h1 className="text-[clamp(2.5rem,8vw,6.5rem)] font-bold leading-[0.9] tracking-[-0.03em] text-white">
                              {word}
                            </h1>
                          </motion.div>
                        )
                      )}
                    </div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={heroAnimated ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                      className="text-[#A1A1A1] text-sm sm:text-base max-w-md leading-relaxed pt-4"
                    >
                      Building software, intelligent systems, and products that
                      solve real problems.
                    </motion.p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floor reflection */}
            {(phase === "beam" ||
              phase === "expanding" ||
              phase === "panels" ||
              phase === "opening") && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.08 }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40%] h-32 bg-gradient-to-t from-white to-transparent blur-3xl pointer-events-none"
              />
            )}

            {/* STEP 1: Terminal */}
            {phase === "terminal" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full max-w-lg px-8">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-xs text-[#555] terminal-text mb-6"
                  >
                    Last login: {new Date().toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </motion.p>

                  <div className="terminal-text text-sm">
                    <span className="text-[#666]">visitor@shubranshu</span>
                    <span className="text-white">:~$</span>{" "}
                    <span className="text-white">enter</span>
                    <span
                      className={`inline-block w-2 h-[14px] bg-white ml-0.5 align-middle ${
                        showCursor ? "opacity-100" : "opacity-0"
                      }`}
                      style={{ transition: "opacity 0.1s" }}
                    />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="mt-8"
                  >
                    <button
                      onClick={handleEnter}
                      className="px-8 py-3 rounded-xl border border-[#222] bg-[#0D0D0D] text-white text-sm terminal-text hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                    >
                      Enter System —
                    </button>
                  </motion.div>
                </div>
              </div>
            )}

            {/* STEP 1b: Authenticating */}
            {phase === "authenticating" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full max-w-lg px-8">
                  <div className="terminal-text text-sm space-y-3">
                    <p>
                      <span className="text-[#666]">visitor@shubranshu</span>
                      <span className="text-white">:~$</span>{" "}
                      <span className="text-white">{typedCommand}</span>
                    </p>
                    <p className="text-[#888] text-xs">
                      Initializing Shubranshu.OS...
                    </p>
                    {loadingLog.map((log, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-white text-xs"
                      >
                        {log}
                      </motion.p>
                    ))}
                    {showAccess && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="pt-4 space-y-2"
                      >
                        <p className="text-xs text-[#666]">
                          Verifying Identity...
                        </p>
                        <p className="text-sm text-white font-semibold tracking-wider">
                          Access Granted
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2-3: White beam */}
            {(phase === "beam" ||
              phase === "expanding" ||
              phase === "panels" ||
              phase === "opening") && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  initial={{ width: 2, opacity: 0 }}
                  animate={{
                    width:
                      phase === "beam"
                        ? 2
                        : phase === "expanding"
                        ? 12
                        : 24,
                    opacity: 1,
                  }}
                  transition={
                    phase === "expanding"
                      ? { duration: 0.8, ease: "easeInOut" }
                      : { duration: 0.4 }
                  }
                  className="h-full bg-white relative"
                  style={{
                    boxShadow:
                      showBeamGlow || phase !== "beam"
                        ? "0 0 40px rgba(255,255,255,0.2), 0 0 80px rgba(255,255,255,0.08)"
                        : "none",
                  }}
                />
              </div>
            )}

            {/* STEP 4-5: Vault door panels */}
            {(phase === "panels" || phase === "opening") && (
              <>
                <motion.div
                  className="absolute top-0 left-0 h-full z-10 overflow-hidden"
                  style={{ width: "50vw" }}
                  animate={
                    phase === "opening"
                      ? { x: `${-100 * doorProgress}%` }
                      : { x: "0%" }
                  }
                  transition={{ duration: 0 }}
                >
                  <div className="absolute inset-0 bg-[#050505]" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#070707] to-[#050505]" />
                  <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#222] to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.015] via-transparent to-white/[0.02]" />
                  <div className="absolute inset-y-[10%] right-[10%] w-px bg-gradient-to-b from-transparent via-white/[0.03] to-transparent" />
                </motion.div>

                <motion.div
                  className="absolute top-0 right-0 h-full z-10 overflow-hidden"
                  style={{ width: "50vw" }}
                  animate={
                    phase === "opening"
                      ? { x: `${100 * doorProgress}%` }
                      : { x: "0%" }
                  }
                  transition={{ duration: 0 }}
                >
                  <div className="absolute inset-0 bg-[#050505]" />
                  <div className="absolute inset-0 bg-gradient-to-l from-[#0a0a0a] via-[#070707] to-[#050505]" />
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#222] to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.015] via-transparent to-white/[0.02]" />
                  <div className="absolute inset-y-[10%] left-[10%] w-px bg-gradient-to-b from-transparent via-white/[0.03] to-transparent" />
                </motion.div>
              </>
            )}

            {/* Dust particles */}
            {(phase === "expanding" ||
              phase === "panels" ||
              phase === "opening") && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {particles.map((p, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-[1px] h-[1px] bg-white rounded-full"
                    style={{
                      left: `${p.left}%`,
                      top: `${p.top}%`,
                    }}
                    animate={{
                      opacity: [0, 0.6, 0],
                      scale: [0, 1.5, 0],
                      y: [0, p.yOffset],
                    }}
                    transition={{
                      duration: p.duration,
                      repeat: Infinity,
                      delay: p.delay,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>
  );
}

function cubicBezier(
  t: number,
  p1x: number,
  p1y: number,
  p2x: number,
  p2y: number
): number {
  const cx = 3 * p1x;
  const bx = 3 * (p2x - p1x) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * p1y;
  const by = 3 * (p2y - p1y) - cy;
  const ay = 1 - cy - by;

  let x = t;
  for (let i = 0; i < 5; i++) {
    const f = ((ax * x + bx) * x + cx) * x;
    const df = (3 * ax * x + 2 * bx) * x + cx;
    if (Math.abs(df) < 1e-6) break;
    x -= (f - t) / df;
  }

  return ((ay * x + by) * x + cy) * x;
}
