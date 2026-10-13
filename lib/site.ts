export const SITE_URL = 'https://www.marketwavesolution.com';
export const GTM_ID = 'GTM-WKKXF5RF';

// Contact details — every link, form and structured-data entry reads from this object.
// WhatsApp (Morocco) and phone calls (US line) are two different numbers.
export const CONTACT = {
  whatsapp: '212696202392',
  waDisplay: '+212 696-202392',
  phoneHref: '+12513734883',
  phoneDisplay: '+1 251-373-4883',
  email: 'admin@marketwavesolution.com',
  phonePlaceholder: '+212 6 12 34 56 78',
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
