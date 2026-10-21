import { useState, type FormEvent, type ReactNode } from 'react';
import { Page } from '../components/Layout';
import { GoldCorners, OrnamentDivider, SectionRule } from '../components/Ornaments';
import { events } from '../data/wedding';
import { useDocumentTitle } from '../lib/useDocumentTitle';

interface Reply {
  name: string;
  email: string;
  phone: string;
  party: string;
  attending: 'yes' | 'no';
  /** Event slugs the household plans to attend. */
  events: string[];
  /** Headcount per event slug (for selected events only). */
  eventGuests: Record<string, number>;
  diet: string;
  allergies: string;
  hotel: string;
  transport: 'yes' | 'no';
  song: string;
  notes: string;
}

function defaultEventGuests(): Record<string, number> {
  return Object.fromEntries(events.map((e) => [e.slug, 1]));
}

function formatEventSummary(selected: string[], eventGuests: Record<string, number>) {
  return events
    .filter((e) => selected.includes(e.slug))
    .map((e) => `${e.name} (${eventGuests[e.slug] ?? 1})`)
    .join(', ');
}

const STORAGE_KEY = 'at-rsvp-reply';
const endpoint = import.meta.env.VITE_RSVP_ENDPOINT;

const emptyReply: Reply = {
  name: '',
  email: '',
  phone: '',
  party: '',
  attending: 'yes',
  events: events.map((e) => e.slug),
  eventGuests: defaultEventGuests(),
  diet: '',
  allergies: '',
  hotel: '',
  transport: 'yes',
  song: '',
  notes: '',
};

function loadSaved(): Reply | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Reply> & { events?: string[] };
    const eventGuests = { ...defaultEventGuests(), ...parsed.eventGuests };
    let selected = parsed.events;
    if (!selected) {
      selected = events.filter((e) => (eventGuests[e.slug] ?? 0) > 0).map((e) => e.slug);
    }
    if (!parsed.eventGuests && parsed.events) {
      for (const e of events) {
        eventGuests[e.slug] = parsed.events.includes(e.slug) ? Math.max(1, eventGuests[e.slug] ?? 0) : 0;
      }
    }
    return { ...emptyReply, ...parsed, events: selected, eventGuests };
  } catch {
    return null;
  }
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      {children}
    </label>
  );
}

function Choice({
  name,
  checked,
  onChange,
  children,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  children: ReactNode;
}) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-3.5 text-lg italic transition ${
        checked
          ? 'bg-maroon-deep text-ivory shadow-[0_0_0_1px_hsl(var(--gold-light)/0.7)]'
          : 'bg-white/60 text-ink shadow-[0_0_0_1px_hsl(var(--gold)/0.4)] hover:bg-white'
      }`}
    >
      <input type="radio" name={name} checked={checked} onChange={onChange} className="sr-only" />
      <span
        className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border ${checked ? 'border-gold-light' : 'border-gold'}`}
        aria-hidden="true"
      >
        {checked ? <span className="h-2 w-2 rounded-full bg-gold-light" /> : null}
      </span>
      {children}
    </label>
  );
}

