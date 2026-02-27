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
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050a14] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  solid:
    "border border-cyan-200/60 bg-gradient-to-r from-[#41d6ff] to-[#ffb56a] text-[#051326] shadow-[0_14px_36px_rgba(65,214,255,0.25)] hover:-translate-y-0.5 hover:shadow-[0_20px_44px_rgba(255,181,106,0.32)]",
  outline:
    "border border-cyan-300/45 bg-white/[0.02] text-slate-100 hover:border-cyan-200/80 hover:bg-cyan-200/10",
  ghost:
    "border border-transparent text-slate-200 hover:bg-white/[0.05]",
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

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string }>;
    return React.cloneElement(child, {
      className: clsx(classes, child.props.className),
    });
  }

  if (href) {
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
