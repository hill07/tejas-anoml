import { Page, PageHeader } from '../components/Layout';
import { Monogram } from '../components/Monogram';
import { GoldCorners, OrnamentDivider } from '../components/Ornaments';
import { Reveal } from '../components/Reveal';
import { couple, story } from '../data/wedding';
import { useDocumentTitle } from '../lib/useDocumentTitle';

export default function Story() {
  useDocumentTitle('Our Story', 'How Anmol and Tejas met, and why Malta.');
  return (
    <Page bg="taupe">
      <PageHeader eyebrow="Anmol & Tejas" title="Our Story" />
      <div className="flex justify-center">
        <Monogram eager className="h-44 w-44 animate-rock object-contain" sizes="176px" />
      </div>
      <div className="mt-8 space-y-5">
        {story.map((s, i) => (
          <Reveal as="article" key={s.title} delay={i * 120} className="card px-6 py-8 text-center sm:px-10">
            <GoldCorners />
            <h2 className="font-script text-4xl text-maroon">{s.title}</h2>
            <OrnamentDivider className="mt-2" />
            <p className="mt-4 text-xl leading-relaxed">{s.body}</p>
          </Reveal>
        ))}
      </div>
      <p className="mt-10 text-center font-serif text-xl italic text-maroon">{couple.tagline}</p>
    </Page>
  );
}
