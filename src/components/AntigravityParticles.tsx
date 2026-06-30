"use client";

import { useRef, useMemo, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ShaderMaterial,
  BufferGeometry,
  Float32BufferAttribute,
  Points,
  Vector2,
  AdditiveBlending,
  NormalBlending,
} from "three";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useTheme } from "@/lib/theme";

const vertexShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform float uMouseInfluence;
uniform float uSizeScale;

attribute float aSize;
attribute vec3 aOffset;
attribute float aNoiseSeed;

varying float vAlpha;

float hash21(vec3 p) {
  p = fract(p * 0.3183099 + 0.1);
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float noise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec3(1.0, 0.0, 0.0));
  float c = hash21(i + vec3(0.0, 1.0, 0.0));
  float d = hash21(i + vec3(1.0, 1.0, 0.0));
  float e = hash21(i + vec3(0.0, 0.0, 1.0));
  float g = hash21(i + vec3(1.0, 0.0, 1.0));
  float h = hash21(i + vec3(0.0, 1.0, 1.0));
  float k = hash21(i + vec3(1.0, 1.0, 1.0));
  float u1 = mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  float u2 = mix(mix(e, g, f.x), mix(h, k, f.x), f.y);
  return mix(u1, u2, f.z);
}

float fbm(vec3 p) {
  float n = noise(p);
  n += noise(p * 2.0 + 50.0) * 0.5;
  n += noise(p * 4.0 + 100.0) * 0.25;
  return n / 1.75;
}

void main() {
  vec3 pos = position;

  float noiseX = fbm(vec3(pos.x * 0.002 + aNoiseSeed, pos.y * 0.002, uTime * 0.15));
  float noiseY = fbm(vec3(pos.y * 0.002 + aNoiseSeed * 2.0, uTime * 0.12, pos.x * 0.002));
  float noiseZ = fbm(vec3(uTime * 0.1, pos.x * 0.002, pos.y * 0.002 + aNoiseSeed * 3.0));

  float noiseStrength = 20.0;
  pos.x += (noiseX - 0.5) * noiseStrength;
  pos.y += (noiseY - 0.5) * noiseStrength;
  pos.z += (noiseZ - 0.5) * noiseStrength * 0.3;

  vec2 delta = pos.xy - uMouse;
  float dist = length(delta);
  float influence = smoothstep(400.0, 0.0, dist) * uMouseInfluence;
  pos.xy += normalize(delta) * influence * 60.0;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  float distFromOrigin = length(pos - position);
  float size = (aSize + distFromOrigin * 0.15) * uSizeScale;
  gl_PointSize = size * (300.0 / -mvPosition.z);

  vAlpha = 0.6 + smoothstep(400.0, 0.0, dist) * 0.4 * uMouseInfluence;
  float edgeFade = 1.0 - smoothstep(0.0, 300.0, length(pos.xy));
  vAlpha *= (0.3 + edgeFade * 0.7);
  vAlpha *= 0.7 + noiseX * 0.3;

  gl_Position = projectionMatrix * mvPosition;
}
`;

const fragmentShader = `
uniform vec3 uColor;
varying float vAlpha;

