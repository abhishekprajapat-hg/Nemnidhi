import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import RequirementChatbot from "@/components/chat/RequirementChatbot";
import { Manrope, Space_Grotesk } from "next/font/google";

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
        <div className="scene-root relative flex min-h-screen flex-col overflow-x-clip">
          <Navbar />
          <main className="relative z-[2] flex-1 pb-24 md:pb-0">{children}</main>
          <Footer />
          <RequirementChatbot />
        </div>
      </body>
    </html>
  );
}
