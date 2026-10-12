export const SITE_URL = 'https://www.marketwavesolution.com';
export const GTM_ID = 'GTM-WKKXF5RF';

// Placeholder contact details carried over from the original site.
// Replace them here — every link, form and structured-data entry reads from this object.
export const CONTACT = {
  whatsapp: '212600000000',
  phoneHref: '+212600000000',
  phoneDisplay: '+212 6XX-XXXXXX',
  email: 'contact@mws.ma',
};

// Social profiles still point to "#" on the original site.
export const SOCIAL = [
  { label: 'LinkedIn', short: 'in', href: '#' },
  { label: 'Instagram', short: 'ig', href: '#' },
  { label: 'Facebook', short: 'fb', href: '#' },
  { label: 'TikTok', short: 'tt', href: '#' },
];

export function waLink(text?: string) {
  return `https://wa.me/${CONTACT.whatsapp}` + (text ? `?text=${encodeURIComponent(text)}` : '');
}

// No form backend: messages are relayed to WhatsApp (as the original newsletter did).
export function openWhatsApp(text: string) {
  const url = waLink(text);
  const win = window.open(url, '_blank');
  if (win) {
    try { win.opener = null; } catch {}
  } else {
    window.location.href = url;
  }
}
