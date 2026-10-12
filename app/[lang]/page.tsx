import { HomePage } from '@/components/HomePage';
import type { Locale } from '@/lib/i18n';

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  // The layout has already rejected unknown languages.
  return <HomePage lang={lang as Locale} />;
}
