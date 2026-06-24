import clsx from "clsx";

export function Skeleton({ className }: { className?: string }) {
  return <span className={clsx("skeleton-block block", className)} aria-hidden />;
}
