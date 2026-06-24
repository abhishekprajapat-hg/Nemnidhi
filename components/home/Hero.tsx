"use client";

import { useRef } from "react";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { useHeroEntrance, useHeroParallax } from "@/lib/useGsapAnimations";

type HeroContent = {
  badgeText?: string;
  headingMain?: string;
  headingHighlight?: string;
  headingSuffix?: string;
  subheading?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
};

type HeroProps = {
  hero?: HeroContent | null;
};

export default function Hero({ hero }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useHeroEntrance(sectionRef);
  useHeroParallax(sectionRef);

  const badge = hero?.badgeText ?? "[ NEMNIDHI.COM ] — EST. 2018";
  const headingLine1 = hero?.headingMain ?? "ENGINEERING";
  const headingLine2 = hero?.headingHighlight ?? "SOFTWARE";
  const headingLine3 = hero?.headingSuffix ?? "THAT SCALES.";
  const sub =
    hero?.subheading ??
    "We build production-grade software for startups and enterprises — from architecture to deployment. Precision engineering, zero compromise.";
  const primaryHref = hero?.primaryCtaHref ?? "/contact";
  const primaryLabel = hero?.primaryCtaLabel ?? "START PROJECT →";
  const secondaryHref = hero?.secondaryCtaHref ?? "/projects";
  const secondaryLabel = hero?.secondaryCtaLabel ?? "VIEW WORK";

  return (
    <section
      id="home"
      ref={sectionRef}
      data-scroll-chapter
      suppressHydrationWarning
      className="home-hero-section"
    >
      {/* ── Parallax dot-grid background ─────────────────────────── */}
      <div
        data-hero-grid
        aria-hidden="true"
        className="home-hero-grid"
      />

      <Container size="wide" className="home-hero-content">
        {/* Badge */}
        <p
          data-hero-anim
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "0.75rem",
            fontWeight: 500,
            letterSpacing: "0.12em",
            color: "#67e8f9",
            textTransform: "uppercase" as const,
            marginBottom: "2rem",
          }}
        >
          {badge}
        </p>

        {/* Giant Heading — each line is a separate anim target */}
        <h1
          style={{
            fontFamily: "var(--font-display, var(--font-heading, sans-serif))",
            fontWeight: 900,
            fontSize: "clamp(2.9rem, 7.8vw, 6.8rem)",
            lineHeight: 0.88,
            letterSpacing: "-0.02em",
            textTransform: "uppercase" as const,
            margin: 0,
          }}
        >
          <span
            data-hero-headline
            style={{
              display: "block",
              color: "#f0f4f8",
              WebkitTextStroke: "1px rgba(240,244,248,0.1)",
            }}
          >
            {headingLine1}
          </span>
          <span
            data-hero-headline
            style={{
              display: "block",
              color: "#f0f4f8",
            }}
          >
            {headingLine2}
          </span>
          <span
            data-hero-headline
            style={{
              display: "block",
              color: "#67e8f9",
            }}
          >
            {headingLine3}
          </span>
        </h1>

        {/* Bottom row: subtitle + buttons */}
        <div
          data-hero-anim
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "flex-end",
            gap: "3rem",
            marginTop: "3rem",
          }}
          className="hero-bottom-row"
        >
          <p
            style={{
              color: "#f0f4f8",
              fontSize: "clamp(0.9rem, 1.2vw, 1rem)",
              lineHeight: 1.7,
              maxWidth: "28rem",
            }}
          >
            {sub}
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: "1rem", flexShrink: 0 }}>
            <Link
              href={secondaryHref}
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0.9rem 1.75rem",
                border: "1px solid rgba(255,255,255,0.18)",
                background: "transparent",
                color: "#f0f4f8",
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
                textDecoration: "none",
                transition: "border-color 0.2s, background 0.2s",
              }}
            >
              {secondaryLabel}
            </Link>
            <Link
              href={primaryHref}
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0.9rem 1.75rem",
                border: "1px solid #67e8f9",
                background: "#67e8f9",
                color: "#080a0c",
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
                textDecoration: "none",
                transition: "background 0.2s",
              }}
            >
              {primaryLabel}
            </Link>
          </div>
        </div>
      </Container>

      <style>{`
        @media (max-width: 768px) {
          .hero-bottom-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
