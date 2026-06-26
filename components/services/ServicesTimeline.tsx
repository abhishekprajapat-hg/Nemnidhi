"use client";

import { useRef } from "react";
import Container from "@/components/layout/Container";
import { useSectionLabel, useTimelineGrow } from "@/lib/useGsapAnimations";

type Service = {
  num: string;
  title: string;
  desc: string;
  tags: string[];
  details: string[];
};

type ServicesTimelineProps = {
  services: Service[];
};

const S = {
  bg: "#080a0c",
  bgCard: "#0d1117",
  line: "rgba(255,255,255,0.07)",
  accent: "#67e8f9",
  white: "#f0f4f8",
  muted: "#f0f4f8",
  faint: "#475569",
  mono: "var(--font-mono, monospace)",
  heading: "var(--font-display, var(--font-heading, sans-serif))",
};

export default function ServicesTimeline({ services }: ServicesTimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useSectionLabel(sectionRef);
  useTimelineGrow(sectionRef);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: "5rem 0",
        borderTop: `1px solid ${S.line}`,
      }}
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
            <h2
              style={{
                fontFamily: S.heading,
                fontWeight: 900,
                fontSize: "clamp(1.95rem, 3.8vw, 3.6rem)",
                textTransform: "uppercase" as const,
                color: S.white,
                letterSpacing: "-0.02em",
                lineHeight: 0.95,
                fontStyle: "normal",
              }}
            >
              Six capabilities. One delivery engine.
            </h2>
            <p
              style={{
                marginTop: "1.5rem",
                color: S.muted,
                fontSize: "0.95rem",
                lineHeight: 1.75,
                maxWidth: "30rem",
              }}
            >
              Explore the core service tracks we combine to plan, build, launch, and improve production-grade digital systems.
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
                background: S.accent,
                boxShadow: "0 0 24px rgba(103,232,249,0.36)",
              }}
            />

            <div style={{ display: "grid", gap: "1rem" }}>
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

                  <div
                    className="service-page-card magic-bento-card"
                    style={{
                      border: `1px solid ${S.line}`,
                      background: S.bgCard,
                      padding: "clamp(1.35rem, 3vw, 2.5rem)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "flex-start", marginBottom: "1rem" }}>
                      <h2 style={{ fontFamily: S.heading, fontWeight: 900, fontStyle: "normal", fontSize: "clamp(1.15rem, 1.55vw, 1.45rem)", textTransform: "uppercase", color: S.white, letterSpacing: "-0.005em", lineHeight: 1.15, margin: 0 }}>
                        {svc.title}
                      </h2>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: S.faint, flex: "0 0 auto", marginTop: "0.2rem" }}>
                        <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>

                    <p style={{ color: S.muted, fontSize: "0.875rem", lineHeight: 1.65, marginBottom: "1.5rem" }}>
                      {svc.desc}
                    </p>

                    <ul style={{ marginBottom: "1.5rem", display: "grid", gap: "0.5rem" }}>
                      {svc.details.map((detail) => (
                        <li key={detail} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontFamily: S.mono, fontSize: "0.7rem", color: S.muted, letterSpacing: "0.02em" }}>
                          <span style={{ width: 4, height: 4, borderRadius: "50%", background: S.accent, flexShrink: 0, display: "inline-block" }} />
                          {detail}
                        </li>
                      ))}
                    </ul>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {svc.tags.map((tag) => (
                        <span key={tag} style={{ padding: "0.3rem 0.7rem", border: "1px solid rgba(255,255,255,0.1)", fontFamily: S.mono, fontSize: "0.62rem", color: "#94a3b8" }}>
                          {tag}
                        </span>
                      ))}
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
          .services-timeline-layout {
            grid-template-columns: 1fr !important;
          }
          .services-timeline-intro {
            position: static !important;
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
      `}</style>
    </section>
  );
}
