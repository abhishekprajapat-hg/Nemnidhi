"use client";

import { useRef } from "react";
import Link from "next/link";
import Container from "@/components/layout/Container";
import BlurText from "@/components/motion/BlurText";
import HeroImageBackdrop from "@/components/services/HeroImageBackdrop";
import { useHeroEntrance } from "@/lib/useGsapAnimations";

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

  const badge = hero?.badgeText ?? "[ NEMNIDHI.COM ] — EST. 2025";
  const headingLine1 = hero?.headingMain ?? "WE TURN BUSINESS PROBLEMS";
  const headingLine2 = hero?.headingHighlight ?? "INTO ";
  const headingLine3 = hero?.headingSuffix ?? "SOFTWARE SOLUTIONS.";
  const sub =
    hero?.subheading ??
    "Custom software, AI integration, and automation built around how your business actually works — not a generic template.";
  const primaryHref = hero?.primaryCtaHref ?? "/contact";
  const primaryLabel = hero?.primaryCtaLabel ?? "Start Your Project →";
  const secondaryHref = hero?.secondaryCtaHref ?? "/projects";
  const secondaryLabel = hero?.secondaryCtaLabel ?? "View Our Work";

  return (
    <section
      id="home"
      ref={sectionRef}
      data-scroll-chapter
      suppressHydrationWarning
      className="home-hero-section"
    >
      <HeroImageBackdrop src="/images/hero/home-platform-hero.png" focus="center" />

      {/* ── Parallax dot-grid background ─────────────────────────── */}
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
            fontFamily: "var(--font-condensed, sans-serif)",
            fontWeight: 900,
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.01em",
            textTransform: "uppercase" as const,
            margin: 0,
            maxWidth: "950px", // Plenty of room for "INTO SOFTWARE SOLUTIONS."
          }}
        >
          <BlurText
            as="span"
            data-hero-headline
            text={headingLine1}
            delay={90}
            stepDuration={0.42}
            style={{
              display: "flex", // Forces a line break after this block
              color: "#f0f4f8",
            }}
          />
          <BlurText
            as="span"
            data-hero-headline
            text={headingLine2}
            delay={90}
            stepDuration={0.42}
            style={{
              display: "inline-flex", // Sits side-by-side with the next block
              color: "#f0f4f8",
            }}
          />
          <BlurText
            as="span"
            data-hero-headline
            text={headingLine3}
            delay={90}
            stepDuration={0.42}
            style={{
              display: "inline-flex",
              color: "#67e8f9",
            }}
          />
        </h1>

        {/* Bottom row: subtitle + buttons */}
        <div
          data-hero-anim
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "2.5rem",
            marginTop: "3rem",
          }}
          className="hero-bottom-row"
        >
          <p
            style={{
              color: "#cbd5e1",
              fontSize: "clamp(1rem, 1.2vw, 1.1rem)",
              lineHeight: 1.7,
              maxWidth: "34rem",
            }}
          >
            {sub}
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", flexShrink: 0 }}>
            <Link
              href={secondaryHref}
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0.9rem 1.75rem",
                border: "1px solid rgba(240, 249, 255, 0.36)",
                background: "rgba(5, 8, 11, 0.16)",
                color: "#e2e8f0",
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

        {/* Trust Indicators */}
        <div 
          data-hero-anim
          style={{
            marginTop: "3.5rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "1.5rem",
            alignItems: "center",
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "0.65rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#94a3b8",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#67e8f9" }} /> Projects Delivered
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#67e8f9" }} /> Industries Served
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#67e8f9" }} /> Modern Tech Stack
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#67e8f9" }} /> Fast Delivery
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#67e8f9" }} /> Ongoing Support
          </span>
        </div>
      </Container>

      <style>{`
        .home-hero-content {
          z-index: 2;
        }

        @media (max-width: 768px) {
          .hero-bottom-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
