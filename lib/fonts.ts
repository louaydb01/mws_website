import { Inter, Playfair_Display, Space_Mono, Tajawal } from 'next/font/google';

// Self-hosted at build time by next/font (no request to Google at runtime).
const inter = Inter({ subsets: ['latin'], axes: ['opsz'], variable: '--font-inter', display: 'swap' });

// Playfair is split in two so each page only loads the faces it uses:
// 900 for the MWS logo mark, 600 italic for the highlighted headline phrase.
const playfairLogo = Playfair_Display({ subsets: ['latin'], weight: '900', variable: '--font-playfair', display: 'swap', preload: false });
const playfairItalic = Playfair_Display({ subsets: ['latin'], weight: '600', style: 'italic', variable: '--font-playfair-italic', display: 'swap' });

const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-spacemono', display: 'swap', preload: false });
const tajawal = Tajawal({ subsets: ['arabic', 'latin'], weight: ['400', '500', '700', '800'], variable: '--font-tajawal', display: 'swap', preload: false });

export const fontVariables = [inter, playfairLogo, playfairItalic, spaceMono, tajawal].map(f => f.variable).join(' ');
