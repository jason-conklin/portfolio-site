import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  headingClassName?: string;
  minHeight?: "none" | "screen" | "hero";
}

export function Section({
  id,
  title,
  description,
  children,
  className,
  headingClassName,
  minHeight = "none",
}: SectionProps) {
  const normalizedHeadingId = (() => {
    if (title) {
      const base = id ?? title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      return `${base}-heading`;
    }
    return undefined;
  })();

  const minHClass =
    minHeight === "screen"
      ? "min-h-[100svh]"
      : minHeight === "hero"
        ? "min-h-[70vh]"
        : "";

  return (
    <section
      id={id}
      aria-labelledby={normalizedHeadingId}
      className={cn(
        minHClass,
        "mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8",
        className,
      )}
    >
      {(title || description) && (
        <header className="mb-12 max-w-3xl">
          {title && (
            <h2
              id={normalizedHeadingId}
              className={cn(
                "text-3xl font-semibold tracking-tight sm:text-4xl",
                headingClassName,
              )}
            >
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-4 text-lg text-muted-foreground">{description}</p>
          )}
        </header>
      )}
      {children}
    </section>
  );
}
