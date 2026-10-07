import { useEffect, useState } from "react";

/**
 * Neo-brutalist load transition.
 *
 * Plays once per page load (first visit and every reload). Pure CSS keyframes
 * on `transform` / `opacity` only — no JS per-frame work, no layout shift —
 * and the whole overlay unmounts as soon as it finishes.
 */
const DURATION = 1050;

export function PageTransition() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setDone(true), reduce ? 0 : DURATION);
    return () => clearTimeout(t);
  }, []);

  if (done) return null;

  return (
    <div aria-hidden className="pt-overlay">
      <div className="pt-panel pt-panel-1" />
      <div className="pt-panel pt-panel-2" />
      <div className="pt-panel pt-panel-3" />
      <div className="pt-panel pt-panel-4" />
      <div className="pt-badge">
        <span className="pt-badge-text">VK</span>
      </div>
    </div>
  );
}
