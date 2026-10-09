import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-sm border border-border bg-background px-2 py-0.5 text-step--1 font-medium text-muted',
        className,
      )}
    >
      {children}
    </span>
  );
}
