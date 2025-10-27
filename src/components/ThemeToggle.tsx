import { Moon, Sun, Monitor } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const icon =
    resolvedTheme === "light" ? (
      <Sun className="h-4 w-4" aria-hidden="true" />
    ) : (
      <Moon className="h-4 w-4" aria-hidden="true" />
    );

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        className="h-10 w-10 px-0"
        aria-label="Toggle theme"
      >
        <Sun className="h-4 w-4" aria-hidden="true" />
      </Button>
    );
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button
          variant="ghost"
          className="h-10 w-10 px-0"
          aria-label="Toggle theme"
        >
          {icon}
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="z-50 min-w-[12rem] rounded-xl border border-border bg-popover p-1 text-sm shadow-lg backdrop-blur-sm"
          align="end"
          sideOffset={8}
        >
          <DropdownMenu.Label className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
            Theme
          </DropdownMenu.Label>
          <DropdownMenu.Separator className="my-1 h-px bg-border" />
          <DropdownMenu.Item
            onSelect={() => setTheme("light")}
            className={cn(
              "flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 outline-none transition-colors hover:bg-muted focus:bg-muted",
              theme === "light" && "bg-secondary/80 text-secondary-foreground",
            )}
          >
            <Sun className="h-4 w-4" aria-hidden="true" />
            Light
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={() => setTheme("dark")}
            className={cn(
              "flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 outline-none transition-colors hover:bg-muted focus:bg-muted",
              theme === "dark" && "bg-secondary/80 text-secondary-foreground",
            )}
          >
            <Moon className="h-4 w-4" aria-hidden="true" />
            Dark
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={() => setTheme("system")}
            className={cn(
              "flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 outline-none transition-colors hover:bg-muted focus:bg-muted",
              theme === "system" && "bg-secondary/80 text-secondary-foreground",
            )}
          >
            <Monitor className="h-4 w-4" aria-hidden="true" />
            System
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="my-1 h-px bg-border" />
          <DropdownMenu.Item
            onSelect={toggleTheme}
            className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 outline-none transition-colors hover:bg-muted focus:bg-muted"
          >
            {icon}
            Toggle
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
