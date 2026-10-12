import { fr, type Dictionary } from './dictionaries/fr';
import { ar } from './dictionaries/ar';
import { en } from './dictionaries/en';
import { es } from './dictionaries/es';

export type { Dictionary };

/** Dictionary keys whose value is a plain string (excludes lists such as testimonials). */
export type TextKey = { [K in keyof Dictionary]: Dictionary[K] extends string ? K : never }[keyof Dictionary];

// French keeps the historical URL "/"; the other languages live under "/ar/", "/en/", "/es/".
export const LOCALES = ['ar', 'fr', 'en', 'es'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'fr';
export const PREFIXED_LOCALES = LOCALES.filter(l => l !== DEFAULT_LOCALE);

const DICTIONARIES: Record<Locale, Dictionary> = { ar, fr, en, es };

export const LOCALE_INFO: Record<Locale, { code: string; native: string; og: string }> = {
  ar: { code: 'AR', native: 'العربية', og: 'ar_MA' },
  fr: { code: 'FR', native: 'Français', og: 'fr_MA' },
  en: { code: 'EN', native: 'English', og: 'en_US' },
  es: { code: 'ES', native: 'Español', og: 'es_ES' },
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

export function dirOf(locale: Locale): 'rtl' | 'ltr' {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

export function localePath(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? '/' : `/${locale}/`;
}

export const LANG_STORAGE_KEY = 'mws-lang';
