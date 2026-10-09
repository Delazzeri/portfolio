import { ArrowUpRight } from 'lucide-react';

import { ContactIcon } from '@/components/icons/ContactIcon';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { profile } from '@/content/profile';
import { sectionLabels } from '@/content/ui';
import { t } from '@/lib/utils';

export function Contacts() {
  return (
    <Section id="contatos" title={t(sectionLabels.contatos)}>
      <ul className="grid gap-4 sm:grid-cols-2">
        {profile.contacts.map((contact, index) => {
          const isExternal = contact.href.startsWith('http');
          return (
            <li key={contact.kind}>
              <Reveal index={index} className="h-full">
                <a
                  href={contact.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="group flex h-full items-center gap-4 rounded-lg border border-border bg-surface p-5 shadow-sm transition-colors hover:border-primary"
                >
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-md bg-surface-elevated text-primary">
                    <ContactIcon kind={contact.kind} className="size-6" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-step--1 text-muted">{t(contact.label)}</span>
                    <span className="block truncate font-semibold">{contact.value}</span>
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="size-5 shrink-0 text-muted transition-colors group-hover:text-primary"
                  />
                </a>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
