"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IBlog } from "@/models/Blog";

export default function DashboardBlogs() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard/blogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      });
  }, []);

  const deleteBlog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    await fetch(`/api/dashboard/blogs/${id}`, { method: "DELETE" });
    setBlogs(blogs.filter((b: any) => b._id !== id));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontFamily: "var(--font-display, var(--font-heading, sans-serif))", fontSize: "2rem", color: "#f0f4f8" }}>Manage Blogs</h1>
        <Link href="/dashboard/blogs/new" style={{ background: "#67e8f9", color: "#080a0c", padding: "0.5rem 1rem", borderRadius: "4px", textDecoration: "none", fontFamily: "var(--font-mono, monospace)", fontSize: "0.8rem", fontWeight: 700 }}>
          + Create New Blog
        </Link>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {blogs.map((blog: any) => (
          <div key={blog._id} style={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.07)", padding: "1.5rem", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h3 style={{ fontFamily: "var(--font-heading, sans-serif)", fontSize: "1.2rem", color: "#f0f4f8", marginBottom: "0.5rem" }}>{blog.title}</h3>
              <p style={{ color: "#94a3b8", fontSize: "0.85rem", fontFamily: "var(--font-mono, monospace)" }}>{blog.slug} • {blog.date} • {blog.status}</p>
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <Link href={`/dashboard/blogs/${blog._id}`} style={{ color: "#67e8f9", textDecoration: "none", fontSize: "0.9rem", fontFamily: "var(--font-mono, monospace)" }}>Edit</Link>
              <button onClick={() => deleteBlog(blog._id)} style={{ color: "#ef4444", background: "none", border: "none", cursor: "pointer", fontSize: "0.9rem", fontFamily: "var(--font-mono, monospace)" }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
