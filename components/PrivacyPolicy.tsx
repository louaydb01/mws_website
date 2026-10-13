'use client';

import { Fragment, useEffect, useRef, useState, type ReactNode } from 'react';
import { PRIVACY, PRIVACY_UPDATED } from '@/lib/privacy';
import { useI18n } from './I18nProvider';

// **bold** and e-mail addresses → <strong> / mailto links
function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|[\w.+-]+@[\w-]+\.[\w.]+)/g).filter(Boolean).map((part, i) => {
    if (part.startsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(part)) return <a key={i} href={`mailto:${part}`}>{part}</a>;
    return <Fragment key={i}>{part}</Fragment>;
  });
}

// Footer link that opens the privacy policy in a modal dialog (native <dialog>: Esc + focus handling).
export function PrivacyPolicy() {
  const { lang, d } = useI18n();
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (open && !dlg.open) dlg.showModal();
    if (!open && dlg.open) dlg.close();
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <>
      <button type="button" className="privacy-link" onClick={() => setOpen(true)}>{d['foot.privacy']}</button>
      <dialog ref={ref} className="privacy-modal" aria-labelledby="privacyTitle" lang="fr" dir="ltr"
        onClose={() => setOpen(false)}
        onClick={e => { if (e.target === e.currentTarget) setOpen(false); }}>
        <div className="privacy-card">
          <button type="button" className="privacy-close" aria-label={d['a11y.close']} onClick={() => setOpen(false)}>×</button>
          <h2 id="privacyTitle">Politique de confidentialité</h2>
          <p className="privacy-date">{PRIVACY_UPDATED}</p>
          {lang !== 'fr' && <p className="privacy-note" lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>{d['foot.privacyNote']}</p>}
          {PRIVACY.map(section => (
            <section key={section.h}>
              <h3>{section.h}</h3>
              {section.blocks.map((b, i) => Array.isArray(b)
                ? <ul key={i}>{b.map(li => <li key={li}>{inline(li)}</li>)}</ul>
                : <p key={i}>{inline(b)}</p>)}
            </section>
          ))}
        </div>
      </dialog>
    </>
  );
}
