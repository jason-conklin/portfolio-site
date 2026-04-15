import { Link } from "react-router-dom";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useId,
  type RefObject,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { createPortal } from "react-dom";
import {
  ExternalLink,
  Github,
  ArrowUpRight,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { motion, useReducedMotion, type MotionProps } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Tag } from "@/components/Tag";
import { ThemedIconCSS } from "@/components/ThemedIconCSS";
import { cn } from "@/lib/utils";
import { getProjectCardTint } from "@/lib/project-card-tint";
import peopleIconLight from "@/assets/people_icon_light.png";
import peopleIconDark from "@/assets/people_icon_dark.png";
import placeholder from "@/assets/placeholder.png";


const FOCUSABLE_ELEMENTS_SELECTOR = [
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

let activeModalCount = 0;
let previousOverflow: string | null = null;
let headerDisableCount = 0;

function useModalEffects(
  open: boolean,
  options: { disableHeaderPointerEvents?: boolean } = {},
) {
  useEffect(() => {
    if (!open || typeof document === "undefined") return;

    const body = document.body;
    const root = document.getElementById("app-root");
    activeModalCount += 1;

    if (activeModalCount === 1) {
      previousOverflow = body.style.overflow || null;
      body.style.overflow = "hidden";
    }

    if (options.disableHeaderPointerEvents) {
      headerDisableCount += 1;
      if (root) {
        root.setAttribute("data-modal-open", "true");
      }
    }

    return () => {
      activeModalCount = Math.max(0, activeModalCount - 1);
      if (activeModalCount === 0) {
        if (previousOverflow !== null) {
          body.style.overflow = previousOverflow;
          previousOverflow = null;
        } else {
          body.style.removeProperty("overflow");
        }
      }

      if (options.disableHeaderPointerEvents) {
        headerDisableCount = Math.max(0, headerDisableCount - 1);
        if (headerDisableCount === 0 && root) {
          root.removeAttribute("data-modal-open");
        }
      }
    };
  }, [open, options.disableHeaderPointerEvents]);
}

function useDialogFocusTrap(
  open: boolean,
  containerRef: RefObject<HTMLElement>,
  onClose: () => void,
  initialFocusRef?: RefObject<HTMLElement>,
) {
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open || typeof document === "undefined") return;

    const container = containerRef.current;
    if (!container) return;

    previousFocusRef.current =
      (document.activeElement as HTMLElement | null) ?? null;

    const getFocusable = () =>
      Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS_SELECTOR),
      ).filter(
        (element) =>
          !element.hasAttribute("disabled") &&
          element.getAttribute("aria-hidden") !== "true" &&
          element.tabIndex !== -1,
      );

    const focusTarget =
      initialFocusRef?.current ?? getFocusable()[0] ?? container;

    if (focusTarget) {
      focusTarget.focus({ preventScroll: true });
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getFocusable();
      if (focusable.length === 0) {
        event.preventDefault();
        container.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (!event.shiftKey) {
        if (active === last) {
          event.preventDefault();
          first.focus();
        }
      } else if (active === first) {
        event.preventDefault();
        last.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      const previous = previousFocusRef.current;
      if (previous && typeof previous.focus === "function") {
        previous.focus({ preventScroll: true });
      }
    };
  }, [open, containerRef, onClose, initialFocusRef]);
}

interface Project {
  title: string;
  slug: string;
  logo?: string;
  cardSummary?: string;
  cardHighlights?: readonly string[];
  summary: string;
  highlights: readonly string[];
  tech: readonly string[];
  githubUrl?: string;
  liveUrl?: string;
  status?: "live" | "code-only" | "wip" | "prototype" | "local-run";
  featured?: boolean;
  category?: readonly string[];
  statusNote?: string;
  gallery?: readonly {
    title: string;
    description: string;
    image?: string;
    alt?: string;
  }[];
  teamSize?: number;
}

interface ProjectCardProps {
  project: Project;
  variant?: "default" | "compact";
}

function getProjectName(title: string) {
  return title.split(/\s[–-]\s/)[0]?.trim() || title;
}

function getProjectMonogram(projectName: string) {
  const condensed = projectName.replace(/[^A-Za-z0-9]/g, "");
  const uppercaseChars = condensed.match(/[A-Z0-9]/g);
  if (uppercaseChars && uppercaseChars.length >= 2) {
    return `${uppercaseChars[0]}${uppercaseChars[1]}`;
  }

  const words = projectName.split(/[^A-Za-z0-9]+/).filter(Boolean);
  if (words.length >= 2) {
    return words
      .slice(0, 2)
      .map((word) => word[0]!.toUpperCase())
      .join("");
  }

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return "PR";
}

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

