import { GoldFrame } from '../components/GoldFrame';
import { ImagesIcon } from '../components/Icons';
import { Page, PageHeader } from '../components/Layout';
import { couple, galleryNote } from '../data/wedding';
import { useDocumentTitle } from '../lib/useDocumentTitle';

export default function Gallery() {
  useDocumentTitle('Gallery', 'Photos from the wedding celebrations in Malta.');
  return (
    <Page bg="sky">
      <PageHeader eyebrow="Anmol & Tejas" title="Gallery" />
      <div className="mx-auto max-w-xs">
        <GoldFrame className="aspect-[4/5]">
          <div className="grid h-full w-full place-items-center p-6 text-center">
            <div>
              <ImagesIcon size={44} strokeWidth={1.2} className="mx-auto text-gold-deep" />
              <p className="mt-3 font-serif text-lg font-semibold text-maroon-deep">{couple.hashtag}</p>
            </div>
          </div>
        </GoldFrame>
      </div>
      <p className="card mx-auto mt-10 max-w-lg text-center text-xl leading-relaxed">{galleryNote}</p>
    </Page>
  );
}
