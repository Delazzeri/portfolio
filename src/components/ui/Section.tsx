import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type SectionProps = {
  id: string;
  title: string;
  children?: ReactNode;
  className?: string;
  /** Título e conteúdo centralizados. */
  centered?: boolean;
};

export function Section({ id, title, children, className, centered = false }: SectionProps) {
  const titleId = `${id}-title`;

  return (
    <section id={id} aria-labelledby={titleId} className={cn('py-section', className)}>
      <div className="container-page">
        <h2 id={titleId} className={cn('text-step-4 font-bold', centered && 'text-center')}>
          {title}
        </h2>
        {children && <div className="mt-8 md:mt-12">{children}</div>}
      </div>
    </section>
  );
}
