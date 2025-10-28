import { motion, useReducedMotion } from "framer-motion";

export function ScrollCue() {
  const reduced = useReducedMotion();

  const onActivate = () => {
    const el = document.querySelector("#featured");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onActivate();
    }
  };

  return (
    <motion.button
      type="button"
      onClick={onActivate}
      onKeyDown={handleKeyDown}
      role="button"
      aria-label="Scroll to featured projects"
      className="mt-6 inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-3 py-2 text-sm text-muted-foreground/80 transition-colors hover:text-foreground backdrop-blur sm:mt-8"
      initial={reduced ? undefined : { opacity: 0, y: 10 }}
      animate={
        reduced
          ? undefined
          : {
              opacity: [0.7, 1, 0.7],
              y: [0, -6, 0],
            }
      }
      transition={
        reduced
          ? undefined
          : {
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
    >
      <span aria-hidden className="text-base">
        ↓
      </span>
      <span>Explore my work</span>
    </motion.button>
  );
}
