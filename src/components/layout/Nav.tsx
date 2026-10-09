'use client';

import { sections, ui } from '@/content/ui';
import { useActiveSection } from '@/lib/use-active-section';
import { cn, t } from '@/lib/utils';

const sectionIds = sections.map((s) => s.id);

export function Nav() {
  const active = useActiveSection(sectionIds);

  return (
    <nav aria-label={t(ui.nav.label)} className="hidden md:block">
      <ul className="flex items-center gap-1">
        {sections.map((section) => {
          const isActive = active === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={isActive ? 'location' : undefined}
                className={cn(
                  'rounded-md px-3 py-2 text-step--1 font-medium text-muted transition-colors hover:text-foreground',
                  isActive && 'text-primary hover:text-primary',
                )}
              >
                {t(section.label)}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
