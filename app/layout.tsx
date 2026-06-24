import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import localFont from "next/font/local";
import { Barlow_Condensed, Barlow, JetBrains_Mono } from "next/font/google";
import SiteShell from "@/components/layout/SiteShell";

const siteUrl = "https://nemnidhi.com";

// Body font — clean sans-serif
const barlow = Barlow({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

// Display/heading font — ultra-bold condensed like the Figma
const modernRomance = localFont({
  src: "../public/fonts/modern-romance.otf",
  variable: "--font-display",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  variable: "--font-condensed",
  weight: ["700", "800", "900"],
  style: ["normal", "italic"],
});

// Mono font — for labels, nav, tags
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Nemnidhi",
  title: {
    default: "Nemnidhi | Engineering Software That Scales",
    template: "%s | Nemnidhi",
  },
  description:
    "We build production-grade software for startups and enterprises — from architecture to deployment. Precision engineering, zero compromise.",
  keywords: [
    "software engineering",
    "web development",
    "mobile development",
    "cloud architecture",
    "AI integration",
    "DevOps",
    "Nemnidhi",
  ],
  authors: [{ name: "Nemnidhi" }],
  creator: "Nemnidhi",
  publisher: "Nemnidhi",
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "6P_uML8nzWPNZ5uOoSBzgpENRVKJ5E3C2JRMdYGr_e0",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Nemnidhi",
    title: "Nemnidhi | Engineering Software That Scales",
    description:
      "Production-grade software for startups and enterprises — from architecture to deployment.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Nemnidhi software engineering studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nemnidhi | Engineering Software That Scales",
    description:
      "Production-grade software for startups and enterprises — from architecture to deployment.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Nemnidhi",
    url: siteUrl,
    logo: `${siteUrl}/favicon.png`,
    email: "info@nemnidhi.com",
    telephone: "+91 70004 55463",
    address: {
      "@type": "PostalAddress",
      streetAddress: "B20, 5th Floor Gravity Mall, Mechanic Nagar",
      addressLocality: "Indore",
      addressRegion: "Madhya Pradesh",
      postalCode: "452011",
      addressCountry: "IN",
    },
    sameAs: ["https://www.linkedin.com", "https://www.twitter.com"],
    description:
      "Production-grade software engineering for startups and enterprises.",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${barlow.variable} ${barlowCondensed.variable} ${modernRomance.variable} ${jetbrainsMono.variable} min-h-screen`}
        style={{ background: "#080a0c" }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
