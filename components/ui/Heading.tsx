import clsx from "clsx";
import type { ReactNode } from "react";

type HeadingLevel = "h1" | "h2" | "h3";
type HeadingSize = "hero" | "section" | "card";

const sizes: Record<HeadingSize, string> = {
  hero: "text-h1 uppercase",
  section: "text-h2 uppercase",
  card: "text-h3",
};

function SplitWords({ text }: { text: string }) {
  const words = text.trim().split(/\s+/);

  return (
    <>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="split-word" aria-hidden="true">
          <span className="split-word-inner">{word}</span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}

export function Heading({
  as: Component = "h2",
  size = "section",
  children,
  className,
}: {
  as?: HeadingLevel;
  size?: HeadingSize;
  children: ReactNode;
  className?: string;
}) {
  const splitText = size !== "hero" && typeof children === "string";

  return (
    <Component
      className={clsx(sizes[size], "text-balance", className)}
      data-split={splitText ? "" : undefined}
      aria-label={splitText ? children : undefined}
    >
      {splitText ? <SplitWords text={children} /> : children}
    </Component>
  );
}
