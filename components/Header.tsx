'use client';

import { useCallback, useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { useI18n } from './I18nProvider';
import { ArrowIcon, Icon } from './Icons';
import { Logo } from './Logo';
import { LANG_STORAGE_KEY, LOCALES, LOCALE_INFO, localePath, type Locale, type TextKey } from '@/lib/i18n';
import { vars } from '@/lib/css';
import { waLink } from '@/lib/site';

const DESKTOP_NAV: Array<[string, TextKey]> = [
  ['services-page', 'nav.services'],
  ['about-page', 'nav.about'],
  ['portfolio-page', 'nav.portfolio'],
  ['blog-page', 'nav.blog'],
  ['faq-page', 'nav.faq'],
];
const MOBILE_NAV: Array<[string, TextKey]> = [['home-page', 'nav.home'], ...DESKTOP_NAV, ['contact-page', 'nav.contact']];

// Each language is its own statically generated page; keep the current section when switching.
function LangLink({ to, className, children }: { to: Locale; className: string; children: ReactNode }) {
  const { lang } = useI18n();
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    try { localStorage.setItem(LANG_STORAGE_KEY, to); } catch {}
    if (window.location.hash) {
      e.preventDefault();
      window.location.href = localePath(to) + window.location.hash;
    }
  };
  return (
    <a href={localePath(to)} hrefLang={to} lang={to} className={className}
      aria-current={to === lang ? 'true' : undefined} onClick={onClick}>
      {children}
    </a>
  );
}

export function Header() {
  const { lang, d } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [active, setActive] = useState('');
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const langReturnRef = useRef<HTMLElement | null>(null);

  const openLang = () => {
    langReturnRef.current = document.activeElement as HTMLElement | null;
    setLangOpen(true);
  };
  const closeLang = useCallback(() => {
    setLangOpen(false);
    langReturnRef.current?.focus();
    langReturnRef.current = null;
  }, []);

  // Solid bar + hairline once the page scrolls; close the mobile menu on desktop widths
  useEffect(() => {
    let ticking = false;
    const update = () => { setScrolled(window.scrollY > 8); ticking = false; };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    const onResize = () => { if (window.innerWidth >= 1024) setNavOpen(false); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('nav-open', navOpen);
    document.body.style.overflow = navOpen ? 'hidden' : '';
  }, [navOpen]);

  // Scroll spy: highlight the section currently in the middle of the viewport
  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-40% 0px -55% 0px' });
    document.querySelectorAll('.page-section').forEach(s => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Escape closes overlays; Tab stays inside the language dialog while it is open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (langOpen) closeLang();
        else if (navOpen) { setNavOpen(false); menuBtnRef.current?.focus(); }
      }
      if (e.key === 'Tab' && langOpen && modalRef.current) {
        const items = modalRef.current.querySelectorAll<HTMLElement>('a, button');
        const first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [langOpen, navOpen, closeLang]);

  useEffect(() => {
    if (!langOpen || !modalRef.current) return;
    const current = modalRef.current.querySelector<HTMLElement>('[aria-current="true"]') ?? modalRef.current.querySelector<HTMLElement>('a');
    current?.focus();
  }, [langOpen]);

  const current = (id: string) => (active === id ? 'true' : undefined);

  return (
    <>
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`} id="navbar">
        <div className="container nav-inner">
          <Logo />
          <nav className="nav-links" aria-label="Navigation">
            {DESKTOP_NAV.map(([id, key]) => (
              <a key={id} href={`#${id}`} aria-current={current(id)}>{d[key]}</a>
            ))}
          </nav>
          <div className="nav-actions">
            <div className="lang-switcher" role="group" aria-label={d['a11y.lang']}>
              {LOCALES.map(l => <LangLink key={l} to={l} className="lang-btn">{LOCALE_INFO[l].code}</LangLink>)}
            </div>
            <button type="button" className="lang-trigger" aria-haspopup="dialog" aria-controls="langModal"
              aria-label={d['lang.choose']} onClick={openLang}>
              <Icon name="globe" /><span>{LOCALE_INFO[lang].code}</span>
            </button>
            <a href="#contact-page" className="btn btn-primary btn-sm nav-cta"><span>{d['nav.cta']}</span><ArrowIcon /></a>
            <button type="button" className="menu-btn" ref={menuBtnRef} aria-expanded={navOpen} aria-controls="mobileNav"
              onClick={() => setNavOpen(o => !o)}>
              <span className="sr-only">{d['a11y.menu']}</span><span className="bar bar-1" /><span className="bar bar-2" />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-nav${navOpen ? ' open' : ''}`} id="mobileNav">
        <nav className="mn-links" aria-label="Navigation">
          {MOBILE_NAV.map(([id, key], i) => (
            <a key={id} href={`#${id}`} style={vars({ '--i': i })} aria-current={current(id)} onClick={() => setNavOpen(false)}>
              <span className="mn-idx">{String(i + 1).padStart(2, '0')}</span><span>{d[key]}</span>
            </a>
          ))}
        </nav>
        <div className="mn-langs" role="group" aria-label={d['a11y.lang']}>
          {LOCALES.map(l => <LangLink key={l} to={l} className="lang-btn">{LOCALE_INFO[l].native}</LangLink>)}
        </div>
        <div className="mn-foot">
          <a href="#contact-page" className="btn btn-primary btn-lg" onClick={() => setNavOpen(false)}><span>{d['nav.cta']}</span><ArrowIcon /></a>
          <a href={waLink()} target="_blank" rel="noopener" className="btn btn-ghost btn-lg"><Icon name="wa" className="i-wa" /><span>WhatsApp</span></a>
        </div>
      </div>

      <div className={`lang-modal-overlay${langOpen ? ' open' : ''}`} onClick={e => { if (e.target === e.currentTarget) closeLang(); }}>
        <div className="lang-modal" id="langModal" role="dialog" aria-modal="true" aria-labelledby="langModalTitle" ref={modalRef}>
          <button type="button" className="lang-modal-close" aria-label={d['a11y.close']} onClick={closeLang}>×</button>
          <h2 className="lang-modal-title" id="langModalTitle">{d['lang.choose']}</h2>
          <div className="lang-modal-grid">
            {LOCALES.map(l => (
              <LangLink key={l} to={l} className="lang-modal-option">
                <span className="native">{LOCALE_INFO[l].native}</span><span className="code">{LOCALE_INFO[l].code}</span>
              </LangLink>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
