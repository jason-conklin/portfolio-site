import { ArrowUpRight, GraduationCap, MapPin, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { about, skills } from "@/data/profile";

export function PortfolioAboutSection() {
  const education = about.education[0];

  return (
    <section
      id="about"
      className="scroll-mt-24 px-6 py-[4.5rem] sm:px-8 sm:py-20 lg:px-14 lg:py-24 lg:pl-[12rem] lg:pr-16 xl:pl-[14rem]"
      aria-labelledby="about-title"
    >
      <div className="mx-auto w-full max-w-[92rem]">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.85fr)] lg:gap-10">
          <div className="cinematic-panel rounded-[2rem] p-6 sm:p-8 lg:p-10">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] cinematic-text-quaternary">
              About
            </p>
            <h2
              id="about-title"
              className="mt-5 text-[clamp(2rem,3.5vw,3.2rem)] font-light tracking-[0.01em] cinematic-text-primary"
            >
              Production-minded engineering with clean systems thinking.
            </h2>

            <div className="mt-8 space-y-5 text-[1rem] leading-8 cinematic-text-tertiary">
              {about.bio.map((paragraph, paragraphIndex) => (
                <p key={`about-paragraph-${paragraphIndex}`}>
                  {paragraph.parts.map((part, partIndex) =>
                    "strong" in part && part.strong ? (
                      <strong
                        key={`about-paragraph-${paragraphIndex}-part-${partIndex}`}
                        className="font-semibold cinematic-text-primary"
                      >
                        {part.text}
                      </strong>
                    ) : (
                      <span key={`about-paragraph-${paragraphIndex}-part-${partIndex}`}>
                        {part.text}
                      </span>
                    ),
                  )}
                </p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-[0.76rem] uppercase tracking-[0.18em] cinematic-text-quaternary">
              <span className="cinematic-chip inline-flex items-center gap-2 rounded-full px-3.5 py-2">
                <MapPin className="h-3.5 w-3.5 cinematic-text-tertiary" aria-hidden="true" />
                {about.location}
              </span>
              <span className="cinematic-chip rounded-full px-3.5 py-2">
                B.S. Computer Science
              </span>
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

          <div className="space-y-6">
            <div className="cinematic-subpanel rounded-[1.75rem] p-6">
              <div className="flex items-start gap-3">
                <span className="cinematic-chip-strong inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl">
                  <GraduationCap className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-medium cinematic-text-primary">Education</h3>
                  <p className="mt-1 text-sm leading-6 cinematic-text-tertiary">
                    {education.school} · {education.degree} · {education.graduation}
                  </p>
                </div>
              </div>
            </div>

            <div className="cinematic-subpanel rounded-[1.75rem] p-6">
              <h3 className="text-lg font-medium cinematic-text-primary">Focus Areas</h3>
              <div className="mt-5 grid gap-3">
                {education.focusAreas.slice(0, 4).map((area) => (
                  <div
                    key={area.title}
                    className="cinematic-chip rounded-2xl px-4 py-3"
                  >
                    <p className="text-sm font-medium cinematic-text-primary">{area.title}</p>
                    <p className="mt-1 text-sm leading-6 cinematic-text-tertiary">{area.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="cinematic-subpanel rounded-[1.75rem] p-6">
              <div className="flex items-start gap-3">
                <span className="cinematic-chip-strong inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl">
                  <Sparkles className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-medium cinematic-text-primary">Core Strengths</h3>
                  <div className="mt-4 space-y-3">
                    {skills.coreStrengths.map((strength) => (
                      <div
                        key={strength.title}
                        className="cinematic-chip rounded-2xl px-4 py-3"
                      >
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
          </div>
        </div>
      </div>
    </section>
  );
}
