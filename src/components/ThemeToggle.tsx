import { Moon, Sun } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
  labelClassName?: string;
  compact?: boolean;
};

export function ThemeToggle({ className, labelClassName, compact = false }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const nextTheme = useMemo(() => {
    return resolvedTheme === "light" ? "dark" : "light";
  }, [resolvedTheme]);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        className={cn("h-10 w-10 px-0", className)}
        aria-label="Toggle theme"
      >
        <Sun className="h-4 w-4" aria-hidden="true" />
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant="ghost"
      className={cn(
        "flex h-10 items-center gap-2 px-3 transition-colors hover:text-primary",
        compact ? "min-h-10 rounded-full px-3.5 text-sm" : undefined,
        className,
      )}
      aria-label="Toggle theme"
      onClick={() => {
        if (nextTheme === "light" || nextTheme === "dark") {
          setTheme(nextTheme);
        } else {
          toggleTheme();
        }
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {resolvedTheme === "light" ? (
        <Sun className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4" aria-hidden="true" />
      )}
      <span
        className={cn(
          compact
            ? "text-xs font-medium text-muted-foreground"
            : "hidden text-xs font-medium text-muted-foreground sm:inline",
          labelClassName,
        )}
      >
        {compact
          ? `${resolvedTheme.charAt(0).toUpperCase()}${resolvedTheme.slice(1)}`
          : isHovering
          ? `Switch to ${nextTheme.charAt(0).toUpperCase()}${nextTheme.slice(1)}`
          : `${resolvedTheme.charAt(0).toUpperCase()}${resolvedTheme.slice(1)}`}
      </span>
    </Button>
  );
}
