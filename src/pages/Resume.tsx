import { ArrowLeft, ArrowUpRight, Download, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

import { PageSEO } from "@/app/seo";
import { CinematicEnergyBackground } from "@/components/CinematicEnergyBackground";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { about, hero } from "@/data/profile";

function ResumePage() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const resumeUrl = about.resumeUrl;

  return (
    <>
      <PageSEO
        path="/resume"
        title="Resume | Jason Conklin"
        description="Preview or download Jason Conklin's resume in a focused document view."
      />

      <div className="home-cinematic-page cinematic-page relative isolate min-h-[100svh] overflow-hidden">
        <CinematicEnergyBackground />

        <div
          className="pointer-events-none fixed inset-x-0 top-0 z-20 h-28"
          style={{ background: "var(--cinematic-top-fade)" }}
        />

        <main className="relative z-10 px-6 pb-10 pt-20 sm:px-8 sm:pb-12 lg:px-14 lg:pb-12 lg:pt-8">
          <div className="mx-auto w-full max-w-[92rem]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Button
                asChild
                variant="ghost"
                className="cinematic-btn-ghost h-10 min-h-10 rounded-full px-4 text-sm font-medium"
              >
                <Link to="/#about">
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Back to Portfolio
                </Link>
              </Button>

              <ThemeToggle
                compact
                className="cinematic-btn-ghost h-10 min-h-10 rounded-full px-3.5"
                labelClassName="cinematic-text-tertiary uppercase tracking-[0.16em]"
              />
            </div>

            <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(18rem,24rem)_minmax(0,1fr)] xl:gap-8">
              <motion.aside
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="cinematic-panel-strong relative h-fit overflow-hidden rounded-[2rem] p-6 sm:p-7 xl:sticky xl:top-8"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 0% 0%, var(--cinematic-band-accent-a), transparent 28%), radial-gradient(circle at 100% 100%, var(--cinematic-band-accent-b), transparent 24%)",
                  }}
                />
                <div
                  aria-hidden="true"
                  className="cinematic-divider pointer-events-none absolute inset-x-0 top-0 h-px"
                />

                <div className="relative z-10">
                  <p className="inline-flex items-center gap-2 text-[0.68rem] font-medium uppercase tracking-[0.28em] cinematic-text-quaternary">
                    <FileText className="h-3.5 w-3.5 cinematic-text-tertiary" aria-hidden="true" />
                    Resume
                  </p>
                  <h1 className="mt-5 text-[clamp(2rem,3vw,3.1rem)] font-light tracking-[0.01em] cinematic-text-primary">
                    Focused resume preview.
                  </h1>
                  <p className="mt-4 text-[1rem] leading-7 cinematic-text-tertiary">
                    Preview or download a clean copy of my resume without leaving the current portfolio theme.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button
                      asChild
                      className="cinematic-btn-primary h-11 rounded-full px-5 text-sm hover:-translate-y-px"
                      aria-label="Download Jason Conklin resume as PDF"
                    >
                      <a href={resumeUrl} download="Jason-Conklin-Resume.pdf">
                        <Download className="h-4 w-4" aria-hidden="true" />
                        Download PDF
                      </a>
                    </Button>

                    <Button
                      asChild
                      variant="ghost"
                      className="cinematic-btn-ghost h-11 rounded-full px-5 text-sm hover:-translate-y-px"
                    >
                      <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        Open in new tab
                      </a>
                    </Button>
                  </div>

                  <div className="mt-8 space-y-3">
                    <div className="cinematic-chip rounded-[1.25rem] px-4 py-3.5">
                      <p className="text-[0.66rem] font-medium uppercase tracking-[0.18em] cinematic-text-quaternary">
                        Document
                      </p>
                      <p className="mt-2 text-sm leading-6 cinematic-text-secondary">
                        One-page focused route for quick review, sharing, and download.
                      </p>
                    </div>
                    <div className="cinematic-chip rounded-[1.25rem] px-4 py-3.5">
                      <p className="text-[0.66rem] font-medium uppercase tracking-[0.18em] cinematic-text-quaternary">
                        Best use
                      </p>
                      <p className="mt-2 text-sm leading-6 cinematic-text-secondary">
                        Recruiters and hiring managers can scan the preview here, then jump back into the portfolio for deeper project context.
                      </p>
                    </div>
                  </div>

                  <p className="mt-8 text-sm leading-6 cinematic-text-quaternary">
                    Can&apos;t view the embed in your browser? Use the download action above or open the PDF directly in a new tab.
                  </p>
                </div>
              </motion.aside>

              <motion.section
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.68, ease: "easeOut", delay: prefersReducedMotion ? 0 : 0.06 }}
                aria-labelledby="resume-preview-title"
              >
                <div className="cinematic-panel-strong relative overflow-hidden rounded-[2rem] p-3 sm:p-4 lg:p-5">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.03), transparent 18%), radial-gradient(circle at 100% 0%, var(--cinematic-band-accent-a), transparent 22%)",
                    }}
                  />
                  <div
                    aria-hidden="true"
                    className="cinematic-divider pointer-events-none absolute inset-x-0 top-0 h-px"
                  />

                  <div className="relative z-10">
                    <div className="flex flex-col gap-3 border-b pb-4 sm:flex-row sm:items-end sm:justify-between" style={{ borderColor: "var(--cinematic-border)" }}>
                      <div>
                        <p className="text-[0.66rem] font-medium uppercase tracking-[0.18em] cinematic-text-quaternary">
                          Preview
                        </p>
                        <h2
                          id="resume-preview-title"
                          className="mt-2 text-[1.35rem] font-medium tracking-[0.01em] cinematic-text-primary"
                        >
                          {hero.name} — Resume PDF
                        </h2>
                      </div>
                      <p className="text-sm cinematic-text-tertiary">
                        Embedded preview inside the current portfolio system.
                      </p>
                    </div>

                    <div className="mt-4 overflow-hidden rounded-[1.5rem] border border-[color:var(--cinematic-border)] bg-[color:var(--cinematic-surface-deep)] shadow-[var(--cinematic-shadow-panel)]">
                      <iframe
                        title="Jason Conklin resume PDF preview"
                        src={`${resumeUrl}#view=fitH`}
                        className="h-[78svh] min-h-[44rem] w-full bg-white"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </motion.section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default ResumePage;
