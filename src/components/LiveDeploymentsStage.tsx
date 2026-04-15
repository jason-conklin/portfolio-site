import type { CSSProperties } from "react";
import { ExternalLink, FileText, Globe2 } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

type LiveProject = {
  name: string;
  blurb: string;
  liveUrl: string;
  slug: string;
  icon?: string;
};

type LiveDeploymentsStageProps = {
  projects: readonly LiveProject[];
  onOpenProject: (slug?: string) => void;
  prefersReducedMotion: boolean;
};

const accentStyles: Record<string, { rgb: string; railClass: string }> = {
  "giftperch-recipient-profiles": {
    rgb: "245 158 11",
    railClass: "bg-amber-400/85",
  },
  applictus: {
    rgb: "249 115 22",
    railClass: "bg-orange-400/85",
  },
  "statestats-data-explorer": {
    rgb: "56 189 248",
    railClass: "bg-sky-400/80",
  },
};

function getProjectDomain(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .replace(/\/.*$/, "");
  }
}

export function LiveDeploymentsStage({
  projects,
  onOpenProject,
  prefersReducedMotion,
}: LiveDeploymentsStageProps) {
  return (
    <motion.section
      id="deployments"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 26 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="relative isolate"
      aria-labelledby="deployments-title"
    >
      <div className="deployment-stage relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_24px_80px_-46px_rgba(0,0,0,0.8)] backdrop-blur-2xl sm:p-7 lg:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_0%,rgba(255,214,170,0.08),transparent_32%),radial-gradient(circle_at_84%_18%,rgba(255,111,0,0.12),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0)_28%,rgba(255,255,255,0.02)_100%)]"
        />
        <header className="relative flex flex-col gap-5 border-b border-white/10 pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-2 inline-flex items-center gap-2 text-[0.68rem] font-medium uppercase tracking-[0.28em] text-white/46">
              <span className="h-px w-8 bg-gradient-to-r from-amber-400/90 to-transparent" aria-hidden="true" />
              Live Deployments
            </p>
            <h2
              id="deployments-title"
              className="inline-flex items-center gap-3 text-2xl font-light tracking-[0.04em] text-white sm:text-[2rem]"
            >
              <Globe2 className="h-5 w-5 text-amber-300/90" aria-hidden="true" />
              Shipped Systems Running in Public
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-white/60 sm:text-[0.96rem]">
              Production products with real users, live infrastructure, and polished interaction design.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.16em] text-white/55">
              3 live deployments
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.16em] text-white/55">
              Vercel + Supabase
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.16em] text-white/55">
              Solo-built
            </span>
          </div>
        </header>

        <div className="relative mt-6 grid gap-4 lg:grid-cols-3">
          {projects.map((project, index) => {
            const accent = accentStyles[project.slug] ?? accentStyles.applictus;
            const cardStyle = {
              "--deployment-rgb": accent.rgb,
            } as CSSProperties;

            return (
              <motion.article
                key={project.slug}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: 0.45,
                  ease: "easeOut",
                  delay: prefersReducedMotion ? 0 : index * 0.07,
                }}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${project.name}`}
                onClick={(event) => {
                  const target = event.target as HTMLElement;
                  if (target.closest("a,button")) return;
                  onOpenProject(project.slug);
                }}
                onKeyDown={(event) => {
                  const target = event.target as HTMLElement;
                  if (target.closest("a,button")) return;
                  if (event.key !== "Enter" && event.key !== " ") return;
                  event.preventDefault();
                  onOpenProject(project.slug);
                }}
                style={cardStyle}
                className="deployment-card group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/22 p-4 text-left transition duration-300 hover:-translate-y-1 hover:border-white/16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/35 focus-visible:ring-offset-2 focus-visible:ring-offset-black/60 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-90"
                  style={{
                    background:
                      "linear-gradient(180deg, rgb(var(--deployment-rgb) / 0.12) 0%, transparent 34%), radial-gradient(circle at 0% 100%, rgb(var(--deployment-rgb) / 0.12), transparent 36%)",
                  }}
                />
                <span
                  aria-hidden="true"
                  className={`absolute inset-y-6 left-0 w-[3px] rounded-r-full ${accent.railClass}`}
                />

                <div className="relative flex h-full flex-col gap-4 pl-1.5">
                  <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                    <div className="flex items-start gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[1rem] border border-white/12 bg-black/35 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                        {project.icon ? (
                          <img
                            src={project.icon}
                            alt={`${project.name} logo`}
                            className="h-full w-full object-contain"
                            loading="lazy"
                          />
                        ) : null}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-lg font-medium tracking-tight text-white">
                          {project.name}
                        </p>
                        <p className="mt-1 flex flex-wrap items-center gap-2 text-[0.72rem] uppercase tracking-[0.16em] text-white/46">
                          <span className="inline-flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 motion-safe:animate-pulse motion-reduce:animate-none" aria-hidden="true" />
                            Live
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="truncate">{getProjectDomain(project.liveUrl)}</span>
                          <span aria-hidden="true">·</span>
                          <span>Solo</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="line-clamp-3 text-[0.98rem] leading-7 text-white/64">
                    {project.blurb}
                  </p>

                  <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="h-9 rounded-full border border-white/12 bg-white/[0.05] px-3.5 text-[0.82rem] font-medium text-white shadow-none transition duration-200 hover:border-white/18 hover:bg-white/[0.09]"
                    >
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        Open live
                      </a>
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => onOpenProject(project.slug)}
                      className="h-9 rounded-full border border-white/10 bg-transparent px-3.5 text-[0.82rem] font-medium text-white/70 shadow-none transition duration-200 hover:border-white/16 hover:bg-white/[0.05] hover:text-white"
                    >
                      <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                      View Details
                    </Button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
