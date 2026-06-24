import Link from "next/link";
import Container from "@/components/layout/Container";
import { dbConnect } from "@/lib/mongodb";
import { Blog, IBlog } from "@/models/Blog";

const S = {
  bg: "#080a0c",
  bgCard: "#0d1117",
  line: "rgba(255,255,255,0.07)",
  accent: "#67e8f9",
  white: "#f0f4f8",
  muted: "#f0f4f8",
  faint: "#475569",
  mono: "var(--font-mono, monospace)",
  heading: "var(--font-display, var(--font-heading, sans-serif))",
};

export const metadata = {
  title: "Insights & Articles",
  description: "Read our latest articles on software engineering, business automation, and scaling systems.",
};

export const revalidate = 0; // Disable caching for the blogs list to ensure freshness

async function getBlogs() {
  await dbConnect();
  const blogs = await Blog.find({ status: "published" }).sort({ createdAt: -1 }).lean();
  // Stringify the IDs so they can be passed to client components safely if needed
  return JSON.parse(JSON.stringify(blogs)) as IBlog[];
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <div style={{ background: S.bg, minHeight: "100svh" }}>
      <section style={{ padding: "7rem 0 4rem" }}>
        <Container size="wide">
          <p style={{ fontFamily: S.mono, fontSize: "0.7rem", fontWeight: 500, color: S.accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            [ NEMNIDHI.COM / BLOGS ]
          </p>
          <h1 style={{ fontFamily: S.heading, fontWeight: 900, fontStyle: "normal", fontSize: "clamp(2.35rem, 5.8vw, 5.2rem)", textTransform: "uppercase", lineHeight: 0.95, letterSpacing: "-0.015em", marginBottom: "2rem" }}>
            <span style={{ color: S.white, display: "block" }}>INSIGHTS &</span>
            <span style={{ color: S.accent, display: "block" }}>ARTICLES.</span>
          </h1>
          <p style={{ color: S.muted, fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)", lineHeight: 1.7, maxWidth: "36rem" }}>
            Thoughts on software engineering, custom business tools, and scaling operations without compromise.
          </p>
        </Container>
      </section>

      <div style={{ width: "100%", height: "1px", background: S.line }} />

      <section style={{ padding: "5rem 0" }}>
        <Container size="wide">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }}>
            {blogs.length === 0 && (
              <p style={{ color: S.muted, fontSize: "1rem", fontFamily: S.mono }}>No articles found.</p>
            )}
            {blogs.map((blog) => (
              <Link key={blog.slug} href={`/blogs/${blog.slug}`} style={{ textDecoration: "none" }}>
                <div className="blog-card" style={{ padding: "2.5rem", background: S.bgCard, border: `1px solid ${S.line}`, transition: "border-color 0.2s" }}>
                  <p style={{ fontFamily: S.mono, fontSize: "0.7rem", fontWeight: 500, color: S.accent, marginBottom: "1rem" }}>{blog.date}</p>
                  <h2 style={{ fontFamily: S.heading, fontWeight: 900, fontStyle: "normal", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: S.white, lineHeight: 1.1, marginBottom: "1rem" }}>
                    {blog.title}
                  </h2>
                  <p style={{ color: S.muted, fontSize: "1rem", lineHeight: 1.7, maxWidth: "45rem" }}>
                    {blog.excerpt}
                  </p>
                  <p style={{ fontFamily: S.mono, fontSize: "0.75rem", fontWeight: 700, color: S.accent, marginTop: "2rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Read Article →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <style>{`
        .blog-card:hover {
          border-color: #67e8f9 !important;
        }
      `}</style>
    </div>
  );
}