export default function Rsvp() {
  useDocumentTitle(
    'RSVP',
    "Confirm which events you're coming to, tell us about dietary requirements, transport and accommodation, and request a song.",
  );
  const [saved, setSaved] = useState<Reply | null>(loadSaved);
  const [reply, setReply] = useState<Reply>(() => saved ?? emptyReply);
  const [editing, setEditing] = useState(!saved);
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const [sentOnline, setSentOnline] = useState(false);
  const [eventsError, setEventsError] = useState('');
  /** Lets guests clear the field while typing (backspace) without unchecking the event. */
  const [guestDrafts, setGuestDrafts] = useState<Record<string, string>>({});

  const declining = reply.attending === 'no';
  // Guests who decline skip the event, food and logistics steps.
  const steps = declining ? ['who', 'fun'] : ['who', 'events', 'food', 'logistics', 'fun'];
  const current = steps[Math.min(step, steps.length - 1)];
  const isLast = current === 'fun';

  const set = <K extends keyof Reply>(key: K, value: Reply[K]) => setReply((r) => ({ ...r, [key]: value }));
  const isEventSelected = (slug: string) => reply.events.includes(slug);

  const guestCountDisplay = (slug: string) =>
    guestDrafts[slug] ?? String(reply.eventGuests[slug] ?? 1);

  const commitGuestCount = (slug: string) => {
    const raw = guestDrafts[slug];
    if (raw === undefined) return;
    const n = Math.min(99, Math.max(1, parseInt(raw, 10) || 1));
    setReply((r) => ({ ...r, eventGuests: { ...r.eventGuests, [slug]: n } }));
    setGuestDrafts((d) => {
      const { [slug]: _, ...rest } = d;
      return rest;
    });
  };

  const commitAllEventGuests = (): { ok: true; eventGuests: Record<string, number> } | { ok: false } => {
    const next = { ...reply.eventGuests };
    for (const slug of reply.events) {
      const raw = guestDrafts[slug] ?? String(next[slug] ?? '');
      if (raw === '' || !parseInt(raw, 10)) return { ok: false };
      next[slug] = Math.min(99, Math.max(1, parseInt(raw, 10)));
    }
    return { ok: true, eventGuests: next };
  };

  const toggleEvent = (slug: string) => {
    setEventsError('');
    setGuestDrafts((d) => {
      const { [slug]: _, ...rest } = d;
      return rest;
    });
    setReply((r) => {
      const on = r.events.includes(slug);
      return {
        ...r,
        events: on ? r.events.filter((s) => s !== slug) : [...r.events, slug],
        eventGuests: { ...r.eventGuests, [slug]: on ? r.eventGuests[slug] : Math.max(1, r.eventGuests[slug] ?? 1) },
      };
    });
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.reportValidity()) return;
    if (!isLast) {
      if (current === 'events' && !declining) {
        if (reply.events.length === 0) {
          setEventsError('Please select at least one event and tell us how many guests are coming.');
          return;
        }
        const committed = commitAllEventGuests();
        if (!committed.ok) {
          setEventsError('Please enter how many guests are coming for each selected event.');
          return;
        }
        setReply((r) => ({ ...r, eventGuests: committed.eventGuests }));
        setGuestDrafts({});
      }
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const clearedGuests = Object.fromEntries(events.map((e) => [e.slug, 0]));
    const final: Reply = declining ? { ...reply, events: [], eventGuests: clearedGuests } : reply;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(final));
    } catch {
      /* storage unavailable — still continue */
    }

    if (endpoint) {
      setStatus('sending');
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            ...final,
            events: formatEventSummary(final.events, final.eventGuests),
          }),
        });
        if (!res.ok) throw new Error(String(res.status));
        setSentOnline(true);
      } catch {
        setStatus('error');
        return;
      }
    }

    setStatus('idle');
    setSaved(final);
    setEditing(false);
    setStep(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!editing && saved) {
    return (
      <Page bg="mauve">
        <section className="card mx-auto mt-16 max-w-lg px-6 py-10 text-center sm:px-10">
          <GoldCorners />
          <p className="font-script text-4xl text-maroon">Thank you</p>
          <h1 className="mt-1 font-heading text-3xl uppercase tracking-[0.16em] text-maroon-deep">We've got it</h1>
          <OrnamentDivider className="mt-3" />
          <p className="mt-5 text-lg leading-relaxed">
            {sentOnline
              ? "Your reply has been sent to Anmol & Tejas and saved on this device. We'll be in touch with the final details closer to the time — and if anything changes, just call Priya."
              : "Your reply has been noted on this device. We'll be in touch with the final details closer to the time — and if anything changes, just call Priya."}
          </p>
          <dl className="mt-6 space-y-2 rounded-xl bg-[hsl(var(--ivory-deep)/0.5)] p-4 text-left text-base">
            <div>
              <dt className="field-label inline">Name: </dt>
              <dd className="inline">{saved.name}</dd>
            </div>
            <div>
              <dt className="field-label inline">Reply: </dt>
              <dd className="inline">{saved.attending === 'yes' ? 'Joyfully accept' : 'Sadly decline'}</dd>
            </div>
            {saved.attending === 'yes' ? (
              <div>
                <dt className="field-label inline">Events: </dt>
                <dd className="inline">{formatEventSummary(saved.events, saved.eventGuests) || 'None selected'}</dd>
              </div>
            ) : null}
          </dl>
          <button
            type="button"
            onClick={() => {
              setReply(saved);
              setEditing(true);
            }}
            className="btn-ghost mt-6 w-full"
          >
            Edit my reply
          </button>
        </section>
      </Page>
    );
  }

  return (
    <Page bg="mauve">
      <section className="card mx-auto mt-12 max-w-lg px-6 pb-8 pt-10 sm:px-10">
        <GoldCorners />
        <header className="text-center">
          <p className="eyebrow">Please reply by 1 April 2027</p>
          <h1 className="mt-2 font-heading text-4xl uppercase tracking-[0.2em] text-maroon-deep">RSVP</h1>
          <OrnamentDivider className="mt-3" />
          <p className="mx-auto mt-3 max-w-sm text-lg italic leading-relaxed text-muted">
            One form per household. If you're replying for family members too, add their names below.
          </p>
          <div className="mt-5 flex justify-center gap-2" aria-label={`Step ${step + 1} of ${steps.length}`}>
            {steps.map((s, i) => (
              <span
                key={s}
                className={`h-1.5 rounded-full transition-all duration-500 ${i === step ? 'w-8 bg-gold-deep' : i < step ? 'w-3 bg-gold' : 'w-3 bg-[hsl(var(--gold)/0.3)]'}`}
              />
            ))}
          </div>
        </header>

        <form onSubmit={submit} className="mt-7 space-y-6" noValidate={false}>
          {current === 'who' && (
            <div className="animate-rise space-y-5">
              <p className="eyebrow">Who you are</p>
              <Field label="Your full name">
                <input className="field" name="name" required autoComplete="name" value={reply.name} onChange={(e) => set('name', e.target.value)} />
              </Field>
              <Field label="Email">
                <input
                  className="field"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={reply.email}
                  onChange={(e) => set('email', e.target.value)}
                />
              </Field>
              <Field label="Mobile number">
                <input className="field" name="phone" type="tel" autoComplete="tel" value={reply.phone} onChange={(e) => set('phone', e.target.value)} />
              </Field>
              <Field label="Anyone else you're replying for">
                <input
                  className="field"
                  name="party"
                  placeholder="Partner, children, family"
                  value={reply.party}
                  onChange={(e) => set('party', e.target.value)}
                />
              </Field>
              <fieldset>
                <legend className="field-label">Will you be there?</legend>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  <Choice name="attending" checked={reply.attending === 'yes'} onChange={() => set('attending', 'yes')}>
                    Joyfully accept
                  </Choice>
                  <Choice name="attending" checked={reply.attending === 'no'} onChange={() => set('attending', 'no')}>
                    Sadly decline
                  </Choice>
                </div>
              </fieldset>
            </div>
          )}

          {current === 'events' && (
            <div className="animate-rise space-y-6">
              <fieldset>
                <legend className="eyebrow">Which events</legend>
                <p className="mt-2 text-base italic leading-relaxed text-muted">
                  Select each event you plan to attend and tell us how many guests from your household are coming to that
                  event.
                </p>
                <div className="mt-4 space-y-3">
                  {events.map((e) => {
                    const checked = isEventSelected(e.slug);
                    return (
                      <div
                        key={e.slug}
                        className={`rounded-2xl p-4 transition ${
                          checked
                            ? 'bg-maroon-deep text-ivory shadow-[0_0_0_1px_hsl(var(--gold-light)/0.7)]'
                            : 'bg-white/50 text-ink shadow-[0_0_0_1px_hsl(var(--gold)/0.4)]'
                        }`}
                      >
                        <label className="flex cursor-pointer items-center gap-3">
                          <input
                            type="checkbox"
                            name="events"
                            value={e.slug}
                            checked={checked}
                            onChange={() => toggleEvent(e.slug)}
                            className="sr-only"
                          />
                          <span
                            className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
                              checked ? 'border-gold-light' : 'border-gold'
                            }`}
                            aria-hidden="true"
                          >
                            {checked ? <span className="h-2.5 w-2.5 rounded-full bg-gold-light" /> : null}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-heading text-base">{e.name}</span>
                            <span className={`block text-sm italic ${checked ? 'text-ivory/80' : 'text-muted'}`}>
                              {e.dateLabel} · {e.startTime}
                            </span>
                          </span>
                        </label>
                        {checked ? (
                          <div className="mt-3 flex items-center justify-between gap-3 border-t border-[hsl(var(--gold-light)/0.35)] pt-3">
                            <label
                              htmlFor={`event-guests-${e.slug}`}
                              className={`text-sm italic ${checked ? 'text-ivory/90' : 'text-muted'}`}
                            >
                              Guests attending this event
                            </label>
                            <input
                              id={`event-guests-${e.slug}`}
                              type="text"
                              inputMode="numeric"
                              autoComplete="off"
                              aria-label={`Number of guests for ${e.name}`}
                              value={guestCountDisplay(e.slug)}
                              onChange={(ev) => {
                                setEventsError('');
                                const v = ev.target.value.replace(/\D/g, '');
                                setGuestDrafts((d) => ({ ...d, [e.slug]: v }));
                              }}
                              onBlur={() => commitGuestCount(e.slug)}
                              className="w-16 shrink-0 rounded-md border border-gold bg-white px-2 py-1.5 text-center font-serif text-lg text-maroon-deep outline-none focus:border-maroon-deep"
                            />
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </fieldset>

              {eventsError ? (
                <p role="alert" className="rounded-xl bg-[hsl(0_70%_95%)] p-3 text-base text-[hsl(0_60%_35%)]">
                  {eventsError}
                </p>
              ) : null}

              <div className="rounded-2xl bg-[hsl(var(--ivory-deep)/0.55)] p-4">
                <p className="field-label">Selected events</p>
                <p className="mt-1 text-base">
                  {formatEventSummary(reply.events, reply.eventGuests) || 'No events selected yet'}
                </p>
              </div>
            </div>
          )}

          {current === 'food' && (
            <div className="animate-rise space-y-5">
              <p className="eyebrow">Food</p>
              <Field label="Dietary requirements">
                <input
                  className="field"
                  name="diet"
                  placeholder="Vegan, jain, gluten-free…"
                  value={reply.diet}
                  onChange={(e) => set('diet', e.target.value)}
                />
              </Field>
              <Field label="Allergies">
                <input
                  className="field"
                  name="allergies"
                  placeholder="Nuts, dairy, shellfish…"
                  value={reply.allergies}
                  onChange={(e) => set('allergies', e.target.value)}
                />
              </Field>
            </div>
          )}

          {current === 'logistics' && (
            <div className="animate-rise space-y-5">
              <p className="eyebrow">Logistics</p>
              <Field label="Where are you staying?">
                <input
                  className="field"
                  name="hotel"
                  placeholder="Radisson Blu Golden Sands, own booking…"
                  value={reply.hotel}
                  onChange={(e) => set('hotel', e.target.value)}
                />
              </Field>
              <div className="grid gap-2.5 sm:grid-cols-2">
                <Choice name="transport" checked={reply.transport === 'yes'} onChange={() => set('transport', 'yes')}>
                  I need the coaches
                </Choice>
                <Choice name="transport" checked={reply.transport === 'no'} onChange={() => set('transport', 'no')}>
                  I'll make my own way
                </Choice>
              </div>
            </div>
          )}

          {current === 'fun' && (
            <div className="animate-rise space-y-5">
              <p className="eyebrow">The fun bit</p>
              {!declining && (
                <Field label="Song request for the Sangeet or Reception">
                  <input
                    className="field"
                    name="song"
                    placeholder="Artist – track"
                    value={reply.song}
                    onChange={(e) => set('song', e.target.value)}
                  />
                </Field>
              )}
              <Field label="Anything else we should know">
                <textarea
                  className="field resize-y"
                  name="notes"
                  rows={3}
                  placeholder="Accessibility, arrival times, a secret talent…"
                  value={reply.notes}
                  onChange={(e) => set('notes', e.target.value)}
                />
              </Field>
            </div>
          )}

          {status === 'error' ? (
            <p role="alert" className="rounded-xl bg-[hsl(0_70%_95%)] p-3 text-base text-[hsl(0_60%_35%)]">
              We couldn't send your reply just now — it's saved on this device. Please try again, or call Priya on +356 7900 1122.
            </p>
          ) : null}

          <div className="flex gap-3 pt-2">
            {step > 0 ? (
              <button type="button" onClick={() => setStep((s) => s - 1)} className="btn-ghost flex-1">
                Back
              </button>
            ) : null}
            <button type="submit" disabled={status === 'sending'} className="btn-primary flex-[2] py-4 disabled:opacity-60">
              {isLast ? (status === 'sending' ? 'Sending…' : 'Send our reply') : 'Continue'}
            </button>
          </div>
        </form>
      </section>

      <div className="mx-auto mt-10 max-w-lg">
        <SectionRule label="Need a hand?" light />
        <p className="mt-3 text-center text-lg text-ivory/90">
          Call Priya Menon on{' '}
          <a href="tel:+35679001122" className="font-semibold text-gold-light underline underline-offset-4">
            +356 7900 1122
          </a>
        </p>
      </div>
    </Page>
  );
}
