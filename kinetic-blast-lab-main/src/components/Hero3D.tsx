import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense, useState } from "react";
import { NestScene } from "./NestScene";
import { FeathersAndDust } from "./FeathersAndDust";

export function Hero3D() {
  const [cracked, setCracked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleCrack = () => {
    setCracked(true);
    if ("vibrate" in navigator) navigator.vibrate?.([20, 30, 50]);
    // soft "crack" sound — short low click
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "triangle";
      o.frequency.setValueAtTime(180, ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.25);
      g.gain.setValueAtTime(0.001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      o.connect(g); g.connect(ctx.destination);
      o.start(); o.stop(ctx.currentTime + 0.45);
      setTimeout(() => ctx.close(), 600);
    } catch {}
    setTimeout(() => setCracked(false), 5000);
  };

  return (
    <div
      className="absolute inset-0"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={handleCrack}
    >
      <Canvas camera={{ position: [0, 1.2, cracked ? 4 : 5], fov: 38 }} dpr={[1, 2]} shadows>
        <Suspense fallback={null}>
          {/* Warm golden hour key light */}
          <ambientLight intensity={0.45} color="#fff1d6" />
          <directionalLight position={[6, 8, 4]} intensity={2.4} color="#ffcf85" castShadow />
          <pointLight position={[-4, 2, 3]} intensity={18} color="#ffb060" />
          <pointLight position={[3, 5, -2]} intensity={10} color="#fff0c0" />

          <NestScene cracked={cracked} hovered={hovered} />
          <FeathersAndDust active={cracked} />

          <Environment preset="sunset" />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 2.6}
            maxPolarAngle={Math.PI / 2.05}
            rotateSpeed={0.4}
          />
        </Suspense>
      </Canvas>

      {cracked && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-radial-glow animate-pulse" />
      )}
    </div>
  );
}
