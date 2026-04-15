import { useRef } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { Button } from "@/components/ui/button";
import aboutPic1 from "@/assets/about-pic1.jpg";
import aboutPic2 from "@/assets/about-pic2.jpg";
import njitLogo from "@/assets/njit-logo.png";
import { about, hero } from "@/data/profile";

const aboutHeadline = "A long-running interest in computers turned into work I care deeply about.";
const aboutSummary =
  "Today I build full-stack products, with the strongest pull toward frontend work and the craft of making software feel clear, polished, and easy to use.";
const aboutParagraphs = [
  "Computers have held my attention for as long as I can remember. What started as curiosity eventually became a serious commitment to building software, and that early interest still shapes how I approach the work.",
  "I work across the stack, but interface and product experience are where I feel most at home. I care about the systems underneath the UI too, from APIs and auth to data flow and application structure, because good product work depends on both.",
] as const;

const compactStrengths = [
  {
    title: "Interface craft",
    description: "Layout, hierarchy, motion restraint, and the details that make a product feel intentional.",
  },
  {
    title: "Full-stack context",
    description: "UI decisions backed by a real understanding of APIs, auth, data flow, and application structure.",
  },
  {
    title: "Applied AI",
    description: "Model features integrated in practical ways that stay measurable, explainable, and grounded in product use.",
  },
] as const;

const relevantExperience = [
  {
    title: "Volunteer Tutor",
    organization: "NJIT Coding & Tech Tutoring",
    term: "Spring 2023",
    description:
      "Tutored students in Python, Java, and C++, with an emphasis on debugging, algorithms, and software design fundamentals.",
  },
  {
    title: "Member",
    organization: "NJIT Information & Cybersecurity Club",
    term: "2022-2023",
    description:
      "Completed applied security labs and CTF challenges focused on network defense and vulnerability testing.",
  },
] as const;

export function PortfolioAboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const education = about.education[0];
  const focusAreas = education.focusAreas.slice(0, 4);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const primaryImageY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [-12, 12]);
  const secondaryImageY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [14, -10]);
  const secondaryImageX = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [-6, 8]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="scroll-mt-[var(--section-scroll-offset)] px-6 py-16 sm:px-8 sm:py-20 lg:px-14 lg:py-22 lg:pl-[12rem] lg:pr-16 xl:pl-[14rem]"
      aria-labelledby="about-title"
    >
      <div className="mx-auto w-full max-w-[92rem]">
        <div className="grid grid-rows-[auto_auto] gap-6 lg:gap-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(26rem,0.98fr)] lg:items-center lg:gap-10 xl:gap-12">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.28 }}
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

                <div className="relative min-h-[29rem] sm:min-h-[34rem] lg:min-h-[37rem]">
                  <motion.div
                    style={prefersReducedMotion ? undefined : { y: primaryImageY }}
                    className="relative ml-auto h-[24rem] w-[84%] overflow-hidden rounded-[1.75rem] border border-[color:var(--cinematic-border)] bg-[color:var(--cinematic-surface-deep)] shadow-[var(--cinematic-shadow-strong)] sm:h-[28rem] lg:h-[32rem]"
                  >
                    <img
                      src={aboutPic2}
                      alt={`${hero.name} after graduating college`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/16 to-transparent p-4 sm:p-5">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/28 px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.19em] text-white/84 backdrop-blur-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                        NJIT · Spring 2025
                      </div>
                    </div>
                  </motion.div>

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-6 bottom-[3.25rem] z-10 h-px bg-gradient-to-r from-white/0 via-white/14 to-white/0 sm:inset-x-8 lg:inset-x-10"
                  />

                  <motion.div
                    style={prefersReducedMotion ? undefined : { x: secondaryImageX, y: secondaryImageY }}
                    className="absolute bottom-2 left-0 z-20 w-[41%] max-w-[14rem] rounded-[1.35rem] border border-[color:var(--cinematic-border-strong)] bg-[color:var(--cinematic-surface-panel)]/86 p-2.5 shadow-[var(--cinematic-shadow-panel)] backdrop-blur-xl"
                  >
                    <div className="overflow-hidden rounded-[1.05rem] border border-white/8">
                      <img
                        src={aboutPic1}
                        alt={`${hero.name} as a child using a computer`}
                        className="aspect-[4/5] h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="px-1.5 pb-0.5 pt-3">
                      <p className="inline-flex items-center rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.19em] cinematic-text-quaternary">
                        Early curiosity
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.28 }}
              transition={{ duration: 0.62, ease: "easeOut", delay: prefersReducedMotion ? 0 : 0.06 }}
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
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{ duration: 0.58, ease: "easeOut", delay: prefersReducedMotion ? 0 : 0.08 }}
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
                    <div className="flex items-center gap-3">
                      <div className="cinematic-chip-strong flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl p-1.5 shadow-[0_10px_24px_-18px_rgba(255,170,84,0.7)]">
                        <img
                          src={njitLogo}
                          alt="NJIT logo"
                          className="h-full w-full object-contain"
                          loading="lazy"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium leading-5.5 cinematic-text-primary">
                          {education.school}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-start justify-between gap-4 text-sm leading-5.5">
                      <p className="cinematic-text-secondary">{education.degree}</p>
                      <p className="shrink-0 text-right cinematic-text-tertiary">{education.graduation}</p>
                    </div>

                    <div aria-hidden="true" className="mt-4 h-px bg-white/8" />

                    <div className="mt-4">
                      <p className="text-[0.62rem] font-medium uppercase tracking-[0.18em] cinematic-text-quaternary">
                        Relevant Experience
                      </p>
                      <div className="mt-3 space-y-3.5">
                        {relevantExperience.map((item, index) => (
                          <div key={item.title} className="space-y-1.5">
                            <div className="flex items-start justify-between gap-3 text-[0.8rem] leading-5">
                              <div className="min-w-0">
                                <p className="font-medium cinematic-text-primary">
                                  {item.title} <span className="cinematic-text-tertiary">- {item.organization}</span>
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
                            {index < relevantExperience.length - 1 ? (
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
                    The areas I keep returning to when I think about product quality, implementation, and system design.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {focusAreas.map((area) => (
                      <span key={area.title} className="cinematic-chip rounded-full px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.16em]">
                        {area.title}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="cinematic-subpanel h-full rounded-[1.55rem] p-5 sm:p-5.5">
                <p className="text-[0.66rem] font-medium uppercase tracking-[0.2em] cinematic-text-quaternary">
                  Core Strengths
                </p>
                <div className="mt-4 space-y-3">
                  {compactStrengths.map((strength) => (
                    <div key={strength.title} className="cinematic-chip rounded-[1.1rem] px-4 py-3">
                      <p className="text-sm font-medium cinematic-text-primary">{strength.title}</p>
                      <p className="mt-1 text-sm leading-5.5 cinematic-text-tertiary">
                        {strength.description}
                      </p>
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
