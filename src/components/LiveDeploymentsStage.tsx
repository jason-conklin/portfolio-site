import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { ExternalLink, FileText } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { useMobileViewport } from "@/lib/use-mobile-viewport";

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

const accentStyles: Record<
  string,
  { rgb: string; railClass: string; iconShellStyle?: CSSProperties }
> = {
  "giftperch-recipient-profiles": {
    rgb: "245 158 11",
    railClass: "bg-amber-400/85",
  },
  applictus: {
    rgb: "249 115 22",
    railClass: "bg-orange-400/85",
    iconShellStyle: {
      background: "rgba(255, 255, 255, 0.96)",
      borderColor: "rgba(255, 255, 255, 0.72)",
      boxShadow: "0 8px 22px -18px rgba(255, 255, 255, 0.44)",
    },
  },
  "statestats-data-explorer": {
    rgb: "56 189 248",
    railClass: "bg-sky-400/80",
    iconShellStyle: {
      background: "rgba(255, 255, 255, 0.96)",
      borderColor: "rgba(255, 255, 255, 0.72)",
      boxShadow: "0 8px 22px -18px rgba(255, 255, 255, 0.44)",
    },
  },
};

const liveDeploymentCardRects = new WeakMap<HTMLElement, DOMRect>();

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

  const target = event.currentTarget;
  let rect = liveDeploymentCardRects.get(target);

  if (!rect) {
    rect = target.getBoundingClientRect();
    liveDeploymentCardRects.set(target, rect);
  }

  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;

  target.style.setProperty("--cursor-x", `${x.toFixed(2)}%`);
  target.style.setProperty("--cursor-y", `${y.toFixed(2)}%`);
}

function primeCardCursorHighlight(event: ReactPointerEvent<HTMLElement>) {
  liveDeploymentCardRects.set(event.currentTarget, event.currentTarget.getBoundingClientRect());
  updateCardCursorHighlight(event);
}

function resetCardCursorHighlight(event: ReactPointerEvent<HTMLElement>) {
  liveDeploymentCardRects.delete(event.currentTarget);
  event.currentTarget.style.setProperty("--cursor-x", "50%");
  event.currentTarget.style.setProperty("--cursor-y", "50%");
}

function openLiveDeployment(url: string) {
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.click();
}

