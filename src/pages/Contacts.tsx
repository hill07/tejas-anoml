import { PhoneIcon } from '../components/Icons';
import { Page, PageHeader } from '../components/Layout';
import { Reveal } from '../components/Reveal';
import { contacts, telHref } from '../data/wedding';
import { useDocumentTitle } from '../lib/useDocumentTitle';

export default function Contacts() {
  useDocumentTitle('Important Contacts', 'Wedding coordinator, family contacts, transport, hotel and venue numbers for our Malta wedding.');
  return (
    <Page>
      <PageHeader
        eyebrow="Who to call"
        title="Contacts"
        intro="On the wedding day please call Priya rather than us — we'd love to help and we absolutely will not be able to."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {contacts.map((c) => (
          <Reveal as="article" key={c.role} className="card flex flex-col">
            <p className="eyebrow">{c.role}</p>
            <h2 className="mt-1 font-heading text-xl text-maroon-deep">{c.name}</h2>
            {c.note ? <p className="mt-1 text-base italic text-muted">{c.note}</p> : null}
            <div className="mt-auto pt-4">
              <a href={telHref(c.phone)} className="btn-primary w-full">
                <PhoneIcon size={15} /> {c.phone}
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </Page>
  );
}
