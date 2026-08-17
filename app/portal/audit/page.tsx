"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { S, inputStyle, labelStyle, buttonStyle, secondaryButtonStyle, cardStyle, formatInr } from "../portal-styles";

type Segment = { key: string; label: string; description: string };
type Industry = { key: string; label: string; segments: Segment[] };
type Tier = { key: string; label: string; order: number };

type QuestionOption = { value: string; label: string };
type Question = {
  code: string;
  question: string;
  helpText?: string;
  kind: "single" | "multi" | "text";
  options?: QuestionOption[];
};

type Pillar = "marketing_sales" | "operations" | "documentation_admin" | "service_support";

type PackageComponentLine = {
  code: string;
  title: string;
  rationale: string;
  packageStatus: "included" | "addon";
  pillar: Pillar;
  oneTimePrice: number;
  monthlyPrice: number;
};

const PILLAR_ORDER: Pillar[] = ["marketing_sales", "operations", "documentation_admin", "service_support"];
const PILLAR_LABEL: Record<Pillar, string> = {
  marketing_sales: "Marketing & Sales",
  operations: "Operations",
  documentation_admin: "Documentation & Admin",
  service_support: "Service & Support",
};

function groupByPillar(components: PackageComponentLine[]) {
  return PILLAR_ORDER.map((pillar) => ({
    pillar,
    label: PILLAR_LABEL[pillar],
    items: components.filter((c) => c.pillar === pillar),
  })).filter((group) => group.items.length > 0);
}

type EstimateRange = { oneTimeMin: number; oneTimeMax: number; monthlyMin: number; monthlyMax: number; currency: string };

type SubmitResult = {
  leadId: string;
  blueprint: {
    components: PackageComponentLine[];
    estimate: EstimateRange;
    assumptions: string[];
  };
};

type FinalizeResult = {
  estimate: EstimateRange;
};

type Step = "industry" | "questions" | "result";

