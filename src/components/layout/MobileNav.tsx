'use client';

import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';

import { sections, ui } from '@/content/ui';
import { useActiveSection } from '@/lib/use-active-section';
import { cn, t } from '@/lib/utils';

const sectionIds = sections.map((s) => s.id);
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
const noopSubscribe = () => () => {};

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  // false no servidor e na hidratação; true depois — evita portal durante a hidratação.
  const isClient = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  const titleId = useId();
  const panelId = useId();

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== 'Tab' || !panel) return;

      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [open, close]);

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t(ui.nav.openMenu)}
        aria-expanded={open}
        aria-controls={panelId}
        className="inline-flex size-10 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-elevated hover:text-foreground"
      >
        <Menu aria-hidden className="size-5" />
      </button>

      {/* Portal: o header usa backdrop-filter, que prenderia o `fixed` dentro dele. */}
      {isClient &&
        createPortal(
          <AnimatePresence>
            {open && (
              <div className="fixed inset-0 z-50 md:hidden">
                <motion.div
                  className="absolute inset-0 bg-background/70 backdrop-blur-sm"
                  onClick={close}
                  aria-hidden
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.div
                  ref={panelRef}
                  id={panelId}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={titleId}
                  className="absolute inset-y-0 right-0 flex w-[min(20rem,85vw)] flex-col border-l border-border bg-surface p-4 shadow-lg"
                  initial={{ opacity: 0, x: 32 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 32 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <div className="flex items-center justify-between">
                    <h2 id={titleId} className="text-step-1 font-semibold">
                      {t(ui.nav.menuTitle)}
                    </h2>
                    <button
                      type="button"
                      onClick={close}
                      aria-label={t(ui.nav.closeMenu)}
                      className="inline-flex size-10 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-elevated hover:text-foreground"
                    >
                      <X aria-hidden className="size-5" />
                    </button>
                  </div>

                  <nav aria-label={t(ui.nav.label)} className="mt-6">
                    <ul className="flex flex-col gap-1">
                      {sections.map((section) => {
                        const isActive = active === section.id;
                        return (
                          <li key={section.id}>
                            <a
                              href={`#${section.id}`}
                              onClick={() => setOpen(false)}
                              aria-current={isActive ? 'location' : undefined}
                              className={cn(
                                'block rounded-md px-3 py-3 text-step-1 font-medium text-foreground transition-colors hover:bg-surface-elevated',
                                isActive && 'text-primary',
                              )}
                            >
                              {t(section.label)}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
