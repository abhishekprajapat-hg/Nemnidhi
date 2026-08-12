"use client";

import { useRef, lazy, Suspense } from "react";
import type { FC, CSSProperties } from "react";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { useSectionLabel, useTimelineGrow } from "@/lib/useGsapAnimations";

interface UndrawProps {
  primaryColor?: string;
  height?: string;
  style?: CSSProperties;
}

// ─── Lazy-load illustrations (tree-shaken, below-the-fold safe) ───
const UndrawDashboard = lazy(() =>
  import("react-undraw-illustrations/lib/components/UndrawDashboard").then(
    (m) => ({ default: (m.UndrawDashboard ?? m.default) as FC<UndrawProps> })
  )
);
const UndrawDevices = lazy(() =>
  import("react-undraw-illustrations/lib/components/UndrawDevices").then(
    (m) => ({ default: (m.UndrawDevices ?? m.default) as FC<UndrawProps> })
  )
);
const UndrawServer = lazy(() =>
  import("react-undraw-illustrations/lib/components/UndrawServer").then(
    (m) => ({ default: (m.UndrawServer ?? m.default) as FC<UndrawProps> })
  )
);
const UndrawData = lazy(() =>
  import("react-undraw-illustrations/lib/components/UndrawData").then(
    (m) => ({ default: (m.UndrawData ?? m.default) as FC<UndrawProps> })
  )
);
const UndrawBrainstorming = lazy(() =>
  import("react-undraw-illustrations/lib/components/UndrawBrainstorming").then(
    (m) => ({ default: (m.UndrawBrainstorming ?? m.default) as FC<UndrawProps> })
  )
);
const UndrawWireframing = lazy(() =>
  import("react-undraw-illustrations/lib/components/UndrawWireframing").then(
    (m) => ({ default: (m.UndrawWireframing ?? m.default) as FC<UndrawProps> })
  )
);

const BRAND_CYAN = "#67e8f9";

type Service = {
  num: string;
  slug?: string;
  title: string;
  desc: string;
  tags: string[];
  details: string[];
  illustrationKey?: "dashboard" | "devices" | "server" | "data" | "brainstorming" | "wireframing";
};

type ServicesTimelineProps = {
  services: Service[];
};

const S = {
  bg: "var(--color-bg)",
  bgCard: "var(--color-bg-elevated)",
  line: "var(--color-line)",
  accent: "var(--color-accent)",
  white: "var(--color-heading)",
  muted: "var(--color-text-muted)",
  faint: "var(--color-text-faint)",
  mono: "var(--font-mono, monospace)",
  heading: "var(--font-display, var(--font-heading, sans-serif))",
};

// ─── Illustration dispatcher ───
function ServiceIllustration({ illustrationKey }: { illustrationKey: Service["illustrationKey"] }) {
  if (!illustrationKey) return null;

  const sharedProps = {
    primaryColor: BRAND_CYAN,
    style: { width: "100%", height: "auto", maxWidth: 220 },
  };

  return (
    <Suspense fallback={<div style={{ width: 220, height: 180 }} />}>
      {illustrationKey === "dashboard" && <UndrawDashboard {...sharedProps} />}
      {illustrationKey === "devices" && <UndrawDevices {...sharedProps} />}
      {illustrationKey === "server" && <UndrawServer {...sharedProps} />}
      {illustrationKey === "data" && <UndrawData {...sharedProps} />}
      {illustrationKey === "brainstorming" && <UndrawBrainstorming {...sharedProps} />}
      {illustrationKey === "wireframing" && <UndrawWireframing {...sharedProps} />}
    </Suspense>
  );
}

