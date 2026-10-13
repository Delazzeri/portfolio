import { ContactIcon } from '@/components/icons/ContactIcon';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { profile } from '@/content/profile';
import { sectionLabels } from '@/content/ui';
import { t } from '@/lib/utils';

export function Contacts() {
  return (
    <Section id="contatos" title={t(sectionLabels.contatos)} centered>
      {/* Mobile: 2 colunas iguais (itens alinhados); sm+: linha centralizada. */}
      <ul className="grid grid-cols-2 gap-x-2 gap-y-8 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-16">
        {profile.contacts.map((contact, index) => {
          const isExternal = contact.href.startsWith('http');
          const [user, domain] = contact.value.split('@');
          return (
            <li key={contact.kind} className="flex min-w-0 justify-center">
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
                      {/* E-mail longo quebra antes do "@" em telas estreitas. */}
                      {domain === undefined ? (
                        contact.value
                      ) : (
                        <>
                          {user}
                          <wbr />@{domain}
                        </>
                      )}
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
