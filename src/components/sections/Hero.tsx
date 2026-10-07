import { lazy, Suspense, useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, Download, Mail, Github, Linkedin } from "lucide-react";
import profile from "@/assets/profile.webp";


// The 3D shard cluster is decorative — ship it after the hero text paints.
const GlassShard = lazy(() =>
  import("@/components/common/GlassShard").then((m) => ({ default: m.GlassShard })),
);

const EASE_IN_OUT = [0.22, 1, 0.36, 1] as const;

/** Kinetic headline: per-letter stagger reveal with a gradient fill. */
function KineticName({ line, gradient }: { line: string; gradient?: boolean }) {
  const reduce = useReducedMotion();
  const letters = Array.from(line);

  return (
    <span className={gradient ? "text-accent-name" : undefined}>
      <span className="sr-only">{line}</span>
      {letters.map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          aria-hidden
          className="inline-block"
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: "0.4em", rotateX: -60 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            delay: reduce ? 0 : 0.25 + i * 0.045,
            duration: 0.85,
            ease: EASE_IN_OUT,
          }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  );
}


const roles = [
  "AI & Data Science Student",
  "Frontend Developer (React.js)",
  "Machine Learning Enthusiast",
  "Full Stack Builder",
];

function TypingRoles() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[i] ?? "";
    const speed = deleting ? 40 : 80;
    let pauseId: ReturnType<typeof setTimeout>;
    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) pauseId = setTimeout(() => setDeleting(true), 1400);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setI((p) => (p + 1) % roles.length);
        }
      }
    }, speed);
    return () => {
      clearTimeout(timeout);
      clearTimeout(pauseId);
    };
  }, [text, deleting, i]);

  return (
    <span className="font-mono text-base sm:text-lg text-foreground">
      {text}
      <span className="inline-block w-[2px] h-5 sm:h-6 bg-foreground ml-1 align-middle animate-blink" />
    </span>
  );
}

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="home"
      className="relative min-h-dvh flex items-center overflow-hidden pt-24 pb-20 sm:pt-28 sm:pb-16"
    >
      <div
        className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center w-full transform-gpu"
      >
        {/* Left: text */}
        <div className="order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 text-xs text-muted-foreground"
          >
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Available for opportunities · 2027 Grad
          </motion.div>

          <h1 className="mt-5 sm:mt-6 text-[clamp(2.25rem,9vw,4.5rem)] lg:text-7xl font-semibold leading-[1.05] tracking-tight text-readable">
            <KineticName line="vishnu" />
            <br />
            <KineticName line="kumar" gradient />
          </h1>


          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: EASE }}
            className="mt-4 sm:mt-5 text-[0.95rem] sm:text-lg text-foreground/80 max-w-xl text-pretty text-readable"
          >
            Motivated engineering student in Artificial Intelligence &amp; Data Science — pairing
            React frontends with practical machine learning to ship real, useful things.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-5 h-7"
          >
            <TypingRoles />
          </motion.div>
<motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55, duration: 0.7, ease: EASE }}
      className="mt-7 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
    >
      {/* Primary Action Button */}
      <a
        href="/vk60.pdf"
        download="vk60.pdf"
        className="group relative inline-flex items-center gap-2.5 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg hover:shadow-foreground/15 active:translate-y-0 active:scale-[0.98]"
      >
        <Download className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        <span>Download Resume</span>
      </a>

      {/* Secondary Action Button - Projects */}
      <button
        onClick={() =>
          document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
        }
        className="group inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/50 px-6 py-3 text-sm font-medium text-foreground backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-foreground/30 hover:bg-secondary/80 hover:shadow-md active:translate-y-0 active:scale-[0.98]"
      >
        <span>View Projects</span>
      </button>

      {/* Secondary Action Button - Contact */}
      <button
        onClick={() =>
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
        }
        className="group inline-flex items-center gap-2.5 rounded-full border border-border/80 bg-background/50 px-6 py-3 text-sm font-medium text-foreground backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-foreground/30 hover:bg-secondary/80 hover:shadow-md active:translate-y-0 active:scale-[0.98]"
      >
        <Mail className="size-4 text-muted-foreground transition-colors duration-300 group-hover:text-foreground" />
        <span>Contact Me</span>
      </button>
    </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="mt-7 sm:mt-8 flex items-center gap-5 text-muted-foreground"
          >
            {[
              { Icon: Github, href: "https://github.com/vishnukumar60", label: "GitHub" },
              {
                Icon: Linkedin,
                href: "https://www.linkedin.com/in/vishnukumar2027",
                label: "LinkedIn",
              },
              { Icon: Mail, href: "mailto:vishnukumar60rsv@gmail.com", label: "Email" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="hover:text-foreground transition-transform duration-200 hover:-translate-y-0.5 inline-block"
              >
                <Icon className="size-5" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right: portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.9, ease: EASE }}
          className="order-1 lg:order-2 justify-self-center lg:justify-self-end"
        >
          <motion.div
            animate={reduce ? { y: 0 } : { y: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="relative px-6 py-8 sm:px-10 sm:py-10"
            style={{ willChange: "transform" }}
          >
            {/* Playful geometry behind the portrait */}
            <span
              aria-hidden
              className="pointer-events-none absolute -z-10 left-1/2 top-0 hidden sm:block size-3 rounded-full bg-[var(--brutal-orange,var(--accent,var(--primary)))]"
            />

            <motion.div
              whileHover={reduce ? {} : { rotate: -1.5, scale: 1.015 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="group relative size-56 sm:size-72 md:size-80 lg:size-[22rem] xl:size-[23rem]"
            >
              {/* Ambient bloom behind the portrait */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-8 -z-10 rounded-full opacity-50 blur-3xl"
                style={{
                  background:
                    "radial-gradient(closest-side, color-mix(in oklab, var(--primary) 45%, transparent), transparent 70%)",
                }}
              />

              {/* Frosted / brutalist frame */}
              <div className="relative size-full rounded-[2.25rem] p-[1.5px] bg-gradient-to-br from-white/25 via-white/5 to-transparent">
                <div className="relative size-full rounded-[2.15rem] overflow-hidden glass-panel shadow-elevated">
                  <img
                    src={profile}
                    alt="Vishnu Kumar portrait"
                    width={800}
                    height={800}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    className="size-full object-cover scale-[1.02] transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
                  />
                  {/* Cinematic depth: bottom vignette + top sheen */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/75 via-background/5 to-transparent"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/12 to-transparent"
                  />
                  {/* Sweeping light on hover */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -inset-y-8 -left-1/2 w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/18 to-transparent opacity-0 transition-all duration-[1100ms] ease-out group-hover:left-[110%] group-hover:opacity-100"
                  />
                  {/* Inner hairline highlight */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-[2.15rem] ring-1 ring-inset ring-white/12"
                  />

                  {/* Name plate */}
                  <div className="pointer-events-none absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                    <div>
                    </div>
                    <span className="glass rounded-full px-2.5 py-1 text-[0.65rem] font-medium">
                      AI &amp; DS
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating info chips */}
            <motion.div
              animate={reduce ? { y: 0 } : { y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              whileHover={reduce ? {} : { scale: 1.06, rotate: -2 }}
              className="absolute left-0 top-14 sm:top-16 glass rounded-2xl px-3 py-2 text-xs shadow-soft cursor-default"
            >
              <div className="font-mono text-[0.6rem] tracking-[0.16em] uppercase text-muted-foreground">
                Branch
              </div>
              <div className="font-semibold">AI &amp; DS Student</div>
            </motion.div>

            <motion.div
              animate={reduce ? { y: 0 } : { y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              whileHover={reduce ? {} : { scale: 1.06, rotate: 2 }}
            >

            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-xs"
        >
          <span>Scroll</span>
          <ArrowDown className="size-4" />
        </motion.div>
      </div>
    </section>
  );
}
