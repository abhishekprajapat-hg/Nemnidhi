import clsx from "clsx";
import type { HTMLAttributes, ReactNode } from "react";

export function MotionSection({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
}) {
  return (
    <div data-reveal className={clsx("will-change-transform", className)} {...props}>
      {children}
    </div>
  );
}
