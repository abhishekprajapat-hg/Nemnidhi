"use client";

import { useRef } from "react";
import Container from "@/components/layout/Container";
import { useScrollReveal, useSectionLabel } from "@/lib/useGsapAnimations";

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

  // ── GSAP: section label fade-in
  useSectionLabel(sectionRef);
  // ── GSAP: staggered card reveal (y:80→0, opacity:0→1, stagger 0.15s)
  useScrollReveal(sectionRef, { stagger: 0.15, startY: 80 });

  const items = services && services.length > 0 ? services : defaultServices;

  return (
    <section
      id="services"
      ref={sectionRef}
      data-scroll-chapter
      style={{
        background: "#080a0c",
        paddingTop: "5rem",
        paddingBottom: "5rem",
      }}
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
              color: "#67e8f9",
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
              color: "#f0f4f8",
            }}
          >
            WHAT WE BUILD
          </span>
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "rgba(255,255,255,0.07)",
            }}
          />
        </div>

        {/* 2-column grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1px",
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
          className="services-grid-responsive"
        >
          {items.map((service, i) => (
            <div
              key={service._id ?? i}
              data-reveal
              className="service-card-hover"
              style={{
                padding: "2.5rem",
                background: "#080a0c",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
            >
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
                    color: "#67e8f9",
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
                  style={{ color: "#475569" }}
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
              <h3
                style={{
                  fontFamily:
                    "var(--font-display, var(--font-heading, sans-serif))",
                  fontWeight: 900,
                  fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)",
                  textTransform: "uppercase" as const,
                  color: "#f0f4f8",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.1,
                  marginBottom: "1rem",
                  fontStyle: "italic",
                }}
              >
                {service.title.replace(/^0\d\s*/, "")}
              </h3>

              {/* Description */}
              <p
                style={{
                  color: "#f0f4f8",
                  fontSize: "0.875rem",
                  lineHeight: 1.65,
                  marginBottom: "1.5rem",
                }}
              >
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
                        border: "1px solid rgba(255,255,255,0.1)",
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: "0.62rem",
                        fontWeight: 500,
                        letterSpacing: "0.04em",
                        color: "#94a3b8",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>

      <style>{`
        .service-card-hover:hover {
          background: #0d1117 !important;
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
