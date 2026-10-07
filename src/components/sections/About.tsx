import { motion } from "motion/react";
import { Section } from "@/components/common/Section";
import { Card3D } from "@/components/common/Card3D";
import { Parallax } from "@/components/common/Parallax";
import { GraduationCap, Brain, Target, Sparkles } from "lucide-react";

const items = [
  {
    Icon: GraduationCap,
    title: "Foundation",
    body: "Pursuing B.Tech in Artificial Intelligence & Data Science — building a base in programming, data structures, and problem-solving.",
  },
  {
    Icon: Brain,
    title: "Into AI & ML",
    body: "Hands-on with computer vision (OpenCV, YOLOv3) and predictive analytics — turning coursework into working systems.",
  },
  {
    Icon: Sparkles,
    title: "Full Stack Craft",
    body: "Built and shipped real applications with React.js, MongoDB, and Firebase during internships at Nexitence and Eagle Hi-Tech Softcloud.",
  },
  {
    Icon: Target,
    title: "What's Next",
    body: "Looking for a fresher role where I can apply both frontend engineering and ML fundamentals to real products.",
  },
];

const competencies = [
  "Agile Methodologies",
  "Team Leadership",
  "Time Management",
  "Problem-Solving",
  "Communication",
  "Quick Learner",
];

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="A student of systems, signals, and the space in between."
      description="Motivated and results-driven — I treat every project as a small lab, pairing careful engineering with the patience to let data tell its story."
    >
      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-6 sm:gap-8 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="self-start lg:sticky lg:top-28"
        >
        <Card3D intensity={4}>
        <div className="p-6 sm:p-8">
          <p className="text-foreground/90 leading-relaxed">
            I'm a final-year B.Tech student majoring in Artificial Intelligence &amp; Data Science
            at Kongunadu College of Engineering and Technology, Trichy. I care about the craft of
            building — clean components, honest benchmarks, and interfaces that respect attention.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Off-screen, long walks turn into the best debug sessions I have.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-2.5 sm:gap-4 text-center">
            <Stat value="2" label="Projects" />
            <Stat value="2" label="Internships" />
            <Stat value="2027" label="Graduating" />
          </div>

          <div className="mt-6">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-3">
              Core competencies
            </div>
            <div className="flex flex-wrap gap-2">
              {competencies.map((c) => (
                <motion.span
                  key={c}
                  whileHover={{ y: -2 }}
                  className="glass rounded-full px-3 py-1.5 text-xs font-mono text-foreground/80 hover:text-foreground transition-colors"
                >
                  {c}
                </motion.span>
              ))}
            </div>
          </div>
          </div>
        </Card3D>
        </motion.div>

        {/* Timeline — drifts against the sticky bio panel for depth */}
        <Parallax distance={-38} x={10} className="relative">
          <div aria-hidden className="absolute left-5 top-2 bottom-2 w-px bg-border" />
          <ol className="space-y-8">
            {items.map(({ Icon, title, body }, idx) => (
              <motion.li
                key={title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-14 sm:pl-16"
              >
                <span className="absolute left-0 top-0 size-10 shrink-0 rounded-full glass grid place-items-center shadow-soft">
                  <Icon className="size-4" />
                </span>
                <h3 className="font-display font-semibold text-base sm:text-lg">{title}</h3>
                <p className="mt-1 text-sm sm:text-base text-muted-foreground text-pretty">
                  {body}
                </p>
              </motion.li>
            ))}
          </ol>
        </Parallax>
      </div>
    </Section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-secondary/60 p-3">
      <div className="font-display font-semibold text-xl">{value}</div>
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">{label}</div>
    </div>
  );
}
