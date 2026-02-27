import { ExternalLink } from "lucide-react";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import ProjectPreview from "@/components/projects/ProjectPreview";

const DEFAULT_PAGE_SHOTS = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Solutions", path: "/solutions" },
  { label: "Case Studies", path: "/case-studies" },
  { label: "Projects", path: "/projects" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const NEMNIDHI_MAIN_PAGE_SHOTS = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
];

const NEMNIDHI_CLOUD_PAGE_SHOTS = [{ label: "Control Home", path: "/" }];

const GLAM_PAGE_SHOTS = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/products" },
];

const PROJECTS = [
  {
    id: "nemnidhi-main",
    name: "Nemnidhi Main Site",
    domain: "www.nemnidhi.com",
    href: "https://www.nemnidhi.com",
    pages: NEMNIDHI_MAIN_PAGE_SHOTS,
    summary:
      "Primary marketing site focused on clarity-led positioning, service pages, and conversion-ready user flow.",
  },
  {
    id: "nemnidhi-cloud",
    name: "Nemnidhi Cloud",
    domain: "nemnidhi.cloud",
    href: "https://nemnidhi.cloud",
    pages: NEMNIDHI_CLOUD_PAGE_SHOTS,
    summary:
      "Cloud deployment endpoint used for platform and infrastructure-backed product delivery.",
  },
  {
    id: "glam-nemnidhi",
    name: "Glam by Nemnidhi",
    domain: "glam.nemnidhi.com",
    href: "https://glam.nemnidhi.com",
    pages: GLAM_PAGE_SHOTS,
    summary:
      "Subdomain project for brand-specific presentation and campaign-focused growth execution.",
  },
];

export default function ProjectsPage() {
  return (
    <section className="theme-section min-h-screen">
      <Container className="py-16 md:py-22">
        <header className="mb-12 space-y-5">
          <p className="theme-pill">Projects</p>
          <h1 className="max-w-4xl text-4xl text-slate-50 md:text-5xl">
            Live builds across the Nemnidhi ecosystem.
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
            Explore active web properties and open each project directly. Inline previews
            are shown below for quick scanning.
          </p>
        </header>

        <div className="grid gap-7">
          {PROJECTS.map((project) => (
            <article
              key={project.id}
              className="theme-card-strong overflow-hidden rounded-3xl border border-white/10 [border-color:var(--line)]"
            >
              <div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
                <div className="space-y-4 p-5 md:p-6">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                    {project.domain}
                  </p>
                  <h2 className="text-2xl font-semibold text-slate-100">{project.name}</h2>
                  <p className="text-sm leading-relaxed text-slate-300">{project.summary}</p>
                  <Button asChild>
                    <a href={project.href} target="_blank" rel="noreferrer">
                      Open project
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                </div>

                <ProjectPreview
                  href={project.href}
                  name={project.name}
                  domain={project.domain}
                  pages={project.pages}
                />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center [border-color:var(--line)]">
          <p className="text-sm text-slate-300">
            Need a project page like this for client portfolios or product demos?
          </p>
          <p className="mt-1 text-xs text-slate-400">
            We can build the structure and connect it to your internal workflow.
          </p>
          <Button asChild className="mt-4">
            <a href="/contact?from=projects">Start a project discussion</a>
          </Button>
        </div>
      </Container>
    </section>
  );
}
