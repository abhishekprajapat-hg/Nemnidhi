"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import MotionProvider from "@/components/motion/MotionProvider";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

const RequirementChatbot = dynamic(() => import("@/components/chat/RequirementChatbot"), {
  ssr: false,
  loading: () => null,
});

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isAuthRoute = ["/login", "/signin", "/sign-in", "/signup", "/sign-up", "/portal/login", "/portal/signup"].includes(pathname);
  const showSiteChrome = !isDashboardRoute && !isAuthRoute;

  return (
    <ThemeProvider>
      <div
        className="scene-root relative flex min-h-screen flex-col overflow-x-clip"
        style={{ background: "var(--color-bg)", transition: "background 0.3s ease, color 0.3s ease" }}
      >
          <MotionProvider>

            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            {showSiteChrome && <Navbar />}
            <main id="main-content" tabIndex={-1} className={`relative z-[2] flex-1 ${showSiteChrome ? "pb-24 md:pb-0" : ""}`}>
              {children}
            </main>
            {showSiteChrome && <Footer />}
            {showSiteChrome && <RequirementChatbot />}
          </MotionProvider>
      </div>
    </ThemeProvider>
  );
}
