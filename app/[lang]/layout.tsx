import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { RootDocument } from '@/components/RootDocument';
import { DEFAULT_LOCALE, PREFIXED_LOCALES, isLocale, type Locale } from '@/lib/i18n';
import { buildMetadata, siteViewport } from '@/lib/metadata';

type Params = Promise<{ lang: string }>;

// "/ar/", "/en/", "/es/" — generated at build time; any other value is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return PREFIXED_LOCALES.map(lang => ({ lang }));
}

async function resolveLocale(params: Params): Promise<Locale> {
  const { lang } = await params;
  if (!isLocale(lang) || lang === DEFAULT_LOCALE) notFound();
  return lang;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  return buildMetadata(await resolveLocale(params));
}

export const viewport: Viewport = siteViewport;

export default async function LocaleRootLayout({ children, params }: { children: ReactNode; params: Params }) {
  return <RootDocument lang={await resolveLocale(params)}>{children}</RootDocument>;
}
