import { ArrowUpRight } from "lucide-react";
import Container from "@/components/layout/Container";

type Service = {
  _id?: string;
  title: string;
  description: string;
  points: string[];
};

type ServicesSectionProps = {
  services: Service[];
};

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section className="theme-section deferred-section">
      <Container className="py-10 md:py-14">
        <div className="mb-8 space-y-4 text-center md:text-left">
          <p className="section-eyebrow">Solutions</p>
          <h2 className="section-title">Shift your orbit with Nemnidhi</h2>
          <p className="mx-auto max-w-3xl section-copy md:mx-0">
            Discover solutions engineered to streamline operations, improve collaboration, and accelerate
            business growth.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <article
              key={service._id ?? service.title}
              className="theme-card flex h-full flex-col p-5 transition hover:-translate-y-1"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-[#EDF8FD] text-sm font-bold text-[#003464]">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="text-xl font-semibold text-[#003464]">{service.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#333333]">{service.description}</p>

              <ul className="mt-4 space-y-2 text-sm text-[#505662]">
                {(service.points || []).slice(0, 3).map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#0D8AFD]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-5">
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#0D8AFD]">
                  Learn more
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
