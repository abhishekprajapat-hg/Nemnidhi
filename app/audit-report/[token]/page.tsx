// Public, unauthenticated web view of a digital-presence audit report - the "single-page
// attractive web view" scoped when the PDF report itself was redesigned (see Vega's own
// HANDOFF.md, 2026-09-04) but never built. This is the page a Click-to-WhatsApp ad lead lands on
// when a link (not a PDF attachment) is pasted into their WhatsApp conversation - no portal
// login, keyed only by the report's own unguessable share token.
//
// Deliberately uses its own body font (Plus Jakarta Sans) rather than the site-wide serif
// (Bona Nova SC, --font-body) - direct feedback was that dense report prose in that font reads
// as dry and hard to scan. Headings/badges/buttons stay on the site's existing premium
// components (Heading/Badge/Button) so this still feels native to nemnidhi.com, not a bolt-on.

import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import {
  CheckCircle2,
  XCircle,
  Clock3,
  AlertTriangle,
  MessageCircle,
  Phone,
  Mail,
  Download,
  MapPin,
  Megaphone,
  TrendingUp,
  Settings2,
  Receipt,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import Container from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getPublicAuditReport } from "@/lib/audit-report";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-audit-body",
  weight: ["400", "500", "600", "700", "800"],
});

type Params = Promise<{ token: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { token } = await params;
  const report = await getPublicAuditReport(token);
  if (!report) return { title: "Audit Report" };
  return {
    title: `${report.businessName} - Digital Presence Audit`,
    description: report.hookText,
    robots: { index: false, follow: false },
  };
}

const TIER_TONE: Record<string, { badge: "success" | "gold" | "blue" | "neutral"; accent: string; ring: string }> = {
  A: { badge: "neutral", accent: "#ef4444", ring: "rgba(239,68,68,0.35)" },
  B: { badge: "gold", accent: "#f59e0b", ring: "rgba(245,158,11,0.35)" },
  C: { badge: "blue", accent: "#38bdf8", ring: "rgba(56,189,248,0.35)" },
  D: { badge: "success", accent: "#34d399", ring: "rgba(52,211,153,0.35)" },
};

const DEPARTMENT_ICON: Record<string, typeof Megaphone> = {
  marketing: Megaphone,
  sales: TrendingUp,
  operations: Settings2,
  billing: Receipt,
};

