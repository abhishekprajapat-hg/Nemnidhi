"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Sun, Moon } from "lucide-react";
import { ThemeProvider, useTheme } from "@/components/layout/ThemeProvider";

function DashboardInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggle } = useTheme();

  const isDark = theme === "dark";

  const bg = isDark ? "#080a0c" : "#f0f4f8";
  const sidebarBg = isDark ? "#0c0f14" : "#e8e8e8";
  const borderColor = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.1)";
  const textColor = isDark ? "#f0f4f8" : "#0A0907";
  const mutedColor = isDark ? "#94a3b8" : "#555";
  const accentColor = isDark ? "#67e8f9" : "#076D87";

  if (pathname === "/dashboard/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/dashboard/login");
    router.refresh();
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: bg, color: textColor, transition: "background 0.3s ease, color 0.3s ease" }}>
      <aside style={{ width: "250px", borderRight: `1px solid ${borderColor}`, padding: "2rem 1.5rem", display: "flex", flexDirection: "column", background: sidebarBg, transition: "background 0.3s ease" }}>
        <h2 style={{ fontFamily: "var(--font-display, var(--font-heading, sans-serif))", fontSize: "1.2rem", fontWeight: 800, color: accentColor, marginBottom: "2rem", textTransform: "uppercase" }}>
          Nemnidhi Admin
        </h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: "1rem", flex: 1 }}>
          <Link href="/dashboard" style={{ color: pathname === "/dashboard" ? accentColor : mutedColor, textDecoration: "none", fontSize: "0.9rem", fontFamily: "var(--font-mono, monospace)" }}>
            Blogs
          </Link>
          <Link href="/dashboard/blogs/new" style={{ color: pathname === "/dashboard/blogs/new" ? accentColor : mutedColor, textDecoration: "none", fontSize: "0.9rem", fontFamily: "var(--font-mono, monospace)" }}>
            New Blog
          </Link>

          <div style={{ margin: "1rem 0", height: "1px", background: borderColor }} />

          <Link href="/" target="_blank" style={{ color: mutedColor, textDecoration: "none", fontSize: "0.9rem", fontFamily: "var(--font-mono, monospace)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Visit Website ↗
          </Link>
        </nav>

        {/* Theme Toggle */}
        <button
          onClick={toggle}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            background: "transparent",
            border: `1px solid ${borderColor}`,
            color: mutedColor,
            padding: "0.75rem",
            cursor: "pointer",
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "0.8rem",
            borderRadius: "4px",
            marginBottom: "0.75rem",
            width: "100%",
            transition: "border-color 0.2s, color 0.2s",
          }}
        >
          {isDark ? <Sun style={{ width: "1rem", height: "1rem" }} /> : <Moon style={{ width: "1rem", height: "1rem" }} />}
          {isDark ? "Light Mode" : "Dark Mode"}
        </button>

        <button
          onClick={handleLogout}
          style={{ background: "transparent", border: `1px solid ${borderColor}`, color: textColor, padding: "0.75rem", cursor: "pointer", fontFamily: "var(--font-mono, monospace)", fontSize: "0.8rem", textAlign: "left", borderRadius: "4px" }}
        >
          Log Out
        </button>
      </aside>

      <main style={{ flex: 1, padding: "3rem", overflowY: "auto" }}>
        {children}
      </main>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <DashboardInner>{children}</DashboardInner>
    </ThemeProvider>
  );
}
