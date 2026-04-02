import type { MetadataRoute } from 'next';
import { getAllCanticles } from '@/lib/canticle-utils';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://thedivinesummary.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL,              lastModified: now, priority: 1.0 },
    { url: `${BASE_URL}/inferno`,    lastModified: now, priority: 0.9 },
    { url: `${BASE_URL}/purgatorio`, lastModified: now, priority: 0.9 },
    { url: `${BASE_URL}/paradiso`,   lastModified: now, priority: 0.9 },
  ];

  const cantoRoutes: MetadataRoute.Sitemap = getAllCanticles().flatMap(canticle =>
    canticle.sections.flatMap(section =>
      section.cantos.map(canto => ({
        url:          `${BASE_URL}/${canticle.id}/canto/${canto.slug}`,
        lastModified: now,
        priority:     0.7,
      }))
    )
  );

  return [...staticRoutes, ...cantoRoutes];
}
