'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';

const sections = [
  { key: 'navProjects', href: '/admin' },
  { key: 'navHero', href: '/admin/hero' },
] as const;

export function AdminSectionNav() {
  const t = useTranslations('Admin');
  const pathname = usePathname();

  return (
    <nav className="mb-6 flex gap-4 border-b border-hairline">
      {sections.map((section) => {
        const isActive =
          section.href === '/admin' ? pathname === '/admin' : pathname.startsWith(section.href);
        return (
          <Link
            key={section.key}
            href={section.href}
            data-active={isActive}
            className="border-b-2 border-transparent pb-2 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground data-[active=true]:border-accent data-[active=true]:text-foreground"
          >
            {t(section.key)}
          </Link>
        );
      })}
    </nav>
  );
}
