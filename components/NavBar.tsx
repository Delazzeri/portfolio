'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link, usePathname } from '@/i18n/navigation';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';

const sections = [
  { key: 'design', href: '/design' },
  { key: 'code', href: '/code' },
  { key: 'all', href: '/all' },
] as const;

export function NavBar() {
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const activeSection = sections.find((s) => pathname.startsWith(s.href))?.key ?? 'all';

  return (
    <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-5 sm:px-4">
      <nav className="flex max-w-full items-center gap-0.5 rounded-full border border-hairline bg-surface p-1 shadow-[0_8px_30px_var(--shadow-color)] backdrop-blur-xl sm:gap-1 sm:p-1.5">
        <Link
          href="/design"
          className="mr-0.5 hidden px-3 text-[15px] font-semibold tracking-tight text-foreground sm:mr-1 sm:block"
        >
          Eduardo
        </Link>
        {sections.map((section) => {
          const isActive = activeSection === section.key;
          return (
            <Link
              key={section.key}
              href={section.href}
              className="relative rounded-full px-2.5 py-1.5 text-[13px] font-medium text-foreground/60 transition-colors data-[active=true]:text-foreground sm:px-4 sm:text-[14px]"
              data-active={isActive}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-full bg-foreground/[0.07]"
                  transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                />
              )}
              <span className="relative">{t(section.key)}</span>
            </Link>
          );
        })}
        <div className="ml-0.5 flex items-center border-l border-hairline pl-1 sm:ml-1 sm:pl-1.5">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
