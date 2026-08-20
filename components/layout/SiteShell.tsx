"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [loadDeferredChrome, setLoadDeferredChrome] = useState(false);
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isAuthRoute = ["/login", "/signin", "/sign-in", "/signup", "/sign-up", "/portal/login", "/portal/signup"].includes(pathname);
  const showSiteChrome = !isDashboardRoute && !isAuthRoute;

  useEffect(() => {
    if (!showSiteChrome) return;

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(() => setLoadDeferredChrome(true), { timeout: 1600 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = globalThis.setTimeout(() => setLoadDeferredChrome(true), 900);
    return () => globalThis.clearTimeout(timeoutId);
  }, [showSiteChrome]);

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
            {showSiteChrome && loadDeferredChrome && <RequirementChatbot />}
          </MotionProvider>
      </div>
    </ThemeProvider>
  );
}
