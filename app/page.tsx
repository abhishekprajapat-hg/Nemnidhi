// app/page.tsx
import Hero from "@/components/home/Hero";
import HomeHyperspeed from "@/components/home/HomeHyperspeed";
import ScrollChapterRail from "@/components/home/ScrollChapterRail";
import ScrollStorySection from "@/components/home/ScrollStorySection";
import TickerStrip from "@/components/home/TickerStrip";
import StatsSection from "@/components/home/StatsSection";
import ServicesSection from "@/components/home/ServicesSection";
import WorkSection from "@/components/home/WorkSection";
import ProcessSection from "@/components/home/ProcessSection";
import TechStackStrip from "@/components/home/TechStackStrip";
import ContactSection from "@/components/home/ContactSection";

import { dbConnect } from "@/lib/mongodb";
import { Service } from "@/models/Service";
import { HeroSettings } from "@/models/HeroSettings";

type ServiceDoc = {
  _id: { toString: () => string };
  title: string;
  description: string;
  points: string[];
};

async function getServices() {
  try {
    await dbConnect();
    const docs = await Service.find().sort({ createdAt: 1 }).lean();
    return (docs as ServiceDoc[]).map((doc) => ({
      _id: doc._id.toString(),
      title: doc.title,
      description: doc.description,
      points: doc.points,
    }));
  } catch {
    return [];
  }
}

async function getHero() {
  try {
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
      primaryCtaHref: doc.primaryCtaHref,
      secondaryCtaLabel: doc.secondaryCtaLabel,
      secondaryCtaHref: doc.secondaryCtaHref,
    };
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const [services, hero] = await Promise.all([getServices(), getHero()]);

  return (
    <>
      <HomeHyperspeed />
      <ScrollChapterRail />
      <div className="home-page-content">
        <Hero hero={hero} />
        <TickerStrip />
        <StatsSection />
        <ScrollStorySection />
        <ServicesSection services={services} />
        <WorkSection />
        <ProcessSection />
        <TechStackStrip />
        <ContactSection />
      </div>
    </>
  );
}
