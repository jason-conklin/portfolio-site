import type { CSSProperties } from "react";
import { ExternalLink, FileText } from "lucide-react";
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
      <div className="deployment-stage relative px-1 pb-1 pt-6 sm:px-0 sm:pt-7">
        <div
          aria-hidden="true"
          className="absolute inset-x-[-8vw] top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_68%,rgba(255,179,71,0.08),transparent_26%),radial-gradient(circle_at_86%_10%,rgba(255,107,32,0.12),transparent_22%)]"
        />
        <header className="relative flex flex-col gap-4 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2
              id="deployments-title"
              className="text-[1.95rem] font-light tracking-[0.01em] text-white sm:text-[2.2rem]"
            >
              Live Deployments
            </h2>
            <p className="mt-2 max-w-xl text-[0.98rem] leading-7 text-white/56">
              Real-world systems deployed and publicly accessible.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-[0.66rem] uppercase tracking-[0.16em] text-white/46">
              3 live deployments
            </span>
            <span className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-[0.66rem] uppercase tracking-[0.16em] text-white/46">
              Vercel + Supabase
            </span>
            <span className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-[0.66rem] uppercase tracking-[0.16em] text-white/46">
              Solo-built
            </span>
          </div>
        </header>

        <div className="relative grid gap-4 lg:grid-cols-3">
          {projects.map((project, index) => {
            const accent = accentStyles[project.slug] ?? accentStyles.applictus;
            const cardStyle = {
              "--deployment-rgb": accent.rgb,
              borderColor: `rgb(${accent.rgb} / 0.22)`,
              boxShadow: `0 0 0 1px rgb(${accent.rgb} / 0.08) inset, 0 18px 52px -36px rgb(${accent.rgb} / 0.42)`,
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
                className="deployment-card group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[1.4rem] border bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.018))] p-4 text-left backdrop-blur-xl transition duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/35 focus-visible:ring-offset-2 focus-visible:ring-offset-black/60 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-90"
                  style={{
                    background:
                      "linear-gradient(180deg, rgb(var(--deployment-rgb) / 0.14) 0%, transparent 28%), radial-gradient(circle at 10% 100%, rgb(var(--deployment-rgb) / 0.14), transparent 34%)",
                  }}
                />
                <span
                  aria-hidden="true"
                  className={`absolute inset-y-5 left-0 w-[2px] rounded-r-full ${accent.railClass}`}
                />

                <div className="relative flex h-full flex-col gap-4 pl-1.5">
                  <div className="rounded-[1.15rem] border border-white/10 bg-white/[0.03] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[0.95rem] border border-white/12 bg-black/35 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
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
                        <p className="text-[1.08rem] font-medium tracking-tight text-white">
                          {project.name}
                        </p>
                        <p className="mt-1 flex flex-wrap items-center gap-2 text-[0.68rem] uppercase tracking-[0.16em] text-white/42">
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

                  <p className="line-clamp-3 text-[0.95rem] leading-7 text-white/62">
                    {project.blurb}
                  </p>

                  <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="h-9 rounded-full border border-white/10 bg-black/18 px-3.5 text-[0.8rem] font-medium text-white shadow-none transition duration-200 hover:border-white/18 hover:bg-white/[0.06]"
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
                      className="h-9 rounded-full border border-white/8 bg-transparent px-3.5 text-[0.8rem] font-medium text-white/66 shadow-none transition duration-200 hover:border-white/16 hover:bg-white/[0.05] hover:text-white"
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
