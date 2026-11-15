import type { MetadataRoute } from "next";
import { routes, type RouteKey } from "@/content/routes";
import { locales, site } from "@/content/site";

const priority: Record<RouteKey, number> = {
  home: 1,
  rooms: 0.9,
  book: 0.9,
  venice: 0.8,
  privacy: 0.2,
  cookies: 0.2,
};

export default function sitemap(): MetadataRoute.Sitemap {
  return (Object.keys(routes) as RouteKey[]).flatMap((key) =>
    locales.map((lang) => ({
      url: site.url + routes[key][lang],
      changeFrequency: "monthly" as const,
      priority: priority[key],
      alternates: {
        languages: {
          it: site.url + routes[key].it,
          en: site.url + routes[key].en,
        },
      },
    })),
  );
}
