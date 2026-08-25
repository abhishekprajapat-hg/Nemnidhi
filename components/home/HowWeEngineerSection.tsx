"use client";

import { useRef } from "react";
import Container from "@/components/layout/Container";
import { useSectionLabel, useScrollReveal } from "@/lib/useGsapAnimations";

const principles = [
  {
    num: "01",
    title: "Architecture before implementation",
    desc: "Data models, API contracts, and workflows are defined before implementation starts — not discovered mid-sprint.",
  },
  {
    num: "02",
    title: "Small, maintainable components",
    desc: "Systems are divided into clear responsibilities instead of one tightly-coupled codebase nobody wants to touch.",
  },
  {
    num: "03",
    title: "Separate environments",
    desc: "Development, staging, and production are treated as distinct environments with their own data and config — not one.",
  },
  {
    num: "04",
    title: "Automated delivery",
    desc: "Build, test, and deployment run through CI/CD pipelines. A release is a pipeline run, not a manual checklist.",
  },
  {
    num: "05",
    title: "Observability",
    desc: "Production software ships with logging, error tracking, and monitoring from day one — not bolted on after the first incident.",
  },
  {
    num: "06",
    title: "Security by design",
    desc: "Authentication, authorization, input validation, and secrets management are architecture decisions, made upfront.",
  },
  {
    num: "07",
    title: "Documentation",
    desc: "Systems are written to be understood by an engineer who didn't build them — including the one who built them, six months later.",
  },
];

export default function HowWeEngineerSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useSectionLabel(sectionRef);
  useScrollReveal(sectionRef, { stagger: 0.06, startY: 24 });

  return (
    <section
      ref={sectionRef}
      data-scroll-chapter
      suppressHydrationWarning
      className="section-padding"
      style={{ borderTop: "1px solid var(--color-line)" }}
    >
      <Container size="wide">
        <div
          data-section-label
          style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "3rem" }}
        >
          <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.7rem", fontWeight: 600, color: "var(--color-accent)", letterSpacing: "0.1em" }}>
            [ 04 ]
          </span>
          <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "var(--color-text)" }}>
            HOW WE ENGINEER
          </span>
          <div style={{ flex: 1, height: "1px", background: "var(--color-line)" }} />
        </div>

        <div className="how-we-engineer-layout">
          <div className="how-we-engineer-intro">
            <h2 className="text-h2 uppercase">
              Engineering principles, not a pitch.
            </h2>
            <p className="text-body text-prose mt-6 text-[var(--color-text-muted)]">
              These are working defaults for every system we build — not marketing language. They shape how we scope, architect, and hand off a project.
            </p>
          </div>

          <dl className="how-we-engineer-list">
            {principles.map((p) => (
              <div key={p.num} data-reveal className="how-we-engineer-row">
                <dt>
                  <span className="how-we-engineer-num">{p.num}</span>
                  {p.title}
                </dt>
                <dd>{p.desc}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>

      <style>{`
        .how-we-engineer-layout {
          display: grid;
          grid-template-columns: minmax(0, 0.34fr) minmax(0, 0.66fr);
          gap: clamp(2rem, 6vw, 6rem);
          align-items: start;
        }
        .how-we-engineer-intro {
          position: sticky;
          top: 7rem;
        }
        .how-we-engineer-list {
          margin: 0;
          border-top: 1px solid var(--color-line);
        }
        .how-we-engineer-row {
          display: grid;
          grid-template-columns: minmax(0, 0.44fr) minmax(0, 0.56fr);
          gap: 2rem;
          padding: 1.75rem 0;
          border-bottom: 1px solid var(--color-line);
        }
        .how-we-engineer-row dt {
          display: flex;
          align-items: baseline;
          gap: 0.9rem;
          font-family: var(--font-mono, monospace);
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          color: var(--color-heading);
          text-transform: uppercase;
        }
        .how-we-engineer-num {
          color: var(--color-accent);
          font-weight: 600;
        }
        .how-we-engineer-row dd {
          margin: 0;
          color: var(--color-text-muted);
          font-size: 0.9rem;
          line-height: 1.75;
        }

        @media (max-width: 900px) {
          .how-we-engineer-layout {
            grid-template-columns: 1fr;
          }
          .how-we-engineer-intro {
            position: static;
          }
        }
        @media (max-width: 640px) {
          .how-we-engineer-row {
            grid-template-columns: 1fr;
            gap: 0.6rem;
          }
        }
      `}</style>
    </section>
  );
}
