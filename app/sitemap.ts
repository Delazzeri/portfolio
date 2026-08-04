import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getProjectsByType } from '@/lib/data/projects';
import { SITE_URL } from '@/lib/site';

const SECTIONS = ['design', 'code', 'all'] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjectsByType(null);
  const published = projects.filter((project) => project.published);

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const section of SECTIONS) {
      entries.push({ url: `${SITE_URL}/${locale}/${section}` });
    }
    for (const project of published) {
      const sections: (typeof SECTIONS)[number][] =
        project.type === 'design' ? ['design', 'all'] : ['code', 'all'];
      for (const section of sections) {
        entries.push({ url: `${SITE_URL}/${locale}/${section}/${project.slug}` });
      }
    }
  }

  return entries;
}
