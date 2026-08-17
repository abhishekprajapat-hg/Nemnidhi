"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { S, buttonStyle, secondaryButtonStyle, cardStyle, formatInr, inputStyle } from "./portal-styles";
import { TIER_LABEL, isTier, humanizeKey } from "@/lib/portal/tier-display";
import { SelectableComponentList, computeSelectedTotal, type SelectableComponent } from "./blueprint-shared";

type DashboardData = {
  lead: {
    _id: string;
    title: string;
    prospecting?: {
      industry?: string;
      segment?: string;
      classification?: { category?: string };
      digitalPresence?: {
        website?: { found?: boolean; url?: string };
        googleBusiness?: { found?: boolean; rating?: number; reviewCount?: number };
        metaAds?: { found?: boolean | null };
      };
      prospectingStatus?: string;
    };
  } | null;
  blueprint: {
    _id: string;
    status: string;
    origin: "staff_call" | "self_service";
    estimate: { oneTimeMin: number; oneTimeMax: number; monthlyMin: number; monthlyMax: number; currency: string };
    components: Array<SelectableComponent & { rationale: string; included: boolean }>;
  } | null;
  proposal: {
    _id: string;
    status: string;
    projectSummary?: string;
    timeline?: string;
  } | null;
};

export default function PortalDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [rejectReasonFor, setRejectReasonFor] = useState<"blueprint" | "proposal" | null>(null);
  const [reason, setReason] = useState("");
  const [acting, setActing] = useState(false);

  const [selectedCodes, setSelectedCodes] = useState<Set<string>>(new Set());
  const [finalizing, setFinalizing] = useState(false);
  const [finalizeError, setFinalizeError] = useState<string | null>(null);

  function load() {
    setLoading(true);
    fetch("/api/portal/dashboard")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          const dashboardData = json.data as DashboardData;
          setData(dashboardData);
          if (dashboardData.blueprint?.origin === "self_service" && dashboardData.blueprint.status === "draft") {
            setSelectedCodes(new Set(dashboardData.blueprint.components.filter((c) => c.included).map((c) => c.code)));
          }
        } else {
          setError(json?.error?.message ?? "Failed to load your dashboard");
        }
      })
      .catch(() => setError("Failed to load your dashboard"))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  function toggleComponent(code: string) {
    setSelectedCodes((prev) => {
      const next = new Set(prev);
      if (next.has(code)) next.delete(code);
      else next.add(code);
      return next;
    });
  }

  async function confirmSelection() {
    setFinalizing(true);
    setFinalizeError(null);
    try {
      const res = await fetch("/api/portal/questionnaire/finalize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selectedComponentCodes: [...selectedCodes] }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json?.error?.message ?? "Failed to confirm your selection. Please try again.");
      load();
    } catch (err) {
      setFinalizeError(err instanceof Error ? err.message : "Failed to confirm your selection. Please try again.");
    } finally {
      setFinalizing(false);
    }
  }

  async function logout() {
    await fetch("/api/portal/auth/logout", { method: "POST" });
    router.push("/portal/login");
    router.refresh();
  }

  async function respondBlueprint(decision: "approve" | "reject") {
    if (!data?.lead) return;
    if (decision === "reject" && rejectReasonFor !== "blueprint") {
      setRejectReasonFor("blueprint");
      return;
    }
    setActing(true);
    setActionError(null);
    try {
      const res = await fetch("/api/portal/blueprint/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId: data.lead._id, decision, reason: decision === "reject" ? reason : undefined }),
      });
      const json = await res.json();
      if (!json.success) {
        setActionError(json?.error?.message ?? "Failed to respond");
        return;
      }
      setRejectReasonFor(null);
      setReason("");
      load();
    } catch {
      setActionError("Failed to respond - please try again.");
    } finally {
      setActing(false);
    }
  }

  async function respondProposal(decision: "sign" | "reject") {
    if (!data?.proposal) return;
    if (decision === "reject" && rejectReasonFor !== "proposal") {
      setRejectReasonFor("proposal");
      return;
    }
    setActing(true);
    setActionError(null);
    try {
      const res = await fetch("/api/portal/proposal/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proposalId: data.proposal._id,
          decision,
          reason: decision === "reject" ? reason : undefined,
        }),
      });
      const json = await res.json();
      if (!json.success) {
        setActionError(json?.error?.message ?? "Failed to respond");
        return;
      }
      setRejectReasonFor(null);
      setReason("");
      load();
    } catch {
      setActionError("Failed to respond - please try again.");
    } finally {
      setActing(false);
    }
  }

  if (loading) {
    return (
      <Container as="section" style={{ padding: "4rem 0" }}>
        <p style={{ color: S.muted }}>Loading...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container as="section" style={{ padding: "4rem 0" }}>
        <p style={{ color: S.danger }}>{error}</p>
      </Container>
    );
  }

  const prospecting = data?.lead?.prospecting;
  const tier = prospecting?.classification?.category;

  return (
    <Container as="section" style={{ padding: "3rem 0", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontFamily: S.heading, fontSize: "1.75rem", color: S.white }}>
          {data?.lead?.title ?? "Your project"}
        </h1>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Link href="/portal/queries" style={{ ...secondaryButtonStyle, textDecoration: "none", display: "inline-block" }}>
            Queries &amp; onboarding
          </Link>
          <button onClick={logout} style={secondaryButtonStyle}>
            Log out
          </button>
        </div>
      </div>

      {!data?.lead ? (
        <div style={cardStyle}>
          <p style={{ color: S.muted, fontSize: "0.875rem", marginBottom: "1rem" }}>
            No project is linked to your account yet.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            <Link href="/portal/audit" style={{ ...buttonStyle, textDecoration: "none", display: "inline-block" }}>
              Get an instant estimate
            </Link>
            <Link href="/portal/queries" style={{ ...secondaryButtonStyle, textDecoration: "none", display: "inline-block" }}>
              Head to Queries &amp; onboarding
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Audit summary */}
          <div style={cardStyle}>
            <h2 style={{ fontFamily: S.heading, fontSize: "1.1rem", color: S.white, marginBottom: "1rem" }}>
              Digital-presence audit
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
              {isTier(tier) ? (
                <div>
                  <div style={{ fontSize: "0.7rem", color: S.faint, marginBottom: "0.25rem" }}>Tier {tier}</div>
                  <div style={{ color: S.white, fontSize: "0.9rem" }}>{TIER_LABEL[tier]}</div>
                </div>
              ) : null}
              {prospecting?.industry ? (
                <div>
                  <div style={{ fontSize: "0.7rem", color: S.faint, marginBottom: "0.25rem" }}>Industry</div>
                  <div style={{ color: S.white, fontSize: "0.9rem" }}>
                    {humanizeKey(prospecting.industry)}
                    {prospecting.segment ? ` / ${humanizeKey(prospecting.segment)}` : ""}
                  </div>
                </div>
              ) : null}
              {prospecting?.digitalPresence?.website ? (
                <div>
                  <div style={{ fontSize: "0.7rem", color: S.faint, marginBottom: "0.25rem" }}>Website</div>
                  <div style={{ color: S.white, fontSize: "0.9rem" }}>
                    {prospecting.digitalPresence.website.found ? "Found" : "Not found"}
                  </div>
                </div>
              ) : null}
              {prospecting?.digitalPresence?.googleBusiness ? (
                <div>
                  <div style={{ fontSize: "0.7rem", color: S.faint, marginBottom: "0.25rem" }}>Google Business</div>
                  <div style={{ color: S.white, fontSize: "0.9rem" }}>
                    {prospecting.digitalPresence.googleBusiness.found
                      ? `${prospecting.digitalPresence.googleBusiness.rating ?? "-"}★ (${prospecting.digitalPresence.googleBusiness.reviewCount ?? 0})`
                      : "Not found"}
                  </div>
                </div>
              ) : null}
            </div>
            {prospecting?.prospectingStatus === "reported" || prospecting?.prospectingStatus === "sent" ? (
              <a
                href={`/api/portal/audit-report?leadId=${data.lead._id}`}
                target="_blank"
                rel="noreferrer"
                style={{ color: S.accent, fontSize: "0.8rem", display: "inline-block", marginTop: "1rem" }}
              >
                Download full audit report (PDF)
              </a>
            ) : null}
          </div>

          {/* Blueprint */}
          {data.blueprint ? (
            <div style={cardStyle}>
              <h2 style={{ fontFamily: S.heading, fontSize: "1.1rem", color: S.white, marginBottom: "0.5rem" }}>
                Recommended blueprint
              </h2>
              <p style={{ color: S.muted, fontSize: "0.8rem", marginBottom: "1.5rem" }}>Status: {data.blueprint.status}</p>

              {data.blueprint.origin === "self_service" && data.blueprint.status === "draft" ? (
                <>
                  <p style={{ color: S.faint, fontSize: "0.75rem", marginBottom: "1rem" }}>
                    Uncheck anything you don&apos;t need, or add optional upgrades, then save your changes.
                  </p>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <SelectableComponentList
                      components={data.blueprint.components}
                      selectedCodes={selectedCodes}
                      onToggle={toggleComponent}
                      editable
                    />
                  </div>
                  {(() => {
                    const total = computeSelectedTotal(data.blueprint.components, selectedCodes);
                    return (
                      <p style={{ color: S.white, fontSize: "0.9rem", fontWeight: 600, marginBottom: "1rem" }}>
                        Current total: {formatInr(total.oneTime)}
                        {total.monthly > 0 ? ` + ${formatInr(total.monthly)}/mo` : ""}
                      </p>
                    );
                  })()}
                  {finalizeError ? (
                    <p style={{ color: S.danger, fontSize: "0.8rem", marginBottom: "1rem" }}>{finalizeError}</p>
                  ) : null}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1rem" }}>
                    <button
                      onClick={confirmSelection}
                      disabled={finalizing || selectedCodes.size === 0}
                      style={{ ...buttonStyle, opacity: finalizing || selectedCodes.size === 0 ? 0.6 : 1 }}
                    >
                      {finalizing ? "Saving..." : "Save my selection"}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <SelectableComponentList
                      components={data.blueprint.components.filter((c) => c.included)}
                      selectedCodes={new Set(data.blueprint.components.filter((c) => c.included).map((c) => c.code))}
                      onToggle={() => {}}
                      editable={false}
                    />
                  </div>
                  <p style={{ color: S.white, fontSize: "0.875rem", marginBottom: "1rem" }}>
                    Estimate: {formatInr(data.blueprint.estimate.oneTimeMin)}–{formatInr(data.blueprint.estimate.oneTimeMax)} one-time
                    {data.blueprint.estimate.monthlyMax > 0
                      ? `, ${formatInr(data.blueprint.estimate.monthlyMin)}–${formatInr(data.blueprint.estimate.monthlyMax)}/mo`
                      : ""}
                  </p>
                </>
              )}

              <Link
                href={`/portal/book?leadId=${data.lead._id}`}
                style={{ ...secondaryButtonStyle, textDecoration: "none", display: "inline-block", marginBottom: "1rem" }}
              >
                Book a meeting to discuss this
              </Link>

              {data.blueprint.status === "shared" ? (
                <div>
                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    <button onClick={() => respondBlueprint("approve")} disabled={acting} style={buttonStyle}>
                      Approve
                    </button>
                    <button onClick={() => respondBlueprint("reject")} disabled={acting} style={secondaryButtonStyle}>
                      Request changes
                    </button>
                  </div>
                  {rejectReasonFor === "blueprint" ? (
                    <div style={{ marginTop: "1rem" }}>
                      <textarea
                        placeholder="What would you like changed?"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        style={{ ...inputStyle, resize: "vertical" }}
                        rows={3}
                      />
                      <button
                        onClick={() => respondBlueprint("reject")}
                        disabled={acting || reason.trim().length < 5}
                        style={{ ...buttonStyle, marginTop: "0.5rem" }}
                      >
                        Submit request
                      </button>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : null}

          {/* Proposal */}
          {data.proposal ? (
            <div style={cardStyle}>
              <h2 style={{ fontFamily: S.heading, fontSize: "1.1rem", color: S.white, marginBottom: "0.5rem" }}>
                Proposal
              </h2>
              <p style={{ color: S.muted, fontSize: "0.8rem", marginBottom: "1rem" }}>Status: {data.proposal.status}</p>
              {data.proposal.projectSummary ? (
                <p style={{ color: S.white, fontSize: "0.875rem", marginBottom: "1rem" }}>{data.proposal.projectSummary}</p>
              ) : null}
              <a
                href={`/api/portal/proposal-document?proposalId=${data.proposal._id}`}
                target="_blank"
                rel="noreferrer"
                style={{ color: S.accent, fontSize: "0.8rem", display: "inline-block", marginBottom: "1rem" }}
              >
                View full proposal
              </a>

              {["sent", "viewed"].includes(data.proposal.status) ? (
                <div>
                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    <button onClick={() => respondProposal("sign")} disabled={acting} style={buttonStyle}>
                      Sign
                    </button>
                    <button onClick={() => respondProposal("reject")} disabled={acting} style={secondaryButtonStyle}>
                      Request changes
                    </button>
                  </div>
                  {rejectReasonFor === "proposal" ? (
                    <div style={{ marginTop: "1rem" }}>
                      <textarea
                        placeholder="What would you like changed?"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        style={{ ...inputStyle, resize: "vertical" }}
                        rows={3}
                      />
                      <button
                        onClick={() => respondProposal("reject")}
                        disabled={acting || reason.trim().length < 5}
                        style={{ ...buttonStyle, marginTop: "0.5rem" }}
                      >
                        Submit request
                      </button>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : null}

          {actionError ? <p style={{ color: S.danger, fontSize: "0.8rem" }}>{actionError}</p> : null}
        </>
      )}
    </Container>
  );
}
