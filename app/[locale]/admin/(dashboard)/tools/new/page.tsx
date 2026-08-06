import { ToolTagForm } from '@/components/admin/ToolTagForm';
import type { AppLocale } from '@/i18n/routing';

export default async function NewToolTagPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <ToolTagForm locale={locale as AppLocale} />;
}
