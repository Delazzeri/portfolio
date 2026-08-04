'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
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
  const activeSection = sections.find((s) => pathname.startsWith(s.href))?.key;
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-5 sm:px-4">
      <nav className="flex max-w-full items-center gap-0.5 rounded-full border border-hairline bg-surface p-1 shadow-[0_8px_30px_var(--shadow-color)] backdrop-blur-xl sm:gap-1 sm:p-1.5">
        <div
          className="relative"
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
          }}
        >
          <button
            type="button"
            aria-label={t('menuLabel')}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="px-3 py-1.5 text-[15px] font-semibold tracking-tight text-foreground transition-colors hover:text-foreground/80"
          >
            Eduardo
          </button>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 top-full mt-2 min-w-[9rem] overflow-hidden rounded-2xl border border-hairline bg-surface-solid p-1 shadow-[0_8px_30px_var(--shadow-color)] backdrop-blur-xl"
              >
                {sections.map((section) => {
                  const isActive = activeSection === section.key;
                  return (
                    <Link
                      key={section.key}
                      href={section.href}
                      data-active={isActive}
                      className="block rounded-xl px-3 py-2 text-[14px] font-medium text-foreground/70 transition-colors hover:bg-foreground/[0.06] hover:text-foreground data-[active=true]:text-foreground"
                    >
                      {t(section.key)}
                    </Link>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="ml-0.5 flex items-center border-l border-hairline pl-1 sm:ml-1 sm:pl-1.5">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
