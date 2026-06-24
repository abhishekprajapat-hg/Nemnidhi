"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/dashboard/login") {
    return <div style={{ background: "#080a0c", minHeight: "100vh" }}>{children}</div>;
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/dashboard/login");
    router.refresh();
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#080a0c", color: "#f0f4f8" }}>
      <aside style={{ width: "250px", borderRight: "1px solid rgba(255,255,255,0.07)", padding: "2rem 1.5rem", display: "flex", flexDirection: "column" }}>
        <h2 style={{ fontFamily: "var(--font-display, var(--font-heading, sans-serif))", fontSize: "1.2rem", fontWeight: 800, color: "#67e8f9", marginBottom: "2rem", textTransform: "uppercase" }}>Nemnidhi Admin</h2>
        
        <nav style={{ display: "flex", flexDirection: "column", gap: "1rem", flex: 1 }}>
          <Link href="/dashboard" style={{ color: pathname === "/dashboard" ? "#67e8f9" : "#94a3b8", textDecoration: "none", fontSize: "0.9rem", fontFamily: "var(--font-mono, monospace)" }}>
            Blogs
          </Link>
          <Link href="/dashboard/blogs/new" style={{ color: pathname === "/dashboard/blogs/new" ? "#67e8f9" : "#94a3b8", textDecoration: "none", fontSize: "0.9rem", fontFamily: "var(--font-mono, monospace)" }}>
            New Blog
          </Link>
          
          <div style={{ margin: "1rem 0", height: "1px", background: "rgba(255,255,255,0.07)" }} />
          
          <Link href="/" target="_blank" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem", fontFamily: "var(--font-mono, monospace)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Visit Website ↗
          </Link>
        </nav>

        <button onClick={handleLogout} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.07)", color: "#f0f4f8", padding: "0.75rem", cursor: "pointer", fontFamily: "var(--font-mono, monospace)", fontSize: "0.8rem", textAlign: "left", borderRadius: "4px" }}>
          Log Out
        </button>
      </aside>

      <main style={{ flex: 1, padding: "3rem", overflowY: "auto" }}>
        {children}
      </main>
    </div>
  );
}
