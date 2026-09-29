import { BellIcon } from '../components/Icons';
import { Page, PageHeader } from '../components/Layout';
import { Reveal } from '../components/Reveal';
import { updates } from '../data/wedding';
import { useDocumentTitle } from '../lib/useDocumentTitle';

export default function Updates() {
  useDocumentTitle('Updates', 'Latest announcements for wedding guests.');
  return (
    <Page>
      <PageHeader eyebrow="Anmol & Tejas" title="Updates" />
      <div className="space-y-4">
        {updates.map((u) => (
          <Reveal
            as="article"
            key={u.title}
            className={`card ${u.urgent ? 'shadow-[0_0_0_2px_hsl(var(--maroon)/0.55),0_14px_34px_-18px_hsl(345_40%_18%/0.35)]' : ''}`}
          >
            <p className="flex items-center gap-2 font-heading text-[11px] uppercase tracking-[0.16em] text-gold-deep">
              {u.urgent ? <BellIcon size={14} className="text-maroon" /> : null}
              {u.time}
              {u.urgent ? <span className="text-maroon">· Important</span> : null}
            </p>
            <h2 className="mt-1 font-heading text-xl text-maroon-deep">{u.title}</h2>
            <p className="mt-1.5 text-lg leading-relaxed">{u.body}</p>
          </Reveal>
        ))}
      </div>
    </Page>
  );
}
