import type { ReactNode } from 'react';
import type { Dictionary, TextKey } from '@/lib/i18n';
import { vars } from '@/lib/css';
import { LineIcon, type LineIconName } from './LineIcons';
import { Rich } from './Rich';
import { Eyebrow } from './SectionHead';

// Small illustrative scene per expertise (decorative, hidden from assistive tech).
function Illustration({ kind, d }: { kind: number; d: Dictionary }): ReactNode {
  if (kind === 0) return (
    <div className="xi xi--mk">
      <span className="xi-social"><LineIcon name="instagram" /></span>
      <span className="xi-social"><b>G</b></span>
      <span className="xi-social"><LineIcon name="music" /></span>
      <div className="xi-chart">
        <span className="xi-badge">+125%<LineIcon name="up" /></span>
        <div className="xi-bars">{[30, 45, 38, 60, 75, 100].map((h, n) => <i key={n} style={vars({ '--h': `${h}%` })} />)}</div>
        <svg className="xi-line" viewBox="0 0 140 70" preserveAspectRatio="none">
          <path d="M2 62 C14 58 18 48 30 46 S46 52 56 42 S72 26 84 30 S100 22 110 14 S128 8 138 4" fill="none" stroke="#e2ff4d" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
    </div>
  );
  if (kind === 1) return (
    <div className="xi xi--ai">
      <span className="xi-blob" />
      <span className="xi-chip" style={vars({ '--x': '4px', '--y': '14px' })}><LineIcon name="zap" />{d['srv.ilAuto']}</span>
      <span className="xi-chip" style={vars({ '--x': '36px', '--y': '70px' })}><LineIcon name="settings" />{d['srv.ilOpt']}</span>
      <span className="xi-chip" style={vars({ '--x': '72px', '--y': '126px' })}><LineIcon name="bars" />{d['srv.ilGrow']}</span>
    </div>
  );
  if (kind === 2) return (
    <div className="xi xi--web">
      <div className="xi-browser">
        <span className="xi-dots"><i /><i /><i /></span>
        <span className="xi-url"><span className="xi-globe"><LineIcon name="globe" /></span><span className="xi-addr" dir="ltr">https://votre-projet.ma</span></span>
        <span className="xi-content">
          <span className="xi-img"><LineIcon name="image" /></span>
          <span className="xi-lines"><i style={vars({ '--w': '90%' })} /><i style={vars({ '--w': '70%' })} /><i style={vars({ '--w': '80%' })} /><i style={vars({ '--w': '50%' })} /></span>
        </span>
      </div>
    </div>
  );
  return (
    <div className="xi xi--shop">
      <div className="xi-shop">
        <i className="xi-shop-bar" />
        <span className="xi-product">
          <span className="xi-photo"><LineIcon name="shirt" /></span>
          <span className="xi-lines"><i style={vars({ '--w': '90%' })} /><i style={vars({ '--w': '60%' })} /><i style={vars({ '--w': '75%' })} /><i className="xi-buy" /></span>
        </span>
        <span className="xi-thumbs"><i /><i /><i /><i /></span>
      </div>
      <span className="xi-cart"><LineIcon name="cart" /></span>
      <span className="xi-conv">{d['srv.ilConv']}<LineIcon name="up" /></span>
    </div>
  );
}

const SERVICES: Array<{ icon: LineIconName; title: TextKey; desc: TextKey; tags: string[] }> = [
  { icon: 'bars', title: 's1.title', desc: 's1.desc', tags: ['Meta Ads', 'Google Ads', 'Content'] },
  { icon: 'cpu', title: 's2.title', desc: 's2.desc', tags: ['Chatbot', 'Automation', 'AI Tools'] },
  { icon: 'code', title: 's3.title', desc: 's3.desc', tags: ['Website', 'SaaS', 'CRM'] },
  { icon: 'cart', title: 's4.title', desc: 's4.desc', tags: ['E-shop', 'Branding', 'Packaging'] },
];

export function Expertises({ d }: { d: Dictionary }) {
  return (
    <section className="section xp" id="expertises" aria-labelledby="srvTitle">
      <div className="xp-arcs" aria-hidden="true" />
      <div className="container">
        <header className="xp-head reveal">
          <Eyebrow>{d['srv.label']}</Eyebrow>
          <div className="xp-head-row">
            <h2 className="xp-title" id="srvTitle"><Rich text={d['srv.title']} /></h2>
            <p className="xp-lead">{d['srv.desc']}</p>
          </div>
        </header>
        <div className="xp-grid">
          {SERVICES.map((s, n) => (
            <article key={s.title} className={`xp-card reveal${n === 1 ? ' is-featured' : ''}`} style={vars({ '--d': n })}>
              <div className="xp-top">
                <span className="xp-icon"><LineIcon name={s.icon} /></span>
                <span className="xp-num">{String(n + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="xp-card-title">{d[s.title]}</h3>
              <p className="xp-desc">{d[s.desc]}</p>
              <ul className="xp-tags">{s.tags.map(t => <li key={t}>{t}</li>)}</ul>
              <div className="xp-illu" aria-hidden="true"><Illustration kind={n} d={d} /></div>
              <a href="#services-page" className="xp-link">
                <span>{d['srv.more']}</span><span className="sr-only"> {d[s.title]}</span>
                <span className="xp-arrow"><LineIcon name="arrow" /></span>
              </a>
            </article>
          ))}
        </div>
        <div className="xp-strip reveal">
          <p><LineIcon name="bars" />{d['srv.strip1']}</p>
          <p><LineIcon name="sparkle" />{d['srv.strip2']}</p>
        </div>
      </div>
    </section>
  );
}
