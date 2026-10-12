'use client';

import { useEffect, useRef } from 'react';
import { createWave, waveGeometry, type WavePalette } from '@/lib/growthWave';
import { whenLoaded } from '@/lib/loaded';

type Props = {
  className: string;
  palette: WavePalette;
  seed: number;
  /** element whose bottom edge sits above the wave (the CTA row) */
  topSelector: string;
  /** element whose top edge sits below the wave; section bottom when omitted */
  floorSelector?: string;
  /** hovering/focusing these elements highlights the matching strand */
  focusSelector?: string;
  peakRatio?: number;
};

// The canvas fills its parent section, which is also the geometry host.
export function WaveCanvas({ className, palette, seed, topSelector, floorSelector, focusSelector, peakRatio = 0.2 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const wave = createWave(canvas, {
      host,
      palette,
      seed,
      geometry: waveGeometry(host, host.querySelector(topSelector), floorSelector ? host.querySelector(floorSelector) : null, peakRatio),
    });
    if (!wave) return;

    const cleanups: Array<() => void> = [];
    if (focusSelector) {
      host.querySelectorAll(focusSelector).forEach((el, i) => {
        const on = () => wave.setFocus(i);
        const off = () => wave.setFocus(-1);
        el.addEventListener('pointerenter', on);
        el.addEventListener('pointerleave', off);
        el.addEventListener('focus', on);
        el.addEventListener('blur', off);
        cleanups.push(() => {
          el.removeEventListener('pointerenter', on);
          el.removeEventListener('pointerleave', off);
          el.removeEventListener('focus', on);
          el.removeEventListener('blur', off);
        });
      });
    }

    let alive = true;
    whenLoaded().then(() => { if (alive) wave.resize(); });

    return () => {
      alive = false;
      cleanups.forEach(fn => fn());
      wave.destroy();
    };
  }, [palette, seed, topSelector, floorSelector, focusSelector, peakRatio]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
