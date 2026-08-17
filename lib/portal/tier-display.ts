// Ported from Vega's src/lib/prospecting/tier-display.ts (kept in sync by hand - small,
// stable, pure lookup table) so the portal's audit-summary tier badge reads identically
// to what staff see in Vega itself.

export type ProspectingTier = "A" | "B" | "C" | "D";

export const TIER_LABEL: Record<ProspectingTier, string> = {
  A: "No digital presence found",
  B: "Minimal digital presence",
  C: "Partial digital presence",
  D: "Strong digital presence",
};

export function isTier(value: unknown): value is ProspectingTier {
  return value === "A" || value === "B" || value === "C" || value === "D";
}

export function humanizeKey(value?: string | null) {
  if (!value) return "";
  return value.replaceAll("_", " ").replace(/\b\w/g, (m) => m.toUpperCase());
}
