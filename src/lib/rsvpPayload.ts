import { events } from '../data/wedding';

export type RsvpReplyCore = {
  name: string;
  email: string;
  phone: string;
  party: string;
  attending: 'yes' | 'no';
  events: string[];
  eventGuests: Record<string, number>;
  diet: string;
  allergies: string;
  hotel: string;
  transport: 'yes' | 'no';
  song: string;
  notes: string;
};

export type EventAttendanceRow = {
  slug: string;
  event: string;
  attending: boolean;
  guestCount: number;
};

/** Payload for Google Sheets / webhooks: every event with yes/no and headcount. */
export function buildRsvpSubmitPayload(reply: RsvpReplyCore) {
  const declining = reply.attending === 'no';
  const eventAttendance: EventAttendanceRow[] = events.map((e) => {
    const attending = !declining && reply.events.includes(e.slug);
    const guestCount = attending ? Math.min(99, Math.max(1, reply.eventGuests[e.slug] ?? 1)) : 0;
    return { slug: e.slug, event: e.name, attending, guestCount };
  });

  const eventsSummary = eventAttendance
    .filter((r) => r.attending)
    .map((r) => `${r.event} (${r.guestCount})`)
    .join(', ');

  const guestCountBySlug = Object.fromEntries(eventAttendance.map((r) => [r.slug, r.guestCount]));

  return {
    name: reply.name,
    email: reply.email,
    phone: reply.phone,
    party: reply.party,
    attending: reply.attending,
    diet: reply.diet,
    allergies: reply.allergies,
    hotel: reply.hotel,
    transport: reply.transport,
    song: reply.song,
    notes: reply.notes,
    selectedEvents: reply.events,
    eventGuests: reply.eventGuests,
    eventsSummary,
    eventAttendance,
    guestCountBySlug,
  };
}

export function isGoogleAppsScriptEndpoint(url: string) {
  return /script\.google\.com/i.test(url);
}
