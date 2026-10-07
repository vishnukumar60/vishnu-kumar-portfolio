import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Mobile-only carousel: below `sm` the children become a horizontally
 * snap-scrolling track; from `sm` upwards the supplied grid classes take over.
 * CSS-only keeps touch scrolling native and avoids scroll listeners or layout
 * work while the user is swiping.
 */
export function CardCarousel({
  gridClassName,
  itemWidth = "82%",
  children,
}: {
  /** Layout classes applied from the `sm` breakpoint up (e.g. "sm:grid sm:grid-cols-2"). */
  gridClassName?: string;
  itemWidth?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "card-carousel -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-5 pb-4",
        "sm:mx-0 sm:snap-none sm:overflow-visible sm:px-0 sm:pb-0",
        gridClassName,
      )}
      style={{ ["--carousel-item-w" as string]: itemWidth }}
    >
      {children}
    </div>
  );
}
