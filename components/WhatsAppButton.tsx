import { waLink } from '@/lib/site';
import { Icon } from './Icons';

export function WhatsAppButton() {
  return (
    <a href={waLink('Hello')} target="_blank" rel="noopener" className="whatsapp-btn" aria-label="WhatsApp">
      <Icon name="wa" />
    </a>
  );
}
