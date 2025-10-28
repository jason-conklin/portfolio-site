import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ExternalLink } from "lucide-react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { site } from "@/data/profile";

type Command = {
  label: string;
  type: "route" | "external";
  value: string;
  icon?: React.ReactNode;
};

const baseCommands: Command[] = [
  { label: "Go to About", type: "route", value: "/about" },
  { label: "Go to Projects", type: "route", value: "/projects" },
  { label: "Go to Skills", type: "route", value: "/skills" },
  { label: "Go to Contact", type: "route", value: "/contact" },
  { label: "Open Resume (PDF)", type: "external", value: site.links.resume },
  { label: "Open GitHub", type: "external", value: site.links.github },
  { label: "Open LinkedIn", type: "external", value: site.links.linkedin },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setQuery("");
    }
  }, [open]);

  const filteredCommands = useMemo(() => {
    if (!query.trim()) return baseCommands;
    return baseCommands.filter((command) =>
      command.label.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query]);

  const handleSelect = useCallback(
    (command: Command) => {
      if (command.type === "route") {
        navigate(command.value);
      } else if (command.type === "external") {
        window.open(command.value, "_blank", "noopener,noreferrer");
      }
      setOpen(false);
    },
    [navigate],
  );

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        className="hidden h-10 items-center gap-2 rounded-full border border-transparent px-3 text-sm font-medium text-muted-foreground transition hover:border-primary/40 hover:text-primary sm:flex"
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
      >
        <Search className="h-4 w-4" aria-hidden="true" />
        <span>Quick search</span>
        <kbd className="ml-auto hidden rounded border border-border bg-muted px-2 py-0.5 text-[10px] uppercase text-muted-foreground sm:flex">
          Ctrl K
        </kbd>
      </Button>
      <Button
        type="button"
        variant="ghost"
        className="flex h-10 w-10 items-center justify-center sm:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
      >
        <Search className="h-4 w-4" aria-hidden="true" />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg gap-0 overflow-hidden border border-border/70 bg-card p-0 shadow-xl">
          <div className="border-b border-border/70 px-4 py-3">
            <Input
              ref={inputRef}
              placeholder="Type a command or search..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="max-h-64 overflow-y-auto py-2">
            {filteredCommands.length ? (
              filteredCommands.map((command) => (
                <button
                  key={`${command.type}-${command.value}`}
                  type="button"
                  onClick={() => handleSelect(command)}
                  className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-foreground transition hover:bg-muted focus:bg-muted"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/80 text-muted-foreground">
                    {command.type === "external" ? (
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Search className="h-4 w-4" aria-hidden="true" />
                    )}
                  </span>
                  <span>{command.label}</span>
                </button>
              ))
            ) : (
              <div className="px-4 py-6 text-sm text-muted-foreground">
                No results found. Try a different keyword.
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
