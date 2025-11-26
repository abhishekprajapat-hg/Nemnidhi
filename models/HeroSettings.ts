// models/HeroSettings.ts
import mongoose, { Schema, Model, Document } from "mongoose";

export interface IHeroSettings extends Document {
  badgeText: string;
  headingMain: string;
  headingHighlight: string;
  headingSuffix: string;
  subheading: string;
  primaryCtaLabel: string;
  primaryCtaSub: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  microCopy: string;
}

const HeroSettingsSchema = new Schema<IHeroSettings>(
  {
    badgeText: {
      type: String,
      default: "Business · Strategy · Technology",
    },
    headingMain: {
      type: String,
      default: "We architect",
    },
    headingHighlight: {
      type: String,
      default: "black-label digital systems",
    },
    headingSuffix: {
      type: String,
      default: "for brands that refuse to look average.",
    },
    subheading: {
      type: String,
      default:
        "Nemnidhi blends senior-level strategy with full-stack MERN execution — crafting websites and platforms that feel meticulously designed, convert quietly, and scale like a serious business asset, not just a pretty brochure.",
    },
    primaryCtaLabel: {
      type: String,
      default: "Book a private strategy call",
    },
    primaryCtaSub: {
      type: String,
      default: "→ Limited slots",
    },
    primaryCtaHref: {
      type: String,
      default: "/contact",
    },
    secondaryCtaLabel: {
      type: String,
      default: "View case studies",
    },
    secondaryCtaHref: {
      type: String,
      default: "/case-studies",
    },
    microCopy: {
      type: String,
      default:
        "No templates. No noise. Just calm, compound growth engineered in black & gold.",
    },
  },
  { timestamps: true }
);

export const HeroSettings: Model<IHeroSettings> =
  mongoose.models.HeroSettings ||
  mongoose.model<IHeroSettings>("HeroSettings", HeroSettingsSchema);
