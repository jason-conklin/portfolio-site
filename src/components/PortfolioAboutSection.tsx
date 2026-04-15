import { useRef } from "react";
import { ArrowUpRight, GraduationCap, MapPin, Sparkles } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { Button } from "@/components/ui/button";
import aboutPic1 from "@/assets/about-pic1.jpg";
import aboutPic2 from "@/assets/about-pic2.jpg";
import njitLogo from "@/assets/njit-logo.png";
import { about, hero } from "@/data/profile";

const aboutHeadline = "A long-running interest in computers turned into a career I care deeply about.";
const aboutSummary =
  "Today I build full-stack products, with the strongest pull toward frontend work and the craft of making software feel good to use.";
const aboutParagraphs = [
  "I have been drawn to computers for as long as I can remember. What started as early curiosity eventually turned into a serious commitment to building software, and that interest has only gotten stronger as I have grown into the work.",
  "I work across the stack, but interface work is what excites me most. I care about products that feel clear, polished, and intentional, while still understanding the systems underneath them, from APIs and auth to data flow and application structure.",
] as const;

const focusChips = [
  "Frontend engineering",
  "Full-stack architecture",
  "Applied AI",
  "Auth + data flow",
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

export function PortfolioAboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const education = about.education[0];
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const primaryImageY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [-18, 18]);
  const secondaryImageY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [20, -16]);
  const secondaryImageX = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [-8, 10]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="scroll-mt-[var(--section-scroll-offset)] px-6 py-[4.5rem] sm:px-8 sm:py-20 lg:px-14 lg:py-24 lg:pl-[12rem] lg:pr-16 xl:pl-[14rem]"
      aria-labelledby="about-title"
    >
      <div className="mx-auto w-full max-w-[92rem]">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.96fr)_minmax(24rem,1.04fr)] lg:items-center lg:gap-12">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.28 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
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

              <div className="relative min-h-[29rem] sm:min-h-[35rem] lg:min-h-[39rem]">
                <div className="absolute left-0 top-0 z-10 max-w-[12rem] cinematic-text-quaternary">
                  <p className="text-[0.66rem] font-medium uppercase tracking-[0.24em]">About</p>
                  <p className="mt-3 text-sm leading-6">
                    A quieter story about where the work started and what still keeps me invested in it.
                  </p>
                </div>

                <motion.div
                  style={prefersReducedMotion ? undefined : { y: primaryImageY }}
                  className="relative ml-auto h-[24rem] w-[78%] overflow-hidden rounded-[1.85rem] border border-[color:var(--cinematic-border)] bg-[color:var(--cinematic-surface-deep)] shadow-[var(--cinematic-shadow-strong)] sm:h-[29rem] lg:h-[33rem]"
                >
                  <img
                    src={aboutPic2}
                    alt={`${hero.name} after graduating college`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent p-4 sm:p-5">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[0.64rem] font-medium uppercase tracking-[0.18em] text-white/84 backdrop-blur-md">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                      NJIT · Spring 2025
                    </div>
                    <p className="mt-3 max-w-[18rem] text-sm leading-6 text-white/74">
                      The current chapter: sharpening engineering judgment while building the kind of product work I want to keep doing.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  style={prefersReducedMotion ? undefined : { x: secondaryImageX, y: secondaryImageY }}
                  className="absolute bottom-0 left-0 z-20 w-[48%] max-w-[16rem] overflow-hidden rounded-[1.45rem] border border-[color:var(--cinematic-border-strong)] bg-[color:var(--cinematic-surface-panel)] p-2 shadow-[var(--cinematic-shadow-panel)]"
                >
                  <div className="overflow-hidden rounded-[1.05rem] border border-[color:var(--cinematic-border)]">
                    <img
                      src={aboutPic1}
                      alt={`${hero.name} as a child using a computer`}
                      className="aspect-[4/5] h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="px-2 pb-1 pt-3">
                    <p className="text-[0.62rem] font-medium uppercase tracking-[0.2em] cinematic-text-quaternary">
                      Early curiosity
                    </p>
                    <p className="mt-1 text-sm leading-5.5 cinematic-text-secondary">
                      Long before this became a career, it was already something I kept coming back to.
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
            className="lg:pt-2"
          >
            <div className="max-w-3xl">
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
                className="mt-6 max-w-[18ch] text-[clamp(1.95rem,3.1vw,3.15rem)] font-light leading-[1.02] tracking-[0.01em] cinematic-text-primary"
              >
                {aboutHeadline}
              </h2>
              <p className="mt-5 max-w-2xl text-[1rem] leading-7 cinematic-text-secondary">
                {aboutSummary}
              </p>

              <div className="mt-6 max-w-[42rem] space-y-4 text-[0.97rem] leading-7 cinematic-text-tertiary">
                {aboutParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
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

            <div className="mt-8 grid gap-4 xl:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
              <div className="cinematic-subpanel rounded-[1.65rem] p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <span className="cinematic-chip-strong inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl">
                    <GraduationCap className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.66rem] font-medium uppercase tracking-[0.2em] cinematic-text-quaternary">
                      Education
                    </p>
                    <div className="mt-4 cinematic-chip rounded-[1.25rem] px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="cinematic-chip-strong flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl p-1.5">
                          <img
                            src={njitLogo}
                            alt="NJIT logo"
                            className="h-full w-full object-contain"
                            loading="lazy"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium leading-6 cinematic-text-primary">
                            {education.school}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-col gap-1.5 text-sm leading-6 cinematic-text-tertiary sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                        <p className="cinematic-text-secondary">{education.degree}</p>
                        <p className="text-sm sm:text-right">{education.graduation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="cinematic-subpanel rounded-[1.65rem] p-5 sm:p-6">
                <div>
                  <p className="text-[0.66rem] font-medium uppercase tracking-[0.2em] cinematic-text-quaternary">
                    Focus Areas
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {focusChips.map((chip) => (
                      <span key={chip} className="cinematic-chip rounded-full px-3 py-1.5 text-[0.72rem] uppercase tracking-[0.16em]">
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="cinematic-divider mt-5 h-px" />

                <div className="mt-5">
                  <p className="inline-flex items-center gap-2 text-[0.66rem] font-medium uppercase tracking-[0.2em] cinematic-text-quaternary">
                    <Sparkles className="h-3.5 w-3.5 cinematic-text-tertiary" aria-hidden="true" />
                    Core Strengths
                  </p>
                  <div className="mt-4 space-y-3">
                    {compactStrengths.map((strength) => (
                      <div key={strength.title} className="cinematic-chip rounded-[1.15rem] px-4 py-3">
                        <p className="text-sm font-medium cinematic-text-primary">{strength.title}</p>
                        <p className="mt-1 text-sm leading-6 cinematic-text-tertiary">
                          {strength.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
