"use client";

import { useState } from "react";
import { motion } from "framer-motion";

function VoxelBlock({
  x,
  y,
  z,
  size = 16,
  color = "#1a1a1a",
  className = "",
}: {
  x: number;
  y: number;
  z: number;
  size?: number;
  color?: string;
  className?: string;
}) {
  const px = (x - 4) * size;
  const py = (y - 4) * size;
  const pz = (z - 4) * size;

  return (
    <div
      className={`absolute ${className}`}
      style={{
        width: size,
        height: size,
        transform: `translate3d(${px}px, ${py}px, ${pz}px)`,
        backgroundColor: color,
        boxShadow: `inset 0 0 0 0.5px rgba(255,255,255,0.06)`,
      }}
    />
  );
}

export default function VoxelScene({ hovered }: { hovered: boolean }) {
  const [idleY] = useState(() => Math.random() * 2);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        className="relative"
        animate={{
          y: [0, -2, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: idleY,
        }}
      >
        {/* Isometric scene container */}
        <div
          className="relative"
          style={{
            width: 160,
            height: 160,
            transform: "rotateX(54deg) rotateZ(-45deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* ===== PLATFORM / GROUND ===== */}
          {/* 5x5 ground platform */}
          {[-2, -1, 0, 1, 2].map((gx) =>
            [-2, -1, 0, 1, 2].map((gz) => (
              <VoxelBlock
                key={`g${gx}${gz}`}
                x={gx + 4}
                y={4}
                z={gz + 4}
                size={16}
                color="#141414"
              />
            ))
          )}

          {/* ===== PLANT (left side, x=2, z=2) ===== */}
          {/* Grass base */}
          {[0, 1].map((ox) =>
            [0, 1].map((oz) => (
              <VoxelBlock
                key={`gb${ox}${oz}`}
                x={2 + ox}
                y={3}
                z={2 + oz}
                size={16}
                color="#1a2a1a"
              />
            ))
          )}

          {/* Soil block */}
          <VoxelBlock x={2} y={2} z={2} size={16} color="#1e1a14" />
          <VoxelBlock x={3} y={2} z={2} size={16} color="#1e1a14" />

          {/* Plant stem */}
          <VoxelBlock x={2} y={1} z={2} size={16} color="#1e2e1a" />
          <VoxelBlock x={2} y={0} z={2} size={16} color="#1e2e1a" />

          {/* Plant leaves - left */}
          <VoxelBlock x={1} y={1} z={2} size={16} color="#1e3a1e" />
          <VoxelBlock x={0} y={0} z={2} size={16} color="#1e3a1e" />

          {/* Plant leaves - right */}
          <VoxelBlock x={3} y={1} z={2} size={16} color="#1e3a1e" />
          <VoxelBlock x={4} y={0} z={2} size={16} color="#1e3a1e" />

          {/* Plant leaves - top */}
          <VoxelBlock x={2} y={-1} z={2} size={16} color="#1e3a1e" />

          {/* Plant leaf - forward */}
          <VoxelBlock x={2} y={0} z={1} size={16} color="#1e3a1e" />

          {/* Plant leaf - back */}
          <VoxelBlock x={2} y={0} z={3} size={16} color="#1e3a1e" />

          {/* Small accent leaf tips */}
          <VoxelBlock x={1} y={-1} z={3} size={16} color="#2a4a2a" />
          <VoxelBlock x={4} y={-1} z={2} size={16} color="#2a4a2a" />

          {/* ===== ROBOT (right side, x=6, z=6) ===== */}
          {/* Robot legs */}
          <VoxelBlock x={6} y={3} z={6} size={16} color="#1a1a22" />
          <VoxelBlock x={7} y={3} z={6} size={16} color="#1a1a22" />
          <VoxelBlock x={6} y={3} z={7} size={16} color="#1a1a22" />
          <VoxelBlock x={7} y={3} z={7} size={16} color="#1a1a22" />

          {/* Robot body */}
          {[0, 1, 2].map((by) =>
            [0, 1].map((bx) =>
              [0, 1].map((bz) => (
                <VoxelBlock
                  key={`rb${by}${bx}${bz}`}
                  x={6 + bx}
                  y={2 - by}
                  z={6 + bz}
                  size={16}
                  color="#1a1a2e"
                />
              ))
            )
          )}

          {/* Robot head */}
          {[0, 1].map((hx) =>
            [0, 1].map((hz) => (
              <VoxelBlock
                key={`rh${hx}${hz}`}
                x={6 + hx}
                y={-1}
                z={6 + hz}
                size={16}
                color="#1e1e35"
              />
            ))
          )}

          {/* Robot camera eye (facing plant - forward on z) */}
          <motion.div
            animate={
              hovered
                ? { scale: [1, 1.15, 1] }
                : { scale: 1 }
            }
            transition={{ duration: 0.3 }}
          >
            <VoxelBlock x={6} y={-1} z={5} size={16} color="#2a2a4a" />
            <VoxelBlock x={7} y={-1} z={5} size={16} color="#2a2a4a" />
          </motion.div>

          {/* Camera lens glow */}
          <motion.div
            animate={
              hovered
                ? { opacity: [0.4, 0.9, 0.4] }
                : { opacity: 0.3 }
            }
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            <VoxelBlock x={6} y={0} z={5} size={16} color="#3a5a5a" />
            <VoxelBlock x={7} y={0} z={5} size={16} color="#3a5a5a" />
          </motion.div>

          {/* Robot arms */}
          <VoxelBlock x={5} y={1} z={6} size={16} color="#1a1a2e" />
          <VoxelBlock x={5} y={1} z={7} size={16} color="#1a1a2e" />
          <VoxelBlock x={8} y={1} z={6} size={16} color="#1a1a2e" />
          <VoxelBlock x={8} y={1} z={7} size={16} color="#1a1a2e" />

          {/* Arm extensions toward plant */}
          <VoxelBlock x={5} y={0} z={5} size={16} color="#1a1a2e" />
          <VoxelBlock x={5} y={0} z={4} size={16} color="#1a1a2e" />

          {/* ===== SCANNING LINE ===== */}
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute"
              style={{
                width: 80,
                height: 1,
                backgroundColor: "rgba(100, 180, 120, 0.3)",
                left: 0,
                top: 8,
                transform: "rotateZ(35deg)",
                transformOrigin: "left center",
              }}
            />
          )}

          {/* Scanning line beam */}
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
              className="absolute"
              style={{
                width: 60,
                height: 60,
                left: 30,
                top: 0,
                background:
                  "radial-gradient(ellipse, rgba(100,180,120,0.08) 0%, transparent 70%)",
              }}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}
