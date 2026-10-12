'use client';

import { useState, type FormEvent } from 'react';
import type { TextKey } from '@/lib/i18n';
import { CONTACT, openWhatsApp, waLink } from '@/lib/site';
import { vars } from '@/lib/css';
import { useI18n } from './I18nProvider';
import { ArrowIcon, Icon } from './Icons';
import { SectionHead } from './SectionHead';

declare global {
  interface Window { dataLayer?: Record<string, unknown>[] }
}

export function Contact() {
  const { lang, d } = useI18n();
  const [status, setStatus] = useState('');
  const [service, ...services] = d['con.srvOpts'];

  // No form backend: the message is composed and opened in WhatsApp (same as the original newsletter).
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const label = (key: TextKey) => d[key].replace(/\s*\*$/, '');
    const lines = [
      d['con.waHead'], '',
      `${label('con.name')}: ${data.get('name')}`,
      `${label('con.phone')}: ${data.get('phone')}`,
    ];
    if (data.get('email')) lines.push(`${label('con.emailL')}: ${data.get('email')}`);
    lines.push(`${label('con.service')}: ${data.get('service')}`);
    const message = String(data.get('message') ?? '').trim();
    if (message) lines.push('', message);

    (window.dataLayer = window.dataLayer || []).push({ event: 'mws_contact_submit', mws_service: data.get('service'), mws_lang: lang });
    openWhatsApp(lines.join('\n'));
    setStatus(d['con.ok']);
    form.reset();
  };

  return (
    <section className="section" aria-labelledby="conTitle">
      <div className="container">
        <SectionHead id="conTitle" eyebrow={d['nav.contact']} title={d['con.title']} lead={d['con.desc']} />
        <div className="contact-grid">
          <div className="contact-info reveal">
            <p className="eyebrow kicker" style={{ marginBottom: 14 }}><span>{d['con.info']}</span></p>
            <h3 className="h3">{d['con.tagline']}</h3>
            <p className="contact-hours">{d['con.hours']}</p>
            <ul className="contact-list">
              <li>
                <a href={waLink()} target="_blank" rel="noopener" className="contact-item">
                  <span className="contact-icon"><Icon name="wa" /></span>
                  <span><span className="contact-label">{d['con.wa']}</span><span className="contact-val" dir="ltr">{CONTACT.phoneDisplay}</span></span>
                  <Icon name="arrow-up" className="i-flip" />
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT.phoneHref}`} className="contact-item">
                  <span className="contact-icon"><Icon name="phone" /></span>
                  <span><span className="contact-label">{d['con.tel']}</span><span className="contact-val" dir="ltr">{CONTACT.phoneDisplay}</span></span>
                  <Icon name="arrow-up" className="i-flip" />
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="contact-item">
                  <span className="contact-icon"><Icon name="mail" /></span>
                  <span><span className="contact-label">{d['con.email']}</span><span className="contact-val" dir="ltr">{CONTACT.email}</span></span>
                  <Icon name="arrow-up" className="i-flip" />
                </a>
              </li>
              <li>
                <div className="contact-item">
                  <span className="contact-icon"><Icon name="pin" /></span>
                  <span><span className="contact-label">{d['con.addr']}</span><span className="contact-val">{d['con.city']}</span></span>
                </div>
              </li>
            </ul>
            <a href={waLink()} target="_blank" rel="noopener" className="btn btn-primary btn-lg btn-block">
              <span>{d['con.book']}</span><ArrowIcon />
            </a>
          </div>

          <form className="contact-form reveal" style={vars({ '--d': 1 })} onSubmit={onSubmit}>
            <h3 className="h3">{d['con.send']}</h3>
            <div className="form-row">
              <div className="field">
                <label htmlFor="cfName">{d['con.name']}</label>
                <input type="text" className="form-control" id="cfName" name="name" autoComplete="name" required placeholder={d['con.namePH']} />
              </div>
              <div className="field">
                <label htmlFor="cfPhone">{d['con.phone']}</label>
                <input type="tel" className="form-control" id="cfPhone" name="phone" autoComplete="tel" required placeholder={CONTACT.phoneDisplay} />
              </div>
            </div>
            <div className="field">
              <label htmlFor="cfEmail">{d['con.emailL']}</label>
              <input type="email" className="form-control" id="cfEmail" name="email" autoComplete="email" placeholder="email@example.com" />
            </div>
            <div className="field">
              <label htmlFor="cfService">{d['con.service']}</label>
              <select className="form-control" id="cfService" name="service" required defaultValue="">
                <option value="" disabled>{service}</option>
                {services.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="cfMsg">{d['con.msg']}</label>
              <textarea className="form-control" id="cfMsg" name="message" placeholder={d['con.msgPH']} />
            </div>
            <button type="submit" className="btn btn-primary btn-lg btn-block"><span>{d['con.submit']}</span><ArrowIcon /></button>
            <p className="form-note">{d['con.via']} {d['con.note']}</p>
            <p className="form-status" role="status" aria-live="polite">{status}</p>
          </form>
        </div>
      </div>
    </section>
  );
}
