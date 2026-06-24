"use client";

import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";

const chapters = [
  { id: "home", label: "Home" },
  { id: "proof", label: "Proof" },
  { id: "protocol", label: "Protocol" },
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "process", label: "Process" },
  { id: "contact", label: "Contact" },
];

export default function ScrollChapterRail() {
  const [activeId, setActiveId] = useState(chapters[0].id);

  useEffect(() => {
    const targets = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((item): item is HTMLElement => Boolean(item));

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: "-36% 0px -48% 0px",
        threshold: [0.08, 0.24, 0.48, 0.72],
      },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="scroll-chapter-rail" aria-label="Home page scroll chapters">
      {chapters.map((chapter, index) => {
        const isActive = activeId === chapter.id;

        return (
          <Link
            key={chapter.id}
            href={`#${chapter.id}`}
            className={clsx("scroll-chapter-link", isActive && "is-active")}
            aria-current={isActive ? "location" : undefined}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span>{chapter.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
