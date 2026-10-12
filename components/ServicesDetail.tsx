import type { Dictionary, TextKey } from '@/lib/i18n';
import { waLink } from '@/lib/site';
import { ArrowIcon, Icon } from './Icons';
import { SectionHead } from './SectionHead';

// Static decorative illustrations (animated by .art-* classes in globals.css).
const ART = {
  marketing: `
    <g fill="none" stroke="currentColor">
      <ellipse cx="240" cy="182" rx="212" ry="82" stroke-opacity=".1"/>
      <ellipse cx="240" cy="182" rx="156" ry="60" stroke-opacity=".14"/>
      <ellipse cx="240" cy="182" rx="100" ry="39" stroke-opacity=".2"/>
    </g>
    <ellipse class="art-pulse" cx="240" cy="182" rx="46" ry="18" fill="rgba(226,255,77,.1)" stroke="#e2ff4d" stroke-opacity=".8"/>
    <g fill="currentColor" fill-opacity=".34">
      <circle cx="70" cy="166" r="2.5"/><circle cx="112" cy="214" r="2.5"/><circle cx="150" cy="134" r="2.5"/><circle cx="96" cy="188" r="2"/>
      <circle cx="380" cy="146" r="2.5"/><circle cx="410" cy="202" r="2.5"/><circle cx="342" cy="232" r="2"/><circle cx="300" cy="124" r="2.5"/>
      <circle cx="180" cy="238" r="2.5"/><circle cx="330" cy="190" r="2"/><circle cx="160" cy="182" r="2"/><circle cx="430" cy="166" r="2"/>
      <circle cx="58" cy="206" r="2"/><circle cx="272" cy="248" r="2.5"/><circle cx="206" cy="122" r="2"/>
    </g>
    <g fill="#e2ff4d"><circle cx="226" cy="178" r="3"/><circle cx="252" cy="186" r="3"/><circle cx="240" cy="174" r="3"/><circle cx="263" cy="176" r="2.4"/><circle cx="218" cy="188" r="2.4"/></g>
    <path class="art-flow" d="M240 172V70" stroke="#e2ff4d" stroke-opacity=".7"/>
    <path d="M226 36h28v21l-7 7h-21z" fill="#e2ff4d"/>`,
  ai: `
    <path fill="none" stroke="currentColor" stroke-opacity=".1" d="M96 80L240 55M96 80L240 105M96 80L240 155M96 80L240 205M96 80L240 255M96 130L240 55M96 130L240 105M96 130L240 205M96 130L240 255M96 180L240 55M96 180L240 105M96 180L240 205M96 180L240 255M96 230L240 55M96 230L240 105M96 230L240 155M96 230L240 205M96 230L240 255M240 55L384 105M240 55L384 155M240 55L384 205M240 105L384 105M240 105L384 205M240 205L384 105M240 205L384 205M240 255L384 105M240 255L384 155M240 255L384 205M240 155L384 105M240 155L384 205M240 105L384 155M240 205L384 155"/>
    <path class="art-flow" fill="none" stroke="#e2ff4d" stroke-width="1.5" d="M96 130L240 155L384 155M96 180L240 155"/>
    <g fill="#0e0e0d" stroke="currentColor" stroke-opacity=".4">
      <circle cx="96" cy="80" r="6"/><circle cx="96" cy="230" r="6"/>
      <circle cx="240" cy="55" r="6"/><circle cx="240" cy="105" r="6"/><circle cx="240" cy="205" r="6"/><circle cx="240" cy="255" r="6"/>
      <circle cx="384" cy="105" r="6"/><circle cx="384" cy="205" r="6"/>
    </g>
    <g fill="#e2ff4d"><circle cx="96" cy="130" r="6"/><circle cx="96" cy="180" r="6"/><circle cx="240" cy="155" r="7"/></g>
    <circle class="art-pulse" cx="384" cy="155" r="16" fill="rgba(226,255,77,.12)" stroke="#e2ff4d" stroke-opacity=".6"/>
    <circle cx="384" cy="155" r="6" fill="#e2ff4d"/>`,
  web: `
    <rect x="48" y="34" width="384" height="236" rx="12" fill="rgba(245,245,240,.02)" stroke="currentColor" stroke-opacity=".18"/>
    <path d="M48 62h384" stroke="currentColor" stroke-opacity=".14"/>
    <g fill="currentColor" fill-opacity=".25"><circle cx="66" cy="48" r="3.5"/><circle cx="80" cy="48" r="3.5"/><circle cx="94" cy="48" r="3.5"/></g>
    <rect x="150" y="43" width="180" height="10" rx="5" fill="currentColor" fill-opacity=".08"/>
    <g fill="currentColor">
      <rect x="76" y="90" width="170" height="14" rx="3" fill-opacity=".55"/>
      <rect x="76" y="112" width="128" height="14" rx="3" fill-opacity=".55"/>
      <rect x="76" y="138" width="186" height="6" rx="3" fill-opacity=".18"/>
      <rect x="76" y="150" width="156" height="6" rx="3" fill-opacity=".18"/>
    </g>
    <rect x="76" y="174" width="104" height="30" rx="6" fill="#e2ff4d"/>
    <rect x="190" y="174" width="78" height="30" rx="6" fill="none" stroke="currentColor" stroke-opacity=".25"/>
    <rect x="288" y="86" width="120" height="118" rx="8" fill="rgba(226,255,77,.05)" stroke="#e2ff4d" stroke-opacity=".3"/>
    <path class="art-flow" d="M298 188c22-2 34-14 46-30s26-38 54-46" fill="none" stroke="#e2ff4d" stroke-width="1.5"/>
    <g fill="currentColor" fill-opacity=".08"><rect x="76" y="226" width="100" height="24" rx="4"/><rect x="188" y="226" width="100" height="24" rx="4"/><rect x="300" y="226" width="108" height="24" rx="4"/></g>
    <path class="art-cursor" d="M160 194v20l5-5 4 9 3-1.5-4-8.5h7z" fill="#f5f5f0" stroke="#0a0a0a" stroke-width="1.2" stroke-linejoin="round"/>`,
};

