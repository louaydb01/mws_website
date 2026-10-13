import type { Dictionary, TextKey } from '@/lib/i18n';

// Scrolling band under the hero. The list is rendered twice so the CSS loop is seamless.
const ITEMS: Array<{ key?: TextKey; text?: string; lime: boolean }> = [
  { key: 's1.title', lime: true },
  { key: 's2.title', lime: true },
  { key: 's3.title', lime: true },
  { key: 's4.title', lime: true },
  { text: 'Meta & Google Ads', lime: false },
  { key: 'port.brand', lime: true },
  { text: 'Chatbot AI', lime: false },
  { text: 'CRM Dashboard', lime: false },
];

export function Ticker({ d }: { d: Dictionary }) {
  const list = ITEMS.map(i => ({ label: i.key ? d[i.key] : i.text!, lime: i.lime }));
  return (
    <div className="ticker" role="region" aria-label={list.map(i => i.label).join(', ')}>
      <div className="ticker-track" aria-hidden="true">
        {[0, 1].map(copy => (
          <ul key={copy} className="ticker-list">
            {list.map(i => (
              <li key={i.label} className={i.lime ? 'is-lime' : undefined}>
                <svg viewBox="0 0 24 24" className="ticker-star"><path d="M12 2.5l2.9 6.2 6.6.8-4.9 4.6 1.3 6.6L12 17.4l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" fill="currentColor" /></svg>
                <span>{i.label}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
