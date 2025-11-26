// app/page.tsx
import Hero from "@/components/home/Hero";
import ServicesSection from "@/components/home/ServicesSection";
import ProcessSection from "@/components/home/ProcessSection";
import TechStackStrip from "@/components/home/TechStackStrip";
import CaseStudiesSection from "@/components/home/CaseStudiesSection";
import ContactStrip from "@/components/layout/ContactStrip";

import { dbConnect } from "@/lib/mongodb";
import { Service } from "@/models/Service";
import { HeroSettings } from "@/models/HeroSettings";

async function getServices() {
  await dbConnect();
  const docs = await Service.find().sort({ createdAt: 1 }).lean();
  return docs.map((doc: any) => ({
    _id: doc._id.toString(),
    title: doc.title,
    description: doc.description,
    points: doc.points,
  }));
}

async function getHero() {
  await dbConnect();
  const doc = await HeroSettings.findOne().lean();
  if (!doc) return null;

  return {
    badgeText: doc.badgeText,
    headingMain: doc.headingMain,
    headingHighlight: doc.headingHighlight,
    headingSuffix: doc.headingSuffix,
    subheading: doc.subheading,
    primaryCtaLabel: doc.primaryCtaLabel,
    primaryCtaSub: doc.primaryCtaSub,
    primaryCtaHref: doc.primaryCtaHref,
    secondaryCtaLabel: doc.secondaryCtaLabel,
    secondaryCtaHref: doc.secondaryCtaHref,
    microCopy: doc.microCopy,
  };
}

export default async function HomePage() {
  const [services, hero] = await Promise.all([getServices(), getHero()]);

  return (
    <>
      <Hero hero={hero} />
      <ServicesSection services={services} />
      <ProcessSection />
      <TechStackStrip />
      <CaseStudiesSection />
      <ContactStrip />
    </>
  );
}
