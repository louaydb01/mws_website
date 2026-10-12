import type { Metadata, Viewport } from 'next';
import { LOCALES, LOCALE_INFO, getDictionary, localePath, type Locale } from './i18n';
import { SITE_URL } from './site';

export const siteViewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0a0a0a',
  colorScheme: 'dark',
};

const hreflang = {
  ...Object.fromEntries(LOCALES.map(l => [l, localePath(l)])),
  'x-default': '/',
};

export function buildMetadata(locale: Locale): Metadata {
  const d = getDictionary(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: d['meta.title'],
    description: d['meta.description'],
    robots: { index: true, follow: true },
    alternates: { canonical: localePath(locale), languages: hreflang },
    openGraph: {
      type: 'website',
      siteName: 'MarketWave Solution',
      title: d['meta.title'],
      description: d['meta.description'],
      url: localePath(locale),
      locale: LOCALE_INFO[locale].og,
      alternateLocale: LOCALES.filter(l => l !== locale).map(l => LOCALE_INFO[l].og),
    },
    twitter: {
      card: 'summary_large_image',
      title: d['meta.title'],
      description: d['meta.description'],
    },
  };
}
