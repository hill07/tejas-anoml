import { events } from '../data/wedding';

/**
 * Deployed Google Apps Script web app URL (ends in /exec).
 * Paste it here after you deploy the script. No .env variable.
 */
export const RSVP_SHEET_URL =
  'https://script.google.com/macros/s/AKfycbzJUNKO6yzweJzRWnb1iAFZa7NsnZ97n3VNc0N_jf5cF3QFZxY54X7WXKA6iFTUsqrOpw/exec';

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

/** One plain row. Guest counts are numbers, one per event. Nothing nested. */
export function buildRsvpSheetRow(reply: RsvpReplyCore) {
  const declining = reply.attending === 'no';
  const counts = Object.fromEntries(
    events.map((event) => {
      const coming = !declining && reply.events.includes(event.slug);
      const count = coming ? Math.min(99, Math.max(1, reply.eventGuests[event.slug] ?? 1)) : 0;
      return [event.slug, count];
    }),
  );

  const eventsSummary = events
    .filter((event) => counts[event.slug] > 0)
    .map((event) => `${event.name} (${counts[event.slug]})`)
    .join(', ');

  return {
    name: reply.name.trim(),
    email: reply.email.trim(),
    phone: reply.phone.trim(),
    party: reply.party.trim(),
    attending: declining ? 'Sadly decline' : 'Joyfully accept',
    events: eventsSummary,
    guestsWelcome: counts['welcome-party'] ?? 0,
    guestsHaldi: counts.haldi ?? 0,
    guestsWedding: counts.wedding ?? 0,
    guestsReception: counts.reception ?? 0,
    diet: declining ? '' : reply.diet.trim(),
    allergies: declining ? '' : reply.allergies.trim(),
    hotel: declining ? '' : reply.hotel.trim(),
    transport: declining ? '' : reply.transport === 'yes' ? 'Needs the coaches' : 'Own way',
    song: declining ? '' : reply.song.trim(),
    notes: reply.notes.trim(),
  };
}

export async function sendRsvpToSheet(reply: RsvpReplyCore) {
  if (!RSVP_SHEET_URL) {
    throw new Error('RSVP sheet URL is not set');
  }
  await fetch(RSVP_SHEET_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(buildRsvpSheetRow(reply)),
  });
}
