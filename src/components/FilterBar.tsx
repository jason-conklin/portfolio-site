import { type ChangeEvent, useId } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterBarProps {
  filters: readonly FilterOption[];
  activeFilter: string;
  onFilterChange: (value: string) => void;
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
}

export function FilterBar({
  filters,
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchQueryChange,
}: FilterBarProps) {
  const inputId = useId();

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchQueryChange(event.target.value);
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card/70 p-4 shadow-sm backdrop-blur-sm md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Button
            key={filter.value}
            variant={activeFilter === filter.value ? "default" : "ghost"}
            size="sm"
            className={cn("px-4", activeFilter === filter.value ? "shadow-soft" : "")}
            onClick={() => onFilterChange(filter.value)}
            aria-pressed={activeFilter === filter.value}
          >
            {filter.label}
          </Button>
        ))}
      </div>
      <div className="w-full md:w-auto">
        <label htmlFor={inputId} className="sr-only">
          Search projects
        </label>
        <Input
          id={inputId}
          type="search"
          placeholder="Search projects by title or tech..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full md:min-w-[280px]"
        />
      </div>
    </div>
  );
}
