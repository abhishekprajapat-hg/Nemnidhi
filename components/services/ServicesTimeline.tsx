"use client";

import { useRef, type ReactElement } from "react";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { useSectionLabel, useTimelineGrow } from "@/lib/useGsapAnimations";

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

import { S } from "@/lib/styleTokens";

// ─── Illustration dispatcher ───
const TIMELINE_ICONS: Record<NonNullable<Service["illustrationKey"]>, ReactElement> = {
  dashboard: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <path d="M9 8 4.5 12 9 16M15 8l4.5 4-4.5 4M13.5 6 10.5 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  devices: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <rect x="6.5" y="2.5" width="11" height="19" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.5 18.5h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  server: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <rect x="3.5" y="4" width="17" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3.5" y="14" width="17" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 7h.01M7 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  data: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <path d="M5 19V11M12 19V5M19 19v-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  brainstorming: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.44.95 1.14.95 1.85V16h5.1v-.25c0-.71.35-1.4.95-1.85A6 6 0 0 0 12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  wireframing: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <rect x="3.5" y="4.5" width="17" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.5 9h17M8 16.5V20M16 16.5V20M6 20h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

function ServiceIllustration({ illustrationKey }: { illustrationKey: Service["illustrationKey"] }) {
  if (!illustrationKey) return null;

  const labels: Record<NonNullable<Service["illustrationKey"]>, string> = {
    dashboard: "WEB",
    devices: "APP",
    server: "CLOUD",
    data: "DATA",
    brainstorming: "PLAN",
    wireframing: "UX",
  };

  return (
    <div className="service-timeline-mark" aria-hidden="true">
      {TIMELINE_ICONS[illustrationKey]}
      <span>{labels[illustrationKey]}</span>
    </div>
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
            <nav aria-label="Capability index" className="capability-index">
              {services.map((svc) => (
                <a key={svc.num} href={`#cap-${svc.num}`} className="capability-index-item">
                  <span style={{ color: S.accent, fontFamily: S.mono, fontSize: "0.68rem" }}>{svc.num}</span>
                  <span>{svc.title}</span>
                </a>
              ))}
            </nav>
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
                  id={`cap-${svc.num}`}
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
        .capability-index {
          display: flex;
          flex-direction: column;
          margin-top: 2.5rem;
          border-top: 1px solid ${S.line};
        }
        .capability-index-item {
          display: flex;
          align-items: baseline;
          gap: 0.85rem;
          padding: 0.85rem 0;
          border-bottom: 1px solid ${S.line};
          text-decoration: none;
          color: ${S.muted};
          font-size: 0.85rem;
          transition: color 0.15s;
        }
        .capability-index-item:hover {
          color: ${S.white};
        }

        @media (max-width: 900px) {
          .services-timeline-layout {
            grid-template-columns: 1fr !important;
          }
          .services-timeline-intro {
            position: static !important;
          }
          .capability-index {
            display: none;
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

        .service-timeline-mark {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.7rem;
          width: 200px;
          min-height: 160px;
          border: 1px solid color-mix(in srgb, ${BRAND_CYAN} 32%, transparent);
          background:
            radial-gradient(circle at 50% 50%, color-mix(in srgb, ${BRAND_CYAN} 18%, transparent), transparent 58%),
            repeating-linear-gradient(90deg, color-mix(in srgb, ${BRAND_CYAN} 12%, transparent) 0 1px, transparent 1px 22px);
          color: var(--color-accent);
          font-family: var(--font-mono, monospace);
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.16em;
        }
      `}</style>
    </section>
  );
}
