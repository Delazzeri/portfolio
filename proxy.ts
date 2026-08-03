import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const handleI18n = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  const response = handleI18n(request);

  const pathname = request.nextUrl.pathname;
  const localeMatch = pathname.match(/^\/(pt|en)(\/.*)?$/);
  const locale = localeMatch?.[1] ?? routing.defaultLocale;
  const pathWithoutLocale = localeMatch?.[2] || '/';

  const isAdminRoute =
    pathWithoutLocale.startsWith('/admin') && pathWithoutLocale !== '/admin/login';
  if (!isAdminRoute) return response;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url));
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
