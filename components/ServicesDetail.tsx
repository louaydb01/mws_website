import type { Dictionary, TextKey } from '@/lib/i18n';
import { waLink } from '@/lib/site';
import { ArrowIcon, Icon } from './Icons';
import { SectionHead } from './SectionHead';
import { serviceArt, type ArtKind } from '@/lib/serviceArt';

const DEEP_DIVES: Array<{
  art: ArtKind; labels: 'sd1.labels' | 'sd2.labels' | 'sd3.labels'; category: TextKey; title: TextKey; desc: TextKey; features: TextKey[]; caption: TextKey; tags: string;
}> = [
  { art: 'marketing', labels: 'sd1.labels', category: 's1.title', title: 'sd1.h', desc: 'sd1.p', features: ['sd1.f1', 'sd1.f2', 'sd1.f3', 'sd1.f4', 'sd1.f5'], caption: 'sd1.vis', tags: 'Meta Ads · Google Ads · SEO' },
  { art: 'ai', labels: 'sd2.labels', category: 's2.title', title: 'sd2.h', desc: 'sd2.p', features: ['sd2.f1', 'sd2.f2', 'sd2.f3', 'sd2.f4'], caption: 'sd2.vis', tags: 'ChatBot · Automation · GPT' },
  { art: 'web', labels: 'sd3.labels', category: 's3.title', title: 'sd3.h', desc: 'sd3.p', features: ['sd3.f1', 'sd3.f2', 'sd3.f3', 'sd3.f4'], caption: 'sd3.vis', tags: 'React · WordPress · Shopify' },
];

export function ServicesDetail({ d }: { d: Dictionary }) {
  return (
    <section className="section section--rule" id="services-detail" aria-labelledby="srvpTitle">
      <div className="container">
        <SectionHead id="srvpTitle" eyebrow={d['nav.services']} title={d['srvp.title']} lead={d['srvp.desc']} />

        <div className="dd-list">
          {DEEP_DIVES.map((s, n) => {
            const num = String(n + 1).padStart(2, '0');
            return (
              <article key={s.art} className="dd reveal">
                <div className="dd-text">
                  <p className="dd-kicker kicker"><span className="num">{num}</span><span>{d[s.category]}</span><span className="dd-kline" aria-hidden="true" /></p>
                  <h3 className="dd-title">{d[s.title]}</h3>
                  <p className="dd-desc">{d[s.desc]}</p>
                  <ul className="dd-features">
                    {s.features.map(f => <li key={f}>{d[f]}</li>)}
                  </ul>
                  <a href="#contact-page" className="btn btn-outline-lime"><span>{d['srv.quote']}</span><ArrowIcon /></a>
                </div>
                <figure className="dd-visual">
                  <div className="dd-panel">
                    <div className="dd-bar"><span className="live">MWS / {num}</span><span>{s.tags}</span></div>
                    <svg className="dd-art" viewBox="0 0 480 370" aria-hidden="true" focusable="false"
                      dangerouslySetInnerHTML={{ __html: serviceArt(s.art, d[s.labels]) }} />
                    <p className="dd-caption"><span>{d[s.caption]}</span><span className="dd-bars" aria-hidden="true"><i /><i /><i /><i /><i /></span></p>
                  </div>
                </figure>
              </article>
            );
          })}
        </div>

        <div className="srv-cta reveal">
          <div>
            <h3 className="h3">{d['srvp.ctaT']}</h3>
            <p>{d['srvp.ctaD']}</p>
          </div>
          <div className="srv-cta-actions">
            <a href="#contact-page" className="btn btn-primary"><span>{d['srvp.ctaB']}</span><ArrowIcon /></a>
            <a href={waLink()} target="_blank" rel="noopener" className="btn btn-ghost"><Icon name="wa" className="i-wa" /><span>WhatsApp</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}
