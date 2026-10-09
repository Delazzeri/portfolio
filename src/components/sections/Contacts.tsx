import { ContactIcon } from '@/components/icons/ContactIcon';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { profile } from '@/content/profile';
import { sectionLabels } from '@/content/ui';
import { t } from '@/lib/utils';

export function Contacts() {
  return (
    <Section id="contatos" title={t(sectionLabels.contatos)} centered>
      <ul className="flex flex-wrap justify-center gap-x-10 gap-y-8 sm:gap-x-16">
        {profile.contacts.map((contact, index) => {
          const isExternal = contact.href.startsWith('http');
          return (
            <li key={contact.kind}>
              <Reveal index={index}>
                <a
                  href={contact.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="group flex flex-col items-center gap-3 rounded-md p-2 text-center"
                >
                  <span className="inline-flex size-16 items-center justify-center rounded-full bg-surface-elevated text-primary-ink transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                    <ContactIcon kind={contact.kind} className="size-7" />
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="font-semibold">{t(contact.label)}</span>
                    <span className="text-step--1 text-muted transition-colors group-hover:text-foreground">
                      {contact.value}
                    </span>
                  </span>
                </a>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
