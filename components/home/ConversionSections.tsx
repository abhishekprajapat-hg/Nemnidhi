import { ArrowUpRight, CircleDollarSign, LockKeyhole, Network, ShieldCheck, Sparkles } from "lucide-react";
import { AnimatedDivider } from "@/components/motion/AnimatedDivider";
import { AnimatedNumber } from "@/components/motion/AnimatedNumber";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { CTA } from "@/components/ui/CTA";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";

const trustLogos = ["Aurum Ledger", "Northstar Capital", "VaultOps", "Finovo", "Crestline", "PrismPay"];

const stats = [
  { label: "Qualified digital systems shipped", value: 42, suffix: "+" },
  { label: "Average launch window reduction", value: 38, suffix: "%" },
  { label: "Core business layers integrated", value: 3, suffix: "x" },
  { label: "Senior-led delivery ownership", value: 100, suffix: "%" },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Credibility from first touch",
    body: "A premium interface, clear proof points, and confident language help serious buyers trust the business faster.",
  },
  {
    icon: Network,
    title: "One connected growth layer",
    body: "Brand, website, product, CRM, and automation decisions are designed together instead of stitched together later.",
  },
  {
    icon: LockKeyhole,
    title: "Operational confidence",
    body: "Secure architecture, clean admin flows, and maintainable handover reduce risk after launch.",
  },
];

const showcaseMetrics = [
  ["Lead routing", "Instant"],
  ["Signal quality", "High intent"],
  ["Ops visibility", "Live"],
];

const testimonials = [
  {
    quote:
      "Nemnidhi gave our digital presence the seriousness we needed. The site finally explains our offer clearly and sends better-qualified conversations to the team.",
    name: "Aarav Mehta",
    role: "Founder, Fintech Advisory Group",
  },
  {
    quote:
      "The biggest win was how connected everything felt: landing page, CRM, automations, and admin workflows all moved in one direction.",
    name: "Ishita Rao",
    role: "Operations Lead, Growth Platform",
  },
  {
    quote:
      "They brought premium design discipline without slowing down execution. The system feels polished, practical, and easy for our team to run.",
    name: "Kabir Sethi",
    role: "Managing Partner, Venture Services",
  },
];

const faqs = [
  {
    question: "What type of companies is Nemnidhi best suited for?",
    answer:
      "Founder-led businesses, financial services teams, SaaS operators, consultancies, and growth teams that need a premium public website plus reliable operational workflows underneath.",
  },
  {
    question: "Can you work with our existing systems?",
    answer:
      "Yes. We usually audit the current stack first, then decide what should be retained, integrated, simplified, or rebuilt for better performance and maintainability.",
  },
  {
    question: "Is this only website design?",
    answer:
      "No. The landing experience is one part of a broader system: product engineering, CRM flows, lead capture, dashboards, automation, deployment, and handover.",
  },
  {
    question: "How do you keep the experience conversion-focused?",
    answer:
      "We prioritize clarity, trust signals, proof, strong CTAs, fast loading, accessible interfaces, and a page structure that guides serious buyers toward the next action.",
  },
];

