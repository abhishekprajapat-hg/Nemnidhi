import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/layout/Container";
import HeroBlurTitle from "@/components/motion/HeroBlurTitle";
import HeroLightfall from "@/components/services/HeroLightfall";
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

export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await dbConnect();
  const blog = await Blog.findOne({ slug, status: "published" }).lean() as IBlog | null;

  if (!blog) {
    return { title: "Blog Not Found" };
  }

  return {
    title: blog.metaTitle || `${blog.title} | Nemnidhi`,
    description: blog.metaDescription || blog.excerpt,
  };
}

export default async function DynamicBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await dbConnect();
  const blog = await Blog.findOne({ slug, status: "published" }).lean() as IBlog | null;

  if (!blog) {
    notFound();
  }

  return (
    <div style={{ background: S.bg, minHeight: "100svh", paddingBottom: "5rem" }}>
      {/* ─── Hero / Header ─── */}
      <section style={{ position: "relative", overflow: "hidden", isolation: "isolate", paddingTop: "7rem", paddingBottom: "3rem", borderBottom: `1px solid ${S.line}` }}>
        <HeroLightfall />
        <Container size="default" className="hero-content-layer" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Link
            href="/blogs"
            style={{
              display: "inline-block",
              fontFamily: S.mono,
              fontSize: "0.7rem",
              fontWeight: 600,
              color: S.accent,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              marginBottom: "2rem",
            }}
          >
            ← Back to Blogs
          </Link>

          <HeroBlurTitle
            lines={[{ text: blog.title, color: S.white }]}
            style={{
              fontFamily: S.heading,
              fontWeight: 900,
              fontSize: "clamp(2.5rem, 4.5vw, 4rem)",
              textTransform: "uppercase",
              lineHeight: 1.05,
              color: S.white,
              marginBottom: "1.5rem",
              fontStyle: "normal",
            }}
            lineStyle={{ display: "block" }}
          />
          <div style={{ display: "flex", gap: "1.5rem", fontFamily: S.mono, fontSize: "0.7rem", color: S.faint, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            <span>{blog.date}</span>
          </div>
        </Container>
      </section>

      {/* ─── Content ─── */}
      <section style={{ paddingTop: "4rem" }}>
        <Container size="default" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div
            className="blog-content"
            style={{
              color: S.muted,
              fontSize: "1.05rem",
              lineHeight: 1.8,
              fontFamily: "var(--font-body, sans-serif)",
            }}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </Container>
      </section>
      
      <style>{`
        .blog-content {
          white-space: pre-wrap;
          overflow-wrap: break-word;
          word-wrap: break-word;
        }
        .blog-content * {
          max-width: 100%;
        }
        .blog-content p, .blog-content span, .blog-content div, .blog-content h1, .blog-content h2, .blog-content h3, .blog-content h4, .blog-content h5, .blog-content h6, .blog-content li {
          white-space: pre-wrap;
        }
        .blog-content img {
          width: 100%;
          aspect-ratio: 16/9;
          object-fit: cover;
          border-radius: 8px;
          margin: 3rem 0;
          border: 1px solid rgba(255,255,255,0.07);
        }
      `}</style>
    </div>
  );
}
