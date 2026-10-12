'use client';

import { useEffect } from 'react';
import { whenLoaded } from '@/lib/loaded';

// Page-wide behaviours that don't belong to a single section:
// load choreography, scroll reveals and the card spotlight.
export function ClientEffects() {
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add('js-ready');

    let cancelled = false;
    whenLoaded().then(() => {
      if (cancelled) return;
      html.classList.add('is-loaded');
      document.getElementById('heroTitle')?.classList.add('is-revealed');
    });

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    const onPointerMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest?.('[data-spotlight]') as HTMLElement | null;
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    document.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      cancelled = true;
      io.disconnect();
      document.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  return null;
}
