import { Page, PageHeader } from '../components/Layout';
import { GoldCorners, SectionRule } from '../components/Ornaments';
import { Reveal } from '../components/Reveal';
import { couple, gifts } from '../data/wedding';
import { useDocumentTitle } from '../lib/useDocumentTitle';

export default function Gifts() {
  useDocumentTitle('Gifts', `Gift information from ${couple.namesInProse}.`);
  return (
    <Page>
      <PageHeader eyebrow={couple.names} title="Gifts" />
      <Reveal className="card px-6 py-8 text-center sm:px-10">
        <GoldCorners />
        <p className="text-xl leading-relaxed">{gifts.wording}</p>
      </Reveal>
      <section className="mt-10">
        <SectionRule label="Enveloped presents" />
        <Reveal className="card mt-4">
          <p className="text-lg leading-relaxed">{gifts.envelope}</p>
        </Reveal>
      </section>
      <p className="card mt-4 text-base italic text-muted">{gifts.more}</p>
    </Page>
  );
}
