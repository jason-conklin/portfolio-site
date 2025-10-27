import { GraduationCap } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/Section";
import { PageSEO } from "@/app/seo";
import { about } from "@/data/profile";
import profileImage from "@/assets/profile.png";

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
            <div className="flex flex-col gap-6 rounded-3xl border border-border/60 bg-card/80 p-6 shadow-soft sm:flex-row sm:items-center">
              <img
                src={profileImage}
                alt="Portrait of Jason Conklin"
                loading="lazy"
                className="h-32 w-32 rounded-3xl object-cover shadow-lg ring-1 ring-border sm:h-40 sm:w-40"
              />
              <div className="space-y-2 text-base text-foreground">
                <p className="text-xl font-semibold text-foreground">Jason Conklin</p>
                <p className="text-sm text-muted-foreground">
                  Software Developer building AI-enabled, production-ready experiences.
                </p>
              </div>
            </div>
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
                Download resume
              </a>
            </Button>
          </div>
          <div className="space-y-6">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              Education
            </h3>
            <ol className="space-y-6">
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
                  className="rounded-2xl border border-border/70 bg-card/80 p-6 shadow-sm"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft">
                      <GraduationCap className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h4 className="text-lg font-semibold text-foreground">
                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        >
                          {item.school}
                        </a>
                      ) : (
                        item.school
                      )}
                    </h4>
                  </div>
                  <p className="mt-2 pl-[52px] text-sm text-muted-foreground">
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
