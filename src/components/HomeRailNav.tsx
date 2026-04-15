import { Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

import { site } from "@/data/profile";
import { cn } from "@/lib/utils";

type HomeRailNavProps = {
  activeSection: "home" | "works";
};

const railLinkClass =
  "group relative inline-flex items-center pl-4 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-white/52 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:text-white";

const railIndicatorClass =
  "before:absolute before:left-0 before:top-1/2 before:h-px before:-translate-y-1/2 before:bg-white/30 before:transition-[width,background-color] before:duration-200";

export function HomeRailNav({ activeSection }: HomeRailNavProps) {
  return (
    <>
      <aside className="pointer-events-none fixed inset-y-0 left-0 z-40 hidden w-[8.5rem] lg:block">
        <div className="pointer-events-auto flex h-full flex-col justify-between px-8 py-10">
          <nav className="flex flex-col gap-4 pt-16">
            <a
              href="#home"
              className={cn(
                railLinkClass,
                railIndicatorClass,
                activeSection === "home"
                  ? "text-white before:w-9 before:bg-white/55"
                  : "before:w-0 group-hover:before:w-7 group-hover:before:bg-white/32",
              )}
            >
              Home
            </a>
            <a
              href="#deployments"
              className={cn(
                railLinkClass,
                railIndicatorClass,
                activeSection === "works"
                  ? "text-white before:w-9 before:bg-white/55"
                  : "before:w-0 group-hover:before:w-7 group-hover:before:bg-white/32",
              )}
            >
              Works
            </a>
            <Link
              to="/about"
              className={cn(
                railLinkClass,
                railIndicatorClass,
                "before:w-0 group-hover:before:w-7 group-hover:before:bg-white/32",
              )}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={cn(
                railLinkClass,
                railIndicatorClass,
                "before:w-0 group-hover:before:w-7 group-hover:before:bg-white/32",
              )}
            >
              Contact
            </Link>
          </nav>

          <div className="flex flex-col gap-4">
            <div className="h-px w-12 bg-white/12" aria-hidden="true" />
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/55 transition duration-200 hover:border-white/20 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              aria-label="Open LinkedIn"
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={site.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/55 transition duration-200 hover:border-white/20 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              aria-label="Open GitHub"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={`mailto:${site.links.email}`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/55 transition duration-200 hover:border-white/20 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              aria-label="Send email"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </aside>

      <nav className="fixed inset-x-4 top-4 z-40 lg:hidden">
        <div className="flex items-center justify-center gap-4 rounded-full border border-white/10 bg-black/35 px-4 py-2.5 backdrop-blur-xl">
          <a
            href="#home"
            className={cn(
              "text-[0.62rem] font-medium uppercase tracking-[0.24em] transition-colors duration-200",
              activeSection === "home" ? "text-white" : "text-white/52",
            )}
          >
            Home
          </a>
          <a
            href="#deployments"
            className={cn(
              "text-[0.62rem] font-medium uppercase tracking-[0.24em] transition-colors duration-200",
              activeSection === "works" ? "text-white" : "text-white/52",
            )}
          >
            Works
          </a>
          <Link to="/about" className="text-[0.62rem] font-medium uppercase tracking-[0.24em] text-white/52 transition-colors duration-200 hover:text-white">
            About
          </Link>
          <Link to="/contact" className="text-[0.62rem] font-medium uppercase tracking-[0.24em] text-white/52 transition-colors duration-200 hover:text-white">
            Contact
          </Link>
        </div>
      </nav>
    </>
  );
}
