import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Award,
  Cpu,
  Database,
  Sparkles,
  BrainCircuit,
  BarChart3,
  X,
  Maximize2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section } from "@/components/common/Section";
import { CardCarousel } from "@/components/common/CardCarousel";
import { Card3D } from "@/components/common/Card3D";
import { Parallax } from "@/components/common/Parallax";
import certTata from "@/assets/cert-tata-genai.webp";
import certDeloitte from "@/assets/cert-deloitte.webp";

type Cert = {
  title: string;
  issuer: string;
  Icon: LucideIcon;
  accent: string;
  image?: string;
};

const certs: Cert[] = [
  {
    title: "Internet of Things (IoT) Fundamentals",
    issuer: "NPTEL",
    Icon: Cpu,
    accent: "from-sky-400/25 to-transparent",
  },
  {
    title: "MongoDB Basics — Official Certification",
    issuer: "MongoDB",
    Icon: Database,
    accent: "from-emerald-400/25 to-transparent",
  },
  {
    title: "Fundamentals of Deep Learning",
    issuer: "NVIDIA",
    Icon: Sparkles,
    accent: "from-lime-400/25 to-transparent",
  },
  {
    title: "GenAI Powered Data Analytics Job Simulation",
    issuer: "Tata · Forage",
    Icon: BrainCircuit,
    accent: "from-indigo-400/25 to-transparent",
    image: certTata,
  },
  {
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte · Forage",
    Icon: BarChart3,
    accent: "from-teal-400/25 to-transparent",
    image: certDeloitte,
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function Certifications() {
  const [active, setActive] = useState<Cert | null>(null);

  // Lock scroll + close on Escape while the lightbox is open.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <Section
      id="certifications"
      eyebrow="Certifications"
      title="Continual study."
      description="A working list of credentials I've earned along the way."
    >
      <CardCarousel gridClassName="sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
        {certs.map((c, i) => {
          const interactive = Boolean(c.image);
          return (
            <Parallax key={c.title} distance={i % 2 === 0 ? 30 : -18} className="h-full">
            <motion.div
              /* Alternating side entrance */
              initial={{ opacity: 0, y: 20, x: i % 2 === 0 ? -28 : 28 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: EASE }}
              className="h-full"
            >
              <Card3D>
                <div
                  className="relative flex h-full flex-col p-5 sm:p-6 min-h-[190px] sm:min-h-[220px]"
                  style={{ transform: "translateZ(20px)" }}
                >
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br ${c.accent} opacity-70`}
                  />
                  <div className="relative flex items-center justify-between">
                    <span className="size-11 sm:size-12 shrink-0 rounded-2xl glass grid place-items-center shadow-soft">
                      <c.Icon className="size-5" />
                    </span>
                    {interactive ? (
                      <button
                        type="button"
                        onClick={() => setActive(c)}
                        aria-label={`View ${c.title} certificate`}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-[11px] font-mono glass shadow-soft transition-transform duration-200 hover:scale-105 cursor-pointer"
                      >
                        <Maximize2 className="size-3" /> View
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-mono glass">
                        <Award className="size-3" /> Certificate
                      </span>
                    )}
                  </div>

                  <div className="relative mt-5 sm:mt-6">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                      {c.issuer}
                    </div>
                    <h3 className="mt-2 font-display font-semibold leading-snug text-base sm:text-lg text-balance">
                      {c.title}
                    </h3>
                  </div>
                </div>
              </Card3D>
            </motion.div>
            </Parallax>
          );
        })}
      </CardCarousel>

      <AnimatePresence>
        {active?.image && (
          <motion.div
            key="cert-lightbox"
            className="fixed inset-0 z-[100] grid place-items-center bg-background/85 backdrop-blur-md p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${active.title} certificate`}
          >
            <motion.img
              src={active.image}
              alt={`${active.title} certificate issued by ${active.issuer}`}
              className="max-w-full max-h-full w-auto h-auto object-contain rounded-xl shadow-soft ring-1 ring-border/50"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close certificate"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 size-11 rounded-full glass grid place-items-center shadow-soft"
            >
              <X className="size-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
