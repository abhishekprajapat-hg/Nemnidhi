// lib/data/projects.ts
// Shared project data — powers both the /projects hub page and the
// individual /projects/[slug] case-study pages.

export type ProjectEntry = {
  id: string;
  slug: string;
  title: string;
  tags: string[];
  year: string;
  href: string;
  domain: string;
  desc: string;
  highlights: string[];
  stack: string[];
  // Case study content
  seoTitle: string;
  metaDescription: string;
  h1: string;
  challenge: string;
  solution: string;
};

export const projects: ProjectEntry[] = [
  {
    id: "01",
    slug: "nemnidhi-com",
    title: "NEMNIDHI.COM",
    tags: ["Marketing", "SaaS"],
    year: "2024",
    href: "https://www.nemnidhi.com",
    domain: "www.nemnidhi.com",
    desc: "Primary marketing site built for clarity-led positioning, conversion-ready user flow, and premium brand communication.",
    highlights: [
      "Conversion-first architecture",
      "Premium brand positioning",
      "CMS-backed service pages",
      "Sub-1s page loads",
    ],
    stack: ["Next.js", "Node.js", "MongoDB", "Vercel"],
    seoTitle: "Nemnidhi.com Case Study — Software Studio Marketing Site",
    metaDescription:
      "How Nemnidhi, a software development company in Indore, India, built its own conversion-focused marketing site on Next.js — CMS-backed services and sub-1s page loads.",
    h1: "Nemnidhi.com — Building Our Own Marketing Site as a Software Studio in Indore",
    challenge:
      "Nemnidhi needed a marketing site that communicated a senior, production-grade engineering studio — not a generic agency template — while staying fast enough to actually convert visitors into qualified leads.",
    solution:
      "We built a Next.js site with a CMS-backed blog and services layer, a qualifying contact form, and a design system built for clarity over decoration — the same architecture this page is running on right now.",
  },
  {
    id: "02",
    slug: "samvid-os",
    title: "SAMVID-OS",
    tags: ["Cloud", "SaaS"],
    year: "2024",
    href: "https://nemnidhi.cloud",
    domain: "nemnidhi.cloud",
    desc: "Cloud-native operating system for internal platform delivery — secure workspace, infrastructure orchestration, and team collaboration.",
    highlights: [
      "Multi-tenant architecture",
      "Role-based access control",
      "Secure cloud workspace",
      "Infrastructure-backed delivery",
    ],
    stack: ["React", "Node.js", "PostgreSQL", "Docker", "AWS"],
    seoTitle: "Samvid-OS Case Study — Cloud-Native SaaS Platform Development",
    metaDescription:
      "Case study: how Nemnidhi built Samvid-OS, a multi-tenant cloud workspace with role-based access control on AWS and Docker — cloud development from a software studio in Indore, India.",
    h1: "Samvid-OS — Cloud-Native SaaS Platform for Internal Delivery",
    challenge:
      "The client needed a single cloud workspace to replace scattered internal tools — one place for team collaboration, infrastructure orchestration, and access control across multiple tenants.",
    solution:
      "We built a multi-tenant cloud platform on AWS with Docker-based service orchestration and role-based access control, giving teams a secure, unified workspace instead of stitched-together point tools.",
  },
  {
    id: "03",
    slug: "nemnidhi-glam",
    title: "NEMNIDHI GLAM",
    tags: ["E-Commerce", "Fashion"],
    year: "2024",
    href: "https://glam.nemnidhi.com",
    domain: "glam.nemnidhi.com",
    desc: "Modern ethnic atelier — e-commerce platform for handloom & artisan fashion with campaign-focused growth execution and catalog management.",
    highlights: [
      "Full e-commerce catalog",
      "Handloom & artisan focus",
      "Campaign growth engine",
      "Mobile-first experience",
    ],
    stack: ["Next.js", "Shopify API", "Stripe", "Cloudinary"],
    seoTitle: "Nemnidhi Glam Case Study — E-Commerce Platform for Artisan Fashion",
    metaDescription:
      "Case study: how Nemnidhi built Nemnidhi Glam, a mobile-first e-commerce platform for handloom and artisan fashion, integrating Shopify, Stripe, and Cloudinary.",
    h1: "Nemnidhi Glam — E-Commerce Platform for Handloom & Artisan Fashion",
    challenge:
      "An artisan fashion brand needed an e-commerce platform that could handle a full product catalog and payments, while still feeling premium and editorial rather than like a generic storefront template.",
    solution:
      "We built a mobile-first Next.js storefront integrated with the Shopify API for catalog and inventory, Stripe for payments, and Cloudinary for image delivery — a fast, editorial-feeling shopping experience built for campaign-driven growth.",
  },
  {
    id: "04",
    slug: "finedge-academy",
    title: "FINEDGE ACADEMY",
    tags: ["Fintech", "EdTech"],
    year: "2023",
    href: "https://finedge.nemnidhi.com",
    domain: "finedge.nemnidhi.com",
    desc: "Financial services education platform — structured finance courses, risk profiling tools, and high-intent lead capture for wealth advisory.",
    highlights: [
      "Structured finance curriculum",
      "Risk profiling module",
      "High-intent lead capture",
      "Trust-first UX design",
    ],
    stack: ["Next.js", "Node.js", "MongoDB", "Razorpay"],
    seoTitle: "FinEdge Academy Case Study — Financial Education Platform Development",
    metaDescription:
      "Case study: how Nemnidhi built FinEdge Academy, a financial education and lead-qualification platform with structured courses and a risk-profiling module.",
    h1: "FinEdge Academy — Financial Education Platform with Built-In Lead Qualification",
    challenge:
      "A wealth advisory business needed an education platform that could both teach structured finance concepts and qualify high-intent leads for advisory services — without either function undermining the other.",
    solution:
      "We built a Next.js platform with a structured course curriculum, an interactive risk-profiling module, and Razorpay-backed payments, designed around trust-first UX so the education content itself does the qualifying work.",
  },
  {
    id: "05",
    slug: "punyanidhi",
    title: "PUNYANIDHI",
    tags: ["NGO", "Community"],
    year: "2023",
    href: "https://nemnidhi.tech",
    domain: "nemnidhi.tech",
    desc: "Shri Jain Shwetambar Mandir — digital home for darshan, seva, transparent giving, upcoming observances, library access, and community life.",
    highlights: [
      "Digital darshan portal",
      "Transparent donation system",
      "Community event calendar",
      "Sacred library access",
    ],
    stack: ["Next.js", "MongoDB", "Node.js", "Razorpay"],
    seoTitle: "Punyanidhi Case Study — Community & Temple Platform Development",
    metaDescription:
      "Case study: how Nemnidhi built Punyanidhi for Shri Jain Shwetambar Mandir — a digital darshan, giving, and community platform serving a geographically spread congregation.",
    h1: "Punyanidhi — Digital Community Platform for Shri Jain Shwetambar Mandir",
    challenge:
      "Shri Jain Shwetambar Mandir needed a digital home that could serve a geographically spread community — daily darshan, transparent giving, observance schedules, and library access — without losing the trust and reverence the institution depends on.",
    solution:
      "We built a Next.js platform with a digital darshan portal, a transparent Razorpay-backed donation system, a community events calendar, and library access, giving the community a single trusted place to stay connected regardless of location.",
  },
];

export function getProjectBySlug(slug: string): ProjectEntry | undefined {
  return projects.find((p) => p.slug === slug);
}
