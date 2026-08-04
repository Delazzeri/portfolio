import { clsx } from 'clsx';

export function glassCard(...classNames: (string | undefined | false)[]): string {
  return clsx(
    'overflow-hidden rounded-[28px] border border-hairline bg-surface-solid',
    ...classNames,
  );
}
