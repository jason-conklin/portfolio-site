const CATEGORY_TINTS: Record<string, string> = {
  ai: "bg-blue-50/50 dark:bg-blue-950/20",
  web: "bg-indigo-50/50 dark:bg-indigo-950/20",
  tools: "bg-emerald-50/50 dark:bg-emerald-950/20",
};

const DEFAULT_TINT = "bg-slate-50/55 dark:bg-slate-900/20";

export function getProjectCardTint(categories?: readonly string[]) {
  if (!categories?.length) {
    return DEFAULT_TINT;
  }

  const normalized = categories.map((category) => category.toLowerCase());

  if (normalized.includes("ai")) return CATEGORY_TINTS.ai;
  if (normalized.includes("web")) return CATEGORY_TINTS.web;
  if (normalized.includes("tools")) return CATEGORY_TINTS.tools;

  return DEFAULT_TINT;
}
