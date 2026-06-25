"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import MotionProvider from "@/components/motion/MotionProvider";

const RequirementChatbot = dynamic(() => import("@/components/chat/RequirementChatbot"), {
  ssr: false,
  loading: () => null,
});

const MagicBentoLayer = dynamic(() => import("@/components/motion/MagicBentoLayer"), {
  ssr: false,
  loading: () => null,
});



export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboardRoute = pathname.startsWith("/dashboard");

  return (
    <div
      className="scene-root relative flex min-h-screen flex-col overflow-x-clip"
      style={{ background: "#080a0c" }}
    >
        <MotionProvider>

          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          {!isDashboardRoute && <Navbar />}
          <main id="main-content" tabIndex={-1} className="relative z-[2] flex-1 pb-24 md:pb-0">
            {children}
          </main>
          {!isDashboardRoute && <Footer />}
          {!isDashboardRoute && <MagicBentoLayer />}
          {!isDashboardRoute && <RequirementChatbot />}
        </MotionProvider>
    </div>
  );
}
