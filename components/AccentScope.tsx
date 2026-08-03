import type { CSSProperties } from 'react';
import type { ProjectType } from '@/lib/types';

const accentVar: Record<'design' | 'code' | 'all', string> = {
  design: 'var(--accent-design)',
  code: 'var(--accent-code)',
  all: 'var(--accent-all)',
};

export function AccentScope({
  section,
  children,
}: {
  section: ProjectType | 'all';
  children: React.ReactNode;
}) {
  return <div style={{ '--accent': accentVar[section] } as CSSProperties}>{children}</div>;
}
