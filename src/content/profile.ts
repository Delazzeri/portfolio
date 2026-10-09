import type { Profile } from '@/lib/types';

export const profile: Profile = {
  name: 'Eduardo Delazeri',
  role: {
    pt: 'Desenvolvedor Front-end',
    en: 'Front-end Developer',
  },
  bio: {
    pt: 'Desenvolvedor Front-End com atuação freelancer em sites institucionais, aplicações web e interfaces de produto. Desenvolvo com React, TypeScript e Tailwind CSS, integro back-end com Supabase e APIs e levo o design criado no Figma e no pacote Adobe para o código com fidelidade e responsividade.',
    // Tradução da bio em PT — revisar antes da Fase 5.
    en: 'Front-End Developer working as a freelancer on institutional websites, web applications and product interfaces. I build with React, TypeScript and Tailwind CSS, integrate back-ends with Supabase and APIs, and bring designs created in Figma and the Adobe suite into code with fidelity and responsiveness.',
  },
  avatar: '/images/avatar.webp', // TODO: adicionar arquivo
  cvUrl: '/cv/cv-eduardo.pdf', // TODO: adicionar arquivo
  contacts: [
    {
      kind: 'email',
      label: { pt: 'E-mail', en: 'Email' },
      value: 'dudu.delazeri@hotmail.com',
      href: 'mailto:dudu.delazeri@hotmail.com',
    },
    {
      kind: 'whatsapp',
      label: { pt: 'WhatsApp', en: 'WhatsApp' },
      value: '(51) 98201-8358',
      href: 'https://wa.me/5551982018358',
    },
    {
      kind: 'linkedin',
      label: { pt: 'LinkedIn', en: 'LinkedIn' },
      value: 'in/eduardodelazeri',
      href: 'https://www.linkedin.com/in/eduardodelazeri/',
    },
    {
      kind: 'github',
      label: { pt: 'GitHub', en: 'GitHub' },
      value: 'Delazzeri',
      href: 'https://github.com/Delazzeri',
    },
  ],
};