void main() {
  vec2 center = gl_PointCoord - vec2(0.5);
  float dist = length(center);
  if (dist > 0.5) discard;

  float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
  alpha *= alpha;
  float glow = exp(-dist * 6.0);
  float finalAlpha = (alpha * 0.8 + glow * 0.4) * vAlpha;

  gl_FragColor = vec4(uColor, finalAlpha);
}
`;

// ---- Particle data generation ----

function createParticleData(count: number, width: number, height: number) {
  const aspect = width / height;
  const r = Math.max(width, height) * 0.55;

  const positions = new Float32Array(count * 3);
  const offsets = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const noiseSeeds = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.pow(Math.random(), 0.6) * r;
    const x = Math.cos(angle) * dist;
    const y = (Math.sin(angle) * dist) / aspect;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

    offsets[i * 3] = (Math.random() - 0.5) * 40;
    offsets[i * 3 + 1] = (Math.random() - 0.5) * 40;
    offsets[i * 3 + 2] = (Math.random() - 0.5) * 20;

    sizes[i] = 1.0 + Math.random() * 4.0;
    noiseSeeds[i] = Math.random() * 500;
  }

  return { positions, offsets, sizes, noiseSeeds };
}

// ---- R3F Particle Field ----

function ParticleField({
  mouse,
  mouseInfluence,
  dark,
}: {
  mouse: React.MutableRefObject<Vector2>;
  mouseInfluence: React.MutableRefObject<number>;
  dark: boolean;
}) {
  const meshRef = useRef<Points>(null);
  const { size } = useThree();
  const uniformsRef = useRef({
    uTime: { value: 0 },
    uMouse: { value: new Vector2(9999, 9999) },
    uMouseInfluence: { value: 0 },
    uColor: { value: dark ? [1, 1, 1] : [0.08, 0.08, 0.08] },
    uSizeScale: { value: dark ? 1 : 2.2 },
  });

  const count = size.width < 768 ? 4000 : size.width < 1280 ? 7000 : 10000;

  const dataRef = useRef(createParticleData(count, size.width, size.height));

  useEffect(() => {
    dataRef.current = createParticleData(count, size.width, size.height);
  }, [count, size.width, size.height]);

  const geometry = useMemo(() => {
    const data = dataRef.current;
    const geo = new BufferGeometry();
    geo.setAttribute("position", new Float32BufferAttribute(data.positions, 3));
    geo.setAttribute("aOffset", new Float32BufferAttribute(data.offsets, 3));
    geo.setAttribute("aSize", new Float32BufferAttribute(data.sizes, 1));
    geo.setAttribute("aNoiseSeed", new Float32BufferAttribute(data.noiseSeeds, 1));
    return geo;
  }, [count]);

  const material = useMemo(() => {
    uniformsRef.current.uColor.value = dark ? [1, 1, 1] : [0.08, 0.08, 0.08];
    uniformsRef.current.uSizeScale.value = dark ? 1 : 2.2;
    return new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: uniformsRef.current,
      transparent: true,
      depthWrite: false,
      blending: dark ? AdditiveBlending : NormalBlending,
    });
  }, [dark]);

  const targetMouse = useRef(new Vector2(9999, 9999));

  const onPointerMove = useCallback(
    (e: { clientX: number; clientY: number }) => {
      const w = size.width;
      const h = size.height;
      targetMouse.current.set(
        (e.clientX / w) * (w * 1.2) - w * 0.6,
        -(e.clientY / h) * (h * 1.2) + h * 0.6
      );
    },
    [size.width, size.height]
  );

  useEffect(() => {
    window.addEventListener("pointermove", onPointerMove);
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [onPointerMove]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const u = uniformsRef.current;
    u.uTime.value += dt;

    // Lerp mouse
    mouse.current.lerp(targetMouse.current, 0.08);
    u.uMouse.value.copy(mouse.current);

    const dist = mouse.current.length();
    const active = dist < 600;
    mouseInfluence.current += (active ? 1 : -1) * dt * 2;
    mouseInfluence.current = Math.max(0, Math.min(1, mouseInfluence.current));
    u.uMouseInfluence.value = mouseInfluence.current;
  });

  return <points ref={meshRef} geometry={geometry} material={material} />;
}

// ---- Main Export ----

export default function AntigravityParticles() {
  const mouse = useRef(new Vector2(9999, 9999));
  const mouseInfluence = useRef(0);
  const { theme } = useTheme();
  const dark = theme === "dark";

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas
        orthographic
        camera={{ near: -1000, far: 1000, position: [0, 0, 500] }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        style={{ position: "absolute", inset: 0 }}
        dpr={[1, 2]}
      >
        <ParticleField mouse={mouse} mouseInfluence={mouseInfluence} dark={dark} />
        {dark && (
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              intensity={0.4}
              mipmapBlur
            />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}
