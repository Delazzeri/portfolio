'use client';

import { useActionState } from 'react';
import { useTranslations } from 'next-intl';
import { signIn, type SignInState } from '@/lib/actions/auth';
import type { AppLocale } from '@/i18n/routing';

export function LoginForm({ locale }: { locale: AppLocale }) {
  const t = useTranslations('Admin');
  const [state, formAction, pending] = useActionState<SignInState, FormData>(
    signIn.bind(null, locale),
    {},
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-sm">
        {t('email')}
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="rounded-xl border border-hairline bg-surface px-3.5 py-2.5 text-foreground outline-none focus:ring-2 focus:ring-accent"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        {t('password')}
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="rounded-xl border border-hairline bg-surface px-3.5 py-2.5 text-foreground outline-none focus:ring-2 focus:ring-accent"
        />
      </label>
      {state.error && <p className="text-sm text-red-500">{t('genericError')}</p>}
      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-full bg-accent px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? t('submitting') : t('submit')}
      </button>
    </form>
  );
}
