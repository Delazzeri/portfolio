import Link from 'next/link';

import { profile } from '@/content/profile';

import { MobileNav } from './MobileNav';
import { Nav } from './Nav';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 h-(--header-height) border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container-page flex h-full items-center justify-between gap-4">
        <Link
          href="/#top"
          className="rounded-sm font-heading text-step-0 font-semibold tracking-tight text-foreground"
        >
          {profile.name}
        </Link>

        <div className="flex items-center gap-1">
          <Nav />
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
