import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
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

function updateCardCursorHighlight(event: ReactPointerEvent<HTMLElement>) {
  if (event.pointerType && event.pointerType !== "mouse") return;

  const rect = event.currentTarget.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;

  event.currentTarget.style.setProperty("--cursor-x", `${x.toFixed(2)}%`);
  event.currentTarget.style.setProperty("--cursor-y", `${y.toFixed(2)}%`);
}

function resetCardCursorHighlight(event: ReactPointerEvent<HTMLElement>) {
  event.currentTarget.style.setProperty("--cursor-x", "50%");
  event.currentTarget.style.setProperty("--cursor-y", "50%");
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
      <div className="deployment-stage relative px-1 pb-1 pt-3 sm:px-0 sm:pt-4">
        <div aria-hidden="true" className="cinematic-divider absolute inset-x-[-8vw] top-0 h-px" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 8% 68%, var(--cinematic-band-accent-a), transparent 26%), radial-gradient(circle at 86% 10%, var(--cinematic-band-accent-b), transparent 22%)",
          }}
        />
        <header className="relative flex flex-col gap-3 pb-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2
              id="deployments-title"
              className="text-[1.72rem] font-light tracking-[0.01em] cinematic-text-primary sm:text-[1.95rem]"
            >
              Live Deployments
            </h2>
            <p className="mt-1.5 max-w-xl text-[0.92rem] leading-6 cinematic-text-tertiary sm:text-[0.95rem]">
              Real-world systems deployed and publicly accessible.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 pt-0.5">
            <span className="cinematic-chip rounded-full px-2.5 py-1 text-[0.63rem] uppercase tracking-[0.16em]">
              3 live deployments
            </span>
            <span className="cinematic-chip rounded-full px-2.5 py-1 text-[0.63rem] uppercase tracking-[0.16em]">
              Solo-built
            </span>
          </div>
        </header>

        <div className="relative grid gap-3 lg:grid-cols-3">
          {projects.map((project, index) => {
            const accent = accentStyles[project.slug] ?? accentStyles.applictus;
            const cardStyle = {
              "--deployment-rgb": accent.rgb,
              "--cursor-x": "50%",
              "--cursor-y": "50%",
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
                data-cursor-interactive="true"
                onClick={(event) => {
                  const target = event.target as HTMLElement;
                  if (target.closest("a,button")) return;
                  onOpenProject(project.slug);
                }}
                onPointerMove={updateCardCursorHighlight}
                onPointerEnter={updateCardCursorHighlight}
                onPointerLeave={resetCardCursorHighlight}
                onKeyDown={(event) => {
                  const target = event.target as HTMLElement;
                  if (target.closest("a,button")) return;
                  if (event.key !== "Enter" && event.key !== " ") return;
                  event.preventDefault();
                  onOpenProject(project.slug);
                }}
                style={cardStyle}
                className="deployment-card group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[1.35rem] border p-3.5 text-left backdrop-blur-xl transition duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--cinematic-focus-ring)] focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-90"
                  style={{
                    background:
                      "linear-gradient(180deg, rgb(var(--deployment-rgb) / 0.14) 0%, transparent 28%), radial-gradient(circle at 10% 100%, rgb(var(--deployment-rgb) / 0.14), transparent 34%)",
                  }}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-[1px] rounded-[calc(1.35rem-1px)] opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-focus-within:opacity-100"
                  style={{
                    background:
                      "radial-gradient(240px circle at var(--cursor-x) var(--cursor-y), rgb(var(--deployment-rgb) / 0.14), transparent 58%)",
                  }}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[1.35rem] opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-focus-within:opacity-100"
                  style={{
                    padding: "1px",
                    background:
                      "radial-gradient(180px circle at var(--cursor-x) var(--cursor-y), rgb(var(--deployment-rgb) / 0.72), rgb(var(--deployment-rgb) / 0.18) 22%, transparent 56%)",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />
                <span
                  aria-hidden="true"
                  className={`absolute inset-y-5 left-0 w-[2px] rounded-r-full ${accent.railClass}`}
                />

                <div className="relative flex h-full flex-col gap-3 pl-1">
                  <div className="cinematic-subpanel rounded-[1.05rem] p-2.5">
                    <div className="flex items-start gap-3">
                      <div className="cinematic-chip-strong flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[0.9rem] p-1.5">
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
                        <p className="text-[1rem] font-medium tracking-tight cinematic-text-primary">
                          {project.name}
                        </p>
                        <p className="mt-1 flex flex-wrap items-center gap-1.5 text-[0.64rem] uppercase tracking-[0.15em] cinematic-text-quaternary">
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

                  <p className="line-clamp-2 text-[0.88rem] leading-6 cinematic-text-tertiary">
                    {project.blurb}
                  </p>

                  <div className="mt-auto flex flex-wrap items-center gap-2 pt-0.5">
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="cinematic-btn-ghost h-8 rounded-full px-3 text-[0.76rem] font-medium"
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
                      className="cinematic-btn-ghost h-8 rounded-full px-3 text-[0.76rem] font-medium"
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
