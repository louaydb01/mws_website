import type { Dictionary, Locale } from '@/lib/i18n';
import { localePath } from '@/lib/i18n';
import { CONTACT, SITE_URL } from '@/lib/site';

function toScript(data: object) {
  return { __html: JSON.stringify(data).replace(/</g, '\\u003c') };
}

// Organization + FAQPage structured data, in the page's language.
export function JsonLd({ lang, d }: { lang: Locale; d: Dictionary }) {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MarketWave Solution',
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/logo.png`,
    description: d['meta.description'],
    address: { '@type': 'PostalAddress', addressLocality: 'Casablanca', addressCountry: 'MA' },
    telephone: CONTACT.phoneHref,
    sameAs: [],
  };
  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: lang,
    url: SITE_URL + localePath(lang),
    mainEntity: ([1, 2, 3, 4, 5] as const).map(n => ({
      '@type': 'Question',
      name: d[`faq.q${n}`],
      acceptedAnswer: { '@type': 'Answer', text: d[`faq.a${n}`] },
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={toScript(organization)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={toScript(faq)} />
    </>
  );
}
