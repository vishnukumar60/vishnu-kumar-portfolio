import { useRef, type MouseEvent, type ReactNode, type CSSProperties } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

interface Card3DProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  intensity?: number;
  as?: "div" | "article" | "button";
  onClick?: () => void;
  style?: CSSProperties;
  ariaLabel?: string;
}

/**
 * Premium 3D tilt card with glassmorphism, gradient border and cursor-follow glow.
 * Theme-aware via design tokens. Wrap any card content with this for the unified look.
 * Children that want to "pop forward" can apply `style={{ transform: 'translateZ(40px)' }}`.
 */
export function Card3D({
  children,
  className,
  innerClassName,
  intensity = 9,
  as = "div",
  onClick,
  style,
  ariaLabel,
}: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 220,
    damping: 18,
    mass: 0.6,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-intensity, intensity]), {
    stiffness: 220,
    damping: 18,
    mass: 0.6,
  });
  const glowX = useTransform(mx, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(my, [-0.5, 0.5], ["0%", "100%"]);
  const glow = useMotionTemplate`radial-gradient(420px circle at ${glowX} ${glowY}, color-mix(in oklab, var(--foreground) 12%, transparent), transparent 55%)`;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const Comp = motion[as] as typeof motion.div;

  return (
    <div className={cn("group/card3d h-full", className)} style={{ perspective: 1200, ...style }}>
      <Comp
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={onClick}
        aria-label={ariaLabel}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className={cn(
          "relative h-full w-full rounded-3xl transition-shadow duration-500 will-change-transform",
          onClick && "cursor-pointer text-left",
        )}
      >
        {/* gradient border */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{
            padding: 1,
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--foreground) 22%, transparent), color-mix(in oklab, var(--foreground) 4%, transparent) 40%, color-mix(in oklab, var(--foreground) 18%, transparent))",
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
        {/* glass body */}
        <div
          className={cn(
            "relative h-full rounded-3xl glass shadow-soft overflow-hidden transition-shadow duration-500 group-hover/card3d:shadow-glow",
            innerClassName,
          )}
        >
          {/* cursor-follow glow */}
          <motion.div
            aria-hidden
            style={{ background: glow }}
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card3d:opacity-100"
          />
          {/* subtle top sheen */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, color-mix(in oklab, var(--foreground) 30%, transparent), transparent)",
            }}
          />
          <div className="relative h-full" style={{ transformStyle: "preserve-3d" }}>
            {children}
          </div>
        </div>
      </Comp>
    </div>
  );
}
