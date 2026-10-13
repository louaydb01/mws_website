import { Fragment, type ReactNode } from 'react';
import type { Dictionary, TextKey } from '@/lib/i18n';
import { vars } from '@/lib/css';
import { ArrowIcon } from './Icons';
import { LineIcon, type LineIconName } from './LineIcons';

// Splits the headline into words (for the staggered reveal) while keeping the
// highlighted <em> phrase together and honouring <br> line breaks.
// Rendered on the server, animated by CSS.
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
    chunk.split('<br>').map((line, li) => (
      <Fragment key={li}>
        {li > 0 && <br />}
        {line.trim().split(/\s+/).filter(Boolean).map((w, wi) => (
          <Fragment key={wi}>{wi > 0 && ' '}<span className="w" style={vars({ '--i': i++ })}>{w}</span></Fragment>
        ))}
      </Fragment>
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

// Smooth (cubic) path through normalised points, used for the sparklines and the dashboard curve.
function smoothPath(points: number[], w: number, h: number) {
  const xy = points.map((p, n) => [(n / (points.length - 1)) * w, h - p * h]);
  let d = `M${xy[0][0]} ${xy[0][1]}`;
  for (let n = 1; n < xy.length; n++) {
    const [x0, y0] = xy[n - 1];
    const [x1, y1] = xy[n];
    const cx = (x0 + x1) / 2;
    d += ` C${cx} ${y0} ${cx} ${y1} ${x1} ${y1}`;
  }
  return { d, xy };
}

const SPARK_A = [0.05, 0.2, 0.15, 0.35, 0.3, 0.5, 0.45, 0.7, 0.62, 0.95];
const SPARK_B = [0.1, 0.18, 0.3, 0.25, 0.45, 0.4, 0.6, 0.55, 0.8, 0.9];
const CURVE = [0.08, 0.15, 0.12, 0.25, 0.22, 0.38, 0.33, 0.5, 0.46, 0.66, 0.6, 0.85, 0.95];
const BARS = [14, 20, 18, 28, 34, 40, 48, 56, 66, 78, 100];

function Sparkline({ points, id }: { points: number[]; id: string }) {
  const { d } = smoothPath(points, 200, 60);
  return (
    <svg className="hv-spark" viewBox="0 0 200 60" preserveAspectRatio="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b6f22e" stopOpacity=".35" />
          <stop offset="1" stopColor="#b6f22e" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L200 60 L0 60 Z`} fill={`url(#${id})`} />
      <path d={d} fill="none" stroke="#8ed51f" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

type HeroIconName = LineIconName;
const HIcon = LineIcon;

function StatCard({ id, icon, label, value, sub, spark, className }: {
  id: string; icon: HeroIconName; label: string; value: string; sub?: string; spark: number[]; className: string;
}) {
  return (
    <div className={`hv-card ${className}`}>
      <div className="hv-card-top">
        <span className="hv-card-ic"><HIcon name={icon} /></span>
        <div className="hv-card-tx">
          <p className="hv-card-label">{label}</p>
          <p className="hv-card-value"><span>{value}</span><HIcon name="up" className="hv-card-up" /></p>
          {sub && <p className="hv-card-sub">{sub}</p>}
        </div>
      </div>
      <Sparkline points={spark} id={id} />
    </div>
  );
}

const STATS: Array<{ icon: HeroIconName; value: string; label: TextKey }> = [
  { icon: 'users', value: '+150', label: 'hero.st1' },
  { icon: 'bars', value: '5x', label: 'hero.st2' },
  { icon: 'shield', value: '3+', label: 'hero.st3' },
  { icon: 'trend', value: 'ROI', label: 'hero.st4' },
];

export function Hero({ d }: { d: Dictionary }) {
  const curve = smoothPath(CURVE, 400, 120);
  return (
    <section id="home" className="hero" aria-labelledby="heroTitle">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid" />
        <div className="hero-aura" />
        <div className="hero-aura hero-aura--2" />
      </div>

      <div className="container hero-inner">
        <div className="hero-text">
          <p className="hero-tag" data-anim="" style={vars({ '--delay': '.05s' })}>
            <span className="hero-tag-dot" aria-hidden="true" /><span>{d['hero.eyebrow']}</span>
          </p>
          <HeroTitle text={d['hero.title']} />
          <p className="hero-lead" data-anim="" style={vars({ '--delay': '.65s' })}>{d['hero.lead']}</p>
          <div className="hero-actions" data-anim="" style={vars({ '--delay': '.8s' })}>
            <a href="#contact-page" className="btn btn-primary hero-btn"><span>{d['hero.cta1']}</span><ArrowIcon /></a>
            <a href="#services-page" className="btn btn-ghost hero-btn"><span>{d['hero.cta2']}</span><ArrowIcon /></a>
          </div>
        </div>

        {/* Illustrative dashboard: a fixed-size stage scaled and placed per breakpoint in globals.css */}
        <div className="hero-visual" aria-hidden="true" data-anim="" style={vars({ '--delay': '.9s' })}>
          <div className="hv-stage">
            <svg className="hv-ring" viewBox="0 0 900 500">
              <defs>
                <linearGradient id="hvRing" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#e2ff4d" stopOpacity=".15" />
                  <stop offset=".5" stopColor="#e2ff4d" />
                  <stop offset="1" stopColor="#e2ff4d" stopOpacity=".3" />
                </linearGradient>
              </defs>
              <ellipse cx="450" cy="250" rx="420" ry="150" transform="rotate(-14 450 250)" fill="none" stroke="#d4ff3a" strokeWidth="14" opacity=".45" className="hv-ring-blur" />
              <ellipse cx="450" cy="250" rx="420" ry="150" transform="rotate(-14 450 250)" fill="none" stroke="url(#hvRing)" strokeWidth="3" />
            </svg>
            <div className="hv-glow" />

            <div className="hv-laptop">
              <div className="hv-screen">
                <div className="hv-screen-head">
                  <p className="hv-screen-title">{d['hero.dash']}</p>
                  <p className="hv-period"><span>{d['hero.period']}</span><HIcon name="chevron" /></p>
                </div>
                <div className="hv-chart">
                  <div className="hv-bars">
                    {BARS.map((h, n) => <i key={n} style={vars({ '--h': `${h}%`, '--n': n })} />)}
                  </div>
                  <svg className="hv-curve" viewBox="0 0 400 120" preserveAspectRatio="none">
                    <path d={curve.d} fill="none" stroke="#d4ff3a" strokeWidth="8" opacity=".35" className="hv-curve-glow" vectorEffect="non-scaling-stroke" />
                    <path d={curve.d} fill="none" stroke="#e2ff4d" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                  </svg>
                  <span className="hv-chart-badge">+245%</span>
                </div>
                <div className="hv-kpis">
                  {([['eye', '1.2M', 'hero.kViews'], ['users', '12K', 'hero.kLeads'], ['bars', '+245%', 'hero.kGrowth'], ['target', '4.8x', 'hero.kRoi']] as const).map(([ic, v, l]) => (
                    <div key={l} className="hv-kpi"><HIcon name={ic} /><b>{v}</b><span>{d[l]}</span></div>
                  ))}
                </div>
              </div>
              <div className="hv-base"><i /></div>
            </div>

            <StatCard id="spA" className="hv-card--1" icon="bars" label={d['hero.c1']} value="+245%" sub={d['hero.c1Sub']} spark={SPARK_A} />
            <StatCard id="spB" className="hv-card--2" icon="users" label={d['hero.c2']} value="+180%" spark={SPARK_B} />
            <StatCard id="spC" className="hv-card--3" icon="check" label={d['hero.c3']} value="4.8x" spark={SPARK_B} />
            <StatCard id="spD" className="hv-card--4" icon="bars" label={d['hero.c4']} value="+320%" spark={SPARK_A} />

            <span className="hv-tile hv-tile--brain"><HIcon name="brain" /></span>
            <span className="hv-tile hv-tile--target"><HIcon name="target" /></span>
            <span className="hv-tile hv-tile--bars"><HIcon name="bars" /></span>
          </div>
        </div>
      </div>

      <div className="container hero-stats" data-anim="" style={vars({ '--delay': '1s' })}>
        <ul className="hero-stats-list">
          {STATS.map(s => (
            <li key={s.label} className="hs-item">
              <span className="hs-ic"><HIcon name={s.icon} /></span>
              <span className="hs-tx"><b>{s.value}</b><span>{d[s.label]}</span></span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
