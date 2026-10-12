import type { Dictionary, TextKey } from '@/lib/i18n';
import { SectionHead } from './SectionHead';

const PRINCIPLES: Array<[TextKey, TextKey]> = [
  ['why.w1h', 'why.w1p'],
  ['why.w2h', 'why.w2p'],
  ['why.w3h', 'why.w3p'],
  ['why.w4h', 'why.w4p'],
];

export function Why({ d }: { d: Dictionary }) {
  return (
    <section className="section section--rule" id="why" aria-labelledby="whyTitle">
      <div className="container">
        <SectionHead id="whyTitle" eyebrow={d['why.label']} title={d['why.title']} lead={d['why.desc']} />
        <ol className="why-list">
          {PRINCIPLES.map(([h, p], n) => (
            <li key={h} className="why-item reveal">
              <span className="why-num">{String(n + 1).padStart(2, '0')}</span>
              <div><h3 className="h3">{d[h]}</h3><p>{d[p]}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
