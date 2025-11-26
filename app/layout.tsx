import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { AOSProvider } from "@/components/providers/AOSProvider";

export const metadata: Metadata = {
  title: "Nemnidhi | Business & Tech Solutions",
  description:
    "We build digital solutions that grow your business using the MERN stack and modern growth strategies.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-50">
        <LenisProvider>
          <AOSProvider>
            <div className="flex min-h-screen flex-col">
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
