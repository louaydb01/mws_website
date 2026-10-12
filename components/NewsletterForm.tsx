'use client';

import { useState, type FormEvent } from 'react';
import { openWhatsApp } from '@/lib/site';
import { useI18n } from './I18nProvider';

// No email backend: the subscription request is relayed to WhatsApp.
export function NewsletterForm() {
  const { d } = useI18n();
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get('email') ?? '').trim();
    if (!email) return;
    openWhatsApp(d['foot.news.wa'] + email);
    setDone(true);
    form.reset();
  };

  return (
    <>
      <form className="newsletter-form" onSubmit={onSubmit}>
        <label className="sr-only" htmlFor="newsletterEmail">{d['foot.news.placeholder']}</label>
        <input type="email" required className="form-control" id="newsletterEmail" name="email" autoComplete="email"
          placeholder={d['foot.news.placeholder']} />
        <button type="submit" className="btn btn-primary"><span>{d['foot.news.btn']}</span></button>
      </form>
      <p className={`newsletter-success${done ? ' show' : ''}`} role="status">{done ? d['foot.news.success'] : ''}</p>
    </>
  );
}
