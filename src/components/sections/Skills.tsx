import { BrandIcon } from '@/components/icons/BrandIcon';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { skills } from '@/content/skills';
import { sectionLabels } from '@/content/ui';
import { t } from '@/lib/utils';

export function Skills() {
  return (
    <Section id="habilidades" title={t(sectionLabels.habilidades)}>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((group, index) => (
          <li key={group.title.pt}>
            <Reveal
              index={index}
              className="h-full rounded-lg border border-border bg-surface p-6 shadow-sm"
            >
              <h3 className="text-step-1 font-semibold">{t(group.title)}</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-step--1 font-medium"
                  >
                    {item.icon && <BrandIcon name={item.icon} className="size-4 text-muted" />}
                    {item.name}
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
