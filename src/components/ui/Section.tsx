import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type SectionProps = {
  id: string;
  title: string;
  children?: ReactNode;
  className?: string;
};

export function Section({ id, title, children, className }: SectionProps) {
  const titleId = `${id}-title`;

  return (
    <section id={id} aria-labelledby={titleId} className={cn('py-section', className)}>
      <div className="container-page">
        <h2 id={titleId} className="text-step-4 font-bold">
          {title}
        </h2>
        {children && <div className="mt-8 md:mt-12">{children}</div>}
      </div>
    </section>
  );
}
