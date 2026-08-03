import type { AppLocale } from '@/i18n/routing';

export function pickLocale(pt: string, en: string, locale: AppLocale): string {
  const primary = locale === 'pt' ? pt : en;
  const fallback = locale === 'pt' ? en : pt;
  return primary || fallback;
}
