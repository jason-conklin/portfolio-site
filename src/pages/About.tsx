import { GraduationCap } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/Section";
import { PageSEO } from "@/app/seo";
import { about } from "@/data/profile";

function AboutPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <PageSEO path="/about" />
      <Section
        id="about"
        title="About"
        description="A focused software developer building AI-enabled, production-ready experiences with a strong foundation in computer science and developer experience."
      >
        <div className="grid gap-12 lg:grid-cols-[1.5fr,1fr]">
          <div className="space-y-6 text-lg text-muted-foreground">
            <p>{about.bio}</p>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Location
              </h3>
              <p className="mt-2 text-base text-foreground">{about.location}</p>
            </div>
            <Button
              asChild
              variant="secondary"
              className="rounded-full"
              disabled={about.resumeUrl === "#" || !about.resumeUrl}
            >
              <a
                href={about.resumeUrl === "#" ? undefined : about.resumeUrl}
                target={about.resumeUrl === "#" ? undefined : "_blank"}
                rel={about.resumeUrl === "#" ? undefined : "noopener noreferrer"}
                aria-disabled={about.resumeUrl === "#"}
              >
                Download résumé
              </a>
            </Button>
          </div>
          <div className="space-y-6">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              Education
            </h3>
            <ol className="relative border-l border-border/70 pl-6">
              {about.education.map((item) => (
                <motion.li
                  key={item.school}
                  initial={
                    prefersReducedMotion ? undefined : { opacity: 0, x: -24 }
                  }
                  whileInView={
                    prefersReducedMotion ? undefined : { opacity: 1, x: 0 }
                  }
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="mb-10 ml-6"
                >
                  <span className="absolute -left-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft">
                    <GraduationCap className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h4 className="text-lg font-semibold text-foreground">
                    {item.school}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {item.degree} — {item.graduation}
                  </p>
                  <h5 className="mt-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Relevant coursework
                  </h5>
                  <ul className="mt-2 grid grid-cols-1 gap-2 text-sm text-foreground sm:grid-cols-2">
                    {item.coursework.map((course) => (
                      <li key={course} className="rounded-lg bg-muted/60 px-3 py-2">
                        {course}
                      </li>
                    ))}
                  </ul>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </Section>
    </>
  );
}

export default AboutPage;
