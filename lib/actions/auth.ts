'use server';

import { redirect } from '@/i18n/navigation';
import { createClient } from '@/lib/supabase/server';
import type { AppLocale } from '@/i18n/routing';

export type SignInState = { error?: string };

export async function signIn(
  locale: AppLocale,
  _prevState: SignInState,
  formData: FormData,
): Promise<SignInState> {
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { error: error.message };

  return redirect({ href: '/admin', locale });
}

export async function signOut(locale: AppLocale) {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect({ href: '/admin/login', locale });
}
