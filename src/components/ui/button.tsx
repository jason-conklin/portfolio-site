import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

const buttonVariants = {
  default: "btn btn--primary",
  secondary: "btn btn--secondary",
  ghost: "btn btn--ghost",
  outline: "btn btn--secondary",
  danger: "btn btn--danger",
  link: "font-semibold text-primary underline-offset-4 hover:underline",
} satisfies Record<string, string>;

const buttonSizes = {
  sm: "btn--sm",
  md: "btn--md",
  lg: "btn--lg",
} satisfies Record<string, string>;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      asChild = false,
      type,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const styles = cn(
      buttonVariants[variant],
      variant !== "link" ? buttonSizes[size] : undefined,
      className,
    );

    const fallbackType = !asChild ? { type: type ?? "button" } : {};

    return <Comp className={styles} ref={ref} {...fallbackType} {...props} />;
  },
);
Button.displayName = "Button";
