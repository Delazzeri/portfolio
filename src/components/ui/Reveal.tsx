'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';

/** Atraso por item em grids (§9: ≤ 60ms). */
export const REVEAL_STAGGER = 0.06;

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Posição do item num grid; gera o stagger. */
  index?: number;
};

/**
 * Fade + translate leve ao entrar na viewport.
 * Com prefers-reduced-motion, o MotionConfig global remove o translate e mantém só a opacidade.
 * Não usar no Hero (não atrasar o LCP).
 */
export function Reveal({ children, className, index = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * REVEAL_STAGGER }}
    >
      {children}
    </motion.div>
  );
}
