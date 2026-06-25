"use client";

import { CSSProperties, ElementType, HTMLAttributes, useEffect, useRef, useState } from "react";

type BlurTextProps = HTMLAttributes<HTMLElement> & {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  onAnimationComplete?: () => void;
  stepDuration?: number;
  as?: ElementType;
  style?: CSSProperties;
};

export default function BlurText({
  text = "",
  delay = 200,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  onAnimationComplete,
  stepDuration = 0.35,
  as: Component = "p",
  style,
  ...rest
}: BlurTextProps) {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observedElement = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(observedElement);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(observedElement);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <Component
      ref={ref}
      className={className}
      data-blur-text-ready={inView ? "true" : "false"}
      style={{ display: "flex", flexWrap: "wrap", ...style }}
      {...rest}
    >
      {elements.map((segment, index) => {
        return (
          <span
            className="blur-text-segment inline-block"
            data-direction={direction}
            key={`${segment}-${index}`}
            onAnimationEnd={index === elements.length - 1 ? onAnimationComplete : undefined}
            style={{
              animationDelay: `${(index * delay) / 1000}s`,
              animationDuration: `${stepDuration * 2}s`,
            }}
          >
            {segment === " " ? "\u00A0" : segment}
            {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
          </span>
        );
      })}
    </Component>
  );
}