export default function ServicesTimeline({ services }: ServicesTimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useSectionLabel(sectionRef);
  useTimelineGrow(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="section-padding"
      style={{ borderTop: `1px solid ${S.line}` }}
    >
      <Container size="wide">
        <div
          data-section-label
          style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "3rem" }}
        >
          <span style={{ fontFamily: S.mono, fontSize: "0.7rem", fontWeight: 600, color: S.accent, letterSpacing: "0.1em" }}>
            [ 01 ]
          </span>
          <span style={{ fontFamily: S.mono, fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: S.muted }}>
            OUR CAPABILITIES
          </span>
          <div style={{ flex: 1, height: "1px", background: S.line }} />
        </div>

        <div
          className="services-timeline-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 0.34fr) minmax(0, 0.66fr)",
            gap: "clamp(2rem, 6vw, 6rem)",
            alignItems: "start",
          }}
        >
          <div className="services-timeline-intro" style={{ position: "sticky", top: "7rem" }}>
            <h2 className="text-h2 uppercase">
              Six capabilities. One delivery engine.
            </h2>
            <p className="text-body text-prose mt-6 text-[var(--color-text-muted)]">
              Explore the core service tracks we combine to plan, build, launch, and improve production-grade digital systems.
            </p>
          </div>

          <div style={{ position: "relative" }}>
            {/* Timeline track */}
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
                background: S.accent,
                boxShadow: "0 0 24px rgba(103,232,249,0.36)",
              }}
            />

            <div style={{ display: "grid", gap: "var(--space-card-gap)" }}>
              {services.map((svc) => (
                <article
                  key={svc.num}
                  data-timeline-step
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2.25rem 1fr",
                    gap: "1.35rem",
                    alignItems: "start",
                    minHeight: "13rem",
                  }}
                >
                  {/* Step dot */}
                  <span
                    style={{
                      position: "relative",
                      zIndex: 1,
                      display: "grid",
                      width: "2.25rem",
                      height: "2.25rem",
                      placeItems: "center",
                      border: "1px solid rgba(103,232,249,0.4)",
                      background: S.bg,
                      color: S.accent,
                      fontFamily: S.mono,
                      fontSize: "0.7rem",
                      fontWeight: 700,
                    }}
                  >
                    {svc.num}
                  </span>

                  {/* Card */}
                  <div
                    className="service-page-card magic-bento-card"
                    style={{
                      border: `1px solid ${S.line}`,
                      background: S.bgCard,
                      padding: "clamp(1.35rem, 3vw, 2.5rem)",
                    }}
                  >
                    {/* Header row — title + illustration */}
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "1.5rem", alignItems: "flex-start", marginBottom: "1rem" }}>
                      <div style={{ flex: 1 }}>
                        <h3 className="text-h4 uppercase m-0">{svc.title}</h3>
                        <p className="text-body text-prose mt-2 mb-0 text-[var(--color-text-muted)]">
                          {svc.desc}
                        </p>
                      </div>
                      {svc.illustrationKey && (
                        <div style={{ flexShrink: 0, width: 200, display: "flex", alignItems: "center", justifyContent: "flex-end" }} className="svc-illustration-col">
                          <ServiceIllustration illustrationKey={svc.illustrationKey} />
                        </div>
                      )}
                    </div>

                    {/* What we deliver */}
                    <ul style={{ marginBottom: "1.5rem", display: "grid", gap: "0.5rem" }}>
                      {svc.details.map((detail) => (
                        <li key={detail} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontFamily: S.mono, fontSize: "0.7rem", color: S.muted, letterSpacing: "0.02em" }}>
                          <span style={{ width: 4, height: 4, borderRadius: "50%", background: S.accent, flexShrink: 0, display: "inline-block" }} />
                          {detail}
                        </li>
                      ))}
                    </ul>

                    {/* Tags */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {svc.tags.map((tag) => (
                        <span key={tag} style={{ padding: "0.3rem 0.7rem", border: "1px solid rgba(255,255,255,0.1)", fontFamily: S.mono, fontSize: "0.62rem", color: "#94a3b8" }}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Industries, timeline, pricing, deliverables, and FAQ live on the dedicated service page — not duplicated here */}
                    {svc.slug && (
                      <div style={{ marginTop: "1.5rem", borderTop: `1px solid ${S.line}`, paddingTop: "1.25rem" }}>
                        <Link
                          href={`/services/${svc.slug}`}
                          style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem", background: S.accent, color: "#080a0c", fontFamily: S.mono, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}
                        >
                          View Full Details →
                        </Link>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <style>{`
        @media (max-width: 900px) {
          .services-timeline-layout {
            grid-template-columns: 1fr !important;
          }
          .services-timeline-intro {
            position: static !important;
          }
        }

        @media (max-width: 640px) {
          .svc-illustration-col {
            display: none !important;
          }
          .svc-meta-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 560px) {
          .services-timeline-layout article {
            grid-template-columns: 1.9rem 1fr !important;
            gap: 0.9rem !important;
          }
          .services-timeline-layout article > span {
            width: 1.9rem !important;
            height: 1.9rem !important;
          }
        }

        [data-theme="light"] .service-page-card {
          background: var(--color-bg-elevated) !important;
        }
      `}</style>
    </section>
  );
}
