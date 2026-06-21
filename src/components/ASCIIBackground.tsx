"use client";

import { useEffect, useRef } from "react";

const GRID_CHARS = "·･•○◦●◉◆◇▪▫";

export default function ASCIIBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      blinkOffset: number;
      baseSize: number;
    }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 80; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 2 + 0.5,
          blinkOffset: Math.random() * Math.PI * 2,
          baseSize: Math.random() * 2 + 0.5,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = Math.floor(canvas.width / 32);
      const rows = Math.floor(canvas.height / 32);

      ctx.font = "10px 'IBM Plex Mono', monospace";
      ctx.textAlign = "center";

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * 32 + 16;
          const y = r * 32 + 16;
          const dist = Math.sqrt(
            Math.pow(x - canvas.width / 2, 2) + Math.pow(y - canvas.height / 2, 2)
          );
          const maxDist = Math.sqrt(
            Math.pow(canvas.width / 2, 2) + Math.pow(canvas.height / 2, 2)
          );
          const opacity = Math.max(0, 0.08 - (dist / maxDist) * 0.06);

          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          const char = GRID_CHARS[Math.floor(Math.random() * GRID_CHARS.length)];
          ctx.fillText(char, x, y);
        }
      }

      particles.forEach((p) => {
        // Apply cursor repulsion effect
        const dx = p.x - mousePosRef.current.x;
        const dy = p.y - mousePosRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const repulsionRadius = 80;

        if (distance < repulsionRadius && distance > 0) {
          const repulsionStrength = (repulsionRadius - distance) / repulsionRadius;
          const angle = Math.atan2(dy, dx);

          // Apply repulsion force
          p.vx += (Math.cos(angle) * repulsionStrength * 0.05);
          p.vy += (Math.sin(angle) * repulsionStrength * 0.05);

          // Shrink particle based on cursor proximity
          const shrinkFactor = 1 - (repulsionStrength * 0.7); // Shrink up to 70%
          p.size = p.baseSize * shrinkFactor;
        } else {
          // Return to base size when cursor is far
          p.size = p.baseSize;
        }

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -0.9;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -0.9;

        // Add slight damping to prevent excessive acceleration
        p.vx *= 0.998;
        p.vy *= 0.998;

        // Blinking effect
        p.blinkOffset += 0.02;
        const blinkOpacity = 0.3 + Math.sin(p.blinkOffset) * 0.2; // Oscillates between 0.1 and 0.5

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${blinkOpacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    resize();
    initParticles();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.8 }}
    />
  );
}
