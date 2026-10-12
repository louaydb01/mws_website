// GROWTH WAVE — canvas renderer
// Four strands (one per expertise) start apart, converge, and rise together
// as a single signal: the MWS wave.

export type WavePalette = 'dark' | 'light';

export interface WaveGeometry {
  floor: number;
  peak: number;
  convX: number;
  riseFrom: number;
  band: number;
  gap: number;
  amp: number;
  nodes: number[];
}

export interface WaveOptions {
  host: HTMLElement;
  palette?: WavePalette;
  seed?: number;
  geometry: (width: number, height: number) => WaveGeometry;
}

export interface WaveInstance {
  resize: () => void;
  setFocus: (index: number) => void;
  destroy: () => void;
}

interface Palette {
  strand: string; strandEnd: string; strandA: [number, number]; focus: string;
  glow: string; glowW: number; glowA: number; core: string; coreW: number; coreA: number;
  tick: string; nodeFill: string; node: string; pulse: string; pulseA: number; pulseCore: string;
}

const PALETTES: Record<WavePalette, Palette> = {
  // dark stage: cream strands turning lime, glowing lime signal
  dark: {
    strand: '245,245,240', strandEnd: '226,255,77', strandA: [.07, .16], focus: '226,255,77',
    glow: '226,255,77', glowW: 8, glowA: .12, core: '226,255,77', coreW: 1.5, coreA: .9,
    tick: '245,245,240', nodeFill: '#0a0a0a', node: '226,255,77', pulse: '226,255,77', pulseA: .5, pulseCore: '#f4ffc2',
  },
  // cream stage: ink strands, ink signal drawn over a lime highlighter stroke
  light: {
    strand: '10,10,10', strandEnd: '10,10,10', strandA: [.06, .14], focus: '10,10,10',
    glow: '226,255,77', glowW: 11, glowA: 1, core: '10,10,10', coreW: 1.6, coreA: .9,
    tick: '10,10,10', nodeFill: '#f2f0ea', node: '10,10,10', pulse: '226,255,77', pulseA: .95, pulseCore: '#0a0a0a',
  },
};

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const smooth = (a: number, b: number, x: number) => { const u = clamp((x - a) / (b - a), 0, 1); return u * u * (3 - 2 * u); };