export function LiveDeploymentsStage({
  projects,
  onOpenProject,
  prefersReducedMotion,
}: LiveDeploymentsStageProps) {
  const isMobileViewport = useMobileViewport();
  const shouldAnimateEntrance = !prefersReducedMotion && !isMobileViewport;

  return (
    <motion.section
      id="deployments"
      initial={shouldAnimateEntrance ? { opacity: 0, y: 26 } : false}
      whileInView={shouldAnimateEntrance ? { opacity: 1, y: 0 } : undefined}
      viewport={shouldAnimateEntrance ? { once: true, amount: 0.28 } : undefined}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="relative isolate"
      aria-labelledby="deployments-title"
    >
      <div className="deployment-stage relative px-1 pb-0.5 pt-2 sm:px-0 sm:pt-3">
        <div aria-hidden="true" className="cinematic-divider absolute inset-x-[-8vw] top-0 h-px" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[-12%] -top-16 -bottom-14 opacity-80 blur-2xl"
          style={{
            background:
              "radial-gradient(circle at 88% 12%, rgba(255, 182, 82, 0.22) 0%, rgba(255, 114, 28, 0.12) 20%, transparent 44%), radial-gradient(circle at 82% 74%, rgba(255, 124, 40, 0.11) 0%, transparent 34%), radial-gradient(circle at 26% 20%, rgba(255, 241, 218, 0.035) 0%, transparent 22%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.01) 20%, transparent 42%), radial-gradient(circle at 92% 18%, rgba(255, 184, 88, 0.1) 0%, transparent 26%)",
          }}
        />
        <header className="relative flex flex-col gap-2.5 pb-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2
              id="deployments-title"
              className="text-[1.58rem] font-light tracking-[0.01em] cinematic-text-primary sm:text-[1.82rem]"
            >
              Live Deployments
            </h2>
            <p className="mt-1 max-w-xl text-[0.88rem] leading-5.5 cinematic-text-tertiary sm:text-[0.92rem] sm:leading-6">
              Real-world systems I’ve built and deployed, publicly accessible.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            <span className="cinematic-chip rounded-full px-2.5 py-0.5 text-[0.62rem] uppercase tracking-[0.16em]">
              3 live deployments
            </span>
            <span className="cinematic-chip rounded-full px-2.5 py-0.5 text-[0.62rem] uppercase tracking-[0.16em]">
              Solo-built
            </span>
          </div>
        </header>

        <div className="relative grid gap-2.5 lg:grid-cols-3">
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
                initial={shouldAnimateEntrance ? { opacity: 0, y: 18 } : false}
                whileInView={shouldAnimateEntrance ? { opacity: 1, y: 0 } : undefined}
                viewport={shouldAnimateEntrance ? { once: true, amount: 0.35 } : undefined}
                transition={{
                  duration: 0.45,
                  ease: "easeOut",
                  delay: shouldAnimateEntrance ? index * 0.07 : 0,
                }}
                role="link"
                tabIndex={0}
                aria-label={`Open ${project.name} live site`}
                data-cursor-interactive="true"
                onClick={(event) => {
                  const target = event.target as HTMLElement;
                  if (target.closest("a,button")) return;
                  openLiveDeployment(project.liveUrl);
                }}
                onPointerMove={updateCardCursorHighlight}
                onPointerEnter={primeCardCursorHighlight}
                onPointerLeave={resetCardCursorHighlight}
                onKeyDown={(event) => {
                  const target = event.target as HTMLElement;
                  if (target.closest("a,button")) return;
                  if (event.key !== "Enter" && event.key !== " ") return;
                  event.preventDefault();
                  openLiveDeployment(project.liveUrl);
                }}
                style={cardStyle}
                className="deployment-card group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[1.35rem] border p-3 text-left backdrop-blur-xl transition duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--cinematic-focus-ring)] focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
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
                  className={`absolute inset-y-4 left-0 w-[2px] rounded-r-full ${accent.railClass}`}
                />

                <div className="relative flex h-full flex-col gap-2.5 pl-1">
                  <div className="cinematic-subpanel rounded-[1.05rem] p-2.5">
                    <div className="flex items-start gap-3">
                      <div
                        className="cinematic-chip-strong flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[0.9rem] p-1.5"
                        style={accent.iconShellStyle}
                      >
                        {project.icon ? (
                          <img
                            src={project.icon}
                            alt={`${project.name} logo`}
                            className="h-full w-full object-contain"
                            loading="eager"
                          />
                        ) : null}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[0.96rem] font-medium tracking-tight cinematic-text-primary">
                          {project.name}
                        </p>
                        <p className="mt-1 flex flex-wrap items-center gap-1.5 text-[0.64rem] uppercase tracking-[0.15em] cinematic-text-quaternary">
                          <span className="inline-flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 motion-safe:animate-pulse motion-reduce:animate-none" aria-hidden="true" />
                            Live
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="truncate underline-offset-4 decoration-[color:var(--cinematic-text-secondary)] transition-[color,text-decoration-color] duration-300 group-hover:[color:var(--cinematic-text-secondary)] group-hover:underline group-focus-within:[color:var(--cinematic-text-secondary)] group-focus-within:underline">
                            {getProjectDomain(project.liveUrl)}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>Solo</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="line-clamp-2 text-[0.84rem] leading-5.5 cinematic-text-tertiary">
                    {project.blurb}
                  </p>

                  <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-0.5">
                    <Button
                      asChild
                      size="sm"
                      className="cinematic-btn-primary h-8 rounded-full px-3 text-[0.74rem] font-medium hover:-translate-y-px"
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
                      className="cinematic-btn-ghost h-8 rounded-full px-3 text-[0.74rem] font-medium"
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
