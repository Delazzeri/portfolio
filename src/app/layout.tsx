import type { Metadata } from 'next';
import { Geist } from 'next/font/google';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Providers } from '@/components/layout/Providers';
import { profile } from '@/content/profile';
import { ui } from '@/content/ui';
import { t } from '@/lib/utils';

import '@/styles/globals.css';

// TODO: definir as fontes de título e de texto (§7). Por ora, Geist serve às duas.
const bodyFont = Geist({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
});

// Metadata base; a versão completa (canonical, Open Graph, Twitter) entra na Fase 4.
export const metadata: Metadata = {
  title: {
    default: t(ui.siteTitle),
    template: `%s | ${profile.name}`,
  },
  description: t(profile.bio),
};

export default function RootLayout({ children, modal }: LayoutProps<'/'>) {
  return (
    <html lang="pt-BR" className={bodyFont.variable} suppressHydrationWarning>
      <body id="top">
        <Providers>
          <a
            href="#conteudo"
            className="sr-only rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
          >
            {t(ui.skipLink)}
          </a>
          <Header />
          <main id="conteudo" tabIndex={-1} className="pt-(--header-height) outline-none">
            {children}
          </main>
          <Footer />
          {modal}
        </Providers>
      </body>
    </html>
  );
}
