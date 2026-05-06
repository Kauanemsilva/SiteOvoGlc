import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Floating feathers + dust motes drifting in the warm air. */
export function FeathersAndDust({ active }: { active: boolean }) {
  const dust = useRef<THREE.Points>(null);
  const feathers = useRef<THREE.Group>(null);
  const COUNT = 220;

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = Math.random() * 4 - 1;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      velocities[i * 3] = (Math.random() - 0.5) * 0.004;
      velocities[i * 3 + 1] = 0.002 + Math.random() * 0.005;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }
    return { positions, velocities };
  }, []);

  // 8 floating feathers, simple flat planes with rotation
  const featherData = useMemo(
    () =>
      Array.from({ length: 10 }, () => ({
        pos: [
          (Math.random() - 0.5) * 5,
          Math.random() * 3 - 1,
          (Math.random() - 0.5) * 3,
        ] as [number, number, number],
        speed: 0.3 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2,
        scale: 0.18 + Math.random() * 0.12,
      })),
    [],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // Dust
    if (dust.current) {
      const geo = dust.current.geometry as THREE.BufferGeometry;
      const arr = geo.attributes.position.array as Float32Array;
      for (let i = 0; i < COUNT; i++) {
        arr[i * 3] += velocities[i * 3] + Math.sin(t + i) * 0.0005;
        arr[i * 3 + 1] += velocities[i * 3 + 1] * (active ? 1.6 : 1);
        arr[i * 3 + 2] += velocities[i * 3 + 2];
        if (arr[i * 3 + 1] > 4) arr[i * 3 + 1] = -1.5;
        if (arr[i * 3] > 4) arr[i * 3] = -4;
        if (arr[i * 3] < -4) arr[i * 3] = 4;
      }
      geo.attributes.position.needsUpdate = true;
    }
    // Feathers slow drift
    if (feathers.current) {
      feathers.current.children.forEach((child, i) => {
        const f = featherData[i];
        child.position.y += Math.sin(t * f.speed + f.offset) * 0.003 + 0.0015;
        child.position.x += Math.cos(t * f.speed * 0.5 + f.offset) * 0.003;
        child.rotation.z = Math.sin(t * f.speed + f.offset) * 0.6;
        child.rotation.y += 0.005;
        if (child.position.y > 3.5) child.position.y = -1.5;
      });
    }
  });

  // Procedural feather texture
  const featherTex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 128; c.height = 256;
    const ctx = c.getContext("2d")!;
    ctx.clearRect(0, 0, 128, 256);
    // Shaft
    ctx.strokeStyle = "rgba(120,90,60,0.8)";
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(64, 10); ctx.lineTo(64, 246); ctx.stroke();
    // Barbs
    for (let y = 20; y < 240; y += 3) {
      const w = Math.sin((y / 240) * Math.PI) * 50;
      ctx.strokeStyle = `rgba(255,240,220,${0.25 + Math.random() * 0.4})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(64, y);
      ctx.lineTo(64 - w, y + 6);
      ctx.moveTo(64, y);
      ctx.lineTo(64 + w, y + 6);
      ctx.stroke();
    }
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  return (
    <group>
      <points ref={dust}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} count={COUNT} />
        </bufferGeometry>
        <pointsMaterial
          color="#ffd58a"
          size={0.045}
          transparent
          opacity={0.7}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <group ref={feathers}>
        {featherData.map((f, i) => (
          <mesh key={i} position={f.pos} scale={f.scale}>
            <planeGeometry args={[0.6, 1.4]} />
            <meshStandardMaterial
              map={featherTex}
              transparent
              alphaTest={0.05}
              side={THREE.DoubleSide}
              roughness={1}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
