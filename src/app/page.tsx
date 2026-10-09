import { Section } from '@/components/ui/Section';
import { sections } from '@/content/ui';
import { t } from '@/lib/utils';

// Esqueleto da Fase 1: as seções existem para a nav por âncoras; o conteúdo entra nas Fases 2 e 3.
export default function Home() {
  return (
    <>
      {sections.map((section) => (
        <Section key={section.id} id={section.id} title={t(section.label)} />
      ))}
    </>
  );
}
