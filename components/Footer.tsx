import type { Dictionary, TextKey } from '@/lib/i18n';
import { CONTACT, SOCIAL, waLink } from '@/lib/site';
import { CurrentYear } from './CurrentYear';
import { Icon } from './Icons';
import { Logo } from './Logo';
import { NewsletterForm } from './NewsletterForm';
import { Rich } from './Rich';

const SERVICE_LINKS: TextKey[] = ['s1.title', 's2.title', 's3.title', 's4.title'];
const COMPANY_LINKS: Array<[string, TextKey]> = [
  ['about-page', 'nav.about'],
  ['portfolio-page', 'nav.portfolio'],
  ['blog-page', 'nav.blog'],
  ['faq-page', 'nav.faq'],
  ['contact-page', 'nav.contact'],
];

export function Footer({ d }: { d: Dictionary }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="newsletter reveal">
          <div className="newsletter-text">
            <h2 className="newsletter-title">{d['foot.news.title']}</h2>
            <p>{d['foot.news.desc']}</p>
          </div>
          <NewsletterForm />
        </div>

        <div className="footer-grid">
          <div className="footer-brand">
            <Logo />
            <p>{d['foot.desc']}</p>
            <div className="footer-social">
              {SOCIAL.map(s => <a key={s.label} href={s.href} className="social-btn" aria-label={s.label}>{s.short}</a>)}
            </div>
          </div>
          <div className="footer-col">
            <h2 className="footer-title kicker">{d['nav.services']}</h2>
            <ul className="footer-links">
              {SERVICE_LINKS.map(k => <li key={k}><a href="#services-page">{d[k]}</a></li>)}
            </ul>
          </div>
          <div className="footer-col">
            <h2 className="footer-title kicker">{d['foot.company']}</h2>
            <ul className="footer-links">
              {COMPANY_LINKS.map(([id, k]) => <li key={id}><a href={`#${id}`}>{d[k]}</a></li>)}
            </ul>
          </div>
          <div className="footer-col">
            <h2 className="footer-title kicker">{d['nav.contact']}</h2>
            <ul className="footer-links">
              <li><a href={waLink()} target="_blank" rel="noopener"><Icon name="wa" />WhatsApp</a></li>
              <li><a href={`tel:${CONTACT.phoneHref}`}><Icon name="phone" /><span dir="ltr">{CONTACT.phoneDisplay}</span></a></li>
              <li><a href={`mailto:${CONTACT.email}`}><Icon name="mail" /><span dir="ltr">{CONTACT.email}</span></a></li>
              <li><span className="fl"><Icon name="pin" /><span>{d['con.city']}</span></span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© <CurrentYear buildYear={new Date().getFullYear()} /> <span className="red">MarketWave Solution</span> — <span>{d['foot.rights']}</span></span>
          <span><Rich text={d['foot.made']} /></span>
        </div>
      </div>
    </footer>
  );
}