export default function PortalAuditPage() {
  const [step, setStep] = useState<Step>("industry");
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loadingIndustries, setLoadingIndustries] = useState(true);
  const [industryKey, setIndustryKey] = useState("");
  const [segmentKey, setSegmentKey] = useState("");

  const [tiers, setTiers] = useState<Tier[]>([]);
  const [loadingTiers, setLoadingTiers] = useState(true);
  const [tierKey, setTierKey] = useState("");

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [alreadyLinked, setAlreadyLinked] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);

  const [selectedAddonCodes, setSelectedAddonCodes] = useState<Set<string>>(new Set());
  const [finalizing, setFinalizing] = useState(false);
  const [finalizeError, setFinalizeError] = useState<string | null>(null);
  const [finalized, setFinalized] = useState<FinalizeResult | null>(null);

  useEffect(() => {
    fetch("/api/questionnaire/industries")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setIndustries(data.data as Industry[]);
        else setError(data?.error?.message ?? "Failed to load industries");
      })
      .catch(() => setError("Failed to load industries"))
      .finally(() => setLoadingIndustries(false));

    fetch("/api/questionnaire/tiers")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setTiers(data.data as Tier[]);
        else setError(data?.error?.message ?? "Failed to load pricing tiers");
      })
      .catch(() => setError("Failed to load pricing tiers"))
      .finally(() => setLoadingTiers(false));
  }, []);

  const selectedIndustry = industries.find((i) => i.key === industryKey) ?? null;

  async function goToQuestions() {
    if (!industryKey || !tierKey) return;
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

  function toggleAddon(code: string) {
    setSelectedAddonCodes((prev) => {
      const next = new Set(prev);
      if (next.has(code)) next.delete(code);
      else next.add(code);
      return next;
    });
  }

  async function submitQuestionnaire(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setAlreadyLinked(false);
    try {
      const payloadAnswers = questions
        .filter((q) => answers[q.code]?.length)
        .map((q) => ({ questionCode: q.code, values: answers[q.code] }));

      const res = await fetch("/api/portal/questionnaire/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          industry: industryKey,
          segment: segmentKey || undefined,
          tier: tierKey,
          answers: payloadAnswers,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        if (res.status === 409) {
          setAlreadyLinked(true);
          return;
        }
        throw new Error(data?.error?.message ?? "Failed to submit. Please try again.");
      }
      setResult(data.data as SubmitResult);
      setSelectedAddonCodes(new Set());
      setFinalized(null);
      setFinalizeError(null);
      setStep("result");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function confirmSelection() {
    if (!result) return;
    setFinalizing(true);
    setFinalizeError(null);
    try {
      const res = await fetch("/api/portal/questionnaire/finalize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selectedAddonCodes: [...selectedAddonCodes] }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data?.error?.message ?? "Failed to confirm your selection. Please try again.");
      setFinalized(data.data as FinalizeResult);
    } catch (err) {
      setFinalizeError(err instanceof Error ? err.message : "Failed to confirm your selection. Please try again.");
    } finally {
      setFinalizing(false);
    }
  }

  if (alreadyLinked) {
    return (
      <Container size="sm" as="section" style={{ padding: "4rem 0", minHeight: "60vh" }}>
        <div style={{ ...cardStyle, maxWidth: 480, margin: "0 auto" }}>
          <p style={{ color: S.white, fontSize: "0.95rem", marginBottom: "1rem" }}>
            A project is already linked to your account.
          </p>
          <Link href="/portal" style={{ color: S.accent }}>
            Go to your dashboard
          </Link>
        </div>
      </Container>
    );
  }

  const includedComponents = result?.blueprint.components.filter((c) => c.packageStatus === "included") ?? [];
  const addonComponents = result?.blueprint.components.filter((c) => c.packageStatus === "addon") ?? [];
  const includedGroups = groupByPillar(includedComponents);
  const addonGroups = groupByPillar(addonComponents);

  let liveEstimate: EstimateRange | null = null;
  if (result) {
    const baseline = result.blueprint.estimate;
    const selectedAddons = addonComponents.filter((c) => selectedAddonCodes.has(c.code));
    const addonOneTime = selectedAddons.reduce((sum, c) => sum + c.oneTimePrice, 0);
    const addonMonthly = selectedAddons.reduce((sum, c) => sum + c.monthlyPrice, 0);
    liveEstimate = {
      oneTimeMin: baseline.oneTimeMin + addonOneTime,
      oneTimeMax: baseline.oneTimeMax + addonOneTime,
      monthlyMin: baseline.monthlyMin + addonMonthly,
      monthlyMax: baseline.monthlyMax + addonMonthly,
      currency: baseline.currency,
    };
  }

  // Only read below inside the `liveEstimate &&`-guarded result block, where it's always set.
  const displayEstimate = finalized?.estimate ?? liveEstimate!;

  return (
    <Container as="section" style={{ padding: "3rem 0", maxWidth: "42rem" }}>
      <h1 style={{ fontFamily: S.heading, fontSize: "1.75rem", color: S.white, marginBottom: "0.5rem" }}>
        Get an instant estimate
      </h1>
      <p style={{ color: S.muted, fontSize: "0.875rem", marginBottom: "2rem" }}>
        Answer a few questions about how your business runs today - we&apos;ll show you what&apos;s worth building
        and an indicative price.
      </p>

      {error ? (
        <div style={{ marginBottom: "1.5rem", padding: "0.85rem 1rem", border: "1px solid rgba(239,68,68,0.4)", background: "rgba(239,68,68,0.08)", color: "#fca5a5", fontFamily: S.mono, fontSize: "0.7rem" }}>
          {error}
        </div>
      ) : null}

      {step === "industry" && (
        <div style={cardStyle}>
          {loadingIndustries || loadingTiers ? (
            <p style={{ color: S.muted, fontSize: "0.875rem" }}>Loading...</p>
          ) : (
            <div style={{ display: "grid", gap: "1.25rem" }}>
              <div>
                <label style={labelStyle} htmlFor="pa-industry">Industry</label>
                <select
                  id="pa-industry"
                  value={industryKey}
                  onChange={(e) => {
                    setIndustryKey(e.target.value);
                    setSegmentKey("");
                  }}
                  style={inputStyle}
                >
                  <option value="">Select your industry</option>
                  {industries.map((industry) => (
                    <option key={industry.key} value={industry.key}>
                      {industry.label}
                    </option>
                  ))}
                </select>
              </div>

              {selectedIndustry && selectedIndustry.segments.length > 0 ? (
                <div>
                  <label style={labelStyle} htmlFor="pa-segment">Which best describes you?</label>
                  <select id="pa-segment" value={segmentKey} onChange={(e) => setSegmentKey(e.target.value)} style={inputStyle}>
                    <option value="">Select one</option>
                    {selectedIndustry.segments.map((segment) => (
                      <option key={segment.key} value={segment.key}>
                        {segment.label}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}

              <div>
                <label style={labelStyle} htmlFor="pa-tier">Which package are you interested in?</label>
                <select id="pa-tier" value={tierKey} onChange={(e) => setTierKey(e.target.value)} style={inputStyle}>
                  <option value="">Select a package</option>
                  {tiers.map((tier) => (
                    <option key={tier.key} value={tier.key}>
                      {tier.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={goToQuestions}
                disabled={!industryKey || !tierKey || loadingQuestions}
                style={{ ...buttonStyle, opacity: !industryKey || !tierKey || loadingQuestions ? 0.6 : 1, alignSelf: "flex-start" }}
              >
                {loadingQuestions ? "Loading..." : "Continue"}
              </button>
            </div>
          )}
        </div>
      )}

      {step === "questions" && (
        <form onSubmit={submitQuestionnaire} style={cardStyle}>
          <div style={{ display: "grid", gap: "2rem" }}>
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

            <button type="submit" disabled={submitting} style={{ ...buttonStyle, opacity: submitting ? 0.6 : 1, alignSelf: "flex-start" }}>
              {submitting ? "Building your blueprint..." : "See my blueprint"}
            </button>
          </div>
        </form>
      )}

      {step === "result" && result && liveEstimate && (
        <div>
          <div style={{ ...cardStyle, marginBottom: "1.5rem" }}>
            <p style={{ color: S.faint, fontSize: "0.7rem", fontFamily: S.mono, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
              {finalized ? "Confirmed setup" : "Estimated setup"}
            </p>
            <p style={{ color: S.white, fontSize: "1.6rem", fontWeight: 700, marginBottom: "1rem" }}>
              {formatInr(displayEstimate.oneTimeMin)} – {formatInr(displayEstimate.oneTimeMax)}
            </p>
            <p style={{ color: S.faint, fontSize: "0.7rem", fontFamily: S.mono, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
              {finalized ? "Confirmed monthly" : "Estimated monthly"}
            </p>
            <p style={{ color: S.white, fontSize: "1.2rem", fontWeight: 700 }}>
              {formatInr(displayEstimate.monthlyMin)} – {formatInr(displayEstimate.monthlyMax)}
            </p>
          </div>

          <div style={{ ...cardStyle, marginBottom: "1.5rem", display: "grid", gap: "1.5rem" }}>
            <p style={{ color: S.faint, fontSize: "0.7rem", fontFamily: S.mono, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              What&apos;s included
            </p>
            {includedGroups.map((group) => (
              <div key={group.pillar}>
                <p style={{ color: S.accent, fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.6rem" }}>
                  {group.label}
                </p>
                <div style={{ display: "grid", gap: "0.6rem" }}>
                  {group.items.map((component) => (
                    <div key={component.code} style={{ borderBottom: `1px solid ${S.line}`, paddingBottom: "0.6rem" }}>
                      <p style={{ color: S.white, fontWeight: 600, fontSize: "0.85rem" }}>{component.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {addonGroups.length > 0 ? (
            <div style={{ ...cardStyle, marginBottom: "1.5rem", display: "grid", gap: "1.5rem" }}>
              <p style={{ color: S.faint, fontSize: "0.7rem", fontFamily: S.mono, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Optional add-ons
              </p>
              {addonGroups.map((group) => (
                <div key={group.pillar}>
                  <p style={{ color: S.accent, fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.6rem" }}>
                    {group.label}
                  </p>
                  <div style={{ display: "grid", gap: "0.6rem" }}>
                    {group.items.map((component) => (
                      <label
                        key={component.code}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "space-between",
                          gap: "1rem",
                          borderBottom: `1px solid ${S.line}`,
                          paddingBottom: "0.6rem",
                          cursor: finalized ? "default" : "pointer",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                          <input
                            type="checkbox"
                            checked={selectedAddonCodes.has(component.code)}
                            disabled={Boolean(finalized)}
                            onChange={() => toggleAddon(component.code)}
                            style={{ marginTop: "0.2rem" }}
                          />
                          <p style={{ color: S.white, fontWeight: 600, fontSize: "0.85rem" }}>{component.title}</p>
                        </div>
                        <p style={{ color: S.faint, fontSize: "0.75rem", whiteSpace: "nowrap" }}>
                          +{formatInr(component.oneTimePrice)}
                          {component.monthlyPrice > 0 ? ` / +${formatInr(component.monthlyPrice)} mo` : ""}
                        </p>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {result.blueprint.assumptions.map((assumption, i) => (
            <p key={i} style={{ color: S.faint, fontSize: "0.75rem", fontStyle: "italic", marginBottom: "0.5rem" }}>
              {assumption}
            </p>
          ))}

          {finalizeError ? (
            <div style={{ margin: "1rem 0", padding: "0.85rem 1rem", border: "1px solid rgba(239,68,68,0.4)", background: "rgba(239,68,68,0.08)", color: "#fca5a5", fontFamily: S.mono, fontSize: "0.7rem" }}>
              {finalizeError}
            </div>
          ) : null}

          {!finalized ? (
            <button
              type="button"
              onClick={confirmSelection}
              disabled={finalizing}
              style={{ ...buttonStyle, opacity: finalizing ? 0.6 : 1, marginTop: "1rem" }}
            >
              {finalizing ? "Confirming..." : "Confirm my selection"}
            </button>
          ) : (
            <Link
              href={`/portal/book?leadId=${result.leadId}`}
              style={{ ...secondaryButtonStyle, display: "inline-block", textDecoration: "none", marginTop: "1rem" }}
            >
              Book a meeting to discuss this
            </Link>
          )}
        </div>
      )}
    </Container>
  );
}
