'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import type { AppLocale } from '@/i18n/routing';

export function LanguageToggle() {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const t = useTranslations('Common');
  const nextLocale: AppLocale = locale === 'pt' ? 'en' : 'pt';

  return (
    <Link
      href={pathname}
      locale={nextLocale}
      aria-label={t('languageToggle')}
      className="flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-medium uppercase text-foreground/70 transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
    >
      {nextLocale}
    </Link>
  );
}
