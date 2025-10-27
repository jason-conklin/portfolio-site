import { cn } from "@/lib/utils";

interface TagProps {
  children: string;
  className?: string;
}

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors",
        "hover:border-primary/40 hover:text-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
