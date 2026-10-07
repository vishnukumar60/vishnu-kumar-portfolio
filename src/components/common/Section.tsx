import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  const header = (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-10 sm:mb-12 lg:mb-14"
        >
          {eyebrow && (
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-foreground/80 mb-3 sm:mb-4 text-readable">
              <span className="size-1.5 shrink-0 rounded-full bg-foreground" />
              {eyebrow}
            </div>
          )}
          <h2 className="text-[clamp(1.9rem,7vw,3rem)] font-semibold tracking-tight text-balance text-readable">
            {title}
          </h2>
          {description && (
            <p className="mt-3 sm:mt-4 text-foreground/75 text-[0.95rem] sm:text-lg text-pretty text-readable">
              {description}
            </p>
          )}
        </motion.div>
  );

  return (
    <section id={id} className={cn("relative py-16 sm:py-24 lg:py-32", className)}>
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        {header}
        {children}
      </div>
    </section>
  );
}
