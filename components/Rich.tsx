import { Fragment, type ReactNode } from 'react';

// Renders the small inline markup used in the dictionaries
// (<em>, <span class='muted'>, <span class='red'>, <br>) as real React elements.
const TOKEN = /<em>(.*?)<\/em>|<span class='(muted|red)'>(.*?)<\/span>|<br\s*\/?>/g;

export function Rich({ text }: { text: string }) {
  const out: ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const m of text.matchAll(TOKEN)) {
    const index = m.index ?? 0;
    if (index > last) out.push(text.slice(last, index));
    if (m[1] !== undefined) out.push(<em key={key++}>{m[1]}</em>);
    else if (m[2]) out.push(<span key={key++} className={m[2]}>{m[3]}</span>);
    else out.push(<br key={key++} />);
    last = index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <Fragment>{out}</Fragment>;
}

// Plain text version (meta tags, aria labels, WhatsApp messages).
export function stripMarkup(text: string) {
  return text.replace(/<[^>]+>/g, '');
}
