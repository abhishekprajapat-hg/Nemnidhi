"use client";

import { useState } from "react";
import Container from "@/components/layout/Container";

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

const contactInfo = [
  { label: "GENERAL INQUIRIES", value: "hello@nemnidhi.com", href: "mailto:hello@nemnidhi.com" },
  { label: "NEW PROJECTS", value: "projects@nemnidhi.com", href: "mailto:projects@nemnidhi.com" },
  { label: "CAREERS", value: "careers@nemnidhi.com", href: "mailto:careers@nemnidhi.com" },
  { label: "PHONE", value: "+91 70004 55463", href: "tel:+917000455463" },
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

export default function ContactPage() {
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
        body: JSON.stringify({ ...form, source: "Contact page" }),
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
    background: "transparent",
    border: `1px solid ${S.line}`,
    color: S.white,
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
    <div style={{ background: S.bg, minHeight: "100svh" }}>
      {/* ─── Hero ─── */}
      <section style={{ padding: "7rem 0 4rem" }}>
        <Container size="wide">
          <p style={{ fontFamily: S.mono, fontSize: "0.7rem", fontWeight: 500, color: S.accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            [ NEMNIDHI.COM ] — GET IN TOUCH
          </p>
          <h1 style={{ fontFamily: S.heading, fontWeight: 900, fontStyle: "italic", fontSize: "clamp(2.35rem, 5.8vw, 5.2rem)", textTransform: "uppercase", lineHeight: 0.95, letterSpacing: "-0.015em", marginBottom: "2rem" }}>
            <span style={{ color: S.white, display: "block" }}>READY TO</span>
            <span style={{ color: S.accent, display: "block" }}>BUILD?</span>
          </h1>
          <p style={{ color: S.muted, fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)", lineHeight: 1.7, maxWidth: "36rem" }}>
            Tell us what you&apos;re working on. We respond within 24 hours and move fast from there.
          </p>
        </Container>
      </section>

      <div style={{ width: "100%", height: "1px", background: S.line }} />

      {/* ─── Contact Grid ─── */}
      <section style={{ padding: "5rem 0" }}>
        <Container size="wide">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "5rem", alignItems: "start" }} className="contact-page-grid">

            {/* Left */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2.5rem" }}>
                <span style={{ fontFamily: S.mono, fontSize: "0.7rem", fontWeight: 600, color: S.accent, letterSpacing: "0.1em" }}>[ 01 ]</span>
                <span style={{ fontFamily: S.mono, fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: S.muted }}>CONTACT INFO</span>
                <div style={{ flex: 1, height: "1px", background: S.line }} />
              </div>

              {contactInfo.map((item) => (
                <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 0", borderBottom: `1px solid ${S.line}` }}>
                  <span style={{ fontFamily: S.mono, fontSize: "0.62rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: S.faint }}>
                    {item.label}
                  </span>
                  <a
                    href={item.href}
                    style={{ color: "#94a3b8", fontSize: "0.875rem", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = S.white)}
                    onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "#94a3b8")}
                  >
                    {item.value}
                  </a>
                </div>
              ))}

              {/* Quick info cards */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: S.line, border: `1px solid ${S.line}`, marginTop: "2.5rem" }}>
                {[
                  { label: "TYPICAL RESPONSE", value: "Under 24 hours" },
                  { label: "BEST FIT", value: "Startups & SMEs" },
                  { label: "ENGAGEMENT", value: "Remote-first" },
                  { label: "BASED IN", value: "Bangalore, India" },
                ].map((card) => (
                  <div key={card.label} style={{ padding: "1.25rem", background: S.bgCard }}>
                    <p style={{ fontFamily: S.mono, fontSize: "0.58rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: S.faint, marginBottom: "0.4rem" }}>
                      {card.label}
                    </p>
                    <p style={{ color: S.white, fontSize: "0.875rem", fontWeight: 600 }}>{card.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Form */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2.5rem" }}>
                <span style={{ fontFamily: S.mono, fontSize: "0.7rem", fontWeight: 600, color: S.accent, letterSpacing: "0.1em" }}>[ 02 ]</span>
                <span style={{ fontFamily: S.mono, fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: S.muted }}>PROJECT BRIEF</span>
                <div style={{ flex: 1, height: "1px", background: S.line }} />
              </div>

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
                    <label htmlFor="cp-name" style={labelStyle}>NAME <span style={{ color: S.accent }}>*</span></label>
                    <input id="cp-name" type="text" required placeholder="Your name" value={form.name} onChange={(e) => handleChange("name", e.target.value)} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                  </div>
                  <div>
                    <label htmlFor="cp-company" style={labelStyle}>COMPANY</label>
                    <input id="cp-company" type="text" placeholder="Company name" value={form.company} onChange={(e) => handleChange("company", e.target.value)} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                  </div>
                </div>

                {/* Email + Phone */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-two-col">
                  <div>
                    <label htmlFor="cp-email" style={labelStyle}>EMAIL <span style={{ color: S.accent }}>*</span></label>
                    <input id="cp-email" type="email" required placeholder="you@company.com" value={form.email} onChange={(e) => handleChange("email", e.target.value)} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                  </div>
                  <div>
                    <label htmlFor="cp-phone" style={labelStyle}>PHONE <span style={{ color: S.accent }}>*</span></label>
                    <input id="cp-phone" type="tel" required placeholder="+91 98765 43210" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                  </div>
                </div>

                {/* Budget + Timeline */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-two-col">
                  <div>
                    <label htmlFor="cp-budget" style={labelStyle}>INDICATIVE BUDGET</label>
                    <select id="cp-budget" value={form.budget} onChange={(e) => handleChange("budget", e.target.value)} style={{ ...inputStyle, color: form.budget ? S.white : S.muted }} onFocus={onFocus} onBlur={onBlur}>
                      <option value="" style={{ background: S.bgCard }}>Select range</option>
                      <option value="below-50k" style={{ background: S.bgCard }}>Below INR 50,000</option>
                      <option value="50k-1l" style={{ background: S.bgCard }}>INR 50,000 – 1,00,000</option>
                      <option value="1l-3l" style={{ background: S.bgCard }}>INR 1,00,000 – 3,00,000</option>
                      <option value="3l-plus" style={{ background: S.bgCard }}>INR 3,00,000+</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="cp-timeline" style={labelStyle}>IDEAL TIMELINE</label>
                    <select id="cp-timeline" value={form.timeline} onChange={(e) => handleChange("timeline", e.target.value)} style={{ ...inputStyle, color: form.timeline ? S.white : S.muted }} onFocus={onFocus} onBlur={onBlur}>
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
                  <label htmlFor="cp-message" style={labelStyle}>PROJECT BRIEF <span style={{ color: S.accent }}>*</span></label>
                  <textarea
                    id="cp-message"
                    required
                    rows={6}
                    placeholder="Tell us about your project — what you're building, current challenges, and what success looks like..."
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </div>

                {/* Submit */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", paddingTop: "0.5rem", borderTop: `1px solid ${S.line}` }}>
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
      </section>

      <style>{`
        @media (max-width: 900px) {
          .contact-page-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
        @media (max-width: 640px) {
          .form-two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
