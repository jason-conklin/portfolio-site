import { motion, useReducedMotion } from "framer-motion";

import { Section } from "@/components/Section";
import { PageSEO } from "@/app/seo";
import { skills } from "@/data/profile";
import { cn } from "@/lib/utils";

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function SkillsPage() {
  const prefersReducedMotion = useReducedMotion();
  const entries = Object.entries(skills);

  return (
    <>
      <PageSEO path="/skills" />
      <Section
        id="skills"
        title="Skills"
        description="A toolbox honed for building fast, resilient applications and evaluation tooling — grouped for quick scanning."
      >
        <div className="grid gap-8 md:grid-cols-2">
          {entries.map(([group, items], index) => (
            <motion.div
              key={group}
              initial={prefersReducedMotion ? undefined : variants.hidden}
              whileInView={prefersReducedMotion ? undefined : variants.visible}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : index * 0.05 }}
              className="rounded-2xl border border-border bg-card/70 p-6 shadow-sm backdrop-blur-sm"
            >
              <h3 className="text-lg font-semibold text-foreground">{group}</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {items.map((item) => (
                  <span
                    key={item}
                    className={cn(
                      "inline-flex items-center rounded-full border border-border/80 bg-muted/60 px-3 py-1 text-sm font-medium text-muted-foreground transition-colors",
                      "hover:border-primary/40 hover:text-foreground",
                    )}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
    </>
  );
}

export default SkillsPage;
