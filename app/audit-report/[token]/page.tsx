// Public, unauthenticated web view of a digital-presence audit report - the "single-page
// attractive web view" scoped when the PDF report itself was redesigned (see Vega's own
// HANDOFF.md, 2026-09-04) but never built. This is the page a Click-to-WhatsApp ad lead lands on
// when a link (not a PDF attachment) is pasted into their WhatsApp conversation - no portal
// login, keyed only by the report's own unguessable share token.
//
// Typography is Poppins/Open Sans ("Modern Professional" pairing, chosen for professional
// services/SaaS/corporate reports) rather than the site-wide serif (Bona Nova SC) - direct
// feedback was that dense report prose in that font reads as dry and hard to scan. Brand identity
// stays on the site's real teal accent + gold CTA color and the real logo mark, and the two flow
// diagrams (today / where automation plugs in) reuse the same connected-node + traveling-signal
// animation technique already proven on the homepage (HeroSystemDiagram), not a static mockup.

import type { Metadata } from "next";
import Image from "next/image";
import { Poppins, Open_Sans } from "next/font/google";
import {
  CheckCircle2,
  XCircle,
  Clock3,
  AlertTriangle,
  MessageCircle,
  CalendarClock,
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
import { Button } from "@/components/ui/Button";
import BlurText from "@/components/motion/BlurText";
import { TodayFlow, AutomationFlow } from "@/components/audit-report/AuditFlowDiagram";
import { getPublicAuditReport } from "@/lib/audit-report";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-audit-heading",
  weight: ["500", "600", "700"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-audit-body",
  weight: ["400", "500", "600", "700"],
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

// Solid fill + a text color chosen for that specific fill (not the theme) - a tinted-text-on-
// tinted-background pill reads fine in dark mode but goes near-invisible in light mode (the
// exact bug reported: pale gold/blue text on an equally pale background). A solid saturated fill
// with a fixed high-contrast text color is safe in both themes because it never depends on the
// page's own background luminance.
const TIER_TONE: Record<string, { fill: string; on: string }> = {
  A: { fill: "#dc2626", on: "#ffffff" },
  B: { fill: "#d97706", on: "#1c1300" },
  C: { fill: "#0369a1", on: "#ffffff" },
  D: { fill: "#15803d", on: "#ffffff" },
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
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.75rem", color: "var(--color-heading)" }}>
          Report not found
        </h1>
        <p className="mt-4 text-[color:var(--color-text-muted)]">
          This link may have expired or been typed incorrectly. Message us on WhatsApp and we&apos;ll send it
          again.
        </p>
      </Container>
    );
  }

  const tone = TIER_TONE[report.tier.category] ?? TIER_TONE.C;
  const bookCallLink = `${report.whatsappLink}?text=${encodeURIComponent(
    `Hi, I'd like to book a strategy call to discuss the audit for ${report.businessName}.`,
  )}`;

  return (
    <div className={`${poppins.variable} ${openSans.variable}`}>
      <style>{`
        .audit-report-body { font-family: var(--font-audit-body), system-ui, sans-serif; }
        .audit-report-body h1, .audit-report-body h2, .audit-report-body h3 {
          font-family: var(--font-audit-heading), system-ui, sans-serif;
        }
      `}</style>
      <div className="audit-report-body">
        {/* ─── HERO ─── */}
        <div
          style={{
            background:
              "radial-gradient(circle at 15% 0%, color-mix(in srgb, var(--color-accent) 10%, transparent), transparent 55%)",
          }}
        >
          <Container as="section" style={{ padding: "3.5rem 0 2.5rem" }}>
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.7rem] font-extrabold uppercase tracking-[0.16em]"
                  style={{ background: "#D6BE7C", color: "#07111f" }}
                >
                  <Sparkles className="h-3 w-3" aria-hidden /> Digital presence audit
                </span>
                <span
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.7rem] font-extrabold uppercase tracking-[0.16em]"
                  style={{ background: tone.fill, color: tone.on }}
                >
                  Tier {report.tier.category} · {report.tier.label}
                </span>
              </div>
              <Image src="/images/logo.png" alt="Nemnidhi" width={36} height={36} style={{ flexShrink: 0 }} />
            </div>

            <h1
              className="mt-5 text-balance"
              style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)", fontWeight: 600, lineHeight: 1.08, color: "var(--color-heading)" }}
            >
              <BlurText as="span" text={report.businessName} delay={60} stepDuration={0.32} />
            </h1>
            {report.location ? (
              <p className="mt-2 flex items-center gap-1.5 text-sm text-[color:var(--color-text-muted)]">
                <MapPin className="h-4 w-4" aria-hidden /> {report.location}
              </p>
            ) : null}

            <p
              className="mt-6 max-w-3xl text-balance border-l-4 pl-4"
              style={{
                fontSize: "clamp(1.15rem, 2.2vw, 1.45rem)",
                fontWeight: 600,
                color: "var(--color-heading)",
                borderColor: tone.fill,
                lineHeight: 1.4,
              }}
            >
              {report.hookText}
            </p>
          </Container>
        </div>

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
          <h2 className="mb-3" style={{ fontSize: "1.35rem", fontWeight: 600, color: "var(--color-heading)" }}>
            How this plays out today
          </h2>
          <p className="max-w-3xl text-[0.95rem] leading-relaxed mb-4" style={{ color: "var(--color-text)" }}>
            {report.painPoints}
          </p>
          {report.revenueLeaks.length > 0 ? (
            <ul className="mb-6 space-y-2">
              {report.revenueLeaks.map((leak) => (
                <li key={leak} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--color-text-muted)" }}>
                  <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: "#ef4444" }} aria-hidden />
                  {leak}
                </li>
              ))}
            </ul>
          ) : null}
          <TodayFlow intro={report.todayIntro} stages={report.todayFlowStages} />
        </Container>

        {/* ─── WHERE AUTOMATION PLUGS IN ─── */}
        <Container as="section" style={{ paddingBottom: "2.5rem" }}>
          <h2 className="mb-1" style={{ fontSize: "1.35rem", fontWeight: 600, color: "var(--color-heading)" }}>
            Where automation plugs in
          </h2>
          <p className="mb-5 text-sm" style={{ color: "var(--color-text-muted)" }}>
            The same lead, handled automatically from first contact.
          </p>
          <AutomationFlow
            entryChain={report.automationFlow.entryChain}
            interested={report.automationFlow.interested}
            noReply={report.automationFlow.noReply}
          />
        </Container>

        {/* ─── RECOMMENDED FOR YOUR BUSINESS ─── */}
        {report.departments.length > 0 ? (
          <Container as="section" style={{ paddingBottom: "2.5rem" }}>
            <h2 className="mb-1" style={{ fontSize: "1.35rem", fontWeight: 600, color: "var(--color-heading)" }}>
              Recommended for your business
            </h2>
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
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-[0.16em]"
                style={{ background: "#D6BE7C", color: "#07111f" }}
              >
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden /> Built on {report.productBrand}
              </span>
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
            className="flex flex-col items-start gap-5 rounded-[var(--radius-lg)] border p-6 sm:p-8"
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
            <div className="flex flex-wrap gap-3">
              <Button href={report.whatsappLink} variant="solid">
                <MessageCircle className="h-4 w-4" aria-hidden /> Chat on WhatsApp
              </Button>
              <Button href={bookCallLink} variant="outline">
                <CalendarClock className="h-4 w-4" aria-hidden /> Book a strategy call
              </Button>
              <Button href={`/api/audit-report/${token}/pdf`} variant="ghost">
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
