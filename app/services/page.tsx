import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { SERVICE_PLANS } from "@/lib/plans";

export default function ServicesPage() {
  return (
    <section className="theme-section deferred-section min-h-screen">
      <Container className="py-10 md:py-14">
        <header className="mb-10 space-y-4">
          <p className="section-eyebrow">Products</p>
          <h1 className="section-title max-w-4xl">
            Structured delivery programs for teams that need clarity and speed.
          </h1>
          <p className="max-w-3xl section-copy">
            Every engagement is designed around outcomes, practical implementation, and sustained execution quality.
          </p>
        </header>

        <div className="grid gap-5 md:grid-cols-2">
          {SERVICE_PLANS.map((plan) => (
            <article
              key={plan.id}
              className="theme-card p-5 md:p-6"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="section-eyebrow">{plan.badge ?? "Plan"}</p>
                  <h2 className="mt-1 text-2xl font-semibold text-[#E7F0FF]">{plan.name}</h2>
                  <p className="mt-1 text-sm font-semibold text-[#66AAFF]">{plan.tagline}</p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-[#AABFD4]">
                <div>
                  <p className="mb-2 section-eyebrow">Best For</p>
                  <ul className="space-y-1.5">
                    {plan.bestFor.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-[8px] h-1.5 w-1.5 rounded-full bg-[#66AAFF]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="mb-2 section-eyebrow">Includes</p>
                  <ul className="space-y-1.5">
                    {plan.includes.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-[8px] h-1.5 w-1.5 rounded-full bg-[#3A5675]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="mb-2 section-eyebrow">Outcomes</p>
                  <ul className="space-y-1.5">
                    {plan.outcomes.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-[8px] h-1.5 w-1.5 rounded-full bg-[#E7F0FF]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <Button asChild>
                  <a href={`/contact?plan=${encodeURIComponent(plan.id)}`}>
                    {plan.highlight === "custom" ? "Discuss a custom engagement" : "Discuss this plan"}
                  </a>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
