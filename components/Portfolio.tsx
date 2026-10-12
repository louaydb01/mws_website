'use client';

import { useEffect, useRef, useState } from 'react';
import type { TextKey } from '@/lib/i18n';
import { vars } from '@/lib/css';
import { useI18n } from './I18nProvider';
import { Icon, type IconName } from './Icons';
import { SectionHead } from './SectionHead';

type Category = 'marketing' | 'web' | 'branding' | 'ecom';

const PROJECTS: Array<{
  cat: Category; icon: IconName; mono: string; name: string; label: TextKey; desc: TextKey; result?: TextKey;
}> = [
  { cat: 'marketing', icon: 'target', mono: 'ZC', name: 'Zara Cosmetics', label: 's1.title', desc: 'p.case1', result: 'p.case1r' },
  { cat: 'web', icon: 'code', mono: 'DB', name: 'Dr. Benali Clinic', label: 's3.title', desc: 'p.case2' },
  { cat: 'branding', icon: 'brand', mono: 'RC', name: 'RestoCasablanca', label: 'port.brand', desc: 'p.case3' },
  { cat: 'ecom', icon: 'bag', mono: 'AB', name: 'Argan Beauty', label: 's4.title', desc: 'p.case4' },
  { cat: 'web', icon: 'code', mono: 'FC', name: 'FitClub Platform', label: 's3.title', desc: 'p.case5' },
  { cat: 'marketing', icon: 'target', mono: 'BS', name: 'Beauty Studio', label: 's1.title', desc: 'p.case6' },
];

const FILTERS: Array<{ value: Category | 'all'; label: TextKey }> = [
  { value: 'all', label: 'port.all' },
  { value: 'marketing', label: 'port.marketing' },
  { value: 'web', label: 'port.web' },
  { value: 'branding', label: 'port.branding' },
  { value: 'ecom', label: 'port.ecom' },
];

export function Portfolio() {
  const { d } = useI18n();
  const [filter, setFilter] = useState<Category | 'all'>('all');
  const gridRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  // Replay the entrance animation on the cards that remain visible after filtering
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    let n = 0;
    gridRef.current?.querySelectorAll<HTMLElement>('.port-item:not([hidden])').forEach(item => {
      if (!item.classList.contains('is-in')) return;
      item.style.setProperty('--d', String(n++ % 3));
      item.classList.remove('is-in');
      void item.offsetWidth;
      item.classList.add('is-in');
    });
  }, [filter]);

  return (
    <section className="section section--rule" aria-labelledby="portTitle">
      <div className="container">
        <SectionHead id="portTitle" eyebrow={d['nav.portfolio']} title={d['port.title']} lead={d['port.desc']} />
        <div className="port-filter reveal" role="group" aria-label={d['port.filter']}>
          {FILTERS.map(f => (
            <button key={f.value} type="button" className="filter-btn" aria-pressed={filter === f.value}
              onClick={() => setFilter(f.value)}>
              {d[f.label]}
            </button>
          ))}
        </div>
        <div className="port-grid" ref={gridRef}>
          {PROJECTS.map((p, n) => (
            <article key={p.name} className="port-item reveal" data-cat={p.cat} style={vars({ '--d': n % 3 })}
              hidden={filter !== 'all' && filter !== p.cat}>
              <div className={`port-cover port-cover--${p.cat}`} aria-hidden="true">
                <div className="port-cover-top"><Icon name={p.icon} /><span className="idx">{String(n + 1).padStart(2, '0')}</span></div>
                <span className="port-mono">{p.mono}</span>
              </div>
              <div className="port-info">
                <p className="port-cat kicker">{d[p.label]}</p>
                <h3 className="port-name">{p.name}</h3>
                <p className="port-desc">{d[p.desc]}</p>
                {p.result && (
                  <p className="port-result" data-unverified=""><span>{d['port.result']}</span> — <span>{d[p.result]}</span></p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
