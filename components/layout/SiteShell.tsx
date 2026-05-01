"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import RequirementChatbot from "@/components/chat/RequirementChatbot";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <div className="scene-root relative flex min-h-screen flex-col overflow-x-clip">
      {!isAdminRoute && <Navbar />}
      <main className={`relative z-[2] flex-1 ${isAdminRoute ? "pb-0" : "pb-24 md:pb-0"}`}>{children}</main>
      {!isAdminRoute && (
        <>
          <Footer />
          <RequirementChatbot />
        </>
      )}
    </div>
  );
}
