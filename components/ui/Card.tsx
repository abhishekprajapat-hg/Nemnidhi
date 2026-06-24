import clsx from "clsx";
import type { HTMLAttributes, ReactNode } from "react";

type CardVariant = "default" | "strong" | "plain";

const variants: Record<CardVariant, string> = {
  default: "surface",
  strong: "surface-strong",
  plain: "border border-[var(--color-line)] bg-[#07111f]/70",
};

export function Card({
  children,
  className,
  variant = "default",
  ...props
}: HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  variant?: CardVariant;
}) {
  return (
    <article
      className={clsx("interactive-card rounded-[var(--radius-lg)]", variants[variant], className)}
      data-cursor="interactive"
      data-card-reveal
      {...props}
    >
      {children}
    </article>
  );
}
