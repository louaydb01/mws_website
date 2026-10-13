import type { Dictionary, TextKey } from '@/lib/i18n';
import { vars } from '@/lib/css';
import { LineIcon, type LineIconName } from './LineIcons';
import { Rich } from './Rich';
import { Eyebrow } from './SectionHead';

const PRINCIPLES: Array<[LineIconName, TextKey, TextKey]> = [
  ['bars', 'why.w1h', 'why.w1p'],
  ['file', 'why.w2h', 'why.w2p'],
  ['users', 'why.w3h', 'why.w3p'],
  ['headset', 'why.w4h', 'why.w4p'],
];

export function Why({ d }: { d: Dictionary }) {
  return (
    <section className="section wy" id="why" aria-labelledby="whyTitle">
      <div className="container">
        <header className="wy-head reveal">
          <Eyebrow>{d['why.label']}</Eyebrow>
          <div className="wy-head-row">
            <h2 className="wy-title" id="whyTitle"><Rich text={d['why.title']} /></h2>
            <p className="wy-lead">{d['why.desc']}</p>
          </div>
        </header>
        <ol className="wy-grid">
          {PRINCIPLES.map(([icon, h, p], n) => (
            <li key={h} className="wy-card reveal" style={vars({ '--d': n % 2 })}>
              <span className="wy-num">{String(n + 1).padStart(2, '0')}</span>
              <div className="wy-row">
                <span className="wy-icon"><LineIcon name={icon} /></span>
                <div className="wy-text"><h3>{d[h]}</h3><p>{d[p]}</p></div>
                <a href="#contact-page" className="wy-arrow" aria-label={d['nav.contact']}><LineIcon name="arrow" /></a>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
