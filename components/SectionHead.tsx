import type { ReactNode } from 'react';
import { Rich } from './Rich';

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="eyebrow kicker"><span className="eyebrow-mark" aria-hidden="true" /><span>{children}</span></p>
  );
}

export function SectionHead({ id, eyebrow, title, lead, split = true }: {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  split?: boolean;
}) {
  return (
    <header className={`sec-head${split ? ' sec-head--split' : ''} reveal`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="h2" id={id}><Rich text={title} /></h2>
      {lead && <p className="lead">{lead}</p>}
    </header>
  );
}
