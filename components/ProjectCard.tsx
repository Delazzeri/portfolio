'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { AppLocale } from '@/i18n/routing';
import type { Project } from '@/lib/types';
import { pickLocale } from '@/lib/localized-field';
import { useHoverCapable } from '@/hooks/useHoverCapable';
import { glassCard } from '@/lib/glass-card';

export function ProjectCard({ project }: { project: Project }) {
  const locale = useLocale() as AppLocale;
  const hoverCapable = useHoverCapable();
  const title = pickLocale(project.titlePt, project.titleEn, locale);

  return (
    <Link
      href={`/${project.type}/${project.slug}`}
      className="group relative block rounded-[28px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <motion.div
        layoutId={`project-cover-${project.id}`}
        className={glassCard('relative aspect-[4/3]')}
        whileHover={hoverCapable ? { scale: 1.035, y: -4 } : undefined}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
        style={{ boxShadow: '0 1px 2px var(--shadow-color)' }}
      >
        <Image
          src={project.coverImageUrl}
          alt={title}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent p-4 pt-10">
          <p className="truncate text-[15px] font-medium text-white">{title}</p>
          {project.tags[0] && (
            <p className="mt-0.5 truncate font-mono text-[11px] uppercase tracking-wide text-white/70">
              {pickLocale(project.tags[0].namePt, project.tags[0].nameEn, locale)}
            </p>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
