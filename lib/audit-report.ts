import { callVegaPublicServer, VegaProxyError } from "@/lib/vega-proxy";

export type DigitalPresenceRow = { label: string; value: string; isGap: boolean };

export type PublicAuditReportData = {
  businessName: string;
  location: string | null;
  hookText: string;
  tier: { category: string; label: string };
  paragraph: string;
  industryOutlook: string | null;
  digitalPresence: DigitalPresenceRow[];
  seo: {
    score: number | null;
    performanceScore: number | null;
    mobileFriendly: boolean | null;
    issues: string[];
  } | null;
  painPoints: string;
  revenueLeaks: string[];
  departments: {
    key: string;
    label: string;
    items: { code: string; title: string; rationale: string }[];
  }[];
  productBrand: string | null;
  platformPillars: { title: string; body: string }[];
  company: { legalName: string; phone: string; email: string };
  whatsappLink: string;
  todayIntro: string;
  todayFlowStages: string[];
  automationFlow: {
    entryChain: FlowStepData[];
    interested: { label: string; steps: FlowStepData[] };
    noReply: { label: string; steps: FlowStepData[] };
  };
  generatedAt: string;
};

export type FlowStepData = { title: string; subtitle: string | null };

export async function getPublicAuditReport(token: string): Promise<PublicAuditReportData | null> {
  try {
    const result = await callVegaPublicServer(`/audit-report/${token}`, {
      method: "GET",
      refererPath: `/audit-report/${token}`,
    });
    if (!result) return null;
    return result.data as PublicAuditReportData;
  } catch (error) {
    if (error instanceof VegaProxyError && error.status === 404) return null;
    throw error;
  }
}
