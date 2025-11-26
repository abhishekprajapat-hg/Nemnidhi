// components/ui/Button.tsx
import React from "react";
import clsx from "clsx";
import Link from "next/link";

type ButtonVariant = "solid" | "outline" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  asChild?: boolean;
  href?: string;
  variant?: ButtonVariant;
}

const baseStyles =
  "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<ButtonVariant, string> = {
  solid:
    "bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-sm border border-emerald-400/60",
  outline:
    "border border-emerald-500/60 text-emerald-300 hover:bg-emerald-500/10",
  ghost:
    "text-slate-200 hover:bg-slate-800/70 border border-transparent",
};

export function Button({
  children,
  asChild,
  href,
  variant = "solid",
  className,
  ...props
}: ButtonProps & { className?: string }) {
  const classes = clsx(baseStyles, variants[variant], className);

  if (asChild && href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
