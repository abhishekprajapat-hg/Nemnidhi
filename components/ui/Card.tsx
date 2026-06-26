import clsx from "clsx";
import type { HTMLAttributes, ReactNode } from "react";
import GlareHover from "@/components/effects/GlareHover";

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
}: HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  variant?: CardVariant;
}) {
  return (
    <GlareHover
      width="100%"
      height="100%"
      background="var(--color-bg-card)"
      borderRadius="var(--radius-lg)"
      borderColor="var(--color-line)"
      glareColor="#67e8f9"
      glareOpacity={0.2}
      glareAngle={-32}
      glareSize={280}
      transitionDuration={750}
      className={clsx("interactive-card magic-bento-card rounded-[var(--radius-lg)]", variants[variant], className)}
      data-cursor="interactive"
      data-card-reveal
      {...props}
    >
      {children}
    </GlareHover>
  );
}
