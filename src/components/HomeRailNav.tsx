import { Github, Linkedin, Mail } from "lucide-react";

import { site } from "@/data/profile";
import { cn } from "@/lib/utils";

type HomeRailNavProps = {
  activeSection: "home" | "works" | "about" | "contact";
};

const railLinkClass =
  "group relative inline-flex items-center pl-5 text-[0.94rem] font-medium uppercase tracking-[0.24em] cinematic-text-quaternary transition-colors duration-200 hover:[color:var(--cinematic-text-primary)] focus-visible:outline-none focus-visible:[color:var(--cinematic-text-primary)]";

const railIndicatorClass =
  "before:absolute before:left-0 before:top-1/2 before:h-px before:-translate-y-1/2 before:bg-[color:var(--cinematic-divider)] before:transition-[width,background-color] before:duration-200";

export function HomeRailNav({ activeSection }: HomeRailNavProps) {
  return (
    <>
      <aside className="pointer-events-none fixed inset-y-0 left-0 z-40 hidden w-[10.5rem] lg:block">
        <div className="pointer-events-auto flex h-full flex-col px-8 py-10">
          <div className="pt-[5.25rem]">
            <nav className="flex flex-col gap-3.5">
              <a
                href="#home"
                className={cn(
                  railLinkClass,
                  railIndicatorClass,
                  activeSection === "home"
                    ? "[color:var(--cinematic-text-primary)] underline decoration-[color:var(--cinematic-border-strong)] decoration-[1px] underline-offset-[0.45rem] before:w-16 before:bg-[color:var(--cinematic-border-strong)]"
                    : "before:w-0 group-hover:before:w-8 group-hover:before:bg-[color:var(--cinematic-border-strong)]",
                )}
              >
                Home
              </a>
              <a
                href="#works"
                className={cn(
                  railLinkClass,
                  railIndicatorClass,
                  activeSection === "works"
                    ? "[color:var(--cinematic-text-primary)] underline decoration-[color:var(--cinematic-border-strong)] decoration-[1px] underline-offset-[0.45rem] before:w-16 before:bg-[color:var(--cinematic-border-strong)]"
                    : "before:w-0 group-hover:before:w-8 group-hover:before:bg-[color:var(--cinematic-border-strong)]",
                )}
              >
                Works
              </a>
              <a
                href="#about"
                className={cn(
                  railLinkClass,
                  railIndicatorClass,
                  activeSection === "about"
                    ? "[color:var(--cinematic-text-primary)] underline decoration-[color:var(--cinematic-border-strong)] decoration-[1px] underline-offset-[0.45rem] before:w-16 before:bg-[color:var(--cinematic-border-strong)]"
                    : "before:w-0 group-hover:before:w-8 group-hover:before:bg-[color:var(--cinematic-border-strong)]",
                )}
              >
                About
              </a>
              <a
                href="#contact"
                className={cn(
                  railLinkClass,
                  railIndicatorClass,
                  activeSection === "contact"
                    ? "[color:var(--cinematic-text-primary)] underline decoration-[color:var(--cinematic-border-strong)] decoration-[1px] underline-offset-[0.45rem] before:w-16 before:bg-[color:var(--cinematic-border-strong)]"
                    : "before:w-0 group-hover:before:w-8 group-hover:before:bg-[color:var(--cinematic-border-strong)]",
                )}
              >
                Contact
              </a>
            </nav>

            <div className="mt-9 flex flex-col gap-4 pl-3">
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-7 w-7 items-center justify-center cinematic-text-tertiary transition duration-200 hover:[color:var(--cinematic-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--cinematic-focus-ring)]"
                aria-label="Open LinkedIn"
              >
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-7 w-7 items-center justify-center cinematic-text-tertiary transition duration-200 hover:[color:var(--cinematic-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--cinematic-focus-ring)]"
                aria-label="Open GitHub"
              >
                <Github className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={`mailto:${site.links.email}`}
                className="inline-flex h-7 w-7 items-center justify-center cinematic-text-tertiary transition duration-200 hover:[color:var(--cinematic-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--cinematic-focus-ring)]"
                aria-label="Send email"
              >
                <Mail className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </aside>

      <nav className="fixed inset-x-4 top-4 z-40 lg:hidden">
        <div className="cinematic-panel flex items-center justify-center gap-4 rounded-full px-4 py-2.5">
          <a
            href="#home"
            className={cn(
              "text-[0.62rem] font-medium uppercase tracking-[0.24em] transition-colors duration-200",
              activeSection === "home"
                ? "[color:var(--cinematic-text-primary)]"
                : "cinematic-text-tertiary",
            )}
          >
            Home
          </a>
          <a
            href="#works"
            className={cn(
              "text-[0.62rem] font-medium uppercase tracking-[0.24em] transition-colors duration-200",
              activeSection === "works"
                ? "[color:var(--cinematic-text-primary)]"
                : "cinematic-text-tertiary",
            )}
          >
            Works
          </a>
          <a
            href="#about"
            className={cn(
              "text-[0.62rem] font-medium uppercase tracking-[0.24em] transition-colors duration-200",
              activeSection === "about"
                ? "[color:var(--cinematic-text-primary)]"
                : "cinematic-text-tertiary hover:[color:var(--cinematic-text-primary)]",
            )}
          >
            About
          </a>
          <a
            href="#contact"
            className={cn(
              "text-[0.62rem] font-medium uppercase tracking-[0.24em] transition-colors duration-200",
              activeSection === "contact"
                ? "[color:var(--cinematic-text-primary)]"
                : "cinematic-text-tertiary hover:[color:var(--cinematic-text-primary)]",
            )}
          >
            Contact
          </a>
        </div>
      </nav>
    </>
  );
}
