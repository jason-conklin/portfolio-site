import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/Section";
import { PageSEO } from "@/app/seo";
import { about } from "@/data/profile";
import profileImage from "@/assets/profile.png";
import njitLogo from "@/assets/njit-logo.png";
import { ThemedIconCSS } from "@/components/ThemedIconCSS";
import downloadIconLight from "@/assets/download_icon_light.png";
import downloadIconDark from "@/assets/download_icon_dark.png";

function AboutPage() {
  const prefersReducedMotion = useReducedMotion();
  const emphasizedPhrases = new Set([
    "production-ready web apps",
    "ai-driven tools",
  ]);
  const bioSegments = about.bio.split(
    /(production-ready web apps|AI-driven tools)/i,
  );

  return (
    <>
      <PageSEO path="/about" />
      <Section
        id="about"
        title="About"
      >
        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_8%,rgba(59,130,246,0.05),transparent_54%),radial-gradient(circle_at_86%_4%,rgba(14,165,233,0.04),transparent_52%)] dark:bg-[radial-gradient(circle_at_12%_8%,rgba(96,165,250,0.08),transparent_58%),radial-gradient(circle_at_86%_4%,rgba(56,189,248,0.06),transparent_56%)]"
          />
          <div className="grid gap-12 lg:grid-cols-[1.2fr,1fr]">
            <div className="space-y-5 text-muted-foreground">
              <div className="flex flex-col gap-5 rounded-3xl border border-border/60 bg-card/85 p-5 shadow-[0_20px_44px_-24px_rgba(15,23,42,0.45)] sm:flex-row sm:items-center dark:shadow-[0_22px_48px_-26px_rgba(2,8,23,0.72)]">
                <div className="rounded-[1.65rem] bg-[linear-gradient(135deg,rgba(59,130,246,0.28),rgba(59,130,246,0.08))] p-[2px]">
                  <img
                    src={profileImage}
                    alt="Portrait of Jason Conklin"
                    loading="lazy"
                    className="h-36 w-36 rounded-[1.55rem] object-cover ring-1 ring-white/45 sm:h-44 sm:w-44 dark:ring-white/12"
                  />
                </div>
                <div className="space-y-2 text-base text-foreground">
                  <p className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    Jason Conklin
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Software Engineer · AI-Focused Full-Stack Developer
                  </p>
                  <p className="text-sm text-muted-foreground">
                    B.S. in Computer Science — NJIT (Spring 2025)
                  </p>
                </div>
              </div>
              <p className="max-w-[65ch] whitespace-pre-line text-lg leading-relaxed text-muted-foreground">
                {bioSegments.map((segment, index) => {
                  if (emphasizedPhrases.has(segment.toLowerCase())) {
                    return (
                      <span
                        key={`bio-segment-${index}`}
                        className="font-medium text-foreground/90"
                      >
                        {segment}
                      </span>
                    );
                  }
                  return <span key={`bio-segment-${index}`}>{segment}</span>;
                })}
              </p>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Location
                </h3>
                <p className="mt-2 text-base text-foreground">{about.location}</p>
              </div>
              {about.resumeUrl && about.resumeUrl !== "#" ? (
                <div className="flex items-center gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full shadow-[0_16px_36px_-18px_rgba(37,99,235,0.58)] transition-all duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_22px_44px_-18px_rgba(37,99,235,0.66)]"
                  >
                    <a href={about.resumeViewPath ?? about.resumeUrl}>
                      View resume
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-10 w-10 rounded-full p-0"
                  >
                    <a
                      href={about.resumeUrl}
                      download="Jason-Conklin-Resume.pdf"
                      aria-label="Download resume as PDF"
                      title="Download PDF"
                    >
                      <ThemedIconCSS
                        lightThemeSrc={downloadIconDark}
                        darkThemeSrc={downloadIconLight}
                        alt=""
                        className="h-5 w-5"
                      />
                    </a>
                  </Button>
                </div>
              ) : (
                <Button variant="secondary" className="rounded-full" disabled>
                  Resume coming soon
                </Button>
              )}
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
                    className="rounded-2xl border border-border/70 bg-card/85 p-6 shadow-[0_14px_34px_-22px_rgba(15,23,42,0.46)] dark:shadow-[0_16px_36px_-24px_rgba(2,8,23,0.68)]"
                  >
                    <div className="grid grid-cols-[104px,minmax(0,1fr)] items-start gap-4">
                      <div className="flex h-11 w-[104px] shrink-0 items-center justify-center rounded-lg border border-border/60 bg-background/80 px-2.5 py-1 shadow-sm">
                        <img
                          src={njitLogo}
                          alt="NJIT logo"
                          loading="lazy"
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-lg font-semibold leading-snug text-foreground">
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
                        <div className="mt-2">
                          <p className="text-base font-medium text-foreground/90">{item.degree}</p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            Graduated {item.graduation}
                          </p>
                        </div>
                      </div>
                    </div>
                    <h5 className="mt-5 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground/85">
                      Relevant coursework
                    </h5>
                    <ul className="mt-2 grid grid-cols-1 gap-2.5 text-sm text-foreground sm:grid-cols-2">
                      {item.coursework.map((course) => (
                        <li
                          key={course}
                          className="rounded-lg bg-muted/35 px-3.5 py-2.5 transition-shadow duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-sm"
                        >
                          {course}
                        </li>
                      ))}
                    </ul>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

export default AboutPage;
