import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";

import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { navigation, site } from "@/data/profile";
import { cn } from "@/lib/utils";
import { CommandPalette } from "@/components/CommandPalette";
import logoLight from "@/assets/logo-light.png";
import logoDark from "@/assets/logo-dark.png";

export function Header() {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (isMenuOpen) {
      html.classList.add("overflow-hidden");
      body.classList.add("overflow-hidden");
    } else {
      html.classList.remove("overflow-hidden");
      body.classList.remove("overflow-hidden");
    }
    return () => {
      html.classList.remove("overflow-hidden");
      body.classList.remove("overflow-hidden");
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled ? "true" : "false"}
      className={cn(
        "fixed inset-x-0 top-0 z-[60] border-b border-border/60 bg-background/70 shadow-sm shadow-black/[0.04] backdrop-blur-md transition-all duration-300 supports-[backdrop-filter]:bg-background/60 dark:shadow-black/20",
        "data-[scrolled=true]:border-border/70 data-[scrolled=true]:bg-background/82 data-[scrolled=true]:shadow-md data-[scrolled=true]:shadow-black/[0.08] dark:data-[scrolled=true]:shadow-black/35",
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <CommandPalette />
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-semibold tracking-tight transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span
              aria-hidden="true"
              className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full shadow-soft"
            >
              <img
                src={logoLight}
                alt=""
                loading="eager"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover opacity-100 transition-opacity duration-200 ease-out dark:opacity-0"
              />
              <img
                src={logoDark}
                alt=""
                loading="eager"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-200 ease-out dark:opacity-100"
              />
            </span>
            <span className="sr-only sm:not-sr-only">Jason Conklin</span>
          </Link>
        </div>
        <nav className="hidden items-center gap-1 rounded-full border border-border/70 bg-background/65 p-1 shadow-sm ring-1 ring-border/50 backdrop-blur-md md:flex">
          {navigation.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === item.href
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  isActive
                    ? "bg-primary/15 text-foreground font-semibold ring-1 ring-border/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] dark:bg-white/10 dark:text-white dark:ring-white/10 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]"
                    : "text-foreground/70 hover:bg-muted/70 hover:text-foreground dark:text-foreground/70 dark:hover:bg-white/5 dark:hover:text-white",
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Button
            asChild
            className="hidden sm:inline-flex"
          >
            <a
              href={site.links.resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
          </Button>
          <ThemeToggle />
          <Button
            variant="ghost"
            className="h-12 w-12 px-0 md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((value) => !value)}
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </Button>
        </div>
      </div>
      {isMenuOpen ? (
        <nav className="border-t border-border/70 bg-background/95 shadow-lg md:hidden">
          <ul className="mx-auto flex w-full max-w-6xl flex-col gap-0 px-4 py-4 sm:px-6 lg:px-8">
            {navigation.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === item.href
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex w-full items-center rounded-xl px-3 py-2 text-sm font-semibold transition-colors duration-200 ease-out",
                      isActive
                        ? "bg-primary/15 text-foreground ring-1 ring-border/60 dark:bg-white/10 dark:text-white dark:ring-white/10"
                        : "text-foreground/70 hover:bg-muted hover:text-foreground dark:text-foreground/70 dark:hover:bg-white/5 dark:hover:text-white",
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
            <li className="mt-3">
              <Button asChild variant="secondary" className="w-full justify-between">
                <a
                  href={site.links.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume (PDF)
                  <span className="text-xs text-muted-foreground">opens in new tab</span>
                </a>
              </Button>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
