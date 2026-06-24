"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import MotionProvider from "@/components/motion/MotionProvider";

const RequirementChatbot = dynamic(() => import("@/components/chat/RequirementChatbot"), {
  ssr: false,
  loading: () => null,
});

const ScrollReactiveModel = dynamic(() => import("@/components/home/ScrollReactiveModel"), {
  ssr: false,
  loading: () => null,
});


export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="scene-root relative flex min-h-screen flex-col overflow-x-clip"
      style={{ background: "#080a0c" }}
    >
        <MotionProvider>

          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          {(!shouldReduceMotion && pathname === "/") && (
            <ScrollReactiveModel className="site-scroll-model" mode="site" />
          )}
          {!isDashboardRoute && <Navbar />}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={pathname} className="contents">
              {!shouldReduceMotion && (
                <motion.div
                  className="fixed inset-0 z-[90] pointer-events-none"
                  style={{ background: "#080a0c" }}
                  initial={{ clipPath: "inset(0 0 0% 0)" }}
                  animate={{ clipPath: "inset(0 0 100% 0)" }}
                  exit={{ clipPath: "inset(100% 0 0 0)" }}
                  transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                  aria-hidden
                />
              )}
              <motion.main
                id="main-content"
                tabIndex={-1}
                className="relative z-[2] flex-1 pb-24 md:pb-0"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
              >
                {children}
              </motion.main>
            </motion.div>
          </AnimatePresence>
          {!isDashboardRoute && <Footer />}
          {!isDashboardRoute && <RequirementChatbot />}
          <style jsx global>{`
            .site-scroll-model {
              position: fixed;
              inset: 0;
              z-index: 3;
              pointer-events: none;
              opacity: 0.58;
              mix-blend-mode: screen;
              filter: saturate(1.35) contrast(1.08);
              -webkit-mask-image: radial-gradient(circle at 50% 38%, #000 0 46%, rgba(0, 0, 0, 0.72) 62%, transparent 86%);
              mask-image: radial-gradient(circle at 50% 38%, #000 0 46%, rgba(0, 0, 0, 0.72) 62%, transparent 86%);
            }

            @media (max-width: 768px) {
              .site-scroll-model {
                opacity: 0.36;
                -webkit-mask-image: radial-gradient(circle at 54% 38%, #000 0 44%, rgba(0, 0, 0, 0.56) 62%, transparent 86%);
                mask-image: radial-gradient(circle at 54% 38%, #000 0 44%, rgba(0, 0, 0, 0.56) 62%, transparent 86%);
              }
            }
          `}</style>
        </MotionProvider>
    </div>
  );
}
