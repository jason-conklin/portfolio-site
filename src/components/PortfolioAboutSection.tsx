import { useRef } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

import { Button } from "@/components/ui/button";
import aboutPic1 from "@/assets/about-pic1.jpg";
import aboutPic2 from "@/assets/about-pic2.jpg";
import njitLogo from "@/assets/njit-logo.png";
import { about, hero } from "@/data/profile";
import { useMobileViewport } from "@/lib/use-mobile-viewport";

const aboutHeadline = "A long-running interest in computers turned into work I care deeply about.";
const aboutSummary =
  "Today I build full-stack products, with the strongest pull toward frontend work and the craft of making software feel clear, polished, and easy to use.";
const aboutParagraphs = [
  "Computers have held my attention for as long as I can remember. What started as curiosity eventually became a serious commitment to building software, and that early interest still shapes how I approach the work.",
  "I work across the stack, but interface and product experience are where I feel most at home. I care about the systems underneath the UI too, from APIs and auth to data flow and application structure, because good product work depends on both.",
] as const;

const workStyleSignals = [
  {
    label: "01",
    title: "Product-minded execution",
    description:
      "I tend to work from the user experience backward, focusing effort where the product gets clearer, faster, and easier to trust.",
  },
  {
    label: "02",
    title: "Structured implementation",
    description:
      "I like clean boundaries, readable code, and delivery that stays maintainable after the initial build instead of collapsing under the next round of changes.",
  },
  {
    label: "03",
    title: "Grounded AI judgment",
    description:
      "When AI is involved, I care less about novelty and more about whether it improves the product in a way that is measurable, practical, and understandable.",
  },
] as const;

