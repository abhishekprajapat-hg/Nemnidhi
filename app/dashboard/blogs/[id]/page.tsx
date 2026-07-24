"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import RichEditor from "@/components/dashboard/RichEditor";
import { useTheme } from "@/components/layout/ThemeProvider";

export default function EditBlogPage() {
  const router = useRouter();
  const { id } = useParams();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "", slug: "", date: "", excerpt: "", content: "", metaTitle: "", metaDescription: "", status: "published"
  });

  const colors = {
    heading: isDark ? "#f0f4f8" : "#0A0907",
    label: isDark ? "#94a3b8" : "#444",
    inputBg: isDark ? "#0d1117" : "#ffffff",
    inputBorder: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.18)",
    inputText: isDark ? "#f0f4f8" : "#0A0907",
    accent: isDark ? "#67e8f9" : "#076D87",
    accentText: isDark ? "#080a0c" : "#ffffff",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    background: colors.inputBg,
    border: `1px solid ${colors.inputBorder}`,
    color: colors.inputText,
    marginBottom: "1rem",
    outline: "none",
    fontFamily: "inherit",
    borderRadius: "4px",
    transition: "background 0.3s, color 0.3s, border-color 0.3s",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "0.5rem",
    fontFamily: "var(--font-mono, monospace)",
    fontSize: "0.8rem",
    color: colors.label,
    fontWeight: 600,
  };

  useEffect(() => {
    fetch(`/api/dashboard/blogs/${id}`)
      .then(res => res.json())
      .then(data => {
        setForm(data);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/dashboard/blogs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      router.push("/dashboard");
    } else {
      alert("Error saving blog");
    }
  };

  if (loading) return <div style={{ color: colors.heading, fontFamily: "var(--font-mono, monospace)" }}>Loading...</div>;

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-display, var(--font-heading, sans-serif))", fontSize: "2rem", color: colors.heading, marginBottom: "2rem" }}>Edit Blog</h1>

      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Title</label>
        <input style={inputStyle} value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />

        <label style={labelStyle}>Slug</label>
        <input style={inputStyle} value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} required />

        <label style={labelStyle}>Date</label>
        <input style={inputStyle} value={form.date} onChange={e => setForm({...form, date: e.target.value})} required />

        <label style={labelStyle}>Excerpt</label>
        <textarea style={{...inputStyle, minHeight: "80px"}} value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} required />

        <label style={labelStyle}>Meta Title</label>
        <input style={inputStyle} value={form.metaTitle} onChange={e => setForm({...form, metaTitle: e.target.value})} />

        <label style={labelStyle}>Meta Description</label>
        <textarea style={{...inputStyle, minHeight: "60px"}} value={form.metaDescription} onChange={e => setForm({...form, metaDescription: e.target.value})} />

        <label style={labelStyle}>Content</label>
        <div style={{ marginBottom: "1.5rem" }}>
          <RichEditor value={form.content} onChange={(value) => setForm({...form, content: value})} />
        </div>

        <label style={labelStyle}>Status</label>
        <select style={inputStyle} value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>

        <button type="submit" style={{ background: colors.accent, color: colors.accentText, padding: "0.75rem 2rem", border: "none", borderRadius: "4px", cursor: "pointer", fontFamily: "var(--font-mono, monospace)", fontWeight: 700 }}>
          Save Changes
        </button>
      </form>
    </div>
  );
}
