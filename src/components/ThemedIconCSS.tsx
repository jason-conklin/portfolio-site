interface ThemedIconCSSProps {
  lightThemeSrc: string;
  darkThemeSrc: string;
  alt?: string;
  className?: string;
}

export function ThemedIconCSS({
  lightThemeSrc,
  darkThemeSrc,
  alt = "",
  className,
}: ThemedIconCSSProps) {
  const wrapperClassName = ["relative inline-block", className]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      className={wrapperClassName}
      aria-hidden={alt === "" ? true : undefined}
    >
      <img
        src={lightThemeSrc}
        alt={alt}
        className="block h-full w-full dark:hidden"
        loading="lazy"
        decoding="async"
      />
      <img
        src={darkThemeSrc}
        alt={alt}
        className="hidden h-full w-full dark:block"
        loading="lazy"
        decoding="async"
      />
    </span>
  );
}
