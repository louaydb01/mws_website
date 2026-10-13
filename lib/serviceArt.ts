// Deep-dive illustrations (480×370) for ServicesDetail, with translated mono labels.
// Rendered as SVG markup strings (static, server-side); animation hooks use the .art-* classes.

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const DEFS = `<defs>
<filter id="dd-gl" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<filter id="dd-gl2" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9"/></filter>
<radialGradient id="dd-gm" cx="50%" cy="50%" r="60%"><stop offset=".25" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
<mask id="dd-m"><rect width="480" height="370" fill="url(#dd-gm)"/></mask>
<linearGradient id="dd-ring" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f5f5f0" stop-opacity=".25"/><stop offset=".6" stop-color="#e2ff4d" stop-opacity=".5"/><stop offset="1" stop-color="#e2ff4d"/></linearGradient>
</defs>`;

function grid() {
  let l = '';
  for (let x = 0; x <= 480; x += 30) l += `<line x1="${x}" y1="0" x2="${x}" y2="370"/>`;
  for (let y = 0; y <= 370; y += 30) l += `<line x1="0" y1="${y}" x2="480" y2="${y}"/>`;
  let p = '';
  for (const [x, y] of [[30, 40], [450, 40], [30, 120], [450, 150], [30, 330], [450, 330], [30, 240], [450, 260]]) p += `<path d="M${x - 5} ${y}h10M${x} ${y - 5}v10"/>`;
  return `<g mask="url(#dd-m)" stroke="#f5f5f0" stroke-opacity=".05">${l}</g><g stroke="#f5f5f0" stroke-opacity=".25">${p}</g>`;
}
function label(x: number, y: number, a: string, b: string, lime = false) {
  return `<g direction="ltr" font-family="ui-monospace, 'Space Mono', monospace" font-size="9.5" letter-spacing="1"><circle cx="${x - 8}" cy="${y - 3}" r="2" fill="${lime ? '#e2ff4d' : '#f5f5f0'}"/><text x="${x}" y="${y}" fill="#f5f5f0" fill-opacity=".9">${esc(a.toUpperCase())}</text><text x="${x}" y="${y + 13}" fill="#f5f5f0" fill-opacity=".45">${esc(b.toUpperCase())}</text></g>`;
}
const node = (x: number, y: number, lime: boolean, r = 3.2) =>
  lime ? `<circle cx="${x}" cy="${y}" r="${r}" fill="#e2ff4d" filter="url(#dd-gl)"/>` : `<circle cx="${x}" cy="${y}" r="${r}" fill="#f5f5f0" fill-opacity=".85"/>`;

