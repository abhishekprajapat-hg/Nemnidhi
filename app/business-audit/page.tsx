"use client";

import { useEffect, useState } from "react";
import Container from "@/components/layout/Container";
import HeroBlurTitle from "@/components/motion/HeroBlurTitle";

import { S } from "@/lib/styleTokens";

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

type Department = "marketing" | "sales" | "operations" | "billing";

type RecommendedComponentLine = {
  code: string;
  title: string;
  rationale: string;
  department: Department;
  deliveryWeeksMin: number;
  deliveryWeeksMax: number;
};

type SubmitResult = {
  leadId: string;
  blueprint: {
    industry: string;
    industryLabel: string;
    segment: string | null;
    productBrand: string;
    components: RecommendedComponentLine[];
    deliveryWeeksMin: number;
    deliveryWeeksMax: number;
    assumptions: string[];
  };
};

const DEPARTMENT_ORDER: Department[] = ["marketing", "sales", "operations", "billing"];

const DEPARTMENT_META: Record<Department, { label: string; blurb: string }> = {
  marketing: { label: "Marketing", blurb: "Gets found and reaches the right prospects" },
  sales: { label: "Sales", blurb: "Turns an enquiry into a signed client" },
  operations: { label: "Operations", blurb: "Delivers the work once someone signs" },
  billing: { label: "Billing", blurb: "Invoices, collects and tracks payment" },
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

function groupByDepartment(components: RecommendedComponentLine[]) {
  const groups = new Map<Department, RecommendedComponentLine[]>();
  for (const component of components) {
    const list = groups.get(component.department) ?? [];
    list.push(component);
    groups.set(component.department, list);
  }
  return DEPARTMENT_ORDER.map((key) => ({ key, items: groups.get(key) ?? [] }));
}

/** The business-flow diagram: a lead moves through these four stages before
 * becoming a recurring client. Stages with a recommendation are highlighted;
 * empty stages stay faint rather than disappearing, so the shape of the
 * business stays visible even when nothing was recommended for it. */
function BusinessFlowDiagram({ groups }: { groups: { key: Department; items: RecommendedComponentLine[] }[] }) {
  return (
    <div style={{ display: "flex", alignItems: "stretch", marginBottom: "2.5rem" }}>
      {groups.map((group, i) => {
        const active = group.items.length > 0;
        return (
          <div key={group.key} style={{ display: "flex", alignItems: "center", flex: i === groups.length - 1 ? "0 0 auto" : "1 1 auto" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem", minWidth: "5.5rem" }}>
              <div
                style={{
                  width: "0.65rem",
                  height: "0.65rem",
                  borderRadius: "50%",
                  background: active ? S.accent : "transparent",
                  border: `1.5px solid ${active ? S.accent : S.line}`,
                }}
              />
              <p
                style={{
                  fontFamily: S.mono,
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: active ? S.white : S.faint,
                  textAlign: "center",
                }}
              >
                {DEPARTMENT_META[group.key].label}
              </p>
              <p style={{ fontFamily: S.mono, fontSize: "0.65rem", color: active ? S.accent : S.faint }}>
                {group.items.length || "—"}
              </p>
            </div>
            {i < groups.length - 1 ? (
              <div style={{ flex: "1 1 auto", height: "1px", background: active ? S.accent : S.line, opacity: active ? 0.5 : 1, margin: "0 0.25rem 1.85rem" }} />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function ResultView({ result }: { result: SubmitResult }) {
  const { blueprint } = result;
  const groups = groupByDepartment(blueprint.components);
  const activeGroups = groups.filter((g) => g.items.length > 0);

  return (
    <div>
      <p style={{ ...labelStyle, marginBottom: "0.75rem" }}>YOUR RECOMMENDATION</p>
      <p style={{ color: S.white, fontSize: "1.1rem", lineHeight: 1.6, maxWidth: "38rem", marginBottom: "2rem" }}>
        {blueprint.components.length} thing{blueprint.components.length === 1 ? "" : "s"} worth building for a{" "}
        {blueprint.industryLabel.toLowerCase()} business like yours - grouped by who at Nemnidhi does the work.
      </p>

      <BusinessFlowDiagram groups={groups} />

      <div style={{ display: "grid", gap: "2.25rem", marginBottom: "2rem" }}>
        {activeGroups.map((group) => (
          <div key={group.key}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.6rem", marginBottom: "1rem", borderBottom: `1px solid ${S.line}`, paddingBottom: "0.6rem" }}>
              <p style={{ ...labelStyle, marginBottom: 0, color: S.accent }}>{DEPARTMENT_META[group.key].label}</p>
              <p style={{ color: S.faint, fontSize: "0.75rem" }}>{DEPARTMENT_META[group.key].blurb}</p>
            </div>
            <div style={{ display: "grid", gap: "1rem" }}>
              {group.items.map((component) => (
                <div key={component.code}>
                  <p style={{ color: S.white, fontWeight: 600, fontSize: "0.9rem" }}>{component.title}</p>
                  <p style={{ color: S.muted, fontSize: "0.8rem", marginTop: "0.3rem" }}>{component.rationale}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p style={{ color: S.faint, fontSize: "0.75rem", marginBottom: "2rem" }}>
        Typically delivered in {blueprint.deliveryWeeksMin}–{blueprint.deliveryWeeksMax} weeks once scope is confirmed.
      </p>

      <div style={{ border: `1px solid ${S.line}`, background: S.bgCard, padding: "1.25rem 1.5rem", marginBottom: "2rem" }}>
        <p style={{ ...labelStyle, marginBottom: "0.4rem" }}>BUILT ON</p>
        <p style={{ color: S.white, fontSize: "1rem", fontWeight: 700 }}>{blueprint.productBrand}</p>
        <p style={{ color: S.muted, fontSize: "0.8rem", marginTop: "0.4rem", lineHeight: 1.6 }}>
          One connected system, not a stitched-together set of tools - Nemnidhi builds and runs it end to end.
        </p>
      </div>

      {blueprint.assumptions.map((assumption, i) => (
        <p key={i} style={{ color: S.faint, fontSize: "0.75rem", fontStyle: "italic" }}>{assumption}</p>
      ))}
    </div>
  );
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
      <section style={{ position: "relative", overflow: "hidden", padding: "7rem 0 4rem", background: S.bg, borderBottom: `1px solid ${S.line}` }}>
        <Container size="wide">
          <p style={{ fontFamily: S.mono, fontSize: "0.7rem", fontWeight: 500, color: S.accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            [ NEMNIDHI.COM ] — FREE BUSINESS AUDIT
          </p>
          <HeroBlurTitle
            lines={[{ text: "WHAT DOES YOUR", color: S.white }, { text: "BUSINESS NEED?", color: S.accent }]}
            style={{ fontFamily: S.heading, fontWeight: 900, fontStyle: "normal", fontSize: "clamp(2.1rem, 5.2vw, 4.6rem)", textTransform: "uppercase", lineHeight: 0.95, letterSpacing: "-0.015em", marginBottom: "2rem" }}
            lineStyle={{ display: "block" }}
          />
          <p style={{ color: S.muted, fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)", lineHeight: 1.7, maxWidth: "36rem" }}>
            Answer a few questions about how your business runs today. We&apos;ll show you exactly what&apos;s
            worth building and why - no call required to see it.
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
            <ResultView result={result} />
          )}
        </Container>
      </section>
    </div>
  );
}
