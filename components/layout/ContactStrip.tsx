import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { CTA } from "@/components/ui/CTA";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";

export default function ContactStrip() {
  return (
    <Section size="wide" className="border-b border-[var(--color-line)]">
      <Card variant="strong" className="grid gap-8 p-6 md:p-8 lg:grid-cols-[0.62fr_0.38fr] lg:items-end">
        <div>
          <Badge>Partner interface</Badge>
          <Heading className="mt-5 max-w-4xl">Build the digital foundation your next growth stage deserves.</Heading>
        </div>
        <div>
          <p className="section-copy">
            We will map the right blend of brand, product, and workflow systems for your business.
          </p>
          <div className="mt-7">
            <CTA href="/contact">Book a briefing</CTA>
          </div>
        </div>
      </Card>
    </Section>
  );
}
