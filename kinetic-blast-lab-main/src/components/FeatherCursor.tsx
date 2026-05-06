import { useEffect, useRef, useState } from "react";

/** Soft custom cursor: a feather-like teardrop with inertia. */
export function FeatherCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -50, y: -50 });
  const pos = useRef({ x: -50, y: -50 });
  const trailPos = useRef({ x: -50, y: -50 });
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    // Disable on touch
    if (window.matchMedia("(pointer: coarse)").matches) {
      setEnabled(false);
      document.body.style.cursor = "auto";
      return;
    }

    const move = (e: PointerEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };
    window.addEventListener("pointermove", move);

    let raf = 0;
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.25;
      pos.current.y += (target.current.y - pos.current.y) * 0.25;
      trailPos.current.x += (target.current.x - trailPos.current.x) * 0.08;
      trailPos.current.y += (target.current.y - trailPos.current.y) * 0.08;

      const angle = Math.atan2(target.current.y - trailPos.current.y, target.current.x - trailPos.current.x);
      if (ref.current) {
        ref.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) rotate(${angle + Math.PI / 2}rad)`;
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${trailPos.current.x}px, ${trailPos.current.y}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={trailRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9998] -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(38 90% 65% / 0.25), transparent 70%)",
        }}
      />
      <div
        ref={ref}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
      >
        <svg width="22" height="34" viewBox="0 0 22 34" fill="none">
          <path
            d="M11 1 C 17 8, 20 18, 11 33 C 2 18, 5 8, 11 1 Z"
            fill="hsl(36 50% 92%)"
            stroke="hsl(28 40% 30%)"
            strokeWidth="1"
            opacity="0.95"
          />
          <path d="M11 5 L 11 30" stroke="hsl(28 40% 30%)" strokeWidth="0.8" />
        </svg>
      </div>
    </>
  );
}
