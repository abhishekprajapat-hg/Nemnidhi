"use client";

import { useRef } from "react";
import Link from "next/link";
import Container from "@/components/layout/Container";
import BlurText from "@/components/motion/BlurText";
import HeroSystemDiagram from "@/components/home/HeroSystemDiagram";
import { useHeroEntrance } from "@/lib/useGsapAnimations";
import { companyStats } from "@/lib/data/stats";

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
      <Container size="wide" className="home-hero-content">
        <div className="hero-split">
          <div className="hero-copy">
            {/* Badge */}
            <p
              data-hero-anim
              className="hero-eyebrow"
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.12em",
                color: "var(--color-accent)",
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
                  color: "var(--color-heading)",
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
                  color: "var(--color-heading)",
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
                  color: "var(--color-accent)",
                }}
              />
            </h1>

            <div data-hero-anim className="hero-bottom-row" style={{ marginTop: "2.5rem" }}>
              <p
                style={{
                  color: "var(--color-text-muted)",
                  fontSize: "clamp(1rem, 1.2vw, 1.1rem)",
                  lineHeight: 1.7,
                  maxWidth: "34rem",
                }}
              >
                {sub}
              </p>

              {/* CTA Buttons */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "2rem" }}>
                <Link
                  href={primaryHref}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "0.9rem 1.75rem",
                    border: "1px solid var(--color-accent)",
                    background: "var(--color-accent)",
                    color: "var(--color-bg)",
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
                <Link
                  href={secondaryHref}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "0.9rem 1.75rem",
                    border: "1px solid var(--color-line-strong)",
                    background: "transparent",
                    color: "var(--color-text)",
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
              </div>
            </div>

            {/* Real, verifiable facts — see lib/data/stats.ts for sourcing */}
            <div data-hero-anim className="hero-facts">
              {companyStats.map((stat) => (
                <div key={stat.label} className="hero-fact">
                  <span className="hero-fact-value">
                    {stat.value}
                    {stat.suffix}
                  </span>
                  <span className="hero-fact-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-architecture-frame">
              <HeroSystemDiagram />
            </div>
          </div>
        </div>
      </Container>

      <style>{`
        .home-hero-section {
          position: relative;
          display: block !important;
          min-height: min(calc(100svh - 1rem), 56rem);
          background:
            radial-gradient(circle at 72% 42%, rgba(103, 232, 249, 0.07), transparent 38%),
            linear-gradient(135deg, #080a0c 0%, #0d1117 54%, #080a0c 100%);
          padding: clamp(7.25rem, 13vh, 9.5rem) 0 clamp(2.75rem, 5vh, 3.75rem);
          overflow: visible;
          transition: background 0.3s ease, color 0.3s ease;
        }

        [data-theme="light"] .home-hero-section {
          --color-bg: #F7F5F0;
          --color-bg-elevated: #FFFFFF;
          --color-bg-card: #FFFFFF;
          --color-line: rgba(15, 15, 10, 0.1);
          --color-line-strong: rgba(7, 109, 135, 0.24);
          --color-text: #252217;
          --color-text-muted: #3D3A31;
          --color-text-faint: #5E5A4D;
          --color-heading: #050505;
          --color-accent: #2F91AE;
          color-scheme: light;
          background:
            radial-gradient(circle at 72% 42%, rgba(47, 145, 174, 0.08), transparent 38%),
            linear-gradient(135deg, #F7F5F0 0%, #FFFFFF 54%, #F2EFEB 100%);
        }

        .home-hero-content {
          position: relative;
          z-index: 1;
          width: min(100% - 3rem, 91.25rem) !important;
          margin-inline: auto;
        }

        .hero-split {
          display: grid;
          grid-template-columns: minmax(26rem, 0.9fr) minmax(32rem, 1.1fr);
          gap: clamp(2.25rem, 3.4vw, 4rem);
          align-items: center;
        }

        .hero-copy {
          max-width: 42.5rem;
          min-width: 0;
        }

        .hero-copy h1 {
          max-width: 42.5rem;
        }

        .hero-visual {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          min-width: 0;
          overflow: visible;
        }

        .hero-architecture-frame {
          width: min(100%, 51rem);
          min-width: 0;
          transform-origin: center right;
        }

        .hero-facts {
          margin-top: clamp(3.5rem, 8vh, 6.25rem);
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: clamp(0.9rem, 2vw, 2.4rem);
          max-width: 42rem;
        }
        .hero-fact {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .hero-fact-value {
          font-family: var(--font-mono, monospace);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--color-heading);
        }
        .hero-fact-label {
          font-family: var(--font-mono, monospace);
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--color-text-faint);
          max-width: 8.5rem;
        }

        @media (max-width: 1240px) {
          .hero-split {
            grid-template-columns: minmax(24rem, 0.9fr) minmax(30rem, 1.1fr);
            gap: 2rem;
          }

          .hero-architecture-frame {
            min-width: 0;
          }
        }

        @media (min-width: 901px) and (max-height: 820px) {
          .home-hero-section {
            min-height: auto !important;
            padding-top: clamp(5.25rem, 10vh, 6.25rem);
            padding-bottom: 1.75rem;
          }

          .hero-split {
            align-items: start;
          }

          .hero-eyebrow {
            margin-bottom: 1.35rem !important;
          }

          .hero-bottom-row {
            margin-top: 1.8rem !important;
          }

          .hero-facts {
            margin-top: clamp(1.25rem, 3vh, 2rem);
          }

          .hero-architecture-frame {
            width: min(100%, 43rem);
            min-width: 0;
          }
        }

        @media (max-width: 1100px) {
          .hero-split {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .hero-copy {
            max-width: none;
          }
          .hero-visual {
            justify-content: center;
            order: 2;
          }
          .hero-architecture-frame {
            width: min(100%, 47.5rem);
            min-width: 0;
          }
          .hero-facts {
            grid-template-columns: repeat(2, auto);
            max-width: 32rem;
          }
        }

        @media (max-width: 640px) {
          .home-hero-content {
            width: min(100% - 2rem, 91.25rem) !important;
          }
          .hero-visual {
            margin-top: 0.5rem;
          }
        }
      `}</style>
    </section>
  );
}
