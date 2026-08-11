// lib/data/services.ts
// Shared service data — powers both the /services hub page and the
// individual /services/[slug] landing pages.

export type MiniFaq = { q: string; a: string };

export type ServiceEntry = {
  num: string;
  slug: string;
  title: string;
  desc: string;
  tags: string[];
  details: string[];
  industries: string[]; // PLACEHOLDER — confirm accuracy
  timeline: string; // PLACEHOLDER — needs real estimate from team
  deliverables: string[];
  pricing: string; // PLACEHOLDER — needs real business decision on pricing model
  miniFaq: MiniFaq[];
  illustrationKey: "dashboard" | "devices" | "server" | "data" | "brainstorming" | "wireframing";
  // SEO
  seoTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
};

export const services: ServiceEntry[] = [
  {
    num: "01",
    slug: "web-engineering",
    title: "WEB ENGINEERING",
    desc: "Full-stack web applications built for scale and performance. From architecture to deployment — React, Next.js, Node, and the modern web stack.",
    tags: ["React", "Next.js", "Node.js", "PostgreSQL", "TypeScript"],
    details: [
      "Custom SaaS platforms & dashboards",
      "High-performance marketing sites",
      "E-commerce & payment integrations",
      "API design & backend systems",
      "Database architecture & optimization",
    ],
    industries: ["SaaS & Startups", "E-commerce", "FinTech", "Real Estate"],
    timeline: "6–14 weeks depending on scope and feature complexity",
    deliverables: [
      "Full source code (Git repo)",
      "Technical documentation",
      "Production deployment",
      "30-day post-launch support",
    ],
    pricing: "Scoped per project — fixed price agreed after discovery",
    miniFaq: [
      {
        q: "Can you take over an existing codebase?",
        a: "Yes, we audit and extend existing systems. We'll assess what's there before committing to timelines.",
      },
      {
        q: "Do you build with our in-house team or independently?",
        a: "Both. We work as the full team or alongside yours — whichever fits your structure.",
      },
      {
        q: "Do you work with clients outside Indore?",
        a: "Yes — we're based in Indore but build for startups and enterprises across India, coordinating over calls, async updates, and weekly demos.",
      },
    ],
    illustrationKey: "dashboard",
    seoTitle: "Web Development Company in Indore & India",
    metaDescription:
      "Custom web engineering services from a software development company in Indore, India. React, Next.js and Node.js applications built for scale — full-stack SaaS, e-commerce, and API systems.",
    h1: "Custom Web Engineering Services for Startups & Enterprises in Indore, India",
    intro:
      "Nemnidhi is a software engineering studio based in Indore, India, building full-stack web applications for startups and enterprises across the country. If your team needs production-grade architecture — not a template with extra steps — this is where we start.",
  },
  {
    num: "02",
    slug: "mobile-development",
    title: "MOBILE DEVELOPMENT",
    desc: "Native and cross-platform mobile applications that ship on time, perform under load, and hold up in production.",
    tags: ["React Native", "iOS", "Android", "Expo", "Firebase"],
    details: [
      "iOS & Android native apps",
      "Cross-platform with React Native",
      "App Store & Play Store deployment",
      "Push notifications & real-time features",
      "Offline-first architecture",
    ],
    industries: ["HealthTech", "Real Estate", "Retail", "EdTech"],
    timeline: "8–16 weeks depending on platform and feature scope",
    deliverables: [
      "Full source code (Git repo)",
      "App Store & Play Store submission",
      "API documentation",
      "30-day post-launch support",
    ],
    pricing: "Scoped per project — fixed price agreed after discovery",
    miniFaq: [
      {
        q: "Do you build for both iOS and Android?",
        a: "Yes. We use React Native for cross-platform or go native when platform-specific performance demands it.",
      },
      {
        q: "Can you publish the app to our existing developer account?",
        a: "Yes, we handle the full submission to your accounts on both stores.",
      },
      {
        q: "Are you a mobile app development company based in Indore?",
        a: "Yes — Nemnidhi is headquartered in Indore, India, and builds mobile apps for clients across the country.",
      },
    ],
    illustrationKey: "devices",
    seoTitle: "Mobile App Development Company in Indore & India",
    metaDescription:
      "React Native, iOS, and Android app development from a mobile app development company in Indore, India. Cross-platform apps built and shipped to the App Store and Play Store.",
    h1: "Mobile App Development Company Serving Indore & Businesses Across India",
    intro:
      "From a studio in Indore, India, we build native and cross-platform mobile apps for startups and enterprises nationwide. React Native gets most products to both stores fastest; we go fully native when performance demands it.",
  },
  {
    num: "03",
    slug: "cloud-devops",
    title: "CLOUD & DEVOPS",
    desc: "Infrastructure that scales with your business. CI/CD pipelines, container orchestration, zero-downtime deployments, and full observability.",
    tags: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
    details: [
      "Cloud architecture & migration",
      "CI/CD pipeline setup",
      "Container orchestration (Docker/K8s)",
      "Infrastructure as Code",
      "Monitoring & alerting systems",
    ],
    industries: ["SaaS", "FinTech", "Healthcare", "Media & Streaming"],
    timeline: "4–10 weeks depending on existing infrastructure complexity",
    deliverables: [
      "Infrastructure-as-Code files",
      "CI/CD pipeline",
      "Monitoring dashboards",
      "Runbooks & documentation",
      "30-day post-launch support",
    ],
    pricing: "Scoped per project or retainer — agreed after discovery",
    miniFaq: [
      {
        q: "Do you manage cloud costs as part of the engagement?",
        a: "We architect with cost-efficiency in mind and document all resource usage. Ongoing management is available as a retainer.",
      },
      {
        q: "Which cloud providers do you work with?",
        a: "Primarily AWS, with GCP and Azure support depending on your stack.",
      },
      {
        q: "Is Nemnidhi a DevOps consulting company in Indore?",
        a: "Yes — we're based in Indore, India, and run cloud and DevOps engagements remotely for clients across the country.",
      },
    ],
    illustrationKey: "server",
    seoTitle: "Cloud & DevOps Consulting Company in Indore, India",
    metaDescription:
      "AWS cloud architecture, CI/CD pipelines, and DevOps consulting from Nemnidhi, an Indore, India-based engineering studio. Infrastructure as Code, container orchestration, and monitoring.",
    h1: "Cloud & DevOps Consulting for Businesses in Indore & Across India",
    intro:
      "We design and operate cloud infrastructure for companies across India from our engineering studio in Indore. CI/CD, container orchestration, and Infrastructure as Code — built so deployments stop being an event.",
  },
  {
    num: "04",
    slug: "ai-integration",
    title: "AI INTEGRATION",
    desc: "Intelligent systems embedded directly into your product. LLM pipelines, RAG architectures, vector search, and custom model fine-tuning.",
    tags: ["LLMs", "RAG", "Python", "Vector DBs", "OpenAI"],
    details: [
      "LLM pipeline development",
      "RAG (Retrieval-Augmented Generation)",
      "Custom AI assistants & chatbots",
      "Document intelligence pipelines",
      "Model fine-tuning & evaluation",
    ],
    industries: ["Legal Tech", "Healthcare", "E-commerce", "Business Operations"],
    timeline: "6–12 weeks depending on model complexity and data availability",
    deliverables: [
      "Integration layer / API endpoints",
      "Model evaluation reports",
      "Deployment & handoff",
      "30-day post-launch support",
    ],
    pricing: "Scoped per project — fixed price agreed after discovery",
    miniFaq: [
      {
        q: "Do we need to provide training data?",
        a: "Depends on the use case. For RAG and LLM integration, your existing documents often suffice. For fine-tuning, we'll advise on data requirements upfront.",
      },
      {
        q: "Can AI be added to our existing product?",
        a: "Yes. Most of our AI work is embedded into existing products via API layers — we don't require a full rebuild.",
      },
      {
        q: "Is Nemnidhi an AI development company in Indore?",
        a: "Yes — we're an AI development company based in Indore, India, building LLM and RAG systems for clients across the country.",
      },
    ],
    illustrationKey: "data",
    seoTitle: "AI Development Company in Indore, India",
    metaDescription:
      "RAG, LLM integration, and generative AI development from Nemnidhi, an AI development company in Indore, India. Custom AI assistants, document intelligence, and model fine-tuning.",
    h1: "AI Development Company Building RAG & LLM Systems in Indore, India",
    intro:
      "Nemnidhi builds production AI systems — not demos — for businesses across India from our team in Indore. RAG pipelines, custom assistants, and fine-tuned models embedded directly into your existing product.",
  },
  {
    num: "05",
    slug: "product-strategy",
    title: "PRODUCT STRATEGY",
    desc: "Technical strategy before a single line of code. We map your requirements, constraints, and success metrics — no assumptions, only signal.",
    tags: ["Discovery", "Architecture", "Roadmap", "Sprint Planning"],
    details: [
      "Product discovery & scoping",
      "Technical architecture design",
      "MVP definition & prioritization",
      "Engineering team augmentation",
      "Technical due diligence",
    ],
    industries: ["SaaS & Startups", "Enterprise IT", "FinTech", "HealthTech"],
    timeline: "2–4 weeks for a discovery engagement; ongoing for augmentation",
    deliverables: [
      "Scoped requirements document",
      "Technical architecture plan",
      "MVP roadmap & priority list",
      "Due diligence report (where applicable)",
    ],
    pricing: "Scoped per engagement — fixed price or retainer agreed after discovery",
    miniFaq: [
      {
        q: "Do you only do strategy, or do you also build?",
        a: "Both — most product strategy engagements roll straight into our engineering teams once scope is set, with the same people carrying context through.",
      },
      {
        q: "Can you review a codebase before we invest further?",
        a: "Yes, technical due diligence is one of our core product strategy offerings — useful before funding rounds, acquisitions, or major rebuilds.",
      },
      {
        q: "Is this available for companies outside Indore?",
        a: "Yes — we run product strategy engagements remotely for startups and enterprises across India, not only in Indore.",
      },
    ],
    illustrationKey: "brainstorming",
    seoTitle: "Product Strategy Consulting in Indore, India",
    metaDescription:
      "Technical product strategy, MVP scoping, and due diligence from Nemnidhi, a product strategy consulting team based in Indore, India, serving startups and enterprises nationwide.",
    h1: "Product Strategy Consulting for Startups & Enterprises in Indore, India",
    intro:
      "Before any code gets written, we map requirements, constraints, and success metrics with your team. Based in Indore, India, we run discovery and architecture engagements for companies across the country.",
  },
  {
    num: "06",
    slug: "ui-ux-design",
    title: "UI/UX DESIGN",
    desc: "Design systems and interfaces built for conversion, clarity, and production. Every pixel earned, every interaction intentional.",
    tags: ["Figma", "Design Systems", "Prototyping", "User Research"],
    details: [
      "Product UI/UX design",
      "Design system creation",
      "Interactive prototyping",
      "Accessibility (WCAG) compliance",
      "Usability testing & iteration",
    ],
    industries: ["SaaS & Startups", "E-commerce", "FinTech", "Real Estate"],
    timeline: "3–8 weeks depending on scope and number of screens",
    deliverables: [
      "Figma design files",
      "Reusable design system / component library",
      "Interactive prototype",
      "Developer handoff documentation",
    ],
    pricing: "Scoped per project — fixed price agreed after discovery",
    miniFaq: [
      {
        q: "Do you design and build, or design only?",
        a: "Both are available. Many clients use our design system as the handoff into our own engineering team for a seamless build.",
      },
      {
        q: "Can you redesign an existing product without a full rebuild?",
        a: "Yes — we regularly work within existing codebases, evolving the design system in place rather than starting over.",
      },
      {
        q: "Is Nemnidhi a UI/UX design agency based in Indore?",
        a: "Yes — we're a UI/UX design agency headquartered in Indore, India, working with clients across the country.",
      },
    ],
    illustrationKey: "wireframing",
    seoTitle: "UI/UX Design Agency in Indore, India",
    metaDescription:
      "UI/UX design and design systems from Nemnidhi, a UI/UX design agency in Indore, India. Product design, prototyping, and accessibility-compliant interfaces for startups and enterprises.",
    h1: "UI/UX Design Agency for Startups & Enterprises in Indore, India",
    intro:
      "We design interfaces meant to ship, not just present. From our studio in Indore, India, we build design systems and product experiences for companies across the country.",
  },
];

export function getServiceBySlug(slug: string): ServiceEntry | undefined {
  return services.find((s) => s.slug === slug);
}
