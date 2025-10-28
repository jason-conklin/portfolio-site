import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";

import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { navigation, site } from "@/data/profile";
import { cn } from "@/lib/utils";
import { CommandPalette } from "@/components/CommandPalette";
import logoMark from "@/assets/logo.png";

export function Header() {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 backdrop-blur-lg">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <CommandPalette />
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-semibold tracking-tight transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <img
              src={logoMark}
              alt="Jason Conklin monogram"
              className="h-10 w-10 rounded-full object-cover shadow-soft"
            />
            <span className="hidden sm:inline">Jason Conklin</span>
          </Link>
        </div>
        <nav className="hidden items-center gap-1 rounded-full border border-border/70 bg-background/60 p-1 shadow-sm md:flex">
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
                  "rounded-full px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
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
            className="hidden rounded-full px-4 sm:inline-flex"
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
            className="h-10 w-10 px-0 md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((value) => !value)}
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
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
                      "flex w-full items-center rounded-xl px-3 py-2 text-sm font-semibold transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
            <li className="mt-3">
              <a
                href={site.links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-between rounded-xl border border-border px-3 py-2 text-sm font-semibold text-foreground transition hover:border-primary hover:bg-muted"
              >
                Resume (PDF)
                <span className="text-xs text-muted-foreground">opens in new tab</span>
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
