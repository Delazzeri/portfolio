import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import type { I18n, Locale } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const defaultLocale: Locale = 'pt';

/** Resolve um texto `I18n` no idioma ativo (apenas PT até a Fase 5). */
export function t(value: I18n, locale: Locale = defaultLocale) {
  return value[locale];
}
