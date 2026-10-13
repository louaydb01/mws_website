import { getDictionary, type Locale } from '@/lib/i18n';
import { About } from './About';
import { Blog } from './Blog';
import { ClientEffects } from './ClientEffects';
import { Contact } from './Contact';
import { Expertises } from './Expertises';
import { Faq } from './Faq';
import { FinalCta } from './FinalCta';
import { Footer } from './Footer';
import { Header } from './Header';
import { Hero } from './Hero';
import { I18nProvider } from './I18nProvider';
import { IconSprite } from './Icons';
import { JsonLd } from './JsonLd';
import { Portfolio } from './Portfolio';
import { Process } from './Process';
import { ServicesDetail } from './ServicesDetail';
import { Testimonials } from './Testimonials';
import { Ticker } from './Ticker';
import { WhatsAppButton } from './WhatsAppButton';
import { Why } from './Why';

// One-page site: each "page" is a section reached by its anchor (#services-page, #contact-page…),
// exactly like the original navigation.
export function HomePage({ lang }: { lang: Locale }) {
  const d = getDictionary(lang);
  return (
    <I18nProvider lang={lang} dict={d}>
      <IconSprite />
      <a className="skip-link" href="#main">{d['a11y.skip']}</a>
      <Header />
      <WhatsAppButton />

      <main id="main">
        <div id="home-page" className="page-section">
          <Hero d={d} />
          <Ticker d={d} />
          <Expertises d={d} />
          {/* One shared background so the arcs flow from "Why" into "Process" */}
          <div className="wp-band">
            <Why d={d} />
            <Process d={d} />
          </div>
          <Testimonials d={d} />
        </div>
        <div id="services-page" className="page-section"><ServicesDetail d={d} /></div>
        <div id="about-page" className="page-section"><About d={d} /></div>
        <div id="portfolio-page" className="page-section"><Portfolio /></div>
        <div id="blog-page" className="page-section"><Blog d={d} /></div>
        <div id="faq-page" className="page-section"><Faq /></div>
        <FinalCta d={d} />
        <div id="contact-page" className="page-section"><Contact /></div>
      </main>

      <Footer d={d} />
      <ClientEffects />
      <JsonLd lang={lang} d={d} />
    </I18nProvider>
  );
}
