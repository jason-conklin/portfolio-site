import { Github, Linkedin, Mail } from "lucide-react";

import { site } from "@/data/profile";
import { cn } from "@/lib/utils";

type HomeRailNavProps = {
  activeSection: "home" | "works" | "about" | "contact";
};

const railLinkClass =
  "relative inline-flex items-center pl-5 pb-2 text-[0.94rem] font-medium uppercase tracking-[0.24em] cinematic-text-quaternary transition-colors duration-300 ease-out hover:[color:var(--cinematic-text-primary)] focus-visible:outline-none focus-visible:[color:var(--cinematic-text-primary)] after:absolute after:bottom-0 after:left-5 after:right-[-0.3rem] after:h-[1.5px] after:origin-left after:scale-x-0 after:rounded-full after:opacity-0 after:transition-[transform,opacity] after:duration-300 after:ease-out after:[background:linear-gradient(90deg,var(--cinematic-text-primary)_0%,var(--cinematic-text-secondary)_72%,transparent_100%)] hover:after:scale-x-100 hover:after:opacity-100 focus-visible:after:scale-x-100 focus-visible:after:opacity-100";

const railIndicatorClass =
  "before:absolute before:left-0 before:top-[0.72rem] before:h-px before:w-0 before:bg-[color:var(--cinematic-divider)] before:transition-[width,background-color,opacity] before:duration-300 before:ease-out before:opacity-0 hover:before:w-8 hover:before:bg-[color:var(--cinematic-border-strong)] hover:before:opacity-100 focus-visible:before:w-8 focus-visible:before:bg-[color:var(--cinematic-border-strong)] focus-visible:before:opacity-100";

export function HomeRailNav({ activeSection }: HomeRailNavProps) {
  return (
    <>
      <aside className="pointer-events-none fixed inset-y-0 left-0 z-40 hidden w-[10.5rem] lg:block">
        <div className="pointer-events-auto flex h-full flex-col px-8 py-10">
          <div className="pt-[5.25rem]">
            <nav className="flex flex-col gap-3.5">
              <a
                href="#home"
                data-cursor-interactive="true"
                className={cn(
                  railLinkClass,
                  railIndicatorClass,
                  activeSection === "home"
                    ? "[color:var(--cinematic-text-primary)] before:w-0 before:opacity-0 after:scale-x-100 after:opacity-100"
                    : null,
                )}
              >
                Home
              </a>
              <a
                href="#works"
                data-cursor-interactive="true"
                className={cn(
                  railLinkClass,
                  railIndicatorClass,
                  activeSection === "works"
                    ? "[color:var(--cinematic-text-primary)] before:w-0 before:opacity-0 after:scale-x-100 after:opacity-100"
                    : null,
                )}
              >
                Works
              </a>
              <a
                href="#about"
                data-cursor-interactive="true"
                className={cn(
                  railLinkClass,
                  railIndicatorClass,
                  activeSection === "about"
                    ? "[color:var(--cinematic-text-primary)] before:w-0 before:opacity-0 after:scale-x-100 after:opacity-100"
                    : null,
                )}
              >
                About
              </a>
              <a
                href="#contact"
                data-cursor-interactive="true"
                className={cn(
                  railLinkClass,
                  railIndicatorClass,
                  activeSection === "contact"
                    ? "[color:var(--cinematic-text-primary)] before:w-0 before:opacity-0 after:scale-x-100 after:opacity-100"
                    : null,
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
                data-cursor-interactive="true"
                className="inline-flex h-7 w-7 items-center justify-center cinematic-text-tertiary transition duration-200 hover:[color:var(--cinematic-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--cinematic-focus-ring)]"
                aria-label="Open LinkedIn"
              >
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-interactive="true"
                className="inline-flex h-7 w-7 items-center justify-center cinematic-text-tertiary transition duration-200 hover:[color:var(--cinematic-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--cinematic-focus-ring)]"
                aria-label="Open GitHub"
              >
                <Github className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={`mailto:${site.links.email}`}
                data-cursor-interactive="true"
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
            data-cursor-interactive="true"
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
            data-cursor-interactive="true"
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
            data-cursor-interactive="true"
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
            data-cursor-interactive="true"
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
