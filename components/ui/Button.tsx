import React from "react";
import clsx from "clsx";
import Link from "next/link";

type ButtonVariant = "solid" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  asChild?: boolean;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const baseStyles =
  "premium-button inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] font-bold transition-colors duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  solid:
    "border border-[rgba(214,190,124,0.72)] bg-[#D6BE7C] text-[#07111F] hover:bg-[#F0D991]",
  outline:
    "border border-slate-300/18 bg-white/[0.035] text-[#F8FBFF] hover:border-[rgba(214,190,124,0.5)] hover:text-[#F0D991]",
  ghost: "border border-transparent bg-transparent text-[#D9E2EF] hover:bg-white/[0.06] hover:text-white",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export function Button({
  children,
  asChild,
  href,
  variant = "solid",
  size = "md",
  className,
  ...props
}: ButtonProps & { className?: string }) {
  const classes = clsx(baseStyles, variants[variant], sizes[size], className);

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string; "data-magnetic"?: string; "data-cursor"?: string }>;
    return React.cloneElement(child, {
      className: clsx(classes, child.props.className),
      "data-magnetic": "",
      "data-cursor": "interactive",
    });
  }

  if (href) {
    return (
      <Link href={href} className={classes} data-magnetic data-cursor="interactive">
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} data-magnetic data-cursor="interactive" {...props}>
      {children}
    </button>
  );
}
