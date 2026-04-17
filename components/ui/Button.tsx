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
  "button-3d inline-flex items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-base font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A70DF]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F1826] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  solid:
    "border border-[#1A66B3]/75 bg-[linear-gradient(145deg,#33DEC0,#004DC5)] text-[#EAF2FF] hover:brightness-[1.02]",
  outline:
    "border border-[#3A5675]/72 bg-[linear-gradient(162deg,#131E2E_0%,#0F1826_100%)] text-[#D5E6FF] hover:border-[#24B89A] hover:text-[#76B5FF]",
  ghost: "border border-transparent bg-[#111a28]/70 text-[#B8CBE0] hover:border-[#3A5675] hover:bg-[#111a28]/90",
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
