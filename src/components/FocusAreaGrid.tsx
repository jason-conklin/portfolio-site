import { CheckCircle2 } from "lucide-react";

interface FocusArea {
  title: string;
  description: string;
}

interface FocusAreaGridProps {
  areas: readonly FocusArea[];
}

export function FocusAreaGrid({ areas }: FocusAreaGridProps) {
  if (!areas.length) {
    return null;
  }

  return (
    <section className="mt-5 border-t border-border/55 pt-4">
      <h5 className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground/85">
        Engineering focus areas
      </h5>
      <ul className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {areas.map((area) => (
          <li
            key={area.title}
            className="rounded-xl border border-border/55 bg-muted/25 px-3.5 py-3 transition-all duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:hover:bg-muted/40 motion-safe:hover:shadow-sm"
          >
            <div className="flex items-start gap-2.5">
              <CheckCircle2
                className="mt-0.5 h-4 w-4 shrink-0 text-primary/85"
                aria-hidden="true"
              />
              <div className="min-w-0">
                <p className="text-sm font-medium leading-snug text-foreground">
                  {area.title}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {area.description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
