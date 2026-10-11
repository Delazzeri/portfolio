import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { monthNames } from '@/content/ui';

import type { I18n, Locale, Project } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const defaultLocale: Locale = 'pt';

/** Resolve um texto `I18n` no idioma ativo (apenas PT até a Fase 5). */
export function t(value: I18n, locale: Locale = defaultLocale) {
  return value[locale];
}

/** "Outubro de 2026" / "October 2026", ou só "2026" quando o projeto não tem mês. */
export function projectDate(
  { year, month }: Pick<Project, 'year' | 'month'>,
  locale: Locale = defaultLocale,
) {
  const name = month ? monthNames[month - 1] : undefined;
  if (!name) return String(year);
  return locale === 'pt' ? `${t(name, locale)} de ${year}` : `${t(name, locale)} ${year}`;
}
