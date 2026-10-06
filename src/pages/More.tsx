import { Link } from 'react-router-dom';
import type { ComponentType, SVGProps } from 'react';
import { BellIcon, ChevronRightIcon, GiftIcon, HeartIcon, ImagesIcon, PhoneIcon, QuestionIcon } from '../components/Icons';
import { Page, PageHeader } from '../components/Layout';
import { Reveal } from '../components/Reveal';
import { couple } from '../data/wedding';
import { useDocumentTitle } from '../lib/useDocumentTitle';

type Icon = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
const links: { to: string; label: string; note: string; Icon: Icon }[] = [
  { to: '/things-to-do', label: 'Things to Do', note: 'Explore Malta & nearby attractions', Icon: HeartIcon },
  { to: '/updates', label: 'Live Updates', note: 'Changes, reminders, coach times', Icon: BellIcon },
  { to: '/faq', label: 'Guest FAQ', note: 'The questions everyone asks', Icon: QuestionIcon },
  { to: '/gallery', label: 'Photos & Memories', note: 'Share what you capture', Icon: ImagesIcon },
  { to: '/contacts', label: 'Important Contacts', note: 'Who to call, and when', Icon: PhoneIcon },
  { to: '/gifts', label: 'Gifts', note: 'Only if you insist', Icon: GiftIcon },
  { to: '/story', label: 'Meet Us', note: 'How we got here', Icon: HeartIcon },
];

export default function More() {
  useDocumentTitle('More', 'Things to do, live updates, guest FAQ, photo gallery, important contacts, gifts and our story.');
  return (
    <Page>
      <PageHeader eyebrow="Everything else" title="More" />
      <div className="grid gap-3 sm:grid-cols-2">
        {links.map(({ to, label, note, Icon }, i) => (
          <Reveal key={to} delay={i * 60}>
            <Link to={to} className="card-link group flex items-center gap-4 p-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-maroon-deep text-gold-light ring-1 ring-[hsl(var(--gold-light)/0.6)]">
                <Icon size={20} />
              </span>
              <span className="flex-1">
                <span className="block font-heading text-lg text-maroon-deep">{label}</span>
                <span className="block text-base italic text-muted">{note}</span>
              </span>
              <ChevronRightIcon size={18} className="text-gold transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        ))}
      </div>
      <p className="mt-10 text-center font-serif text-lg font-semibold tracking-wide text-muted">{couple.hashtag}</p>
    </Page>
  );
}
