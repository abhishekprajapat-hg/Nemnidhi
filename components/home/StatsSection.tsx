"use client";

import { useRef } from "react";
import Container from "@/components/layout/Container";
import { useCountUp } from "@/lib/useGsapAnimations";

const stats = [
  { value: 50, suffix: "+", label: "PROJECTS" },
  { value: 20, suffix: "+", label: "CLIENTS" },
  { value: 99, suffix: "%", label: "SATISFACTION" },
  { value: 6, suffix: "+", label: "YEARS OPERATING" },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useCountUp(sectionRef);

  return (
    <section
      id="proof"
      ref={sectionRef}
      data-scroll-chapter
      suppressHydrationWarning
      className="scroll-proof-section"
    >
      <Container size="wide">
        <div className="stats-grid stats-grid-responsive">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="stat-card magic-bento-card"
              data-last={i === stats.length - 1 ? "true" : undefined}
            >
              <p
                data-count-target={stat.value}
                data-count-suffix={stat.suffix}
                className="stat-number"
              >
                0{stat.suffix}
              </p>
              <p className="stat-label">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>

      <style>{`
        @media (max-width: 768px) {
          .stats-grid-responsive {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .stats-grid-responsive > div:nth-child(2) { border-right: none !important; }
          .stats-grid-responsive > div:nth-child(1),
          .stats-grid-responsive > div:nth-child(2) {
            border-bottom: 1px solid rgba(255,255,255,0.07);
          }
        }
        @media (max-width: 480px) {
          .stats-grid-responsive { grid-template-columns: 1fr !important; }
          .stats-grid-responsive > div { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.07) !important; }
          .stats-grid-responsive > div:last-child { border-bottom: none !important; }
        }
      `}</style>
    </section>
  );
}
