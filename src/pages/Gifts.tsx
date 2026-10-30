import { Page, PageHeader } from '../components/Layout';
import { GoldCorners } from '../components/Ornaments';
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
        <p className="mt-6 font-heading text-base uppercase tracking-[0.18em] text-maroon-deep">{gifts.note}</p>
      </Reveal>
    </Page>
  );
}