export function PortfolioAboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const isMobileViewport = useMobileViewport();
  const shouldAnimateEntrance = !prefersReducedMotion && !isMobileViewport;
  const shouldPrioritizeMedia = isMobileViewport;
  const education = about.education[0];
  const educationActivities = education.activities;
  const focusAreaHighlights = about.focusAreas;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 72,
    damping: 20,
    mass: 0.55,
  });
  const primaryImageInnerY = useTransform(
    smoothScrollProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [-56, 56],
  );
  const secondaryImageY = useTransform(
    smoothScrollProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [18, -14],
  );
  const secondaryImageX = useTransform(
    smoothScrollProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [-8, 10],
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="scroll-mt-[var(--section-scroll-offset)] px-6 py-16 sm:px-8 sm:py-20 lg:px-14 lg:py-22 lg:pl-[12rem] lg:pr-16 xl:pl-[14rem]"
      aria-labelledby="about-title"
    >
      <div className="mx-auto w-full max-w-[92rem]" data-section-anchor="about">
        <div className="grid grid-rows-[auto_auto] gap-6 lg:gap-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(26rem,0.98fr)] lg:items-center lg:gap-10 xl:gap-12">
            <motion.div
              initial={shouldAnimateEntrance ? { opacity: 0, y: 24 } : false}
              whileInView={shouldAnimateEntrance ? { opacity: 1, y: 0 } : undefined}
              viewport={shouldAnimateEntrance ? { once: true, amount: 0.28 } : undefined}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative lg:pr-2"
            >
              <div className="cinematic-panel-strong relative overflow-hidden rounded-[2.1rem] p-4 sm:p-5 lg:p-6">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 12% 12%, var(--cinematic-band-accent-a), transparent 24%), radial-gradient(circle at 100% 100%, var(--cinematic-band-accent-b), transparent 22%)",
                  }}
                />
                <div
                  aria-hidden="true"
                  className="cinematic-divider pointer-events-none absolute inset-x-0 top-0 h-px"
                />

                <div className="relative min-h-[31rem] sm:min-h-[36rem] lg:min-h-[39rem]">
                  <motion.div
                    className="relative ml-auto h-[26rem] w-[92%] overflow-hidden rounded-[1.75rem] border border-[color:var(--cinematic-border)] bg-[color:var(--cinematic-surface-deep)] shadow-[var(--cinematic-shadow-strong)] sm:h-[31rem] sm:w-[91%] lg:h-[35rem] lg:w-[90%]"
                  >
                    <motion.img
                      src={aboutPic2}
                      alt={`${hero.name} after graduating college`}
                      style={prefersReducedMotion ? undefined : { y: primaryImageInnerY }}
                      className="absolute inset-x-0 top-[-12%] h-[126%] w-full object-cover object-[center_18%] will-change-transform"
                      loading={shouldPrioritizeMedia ? "eager" : "lazy"}
                      fetchPriority={shouldPrioritizeMedia ? "high" : "auto"}
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/58 via-black/16 to-transparent p-4 sm:p-5" />
                    <div
                      className="pointer-events-none absolute z-30"
                      style={{
                        left: "49%",
                        bottom: "clamp(0.95rem, 3.8%, 1.4rem)",
                      }}
                    >
                      <div className="-translate-x-1/2 rounded-full border border-white/14 bg-black/34 px-4 py-1 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-white/86 shadow-[0_10px_24px_-18px_rgba(0,0,0,0.65)] backdrop-blur-md">
                        Spring 2025
                      </div>
                    </div>
                  </motion.div>

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-6 bottom-[3.25rem] z-10 h-px bg-gradient-to-r from-white/0 via-white/14 to-white/0 sm:inset-x-8 lg:inset-x-10"
                  />

                  <motion.div
                    className="absolute z-20 w-[38%] max-w-[12.75rem] rounded-[1.35rem] border border-[color:var(--cinematic-border-strong)] bg-[color:var(--cinematic-surface-panel)]/88 p-2.5 shadow-[var(--cinematic-shadow-panel)] backdrop-blur-xl sm:w-[36%] sm:max-w-[13.5rem] lg:w-[34%] lg:max-w-[14rem]"
                    style={{
                      ...(prefersReducedMotion ? {} : { x: secondaryImageX, y: secondaryImageY }),
                      left: "clamp(1.1rem, 5.8%, 3.6rem)",
                      bottom: "clamp(0.85rem, 2.2vw, 1.5rem)",
                    }}
                  >
                    <div className="overflow-hidden rounded-[1.05rem] border border-white/8">
                      <img
                        src={aboutPic1}
                        alt={`${hero.name} as a child using a computer`}
                        className="aspect-[4/5] h-full w-full object-cover"
                        loading={shouldPrioritizeMedia ? "eager" : "lazy"}
                        fetchPriority={shouldPrioritizeMedia ? "high" : "auto"}
                      />
                    </div>
                    <div className="px-1.5 pb-0.5 pt-3">
                      <p className="inline-flex items-center rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.19em] cinematic-text-quaternary">
                        Where it started
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={shouldAnimateEntrance ? { opacity: 0, y: 28 } : false}
              whileInView={shouldAnimateEntrance ? { opacity: 1, y: 0 } : undefined}
              viewport={shouldAnimateEntrance ? { once: true, amount: 0.28 } : undefined}
              transition={{ duration: 0.62, ease: "easeOut", delay: shouldAnimateEntrance ? 0.06 : 0 }}
              className="lg:pt-1"
            >
              <div className="max-w-[40rem]">
                <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] cinematic-text-quaternary">
                  About
                </p>
                <p className="mt-4 text-[0.74rem] font-medium uppercase tracking-[0.22em] cinematic-text-tertiary">
                  Full-stack developer · Frontend-leaning product builder
                </p>
                <p className="mt-3 inline-flex items-center gap-2 text-sm cinematic-text-quaternary">
                  <MapPin className="h-4 w-4 shrink-0 cinematic-text-tertiary" aria-hidden="true" />
                  <span>{about.location}</span>
                </p>

                <h2
                  id="about-title"
                  className="mt-6 max-w-[20ch] text-[clamp(1.9rem,2.9vw,3rem)] font-light leading-[1.03] tracking-[0.01em] cinematic-text-primary"
                >
                  {aboutHeadline}
                </h2>
                <p className="mt-3.5 max-w-[36rem] text-[0.98rem] leading-6.5 cinematic-text-secondary">
                  {aboutSummary}
                </p>

                <div className="mt-4.5 max-w-[37rem] space-y-3.5 text-[0.95rem] leading-6.5 cinematic-text-tertiary">
                  {aboutParagraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Button
                    asChild
                    className="cinematic-btn-primary h-11 rounded-full px-5 text-sm hover:-translate-y-px"
                  >
                    <a href={about.resumeViewPath ?? about.resumeUrl}>
                      View resume
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={shouldAnimateEntrance ? { opacity: 0, y: 20 } : false}
            whileInView={shouldAnimateEntrance ? { opacity: 1, y: 0 } : undefined}
            viewport={shouldAnimateEntrance ? { once: true, amount: 0.22 } : undefined}
            transition={{ duration: 0.58, ease: "easeOut", delay: shouldAnimateEntrance ? 0.08 : 0 }}
            className="relative pt-2"
          >
            <div aria-hidden="true" className="cinematic-divider absolute inset-x-0 top-0 h-px" />
            <div className="grid auto-rows-fr gap-4 pt-4 md:grid-cols-3">
              <div className="cinematic-subpanel h-full rounded-[1.55rem] p-5 sm:p-5.5">
                <div>
                  <p className="text-[0.66rem] font-medium uppercase tracking-[0.2em] cinematic-text-quaternary">
                    Education
                  </p>

                  <div className="mt-4 rounded-[1.25rem] border border-[color:var(--cinematic-border)] bg-white/[0.025] px-4 py-3.5">
                    <div className="flex items-start gap-3.5">
                      <a
                        href={education.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor-interactive="true"
                        aria-label="Visit New Jersey Institute of Technology"
                        className="cinematic-chip-strong flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[1rem] p-2 shadow-[0_12px_28px_-18px_rgba(255,170,84,0.78)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-px hover:[border-color:var(--cinematic-border-strong)] hover:shadow-[0_16px_34px_-20px_rgba(255,170,84,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--cinematic-focus-ring)] focus-visible:ring-offset-2"
                      >
                        <img
                          src={njitLogo}
                          alt="NJIT logo"
                          className="h-full w-full object-contain"
                          loading="lazy"
                        />
                      </a>
                      <div className="min-w-0 flex-1 pt-0.5">
                        <a
                          href={education.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor-interactive="true"
                          className="inline-flex max-w-full transition-opacity duration-300 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--cinematic-focus-ring)] focus-visible:ring-offset-2"
                        >
                          <p className="text-sm font-medium leading-5.5 cinematic-text-primary">
                            {education.school}
                          </p>
                        </a>
                        <div className="mt-1.5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm leading-5.5">
                          <p className="cinematic-text-secondary">{education.degree}</p>
                          <p className="shrink-0 text-right cinematic-text-tertiary">
                            {education.graduation}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div aria-hidden="true" className="mt-4 h-px bg-white/8" />

                    <div className="mt-4">
                      <p className="text-[0.62rem] font-medium uppercase tracking-[0.18em] cinematic-text-quaternary">
                        Relevant Experience
                      </p>
                      <div className="mt-3 space-y-3.5">
                        {educationActivities.map((item, index) => (
                          <div key={item.title} className="space-y-1.5">
                            <div className="flex items-start justify-between gap-3 text-[0.8rem] leading-5">
                              <div className="min-w-0">
                                <p className="font-medium cinematic-text-primary">
                                  {item.title}
                                  <span className="cinematic-text-tertiary">{" — "}{item.organization}</span>
                                </p>
                              </div>
                              <p className="shrink-0 text-right text-[0.72rem] uppercase tracking-[0.14em] cinematic-text-quaternary">
                                {item.term}
                              </p>
                            </div>
                            <div className="flex items-start gap-2 text-[0.82rem] leading-5 cinematic-text-tertiary">
                              <span className="mt-[0.42rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--cinematic-accent)]/85" aria-hidden="true" />
                              <p>{item.description}</p>
                            </div>
                            {index < educationActivities.length - 1 ? (
                              <div aria-hidden="true" className="pt-1 h-px bg-white/7" />
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="cinematic-subpanel h-full rounded-[1.55rem] p-5 sm:p-5.5">
                <div>
                  <p className="text-[0.66rem] font-medium uppercase tracking-[0.2em] cinematic-text-quaternary">
                    Focus Areas
                  </p>
                  <p className="mt-3 max-w-[30rem] text-sm leading-5.5 cinematic-text-tertiary">
                    The types of work I keep returning to when a product needs both technical depth and a strong user-facing experience.
                  </p>

                  <div className="mt-4 space-y-3.5">
                    {focusAreaHighlights.map((area, index) => (
                      <div
                        key={area.title}
                        className={index === 0 ? "space-y-2" : "space-y-2 border-t border-white/7 pt-3.5"}
                      >
                        <p className="inline-flex items-center rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.18em] cinematic-text-quaternary">
                          {area.title}
                        </p>
                        <p className="max-w-[32rem] text-[0.88rem] leading-5.5 cinematic-text-secondary">
                          {area.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="cinematic-subpanel h-full rounded-[1.55rem] p-5 sm:p-5.5">
                <p className="text-[0.66rem] font-medium uppercase tracking-[0.2em] cinematic-text-quaternary">
                  How I Work
                </p>
                <p className="mt-3 max-w-[29rem] text-sm leading-5.5 cinematic-text-tertiary">
                  The working style I bring to product teams: clear execution, maintainable decisions, and attention to the user-facing details that shape quality.
                </p>

                <div className="mt-4 space-y-3.5">
                  {workStyleSignals.map((signal) => (
                    <div
                      key={signal.title}
                      className="rounded-[1.15rem] border border-[color:var(--cinematic-border)] bg-white/[0.025] px-4 py-3.5"
                    >
                      <div className="flex items-start gap-3">
                        <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/8 bg-white/[0.03] text-[0.62rem] font-medium uppercase tracking-[0.16em] cinematic-text-quaternary">
                          {signal.label}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium cinematic-text-primary">{signal.title}</p>
                          <p className="mt-1.5 text-[0.9rem] leading-5.5 cinematic-text-tertiary">
                            {signal.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
