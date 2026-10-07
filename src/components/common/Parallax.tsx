import type { ReactNode } from "react";
import { useMotionValue, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Parallax has been removed for performance.
 *
 * These primitives are kept as inert, allocation-free pass-throughs so the
 * existing call sites keep working without any scroll listeners, springs or
 * per-frame transform writes.
 */

/** Always 0 — parallax depth is disabled project-wide. */
export function useDepthScale() {
  return 0;
}

/** Constant 0 progress; no scroll subscription is created. */
export function useSectionProgress(
  _ref?: React.RefObject<HTMLElement | null>,
): MotionValue<number> {
  return useMotionValue(0);
}

/** Constant 0 drift. */
export function useDrift(_progress: MotionValue<number>, _distance?: number): MotionValue<number> {
  return useMotionValue(0);
}

/** Static wrapper — renders children in place with no motion. */
export function Parallax({
  children,
  className,
}: {
  children: ReactNode;
  distance?: number;
  x?: number;
  className?: string;
  fade?: boolean;
}) {
  return <div className={cn(className)}>{children}</div>;
}
