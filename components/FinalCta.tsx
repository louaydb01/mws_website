import type { Dictionary } from '@/lib/i18n';
import { waLink } from '@/lib/site';
import { ArrowIcon, Icon } from './Icons';
import { Rich } from './Rich';
import { Eyebrow } from './SectionHead';
import { WaveCanvas } from './WaveCanvas';

export function FinalCta({ d }: { d: Dictionary }) {
  return (
    <section className="cta-final" id="cta" aria-labelledby="ctaTitle">
      <WaveCanvas className="cta-canvas" palette="dark" seed={3} topSelector=".cta-actions" />
      <div className="container reveal">
        <Eyebrow>{d['cta.label']}</Eyebrow>
        <h2 className="cta-title" id="ctaTitle"><Rich text={d['cta.title']} /></h2>
        <p className="lead">{d['cta.desc']}</p>
        <div className="cta-actions">
          <a href="#contact-page" className="btn btn-primary btn-lg"><span>{d['cta.btn1']}</span><ArrowIcon /></a>
          <a href={waLink()} target="_blank" rel="noopener" className="btn btn-ghost btn-lg">
            <Icon name="wa" className="i-wa" /><span>{d['cta.btn2']}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
