import { GoldFrame } from '../components/GoldFrame';
import { Page, PageHeader } from '../components/Layout';
import { SectionRule } from '../components/Ornaments';
import { Reveal } from '../components/Reveal';
import { ceremonies, etiquette, guideIntro } from '../data/wedding';
import { useDocumentTitle } from '../lib/useDocumentTitle';
import mandap640 from '../assets/mandap-640.webp';
import mandap1280 from '../assets/mandap-1280.webp';

export default function Guide() {
  useDocumentTitle(
    'Hindu Wedding Guide',
    'A friendly guide to the ceremonies and etiquette at our Hindu wedding, for guests attending one for the first time.',
  );
  return (
    <Page>
      <PageHeader eyebrow="First Hindu wedding?" title="The Ceremonies" intro={guideIntro} />

      <Reveal>
        <GoldFrame>
          <img
            src={mandap1280}
            srcSet={`${mandap640} 640w, ${mandap1280} 1280w`}
            sizes="(min-width: 672px) 620px, 100vw"
            alt="A decorated Hindu wedding mandap"
            width={1280}
            height={864}
            loading="lazy"
            decoding="async"
            className="h-52 w-full object-cover sm:h-72"
          />
        </GoldFrame>
      </Reveal>

      <ol className="mt-10 space-y-4">
        {ceremonies.map((c, i) => (
          <Reveal as="li" key={c.title} className="card flex gap-5">
            <span className="font-heading text-3xl leading-none text-gold" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <h2 className="font-heading text-xl text-maroon-deep">{c.title}</h2>
              <p className="mt-1 text-lg leading-relaxed">{c.body}</p>
            </div>
          </Reveal>
        ))}
      </ol>

      <section className="mt-12">
        <SectionRule label="Etiquette" />
        <Reveal className="card mt-4">
          <ul className="space-y-3">
            {etiquette.map((e) => (
              <li key={e} className="flex gap-3 text-lg leading-relaxed">
                <span className="shrink-0 text-gold" aria-hidden="true">
                  ❖
                </span>
                <span>{e}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>
    </Page>
  );
}
