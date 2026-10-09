import { Mail } from 'lucide-react';

import type { Contact } from '@/lib/types';
import { cn } from '@/lib/utils';

import { BrandIcon } from './BrandIcon';

type ContactIconProps = {
  kind: Contact['kind'];
  className?: string;
};

export function ContactIcon({ kind, className }: ContactIconProps) {
  if (kind === 'email') {
    return <Mail aria-hidden className={cn('size-5 shrink-0', className)} />;
  }
  return <BrandIcon name={kind} className={className} />;
}
