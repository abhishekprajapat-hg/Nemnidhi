"use client";

import { CSSProperties } from "react";
import BlurText from "@/components/motion/BlurText";

type HeroBlurTitleProps = {
  lines: Array<{ text: string; color?: string }>;
  className?: string;
  style?: CSSProperties;
  lineStyle?: CSSProperties;
  delay?: number;
  direction?: "top" | "bottom";
};

export default function HeroBlurTitle({
  lines,
  className,
  style,
  lineStyle,
  delay = 90,
  direction = "top",
}: HeroBlurTitleProps) {
  return (
    <h1 className={className} style={style}>
      {lines.map((line, index) => (
        <BlurText
          key={`${line.text}-${index}`}
          as="span"
          text={line.text}
          animateBy="words"
          direction={direction}
          delay={delay}
          stepDuration={0.42}
          threshold={0.2}
          className="hero-blur-line"
          style={{
            display: "flex",
            color: line.color,
            transitionDelay: `${index * 70}ms`,
            ...lineStyle,
          }}
        />
      ))}
    </h1>
  );
}
