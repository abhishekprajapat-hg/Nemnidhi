import Link from "next/link";
import Container from "@/components/layout/Container";
import HeroBlurTitle from "@/components/motion/HeroBlurTitle";
import { dbConnect } from "@/lib/mongodb";
import { Blog, IBlog } from "@/models/Blog";

import { S } from "@/lib/styleTokens";

export const metadata = {
  title: "Insights & Articles",
  description: "Read our latest articles on software engineering, business automation, and scaling systems.",
};

export const revalidate = 0; // Disable caching for the blogs list to ensure freshness

async function getBlogs() {
  try {
    await dbConnect();
    const blogs = await Blog.find({ status: "published" }).sort({ createdAt: -1 }).lean();
    // Stringify the IDs so they can be passed to client components safely if needed
    return JSON.parse(JSON.stringify(blogs)) as IBlog[];
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return [];
  }
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <div style={{ background: S.bg, minHeight: "100svh" }}>
      <section style={{ position: "relative", overflow: "hidden", padding: "7rem 0 4rem", background: S.bg, borderBottom: `1px solid ${S.line}` }}>
        <Container size="wide">
          <p style={{ fontFamily: S.mono, fontSize: "0.7rem", fontWeight: 500, color: S.accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            [ NEMNIDHI.COM / BLOGS ]
          </p>
          <HeroBlurTitle
            lines={[{ text: "INSIGHTS &", color: S.white }, { text: "ARTICLES.", color: S.accent }]}
            style={{ fontFamily: S.heading, fontWeight: 900, fontStyle: "normal", fontSize: "clamp(2.35rem, 5.8vw, 5.2rem)", textTransform: "uppercase", lineHeight: 0.95, letterSpacing: "-0.015em", marginBottom: "2rem" }}
            lineStyle={{ display: "block" }}
          />
          <p style={{ color: S.muted, fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)", lineHeight: 1.7, maxWidth: "36rem" }}>
            Notes on software engineering, custom business tools, and running production systems.
          </p>
        </Container>
      </section>

      <div style={{ width: "100%", height: "1px", background: S.line }} />

      <section className="section-padding" style={{ borderTop: `1px solid ${S.line}` }}>
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
