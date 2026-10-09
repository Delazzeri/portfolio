import { Contacts } from '@/components/sections/Contacts';
import { Hero } from '@/components/sections/Hero';
import { Projects } from '@/components/sections/Projects';
import { Skills } from '@/components/sections/Skills';

export default function Home() {
  return (
    <>
      <Hero />
      <Skills />
      <Projects />
      <Contacts />
    </>
  );
}