export default async function AuditReportPage({ params }: { params: Params }) {
  const { token } = await params;
  const report = await getPublicAuditReport(token);

  if (!report) {
    return (
      <Container as="section" style={{ padding: "6rem 0", textAlign: "center", minHeight: "60vh" }}>
        <Heading as="h1" size="section">
          Report not found
        </Heading>
        <p className="mt-4 text-[color:var(--color-text-muted)]">
          This link may have expired or been typed incorrectly. Message us on WhatsApp and we&apos;ll send it
          again.
        </p>
      </Container>
    );
  }

  const tone = TIER_TONE[report.tier.category] ?? TIER_TONE.C;

  return (
    <div className={jakarta.variable}>
      <style>{`
        .audit-report-body, .audit-report-body p, .audit-report-body li {
          font-family: var(--font-audit-body), system-ui, sans-serif;
        }
      `}</style>
      <div className="audit-report-body">
        {/* ─── HERO ─── */}
        <Container as="section" style={{ padding: "4rem 0 2.5rem" }}>
          <div className="flex flex-wrap items-center gap-3">
            <Badge tone="gold">
              <Sparkles className="h-3 w-3" aria-hidden /> Digital Presence Audit
            </Badge>
            <span
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.7rem] font-extrabold uppercase tracking-[0.16em]"
              style={{ borderColor: tone.ring, background: `${tone.accent}1a`, color: tone.accent }}
            >
              Tier {report.tier.category} · {report.tier.label}
            </span>
          </div>

          <h1
            className="mt-5 text-balance"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
              lineHeight: 1.08,
              color: "var(--color-heading)",
            }}
          >
            {report.businessName}
          </h1>
          {report.location ? (
            <p className="mt-2 flex items-center gap-1.5 text-sm text-[color:var(--color-text-muted)]">
              <MapPin className="h-4 w-4" aria-hidden /> {report.location}
            </p>
          ) : null}

          <p
            className="mt-6 max-w-3xl text-balance"
            style={{ fontSize: "clamp(1.15rem, 2.2vw, 1.45rem)", fontWeight: 600, color: tone.accent, lineHeight: 1.4 }}
          >
            {report.hookText}
          </p>
        </Container>

        {/* ─── ASSESSMENT ─── */}
        <Container as="section" style={{ paddingBottom: "2.5rem" }}>
          <div
            className="rounded-[var(--radius-lg)] border p-6 sm:p-8"
            style={{ borderColor: "var(--color-line)", background: "var(--color-bg-card)" }}
          >
            <p className="text-[0.95rem] leading-relaxed sm:text-[1.05rem]" style={{ color: "var(--color-text)" }}>
              {report.paragraph}
            </p>
            {report.industryOutlook ? (
              <p
                className="mt-4 border-l-2 pl-4 text-sm italic"
                style={{ borderColor: "var(--color-accent)", color: "var(--color-text-muted)" }}
              >
                {report.industryOutlook}
              </p>
            ) : null}
          </div>
        </Container>

        {/* ─── DIGITAL PRESENCE SUMMARY ─── */}
        <Container as="section" style={{ paddingBottom: "2.5rem" }}>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[color:var(--color-text-faint)]">
            What we checked
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {report.digitalPresence.map((row) => {
              const Icon = row.value === "Not yet checked" ? Clock3 : row.isGap ? XCircle : CheckCircle2;
              const color = row.value === "Not yet checked" ? "var(--color-text-faint)" : row.isGap ? "#ef4444" : "#34d399";
              return (
                <div
                  key={row.label}
                  className="rounded-[var(--radius-md)] border p-4"
                  style={{ borderColor: "var(--color-line)", background: "var(--color-bg-card)" }}
                >
                  <Icon className="h-5 w-5" style={{ color }} aria-hidden />
                  <p className="mt-2 text-sm font-semibold" style={{ color: "var(--color-heading)" }}>
                    {row.label}
                  </p>
                  <p className="mt-0.5 text-xs" style={{ color: "var(--color-text-muted)" }}>
                    {row.value}
                  </p>
                </div>
              );
            })}
          </div>

          {report.seo ? (
            <div
              className="mt-3 rounded-[var(--radius-md)] border p-4 sm:p-5"
              style={{ borderColor: "var(--color-line)", background: "var(--color-bg-card)" }}
            >
              <p className="text-sm font-semibold" style={{ color: "var(--color-heading)" }}>
                Website health
              </p>
              <div className="mt-3 flex flex-wrap gap-4 text-sm" style={{ color: "var(--color-text-muted)" }}>
                {report.seo.score !== null ? <span>SEO score: <strong style={{ color: "var(--color-text)" }}>{report.seo.score}/100</strong></span> : null}
                {report.seo.performanceScore !== null ? <span>Speed score: <strong style={{ color: "var(--color-text)" }}>{report.seo.performanceScore}/100</strong></span> : null}
                {report.seo.mobileFriendly !== null ? (
                  <span>Mobile-friendly: <strong style={{ color: "var(--color-text)" }}>{report.seo.mobileFriendly ? "Yes" : "No"}</strong></span>
                ) : null}
              </div>
              {report.seo.issues.length > 0 ? (
                <ul className="mt-3 space-y-1.5 border-t pt-3" style={{ borderColor: "var(--color-line)" }}>
                  {report.seo.issues.map((issue) => (
                    <li key={issue} className="flex items-start gap-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
                      <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: "#f59e0b" }} aria-hidden />
                      {issue}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}
        </Container>

        {/* ─── HOW THIS PLAYS OUT TODAY ─── */}
        <Container as="section" style={{ paddingBottom: "2.5rem" }}>
          <Heading as="h2" size="card" className="mb-3">
            How this plays out today
          </Heading>
          <p className="max-w-3xl text-[0.95rem] leading-relaxed" style={{ color: "var(--color-text)" }}>
            {report.painPoints}
          </p>
          {report.revenueLeaks.length > 0 ? (
            <ul className="mt-4 space-y-2">
              {report.revenueLeaks.map((leak) => (
                <li key={leak} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--color-text-muted)" }}>
                  <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: "#ef4444" }} aria-hidden />
                  {leak}
                </li>
              ))}
            </ul>
          ) : null}
        </Container>

        {/* ─── RECOMMENDED FOR YOUR BUSINESS ─── */}
        {report.departments.length > 0 ? (
          <Container as="section" style={{ paddingBottom: "2.5rem" }}>
            <Heading as="h2" size="card" className="mb-1">
              Recommended for your business
            </Heading>
            <p className="mb-5 text-sm" style={{ color: "var(--color-text-muted)" }}>
              Matched only against what this audit actually measured - grouped by who at Nemnidhi does the
              work.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {report.departments.map((dept) => {
                const Icon = DEPARTMENT_ICON[dept.key] ?? Sparkles;
                return (
                  <div
                    key={dept.key}
                    className="rounded-[var(--radius-lg)] border p-5"
                    style={{ borderColor: "var(--color-line)", background: "var(--color-bg-card)" }}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="flex h-9 w-9 items-center justify-center rounded-full"
                        style={{ background: "var(--color-accent-bg)" }}
                      >
                        <Icon className="h-[18px] w-[18px]" style={{ color: "var(--color-accent)" }} aria-hidden />
                      </span>
                      <p className="text-sm font-extrabold uppercase tracking-[0.1em]" style={{ color: "var(--color-heading)" }}>
                        {dept.label}
                      </p>
                    </div>
                    <ul className="mt-4 space-y-3">
                      {dept.items.map((item) => (
                        <li key={item.code}>
                          <p className="text-sm font-semibold" style={{ color: "var(--color-text)" }}>
                            {item.title}
                          </p>
                          <p className="mt-0.5 text-[0.85rem] leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                            {item.rationale}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </Container>
        ) : null}

        {/* ─── PLATFORM APPENDIX ─── */}
        {report.productBrand ? (
          <Container as="section" style={{ paddingBottom: "3rem" }}>
            <div
              className="rounded-[var(--radius-lg)] border p-6 sm:p-8"
              style={{ borderColor: "rgba(214,190,124,0.3)", background: "rgba(214,190,124,0.05)" }}
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" style={{ color: "#D6BE7C" }} aria-hidden />
                <p className="text-xs font-extrabold uppercase tracking-[0.16em]" style={{ color: "#D6BE7C" }}>
                  Built on {report.productBrand}
                </p>
              </div>
              <p className="mt-2 max-w-2xl text-sm" style={{ color: "var(--color-text-muted)" }}>
                Everything recommended above comes from one connected platform - built and run by Nemnidhi, not
                stitched together from outside vendors.
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {report.platformPillars.map((pillar) => (
                  <div key={pillar.title} className="flex gap-3">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ background: "#D6BE7C" }}
                      aria-hidden
                    />
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "var(--color-heading)" }}>
                        {pillar.title}
                      </p>
                      <p className="mt-0.5 text-[0.85rem] leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                        {pillar.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        ) : null}

        {/* ─── CTA ─── */}
        <Container as="section" style={{ paddingBottom: "4rem" }}>
          <div
            className="flex flex-col items-start gap-5 rounded-[var(--radius-lg)] border p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
            style={{ borderColor: "var(--color-line-strong)", background: "var(--color-bg-elevated)" }}
          >
            <div>
              <p className="text-lg font-bold" style={{ color: "var(--color-heading)" }}>
                Every gap above is fixable within weeks, not months.
              </p>
              <p className="mt-1 text-sm" style={{ color: "var(--color-text-muted)" }}>
                No obligation - a 15-minute call is enough to know if this is worth doing.
              </p>
            </div>
            <div className="flex flex-shrink-0 flex-wrap gap-3">
              <Button href={report.whatsappLink} variant="solid">
                <MessageCircle className="h-4 w-4" aria-hidden /> Chat on WhatsApp
              </Button>
              <Button href={`/api/audit-report/${token}/pdf`} variant="outline">
                <Download className="h-4 w-4" aria-hidden /> Download PDF
              </Button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm" style={{ color: "var(--color-text-faint)" }}>
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" aria-hidden /> {report.company.phone}
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" aria-hidden /> {report.company.email}
            </span>
            <span>{report.company.legalName} · Based on publicly available information.</span>
          </div>
        </Container>
      </div>
    </div>
  );
}
