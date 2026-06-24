"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import RichEditor from "@/components/dashboard/RichEditor";

export default function EditBlogPage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "", slug: "", date: "", excerpt: "", content: "", metaTitle: "", metaDescription: "", status: "published"
  });

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

  const inputStyle = { width: "100%", padding: "0.75rem", background: "#0d1117", border: "1px solid rgba(255,255,255,0.07)", color: "#f0f4f8", marginBottom: "1rem", outline: "none", fontFamily: "inherit" };
  const labelStyle = { display: "block", marginBottom: "0.5rem", fontFamily: "var(--font-mono, monospace)", fontSize: "0.8rem", color: "#94a3b8" };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-display, var(--font-heading, sans-serif))", fontSize: "2rem", color: "#f0f4f8", marginBottom: "2rem" }}>Edit Blog</h1>
      
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

        <button type="submit" style={{ background: "#67e8f9", color: "#080a0c", padding: "0.75rem 2rem", border: "none", borderRadius: "4px", cursor: "pointer", fontFamily: "var(--font-mono, monospace)", fontWeight: 700 }}>Save Changes</button>
      </form>
    </div>
  );
}