const DEEP_DIVES: Array<{
  art: keyof typeof ART; category: TextKey; title: TextKey; desc: TextKey; features: TextKey[]; caption: TextKey; tags: string;
}> = [
  { art: 'marketing', category: 's1.title', title: 'sd1.h', desc: 'sd1.p', features: ['sd1.f1', 'sd1.f2', 'sd1.f3', 'sd1.f4', 'sd1.f5'], caption: 'sd1.vis', tags: 'Meta Ads · Google Ads · SEO' },
  { art: 'ai', category: 's2.title', title: 'sd2.h', desc: 'sd2.p', features: ['sd2.f1', 'sd2.f2', 'sd2.f3', 'sd2.f4'], caption: 'sd2.vis', tags: 'ChatBot · Automation · GPT' },
  { art: 'web', category: 's3.title', title: 'sd3.h', desc: 'sd3.p', features: ['sd3.f1', 'sd3.f2', 'sd3.f3', 'sd3.f4'], caption: 'sd3.vis', tags: 'React · WordPress · Shopify' },
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
                  <p className="dd-kicker kicker"><span className="num">{num}</span><span>{d[s.category]}</span></p>
                  <h3 className="dd-title">{d[s.title]}</h3>
                  <p className="dd-desc">{d[s.desc]}</p>
                  <ul className="dd-features">
                    {s.features.map(f => <li key={f}>{d[f]}</li>)}
                  </ul>
                  <a href="#contact-page" className="btn btn-ghost"><span>{d['srv.quote']}</span><ArrowIcon /></a>
                </div>
                <figure className="dd-visual">
                  <div className="dd-panel">
                    <div className="dd-bar"><span className="live">MWS / {num}</span><span>{s.tags}</span></div>
                    <svg className="dd-art" viewBox="0 0 480 300" aria-hidden="true" focusable="false"
                      dangerouslySetInnerHTML={{ __html: ART[s.art] }} />
                    <p className="dd-caption">{d[s.caption]}</p>
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
