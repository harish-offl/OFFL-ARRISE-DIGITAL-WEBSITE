import type { MetadataRoute } from "next";
import { insights } from "@/data/insights";
import { clientProjects } from "@/data/portfolio";
import { services } from "@/data/services";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = site.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/team`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/insights`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${base}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${base}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const projectRoutes: MetadataRoute.Sitemap = clientProjects.map((project) => ({
    url: `${base}/work/${project.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  const insightRoutes: MetadataRoute.Sitemap = insights.map((insight) => ({
    url: `${base}/insights/${insight.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...insightRoutes];
}
