import { ArrowUp } from 'lucide-react';
import { cacheLife } from 'next/cache';

import { profile } from '@/content/profile';
import { ui } from '@/content/ui';
import { t } from '@/lib/utils';

/** Ano corrente, cacheado — `new Date()` não pode rodar solto no prerender (Cache Components). */
async function CurrentYear() {
  'use cache';
  cacheLife('days');
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-page flex flex-col items-center justify-between gap-4 py-8 text-step--1 text-muted sm:flex-row">
        <p>
          © <CurrentYear /> {profile.name}. {t(ui.footer.rights)}
        </p>
        <a
          href="#top"
          className="inline-flex items-center gap-2 rounded-sm font-medium transition-colors hover:text-foreground"
        >
          {t(ui.footer.backToTop)}
          <ArrowUp aria-hidden className="size-4" />
        </a>
      </div>
    </footer>
  );
}
