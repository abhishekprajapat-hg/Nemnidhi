import type { MetadataRoute } from "next";
import { dbConnect } from "@/lib/mongodb";
import { Blog, IBlog } from "@/models/Blog";

const baseUrl = "https://nemnidhi.com";

const routes = ["", "/about", "/services", "/solutions", "/projects", "/blogs", "/contact", "/privacy", "/terms"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
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

  return [...staticEntries, ...blogEntries];
}
