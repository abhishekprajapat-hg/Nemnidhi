import clsx from "clsx";

export function AnimatedDivider({ className }: { className?: string }) {
  return <div data-divider className={clsx("h-px w-full bg-[var(--color-line-strong)]", className)} />;
}
