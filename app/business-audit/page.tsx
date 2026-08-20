"use client";

import { useEffect, useState } from "react";
import Container from "@/components/layout/Container";
import HeroBlurTitle from "@/components/motion/HeroBlurTitle";
import HeroImageBackdrop from "@/components/services/HeroImageBackdrop";

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

type Segment = { key: string; label: string; description: string };
type Industry = { key: string; label: string; segments: Segment[] };

type QuestionOption = { value: string; label: string };
type Question = {
  code: string;
  question: string;
  helpText?: string;
  kind: "single" | "multi" | "text";
  options?: QuestionOption[];
};

type RecommendedComponentLine = {
  code: string;
  title: string;
  rationale: string;
  oneTimePrice: number;
  monthlyPrice: number;
};

type SubmitResult = {
  leadId: string;
  blueprint: {
    components: RecommendedComponentLine[];
    estimate: {
      oneTimeMin: number;
      oneTimeMax: number;
      monthlyMin: number;
      monthlyMax: number;
      currency: string;
    };
    assumptions: string[];
  };
};

type Step = "industry" | "contact" | "questions" | "result";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.85rem 1rem",
  background: "transparent",
  border: `1px solid ${S.line}`,
  color: S.white,
  fontSize: "0.875rem",
  outline: "none",
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

