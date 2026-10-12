import type { Dictionary, TextKey } from '@/lib/i18n';
import { vars } from '@/lib/css';
import { ArrowIcon } from './Icons';
import { SectionHead } from './SectionHead';

const STEPS: Array<[TextKey, TextKey]> = [
  ['p1h', 'p1p'],
  ['p2h', 'p2p'],
  ['p3h', 'p3p'],
  ['p4h', 'p4p'],
];

export function Process({ d }: { d: Dictionary }) {
  return (
    <section className="section section--rule" id="process" aria-labelledby="procTitle">
      <div className="container">
        <SectionHead id="procTitle" eyebrow={d['why.process']} title={d['proc.title']} lead={d['proc.desc']} />
        <ol className="proc-track reveal">
          {STEPS.map(([h, p], n) => (
            <li key={h} className="proc-step" style={vars({ '--d': n })}>
              <span className="proc-dot" aria-hidden="true" />
              <span className="proc-num">{String(n + 1).padStart(2, '0')}</span>
              <h3 className="h3">{d[h]}</h3>
              <p>{d[p]}</p>
            </li>
          ))}
        </ol>
        <div className="proc-cta reveal">
          <a href="#contact-page" className="btn btn-primary btn-lg"><span>{d['why.start']}</span><ArrowIcon /></a>
        </div>
      </div>
    </section>
  );
}
