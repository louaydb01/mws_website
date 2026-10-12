import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { RootDocument } from '@/components/RootDocument';
import { buildMetadata, siteViewport } from '@/lib/metadata';

// French is the default language and keeps the historical URL "/".
export const metadata: Metadata = buildMetadata('fr');
export const viewport: Viewport = siteViewport;

export default function FrenchRootLayout({ children }: { children: ReactNode }) {
  return <RootDocument lang="fr">{children}</RootDocument>;
}
