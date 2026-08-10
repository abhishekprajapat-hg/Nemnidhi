"use client";

import { useRef, useState } from "react";
import Container from "@/components/layout/Container";
import { useFinalCtaAnimation, useSectionLabel } from "@/lib/useGsapAnimations";

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

const contactInfo = [
  { label: "GENERAL INQUIRIES", value: "info@nemnidhi.com", href: "mailto:info@nemnidhi.com" },
  { label: "SUPPORT", value: "support@nemnidhi.com", href: "mailto:support@nemnidhi.com" },
  { label: "ADDRESS", value: "B20 - 5th Floor, Gravity Mall, Mechanic Nagar, Indore" },
  { label: "PHONE", value: "7000445463" },
  { label: "GSTIN", value: "23CGZPB7175E1Z5" },
];

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  budget: string;
  timeline: string;
  message: string;
};

type ContactApiResponse = {
  message?: string;
};

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useSectionLabel(sectionRef);
  useFinalCtaAnimation(sectionRef);

  const [form, setForm] = useState<FormState>({
    name: "",
    company: "",
    email: "",
    phone: "+91 ",
    budget: "",
    timeline: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "Home page" }),
      });
      const contentType = res.headers.get("content-type") || "";
      let data: ContactApiResponse | null = null;
      if (contentType.includes("application/json")) data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Something went wrong.");
      setSuccess(data?.message || "Thanks. We'll reply within 24 hours.");
      setForm({ name: "", company: "", email: "", phone: "+91 ", budget: "", timeline: "", message: "" });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.85rem 1rem",
    background: "var(--color-bg-card)",
    border: `1px solid var(--color-line)`,
    color: "var(--color-text)",
    fontSize: "0.875rem",
    outline: "none",
    transition: "border-color 0.2s",
    fontFamily: "inherit",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: S.mono,
    fontSize: "0.6rem",
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: S.muted,
    marginBottom: "0.5rem",
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = S.accent;
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = S.line;
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      data-scroll-chapter
      className="section-padding"
      style={{
        background: "transparent",
        borderTop: "1px solid var(--color-line)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        data-cta-gradient
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "-20%",
          background:
            "linear-gradient(115deg, rgba(103,232,249,0.04), transparent 28%, rgba(103,232,249,0.18) 52%, transparent 72%, rgba(240,249,255,0.05))",
          pointerEvents: "none",
          willChange: "transform",
        }}
      />
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
            [ 04 ]
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
            GET IN TOUCH
          </span>
          <div style={{ flex: 1, height: "1px", background: "var(--color-line)" }} />
        </div>

        {/* Two-column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "start",
          }}
          className="contact-grid-responsive"
        >
          {/* Left: Heading + contact info */}
          <div>
            <h2
              data-cta-copy
              className="text-h2 uppercase mb-6"
            >
              <span style={{ color: "var(--color-heading)", display: "block" }}>READY TO</span>
              <span style={{ color: "var(--color-accent)", display: "block" }}>BUILD?</span>
            </h2>

            <p
              data-cta-copy
              className="text-body text-prose mb-10"
              style={{ maxWidth: "26rem" }}
            >
              Tell us what you're working on. We respond within 24 hours and move fast from there.
            </p>

            {/* Contact rows */}
            <div>
              {contactInfo.map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1rem 0",
                    borderBottom: "1px solid var(--color-line)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "0.62rem",
                      fontWeight: 500,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase" as const,
                      color: "var(--color-text-faint)",
                    }}
                  >
                    {item.label}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      style={{
                        color: "var(--color-heading)",
                        fontSize: "0.85rem",
                        transition: "color 0.2s, background 0.2s",
                        textDecoration: "none",
                        textAlign: "right",
                        lineHeight: 1.6,
                        maxWidth: "60%",
                        background: "transparent",
                      }}
                      onMouseEnter={(e) => {
                        const target = e.target as HTMLAnchorElement;
                        target.style.color = "var(--color-accent)";
                        target.style.background = "transparent";
                      }}
                      onMouseLeave={(e) => {
                        const target = e.target as HTMLAnchorElement;
                        target.style.color = "var(--color-heading)";
                        target.style.background = "transparent";
                      }}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <div
                      style={{
                        color: "var(--color-heading)",
                        fontSize: "0.85rem",
                        textAlign: "right",
                        lineHeight: 1.6,
                        maxWidth: "60%",
                      }}
                    >
                      {item.value}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div data-cta-copy>
            {error && (
              <div style={{ marginBottom: "1.25rem", padding: "0.85rem 1rem", border: "1px solid rgba(239,68,68,0.4)", background: "rgba(239,68,68,0.08)", color: "#fca5a5", fontFamily: S.mono, fontSize: "0.7rem" }}>
                {error}
              </div>
            )}
            {success && (
              <div style={{ marginBottom: "1.25rem", padding: "0.85rem 1rem", border: "1px solid rgba(103,232,249,0.4)", background: "rgba(103,232,249,0.08)", color: S.accent, fontFamily: S.mono, fontSize: "0.7rem" }}>
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1.25rem" }}>
              {/* Name + Company */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-two-col">
                <div>
                  <label htmlFor="hp-name" style={labelStyle}>NAME <span style={{ color: S.accent }}>*</span></label>
                  <input id="hp-name" type="text" required placeholder="Your name" value={form.name} onChange={(e) => handleChange("name", e.target.value)} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                </div>
                <div>
                  <label htmlFor="hp-company" style={labelStyle}>COMPANY</label>
                  <input id="hp-company" type="text" placeholder="Company name" value={form.company} onChange={(e) => handleChange("company", e.target.value)} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                </div>
              </div>

              {/* Email + Phone */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-two-col">
                <div>
                  <label htmlFor="hp-email" style={labelStyle}>EMAIL <span style={{ color: S.accent }}>*</span></label>
                  <input id="hp-email" type="email" required placeholder="you@company.com" value={form.email} onChange={(e) => handleChange("email", e.target.value)} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                </div>
                <div>
                  <label htmlFor="hp-phone" style={labelStyle}>PHONE <span style={{ color: S.accent }}>*</span></label>
                  <input id="hp-phone" type="tel" required placeholder="+91 98765 43210" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                </div>
              </div>

              {/* Budget + Timeline */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-two-col">
                <div>
                  <label htmlFor="hp-budget" style={labelStyle}>INDICATIVE BUDGET</label>
                  <select id="hp-budget" value={form.budget} onChange={(e) => handleChange("budget", e.target.value)} style={{ ...inputStyle, color: form.budget ? S.white : S.faint }} onFocus={onFocus} onBlur={onBlur}>
                    <option value="" style={{ background: S.bgCard }}>Select range</option>
                    <option value="below-50k" style={{ background: S.bgCard }}>Below INR 50,000</option>
                    <option value="50k-1l" style={{ background: S.bgCard }}>INR 50,000 – 1,00,000</option>
                    <option value="1l-3l" style={{ background: S.bgCard }}>INR 1,00,000 – 3,00,000</option>
                    <option value="3l-plus" style={{ background: S.bgCard }}>INR 3,00,000+</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="hp-timeline" style={labelStyle}>IDEAL TIMELINE</label>
                  <select id="hp-timeline" value={form.timeline} onChange={(e) => handleChange("timeline", e.target.value)} style={{ ...inputStyle, color: form.timeline ? S.white : S.faint }} onFocus={onFocus} onBlur={onBlur}>
                    <option value="" style={{ background: S.bgCard }}>Select timeline</option>
                    <option value="asap" style={{ background: S.bgCard }}>ASAP (2–4 weeks)</option>
                    <option value="1-3-months" style={{ background: S.bgCard }}>1–3 months</option>
                    <option value="3-plus-months" style={{ background: S.bgCard }}>3+ months</option>
                    <option value="exploring" style={{ background: S.bgCard }}>Just exploring</option>
                  </select>
                </div>
              </div>

              {/* Project Brief */}
              <div>
                <label htmlFor="hp-message" style={labelStyle}>PROJECT BRIEF <span style={{ color: S.accent }}>*</span></label>
                <textarea
                  id="hp-message"
                  required
                  rows={4}
                  placeholder="Tell us about your project..."
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              </div>

              {/* Submit */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", paddingTop: "0.5rem" }}>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.6rem",
                    padding: "1rem 2rem", background: submitting ? "#475569" : S.accent,
                    color: "#080a0c", border: "none", fontFamily: S.mono,
                    fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
                    textTransform: "uppercase", cursor: submitting ? "not-allowed" : "pointer",
                    transition: "background 0.2s",
                  }}
                >
                  {submitting ? "SENDING..." : "SEND MESSAGE ↗"}
                </button>
                <p style={{ fontFamily: S.mono, fontSize: "0.6rem", color: S.faint, letterSpacing: "0.04em" }}>
                  We only use your details to respond to this request.
                </p>
              </div>
            </form>
          </div>
        </div>
      </Container>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid-responsive {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
        @media (max-width: 640px) {
          .form-two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