function formatInr(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export default function BusinessAuditPage() {
  const [step, setStep] = useState<Step>("industry");
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loadingIndustries, setLoadingIndustries] = useState(true);
  const [industryKey, setIndustryKey] = useState("");
  const [segmentKey, setSegmentKey] = useState("");

  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SubmitResult | null>(null);

  useEffect(() => {
    fetch("/api/questionnaire/industries")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setIndustries(data.data as Industry[]);
        else setError(data?.error?.message ?? "Failed to load industries");
      })
      .catch(() => setError("Failed to load industries"))
      .finally(() => setLoadingIndustries(false));
  }, []);

  const selectedIndustry = industries.find((i) => i.key === industryKey) ?? null;

  function goToContact() {
    if (!industryKey) return;
    setStep("contact");
  }

  async function goToQuestions(e: React.FormEvent) {
    e.preventDefault();
    setLoadingQuestions(true);
    setError(null);
    try {
      const params = new URLSearchParams({ industry: industryKey, ...(segmentKey ? { segment: segmentKey } : {}) });
      const res = await fetch(`/api/questionnaire/questions?${params.toString()}`);
      const data = await res.json();
      if (!data.success) throw new Error(data?.error?.message ?? "Failed to load questions");
      setQuestions(data.data as Question[]);
      setStep("questions");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load questions");
    } finally {
      setLoadingQuestions(false);
    }
  }

  function setSingleAnswer(code: string, value: string) {
    setAnswers((prev) => ({ ...prev, [code]: [value] }));
  }

  function toggleMultiAnswer(code: string, value: string) {
    setAnswers((prev) => {
      const current = prev[code] ?? [];
      const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
      return { ...prev, [code]: next };
    });
  }

  function setTextAnswer(code: string, value: string) {
    setAnswers((prev) => ({ ...prev, [code]: [value] }));
  }

  async function submitQuestionnaire(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const payloadAnswers = questions
        .filter((q) => answers[q.code]?.length)
        .map((q) => ({ questionCode: q.code, values: answers[q.code] }));

      const res = await fetch("/api/questionnaire/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactName,
          email,
          phone: phone || undefined,
          industry: industryKey,
          segment: segmentKey || undefined,
          answers: payloadAnswers,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data?.error?.message ?? "Failed to submit. Please try again.");
      setResult(data.data as SubmitResult);
      setStep("result");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ background: S.bg, minHeight: "100svh" }}>
      <section style={{ position: "relative", overflow: "hidden", isolation: "isolate", padding: "7rem 0 4rem", background: "#05080b" }}>
        <HeroImageBackdrop src="/images/hero/business-audit.jpg" focus="center" />
        <Container size="wide" className="hero-content-layer">
          <p style={{ fontFamily: S.mono, fontSize: "0.7rem", fontWeight: 500, color: "#67e8f9", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            [ NEMNIDHI.COM ] — FREE BUSINESS AUDIT
          </p>
          <HeroBlurTitle
            lines={[{ text: "WHAT DOES YOUR", color: "#f0f4f8" }, { text: "BUSINESS NEED?", color: "#67e8f9" }]}
            style={{ fontFamily: S.heading, fontWeight: 900, fontStyle: "normal", fontSize: "clamp(2.1rem, 5.2vw, 4.6rem)", textTransform: "uppercase", lineHeight: 0.95, letterSpacing: "-0.015em", marginBottom: "2rem" }}
            lineStyle={{ display: "block" }}
          />
          <p style={{ color: S.muted, fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)", lineHeight: 1.7, maxWidth: "36rem" }}>
            Answer a few questions about how your business runs today. We&apos;ll show you what&apos;s
            worth building and an indicative price - no call required to see it.
          </p>
        </Container>
      </section>

      <div style={{ width: "100%", height: "1px", background: S.line }} />

      <section className="section-padding">
        <Container size="default">
          {error ? (
            <div style={{ marginBottom: "1.5rem", padding: "0.85rem 1rem", border: "1px solid rgba(239,68,68,0.4)", background: "rgba(239,68,68,0.08)", color: "#fca5a5", fontFamily: S.mono, fontSize: "0.7rem" }}>
              {error}
            </div>
          ) : null}

          {step === "industry" && (
            <div>
              <p style={{ ...labelStyle, marginBottom: "1.25rem" }}>STEP 1 OF 3 — YOUR INDUSTRY</p>
              {loadingIndustries ? (
                <p style={{ color: S.muted, fontSize: "0.875rem" }}>Loading industries...</p>
              ) : (
                <div style={{ display: "grid", gap: "0.75rem" }}>
                  <div>
                    <label style={labelStyle} htmlFor="ba-industry">INDUSTRY</label>
                    <select
                      id="ba-industry"
                      value={industryKey}
                      onChange={(e) => {
                        setIndustryKey(e.target.value);
                        setSegmentKey("");
                      }}
                      style={{ ...inputStyle, color: industryKey ? S.white : S.muted }}
                    >
                      <option value="" style={{ background: S.bgCard }}>Select your industry</option>
                      {industries.map((industry) => (
                        <option key={industry.key} value={industry.key} style={{ background: S.bgCard }}>
                          {industry.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedIndustry && selectedIndustry.segments.length > 0 ? (
                    <div>
                      <label style={labelStyle} htmlFor="ba-segment">WHICH BEST DESCRIBES YOU?</label>
                      <select
                        id="ba-segment"
                        value={segmentKey}
                        onChange={(e) => setSegmentKey(e.target.value)}
                        style={{ ...inputStyle, color: segmentKey ? S.white : S.muted }}
                      >
                        <option value="" style={{ background: S.bgCard }}>Select one</option>
                        {selectedIndustry.segments.map((segment) => (
                          <option key={segment.key} value={segment.key} style={{ background: S.bgCard }}>
                            {segment.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : null}

                  <button
                    type="button"
                    onClick={goToContact}
                    disabled={!industryKey}
                    style={{
                      marginTop: "0.5rem", padding: "1rem 2rem",
                      background: industryKey ? S.accent : "#475569",
                      color: "#080a0c", border: "none", fontFamily: S.mono,
                      fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
                      textTransform: "uppercase", cursor: industryKey ? "pointer" : "not-allowed",
                      width: "fit-content",
                    }}
                  >
                    CONTINUE ↗
                  </button>
                </div>
              )}
            </div>
          )}

          {step === "contact" && (
            <form onSubmit={goToQuestions}>
              <p style={{ ...labelStyle, marginBottom: "1.25rem" }}>STEP 2 OF 3 — WHERE SHOULD WE SEND THIS?</p>
              <div style={{ display: "grid", gap: "1.25rem", maxWidth: "28rem" }}>
                <div>
                  <label style={labelStyle} htmlFor="ba-name">NAME <span style={{ color: S.accent }}>*</span></label>
                  <input id="ba-name" required value={contactName} onChange={(e) => setContactName(e.target.value)} style={inputStyle} placeholder="Your name" />
                </div>
                <div>
                  <label style={labelStyle} htmlFor="ba-email">EMAIL <span style={{ color: S.accent }}>*</span></label>
                  <input id="ba-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} placeholder="you@company.com" />
                </div>
                <div>
                  <label style={labelStyle} htmlFor="ba-phone">WHATSAPP NUMBER</label>
                  <input id="ba-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} placeholder="+91 98765 43210" />
                </div>
                <button
                  type="submit"
                  disabled={loadingQuestions}
                  style={{
                    padding: "1rem 2rem", background: S.accent, color: "#080a0c",
                    border: "none", fontFamily: S.mono, fontSize: "0.7rem", fontWeight: 700,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    cursor: loadingQuestions ? "not-allowed" : "pointer", width: "fit-content",
                  }}
                >
                  {loadingQuestions ? "LOADING..." : "CONTINUE ↗"}
                </button>
              </div>
            </form>
          )}

          {step === "questions" && (
            <form onSubmit={submitQuestionnaire}>
              <p style={{ ...labelStyle, marginBottom: "1.25rem" }}>STEP 3 OF 3 — ABOUT YOUR BUSINESS</p>
              <div style={{ display: "grid", gap: "2rem", maxWidth: "34rem" }}>
                {questions.map((question) => (
                  <div key={question.code}>
                    <p style={{ color: S.white, fontSize: "0.95rem", fontWeight: 600, marginBottom: "0.4rem" }}>{question.question}</p>
                    {question.helpText ? (
                      <p style={{ color: S.faint, fontSize: "0.75rem", marginBottom: "0.75rem" }}>{question.helpText}</p>
                    ) : null}

                    {question.kind === "text" ? (
                      <textarea
                        rows={3}
                        value={answers[question.code]?.[0] ?? ""}
                        onChange={(e) => setTextAnswer(question.code, e.target.value)}
                        style={{ ...inputStyle, resize: "vertical" }}
                      />
                    ) : (
                      <div style={{ display: "grid", gap: "0.5rem" }}>
                        {question.options?.map((option) => {
                          const checked = (answers[question.code] ?? []).includes(option.value);
                          return (
                            <label key={option.value} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.85rem", color: S.muted, cursor: "pointer" }}>
                              <input
                                type={question.kind === "multi" ? "checkbox" : "radio"}
                                name={question.code}
                                checked={checked}
                                onChange={() =>
                                  question.kind === "multi"
                                    ? toggleMultiAnswer(question.code, option.value)
                                    : setSingleAnswer(question.code, option.value)
                                }
                              />
                              {option.label}
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    padding: "1rem 2rem", background: submitting ? "#475569" : S.accent,
                    color: "#080a0c", border: "none", fontFamily: S.mono, fontSize: "0.7rem",
                    fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                    cursor: submitting ? "not-allowed" : "pointer", width: "fit-content",
                  }}
                >
                  {submitting ? "BUILDING YOUR RECOMMENDATION..." : "SEE MY RECOMMENDATION ↗"}
                </button>
              </div>
            </form>
          )}

          {step === "result" && result && (
            <div>
              <p style={{ ...labelStyle, marginBottom: "1.25rem" }}>YOUR INDICATIVE RECOMMENDATION</p>
              <div style={{ border: `1px solid ${S.line}`, padding: "1.5rem", marginBottom: "1.5rem" }}>
                <p style={{ color: S.faint, fontSize: "0.7rem", fontFamily: S.mono, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
                  ESTIMATED SETUP
                </p>
                <p style={{ color: S.white, fontSize: "1.6rem", fontWeight: 700, marginBottom: "1rem" }}>
                  {formatInr(result.blueprint.estimate.oneTimeMin)} – {formatInr(result.blueprint.estimate.oneTimeMax)}
                </p>
                <p style={{ color: S.faint, fontSize: "0.7rem", fontFamily: S.mono, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
                  ESTIMATED MONTHLY
                </p>
                <p style={{ color: S.white, fontSize: "1.2rem", fontWeight: 700 }}>
                  {formatInr(result.blueprint.estimate.monthlyMin)} – {formatInr(result.blueprint.estimate.monthlyMax)}
                </p>
              </div>

              <div style={{ display: "grid", gap: "1rem", marginBottom: "1.5rem" }}>
                {result.blueprint.components.map((component) => (
                  <div key={component.code} style={{ borderBottom: `1px solid ${S.line}`, paddingBottom: "1rem" }}>
                    <p style={{ color: S.white, fontWeight: 600, fontSize: "0.9rem" }}>{component.title}</p>
                    <p style={{ color: S.muted, fontSize: "0.8rem", marginTop: "0.3rem" }}>{component.rationale}</p>
                  </div>
                ))}
              </div>

              {result.blueprint.assumptions.map((assumption, i) => (
                <p key={i} style={{ color: S.faint, fontSize: "0.75rem", fontStyle: "italic" }}>{assumption}</p>
              ))}
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
