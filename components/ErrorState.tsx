'use client';

import { useTranslations } from 'next-intl';

export function ErrorState({ reset }: { reset: () => void }) {
  const t = useTranslations('Error');

  return (
    <div className="flex flex-col items-start gap-3 py-16">
      <h1 className="text-[22px] font-semibold tracking-tight text-foreground">{t('title')}</h1>
      <p className="text-foreground/60">{t('description')}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        {t('retry')}
      </button>
    </div>
  );
}
