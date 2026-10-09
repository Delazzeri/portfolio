import { cn } from '@/lib/utils';

import { brandPaths, isBrandIconName } from './brand-paths';

type BrandIconProps = {
  name: string;
  className?: string;
};

/** Logo de marca monocromático (decorativo). Nome desconhecido não renderiza nada. */
export function BrandIcon({ name, className }: BrandIconProps) {
  if (!isBrandIconName(name)) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      focusable="false"
      className={cn('size-5 shrink-0', className)}
    >
      <path d={brandPaths[name]} />
    </svg>
  );
}