export function createWave(canvas: HTMLCanvasElement, cfg: WaveOptions): WaveInstance | null {
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  const { host } = cfg;
  const P = PALETTES[cfg.palette ?? 'dark'];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const S = {
    W: 1, H: 1, dpr: 1, k: 8, step: 6, g: null as WaveGeometry | null, t: cfg.seed ?? 0, last: 0, raf: 0,
    inView: false, still: reducedMotion.matches, rtl: false,
    focus: [0, 0, 0, 0], focusT: [0, 0, 0, 0], px: .5, py: .5, pxT: .5, pyT: .5, ps: 0, psT: 0,
  };
  let gLine: CanvasGradient, gFocus: CanvasGradient, gGlow: CanvasGradient, gCore: CanvasGradient;
  let idle = 0;
  const grad = (stops: [number, string][]) => {
    const g = ctx.createLinearGradient(0, 0, S.W, 0);
    stops.forEach(([o, c]) => g.addColorStop(clamp(o, 0, 1), c));
    return g;
  };

  function resize() {
    const r = host.getBoundingClientRect();
    S.W = Math.max(1, Math.round(r.width));
    S.H = Math.max(1, Math.round(r.height));
    const small = S.W < 768;
    S.dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2);
    canvas.width = Math.round(S.W * S.dpr);
    canvas.height = Math.round(S.H * S.dpr);
    S.k = small ? 5 : 8;
    S.step = small ? 7 : 6;
    S.rtl = document.documentElement.dir === 'rtl';
    S.g = cfg.geometry(S.W, S.H);
    const c = S.g.convX;
    gLine = grad([[0, `rgba(${P.strand},0)`], [.14, `rgba(${P.strand},1)`], [c - .08, `rgba(${P.strand},1)`], [c + .14, `rgba(${P.strandEnd},1)`], [1, `rgba(${P.strandEnd},1)`]]);
    gFocus = grad([[0, `rgba(${P.focus},0)`], [.12, `rgba(${P.focus},1)`], [1, `rgba(${P.focus},1)`]]);
    gGlow = grad([[c - .2, `rgba(${P.glow},0)`], [c + .08, `rgba(${P.glow},1)`], [1, `rgba(${P.glow},1)`]]);
    gCore = grad([[c - .2, `rgba(${P.core},0)`], [c + .08, `rgba(${P.core},1)`], [1, `rgba(${P.core},1)`]]);
    draw();
  }

  // y position of strand line (bundle b, line j) at horizontal position u ∈ [0,1]
  function yAt(u: number, b: number, j: number) {
    const g = S.g as WaveGeometry, t = S.t, mid = (S.k - 1) / 2;
    const conv = smooth(.04, g.convX, u);
    const r = clamp((u - g.riseFrom) / (1.12 - g.riseFrom), 0, 1);
    const lift = r * r * (3 - 2 * r);
    const spread = 1 - .9 * conv;
    const amp = g.amp * (.5 + .5 * (1 - conv)) * (1 - .35 * lift);
    const ph = (1 - conv) * (b * 1.9 + .6);
    let y = g.floor + (g.peak - g.floor) * lift
      + (b - 1.5) * g.band * spread + (j - mid) * g.gap * (.4 + .6 * spread)
      + Math.sin(u * 6.4 - t * .55 + ph + j * .04) * amp
      + Math.sin(u * 14 + t * .8 + b * 2.1) * amp * .3 * (1 - conv)
      + Math.sin(u * 2.6 - t * .3) * amp * .6 * conv;
    if (S.ps > .002) {
      const dx = u - S.px;
      y += clamp(S.py * S.H - y, -150, 150) * .18 * S.ps * Math.exp(-(dx * dx) / .012);
    }
    return y;
  }

  function draw() {
    const { W, H, dpr, k, step, g } = S;
    if (!g) return;
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx!.clearRect(0, 0, W, H);
    if (S.rtl) ctx!.setTransform(-dpr, 0, 0, dpr, W * dpr, 0);
    const c2 = ctx!;
    c2.lineCap = 'round';
    c2.lineJoin = 'round';
    const n = Math.ceil(W / step);
    const mid = (k - 1) / 2;
    const fMax = Math.max(S.focus[0], S.focus[1], S.focus[2], S.focus[3]);

    // strands
    c2.lineWidth = 1;
    for (let b = 0; b < 4; b++) {
      const f = S.focus[b];
      for (let j = 0; j < k; j++) {
        const c = 1 - Math.abs(j - mid) / (mid || 1);
        c2.beginPath();
        for (let i = 0; i <= n; i++) {
          const x = Math.min(i * step, W);
          const y = yAt(x / W, b, j);
          if (i) c2.lineTo(x, y); else c2.moveTo(x, y);
        }
        c2.globalAlpha = (P.strandA[0] + P.strandA[1] * c) * (1 - .55 * fMax * (1 - f));
        c2.strokeStyle = gLine;
        c2.stroke();
        if (f > .01) { c2.globalAlpha = f * (.22 + .5 * c); c2.strokeStyle = gFocus; c2.stroke(); }
      }
    }

    // signal line
    const i0 = Math.floor(Math.max(0, g.convX - .24) * W / step);
    c2.beginPath();
    for (let i = i0; i <= n; i++) {
      const x = Math.min(i * step, W);
      const y = yAt(x / W, 1.5, mid);
      if (i === i0) c2.moveTo(x, y); else c2.lineTo(x, y);
    }
    c2.strokeStyle = gGlow; c2.globalAlpha = P.glowA; c2.lineWidth = P.glowW; c2.stroke();
    c2.strokeStyle = gCore; c2.globalAlpha = P.coreA; c2.lineWidth = P.coreW; c2.stroke();

    // travelling pulse
    let pu = -1, pa = 0;
    if (!S.still) {
      const period = 5.6, p = (S.t % period) / period;
      const e = p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      const u0 = g.convX - .1;
      pu = u0 + (1.02 - u0) * e;
      pa = Math.sin(Math.PI * p);
    }

    // measurement nodes
    c2.lineWidth = 1;
    g.nodes.forEach(u => {
      const x = u * W, y = yAt(u, 1.5, mid);
      const near = pu < 0 ? 0 : Math.max(0, 1 - Math.abs(u - pu) / .05);
      c2.globalAlpha = .14;
      c2.strokeStyle = `rgba(${P.tick},1)`;
      c2.setLineDash([2, 4]);
      c2.beginPath(); c2.moveTo(x, y + 8); c2.lineTo(x, Math.max(y + 8, g.floor + g.band * 2.4)); c2.stroke();
      c2.setLineDash([]);
      c2.globalAlpha = 1;
      c2.fillStyle = P.nodeFill;
      c2.strokeStyle = `rgba(${P.node},${.55 + .45 * near})`;
      c2.beginPath(); c2.arc(x, y, 3.5 + near * 2.5, 0, Math.PI * 2); c2.fill(); c2.stroke();
    });

    if (pu > 0 && pa > .01) {
      const uu = Math.min(pu, 1), x = uu * W, y = yAt(uu, 1.5, mid);
      const rg = c2.createRadialGradient(x, y, 0, x, y, 42);
      rg.addColorStop(0, `rgba(${P.pulse},${P.pulseA})`);
      rg.addColorStop(1, `rgba(${P.pulse},0)`);
      c2.globalAlpha = pa;
      c2.fillStyle = rg;
      c2.beginPath(); c2.arc(x, y, 42, 0, Math.PI * 2); c2.fill();
      c2.fillStyle = P.pulseCore;
      c2.beginPath(); c2.arc(x, y, 2.4, 0, Math.PI * 2); c2.fill();
    }
    c2.globalAlpha = 1;
  }

  function tick(now: number) {
    S.raf = requestAnimationFrame(tick);
    const dt = S.last ? Math.min(.05, (now - S.last) / 1000) : .016;
    S.last = now;
    S.t += dt;
    const kf = Math.min(1, dt * 5), kp = Math.min(1, dt * 4);
    for (let b = 0; b < 4; b++) S.focus[b] += (S.focusT[b] - S.focus[b]) * kf;
    S.px += (S.pxT - S.px) * kp;
    S.py += (S.pyT - S.py) * kp;
    S.ps += (S.psT - S.ps) * Math.min(1, dt * 2.5);
    draw();
  }
  const start = () => { if (S.raf || S.still || !S.inView || document.hidden) return; S.last = 0; S.raf = requestAnimationFrame(tick); };
  const stop = () => { if (S.raf) cancelAnimationFrame(S.raf); S.raf = 0; };
  const onMotionPref = () => { S.still = reducedMotion.matches; if (S.still) { stop(); draw(); } else start(); };
  const onVisibility = () => { if (document.hidden) stop(); else start(); };

  function setFocus(i: number) {
    for (let b = 0; b < 4; b++) S.focusT[b] = b === i ? 1 : 0;
    if (S.still) { S.focus = S.focusT.slice(); draw(); }
  }

  const onPointerMove = (e: PointerEvent) => {
    if (!finePointer.matches || S.still) return;
    const r = host.getBoundingClientRect();
    let x = (e.clientX - r.left) / r.width;
    if (S.rtl) x = 1 - x;
    const y = (e.clientY - r.top) / r.height;
    if (S.ps < .02) { S.px = x; S.py = y; }
    S.pxT = x; S.pyT = y; S.psT = 1;
    window.clearTimeout(idle);
    idle = window.setTimeout(() => { S.psT = 0; }, 1600);
  };
  const onPointerLeave = () => { S.psT = 0; };

  host.addEventListener('pointermove', onPointerMove, { passive: true });
  host.addEventListener('pointerleave', onPointerLeave);
  document.addEventListener('visibilitychange', onVisibility);
  reducedMotion.addEventListener('change', onMotionPref);

  resize();
  const io = new IntersectionObserver(([entry]) => { S.inView = entry.isIntersecting; if (S.inView) start(); else stop(); });
  io.observe(host);
  let q = 0;
  const ro = new ResizeObserver(() => { cancelAnimationFrame(q); q = requestAnimationFrame(resize); });
  ro.observe(host);

  return {
    resize,
    setFocus,
    destroy() {
      stop();
      cancelAnimationFrame(q);
      window.clearTimeout(idle);
      io.disconnect();
      ro.disconnect();
      host.removeEventListener('pointermove', onPointerMove);
      host.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      reducedMotion.removeEventListener('change', onMotionPref);
    },
  };
}

// Places the wave between an element's bottom edge (the CTAs) and a floor element (or the section bottom).
export function waveGeometry(host: HTMLElement, topEl: Element | null, floorEl: Element | null, peakRatio: number) {
  return (W: number, H: number): WaveGeometry => {
    const hr = host.getBoundingClientRect();
    const top = topEl ? topEl.getBoundingClientRect().bottom - hr.top : H * .6;
    const bottom = floorEl ? floorEl.getBoundingClientRect().top - hr.top : H - 24;
    const gap = Math.max(90, bottom - top);
    const desk = W >= 1024;
    return {
      floor: top + gap * (desk ? .55 : .6),
      peak: desk ? Math.max(110, H * peakRatio) : top + gap * .12,
      convX: desk ? .56 : .42,
      riseFrom: desk ? .5 : .34,
      band: clamp(gap * .15, 9, 30),
      gap: desk ? 3.4 : 2.8,
      amp: clamp(gap * .08, 6, 20),
      nodes: desk ? [.7, .83, .95] : [.7, .9],
    };
  };
}
