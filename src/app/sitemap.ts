import type { MetadataRoute } from "next";
import { projects, site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;
  const pages = ["", "/about", "/projects", "/blog", "/guestbook"];
  return [
    ...pages.map((path) => ({ url: `${base}${path}` })),
    ...projects.map((p) => ({ url: `${base}/projects/${p.slug}` })),
  ];
}
