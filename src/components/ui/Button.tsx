import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

type ButtonLinkProps = ComponentProps<'a'> & {
  variant?: 'primary' | 'outline';
};

const variants = {
  primary: 'bg-primary text-primary-foreground shadow-sm hover:opacity-90',
  outline: 'border border-border bg-surface text-foreground hover:bg-surface-elevated',
} satisfies Record<NonNullable<ButtonLinkProps['variant']>, string>;

/** Link com aparência de botão (todos os CTAs do site navegam ou baixam algo). */
export function ButtonLink({ variant = 'primary', className, ...props }: ButtonLinkProps) {
  return (
    <a
      className={cn(
        'inline-flex h-11 items-center justify-center gap-2 rounded-md px-5 text-step--1 font-semibold transition',
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
