import { Contacts } from '@/components/sections/Contacts';
import { Hero } from '@/components/sections/Hero';
import { Skills } from '@/components/sections/Skills';
import { Section } from '@/components/ui/Section';
import { sectionLabels } from '@/content/ui';
import { t } from '@/lib/utils';

export default function Home() {
  return (
    <>
      <Hero />
      <Skills />
      {/* Conteúdo de Projetos entra na Fase 3. */}
      <Section id="projetos" title={t(sectionLabels.projetos)} />
      <Contacts />
    </>
  );
}
