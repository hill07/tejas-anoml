import { ChevronDownIcon } from '../components/Icons';
import { Page, PageHeader } from '../components/Layout';
import { faq } from '../data/wedding';
import { useDocumentTitle } from '../lib/useDocumentTitle';

export default function Faq() {
  useDocumentTitle('Guest FAQ', 'Children, plus-ones, alcohol, photos, parking, transport and what to bring — answered.');
  return (
    <Page>
      <PageHeader
        eyebrow="Guest information"
        title="Good Questions"
        intro="If yours isn't here, ask Priya — she has the real answers."
      />
      <div className="space-y-3">
        {faq.map((f, i) => (
          <details key={f.q} className="card group p-0" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
              <h2 className="font-heading text-lg text-maroon-deep">{f.q}</h2>
              <ChevronDownIcon size={20} className="shrink-0 text-gold transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <p className="px-5 pb-5 text-lg leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </Page>
  );
}
