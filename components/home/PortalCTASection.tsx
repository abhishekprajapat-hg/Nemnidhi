"use client";

import Link from "next/link";
import Container from "@/components/layout/Container";

export default function PortalCTASection() {
  return (
    <section
      id="portal"
      className="section-padding"
      style={{
        background: "transparent",
        borderTop: "1px solid var(--color-line)",
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
              color: "var(--color-accent)",
              letterSpacing: "0.1em",
            }}
          >
            [ 06 ]
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.7rem",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--color-text)",
            }}
          >
            CLIENT PORTAL
          </span>
          <div style={{ flex: 1, height: "1px", background: "var(--color-line)" }} />
        </div>

        <div className="portal-cta-layout" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "3rem", alignItems: "center" }}>
          <div>
            <h2 className="text-h2 uppercase mb-6">
              <span style={{ color: "var(--color-heading)", display: "block" }}>NOTHING WORKING?</span>
              <span style={{ color: "var(--color-accent)", display: "block" }}>START A PROFILE.</span>
            </h2>
            <p className="text-body text-prose mb-8" style={{ maxWidth: "34rem", color: "var(--color-text-muted)" }}>
              We&apos;re a business-solutions company that builds digital infrastructure - or fixes what&apos;s
              already there. Create a free business profile in our client portal and tell us where things
              are breaking down. Nothing is finalized until you decide to move forward - no payment, no
              commitment, just a real read on what&apos;s possible.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
              <Link
                href="/signup"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "1rem 2rem",
                  background: "var(--color-accent)",
                  color: "#080a0c",
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                Create your profile ↗
              </Link>
              <Link
                href="/login"
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--color-text-muted)",
                  textDecoration: "none",
                }}
              >
                Already have a profile? Sign in
              </Link>
            </div>
          </div>

          <div
            style={{
              border: "1px solid var(--color-line)",
              background: "var(--color-bg-elevated)",
              padding: "2rem",
            }}
          >
            {[
              ["01", "Tell us about your business and where it's stuck."],
              ["02", "We review it and put together a real, priced plan."],
              ["03", "You decide - nothing moves forward without your go-ahead."],
            ].map(([step, text]) => (
              <div
                key={step}
                style={{
                  display: "flex",
                  gap: "1rem",
                  padding: "1rem 0",
                  borderBottom: "1px solid var(--color-line)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "0.7rem",
                    color: "var(--color-accent)",
                    flexShrink: 0,
                  }}
                >
                  {step}
                </span>
                <span style={{ fontSize: "0.85rem", color: "var(--color-text)", lineHeight: 1.5 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <style>{`
        @media (max-width: 900px) {
          .portal-cta-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
