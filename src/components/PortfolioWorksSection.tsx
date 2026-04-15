import type { ComponentProps } from "react";
import { BriefcaseBusiness } from "lucide-react";

import { ProjectsGrid } from "@/components/ProjectsGrid";

type Project = ComponentProps<typeof ProjectsGrid>["projects"][number];

type PortfolioWorksSectionProps = {
  projects: readonly Project[];
};

export function PortfolioWorksSection({
  projects,
}: PortfolioWorksSectionProps) {
  return (
    <section
      id="works"
      className="scroll-mt-[var(--section-scroll-offset)] px-6 pb-[4.5rem] pt-8 sm:px-8 sm:pb-20 sm:pt-10 lg:px-14 lg:pb-24 lg:pl-[12rem] lg:pr-16 lg:pt-12 xl:pl-[14rem]"
      aria-labelledby="works-title"
    >
      <div className="mx-auto w-full max-w-[92rem]" data-section-anchor="works">
        <div className="cinematic-panel-strong relative overflow-hidden rounded-[2rem] px-5 py-8 sm:px-7 sm:py-10 lg:px-10 lg:py-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 8% 0%, var(--cinematic-band-accent-a), transparent 22%), radial-gradient(circle at 100% 100%, var(--cinematic-band-accent-b), transparent 28%)",
            }}
          />
          <div aria-hidden="true" className="cinematic-divider pointer-events-none absolute inset-x-0 top-0 h-px" />

          <div className="relative z-10">
            <header>
              <p className="inline-flex items-center gap-2 text-[0.68rem] font-medium uppercase tracking-[0.28em] cinematic-text-quaternary">
                <BriefcaseBusiness className="h-3.5 w-3.5 cinematic-text-tertiary" aria-hidden="true" />
                Works
              </p>
              <h2
                id="works-title"
                className="mt-5 text-[clamp(2.1rem,4vw,3.6rem)] font-light tracking-[0.01em] cinematic-text-primary"
              >
                Full project index across infrastructure, product engineering, and applied AI.
              </h2>
              <p className="mt-4 text-[1rem] leading-7 cinematic-text-tertiary">
                The live deployment band now sits in the hero. This section stays compact and scan-friendly
                while preserving deeper detail in the project modal.
              </p>
            </header>

            <div className="mt-10 border-t pt-10" style={{ borderColor: "var(--cinematic-border)" }}>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] cinematic-text-quaternary">
                    Full Index
                  </p>
                  <h3 className="mt-3 text-[1.6rem] font-light tracking-[0.01em] cinematic-text-primary">
                    Additional builds across infrastructure, evaluation, and product engineering.
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2 text-[0.68rem] uppercase tracking-[0.16em]">
                  <span className="cinematic-chip rounded-full px-3 py-1.5">
                    {projects.length} total projects
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <ProjectsGrid
                  projects={projects}
                  variant="compact"
                  className="items-stretch"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
