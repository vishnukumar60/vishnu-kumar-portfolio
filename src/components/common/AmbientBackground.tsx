import { useReducedMotion } from "motion/react";

/**
 * Cinematic base layer.
 * Dark: near-black gradient wash + slow-drifting blurred glow blobs (unchanged).
 * Light: neo-brutalist canvas — clean white, grid rule lines and hard-edged
 * geometric accent shapes with black outlines.
 * Purely decorative, GPU-only animation, disabled under prefers-reduced-motion.
 */
export function AmbientBackground() {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-50 overflow-hidden">
      {/* Base gradient */}
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, oklch(0.2 0.04 285) 0%, oklch(0.145 0.026 285) 45%, oklch(0.115 0.02 288) 100%)",
        }}
      />
      <div
        className="absolute inset-0 dark:hidden"
        style={{ background: "var(--brutal-canvas)" }}
      />

      {/* Light: grid rules */}
      <div
        className="absolute inset-0 dark:hidden opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--brutal-grid) 1px, transparent 1px), linear-gradient(to bottom, var(--brutal-grid) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(120% 100% at 50% 0%, #000 25%, transparent 85%)",
        }}
      />

      {/* Light: hard geometric accent shapes */}
      <div
        className={`absolute -left-[6vw] top-[8vh] size-[16vw] min-w-[120px] min-h-[120px] rounded-full dark:hidden ${reduce ? "" : "animate-drift-a"}`}
        style={{
          background: "var(--brutal-yellow)",
          border: "4px solid var(--brutal-ink)",
          willChange: "transform",
        }}
      />
      <div
        className={`absolute right-[-4vw] top-[38vh] size-[13vw] min-w-[110px] min-h-[110px] rotate-12 rounded-3xl dark:hidden ${reduce ? "" : "animate-drift-b"}`}
        style={{
          background: "var(--brutal-blue)",
          border: "4px solid var(--brutal-ink)",
          willChange: "transform",
        }}
      />
      <div
        className={`absolute left-[16vw] bottom-[-6vh] size-[15vw] min-w-[120px] min-h-[120px] -rotate-6 rounded-[2.5rem] dark:hidden ${reduce ? "" : "animate-drift-c"}`}
        style={{
          background: "var(--brutal-orange)",
          border: "4px solid var(--brutal-ink)",
          willChange: "transform",
        }}
      />

      {/* Dark: glow blobs */}
      <div
        className={`absolute -left-[15vw] top-[-10vh] size-[55vw] rounded-full opacity-[0.32] blur-[110px] hidden dark:block ${reduce ? "" : "animate-drift-a"}`}
        style={{ background: "oklch(0.6 0.2 285)", willChange: "transform" }}
      />
      <div
        className={`absolute right-[-12vw] top-[25vh] size-[48vw] rounded-full opacity-[0.26] blur-[120px] hidden dark:block ${reduce ? "" : "animate-drift-b"}`}
        style={{ background: "oklch(0.62 0.18 245)", willChange: "transform" }}
      />
      <div
        className={`absolute left-[20vw] bottom-[-15vh] size-[50vw] rounded-full opacity-[0.2] blur-[130px] hidden dark:block ${reduce ? "" : "animate-drift-c"}`}
        style={{ background: "oklch(0.68 0.13 190)", willChange: "transform" }}
      />

      {/* Dark: grain + vignette keep the glass reading as glass */}
      <div
        className="absolute inset-0 opacity-[0.5] hidden dark:block"
        style={{
          background:
            "radial-gradient(100% 100% at 50% 40%, transparent 40%, oklch(0.08 0.02 285 / 0.55) 100%)",
        }}
      />
    </div>
  );
}
