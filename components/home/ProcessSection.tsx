import { Layers, Rocket, ShieldCheck, Workflow } from "lucide-react";
import Container from "@/components/layout/Container";

const STEPS = [
  {
    title: "Future-ready architecture",
    body: "Enterprise-grade foundations that support high-velocity delivery and reliable scale.",
    icon: Layers,
  },
  {
    title: "Enterprise-ready from day one",
    body: "Solutions tailored to your operating model so teams move faster with less friction.",
    icon: ShieldCheck,
  },
  {
    title: "Scale through integrated workflows",
    body: "Structured systems that connect data, product, and teams in one operating layer.",
    icon: Workflow,
  },
  {
    title: "Faster execution cycles",
    body: "Ship improvements continuously with measurable outcomes and clear ownership.",
    icon: Rocket,
  },
];

export default function ProcessSection() {
  return (
    <section className="plain-section deferred-section border-t border-[#E9E9E9]">
      <Container className="py-10 md:py-14">
        <div className="mb-10 grid items-center gap-8 md:grid-cols-2">
          <h2 className="section-title max-w-2xl">
            We are a key innovation partner for iconic and emerging brands.
          </h2>
          <div className="grid grid-cols-3 gap-5">
            <div className="text-center">
              <p className="text-4xl font-bold text-[#003464]">2000+</p>
              <p className="mt-1 text-sm text-[#333333]">Brands</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-[#003464]">100%</p>
              <p className="mt-1 text-sm text-[#333333]">Go-live</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-[#003464]">99%</p>
              <p className="mt-1 text-sm text-[#333333]">Retention</p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <article key={step.title} className="theme-card p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md bg-[#EDF8FD] text-[#0D8AFD]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-[#003464]">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#333333]">{step.body}</p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
