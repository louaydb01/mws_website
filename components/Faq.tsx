'use client';

import { useState } from 'react';
import { useI18n } from './I18nProvider';
import { ArrowIcon } from './Icons';
import { Rich } from './Rich';
import { Eyebrow } from './SectionHead';

const QUESTIONS = [1, 2, 3, 4, 5] as const;

export function Faq() {
  const { d } = useI18n();
  const [open, setOpen] = useState(0);

  return (
    <section className="section section--rule" aria-labelledby="faqTitle">
      <div className="container faq-grid">
        <header className="faq-head reveal">
          <Eyebrow>{d['nav.faq']}</Eyebrow>
          <h2 className="h2" id="faqTitle"><Rich text={d['faq.title']} /></h2>
          <p className="lead">{d['faq.desc']}</p>
          <a href="#contact-page" className="link-arrow"><span>{d['nav.contact']}</span><ArrowIcon /></a>
        </header>
        <div className="faq-list reveal">
          {QUESTIONS.map((n, i) => {
            const isOpen = open === i;
            return (
              <div key={n} className={`faq-item${isOpen ? ' is-open' : ''}`}>
                <h3>
                  <button type="button" className="faq-question" id={`faq-q${n}`} aria-expanded={isOpen}
                    aria-controls={`faq-a${n}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                    <span>{d[`faq.q${n}`]}</span><span className="faq-icon" aria-hidden="true" />
                  </button>
                </h3>
                <div className="faq-answer" id={`faq-a${n}`} role="region" aria-labelledby={`faq-q${n}`}>
                  <div className="faq-answer-inner"><p>{d[`faq.a${n}`]}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
