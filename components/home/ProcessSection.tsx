"use client";

import { useRef } from "react";
import Container from "@/components/layout/Container";
import { useSectionLabel, useTimelineGrow } from "@/lib/useGsapAnimations";

const steps: { num: string; title: string; desc: string; outputs: string[] }[] = [
  {
    num: "01",
    title: "Understand",
    desc: "We map requirements, constraints, and success metrics against how your business actually operates today.",
    outputs: ["Requirements map", "Existing workflow analysis", "Business constraints", "Feature scope"],
  },
  {
    num: "02",
    title: "Architect",
    desc: "System design before a single line of code — the technical blueprint the rest of the build follows.",
    outputs: ["System architecture", "Database design", "API contracts", "Infrastructure plan", "Security model"],
  },
  {
    num: "03",
    title: "Prototype",
    desc: "We validate flows and interaction design before committing engineering time to the wrong shape.",
    outputs: ["User flows", "Wireframes", "Design direction", "Interaction prototype"],
  },
  {
    num: "04",
    title: "Engineer",
    desc: "Two-week sprint cycles with continuous delivery — daily standups, weekly demos, reviewed code.",
    outputs: ["Sprint development", "Code reviews", "Automated tests", "Staging releases"],
  },
  {
    num: "05",
    title: "Validate",
    desc: "We test what we built against real conditions, not just the happy path, before it reaches production.",
    outputs: ["QA", "Performance testing", "Security review", "Stakeholder validation"],
  },
  {
    num: "06",
    title: "Ship & Operate",
    desc: "Launch is the start of operating the system, not the end of the engagement.",
    outputs: ["Production deployment", "Monitoring", "Error tracking", "Documentation", "Maintenance"],
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useSectionLabel(sectionRef);
  useTimelineGrow(sectionRef);

  return (
    <section
      id="process"
      ref={sectionRef}
      data-scroll-chapter
      suppressHydrationWarning
      className="section-padding"
      style={{
        background: "transparent",
        borderTop: "1px solid var(--color-line)",
      }}
    >
      <Container size="wide">
        <div
          data-section-label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "3rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.7rem",
              fontWeight: 600,
              color: "var(--color-accent)",
              letterSpacing: "0.1em",
            }}
          >
            [ 03 ]
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.7rem",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase" as const,
              color: "var(--color-text)",
            }}
          >
            DELIVERY SYSTEM
          </span>
          <div style={{ flex: 1, height: "1px", background: "var(--color-line)" }} />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 0.38fr) minmax(0, 0.62fr)",
            gap: "clamp(2rem, 6vw, 6rem)",
            alignItems: "start",
          }}
          className="process-timeline-layout"
        >
          <div style={{ position: "sticky", top: "7rem" }} className="process-timeline-intro">
            <h2 className="text-h2 uppercase">
              From signal to shipped software.
            </h2>
            <p className="text-body text-prose mt-6 text-[var(--color-text-muted)]">
              Six phases, each with a defined output — architecture and data models are settled before implementation, not discovered during it.
            </p>
          </div>

          <div style={{ position: "relative" }}>
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "1.1rem",
                top: "0.4rem",
                bottom: "0.4rem",
                width: "1px",
                background: "var(--color-line)",
              }}
            />
            <div
              data-timeline-line
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "1.1rem",
                top: "0.4rem",
                bottom: "0.4rem",
                width: "1px",
                background: "var(--color-accent)",
                boxShadow: "0 0 24px rgba(103,232,249,0.36)",
              }}
            />

            <div style={{ display: "grid", gap: "var(--space-card-gap)" }}>
              {steps.map((step) => (
                <article
                  key={step.num}
                  data-timeline-step
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2.25rem 1fr",
                    gap: "1.35rem",
                    alignItems: "start",
                    minHeight: "9.5rem",
                  }}
                >
                  <span
                    style={{
                      position: "relative",
                      zIndex: 1,
                      display: "grid",
                      width: "2.25rem",
                      height: "2.25rem",
                      placeItems: "center",
                      border: "1px solid var(--color-accent)",
                      background: "var(--color-bg)",
                      color: "var(--color-accent)",
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                    }}
                  >
                    {step.num}
                  </span>

                  <div
                    className="magic-bento-card"
                    style={{
                      border: "1px solid var(--color-line)",
                      background: "var(--color-bg-elevated)",
                      padding: "1.5rem",
                    }}
                  >
                    <h3 className="text-h4 uppercase">{step.title}</h3>
                    <p className="text-body text-prose mt-2 text-[var(--color-text-muted)]">
                      {step.desc}
                    </p>
                    <div className="process-outputs">
                      <span className="process-outputs-label">Outputs</span>
                      <ul>
                        {step.outputs.map((output) => (
                          <li key={output}>{output}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <style>{`
        @media (max-width: 900px) {
          .process-timeline-layout {
            grid-template-columns: 1fr !important;
          }
          .process-timeline-intro {
            position: static !important;
          }
        }

        .process-outputs {
          margin-top: 1.25rem;
          padding-top: 1.1rem;
          border-top: 1px solid var(--color-line);
        }
        .process-outputs-label {
          display: block;
          font-family: var(--font-mono, monospace);
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-accent);
          margin-bottom: 0.6rem;
        }
        .process-outputs ul {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .process-outputs li {
          padding: 0.3rem 0.7rem;
          border: 1px solid var(--color-line);
          font-family: var(--font-mono, monospace);
          font-size: 0.62rem;
          color: var(--color-text-muted);
        }
      `}</style>
    </section>
  );
}
