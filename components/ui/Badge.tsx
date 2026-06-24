import clsx from "clsx";
import type { HTMLAttributes, ReactNode } from "react";

type BadgeTone = "gold" | "blue" | "neutral" | "success";

const tones: Record<BadgeTone, string> = {
  gold: "border-[rgba(214,190,124,0.36)] bg-[rgba(214,190,124,0.11)] text-[#F0D991]",
  blue: "border-sky-300/25 bg-sky-300/10 text-sky-200",
  neutral: "border-slate-300/15 bg-white/[0.045] text-slate-300",
  success: "border-emerald-300/25 bg-emerald-300/10 text-emerald-200",
};

export function Badge({
  children,
  className,
  tone = "gold",
  ...props
}: HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  tone?: BadgeTone;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.7rem] font-extrabold uppercase tracking-[0.16em]",
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
