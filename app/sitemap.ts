import type { MetadataRoute } from "next";

const baseUrl = "https://nemnidhi.com";

const routes = ["", "/about", "/services", "/solutions", "/projects", "/contact", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
