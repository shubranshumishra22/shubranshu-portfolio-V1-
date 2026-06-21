import { useRef, useCallback, useEffect } from "react";

const COLORS = ["#5B8DEF", "#8B1A1A", "#6B7280"];
const PARTICLE_COUNT = 75;
const MAX_LIFE = 350;

interface P {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

function spawn(w: number, h: number): P {
  const ox = w * 0.735;
  const oy = h * 0.78;
  const angle = (Math.random() - 0.5) * 0.9;
  const speed = 0.6 + Math.random() * 1.5;
  return {
    x: ox + (Math.random() - 0.5) * 30,
    y: oy + (Math.random() - 0.5) * 10,
    vx: Math.sin(angle) * speed * 0.5,
    vy: -speed * (0.5 + Math.random() * 0.5),
    size: 1.5 + Math.random() * 2,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    life: 0,
    maxLife: MAX_LIFE * (0.5 + Math.random() * 0.5),
  };
}

export function useParticleEngine() {
  const particlesRef = useRef<P[]>([]);
  const sizeRef = useRef({ w: 0, h: 0 });

  const init = useCallback((w: number, h: number) => {
    sizeRef.current = { w, h };
    const arr: P[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = spawn(w, h);
      p.life = Math.random() * p.maxLife * 0.5;
      arr.push(p);
    }
    particlesRef.current = arr;
  }, []);

  const update = useCallback((w: number, h: number) => {
    const particles = particlesRef.current;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.life++;
      if (p.life >= p.maxLife) {
        const np = spawn(w, h);
        p.x = np.x; p.y = np.y; p.vx = np.vx; p.vy = np.vy;
        p.size = np.size; p.color = np.color; p.life = 0; p.maxLife = np.maxLife;
        continue;
      }
      p.x += p.vx;
      p.y += p.vy;
      p.vx += (Math.random() - 0.5) * 0.03;
      p.vy -= 0.003;
    }
    return particles;
  }, []);

  return { particlesRef, init, update };
}
