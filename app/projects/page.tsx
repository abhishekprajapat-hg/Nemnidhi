import { ExternalLink } from "lucide-react";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import ProjectPreview from "@/components/projects/ProjectPreview";
import { PROJECTS } from "@/lib/projects";

export default function ProjectsPage() {
  return (
    <section className="theme-section min-h-screen">
      <Container className="py-10 md:py-14">
        <header className="mb-10 space-y-4">
          <p className="section-eyebrow">Customers</p>
          <h1 className="section-title max-w-4xl">Live builds across the Nemnidhi ecosystem.</h1>
          <p className="max-w-3xl section-copy">
            Explore active web properties and open each project directly. Inline previews are shown for quick scanning.
          </p>
        </header>

        <div className="grid gap-6">
          {PROJECTS.map((project) => (
            <article
              key={project.id}
              id={project.id}
              className="theme-card-strong overflow-hidden border border-[#E9E9E9]"
            >
              <div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
                <div className="space-y-4 p-5 md:p-6">
                  <p className="section-eyebrow">{project.domain}</p>
                  <h2 className="text-2xl font-semibold text-[#003464]">{project.name}</h2>
                  <p className="text-sm leading-7 text-[#333333]">{project.summary}</p>
                  <Button asChild>
                    <a href={project.href} target="_blank" rel="noreferrer">
                      Open project
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>

                <ProjectPreview
                  href={project.href}
                  staticPreviewSrc={project.staticPreviewSrc}
                  staticPreviewAlt={project.staticPreviewAlt}
                />
              </div>
            </article>
          ))}
        </div>

        <div className="theme-card mt-10 p-6 text-center">
          <p className="text-base text-[#333333]">
            Need a project page like this for client portfolios or product demos?
          </p>
          <p className="mt-1 text-sm text-[#505662]">
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
