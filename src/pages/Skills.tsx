import { Fragment } from "react";
import { Link } from "react-router-dom";
import {
  BrainCircuit,
  Code2,
  Database,
  Layers3,
  ShieldCheck,
  Wrench,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/Section";
import { PageSEO } from "@/app/seo";
import { skills } from "@/data/profile";

type SkillCategory = (typeof skills.categories)[number];
type ProficiencyKey = keyof SkillCategory["proficiency"];

const coreStrengthIcons = {
  layers: Layers3,
  shield: ShieldCheck,
  brain: BrainCircuit,
} satisfies Record<string, LucideIcon>;

const categoryIcons = {
  code: Code2,
  workflow: Workflow,
  database: Database,
  brain: BrainCircuit,
  tools: Wrench,
} satisfies Record<string, LucideIcon>;

const proficiencyOrder: readonly ProficiencyKey[] = ["primary", "working", "familiar"];

const proficiencyLabels: Record<ProficiencyKey, string> = {
  primary: "Primary",
  working: "Working",
  familiar: "Familiar",
};

const proficiencyBadgeStyles: Record<ProficiencyKey, string> = {
  primary: "border-primary/30 bg-primary/12 text-primary",
  working: "border-border/80 bg-background/70 text-foreground/90",
  familiar: "border-transparent bg-muted text-muted-foreground",
};

const variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

function SkillsPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <PageSEO path="/skills" />
      <Section
        id="skills"
        title="Skills"
        description="Core technical strengths, implementation depth, and the project work where I use them in practice."
      >
        <div className="space-y-14">
          <section aria-labelledby="core-strengths-heading" className="space-y-6">
            <header className="space-y-2">
              <h3 id="core-strengths-heading" className="text-2xl font-semibold tracking-tight">
                Core Strengths
              </h3>
              <p className="text-sm text-muted-foreground">
                Areas where I contribute most consistently across production web builds.
              </p>
            </header>
            <ul className="grid gap-4 md:grid-cols-3">
              {skills.coreStrengths.map((strength, index) => {
                const Icon = coreStrengthIcons[strength.icon] ?? Layers3;

                return (
                  <motion.li
                    key={strength.title}
                    initial={prefersReducedMotion ? undefined : variants.hidden}
                    whileInView={prefersReducedMotion ? undefined : variants.visible}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.35, delay: prefersReducedMotion ? 0 : index * 0.05 }}
                    className="rounded-2xl border border-border/70 bg-card/80 p-5 shadow-sm transition-shadow duration-200 hover:shadow-md motion-reduce:transition-none"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h4 className="pt-0.5 text-base font-semibold leading-tight text-foreground">
                        {strength.title}
                      </h4>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {strength.description}
                    </p>
                  </motion.li>
                );
              })}
            </ul>
          </section>

          <section aria-labelledby="skill-areas-heading" className="space-y-6">
            <header className="space-y-2">
              <h3 id="skill-areas-heading" className="text-2xl font-semibold tracking-tight">
                Skill Areas
              </h3>
              <p className="text-sm text-muted-foreground">
                Grouped by day-to-day usage level with project proof for quick review.
              </p>
            </header>
            <ul className="grid gap-6 md:grid-cols-2">
              {skills.categories.map((category, index) => {
                const Icon = categoryIcons[category.icon] ?? Wrench;

                return (
                  <motion.li
                    key={category.id}
                    initial={prefersReducedMotion ? undefined : variants.hidden}
                    whileInView={prefersReducedMotion ? undefined : variants.visible}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.35, delay: prefersReducedMotion ? 0 : index * 0.04 }}
                    className="rounded-2xl border border-border/70 bg-card/80 p-6 shadow-sm transition-shadow duration-200 hover:shadow-md motion-reduce:transition-none"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/12 text-primary">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div>
                        <h4 className="text-lg font-semibold tracking-tight text-foreground">
                          {category.title}
                        </h4>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {category.summary}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 space-y-4">
                      {proficiencyOrder.map((level) => {
                        const items = category.proficiency[level];
                        if (!items.length) return null;

                        return (
                          <div key={level} className="space-y-2">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                              {proficiencyLabels[level]}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {items.map((item) => (
                                <Badge
                                  key={item}
                                  variant="outline"
                                  className={proficiencyBadgeStyles[level]}
                                >
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <p className="mt-5 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground/85">Used in:</span>{" "}
                      {category.usedIn.map((project, index) => (
                        <Fragment key={project.slug}>
                          <Link
                            to={`/projects#${project.slug}`}
                            className="underline-offset-4 transition hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                          >
                            {project.label}
                          </Link>
                          {index < category.usedIn.length - 1 ? ", " : ""}
                        </Fragment>
                      ))}
                    </p>
                  </motion.li>
                );
              })}
            </ul>
          </section>
        </div>
      </Section>
    </>
  );
}

export default SkillsPage;
