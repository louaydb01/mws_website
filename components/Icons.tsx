// Inline SVG sprite: every icon is declared once and referenced with <use>.
const SPRITE = `
<symbol id="i-arrow" viewBox="0 0 24 24"><path d="M4.5 12h15M13.5 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="i-arrow-up" viewBox="0 0 24 24"><path d="M7 17 17 7M8.5 7H17v8.5" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="i-target" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/></g><circle cx="12" cy="12" r="1.4" fill="currentColor"/></symbol>
<symbol id="i-ai" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6.5" y="6.5" width="11" height="11" rx="2.5"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3"/></g><path d="M12 9.1l.95 1.95 1.95.95-1.95.95L12 14.9l-.95-1.95L9.1 12l1.95-.95z" fill="currentColor"/></symbol>
<symbol id="i-code" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 8.5h18M10 12.5l-2 2 2 2M14 12.5l2 2-2 2"/></g></symbol>
<symbol id="i-bag" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5.5 8h13l-1 12.5h-11z"/><path d="M9 10V6.8a3 3 0 0 1 6 0V10"/></g></symbol>
<symbol id="i-brand" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.8 18.5 9 13 20.5h-2L5.5 9z"/><path d="M12 2.8v8.4"/><circle cx="12" cy="12.6" r="1.4"/></g></symbol>
<symbol id="i-spark" viewBox="0 0 24 24"><path d="M12 3.5l1.9 5.6 5.6 1.9-5.6 1.9L12 18.5l-1.9-5.6L4.5 11l5.6-1.9z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></symbol>
<symbol id="i-link" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M9.5 14.5l5-5"/><path d="M11 6.5l1.3-1.3a4 4 0 0 1 5.6 5.6L16.5 12M13 17.5l-1.3 1.3a4 4 0 0 1-5.6-5.6L7.5 12"/></g></symbol>
<symbol id="i-chart" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M3.5 20.5h17"/><path d="M7 16.5v-4M12 16.5v-8M17 16.5V5.5"/></g></symbol>
<symbol id="i-globe" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.6 3.8 5.6 3.8 9s-1.2 6.4-3.8 9M12 3c-2.6 2.6-3.8 5.6-3.8 9s1.2 6.4 3.8 9"/></g></symbol>
<symbol id="i-phone" viewBox="0 0 24 24"><path d="M5.2 4h3.3l1.6 4.1-2.1 1.4a11 11 0 0 0 6.5 6.5l1.4-2.1 4.1 1.6v3.3a1.2 1.2 0 0 1-1.2 1.2A16 16 0 0 1 4 5.2 1.2 1.2 0 0 1 5.2 4z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></symbol>
<symbol id="i-mail" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 7l8.5 6 8.5-6"/></g></symbol>
<symbol id="i-pin" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" stroke-linejoin="round"/><circle cx="12" cy="9.5" r="2.5"/></g></symbol>
<symbol id="i-wa" viewBox="0 0 24 24"><path fill="currentColor" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35M12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 0 0-3.48-8.41z"/></symbol>`;

export function IconSprite() {
  return (
    <svg className="sprite" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"
      dangerouslySetInnerHTML={{ __html: SPRITE }} />
  );
}

export type IconName =
  | 'arrow' | 'arrow-up' | 'target' | 'ai' | 'code' | 'bag' | 'brand' | 'spark'
  | 'link' | 'chart' | 'globe' | 'phone' | 'mail' | 'pin' | 'wa';

export function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  return (
    <svg className={`i ${className}`.trim()} aria-hidden="true" focusable="false">
      <use href={`#i-${name}`} />
    </svg>
  );
}

// Forward arrow that flips in RTL and nudges on hover (see .i-arrow in globals.css).
export function ArrowIcon() {
  return <Icon name="arrow" className="i-arrow" />;
}
