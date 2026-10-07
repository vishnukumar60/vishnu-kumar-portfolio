import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { Section } from "@/components/common/Section";
import { Reveal } from "@/components/common/Reveal";
import { CardCarousel } from "@/components/common/CardCarousel";
import { Briefcase, Rocket, Award, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  { Icon: Briefcase, value: 2, suffix: "", label: "Internships completed" },
  { Icon: Rocket, value: 2, suffix: "", label: "Major projects shipped" },
  { Icon: Award, value: 5, suffix: "", label: "Certifications earned" },
  { Icon: GraduationCap, value: 2027, suffix: "", label: "Graduating year" },
];

function Counter({ to, suffix }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

const cards = [
  {
    title: "Full Stack Delivery — Nexitence",
    body: "Shipped responsive React.js interfaces and optimized database queries for a real production stack during my internship in Trichy.",
    span: "lg:col-span-2 lg:row-span-2",
    feature: true,
  },
  {
    title: "Applied ML — Eagle Hi-Tech Softcloud",
    body: "Built predictive models with proper preprocessing and feature engineering, plus dashboards that made insights easy to act on.",
    span: "lg:col-span-2",
  },
  {
    title: "Computer Vision Systems",
    body: "Independently designed a real-time YOLOv3 + OpenCV area surveillance pipeline — end-to-end, from data flow to detection.",
    span: "lg:col-span-2",
  },
];

export function Achievements() {
  return (
    <Section id="achievements" eyebrow="Highlights" title="Where I stand today.">
      {/* Asymmetric bento: stat cells + narrative cells share one grid */}
      <CardCarousel gridClassName="sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:auto-rows-[minmax(0,1fr)] sm:gap-5">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06} className="min-w-0">
            <div className="h-full rounded-[1.75rem] glass-panel glass-lift p-5 sm:p-6">
              <s.Icon className="size-5 text-muted-foreground" />
              <div className="mt-3 font-display font-semibold text-3xl sm:text-4xl tracking-tight text-gradient-liquid">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-xs sm:text-sm text-muted-foreground text-pretty">
                {s.label}
              </div>
            </div>
          </Reveal>
        ))}

        {cards.map((c, i) => (
          <Reveal
            key={c.title}
            delay={0.24 + i * 0.07}
            className={cn("col-span-2 min-w-0", c.span)}
          >
            <div
              className={cn(
                "h-full rounded-[1.75rem] glass-panel glass-lift flex flex-col justify-end",
                c.feature ? "p-6 sm:p-8" : "p-5 sm:p-6",
              )}
            >
              <h3
                className={cn(
                  "font-display font-semibold",
                  c.feature ? "text-xl sm:text-2xl leading-snug text-balance" : "",
                )}
              >
                {c.title}
              </h3>
              <p
                className={cn(
                  "mt-2 text-muted-foreground text-pretty",
                  c.feature ? "text-[0.95rem] sm:text-base" : "text-sm",
                )}
              >
                {c.body}
              </p>
            </div>
          </Reveal>
        ))}
      </CardCarousel>
    </Section>
  );
}
