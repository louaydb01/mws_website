import type { Dictionary } from '@/lib/i18n';
import { SectionHead } from './SectionHead';

type Testimonial = Dictionary['testi.data'][number];

function Card({ t, hidden }: { t: Testimonial; hidden?: boolean }) {
  return (
    <figure className="testi-card" aria-hidden={hidden || undefined}>
      <div className="testi-stars" aria-hidden="true">★★★★★</div>
      <blockquote className="testi-text">“{t.q}”</blockquote>
      <figcaption className="testi-author">
        <span className="testi-avatar" style={{ background: t.color }} aria-hidden="true">{t.init}</span>
        <span><span className="testi-name">{t.name}</span><span className="testi-role">{t.role}</span></span>
      </figcaption>
    </figure>
  );
}

// Hidden pending verification (data-unverified — see TRUST AUDIT in globals.css).
export function Testimonials({ d }: { d: Dictionary }) {
  const items = d['testi.data'];
  return (
    <section className="section section--rule" id="testimonials" data-unverified="" aria-labelledby="testiTitle">
      <div className="container">
        <SectionHead id="testiTitle" eyebrow={d['testi.label']} title={d['testi.title']} split={false} />
      </div>
      <div className="testi-viewport">
        <div className="testi-track">
          {items.map((t, n) => <Card key={`a${n}`} t={t} />)}
          {items.map((t, n) => <Card key={`b${n}`} t={t} hidden />)}
        </div>
      </div>
    </section>
  );
}
