import { Fragment, type ReactNode } from 'react';
import type { Dictionary, TextKey } from '@/lib/i18n';
import { vars } from '@/lib/css';
import { ArrowIcon, Icon } from './Icons';
import { WaveCanvas } from './WaveCanvas';

// Splits the headline into words (for the staggered reveal) while keeping the
// highlighted <em> phrase together. Rendered on the server, animated by CSS.
function HeroTitle({ text }: { text: string }) {
  const parts: Array<{ text: string; em: boolean }> = [];
  let last = 0;
  for (const m of text.matchAll(/<em>(.*?)<\/em>/g)) {
    const index = m.index ?? 0;
    if (index > last) parts.push({ text: text.slice(last, index), em: false });
    parts.push({ text: m[1], em: true });
    last = index + m[0].length;
  }
  if (last < text.length) parts.push({ text: text.slice(last), em: false });

  let i = 0;
  const renderWords = (chunk: string) =>
    chunk.trim().split(/\s+/).filter(Boolean).map((w, wi) => (
      <Fragment key={wi}>{wi > 0 && ' '}<span className="w" style={vars({ '--i': i++ })}>{w}</span></Fragment>
    ));

  return (
    <h1 className="hero-title is-split" id="heroTitle">
      {parts.map((p, pi) => {
        const lead = /^\s/.test(p.text) && pi > 0 ? ' ' : '';
        const trail = /\s$/.test(p.text) ? ' ' : '';
        const words: ReactNode = p.em ? <em>{renderWords(p.text)}</em> : renderWords(p.text);
        return <Fragment key={pi}>{lead}{words}{trail}</Fragment>;
      })}
    </h1>
  );
}

const INDEX: TextKey[] = ['s1.title', 's2.title', 's3.title', 's4.title'];
const BARS = [38, 58, 46, 72, 60, 84, 100];

export function Hero({ d }: { d: Dictionary }) {
  return (
    <section id="home" className="hero" aria-labelledby="heroTitle">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid" />
        <div className="hero-aura" />
        <div className="hero-aura hero-aura--2" />
      </div>
      <WaveCanvas className="hero-canvas" palette="light" seed={9}
        topSelector=".hero-actions" floorSelector=".hero-index-grid" focusSelector=".hi-item" />
      <div className="hero-fade" aria-hidden="true" />

      <div className="container hero-inner">
        <div className="hero-text">
          <p className="hero-tag" data-anim="" style={vars({ '--delay': '.05s' })}>
            <span className="hero-tag-dot" aria-hidden="true" /><span>{d['hero.eyebrow']}</span>
          </p>
          <HeroTitle text={d['hero.title']} />
          <p className="lead hero-lead" data-anim="" style={vars({ '--delay': '.65s' })}>{d['hero.lead']}</p>
          <div className="hero-actions" data-anim="" style={vars({ '--delay': '.8s' })}>
            <a href="#contact-page" className="btn btn-primary btn-lg"><span>{d['hero.cta1']}</span><ArrowIcon /></a>
            <a href="#services-page" className="btn btn-ghost btn-lg"><span>{d['hero.cta2']}</span></a>
          </div>
        </div>

        {/* Illustrative dashboard cards — no figures shown (see TRUST AUDIT in globals.css) */}
        <div className="hero-visual" aria-hidden="true">
          <div className="hc hc--a" data-anim="" style={vars({ '--delay': '1s' })}>
            <p className="hc-label">{d['card.roi']}</p>
            <div className="hc-bars">
              {BARS.map((h, n) => <i key={n} style={vars({ '--h': `${h}%`, '--n': n })} />)}
            </div>
            <p className="hc-status">{d['card.growth']}</p>
          </div>
          <div className="hc hc--b" data-anim="" style={vars({ '--delay': '1.15s' })}>
            <p className="hc-label">{d['card.campaign']}</p>
            <p className="hc-value"><span className="hc-dot" /><span>{d['card.active']}</span></p>
            <p className="hc-meta">Meta Ads · Google Ads</p>
          </div>
          <div className="hc hc--c" data-anim="" style={vars({ '--delay': '1.3s' })}>
            <div className="hc-row"><Icon name="ai" /><p className="hc-label">{d['card.ai']}</p></div>
            <p className="hc-value">{d['card.aiVal']}</p>
            <p className="hc-status">{d['card.replies']}</p>
          </div>
        </div>
      </div>

      <div className="container hero-index" data-anim="" style={vars({ '--delay': '1s' })}>
        <div className="hero-index-grid">
          <p className="hi-label kicker">{d['hero.index']}</p>
          {INDEX.map((key, n) => (
            <a key={key} href="#expertises" className="hi-item">
              <span className="hi-num">{String(n + 1).padStart(2, '0')}</span>
              <span className="hi-name">{d[key]}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