export function CredibilityStrip() {
  return (
    <Section size="wide" containerClassName="py-10 md:py-12">
      <div className="grid gap-6 lg:grid-cols-[0.25fr_0.75fr] lg:items-center">
        <div>
          <p className="section-eyebrow">Trusted operating language</p>
          <p className="mt-2 text-sm leading-6 text-[#91A0B5]">Built for credibility-sensitive teams.</p>
        </div>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-white/10 md:grid-cols-3 xl:grid-cols-6">
          {trustLogos.map((logo) => (
            <div key={logo} className="grid min-h-20 place-items-center bg-[#07111F]/90 px-4 text-center text-sm font-bold text-[#B7C4D8] transition-colors hover:text-[#F0D991]">
              {logo}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function StatisticsSection() {
  return (
    <Section size="wide">
      <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-end">
        <div>
          <Badge tone="success">Measurable momentum</Badge>
          <div data-clip-reveal>
            <Heading className="mt-5">Confidence buyers can feel, backed by operational clarity.</Heading>
          </div>
        </div>
        <p className="section-copy">
          The landing page should act like a trusted advisor: establish authority, reduce uncertainty, and make the next step obvious.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <Card key={item.label} className="group p-6 transition-transform duration-200 hover:-translate-y-1">
            <p className="text-4xl font-semibold tracking-[-0.04em] text-[#F8FBFF] md:text-5xl">
              <AnimatedNumber value={item.value} suffix={item.suffix} />
            </p>
            <p className="mt-4 text-sm font-semibold leading-6 text-[#AFC0D6]">{item.label}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

export function BenefitsSection() {
  return (
    <Section size="wide">
      <div className="grid gap-10 lg:grid-cols-[0.5fr_0.5fr] lg:items-center">
        <div>
          <Badge>Why it converts</Badge>
          <div data-clip-reveal>
            <Heading className="mt-5">A page that lowers doubt before it asks for action.</Heading>
          </div>
          <p className="mt-5 section-copy">
            High-end fintech buyers do not need noise. They need immediate trust, a clear model, and proof that the team behind the interface can execute.
          </p>
          <AnimatedDivider className="mt-8" />
        </div>

        <div className="grid gap-4">
          {benefits.map(({ icon: Icon, title, body }) => (
            <Card key={title} className="group grid gap-4 p-5 transition-transform duration-200 hover:-translate-y-1 sm:grid-cols-[auto_1fr]">
              <div className="grid h-12 w-12 place-items-center rounded-[var(--radius-md)] border border-[rgba(214,190,124,0.3)] bg-[rgba(214,190,124,0.11)] text-[#F0D991]">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#F8FBFF]">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#AFC0D6]">{body}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function ProductShowcaseSection() {
  return (
    <Section size="wide">
      <div className="grid gap-10 lg:grid-cols-[0.45fr_0.55fr] lg:items-center">
        <div>
          <Badge tone="blue">Product showcase</Badge>
          <div data-clip-reveal>
            <Heading className="mt-5">A private operating room for leads, workflows, and decision signals.</Heading>
          </div>
          <p className="mt-5 section-copy">
            The public website is only the visible layer. Behind it, Nemnidhi can connect intake forms, qualification paths, CRM actions, and dashboards into one reliable system.
          </p>
          <div className="mt-7">
            <CTA href="/projects">View system examples</CTA>
          </div>
        </div>

        <Card variant="strong" className="overflow-hidden p-0">
          <div className="showcase-illustration relative min-h-[30rem] overflow-hidden p-5" data-image-scale>
            <div className="showcase-orbit" aria-hidden />
            <div className="relative z-10 rounded-[var(--radius-lg)] border border-white/10 bg-[#030712]/72 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="section-eyebrow">Command layer</p>
                  <h3 className="mt-2 text-2xl font-semibold text-[#F8FBFF]">Opportunity Console</h3>
                </div>
                <CircleDollarSign className="h-8 w-8 text-[#F0D991]" aria-hidden />
              </div>

              <div className="mt-6 grid gap-3">
                {showcaseMetrics.map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between rounded-[var(--radius-md)] border border-white/10 bg-white/[0.035] px-4 py-3">
                    <span className="text-sm font-semibold text-[#AFC0D6]">{label}</span>
                    <span className="text-sm font-bold text-[#F8FBFF]">{value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[var(--radius-md)] border border-[rgba(125,211,252,0.18)] bg-[rgba(125,211,252,0.06)] p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-bold text-[#D9E2EF]">
                  <Sparkles className="h-4 w-4 text-[#7DD3FC]" aria-hidden />
                  Next best action
                </div>
                <p className="text-sm leading-7 text-[#AFC0D6]">
                  Route high-intent founder enquiry to advisory call, attach requirements, and notify operations.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}

export function TestimonialsSection() {
  return (
    <Section size="wide">
      <div className="grid gap-8 lg:grid-cols-[0.36fr_0.64fr] lg:items-end">
        <div>
          <Badge tone="neutral">Client voice</Badge>
          <div data-clip-reveal>
            <Heading className="mt-5">Clearer systems create calmer decisions.</Heading>
          </div>
        </div>
        <p className="section-copy">
          The experience is designed to make Nemnidhi feel premium, competent, and safe to contact.
        </p>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {testimonials.map((item) => (
          <Card key={item.name} className="flex min-h-80 flex-col p-6 transition-transform duration-200 hover:-translate-y-1">
            <p className="text-5xl leading-none text-[#D6BE7C]">“</p>
            <blockquote className="mt-3 text-base leading-8 text-[#D9E2EF]">{item.quote}</blockquote>
            <div className="mt-auto pt-8">
              <p className="font-semibold text-[#F8FBFF]">{item.name}</p>
              <p className="mt-1 text-sm text-[#91A0B5]">{item.role}</p>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

export function FAQSection() {
  return (
    <Section size="wide">
      <div className="grid gap-10 lg:grid-cols-[0.38fr_0.62fr]">
        <div>
          <Badge>FAQ</Badge>
          <div data-clip-reveal>
            <Heading className="mt-5">Answers for serious buyers.</Heading>
          </div>
          <p className="mt-5 section-copy">
            Short, direct, and trust-building. The page should remove friction before a prospect reaches out.
          </p>
        </div>
        <div className="space-y-3">
          {faqs.map((item) => (
            <details key={item.question} className="group rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[#07111F]/72 p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-[#F8FBFF]">
                {item.question}
                <ArrowUpRight className="h-4 w-4 shrink-0 text-[#F0D991] transition-transform group-open:rotate-45" aria-hidden />
              </summary>
              <p className="mt-4 text-sm leading-7 text-[#AFC0D6]">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function FinalCTASection() {
  return (
    <Section size="wide" className="border-b border-[var(--color-line)]">
      <Card variant="strong" className="relative overflow-hidden p-6 md:p-10">
        <div className="cta-illustration" data-parallax="34" aria-hidden />
        <div className="relative z-10 grid gap-8 lg:grid-cols-[0.66fr_0.34fr] lg:items-end">
          <div>
            <Badge>Final call</Badge>
            <div data-clip-reveal>
              <Heading className="mt-5 max-w-5xl">Create a premium fintech presence that turns trust into qualified conversations.</Heading>
            </div>
          </div>
          <div>
            <p className="section-copy">
              Share what you are building. We will map the interface, workflow, and conversion system that fits your next stage.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <CTA href="/contact">Start a briefing</CTA>
              <a href="tel:+917000455463" className="inline-flex items-center justify-center rounded-[var(--radius-sm)] border border-white/10 bg-white/[0.035] px-5 py-3 text-sm font-bold text-[#F8FBFF] transition-colors hover:border-[rgba(214,190,124,0.5)] hover:text-[#F0D991]">
                Call +91 70004 55463
              </a>
            </div>
          </div>
        </div>
      </Card>
    </Section>
  );
}
