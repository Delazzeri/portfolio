import { getTranslations } from 'next-intl/server';
import { LoginForm } from '@/components/admin/LoginForm';
import { pageContainer } from '@/lib/page-container';
import type { AppLocale } from '@/i18n/routing';

export default async function AdminLoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('Admin');

  return (
    <div className={pageContainer()}>
      <div className="mx-auto max-w-sm">
        <h1 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">
          {t('loginTitle')}
        </h1>
        <LoginForm locale={locale as AppLocale} />
      </div>
    </div>
  );
}
