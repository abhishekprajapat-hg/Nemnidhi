import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/layout/Container";
import HeroBlurTitle from "@/components/motion/HeroBlurTitle";
import HeroImageBackdrop from "@/components/services/HeroImageBackdrop";
import { dbConnect } from "@/lib/mongodb";
import { Blog, IBlog } from "@/models/Blog";

const S = {
  bg: "var(--color-bg)",
  bgCard: "var(--color-bg-elevated)",
  line: "var(--color-line)",
  accent: "var(--color-accent)",
  white: "var(--color-heading)",
  muted: "var(--color-text-muted)",
  faint: "var(--color-text-faint)",
  mono: "var(--font-mono, monospace)",
  heading: "var(--font-display, var(--font-heading, sans-serif))",
};

const blogHeroImages = [
  "/images/hero/blog-detail-editorial.jpg",
  "/images/hero/blog-detail-growth.jpg",
  "/images/hero/blog-detail-security.jpg",
  "/images/hero/blog-detail-strategy.jpg",
  "/images/hero/blog-detail-analytics.jpg",
] as const;

function getBlogHeroImage(slug: string) {
  const hash = [...slug].reduce((value, char) => value + char.charCodeAt(0), 0);
  return blogHeroImages[hash % blogHeroImages.length];
}

export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    await dbConnect();
    const blog = await Blog.findOne({ slug, status: "published" }).lean() as IBlog | null;

    if (!blog) {
      return { title: "Blog Not Found" };
    }

    return {
      title: blog.metaTitle || `${blog.title} | Nemnidhi`,
      description: blog.metaDescription || blog.excerpt,
    };
  } catch (error) {
    console.error("Failed to fetch blog metadata:", error);
    return { title: "Nemnidhi Blogs" };
  }
}

export default async function DynamicBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let blog: IBlog | null = null;
  
  try {
    await dbConnect();
    blog = await Blog.findOne({ slug, status: "published" }).lean() as IBlog | null;
  } catch (error) {
    console.error("Failed to fetch blog:", error);
  }

  if (!blog) {
    notFound();
  }

  const heroImage = getBlogHeroImage(slug);

  return (
    <div style={{ background: S.bg, minHeight: "100svh", paddingBottom: "5rem" }}>
      {/* ─── Hero / Header ─── */}
      <section style={{ position: "relative", overflow: "hidden", isolation: "isolate", paddingTop: "7rem", paddingBottom: "3rem", borderBottom: `1px solid ${S.line}`, background: "#05080b" }}>
        <HeroImageBackdrop src={heroImage} focus="center" />
        <Container size="default" className="hero-content-layer" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Link
            href="/blogs"
            style={{
              display: "inline-block",
              fontFamily: S.mono,
              fontSize: "0.7rem",
              fontWeight: 600,
              color: "#67e8f9",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              marginBottom: "2rem",
            }}
          >
            ← Back to Blogs
          </Link>

          <HeroBlurTitle
            lines={[{ text: blog.title, color: "#f0f4f8" }]}
            style={{
              fontFamily: S.heading,
              fontWeight: 900,
              fontSize: "clamp(2.5rem, 4.5vw, 4rem)",
              textTransform: "uppercase",
              lineHeight: 1.05,
              color: "#f0f4f8",
              marginBottom: "1.5rem",
              fontStyle: "normal",
            }}
            lineStyle={{ display: "block" }}
          />
          <div style={{ display: "flex", gap: "1.5rem", fontFamily: S.mono, fontSize: "0.7rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
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
