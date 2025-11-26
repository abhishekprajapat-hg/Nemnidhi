// app/page.tsx
import Hero from "@/components/home/Hero";
import ServicesSection from "@/components/home/ServicesSection";
import ProcessSection from "@/components/home/ProcessSection";
import TechStackStrip from "@/components/home/TechStackStrip";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <ProcessSection />
      <TechStackStrip />
      {/* Next: CaseStudiesPreview, ContactCTA */}
    </>
  );
}
