import type { Dictionary, TextKey } from '@/lib/i18n';
import { vars } from '@/lib/css';
import { ArrowIcon, Icon, type IconName } from './Icons';
import { SectionHead } from './SectionHead';

const SERVICES: Array<{ icon: IconName; title: TextKey; desc: TextKey; tags: string }> = [
  { icon: 'target', title: 's1.title', desc: 's1.desc', tags: 'Meta Ads · Google Ads · Content' },
  { icon: 'ai', title: 's2.title', desc: 's2.desc', tags: 'ChatBot · Automation · AI Tools' },
  { icon: 'code', title: 's3.title', desc: 's3.desc', tags: 'Website · SaaS · CRM' },
  { icon: 'bag', title: 's4.title', desc: 's4.desc', tags: 'E-shop · Branding · Packaging' },
];

export function Expertises({ d }: { d: Dictionary }) {
  return (
    <section className="section" id="expertises" aria-labelledby="srvTitle">
      <div className="container">
        <SectionHead id="srvTitle" eyebrow={d['srv.label']} title={d['srv.title']} lead={d['srv.desc']} />
        <div className="svc-grid">
          {SERVICES.map((s, n) => (
            <article key={s.title} className="svc-card reveal" data-spotlight="" style={vars({ '--d': n })}>
              <div className="svc-top">
                <span className="svc-icon"><Icon name={s.icon} /></span>
                <span className="svc-num">{String(n + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="svc-title">{d[s.title]}</h3>
              <p className="svc-desc">{d[s.desc]}</p>
              <p className="svc-tags">{s.tags}</p>
              <a href="#services-page" className="svc-link">
                <span>{d['srv.more']}</span><span className="sr-only"> {d[s.title]}</span><ArrowIcon />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
