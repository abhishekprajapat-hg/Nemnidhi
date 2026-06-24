"use client";

import { useRef } from "react";
import Container from "@/components/layout/Container";
import { useSectionLabel, useTimelineGrow } from "@/lib/useGsapAnimations";

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "We map requirements, constraints, success metrics, and the commercial outcome the software has to create.",
  },
  {
    num: "02",
    title: "Design",
    desc: "We shape product flows, visual systems, data models, and technical architecture before heavy engineering begins.",
  },
  {
    num: "03",
    title: "Development",
    desc: "Senior engineers build in focused sprints with frequent demos, clean handoffs, and deployable increments.",
  },
  {
    num: "04",
    title: "Testing",
    desc: "We validate performance, responsive behavior, edge cases, integrations, and release readiness.",
  },
  {
    num: "05",
    title: "Launch",
    desc: "We ship with monitoring, deployment confidence, documentation, and a clear plan for the next iteration.",
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
      style={{
        background: "#080a0c",
        paddingTop: "5rem",
        paddingBottom: "5rem",
        borderTop: "1px solid rgba(255,255,255,0.07)",
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
              color: "#67e8f9",
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
              color: "#f0f4f8",
            }}
          >
            PROCESS TIMELINE
          </span>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.07)" }} />
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
            <h2
              style={{
                fontFamily: "var(--font-display, var(--font-heading, sans-serif))",
                fontWeight: 900,
                fontSize: "clamp(1.95rem, 3.8vw, 3.6rem)",
                textTransform: "uppercase" as const,
                color: "#f0f4f8",
                letterSpacing: "-0.02em",
                lineHeight: 0.95,
                fontStyle: "normal",
              }}
            >
              From signal to shipped software.
            </h2>
            <p
              style={{
                marginTop: "1.5rem",
                color: "#f0f4f8",
                fontSize: "0.95rem",
                lineHeight: 1.75,
                maxWidth: "30rem",
              }}
            >
              A lean delivery rhythm that keeps strategy, design, engineering, and release quality moving together.
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
                background: "rgba(255,255,255,0.09)",
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
                background: "#67e8f9",
                boxShadow: "0 0 24px rgba(103,232,249,0.36)",
              }}
            />

            <div style={{ display: "grid", gap: "1rem" }}>
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
                      border: "1px solid rgba(103,232,249,0.4)",
                      background: "#080a0c",
                      color: "#67e8f9",
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                    }}
                  >
                    {step.num}
                  </span>

                  <div
                    style={{
                      border: "1px solid rgba(255,255,255,0.07)",
                      background: "#0d1117",
                      padding: "1.5rem",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "var(--font-display, var(--font-heading, sans-serif))",
                        fontWeight: 900,
                        fontSize: "clamp(1.15rem, 1.55vw, 1.45rem)",
                        textTransform: "uppercase" as const,
                        color: "#f0f4f8",
                        letterSpacing: "-0.01em",
                        lineHeight: 1,
                        fontStyle: "normal",
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        marginTop: "0.9rem",
                        color: "#f0f4f8",
                        fontSize: "0.875rem",
                        lineHeight: 1.7,
                      }}
                    >
                      {step.desc}
                    </p>
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
      `}</style>
    </section>
  );
}
