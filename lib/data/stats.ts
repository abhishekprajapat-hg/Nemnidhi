// Single source of truth for company stats shown on the homepage and about page.
// Every value here must be traceable to real, verifiable facts (see WorkSection /
// lib/data/projects.ts for shipped systems, FAQSection for timeline/response commitments).
// Do not add unverifiable metrics (satisfaction %, client counts, headcount) without a real source.
export const companyStats = [
  { value: 5, suffix: "+", label: "PRODUCTION SYSTEMS SHIPPED" },
  { value: 16, suffix: " WK", label: "MAX PROJECT TIMELINE" },
  { value: 48, suffix: "HR", label: "SCOPING RESPONSE TIME" },
  { value: 100, suffix: "%", label: "NDA-PROTECTED ENGAGEMENTS" },
] as const;
