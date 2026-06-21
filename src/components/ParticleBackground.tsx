"use client";

import { useEffect, useRef } from "react";
import { useParticleEngine } from "./useParticleEngine";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { init, update } = useParticleEngine();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };

    resize();
    init(window.innerWidth, window.innerHeight);
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = update(w, h);
      const ox = w * 0.735;
      const oy = h * 0.78;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = p.x - ox;
        const dy = p.y - oy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = Math.max(w, h) * 0.5;
        const fade = Math.max(0, 1 - dist / maxDist);
        const alpha = fade * (1 - p.life / p.maxLife);

        if (alpha <= 0.01) continue;

        const sx = p.x * dpr;
        const sy = p.y * dpr;
        const r = p.size * dpr * 0.5;

        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [init, update]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
