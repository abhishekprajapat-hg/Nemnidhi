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
  "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-base font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D8AFD]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  solid:
    "border border-transparent bg-[#0D8AFD] text-white hover:bg-[#003464]",
  outline:
    "border border-[#A6A6A6] bg-white text-[#333333] hover:border-[#0D8AFD] hover:text-[#0D8AFD]",
  ghost: "border border-transparent text-[#333333] hover:bg-[#F0F0F0]",
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
