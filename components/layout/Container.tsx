import React from "react";
import clsx from "clsx";

interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "default" | "wide";
  as?: "div" | "section";
}

export default function Container({
  children,
  className,
  size = "default",
  as: Component = "div",
  ...props
}: ContainerProps) {
  return (
    <Component
      className={clsx("container-custom", className)}
      data-size={size === "default" ? undefined : size}
      {...props}
    >
      {children}
    </Component>
  );
}
