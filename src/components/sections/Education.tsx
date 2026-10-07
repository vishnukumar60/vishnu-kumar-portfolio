import { motion } from "motion/react";
import { Section } from "@/components/common/Section";
import { Card3D } from "@/components/common/Card3D";
import { Parallax } from "@/components/common/Parallax";
import { GraduationCap } from "lucide-react";

const items = [
  {
    year: "2023 — 2027",
    institution: "Kongunadu College of Engineering and Technology",
    location: "Trichy, Tamil Nadu",
    degree: "B.Tech, Artificial Intelligence & Data Science",
    note: "CGPA: 7.5",
  },
  {
    year: "— 2023",
    institution: "Sowdambikaa Group of Schools",
    location: "Thuraiyur, Tamil Nadu",
    degree: "HSC (Class XII)",
    note: "78%",
  },
  {
    year: "— 2021",
    institution: "SRM Public School (CBSE)",
    location: "Thuraiyur, Tamil Nadu",
    degree: "SSLC (Class X)",
    note: "67%",
  },
];

export function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Academic journey.">
      <div className="grid gap-4">
        {items.map((it, i) => (
          <Parallax key={it.institution} distance={i % 2 === 0 ? 20 : -14}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card3D intensity={5}>
              <div
                className="grid grid-cols-[auto_minmax(0,1fr)] sm:grid-cols-[150px_auto_minmax(0,1fr)] items-center gap-x-4 gap-y-3 sm:gap-6 p-5 sm:p-6"
                style={{ transform: "translateZ(15px)" }}
              >
                {/* Year sits on a slower depth plane than the card */}
                <Parallax
                  distance={14}
                  className="order-2 col-span-2 sm:order-none sm:col-span-1 font-mono text-xs sm:text-sm text-muted-foreground"
                >
                  {it.year}
                </Parallax>
                <div className="size-10 shrink-0 rounded-2xl bg-secondary grid place-items-center">
                  <GraduationCap className="size-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display font-semibold text-base sm:text-lg leading-tight text-balance">
                    {it.institution}
                  </h3>
                  <div className="text-[0.85rem] sm:text-sm text-muted-foreground text-pretty">
                    {it.degree} · {it.location}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 font-mono">{it.note}</div>
                </div>
              </div>
            </Card3D>
          </motion.div>
          </Parallax>
        ))}
      </div>
    </Section>
  );
}
