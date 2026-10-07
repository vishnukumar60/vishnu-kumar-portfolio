import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";

/**
 * Lightweight CSS-3D "glass shard" cluster for the hero. Tilts toward the cursor
 * using pure transforms (no WebGL, no models) and idles with a slow float.
 */
export function GlassShard({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 90, damping: 18, mass: 0.6 });
  const rotateY = useTransform(sx, [-1, 1], [-18, 18]);
  const rotateX = useTransform(sy, [-1, 1], [14, -14]);

  useEffect(() => {
    if (reduce || typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduce]);

  return (
    <div ref={ref} className={className} style={{ perspective: 900 }} aria-hidden>
      <motion.div
        style={{
          rotateX: enabled ? rotateX : 0,
          rotateY: enabled ? rotateY : 0,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        animate={reduce ? { y: 0 } : { y: [0, -14, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="relative size-full"
      >
        <div
          className="absolute left-[10%] top-[12%] size-32 rounded-[2rem] glass-panel sm:size-40"
          style={{ transform: "translateZ(70px) rotate(-14deg)" }}
        />
        <div
          className="absolute right-[8%] top-[38%] size-20 rounded-2xl glass-panel sm:size-24"
          style={{ transform: "translateZ(130px) rotate(18deg)" }}
        />
        <div
          className="absolute bottom-[10%] left-[28%] size-24 rounded-[1.75rem] glass-panel sm:size-28"
          style={{ transform: "translateZ(30px) rotate(8deg)" }}
        />
      </motion.div>
    </div>
  );
}
