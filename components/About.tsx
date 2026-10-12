import type { Dictionary, TextKey } from '@/lib/i18n';
import { vars } from '@/lib/css';
import { Icon, type IconName } from './Icons';
import { LogoMark, LogoWords } from './Logo';
import { Rich } from './Rich';
import { Eyebrow } from './SectionHead';

const VALUES: Array<{ icon: IconName; h: TextKey; p: TextKey }> = [
  { icon: 'target', h: 'val1h', p: 'val1p' },
  { icon: 'spark', h: 'val2h', p: 'val2p' },
  { icon: 'link', h: 'val3h', p: 'val3p' },
  { icon: 'chart', h: 'val4h', p: 'val4p' },
];

const FACTS: Array<[TextKey, TextKey]> = [
  ['ab.f1', 'con.city'],
  ['ab.f2', 'ab.f2v'],
  ['ab.f3', 'ab.f3v'],
];

export function About({ d }: { d: Dictionary }) {
  return (
    <section className="section section--rule" aria-labelledby="aboutTitle">
      <div className="container about-grid">
        <div className="about-text reveal">
          <Eyebrow>{d['nav.about']}</Eyebrow>
          <h2 className="h2" id="aboutTitle"><Rich text={d['about.title']} /></h2>
          <p>{d['about.p1']}</p>
          <p>{d['about.p2']}</p>
          <ul className="values">
            {VALUES.map(v => (
              <li key={v.h} className="value"><Icon name={v.icon} /><h3>{d[v.h]}</h3><p>{d[v.p]}</p></li>
            ))}
          </ul>
        </div>

        <aside className="about-panel reveal" style={vars({ '--d': 1 })}>
          <div className="about-brand">
            <LogoMark size="xl" />
            <span><LogoWords /></span>
          </div>
          <dl className="about-facts">
            {FACTS.map(([dt, dd]) => (
              <div key={dt}><dt className="kicker">{d[dt]}</dt><dd>{d[dd]}</dd></div>
            ))}
          </dl>
          {/* Unverified figures from the original page — shown only once confirmed */}
          <div className="about-stats" data-unverified="">
            <div><b>+150</b><span>{d['ab.b1']}</span></div>
            <div><b>3+</b><span>{d['ab.b2']}</span></div>
            <div><b>10+</b><span>{d['ab.b3']}</span></div>
          </div>
          <ul className="about-chips">
            <li>Made in Morocco</li>
            <li data-unverified="">Top Agency 2024</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
