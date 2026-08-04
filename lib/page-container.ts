import { clsx } from 'clsx';

export function pageContainer(...classNames: (string | undefined | false)[]): string {
  return clsx('mx-auto max-w-6xl px-4 sm:px-6', ...classNames);
}
