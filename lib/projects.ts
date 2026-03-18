export type ProjectItem = {
  id: string;
  name: string;
  domain: string;
  href: string;
  summary: string;
  staticPreviewSrc?: string;
  staticPreviewAlt?: string;
};

export const PROJECTS: ProjectItem[] = [
  {
    id: "nemnidhi-main",
    name: "Nemnidhi Main Site",
    domain: "www.nemnidhi.com",
    href: "https://www.nemnidhi.com",
    summary:
      "Primary marketing site focused on clarity-led positioning, service pages, and conversion-ready user flow.",
  },
  {
    id: "nemnidhi-cloud",
    name: "Nemnidhi Cloud",
    domain: "nemnidhi.cloud",
    href: "https://nemnidhi.cloud",
    summary:
      "Cloud deployment endpoint used for platform and infrastructure-backed product delivery.",
  },
  {
    id: "glam-nemnidhi",
    name: "Glam by Nemnidhi",
    domain: "glam.nemnidhi.com",
    href: "https://glam.nemnidhi.com",
    staticPreviewSrc: "/project-previews/glam-home.png",
    staticPreviewAlt: "Glam by Nemnidhi homepage preview",
    summary:
      "Subdomain project for brand-specific presentation and campaign-focused growth execution.",
  },
  {
    id: "finedge-nemnidhi",
    name: "Finedge by Nemnidhi",
    domain: "finedge.nemnidhi.com",
    href: "https://finedge.nemnidhi.com",
    summary:
      "Financial services focused subdomain built for trust-first positioning and high-intent lead capture.",
  },
  {
    id: "nemnidhi-tech",
    name: "Nemnidhi Tech",
    domain: "nemnidhi.tech",
    href: "https://nemnidhi.tech",
    summary:
      "Technology-focused web property for product engineering offerings and innovation-led brand communication.",
  },
];
