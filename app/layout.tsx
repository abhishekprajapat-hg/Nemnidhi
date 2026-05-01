import type { Metadata } from "next";
import "./globals.css";
import { Manrope, Space_Grotesk } from "next/font/google";
import SiteShell from "@/components/layout/SiteShell";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Nemnidhi | The Future of Work, Today",
  description:
    "Nemnidhi builds enterprise-ready digital systems, product experiences, and growth infrastructure for scaling teams.",
  icons: {
    icon: [{ url: "/favicon.svg?v=2", type: "image/svg+xml" }],
    shortcut: ["/favicon.svg?v=2"],
    apple: [{ url: "/favicon.svg?v=2", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${spaceGrotesk.variable} site-shell min-h-screen`}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
