'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export function Modal({ children, layoutId }: { children: React.ReactNode; layoutId: string }) {
  const router = useRouter();
  const t = useTranslations('Common');
  const [isOpen, setIsOpen] = useState(true);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') close();
    }
    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [close]);

  return (
    <AnimatePresence onExitComplete={() => router.back()}>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/50 p-4 py-10 backdrop-blur-sm sm:py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={close}
        >
          <motion.div
            layoutId={layoutId}
            onClick={(event) => event.stopPropagation()}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            className="relative w-full max-w-3xl overflow-hidden rounded-[28px] border border-hairline bg-surface-solid shadow-[0_20px_60px_var(--shadow-color)]"
          >
            <button
              type="button"
              onClick={close}
              aria-label={t('close')}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur hover:bg-black/60"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
