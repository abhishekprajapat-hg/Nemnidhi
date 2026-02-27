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
    price: "INR 50,000 / Year",
    tagline: "Build your presence and begin reliable growth.",
    bestFor: [
      "New businesses going online for the first time",
      "Founders relying on social channels and referrals",
      "Teams needing a credible digital presence quickly",
    ],
    includes: [
      "Premium responsive website (up to 5 core pages)",
      "Offer positioning and copy refinement",
      "Fast mobile-first implementation in Next.js",
      "Lead capture form with notifications",
      "Foundational SEO setup",
      "Basic analytics setup",
    ],
    outcomes: [
      "A credible online presence",
      "Clear user path from discovery to enquiry",
      "One professional destination for your brand",
    ],
    highlight: "primary",
  },
  {
    id: "growth-engine",
    name: "Brand Growth Engine",
    badge: "Most popular",
    price: "INR 1,00,000 / Year",
    tagline: "Turn visibility into qualified leads.",
    bestFor: [
      "Service businesses and agencies with existing traffic",
      "Teams ready to optimize for lead quality",
      "Founders needing clearer channel attribution",
    ],
    includes: [
      "Everything in Digital Launchpad",
      "Conversion-focused redesign of key pages",
      "Segmented lead forms and qualification flow",
      "Simple pipeline setup",
      "Basic automation and internal notifications",
      "Event tracking for funnel visibility",
      "Monthly performance snapshot",
    ],
    outcomes: [
      "Higher lead-to-call conversion",
      "Reduced manual follow-up overhead",
      "Clear visibility into growth drivers",
    ],
    highlight: "popular",
  },
  {
    id: "market-leadership",
    name: "Market Leadership Suite",
    badge: "Scale",
    price: "INR 1,50,000 - INR 2,00,000 / Year",
    tagline: "Operate and present like a category leader.",
    bestFor: [
      "Fast-scaling brands with cross-team coordination needs",
      "Businesses juggling marketing, sales, and delivery",
      "Leaders needing custom reporting and system clarity",
    ],
    includes: [
      "Everything in Brand Growth Engine",
      "Custom dashboards for leads, clients, or orders",
      "Internal tools or client portals as needed",
      "Advanced automation across workflows",
      "Role-based permissions and views",
      "Performance optimization and experiments",
      "Quarterly strategy reviews",
    ],
    outcomes: [
      "Stronger market perception and execution quality",
      "Less time lost to manual coordination",
      "Better decisions through actionable visibility",
    ],
  },
  {
    id: "black-label",
    name: "Black Label Systems (Custom)",
    badge: "Custom",
    price: "Custom scoped (INR 2,00,000+ / Year)",
    tagline: "When the standard path is not enough.",
    bestFor: [
      "Founders planning beyond a typical marketing site",
      "Teams needing custom platforms and workflows",
      "Businesses integrating multiple systems into one layer",
    ],
    includes: [
      "Deep strategy and architecture workshop",
      "Custom product and workflow design",
      "Full-stack build with auth, APIs, and integrations",
      "Staging environment and rollout planning",
      "Priority support with iterative enhancements",
      "Optional long-term product partnership",
    ],
    outcomes: [
      "A system aligned with your real operations",
      "A differentiated digital asset",
      "Founder-level collaboration on critical decisions",
    ],
    highlight: "custom",
  },
];
