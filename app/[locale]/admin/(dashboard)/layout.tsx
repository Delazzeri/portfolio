import { getTranslations } from 'next-intl/server';
import { redirect } from '@/i18n/navigation';
import { createClient } from '@/lib/supabase/server';
import { signOut } from '@/lib/actions/auth';
import { pageContainer } from '@/lib/page-container';
import type { AppLocale } from '@/i18n/routing';

export default async function AdminDashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    return redirect({ href: '/admin/login', locale });
  }

  const t = await getTranslations('Admin');

  return (
    <div className={pageContainer()}>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {t('dashboardTitle')}
        </h1>
        <form action={signOut.bind(null, locale as AppLocale)}>
          <button
            type="submit"
            className="text-sm text-foreground/60 transition-colors hover:text-foreground"
          >
            {t('signOut')}
          </button>
        </form>
      </div>
      {children}
    </div>
  );
}
