import type { Dictionary, TextKey } from '@/lib/i18n';
import { vars } from '@/lib/css';
import { ArrowIcon } from './Icons';
import { LineIcon, type LineIconName } from './LineIcons';
import { Rich } from './Rich';

const STEPS: Array<[LineIconName, TextKey, TextKey]> = [
  ['search', 'p1h', 'p1p'],
  ['bars', 'p2h', 'p2p'],
  ['zap', 'p3h', 'p3p'],
  ['bars', 'p4h', 'p4p'],
];

export function Process({ d }: { d: Dictionary }) {
  return (
    <section className="section pr" id="process" aria-labelledby="procTitle">
      <div className="container">
        <header className="pr-head reveal">
          <p className="pr-eyebrow"><span className="pr-eyebrow-mark" aria-hidden="true" /><span>{d['why.process']}</span><span className="pr-eyebrow-line" aria-hidden="true" /></p>
          <div className="pr-head-row">
            <h2 className="pr-title" id="procTitle"><Rich text={d['proc.title']} /></h2>
            <p className="pr-lead">{d['proc.desc']}</p>
          </div>
        </header>
        <ol className="pr-track">
          {STEPS.map(([icon, h, p], n) => {
            const num = String(n + 1).padStart(2, '0');
            return (
              <li key={h} className="pr-step reveal" style={vars({ '--d': n })}>
                <span className="pr-num pr-num--top" aria-hidden="true">{num}</span>
                <div className="pr-card">
                  <span className="pr-num pr-num--in" aria-hidden="true">{num}</span>
                  <span className="pr-icon"><LineIcon name={icon} /></span>
                  <div className="pr-text"><h3><span className="sr-only">{num}. </span>{d[h]}</h3><p>{d[p]}</p></div>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="pr-cta reveal">
          <a href="#contact-page" className="btn btn-primary pr-btn"><span>{d['why.start']}</span><ArrowIcon /></a>
        </div>
      </div>
    </section>
  );
}
