import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

interface Props {
  cracked: boolean;
  hovered: boolean;
}

/** Hyper-stylized 3D nest with eggs. Center egg cracks open and emits warm light. */
export function NestScene({ cracked, hovered }: Props) {
  const group = useRef<THREE.Group>(null);
  const topShell = useRef<THREE.Mesh>(null);
  const innerLight = useRef<THREE.PointLight>(null);

  // Subtle breathing + gentle sway on hover
  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.position.y = Math.sin(t * 0.8) * 0.04;
    group.current.rotation.y += delta * (hovered ? 0.25 : 0.06);

    if (topShell.current) {
      const targetY = cracked ? 0.55 : 0;
      const targetTilt = cracked ? 0.9 : 0;
      topShell.current.position.y += (targetY - topShell.current.position.y) * 0.06;
      topShell.current.rotation.z += (targetTilt - topShell.current.rotation.z) * 0.06;
      topShell.current.position.x += ((cracked ? 0.35 : 0) - topShell.current.position.x) * 0.06;
    }
    if (innerLight.current) {
      const targetI = cracked ? 8 : 0;
      innerLight.current.intensity += (targetI - innerLight.current.intensity) * 0.08;
    }
  });

  // Procedural straw nest material
  const strawTex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 512; c.height = 512;
    const ctx = c.getContext("2d")!;
    const g = ctx.createLinearGradient(0, 0, 0, 512);
    g.addColorStop(0, "#c9a35a"); g.addColorStop(1, "#7a5a2a");
    ctx.fillStyle = g; ctx.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 1200; i++) {
      ctx.strokeStyle = `hsla(${30 + Math.random() * 20}, ${50 + Math.random() * 30}%, ${30 + Math.random() * 40}%, ${0.4 + Math.random() * 0.5})`;
      ctx.lineWidth = 0.6 + Math.random() * 1.2;
      const x = Math.random() * 512, y = Math.random() * 512;
      const a = Math.random() * Math.PI;
      ctx.beginPath(); ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(a) * (8 + Math.random() * 22), y + Math.sin(a) * (8 + Math.random() * 22));
      ctx.stroke();
    }
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  // Egg shell color w/ subtle speckles
  const eggTex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 256; c.height = 256;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(120, 100, 20, 128, 128, 180);
    g.addColorStop(0, "#f6d9b3"); g.addColorStop(1, "#c98a55");
    ctx.fillStyle = g; ctx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 220; i++) {
      ctx.fillStyle = `rgba(80,40,20,${0.15 + Math.random() * 0.35})`;
      ctx.beginPath();
      ctx.arc(Math.random() * 256, Math.random() * 256, Math.random() * 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  // Egg positions in nest
  const eggs = [
    { p: [-0.55, -0.05, 0.15] as [number, number, number], r: 0.35 },
    { p: [0.5, -0.05, 0.2] as [number, number, number], r: 0.35 },
    { p: [-0.1, -0.05, -0.5] as [number, number, number], r: 0.35 },
    { p: [0.15, -0.05, 0.55] as [number, number, number], r: 0.32 },
  ];

  return (
    <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.25}>
      <group ref={group} scale={1.6}>
        {/* Nest base — torus of straw */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.45, 0]} receiveShadow>
          <torusGeometry args={[0.95, 0.4, 32, 64]} />
          <meshStandardMaterial map={strawTex} roughness={0.95} />
        </mesh>
        {/* Inner straw bowl */}
        <mesh position={[0, -0.55, 0]} receiveShadow>
          <sphereGeometry args={[0.85, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
          <meshStandardMaterial map={strawTex} roughness={1} side={THREE.DoubleSide} />
        </mesh>

        {/* Surrounding eggs */}
        {eggs.map((e, i) => (
          <mesh key={i} position={e.p} scale={[e.r, e.r * 1.35, e.r]} castShadow>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial map={eggTex} roughness={0.45} metalness={0.05} />
          </mesh>
        ))}

        {/* Central HERO egg (split into bottom + animated top half) */}
        <group position={[0, 0.15, 0]}>
          {/* Bottom half — slightly larger */}
          <mesh scale={[0.42, 0.55, 0.42]} castShadow>
            <sphereGeometry args={[1, 48, 32, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
            <meshStandardMaterial map={eggTex} roughness={0.4} metalness={0.05} side={THREE.DoubleSide} />
          </mesh>
          {/* Top half — opens */}
          <mesh ref={topShell} scale={[0.42, 0.55, 0.42]} castShadow>
            <sphereGeometry args={[1, 48, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial map={eggTex} roughness={0.4} metalness={0.05} side={THREE.DoubleSide} />
          </mesh>
          {/* Warm inner light */}
          <pointLight ref={innerLight} position={[0, 0.05, 0]} color="#ffd27a" intensity={0} distance={3} decay={1.5} />
          {/* Glow sphere visible when cracked */}
          {cracked && (
            <mesh position={[0, 0.05, 0]}>
              <sphereGeometry args={[0.18, 24, 24]} />
              <meshBasicMaterial color="#ffe2a8" transparent opacity={0.85} />
            </mesh>
          )}
        </group>

        {/* Soft ground glow */}
        <mesh position={[0, -0.85, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.6, 2.2, 64]} />
          <meshBasicMaterial color="#f0c070" transparent opacity={0.18} />
        </mesh>
      </group>
    </Float>
  );
}
