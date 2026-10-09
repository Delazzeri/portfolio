'use client';

import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import { ui } from '@/content/ui';
import { useDialog } from '@/lib/use-dialog';
import { t } from '@/lib/utils';

type ProjectModalProps = {
  slug: string;
  titleId: string;
  children: ReactNode;
};

/** Modal da rota interceptada. Fechar = animação de saída + `router.back()`. */
export function ProjectModal({ slug, titleId, children }: ProjectModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const panelRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);

  // Guarda o card que abriu o modal (antes do foco ir para o título) e devolve o foco ao fechar.
  useEffect(() => {
    const active = document.activeElement;
    const opener =
      active instanceof HTMLElement && active.dataset.projectLink === slug
        ? active
        : document.querySelector<HTMLElement>(`[data-project-link="${slug}"]`);
    return () => opener?.focus({ preventScroll: true });
  }, [slug]);

  useDialog({ open, containerRef: panelRef, onClose: close });

  return (
    <AnimatePresence onExitComplete={() => router.back()}>
      {open && (
        <div key="project-modal" className="fixed inset-0 z-50">
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          <div
            className="absolute inset-0 overflow-y-auto overscroll-contain px-(--gutter) py-8 md:py-16"
            onClick={(event) => {
              if (event.target === event.currentTarget) close();
            }}
          >
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="relative mx-auto w-full max-w-6xl rounded-xl border border-border bg-surface p-4 shadow-lg sm:p-8"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <button
                type="button"
                onClick={close}
                aria-label={t(ui.projects.close)}
                className="absolute top-2 right-2 z-10 inline-flex size-10 items-center justify-center rounded-md bg-surface/90 text-primary-ink transition-colors hover:bg-surface-elevated sm:top-4 sm:right-4"
              >
                <X aria-hidden className="size-5" />
              </button>
              {children}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
