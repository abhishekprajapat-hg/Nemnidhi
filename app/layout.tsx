import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { AOSProvider } from "@/components/providers/AOSProvider";
import { Manrope, Syne } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Nemnidhi | Digital Growth Systems",
  description:
    "Nemnidhi designs conversion-focused websites, growth systems, and operational tools for founders and SMEs.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: ["/favicon.svg"],
    apple: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${syne.variable} site-shell min-h-screen`}>
        <LenisProvider>
          <AOSProvider>
            <div className="relative flex min-h-screen flex-col overflow-x-clip">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </AOSProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
