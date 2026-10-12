import type { Dictionary, TextKey } from '@/lib/i18n';
import { vars } from '@/lib/css';
import { Icon } from './Icons';
import { SectionHead } from './SectionHead';

const POSTS: Array<{ cat: TextKey; n: 1 | 2 | 3 | 4 | 5 | 6 }> = [
  { cat: 'blog.cat.ai', n: 1 },
  { cat: 'blog.cat.automation', n: 2 },
  { cat: 'blog.cat.marketing', n: 3 },
  { cat: 'blog.cat.freelance', n: 4 },
  { cat: 'blog.cat.design', n: 5 },
  { cat: 'blog.cat.ai', n: 6 },
];

export function Blog({ d }: { d: Dictionary }) {
  return (
    <section className="section section--rule" aria-labelledby="blogTitle">
      <div className="container">
        <SectionHead id="blogTitle" eyebrow={d['nav.blog']} title={d['blog.title']} lead={d['blog.desc']} />
        <div className="blog-grid">
          {POSTS.map(({ cat, n }, i) => (
            <article key={n} className="blog-card reveal" style={vars({ '--d': i % 3 })}>
              <div className="blog-meta">
                <span className="blog-tag kicker">{d[cat]}</span>
                <span className="blog-date">{d[`blog.b${n}.read`]}</span>
              </div>
              <h3>{d[`blog.b${n}.title`]}</h3>
              <p>{d[`blog.b${n}.excerpt`]}</p>
              {/* No article pages exist yet: each card opens a conversation with the team */}
              <a href="#contact-page" className="link-arrow blog-readmore">
                <span>{d['blog.cta']}</span><Icon name="arrow-up" className="i-flip" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
