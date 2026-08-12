import type { MetadataRoute } from "next";
import { dbConnect } from "@/lib/mongodb";
import { Blog, IBlog } from "@/models/Blog";
import { services } from "@/lib/data/services";
import { projects } from "@/lib/data/projects";

const baseUrl = "https://www.nemnidhi.com";

const routes = ["", "/about", "/services", "/solutions", "/projects", "/blogs", "/contact", "/privacy", "/terms"];
const highPriorityRoutes = ["/locations/indore"];

// Without this, Next.js prerenders sitemap.xml once at build time — new
// blog posts published via the dashboard (no code deploy) would never
// show up in the live sitemap until the next deployment.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const highPriorityEntries: MetadataRoute.Sitemap = highPriorityRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const serviceEntries: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    await dbConnect();
    const blogs = (await Blog.find({ status: "published" }).lean()) as unknown as IBlog[];
    blogEntries = blogs.map((blog) => ({
      url: `${baseUrl}/blogs/${blog.slug}`,
      lastModified: blog.updatedAt ?? now,
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Failed to fetch blogs for sitemap:", error);
  }

  return [...staticEntries, ...highPriorityEntries, ...serviceEntries, ...projectEntries, ...blogEntries];
}
