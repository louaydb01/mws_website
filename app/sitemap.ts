import type { MetadataRoute } from 'next';
import { DEFAULT_LOCALE, LOCALES, localePath } from '@/lib/i18n';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(LOCALES.map(l => [l, SITE_URL + localePath(l)]));
  return LOCALES.map(l => ({
    url: SITE_URL + localePath(l),
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: l === DEFAULT_LOCALE ? 1 : 0.8,
    alternates: { languages },
  }));
}