function marketing(l: string[]) {
  const cx = 240, cy = 225;
  const rings = ([[225, 92, 1], [175, 72, .3], [125, 52, .25], [82, 34, .35]] as const).map(([rx, ry, o], i) =>
    `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${i ? '#f5f5f0' : 'url(#dd-ring)'}" stroke-opacity="${o}"${i === 1 ? ' stroke-dasharray="2 4"' : ''}/>`).join('');
  const pts = [[140, 168], [195, 152], [290, 158], [352, 196], [100, 232], [150, 300], [270, 298], [345, 262], [398, 220], [370, 286], [118, 280]];
  return `${rings}
<ellipse cx="${cx}" cy="${cy}" rx="225" ry="92" fill="none" stroke="#e2ff4d" stroke-width="6" stroke-opacity=".25" filter="url(#dd-gl2)"/>
<ellipse class="art-pulse" cx="${cx}" cy="${cy}" rx="52" ry="21" fill="rgba(226,255,77,.12)" stroke="#e2ff4d" stroke-width="1.6" filter="url(#dd-gl)"/>
${[[226, 222], [252, 228], [240, 214], [262, 216], [218, 230]].map(([x, y]) => node(x, y, true, 3.4)).join('')}
${pts.map(([x, y], i) => node(x, y, i % 3 === 0, 2.8)).join('')}
<rect x="237" y="88" width="6" height="126" fill="#e2ff4d" opacity=".18"/><rect x="239.3" y="88" width="1.4" height="126" fill="#e2ff4d"/>
<g filter="url(#dd-gl)"><path d="M226 72l14-7 14 7v20l-14 7-14-7z" fill="#cfee2f"/><path d="M226 72l14 7 14-7-14-7z" fill="#eaff7a"/><path d="M240 79v20l14-7V72z" fill="#a8c41c"/></g>
<g stroke="#f5f5f0" stroke-opacity=".3"><line x1="70" y1="104" x2="70" y2="176"/><line x1="372" y1="120" x2="372" y2="172"/><line x1="92" y1="290" x2="92" y2="336"/><line x1="370" y1="288" x2="370" y2="344"/></g>
${node(70, 178, true, 2.6)}${node(372, 174, false, 2.4)}${node(92, 288, false, 2.4)}${node(370, 286, false, 2.4)}
${label(78, 100, l[0], l[1])}${label(380, 116, l[2], l[3], true)}${label(100, 342, l[4], l[5], true)}${label(378, 350, l[6], l[7], true)}`;
}
function ai(l: string[]) {
  const L1 = [[90, 110], [90, 165], [90, 220], [90, 275]], L2 = [[240, 85], [240, 140], [240, 195], [240, 250], [240, 305]], L3 = [[390, 140], [390, 195], [390, 250]];
  let net = '';
  for (const a of L1) for (const b of L2) net += `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}"/>`;
  for (const a of L2) for (const b of L3) net += `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}"/>`;
  return `<g stroke="#f5f5f0" stroke-opacity=".09">${net}</g>
<g class="art-flow" stroke="#e2ff4d" stroke-width="1.6" fill="none" filter="url(#dd-gl)" stroke-dasharray="5 6"><path d="M90 165L240 195L390 195"/><path d="M90 220L240 195"/><path d="M240 195L390 140"/></g>
${[...L1, ...L2, ...L3].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="#0e0e0d" stroke="#f5f5f0" stroke-opacity=".45"/>`).join('')}
${[[90, 165], [90, 220], [240, 195], [390, 140]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6.5" fill="#e2ff4d" filter="url(#dd-gl)"/>`).join('')}
<circle class="art-pulse" cx="390" cy="195" r="18" fill="rgba(226,255,77,.12)" stroke="#e2ff4d" stroke-opacity=".7"/><circle cx="390" cy="195" r="7" fill="#e2ff4d"/>
${label(60, 70, l[0], l[1])}${label(212, 52, l[2], l[3], true)}${label(352, 105, l[4], l[5], true)}${label(352, 290, l[6], l[7], true)}`;
}
function web(l: string[]) {
  return `<rect x="52" y="60" width="376" height="236" rx="12" fill="rgba(245,245,240,.025)" stroke="#f5f5f0" stroke-opacity=".2"/>
<path d="M52 88h376" stroke="#f5f5f0" stroke-opacity=".14"/>
<g fill="#f5f5f0" fill-opacity=".25"><circle cx="70" cy="74" r="3.5"/><circle cx="84" cy="74" r="3.5"/></g><circle cx="98" cy="74" r="3.5" fill="#e2ff4d" filter="url(#dd-gl)"/>
<rect x="150" y="69" width="180" height="10" rx="5" fill="#f5f5f0" fill-opacity=".08"/>
<g fill="#f5f5f0"><rect x="78" y="114" width="170" height="14" rx="3" fill-opacity=".55"/><rect x="78" y="136" width="128" height="14" rx="3" fill-opacity=".55"/><rect x="78" y="162" width="186" height="6" rx="3" fill-opacity=".18"/><rect x="78" y="174" width="156" height="6" rx="3" fill-opacity=".18"/></g>
<rect x="78" y="196" width="104" height="30" rx="6" fill="#e2ff4d" filter="url(#dd-gl)"/><rect x="192" y="196" width="78" height="30" rx="6" fill="none" stroke="#f5f5f0" stroke-opacity=".25"/>
<rect x="290" y="110" width="118" height="118" rx="8" fill="rgba(226,255,77,.05)" stroke="#e2ff4d" stroke-opacity=".35"/>
<path class="art-flow" d="M300 212c22-2 34-14 46-30s26-38 54-46" fill="none" stroke="#e2ff4d" stroke-width="1.8"/>${node(354, 172, true, 3)}${node(398, 138, true, 3)}
<g fill="#f5f5f0" fill-opacity=".07"><rect x="78" y="248" width="100" height="26" rx="4"/><rect x="190" y="248" width="100" height="26" rx="4"/><rect x="302" y="248" width="106" height="26" rx="4"/></g>
<path class="art-cursor" d="M162 218v20l5-5 4 9 3-1.5-4-8.5h7z" fill="#f5f5f0" stroke="#0a0a0a" stroke-width="1.2" stroke-linejoin="round"/>
${label(40, 40, l[0], l[1])}${label(360, 40, l[2], l[3], true)}${label(40, 330, l[4], l[5], true)}${label(360, 330, l[6], l[7], true)}`;
}

export type ArtKind = 'marketing' | 'ai' | 'web';
export function serviceArt(kind: ArtKind, labels: readonly string[]) {
  const l = [...labels];
  const body = kind === 'marketing' ? marketing(l) : kind === 'ai' ? ai(l) : web(l);
  return DEFS + grid() + body;
}
