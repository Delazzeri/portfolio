'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { ui } from '@/content/ui';
import { cn, t } from '@/lib/utils';

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      aria-label={t(ui.theme.toggle)}
      className={cn(
        'inline-flex size-10 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-elevated hover:text-foreground',
        className,
      )}
    >
      {/* Os dois ícones são renderizados; o CSS decide qual aparece (sem mismatch de hidratação). */}
      <Sun aria-hidden className="size-5 dark:hidden" />
      <Moon aria-hidden className="hidden size-5 dark:block" />
    </button>
  );
}
