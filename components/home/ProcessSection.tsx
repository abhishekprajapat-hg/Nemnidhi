"use client";

import { useRef, lazy, Suspense } from "react";
import type { FC } from "react";
import Container from "@/components/layout/Container";
import { useSectionLabel, useTimelineGrow } from "@/lib/useGsapAnimations";

// ─── PERF FIX: All 5 illustrations lazy-loaded via direct paths (tree-shaken)
// Previously imported eagerly from main entry point — added ~120kB to initial bundle
interface IllustrationProps { primaryColor?: string; height?: string; }

const UndrawBrainstorming = lazy(() =>
  import("react-undraw-illustrations/lib/components/UndrawBrainstorming").then(
    (m) => ({ default: (m.UndrawBrainstorming ?? m.default) as FC<IllustrationProps> })
  )
);
const UndrawWireframing = lazy(() =>
  import("react-undraw-illustrations/lib/components/UndrawWireframing").then(
    (m) => ({ default: (m.UndrawWireframing ?? m.default) as FC<IllustrationProps> })
  )
);
const UndrawProgramming = lazy(() =>
  import("react-undraw-illustrations/lib/components/UndrawProgramming").then(
    (m) => ({ default: (m.UndrawProgramming ?? m.default) as FC<IllustrationProps> })
  )
);
const UndrawQaEngineers = lazy(() =>
  import("react-undraw-illustrations/lib/components/UndrawQaEngineers").then(
    (m) => ({ default: (m.UndrawQaEngineers ?? m.default) as FC<IllustrationProps> })
  )
);
const UndrawRising = lazy(() =>
  import("react-undraw-illustrations/lib/components/UndrawRising").then(
    (m) => ({ default: (m.UndrawRising ?? m.default) as FC<IllustrationProps> })
  )
);

const BRAND_CYAN = "#67e8f9";

type IllustrationKey = "brainstorming" | "wireframing" | "programming" | "qa" | "rising";

const steps: { num: string; title: string; desc: string; illustrationKey: IllustrationKey }[] = [
  {
    num: "01",
    title: "Discovery",
    desc: "We map requirements, constraints, success metrics, and the commercial outcome the software has to create.",
    illustrationKey: "brainstorming",
  },
  {
    num: "02",
    title: "Design",
    desc: "We shape product flows, visual systems, data models, and technical architecture before heavy engineering begins.",
    illustrationKey: "wireframing",
  },
  {
    num: "03",
    title: "Development",
    desc: "Senior engineers build in focused sprints with frequent demos, clean handoffs, and deployable increments.",
    illustrationKey: "programming",
  },
  {
    num: "04",
    title: "Testing",
    desc: "We validate performance, responsive behavior, edge cases, integrations, and release readiness.",
    illustrationKey: "qa",
  },
  {
    num: "05",
    title: "Launch",
    desc: "We ship with monitoring, deployment confidence, documentation, and a clear plan for the next iteration.",
    illustrationKey: "rising",
  },
];

function StepIllustration({ illustrationKey }: { illustrationKey: IllustrationKey }) {
  const props: IllustrationProps = { primaryColor: BRAND_CYAN, height: "120px" };
  return (
    <Suspense fallback={<div style={{ height: "120px" }} />}>
      {illustrationKey === "brainstorming" && <UndrawBrainstorming {...props} />}
      {illustrationKey === "wireframing" && <UndrawWireframing {...props} />}
      {illustrationKey === "programming" && <UndrawProgramming {...props} />}
      {illustrationKey === "qa" && <UndrawQaEngineers {...props} />}
      {illustrationKey === "rising" && <UndrawRising {...props} />}
    </Suspense>
  );
}

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useSectionLabel(sectionRef);
  useTimelineGrow(sectionRef);

  return (
    <section
      id="process"
      ref={sectionRef}
      data-scroll-chapter
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
            PROCESS TIMELINE
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
                    {/* Lazy illustration — deferred until React hydrates this card */}
                    <div style={{ margin: "0.9rem 0", opacity: 0.85 }}>
                      <StepIllustration illustrationKey={step.illustrationKey} />
                    </div>
                    <p className="text-body text-prose mt-2 text-[var(--color-text-muted)]">
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