const nonLiveStatusLabels = {
  "code-only": "Code only",
  wip: "WIP",
  prototype: "Prototype",
  "local-run": "Local run",
} as const;

type NonLiveProjectStatus = keyof typeof nonLiveStatusLabels;

function normalizeNonLiveStatus(status?: Project["status"]): NonLiveProjectStatus | undefined {
  if (!status || status === "live") return undefined;
  return status;
}

export function ProjectCard({ project, variant = "default" }: ProjectCardProps) {
  const {
    title,
    logo,
    cardSummary,
    cardHighlights,
    summary,
    highlights,
    tech,
    githubUrl,
    liveUrl,
    status,
    category,
    gallery,
    teamSize,
    slug,
  } = project;
  const cardTintClass = getProjectCardTint(category);
  const safeGallery = useMemo(
    () =>
      gallery && gallery.length > 0
        ? gallery
        : [
            {
              title: "Coming soon",
              description: "Screenshots will be added soon.",
              image: placeholder,
              alt: "Placeholder screenshot",
            },
          ],
    [gallery],
  );
  const prefersReducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [activeMediaIndex, setActiveMediaIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [transformOrigin, setTransformOrigin] = useState("50% 50%");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef({
    isPointerDown: false,
    startX: 0,
    startY: 0,
    baseX: 0,
    baseY: 0,
    moved: false,
    activatedZoom: false,
    pointerId: undefined as number | undefined,
  });
  const detailDialogRef = useRef<HTMLDivElement | null>(null);
  const detailCloseButtonRef = useRef<HTMLButtonElement | null>(null);
  const screenshotDialogRef = useRef<HTMLDivElement | null>(null);
  const screenshotCloseButtonRef = useRef<HTMLButtonElement | null>(null);
  const ZOOM_SCALE = 2;
  const hasTeamSize = typeof teamSize === "number" && teamSize > 0;
  const isPrivateRepo =
    typeof githubUrl === "string" &&
    githubUrl.trim().startsWith("(Private repository");
  const hasLiveUrl = Boolean(liveUrl && liveUrl.trim().length > 0);
  const hasRepoUrl = Boolean(githubUrl && githubUrl.trim().length > 0);
  const projectName = getProjectName(title);
  const projectMonogram = getProjectMonogram(projectName);
  const cardHighlightItems = (cardHighlights?.length ? cardHighlights : highlights).slice(0, 2);
  const teamSizeLabel = hasTeamSize ? (teamSize === 1 ? "Solo" : `Team of ${teamSize}`) : null;
  const liveDomain = hasLiveUrl && liveUrl ? getProjectDomain(liveUrl) : null;
  const resolvedStatus = hasLiveUrl
    ? "live"
    : normalizeNonLiveStatus(status) ?? "code-only";
  const statusLine =
    resolvedStatus === "live"
      ? `Live • ${liveDomain ?? "Production"}`
      : nonLiveStatusLabels[resolvedStatus];
  const statusDotClass =
    resolvedStatus === "live" ? "bg-emerald-500/75" : "bg-muted-foreground/60";
  const quickFactsStack = tech.slice(0, 3);
  const compactCategories = (category ?? []).slice(0, 2);
  const compactTech = tech.slice(0, 3);
  const quickStatusLabel =
    resolvedStatus === "live" ? "Live" : nonLiveStatusLabels[resolvedStatus];

  const resetZoomState = useCallback(() => {
    if (dragRef.current.pointerId !== undefined && containerRef.current) {
      try {
        containerRef.current.releasePointerCapture(dragRef.current.pointerId);
      } catch {
        // no-op if pointer capture was already released
      }
    }
    setIsZoomed(false);
    setIsDragging(false);
    setTranslate({ x: 0, y: 0 });
    setTransformOrigin("50% 50%");
    const state = dragRef.current;
    state.isPointerDown = false;
    state.moved = false;
    state.activatedZoom = false;
    state.pointerId = undefined;
  }, []);

  const activeMedia =
    safeGallery && activeMediaIndex !== null ? safeGallery[activeMediaIndex] : null;
  const totalMedia = safeGallery?.length ?? 0;
  const activeMediaNumber =
    activeMediaIndex !== null ? activeMediaIndex + 1 : null;
  const detailTitleId = useId();
  const detailDescriptionId = useId();
  const screenshotTitleId = useId();
  const screenshotDescriptionId = useId();

  const goToMedia = useCallback(
    (direction: number) => {
      if (!totalMedia) return;
      resetZoomState();
      setActiveMediaIndex((prev) => {
        if (prev === null) return prev;
        return (prev + direction + totalMedia) % totalMedia;
      });
    },
    [resetZoomState, totalMedia],
  );

  const openMediaAt = useCallback(
    (index: number) => {
      if (!safeGallery || !safeGallery.length) return;
      resetZoomState();
      setActiveMediaIndex(index);
    },
    [safeGallery, resetZoomState],
  );

  useEffect(() => {
    if (activeMediaIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToMedia(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToMedia(-1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeMediaIndex, goToMedia]);

  const animation = useMemo<MotionProps>(
    () =>
      prefersReducedMotion
        ? {}
        : {
            initial: { opacity: 0, translateY: 24 },
            whileInView: { opacity: 1, translateY: 0 },
            viewport: { once: true, amount: 0.2 },
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          },
    [prefersReducedMotion],
  );

  const closeDetailModal = useCallback(() => {
    setOpen(false);
    setActiveMediaIndex(null);
    resetZoomState();
  }, [resetZoomState, setOpen, setActiveMediaIndex]);

  const closeScreenshotModal = useCallback(() => {
    resetZoomState();
    setActiveMediaIndex(null);
  }, [resetZoomState, setActiveMediaIndex]);

  useModalEffects(open, { disableHeaderPointerEvents: true });
  useModalEffects(Boolean(activeMedia));
  useDialogFocusTrap(open, detailDialogRef, closeDetailModal, detailCloseButtonRef);
  useDialogFocusTrap(
    Boolean(activeMedia),
    screenshotDialogRef,
    closeScreenshotModal,
    screenshotCloseButtonRef,
  );

  const handleDetailBackdropClick = useCallback(
    (event: ReactMouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        closeDetailModal();
      }
    },
    [closeDetailModal],
  );

  const handleScreenshotBackdropClick = useCallback(
    (event: ReactMouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        closeScreenshotModal();
      }
    },
    [closeScreenshotModal],
  );


  const detailModal =
    open && typeof document !== "undefined"
      ? createPortal(
          <div className="fixed inset-0 z-[90]">
            <div
              aria-hidden="true"
              className="absolute inset-0 z-[80] bg-black/72 backdrop-blur-md"
              onClick={closeDetailModal}
            />
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div
              className="absolute inset-0 z-[90] flex items-center justify-center px-4 py-6 sm:px-6"
              onMouseDown={handleDetailBackdropClick}
            >
              <div
                ref={detailDialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={detailTitleId}
                aria-describedby={detailDescriptionId}
                tabIndex={-1}
                className="cinematic-panel-strong relative mx-auto flex max-h-[min(92vh,940px)] w-full max-w-5xl flex-col overflow-hidden rounded-3xl text-left ring-1 ring-[color:var(--cinematic-border)] focus:outline-none"
              >
                <div className="flex-1 overflow-y-auto">
                  <header className="cinematic-subpanel sticky top-0 z-20 rounded-none border-x-0 border-t-0 backdrop-blur-xl">
                    <div className="px-6 py-4 sm:px-8 sm:py-5">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex min-w-0 items-start gap-3">
                          <div className="cinematic-chip-strong flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl p-1.5 sm:h-[44px] sm:w-[44px]">
                            {logo ? (
                              <img
                                src={logo}
                                alt={`${projectName} logo`}
                                className="h-full w-full object-contain"
                                loading="lazy"
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="text-xs font-semibold uppercase tracking-wide cinematic-text-tertiary"
                              >
                                {projectMonogram}
                              </span>
                            )}
                          </div>
                          <div className="min-w-0">
                            <h2
                              id={detailTitleId}
                              className="text-2xl font-semibold tracking-tight cinematic-text-primary"
                            >
                              {title}
                            </h2>
                            <p
                              id={detailDescriptionId}
                              className="mt-1 text-sm line-clamp-2 cinematic-text-tertiary"
                            >
                              {cardSummary ?? summary}
                            </p>
                          </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                          {hasLiveUrl ? (
                            <Button
                              asChild
                              size="sm"
                              className="cinematic-btn-primary h-9 min-h-9 px-3"
                            >
                              <a href={liveUrl!} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                                Live site
                              </a>
                            </Button>
                          ) : null}
                          {hasRepoUrl ? (
                            isPrivateRepo ? (
                              <Button
                                asChild
                                variant="ghost"
                                size="sm"
                                className="cinematic-btn-ghost h-9 min-h-9 px-3"
                              >
                                <Link to="/#contact">
                                  <Github className="h-4 w-4" aria-hidden="true" />
                                  Private repo
                                </Link>
                              </Button>
                            ) : (
                              <Button
                                asChild
                                variant="ghost"
                                size="sm"
                                className="cinematic-btn-ghost h-9 min-h-9 px-3"
                              >
                                <a href={githubUrl!} target="_blank" rel="noopener noreferrer">
                                  <Github className="h-4 w-4" aria-hidden="true" />
                                  Code
                                </a>
                              </Button>
                            )
                          ) : null}
                          <button
                            ref={detailCloseButtonRef}
                            type="button"
                            onClick={closeDetailModal}
                            className="cinematic-btn-ghost inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full p-0 cinematic-text-tertiary hover:[color:var(--cinematic-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--cinematic-focus-ring)] focus-visible:ring-offset-2"
                            aria-label="Close project details"
                          >
                            <X className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </header>

                  <div className="space-y-8 px-6 py-6 sm:px-8">
                    <section
                      aria-label="Quick facts"
                      className="cinematic-subpanel rounded-2xl p-3 sm:p-4"
                    >
                      <ul className="flex flex-wrap gap-2">
                        <li className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                          Status: {quickStatusLabel}
                        </li>
                        {teamSizeLabel ? (
                          <li className="cinematic-chip inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs">
                            <ThemedIconCSS
                              lightThemeSrc={peopleIconDark}
                              darkThemeSrc={peopleIconLight}
                              alt=""
                              className="h-3.5 w-3.5 opacity-80 dark:opacity-90"
                            />
                            {teamSizeLabel}
                          </li>
                        ) : null}
                        {quickFactsStack.length ? (
                          <li className="cinematic-chip inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs">
                            <span className="font-medium cinematic-text-secondary">Stack:</span>{" "}
                            {quickFactsStack.join(" · ")}
                          </li>
                        ) : null}
                        {hasLiveUrl ? (
                          <li>
                            <a
                              href={liveUrl!}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="cinematic-chip inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs transition hover:[color:var(--cinematic-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--cinematic-focus-ring)] focus-visible:ring-offset-2"
                            >
                              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                              Live site
                            </a>
                          </li>
                        ) : null}
                        {hasRepoUrl ? (
                          <li>
                            {isPrivateRepo ? (
                              <Link
                                to="/#contact"
                                className="cinematic-chip inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs transition hover:[color:var(--cinematic-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--cinematic-focus-ring)] focus-visible:ring-offset-2"
                              >
                                <Github className="h-3.5 w-3.5" aria-hidden="true" />
                                Repo: private
                              </Link>
                            ) : (
                              <a
                                href={githubUrl!}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cinematic-chip inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs transition hover:[color:var(--cinematic-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--cinematic-focus-ring)] focus-visible:ring-offset-2"
                              >
                                <Github className="h-3.5 w-3.5" aria-hidden="true" />
                                Repo link
                              </a>
                            )}
                          </li>
                        ) : null}
                      </ul>
                    </section>

                    {safeGallery && safeGallery.length ? (
                      <section>
                        <h3 className="text-base font-semibold tracking-tight cinematic-text-primary">
                          Screenshots
                        </h3>
                        <div className="mt-4 grid gap-6 md:grid-cols-2">
                          {safeGallery.map((item, index) => (
                            <article key={`${item.title}-${index}`} className="space-y-2.5">
                              <div>
                                <p className="text-sm font-semibold cinematic-text-primary">{item.title}</p>
                                <p className="mt-1 text-xs line-clamp-1 cinematic-text-tertiary">
                                  {item.description}
                                </p>
                              </div>
                              {item.image ? (
                                <button
                                  type="button"
                                  onClick={() => openMediaAt(index)}
                                  className="cinematic-subpanel group relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-2xl shadow-sm transition hover:[border-color:var(--cinematic-border-strong)] hover:shadow-[var(--cinematic-shadow-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--cinematic-focus-ring)] focus-visible:ring-offset-2"
                                  aria-label={`View ${item.title} in fullscreen`}
                                >
                                  <img
                                    src={item.image}
                                    alt={item.alt ?? `${item.title} screenshot`}
                                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                                    loading="lazy"
                                  />
                                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/28 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                                    <span className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm [border-color:var(--cinematic-border-strong)] [background:rgba(10,12,16,0.55)]">
                                      <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                                      Expand
                                    </span>
                                  </span>
                                </button>
                              ) : (
                                <div className="cinematic-subpanel relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-2xl border border-dashed">
                                  <span className="text-xs font-medium uppercase tracking-wide cinematic-text-tertiary">
                                    Image coming soon
                                  </span>
                                </div>
                              )}
                            </article>
                          ))}
                        </div>
                      </section>
                    ) : null}

                    <section>
                      <h3 className="text-base font-semibold tracking-tight cinematic-text-primary">
                        Highlights
                      </h3>
                      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm cinematic-text-secondary">
                        {highlights.map((highlight) => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-base font-semibold tracking-tight cinematic-text-primary">Tech</h3>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {tech.map((stack) => (
                          <Tag
                            key={stack}
                            className="cinematic-chip border-[color:var(--cinematic-border)] bg-transparent hover:[border-color:var(--cinematic-border-strong)] hover:[color:var(--cinematic-text-primary)]"
                          >
                            {stack}
                          </Tag>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  const screenshotModal =
    activeMedia && typeof document !== "undefined"
      ? createPortal(
          <div className="fixed inset-0 z-[95]">
            <div
              aria-hidden="true"
              className="absolute inset-0 z-[82] bg-black/72 backdrop-blur-md"
              onClick={closeScreenshotModal}
            />
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div
              className="absolute inset-0 z-[95] flex items-center justify-center px-4 py-8 sm:px-8"
              onMouseDown={handleScreenshotBackdropClick}
            >
              <div
                ref={screenshotDialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={screenshotTitleId}
                aria-describedby={screenshotDescriptionId}
                tabIndex={-1}
                className="cinematic-panel-strong relative flex max-h-[95vh] w-full max-w-6xl flex-col gap-4 rounded-2xl p-4 text-left ring-1 ring-[color:var(--cinematic-border)] focus:outline-none sm:p-6"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-1">
                    {activeMediaNumber !== null && totalMedia > 0 ? (
                      <p className="text-xs font-semibold uppercase tracking-wide cinematic-text-quaternary">
                        Screenshot {activeMediaNumber} of {totalMedia}
                      </p>
                    ) : null}
                    <h3
                      id={screenshotTitleId}
                      className="text-lg font-semibold cinematic-text-primary"
                    >
                      {activeMedia.title}
                    </h3>
                    <p
                      id={screenshotDescriptionId}
                      className="text-sm cinematic-text-tertiary"
                    >
                      {activeMedia.description}
                    </p>
                  </div>
                  <button
                    ref={screenshotCloseButtonRef}
                    type="button"
                    onClick={closeScreenshotModal}
                    className="cinematic-btn-ghost ml-auto inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full p-0 cinematic-text-tertiary hover:[color:var(--cinematic-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--cinematic-focus-ring)] focus-visible:ring-offset-2"
                    aria-label="Close screenshot viewer"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
                <div
                  ref={containerRef}
                  className={cn(
                    "cinematic-subpanel relative max-h-[90vh] overflow-hidden rounded-2xl",
                    isZoomed
                      ? isDragging
                        ? "cursor-grabbing"
                        : "cursor-grab"
                      : "cursor-zoom-in",
                  )}
                  onPointerDown={(event) => {
                    const state = dragRef.current;
                    state.pointerId = event.pointerId;
                    state.moved = false;

                    if (!isZoomed) {
                      state.activatedZoom = true;
                      if (containerRef.current) {
                        const rect = containerRef.current.getBoundingClientRect();
                        const originX = ((event.clientX - rect.left) / rect.width) * 100;
                        const originY = ((event.clientY - rect.top) / rect.height) * 100;
                        setTransformOrigin(`${originX}% ${originY}%`);
                      }
                      setTranslate({ x: 0, y: 0 });
                      setIsZoomed(true);
                    } else {
                      state.activatedZoom = false;
                      state.isPointerDown = true;
                      state.startX = event.clientX;
                      state.startY = event.clientY;
                      state.baseX = translate.x;
                      state.baseY = translate.y;
                      containerRef.current?.setPointerCapture(event.pointerId);
                      event.preventDefault();
                    }
                  }}
                  onPointerMove={(event) => {
                    const state = dragRef.current;
                    if (!state.isPointerDown) return;

                    const deltaX = event.clientX - state.startX;
                    const deltaY = event.clientY - state.startY;

                    if (!state.moved) {
                      if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
                        state.moved = true;
                        setIsDragging(true);
                      }
                    }

                    if (state.moved) {
                      setTranslate({
                        x: state.baseX + deltaX,
                        y: state.baseY + deltaY,
                      });
                    }

                    event.preventDefault();
                  }}
                  onPointerUp={() => {
                    const state = dragRef.current;
                    if (state.isPointerDown) {
                      if (state.pointerId !== undefined) {
                        containerRef.current?.releasePointerCapture(state.pointerId);
                        state.pointerId = undefined;
                      }
                      if (!state.moved) {
                        resetZoomState();
                      } else {
                        state.isPointerDown = false;
                        state.moved = false;
                        setIsDragging(false);
                      }
                      return;
                    }

                    if (state.activatedZoom) {
                      state.activatedZoom = false;
                    }
                  }}
                  onPointerLeave={() => {
                    const state = dragRef.current;
                    if (state.isPointerDown) {
                      state.isPointerDown = false;
                      state.moved = false;
                      setIsDragging(false);
                      if (state.pointerId !== undefined) {
                        containerRef.current?.releasePointerCapture(state.pointerId);
                      }
                      state.pointerId = undefined;
                    }
                  }}
                >
                  <div className="relative flex h-full w-full items-center justify-center px-8 sm:px-12 lg:px-16">
                    {totalMedia > 1 ? (
                      <>
                        <button
                          type="button"
                          className="cinematic-btn-ghost absolute left-2 top-1/2 z-30 -translate-y-1/2 rounded-full p-2 cinematic-text-secondary shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:[color:var(--cinematic-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--cinematic-focus-ring)] focus-visible:ring-offset-2 sm:left-4 lg:left-6"
                          onClick={(event) => {
                            event.stopPropagation();
                            goToMedia(-1);
                          }}
                          onPointerDown={(event) => event.stopPropagation()}
                          aria-label="View previous screenshot"
                        >
                          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          className="cinematic-btn-ghost absolute right-2 top-1/2 z-30 -translate-y-1/2 rounded-full p-2 cinematic-text-secondary shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:[color:var(--cinematic-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--cinematic-focus-ring)] focus-visible:ring-offset-2 sm:right-4 lg:right-6"
                          onClick={(event) => {
                            event.stopPropagation();
                            goToMedia(1);
                          }}
                          onPointerDown={(event) => event.stopPropagation()}
                          aria-label="View next screenshot"
                        >
                          <ChevronRight className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </>
                    ) : null}
                    <div
                      ref={containerRef}
                      className={cn(
                        "cinematic-subpanel relative flex max-h-[90vh] w-full items-center justify-center overflow-hidden rounded-2xl",
                        isZoomed
                          ? isDragging
                            ? "cursor-grabbing"
                            : "cursor-grab"
                          : "cursor-zoom-in",
                      )}
                      onPointerDown={(event) => {
                        const state = dragRef.current;
                        state.pointerId = event.pointerId;
                        state.moved = false;

                        if (!isZoomed) {
                          state.activatedZoom = true;
                          if (containerRef.current) {
                            const rect = containerRef.current.getBoundingClientRect();
                            const originX = ((event.clientX - rect.left) / rect.width) * 100;
                            const originY = ((event.clientY - rect.top) / rect.height) * 100;
                            setTransformOrigin(`${originX}% ${originY}%`);
                          }
                          setTranslate({ x: 0, y: 0 });
                          setIsZoomed(true);
                        } else {
                          state.activatedZoom = false;
                          state.isPointerDown = true;
                          state.startX = event.clientX;
                          state.startY = event.clientY;
                          state.baseX = translate.x;
                          state.baseY = translate.y;
                          containerRef.current?.setPointerCapture(event.pointerId);
                          event.preventDefault();
                        }
                      }}
                      onPointerMove={(event) => {
                        const state = dragRef.current;
                        if (!state.isPointerDown) return;

                        const deltaX = event.clientX - state.startX;
                        const deltaY = event.clientY - state.startY;

                        if (!state.moved) {
                          if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
                            state.moved = true;
                            setIsDragging(true);
                          }
                        }

                        if (state.moved) {
                          setTranslate({
                            x: state.baseX + deltaX,
                            y: state.baseY + deltaY,
                          });
                        }

                        event.preventDefault();
                      }}
                      onPointerUp={() => {
                        const state = dragRef.current;
                        if (state.isPointerDown) {
                          if (state.pointerId !== undefined) {
                            containerRef.current?.releasePointerCapture(state.pointerId);
                            state.pointerId = undefined;
                          }
                          if (!state.moved) {
                            resetZoomState();
                          } else {
                            state.isPointerDown = false;
                            state.moved = false;
                            setIsDragging(false);
                          }
                          return;
                        }

                        if (state.activatedZoom) {
                          state.activatedZoom = false;
                        }
                      }}
                      onPointerLeave={() => {
                        const state = dragRef.current;
                        if (state.isPointerDown) {
                          state.isPointerDown = false;
                          state.moved = false;
                          setIsDragging(false);
                          if (state.pointerId !== undefined) {
                            containerRef.current?.releasePointerCapture(state.pointerId);
                          }
                          state.pointerId = undefined;
                        }
                      }}
                    >
                      {activeMedia?.image ? (
                        <img
                          src={activeMedia.image}
                          alt={activeMedia.alt ?? activeMedia.title}
                          className="select-none"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "90vh",
                            transformOrigin,
                            transform: `translate(${translate.x}px, ${translate.y}px) scale(${isZoomed ? ZOOM_SCALE : 1})`,
                            transition: isDragging ? "none" : "transform 0.3s ease",
                            cursor: isZoomed
                              ? isDragging
                                ? "grabbing"
                                : "zoom-out"
                              : "zoom-in",
                            touchAction: "none",
                          }}
                          draggable={false}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  if (variant === "compact") {
    return (
      <>
        <motion.article
          {...animation}
          role="button"
          tabIndex={0}
          aria-label={`Open ${title} details`}
          data-project-slug={slug}
          data-cursor-interactive="true"
          onClick={() => setOpen(true)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              setOpen(true);
            }
          }}
          className={cn(
            "group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[1.6rem] border p-5 text-left shadow-[var(--cinematic-shadow-soft)] ring-1 ring-[color:var(--cinematic-border)] backdrop-blur-xl transition duration-300 motion-reduce:transition-none",
            cardTintClass,
            "hover:-translate-y-1 hover:border-[color:var(--cinematic-border-strong)] hover:shadow-[var(--cinematic-shadow-panel)] hover:ring-[color:var(--cinematic-border-strong)] motion-reduce:hover:translate-y-0",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--cinematic-focus-ring)] focus-visible:ring-offset-2",
          )}
          style={{ background: "var(--cinematic-surface-panel)" }}
        >
          <div
            aria-hidden="true"
            className="cinematic-divider pointer-events-none absolute inset-x-6 top-0 h-px"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-80"
            style={{
              background:
                "radial-gradient(circle at 12% 0%, var(--cinematic-band-accent-a), transparent 24%), radial-gradient(circle at 100% 100%, var(--cinematic-band-accent-b), transparent 26%)",
            }}
          />

          <div className="relative z-10 flex h-full flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className="cinematic-chip-strong flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl p-1.5">
                {logo ? (
                  <img
                    src={logo}
                    alt={`${projectName} logo`}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="text-xs font-semibold uppercase tracking-[0.18em] cinematic-text-tertiary"
                  >
                    {projectMonogram}
                  </span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex min-w-0 flex-wrap items-center gap-2">
                  <h3 className="min-w-0 text-[1.05rem] font-medium tracking-tight cinematic-text-primary">
                    {projectName}
                  </h3>
                  {teamSizeLabel ? (
                    <span className="cinematic-chip inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.16em]">
                      <ThemedIconCSS
                        lightThemeSrc={peopleIconDark}
                        darkThemeSrc={peopleIconLight}
                        alt=""
                        className="h-3 w-3 opacity-80 dark:opacity-90"
                      />
                      {teamSizeLabel}
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 flex flex-wrap items-center gap-2 text-[0.66rem] uppercase tracking-[0.16em] cinematic-text-quaternary">
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className={cn("h-1.5 w-1.5 rounded-full", statusDotClass)}
                      aria-hidden="true"
                    />
                    {quickStatusLabel}
                  </span>
                  {liveDomain ? (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="truncate">{liveDomain}</span>
                    </>
                  ) : null}
                  {compactCategories.length ? (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{compactCategories.join(" / ")}</span>
                    </>
                  ) : null}
                </p>
              </div>
            </div>

            <p className="line-clamp-3 text-sm leading-6 cinematic-text-tertiary">
              {cardSummary ?? summary}
            </p>

            <div className="flex flex-wrap gap-2">
              {compactTech.map((stack) => (
                <span
                  key={`${slug}-compact-tech-${stack}`}
                  className="cinematic-chip rounded-full px-2.5 py-1 text-[0.68rem]"
                >
                  {stack}
                </span>
              ))}
            </div>

            <div className="mt-auto flex flex-wrap gap-2 pt-1">
              <Button
                type="button"
                size="sm"
                className="cinematic-btn-primary h-9 rounded-full px-4 text-[0.8rem] hover:-translate-y-px"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setOpen(true);
                }}
              >
                View details
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Button>

              {hasLiveUrl ? (
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="cinematic-btn-ghost h-9 rounded-full px-4 text-[0.8rem] font-medium"
                  onClick={(event) => event.stopPropagation()}
                >
                  <a href={liveUrl!} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    Open live
                  </a>
                </Button>
              ) : null}

              {githubUrl ? (
                isPrivateRepo ? (
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="cinematic-btn-ghost h-9 rounded-full px-4 text-[0.8rem] font-medium"
                  >
                    <Link
                      to="/#contact"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <Github className="h-3.5 w-3.5" aria-hidden="true" />
                      Private repo
                    </Link>
                  </Button>
                ) : (
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="cinematic-btn-ghost h-9 rounded-full px-4 text-[0.8rem] font-medium"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-3.5 w-3.5" aria-hidden="true" />
                      Code
                    </a>
                  </Button>
                )
              ) : null}
            </div>
          </div>
        </motion.article>
        {detailModal}
        {screenshotModal}
      </>
    );
  }

  return (
    <>
      <motion.article
        {...animation}
        role="button"
        tabIndex={0}
        aria-label={`Open ${title} details`}
        data-project-slug={slug}
        data-cursor-interactive="true"
        onClick={() => setOpen(true)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setOpen(true);
          }
        }}
        className={cn(
          "group relative flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-border/60 p-6 shadow-md ring-1 ring-border/50 transition-all duration-200 motion-reduce:transition-none",
          cardTintClass,
          "hover:-translate-y-0.5 hover:border-border/90 hover:shadow-lg hover:shadow-primary/12 hover:ring-border/70 motion-reduce:hover:translate-y-0",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-within:ring-2 focus-within:ring-primary/25",
        )}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 bg-card/80 backdrop-blur-[2px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-6 top-0 z-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
        />

        <div className="relative z-10 flex flex-col gap-3.5">
          <div className="space-y-3">
            <div className="relative overflow-hidden rounded-xl border border-border/55 bg-background/65 px-3 py-2.5 ring-1 ring-border/45">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-primary/[0.2] via-primary/[0.09] to-transparent opacity-85 transition-opacity duration-200 group-hover:opacity-100 motion-reduce:transition-none dark:from-primary/[0.32] dark:via-primary/[0.14]"
              />
              <div className="relative flex min-w-0 items-start gap-2.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-background/60 p-1 transition-all duration-200 group-hover:-translate-y-px group-hover:border-border/80 group-hover:bg-background/80 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 sm:h-11 sm:w-11 sm:p-1.5">
                  {logo ? (
                    <img
                      src={logo}
                      alt={`${projectName} logo`}
                      className="h-full w-full object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                    >
                      {projectMonogram}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="min-w-0 text-xl font-semibold tracking-tight">{title}</h3>
                  {teamSizeLabel ? (
                    <div className="mt-1 flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
                      <ThemedIconCSS
                        lightThemeSrc={peopleIconDark}
                        darkThemeSrc={peopleIconLight}
                        alt=""
                        className="h-3.5 w-3.5 opacity-80 dark:opacity-90"
                      />
                      <span>{teamSizeLabel}</span>
                    </div>
                  ) : null}
                  {statusLine ? (
                    <p className="mt-1 inline-flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
                      <span
                        className={cn("h-1.5 w-1.5 shrink-0 rounded-full", statusDotClass)}
                        aria-hidden="true"
                      />
                      <span className="truncate">{statusLine}</span>
                    </p>
                  ) : null}
                </div>
              </div>
              <div aria-hidden="true" className="relative mt-2 border-t border-border/40" />
            </div>

            <p className="text-sm leading-relaxed text-foreground/80 line-clamp-2">
              {cardSummary ?? summary}
            </p>

            {cardHighlightItems.length ? (
              <ul className="space-y-1">
                {cardHighlightItems.map((item, index) => (
                  <li
                    key={`${slug}-highlight-${index}`}
                    className="flex items-start gap-1.5 text-xs text-muted-foreground"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.38rem] h-1 w-1 shrink-0 rounded-full bg-muted-foreground/70"
                    />
                    <span className="line-clamp-1">{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
        <footer className="relative z-10 mt-4 flex flex-col gap-3 border-t border-border/40 pt-4">
          <div className="rounded-xl border border-border/45 bg-muted/30 p-3">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Stack
            </p>
            <div className="max-h-[3.8rem] overflow-hidden">
              <div className="flex flex-wrap gap-2">
                {tech.map((stack) => (
                  <Tag key={stack}>{stack}</Tag>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              type="button"
              variant={hasLiveUrl ? "soft" : "default"}
              size="sm"
              className="h-10 min-h-10 w-full"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setOpen(true);
              }}
            >
              View details
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            {githubUrl ? (
              isPrivateRepo ? (
                <Button
                  asChild
                  variant="secondary"
                  size="sm"
                  className="h-10 min-h-10 w-full text-left"
                >
                  <Link
                    to="/#contact"
                    onClick={(event) => event.stopPropagation()}
                    className="flex items-center gap-2"
                  >
                    <Github className="h-4 w-4" aria-hidden="true" />
                    Private repository
                  </Link>
                </Button>
              ) : (
                <Button
                  asChild
                  variant="secondary"
                  size="sm"
                  className="h-10 min-h-10 w-full"
                  onClick={(event) => event.stopPropagation()}
                >
                  <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" aria-hidden="true" />
                    Code
                  </a>
                </Button>
              )
            ) : null}
          </div>
          {hasLiveUrl ? (
            <Button
              asChild
              size="sm"
              className="h-10 min-h-10 w-full shadow-sm hover:shadow-md"
              onClick={(event) => event.stopPropagation()}
            >
              <a href={liveUrl!} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 inline h-4 w-4" aria-hidden="true" />
                Live site
              </a>
            </Button>
          ) : null}
        </footer>
      </motion.article>
      {detailModal}
      {screenshotModal}
    </>
  );

}
