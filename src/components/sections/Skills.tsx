import type { CSSProperties } from 'react';

import { BrandIcon } from '@/components/icons/BrandIcon';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { skills } from '@/content/skills';
import { sectionLabels } from '@/content/ui';
import { t } from '@/lib/utils';

// Os grupos seguem no conteúdo (ordem com foco em dev), mas a grade exibe tudo junto.
const items = skills.flatMap((group) => group.items);

/** Maior nº de colunas no intervalo que divide a lista sem sobra (linhas completas). */
function evenColumns(count: number, min: number, max: number) {
  for (let cols = max; cols >= min; cols--) {
    if (count % cols === 0) return cols;
  }
  return max;
}

const gridStyle: CSSProperties & Record<`--${string}`, number> = {
  '--cols-mobile': evenColumns(items.length, 2, 3),
  '--cols': evenColumns(items.length, 5, 8),
};

export function Skills() {
  return (
    <Section id="habilidades" title={t(sectionLabels.habilidades)}>
      <ul
        style={gridStyle}
        className="grid grid-cols-[repeat(var(--cols-mobile),minmax(0,1fr))] gap-3 md:grid-cols-[repeat(var(--cols),minmax(0,1fr))]"
      >
        {items.map((item, index) => (
          <li key={item.name}>
            <Reveal
              index={index}
              className="group flex aspect-square flex-col items-center justify-center gap-3 rounded-lg border border-border bg-surface p-4 text-center shadow-sm transition-colors hover:border-primary md:gap-2 md:p-2 lg:gap-3 lg:p-4"
            >
              {item.icon && (
                <BrandIcon
                  name={item.icon}
                  className="size-10 text-primary-ink transition-transform duration-200 group-hover:-translate-y-0.5 motion-reduce:transform-none md:size-8 lg:size-10"
                />
              )}
              <span className="text-step--1 leading-tight font-medium text-muted transition-colors group-hover:text-foreground">
                {item.name}
              </span>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
