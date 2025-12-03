// lib/plans.ts (example file)
export type ServicePlan = {
  id: string;
  name: string;
  badge?: string;
  price: string;
  tagline: string;
  bestFor: string[];
  includes: string[];
  outcomes: string[];
  highlight?: "primary" | "popular" | "custom";
};

export const SERVICE_PLANS: ServicePlan[] = [
  {
    id: "launchpad",
    name: "Digital Launchpad",
    badge: "Starter",
    price: "₹50,000 / Year",
    tagline: "Build your presence. Begin your growth.",
    bestFor: [
      "New businesses going online for the first time",
      "Founders relying on WhatsApp, Instagram, and referrals",
      "Those needing a clean, credible presence fast",
    ],
    includes: [
      "Premium responsive website (up to 5 core pages)",
      "Clear offer positioning and basic copy refinement",
      "Mobile-first, fast-loading UI in Next.js",
      "Lead capture form with email notifications",
      "Essential SEO setup (meta tags, basic structure)",
      "Basic analytics setup (Google Analytics / Plausible)",
    ],
    outcomes: [
      "You look serious and credible online",
      "Prospects understand what you do and how to contact you",
      "You can share a single link instead of sending PDFs & screenshots",
    ],
    highlight: "primary",
  },
  {
    id: "growth-engine",
    name: "Brand Growth Engine",
    badge: "Most popular",
    price: "₹1,00,000 / Year",
    tagline: "Transform visibility into customers.",
    bestFor: [
      "Founder-led service businesses and agencies",
      "Brands already getting traffic or inquiries",
      "Teams ready to treat the website as a growth engine",
    ],
    includes: [
      "Everything in Digital Launchpad",
      "Conversion-focused redesign of key pages",
      "Optimised lead forms (multi-step / segmented if needed)",
      "Simple lead pipeline (New / In progress / Closed)",
      "Basic automations for emails and internal notifications",
      "Event tracking for key actions and funnel points",
      "Monthly performance snapshot report",
    ],
    outcomes: [
      "Higher lead-to-call conversion without extra ad spend",
      "Less manual follow-up chaos",
      "Clarity on which channels actually bring revenue",
    ],
    highlight: "popular",
  },
  {
    id: "market-leadership",
    name: "Market Leadership Suite",
    badge: "Scale",
    price: "₹1,50,000 – ₹2,00,000 / Year",
    tagline: "Lead your category. Own your market.",
    bestFor: [
      "Fast-scaling brands with growing demand",
      "Teams juggling ops, marketing, and sales in silos",
      "Founders who want dashboards and systems, not just redesigns",
    ],
    includes: [
      "Everything in Brand Growth Engine",
      "Custom dashboards for leads, clients, or orders",
      "Internal tools or portals for clients or team",
      "Deeper automations across touchpoints",
      "Role-based access (admin, team, client views)",
      "Performance-focused optimisation and experiments",
      "Quarterly strategy reviews and roadmap alignment",
    ],
    outcomes: [
      "You look and operate like the leader in your category",
      "Less time lost to manual tracking and status chasing",
      "Better decisions because the numbers are finally visible",
    ],
  },
  {
    id: "black-label",
    name: "Black Label Systems (Custom)",
    badge: "Custom",
    price: "Custom scoped (₹2,00,000+ / Year)",
    tagline: "When you don’t fit in a box, we build the box.",
    bestFor: [
      "Founders planning something beyond a normal website",
      "Businesses needing a custom platform or internal tool",
      "Teams with multiple tools wanting a unified layer on top",
    ],
    includes: [
      "Deep-dive strategy and architecture workshop",
      "Custom product / platform design and user flows",
      "Full-stack MERN build (auth, dashboards, APIs, integrations)",
      "Dedicated staging environment for safe testing",
      "Priority support and iterative improvements",
      "Option for longer-term product partnership",
    ],
    outcomes: [
      "A system shaped around your real operations",
      "A defensible digital asset, not a generic template",
      "Founder-level collaboration on product and tech decisions",
    ],
    highlight: "custom",
  },
];
