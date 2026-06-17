"use client";

import { useState } from "react";
import { motion } from "framer-motion";

function CornerBracket({ className }: { className: string }) {
  return (
    <div className={`absolute w-5 h-5 ${className}`}>
      <div className="absolute top-0 left-0 w-4 h-px bg-white/20" />
      <div className="absolute top-0 left-0 w-px h-4 bg-white/20" />
    </div>
  );
}

export default function ResearchScene({ hovered }: { hovered: boolean }) {
  const [scanTrigger, setScanTrigger] = useState(false);

  useState(() => {
    const interval = setInterval(() => {
      setScanTrigger(true);
      setTimeout(() => setScanTrigger(false), 1200);
    }, 8000);
    return () => clearInterval(interval);
  });

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* HUD PANEL — Top Right */}
      <div className="absolute top-5 right-5 z-20 space-y-1 text-right">
        <p className="text-[9px] terminal-text text-white/30">
          research.lab/plant_health
        </p>
        <motion.p
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="text-[9px] terminal-text text-green-500/50"
        >
          status: monitoring
        </motion.p>
        <p className="text-[9px] terminal-text text-white/30">
          accuracy: <span className="text-green-500/60">99.37%</span>
        </p>
        <p className="text-[9px] terminal-text text-white/20">
          cnn_model: <span className="text-green-500/40">active</span>
        </p>
        <p className="text-[9px] terminal-text text-white/20">
          iot_stream: <span className="text-green-500/40">online</span>
        </p>
      </div>

      {/* BOTTOM STATUS */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-1.5 h-1.5 rounded-full bg-green-500/60"
        />
        <span className="text-[9px] terminal-text text-white/30">
          system.active — v1.0
        </span>
      </div>

      {/* ISOMETRIC SCENE */}
      <div
        className="relative"
        style={{
          width: 320,
          height: 320,
          transform: "rotateX(54deg) rotateZ(-43deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* PLATFORM */}
        <div
          className="absolute"
          style={{
            width: 320,
            height: 320,
            left: 0,
            top: 0,
            backgroundColor: "#0f0f0f",
            borderRadius: 6,
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
          }}
        >
          {/* Grid lines */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`h${i}`}
              className="absolute left-0 right-0 h-px"
              style={{
                top: `${i * 40 + 20}px`,
                backgroundColor: "rgba(255,255,255,0.02)",
              }}
            />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`v${i}`}
              className="absolute top-0 bottom-0 w-px"
              style={{
                left: `${i * 40 + 20}px`,
                backgroundColor: "rgba(255,255,255,0.02)",
              }}
            />
          ))}
        </div>

        {/* Platform reflection underneath */}
        <div
          className="absolute"
          style={{
            width: 320,
            height: 320,
            left: 0,
            top: 4,
            backgroundColor: "rgba(255,255,255,0.015)",
            borderRadius: 6,
            filter: "blur(4px)",
          }}
        />

        {/* === PLANT MODULE === */}
        {/* Position: slightly left of center */}
        <div
          className="absolute"
          style={{
            left: 80,
            top: 170,
            width: 80,
            height: 80,
          }}
        >
          {/* Soil block - back face */}
          <div
            className="absolute"
            style={{
              width: 80,
              height: 80,
              backgroundColor: "#1a1612",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
            }}
          />
          {/* Grass top layer */}
          <motion.div
            animate={{
              backgroundColor: ["#1a2a1a", "#1e2e1e", "#1a2a1a"],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute"
            style={{
              width: 80,
              height: 12,
              top: -6,
              left: 0,
              backgroundColor: "#1a2a1a",
              boxShadow: "0 -1px 4px rgba(60,120,60,0.08)",
            }}
          />
          {/* Soil texture lines */}
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="absolute left-2 right-2 h-px"
              style={{
                top: `${i * 12 + 8}px`,
                backgroundColor: "rgba(255,255,255,0.02)",
              }}
            />
          ))}
        </div>

        {/* === PLANT === */}
        <motion.div
          className="absolute"
          style={{
            left: 112,
            top: 50,
          }}
          animate={{
            rotateZ: [-0.5, 0.5, -0.5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Main stem */}
          <div
            className="absolute"
            style={{
              width: 8,
              height: 120,
              left: 24,
              top: 0,
              backgroundColor: "#1e2e1a",
              boxShadow: "inset -1px 0 0 rgba(255,255,255,0.04)",
            }}
          />
          {/* Stem detail line */}
          <div
            className="absolute"
            style={{
              width: 2,
              height: 120,
              left: 28,
              top: 0,
              backgroundColor: "rgba(60,120,60,0.06)",
            }}
          />

          {/* Leaves - Left side */}
          {/* Bottom left leaf */}
          <motion.div
            animate={{ rotateZ: [-2, 2, -2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute"
            style={{
              width: 4,
              height: 16,
              left: 4,
              top: 72,
              backgroundColor: "#1e3a1e",
              borderRadius: "0 0 2px 2px",
              transform: "rotate(-25deg)",
              transformOrigin: "bottom center",
              boxShadow: "inset 0 0 0 1px rgba(80,160,80,0.06)",
            }}
          />
          {/* Top left leaf */}
          <motion.div
            animate={{ rotateZ: [-2, 2, -2] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            className="absolute"
            style={{
              width: 4,
              height: 20,
              left: 2,
              top: 40,
              backgroundColor: "#1e3a1e",
              borderRadius: "0 0 2px 2px",
              transform: "rotate(-30deg)",
              transformOrigin: "bottom center",
              boxShadow: "inset 0 0 0 1px rgba(80,160,80,0.06)",
            }}
          />

          {/* Leaves - Right side */}
          {/* Bottom right leaf */}
          <motion.div
            animate={{ rotateZ: [2, -2, 2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            className="absolute"
            style={{
              width: 4,
              height: 16,
              left: 48,
              top: 72,
              backgroundColor: "#1e3a1e",
              borderRadius: "0 0 2px 2px",
              transform: "rotate(25deg)",
              transformOrigin: "bottom center",
              boxShadow: "inset 0 0 0 1px rgba(80,160,80,0.06)",
            }}
          />
          {/* Top right leaf */}
          <motion.div
            animate={{ rotateZ: [2, -2, 2] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            className="absolute"
            style={{
              width: 4,
              height: 20,
              left: 50,
              top: 40,
              backgroundColor: "#1e3a1e",
              borderRadius: "0 0 2px 2px",
              transform: "rotate(30deg)",
              transformOrigin: "bottom center",
              boxShadow: "inset 0 0 0 1px rgba(80,160,80,0.06)",
            }}
          />

          {/* Small top bud */}
          <div
            className="absolute"
            style={{
              width: 6,
              height: 6,
              left: 25,
              top: -4,
              backgroundColor: "#1e3a1e",
              borderRadius: "50%",
              boxShadow: "0 0 6px rgba(60,120,60,0.1)",
            }}
          />
        </motion.div>

        {/* === COMPUTER VISION TARGET CORNER BRACKETS === */}
        <div className="absolute" style={{ left: 66, top: 36, width: 100, height: 150 }}>
          <motion.div
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <CornerBracket className="top-0 left-0" />
            <CornerBracket className="top-0 right-0 rotate-90" />
            <CornerBracket className="bottom-0 left-0 -rotate-90" />
            <CornerBracket className="bottom-0 right-0 rotate-180" />
          </motion.div>
        </div>

        {/* === ROBOT === */}
        {/* Position: right side of plant, 40px gap */}
        <motion.div
          className="absolute"
          style={{
            left: 200,
            top: 100,
          }}
          animate={{
            y: [0, -1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Robot group rotated slightly toward plant */}
          <motion.div
            animate={{
              rotateZ: hovered ? -2 : 0,
            }}
            transition={{ duration: 0.5 }}
            style={{ transformOrigin: "bottom center" }}
          >
            {/* LEGS */}
            <div
              className="absolute"
              style={{
                width: 16,
                height: 20,
                left: 8,
                top: 80,
                backgroundColor: "#14141e",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
              }}
            />
            <div
              className="absolute"
              style={{
                width: 16,
                height: 20,
                left: 36,
                top: 80,
                backgroundColor: "#14141e",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
              }}
            />
            {/* Feet */}
            <div
              className="absolute"
              style={{
                width: 22,
                height: 6,
                left: 5,
                top: 98,
                backgroundColor: "#12121a",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
              }}
            />
            <div
              className="absolute"
              style={{
                width: 22,
                height: 6,
                left: 33,
                top: 98,
                backgroundColor: "#12121a",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
              }}
            />

            {/* BODY */}
            <div
              className="absolute"
              style={{
                width: 60,
                height: 50,
                left: 0,
                top: 30,
                backgroundColor: "#161625",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
              }}
            />
            {/* Body panel line */}
            <div
              className="absolute"
              style={{
                width: 40,
                height: 1,
                left: 10,
                top: 55,
                backgroundColor: "rgba(255,255,255,0.04)",
              }}
            />
            <div
              className="absolute"
              style={{
                width: 40,
                height: 1,
                left: 10,
                top: 60,
                backgroundColor: "rgba(255,255,255,0.03)",
              }}
            />

            {/* HEAD */}
            <motion.div
              className="absolute"
              style={{
                width: 70,
                height: 50,
                left: -5,
                top: -15,
                backgroundColor: "#181830",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
              }}
              animate={{
                rotateZ: hovered ? -3 : 0,
                top: hovered ? -12 : -15,
              }}
              transition={{ duration: 0.4 }}
            >
              {/* Head detail - top ridge */}
              <div
                className="absolute"
                style={{
                  width: 50,
                  height: 3,
                  left: 10,
                  top: 5,
                  backgroundColor: "rgba(255,255,255,0.04)",
                }}
              />
              {/* Face screen */}
              <div
                className="absolute"
                style={{
                  width: 40,
                  height: 24,
                  left: 15,
                  top: 16,
                  backgroundColor: "#0a0a15",
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
                }}
              />
              {/* Eyes */}
              <motion.div
                className="absolute"
                style={{
                  width: 6,
                  height: 6,
                  left: 22,
                  top: 22,
                  backgroundColor: "rgba(60,180,100,0.25)",
                  borderRadius: "50%",
                  boxShadow: "0 0 4px rgba(60,180,100,0.15)",
                }}
                animate={{
                  opacity: [0.15, 0.35, 0.15],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute"
                style={{
                  width: 6,
                  height: 6,
                  left: 34,
                  top: 22,
                  backgroundColor: "rgba(60,180,100,0.25)",
                  borderRadius: "50%",
                  boxShadow: "0 0 4px rgba(60,180,100,0.15)",
                }}
                animate={{
                  opacity: [0.15, 0.35, 0.15],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3,
                }}
              />
            </motion.div>

            {/* LEFT ARM (extended toward plant) */}
            <motion.div
              animate={{
                rotateZ: hovered ? -8 : -5,
              }}
              transition={{ duration: 0.5 }}
              style={{ transformOrigin: "right center" }}
            >
              {/* Upper arm */}
              <div
                className="absolute"
                style={{
                  width: 28,
                  height: 8,
                  left: -28,
                  top: 38,
                  backgroundColor: "#14142a",
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
                }}
              />
              {/* Lower arm */}
              <div
                className="absolute"
                style={{
                  width: 18,
                  height: 6,
                  left: -46,
                  top: 42,
                  backgroundColor: "#12122a",
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
                }}
              />
              {/* Gripper */}
              <div
                className="absolute"
                style={{
                  width: 4,
                  height: 8,
                  left: -50,
                  top: 40,
                  backgroundColor: "#10102a",
                }}
              />
              <div
                className="absolute"
                style={{
                  width: 4,
                  height: 8,
                  left: -50,
                  top: 44,
                  backgroundColor: "#10102a",
                }}
              />
            </motion.div>

            {/* RIGHT ARM */}
            <div
              className="absolute"
              style={{
                width: 22,
                height: 7,
                left: 60,
                top: 40,
                backgroundColor: "#14142a",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
              }}
            />
            <div
              className="absolute"
              style={{
                width: 22,
                height: 5,
                left: 78,
                top: 43,
                backgroundColor: "#12122a",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
              }}
            />

            {/* NECK joint */}
            <div
              className="absolute"
              style={{
                width: 14,
                height: 6,
                left: 23,
                top: 28,
                backgroundColor: "#12121e",
              }}
            />
          </motion.div>
        </motion.div>

        {/* === SCANNING BEAM === */}
        {hovered && scanTrigger && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: 140,
              opacity: [0, 0.12, 0.08, 0],
            }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute"
            style={{
              height: 1,
              left: 196,
              top: 95,
              background:
                "linear-gradient(90deg, rgba(60,180,100,0.15), rgba(60,180,100,0.08), transparent)",
              transformOrigin: "left center",
            }}
          />
        )}

        {/* Ambient light glow under robot */}
        <div
          className="absolute"
          style={{
            width: 80,
            height: 20,
            left: 190,
            top: 110,
            background:
              "radial-gradient(ellipse, rgba(60,180,100,0.03) 0%, transparent 70%)",
            filter: "blur(4px)",
          }}
        />
      </div>
    </div>
  );
}
