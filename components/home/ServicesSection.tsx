"use client";

import { useRef } from "react";
import Container from "@/components/layout/Container";
import { useScrollReveal, useSectionLabel } from "@/lib/useGsapAnimations";

const SERVICE_ILLUSTRATION_KEYS = ["coding", "mobile", "cloud", "ai"] as const;
type IllustrationKey = typeof SERVICE_ILLUSTRATION_KEYS[number];

function ServiceCardIllustration({ index }: { index: number }) {
  const key: IllustrationKey = SERVICE_ILLUSTRATION_KEYS[index % SERVICE_ILLUSTRATION_KEYS.length];
  const labels: Record<IllustrationKey, string> = {
    coding: "WEB",
    mobile: "APP",
    cloud: "CLOUD",
    ai: "AI",
  };

  return (
    <div className="service-card-mark" aria-hidden="true">
      <span>{labels[key]}</span>
    </div>
  );
}

const BRAND_CYAN = "#67e8f9";

type Service = {
  _id?: string;
  title: string;
  description: string;
  points?: string[];
};

const defaultServices = [
  {
    _id: "1",
    title: "WEB ENGINEERING",
    description:
      "Full-stack web applications built for scale. React, Next.js, Node — architected for performance from day one.",
    points: ["React", "Next.js", "Node.js", "PostgreSQL"],
  },
  {
    _id: "2",
    title: "MOBILE DEVELOPMENT",
    description:
      "Native and cross-platform mobile applications that ship on time and hold up in production.",
    points: ["React Native", "iOS", "Android", "Expo"],
  },
  {
    _id: "3",
    title: "CLOUD & DEVOPS",
    description:
      "Infrastructure that scales with your business. CI/CD pipelines, container orchestration, zero-downtime deployments.",
    points: ["AWS", "Docker", "Kubernetes", "Terraform"],
  },
  {
    _id: "4",
    title: "AI INTEGRATION",
    description:
      "Intelligent systems embedded into your product. LLM pipelines, RAG architectures, and custom model fine-tuning.",
    points: ["LLMs", "RAG", "Python", "Vector DBs"],
  },
];

export default function ServicesSection({
  services,
}: {
  services?: Service[];
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useSectionLabel(sectionRef);
  useScrollReveal(sectionRef, { stagger: 0.15, startY: 80 });

  const items = services && services.length > 0 ? services : defaultServices;

  return (
    <section
      id="services"
      ref={sectionRef}
      data-scroll-chapter
      suppressHydrationWarning
      className="section-padding"
    >
      <Container size="wide">
        {/* Section label */}
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
            [ 01 ]
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
            WHAT WE BUILD
          </span>
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "var(--color-line)",
            }}
          />
        </div>

        {/* 2-column grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1px",
            background: "var(--color-line)",
            border: "1px solid var(--color-line)",
          }}
          className="services-grid-responsive"
        >
          {items.map((service, i) => {
            return (
            <div
              key={service._id ?? i}
              data-reveal
              className="service-card-hover magic-bento-card"
              style={{
                padding: "2.5rem",
                background: "var(--color-bg-card)",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
            >
              <div style={{ marginBottom: "1.5rem", opacity: 0.9 }}>
                <ServiceCardIllustration index={i} />
              </div>

              {/* Number + arrow row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1.5rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--color-accent)",
                    letterSpacing: "0.06em",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  <path
                    d="M2 12L12 2M12 2H4M12 2V10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Title */}
              <h3 className="text-h3">
                {service.title.replace(/^0\d\s*/, "")}
              </h3>

              {/* Description */}
              <p className="text-prose mb-6" style={{ color: "var(--color-text-muted)" }}>
                {service.description}
              </p>

              {/* Tags */}
              {service.points && service.points.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "0.5rem" }}>
                  {service.points.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        display: "inline-block",
                        padding: "0.3rem 0.7rem",
                        border: "1px solid var(--color-line)",
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: "0.62rem",
                        fontWeight: 500,
                        letterSpacing: "0.04em",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );})}
        </div>
      </Container>

      <style>{`
        .service-card-hover:hover {
          background: var(--color-bg-card-hover) !important;
        }
        .service-card-mark {
          display: grid;
          min-height: 160px;
          place-items: center;
          border: 1px solid color-mix(in srgb, ${BRAND_CYAN} 32%, transparent);
          background:
            linear-gradient(135deg, color-mix(in srgb, ${BRAND_CYAN} 18%, transparent), transparent 48%),
            repeating-linear-gradient(90deg, color-mix(in srgb, ${BRAND_CYAN} 12%, transparent) 0 1px, transparent 1px 22px);
          color: var(--color-accent);
          font-family: var(--font-mono, monospace);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.16em;
        }
        @media (max-width: 768px) {
          .services-grid-responsive {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
